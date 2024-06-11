import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Package } from '../pages/apps/ticketlist/ticket';
import { DateSelectedSignal } from '../signals/DateSelectedSignal.service';
import { LaborList } from '../pages/apps/labor-rec/labor';


@Injectable({
  providedIn: 'root'
})
export class LaborRecService {

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

  // GET ALL RECRUITING RECORDS
  GET_RECRUITING(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/GET_ALL_RECRUITING`, { headers });
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
      "price": newRecruiting.price,
      "status": newRecruiting.status,
      "sell": newRecruiting.sell,
      "note": newRecruiting.note
    };
    return this.http.post<any>(this.apiUrl + '/ADD_RECRUITING', requestBody, { headers })
  }

  // UPDATE PACKAGE
  UPDATE_RECRUITING(editedRecruitng: LaborList): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": editedRecruitng.id,
      "updateData": {
        "name": editedRecruitng.name,
      "nationality": editedRecruitng.nationality,
      "gender": editedRecruitng.gender,
      "type": editedRecruitng.type,
      "age": editedRecruitng.age,
      "price": editedRecruitng.price,
      "status": editedRecruitng.status,
      "sell": editedRecruitng.sell,
      "note": editedRecruitng.note
      }

    };
    return this.http.post<any>(this.apiUrl + '/UPDATE_RECRUITING', requestBody, { headers })
  }


  // DELETE RECRUITING RECORD
  DELETE_RECRUITING(delRecruitinge: LaborList): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    const requestBody = {
      "id": delRecruitinge.id
    };
    return this.http.post<any>(this.apiUrl + '/DELETE_RECRUITING', requestBody, { headers })
  }


//   // FILTER PACKAGE BY DATE
//   FILTER_PACKAGE(filterType: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.getToken()}`,
//       'Content-Type': 'application/json'
//     });
//     const requestBody = {
//       "filterType": filterType,
//       "startDate": this.dateSignal.startDate(),
//       "endDate": this.dateSignal.endDate()
//     };
//     return this.http.post<any>(this.apiUrl + '/FILTER_PACKAGES_BY_DATE', requestBody, { headers })
//   }
}
