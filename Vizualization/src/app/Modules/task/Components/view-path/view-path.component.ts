import { Component } from '@angular/core';
import { RoomService } from 'src/app/Modules/room/room.service';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-view-path',
  templateUrl: './view-path.component.html',
  styleUrls: ['./view-path.component.css']
})
export class ViewPathComponent {
  room1Id: string = '';
  room2Id: string = '';
  path: string[] = [];
  rooms!: any[];
  errorMessage: string | null = null;
  
      
  constructor(private taskService: TaskService, private roomService: RoomService) { }
  
    ngOnInit() {
      this.roomService.listRooms().subscribe(
        (rooms) => {
          console.log(rooms);
          this.rooms = rooms;
        },
        (error) => {
          console.error('Error fetching rooms:', error);
          this.errorMessage = 'Failed to fetch rooms. Please try again later.';
        }
      );
    }

    viewPath() {
      this.taskService.viewPath(this.room1Id, this.room2Id).subscribe(
        (response) => {
          // Remove unnecessary characters and split into an array
          this.errorMessage = null;
          this.path = response
          .replace(/[\[\]']/g, '')  // Remove square brackets and single quotes
          .split(/\),?/)             // Split by ')', allowing for optional trailing comma
          .map((element) => element.trim() + ')'); // Add the closing parenthesis to each element

          //remove the last element (")"")
          this.path.pop();
          
          console.log(response);
        },
        (error) => {
          console.error('Error fetching path:', error);
          this.path = [];
          this.errorMessage = 'Failed to fetch path. Please try again later.';
        }
      );
    }

}
