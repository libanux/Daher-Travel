import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { Tickets } from './tickets';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketingService } from 'src/app/services/ticketing.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
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
export class TicketsComponent {
  ShowAddButoon = true;
  selectedMonth: string = '';

  //MAIN TICKETS ARRAY
  tickets: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;

  //TICKET ON EDIT
  editedTicket: Tickets

  //TABLE COLUMNS
  displayedColumns: string[] = [
    'name',
    'wholesaler.name',
    'price',
    'sell',
    'cost',
    'credit',
    'dateIssue',
    'note',
    'status',
    'action',
  ];

  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: Tickets | null = null;

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

  //TICKETS
  dataSource = new MatTableDataSource(this.tickets);

  constructor(public dialog: MatDialog, private ticketingService: TicketingService) {
    this.editedTicket = new Tickets()
    this.editedTicket.status = 'pending'
    this.editedTicket.sell = 1
    this.editedTicket.price = 1
    this.editedTicket.duration = 1
    this.editedTicket.seats = 1
  }

  trackById(index: number, item: any): number {
    return item.id; // Return a unique identifier for each item (e.g., item's ID)
  }
  

  ngOnInit(): void {
    this.FETCH_TICKETINGS();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
pageSize: 10;
currentPage: 1;


  //FETCH TICKETINGS FROM API
  FETCH_TICKETINGS(): void {
    this.ticketingService.GET_TICKETINGS(this.pageSize, this.currentPage).subscribe({
      next: (response: any) => {
        this.tickets = response.ticketings;
        console.log("rewsponse:",response)
        this.dataSource = new MatTableDataSource(this.tickets);
        this.Inprogress = this.btnCategoryClick('pending');
        this.Completed = this.btnCategoryClick('completed');
        this.Cancelled = this.btnCategoryClick('canceled');
        this.totalCount = this.btnCategoryClick('');
      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }

  //ADD NEW TICKET
  ADD_TICKETINGS(): void {
    this.ticketingService.ADD_TICKETING(this.editedTicket).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.editedTicket)
        this.FETCH_TICKETINGS()
      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
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

  //TRUNCATE THE TEXT INTO 20 CHARS
  truncateText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }


  CancelUpdate(): void {
    this.ShowAddButoon = true;
    this.CLEAR_VALUES(this.editedTicket);
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

  // OPEN UPDATE & DELETE DIALOGS
  openDialog(action: string, delTicket: Tickets): void {
    const dialogRef = this.dialog.open(AppTicketingDialogContentComponent, {
      data: { action, delTicket }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Delete') {
        this.ticketingService.DELETE_TICKETING(delTicket).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            this.FETCH_TICKETINGS()
          },
          error: (error: any) => {
            console.error('Error:', error);
          },
          complete: () => { }
        });
      }
    });
  }



  // SET UPDATE VALUES
  UPDATE(obj: Tickets): void {
    this.ShowAddButoon = false;
    this.editedTicket = { ...obj };
  }


  //UPDATE TICKET
  UPDATE_TICKET() {
    this.ticketingService.UPDATE_TICKETING(this.editedTicket).subscribe({
      next: (response: any) => {
        this.FETCH_TICKETINGS();
        this.CLEAR_VALUES(this.editedTicket)
      },
      error: (error: any) => {
        console.error('Error:', error.error);
      },
      complete: () => { }
    });

  }

  //CLEAR OBJECT VALUES
  CLEAR_VALUES(obj: Tickets) {
    obj._id = '';
    obj.name = '';
    obj.source = '';
    obj.seats = 0;
    obj.duration = 0;
    obj.destination = '';
    obj.sell = 0;
    obj.price = 0;
    obj.note = '';
    obj.status = '';
  }
}
interface month {
  value: string;
  viewValue: string;
}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialogTicket-content',
  templateUrl: './recruiting-dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class AppTicketingDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  ticket: Tickets

  constructor(
    public dialogRef: MatDialogRef<AppTicketingDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tickets
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



