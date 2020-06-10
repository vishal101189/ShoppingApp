import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app_auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;           
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        //console.log(form.value);
        if(!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;        
                
        if(this.isLoginMode) {            
            this.store.dispatch(
                new AuthActions.LoginStart({email: email, password: password})
            );
        } else {             
           this.store.dispatch(
               new AuthActions.SignupStart({email: email, password: password})
           );        
        }        
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}