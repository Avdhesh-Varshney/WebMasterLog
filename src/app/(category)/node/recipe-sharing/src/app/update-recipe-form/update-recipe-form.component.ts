import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-update-recipe-form',
  templateUrl: './update-recipe-form.component.html',
  styleUrls: ['./update-recipe-form.component.css']
})
export class UpdateRecipeFormComponent {

  updatedRecipe: Recipe = new Recipe();

  name: string='';
  ingredients: string='';
  details: string='';

  constructor(private service: FormService, private router: Router){}
  ngOnInit(){
      this.updatedRecipe= this.service.getNewRecipe();
      console.log(this.updatedRecipe)
  }

  onSubmit(){
      this.service.setNewRecipe(this.updatedRecipe)
      this.router.navigate(['view'])
  }

}
