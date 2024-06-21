import { AfterViewInit, Component, Inject, Optional, ViewChild, effect } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LaborRecService } from 'src/app/services/labor-rec.service';
import { Date_Filter_Array, Month_Filter_Array } from 'src/app/services/general.service';
import { LaborList } from 'src/app/classes/labor.class';

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-labor-main',
  templateUrl: './labor-main.component.html',
  styleUrls: ['./labor-main.component.scss', '../../../../../assets/scss/apps/_add_expand.scss'],
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
  CurrentAction: string = 'Add Recruiting'
  //MAIN RECRUITING ARRAY
  recruitings: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;

  //RECRUITING ON EDIT
  viewPackage: LaborList
  editedrecruiting: LaborList

  // 1 basic
  panelOpenState = false;
  open_expansion_value = 0;

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
  selectedStatusFilteraTION: string = '';

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
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

  //RECRUITINGS RECORDS
  dataSource = new MatTableDataSource(this.recruitings);

  constructor(public dialog: MatDialog, private recruitingService: LaborRecService) {
    this.viewPackage = new LaborList()
    this.editedrecruiting = new LaborList()
    this.editedrecruiting.status = 'pending'
    this.editedrecruiting.sell = 1
    this.editedrecruiting.price = 1
    this.editedrecruiting.age = 1
    this.editedrecruiting.gender = 'female'
  }

  ngOnInit(): void {
    this.FETCH_RECRUITINGS();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  //FETCH PACKAGES FROM API
  FETCH_RECRUITINGS(): void {
    this.recruitingService.GET_RECRUITING(this.currentPage, this.pageSize).subscribe({
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

  // Function to handle input change
  onInputChange(event: any) {
    this.recruitingService.SEARCH_RECRUITING(this.pageSize, this.currentPage, event).subscribe({
      next: (response: any) => {

        this.recruitings = response.recruitings;
        this.dataSource = new MatTableDataSource(this.recruitings);
        this.totalCount = response.pagination.totalRecruitings;
      },
      error: (error: any) => {
        this.recruitings =[]
        this.totalCount =0;
        console.log("Error:", error)
      },
      complete: () => {
      }
    });

  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
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
    this.CurrentAction = 'Add Recruiting'
    this.CLEAR_VALUES(this.editedrecruiting)
    this.open_expansion_value = -1;
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
        this.CLEAR_VALUES(this.editedrecruiting)
        this.FETCH_RECRUITINGS()
        this.open_expansion_value = -1;
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
    this.CurrentAction = 'Update Recruiting'
  
    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }


  //UPDATE RECRUITING RECORD
  UPDATE_RECRUITING() {
    this.recruitingService.UPDATE_RECRUITING(this.editedrecruiting).subscribe({
      next: (response: any) => {
        this.FETCH_RECRUITINGS();
        this.CLEAR_VALUES(this.editedrecruiting)
        this.CurrentAction = 'Add Recruiting'
        this.open_expansion_value = -1;
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });

  }

  //FILTER RECRUITING RECORDS BY STATUS
  FILTER_RECRUITING(status: string) {
    this.currentPage = 1;
    this.recruitingService.FILTER_RECRUITINGS(this.pageSize, this.currentPage, status).subscribe({
      next: (response: any) => {
        this.recruitings = response.recruitings;
        this.dataSource = new MatTableDataSource(this.recruitings);
        this.totalCount = response.pagination.totalPackages
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }


  //FILTER RECRUITING RECORDS BY DATE
  FILTER_RECRUITING_BY_DATE(filter: string) {
    this.recruitingService.FILTER_RECRUITING_BY_DATE(filter,this.startDateValue,this.endDateValue).subscribe({
      next: (response: any) => {
        this.recruitings = response;
        this.dataSource = new MatTableDataSource(this.recruitings);
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });
  }

  startDateValue: string = ''; // Variable to store the start date
  endDateValue: string = ''; // Variable to store the end date
  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_RECRUITING_BY_DATE('custom')

  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_RECRUITING_BY_DATE('custom')

  }


  FORMAT_DATE_YYYYMMDD(date: Date): string {
    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
    const day = ('0' + date.getDate()).slice(-2);

    // Return the formatted date string in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  }


  // Function to format date
  FORMAT_DATE(dateString: string): string {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC' // Optional: Adjust to your timezone
    };

    return dateObj.toLocaleString('en-US', options);
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

    this.open_expansion_value = -1;
    this.panelClosed()
  }

    // Method to handle the panel closed event
    panelClosed() {
      this.open_expansion_value = 0;
      this.panelOpenState = false;
    }
  

  //DATE AND STATUS DROPDOWN CHANGE
  onChange(value: string, dropdown: string) {
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_RECRUITING_BY_DATE(value)
      }
    }

    else if (dropdown == 'status') {
      if (value == 'all') {
        this.FETCH_RECRUITINGS()
      }
      else {
        this.FILTER_RECRUITING(value)
      }
    }
  }


  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
  }

}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialogRec-content',
  templateUrl: './recruiting-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppRecruitingDialogContentComponent {
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };


  action: string;
  LABOR_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<AppRecruitingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: LaborList,
  ) {
    this.LABOR_SELECTED = { ...data };
    this.action = this.LABOR_SELECTED.action;
    console.log(this.LABOR_SELECTED)
  }

  doAction(): void {
    console.log(this.LABOR_SELECTED)
    this.dialogRef.close({ event: this.action, data: this.LABOR_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}








