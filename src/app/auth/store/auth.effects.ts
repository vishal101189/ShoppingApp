import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}
//For Removing Duplicate Data from Login and SignUp
const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);  
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));              
    return  new AuthActions.AuthenticateSuccess({email: email, userId: userId, token: token, expirationDate: expirationDate, redirect: true });

};
//For Removing Duplicate Data from Login and SignUp
const handleError = (errorRes: any) => {
    let errorMessage = "An unknown error occurred!";            
    if(!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMessage = "This email exists already.";
          break;
      case 'EMAIL_NOT_FOUND':
          errorMessage = "This email does not exist.";
          break;
      case 'INVALID_PASSWORD':
          errorMessage = "The password is not correct.";
          break;
      case 'USER_DISABLED':
          errorMessage = "The userid is disabled";
          break;
  } 
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return  this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                  return handleError(errorRes);
            })
           );
        })
    );

    //Adding Effect AuthLogion for Handling HTTPRequest
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })                
            );
        })
    );

     //Adding Effect AuthSuccess for Handling Successful Login  
     @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if(authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }            
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
    
            if(!userData) {
                return { type: 'DUMMY' };
            }
    
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    
            if(loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);                
                // this.user.next(loadedUser);
                return new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate), redirect: false });
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
            }
            return { type: 'DUMMY' };
        })
    )
    
    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}
}