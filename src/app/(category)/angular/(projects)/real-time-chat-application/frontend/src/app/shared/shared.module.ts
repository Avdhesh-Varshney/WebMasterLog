import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../shared/navbar/navbar.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavbarComponent, NotFoundComponent, ModalComponent]
})
export class SharedModule { }
