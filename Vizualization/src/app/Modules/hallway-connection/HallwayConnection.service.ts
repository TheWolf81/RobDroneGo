import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface CreateHallwayConnectionRespons {
  FloorId1: string;
  FloorId2: string;
  x1:number;
  y1:number;
  x2:number;
  y2:number;
}
export interface EditHallwayConnectionRespons {
  FloorId1: string;
  FloorId2: string;
  DomainId: string;
}
export interface GetHallwayConnection {
  domainId: string;
  FloorId1: string;
  FloorId2: string;
  BuildingId1: string;
  BuildingId2: string;
  x1:number;
  y1:number;
  x2:number;
  y2:number;
}

@Injectable({
  providedIn: 'root'
})
export class HallwayConnectionService {
  baseUrl = 'http://localhost:3000/api/HallwayConnectionRoute';
  constructor(private http: HttpClient) {
  }
  createHallwayConnection(hallwayConnection: CreateHallwayConnectionRespons) {

    return this.http.post(this.baseUrl + "/create", hallwayConnection)
      .pipe(
        retry(3),
        catchError(error => {
          console.error("Error in create", error);
          return throwError(error);
        }));
  }
  editHallwayConnection(hallwayConnection: EditHallwayConnectionRespons) {
    return this.http.put(this.baseUrl + "/edit", hallwayConnection)
      .pipe(
        retry(3),
        catchError(error => {
          console.error("Error in edit", error);
          return throwError(error);
        }));

  }
  deleteHallwayConnection() {

  }
  getHallwayConnection(BuildingId1: string, BuildingId2: string) {

    return this.http.get(`${this.baseUrl}/ListarPassagens/${BuildingId1}/${BuildingId2}`)
      .pipe(
        retry(3),
        catchError(error => {
          console.error("Error in ListarPassagens", error);
          return throwError(error);
        }));

  }
  getListarEdificiosPassagens() {
    return this.http.get(this.baseUrl + '/ListarEdificiosPassagens')
      .pipe(
        retry(3),
        catchError(error => {
          console.error("Error in ListarPassagens", error);
          return throwError(error);
        }));
  }
  getAllHallways(): Observable<GetHallwayConnection[]> {
    return this.http.get<GetHallwayConnection[]>(this.baseUrl + '/all')
      .pipe(
        retry(3),
        catchError(error => {
          console.error("Error in ListarPassagens", error);
          return throwError(error);
        }));
  }
}
