import { Injectable, SimpleChanges, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  UserSearchKey = signal<string>('');
  TranslationSearchKey = signal<string>('');
  TransactionSearchKey = signal<string>('');
  AdminSearchKey= signal<string>('');
}
