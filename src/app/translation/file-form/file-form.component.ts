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
    const file: File = event.target.files[0];
    const files: FileList = event.target.files;
    this.ADD_FILE(file);

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }

  ADD_FILE(files: any){
    this.translationService.EDIT_FILE(files, this.userId).subscribe({
      next : (response: any) => {console.log(response)},
      error: (error) => {console.log(error)},
      complete: () => {}
    });
  }
}