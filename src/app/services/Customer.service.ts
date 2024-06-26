import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment.prod';
import { GeneralService } from './general.service';
import { CustomerClass } from '../classes/customer.class';
import { CustomersRoutes } from '../pages/apps/customers/customers.routing.module';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  //GET ALL CUSTOMER
  GET_ALL_CUSTOMER(currentPage: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "page": currentPage,
      "pageSize": pageSize,
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_CUSTOMERS', requestBody, { headers });
  }

  //GET ALL CUSTOMERS WITH NO PAGING
  GET_ALL_CUSTOMERS_WITH_NO_PAGING(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
    }
    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_CUSTOMERS_WITH_NO_PAGING', requestBody, { headers });
  }

  //UPDATE CUSTOMER
  UPDATE_CUSTOMER(CUSTOMER: CustomerClass): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "customerId": CUSTOMER._id,
      "name": CUSTOMER.name,
      "address": CUSTOMER.address,
      "phoneNumber": CUSTOMER.phoneNumber
    };
    return this.httpClient.post<any>(this.apiUrl + '/UPDATE_CUSTOMER', requestBody, { headers });
  }

  //ADD CUSTOMER
  ADD_CUSTOMER(CUSTOMER: CustomerClass): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "name": CUSTOMER.name,
      "phoneNumber": CUSTOMER.phoneNumber,
      "address": CUSTOMER.address
    };
    return this.httpClient.post<any>(this.apiUrl + '/ADD_CUSTOMER', requestBody, { headers });
  }

  //DELETE CUSTOMER
  DELETE_CUSTOMER(ID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = { "id": ID };
    return this.httpClient.post<any>(this.apiUrl + '/DELETE_CUSTOMER', requestBody, { headers });
  }

  //GET CUSTOMER BY ID
  GET_CUSTOMER_BY_ID(ID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": ID
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_CUSTOMER', requestBody, { headers });
  }

  //SEARCH CUSTOMER
  FILTER_AND_SEARCH_CUSTOMERS(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string, CURRENT_PAGE: number, PAGE_SIZE: number) {
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
    return this.httpClient.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_CUSTOMERS', requestBody, { headers });
  }
}
