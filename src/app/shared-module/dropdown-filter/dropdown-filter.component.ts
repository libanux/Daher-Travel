import { Component, Input, SimpleChanges } from '@angular/core';
import { DropdownService } from '../../signals/dropdown.service';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent {
  @Input() dropTitle: string = ''
  @Input() dropOptions: string[] = []

  @Input() dropTitle1: string = ''
  @Input() dropOptions1: string[] = []

  @Input() dropTitle2: string = ''
  @Input() dropOptions2: string[] = []


  selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';

  constructor(private dropService: DropdownService) { }


  onDrop1Change(event: any) {
    if(event == "All"){
      this.dropService.DropDown1.set('');
    }else{
      this.dropService.DropDown1.set(event);
    }
  }

  onDrop2Change(event: any) {
    if(event == "All"){
      this.dropService.DropDown2.set('');
    }else{
    this.dropService.DropDown2.set(event);

  }}

  onDrop3Change(event: any) {

    if(event == "All"){
      this.dropService.DropDown3.set('');
    }else{
    this.dropService.DropDown3.set(event);

  }
}
}
