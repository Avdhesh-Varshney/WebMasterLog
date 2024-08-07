import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent  {

  @Output() closeNewContactModal = new EventEmitter<boolean>()
  contactForm: FormGroup;
  errors = {name: "", phone: "", email: ""}
  newContact: Contact = new Contact();

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.errors = {name: "", phone: "", email: ""}
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.newContact = this.contactForm.value;
      this.contactService.addContact(this.newContact).subscribe(res => {
        console.log("addedd")
        console.log(res)
        window.location.reload()
      }, err => {
        console.log(err)
      })
    } else {
      console.log('Form is invalid');
      this.displayFormErrors();
    }
  }

  displayFormErrors(): void {
    this.errors= {
      name: this.contactForm.get('name')?.hasError('required') ? 'Name is required' : '',
      phone: this.contactForm.get('phone')?.hasError('required') ? 'Phone number is required' : '',
      email: this.contactForm.get('email')?.hasError('email') ? 'Invalid email format' : ''
    };
  }

  close(): void {
    console.log("Going to emit")
    this.closeNewContactModal.emit(false)
  }


}
