import { Component, OnInit, signal } from '@angular/core';
import { TranslationService } from '../../service-folder/translation.service';
import { ViewedObjectService } from '../../signals/viewed-object.service';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit{

  selected_Translation =  signal(0);
  translation_ID = 0;

  FileArray : any [] =[]
  payment_Info : any = {}

  constructor(private viewedObj_Service : ViewedObjectService, private translationService : TranslationService) { }

ngOnInit(): void {

  this.selected_Translation = this.viewedObj_Service.selected_Translation

  this.translationService.GET_PAYMENT_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {this.payment_Info = response.my_Payment[0];},
    error: (error) => {console.error(error)},
    complete: () => {}
  });
  
}
}