import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  @ViewChild('shoppingItemForm') shoppingItemForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingItemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
          });
      });
  }

  onSubmit(myForm: NgForm) {
    console.log(myForm.form.value);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, new Ingredient(myForm.form.value.name, myForm.form.value.amount));
    } else {
      this.shoppingService.addNewItem(new Ingredient(myForm.form.value.name, myForm.form.value.amount));
    }
    this.resetForm();
  }

  private resetForm() {
    console.log('resetForm');
    this.editMode = false;
    this.shoppingItemForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.resetForm();
  }

  onDelete(){
    this.shoppingService.removeIngredient(this.editedItemIndex);
    this.resetForm();
  }

}
