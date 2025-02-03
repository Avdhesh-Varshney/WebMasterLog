import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../../core/chat.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
currentUser:any;

constructor(private authService: AuthService, private router: Router,private userService: UserService, private chatService:ChatService) {}

ngOnInit(){
  this.userService.getCurrentUser().subscribe((response:any)=>{
    this.currentUser= response[0];
    this.chatService.onlineUsers$.subscribe((onlineUsers: string[]) => {
      const isActive = onlineUsers.includes(response[0].id.toString());

      if(isActive){
        this.currentUser.active=true;
      }
    });

  });
}

closeModal() {
  this.userService.showUserProfile.emit(false);
}

logout(){
  localStorage.removeItem('loggedIn');
  sessionStorage.removeItem('chatUserId');
  this.authService.logout();
  this.router.navigate(['login']);
}

}
