import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalService {

  chatSent = signal<number>(0)

  constructor() { 
    effect(()=>{
      console.log('a chat was sent ', this.chatSent())
    });
  }
}
