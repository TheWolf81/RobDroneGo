import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-list-requested-tasks',
  templateUrl: './list-requested-tasks.component.html',
  styleUrls: ['./list-requested-tasks.component.css']
})
export class ListRequestedTasksComponent {

  constructor(private taskService: TaskService) { }

  tasks: any[] = [];

  ngOnInit(): void {
    this.taskService.getRequestedTasks().subscribe(tasks => {
       this.tasks = tasks;
       console.log(this.tasks);
     });
     

    
  }

}
