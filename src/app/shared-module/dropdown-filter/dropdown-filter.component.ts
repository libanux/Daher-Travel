import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent {
@Input() dropTitle: string =''
@Input() dropOptions: string[] =[]
}
