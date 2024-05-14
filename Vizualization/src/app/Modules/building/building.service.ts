import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, config, retry, throwError } from 'rxjs';

export interface CreateBuildingResponse {
    code: string;
    description: string;
    max_length: number;
    max_width: number;
}

export interface EditBuildingResponse {
    domainId: string;
    code: string;
    description: string;
    max_length: number;
    max_width: number;
  }
  export interface ListBuildingResponse {
    domain_id: string;
    code: string;
    description: string;
    max_length: number;
    max_width: number;
  }
export interface ListBuildingsWithMaxAndMinFloorsResponse {
  min: number;
  max: number;
}



@Injectable({
    providedIn: 'root'
})
export class BuildingService {
    
    private baseUrl = 'http://localhost:3000/api/building';


    constructor(private http: HttpClient) {}

    createBuilding(building: CreateBuildingResponse): Observable<CreateBuildingResponse> {
        return this.http.post<CreateBuildingResponse>(this.baseUrl + '/create', building)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in createBuilding:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }

      
    editBuilding(building: EditBuildingResponse): Observable<EditBuildingResponse> {
        // PRINT THE DOMAIN ID
        console.log(building.domainId);
        return this.http.put<EditBuildingResponse>(`${this.baseUrl}/edit/${building.domainId}`, building)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in editBuilding:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
    }

    listBuildings(): Observable<EditBuildingResponse[]> {
        return this.http.get<EditBuildingResponse[]>(`${this.baseUrl}/getAll`)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in listBuildings:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
    }

    listBuildingsTo3D(): Observable<ListBuildingResponse[]> {
      return this.http.get<ListBuildingResponse[]>(`${this.baseUrl}/getAll`)
      .pipe(
        retry(3),
        catchError((error) => {
          console.error('Error in listBuildings:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

    listBuildingsWithMaxAndMinFloors(input: ListBuildingsWithMaxAndMinFloorsResponse): Observable<EditBuildingResponse[]> {
      return this.http.get<EditBuildingResponse[]>(`${this.baseUrl}/getBuildingsByMaxAndMinFloors/${input.min}/${input.max}`)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in listBuildingsWithMaxAndMinFloors:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
    }

    loadBuilding(buildingDomainID: string) {
        return this.http.get<EditBuildingResponse>(`${this.baseUrl}/get/${buildingDomainID}`)
        .pipe(
          retry(3),
          catchError((error) => {
            console.error('Error in loadBuilding:', error);
            return throwError('Something went wrong. Please try again later.');
          })
        );
    }
}