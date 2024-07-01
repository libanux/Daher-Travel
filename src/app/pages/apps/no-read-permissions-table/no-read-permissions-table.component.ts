import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-no-read-permissions-table',
  templateUrl: './no-read-permissions-table.component.html',
  styleUrl: './no-read-permissions-table.component.scss'
})
export class NoReadPermissionsTableComponent implements OnInit{

@Input() ARRAY= new MatTableDataSource();
@Input() DISPLAYED_COLUMNS: any [] = []
columnsToDisplayWithExpand: any [] = []

ngOnInit(): void {
  this.columnsToDisplayWithExpand = {...this.DISPLAYED_COLUMNS}

  console.log(this.DISPLAYED_COLUMNS)
}
}
