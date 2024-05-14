import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { RobotModule } from './robot.module';
import { FormsModule } from '@angular/forms';


export interface CreateRobotResponse {
  nickname: string;
  StateOfRobot: string;
  typeOfRobotId: string;
}
export interface inibirRobot{
  domainId:string;
}
export interface ListRobotsResponse {
  nickname: string;
  StateOfRobot: string;
  typeOfRobotId: string;
}
@Injectable({
  providedIn: 'root'
})
export class RobotService {
    baseUrl = 'http://localhost:3000/api/robot';

  constructor(private http: HttpClient) { }

  createDevice(robotData:CreateRobotResponse) {
  
    return this.http.post(this.baseUrl+"/create", robotData)
      .pipe(
        retry(3),
        catchError(error => {
        console.error("Error in robotCreation",error);
        return throwError(error);
      }));
  }
  getRobot() {
    return this.http.get(this.baseUrl+"/all")
      .pipe(
        retry(3),
        catchError(error => {
        console.error("Error in robotCreation",error);
        return throwError(error);
      }));
  };

  inibirRobot(domainId:inibirRobot) {
    console.log(domainId);
    return this.http.patch(this.baseUrl+"/inibir", domainId)
      .pipe(
        retry(3),
        catchError(error => {
        console.error("Error in robotCreation",error);
        return throwError(error);
      }));
  }

  consultRobots(): Observable<ListRobotsResponse[]> {
    return this.http.get<ListRobotsResponse[]>(this.baseUrl + '/all')
        .pipe(
            retry(3),
            catchError((error) => {
                console.error('Error in consultRobots:', error);
                return throwError('Something went wrong. Please try again later.');
            })
        );
  }


}
