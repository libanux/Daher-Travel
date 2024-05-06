import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  PageSizing = 10;
  storedToken = localStorage.getItem('TICKET') || ''; // Assign value to storedToken

  constructor() { }
}
