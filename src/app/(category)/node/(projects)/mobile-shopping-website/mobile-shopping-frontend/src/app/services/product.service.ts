import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:5001/api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getProductById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
}