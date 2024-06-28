import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from 'src/enviroment/enviroment';
import { Observable } from 'rxjs';
import { GeneralFinance } from '../classes/general-finance.class';
import { GeneralExpense } from '../classes/general-expense.class';

@Injectable({ providedIn: 'root' })
export class GeneralExpenseService {

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

    //GET ALL GENERAL EXPENSE
    GET_ALL_GENERAL_EXPENSES(currentPage: number, pageSize: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {
            "page": currentPage,
            "pageSize": pageSize
        }
        return this.httpClient.post<any>(this.apiUrl + '/GET_ALL_GENERAL_EXPENSES', requestBody, { headers });
    }

    //UPDATE GENERAL EXPENSE
    UPDATE_GENERAL_EXPENSE(GeneralExpense: GeneralExpense): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {
                "expenseId": GeneralExpense._id,
                "updateData": {
                  "description": GeneralExpense.description,
                  "address": "nabaye  Description",
                  "amount": GeneralExpense.amount
              }
        }

        return this.httpClient.post<any>(this.apiUrl + '/UPDATE_GENERAL_EXPENSE_BY_ID', requestBody, { headers });
    }

    //ADD GENERAL EXPENSE
    ADD_GENERAL_EXPENSE(generalExpense: GeneralExpense): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = {

            "description": generalExpense.description,
            "amount": generalExpense.amount
        };
        return this.httpClient.post<any>(this.apiUrl + '/ADD_GENERAL_EXPENSE', requestBody, { headers });
    }

    //DELETE GENERAL EXPENSE
    DELETE_GENERAL_EXPENSE(ID: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
        const requestBody = { "expenseId": ID };
        return this.httpClient.post<any>(this.apiUrl + '/DELETE_GENERAL_EXPENSE_BY_ID', requestBody, { headers });
    }

    // FILTER FUNCTION BY : SEARCH KEY , STATUS AND DATE
    FILTER_AND_SEARCH_GENERAL_EXPENSE(SEARCK_KEY: string, FILTER_TYPE: string, START_DATE: string, END_DATE: string, STATUS: string, CURRENT_PAGE: number, PAGE_SIZE: number) {
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
        return this.httpClient.post<any>(this.apiUrl + '/SEARCH_AND_FILTER_GENERAL_EXPENSES', requestBody, { headers });
    }


}
