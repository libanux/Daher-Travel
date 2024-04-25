import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() data: any [] = [];
  @Input() lengthArray: number = 0;
  @Input() pageSize = 2;

  @Output() dataPerPage = new EventEmitter<any[]>();
  @Output() currentPageEvent = new EventEmitter<number>();
 
  maxPages: number = 3;
  pageSizeOptions: number[] = [5, 10, 20];
  @Input() currentPage: number = 0;
  pagedProducts: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('currentPage' in changes) {
    this.currentPage = this.currentPage
    this.getPageNumbers()
  }
  }

ngOnInit() {
  // Initial emit of pagedProducts
  this.onPageChange({ pageIndex: this.currentPage, pageSize: this.pageSize });
}

onPageChange(event: any): void {
  this.currentPage = event.pageIndex;
  this.currentPageEvent.emit(this.currentPage);

  const startIndex = this.calculateStartIndex();
  const endIndex = this.calculateEndIndex();
  this.pagedProducts = this.data.slice(startIndex, endIndex);

  this.dataPerPage.emit(this.pagedProducts);
}

goToPage(page: number): void {
  this.currentPage = page;
  this.currentPageEvent.emit(this.currentPage);
  this.onPageChange({ pageIndex: this.currentPage, pageSize: this.pageSize });
}

goToPreviousPage(): void {
  if (this.currentPage > 0) {
    this.goToPage(this.currentPage - 1);
  }
}

goToNextPage(): void {
  const totalPages = Math.ceil(this.lengthArray / this.pageSize);
    if (this.currentPage < totalPages - 1) {
      this.goToPage(this.currentPage + 1);
    }
}

// getPageNumbers(): number[] {
//     const totalPages = Math.ceil(this.lengthArray / this.pageSize);

//     let pagesToShow: number[] = [];
  
//     // Always show the first two pages
//     for (let i = 0; i < Math.min(totalPages, 2); i++) {
//       pagesToShow.push(i);
//     }
  
//     // If there are more than two pages, show an ellipsis and the last page
//     if (totalPages > 2) {
//       pagesToShow.push(-1); // -1 represents the ellipsis
//       pagesToShow.push(totalPages - 1);
//     } else {
//       // Otherwise, show all remaining pages
//       for (let i = 2; i < totalPages; i++) {
//         pagesToShow.push(i);
//       }
//     }
  
//     return pagesToShow;
//   }
  
getPageNumbers(): number[] {
  const totalPages = Math.ceil(this.lengthArray / this.pageSize);
  const currentPage = this.currentPage;

  if (totalPages <= 3) {
      // If there are 3 or fewer pages, display all pages
      return Array.from({ length: totalPages }, (_, i) => i);
  } 
  
  else {
      // If there are more than 3 pages, display first 2, then ellipsis, then last page
      if (currentPage < 2) {
          // If current page is one of the first 2 pages
          return [0, 1, -1, totalPages - 1];
      } else if (currentPage > totalPages - 3) {
          // If current page is one of the last 2 pages
          return [0, -1, totalPages - 3, totalPages - 2, totalPages - 1];
      } else {
          // If current page is in the middle pages
          return [0, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages - 1];
      }
  }
}

calculateStartIndex(): number {
  return this.currentPage * this.pageSize;
}

calculateEndIndex(): number {
  const end = Math.min((this.currentPage + 1) * this.pageSize, this.lengthArray);
  return end;
}


}
