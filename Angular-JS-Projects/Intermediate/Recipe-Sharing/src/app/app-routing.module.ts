import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { UpdateRecipeFormComponent } from './update-recipe-form/update-recipe-form.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { EshopComponent } from './eshop/eshop.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'recipe', component:RecipeFormComponent},
  {path: 'update', component:UpdateRecipeFormComponent},
  {path: 'view', component:ViewRecipeComponent},
  {path: 'eshop', component:EshopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
