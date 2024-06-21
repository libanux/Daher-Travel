import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Categories, Download_Options, GeneralService, Reports_Month_Filter_Array } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

// Define the headers as an array of Header objects
const headers: any[] = [
  'category',
   'Cost' ,
   'Expenses' ,
   'NetProfit' ,
];

const tableData: any[] = [
  { category: 'Pack', Cost: '$40.00', Expenses: '$80.00', NetProfit: '$40.00' },
  { category: 'Visa', Cost: '$30.00', Expenses: '$3,000.00', NetProfit: '$3,000.00' },
  { category: 'Ticketing', Cost: '$10,000.00', Expenses: '$20,000.00', NetProfit: '¥100.70' },
  { category: 'Total', Cost: '$14,070.00', Expenses: '$31,000.00', NetProfit: '$3,000.70' },
];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls:[ './reports.component.scss','../../../../assets/scss/apps/general_table.scss',]
})
export class ReportsComponent implements OnInit {

  ShowAddButoon = true;
  selectedMonth: string = '';
  selectedDownloadOption: string = '';

  // Storing the start and end date selected in filtering by Date
  // Used in filter by date
  startDateValue: string = '';
  endDateValue: string = '';

  months: any[] = Reports_Month_Filter_Array;
  Options: any [] = Download_Options;

  
TableData = new MatTableDataSource(tableData);
headers: any [] = headers;
Categories : any [] = Categories

searchText: any;


constructor(public generalService: GeneralService, public dialog: MatDialog, private breadCrumbService:BreadCrumbSignalService) {

}

ngOnInit(): void {
  this.breadCrumbService.currentRoute.set('Reports')
}

showDatePicker = false;
onChange(value: string, dropdown: string) {

  if (dropdown == 'month') {
    if (value === 'Calendar') {
      this.showDatePicker = true;
    }

    else {
      this.showDatePicker = false;
      // this.FILTER_ARRAY_BY_DATE(value)
    }
  }

  else if (dropdown == 'Download') {
    if (value == 'all') {
      // this.FETCH_VISA()
    }
    else {
      // this.FILTER_ARRAY_BY_STATUS(value)
    }
  }
}

FORMAT_DATE_YYYYMMDD(date: Date): string {
  return this.generalService.FORMAT_DATE_YYYYMMDD(date)
}

  // Method to handle changes in start date input
  handleStartDateChange(event: any): void {
    this.startDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    // this.FILTER_ARRAY_BY_DATE('custom')
  }

  // Method to handle changes in end date input
  handleEndDateChange(event: any): void {
    this.endDateValue = this.FORMAT_DATE_YYYYMMDD(event);
    // this.FILTER_ARRAY_BY_DATE('custom')
  }
}