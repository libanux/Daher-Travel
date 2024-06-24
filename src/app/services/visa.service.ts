import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';
import { VisaClass } from '../classes/visaClass';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

  //GET ALL VISA
  GET_ALL_VISA(currentPage: number, pageSize: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
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
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "id": VISA._id,
      "updateData": {
        "customerName": VISA.customer.name,
        "country": VISA.country,
        "phoneNumber":VISA.customer.phoneNumber,
        "note": VISA.note,
        "sell": VISA.sell,
        "status": VISA.status,
        "type": VISA.type,
      }   
    };
    

    return this.httpClient.post<any>(this.apiUrl + '/UPDATE_VISA', requestBody, { headers });
  }

  //ADD VISA
  ADD_VISA(VISA: VisaClass): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    // Define the request body
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
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    const requestBody = { "id": ID };

    return this.httpClient.post<any>(this.apiUrl + '/DELETE_VISA', requestBody, { headers });
  }

  FILTER_AND_SEARCH_VISAS(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string, CURRENT_PAGE: number, PAGE_SIZE: number){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
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
