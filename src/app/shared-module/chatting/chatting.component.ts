import { Component } from '@angular/core';
import { ChatService } from '../../service-folder/chat.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})
export class ChattingComponent {
  message: string =""
    constructor(private chat: ChatService){ }
  
    ngOnInit() {
      this.chat.messages?.subscribe(msg => {
        console.log(msg);
      })
    }
  
    sendMessage() {
      this.chat.sendMsg(this.message);
    }
}
