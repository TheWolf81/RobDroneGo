public class TaskDTO
{
    public int TaskId { get; set; }
    public required string TaskType { get; set; }
    public required int Code { get; set; }
    public required string Status { get; set; }
    public required string Email { get; set; }
    public required string DeviceType { get; set; }
    public required string Description { get; set; }
    public required string Location1 { get; set; }
    public required string Location2 { get; set; }
}