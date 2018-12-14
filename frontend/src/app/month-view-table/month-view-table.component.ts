import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskListService } from '../task-list.service';
import { CurrentDateService } from '../current-date.service';
import { Subscription } from 'rxjs';
import { TableDateItemComponent } from './table-date-item/table-date-item.component';

@Component({
  selector: 'app-month-view-table',
  templateUrl: './month-view-table.component.html',
  styleUrls: ['./month-view-table.component.css']
})
export class MonthViewTableComponent implements OnInit {


  @Output() open: EventEmitter<any> = new EventEmitter();

  weekTasks = [];
  weekHeaders: string[] = [];
  monthNames;
  dateSubscription: Subscription;
  currentTaskSubscription: Subscription;

  month: number;
  currentDate: number;
  currentMonth: number;
  currentYear: number;
  day: number;
  date: Date;
  selectedDate = Date;
  firstDayOfMonth: number;
  days: string[];
  dayNames: string[];

  constructor(private taskListService: TaskListService, private currentDateService: CurrentDateService) { }

  ngOnInit() {
    this.monthNames = this.currentDateService.monthNames;
    this.dayNames = this.currentDateService.dayNames;
    this.date = this.currentDateService.getDate();

    this.initializeCurrentDay();
    this.initializeCalendar();

    this.dateSubscription = this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.date = new Date(data);
      this.initializeCurrentDay();
      this.initializeCalendar();

    });
    // this.currentTaskSubscription = this.taskListService.sendTask.subscribe((task))
    // this.taskListService.getTasks();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

  initializeCalendar() {
    const days = this.currentDateService.getDaysPerMonth(this.currentYear);
    // Push list of dates of month to array
    this.days = Array.from((Array(days[this.currentMonth] + 1).keys())).map(String);
    this.days.shift();

    // Determine which day first date of month begins on
    const firstDay = new Date(this.currentYear, this.currentMonth, 1, 0);
    this.days.unshift(...Array(firstDay.getDay()).fill(''));

    // Determine which day last date of month ends on
    const lastDay = new Date(this.currentYear, this.currentMonth, days[this.currentMonth] + 1, 0);

    this.days.push(...Array(7 - lastDay.getDay()).fill(''));
  }

  initializeCurrentDay() {
    this.currentDate = this.date.getDate();
    this.day = this.date.getDay();
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
  }

  getFullDate(day) {
    if (day !== '') {
      return new Date(this.currentYear, this.currentMonth, day);
    }
  }
}
