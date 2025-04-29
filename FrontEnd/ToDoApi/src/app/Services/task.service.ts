import {HttpClient} from '@angular/common/http';
import { Injectable }   from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/task';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]>{
    console.log('[DEBUG] Fazendo requisição para:', this.apiUrl); // 👈 Adicione
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task) : Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
}
