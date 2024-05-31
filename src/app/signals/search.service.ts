import { Injectable, SimpleChanges, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }


  ShowSearchBar = signal<boolean>(false);
  ShowAnalytics = signal<boolean>(false);


  UserSearchKey = signal<string>('');
  TranslationSearchKey = signal<string>('');
  TransactionSearchKey = signal<string>('');
  AdminSearchKey = signal<string>('');
  EditAndProofReadingSearchKey = signal<string>('');
}
