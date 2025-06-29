using Microsoft.EntityFrameworkCore;
using task_manager_service.Data;
using task_manager_service.DTOs;
using task_manager_service.Interfaces;
using task_manager_service.Models;

namespace task_manager_service.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _ctx;
        public TaskRepository(ApplicationDbContext ctx) => _ctx = ctx;

        public async Task<IEnumerable<TaskItem>> GetAllAsync() => await _ctx.Tasks.ToListAsync();
        public async Task<TaskItem> CreateAsync(TaskItem task) { _ctx.Tasks.Add(task); await _ctx.SaveChangesAsync(); return task; }
        public async Task<TaskItem> UpdateAsync(int id, TaskDto dto)
        {
            var task = await _ctx.Tasks.FindAsync(id);
            if (task == null) return null;
            task.Title = dto.Title;
            task.Description = dto.Description;
            await _ctx.SaveChangesAsync();
            return task;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _ctx.Tasks.FindAsync(id);
            if (task == null) return false;
            _ctx.Tasks.Remove(task);
            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}
