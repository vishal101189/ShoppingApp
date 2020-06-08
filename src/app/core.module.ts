import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
//Module For Services used in project
//This module is only for the demo purpose . Best recommendation is to inject service by providedIn prop like as datastorage.service.ts
@NgModule({
    providers: [         
        RecipeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
    ]
})
export class CoreModule {}