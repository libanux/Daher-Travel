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

//GET ALL PAYMENTS PER PAGE
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

//EDIT PAYMENT
EDIT_PAYMENT(payment: any):Observable<any>{
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`, 
    'Content-Type': 'application/json' // Set content type to JSON
  });

    // Define the request body
  const requestBody = {
    "PAYMENT_ID":payment.payment_ID,
    "PAYMENT_METHOD":"STRIPE",
    "AMOUNT":payment.amount,
    "TIME_CREATION":payment.time_CREATION,
    "USER_ID":payment.user_ID,
    "ENTRY_USER_ID":payment.entry_USER_ID,
    "ENTRY_DATE":payment.entry_DATE,
    "OWNER_ID": 1
  };

  return this.httpClient.post<any>(this.apiUrl + '/EDIT_PAYMENT', requestBody, { headers });
}


   //GET PAYMENT BY ID
   GET_PAYMENT_BY_ID(paymentID: number): Observable<any> {
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

}
