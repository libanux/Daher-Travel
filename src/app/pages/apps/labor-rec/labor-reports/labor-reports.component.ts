import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Month_Filter_Array, Download_Options, Categories, GeneralService } from 'src/app/services/general.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';

const headers: any[] = [
  'category',
  'Cost',
  'Expenses',
  'NetProfit',
];

const tableData: any[] = [
  { category: 'Pack', Cost: '$40.00', Expenses: '$80.00', NetProfit: '$40.00' },
  { category: 'Visa', Cost: '$30.00', Expenses: '$3,000.00', NetProfit: '$3,000.00' },
  { category: 'Ticketing', Cost: '$10,000.00', Expenses: '$20,000.00', NetProfit: '¥100.70' },
  { category: 'Total', Cost: '$14,070.00', Expenses: '$31,000.00', NetProfit: '$3,000.70' },
];

@Component({
  selector: 'app-labor-reports',
  templateUrl: './labor-reports.component.html',
  styleUrls: ['./labor-reports.component.scss', '../../../../../assets/scss/apps/general_table.scss']
})
export class LaborReportsComponent {

  ShowAddButoon = true;
  selectedMonth: string = '';
  selectedDownloadOption: string = '';


  months: any[] = Month_Filter_Array
  Options: any[] = Download_Options
  TableData = new MatTableDataSource(tableData);
  headers: any[] = headers;
  Categories: any[] = Categories

  searchText: any;


  constructor(public generalService: GeneralService, public dialog: MatDialog, private breadCrumbService: BreadCrumbSignalService) {

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
}
