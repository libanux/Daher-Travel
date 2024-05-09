import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { TranslationService } from '../../service-folder/translation.service';
import { ViewedObjectService } from '../../signals/viewed-object.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit{

  selected_Translation =  signal(0);
  translation_ID = 0;

  FileArray : any [] =[]
  file_Info : any = {}

  constructor(private viewedObj_Service : ViewedObjectService, private signalService : BreadcrumbService, private translationService : TranslationService, private route: ActivatedRoute) { }

ngOnInit(): void {

  this.selected_Translation = this.viewedObj_Service.selected_Translation

  this.translationService.GET_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {this.file_Info = response.my_TRANSLATION_ORDER},
    error: (error) => {console.log(error)},
    complete: () => {}
  });
  
}
}