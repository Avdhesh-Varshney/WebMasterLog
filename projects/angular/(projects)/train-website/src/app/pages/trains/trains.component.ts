import { Component } from '@angular/core';
import { TrainsService } from '../../services/trains.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trains',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.css'
})
export class TrainsComponent {
  trainList: any []= [];
  constructor(private trainSrv: TrainsService){
      this.getAllTrains();
  }
  getAllTrains() {
    this.trainSrv.getAllTrains().subscribe((res:any)=>{
      this.trainList =  res.data;
    })
  }
}
