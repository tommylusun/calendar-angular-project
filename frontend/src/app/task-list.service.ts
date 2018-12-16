import {
  Injectable
} from '@angular/core';
import {
  Task
} from './taskNew';
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
  sendTask = new Subject <{task: Task, date: Date}>();

  constructor(private http: HttpClient) {
    this.tasksList = [];

    // for (let i = 0; i < 10; i++ ) {
    //   const startDate = new Date();
    //   startDate.setDate(i);
    //   const newTask = {
    //     id: i,
    //     name: 'task ' + i,
    //     description: 'task task task task ' + i,
    //     startDate: startDate,
    //     endDate: new Date(),
    //     notes:  ' This is some notes for Task: ' + i,
    //     daysPerWeek: []
    // };
    //   this.tasksList.push(new Task(newTask));
    // }
    this.bootstrapTaskslist();
  }

  async bootstrapTaskslist() {
    await this.retreiveTasksListRequest();
    this.tasksSubject.next(this.tasksList);
  }

  async addTask(task: Task) {
    await this.saveNewTaskRequest(task).then( (res: any) => {
      this.tasksList.push(this.castTask(res.saved_task));
      this.tasksSubject.next(this.tasksList);
      console.log(res.saved_task);
    });
  }

  async deleteTask(task: Task) {
    await this.deleteTaskRequest(task).then(res => {
      this.tasksList.splice(this.tasksList.indexOf(task), 1);
      this.tasksSubject.next(this.tasksList);
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  async toggleCheckBox(task: Task, date: Date) {
    if (!this.getCheckBox(task, date)) {
      task.checklist[date.toDateString()] = true;
      task.doneCount++;
    } else {
      delete task.checklist[date.toDateString()];
      task.doneCount--;
    }
    await this.updateTaskRequest(task).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  getTasks() {
    return this.tasksList;
  }

  getDayTasks(date: Date) {
    const showTasks = this.tasksList.filter( task => {
      return this.ifTaskinDate(task, date);
    });

    return showTasks;
  }

  getDayTasksWithType(date: Date, type: string) {
    const showTasks = [];

    return showTasks;
  }

  getCheckBox(task: Task, date: Date) {
    if (!!task.checklist && !!task.checklist[date.toDateString()]) {
      return true;
    } else {
      return false;
    }
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

  retreiveTasksListRequest() {
    return this.http.get(this.backendURL + '/task_list')
    .pipe(map((response: Task[]) => {
      console.log(response);
      for (const task of Object.values(response)) {
        this.tasksList.push(this.castTask(task));
      }
    })).toPromise();
  }

  castTask(task) {
    task.startDate = new Date(task.startDate);
    task.endDate = new Date(task.endDate);
    return new Task(task);
  }

  saveNewTaskRequest(task: Task) {
    return this.http.post(this.backendURL + '/new_task', task).toPromise();
  }

  deleteTaskRequest(task: Task) {
    return this.http.delete(this.backendURL + '/delete_task/' + task._id).toPromise();
  }

  updateTaskRequest(task: Task) {
    return this.http.put(this.backendURL + '/update_task', task).toPromise();
  }

  ifTaskinDate(task: Task, date: Date) {

    // if (date.getFullYear>)
    // if (task.startDate.getMonth() < date.getMonth()) {

    // }
    // if (task.startDate.getFullYear() <= date.getFullYear()
    // && task.startDate.getMonth() <= date.getMonth()
    // && task.startDate.getDate() <= date.getDate()
    // && task.endDate.getFullYear() >= date.getFullYear()
    // && task.endDate.getMonth() >= date.getMonth()
    // && task.endDate.getDate() >= date.getDate()
    // && (task.daysPerWeek.includes(date.getDay()) || task.daysPerWeek.length === 0 )) {
    //   return true;
    // }
    task.startDate.setHours(0, 0, 0, 0);
    task.endDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (task.startDate <= date
      && date <= task.endDate
      && (task.daysPerWeek.includes(date.getDay()) || task.daysPerWeek.length === 0 )) {
      return true;
    }
    return false;

  }

}
