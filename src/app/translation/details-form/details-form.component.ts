import { Component, OnChanges, OnInit, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';
@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {

  selected_Translation =  signal(0);
  translation_ID = 0;

  FileArray : any [] =[]
  translation_Info : any = {}

  constructor(private translationSignal : TranslationSignalService, private translationService : TranslationService, private route: ActivatedRoute) {}

ngOnInit(): void {
this.selected_Translation = this.translationSignal.selected_Translation_ID
this.GET_TRANSLATION_BY_ID()
}

GET_TRANSLATION_BY_ID(){
  this.translationService.GET_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {this.translation_Info = response.my_TRANSLATION_ORDER;},
    error: (error) => {console.error(error)},
    complete: () => {this.GET_FILES_ARRAY()}
  });
}

GET_FILES_ARRAY(){
  this.translationService.GET_FILES_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {
      this.FileArray = response.my_Translation_ORDER_FILES.filter((file: any) => file.type === 'REQ');

      // for(let i = 0; i < response.my_Translation_ORDER_FILES.length ; i++){
      //   if( response.my_Translation_ORDER_FILES[i].type == 'REQ'){
      //     this.FileArray.push( response.my_Translation_ORDER_FILES[i])
      //   }
      // }
      },
    error: (error) => {console.error(error)},
    complete: () => {}
  });
}

DELETE_FILE(ID: number){
  this.translationService.DELETE_FILE_BY_TRANSLATION_ORDER_FILE_ID(ID).subscribe({
    next : (response: any) => {},
    error: (error) => {console.error(error)},
    complete: () => {this.GET_FILES_ARRAY()}
  });
}


}
