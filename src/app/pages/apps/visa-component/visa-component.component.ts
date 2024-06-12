import { Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { VisaClass } from './visaClass';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { month } from 'src/app/classes/DateDropdownClass';
import { DateSelectedSignal } from 'src/app/signals/DateSelectedSignal.service';
import { CalendarDialogComponent } from './calendar-card/calendar-dialog.component';
import { VisaService } from 'src/app/services/Visa.service';
import { id } from 'date-fns/locale';


@Component({
  selector: 'app-visa-component',
  templateUrl: './visa-component.component.html',
  styleUrl: './visa-component.component.scss',
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


  months: month[] = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'Last Week', viewValue: 'Last Week' },
    { value: 'Last Month', viewValue: 'Last Month' },
    { value: 'Last Year', viewValue: 'Last Year' },
    { value: 'Calendar', viewValue: 'Custom' },
  ];

  rangeStart = signal('');
  rangeEnd = signal('');


  ShowAddButoon = true;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;

  displayedColumns: string[] = [
    // '_id',
    'name',
    'destination',
    'updatedAt',
    'sell',
    'createdAt',
    'source',
    'price',
    'type',
    'note',
    'status',
    'action'
  ];

  ADDED_VISA: VisaClass = {
    _id: -1,
    name: '',
    source: '',
    destination: '',
    sell: '',
    type: '',
    price: 0,
    note: '',
    status: '',
  }

  // VisaArray : VisaClass [] = []

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: VisaClass | null = null;
  VisaArray = new MatTableDataSource();
  valueDisplayed = ''

  constructor(public dialog: MatDialog, private dateSignal : DateSelectedSignal, private visaService : VisaService) {
    effect(()=>(
      this.valueDisplayed = this.rangeStart() + '' + this.rangeEnd()
    )
    )
   }

   ngOnInit(): void {
    this.rangeEnd = this.dateSignal.endDate;
    this.rangeStart = this.dateSignal.startDate;

    this.FETCH_VISA();

  }
  
// GET ALL VISA'S 
FETCH_VISA(){
    this.visaService.GET_ALL_VISA().subscribe({
      next: (response: any) => {
        this.totalCount = response.length;
        this.VisaArray = new MatTableDataSource(response);
        this.Completed = this.GET_STATUS_ARRAY_LENGTH('Completed');
        this.Cancelled = this.GET_STATUS_ARRAY_LENGTH('Cancelled');
        this.Inprogress = this.GET_STATUS_ARRAY_LENGTH('pending');
      },
      error: (error) => {},
      complete: () => {}
    });
}

onChange(value: string) {
  if (value === 'Calendar') {
    this.openCalendarDialog();
  }

  else{

  }
}

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
        } else {
          this.selectedMonth = 'Custom';
        }
        this.selectedDate = result;
        // Do something with the selected date
      }
    });
}
  

  showCalendar: boolean = false;
  selectedMonth: string = '';
  selectedDate: Date | null = null; // Adjusted the type to accept null

  onDateSelect(date: Date) {
    console.log('Selected Date:', date);
    // Do something with the selected date
  }

  cancelSelection() {
    this.showCalendar = false;
    this.selectedMonth = '';
    this.selectedDate = null;
  }

ngAfterViewInit(): void {
  this.VisaArray.paginator = this.paginator;
}

APPLY_SEARCH_FILTER(filterValue: string): void {
  this.VisaArray.filter = filterValue.trim().toLowerCase();
}


//STATUS FILTERATION
FILTER_ARRAY_BY_STATUS(val: any){
  this.VisaArray.filter = val.trim().toLowerCase();
}

GET_STATUS_ARRAY_LENGTH(val: string): number {
  this.VisaArray.filter = val.trim().toLowerCase();
  return this.VisaArray.filteredData.length;
}

truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
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
      switch (status) {
        case 'pending':
          return 'bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
        case 'completed':
          return 'bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
        case 'cancelled':
          return 'bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
        default:
          return '';
      }
}

    
// ACTION BUTTONS : ADD , UPDATE , CANCEL , DELETE 

// DELETE 
DELETE_VISA(obj: any): void {
  
}

// ADD
ADD_VISA(){

}

// CONFIRM UPDATE
UPDATE_VISA(): void {
  this.ShowAddButoon = false

  // this.Name = obj.name
  // this.source = obj.source
  // this.destination = obj.destination
  // this.sell = obj.sell
  // this.Date = obj.date
  // this.Seats = obj.nbOfSeats
  // this.Note = obj.note
  // this.Status = obj.status
}

// SELECT OBJECT TO UPDATE
SELECTED_VISA(obj: any): void {
  this.ShowAddButoon = false
  // this.name = obj.name
  // this.source = obj.source
  // this.destination = obj.destination
  // this.sell = obj.sell
  // this.date = obj.date
  // this.nbOfSeats = obj.nbOfSeats
  // this.note = obj.note
  // this.status = obj.status

this.ADDED_VISA = {
  _id: obj._id,
  name: obj.name,
  source: obj.source,
  destination: obj.destination,
  sell: obj.sell,
  type: obj.type,
  price: obj.date,
  note: obj.note,
  status: obj.status,
}
 
}

// CANCEL UPDATE
CANCEL_UPDATE(): void {
  this.ShowAddButoon = true

  this.ADDED_VISA = {
    _id: -1,
    name: '',
    source: '',
    destination: '',
    sell: '',
    type: '',
    price: 0,
    note: '',
    status: '',
  }

  // this.name = 'Name';
  // this.source = 'source';
  // this.destination = 'destination';
  // this.sell = 'sell';
  // this.date = 'Date';
  // this.nbOfSeats = 'Seats';
  // this.note= 'Note';
  // this.status = 'Status';
}

}