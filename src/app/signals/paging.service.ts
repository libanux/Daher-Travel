import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor() { }

  currentPage = signal(1)
  pageSize = signal(10)
}
