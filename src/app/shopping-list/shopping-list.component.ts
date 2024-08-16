import {Component, DestroyRef, inject} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingService} from "./shopping.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  private shoppingService = inject(ShoppingService);
  private destroyRef = inject(DestroyRef)

  ingredients: Ingredient[];

  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredients();
    const subscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  addIngredient(ingredient: Ingredient){
    this.shoppingService.addNewIngredient(ingredient)
  }

  onEditItem(index: number){
    this.shoppingService.startedEditing.next(index)
  }
}
