import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipesService} from "./recipes.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
  private dataStorage = inject(DataStorageService);
  private recipesService = inject(RecipesService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipesService.getRecipes();
    if(recipes.length === 0){
      return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
