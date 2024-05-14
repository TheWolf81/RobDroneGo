import { Component } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-genetico',
  templateUrl: './genetico.component.html',
  styleUrls: ['./genetico.component.css']
})
export class GeneticoComponent {
  List!: string[];
  l!: string;
  time!: string;
  errorMessage: string | null = null;
  NG!: string;
  DP!: string;
  P1!: string;
  P2!: string;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }
  getListOftask() {

    this.taskService.getListOfTasksAG( this.NG, this.DP,this.P1,this.P2).subscribe(
      (response: string) => {
        console.log(response);
        if (response) {
          response = response.substring(2);
          this.List = response.split(']');
          this.l = this.List[0];
          this.List = this.l.split(',');
          this.time = this.List[1].substring(1, 3)
          console.log(this.time);
          console.log(response);
          console.log(this.l);
        }
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = error;
      }
    );
  }

}
