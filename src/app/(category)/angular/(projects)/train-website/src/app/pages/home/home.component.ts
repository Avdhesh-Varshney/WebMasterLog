import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { Istations, ResponseMOodel } from '../../models/stations';
import { CommonModule} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  stationList :Istations[] = [];
  travelObj: any = {
    fromStationId:'',
    toStationId:'',
    dateOfTravel:''
  } 

  constructor(private stationService: StationsService, private router :Router){
    
  }

  ngOnInit(): void {
      this.loadStations();
  }
  loadStations(){
    this.stationService.getAllStations().subscribe((result: ResponseMOodel) =>{
      this.stationList = result.data;
    },error =>{
      alert("Error Occurred" + JSON.stringify(error));
    }
  )
  }

  onSearch() {
    this.router.navigate(['/search',this.travelObj.fromStationId,this.travelObj.toStationId,this.travelObj.dateOfTravel])
  }
}
