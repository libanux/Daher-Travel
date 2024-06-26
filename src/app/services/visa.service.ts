import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment.prod';
import { GeneralService } from './general.service';
import { VisaClass } from '../classes/visaClass';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  private apiUrl = '';

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
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

  //GET ALL VISA
  GET_ALL_VISA(currentPage: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "page": currentPage,
      "pageSize": pageSize
    }
    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_VISA', requestBody, { headers });
  }

  //UPDATE VISA
  UPDATE_VISA(VISA: VisaClass): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "visaId": VISA._id,
      "customerId": VISA.customer.id,
      "customerName": VISA.customer.name,
      "phoneNumber": VISA.customer.phoneNumber,
      "country": VISA.country,
      "type": VISA.type,
      "sell": VISA.sell,
      "status": VISA.status,
      "note": VISA.note,
    };

    return this.httpClient.post<any>(this.apiUrl + '/UPDATE_VISA', requestBody, { headers });
  }

  //ADD VISA
  ADD_VISA(VISA: VisaClass): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "customerId": VISA.customer.id,
      "customerName": VISA.customer.name,
      "phoneNumber": VISA.customer.phoneNumber,
      "country": VISA.country,
      "note": VISA.note,
      "sell": VISA.sell,
      "status": VISA.status,
      "type": VISA.type,
    };  
    return this.httpClient.post<any>(this.apiUrl + '/ADD_VISA', requestBody, { headers });
  }

  //DELETE VISA
  DELETE_VISA(ID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = { "id": ID };
    return this.httpClient.post<any>(this.apiUrl + '/DELETE_VISA', requestBody, { headers });
  }

  // FILTER FUNCTION BY : SEARCH KEY , STATUS AND DATE
  FILTER_AND_SEARCH_VISAS(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string, CURRENT_PAGE: number, PAGE_SIZE: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "search": SEARCK_KEY,
      "filterType": FILTER_TYPE,
      "startDate": START_DATE,
      "endDate": END_DATE,
      "status": STATUS,
      "page": CURRENT_PAGE,
      "pageSize": PAGE_SIZE
    };
    return this.httpClient.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_VISAS', requestBody, { headers });
  }

}
