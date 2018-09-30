import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

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
  monthNames: string[];
  dayNames: string[];
  dayPerMonth: number[];
  FebNumberOfDays: number;
  selectedDate = Date;
  day: number;
  firstDayOfMonth: number;
  days: string[];

  counter: number;

  @Output() clickedDay = new EventEmitter<any>();

  constructor() {
    this.counter = 1;
    this.date = new Date();
    this.determineFebDays();
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'];
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.dayPerMonth = [31, this.FebNumberOfDays , 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];
    this.initializeCurrentDay();
    this.initializeCalendar();
  }


  initializeCalendar() {

    this.determineFebDays();
    console.log('YEAR: ' + this.currentYear + ' MONTH: ' + this.currentMonth + ' Day: ' + this.currentDate);
    const firstDay = new Date(this.currentYear, this.currentMonth, 1, 0);
    this.firstDayOfMonth = firstDay.getDay();
    this.days = Array.from((Array(this.dayPerMonth[this.currentMonth] + 1).keys())).map(String);
    this.days.shift();
    console.log(this.days);
    // const prevDays = [for (i of range(20,50,5)) i];
    this.days.unshift(...Array(this.firstDayOfMonth).fill(''));

    const lastDay = new Date(firstDay);
    lastDay.setDate(this.dayPerMonth[this.currentMonth] + 1);
    this.days.push(...Array(7 - lastDay.getDay()).fill(''));
    // this.days.push(...Array((7 + 1 - this.dayPerMonth[this.currentMonth] % 7)).fill(0));
  }

  ngOnInit() {}

  determineFebDays() {
    if ( (this.currentYear % 100 !== 0) && (this.currentYear % 4 === 0) || (this.currentYear % 400 === 0)) {
      this.FebNumberOfDays = 29;
    } else {
      this.FebNumberOfDays = 28;
    }
  }

  clickDay(day) {
    console.log('Go to Day ' + day);

    if (day !== '') {
      this.date = new Date(this.currentYear, this.currentMonth, day, 0);
      console.log('Go to Day ' + this.currentYear + ' '  + this.currentMonth + ' ' + day);
      this.initializeCurrentDay();
    }

    this.clickedDay.emit(this.date);
  }

  goToDay(date: Date) {
    this.date = new Date(date);
    this.initializeCurrentDay();
  }

  goToToday() {
    this.date = new Date();
    this.initializeCurrentDay();
    this.initializeCalendar();
    this.clickedDay.emit(this.date);
  }
  goToPrevDay() {
    this.date.setDate(this.date.getDate() - 1);
    this.initializeCurrentDay();
    this.initializeCalendar();
    this.clickedDay.emit(this.date);
  }

  goToNextDay() {
    this.date.setDate(this.date.getDate() + 1);
    this.initializeCurrentDay();
    this.initializeCalendar();
    this.clickedDay.emit(this.date);
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
    }
    this.initializeCalendar();
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
