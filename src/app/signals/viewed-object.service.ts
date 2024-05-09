import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewedObjectService {

  selected_Translation =  signal(0);

  constructor() { }
}
