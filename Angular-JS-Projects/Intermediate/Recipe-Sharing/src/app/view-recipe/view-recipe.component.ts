import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Recipe } from '../Recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent {

  allRecipe = this.service.getRecipe()

  constructor(private service: FormService, private router: Router){

  }

  ngOnInit(){
   
  }

  onSubmitUpdate(recipe: Recipe){
      this.service.setNewRecipe(recipe)
      this.router.navigate(['update'])
  }

  onDelete(recipe : Recipe){
    
    this.allRecipe=this.service.deleteRecipe(recipe);
    
    this.router.navigate(['view'])
  }
}
