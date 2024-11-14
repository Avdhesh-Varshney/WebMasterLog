import { Component } from '@angular/core';
import { TrainsService } from '../../services/trains.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  trainList: any []= [];  loggedUserData: any;
  constructor(private trainSrv: TrainsService){
      
      const localData = localStorage.getItem('trainUser');
      if (localData != null) {
        this.loggedUserData = JSON.parse(localData);
        this.getAllTrains();
  
      }
  }
  getAllTrains() {
    this.trainSrv.getAllBookings(this.loggedUserData.passengerID).subscribe((res:any)=>{
      this.trainList =  res.data;
    })
  }
}
