import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewedObjectService {

  selected_Translation_ID =  signal(0);

  constructor() { }
}
