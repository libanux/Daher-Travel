import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public stompClient: Stomp.Client | null = null;
  public msg: string[] = [];
  public socket ?: WebSocket
  token: string =''

  constructor(private general: GeneralService) {
    this.token = this.general.storedToken
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let socketUrl = `https://libanux.xyz/servsmart/websocket?Ticket=Bearer ${this.token}`;
    this.socket = new SockJS(socketUrl);
    this.stompClient = Stomp.over(this.socket!);
    this.stompClient.connect({
      Authorization: "Bearer " + this.general.storedToken
    }, (frame:any) => {
      console.log("connection established: " + frame);
      this.stompClient?.subscribe('/topic/public', (item: Stomp.Message) => {
        let notifications = JSON.parse(item.body);
        console.log(notifications)
      });
      // this.stompClient?.send('/ws/chat.register', { Authorization: authToken });
      // this.scheduleMessages();
    })
  }

  sendMessage(message: any) {
    const exampleParamsEditTranslationOrderFile = {
      TRANSLATION_ORDER_FILE_ID: 12345,
      TYPE: "type1",
      FILE_ID: 67890,
      TRANSLATION_ORDER_ID: 11223,
      USER_ID: 44556,
      COMMENT: "This is a comment.",
      TIME_CREATION: "2024-05-28T14:00:00Z",
      ENTRY_USER_ID: 78901,
      ENTRY_DATE: "2024-05-28",
      OWNER_ID: 5
  };
  var body = JSON.stringify(exampleParamsEditTranslationOrderFile)
    this.stompClient?.send('/ws/chat.register', { Authorization: "Bearer " + this.token }, body);
    if (this.stompClient && this.stompClient.connected) {
      // this.stompClient.send('/chat.register', {}, message);
      this.msg.push(message)
    } else {
      console.error('STOMP client is not connected.');
    }
  }

  private onError(error: string | Stomp.Frame) {
    console.error('Error with STOMP client:', error);
  }
}
