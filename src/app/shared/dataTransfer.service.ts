import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import  'rxjs/Rx';

// tslint:disable-next-line:no-unused-expression
@Injectable()
export class DataTransferService {

  constructor(private http: Http, private recipeService: RecipeService) {}

  saveDataToServer() {
    return this.http.put('https://recipe-book-c539c.firebaseio.com/recipe.json',
           this.recipeService.getRecipes());
  }
  fetchDataFromServers() {
    return this.http.get('https://recipe-book-c539c.firebaseio.com/recipe.json')
            .map(
              (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                  if (!recipe['ingredients']) {
                    console.log(recipe);
                    recipe['ingredients'] = [];
                  }
                }
                return recipes;
              }
            )
            .subscribe(
              (response: Recipe[]) => {
                this.recipeService.setRecipes(response);
              });
  }
}
