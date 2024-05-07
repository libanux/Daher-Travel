import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService : GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

// get all users per page  
GET_PAYMENTS_PER_PAGE(page_Number:number):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

let startRow = page_Number * this.pagingSize
let endRow = this.pagingSize + (page_Number * this.pagingSize)

    // Define the request body
  const requestBody = {
    "OWNER_ID": 1,
    "PAYMENT_METHOD": "",
    "START_ROW": startRow,
    "END_ROW": endRow,
    "TOTAL_COUNT": 0
  };

  return this.httpClient.post<any>(this.apiUrl + '/GET_PAYMENT_BY_CRITERIA', requestBody, { headers });
}

EDIT_PAYMENT(payment: any):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

    // Define the request body
  const requestBody = {
    "PAYMENT_ID":payment.PAYMENT_ID,
    "PAYMENT_METHOD": "STRIPE",
    "AMOUNT":payment.AMOUNT,
    "TIME_CREATION":payment.TIME_CREATION,
    "USER_ID":payment.USER_ID,
    "ENTRY_USER_ID":payment.ENTRY_USER_ID,
    "ENTRY_DATE":payment.ENTRY_DATE,
    "OWNER_ID": 1
  };

  return this.httpClient.post<any>(this.apiUrl + '/EDIT_PAYMENT', requestBody, { headers });
}

}
