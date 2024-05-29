import { Component, OnInit, signal } from '@angular/core';
import { ChatService } from '../../service-folder/chat.service';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})
export class ChattingComponent implements OnInit {
  // two inputs : either message or file 
  message: string = '';
  fileID: number = 0;
  TRANSLATION_ID  = signal(0);
  FILE_NAME? = "Type your message here!"

  msgArray: string[] = []
  uploadedFiles: File[] = [];
  userId: any = 0

  constructor(private translationSignal: TranslationSignalService ,private generalService:GeneralService, private translationService: TranslationService, private chatService: ChatService) {
    this.userId = this.generalService.userId
  }

  ngOnInit(): void {
    this.msgArray = this.chatService.msg;
    this.TRANSLATION_ID = this.translationSignal.selected_Translation_ID

  }

  sendMessage() {
    console.log('message is: ',this.message)
    console.log('fileID is: ',this.fileID)
    console.log('Translation ID is: ',this.TRANSLATION_ID());

    this.chatService.SEND_MESSAGE(this.message, this.fileID, this.userId, this.TRANSLATION_ID());
    this.message = '';
    this.FILE_NAME = "Type your message here!"

  }

  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files ? inputElement.files[0] : null;
    const file: File = event.target.files[0];
    const files: FileList = event.target.files;

    this.ADD_FILE(selectedFile);
    this.FILE_NAME = selectedFile?.name

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }

  }

  onCommentChange(event: any) {
    console.log(event)
  }

  All_Files_Array: any[] = [];
  SAVE_CHANGES() {
    this.translationService.EDIT_TRANSLATION_ORDER_FILE_LIST(this.All_Files_Array, this.userId, this.TRANSLATION_ID()).subscribe({
      next: (response: any) => { console.log('save changes ', response); },
      error: (error: any) => { console.error(error) },
      complete: () => {
        // Clear the uploadedFiles array
        this.uploadedFiles = [];
      }
    });
  }

  file_added: any = { id: 0, comment: '' };
  ADD_FILE(files: any) {
    this.translationService.EDIT_TRANSLATION_FILE(files, this.userId).subscribe({
      next: (response: any) => {
        this.fileID = response.my_FILE.file_ID
        this.file_added = {
          id: response.my_FILE.file_ID,
          comment: response.my_FILE.comment
        };
        console.log(this.file_added);
      },
      error: (error: any) => { console.error(error) },

      complete: () => {
        this.All_Files_Array.push(this.file_added);
        console.log('completed ', this.All_Files_Array);
        this.SAVE_CHANGES();
      }
    });
  }
}
