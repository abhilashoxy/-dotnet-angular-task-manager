using task_manager_service.DTOs;
using task_manager_service.Models;

namespace task_manager_service.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetTasksAsync();
        Task<TaskItem> CreateTaskAsync(TaskDto dto);
        Task<TaskItem> UpdateTaskAsync(int id, TaskDto dto);
        Task<bool> DeleteTaskAsync(int id);
    }
}
