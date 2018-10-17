import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { Checklist } from '../checklist';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: Task;

  iterable;
  list: Checklist[];
  newNote: string;
  showInput = false;
  doneCount: number;
  constructor(private taskListService: TaskListService) { }

  ngOnInit() {
    // this.list = Array.from(Object.keys(this.task.checklist2), check => this.task.checklist2[check]);

    this.list = Object.values(this.task.checklist2);
  }

  deleteTask() {
    this.taskListService.deleteTask(this.task);
  }

  addNote() {
    if (this.task.notes === null) {
      this.task.notes = [];
    }
    this.task.notes.push(this.newNote);
    this.newNote = '';
    this.taskListService.updateTaskRequest(this.task);
  }



}
