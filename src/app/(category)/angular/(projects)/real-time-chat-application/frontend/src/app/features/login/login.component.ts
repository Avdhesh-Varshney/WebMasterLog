import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { user } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
constructor(private router: Router, private authService:AuthService) {
  
}

ngOnInit(){
  if(localStorage.getItem('loggedIn')){
    this.router.navigate(['chat']);
  }
}
  loginForm= new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  user:user={username:'', password:''};

  submit(){
    this.user={
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    
    this.authService.loginAuthentication(this.user).subscribe({
      next:(response)=>{
        if(response){
          this.router.navigate(['chat']);
        }
        else{
          alert("User Not Found, Please Sign Up");
          this.router.navigate(['signup']);
        }
      },
      error:(error)=>{
        console.error(error);
      }
    });
    
  }

  navigateToSignup(){
    this.router.navigate(['signup']);
  }
}
