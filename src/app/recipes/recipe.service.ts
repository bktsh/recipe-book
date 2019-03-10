import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

export class RecipeService {

  constructor() {}

  recipesChanged = new Subject<Recipe[]>();
  private recipes = [] ;

  setRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(input: Recipe) {
    this.recipes.push(input);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, input: Recipe) {
    this.recipes[index] = input;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
