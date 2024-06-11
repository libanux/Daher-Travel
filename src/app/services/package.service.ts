import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Package } from '../pages/apps/ticketlist/ticket';
import { DateSelectedSignal } from '../signals/DateSelectedSignal.service';


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = '';

  constructor(private http: HttpClient, private dateSignal: DateSelectedSignal,) {
    this.apiUrl = environment.apiLocalBaseUrl;
  }

  // VALIDATE TOKEN
  isTokenExpired1(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return true;
    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload.exp) return true;
    const expirationTime = payload.exp * 1000;
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  // GET TOKEN FROM LOCAL STORAGE
  getToken(): string | null {
    return localStorage.getItem('TICKET');
  }

  // GET PACKAGES
  GET_PACKAGES(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/GET_ALL_PACKAGES`, { headers });
  }

  // ADD PACKAGE
  ADD_PACKAGE(newPackage: Package): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "name": newPackage.name,
      "destination": newPackage.destination,
      "numberOfPeople": newPackage.numberOfPeople,
      "duration": newPackage.duration,
      "price": newPackage.price,
      "hotels": newPackage.hotels,
      "status": newPackage.status,
      "sell": newPackage.sell,
      "note": newPackage.note
    };
    return this.http.post<any>(this.apiUrl + '/ADD_PACKAGE', requestBody, { headers })
  }

  // UPDATE PACKAGE
  UPDATE_PACKAGE(editedPackage: Package): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": editedPackage._id,
      "updateData": {
        "name": editedPackage.name,
        "destination": editedPackage.destination,
        "numberOfPeople": editedPackage.numberOfPeople,
        "duration": editedPackage.duration,
        "price": editedPackage.price,
        "hotels": editedPackage.hotels,
        "status": editedPackage.status,
        "sell": editedPackage.sell,
        "note": editedPackage.note
      }

    };
    return this.http.post<any>(this.apiUrl + '/UPDATE_PACKAGE', requestBody, { headers })
  }


  // DELETE PACKAGE
  DELETE_PACKAGE(delPackage: Package): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": delPackage._id
    };
    return this.http.post<any>(this.apiUrl + '/DELETE_PACKAGE', requestBody, { headers })
  }


  // FILTER PACKAGE BY DATE
  FILTER_PACKAGE(filterType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "filterType": filterType,
      "startDate": this.dateSignal.startDate(),
      "endDate": this.dateSignal.endDate()
    };
    return this.http.post<any>(this.apiUrl + '/FILTER_PACKAGES_BY_DATE', requestBody, { headers })
  }
}
