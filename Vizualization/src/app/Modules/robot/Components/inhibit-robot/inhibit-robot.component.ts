import { Component, OnInit } from '@angular/core';
import { RobotService } from 'src/app/Modules/robot/robot.service';

@Component({
  selector: 'app-inhibit-robot',
  templateUrl: './inhibit-robot.component.html',
  styleUrls: ['./inhibit-robot.component.css']
})
export class InhibitRobotComponent implements OnInit {
 
  domainId='';
  errorMessage: string | null = null;
  robots!: any[];

  constructor(private robotService: RobotService) { }
  ngOnInit(): void {
    this.robotService.consultRobots().subscribe((robot: any) =>{
      console.log(robot)
      this.robots=robot.robots;
      console.log(this.robots)
    }
    )
  }
  
  inibirRobot():void{
    const robotId={
      domainId:this.domainId
    }
    this.robotService.inibirRobot(robotId).subscribe(
      (response:any) => {
        console.log('Robot Inibido',response);
      },
      (error) => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    );

  }

}
