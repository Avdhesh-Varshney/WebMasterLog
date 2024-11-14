import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { UpdateRecipeFormComponent } from './update-recipe-form/update-recipe-form.component';
import { FormsModule } from '@angular/forms';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { EshopComponent } from './eshop/eshop.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RecipeFormComponent,
    UpdateRecipeFormComponent,
    ViewRecipeComponent,
    EshopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
