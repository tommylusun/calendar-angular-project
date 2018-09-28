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

  @Input() currentDate: Date;

  @Output() submitPressed = new EventEmitter<any>();

  constructor() {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'];
    this.types = ['Daily', 'Weekly', 'Monthly'];
    this.taskDesc = 'Placeholder';
    this.taskName = 'Placeholder';
    this.type = 'Daily';
  }

  ngOnInit() {
    this.updateDay(this.currentDate);
    this.endMonth = this.startMonth;
    this.endYear = this.startYear;
    this.endDate = this.startDate;
  }

  submit(taskForm: NgForm) {

    const fullStartDate = new Date(this.startYear, this.startMonth, this.startDate);
    const fullEndDate = new Date(this.endYear, this.endMonth, this.endDate);

    const newTask = new Task({
      name: this.taskName,
      desc: this.taskDesc,
      type: this.type,
      startDate: fullStartDate,
      endDate: fullEndDate
    });
    console.log(newTask);
    if (this.taskDesc && this.taskName) {
      this.submitPressed.emit(newTask);
    }
  }

  valueChange($event) {
  }

  cancel() {
    this.showForm = false;
  }

  selectStartMonth(ind) {
    this.startMonth = ind;
  }
  selectEndMonth(ind) {
    this.endMonth = ind;
  }

  updateDay(date: Date) {
    this.endDate = this.startDate = date.getDate();
    this.endMonth = this.startMonth = date.getMonth();
    this.endYear = this.startYear = date.getFullYear();
  }

}
