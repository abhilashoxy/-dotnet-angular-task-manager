using task_manager_service.DTOs;


namespace task_manager_service.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllAsync();
        Task<TaskItem> CreateAsync(TaskItem task);
        Task<TaskItem> UpdateAsync(int id, TaskDto dto);
        Task<bool> DeleteAsync(int id);
    }

}
