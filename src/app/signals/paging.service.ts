import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor() { }

  currentPage = signal(0)
  pageSize = signal(10)
}
