import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CurrentDateService } from '../current-date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  month: number;
  currentDate: number;
  currentMonth: number;
  currentYear: number;

  date: Date;
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayPerMonth: number[] = [31, 0 , 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];
  FebNumberOfDays: number;
  selectedDate = Date;
  day: number;
  firstDayOfMonth: number;
  days: string[];

  dateSub: Subscription;

  constructor(private currentDateService: CurrentDateService) {
  }

  initializeCalendar() {

    this.determineFebDays();
    // console.log('YEAR: ' + this.currentYear + ' MONTH: ' + this.currentMonth + ' Day: ' + this.currentDate);

    // Push list of dates of month to array
    this.days = Array.from((Array(this.dayPerMonth[this.currentMonth] + 1).keys())).map(String);
    this.days.shift();

    // Determine which day first date of month begins on
    const firstDay = new Date(this.currentYear, this.currentMonth, 1, 0);
    this.days.unshift(...Array(firstDay.getDay()).fill(''));

    // Determin which day last date of month ends on
    const lastDay = new Date(this.currentYear, this.currentMonth, this.dayPerMonth[this.currentMonth] + 1, 0);
    this.days.push(...Array(7 - lastDay.getDay()).fill(''));
  }

  ngOnInit() {
    this.date = this.currentDateService.getDate();
    this.initializeCurrentDay();
    this.initializeCalendar();

    this.dateSub = this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.date = data;
      if (this.currentYear === data.getFullYear() && this.currentMonth === data.getMonth()) {
        this.initializeCurrentDay();
      } else {
        this.initializeCurrentDay();
        this.initializeCalendar();
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.dateSub.unsubscribe();
  }

  determineFebDays() {
    if ( (this.currentYear % 100 !== 0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 === 0)) {
      this.FebNumberOfDays = 29;
    } else {
      this.FebNumberOfDays = 28;
    }
    this.dayPerMonth[1] = this.FebNumberOfDays;
  }

  clickDay(day) {
    if (day !== '') {
      this.currentDateService.dateSubject.next(new Date(this.currentYear, this.currentMonth, day, 0));
    }
  }

  goToDay(date: Date) {
    this.currentDateService.dateSubject.next(date);
  }

  goToToday() {
    this.currentDateService.dateSubject.next(new Date());
  }
  goToPrevDay() {
    this.date.setDate(this.date.getDate() - 1);
    this.currentDateService.dateSubject.next(this.date);

  }

  goToNextDay() {
    this.date.setDate(this.date.getDate() + 1);
    this.currentDateService.dateSubject.next(this.date);
  }

  firstRowNeeded() {
    return this.days.slice(0, 7).includes('1');
  }

  nextMonth() {
    if (this.currentMonth <= 10) {
      this.currentMonth++;
      this.initializeCalendar();
    }
  }

  prevMonth() {
    if (this.currentMonth >= 1) {
      this.currentMonth--;
      this.initializeCalendar();
    }
  }

  nextYear() {
      this.currentYear++;
      this.initializeCalendar();

  }

  prevYear() {
      this.currentYear--;
      this.initializeCalendar();
  }

  initializeCurrentDay() {
    this.currentDate = this.date.getDate();
    this.day = this.date.getDay();
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
  }

  dateSelected(day) {
    return (this.currentMonth === this.date.getMonth()
    && this.currentYear === this.date.getFullYear()
    && Number(day) === this.date.getDate());
  }

  selectMonth(ind) {
    this.currentMonth = ind;
    this.initializeCalendar();
  }
}
