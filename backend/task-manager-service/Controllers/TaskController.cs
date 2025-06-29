using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_manager_service.DTOs;
using task_manager_service.Interfaces;

namespace task_manager_service.Controllers
{
    [ApiController, Route("api/tasks")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService) => _taskService = taskService;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _taskService.GetTasksAsync());

        [HttpPost]
        public async Task<IActionResult> Create(TaskDto dto) => Ok(await _taskService.CreateTaskAsync(dto));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskDto dto) => Ok(await _taskService.UpdateTaskAsync(id, dto));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) => Ok(await _taskService.DeleteTaskAsync(id));
    }
}
