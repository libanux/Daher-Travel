import { Component } from '@angular/core';
import { laborRec, laborRecruitment } from '../../classes/laborRecruitment';

@Component({
  selector: 'app-rec-table',
  templateUrl: './rec-table.component.html',
  styleUrl: './rec-table.component.css'
})
export class RecTableComponent {
  showShimmer = true;
  showPaging = true;

   laborArray : laborRecruitment [] = []

   ngOnInit(): void {
    this.laborArray = laborRec;
  }


  // MOVE TO SPECIFIC ROUTE WITH ROW ID
  moveToRouteWithIndex(route: string, id: number) {
    // this.router.navigate([route], { queryParams: { id: id } }).then(() => {
    //   window.scrollTo(0, 0);
    // });
  }
}
