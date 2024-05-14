import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

export interface CreateFloorResponse {
    building_id: string;
    floorNumber: number;
    description: string;
    area: number;
    name: string;
    floorMap: JSON[];
  }

export interface EditFloorResponse {
    domain_id: string;
    name: string;
    description: string;
  }

export interface ListFloorsByBuildingResponse {
    domain_id: string;
    area: number;
    building_id: string; 
    description: string;
    floorMap: JSON[];
    floorNumber: number;
    name: string;
  }  
  export interface ListFloorsResponse {
    DomainId: string;
    area: number;
    building_id: string; 
    description: string;
    floorMap: JSON[];
    floorNumber: number;
    name: string;
  }

export interface UploadFloorMapResponse {
    domain_id: string;
    floorMazeInfo: MazeDetails;
}

export interface MazeDetails {
    size: { width: number, depth: number };
    map: number[][];
    exits: number[][];
    elevators: number[][];
    exitLocation: number[];
  }

  // floor.service.ts
  @Injectable({
    providedIn: 'root'
  })
  export class FloorService {
    baseUrl = 'http://localhost:3000/api/floor';
  
    constructor(private http: HttpClient) {}
  
    createFloor(floor: CreateFloorResponse): Observable<CreateFloorResponse> {
      return this.http.post<CreateFloorResponse>(this.baseUrl + '/create', floor)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in createFloor:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
    }

    editFloor(floor: EditFloorResponse): Observable<EditFloorResponse> {

      interface aux {
        name: string;
        description: string;
      }

      const auxiliar: aux = {
        name: floor.name,
        description: floor.description
      }

      return this.http.put<EditFloorResponse>(`${this.baseUrl}/update/${floor.domain_id}`, auxiliar)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in editFloor:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
    }

    listFloorsByBuilding(building_id: string): Observable<ListFloorsByBuildingResponse[]> {
      return this.http.get<ListFloorsByBuildingResponse[]>(`${this.baseUrl}/getFloorsByBuildingId/${building_id}`)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in listFloorsByBuilding:', error);
            return throwError('Something went wrong. Please try again later.');
          }),
        );
    }
    listFloors():  Observable<ListFloorsResponse[]> {
      return this.http.get<ListFloorsResponse[]>(`${this.baseUrl}/Listarfloors`)
      .pipe(
        retry(7),
        catchError((error) => {
          console.error('Error in listFloorsByBuilding:', error);
          return throwError('Something went wrong. Please try again later.');
        }),
      );
    }

    uploadFloorMap(floor: UploadFloorMapResponse): Observable<UploadFloorMapResponse> {
      const headers = {
        'Content-Type': 'application/json' 
      };
      return this.http.patch<UploadFloorMapResponse>(
        `${this.baseUrl}/loadMap/${floor.domain_id}`,
        floor.floorMazeInfo, { headers }
      ).pipe(
        retry(3),
        catchError((error) => {
          console.error('Error in uploadFloorMap:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
    }
    
  }
  