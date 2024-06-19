import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { Istations, ResponseMOodel } from '../../models/stations';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  stationList :Istations[] = [];

  constructor(private stationService: StationsService){
    
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
}
