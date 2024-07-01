import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment.prod';



@Injectable({
  providedIn: 'root'
})
export class LaborRecReportsService {

  private apiUrl = '';

  constructor(private http: HttpClient,) {
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

    // GET ALL RECRUITING RECORDS
    GET_RECRUITING_FINANCIAL_REPORT(filtertype:string, startDate:string, endDate:string): Observable<any> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        });
    
        const requestBody = {
            "filterType": filtertype,
            "startDate": startDate,
            "endDate": endDate
        };
    
        return this.http.post<any>(`${this.apiUrl}/GET_RECRUITING_FINANCIAL_REPORT`, requestBody, { headers });
      }
}