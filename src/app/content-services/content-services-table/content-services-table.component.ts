import { Component } from '@angular/core';

@Component({
  selector: 'app-content-services-table',
  templateUrl: './content-services-table.component.html',
  styleUrl: './content-services-table.component.css'
})
export class ContentServicesTableComponent {

  dropTitle1: string = ' Type';
  dropTitle2: string = 'Translated';
  dropTitle3: string = 'Status';


  dropOptions1: string[] = ["All", "Blog Posts", "Newsletters & Press Releases", "Social media content writing", "Copywriting"];
  dropOptions2: string[] = ["All", "Arabic", "English", "French"];
  dropOptions3: string[] = ["All", "Completed", "Inprogress", "Pending"];
}
