import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild('createTask')
  private createTaskComponent: CreateTaskComponent;

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
    const endDate = new Date();
    const startDate = new Date(this.day);
    endDate.setMonth(11);
    endDate.setDate(31);
    const newTask = new Task({
      name: 'new model task',
      description: 'Some description',
      startDate: startDate,
      endDate: endDate,
      type: newTask2.type
    });
    this.newTasks.push(newTask2);
    this.constructTasksList(this.day);
  }

  changeDay(day: Date) {
    this.day = day;
    this.constructTasksList(this.day);
    this.createTaskComponent.updateDay(this.day);

  }

  deleteTask(task: Task) {
    this.newTasks.splice( this.newTasks.indexOf(task), 1 );
    this.constructTasksList(this.day);
  }
  checkTask(task: Task) {
    task.toggleCheckBox(this.day);
  }

  getCheckBox(task: Task) {
    return task.getCheckBox(this.day);
  }
  constructTasksList(day: Date) {
    this.showTasks = [];
    for (const el of this.newTasks) {
      if (el.ifShouldShow(day)) {
        this.showTasks.push(el);
      }
    }

  }
}
