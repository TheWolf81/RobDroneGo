import { Component, OnInit } from '@angular/core';
import { CreateRoomResponse, RoomService } from '../../room.service';
import { BuildingService } from 'src/app/Modules/building/building.service';
import { FloorService } from 'src/app/Modules/floor/floor.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit{
    floorID: string = '';
    category: string = '';
    identifier: string = '';
    description: string = '';
    posX: number = 0;
    posY: number = 0;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    floors: any[] = [];

    constructor(private roomService: RoomService, private floorService: FloorService) { }
  
    ngOnInit() {
        this.floorService.listFloors().subscribe(
            (response) => {
                this.floors = response;
            },
            (error) => {
                this.errorMessage = "Failure in Fetching floors"
                this.successMessage = null;
            }
        );


    }

    createRoom(): void {
        const roomData = {
            floorID: this.floorID,
            category: this.category,
            identifier: this.identifier,
            description: this.description,
            x: this.posX,
            y: this.posY
        };
        console.log(roomData)
        this.roomService.createRoom(roomData).subscribe(
            (response: CreateRoomResponse) => {
                // Handle successful response
                this.resetForm();
            },
            (error) => {
                // Handle error
                this.errorMessage = "Failure in Room Creation"
                this.successMessage = null;
            }
        );
    }

    resetForm(): void {
        this.floorID = '';
        this.category = '';
        this.identifier = '';
        this.description = '';
        this.posX = 0;
        this.posY = 0;
        this.errorMessage = null;
        this.successMessage = 'Room created successfully!';
    }
}
