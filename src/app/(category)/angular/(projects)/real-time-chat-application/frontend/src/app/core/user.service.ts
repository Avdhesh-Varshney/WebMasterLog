import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './models/user.model';
import { environment } from '../../environments/environment';
import { chatFriend } from './models/chatFriend.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { messages } from './models/messages.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activeMembers= new BehaviorSubject<chatFriend>({username:'',active:false,avatar:''});
  activeMembers$= this.activeMembers.asObservable();


  showUserProfile = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  createUser(user: user, avatarNo:number){
    return this.http.post(environment.apiUrl,{username:user.username, password: user.password, loggedIn:true, avatar:`https://avatar.iran.liara.run/public/${avatarNo}`});
  }

  getUser(){
    return this.http.get(environment.apiUrl);
  }

  getActiveMembers(){
    return this.activeMembers$;
  }

  setActiveMembers(item:chatFriend){
    this.activeMembers.next(item);
  }

  getCurrentUser(){
    const userId= sessionStorage.getItem('chatUserId');    
    return this.http.get(`${environment.apiUrl}?id=${userId}`);
  }

  getUsersById(userId:number){
    return this.http.get(`${environment.apiUrl}?id=${userId}`);
  }


}
