import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipes-resolver.service';

const routes: Routes = [
    {
       // path: 'recipes',
        path: '',//1.For lazy loading path should be blank and move path to app-routing.module.ts. now check 2nd step of lazy.. there.
        component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },//should be before :id path
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },       
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}