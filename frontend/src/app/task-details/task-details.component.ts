import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Task } from '../taskNew';
import { Checklist } from '../checklist';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: Task;

  list: Checklist[];
  newNote: string;
  showInput = false;
  doneCount: number;
  editButton = 'Edit';
  constructor(private taskListService: TaskListService) { }

  ngOnInit() {
    // this.list = Array.from(Object.keys(this.task.checklist2), check => this.task.checklist2[check]);

    // this.list = Object.values(this.task.checklist2);
    // this.newNote = Object.assign(this.task.notes, this.newNote);
    this.newNote = this.task.notes;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    // this.newNote = Object.assign(this.task.notes, this.newNote);
    this.newNote = this.task.notes;
    this.showInput = false;
    this.editButton = 'Edit';

  }

  deleteTask() {
    this.taskListService.deleteTask(this.task);
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    // this.taskListService.updateTaskRequest(this.task);
  }

  editNotes() {
    const  textArea = document.getElementById('textarea');
    const notesbox = document.getElementById('notesbox');
    const style = window.getComputedStyle(notesbox);
    textArea.style.height = style.height;
    document.getElementById('textarea').focus();


    this.showInput = !this.showInput;
    if (this.showInput) {
      this.editButton = 'Save';
    } else {
      this.editButton = 'Edit';
      this.task.notes = this.newNote;
      this.taskListService.updateTaskRequest(this.task);
    }

  }
  autogrow() {
    const textArea = document.getElementById('textarea');
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }


}
