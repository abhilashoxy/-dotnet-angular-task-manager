using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using task_manager_service.DTOs;
using task_manager_service.Interfaces;


namespace task_manager_service.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TaskService(
            ITaskRepository taskRepo,
            IHttpContextAccessor httpContextAccessor)
        {
            _taskRepo = taskRepo;
            _httpContextAccessor = httpContextAccessor;
        }

        private int GetLoggedInUserId()
        {
            var userIdStr = _httpContextAccessor.HttpContext?.User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdStr))
                throw new UnauthorizedAccessException("User is not authenticated.");

            int userId;
            if (!int.TryParse(userIdStr, out userId))
                throw new UnauthorizedAccessException("Invalid user ID.");

            return userId;
        }

        public async Task<List<TaskDto>> GetTasksAsync()
        {
            var userId = GetLoggedInUserId();
            var tasks = await _taskRepo.GetAllAsync();

            return tasks
                .Where(t => t.UserId == userId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted
                })
                .ToList();
        }

        public async Task<TaskItem> CreateTaskAsync(TaskDto dto)
        {
            var userId = GetLoggedInUserId();

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                UserId = userId
            };

            return await _taskRepo.CreateAsync(task);
        }

        public Task<TaskItem> UpdateTaskAsync(int id, TaskDto dto) => _taskRepo.UpdateAsync(id, dto);

        public Task<bool> DeleteTaskAsync(int id) => _taskRepo.DeleteAsync(id);
    }
}
