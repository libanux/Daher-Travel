
import { Component, OnInit, Inject, Optional, ViewChild, effect } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { tickets } from './ticket-data'
import { Package } from './ticket';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PackageService } from 'src/app/services/package.service';
import { CalendarDialogComponent } from './calendar-card/calendar-dialog.component';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { PagingService } from 'src/app/signals/paging.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticketlist.component.html',
  styleUrl: './ticketlist.component.scss',
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
export class AppTicketlistComponent implements OnInit {

  ShowAddButoon = true;
  selectedMonth: string = '';
  //MAIN PACKAGE ARRAY
  packages: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null; 


  //PACKAGE ON EDIT
  viewPackage: Package
   editedpackage: Package 
  //TABLE COLUMNS
  displayedColumns: string[] = [
    'name',
    'destination',
    'numberOfPeople',
    'duration',
    'price',
    'hotels',
    'note',
    'status',
    'action'
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: Package | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
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

  //PACKAGES
  dataSource = new MatTableDataSource(this.packages);

  packageExample = new Package();
  pageSize : number =10;
  currentPage: number = 1;
  constructor(public dialog: MatDialog, private packagesService: PackageService,private paginagservice:PagingService) {
    this.viewPackage = new Package()
    this.editedpackage = new Package()
    this.editedpackage.status='pending'
    this.editedpackage.sell =1
    this.editedpackage.price =1
    this.editedpackage.numberOfPeople =1
    this.editedpackage.duration =1
    effect(() => {
      this.pageSize = paginagservice.pageSize()
      this.currentPage = paginagservice.currentPage()
      console.log("pageSize:",this.pageSize)
      console.log("Current page",this.currentPage)
    });
  }

  ngOnInit(): void {
    this.FETCH_PACKAGES();
  }
  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginagservice.pageSize.set(event.pageSize)
    this.paginagservice.currentPage.set(event.pageIndex)
this.FETCH_PACKAGES()
  }


  cancelSelection() {
    this.showCalendar = false;
    this.selectedMonth = '';
    this.selectedDate = null;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

  //FETCH PACKAGES FROM API
  FETCH_PACKAGES(): void {
    this.packagesService.GET_PACKAGES(this.currentPage,this.pageSize).subscribe({
      next: (response: any) => {
        console.log("Response package:",response)
        this.packages = response.packages;

        this.dataSource = new MatTableDataSource(this.packages);
        this.Inprogress = this.btnCategoryClick('pending');
        this.Completed = this.btnCategoryClick('completed');
        this.Cancelled = this.btnCategoryClick('canceled');
        this.totalCount = response.pagination.totalPackages
        this.btnCategoryClick('')

      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }

  CancelUpdate(): void {
    this.ShowAddButoon = true;

  }

  //TRIGGER THE DROP DOWN FILTER VALUES
  onChange(value: string) {
    if (value === 'Calendar') {
      this.openCalendarDialog();
    }
    else {
      this.packagesService.FILTER_PACKAGE(value).subscribe({
        next: (response: any) => {
          console.log("Response:", response)
          this.packages = response;
          this.dataSource = new MatTableDataSource(this.packages);
          this.totalCount = this.dataSource.data.length;
          this.Inprogress = this.btnCategoryClick('pending');
        },
        error: (error: any) => {
          console.log("Error:", error)
        },
        complete: () => {
        }
      });
    }
  }

  //OPEN THE CALENDAR DIALOG
  openCalendarDialog(): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      width: '350px',
      data: { selectedDate: this.selectedDate }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.startDate && result.endDate) {
          this.selectedMonth = `${result.startDate.toLocaleString('default', { month: 'long' })} - ${result.endDate.toLocaleString('default', { month: 'long' })}`;
          this.packagesService.FILTER_PACKAGE("custom").subscribe({
            next: (response: any) => {
              console.log("Response:", response)
              this.packages = response;
              this.dataSource = new MatTableDataSource(this.packages);
              this.totalCount = this.dataSource.data.length;
              this.Inprogress = this.btnCategoryClick('pending');
            },
            error: (error: any) => {
              console.log("Error:", error)
            },
            complete: () => {
            }
          });
        } else {
          this.selectedMonth = 'Custom';
        }
        this.selectedDate = result;
      }
    });
  }

  // UPDATE ROW VALUES
  UPDATE(obj: Package): void {
    this.ShowAddButoon  = false; 
    this.editedpackage = { ...obj }; 
  }

UPDATE_PACKAGE(){
  console.log("Edited pack",this.editedpackage)
  this.packagesService.UPDATE_PACKAGE(this.editedpackage).subscribe({
    next: (response: any) => {
      console.log('Response:', response);
      console.log("Edited pack after edit",this.editedpackage)
      this.FETCH_PACKAGES();
      this.CLEAR_VALUES(this.editedpackage)

    },
    error: (error: any) => {
      console.error('Error:', error.error);
    },
    complete: () => { }
  });

  }

    //ADD NEW RECRUITING RECORD
    ADD_PACKAGE(): void {
      this.packagesService.ADD_PACKAGE(this.editedpackage).subscribe({
        next: (response: any) => {
          console.log("Response on add:", response);
          this.CLEAR_VALUES(this.editedpackage)
          this.FETCH_PACKAGES()
        },
        error: (error: any) => {
          console.log("Error:", error)
        },
        complete: () => {
        }
      });
    }

    //CLEAR OBJECT VALUES
    CLEAR_VALUES(obj: Package) {
      console.log("Here")
      obj._id = '';
      obj.name = '';
      obj.source = '';
      obj.destination = '';
      obj.duration = 0;
      obj.hotels = '';
      obj.numberOfPeople = 0;
      obj.price = 0;
      obj.sell = 0;
      obj.netprofit = 0;
      obj.note = '';
      obj.status = '';
      console.log("Edited cleared:", obj)
    }
  


  // OPEN UPDATE & DELETE DIALOGS
  openDialog(action: string, delPackage: Package): void {
    const dialogRef = this.dialog.open(AppTicketDialogContentComponent, {
      data: { action, delPackage }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Delete') {
        this.packagesService.DELETE_PACKAGE(delPackage).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            this.FETCH_PACKAGES()
          },
          error: (error: any) => {
            console.error('Error:', error);
          },
          complete: () => { }
        });
      }
    });
  }

  //GET THE CATEGORY LENGTH
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  //TRUNCATE THE TEXT INTO 20 CHARS
  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
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
}

//MONTHS INTERFACE
interface month {
  value: string;
  viewValue: string;
}

@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'ticket-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppTicketDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  package: Package

  constructor(
    public dialogRef: MatDialogRef<AppTicketDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Package
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

