import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Task } from '../task';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  showForm: boolean;
  taskName: String;
  taskDesc: String;
  taskType: String;
  type: String;
  types: String[];
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




  @Input() currentDate: Date;

  @Output() submitPressed = new EventEmitter<any>();

  constructor() {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'];
    this.types = ['Daily', 'Weekly', 'Monthly'];
    this.taskDesc = '';
    this.taskName = '';
    this.type = 'Daily';


  }

  ngOnInit() {
    this.updateDay(this.currentDate);
    this.endMonth = this.startMonth;
    this.endYear = this.startYear;
    this.endDate = this.startDate;

    this.startDatesList = this.createDateRange(this.startMonth, this.startYear);
    this.endDatesList = this.createDateRange(this.endMonth, this.endYear);

    this.yearsList = Array.from((Array(10).keys())).map( (_, ind) => 2018 + ind);
  }

  createDateRange(month, year) {
    let febNumberOfDays = 0;
    if ( (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
      febNumberOfDays = 29;
    } else {
      febNumberOfDays = 28;
    }
    const dayPerMonth = [31, febNumberOfDays , 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];
    const arr = Array.from((Array(dayPerMonth[month] + 1).keys()));
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
      desc: this.taskDesc,
      type: this.type,
      startDate: fullStartDate,
      endDate: fullEndDate
    });

    this.submitPressed.emit(newTask);
    this.reset();

  }

  reset() {
    this.taskName = '';
    this.taskDesc = '';
  }

  valueChange($event) {
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

}
