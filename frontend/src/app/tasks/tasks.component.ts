import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  showForm = false;
  newTaskName;
  newTasks: Task[];
  day: Date;
  showTasks: Task[];
  constructor() { }

  ngOnInit() {

    this.newTasks = [];
    this.showTasks = [];
    this.day = new Date();
    this.constructTasksList(this.day);
  }
  addTask(newTask2) {
    //this.tasks.push(newTask);
    console.log('add');
    const endDate = new Date();
    const startDate = new Date(this.day);
    console.log(startDate.getMonth());
    endDate.setMonth(11);
    endDate.setDate(31);
    const newTask = new Task({
      name: 'new model task',
      description: 'fasdf',
      startDate: startDate,
      endDate: endDate,
      type: newTask2.type
    });
    console.log(newTask.startDate.getMonth());
    this.newTasks.push(newTask);
    this.constructTasksList(this.day);
  }

  changeDay(day: Date) {
    this.day = day;
    this.constructTasksList(this.day);

  }
  addTaskButton() {
  }

  deleteTask(task: Task) {
    this.newTasks.splice( this.newTasks.indexOf(task), 1 );
    this.constructTasksList(this.day);
  }
  checkTask(task: Task) {
    console.log('toggle');
    task.toggleCheckBox(this.day);
  }

  getCheckBox(task: Task) {
    console.log('get' + task.getCheckBox(this.day));

    return task.getCheckBox(this.day);
  }
  constructTasksList(day: Date) {
    this.showTasks = [];
    for (const el of this.newTasks) {
      if (el.ifShouldShow(day)) {
        console.log('push ' + el);
        this.showTasks.push(el);
      }
    }

  }
}
