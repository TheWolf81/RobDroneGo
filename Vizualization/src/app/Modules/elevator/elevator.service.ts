import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";

export interface CreateElevatorResponse {
    building_id: string;
    floors_servedId: JSON[];
    description: string;
}

export interface EditElevatorResponse {
    floors_servedId: JSON[];
    description: string;
}

export interface ListElevatorByBuildingResponse {
    description: string;
    floors_servedId: JSON[];
}

@Injectable({
    providedIn: 'root'
})
export class ElevatorService {
    private baseUrl = 'http://localhost:3000/api/elevator';

    constructor(private http: HttpClient) {}

    createElevator(elevator: CreateElevatorResponse): Observable<CreateElevatorResponse> {
        return this.http.post<CreateElevatorResponse>(this.baseUrl + '/create', elevator)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in createElevator:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }

    editElevator(elevator: EditElevatorResponse, elevatorId: string): Observable<EditElevatorResponse> {
        return this.http.patch<EditElevatorResponse>(this.baseUrl + '/edit/:' + elevatorId, elevator)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in editElevator:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }

    listElevatorsByBuilding(buildingId: string): Observable<ListElevatorByBuildingResponse> {
        return this.http.get<ListElevatorByBuildingResponse>(this.baseUrl + '/get/:' + buildingId)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in listElevatorsByBuilding:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }

}