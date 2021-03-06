import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

//This service is used for modified all url to add token in all url
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
    //Modified the incoming req: add user token in cuurent req and then return modified req...
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //pipe is used to add two subscriber like user and next.hanlde subs here...
        //take will do automatically unsubscibe
        //exhaustMap is used to map two obserable user and get ob.1st user obser do its work then after taking data from that get obser will be replaced with that
        return this.store.select('auth').pipe(
            take(1), 
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {      
                if(!user) {
                    return next.handle(req);
                }     
                const modeifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });    
                return next.handle(modeifiedReq);
            })
        )
    }
    
}