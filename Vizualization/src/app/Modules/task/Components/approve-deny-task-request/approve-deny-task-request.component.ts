import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-approve-deny-task-request',
  templateUrl: './approve-deny-task-request.component.html',
  styleUrls: ['./approve-deny-task-request.component.css']
})
export class ApproveDenyTaskRequestComponent {

  constructor(private taskService: TaskService) { }

  taskId: string = '';  

  errorMessage: string | null = null;
  successMessage: string | null = null;

  tasks: any[] = [];

  ngOnInit(): void {
    this.taskService.getRequestedTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
    
  }	


  approveTask(): void {
    const taskId = this.taskId;
    if(taskId == null || taskId == '') {
      this.errorMessage = "Task id is required";
      this.successMessage = null;
      return;
    }
    this.taskService.approveTask(this.taskId).subscribe(() => {
      this.successMessage = "Task approved!";
      this.errorMessage = null;
      this.refresh();
    }, error => {
      if(error.status == 200) {
        this.successMessage = "Task approved!";
        this.errorMessage = null;
        this.refresh();
      }else {
      this.errorMessage = "Something went wrong";
      this.successMessage = null;
      }
    });
  }

  denyTask(): void {
    const taskId = this.taskId;
    if(taskId == null || taskId == '') {
      this.errorMessage = "Task id is required";
      this.successMessage = null;
      return;
    }
    this.taskService.denyTask(this.taskId).subscribe(
      () => {
        this.successMessage = "Task denied!";
        this.errorMessage = null;
        this.refresh();
      }, error => {
        if(error.status == 200) {
          this.successMessage = "Task denied!";
          this.errorMessage = null;
          this.refresh();
        }else {
        this.errorMessage = "Something went wrong";
        this.successMessage = null;
        }
      });
  }

  refresh(): void {
    window.location.reload();
  }
}
