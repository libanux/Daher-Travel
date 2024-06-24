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

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.pagingSize = this.generalService.PageSizing;
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

  //GET ALL WHOLESALERS
  GET_ALL_WHOLESALERS(currentPage: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json' 
    });

    const requestBody = {
      "page": currentPage,
      "pageSize": this.pagingSize
    }

    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_WHOLESALERS', requestBody, { headers });
  }

  //GET ALL WHOLESALERS WITH NO PAGING
  GET_ALL_WHOLESALERS_WITH_NO_PAGING(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json' 
    });

    const requestBody = {

    }

    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_WHOLESALERS_WITH_NO_PAGING', requestBody, { headers });
  }

  //UPDATE WHOLESALER
UPDATE_WHOLESALER(WHOLESALER: WholesalerClass): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`,
    'Content-Type': 'application/json' 
  });

    const requestBody = {
      id: WHOLESALER._id,
      "updateData": {
        name: WHOLESALER.name,
        address: WHOLESALER.address,
        company: WHOLESALER.company,
        phoneNumber: WHOLESALER.phoneNumber,
        email: WHOLESALER.email
      }
    };
    
  return this.httpClient.post<any>(this.apiUrl + '/UPDATE_WHOLESALER', requestBody, { headers });
}

  //ADD WHOLESALER
ADD_WHOLESALER(WHOLESALER: WholesalerClass): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
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
    console.log("Request",requestBody)
    
    return this.httpClient.post<any>(this.apiUrl + '/ADD_WHOLESALER', requestBody, { headers });
}

//DELETE DELETE_WHOLESALER
DELETE_WHOLESALER(ID: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`,
    'Content-Type': 'application/json' 
  });

  const requestBody = { "id": ID  };

   return this.httpClient.post<any>(this.apiUrl + '/DELETE_WHOLESALER', requestBody, { headers });
}

  //GET CUSTOMER BY ID
  GET_WHOLESALER_BY_ID(ID: string): Observable<any> {
    const jwt = this.generalService.storedToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      id: ID
    };
    return this.httpClient.post<any>(this.apiUrl + '/GET_WHOLESALER_BY_ID', requestBody, { headers });
  }

     // FILTER PACKAGE BY DATE
 SEARCH_WHOLESALER(pageSize:number, currentPage: number,searchkey:string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`,
    'Content-Type': 'application/json'
  });
  const requestBody = {
    "search": searchkey,
    "filterType": "",
    "startDate": "",
    "endDate": "",
    "page": currentPage,
    "pageSize":pageSize
  };
  return this.httpClient.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_WHOLESALERS', requestBody, { headers })
}

}
