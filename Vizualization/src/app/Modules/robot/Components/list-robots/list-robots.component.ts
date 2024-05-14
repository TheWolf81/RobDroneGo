import { Component, OnInit } from '@angular/core';
import { ListRobotsResponse, RobotService } from '../../robot.service';
import { TypeOfRobotService } from 'src/app/Modules/type-of-robot/typeOfRobotService';

@Component({
  selector: 'app-list-robots',
  templateUrl: './list-robots.component.html',
  styleUrls: ['./list-robots.component.css']
})
export class ListRobotsComponent implements OnInit {
  typesOfRobots!: any[];
  data: ListRobotsResponse[] = [];
  errorMessage: string | null = null;
  
    constructor(private robotService: RobotService, private typeOfRobotService: TypeOfRobotService) { }
  
    ngOnInit(): void {
      this.listRobots();
    }

    listRobots(): void {      
      this.typeOfRobotService.getAll().subscribe(typeOfRobots => {
      this.typesOfRobots = typeOfRobots as any;
      console.log(this.typesOfRobots);
    
      this.robotService.getRobot().subscribe(
        (response: any) => {
          console.log(response);
          if (response) {
            this.data = response.robots;
            for(let i = 0; i < this.data.length; i++){
              for(let j = 0; j < this.typesOfRobots.length; j++){
                if(this.data[i].typeOfRobotId == this.typesOfRobots[j].domain_id){
                  this.data[i].typeOfRobotId = this.typesOfRobots[j].brand + " " + this.typesOfRobots[j].model;
                }
              }
              if(this.data[i].StateOfRobot == '1'){
                this.data[i].StateOfRobot = "Active";
              }else{
                this.data[i].StateOfRobot = "Inactive";
              }
            }
          }
        },
        (error) => {
          console.error('Error fetching robots:', error);
          this.errorMessage = error;
        }
      );
      });
    }

}
