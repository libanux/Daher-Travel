import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '';


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiLocalBaseUrl
  }


  //VALIDATE TOKEN
  isTokenExpired1(): boolean {
    const token = this.getToken();
    if (!token) return true; // Token doesn't exist or is invalid
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return true; // Invalid token format
    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload.exp) return true; // Expiration time not found in payload
    const expirationTime = payload.exp * 1000;
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  //GET TOKEN FROM LOCAL STORAGE
  getToken(): string | null { // Adjusting return type to allow null
    return localStorage.getItem('TICKET');
  }


  //LOGIN FUNCTION
  authenticate(params: Params_Authenticate): Observable<any> {
    const url = `${this.apiUrl}/AUTHENTICATE`;
    return this.http.post<any>(url, params);
  }
}


export class Params_Authenticate {
  EMAIL?: string;
  PASSWORD?: string;
}
