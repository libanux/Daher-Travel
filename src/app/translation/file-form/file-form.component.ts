import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../service-folder/translation.service';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent{
  uploadedFiles: File[] = [];
  file_added: any = {};
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

  All_Files_Array: any [] = [];
  SAVE_CHANGES(){

  }

  ADD_FILE(files: any){
    this.translationService.EDIT_TRANSLATION_FILE(files, this.userId).subscribe({
      next : (response: any) => {console.log(response)},
      error: (error:any) => {console.log(error)},
      complete: () => {}
    });
  }

  SAVE_ALL_FILES(files:any [], userID: any){
    this.translationService.EDIT_TRANSLATION_ORDER_FILE_LIST(files, userID).subscribe({
      next : (response: any) => {console.log(response)},
      error: (error:any) => {console.log(error)},
      complete: () => {}
    });
  }
}