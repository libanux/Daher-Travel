import { AfterViewInit, Component, Inject, Optional, ViewChild, effect } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LaborRecService } from 'src/app/services/labor-rec.service';
import { Date_Filter_Array, Download_Options, GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { LaborList } from 'src/app/classes/labor.class';
import { RouteSignalService } from 'src/app/signals/route.signal';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-labor-main',
  templateUrl: './labor-main.component.html',
  styleUrls: ['../../../../../assets/scss/apps/_add_expand.scss', '../../../../../assets/scss/apps/general_table.scss'],
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
  selectedMonth: string = 'thisMonth';
  statusValue: string = ''
  CurrentAction: string = 'Add Recruiting'
  //MAIN RECRUITING ARRAY
  recruitings: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;
  selectedDownloadOption: string = 'Download as';
  //RECRUITING ON EDIT
  viewPackage: LaborList
  editedrecruiting: LaborList

  // 1 basic
  panelOpenState = false;
  open_expansion_value = 0;

  //TABLE COLUMNS
  displayedColumns: string[] = ['name', 'nationality', 'gender', 'type', 'age', 'cost', 'sell', 'note', 'status', 'action'];

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: LaborList | null = null;
  pageSize: number = 10;
  currentPage: number = 1;
  selectedStatusFilteraTION: string = '';
  MAIN_SELECTED_LABOR_DATA: LaborList = new LaborList()
  show_shimmer = true
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  searchText: string = '';
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;
  startDateValue: string = '';
  endDateValue: string = '';
  //MONTHS FOR FILTER DROPDOWN
  months: any[] = Month_Filter_Array
  //OPTIONS OF DOWNLOAD
  Options: any[] = Download_Options;
  //FILTRATION ARRAY
  Filteration: any[] = Date_Filter_Array

  DATA_CHANGED: boolean = false;
  SHOW_LOADING_SPINNER: boolean = false;
  showDatePicker = false;
  isAnyFieldNotEmpty = false;
  //RECRUITINGS RECORDS
  dataSource = new MatTableDataSource(this.recruitings);

  constructor(
    private routeSignalService: RouteSignalService,
    public dialog: MatDialog, private recruitingService: LaborRecService, private generalService: GeneralService,private breadCrumbService : BreadCrumbSignalService) {
    this.editedrecruiting = new LaborList()
    this.editedrecruiting.status = 'pending'
    this.editedrecruiting.sell = ''
    this.editedrecruiting.cost = ''
    this.editedrecruiting.age = ''
    this.editedrecruiting.gender = 'female'
  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Labor Recruitement')
    this.FETCH_RECRUITINGS();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  //FETCH PACKAGES FROM API
  FETCH_RECRUITINGS(): void {
    this.recruitingService.GET_RECRUITING(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.show_shimmer = false;
        this.recruitings = response.recruitings;
        this.dataSource = new MatTableDataSource(this.recruitings);
        this.totalCount = response.pagination.totalRecruitings;
      },
      error: (error: any) => {
        console.error("Error:", error)
        this.show_shimmer = false;
      },
      complete: () => {
      }
    });
  }

  // Function to handle input change
  SEARCH_FILTER_RECRUITINGS() {
    this.paginator.firstPage();
    this.recruitingService.SEARCH_FILTER_RECRUITING(this.pageSize, this.currentPage, this.searchText, this.selectedMonth, this.statusValue, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {

        this.recruitings = response.recruitings;
        this.dataSource = new MatTableDataSource(this.recruitings);
        this.totalCount = response.pagination.totalRecruitings;
        // this.pageSize=response.pagination.totalRecruitings;
      },
      error: (error: any) => {
        this.recruitings = []
        this.totalCount = 0;
        console.error("Error:", error)
      },
      complete: () => {
      }
    });
  }

    //DATE AND STATUS DROPDOWN CHANGE
    onChange(dropdown: string) {
      if (dropdown == 'month') {
        if (this.selectedMonth == 'Calendar') {
          this.selectedMonth = 'custom'
          console.log("The salacted month:",this.selectedMonth)
          this.showDatePicker = true;
        }
        else {
          this.showDatePicker = false;
          this.onInputChange()
          this.SEARCH_FILTER_RECRUITINGS()
        }
      }
  
      else if (dropdown == 'status') {
  
        this.onInputChange()
        this.SEARCH_FILTER_RECRUITINGS()
  
      }
      else if (dropdown == 'Download') {
        this.DOWNLOAD();
      }
    }
  

  onInputChange() {

    // When inputs changes -> i check if they are the same as the main one
    // if they are the same keep the update button disabled
    if (JSON.stringify(this.MAIN_SELECTED_LABOR_DATA) !== JSON.stringify(this.editedrecruiting)) {
      this.DATA_CHANGED = true;
    }
    else {
      this.DATA_CHANGED = false;
    }

    // Check only specific fields for content
    this.isAnyFieldNotEmpty = Object.values(this.editedrecruiting).some(val => val !== '' && val !== null);
    if (this.isAnyFieldNotEmpty) {
      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);
    }

  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;

    this.currentPage = event.pageIndex + 1;
    this.FETCH_RECRUITINGS();


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
    this.DELETE_RECRUITING(delRecruiting)
      }
    });
  }

  DELETE_RECRUITING(delRecruiting:LaborList){
    this.show_shimmer= true;
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

  //ADD NEW RECRUITING RECORD
  ADD_RECRUITING(): void {
    this.SHOW_LOADING_SPINNER = true;
    this.recruitingService.ADD_RECRUITING(this.editedrecruiting).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.editedrecruiting)
        this.FETCH_RECRUITINGS()
        this.open_expansion_value = -1;
      },
      error: (error: any) => {
        console.error("Error:", error)
        this.SHOW_LOADING_SPINNER = false;
      },
      complete: () => {
        this.SHOW_LOADING_SPINNER = false;
      }
    });
  }

  // SET UPDATE VALUES
  UPDATE(obj: LaborList): void {
    this.MAIN_SELECTED_LABOR_DATA = obj;
    this.ShowAddButoon = false;
    this.editedrecruiting = { ...obj };
    this.CurrentAction = 'Update Recruiting'
    this.open_expansion_value = 1;
    this.panelOpenState = true;

  }

  //UPDATE RECRUITING RECORD
  UPDATE_RECRUITING() {
    this.SHOW_LOADING_SPINNER = true;
    this.recruitingService.UPDATE_RECRUITING(this.editedrecruiting).subscribe({
      next: (response: any) => {
        this.FETCH_RECRUITINGS();
        this.CLEAR_VALUES(this.editedrecruiting)
        this.CurrentAction = 'Add Recruiting'
        this.open_expansion_value = -1;
      },
      error: (error: any) => {
        console.error('Error:', error.error);
        this.SHOW_LOADING_SPINNER = false;
      },
      complete: () => {
        this.SHOW_LOADING_SPINNER = false;
      }
    });

  }

  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    // this.FILTER_RECRUITING_BY_DATE('custom')
  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    // this.FILTER_RECRUITING_BY_DATE('custom')
    this.SEARCH_FILTER_RECRUITINGS();
  }

  FORMAT_DATE_YYYYMMDD(date: Date): string {
    if (!date) {
      return ''; // or handle the case where date is null or undefined
    }
    
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  // Function to format date

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
    obj.gender = 'female'
    obj.nationality = '';
    obj.age = '';
    obj.type = '';
    obj.sell = '';
    obj.cost = '';
    obj.note = '';
    obj.status = 'pending';

    this.open_expansion_value = -1;
    this.panelClosed()
  }

  // Method to handle the panel closed event
  panelClosed() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }



    //-------------------------------------------------------------DOWNLOAD RECRUITING EXCEL---------------------------------------------------------------------
  //DOWNLOAD EXCEL DOCUMENT
  DOWNLOAD() {
    this.generalService.getData('EXPORT_RECRUITING_TO_EXCEL')
  }
}

  //-------------------------------------------------------------LABOR RECRUITING DIALOG TS---------------------------------------------------------------------
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
  LABOR_SELECTED: LaborList = new LaborList()

  constructor(
    public dialogRef: MatDialogRef<AppRecruitingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.LABOR_SELECTED = data.delRecruiting;
    this.action = data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.LABOR_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}








