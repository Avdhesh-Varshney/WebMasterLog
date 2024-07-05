import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANT } from '../constants/constants';
import { Observable } from 'rxjs';
import { ResponseMOodel } from '../models/stations';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  apiEndPoint:string = '';

  constructor(private http : HttpClient) { 
    this.apiEndPoint = environment.ApiEndPoint;
  }
  getAllStations(): Observable<ResponseMOodel>{
    return this.http.get<ResponseMOodel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_STATION);
  }
}
