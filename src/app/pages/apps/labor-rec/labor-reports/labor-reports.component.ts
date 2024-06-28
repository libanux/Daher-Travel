import { IfStmt } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Month_Filter_Array, Download_Options, Categories, Reports_Month_Filter_Array, GeneralService } from 'src/app/services/general.service';
import { LaborRecReportsService } from 'src/app/services/labore-rec-reports.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';
import { PDFSignalService } from 'src/app/signals/pdf-download.signal';
import { PdfsTemplateComponent } from '../pdfs-template/pdfs-template.component';
import { LaborPdfData } from 'src/app/classes/labor-pdf-data.class';

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
  @ViewChild(PdfsTemplateComponent) pdfsTemplateComponent: PdfsTemplateComponent;
  hidePdfComponent: boolean = true;
  selectedMonth: string = '';
  selectedDownloadOption: string = 'Download as';
  showPdfComponent:boolean = false;
  // Storing the start and end date selected in filtering by Date
  // Used in filter by date
  START_DATE = ''
  END_DATE = ''
  SHOW_PDF =false;

  // TABLE SHIMMER 
  show_shimmer = true;
  ROWS_COUNT_SHIMMER: any[] = ['1', '2', '3', '4'];

  FILTER_TYPE = 'thisMonth'
  PDF_DATA :LaborPdfData = new LaborPdfData()
  DATA = [
    { category: 'Rec', Income: '$0.00', Expenses: '$0.00', NetProfit: '$0.00' },
  ]

  months: any[] = Reports_Month_Filter_Array;
  Options: any[] = Download_Options;

  REPORTS_ARRAY = new MatTableDataSource(this.DATA);
  headers: any[] = headers;
  Categories: any[] = Categories

  searchText: any;

  constructor(private pdfService: PDFSignalService,public laborReportsService: LaborRecReportsService, public generalService: GeneralService, public dialog: MatDialog, private breadCrumbService: BreadCrumbSignalService) {

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
        this.pdfService.LABOR_PDF_DATA.set(this.PDF_DATA)
        this.pdfService.triggerDownload();
      }
    }
  }

  
  generatePDF() {
    const data = document.getElementById('pdfContent');
    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
  
        const contentDataURL = canvas.toDataURL('image/png');
        console.log("Generated data URL:", contentDataURL); // Log the data URL for inspection
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
  
        try {
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
  
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
  
          pdf.save('GeneratedPDF.pdf');
          this.pdfService.DOWNLOAD_PDF.set(false);
        } catch (error) {
          console.error("Error adding image to PDF:", error);
        }
      }).catch(error => {
        console.error("Error generating canvas:", error);
      });
    } else {
      console.error("Element with ID 'pdfContent' not found.");
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
        this.PDF_DATA.income =response.totalIncome;
        this.PDF_DATA.expense = response.totalExpense;
        this.PDF_DATA.netprofit =response.netProfit;
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


}
