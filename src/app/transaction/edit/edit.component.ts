import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../signals/breadcrumb.service';
import { PaymentService } from '../../service-folder/payment.service';
import { Transaction } from '../../classes/Transaction';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  routeCurrently = signal('');
  breadCrumb1 =  signal('');
  breadCrumb1Route =  signal('');
  breadCrumb2 =  signal('');
  BCbeforeLastOneRoute=  signal('');
  BCbeforeLastOne =  signal('');

  selectedPayment: Transaction;
  editedPayment: Transaction;
  paymentId: number =0;
  paymentChanged: boolean = false;
  isEditing : boolean = false;

  constructor(private signalService : BreadcrumbService, private route: ActivatedRoute, private paymentService: PaymentService,private router: Router) { 
    this.selectedPayment = new Transaction();
    this.editedPayment = new Transaction();
  }

ngOnInit(): void {
  this.routeCurrently = this.signalService.routeCurrently
  this.breadCrumb1 = this.signalService.breadCrumb1
  this.breadCrumb1Route = this.signalService.breadCrumb1Route
  this.breadCrumb2 = this.signalService.breadCrumb2
  this.BCbeforeLastOneRoute = this.signalService.BCbeforeLastOneRoute
  this.BCbeforeLastOne = this.signalService.BCbeforeLastOne

  this.routeCurrently.set('Edit Transaction')
  this.breadCrumb1.set(' / Transactions')
  this.breadCrumb1Route.set('/transaction')
  this.breadCrumb2.set(' / Edit Transaction')
  this.BCbeforeLastOneRoute.set('')
  this.BCbeforeLastOne.set('')


  this.route.queryParams.subscribe(params => {
    this.paymentId = params['id'];
  });

  this.paymentService.GET_PAYMENT_BY_ID(this.paymentId).subscribe({
    next: (response: any) => {
      this.selectedPayment = response.my_Payment;
      this.editedPayment = { ...response.my_Payment };
    },
    error: (error: any) => { console.error(error); },
    complete: () => { }
  });

}

//COMPARE SELECTED AND EDITED PAYMENTS
comparePayments(): void {
  this.paymentChanged =
    this.selectedPayment.payment_ID !== this.editedPayment.payment_ID ||
    this.selectedPayment.payment_METHOD !== this.editedPayment.payment_METHOD ||
    this.selectedPayment.amount !== this.editedPayment.amount ||
    this.selectedPayment.time_CREATION !== this.editedPayment.time_CREATION ||
    this.selectedPayment.user_ID !== this.editedPayment.user_ID ||
    this.selectedPayment.entry_USER_ID !== this.editedPayment.entry_USER_ID ||
    this.selectedPayment.entry_DATE !== this.editedPayment.entry_DATE ||
    this.selectedPayment.owner_ID !== this.editedPayment.owner_ID;
}

//EDIT PAYMENT (NOT USED CURRENTLY)
Edit(){
  this.isEditing=true;
    this.paymentService.EDIT_PAYMENT(this.editedPayment).subscribe({
      next: (response: any) => {
        this.isEditing=false;
        this.back();
      },
      error: (error: any) => {
        console.error(error);
        this.isEditing=false;
      },
      complete: () => { }
    });
}

  //GO BACK FUNCTION
  back() {
    this.router.navigate(['/transaction']);
  }

}
