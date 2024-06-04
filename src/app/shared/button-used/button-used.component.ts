import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-used',
  templateUrl: './button-used.component.html',
  styleUrls: ['./button-used.component.css']
})
export class ButtonUsedComponent  {
  @Input() Blue = true;
  @Input() buttonValue = '';
  // @Input() isDisabled :boolean = false;
 
  constructor(){
  }

}
