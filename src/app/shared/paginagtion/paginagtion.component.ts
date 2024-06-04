import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginagtion',
  templateUrl: './paginagtion.component.html',
  styleUrls: ['./paginagtion.component.css']
})
export class PaginagtionComponent {
  @Input() currentPage: number = 0;
  @Input() pageSize = 0;
  @Output() currentPageEvent = new EventEmitter<number>();
  
  data: any [] = [];

constructor(){}

ngOnInit(): void {

// this.subjectServices.receiveAlertData().subscribe(data => {
//     this.currentPage = 0 ;
//     this.currentPageEvent.emit(this.currentPage);
// });

    // this.subjectServices.recievePaymentMethod().subscribe({
    //   next: (response: any) => {this.currentPage = 0  },
    //   error: (error) => {  },
    //   complete: () => {    }
    //   });
  
    //   this.subjectServices.recieveTransactionStatus().subscribe({
    //     next: (response: any) => {this.currentPage = 0}, 
    //     error: (error) => {  },
    //     complete: () => {   }
    //   });

    //   this.subjectServices.recieveSelectedProductStatus().subscribe({
    //     next: (response: any) => {this.currentPage = 0}, 
    //     error: (error) => {},
    //     complete: () => { }
    //   });
        
    //   this.subjectServices.recieveIfSorting().subscribe({
    //     next: (response: any) => {this.currentPage = 0}, 
    //     error: (error) => {},
    //     complete: () => { }
    //   });
}

ngOnChanges(changes: SimpleChanges): void {
  if ('pageSize' in changes || 'currentPage' in changes) {
    this.generatePageArray(this.pageSize);

    if(this.currentPage>0){this.disabelBackBtn = false}
    else {this.disabelBackBtn = true}
    
    if(this.currentPage+1 ==this.pageSize){this.disabelNextBtn = true}
    else {this.disabelNextBtn = false}

    if(this.pageSize==0){this.disabelBackBtn = true; this.disabelNextBtn = true}
  }
}

generatePageArray(pageSize: number){
  this.data = []; // Clear the array before populating it again
  this.currentPage = 0;
  for(let i = 1; i <= pageSize; i++){
    this.data.push(i);
  }
}

getPageNumbers(): number[] {
  const currentPage = this.currentPage;

  if (this.pageSize <= 3) {
    // If there are 3 or fewer pages, display all pages starting from 1
    return Array.from({ length: this.pageSize }, (_, i) => i + 1);
  } else {
    // If there are more than 3 pages
    if (currentPage < 2) {
      // If current page is one of the first 2 pages
      return [1, 2, -1, this.pageSize];
    } else if (currentPage > this.pageSize - 3) {
      // If current page is one of the last 2 pages
      return [1, -1, this.pageSize - 2, this.pageSize - 1, this.pageSize];
    } else {
      // If current page is in the middle pages
      return [1, -1, currentPage, currentPage + 1, currentPage + 2, -1, this.pageSize];
    }
  }
}

goToPage(page: number): void {
  this.currentPage = page - 1;

  if(this.currentPage>0){
    this.disabelBackBtn = false
  }

  else {
    this.disabelBackBtn = true
  }

  if(this.currentPage+1 ==this.pageSize){
    this.disabelNextBtn = true
  }

  else {
    this.disabelNextBtn = false
  }

  this.currentPageEvent.emit(this.currentPage);
}

disabelBackBtn = true;
goToPreviousPage(): void {
this.currentPage --;
this.disabelNextBtn = false;

  if(this.currentPage == 0){
    this.disabelBackBtn = true
  }

  else {
    this.disabelBackBtn = false
  }

  this.currentPageEvent.emit(this.currentPage);
}

disabelNextBtn = false;
goToNextPage(): void {
  this.currentPage ++;
  this.disabelBackBtn = false;

  if(this.currentPage+1 ==this.pageSize){
    this.disabelNextBtn = true
  }

  else {
    this.disabelNextBtn = false
  }

  this.currentPageEvent.emit(this.currentPage);
}
}
