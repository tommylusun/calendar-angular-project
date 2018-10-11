import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Task } from '../task';
import { TaskListService } from '../task-list.service';
import { CurrentDateService } from '../current-date.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() taskItem: Task;
  @Input() day: Date;

  checkTaskButton;

  // task: Task;
  constructor(private taskListService: TaskListService, private currentDateService: CurrentDateService) { }

  ngOnInit() {
    // this.task = this.taskItem;
    this.checkTaskButton = this.getCheckBox() ? 'Uncheck Task' : 'Mark as complete';

    // this.currentDateService.dateSubject.subscribe((date) => {
    //   this.checkTaskButton = this.getCheckBox() ? 'Uncheck Task' : 'Mark as complete!';
    // });
  }

  checkTask() {
    this.taskListService.toggleCheckBox(this.taskItem, this.day);
    this.checkTaskButton = this.getCheckBox() ? 'Uncheck Task' : 'Mark as complete!';
  }

  getCheckBox() {
    this.checkTaskButton = this.taskListService.getCheckBox(this.taskItem, this.day) ? 'Uncheck Task' : 'Mark as complete!';
    return this.taskListService.getCheckBox(this.taskItem, this.day);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.taskItem.showDetails = false;
  }

}
