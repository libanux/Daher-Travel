import { Injectable, effect, signal } from '@angular/core';
import { LaborPdfData } from '../classes/labor-pdf-data.class';

@Injectable({
  providedIn: 'root'
})
export class PDFSignalService {
    DOWNLOAD_PDF = signal<boolean>(false);
    LABOR_PDF_DATA= signal<LaborPdfData>(new LaborPdfData())

    constructor() {
        effect(() => {
        console.log("Download PDF",this.DOWNLOAD_PDF())
        });
       }

  triggerDownload() {
    this.DOWNLOAD_PDF.set(true);
  }

  resetDownload() {
    this.DOWNLOAD_PDF.set(false);
  }
}
