import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { ViewedObjectService } from '../../signals/viewed-object.service';
@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit{

  selected_Translation =  signal(0);
  

  translation_ID = 0;

  FileArray : any [] =[]
  translation_Info : any = {}

  constructor(private viewedObj_Service : ViewedObjectService, private translationService : TranslationService, private route: ActivatedRoute) { }

ngOnInit(): void {

  this.selected_Translation = this.viewedObj_Service.selected_Translation_ID

  this.translationService.GET_FILES_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {
      console.log(response.my_Translation_ORDER_FILES)
      this.FileArray = response.my_Translation_ORDER_FILES;},
    error: (error) => {console.error(error)},
    complete: () => {}
  });

  this.translationService.GET_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {this.translation_Info = response.my_TRANSLATION_ORDER;},
    error: (error) => {console.error(error)},
    complete: () => {}
  });
  
}
}
