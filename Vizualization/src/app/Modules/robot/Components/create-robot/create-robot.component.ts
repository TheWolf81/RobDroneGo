import { Component, OnInit } from '@angular/core';
import { CreateRobotResponse, RobotService } from '../../robot.service';
import { TypeOfRobotService } from 'src/app/Modules/type-of-robot/typeOfRobotService';

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrls: ['./create-robot.component.css'],
  providers: [RobotService]
})
export class CreateRobotComponent implements OnInit{
  nickname = '';
  stateOfRobot = '';
  typeOfRobotId = '';

  errorMessage: string | null = null;
  typeOfRobots!:any[];


  constructor(private robotService: RobotService,private typeOfRobotService: TypeOfRobotService ) {
    // Este construtor será chamado quando o componente for inicializado
    
   }
   ngOnInit() {
    this.typeOfRobotService.getAll().subscribe((typeOfRobots: any) =>{
      
      this.typeOfRobots=typeOfRobots;
      console.log(this.typeOfRobots)
    }
    )
  }
 
  createNewRobot(): void {
    const robotData = {
      nickname: this.nickname,
      StateOfRobot: this.stateOfRobot,
      typeOfRobotId: this.typeOfRobotId
    };
  

  
    this.robotService.createDevice(robotData).subscribe(
  (response: any) => {
    // Handle successful response
    console.log('New Robot created:', response); // log the entire response object
    // Reset form fields
    this.resetForm();
  },
  (error) => {
    // Handle error
    console.error('Error creating robot:', error);
    this.errorMessage = 'Failed to create robot. Please try again later.';
  }
);

}
resetForm(): void {
  this.nickname = '';
  this.stateOfRobot = '';
  this.typeOfRobotId = '';

}
  
}