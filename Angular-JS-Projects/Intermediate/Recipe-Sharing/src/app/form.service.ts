import { Injectable } from '@angular/core';
import { Recipe } from './Recipe';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  updateRecipe: Recipe = new Recipe();

  recipes: Recipe[] = [
    {
      name: 'Veg Biryani',
      ingredients: 'rice, onion, tomato, ground spices, salt',
      details: 'Boil rice and vegetables separately. After that, mix them together',

    },
    {
      name: 'Spaghetti',
      ingredients: 'spaghetti, onion, garlic, tomato sauce',
      details: 'Cook spaghetti, and make sauce.',

    },

     { "name": "Margherita Pizza",
     "ingredients": "pizza dough, tomato sauce, mozzarella cheese, basil leaves, olive oil",
      "details": "Top pizza dough with tomato sauce, mozzarella cheese, and basil leaves. Bake until cheese is melted and crust is crispy.", },];

      getRecipe(): Recipe[]{
        return this.recipes;
      }

      addRecipe(Recipe: any){
        this.recipes.push(Recipe);
      }

    setNewRecipe(recipe: Recipe){
      this.updateRecipe=recipe;
    }

    getNewRecipe(): Recipe{
      return this.updateRecipe;
    }

    deleteRecipe(deleteRecipe: Recipe): Recipe[] {
      this.recipes = this.recipes.filter((recipe) => deleteRecipe.name != recipe.name);
      return this.recipes;
    }

}
