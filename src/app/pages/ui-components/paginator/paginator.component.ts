import { Component, effect } from '@angular/core';
import { PagingService } from 'src/app/signals/paging.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class AppPaginatorComponent {
pageSize : number =1;
currentPage: number = 1;
  constructor(private paginagservice: PagingService) {
    effect(() => {
      this.pageSize = paginagservice.pageSize()
      this.currentPage = paginagservice.currentPage()
      console.log("pageSize:",this.pageSize)
      console.log("Current page",this.currentPage)
    });
  }
   }



