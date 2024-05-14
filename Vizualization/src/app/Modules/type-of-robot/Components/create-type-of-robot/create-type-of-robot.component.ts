import { Component } from '@angular/core';
import { TypeOfRobotService } from '../../typeOfRobotService';
import { CreateTypeOfRobotRexponse } from '../../typeOfRobotService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-type-of-robot',
  templateUrl: './create-type-of-robot.component.html',
  styleUrls: ['./create-type-of-robot.component.css']
})
export class CreateTypeOfRobotComponent {

  brand: string = '';
  model: string = '';
  pickupdelivery: string = '';
  surveillance: string = '';

  errorMessage: string | null = null;

  constructor(private typeOfRobotService: TypeOfRobotService, private router: Router) { }

  createNewTypeOfRobot(): void {

    let typeOfRobotData = null;

    if(this.pickupdelivery === '' && this.surveillance === '') {
      this.errorMessage = 'Please enter at least one task type.';
      return;
    }

    if(this.pickupdelivery != '' && this.surveillance == '') {
      const taskType = ["pickup&delivery"];
      typeOfRobotData = { brand: this.brand, model: this.model, taskType: taskType };
    }
      
    else if(this.pickupdelivery == '' && this.surveillance != '') {
      const taskType = ["surveillance"];
      typeOfRobotData = { brand: this.brand, model: this.model, taskType: taskType };
    }

    else if (this.pickupdelivery != '' && this.surveillance != '') {
      const taskType = ["pickup&delivery", "surveillance"];
      typeOfRobotData = { brand: this.brand, model: this.model, taskType: taskType };
    }


    if (typeOfRobotData != null) {
    

    this.typeOfRobotService.createTypeOfRobot(typeOfRobotData).subscribe(
      (response: CreateTypeOfRobotRexponse) => {
        // Handle successful response
        console.log('New typeOfRobot created:', response); // log the entire response object
        // Reset form fields
        this.resetForm();
      },
      (error) => {
        // Handle error
        console.error('Error creating typeOfRobot:', error);
        this.errorMessage = 'Failed to create typeOfRobot. Please try again later.';
      }
    );
  }
  else {
    this.resetForm();
    console.error('Error creating typeOfRobot:');
    this.errorMessage = 'Failed to create typeOfRobot. Please try again later.';
  }
}

  resetForm(): void {
    this.brand = '';
    this.model = '';
    this.pickupdelivery = '';
    this.surveillance = '';
    this.errorMessage = null;
  }

}
