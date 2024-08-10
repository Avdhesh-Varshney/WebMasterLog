// This is a service provided by Angular’s @angular/common/http module. It is used to make HTTP requests (GET, POST, PUT, DELETE, etc.) to communicate with a backend server.
import { HttpClient } from '@angular/common/http';

// Injectable: This decorator marks the class as a service that can be injected into other components or services. It is part of Angular’s dependency injection system.
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  // This specifies that the service is provided at the root level, 
  // meaning that Angular will create a single instance of this service that is shared across the entire application (singleton). 
  // This is the recommended way to provide services in Angular as it avoids duplication.
  providedIn: 'root'
})

// This defines the ContactService class, which is exported so it can be imported and used in other parts of the application.
export class ContactService {

  // This is a property of the class that holds the URL for the backend service where the contacts data can be fetched, updated, or manipulated.
  serviceUrl: string = "";

  // The constructor is a special method that gets called when an instance of this service is created.
  // The HttpClient is injected into the service through the constructor. 
  constructor(private http: HttpClient) { 
    this.serviceUrl = "http://localhost:3000/contacts";
  }

  // The method returns an Observable that emits a Contact. 
  // In Angular, HttpClient methods return observables, which are a key part of reactive programming. 
  // Observables allow you to handle asynchronous operations like HTTP requests and can be subscribed 
  // to in components to perform actions when the request completes.
  // The method returns an Observable<Contact>, which will emit the response from the server when the POST request is complete. 
  addContact(contact: Contact):  Observable<Contact> {
    return this.http.post<Contact>(this.serviceUrl, contact);
  }

  getAllContacts():  Observable<Contact[]> {
    return this.http.get<Contact[]>(this.serviceUrl);
  }

  deleteContact(contact: Contact): Observable<Contact> {
    return this.http.delete<Contact>(this.serviceUrl + `/${contact.id}`)
  }

  editContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.serviceUrl + `/${contact.id}`, contact)
  }


}
