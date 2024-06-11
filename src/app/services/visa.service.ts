import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';


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

  //GET ALL PAYMENTS PER PAGE
  GET_ALL_VISA(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    return this.httpClient.get<any>(this.apiUrl + '/GET_ALL_VISA', { headers });
  }

  //EDIT PAYMENT
  EDIT_VISA(payment: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    // Define the request body
    const requestBody = {
      "PAYMENT_ID": payment.payment_ID,
      "PAYMENT_METHOD": "STRIPE",
      "AMOUNT": payment.amount,
      "TIME_CREATION": payment.time_CREATION,
      "USER_ID": payment.user_ID,
      "ENTRY_USER_ID": payment.entry_USER_ID,
      "ENTRY_DATE": payment.entry_DATE,
      "OWNER_ID": 1
    };

    return this.httpClient.post<any>(this.apiUrl + '/EDIT_PAYMENT', requestBody, { headers });
  }


  //GET PAYMENT BY ID
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

}
