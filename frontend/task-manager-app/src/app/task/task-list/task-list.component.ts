import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  private auth = inject(AuthService);
  private taskService = inject(TaskService);
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: res => this.tasks = res,
      error: err => alert('Failed to fetch tasks')
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  onTaskSaved() {
    this.selectedTask = null;
    this.getTasks();
  }

  deleteTask(id: number) {
    if (!confirm('Delete this task?')) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: () => alert('Delete failed')
    });
  }
}
