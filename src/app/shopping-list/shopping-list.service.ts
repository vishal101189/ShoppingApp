import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    //OR
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        //OR
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
      //  for(let ingredient of ingredients){
      //      this.addIngredient(ingredient);
       // }
        //OR
        this.ingredients.push(...ingredients);       
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngedient: Ingredient) {
        this.ingredients[index] = newIngedient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}