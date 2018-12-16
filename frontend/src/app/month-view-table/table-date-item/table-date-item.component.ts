import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TaskListService } from 'src/app/task-list.service';
import { CurrentDateService } from 'src/app/current-date.service';
import { Task } from 'src/app/taskNew';


@Component({
  selector: 'app-table-date-item',
  templateUrl: './table-date-item.component.html',
  styleUrls: ['./table-date-item.component.css']
})
export class TableDateItemComponent implements OnInit {

  constructor(private taskListService: TaskListService, private currentDateService: CurrentDateService) { }


  @Input() date: Date;

  // date: Date;
  tasks: Task[];

  ngOnInit() {
    if (!!this.date) {
      this.tasks = this.taskListService.getDayTasks(this.date);
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (!!this.date) {
      this.tasks = this.taskListService.getDayTasks(this.date);
    }
  }

  selectTask(task) {
    this.taskListService.sendTask.next({task: task, date: this.date});
  }

  taskComplete(task) {
    return this.taskListService.getCheckBox(task, this.date);
  }

}
