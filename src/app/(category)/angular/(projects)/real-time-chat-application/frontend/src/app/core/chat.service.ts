import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('http://localhost:3000');
  private messageSource = new BehaviorSubject<any>(null);
  public message$ = this.messageSource.asObservable();

  private onlineUsers = new BehaviorSubject<any>(null);
  public onlineUsers$ = this.onlineUsers.asObservable();

  public currentUser: string = '';  // Stores current user's ID
  public userColor: string = '';  // Stores current user's assigned color
  public userId =sessionStorage.getItem('chatUserId') || ''; // Get the user ID from session storage

  constructor() {
   // Emit the user ID to the server so that it can assign a color (only if not already done)
    if (this.userId) {
      this.currentUser = this.userId;  // Store the current user's ID
      this.socket.emit('set-username', this.userId); // Send user ID to the server
    }
    // Listen for incoming messages from the server
    this.socket.on('message', (message) => {
      //console.log('Received message:', message);
      this.messageSource.next(message); // Emit the message to the subscribers
    });

    // Listen for the color assignment for the current user
    this.socket.on('set-color', (data) => {
      if (data.userId === this.currentUser) {
        this.userColor = data.color; // Store the assigned color
        //console.log(`User ${data.userId} has been assigned color:`, data.color);
      }
    });

    // Listen for connected users
    this.socket.on('connected-users', (connectedUsers: string[]) => {
      //console.log(connectedUsers);
      
      this.onlineUsers.next(connectedUsers);
    });
    
  }

  // Send a message to the server
  public sendMessage(message: string) {

    // Send the message to the server with the user ID and color (if available)
    const messageData = {
      userId: this.userId,
      message: message,
      color: this.userColor,  // Include the color when sending the message
    };

    this.socket.emit('message', messageData); // Emit the message to the server
  }
 

  // Get the observable of new messages
  public getNewMessage() {
    return this.message$;  // Return the observable to subscribe to new messages
  }
}
