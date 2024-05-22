import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  DropDown1 = signal<string>('');
  DropDown2 = signal<string>('');
  DropDown3 = signal<string>('');
}
