import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {

  @Input() showDropdowns = true;
  status: string = "ACCEPTED"

  dropTitle1: string = 'Timeframe';
  dropTitle2: string = 'People';
  dropTitle3: string = 'Time';
  dropOptions1: string[] = ["Option1", "Option2", "Option3"];
  dropOptions2: string[] = ["Option1", "Option2", "Option3"];
  dropOptions3: string[] = ["Option1", "Option2", "Option3"];

 transactionArray = [
    { id: 1, paymentMethod: 'Credit Card', amount: 100, datetimeOfCreation: '2024-04-16T10:00:00Z', userId: 1 },
    { id: 2, paymentMethod: 'PayPal', amount: 80, datetimeOfCreation: '2024-04-16T11:00:00Z', userId: 2 },
    { id: 3, paymentMethod: 'Debit Card', amount: 120, datetimeOfCreation: '2024-04-16T12:00:00Z', userId: 3 },
    { id: 4, paymentMethod: 'Credit Card', amount: 90, datetimeOfCreation: '2024-04-16T13:00:00Z', userId: 4 },
    { id: 5, paymentMethod: 'PayPal', amount: 110, datetimeOfCreation: '2024-04-16T14:00:00Z', userId: 5 }
  ];
  

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {

  }

  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}

