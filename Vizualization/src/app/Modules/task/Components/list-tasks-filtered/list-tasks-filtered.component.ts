import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { TypeOfRobotService } from 'src/app/Modules/type-of-robot/typeOfRobotService';
import { error } from 'cypress/types/jquery';

@Component({
  selector: 'app-list-tasks-filtered',
  templateUrl: './list-tasks-filtered.component.html',
  styleUrls: ['./list-tasks-filtered.component.css']
})
export class ListTasksFilteredComponent {
  
  constructor(private taskService: TaskService, private typeOfDeviceService: TypeOfRobotService) { }
  
  tasks: any[] = [];
  deviceTypes: any[] = [];
  title: string = "";
  status: string = "";
  deviceType: string = "";
  userEmail: string = "";

  errorMessage: string | null = null;

  ngOnInit(): void {
    this.typeOfDeviceService.getAll().subscribe((typeOfRobots: any) =>{
      this.deviceTypes=typeOfRobots;
    });

  }

  tasksByStatus() {
    this.tasks = [];
    if(this.status == "") {
      this.errorMessage = "Please select a status";
      return;
    }
    const status = this.status;
    this.title = status;
    this.taskService.getTasksByStatus(status).subscribe(tasks => {
      if(tasks.length == 0) {
        this.errorMessage = "No tasks found with status '" + status + "'";
      }else {
        this.errorMessage = null;
      this.tasks = tasks;
      }
    },
    error => {
      this.errorMessage = "No tasks found with status '" + status + "'";
    });
  }

  tasksByDeviceType() {
    this.tasks = [];
    if(this.deviceType == "") {
      this.errorMessage = "Please select a device type";
      return;
    }
    const deviceType = this.deviceType;
    this.title = this.deviceType;
    this.taskService.getTasksByTypeOfDevice(deviceType).subscribe(tasks => { 
      if(tasks.length == 0 ) {
        this.errorMessage = "No tasks found with device type '" + deviceType + "'";
      }else {
        this.errorMessage = null;
      this.tasks = tasks;
      }
    },
    error => {
      this.errorMessage = "No tasks found with device type '" + deviceType + "'";
    });
  }

  tasksByUserEmail() {
    this.tasks = [];
    if(this.userEmail == "") {
      this.errorMessage = "Please type a user email";
      return;
    }
    const userEmail = this.userEmail;
    this.title = userEmail + "'s";
    this.taskService.getTasksByUser(userEmail).subscribe(tasks => {
      if(tasks.length == 0) {
        this.errorMessage = "No tasks found with user email '" + userEmail + "'";
      }else {
        this.errorMessage = null;
      this.tasks = tasks;
      }
    },
    error => {
      this.errorMessage = "No tasks found of user '" + userEmail + "'";
    });
  }
}
