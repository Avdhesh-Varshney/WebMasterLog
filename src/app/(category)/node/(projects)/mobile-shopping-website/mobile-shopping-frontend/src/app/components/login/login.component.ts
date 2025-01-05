import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = ''; // To hold error messages
    isLoading: boolean = false; // To show loading state

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.isLoading = true; // Start loading
        this.errorMessage = ''; // Reset error message

        this.authService.login({ username: this.username, password: this.password }).subscribe(
            response => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/products']);
            },
            error => {
                this.isLoading = false; // Stop loading
                console.error('Login failed', error);
                this.errorMessage = error.error?.message || 'Login failed. Please try again.'; // Set error message
            }
        );
    }
}