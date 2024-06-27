import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Month_Filter_Array, Download_Options, Categories, Reports_Month_Filter_Array, GeneralService } from 'src/app/services/general.service';
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
      if (value === 'custom') {
        this.showDatePicker = true;
      }

      else {
        this.showDatePicker = false;
        this.FILTER_TYPE = value;
        this.FETCH_REPORTS()
      }
    }
    else if (dropdown == 'Download') {
      if(value=='Excel'){
        this.DOWNLOAD();
      }else if(value=='PDF'){
        this.generatePDF();
      }
    }
  }

  DOWNLOAD() {
    const requestBody = {
      filterType: this.FILTER_TYPE,
      startDate: '',
      endDate: ''
    };
    
    this.generalService.getDataForReports('EXPORT_RECRUITING_FINANCIAL_REPORT_TO_EXCEL', requestBody);
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

  title = 'Your Title';
  description = 'Your description text goes here.';

  generatePDF() {
    const data = document.getElementById('pdfContent');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('GeneratedPDF.pdf');
      });
    }
  }
}
