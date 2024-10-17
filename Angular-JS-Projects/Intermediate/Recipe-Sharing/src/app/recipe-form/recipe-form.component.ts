import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Recipe } from '../Recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  name: string='';
    ingredients: string='';
    details: string='';

  constructor(private service: FormService, private router: Router){}
  ngOnInit(){

  }

  onSubmit(){

    const newRecipe:  Recipe={
      name: this.name,
      ingredients: this.ingredients,
      details: this.details
    }
    this.service.addRecipe(newRecipe);
    console.log(newRecipe);
    this.router.navigate(['view'])

  }

}
