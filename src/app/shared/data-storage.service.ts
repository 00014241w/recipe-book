import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipesService} from "../recipes/recipes.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  private http = inject(HttpClient);
  private recipeService = inject(RecipesService);

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipebook-e1b6e-default-rtdb.firebaseio.com/recipes.json', recipes)
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipebook-e1b6e-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map((recipe) => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
