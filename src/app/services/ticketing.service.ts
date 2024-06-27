
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tickets } from '../classes/tickets.class';



@Injectable({
  providedIn: 'root'
})
export class TicketingService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
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

  // GET PACKAGES
  GET_TICKETINGS(pageSize: number, currentPage: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "pageSize": pageSize,
      "page": currentPage
    };

    return this.http.post<any>(`${this.apiUrl}/GET_ALL_TICKETING`, requestBody, { headers });
  }


  // UPDATE TICKETING
  UPDATE_TICKETING(editedTicket: Tickets): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "ticketId": editedTicket._id,
      "name": editedTicket.name,
      "wholesaler": {
        "id": editedTicket.wholesaler.id,
        "name": editedTicket.wholesaler.name
      },
      "source": editedTicket.source,
      "destination": editedTicket.destination,
      "note": editedTicket.note,
      "cost": editedTicket.cost,
      "seats": editedTicket.seats,
      "credit": editedTicket.credit,
      "balance": editedTicket.balance

    };

    return this.http.post<any>(this.apiUrl + '/UPDATE_TICKETING', requestBody, { headers });
  }


  // ADD TICKETING
  ADD_TICKETING(newTicket: Tickets): Observable<any> {
    console.log("The new ticket", newTicket)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "name": newTicket.name,
      "source": newTicket.source,
      "destination": newTicket.destination,
      "note": newTicket.note,
      "cost": newTicket.cost,
      "seats": newTicket.seats,
      "credit": newTicket.credit,
      "balance": newTicket.balance,
      "wholesaler": {
        "id": newTicket.wholesaler.id,
        "name": newTicket.wholesaler.name
      },
    };

    return this.http.post<any>(this.apiUrl + '/ADD_TICKETING', requestBody, { headers })
  }


  // DELETE TICKETING
  DELETE_TICKETING(delTicket: Tickets): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": delTicket._id
    };
    return this.http.post<any>(this.apiUrl + '/DELETE_TICKETING', requestBody, { headers })
  }

  // FILTER TICKETS BY SEARCHKEY
  SEARCH_TICKETS(pageSize: number, currentPage: number, searchkey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "name": searchkey,
      "page": currentPage,
      "pageSize": pageSize
    };
    return this.http.post<any>(this.apiUrl + '/SEARCH_TICKETING_BY_FIELDS', requestBody, { headers })
  }

  // FILTER TICKETS BY DATE
  FILTER_TICKETS_BY_DATE(filterType: string, startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "filterType": filterType,
      "startDate": startDate,
      "endDate": endDate
    };
    return this.http.post<any>(this.apiUrl + '/FILTER_TICKETING_BY_DATE', requestBody, { headers })
  }

  // SEARCH AND FILTER TICKETS
  SEARCH_FILTER_TICKETS(pageSize: number, currentPage: number, searchkey: string, filterType: string, startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "search": searchkey,
      "filterType": filterType,
      "startDate": startDate,
      "endDate": endDate,
      "status": "",
      "page": currentPage,
      "pageSize": pageSize
    };
    console.log("Request body",requestBody)
    return this.http.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_TICKETING', requestBody, { headers })
  }
}