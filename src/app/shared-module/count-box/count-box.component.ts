import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-count-box',
  templateUrl: './count-box.component.html',
  styleUrls: ['./count-box.component.css']
})
export class CountBoxComponent {
  @Input() title: string = 'title'
  @Input() onlyString: boolean = true;
  @Input() stringValue: string = 'string here';
  @Input() firstNb: number = 0;
  @Input() secondNb: number = 0;
}
