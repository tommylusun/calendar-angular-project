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

  constructor(private currentDateService: CurrentDateService, private taskListService: TaskListService) {
   }

  ngOnInit() {

    this.newTasks = [];
    this.showTasks = [];
    this.weekTasks = [];
    this.view = 'day';

    this.day = new Date();
    this.currentDateService.setDate(this.day);
    this.taskListService.bootstrapTaskslist();
    this.showTasks = this.taskListService.getDayTasks(this.day);
    this.weekTasks = this.taskListService.constructWeekLists(this.day);

    this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.day = data;
      this.showTasks = this.taskListService.getDayTasks(this.day);
      this.weekTasks = this.taskListService.constructWeekLists(this.day);
    });

    this.taskListService.tasksSubject.subscribe((list: Task[]) => {
      this.showTasks = this.taskListService.getDayTasks(this.day);
      this.weekTasks = this.taskListService.constructWeekLists(this.day);
      this.showForm = false;
    });
  }

  checkTask(task: Task) {
    this.taskListService.toggleCheckBox(task, this.day);
  }

  getCheckBox(task: Task) {
    this.taskListService.getCheckBox(task, this.day);
  }


  nextDay() {
    if (this.view === 'day') {
      this.day.setDate(this.day.getDate() + 1);
      this.currentDateService.dateSubject.next(this.day);
    } else if (this.view === 'week') {
      this.day.setDate(this.day.getDate() + 7);
      this.currentDateService.dateSubject.next(this.day);
    } else if (this.view === 'month') {
      this.day.setMonth(this.day.getMonth() + 1);
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
    } else if (this.view === 'month') {
      this.day.setMonth(this.day.getMonth() - 1);
      this.currentDateService.dateSubject.next(this.day);
    }
  }

  changeView(view) {
    this.view = view;
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
      return displayDate.getMonth().toString() + ' ' + displayDate.getFullYear().toString();
    }
  }

  goToToday() {
    this.day = new Date();
    this.currentDateService.dateSubject.next(this.day);
  }

  goToTask(task: Task, ind) {
      this.day.setDate(this.day.getDate() - this.day.getDay() + ind);
      this.currentDateService.dateSubject.next(this.day);
      task.showDetails = true;
      this.view = 'day';

  }
  taskChecked(task: Task, ind) {
    const temp = new Date(this.day);
    temp.setDate(this.day.getDate() - this.day.getDay() + ind);
    return task.getCheckBox(temp);
  }


}
