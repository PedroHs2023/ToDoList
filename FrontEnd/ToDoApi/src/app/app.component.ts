import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './Services/task.service';
import { Task } from './Models/task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    console.log('[DEBUG] Iniciando TaskListComponent');
    this.loadTasks();
  }

  loadTasks(){
    console.log('[DEBUG] Chamando taskService.getTasks()');
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('[DEBUG] Dados recebidos:', tasks);
        this.tasks = tasks;
      },
      error: (err) => console.error('[ERROR] Erro na requisição:', err)
    });
  }

  markAsCompleted(task: Task): void{
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task).subscribe({
      next: (updateTask) =>{
        const index = this.tasks.findIndex(t => t.id === updateTask.id);
        if(index !== -1){
          this.tasks[index] = updateTask;
        }
      },
      error: (err) => {
        task.isCompleted = !task.isCompleted;
        console.error('Erro ao atualizar a tarefa:', err);
      }
    });
  }
}
