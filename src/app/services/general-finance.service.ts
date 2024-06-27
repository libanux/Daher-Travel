import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from 'src/enviroment/enviroment';
import { Observable } from 'rxjs';
import { GeneralFinance } from '../classes/general-finance.class';

@Injectable({ providedIn: 'root' })
export class GeneralFinanceService {

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

    //GET ALL VISA
    GET_ALL_GENERAL_FINANCE(currentPage: number, pageSize: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {
            "page": currentPage,
            "pageSize": pageSize
        }
        return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_GENERAL_FINANCE', requestBody, { headers });
    }

    //UPDATE GENERAL FINANCE
    UPDATE_GENERAL_FINANCE(GeneralFinance: GeneralFinance): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {
            "customerId": GeneralFinance.customerId, // Required: ID of the customer to update
            "customerName": GeneralFinance.customerName,
            "customerPhoneNumber": GeneralFinance.customerPhoneNumber,
            "description": GeneralFinance.description,
            "cost": GeneralFinance.cost,
            "sell": GeneralFinance.sell
        };

        return this.httpClient.post<any>(this.apiUrl + '/DATE_GENERAL_FINANCE_BY_ID', requestBody, { headers });
    }

    //ADD GENERAL FINANCE
    ADD_GENERAL_FINANCE(generalFinance: GeneralFinance): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {
            "customerId": generalFinance.customerId,
            "customerName": generalFinance.customerName,
            "customerPhoneNumber": generalFinance.customerPhoneNumber,
            "description": generalFinance.description,
            "cost": generalFinance.cost,
            "sell":generalFinance.sell
        };
        return this.httpClient.post<any>(this.apiUrl + '/ADD_GENERAL_FINANCE', requestBody, { headers });
    }

    //DELETE GENERAL FINANCE
    DELETE_GENERAL_FINANCE(ID: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = { "id": ID };
        return this.httpClient.post<any>(this.apiUrl + '/DELETE_GENERAL_FINANCE', requestBody, { headers });
    }

    // FILTER FUNCTION BY : SEARCH KEY , STATUS AND DATE
    FILTER_AND_SEARCH_GENERAL_FINANCE(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string, CURRENT_PAGE: number, PAGE_SIZE: number) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {
            "search": SEARCK_KEY,
            "filterType": FILTER_TYPE,
            "startDate": START_DATE,
            "endDate": END_DATE,
            "status": STATUS,
            "page": CURRENT_PAGE,
            "pageSize": PAGE_SIZE
        };
        return this.httpClient.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_GENERAL_FINANCE', requestBody, { headers });
    }


}
