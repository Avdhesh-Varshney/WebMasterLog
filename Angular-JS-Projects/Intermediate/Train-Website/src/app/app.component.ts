import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IPassenger } from './models/stations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainsService } from './services/trains.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Train-Website';

  registerObj: IPassenger = new IPassenger();
  loggedUserData: any;

  constructor(private trainSrv: TrainsService){

  }
  logoff() {
    localStorage.removeItem('trainUser');
    this.loggedUserData = undefined;
  }

  openRegister(){
    const model = document.getElementById('registerModel');
    if(model != null){
      model.style.display = 'block';
    }
  }

  closeRegister(){
    const model = document.getElementById('registerModel');
    if(model != null){
      model.style.display = 'none';
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if(model != null) {
      model.style.display ='block'
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModel');
    if(model != null) {
      model.style.display ='none'
    }
  }

  onRegister() {
    this.trainSrv.createPassenger(this.registerObj).subscribe((res: any)=>{
      if(res.result) {
        alert("Registration Success");
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData =  res.data;
        this.closeRegister();
      } else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    this.trainSrv.login(this.registerObj).subscribe((res: any)=>{
      if(res.result) {
        alert("Login Success");
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData =  res.data;
        this.closeLogin();
      } else {
        alert(res.message)
      }
    })
  }
  
}
