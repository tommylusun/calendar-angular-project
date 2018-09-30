import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() taskItem: Task;
  @Input() day: Date;

  @Output() deletePressed = new EventEmitter<any>();

  task: Task;
  constructor() { }

  ngOnInit() {
    this.task = this.taskItem;
  }

  checkTask(task: Task) {
    task.toggleCheckBox(this.day);
  }

  getCheckBox(task: Task) {
    return task.getCheckBox(this.day);
  }

  deleteTask(task: Task) {
    this.deletePressed.emit(task);
  }

}
