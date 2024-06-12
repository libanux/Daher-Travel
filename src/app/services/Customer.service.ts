import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';
import { CustomerClass } from '../classes/customer.class';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

  //GET ALL CUSTOMER
  GET_ALL_CUSTOMER(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    return this.httpClient.get<any>(this.apiUrl + '/GET_ALL_CUSTOMER', { headers });
  }

  //UPDATE CUSTOMER
UPDATE_CUSTOMER(CUSTOMER: CustomerClass): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`,
    'Content-Type': 'application/json' 
  });

    const requestBody = {
    "id": CUSTOMER._id,
  };

  return this.httpClient.post<any>(this.apiUrl + '/UPDATE_CUSTOMER', requestBody, { headers });
}

  //ADD CUSTOMER
ADD_CUSTOMER(CUSTOMER: CustomerClass): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    // Define the request body
    const requestBody = {
    //   "name": CUSTOMER.name,
    //   "source": CUSTOMER.source,
    //   "destination": CUSTOMER.destination,
    //   "sell": CUSTOMER.sell,
    //   "note": CUSTOMER.note,
    //   "status": CUSTOMER.status,
    //   "type":CUSTOMER.type,
    //   "price": CUSTOMER.price
    };

    return this.httpClient.post<any>(this.apiUrl + '/ADD_CUSTOMER', requestBody, { headers });
}

//DELETE CUSTOMER
DELETE_CUSTOMER(ID: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`,
    'Content-Type': 'application/json' 
  });

  const requestBody = { "id": ID  };

   return this.httpClient.post<any>(this.apiUrl + '/DELETE_CUSTOMER', requestBody, { headers });
}

  //GET CUSTOMER BY ID
  GET_CUSTOMER_BY_ID(paymentID: number): Observable<any> {
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
