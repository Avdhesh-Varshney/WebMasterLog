import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Contact } from "../../models/contact";
import { ContactService } from "../../services/contact.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-new-contact",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./new-contact.component.html",
  styleUrl: "./new-contact.component.css",
})
export class NewContactComponent {
  @Output() closeNewContactModal = new EventEmitter<boolean>();

  contactForm: FormGroup;
  errors = { name: "", phone: "", email: "" };
  newContact: Contact = new Contact();

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private notificationPopup: ToastrService
  ) {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.email]],
      phone: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    this.errors = { name: "", phone: "", email: "" };
    if (this.contactForm.valid) {
      console.log("Form Submitted:", this.contactForm.value);
      this.newContact = this.contactForm.value;
      // Addopted the new syntax (Current Best Practice) with the use of
      // next and error in subscriptions
      this.contactService.addContact(this.newContact).subscribe({
        next: (response) => {
          console.log(response);
          // Show a popup to notify the user that it was successfull
          this.notificationPopup.success(
            "Contact added successfully",
            "Success!"
          );
          // emits to the modal event in contact service
          // to let it know that the list changed
          this.contactService.sendModalEvent();
          // THen Close the modal
          this.close();
        },
        error: (err) => {
          console.log(err);
          this.notificationPopup.error("An Error occured", "Error!");
        },
      });
    } else {
      this.notificationPopup.error("The form is invalid", "Error!");
      this.displayFormErrors();
    }
  }

  displayFormErrors(): void {
    this.errors = {
      name: this.contactForm.get("name")?.hasError("required")
        ? "Name is required"
        : "",
      phone: this.contactForm.get("phone")?.hasError("required")
        ? "Phone number is required"
        : "",
      email: this.contactForm.get("email")?.hasError("email")
        ? "Invalid email format"
        : "",
    };
  }

  close(): void {
    this.closeNewContactModal.emit(false);
  }
}
