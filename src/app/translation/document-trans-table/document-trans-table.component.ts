import { Component, EventEmitter, Input, OnInit, Output, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../service-folder/general.service';
import { TranslationService } from '../../service-folder/translation.service';
import { DropdownService } from '../../signals/dropdown.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';
@Component({
  selector: 'app-document-trans-table',
  templateUrl: './document-trans-table.component.html',
  styleUrl: './document-trans-table.component.css'
})
export class DocumentTransTableComponent {

  dropTitle1: string = 'Original';
  dropTitle2: string = 'Translated';
  dropTitle3: string = 'Status';

  dropOptions1: string[] = ["All", "Arabic", "English", "French"];
  dropOptions2: string[] = ["All", "Arabic", "English", "French"];
  dropOptions3: string[] = ["All", "Completed", "Inprogress", "Pending"];

  filter1: string = ''
  filter2: string = ''
  filter3: string = ''


  //MOVE TO SPECIFIC ROUTE WITH ROW ID
  moveToRouteWithIndex(route: string, id: number) {
    // this.selected_Translation.set(id);
    // this.router.navigate([route]).then(() => {
    //   window.scrollTo(0, 0);
    // });
  }

}
