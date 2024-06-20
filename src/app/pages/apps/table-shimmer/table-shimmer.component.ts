import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-shimmer',
  templateUrl: './table-shimmer.component.html',
  styleUrl: './table-shimmer.component.scss'
})
export class TableShimmerComponent {
  @Input() pagedProducts: any[] = ['1', '2','3', '4', '5','6'];
  @Input () arrayHead = ['driverId', 'name','vehicle', 'currentLocation', 'Phone'];
}
