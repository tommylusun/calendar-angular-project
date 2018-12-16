import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Task } from '../taskNew';
import { CurrentDateService } from '../current-date.service';
import { Subscription } from 'rxjs';
import { TaskListService } from '../task-list.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  // showForm: boolean;
  taskName: String = '';
  taskDesc: String = '';
  repeat: string;
  daysPerWeek: number[];
  monthNames: String[];

  startYear: number;
  startMonth: number;
  startDate: number;

  endYear: number;
  endMonth: number;
  endDate: number;

  yearsList: number[];
  startDatesList: number[];
  endDatesList: number[];
  dayNames: string[];

  dateService: Subscription;

  constructor(private currentDateService: CurrentDateService, private tasksListService: TaskListService) {}

  ngOnInit() {
    const create_task_modal = document.getElementById('create_task_modal');
    this.monthNames = this.currentDateService.monthNames;
    this.updateDay(this.currentDateService.getDate());
    this.startDatesList = this.createDateRange(this.startMonth, this.startYear);
    this.endDatesList = this.createDateRange(this.endMonth, this.endYear);
    this.yearsList = Array.from((Array(10).keys())).map( (_, ind) => 2018 + ind);
    this.repeat = '0';
    this.daysPerWeek = [];
    this.dayNames = this.currentDateService._dayNames;

    this.dateService = this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.updateDay(data);
    });
  }

  createDateRange(month, year) {
    const days = this.currentDateService.getDaysPerMonth(year);
    const arr = Array.from((Array(days[month] + 1).keys()));
    arr.shift();
    return arr;
  }

  submit(taskForm: NgForm) {

    const fullStartDate = new Date(this.startYear, this.startMonth, this.startDate);
    let fullEndDate = new Date(this.endYear, this.endMonth, this.endDate);

    if (this.repeat === '0') {
      fullEndDate = new Date(this.startYear, this.startMonth, this.startDate);
    }
    if (this.taskName === '') {
      this.taskName =
      'Task starting ' +
      fullStartDate.toDateString() + ', ending ' +
      fullEndDate.toDateString();
    }
    const count = this.calcCount(fullStartDate, fullEndDate, this.daysPerWeek);

    const newTask = new Task({
      name: this.taskName,
      description: this.taskDesc,
      startDate: fullStartDate,
      endDate: fullEndDate,
      daysPerWeek: this.daysPerWeek,
      count: count
    });

    this.tasksListService.addTask(newTask);
    this.reset();
  }

  reset() {
    this.taskName = '';
    this.taskDesc = '';
  }

  calcCount(start: Date, end: Date, days: number[]) {

    const cur = new Date(start);
    let count = 1;
    while (cur.getTime() !== end.getTime()) {
      if (days.length === 0 || days.includes(cur.getDay())) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }

  selectStartMonth(ind) {
    this.startMonth = ind;
    this.startDatesList = this.createDateRange(this.startMonth, this.startYear);
  }

  selectEndMonth(ind) {
    this.endMonth = ind;
    this.endDatesList = this.createDateRange(this.endMonth, this.endYear);
  }

  updateDay(date: Date) {
    this.endDate = this.startDate = date.getDate();
    this.endMonth = this.startMonth = date.getMonth();
    this.endYear = this.startYear = date.getFullYear();
  }

  selectStartDate(ind) {
    this.startDate = ind;
  }

  selectEndDate(ind) {
    this.endDate = ind;
  }

  selectStartYear(ind) {
    this.startYear = ind;
  }

  selectEndYear(ind) {
    this.endYear = ind;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.dateService.unsubscribe();
  }

  toggleDay(day) {
    const index = this.daysPerWeek.indexOf(day);

    if (index === -1) {
      this.daysPerWeek.push(day);
    } else {
      this.daysPerWeek.splice(index, 1);
    }
    console.log(this.repeat);
  }

  closeModal() {
    console.log('fads');
  }
}
