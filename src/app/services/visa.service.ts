import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';
import { VisaClass } from '../pages/apps/visa-component/visaClass';


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
  GET_ALL_VISA(currentPage: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "page": currentPage,
      "pageSize": this.pagingSize
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
        "name": VISA.name,
        "country": VISA.country,
        "note": VISA.note,
        "sell": VISA.sell,
        "status": VISA.status,
        "type": VISA.type,
        "createdAt": VISA.createdAt,
        "updatedAt": VISA.updatedAt
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
      "name": VISA.name,
      "country": VISA.country,
      "note": VISA.note,
      "sell": VISA.sell,
      "status": VISA.status,
      "type": VISA.type,
      "createdAt": VISA.createdAt,
      "updatedAt": VISA.updatedAt
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

  //GET VISA BY ID
  GET_VISA_BY_ID(paymentID: number): Observable<any> {
    const jwt = this.generalService.storedToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      PAYMENT_ID: paymentID
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_PAYMENT_BY_PAYMENT_ID_ADV', requestBody, { headers });
  }

  FILTER_VISA_BY_DATE(filterType: string): Observable<any> {
    const jwt = this.generalService.storedToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      filterType: filterType,
      startDate: '',
      endDate: ''
    };
    return this.httpClient.post<any>(this.apiUrl + '/FILTER_VISA_BY_DATE', requestBody, { headers });
  }

  FILTER_VISA_BY_STATUS(status: string, currentPage: number): Observable<any> {
    const jwt = this.generalService.storedToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      status: status,
      page: currentPage,
      pageSize: 10
    };
    return this.httpClient.post<any>(this.apiUrl + '/FILTER_VISA_BY_STATUS', requestBody, { headers });
  }

  FILTER_VISA_BY_SEARCH_KEY(SEARCK_KEY: string): Observable<any> {
    const jwt = this.generalService.storedToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      name: SEARCK_KEY,
      page: 1,
      pageSize: 10
    };
    return this.httpClient.post<any>(this.apiUrl + '/SEARCH_VISA_BY_FIELDS', requestBody, { headers });
  }
}
