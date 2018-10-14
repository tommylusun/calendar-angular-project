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

}
