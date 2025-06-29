namespace task_manager_service.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }                  // For update/display
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }

        // Optional, can be useful for admin or internal use (not required from client side)
        public int? UserId { get; set; }
    }
}
