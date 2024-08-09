import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Contact } from '../../models/contact';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnChanges  {

  @Output() toggleTask = new EventEmitter<Contact>()
  @Input() editContact!: Contact;
  contactForm: FormGroup;
  errors = {name: "", phone: "", email: ""}
  newContact: Contact = new Contact();

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.email]],
      phone: ["", [Validators.required]]
    });
    console.log(this.editContact);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editContact']) {
      const contact = changes['editContact'].currentValue;
      if (contact) {
        this.contactForm.patchValue({
          name: contact.name,
          email: contact.email,
          phone: contact.phone
        });
      }
    }
  }


  onSubmit(): void {
    this.errors = {name: "", phone: "", email: ""}
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.newContact = this.contactForm.value;
      this.newContact.id = this.editContact.id;
      console.log(this.newContact)
      this.contactService.editContact(this.newContact).subscribe(res => {
        console.log("edited")
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

  setTaskNull(): void {
    console.log("Going to emit")
    this.toggleTask.emit({id: "", name: "", email: "", phone: ""})
  }

}
