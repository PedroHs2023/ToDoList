import {HttpClient} from '@angular/common/http';
import { Injectable }   from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  private apiUrl = 'https://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task) : Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
}
