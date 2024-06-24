import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

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

  //GET ALL REPORTS
  GET_ALL_FINANCIAL_REPORT(FILTER_TYPE: string, START_DATE: string, END_DATE: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
        "filterType":FILTER_TYPE,
        "startDate": START_DATE,
        "endDate": END_DATE
      }
      
    return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_FINANCIAL_REPORT', requestBody, { headers });
  }

}
