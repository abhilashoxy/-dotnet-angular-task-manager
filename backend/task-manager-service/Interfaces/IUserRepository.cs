using task_manager_service.Models;

namespace task_manager_service.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> ExistsAsync(string email);
        Task<User> GetByEmailAsync(string email);
        Task AddAsync(User user);
    }
}
