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

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void{
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
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
