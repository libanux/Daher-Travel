import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { GeneralService } from '../../service-folder/general.service';
@Component({
  selector: 'app-website-trans-table',
  templateUrl: './website-trans-table.component.html',
  styleUrl: './website-trans-table.component.css'
})
export class WebsiteTransTableComponent {

  // MOVE TO SPECIFIC ROUTE WITH ROW ID
  moveToRouteWithIndex(route: string, id: number) {
    // this.router.navigate([route], { queryParams: { id: id } }).then(() => {
    //   window.scrollTo(0, 0);
    // });
  }


}
