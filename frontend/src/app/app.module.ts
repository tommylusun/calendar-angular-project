import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListService } from './task-list.service';
import { CurrentDateService } from './current-date.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskItemSummaryComponent } from './task-item-summary/task-item-summary.component';
import { MonthViewTableComponent } from './month-view-table/month-view-table.component';
import { NotesViewComponent } from './notes-view/notes-view.component';
import { DailyTasksTableComponent } from './daily-tasks-table/daily-tasks-table.component';
import { TableDateItemComponent } from './month-view-table/table-date-item/table-date-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CreateTaskComponent,
    CalendarComponent,
    TaskDetailsComponent,
    TaskItemComponent,
    TaskItemSummaryComponent,
    MonthViewTableComponent,
    NotesViewComponent,
    DailyTasksTableComponent,
    TableDateItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
