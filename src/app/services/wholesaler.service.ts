import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';
import { CustomerClass } from '../classes/customer.class';
import { WholesalerClass } from '../classes/wholesaler.class';


@Injectable({
  providedIn: 'root'
})
export class WholesalerService {

  private apiUrl = '';
  private pagingSize = 10;
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
    this.storedToken = this.generalService.storedToken
  }

  //GET ALL WHOLESALERS
  GET_ALL_WHOLESALERS(currentPage: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    const requestBody = {
      "page": currentPage,
      "pageSize": this.pagingSize
    }

    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_WHOLESALERS', requestBody, { headers });
  }

  //UPDATE CUSTOMER
UPDATE_CUSTOMER(CUSTOMER: CustomerClass): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.storedToken}`,
    'Content-Type': 'application/json' 
  });

  console.log(CUSTOMER)

    const requestBody = {
      id: CUSTOMER._id,
      "updateData": {
        name: CUSTOMER.name,
        address: CUSTOMER.address
      }
    };
    
  return this.httpClient.post<any>(this.apiUrl + '/UPDATE_CUSTOMER', requestBody, { headers });
}

  //ADD WHOLESALER
ADD_WHOLESALER(WHOLESALER: WholesalerClass): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
      'Content-Type': 'application/json' 
    });

    // Define the request body
    const requestBody = {
      "name": WHOLESALER.name,
      "phoneNumber": WHOLESALER.phoneNumber,
      "address": WHOLESALER.address,
      'comapny':WHOLESALER.company,
      'email':WHOLESALER.email
    };
    
    return this.httpClient.post<any>(this.apiUrl + '/ADD_WHOLESALER', requestBody, { headers });
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
