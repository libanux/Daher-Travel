import { AfterViewInit, Component, Inject, Optional, ViewChild, effect } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LaborList } from '../labor';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LaborRecService } from 'src/app/services/labor-rec.service';
import { PagingService } from 'src/app/signals/paging.service';

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-labor-main',
  templateUrl: './labor-main.component.html',
  styleUrl: './labor-main.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class LaborMainComponent implements AfterViewInit {


  ShowAddButoon = true;
  selectedMonth: string = '';

  //MAIN RECRUITING ARRAY
  recruitings: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;

  //RECRUITING ON EDIT
  viewPackage: LaborList
  editedrecruiting: LaborList

  //TABLE COLUMNS
  displayedColumns: string[] = [
    'name',
    'nationality',
    'gender',
    'type',
    'age',
    'price',
    'sell',
    'note',
    'status',
    'action',
  ];

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: LaborList | null = null;


  pageSize: number = 10;
  currentPage: number = 1;


  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;

  //MONTHS FOR FILTER DROPDOWN
  months: month[] = [
    { value: 'today', viewValue: 'Today' },
    { value: 'yesterday', viewValue: 'Yesterday' },
    { value: 'last Week', viewValue: 'Last Week' },
    { value: 'Last Month', viewValue: 'Last Month' },
    { value: 'Last Year', viewValue: 'Last Year' },
    { value: 'Calendar', viewValue: 'Custom' },
  ];

  //RECRUITINGS RECORDS
  dataSource = new MatTableDataSource(this.recruitings);

  constructor(public dialog: MatDialog, private recruitingService: LaborRecService, private paginagservice: PagingService) {
    this.viewPackage = new LaborList()
    this.editedrecruiting = new LaborList()
    this.editedrecruiting.status = 'pending'
    this.editedrecruiting.sell = 1
    this.editedrecruiting.price = 1
    this.editedrecruiting.age = 1
    this.editedrecruiting.gender = 'female'
    effect(() => {
      this.pageSize = paginagservice.pageSize()
      this.currentPage = paginagservice.currentPage()
      console.log("pageSize:", this.pageSize)
      console.log("Current page", this.currentPage)

    });
  }

  ngOnInit(): void {
    this.FETCH_RECRUITINGS();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }




  //FETCH PACKAGES FROM API
  FETCH_RECRUITINGS(): void {
    this.recruitingService.GET_RECRUITING(this.currentPage,this.pageSize).subscribe({
      next: (response: any) => {
        this.recruitings = response.recruitings;
        this.dataSource = new MatTableDataSource(this.recruitings);
        this.Inprogress = this.btnCategoryClick('pending');
        this.Completed = this.btnCategoryClick('completed');
        this.Cancelled = this.btnCategoryClick('canceled');
        this.totalCount = response.pagination.totalRecruitings;
      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }


  // onSearchChange(value: string): void {
  //   this.searchService.searchKey.set(value);
  //   console.log('Search value changed:', value);
  //   this.FETCH_RECRUITINGS();
  // }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.paginagservice.pageSize.set(event.pageSize)
    this.paginagservice.currentPage.set(event.pageIndex)
    console.log("Page size:", event.pageSize)
    console.log("Page number:", event.pageIndex)
    this.FETCH_RECRUITINGS()
  }


  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  expandRow(event: Event, element: any, column: string): void {
    if (column === 'action') {
      this.expandedElement = element;
    }
    else {
      this.expandedElement = this.expandedElement === element ? null : element;
      event.stopPropagation();
    }
  }

  CancelUpdate(): void {
    this.ShowAddButoon = true
    this.CLEAR_VALUES(this.editedrecruiting)
  }


  //GET THE CATEGORY LENGTH
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  //GET THE STATUS CLASS
  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'completed':
        return 'bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'canceled':
        return 'bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      default:
        return '';
    }
  }

  //TRUNCATE THE TEXT INTO 20 CHARS
  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }


  // OPEN UPDATE & DELETE DIALOGS
  openDialog(action: string, delRecruiting: LaborList): void {
    const dialogRef = this.dialog.open(AppRecruitingDialogContentComponent, {
      data: { action, delRecruiting }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Delete') {
        this.recruitingService.DELETE_RECRUITING(delRecruiting).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            this.FETCH_RECRUITINGS()
          },
          error: (error: any) => {
            console.error('Error:', error);
          },
          complete: () => { }
        });
      }
    });
  }

  //ADD NEW RECRUITING RECORD
  ADD_RECRUITING(): void {
    this.recruitingService.ADD_RECRUITING(this.editedrecruiting).subscribe({
      next: (response: any) => {
        console.log("Response on add:", response);
        this.CLEAR_VALUES(this.editedrecruiting)
        this.FETCH_RECRUITINGS()
      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }


  // SET UPDATE VALUES
  UPDATE(obj: LaborList): void {
    this.ShowAddButoon = false;
    this.editedrecruiting = { ...obj };
  }


  //UPDATE RECRUITING RECORD
  UPDATE_RECRUITING() {
    this.recruitingService.UPDATE_RECRUITING(this.editedrecruiting).subscribe({
      next: (response: any) => {
        this.FETCH_RECRUITINGS();
        this.CLEAR_VALUES(this.editedrecruiting)
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });

  }

  //CLEAR OBJECT VALUES
  CLEAR_VALUES(obj: LaborList) {
    obj._id = '';
    obj.name = '';
    obj.nationality = '';
    obj.age = 0;
    obj.type = '';
    obj.sell = 0;
    obj.price = 0;
    obj.note = '';
    obj.status = '';
  }

}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialogRec-content',
  templateUrl: './recruiting-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppRecruitingDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  package: LaborList

  constructor(
    public dialogRef: MatDialogRef<AppRecruitingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: LaborList
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}








