import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Elevator from "./elevator.js";
import Door, { createDoor } from "./door.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.map;
            this.size = description.size;

            this.elevatorLocation = this.cellToCartesian(description.elevatorLocations);


            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;
            console.log(description.exitLocation.length)
            console.log(description.exitLocation)
            var exitLocationtemp=[]
            // Store the maze's exit location
            for(let index=0;index<description.exitLocation.length;index){
                exitLocationtemp.push(this.cellToCartesian1(description.exitLocation[index+1],description.exitLocation[index])) 
                console.log(description.exitLocation[index]);
                console.log(description.exitLocation[index+1]);
                console.log(exitLocationtemp);
                console.log(index);
                index++;
                index++;
            }
            this.exitLocation=exitLocationtemp;
            console.log(this.exitLocation)

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: description.wallTextureUrl });

            // Build the maze walls
            let wallObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    if (description.map[j][i] == 2 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 1 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                }
            }

            // Create an elevator
            this.elevator = new Elevator({ textureUrl: description.elevatorTextureUrl });

            // Create an exit
            this.exit = new Wall({ textureUrl: description.exitTextureUrl });

            // Create an emergency exit
            this.emergencyExit = new Wall({ textureUrl: description.emergencyExitTextureUrl });

            this.door = new Door({ textureUrl: description.doorTextureUrl });

            // Build the maze elevators, exits, emergency exit.
            let elevatorObject;
            let exitObject;
            let emergencyExitObject;
            let doorObject
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North Elevator | West Elevator | North Exit | West Exit | North Emergency Exit | West Emergency Exit | North Door | West Door
                     * --------------------+------------+-----------
                     *          4          |     Yes        |     No    |     No     |     No    |          No          |     No
                     *          5          |     No     |    Yes   |     No     |     No    |          No          |     No
                     *          6          |    No     |     No   |    Yes     |     No    |          No          |     No
                     *          7          |    No     |    No    |     No     |    Yes    |          No          |     No
                     *          8          |    No     |    No    |     No     |     No    |          Yes         |     No
                     *          9          |    No     |    No    |     No     |     No    |          No          |     Yes
                     *  10 (door)          |    No     |    No    |     No     |     No    |          No          |     No    |     Yes    |     No
                      11 (door)          |    No     |    No    |     No     |     No    |          No          |     No    |     No    |     Yes
                       */
                    if (description.map[j][i] == 4) {
                        elevatorObject = this.elevator.object.clone();
                        elevatorObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(elevatorObject);
                    }
                    if (description.map[j][i] == 5) {
                        elevatorObject = this.elevator.object.clone();
                        elevatorObject.rotateY(Math.PI / 2.0);
                        elevatorObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(elevatorObject);
                    }
                    if (description.map[j][i] == 6) {
                        exitObject = this.exit.object.clone();
                        exitObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(exitObject);
                    }
                    if (description.map[j][i] == 7) {
                        exitObject = this.exit.object.clone();
                        exitObject.rotateY(Math.PI / 2.0);
                        exitObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(exitObject);
                    }
                    if (description.map[j][i] == 8) {
                        emergencyExitObject = this.emergencyExit.object.clone();
                        emergencyExitObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(emergencyExitObject);
                    }
                    if (description.map[j][i] == 9) {
                        emergencyExitObject = this.emergencyExit.object.clone();
                        emergencyExitObject.rotateY(Math.PI / 2.0);
                        emergencyExitObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(emergencyExitObject);
                    }

                    if (description.map[j][i] == 10) {
                        doorObject = this.door.object.clone();
                        doorObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(doorObject);
                    }

                    if (description.map[j][i] == 11) {
                        doorObject = this.door.object.clone();
                        doorObject.rotateY(Math.PI / 2.0);
                        doorObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(doorObject);
                    }
                }
            }


            

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        console.log(position)
        var x = (position[1] - this.size.width / 2.0 + 0.5) * this.scale.x;
        var y = 0.0;
        var z = (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z;
        console.log("x="+x+" z=" +z)
        return new THREE.Vector3(x, y, z);
    }
    cellToCartesian1(x1,z1) {
        console.log(x1)
        console.log(z1)
        var x = (x1 - this.size.width / 2.0 + 0.5) * this.scale.x;
        var y = 0.0;
        var z = (z1- this.size.height / 2.0 + 0.5) * this.scale.z;
        return new THREE.Vector3(x, y, z);
    }
    cellToCartesian2(x1,z1) {
   
        var x = (x1 - this.size.width / 2.0 + 0.5) * this.scale.x;
        var y = 0.0;
        var z = (z1- this.size.height / 2.0 + 0.5) * this.scale.z;
        return {x: x, y: y, z: z};
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }
    

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    foundExit(position) {
        for (let index = 0; index < this.exitLocation.length; index++) {
          if( Math.abs(position.x - this.exitLocation[index].x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation[index].z) < 0.5 * this.scale.z) {
            return true
          }
            
        }
        //return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
        return false;
    };


    foundElevator(position) {
        
        if ( Math.abs(position.x - this.elevatorLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.elevatorLocation.z) < 0.5 * this.scale.z ){
            //console.log(" Encontrei o elevador")
            return true;
        }
        
    }

    distanceToElevator(position) {
        return Math.sqrt(Math.pow(position.x - this.elevatorLocation.x, 2) + Math.pow(position.z - this.elevatorLocation.z, 2));
    }
}