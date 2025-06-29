using task_manager_service.DTOs;


namespace task_manager_service.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskDto>> GetTasksAsync();                      // Get tasks for logged-in user
        Task<TaskItem> CreateTaskAsync(TaskDto dto);              // Create task for logged-in user
        Task<TaskItem> UpdateTaskAsync(int id, TaskDto dto);      // Update task by ID
        Task<bool> DeleteTaskAsync(int id);                       // Delete task by ID
    }
}
