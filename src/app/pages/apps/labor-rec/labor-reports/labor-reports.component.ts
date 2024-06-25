import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Month_Filter_Array, Download_Options, Categories, GeneralService, Reports_Month_Filter_Array } from 'src/app/services/general.service';
import { LaborRecReportsService } from 'src/app/services/labore-rec-reports.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

const headers: any[] = [
  'Income',
  'Expenses',
  'NetProfit',
];


@Component({
  selector: 'app-labor-reports',
  templateUrl: './labor-reports.component.html',
  styleUrls: ['./labor-reports.component.scss', '../../../../../assets/scss/apps/general_table.scss']
})
export class LaborReportsComponent {

  selectedMonth: string = '';
  selectedDownloadOption: string = 'Download as';

  // Storing the start and end date selected in filtering by Date
  // Used in filter by date
  START_DATE = ''
  END_DATE = ''

  // TABLE SHIMMER 
  show_shimmer = true;
  ROWS_COUNT_SHIMMER: any[] = ['1', '2', '3', '4'];

  FILTER_TYPE = 'thisMonth'

  DATA = [
    { category: 'Rec', Income: '$0.00', Expenses: '$0.00', NetProfit: '$0.00' },
  ]

  months: any[] = Reports_Month_Filter_Array;
  Options: any[] = Download_Options;

  REPORTS_ARRAY = new MatTableDataSource(this.DATA);
  headers: any[] = headers;
  Categories: any[] = Categories

  searchText: any;

  constructor(public laborReportsService: LaborRecReportsService, public generalService: GeneralService, public dialog: MatDialog, private breadCrumbService: BreadCrumbSignalService) {

  }

  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Reports');
    this.FETCH_REPORTS()
  }

  showDatePicker = false;
  onChange(value: string, dropdown: string) {

    if (dropdown == 'month') {
      if (value === 'Calendar') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_TYPE = value;
        this.FETCH_REPORTS()
      }
    }

    else if (dropdown == 'Download') {
      this.DOWNLOAD(value);
    }
  }

  DOWNLOAD(OPTION: string): string {
    return this.selectedDownloadOption = 'Download As'
  }

  FORMAT_DATE_YYYYMMDD(date: Date): string {
    return this.generalService.FORMAT_DATE_YYYYMMDD(date)
  }

  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.START_DATE = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_TYPE = 'custom'
    this.FETCH_REPORTS()
  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.END_DATE = this.FORMAT_DATE_YYYYMMDD(event);
    this.FILTER_TYPE = 'custom'
    this.FETCH_REPORTS()
  }

  // GET ALL REPORTS
  FETCH_REPORTS() {
    // console.log("Filter tyepa:",this.FILTER_TYPE)
    // console.log("Start date",this.START_DATE)
    // console.log("end date",this.END_DATE)
    this.show_shimmer = true;
    this.laborReportsService.GET_RECRUITING_FINANCIAL_REPORT(this.FILTER_TYPE, this.START_DATE, this.END_DATE).subscribe({
      next: (response: any) => {
        this.DATA =
          [
            { category: 'Rec', Income: response.totalIncome, Expenses: response.totalExpense, NetProfit: response.netProfit },

          ]
      },
      error: (error: any) => { },
      complete: () => {
        this.REPORTS_ARRAY = new MatTableDataSource(this.DATA);
        this.show_shimmer = false;
      }
    });
  }
}
