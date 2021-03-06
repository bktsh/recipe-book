import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  ingredientsChangedSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingService.ingredientsChanged.subscribe((data: Ingredient[]) => {
        this.ingredients = data;
    });
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onItemClicked(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
