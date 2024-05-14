import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-melhor-sequencia',
  templateUrl: './melhor-sequencia.component.html',
  styleUrls: ['./melhor-sequencia.component.css']
})
export class MelhorSequenciaComponent {

  List!: string[]
  errorMessage: string | null = null;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.getListOftask();
  }
  getListOftask() {
    this.taskService.getListOfTasksEx().subscribe(
      (response:  string) => {
        console.log(response);
        if (response) {
         // response=response.split(',')
          this.List = response.split(',')
          console.log(this.List);
          console.log(response);
        }
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = error;
      }
    );
  }


}
