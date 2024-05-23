import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../service-folder/general.service';
import { PaymentService } from '../../service-folder/payment.service';
@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {
 
  @Output() currentPageChoosen = new EventEmitter<number>();
  @Input() showDropdowns = true;
  @Input() showTitle = true;
  
  status: string = "ACCEPTED"
  transArray: any [] = [];
  ArrayLength = 0;

  showShimmer = true;
  currentPage = 0;
  showPaging = true;
  
  constructor(private router:Router, private apiService : GeneralService, private transactionService : PaymentService){ }

  ngOnInit() {
    this.FETCH_TRANSACTION(0)
  }

  receivePageSize($event: any) {
    this.currentPage = $event;
    this.currentPageChoosen.emit(this.currentPage)
    this.FETCH_TRANSACTION(this.currentPage)
  }


  FETCH_TRANSACTION(pageNumber: number): void {
    this.transactionService.GET_PAYMENTS_PER_PAGE(this.currentPage).subscribe({
      next: (response: any) => {
        this.transArray = response.my_Payments.first;
        this.ArrayLength = Math.ceil(response.my_Payments.second / this.apiService.PageSizing);
        // this.pageNumber = Math.ceil(this.length / this.apiService.PAGING_SIZE);
      },
      error: (error) => {this.showShimmer = false;},
      complete: () => {this.showShimmer = false;}
    });
  }
  
  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}

