import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbSignalService {

  constructor() { }

  currentRoute = signal<string>('');
  previousRoute = signal<string>('')
}
