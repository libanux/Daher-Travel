import { Injectable, signal } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { GeneralService } from './general.service';
import { TranslationSignalService } from '../signals/translation-signal.service';
import { ChatSignalService } from '../signals/chat-signal.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public stompClient: Stomp.Client | null = null;
  public socket ?: WebSocket;
  public token: string =''

  TRANSLATION_ID = signal(0);
  USER_ID = signal(0);

  chatSent = signal(0);

  constructor(private general: GeneralService, private translationSignal : TranslationSignalService, private chatSIGNAL : ChatSignalService) {
    this.token = this.general.storedToken
    this.initializeWebSocketConnection();

    this.TRANSLATION_ID = this.translationSignal.selected_Translation_ID;
    this.USER_ID = this.general.userId;
    this.chatSent = chatSIGNAL.chatSent
  }

  initializeWebSocketConnection() {
    let socketUrl = `https://libanux.xyz/servsmart/websocket?Ticket=Bearer ${this.token}`;
    this.socket = new SockJS(socketUrl);
    this.stompClient = Stomp.over(this.socket!);

    console.log("Here In initializeWebSocketConnection");

    this.stompClient.connect({
      Authorization: "Bearer " + this.general.storedToken
    }, (frame:any) => {
      console.log("connection established: " + frame);

      this.stompClient?.subscribe('/topic/public', (item: Stomp.Message) => {
        let notifications = JSON.parse(item.body);
        // console.log(notifications)
      });

      var topic= `/topic/translationOrder/${this.TRANSLATION_ID()}/user_${this.USER_ID()}/entry_${this.USER_ID()}`;
      
      this.stompClient?.connect({}, (frame) => {
      this.stompClient?.subscribe(topic, function(message) {
        console.log('Message Sent : ', JSON.parse(message.body));
    });

});

      // this.stompClient?.send('/ws/chat.register', { Authorization: authToken });
      // this.scheduleMessages();
    })
  }

SEND_MESSAGE(MESSAGE: string, FILE_ID: number, USER_ID: number, TRANSLATION_ID: any) {

  console.log('message sent : ', MESSAGE)

    const exampleParamsEditTranslationOrderFile = {
      TRANSLATION_ORDER_FILE_ID: -1,
      TYPE: "RES",
      FILE_ID: FILE_ID,
      TRANSLATION_ORDER_ID: TRANSLATION_ID,
      USER_ID: USER_ID,
      COMMENT: MESSAGE,
      TIME_CREATION: "2024-05-28T14:00:00Z",
      ENTRY_USER_ID: USER_ID,
      ENTRY_DATE: "2024-05-28",
      OWNER_ID: 1
  };

  var body = JSON.stringify(exampleParamsEditTranslationOrderFile);
  this.stompClient?.send('/ws/chat.register', { Authorization: "Bearer " + this.token }, body);
   
  if (this.stompClient && this.stompClient.connected) {
      // this.stompClient.send('/chat.register', {}, message);
      this.stompClient?.send('/ws/chat.send', { Authorization: "Bearer " + this.token }, body);
      this.chatSent.set(this.chatSent()+1);
      console.log(this.chatSent())
      
    } else {
      console.error('STOMP client is not connected.');
    }
}


}
