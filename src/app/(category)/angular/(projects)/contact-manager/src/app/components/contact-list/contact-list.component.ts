import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ContactService } from "../../services/contact.service";
import { Contact } from "../../models/contact";
import { CommonModule } from "@angular/common";
import { EditContactComponent } from "../edit-contact/edit-contact.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [CommonModule, EditContactComponent],
  templateUrl: "./contact-list.component.html",
  styleUrl: "./contact-list.component.css",
})
export class ContactListComponent implements OnInit, OnChanges {
  contacts: Contact[] = [];
  editContact: Contact = { id: "", name: "", email: "", phone: "" };
  @Input() searchQuery: string = "";
  filteredContacts: Contact[] = [];

  toggleEditContact(contact: Contact): void {
    this.editContact = contact;
    console.log("currently the edit contact is: ", this.editContact);
  }

  ngOnInit(): void {
    this.getAllTasks();
    // Listens to whenever the contacts change
    // so as to update the list, by getting the tasks
    this.contactService.getModalEvent().subscribe(() => {
      this.getAllTasks();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["searchQuery"]) {
      this.searchContacts();
    }
  }

  constructor(
    private contactService: ContactService,
    private notificationPopup: ToastrService
  ) {}

  groupedContacts = new Map<string, any[]>();

  getAllTasks(): void {
    this.contactService.getAllContacts().subscribe({
      next: (response) => {
        this.contacts = response.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredContacts = this.contacts;
        this.groupContacts();
      },
      error: (err) => {
        this.notificationPopup.error("An Error Occured", "Error!");
      },
    });
  }

  groupContacts(): void {
    this.groupedContacts.clear();
    this.filteredContacts.forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!this.groupedContacts.has(firstLetter)) {
        this.groupedContacts.set(firstLetter, []);
      }
      this.groupedContacts.get(firstLetter)?.push(contact);
    });
  }

  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact).subscribe({
      next: (response) => {
        this.notificationPopup.success(
          "Contact deleted successfully",
          "Success!"
        );
        this.getAllTasks();
      },
      error: (err) => {
        this.notificationPopup.error("An Error Occured", "Error!");
        console.log(err);
      },
    });
  }

  searchContacts(): void {
    const filtered = this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        contact.phone.includes(this.searchQuery)
    );

    this.filteredContacts = filtered;
    this.groupContacts();
  }
}
