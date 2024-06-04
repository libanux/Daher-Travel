import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  // two inputs : either message or file 
  message: string = '';
  FILE_ID: number = 0;
  FILE_NAME? = "Type your message here!"

  Files_Array: any [] = []
  uploadedFiles: File[] = [];
  userId: any = 0
  isLoading: boolean = false;;
  constructor() {
    
  }

ngOnInit(): void {
 
}

OPEN_FILE(file_ID: number) {
   

}

SEND_MESSAGE() {

}

  //LOGIN WHEN CLICK ENTER KEY
  handleKeydown(event: KeyboardEvent) {

  }

  uploadProgress: number=0;

onFileChange(event: any) {

}

All_Files_Array: any[] = [];
SAVE_CHANGES() {
  
}

file_added: any = { id: 0, comment: '' };
ADD_FILE(files: any) {
 
}

GET_FILES_ARRAY() {

}
  
}
