import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { LaborList } from '../classes/labor.class';


@Injectable({
  providedIn: 'root'
})
export class LaborRecService {

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
  GET_RECRUITING(page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "pageSize": size,
      "page": page
    };

    return this.http.post<any>(`${this.apiUrl}/GET_ALL_RECRUITING`, requestBody, { headers });
  }

  // ADD RECRUITING RECORD
  ADD_RECRUITING(newRecruiting: LaborList): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "name": newRecruiting.name,
      "nationality": newRecruiting.nationality,
      "gender": newRecruiting.gender,
      "type": newRecruiting.type,
      "age": newRecruiting.age,
      "cost": newRecruiting.cost,
      "status": newRecruiting.status,
      "sell": newRecruiting.sell,
      "note": newRecruiting.note
    };
    return this.http.post<any>(this.apiUrl + '/ADD_RECRUITING', requestBody, { headers })
  }

  // UPDATE RECRUITING RECORD
  UPDATE_RECRUITING(editedRecruitng: LaborList): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "recruitingId": editedRecruitng._id,
      "name": editedRecruitng.name,
      "nationality": editedRecruitng.nationality,
      "gender": editedRecruitng.gender,
      "type": editedRecruitng.type,
      "age": editedRecruitng.age,
      "cost": editedRecruitng.cost,
      "status": editedRecruitng.status,
      "sell": editedRecruitng.sell,
      "note": editedRecruitng.note

    };
    return this.http.post<any>(this.apiUrl + '/UPDATE_RECRUITING', requestBody, { headers })
  }


  // DELETE RECRUITING RECORD
  DELETE_RECRUITING(delRecruiting: LaborList): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "id": delRecruiting._id
    };

    return this.http.post<any>(this.apiUrl + '/DELETE_RECRUITING', requestBody, { headers })
  }
  // SEARCH & FILTER RECRUITING RECORD
  SEARCH_FILTER_RECRUITING(pageSize: number, currentPage: number, searchkey: string, filterType: string, statusValue: string, startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "search": searchkey,
      "filterType": filterType,
      "startDate": startDate,
      "endDate": endDate,
      "status": statusValue,
      "page": 1,
      "pageSize": pageSize
    };


    return this.http.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_RECRUITING', requestBody, { headers })
  }


}
