import { AfterViewInit, Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LaborList } from '../labor';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LaborRecService } from 'src/app/services/labor-rec.service';

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
  editedpackage: LaborList

  //TABLE COLUMNS
  displayedColumns: string[] = [
    'name',
    'nationality',
    'gender',
    'type',
    'age',
    'cost',
    'note',
    'status',
    'action',
  ];
 
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: LaborList | null = null;

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

  constructor(public dialog: MatDialog, private recruitingService: LaborRecService) { }

  ngOnInit(): void {
this.FETCH_RECRUITINGS();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

 

  
  //FETCH PACKAGES FROM API
  FETCH_RECRUITINGS(): void {
    this.recruitingService.GET_RECRUITING().subscribe({
      next: (response: any) => {
        this.recruitings = response;
        this.dataSource = new MatTableDataSource(this.recruitings);
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





  //UPDATE ROW VALUES
  Update(obj: any): void {
    this.ShowAddButoon = false;
    console.log("Hereee")
    // this.Name = obj.name
    // this.Nationality = obj.nationality
    // this.Gender = obj.gender
    // this.Type = obj.type
    // this.Age = obj.age
    // this.Cost = obj.cost
    // this.Note = obj.note
    // this.Status = obj.status

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








