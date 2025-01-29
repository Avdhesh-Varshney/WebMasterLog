import { Component } from '@angular/core';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showProfileModal:boolean=false;

  constructor( private userService: UserService) {
  }

  showProfileDetails(){
    this.userService.showUserProfile.emit(true);
  }

  
}
