using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NUnit.Framework;
using TaskManagement.Model;
using System;

namespace TaskManagement.Tests;
public class TaskTests
{
    [Test]
    public void Task_ValidTask_CreatesTask()
    {
        Model.Task task = new Model.Task(1, "pickup&delivery", 123456, "requested", "test@isep.ipp.pt", "deviceType", "description", "location1", "location2");

        Assert.That(task.TaskId, Is.EqualTo(1));
        Assert.That(task.TaskType, Is.EqualTo("pickup&delivery"));
        Assert.That(task.Code, Is.EqualTo(123456));
        Assert.That(task.Status, Is.EqualTo("requested"));
        Assert.That(task.Email, Is.EqualTo("test@isep.ipp.pt"));
        Assert.That(task.DeviceType, Is.EqualTo("deviceType"));
        Assert.That(task.Description, Is.EqualTo("description"));
        Assert.That(task.Location1, Is.EqualTo("location1"));
        Assert.That(task.Location2, Is.EqualTo("location2"));
    }


    [Test]
    public void Task_InvalidTaskType_ThrowsArgumentException()
    {
        string invalidTaskType = "invalidTaskType";

        Assert.Throws<ArgumentException>(() => new Model.Task(1, invalidTaskType, 123456, "requested", "test@isep.ipp.pt", "deviceType", "description", "location1", "location2"));
    }

    [Test]
    public void Task_InvalidCode_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 12345, "requested", "test@isep.ipp.pt", "deviceType", "description", "location1", "location2"));
    }

    [Test]
    public void Task_InvalidStatus_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 123456, "invalidStatus", "test@isep.ipp.pt", "deviceType", "description", "location1", "location2"));
    }

    [Test]
    public void Task_InvalidEmail_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 123456, "requested", "invalidEmail", "deviceType", "description", "location1", "location2"));
    }

    [Test]
    public void Task_NullDeviceType_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 123456, "requested", "test@isep.ipp.pt", null, "description", "location1", "location2"));
    }

    [Test]
    public void Task_LongDescription_ThrowsArgumentException()
    {
        string longDescription = new string('a', 1001);
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 123456, "requested", "test@isep.ipp.pt", "deviceType", longDescription, "location1", "location2"));
    }

    [Test]
    public void Task_NullLocation1_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 123456, "requested", "test@isep.ipp.pt", "deviceType", "description", null, "location2"));
    }

    [Test]
    public void Task_NullLocation2_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => new Model.Task(1, "pickup&delivery", 123456, "requested", "test@isep.ipp.pt", "deviceType", "description", "location1", null));
    }
}
