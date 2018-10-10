import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {

  currentDate = new Date();

  dateSubject = new Subject<Date>();


  setDate(day: Date) {
    this.currentDate = new Date(day);
    this.dateSubject.next(day);
  }

  getDate() {
    return this.currentDate;
  }



}
