import { Component, OnInit, signal } from '@angular/core';
import { TranslationService } from '../../service-folder/translation.service';
import { ViewedObjectService } from '../../signals/viewed-object.service';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit{

  selected_Translation =  signal(0);
  translation_ID = 0;
  user_Info : any = {}

  constructor(private viewedObj_Service : ViewedObjectService, private translationService : TranslationService) { }

ngOnInit(): void {

  this.selected_Translation = this.viewedObj_Service.selected_Translation

  this.translationService.GET_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {this.user_Info = response.my_TRANSLATION_ORDER.my_USER;},
    error: (error) => {console.error(error)},
    complete: () => {}
  });
  
}
}
