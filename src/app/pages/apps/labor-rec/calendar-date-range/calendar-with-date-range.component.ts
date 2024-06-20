import { Component, Output, EventEmitter, signal, OnInit, effect } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DateRange } from '../../visa-component/date-range';


@Component({
  standalone: true,
  selector: 'app-calendar-with-date-forlabor-range',
  templateUrl: './calendar-with-date-range.component.html',
  styleUrl: './calendar-with-date-range.component.scss',
  imports: [MatCalendar, FormsModule, CommonModule]
})
export class CalendarWithDateRangeFORLABORSComponent implements OnInit{
  selectedDate: Date;
  dateRange: DateRange;

  rangeStarted: Date;
  rangeEnded: Date;

  rangeStart = signal('');
  rangeEnd = signal('');

  @Output() dateRangeChange: EventEmitter<DateRange> = new EventEmitter<DateRange>();

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'MMM d, y') || '';
  }
  
  colorStartDate = false;
  colorEndDate = false;

  onDateChange(selectedDate: Date) {

    if (!this.dateRange) {
      this.dateRange = new DateRange();
    }

    if (!this.dateRange.startDate) {
      this.dateRange.startDate = selectedDate;
      this.rangeStart.set(this.getFormattedDate(selectedDate))
      this.rangeStarted = selectedDate;
      this.colorStartDate = true;
    } 
    
    else if (!this.dateRange.endDate) {
      this.dateRange.endDate = selectedDate;
      this.rangeEnd.set(this.getFormattedDate(selectedDate))
      this.dateRangeChange.emit(this.dateRange);
      this.rangeEnded = selectedDate;
      this.colorStartDate = true;
    } 
    
    else {
      this.dateRange = new DateRange();
      this.colorStartDate = false;
      this.colorEndDate = false;

      this.dateRange.startDate = selectedDate;
      this.rangeStart.set(this.getFormattedDate(selectedDate))
      this.rangeStart.set(this.getFormattedDate(selectedDate))
    }
  }

  isInRange(date: Date): boolean {
    console.log('here')
    if (!this.rangeStart || !this.rangeEnd) {
      return false;
    }
    return date >= this.rangeStarted && date <= this.rangeEnded;
  }
  
}