import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { TaskFormComponent } from '../task-form/task-form.component';


interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,TaskFormComponent],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  selectedTask: Task | null = null;
  tasks: Task[] = [];

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>('https://localhost:44361/api/tasks')
      .subscribe({
        next: res => this.tasks = res,
        error: err => alert('Failed to fetch tasks')
      });
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
  editTask(task: Task) {
  this.selectedTask = { ...task }; // shallow copy
}

onTaskSaved() {
  this.selectedTask = null;
  this.getTasks();
}

deleteTask(id: number) {
  if (!confirm('Delete this task?')) return;

  this.http.delete(`https://localhost:44361/api/tasks/${id}`).subscribe({
    next: () => this.getTasks(),
    error: () => alert('Delete failed')
  });
}
}
