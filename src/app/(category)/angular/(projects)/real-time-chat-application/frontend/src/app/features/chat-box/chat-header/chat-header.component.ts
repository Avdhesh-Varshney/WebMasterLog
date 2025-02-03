import { Component } from '@angular/core';
import { UserService } from '../../../core/user.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  activeUsers: {username: string, avatar: string, active: boolean}[] = [
    {
      username: '',
      avatar: '',
      active: false,
    },
  ];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getActiveMembers().subscribe((response: any) => {
      // Check if the user already exists in activeUsers
      const existingUserIndex = this.activeUsers.findIndex(
        (user) => user.username === response.username && user.avatar === response.avatar
      );
  
      if (existingUserIndex !== -1) {
        // If user exists, update their 'active' status
        this.activeUsers[existingUserIndex].active = response.active;
      } else {
        // If user doesn't exist, add them to activeUsers
        this.activeUsers.push({
          username: response.username,
          avatar: response.avatar,
          active: response.active,
        });
      }
    });
  }
  
}
