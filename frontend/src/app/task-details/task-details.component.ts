import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { Checklist } from '../checklist';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: Task;

  iterable;
  list: Checklist[];
  doneCount: number;
  constructor() { }

  ngOnInit() {
    // this.list = Array.from(Object.keys(this.task.checklist2), check => this.task.checklist2[check]);
    this.list = Object.values(this.task.checklist2);
  }

}
