import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: Task;

  iterable;
  list = [];
  constructor() { }

  ngOnInit() {
    this.iterable = Object.keys(this.task.checklist2);
    for (const g of this.iterable) {

      this.list.push(this.task.checklist2[g]);

    }
    console.log(this.task.checklist2);
    console.log(this.iterable[0]);
    console.log(this.list);
  }

}
