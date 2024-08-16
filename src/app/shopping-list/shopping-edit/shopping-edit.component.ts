import {Component, DestroyRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingService} from "../shopping.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('f') form: NgForm;
  private slService = inject(ShoppingService);
  private destroyRef = inject(DestroyRef);
  editedItem: Ingredient;
  editMode: boolean = false;
  editedItemIndex: number;
  @Output() addedIngredient = new EventEmitter<Ingredient>();

  ngOnInit(){
    const subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    );

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.form.form.reset()
  }

  onClear(){
    this.form.form.reset();
    this.editMode = false;
  }

  onDelete(index: number){
    this.slService.deleteIngredient(index);
    this.onClear();
  }
}
