import {
  Injectable
} from '@angular/core';
import {
  Task
} from './task';
import {
  Subject
} from 'rxjs';
import {
  map, catchError
} from 'rxjs/operators';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  backendURL = 'http://localhost:3000';

  tasksList: Task[];

  tasksSubject = new Subject <Task[]>();

  constructor(private http: HttpClient) {
    this.tasksList = [];
  }


  addMockTask(type: string) {
    const endDate = new Date();
    const startDate = new Date();
    endDate.setMonth(11);
    endDate.setDate(31);
    const taskName = type +
      ' Task starting on ' +
      endDate.toDateString() + ', ending ' +
      startDate.toDateString();
    const newTask = new Task({
      name: taskName,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: startDate,
      endDate: endDate,
      type: type
    });
    return newTask;
  }

  bootstrapTaskslist() {
    this.tasksList.push(this.addMockTask('Daily'));
    this.tasksList.push(this.addMockTask('Daily'));
    this.tasksList.push(this.addMockTask('Weekly'));
    this.tasksList.push(this.addMockTask('Weekly'));
    this.tasksList.push(this.addMockTask('Monthly'));
    this.tasksList.push(this.addMockTask('Monthly'));
    this.saveNewTask(this.addMockTask('Daily')).subscribe();
    this.retreiveTasksList().subscribe();
    this.tasksSubject.next(this.tasksList);
  }

  addTask(task: Task) {
    this.tasksList.push(task);
    this.tasksSubject.next(this.tasksList);
  }

  deleteTask(task: Task) {
    this.tasksList.splice(this.tasksList.indexOf(task), 1);
    this.tasksSubject.next(this.tasksList);
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

  toggleCheckBox(task: Task, date: Date) {
    task.toggleCheckBox(date);
  }

  getCheckBox(task: Task, date: Date) {
    return task.getCheckBox(date);
  }

  constructWeekLists(day: Date) {
    const weekTasks = [];
    const date = new Date(day);
    date.setDate(date.getDate() - date.getDay());
    for (let i = 0; i < 7; i++) {
      const list = this.getDayTasksWithType(date, 'Daily');
      weekTasks.push(list);
      date.setDate(date.getDate() + 1);
    }
    return weekTasks;
  }

  retreiveTasksList() {
    return this.http.get(this.backendURL + '/task_list')
    .pipe(map((response: Task[]) => {
      console.log('response ' + response);
      this.tasksList = response;
    }));
  }

  saveNewTask(task: Task) {
    return this.http.post(this.backendURL + '/new_task', task)
    .pipe(    );
  }

}
