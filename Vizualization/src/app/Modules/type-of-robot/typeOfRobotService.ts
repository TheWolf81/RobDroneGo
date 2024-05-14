import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

export interface CreateTypeOfRobotRexponse {
    brand: string;
    model: string;
    taskType: string[];
}

@Injectable({
    providedIn: 'root'
})
export class TypeOfRobotService {
    baseUrl = 'http://localhost:3000/api/typeOfRobot';

    constructor(private http: HttpClient) {}

    createTypeOfRobot(typeOfRobot: CreateTypeOfRobotRexponse): Observable<CreateTypeOfRobotRexponse> {
        return this.http.post<CreateTypeOfRobotRexponse>(this.baseUrl + '/create', typeOfRobot)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in createTypeOfRobot:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }
    getAll() {
        return this.http.get(this.baseUrl + '/all')
          .pipe(
            retry(3),
            catchError(error => {
              console.error("Error in ListarPassagens", error);
              return throwError(error);
            }));
      }
}