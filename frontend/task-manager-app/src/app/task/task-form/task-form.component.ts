import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnChanges {
  private taskService = inject(TaskService);

  @Input() task: Task | null = null;
  @Input() onSaved: () => void = () => {};

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
    const method = isUpdate
      ? this.taskService.updateTask(this.taskModel)
      : this.taskService.createTask(this.taskModel);

    method.subscribe({
      next: () => {
        alert(isUpdate ? 'Task updated' : 'Task added');
        this.onSaved();
        this.taskModel = { id: 0, title: '', description: '', isCompleted: false };
      },
      error: err => alert('Failed to save task')
    });
  }
}
