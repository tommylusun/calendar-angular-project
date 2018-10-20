import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskListService } from '../task-list.service';
import { Subscription } from 'rxjs';
import { CurrentDateService } from '../current-date.service';
import { Task } from '../task';

@Component({
  selector: 'app-daily-tasks-table',
  templateUrl: './daily-tasks-table.component.html',
  styleUrls: ['./daily-tasks-table.component.css']
})
export class DailyTasksTableComponent implements OnInit {


  day: Date;
  weekTasks: any[];

  dayNames: string[];
  dateSubscription: Subscription;

  @Output() open: EventEmitter<any> = new EventEmitter();

  constructor(private taskListService: TaskListService, private currentDateService: CurrentDateService) { }

  ngOnInit() {
    this.dayNames = this.currentDateService.dayNames;
    this.day = this.currentDateService.getDate();
    this.weekTasks = this.taskListService.constructWeekLists(this.day);

    this.dateSubscription = this.currentDateService.dateSubject.subscribe((data: Date) => {
      this.day = new Date(data);
      this.weekTasks = this.taskListService.constructWeekLists(data);

    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

  goToTask(task: Task, ind) {
    this.day.setDate(this.day.getDate() - this.day.getDay() + ind);
    this.currentDateService.dateSubject.next(this.day);
    task.showDetails = true;
    this.open.emit();
    // this.view = 'day';
}

  getStatusText(task: Task, ind) {
    const tempDate = new Date(this.day);
    tempDate.setDate(tempDate.getDate() - tempDate.getDay() + ind);
    if (task.getCheckBox(tempDate)) {
      return 'Complete';
    } else {
      return 'Incomplete';
    }

  }


}
