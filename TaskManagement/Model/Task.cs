using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
namespace TaskManagement.Model;

public class Task
{
    [Key]
    public int TaskId { get; set; }
    [Required(ErrorMessage = "Task Type is required.")]
    [RegularExpression(@"^(pickup&delivery|surveillance)$", ErrorMessage = "Invalid Task Type")]
    public required string TaskType { get; set; }

    [Required(ErrorMessage = "Task Code is required.")]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "Code must be 6 digits")]
    public required int Code { get; set; }

    [RegularExpression(@"^(requested|approved|denied|planned)$", ErrorMessage = "Invalid Status")]
    public required string Status { get; set; }
    [RegularExpression(@"^[a-zA-Z0-9]+@isep.ipp.pt$", ErrorMessage = "Invalid Email")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Task Device Type is required.")]
    public required string DeviceType { get; set; }

    [StringLength(1000, ErrorMessage = "Description cannot be longer than 1000 characters.")]
    public required string Description { get; set; }
    [Required(ErrorMessage = "Task Origin is required.")]
    public required string Location1 { get; set; }
    [Required(ErrorMessage = "Task Destination is required.")]
    public required string Location2 { get; set; }

    [SetsRequiredMembers]
    public Task(int taskId, string taskType, int code, string status, string email, string deviceType, string description, string location1, string location2)
    {
    if (string.IsNullOrEmpty(taskType) || !Regex.IsMatch(taskType, @"^(pickup&delivery|surveillance)$"))
        throw new ArgumentException("Invalid Task Type", nameof(taskType));

    if (code < 100000 || code > 999999)
        throw new ArgumentException("Code must be 6 digits", nameof(code));

    if (!string.IsNullOrEmpty(status) && !Regex.IsMatch(status, @"^(requested|approved|denied|planned)$"))
        throw new ArgumentException("Invalid Status", nameof(status));

    if (!string.IsNullOrEmpty(email) && !Regex.IsMatch(email, @"^[a-zA-Z0-9]+@isep.ipp.pt$"))
        throw new ArgumentException("Invalid Email", nameof(email));

    if (string.IsNullOrEmpty(deviceType))
        throw new ArgumentException("Task Device Type is required.", nameof(deviceType));

    if (description.Length > 1000)
        throw new ArgumentException("Description cannot be longer than 1000 characters.", nameof(description));

    if (string.IsNullOrEmpty(location1))
        throw new ArgumentException("Task Origin is required.", nameof(location1));

    if (string.IsNullOrEmpty(location2))
        throw new ArgumentException("Task Destination is required.", nameof(location2));

    TaskId = taskId;
    TaskType = taskType;
    Code = code;
    Status = status;
    Email = email;
    DeviceType = deviceType;
    Description = description;
    Location1 = location1;
    Location2 = location2;
}


    public TaskDTO toDto()
    {
        TaskDTO taskDto = new TaskDTO
        {
            TaskId = this.TaskId,
            TaskType = this.TaskType,
            Code = this.Code,
            Status = this.Status,
            Email = this.Email,
            DeviceType = this.DeviceType,
            Description = this.Description,
            Location1 = this.Location1,
            Location2 = this.Location2
        };
        return taskDto;
    }
}
