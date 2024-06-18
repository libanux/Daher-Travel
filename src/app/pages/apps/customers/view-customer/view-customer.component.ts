import { Component } from '@angular/core';
import { CustomerClass } from 'src/app/classes/customer.class';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss'
})
export class ViewCustomerComponent {
  VIEWED_CUSTOMER: CustomerClass = {
    _id: '',
    name: '',
    phoneNumber: '',
    address: '',
  }

}
