using Microsoft.EntityFrameworkCore;
using TaskManagement.Model;

namespace TaskManagement.Models;

public class TaskContext : DbContext
{
    public TaskContext(DbContextOptions<TaskContext> options)
        : base(options)
    {
    }

    public DbSet<Model.Task> Tasks { get; set; } = null!;
}