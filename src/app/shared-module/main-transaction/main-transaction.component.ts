import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from '../../service-folder/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-transaction',
  templateUrl: './main-transaction.component.html',
  styleUrl: './main-transaction.component.css'
})
export class MainTransactionComponent implements OnInit{

  @Input() showTitle = false;
  
  transArray = [];
  length = 0;
  showShimmer = true;
  currentPage = 0;

  constructor( private transactionService : PaymentService){ }

  private subscriptions: Subscription[] = [];

ngOnDestroy(): void {
  // Unsubscribe from all subscriptions to prevent memory leaks
  this.subscriptions.forEach(subscription => subscription.unsubscribe());
}

  ngOnInit(): void {
    this.transactionService.GET_PAYMENTS_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.transArray = response.my_Payments.first;
        this.length = response.my_Payments.second;
        // this.pageNumber = Math.ceil(this.length / this.apiService.PAGING_SIZE);
      },
      error: (error) => {this.showShimmer = false;},
      complete: () => {this.showShimmer = false;}
    });
    
  }

}
