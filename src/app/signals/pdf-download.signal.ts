import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PDFSignalService {
    DOWNLOAD_PDF = signal<boolean>(false);

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
