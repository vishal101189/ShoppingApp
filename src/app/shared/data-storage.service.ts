import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        //at end of url we include .json file that is characterstics of firebase
        this.http.put('https://ng-shoppingapp-f275d.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            })
    }

    fetchRecipes() {           
        return this.http.get<Recipe[]>(
            'https://ng-shoppingapp-f275d.firebaseio.com/recipes.json'
          ).pipe(
                //map in pipe is simply rxjs operator and below map is javascript object       
                map(recipes => {
                    console.log(recipes);
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] 
                        };
                    }); 
                }), 
                tap(recipes => {
                    console.log(recipes);
                    this.recipeService.setRecipes(recipes);
                    })
                )
        }
    }
                    
         
                
           
