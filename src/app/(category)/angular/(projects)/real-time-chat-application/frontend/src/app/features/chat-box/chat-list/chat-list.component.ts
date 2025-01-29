import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user.service';
import { chatFriend } from '../../../core/models/chatFriend.model';
import { ChatService } from '../../../core/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  friend: chatFriend[]=[];

  constructor(private userService: UserService, private chatService: ChatService) {
    
  }

  ngOnInit(){
    this.userService.getUser().subscribe((users: any) => {
      this.userService.getCurrentUser().subscribe((currentUser: any) => {
        const currentUserId = currentUser[0].id;
  
        users.forEach((user: any) => {
          if (user.id !== currentUserId) {
            this.chatService.onlineUsers$.subscribe((onlineUsers: string[]) => {
              const isActive = onlineUsers.includes(user.id.toString());
  
              // Check if the user is already in the `friend` list before adding
              const existingFriendIndex = this.friend.findIndex((f) => f.id === user.id);
              if (existingFriendIndex === -1) {
                // Add if user is not already present
                this.friend.push({
                  id: user.id,
                  username: user.username,
                  avatar: user.avatar,
                  active: isActive,
                });
              } else {
                // Update the active status if user already exists
                this.friend[existingFriendIndex].active = isActive;
              }

              if(isActive){
                this.userService.setActiveMembers(user);
              }
            });
          }
        });
      });
    });
  }


  // setChatActive(item:chatFriend){    
  //   this.userService.setActiveChat(item);
  // }
}
