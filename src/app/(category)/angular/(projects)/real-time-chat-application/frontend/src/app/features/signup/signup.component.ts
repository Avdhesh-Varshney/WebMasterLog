import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { UserService } from '../../core/user.service';
import { user } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
signUpForm= new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

user: user ={username:'',password:''};

  constructor(private userService: UserService, private router: Router) {
    
  }
  submit(){
    this.user={
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    }
    this.userService.createUser(this.user, this.getRandomNumber()).subscribe((response)=>{
      alert("Registration Successful, Please Join the Chat Room");
      this.navigateToLogin();
    })
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  getRandomNumber(): number {
    const numbers = [41, 61, 91, 11, 21, 20, 67];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }

 
}
