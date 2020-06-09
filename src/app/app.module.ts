import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent  
  ],
  imports: [
    BrowserModule,  
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    //RecipesModule,//3. remove this from here it we are loading recipemodule eagrly and there lazy so it causes an error. and follow 4th step in app-routing.module.ts
    //ShoppingListModule,
    SharedModule,
    CoreModule
    //AuthModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
