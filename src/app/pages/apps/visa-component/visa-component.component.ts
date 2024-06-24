import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { VisaClass, VisaType_Array, Visa_Status_Array, Visa_Status_Array_FILTERATION } from '../../../classes/visaClass';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VisaService } from 'src/app/services/visa.service';
import { GeneralService, Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { RouteSignalService } from 'src/app/signals/route.signal';

@Component({
  selector: 'app-visa-component',
  templateUrl: './visa-component.component.html',
  styleUrls: [
    '../../../../assets/scss/apps/_add_expand.scss',
    '../../../../assets/scss/apps/general_table.scss',
  ],
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

export class VisaComponentComponent implements OnInit {

  // These two valus are used for the add expnad row in the top of the page
  panelOpenState = false;
  open_expansion_value = 0;

  // shimmer --> show shimmer until data is fetched
  show_shimmer = true;

  months: any[] = Month_Filter_Array
  Status_Array: any[] = Visa_Status_Array
  VisaType: any[] = VisaType_Array
  Status_Array_Filter: any[] = Visa_Status_Array_FILTERATION

  ShowAddButoon = true;

  // This value is used to check the size of array in current page
  // In case of deletion --> when array length becomes zero 
  // current page is current page -1 
  //  used in delete function
  current_page_array_length = 0;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;

  // These are the column of the table 
  displayedColumns: string[] = [
    'customerName',
    'phoneNumber',
    'country',
    'type',
    'sell',
    'note',
    'status',
    'action'
  ];

  // This is the added or updated VISA fdefualt values
  ADDED_VISA: VisaClass = {
    customer: {
      id: '',
      name: '',
      phoneNumber: '',
    },
    country: '',
    note: '',
    sell: '',
    status: '',
    type: '',
  }

  pageSize = 10;
  Visa_Array_length = 0
  Current_page = 1

  showCalendar: boolean = false;
  selectedMonth: string = '';
  selectedStatusFilteraTION: string = '';
  selectedDate: Date | null = null; // Adjusted the type to accept null

  CurrentAction = 'Add Visa'
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: VisaClass | null = null;
  VisaArray = new MatTableDataSource();


  // Storing the start and end date selected in filtering by Date
  // Used in filter by date
  startDateValue: string = '';
  endDateValue: string = '';

  constructor(
    private routeSignalService: RouteSignalService,
     private breadCrumbService: BreadCrumbSignalService,
      private generalService: GeneralService, public dialog: MatDialog, private visaService: VisaService) {

  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Visa')
    this.pageSize = this.generalService.PageSizing
    this.FETCH_VISA();
  }

  // FILTERING BY DROPDOWN SELECTION : DATE OR STATUS
  showDatePicker = false;
  DROPDOWN_FILTERATION(value: string, dropdown: string) {

    // Date filtering
    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.startDateValue = '';
        this.endDateValue = '';

        this.showDatePicker = false;
        this.FILTER_ARRAY_BY_DATE(value)
      }
    }

    // Status filtering
    else if (dropdown == 'status') {
      if (value == 'all') {
        this.FETCH_VISA()
      }
      else {
        this.FILTER_ARRAY_BY_STATUS(value)
      }
    }
  }

  // OPEN DIALOG TO MAKE SURE OF DELETION
  OPEN_DIALOG(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(visaDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'delete') {
        this.DELETE_VISA(obj._id);
      }
    });
  }

  // Method to handle the panel closed event
  CLOSE_PANEL() {
    this.open_expansion_value = 0;
    this.panelOpenState = false;
  }

  OPEN_PANEL() {
    this.open_expansion_value = 1;
    this.panelOpenState = true;
  }

  // function when page number changes
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.Current_page = event.pageIndex + 1;
    this.FETCH_VISA();
  }

  isAnyFieldNotEmpty = false; // Flag to track if any field has content

  // Function to log input changes
  onInputChange() {
    // Check only specific fields for content
    this.isAnyFieldNotEmpty = ['name', 'country', 'note', 'sell'].some(key => {
      const fieldValue = this.ADDED_VISA[key as keyof VisaClass] || ''; // Using || for fallback value
      return fieldValue !== '' && fieldValue !== null;
    });

    if (this.isAnyFieldNotEmpty) {
      this.routeSignalService.show_pop_up_route.set(true);
    }
    else {
      this.routeSignalService.show_pop_up_route.set(false);
    }

    // You can perform additional actions based on the field name or value if needed
  }


  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_ARRAY_BY_DATE('custom')
  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_ARRAY_BY_DATE('custom')
  }

  FORMAT_DATE_YYYYMMDD(date: Date): string {
    return this.generalService.FORMAT_DATE_YYYYMMDD(date)
  }

  // Function to format date
  FORMAT_DATE(dateString: string): string {
    return this.generalService.FORMAT_DATE_WITH_HOUR(dateString)
  }

  // function to make a text smaller in length 
  truncateText(text: string, limit: number): string {
    return this.generalService.truncateText(text, limit)
  }

  //EXPAND THE ROW AND CHECK IF THE COLUMN IS ACTION THEN DO NOT EXPAND
  EXPAND_ROW(event: Event, element: any, column: string): void {
    if (column === 'action') {
      this.expandedElement = element;
    }

    else {
      this.expandedElement = this.expandedElement === element ? null : element;
      event.stopPropagation();
    }
  }

  //GET THE STATUS CLASS
  GET_STATUS_CLASS(status: string): string {
    return this.generalService.GET_STATUS_CLASS(status, 'pending', 'approved', 'rejected')
  }


  // ACTION BUTTONS : GET ALL, ADD , UPDATE , CANCEL , DELETE, SEARCH

  // GET ALL VISA'S 
  FETCH_VISA() {
    this.show_shimmer = true;
    this.visaService.GET_ALL_VISA(this.Current_page, this.pageSize).subscribe({
      next: (response: any) => {
        console.log(response)
        this.current_page_array_length = response.visas.length
        this.VisaArray = new MatTableDataSource(response.visas);
        // LENGTH : FOR PAGINATION 
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { },
      complete: () => { this.show_shimmer = false; }

    });
  }

  // CANCEL UPDATE
  CANCEL_UPDATE(): void {
    this.CurrentAction = 'Add Visa';
    this.ShowAddButoon = true;
    this.routeSignalService.show_pop_up_route.set(false)

    // CLOSE THE PANEL
    this.CLOSE_PANEL()

    this.ADDED_VISA = {
      customer: {
        id: '',
        name: '',
        phoneNumber: '',
      },
      country: '',
      note: '',
      sell: '',
      status: '',
      type: '',
    }
  }

  // DELETE VSIA
  DELETE_VISA(ID: number): void {
    this.visaService.DELETE_VISA(ID).subscribe({
      next: (response: any) => {
        if (this.current_page_array_length == 1) {
          this.Current_page = this.Current_page - 1
        }
      },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(); }
    });
  }

  // ADD NEW VISA
  ADD_VISA(obj: VisaClass) {
    this.visaService.ADD_VISA(obj).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => {
        this.FETCH_VISA(); this.CANCEL_UPDATE();
      }
    });
  }

  // CONFIRM UPDATE
  UPDATE_VISA() {
    this.visaService.UPDATE_VISA(this.ADDED_VISA).subscribe({
      next: (response: any) => { },
      error: (error) => { },
      complete: () => { this.FETCH_VISA(); this.CANCEL_UPDATE(); }
    });
  }

  // SELECT OBJECT TO UPDATE
  SELECTED_VISA(obj: VisaClass): void {
    // SECURE THE ROUTE
    this.routeSignalService.show_pop_up_route.set(false)
    // HIDE ADD BUTTON AND SHOW THE UPDATE BUTTON
    this.ShowAddButoon = false
    this.CurrentAction = 'Update Visa';
    // OPEN THE PANEL 
    this.OPEN_PANEL();
    // FILL THE INPUTS WITH THE SELECTED OBJ VALUES
    this.ADDED_VISA = { ...obj };
  }

  // STATUS FILTERATION
  FILTER_ARRAY_BY_STATUS(val: any) {
    this.visaService.FILTER_VISA_BY_STATUS(val, 1, this.pageSize).subscribe({
      next: (response: any) => {
        this.VisaArray = new MatTableDataSource(response.visas);
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { this.VisaArray = new MatTableDataSource(); },
      complete: () => { }
    });
  }

  // DATE FILTERATION
  FILTER_ARRAY_BY_DATE(filter_type: any) {
    this.visaService.FILTER_VISA_BY_DATE(filter_type, this.startDateValue, this.endDateValue).subscribe({
      next: (response: any) => {
        this.VisaArray = new MatTableDataSource(response.visas);
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { this.VisaArray = new MatTableDataSource(); },
      complete: () => { }
    });
  }

  // FILTER BY SEARCH KEY
  APPLY_SEARCH_FILTER(filterValue: string): void {
    this.visaService.FILTER_VISA_BY_SEARCH_KEY(filterValue, 1, this.pageSize).subscribe({
      next: (response: any) => {
        this.VisaArray = new MatTableDataSource(response.visas);
        this.Visa_Array_length = response.pagination.totalVisas;
      },
      error: (error) => { this.VisaArray = new MatTableDataSource(); },
      complete: () => { }
    });
  }

}




@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: './visa-dialog-content/visa-dialog-content.component.html',
  styleUrl: './visa-dialog-content/visa-dialog-content.component.scss'
})
// tslint:disable-next-line: component-class-suffix
export class visaDialogContentComponent {
  package = { selected: false, read: false, write: false };
  visa = { selected: false, read: false, write: false };


  action: string;
  VISA_SELECTED: any;

  constructor(
    public dialogRef: MatDialogRef<visaDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: VisaClass,
  ) {
    this.VISA_SELECTED = { ...data };
    this.action = this.VISA_SELECTED.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.VISA_SELECTED });
  }

  CLOSE_DIALOG(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
