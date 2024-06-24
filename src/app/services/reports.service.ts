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
  private storedToken = '';

  constructor(private httpClient: HttpClient, private generalService: GeneralService) {
    this.apiUrl = environment.apiLocalBaseUrl;
    this.storedToken = this.generalService.storedToken
  }

  //GET ALL REPORTS
  GET_ALL_FINANCIAL_REPORT(FILTER_TYPE: string, START_DATE: string, END_DATE: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.storedToken}`,
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
