import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../api/api.endpoints';
import { ApiService } from '../../../api/api.service';
import { TaskInterface } from '../models/task.models';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private api: ApiService) { }

  getTasks(): Observable<any> {
    return this.api.get<TaskInterface[]>(API_ENDPOINTS.tasks.base).pipe(
      map(tasks =>
        tasks.map(task => ({
          ...task,
          createdAt: this.parseDate(task.createdAt)
        }))
      )
    );
  }

  createTask(titulo: string, descripcion: string): Promise<any> {
    return this.api.post<TaskInterface>(
      API_ENDPOINTS.tasks.base,
      { titulo, descripcion }
    ).toPromise();
  }

  updateTask(task: TaskInterface): Promise<any> {
    return this.api.put<TaskInterface>(
      API_ENDPOINTS.tasks.byId(task.id),
      task
    ).toPromise();
  }

  deleteTask(id: string): Promise<any> {
    return this.api.delete<void>(
      API_ENDPOINTS.tasks.byId(id)
    ).toPromise();
  }


  private parseDate(value: any): Date {
    if (value?._seconds) {
      return new Date(value._seconds * 1000);
    }

    if (typeof value === 'string') {
      return new Date(value);
    }

    if (value instanceof Date) {
      return value;
    }

    return new Date();
  }
}
