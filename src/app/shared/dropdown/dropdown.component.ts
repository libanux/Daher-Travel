import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() Table = '';
  @Input() showDropDown = false;
  @Input() showDropDown2 = false;
  @Input() DropDownArray: any = [];
  @Input() DropDownArray2: any = [];

  selecetedValue = 'All';
  selecetedValue2 = 'All';

  constructor() {}

  selected(value: string) {
    this.selecetedValue = value;
    if (this.Table == 'PRODUCTS') {

    } 
    else if (this.Table == 'TRANSACTION') {
      
    }
  }

  selected2(value: string) {
    this.selecetedValue2 = value;

    if (this.Table == 'TRANSACTION') {
    }
  }
}
