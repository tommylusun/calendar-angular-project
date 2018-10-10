import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Task } from '../task';
import { CurrentDateService } from '../current-date.service';
import { Subscription } from 'rxjs';
import { TaskListService } from '../task-list.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  showForm: boolean;
  taskName: String = '';
  taskDesc: String = '';
  taskType: String;

  type: String = 'Daily';
  types: String[] = ['Daily', 'Weekly', 'Monthly'];
  monthNames: String[] = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  startYear: number;
  startMonth: number;
  startDate: number;

  endYear: number;
  endMonth: number;
  endDate: number;

  yearsList: number[];
  startDatesList: number[];
  endDatesList: number[];

  dateService: Subscription;

  @Output() submitPressed = new EventEmitter<any>();

  constructor(private currentDateService: CurrentDateService, private tasksListService: TaskListService) {}

  ngOnInit() {
    this.updateDay(this.currentDateService.getDate());
    this.startDatesList = this.createDateRange(this.startMonth, this.startYear);
    this.endDatesList = this.createDateRange(this.endMonth, this.endYear);
    this.yearsList = Array.from((Array(10).keys())).map( (_, ind) => 2018 + ind);

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
    const fullEndDate = new Date(this.endYear, this.endMonth, this.endDate);

    if (this.taskName === '') {
      this.taskName = this.type +
      ' Task starting ' +
      fullStartDate.toDateString() + ', ending ' +
      fullEndDate.toDateString();
    }
    const newTask = new Task({
      name: this.taskName,
      description: this.taskDesc,
      type: this.type,
      startDate: fullStartDate,
      endDate: fullEndDate
    });

    this.tasksListService.addTask(newTask);
    this.reset();
    this.showForm = false;
  }

  reset() {
    this.taskName = '';
    this.taskDesc = '';
  }

  cancel() {
    this.showForm = false;
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
}
