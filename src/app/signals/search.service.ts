import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
    effect(() => {
      console.log('Search key at service:', this.searchKey());
    });
   }

  ShowSearchBar = signal<boolean>(false);
  UserSearchKey = signal<string>('');
  TranslationSearchKey = signal<string>('');
  TransactionSearchKey = signal<string>('');
  AdminSearchKey = signal<string>('');
  EditAndProofReadingSearchKey = signal<string>('');

  searchKey=signal<string>('');
}
