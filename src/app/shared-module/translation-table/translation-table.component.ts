import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ViewedObjectService } from '../../signals/viewed-object.service';

@Component({
  selector: 'app-translation-table',
  templateUrl: './translation-table.component.html',
  styleUrls: ['./translation-table.component.css']
})
export class TranslationTableComponent implements OnInit{

  @Input() showform = false;
  @Input() translationArray: any [] = [];

  selected_Translation =  signal(0);

  status: string = "ACCEPTED"

  dropTitle1: string = 'SPEAKERS';
  dropTitle2: string = 'TYPE';
  dropTitle3: string = 'STATUS';
  dropOptions1: string[] = ["All", "1-2", "3 or more"];
  dropOptions2: string[] = ["All", "Human", "AI"];
  dropOptions3: string[] = ["All", "ACCEPTED", "IN PROGRESS"];

  constructor(private signalService: ViewedObjectService, private router: Router) { }
 
  ngOnInit(): void {
    this.selected_Translation = this.signalService.selected_Translation
  }
  
  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.selected_Translation.set(id);
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
