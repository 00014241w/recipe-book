import { inject, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingService} from "../shopping-list/shopping.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  clickedRecipe = new Subject<Recipe>();
  changedRecipes = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Margherita Pizza',
  //     'A typical Neapolitan pizza',
  //     'https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg',
  //     [
  //       new Ingredient('Dough', 1),
  //       new Ingredient('Tomato Sause', 1)
  //     ]
  //   ),
  //   new Recipe(
  //     'Turkish Dolma',
  //     'Easy to make and full of flavour!',
  //     'https://www.carolinescooking.com/wp-content/uploads/2022/06/Turkish-stuffed-grape-leaves-dolma-featured-pic-sq.jpg',
  //     [
  //       new Ingredient('Meat', 3),
  //       new Ingredient('Grape Leafs', 3),
  //       new Ingredient('Rice', 2),
  //     ])
  // ];
  private recipes: Recipe[] = [];

  getRecipes(){
    return this.recipes.slice();
  }

  private slService = inject(ShoppingService);

  constructor() { }

  getRecipe(index: number){
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.changedRecipes.next(this.recipes.slice())
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.changedRecipes.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.changedRecipes.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.changedRecipes.next(this.recipes.slice());
  }
}
