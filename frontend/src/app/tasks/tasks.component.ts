import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../task';
import { CalendarComponent } from '../calendar/calendar.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskListService } from '../task-list.service';
import { CurrentDateService } from '../current-date.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  showForm = false;
  showCal = false;
  newTaskName;
  newTasks: Task[];
  day: Date;
  showTasks: Task[];
  view: string;
  weekTasks: any[];

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private currentDateService: CurrentDateService) {
   }

  ngOnInit() {

    this.newTasks = [];
    this.showTasks = [];
    this.weekTasks = [];
    this.view = 'day';
    const endDate = new Date();
    const startDate = new Date();
    endDate.setMonth(11);
    endDate.setDate(31);
    let newTask = new Task({
      name: 'new model task',
      description: 'Some description',
      startDate: startDate,
      endDate: endDate,
      type: 'Daily'
    });

    this.newTasks.push(newTask);
    newTask = new Task({
      name: 'new model task 2',
      description: 'Some description',
      startDate: startDate,
      endDate: endDate,
      type: 'Daily'
    });
    this.newTasks.push(newTask);

    this.newTasks.push(newTask);
    newTask = new Task({
      name: 'Weekly task 2',
      description: 'Some description',
      startDate: startDate,
      endDate: endDate,
      type: 'Weekly'
    });
    this.newTasks.push(newTask);

    this.day = new Date();
    this.currentDateService.setDate(this.day);
    this.showTasks = this.constructTasksList(this.day);
    this.constructWeekLists(this.day);

    this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.day = data;
      this.showTasks = this.constructTasksList(this.day);
      this.constructWeekLists(this.day);
    });
  }

  addTask(newTask2) {
    this.newTasks.push(newTask2);
    this.showTasks = this.constructTasksList(this.day);
    this.showForm = false;
  }

  deleteTask(task: Task) {
    this.newTasks.splice( this.newTasks.indexOf(task), 1 );
    this.showTasks = this.constructTasksList(this.day);
  }
  checkTask(task: Task) {
    task.toggleCheckBox(this.day);
  }

  getCheckBox(task: Task) {
    return task.getCheckBox(this.day);
  }
  constructTasksList(day: Date) {
    const showTasks = [];
    for (const el of this.newTasks) {
      if (el.ifShouldShow(day)) {
        showTasks.push(el);
      }
    }
    return showTasks;
  }

  nextDay() {
    if (this.view === 'day') {
      this.day.setDate(this.day.getDate() + 1);
      this.currentDateService.dateSubject.next(this.day);
    } else if (this.view === 'week') {
      this.day.setDate(this.day.getDate() + 7);
      this.currentDateService.dateSubject.next(this.day);
    }
  }
  prevDay() {
    if (this.view === 'day') {
      this.day.setDate(this.day.getDate() - 1);
      this.currentDateService.dateSubject.next(this.day);
    } else if (this.view === 'week') {
      this.day.setDate(this.day.getDate() - 7);
      this.currentDateService.dateSubject.next(this.day);
    }
  }

  changeView(view) {
    this.view = view;
  }

  constructWeekLists(day: Date) {
    this.weekTasks = [];
    const date = new Date(day);
    date.setDate(date.getDate() - date.getDay());
    for (let i = 0; i < 7; i++) {
      const list = this.constructTasksList(date);
      this.weekTasks.push(list);
      date.setDate(date.getDate() + 1);
    }
  }

  getTitle() {
    if (this.view === 'day') {
      return this.day.toDateString();
    } else if (this.view === 'week') {
      const displayDate = new Date(this.day);
      displayDate.setDate(displayDate.getDate() - displayDate.getDay());
      return displayDate.toDateString();
    } else {
      const displayDate = new Date(this.day);
      displayDate.setDate(1);
      return displayDate.toDateString();
    }
  }

}
