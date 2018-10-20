import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-task-item-summary',
  templateUrl: './task-item-summary.component.html',
  styleUrls: ['./task-item-summary.component.css']
})
export class TaskItemSummaryComponent implements OnInit {


  @Input() taskItem: Task;
  constructor(private taskListService: TaskListService) { }

  ngOnInit() {
  }

  getStatus() {
    if (this.taskItem.doneCount === 0) {
      return 'Not complete';
    } else if (this.taskItem.doneCount === Object.values(this.taskItem.checklist2).length) {
      return 'Complete';
    } else {
      return 'Partially Complete';
    }
  }

}
