import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, IPassenger, ResponseMOodel } from '../models/stations';
import { CONSTANT } from '../constants/constants';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrainsService {

  
  apiEndPoint: string ='';

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.ApiEndPoint;
  }

  getTrainsBetweenStations(serachObj: any) :Observable<ResponseMOodel> {
    return this.http.get<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_TRAINS_BETWEEN_STATIONS+ `?departureStationId=${serachObj.fromStationId}&arrivalStationId=${serachObj.toStationId}&departureDate=${serachObj.dateOfTravel}`)
  }

  
  createPassenger(obj: IPassenger) :Observable<ResponseMOodel> {
    return this.http.post<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.ADD_UPDATE_PASSENGER,obj  )
  }

  login(obj: IPassenger) :Observable<ResponseMOodel> {
    return this.http.post<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.LOGIN,obj  )
  }
  bookTrain(obj: Booking) :Observable<ResponseMOodel> {
    return this.http.post<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.BOOK_TRAIN,obj  )
  }

  getAllTrains() :Observable<ResponseMOodel> {
    return this.http.get<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_TRAINS  )
  }
  getAllBookings(id:number) :Observable<ResponseMOodel> {
    return this.http.get<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_BOOKING_BY_PASSENGER + '?passengerid='+ id )
  }
}
