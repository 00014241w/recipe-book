import {Component, inject } from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ShoppingService} from "../../shopping-list/shopping.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  recipe: Recipe;
  id: number;

  private recipeService = inject(RecipesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onSendToList(){
    // this.shoppingService.addIngredients(this.recipe.ingredients);
    // console.log(this.recipe.ingredients);
    this.recipeService.addIngredientsToList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
