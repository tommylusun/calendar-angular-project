import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
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

  @Output() submitPressed = new EventEmitter<any>();

  constructor() {
    this.showForm = false;
    this.types = ['Daily', 'Weekly', 'Monthly'];
  }

  ngOnInit() {
  }

  addTaskButton() {
    this.showForm = true;
  }
  submit(taskForm: NgForm) {
    console.log(this.taskDesc);
    console.log(this.taskName);

    if (this.taskDesc && this.taskName) {
      this.submitPressed.emit({
        name: this.taskName,
        desc: this.taskDesc,
        type: this.type,
        done: false
      });
    }
    this.showForm = false;
  }

  valueChange($event) {
    console.log(this.taskDesc);
  }

  cancel() {
    this.showForm = false;
  }

}
