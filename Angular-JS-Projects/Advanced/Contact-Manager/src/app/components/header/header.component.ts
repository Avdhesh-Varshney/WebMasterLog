import { Component } from '@angular/core';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NewContactComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  isNewContactModalOpen : boolean = false;

  toggleNewContactModal(toggle: boolean): void {
    this.isNewContactModalOpen = toggle;
    console.log("currently the modal is: ", this.isNewContactModalOpen)
  }

}
