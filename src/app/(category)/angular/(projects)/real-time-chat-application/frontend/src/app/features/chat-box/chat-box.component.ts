import { Component } from '@angular/core';
import { ChatService } from '../../core/chat.service';
import { UserService } from '../../core/user.service';
import { chatFriend } from '../../core/models/chatFriend.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})
export class ChatBoxComponent {
  newMessage: string='';
  messageList: any[] = [];
  defaultView: boolean=true;
  chatTimestamp= new Date();
  showProfileModal:boolean=false;
  activeChat:chatFriend={
    username: '',
    avatar: '',
    active: false
  };
  onlineUsers:string[]=[];
  username:any;

  constructor(private chatService: ChatService, private userService: UserService ){

  }

  ngOnInit(){

    this.chatService.getNewMessage().subscribe((message: any) => {
      if(message){
        this.messageList.push(message);
      }
    });

    this.userService.showUserProfile.subscribe((response)=>{      
      this.showProfileModal=response;
    });

  }

  sendMessage() {
    if(this.newMessage!='' || this.newMessage.length>0){

      this.chatService.sendMessage(this.newMessage);      
      this.newMessage = '';

    }
    
  }

}
