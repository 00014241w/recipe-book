import {Component, DestroyRef} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[];

  // private recipesService = inject(RecipesService);
  constructor(private recipesService: RecipesService,
              private route: Router,
              private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    const subscription = this.recipesService.changedRecipes.subscribe((res: Recipe[]) => {
      this.recipes = res;
    })
    this.recipes = this.recipesService.getRecipes();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddNewRecipe(){
    this.route.navigateByUrl('/recipes/new')
  }
}
