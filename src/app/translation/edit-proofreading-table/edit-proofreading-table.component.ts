import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { GeneralService } from '../../service-folder/general.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../service-folder/translation.service';
import { TranslationSignalService } from '../../signals/translation-signal.service';

@Component({
  selector: 'app-edit-proofreading-table',
  templateUrl: './edit-proofreading-table.component.html',
  styleUrl: './edit-proofreading-table.component.css'
})
export class EditProofreadingTableComponent {

  // MOVE TO SPECIFIC ROUTE WITH ROW ID 
  moveToRouteWithIndex(route: string, id: number) {
    // this.selected_Translation.set(id);
    // this.router.navigate([route], { queryParams: { id: id } }).then(() => {
    //   window.scrollTo(0, 0);
    // });
  }
}
