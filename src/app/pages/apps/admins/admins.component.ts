import { DatePipe } from '@angular/common';
import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminDialogComponent } from './admin-dialog.component';

export interface Admin {
  id: number;
  Name: string;
  Position: string;
  Email: string;
  Mobile: number;
  DateOfJoining: Date;
  Salary: number;
  Projects: number;
  imagePath: string;
}

const employees = [
  {
    id: 1,
    Name: 'Johnathan Deo',
    Position: 'Seo Expert',
    Email: 'r@gmail.com',
    Mobile: 9786838,
    DateOfJoining: new Date('01-2-2020'),
    Salary: 12000,
    Projects: 10,
    imagePath: 'assets/images/profile/user-2.jpg',
  },
  {
    id: 2,
    Name: 'Mark Zukerburg',
    Position: 'Web Developer',
    Email: 'mark@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('04-2-2020'),
    Salary: 12000,
    Projects: 10,
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    id: 3,
    Name: 'Sam smith',
    Position: 'Web Designer',
    Email: 'sam@gmail.com',
    Mobile: 7788838,
    DateOfJoining: new Date('02-2-2020'),
    Salary: 12000,
    Projects: 10,
    imagePath: 'assets/images/profile/user-4.jpg',
  },
  {
    id: 4,
    Name: 'John Deo',
    Position: 'Tester',
    Email: 'john@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('03-2-2020'),
    Salary: 12000,
    Projects: 11,
    imagePath: 'assets/images/profile/user-5.jpg',
  },
  {
    id: 5,
    Name: 'Genilia',
    Position: 'Actor',
    Email: 'genilia@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('05-2-2020'),
    Salary: 12000,
    Projects: 19,
    imagePath: 'assets/images/profile/user-6.jpg',
  },
  {
    id: 6,
    Name: 'Jack Sparrow',
    Position: 'Content Writer',
    Email: 'jac@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('05-21-2020'),
    Salary: 12000,
    Projects: 5,
    imagePath: 'assets/images/profile/user-7.jpg',
  },
  {
    id: 7,
    Name: 'Tom Cruise',
    Position: 'Actor',
    Email: 'tom@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('02-15-2019'),
    Salary: 12000,
    Projects: 9,
    imagePath: 'assets/images/profile/user-3.jpg',
  },
  {
    id: 8,
    Name: 'Hary Porter',
    Position: 'Actor',
    Email: 'hary@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('07-3-2019'),
    Salary: 12000,
    Projects: 7,
    imagePath: 'assets/images/profile/user-6.jpg',
  },
  {
    id: 9,
    Name: 'Kristen Ronaldo',
    Position: 'Player',
    Email: 'kristen@gmail.com',
    Mobile: 8786838,
    DateOfJoining: new Date('01-15-2019'),
    Salary: 12000,
    Projects: 1,
    imagePath: 'assets/images/profile/user-5.jpg',
  },
];

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'name',
    'email',
    'mobile',
    'date of joining',
    'salary',
    'projects',
    'action',
  ];
  dataSource = new MatTableDataSource(employees);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: Admin): void {
    this.dataSource.data.unshift({
      id: employees.length + 1,
      Name: row_obj.Name,
      Position: row_obj.Position,
      Email: row_obj.Email,
      Mobile: row_obj.Mobile,
      DateOfJoining: new Date(),
      Salary: row_obj.Salary,
      Projects: row_obj.Projects,
      imagePath: row_obj.imagePath,
    });
    this.table.renderRows();
  }

  updateRowData(row_obj: Admin): void {
    this.dataSource.data = this.dataSource.data.map((value: any) => {
      if (value.id === row_obj.id) {
        return {
          ...value,
          ...row_obj
        };
      }
      return value;
    });
  }

  deleteRowData(row_obj: Admin): void {
    this.dataSource.data = this.dataSource.data.filter((value: any) => value.id !== row_obj.id);
  }
}
