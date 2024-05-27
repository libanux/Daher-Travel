import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  // Our socket connection
  private socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

  constructor() { }

  connect(): Subject<MessageEvent> {
    this.socket = io(environment.ws_url);

    // Create a new Subject
    const subject = new Subject<MessageEvent>();

    // Observable that emits incoming messages from the WebSocket
    const observable = new Observable<MessageEvent>((observer) => {
      this.socket?.on('message', (data: any) => {
        console.log("Received message from WebSocket Server");
        observer.next(data);
      });

      return () => {
        this.socket?.disconnect();
      };
    });

    // Observer that sends messages to the WebSocket
    const observer = {
      next: (data: Object) => {
        this.socket?.emit('message',data);
      },
    };

    // Combine both observer and observable into a single Subject
    subject.subscribe(observer);
    observable.subscribe(subject);

    return subject;
  }

  
}
