import { Component, Output, EventEmitter, signal, OnInit, effect } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
// import { any } from '../../visa-component/date-range';


@Component({
  standalone: true,
  selector: 'app-calendar-with-date-forlabor-range',
  templateUrl: './calendar-with-date-range.component.html',
  styleUrl: './calendar-with-date-range.component.scss',
  imports: [MatCalendar, FormsModule, CommonModule]
})
export class CalendarWithanyFORLABORSComponent implements OnInit{
  selectedDate: Date;
  any: any;

  rangeStarted: Date;
  rangeEnded: Date;

  rangeStart = signal('');
  rangeEnd = signal('');

  @Output() anyChange: EventEmitter<any> = new EventEmitter<any>();

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

    if (!this.any) {
      this.any = 'new any();'
    }

    if (!this.any.startDate) {
      this.any.startDate = selectedDate;
      this.rangeStart.set(this.getFormattedDate(selectedDate))
      this.rangeStarted = selectedDate;
      this.colorStartDate = true;
    } 
    
    else if (!this.any.endDate) {
      this.any.endDate = selectedDate;
      this.rangeEnd.set(this.getFormattedDate(selectedDate))
      this.anyChange.emit(this.any);
      this.rangeEnded = selectedDate;
      this.colorStartDate = true;
    } 
    
    else {
      this.any = 'new any();'
      this.colorStartDate = false;
      this.colorEndDate = false;

      this.any.startDate = selectedDate;
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