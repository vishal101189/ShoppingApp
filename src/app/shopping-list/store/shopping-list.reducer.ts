import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
    ]
};
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,   //... is used to copy the old state
                ingredients: [...state.ingredients, action.payload]// copy all existing ingredients and add new ingredient
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,   //... is used to copy the old state
                ingredients: [...state.ingredients, ...action.payload]// copy all existing ingredients and add new ingredient array
                };  
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload
                })
            };
        default:
            return state;
    }

}