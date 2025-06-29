using task_manager_service.DTOs;
using task_manager_service.Interfaces;
using task_manager_service.Models;

namespace task_manager_service.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;
        public TaskService(ITaskRepository taskRepo) => _taskRepo = taskRepo;

        public Task<IEnumerable<TaskItem>> GetTasksAsync() => _taskRepo.GetAllAsync();
        public Task<TaskItem> CreateTaskAsync(TaskDto dto) => _taskRepo.CreateAsync(new TaskItem { Title = dto.Title, Description = dto.Description });
        public Task<TaskItem> UpdateTaskAsync(int id, TaskDto dto) => _taskRepo.UpdateAsync(id, dto);
        public Task<bool> DeleteTaskAsync(int id) => _taskRepo.DeleteAsync(id);
    }
}
