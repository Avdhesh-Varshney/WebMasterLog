import { Component, OnInit } from '@angular/core';
import { Booking, ISearchTrain, Istations, ResponseMOodel, TrainAppBookingPassengers } from '../../models/stations';
import { ActivatedRoute } from '@angular/router';
import { StationsService } from '../../services/stations.service';
import { TrainsService } from '../../services/trains.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchObj: any = {
    fromStationId: '',
    toStationId: '',
    dateOfTravel: ''
  }
  stationList: Istations[] = [];
  trainsList: ISearchTrain[] = [];

  bokingObj: Booking = new Booking();
  bookingPassengers: TrainAppBookingPassengers = new TrainAppBookingPassengers();

  loggedUserData: any;
  constructor(private activactedRoute: ActivatedRoute, private stationSrv: StationsService, private trainSrv: TrainsService
  ) {
    this.activactedRoute.params.subscribe((paramObj: any) => {
      debugger;
      this.searchObj.fromStationId = paramObj.fromStationId;
      this.searchObj.toStationId = paramObj.toStationId;
      this.searchObj.dateOfTravel = paramObj.dateOfTravel;
      this.bokingObj.travelDate = this.searchObj.dateOfTravel
      this.getAllTrains();
    })
    const localData = localStorage.getItem('trainUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.bokingObj.passengerId = this.loggedUserData.passengerID;

    }
  }
  ngOnInit(): void {
    this.loadStations();
  }
  AddPassenger() {
    const data = JSON.stringify(this.bookingPassengers);
    const paserData = JSON.parse(data)

    this.bokingObj.TrainAppBookingPassengers.push(paserData);
  }
  onRemove(index: number) {
    this.bokingObj.TrainAppBookingPassengers.splice(index, 1)
  }

  openBooking(trainId: number) {
    this.bokingObj.trainId = trainId;
    const model = document.getElementById('bookmodel');
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeBooking() {
    const model = document.getElementById('bookmodel');
    if (model != null) {
      model.style.display = 'none'
    }
  }
  loadStations() {
    this.stationSrv.getAllStations().subscribe((res: ResponseMOodel) => {
      this.stationList = res.data;
    }, error => {
      alert("Error Occoured" + JSON.stringify(error))
    })
  }

  getAllTrains() {
    this.trainSrv.getTrainsBetweenStations(this.searchObj).subscribe((result: ResponseMOodel) => {
      this.trainsList = result.data;
    }, error => {
      alert("Error Occoured" + JSON.stringify(error))
    })
  }
  BookTicket() {
    this.bokingObj.bookingDate = new Date();
    this.bokingObj.totalSeats = this.bokingObj.TrainAppBookingPassengers.length;

    this.trainSrv.bookTrain(this.bokingObj).subscribe((result: ResponseMOodel) => {
      if (result.result) {
        alert('Booking Done Success')
      } else {
        alert(result.message)
      }
    }, error => {
      alert("Error Occoured" + JSON.stringify(error))
    })
  }
}