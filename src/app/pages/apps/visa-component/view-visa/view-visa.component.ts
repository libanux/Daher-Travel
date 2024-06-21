import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisaClass } from '../../../../classes/visaClass';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-visa',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './view-visa.component.html',
  styleUrl: './view-visa.component.scss'
})
export class ViewVisaComponent {
  id: any;
  ticketDetail: VisaClass;
  displayedColumns: string[] = ['itemName', 'unitPrice', 'unit', 'total'];

  constructor(activatedRouter: ActivatedRoute) {
    // this.id = activatedRouter.snapshot.paramMap.get('id');
    // this.ticketDetail = this.visaservice.getVisaArray().filter((x) => x?.id === +this.id)[0];
  }
}
