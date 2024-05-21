import { Injectable, SimpleChanges, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  searchKey = signal<string>('');
 
}
