import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../service-folder/translation.service';
@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent{
  uploadedFiles: File[] = [];
  userId: any = 0 

  constructor(private translationService : TranslationService) { 
    this.userId = localStorage.getItem('userId')
  }
  
onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files ? inputElement.files[0] : null;

    const file: File = event.target.files[0];

    const files: FileList = event.target.files;
    this.ADD_FILE(selectedFile);

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }     

}

onCommentChange(event: any){
    console.log(event)
}

All_Files_Array: any [] = [];
SAVE_CHANGES(){
    this.translationService.EDIT_TRANSLATION_ORDER_FILE_LIST(this.All_Files_Array, this.userId).subscribe({
      next : (response: any) => {console.log(response);},
      error: (error:any) => {console.error(error)},
      complete: () => { 
        // Clear the uploadedFiles array
        this.uploadedFiles = [];  }
    });
}

file_added: any = { id: 0, comment: '' };
ADD_FILE(files: any){
    this.translationService.EDIT_TRANSLATION_FILE(files, this.userId).subscribe({
      next : (response: any) => {
      this.file_added = {
        id: response.my_FILE.file_ID,
        comment:response.my_FILE.comment
      };
      console.log(this.file_added);
    },
      error: (error:any) => {console.error(error)},

      complete: () => { 
        this.All_Files_Array.push(this.file_added);
        console.log('completed ', this.All_Files_Array)
      }
    });
}

SAVE_ALL_FILES(files:any [], userID: any){
    this.translationService.EDIT_TRANSLATION_ORDER_FILE_LIST(files, userID).subscribe({
      next : (response: any) => {console.log(response)},
      error: (error:any) => {console.error(error)},
      complete: () => {}
    });
}


}