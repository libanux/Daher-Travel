import { Component } from '@angular/core';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.css'
})
export class BaseTableComponent {
  showShimmer = true;
  showPaging = true;


  // MOVE TO SPECIFIC ROUTE WITH ROW ID
  moveToRouteWithIndex(route: string, id: number) {
    // this.router.navigate([route], { queryParams: { id: id } }).then(() => {
    //   window.scrollTo(0, 0);
    // });
  }
}
