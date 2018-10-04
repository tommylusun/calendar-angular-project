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

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CreateTaskComponent,
    CalendarComponent,
    TaskDetailsComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TaskListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
