import { Component, effect } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFSignalService } from 'src/app/signals/pdf-download.signal';

@Component({
  selector: 'app-pdfs-template',
  templateUrl: './pdfs-template.component.html',
  styleUrls: ['./pdfs-template.component.scss', '../../../../../assets/scss/apps/general_table.scss']
})
export class PdfsTemplateComponent {
  constructor(private pdfService: PDFSignalService) {
    console.log("HEREE")
    effect(() => {
     
      console.log("Download PDF signal changed: ", this.pdfService.DOWNLOAD_PDF());
      if (this.pdfService.DOWNLOAD_PDF()) {

        this.generatePDF();
      }
    });
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
  
  

  
  
}
