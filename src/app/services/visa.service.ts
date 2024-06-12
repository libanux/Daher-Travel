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
  GET_ALL_VISA(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    return this.httpClient.get<any>(this.apiUrl + '/GET_ALL_VISA', { headers });
  }

  //UPDATE VISA
  UPDATE_VISA(VISA: VisaClass): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    // Define the request body
    const requestBody = {
    "id": VISA._id,

    "updateData":{ 
        "name": VISA.name,
        "source": VISA.source,
        "destination": VISA.destination,
        "sell": VISA.sell,
        "note": VISA.note,
        "status": VISA.status,
        "type":VISA.type,
        "price": VISA.price
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
      "source": VISA.source,
      "destination": VISA.destination,
      "sell": VISA.sell,
      "note": VISA.note,
      "status": VISA.status,
      "type":VISA.type,
      "price": VISA.price
    };

    return this.httpClient.post<any>(this.apiUrl + '/ADD_VISA', requestBody, { headers });
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

}
