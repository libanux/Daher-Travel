import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent {
@Input() dropTitle: string =''
@Input() dropOptions: string[] =[]

@Input() dropTitle1: string =''
@Input() dropOptions1: string[] =[]

@Input() dropTitle2: string =''
@Input() dropOptions2: string[] =[]


selectedOption1: string='';
selectedOption2: string='';
selectedOption3: string='';

// constructor(private drop){}


onDrop1Change( event: any) {
  

}

onDrop2Change( event: any) {
  

}

onDrop3Change( event: any) {
  

}
}
