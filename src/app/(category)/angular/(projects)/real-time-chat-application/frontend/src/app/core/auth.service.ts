import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { user } from './models/user.model';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginAuthentication(user: user) {
    return this.http.get(environment.apiUrl).pipe(
      map((users: any) => {
        const isUserAuthentic = users.find(
          (u: any) => u.username === user.username && u.password === user.password
        );
        
        if (isUserAuthentic) {
          // Make sure the patch request completes before returning the result
          return this.http.patch(`${environment.apiUrl}/${isUserAuthentic.id}`, { loggedIn: true }).pipe(
            map((response: any) => {
              localStorage.setItem('loggedIn', response.loggedIn);
              sessionStorage.setItem('chatUserId', response.id);
              return true; // Return true after patch request completes
            })
          );
        }
        
        return of(false); // If the user is not authentic, return false immediately
      })
    );
  }
  

  logout(){
    const userId= localStorage.getItem('chatUserId');
    this.http.patch(`${environment.apiUrl}/${userId}`, { loggedIn: false }).subscribe((response:any) => {            
      sessionStorage.removeItem('chatUserId');
    });
  }
}
