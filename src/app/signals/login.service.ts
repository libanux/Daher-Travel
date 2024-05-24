import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  showSidebar = signal<boolean>(false);
  showHeader = signal<boolean>(false);
  showSearchBar = signal(false);
  constructor() { }
}
