import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, config, retry, throwError } from 'rxjs';

export interface CreateRoomResponse {
    floorID: string;
    category: string;
    identifier: string;
    description: string;
    x: number;
    y: number;
}

export interface ListRoomsResponse {
    floorID: string;
    category: string;
    identifier: string;
    description: string;
    x: number;
    y: number;
}

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    baseUrl = 'http://localhost:3000/api/room';

    constructor(private http: HttpClient) {}

    createRoom(room: CreateRoomResponse) {
        return this.http.post<CreateRoomResponse>(this.baseUrl + '/create', room)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in createBuilding:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }

    listRooms(): Observable<ListRoomsResponse[]> {
        return this.http.get<ListRoomsResponse[]>(`${this.baseUrl}/getAll`)
            .pipe(
                retry(3),
                catchError((error) => {
                    console.error('Error in listRooms:', error);
                    return throwError('Something went wrong. Please try again later.');
                })
            );
    }
}
