using Microsoft.EntityFrameworkCore;
using task_manager_service.Data;
using task_manager_service.Interfaces;


namespace task_manager_service.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _ctx;
        public UserRepository(ApplicationDbContext ctx) => _ctx = ctx;

        public Task<bool> ExistsAsync(string email) => _ctx.Users.AnyAsync(u => u.Email == email);
        public Task<User> GetByEmailAsync(string email) => _ctx.Users.SingleOrDefaultAsync(u => u.Email == email);
        public async Task AddAsync(User user) { _ctx.Users.Add(user); await _ctx.SaveChangesAsync(); }
    }

}
