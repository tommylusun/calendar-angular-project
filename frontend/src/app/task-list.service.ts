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
    await this.retreiveTasksList();
    this.tasksSubject.next(this.tasksList);
  }

  async addTask(task: Task) {
    this.tasksList.push(task);
    await this.saveNewTaskRequest(task);
    this.tasksSubject.next(this.tasksList);
  }

  async deleteTask(task: Task) {
    this.tasksList.splice(this.tasksList.indexOf(task), 1);
    this.tasksSubject.next(this.tasksList);
    await this.deleteTaskRequest(task);
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

  async toggleCheckBox(task: Task, date: Date) {
    task.toggleCheckBox(date);
    await this.updateTaskRequest(task);
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

  async retreiveTasksList() {
    return await this.http.get(this.backendURL + '/task_list')
    .pipe(map((response: Task[]) => {
      console.log('response ' + response);
      // this.tasksList = response;
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
        });
        this.tasksList.push(newTask);
      }
      console.log(this.tasksList[0]);
    })).toPromise();
  }

  async saveNewTaskRequest(task: Task) {
    return await this.http.post(this.backendURL + '/new_task', task).toPromise();
  }

  async deleteTaskRequest(task: Task) {
    return await this.http.delete(this.backendURL + '/delete_task/' + task.id).toPromise();
  }

  async updateTaskRequest(task: Task) {
    return await this.http.put(this.backendURL + '/update_task', task).toPromise();
  }

}
