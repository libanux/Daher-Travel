import { Component } from '@angular/core';
import { AccountingRecord, accountingRecords } from '../../classes/AccountingRecord ';

@Component({
  selector: 'app-accounting-table',
  templateUrl: './accounting-table.component.html',
  styleUrl: './accounting-table.component.css'
})
export class AccountingTableComponent {
  showShimmer = true;
  showPaging = true;

  AccountingArray : AccountingRecord [] = []

   ngOnInit(): void {
    this.AccountingArray = accountingRecords;
  }


  // MOVE TO SPECIFIC ROUTE WITH ROW ID
  moveToRouteWithIndex(route: string, id: number) {
    // this.router.navigate([route], { queryParams: { id: id } }).then(() => {
    //   window.scrollTo(0, 0);
    // });
  }
}
