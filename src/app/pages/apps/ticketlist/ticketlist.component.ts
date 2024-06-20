
import { Component, OnInit, Inject, Optional, ViewChild, effect, Input } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Package } from './ticket';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PackageService } from 'src/app/services/package.service';
import { CalendarDialogComponent } from './calendar-card/calendar-dialog.component';
import { Date_Filter_Array, Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['../../../../assets/scss/apps/general_table.scss', '../../../../assets/scss/apps/_add_expand.scss'],
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
  @Input() showAddSection = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  ShowAddButoon = true;
  selectedMonth: string = '';

  //MAIN PACKAGE ARRAY
  packages: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;


  //PACKAGE ON EDIT
  editedpackage: Package

  //TABLE COLUMNS
  displayedColumns: string[] = ['name', 'source', 'destination', 'numberOfPeople', 'duration', 'price', 'sell', 'hotels', 'note', 'status', 'action'];

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: Package | null = null;

  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;


  //MONTHS FOR FILTER DROPDOWN
  months: any[] = Month_Filter_Array

  //FILTRATION ARRAY
  Filteration: any[] = Date_Filter_Array

  showDatePicker = false;

  //PACKAGES
  dataSource = new MatTableDataSource(this.packages);

  packageExample = new Package();
  pageSize: number = 10;
  currentPage: number = 1;


  // 1 basic
  panelOpenState = false;
  open_expansion_value = 0;

  CurrentAction: string = 'Add Package'


  constructor(public dialog: MatDialog, private packagesService: PackageService, private breadCrumbService: BreadCrumbSignalService) {
    this.editedpackage = new Package()
    this.editedpackage.status = 'pending'
    this.editedpackage.sell = 1
    this.editedpackage.price = 1
    this.editedpackage.numberOfPeople = 1
    this.editedpackage.duration = 1

  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Packages')
    this.FETCH_PACKAGES();
  }
  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
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
    this.packagesService.GET_PACKAGES(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
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

  //FETCH PACKAGES FROM API
  SEARCH_PACKAGES(event: any): void {
    this.currentPage = 1;
    this.packagesService.SEARCH_PACKAGE(this.pageSize, this.currentPage, event.target.value).subscribe({
      next: (response: any) => {

        this.packages = response.packages;
        this.dataSource = new MatTableDataSource(this.packages);
        this.totalCount = response.pagination.totalPackages
      },
      error: (error: any) => {
        this.packages = []
        this.totalCount = 0;
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }

  CancelUpdate(): void {
    this.ShowAddButoon = true;
    this.open_expansion_value = -1;
  }


  //DATE AND STATUS DROPDOWN CHANGE
  onChange(value: string, dropdown: string) {
    if (dropdown == 'month') {
      if (value === 'custom') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_PACKAGES_BY_DATE(value)
      }
    }

    else if (dropdown == 'status') {
      if (value == 'all') {
        this.FETCH_PACKAGES()
      }
      else {
        console.log("Value", value)
        this.FILTER_PACKAGES(value)
      }
    }
  }

  //FILTER PACKAGES BY STATUS
  FILTER_PACKAGES(status: string) {
    this.currentPage = 1;
    this.packagesService.FILTER_PACKAGES_BY_STATUS(this.pageSize, this.currentPage, status).subscribe({
      next: (response: any) => {
        this.packages = response.packages;
        this.dataSource = new MatTableDataSource(this.packages);
        this.totalCount = response.pagination.totalPackages;
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }


  //FILTER PACKAGES BY DATE
  FILTER_PACKAGES_BY_DATE(filter: string) {
    this.packagesService.FILTER_PACKAGE_BY_DATE(filter).subscribe({
      next: (response: any) => {
        this.packages = response;
        this.dataSource = new MatTableDataSource(this.packages);
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
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
          this.packagesService.FILTER_PACKAGE_BY_DATE("custom").subscribe({
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

  // SHOW BUTTON UPDATE AND SET INPUTS
  UPDATE(obj: Package): void {
    this.ShowAddButoon = false;
    this.editedpackage = { ...obj };
    this.open_expansion_value = 1;
  }


  //UPDATE PACKAGE VALUES
  UPDATE_PACKAGE() {
    console.log("Edited pack", this.editedpackage)
    this.packagesService.UPDATE_PACKAGE(this.editedpackage).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        console.log("Edited pack after edit", this.editedpackage)
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

