import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalService {

  // chatSent = signal<number>(0)
  NEW_ARRAY = signal<any>([])

  constructor() { }
}
