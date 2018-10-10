import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {

  currentDate = new Date();
  dateSubject = new Subject<Date>();

  _monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  _dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  _daysPerMonth: number[] = [31, 0 , 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];
  _febNumberOfDays: number;


  setDate(day: Date) {
    this.currentDate = new Date(day);
    this.dateSubject.next(day);
  }

  getDate() {
    return this.currentDate;
  }

  get monthNames() {
    return this._monthNames;
  }

  get dayNames() {
    return this._dayNames;
  }

  getDaysPerMonth(year: number) {
    this._daysPerMonth[1] = this.determineFebDays(year);
    return this._daysPerMonth;
  }

  determineFebDays(year) {
    if ( (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
      return 29;
    } else {
      return 28;
    }
  }





}
