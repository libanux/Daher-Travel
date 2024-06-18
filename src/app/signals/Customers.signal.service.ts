import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerSignalService {

  constructor() { }

  viewed_customer = signal(1)

}
