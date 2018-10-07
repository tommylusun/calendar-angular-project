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

  checkTaskButton;

  // task: Task;
  constructor(private taskListService: TaskListService) { }

  ngOnInit() {
    // this.task = this.taskItem;
    this.checkTaskButton = this.getCheckBox() ? 'Uncheck Task' : 'Mark as complete!';
  }

  checkTask() {
    this.taskListService.toggleCheckBox(this.taskItem, this.day);
    this.checkTaskButton = this.getCheckBox() ? 'Uncheck Task' : 'Mark as complete!';
  }

  getCheckBox() {
    return this.taskListService.getCheckBox(this.taskItem, this.day);
  }

  deleteTask() {
    this.taskListService.deleteTask(this.taskItem);
  }

}
