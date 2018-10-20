import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskListService } from '../task-list.service';
import { CurrentDateService } from '../current-date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-month-view-table',
  templateUrl: './month-view-table.component.html',
  styleUrls: ['./month-view-table.component.css']
})
export class MonthViewTableComponent implements OnInit {


  @Output() open: EventEmitter<any> = new EventEmitter();

  day: Date;
  weekTasks = [];
  weekHeaders: string[] = [];
  monthNames;
  dateSubscription: Subscription;

  constructor(private taskListService: TaskListService, private currentDateService: CurrentDateService) { }

  ngOnInit() {
    this.monthNames = this.currentDateService.monthNames;
    this.day = this.currentDateService.getDate();
    this.createWeekLists(this.day);
    this.constructWeekHeaders(this.day);

    this.dateSubscription = this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.day = new Date(data);
      this.createWeekLists(data);
      this.constructWeekHeaders(data);

    });
    // this.taskListService.getTasks();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

  createWeekLists(date) {
    this.weekTasks = [];

    const tempDate = new Date(date);
    tempDate.setDate(1);
    tempDate.setDate(tempDate.getDate() - tempDate.getDay());

    for (let i = 0; i < 6; i++) {
      const list = this.taskListService.getDayTasksWithType(tempDate, 'Weekly');
      this.weekTasks.push(list);
      tempDate.setDate(tempDate.getDate() + 7);
      if (tempDate.getMonth() > date.getMonth()) {
        break;
      }
    }
  }
  constructWeekHeaders(date) {
    this.weekHeaders = [];

    const tempDate = new Date(date);
    tempDate.setDate(1);

    tempDate.setDate(tempDate.getDate() - tempDate.getDay());
    const tempDate2 = new Date(tempDate);
    tempDate2.setDate(tempDate.getDate() + 6);

    for (let i = 0; i < 6; i++) {
      const d = this.formatWeekHeader(tempDate, tempDate2);
      this.weekHeaders.push(d);
      tempDate.setDate(tempDate.getDate() + 7);
      tempDate2.setDate(tempDate2.getDate() + 7);

      if (tempDate.getMonth() > date.getMonth()) {
        break;
      }
    }
  }

  formatWeekHeader(start: Date, end: Date) {

    const startString = `${this.monthNames[start.getMonth()].slice(0, 3)} ${start.getDate()}`;
    const endString = `${this.monthNames[end.getMonth()].slice(0, 3)} ${end.getDate()}`;
    return `${startString} - ${endString}`;
  }

  goToTask(task: Task, ind) {
    const tempDate = new Date(this.day);
    tempDate.setDate(1);
    tempDate.setDate(tempDate.getDate() - tempDate.getDay() + (ind * 7));
    this.currentDateService.dateSubject.next(tempDate);
    task.showDetails = true;
    this.open.emit();
  }

  getStatusText(task: Task, ind) {
    const tempDate = new Date(this.day);
    tempDate.setDate(1);
    tempDate.setDate(tempDate.getDate() - tempDate.getDay() + (ind * 7));
    if (task.getCheckBox(tempDate)) {
      return 'Complete';
    } else {
      return 'Incomplete';
    }

  }
}
