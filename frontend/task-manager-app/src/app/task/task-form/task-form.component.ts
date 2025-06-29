import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnChanges {
  private http = inject(HttpClient);

  @Input() task: Task | null = null;
  @Input() onSaved: () => void = () => {};

  // Form-bound model
  taskModel: Task = {
    id: 0,
    title: '',
    description: '',
    isCompleted: false
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.taskModel = this.task
        ? { ...this.task }
        : { id: 0, title: '', description: '', isCompleted: false };
    }
  }

  saveTask() {
    const isUpdate = this.taskModel.id > 0;
    const url = `https://localhost:44361/api/tasks${isUpdate ? '/' + this.taskModel.id : ''}`;
    const method = isUpdate ? 'put' : 'post';

    this.http[method](url, this.taskModel).subscribe({
      next: () => {
        alert(isUpdate ? 'Task updated' : 'Task added');
        this.onSaved();
        this.taskModel = { id: 0, title: '', description: '', isCompleted: false };
      },
      error: err => alert('Failed to save task')
    });
  }
}
