
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
// import { tickets } from './ticket-data'
import { TicketList } from './ticket';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PackageService } from 'src/app/services/package.service';

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


  Name = 'Name';
  Destination = 'Destination';
  Source='Source'
  Duration = 'Duration';
  Hotels = 'Hotels';
  Date = 'Date';
  Seats = 'Seats';
  Cost='Cost';
  Sell='Sell';
  Netprofit='Netprofit'
  Note= 'Note';
  Status = 'Status';


  tickets: any[] =[]


  //TABLE COLUMNS
  displayedColumns: string[] = [
    'id',
    'name',
    'destination',
    'duration',
    'hotels',
    'numberOfPeople',
    'cost',
    'netprofit',
    'note',
    'status',
    'action',
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: TicketList | null = null;
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  searchText: any;
  totalCount = -1;
  Cancelled = -1;
  Inprogress = -1;
  Completed = -1;

  //TICKETS
  dataSource = new MatTableDataSource(this.tickets);

  constructor(public dialog: MatDialog, private packagesService: PackageService) { }

  ngOnInit(): void {
    this.FETCH_ADMINS();
    this.dataSource = new MatTableDataSource(this.tickets);
    this.totalCount = this.dataSource.data.length;
    this.Completed = this.btnCategoryClick('Completed');
    this.Cancelled = this.btnCategoryClick('Cancelled');
    this.Inprogress = this.btnCategoryClick('InProgress');
  
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  // FETCH PACKAGES
  FETCH_ADMINS(): void {
    this.packagesService.GET_PACKAGES().subscribe({
      next: (response: any) => {
        console.log("Response", response)
        this.tickets = response;
        console.log("Tickets",this.tickets)
       
      },
      error: (error: any) => { 
     console.log("Error:", error)
       },
      complete: () => { 
      
      }
    });
  }

  //FILTER DATA
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

    this.Name = 'Name';
    this.Destination = 'Destination';
    this.Duration = 'Duration';
    this.Hotels = 'Hotels';
    this.Date = 'Date';
    this.Seats = 'Seats';
    this.Cost = 'Cost';
    this.Sell = 'Sell';
    this.Netprofit = 'Netprofit';
    this.Note= 'Note';
    this.Status = 'Status';
  }


  //GET THE CATEGORY LENGTH
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  //GET THE STATUS CLASS
  getStatusClass(status: string): string {
    switch (status) {
      case 'inprogress':
        return 'bg-light-warning mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'completed':
        return 'bg-light-success mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      case 'cancelled':
        return 'bg-light-error mat-body-2 f-w-500 p-x-8 p-y-4 f-s-12 rounded-pill';
      default:
        return '';
    }
  }


  //OPEN UPDATE & DELETE DIALOGS
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppTicketDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } 
      else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }


  //ADD ROW VALUES
  addRowData(row_obj: TicketList): void {
    const d = new Date();
    this.dataSource.data.unshift({
      id: d.getTime(),
      name: row_obj.name,
      destination: row_obj.destination,
      duration: row_obj.duration,
      hotels: row_obj.hotels,
      numberOfPeople: row_obj.numberOfPeople,
      price: row_obj.price,
      netprofit: row_obj.netprofit,
      note: row_obj.note,
      status: row_obj.status,
    });
    this.table.renderRows();
  }


  //UPDATE ROW VALUES
  Update(obj: any): void {
    this.ShowAddButoon = false

  this.Name = obj.name
  this.Destination = obj.destination
  this.Duration = obj.duration
  this.Hotels = obj.hotels
  this.Date = obj.date
  this.Seats = obj.nbOfSeats
  this.Cost = obj.cost
  this.Sell = obj.sell
  this.Netprofit = obj.netprofit
  this.Note = obj.note
  this.Status = obj.status

  }

  //DELETE ROW VALUES
  deleteRowData(row_obj: TicketList): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.id !== row_obj._id;
    });
  }
  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];
}


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

  constructor(
    public dialogRef: MatDialogRef<AppTicketDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TicketList
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

