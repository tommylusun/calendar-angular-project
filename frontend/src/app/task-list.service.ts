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

  async bootstrapTaskslist() {
    await this.retreiveTasksListRequest();
    this.tasksSubject.next(this.tasksList);
  }

  async addTask(task: Task) {
    this.tasksList.push(task);
    await this.saveNewTaskRequest(task).then(res => {
      console.log(res);
    });
    this.tasksSubject.next(this.tasksList);
  }

  async deleteTask(task: Task) {
    this.tasksList.splice(this.tasksList.indexOf(task), 1);
    this.tasksSubject.next(this.tasksList);
    await this.deleteTaskRequest(task).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  async toggleCheckBox(task: Task, date: Date) {
    task.toggleCheckBox(date);
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
    const showTasks = [];

    this.tasksList.forEach(task => {
      if (task.ifShouldShow(date)) {
        task.showDetails = false;
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

  retreiveTasksListRequest() {
    return this.http.get(this.backendURL + '/task_list')
    .pipe(map((response: Task[]) => {
      for (const task of Object.values(response)) {
        console.log(task);
        const newTask = new Task({
          id: task['_id'],
          name: task['name'],
          description: task['description'],
          startDate: new Date(task['startDate']),
          endDate: new Date(task['endDate']),
          type: task['type'],
          checklist2: task['checkList'],
          count: task['count'],
          notes: task['notes']
        });
        this.tasksList.push(newTask);
      }
    })).toPromise();
  }

  saveNewTaskRequest(task: Task) {
    return this.http.post(this.backendURL + '/new_task', task).toPromise();
  }

  deleteTaskRequest(task: Task) {
    return this.http.delete(this.backendURL + '/delete_task/' + task.id).toPromise();
  }

  updateTaskRequest(task: Task) {
    return this.http.put(this.backendURL + '/update_task', task).toPromise();
  }

}
