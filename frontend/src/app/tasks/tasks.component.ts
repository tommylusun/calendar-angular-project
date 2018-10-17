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
  allTasks: Task[];
  day: Date;
  showTasks: Task[];
  view: string;
  weekTasks: any[];

  dayNames: string[];

  newNote: string;
  notes: string[];

  constructor(private currentDateService: CurrentDateService, private taskListService: TaskListService) {}

  ngOnInit() {
    this.dayNames = this.currentDateService.dayNames;
    this.allTasks = [];
    this.showTasks = [];
    this.weekTasks = [];

    this.view = 'day';
    this.day = new Date();
    this.currentDateService.setDate(this.day);

    this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.day = data;
      this.showTasks = this.taskListService.getDayTasks(this.day);
      this.weekTasks = this.taskListService.constructWeekLists(this.day);
    });

    this.taskListService.tasksSubject.subscribe((list: Task[]) => {
      this.allTasks = list;
      console.log(list);
      this.showTasks = this.taskListService.getDayTasks(this.day);
      this.weekTasks = this.taskListService.constructWeekLists(this.day);
      this.showForm = false;
    });
    this.taskListService.bootstrapTaskslist();

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

  getTitleDate() {
    if (this.view === 'day') {
      return this.day.toDateString();
    } else if (this.view === 'week') {
      const displayDate = new Date(this.day);
      displayDate.setDate(displayDate.getDate() - displayDate.getDay());
      const monthNames = this.currentDateService.monthNames;
      const displayDateEnd = new Date(displayDate);
      displayDateEnd.setDate(displayDate.getDate() + 6);

      return `${monthNames[displayDate.getMonth()].slice(0, 3)}
       ${displayDate.getDate()} ${displayDate.getFullYear()} - ${monthNames[displayDateEnd.getMonth()].slice(0, 3)}
       ${displayDateEnd.getDate()} ${displayDateEnd.getFullYear()}`;
    } else {
      const displayDate = new Date(this.day);
      displayDate.setDate(1);
      const monthNames = this.currentDateService.monthNames;
      return monthNames[displayDate.getMonth()] + ' ' + displayDate.getFullYear().toString();
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

  onMonthClick(event) {
    this.view = 'week';
  }


}
