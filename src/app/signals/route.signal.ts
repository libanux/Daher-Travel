import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteSignalService {

  constructor() { }

  show_pop_up_route = signal(false)

}
