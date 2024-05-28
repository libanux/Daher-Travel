import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service-folder/chat.service';
import { TranslationService } from '../../service-folder/translation.service';


@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})
export class ChattingComponent implements OnInit {
  input: string = '';
  msgArray: string[] = []
  file?: any
  uploadedFiles: File[] = [];
  userId: any = 0
  fileID: number = 0;

  constructor(private translationService: TranslationService, private chatService: ChatService) {
    this.userId = localStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.msgArray = this.chatService.msg
  }

  sendMessage() {
    this.chatService.sendMessage(this.fileID);
    this.input = '';
  }


  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files ? inputElement.files[0] : null;

    const file: File = event.target.files[0];

    const files: FileList = event.target.files;
    this.ADD_FILE(selectedFile);
    this.file = selectedFile

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }

  }

  onCommentChange(event: any) {
    console.log(event)
  }

  All_Files_Array: any[] = [];
  SAVE_CHANGES() {
    this.translationService.EDIT_TRANSLATION_ORDER_FILE_LIST(this.All_Files_Array, this.userId).subscribe({
      next: (response: any) => { console.log(response); },
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
        console.log('completed ', this.All_Files_Array)
      }
    });
  }
}
