import { Component, Inject } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CalendarWithDateRangeFORLABORSComponent } from '../calendar-date-range/calendar-with-date-range.component';
import { DateRange } from '../../visa-component/date-range';

@Component({
  standalone: true,
  selector: 'app-calendar-forlabor-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrl: './calendar-dialog.component.scss',
  imports: [MatDialogContent, MatCalendar, MatDialogActions, CalendarWithDateRangeFORLABORSComponent]
})
export class CalendarDialogFORLABORSComponent {

    selectedDate: Date;
    dateRange: DateRange;
  
    constructor(
      public dialogRef: MatDialogRef<CalendarDialogFORLABORSComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { selectedDate: Date | null }
    ) {}
  
    onDateChange(selectedDate: Date) {
      this.selectedDate = selectedDate;
    }
  
    onDateRangeChange(dateRange: DateRange) {
      this.dateRange = dateRange;
    }
  
    onSave(): void {
      this.dialogRef.close(this.dateRange);
    }
  
    onCancel(): void {
      this.dialogRef.close(null);
    }

}