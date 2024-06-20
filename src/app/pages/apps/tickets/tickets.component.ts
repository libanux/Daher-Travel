import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import { Tickets } from './tickets';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketingService } from 'src/app/services/ticketing.service';
import { Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss','../../../../assets/scss/apps/_add_expand.scss'],
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
  @Input() showAddSection = true;

  //MAIN TICKETS ARRAY
  tickets: any[] = []
  showCalendar: boolean = false;
  selectedDate: Date | null = null;


  currentAction: string = 'Add Ticket';

  //TICKET ON EDIT
  editedTicket: Tickets

  //TABLE COLUMNS
  displayedColumns: string[] = [
    'name',
    'cost',
    'credit',
    'source',
    'destination',
    'note',
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

     // 1 basic
     panelOpenState = false;
     open_expansion_value = 0;

  //MONTHS FOR FILTER DROPDOWN
  months: any[]=Month_Filter_Array
  //TICKETS
  dataSource = new MatTableDataSource(this.tickets);

  constructor(public dialog: MatDialog, private ticketingService: TicketingService, private breadCrumbService : BreadCrumbSignalService) {
    this.editedTicket = new Tickets()

  }

  trackById(index: number, item: any): number {
    return item.id; // Return a unique identifier for each item (e.g., item's ID)
  }


  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Ticketing')
    this.FETCH_TICKETINGS();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  pageSize= 10;
  currentPage= 1;


  //FETCH TICKETINGS FROM API
  FETCH_TICKETINGS(): void {
    this.ticketingService.GET_TICKETINGS(this.pageSize, this.currentPage).subscribe({
      next: (response: any) => {
        this.tickets = response.ticketings;
        console.log("rewsponse:", response)
        this.dataSource = new MatTableDataSource(this.tickets);
        this.totalCount = response.pagination.totalTicketings
      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
      }
    });
  }


  showDatePicker:boolean = false;
  //DATE AND STATUS DROPDOWN CHANGE
  onChange(value: string, dropdown: string) {
    if (dropdown == 'month') {
      if (value === 'custom') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_TICKETS_BY_DATE(value)
      }
    }

    // else if (dropdown == 'status') {
    //   if (value == 'all') {
    //     this.FETCH_PACKAGES()
    //   }
    //   else {
    //     console.log("Value", value)
    //     this.FILTER_PACKAGES(value)
    //   }
    // }
  }


    //FILTER PACKAGES BY DATE
    FILTER_TICKETS_BY_DATE(filter: string) {
      this.ticketingService.FILTER_TICKETS_BY_DATE(filter).subscribe({
        next: (response: any) => {
          this.tickets = response;
          this.dataSource = new MatTableDataSource(this.tickets);
        },
        error: (error: any) => {
          console.error('Error:', error.error);
        },
        complete: () => { }
      });
    }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.FETCH_TICKETINGS()
  }
  //ADD NEW TICKET
  ADD_TICKETINGS(): void {
    this.editedTicket.wholesaler.id = '6671874cd0f3f073ad99ba0e';
    this.editedTicket.wholesaler.id = 'Example Wholesaler';
    this.ticketingService.ADD_TICKETING(this.editedTicket).subscribe({
      next: (response: any) => {
        this.CLEAR_VALUES(this.editedTicket)
        this.FETCH_TICKETINGS();

      },
      error: (error: any) => {
        console.log("Error:", error)
      },
      complete: () => {
        this.open_expansion_value = -1;
      }
    });
  }

    //FETCH TICKETS FROM API
    SEARCH_TICKETS(event: any): void {
      this.currentPage = 1;
    
      this.ticketingService.SEARCH_TICKETS(this.pageSize, this.currentPage, event.target.value).subscribe({
        next: (response: any) => {
  
          this.tickets = response.tickets;
          this.dataSource = new MatTableDataSource(this.tickets);
          this.totalCount = response.pagination.totalTickets
        },
        error: (error: any) => {
          this.tickets =[]
          this.totalCount =0;
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
    this.open_expansion_value =-1;
    this.CLEAR_VALUES(this.editedTicket);
    this.currentAction = 'Add Ticket';
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
    this.open_expansion_value =1;
    this.currentAction = 'Update Ticket';
  }


  //UPDATE TICKET
  UPDATE_TICKET() {
    this.ticketingService.UPDATE_TICKETING(this.editedTicket).subscribe({
      next: (response: any) => {
        this.FETCH_TICKETINGS();
        this.CLEAR_VALUES(this.editedTicket)
        this.currentAction = 'Add Ticket';
        this.open_expansion_value =-1;
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
    obj.destination = '';
    obj.note = '';

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



