import { Component, OnInit, signal } from '@angular/core';
import { TranslationService } from '../../service-folder/translation.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';
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

  constructor(private translationSignal : TranslationSignalService, private translationService : TranslationService) { }

ngOnInit(): void {

  this.selected_Translation = this.translationSignal.selected_Translation_ID

  this.translationService.GET_PAYMENT_TRANSLATION_BY_ID(this.selected_Translation()).subscribe({
    next : (response: any) => {this.payment_Info = response.my_Payment[0];},
    error: (error) => {console.error(error)},
    complete: () => {}
  });
  
}
}