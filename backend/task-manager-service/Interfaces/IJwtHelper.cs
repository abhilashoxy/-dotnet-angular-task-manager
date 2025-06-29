using task_manager_service.Models;

namespace task_manager_service.Interfaces
{
    public interface IJwtHelper
    {
        string GenerateToken(User user);
    }
}
