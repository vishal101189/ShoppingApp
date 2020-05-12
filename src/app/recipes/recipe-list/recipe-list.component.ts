import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  recipes: Recipe[];
  //Move Recipe[] to RecipeService
  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe','This is simply a Test','https://lh5.ggpht.com/_qvSQ4gt4bGw/TTYGFg7cUtI/AAAAAAAACzw/MuwI86Kkink/s800/panko-crusted-salmon.jpg'),
  //   new Recipe('Another Test Recipe','This is simply a Test','https://lh5.ggpht.com/_qvSQ4gt4bGw/TTYGFg7cUtI/AAAAAAAACzw/MuwI86Kkink/s800/panko-crusted-salmon.jpg')
  // ];
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeService.getRecipes();
  } 
  
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
