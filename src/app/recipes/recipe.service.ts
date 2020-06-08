import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-List/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
    recipeChanged =new Subject<Recipe[]>();

    // private  recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    //         'https://live.staticflickr.com/8385/29834170121_7795db9a3c_b.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe('Big Fat Burger',
    //         'What else you need to say?',
    //         'https://cdn.pixabay.com/photo/2019/04/23/08/58/burger-4148868_960_720.jpg',
    //          [
    //              new Ingredient('Buns', 2),
    //              new Ingredient('Meat', 2)
    //          ])
    //   ];

    private  recipes: Recipe[] = [];

    constructor(private store: Store<fromShoppingList.AppState>){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        console.log(recipes);
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice()
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    addIngedientToShoppingList(ingredients: Ingredient[]) {
        //this.shoppinListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}