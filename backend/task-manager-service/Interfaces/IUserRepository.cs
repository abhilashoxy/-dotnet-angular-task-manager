
namespace task_manager_service.Interfaces
{
    public interface IUserRepository
    {
        // Checks if a user with the given email exists
        Task<bool> ExistsAsync(string email);

        // Retrieves a user by their email
        Task<User?> GetByEmailAsync(string email);

        // Retrieves a user by their ID
        Task<User?> GetByIdAsync(int id);

        // Adds a new user to the database
        Task AddAsync(User user);

        // Updates an existing user's information
        Task UpdateAsync(User user);
    }
}
