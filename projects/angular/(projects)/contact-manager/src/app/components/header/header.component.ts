import { Component, EventEmitter, Output } from "@angular/core";
import { NewContactComponent } from "../new-contact/new-contact.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NewContactComponent, CommonModule, FormsModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  isNewContactModalOpen: boolean = false;
  @Output() searchChanged = new EventEmitter<string>();
  @Output() newContactAdded = new EventEmitter();
  searchQuery: string = "";

  toggleNewContactModal(toggle: boolean): void {
    this.isNewContactModalOpen = toggle;
    console.log("currently the modal is: ", this.isNewContactModalOpen);
  }

  onSearchChange(): void {
    this.searchChanged.emit(this.searchQuery);
  }

  onAddNewContact(): void {
    this.newContactAdded.emit();
  }
}
