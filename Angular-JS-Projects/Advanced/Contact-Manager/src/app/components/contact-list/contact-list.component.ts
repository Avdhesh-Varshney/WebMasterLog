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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["searchQuery"]) {
      this.searchContacts();
    }
  }

  constructor(private contactService: ContactService) {}

  getAllTasks(): void {
    this.contactService.getAllContacts().subscribe(
      (res) => {
        this.contacts = res.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredContacts = this.contacts;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchContacts(): void {
    this.filteredContacts = this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        contact.phone.includes(this.searchQuery)
    );
  }
}
