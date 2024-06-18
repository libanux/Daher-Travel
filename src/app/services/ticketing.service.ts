
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroment';
import { DateSelectedSignal } from '../signals/DateSelectedSignal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tickets } from '../pages/apps/tickets/tickets';
import { V } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class TicketingService {
  private apiUrl = '';

  constructor(private http: HttpClient, private dateSignal: DateSelectedSignal,) {
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
      "id": editedTicket._id,
      "updateData": {
        "name": editedTicket.name,
        "destination": editedTicket.destination,
        "source": editedTicket.source,
        "note": editedTicket.note
      }

    };
    return this.http.post<any>(this.apiUrl + '/UPDATE_TICKETING', requestBody, { headers })
  }


  // ADD TICKETING
  ADD_TICKETING(newTicket: Tickets): Observable<any> {
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
      "credit": newTicket.credit,
      "balance": newTicket.balance,
      "wholesaler": {
        "id": "6671874cd0f3f073ad99ba0e",
        "name": "Example Wholesaler"
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
}