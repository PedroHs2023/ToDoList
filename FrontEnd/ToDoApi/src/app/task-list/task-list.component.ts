import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Services/task.service';
import { Task } from '../Models/task';
@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
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
