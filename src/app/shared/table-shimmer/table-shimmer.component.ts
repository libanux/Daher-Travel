import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-shimmer',
  templateUrl: './table-shimmer.component.html',
  styleUrls: ['./table-shimmer.component.css']
})
export class TableShimmerComponent {
  pagedProducts: any[] = ['1', '2','3', '4', '5','6'];
  @Input () arrayHead = ['driverId', 'name','vehicle', 'currentLocation', 'Phone'];

  
constructor() {}
}
