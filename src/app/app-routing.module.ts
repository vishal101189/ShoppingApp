import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { 
        path: 'recipes', 
        loadChildren: () => import('./recipes/recipes.module').then(m=> m.RecipesModule)
    },   //2.For lazy loading,need to add path here and this is the modern syntax for dynamic loading the module and for 3rd step follow app.module.ts
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m=> m.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)
    },
    {
        path: '**', redirectTo: 'auth'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })], //4.To optimize lazy loading use preloadingStrategy need to google for newer version
    exports: [RouterModule]
})

export class AppRoutingModule {

}