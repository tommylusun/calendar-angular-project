import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  showForm = false;
  newTaskName;
  tasks: any[] = [
    {
    name : 'Do a few things',
    type : 'daily',
    done : false
  },
  {
    name : 'task 2',
    type : 'daily',
    done : false
  },
  {
    name : 'task 3',
    type : 'weekly',
    done : false
  },
  {
    name : 'task 4',
    type : 'monthly',
    done : true
  }];

  constructor() { }

  ngOnInit() {

  }
  addTask(newTask) {
    this.tasks.push(newTask);
  }

  addTaskButton() {
  }

  deleteTask(task) {
    this.tasks.splice( this.tasks.indexOf(task), 1 );
  }
  checkTask(task) {
    task.done = !task.done;
  }

}
