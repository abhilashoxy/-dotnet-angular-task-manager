using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using task_manager_service.Models;

namespace task_manager_service.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}
