import { Component, OnInit, signal, effect } from '@angular/core';
import { ChatService } from '../../service-folder/chat.service';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';
import { ChatSignalService } from '../../signals/chat-signal.service';
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})
export class ChattingComponent implements OnInit {
  // two inputs : either message or file 
  message: string = '';
  FILE_ID: number = 0;
  FILE_NAME? = "Type your message here!"

  // signals
  TRANSLATION_ID  = signal(0);
  NEW_ARRAY = signal([]);

  Files_Array: any [] = []
  uploadedFiles: File[] = [];
  userId: any = 0

  constructor(private chatSignal : ChatSignalService ,private translationSignal: TranslationSignalService ,private generalService:GeneralService, private translationService: TranslationService, private chatService: ChatService) {
    this.userId = this.generalService.userId;

    effect(()=>{
      // console.log('a chat was sent ', this.NEW_ARRAY());
      this.Files_Array = this.NEW_ARRAY();
    });
  }

ngOnInit(): void {
    this.TRANSLATION_ID = this.translationSignal.selected_Translation_ID
    this.NEW_ARRAY = this.chatSignal.NEW_ARRAY
    this.GET_FILES_ARRAY();
}

OPEN_FILE(file_ID: number) {
    this.translationService.GET_FILE_BY_FILE_ID(file_ID).subscribe({
      next: (response: any) => {
        console.log(response.my_File.file_URL)
         window.open(response.my_File.file_URL, '_blank');
    },
      error: (error: any) => { console.error(error);},
      complete: ()=> { }

    });

}

SEND_MESSAGE() {

    if(this.FILE_NAME != "Type your message here!")
      {
         this.SAVE_CHANGES();
       }

    else if(this.message!=''){
      this.file_added = {
        id: null,
        comment: this.message
      };
      this.SAVE_CHANGES(); 
    }

    else( console.error('empty message')  )

}

onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.files)
    const selectedFile = inputElement.files ? inputElement.files[0] : null;
    const file: File = event.target.files[0];
    const files: FileList = event.target.files;

    this.ADD_FILE(selectedFile);
    this.FILE_NAME = selectedFile?.name

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
}

All_Files_Array: any[] = [];
SAVE_CHANGES() {
    this.All_Files_Array.push(this.file_added);
    this.translationService.EDIT_TRANSLATION_ORDER_FILE_LIST(this.All_Files_Array, this.userId, this.TRANSLATION_ID()).subscribe({
  next: (response: any) => { },
  error: (error: any) => { console.error(error) },
  complete: () => {
    this.All_Files_Array = [];
    this.message = '';
    this.FILE_NAME = "Type your message here!";
    this.chatService.SEND_MESSAGE(this.message, this.FILE_ID, this.userId, this.TRANSLATION_ID());
  }
    });
}

file_added: any = { id: 0, comment: '' };
ADD_FILE(files: any) {
    this.translationService.EDIT_TRANSLATION_FILE(files, this.userId).subscribe({
      next: (response: any) => {
        this.FILE_ID = response.my_FILE.file_ID
        this.file_added = {
          id: response.my_FILE.file_ID,
          comment: response.my_FILE.comment
        };
      },
      error: (error: any) => { 
      console.error(error);       
      this.FILE_NAME = "Type your message here!" },
      complete: () => {this.uploadedFiles = [];}
  });
}

GET_FILES_ARRAY() {
  this.translationService.GET_FILES_TRANSLATION_BY_ID(this.TRANSLATION_ID()).subscribe({
    next : (response: any) => {this.Files_Array = response.my_Translation_ORDER_FILES.filter((file: any) => file.type === 'RES');   },
    error: (error) => {console.error(error)},
    complete: () => {}
  });
}
  
}
