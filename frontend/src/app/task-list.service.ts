import { Injectable } from '@angular/core';
import { Task } from './task';
@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  tasksList: Task[];

  constructor() {
    this.tasksList = [];
   }


  addTask(task: Task) {
    this.tasksList.push(task);
  }

  deleteTask(task: Task) {
    this.tasksList.splice( this.tasksList.indexOf(task), 1 );
  }

  getTasks() {
    return this.tasksList;
  }

  getDayTasks(date: Date) {
    const showTasks = [];

    this.tasksList.forEach(task => {
      if (task.ifShouldShow(date)) {
        showTasks.push(task);
      }
    });
    return showTasks;
  }

  getDayTasksWithType(date: Date, type: string) {
    const showTasks = [];

    this.tasksList.forEach(task => {
      if (task.ifShouldShow(date) && task.type === type) {
        showTasks.push(task);
      }
    });
    return showTasks;
  }



}
