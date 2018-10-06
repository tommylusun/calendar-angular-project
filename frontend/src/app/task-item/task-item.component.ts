import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() taskItem: Task;
  @Input() day: Date;

  showDetails = false;

  // task: Task;
  constructor(private taskListService: TaskListService) { }

  ngOnInit() {
    // this.task = this.taskItem;
  }

  checkTask() {
    this.taskListService.toggleCheckBox(this.taskItem, this.day);
  }

  getCheckBox() {
    return this.taskListService.getCheckBox(this.taskItem, this.day);
  }

  deleteTask() {
    this.taskListService.deleteTask(this.taskItem);
  }

}
