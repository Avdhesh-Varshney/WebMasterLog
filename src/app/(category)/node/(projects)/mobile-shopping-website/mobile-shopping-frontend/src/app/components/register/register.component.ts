import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone:true,
    imports:[CommonModule,FormsModule,RouterModule]
})

    export class RegisterComponent {
      username: string = '';
      password: string = '';
      email: string = '';
      shippingAddress: string = '';
  
      constructor(private authService: AuthService, private router: Router) { }
  
      register() {
          const user = {
              username: this.username,
              password: this.password,
              email: this.email,
              shippingAddress: this.shippingAddress
          };
  
          this.authService.register(user).subscribe(
              response => {
                  console.log('User  registered successfully', response);
                  this.router.navigate(['/login']);
              },
              error => {
                  console.error('Registration failed', error);
              }
          );
      }
  }