
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { playerData } from "./default_data";
import ChangeModel from './change_model';
import { mazeData } from "./default_data.js";
import ThumbRaiser from "./thumb_raiser";
import { ModelChangeFloor } from "../../../../ModelChangeFloor";
import { HttpRequest } from "@angular/common/http";

export default class UserInteraction {
    constructor(rooms, maze,scene, renderer, lights, fog, player, animations, build, thumbRaiser, modelChangeService) {
        this.modelChangeService = modelChangeService
        this.thumbRaiser = thumbRaiser;
        this.rooms = rooms
        this.player=player;
        this.maze=maze;
        this.roomOfOrigin = rooms[0].identifier; // default to first room
        this.roomOfDestiny = rooms[0].identifier; // default to first room
        console.log(rooms)

        console.log(this.rooms)

        function colorCallback(object, color) {
            object.color.set(color);
        }

        function shadowsCallback(enabled) {
            scene.traverseVisible(function (child) { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            });
        }

        function createEmoteCallback(animations, name) {
            callbacks[name] = function () {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);
        }



        // Create the graphical user interface
        this.gui = new GUI({ hideable: false });

        // Create the lights folder
        const lightsFolder = this.gui.addFolder("Lights");
        lightsFolder.close();

        // Create the ambient light folder
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        ambientLightFolder.close();
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Create point light #1 folder
        const pointLight1Folder = lightsFolder.addFolder("Point light #1");
        pointLight1Folder.close();
        const pointLight1 = lights.object.pointLight1;
        const pointColor1 = { color: "#" + new THREE.Color(pointLight1.color).getHexString() };
        pointLight1Folder.addColor(pointColor1, "color").onChange(color => colorCallback(pointLight1, color));
        pointLight1Folder.add(lights.object.pointLight1, "intensity", 0.0, 100.0, 1.0);
        pointLight1Folder.add(lights.object.pointLight1, "distance", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "x", -10.0, 10.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "y", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "z", -10.0, 10.0, 0.01);

        // Create point light #2 folder
        const pointLight2Folder = lightsFolder.addFolder("Point light #2");
        pointLight2Folder.close();
        const pointLight2 = lights.object.pointLight2;
        const pointColor2 = { color: "#" + new THREE.Color(pointLight2.color).getHexString() };
        pointLight2Folder.addColor(pointColor2, "color").onChange(color => colorCallback(pointLight2, color));
        pointLight2Folder.add(lights.object.pointLight2, "intensity", 0.0, 100.0, 1.0);
        pointLight2Folder.add(lights.object.pointLight2, "distance", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "x", -10.0, 10.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "y", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "z", -10.0, 10.0, 0.01);

        // Create the shadows folder
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.close();
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        // Create the fog folder
        const fogFolder = this.gui.addFolder("Fog");
        fogFolder.close();
        const fogColor = { color: "#" + new THREE.Color(fog.color).getHexString() };
        fogFolder.add(fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange(color => colorCallback(fog.object, color));
        fogFolder.add(fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(fog.object, "far", 1.01, 20.0, 0.01);

        // Create the rooms folder folder
        // Create the path folder
        const pathFolder = this.gui.addFolder("Path");
        pathFolder.close();


        let roomsTemp = [];
        let a = mazeData.url.substring(21).split('.');
        for (let index = 0; index < rooms.length; index++) {
            if (rooms[index].floorID == a[0]) {
                roomsTemp.push(rooms[index]);
            }

        }
        console.log(a);
        console.log(roomsTemp);
        let roomsControlOr = null;
        let roomsControlDest = null;
        let or = rooms[0].identifier;
        let dest = rooms[0].identifier;

        // Add dropdowns for room of origin and room of destiny
        const roomsOr = roomsTemp.map(room => room.identifier);
        roomsControlOr = pathFolder.add({ room: roomsOr[0] }, 'roomOfOrigin', roomsOr);
        roomsControlOr.onChange(function (room) {
            or = room
        });
        let romtDestTemp = rooms[0].identifier
        const roomsDest = rooms.map(room => room.identifier);

        roomsControlDest = pathFolder.add({ room: roomsDest[0] }, 'roomOfDestiny', roomsDest);
        roomsControlDest.onChange(function (room) {
            dest = room
        });
        this.roomOfDestiny = romtDestTemp;
        // Add a submit button
        pathFolder.add({ submit: () => this.submitPath(or, dest) }, 'submit');
        

       
        let aaaaa = mazeData.url.substring(21).split('.');
        let floorDomainId = aaaaa[0];
        let specificFloor = findFloor(floorDomainId);
        let floorName = specificFloor.name;
        console.log("Do find floor"+floorName);
    
        // O folder abaixo só deve aparecer quando o nosso floorName tiver a letra "A"
        // Se o floorName for "A1" a opção submit deve estar disponível
        // Se for A2, então a opção submit não deve estar disponível e sim a opção continue
        const examplePathFolder = this.gui.addFolder("Robot Auto Walk Example");
        examplePathFolder.close();

        if (floorName === "A1") {
        examplePathFolder.add({ try: () => {
            this.submitExamplePath();
            setTimeout(() => {
                loadMapElevator();
            }, 4000); 
        }}, 'try');
        } else if (floorName === "A2") {
        examplePathFolder.add({ continue: () => this.submitExamplePath2() }, 'continue');
        }






        // Create the character folder
        const characterFolder = this.gui.addFolder("Character");
        characterFolder.close();

        // Create the emotes folder and add emotes
        /* const emotesFolder = characterFolder.addFolder("Emotes");
        const callbacks = [];
        for (let i = 0; i < animations.emotes.length; i++) {
            createEmoteCallback(animations, animations.emotes[i]);
        }
        */
        const changeModelInstance = new ChangeModel();

        // ...
        const changeModelFolder = characterFolder.addFolder("Change Model");
        changeModelFolder.close();
        changeModelFolder.add({ changeModel: 'Options' }, 'changeModel', ["Robot"]).onChange(function (selectedModel) {
            changeModelInstance.changeModelURL(selectedModel); // Chamada correta do método
            this.modelChangeService.notifyModelChanged(); // Chamada correta usando this.modelChangeService
        });



        // Para quando se encontrar um elevador, conseguir mudar o piso
        const elevatorFolder = this.gui.addFolder("Elevator");
        //const changeFloorElevatorInstance = new SelectFloorElevator();
        elevatorFolder.hide();
        
        function openElevatorFolder() {
            //changeFloorElevatorInstance.GetCurrentFloor();
            elevatorFolder.show();
        }
        



        // Create the walking folder
        function convertMap(floorMap) {
            let map = [];
            let initialPosition, initialDirection, elevatorLocations;
            let exitLocation = [];

            for (let i = 0; i < floorMap.length; i++) {
                let row = [];
                for (let j = 0; j < floorMap[i].length; j++) {
                    let cell = floorMap[i][j];
                    switch (cell.tipo) {
                        case "0":
                            row.push(0);
                            break;
                        case "1":
                            row.push(1);
                            break;
                        case "2":
                            row.push(2);
                            break;
                        case "3":
                            initialPosition = [i, j];
                            initialDirection = 0.0;
                            row.push(3);
                            break;
                        case "4":
                            elevatorLocations = [i, j];
                            row.push(4);
                            break;
                        case "5":
                            elevatorLocations = [i, j];
                            row.push(5);
                            break;
                        case "6":
                            exitLocation.push([i, j]);

                            row.push(6);
                            break;
                        case "7":
                            exitLocation.push([i, j]);

                            row.push(7);
                            break;
                        case "8":
                            exitLocation.push([i, j]);
                            row.push(8);
                            break;
                        case "9":
                            exitLocation.push([i, j]);
                            row.push(9);
                            break;
                        case "10":
                            row.push(10);
                            break;
                        case "11":
                            row.push(11);
                            break;
                        default:
                            row.push(0);
                            break;
                    }
                }
                map.push(row);
            }
            if (exitLocation != undefined) {
                return {
                    map: map,
                    initialPosition: initialPosition,
                    initialDirection: initialDirection,
                    exitLocation: exitLocation,
                    elevatorLocations: elevatorLocations
                };
            } else {
                return {
                    map: map,
                    initialPosition: initialPosition,
                    initialDirection: initialDirection,
                    elevatorLocations: elevatorLocations
                };
            }


        }

        // seu objeto JSON aqui
        //let newMap = convertMap(floorMap);
        //console.log(newMap);
        console.log(this.thumbRaiser.request)
        console.log(thumbRaiser)
        const floorChange = new ModelChangeFloor(this.thumbRaiser.request);

        function findFloor(specificDomainId) {
            let specificFloor = null;
    
            for (let building of build.build) {
                for (let floor of building.floors) {
                    if (floor.DomainId === specificDomainId) {
                        specificFloor = floor;
                        break;
                    }
                }
                if (specificFloor) break;
            }
    
    
            if (specificFloor) {
                console.log('Floor específico encontrado:', specificFloor.name);
            } else {
                console.log('Nenhum floor encontrado com o DomainId específico');
            }
            return specificFloor;
        }

        function loadMap(floor, buildings) {
            const r = convertMap(floor.floorMap);
            console.log(r);
            console.log(r.map[0]);
            console.log(r.map.length);
            console.log(r.map[0].length);
            console.log(r.exitLocation);
            console.log(r.elevatorLocations);
            console.log(r.initialDirection);
            console.log(r.initialPosition);
            const wit = r.map[0].length - 1;
            const height = r.map.length - 1;
            let temp = '"map"' + ": [" + r.map.map(row => "[" + row.join(", ") + "]").join(", ") + "]";
            console.log(temp);
            let data = "{" + '"groundTextureUrl"' + ":" + '"./../../assets/textures/ground.jpg"' + "," +
                '"wallTextureUrl"' + ":" + '"../../../assets/textures/wall.jpg"' + "," +
                '"elevatorTextureUrl"' + ":" + '"../../../assets/textures/elevator.jpg"' + "," +
                '"emergencyExitTextureUrl"' + ":" + '"../../../assets/textures/emergencyExit.jpg"' + "," +
                '"doorTextureUrl"' + ":" + '"../../../assets/textures/door_front.png"' + "," +
                '"exitTextureUrl"' + ":" + '"../../../assets/textures/exit.jpg"' + "," + "" +
                '"size"' + ":" + "{" + '"width"' + ":" + wit + "," + '"height"' + ":" + height + "}," +
                temp +
                "," +
                '"initialPosition"' + ":[" + r.initialPosition + "]," +
                '"initialDirection"' + ":" + r.initialDirection + "," +
                '"exitLocation"' + ":[" + r.exitLocation + "]," +
                '"elevatorLocations"' + ":[" + r.elevatorLocations + "]" +
                "}"
            let filePath = floor.DomainId + ".json";
            const res = {
                "data": data,
                "filePath": filePath
            }
            console.log(res.data);
            floorChange.setData(res);
            //let filePath = "./../../assets/mazes/" + floor.DomainId + ".json";             
        };

        function loadMapElevator() {
            const buildings = build.build;
            console.log("mapElevator buildings: " + buildings);
            const floors = buildings[0].floors.map(floor => floor.floorNumber);
            console.log("mapElevator floors: " + floors);

            const floor = buildings[0].floors[1];
            console.log("mapElevator floor: " + floor);
            console.log("Entrou no loadMapElevator")
            const r = convertMap(floor.floorMap);
    
            const wit = r.map[0].length - 1;
            const height = r.map.length - 1;
    
            const initialPositionElevator = [r.elevatorLocations[0], r.elevatorLocations[1]];
    
            let temp = '"map"' + ": [" + r.map.map(row => "[" + row.join(", ") + "]").join(", ") + "]";
    
            let data = "{" +
                '"groundTextureUrl"' + ":" + '"./../../assets/textures/ground.jpg"' + "," +
                '"wallTextureUrl"' + ":" + '"../../../assets/textures/wall.jpg"' + "," +
                '"elevatorTextureUrl"' + ":" + '"../../../assets/textures/elevator.jpg"' + "," +
                '"emergencyExitTextureUrl"' + ":" + '"../../../assets/textures/emergencyExit.jpg"' + "," +
                '"doorTextureUrl"' + ":" + '"../../../assets/textures/door_front.png"' + "," +
                '"exitTextureUrl"' + ":" + '"../../../assets/textures/exit.jpg"' + "," + "" +
                '"size"' + ":" + "{" + '"width"' + ":" + wit + "," + '"height"' + ":" + height + "}," +
                temp +
                "," +
                '"initialPosition"' + ":[" + initialPositionElevator + "]," + // Usando a nova posição inicial do elevador
                '"initialDirection"' + ":" + r.initialDirection + "," +
                '"exitLocation"' + ":[" + r.exitLocation + "]," +
                '"elevatorLocations"' + ":[" + r.elevatorLocations + "]" +
                "}";
    
            let filePath = floor.DomainId + ".json";
            console.log("Data:" + data);
            console.log("Elevador:" + r.elevatorLocations)
            const res = {
                "data": data,
                "filePath": filePath
            };
    
            floorChange.setData(res);
        };

        let gui = null;
        let buildingControl = null;
        let floorControl = null;
        const buildings = build.build;
        function createGUI(building) {
            // Remova a GUI antiga, se existir
            if (gui) {
                gui.destroy();
            }

            // Crie uma nova GUI
            gui = new GUI({ hideable: false });
            gui.close();

            // Crie uma pasta para a seleção do edifício
            const buildingNames = buildings.map(b => b.code);

            buildingControl = gui.add({ building }, 'building', buildingNames).onChange(createGUI);
            let i = 0;
            for (let index = 0; index < buildings.length; index++) {
                if (buildings[index].code == building) {
                    i = index;
                }
            }
            // Crie uma pasta para a seleção do piso, se houver pisos disponíveis
            const floors = buildings[i].floors.map(floor => floor.floorNumber);
            if (floors.length > 1 && floors[0] !== '') {
                console.log(floors);
                floorControl = gui.add({ floor: floors[0] }, 'floor', floors);
                floorControl.onChange(function (floor) {
                    console.log('Piso selecionado:', floor);
                    let j = 0;
                    for (let index = 0; index < buildings[i].floors.length; index++) {
                        if (buildings[i].floors[index].floorNumber == floor) {
                            j = index;
                        }
                    }
                    loadMap(buildings[i].floors[j], buildings[i]);  // Carregue o mapa quando o piso for alterado
                });
            } else if (floors.length == 1 && floors[0] !== '') {
                console.log(floors);
                floorControl = gui.add({ floor: floors[0] }, 'floor', floors);
                console.log('Piso selecionado:', floors[0]);

                loadMap(buildings[i].floors[0], buildings[i]);
            } else {
                gui.add({ message: 'Este edifício não tem pisos' }, 'message');
            }
        }


        // Crie a GUI inicial
        createGUI(Object.keys(buildings)[0]);
    }


    setVisibility(visible) {
        if (visible) {
            this.gui.show();
        }
        else {
            this.gui.hide();
        }
    }



    async submitPath(roomOfOrigin, roomOfDestiny) {
        console.log(`Path submitted from ${roomOfOrigin} to ${roomOfDestiny}`);
        let tempRoomOfOrigin = roomOfOrigin.toLowerCase();
        let tempRoomOfDestiny = roomOfDestiny.toLowerCase();
        const floorChange = new ModelChangeFloor(this.thumbRaiser.request);
        let temp;
        try {
            temp = await floorChange.getPath(tempRoomOfOrigin, tempRoomOfDestiny);
            let dataTemp;
            temp.subscribe(
                (data) => {
                    dataTemp = data.substring(1, data.length - 1);
                    console.log(dataTemp);
                    let t=dataTemp.substring(0,2);
                    let building = t; // Substitua "a2" pela variável desejada
                    //let regex = new RegExp(building + "\\(\\d+,\\d+\\)", "g");
                    let items = dataTemp.split(',');
                    let regex = /([a-z]\d+)\((\d+),(\d+)\)/g;
                    let match;
                    let output = [];
                    while ((match = regex.exec(dataTemp)) !== null) {
                        let buildingAndFloor = match[1];
                        let building = buildingAndFloor[0];
                        let floor = parseInt(buildingAndFloor.slice(1));
                        let x = parseInt(match[3]);
                        let y = parseInt(match[2]);
                        output.push({building: building, floor: floor, x: x, y: y});
                    }
                    //this.player.maze.cartesianToCell()
                    var tem=[]
                    console.log(output[0].x)
                    for (let index = 0; index < output.length; index++) {
                        var temp=this.maze.cellToCartesian1(output[index].y,output[index].x);
                        console.log(temp)
                        tem.push({x: temp.x, y:temp.y, z: temp.z});
                        
                    }
                    console.log(tem)
                    for (let index = 0; index < this.maze.exitLocation.length; index++) {
                        console.log(this.maze.cartesianToCell(this.maze.exitLocation[index]))
                    }
                   this.playe(tem)
                },
                (err) => {
                    console.log(err);
                }
            )

        } catch (error) {
            console.error('Error getting path:', error);
            return;
        }

        // add your submission handling code here
    }

    async submitExamplePath() {
        /* a1(4,10),a1(4,11),a1(4,12),a1(4,13),a1(4,14),a1(4,16),a1(4,17),a1(4,18),a1(4,19),a1(4,20),a1(3,20),a1(2,20),a1(1,20),a1(1,21), (aqui é detetado elevador)
a2(1,21),a2(1,20),a2(2,20),a2(3,20),a2(4,20),a2(5,20),a2(5,21) (aqui deteta corredor) */
                    let dataTemp = "a1(10,4),a1(11,4),a1(12,4),a1(13,4),a1(14,4),a1(16,4),a1(17,4),a1(18,4),a1(19,4),a1(20,4),a1(20,3),a1(20,2),a1(20,1),a1(21,1),a1(21,0)"
                    console.log(dataTemp);
                    let t=dataTemp.substring(0,2);
                    let building = t; // Substitua "a2" pela variável desejada
                    //let regex = new RegExp(building + "\\(\\d+,\\d+\\)", "g");
                    let items = dataTemp.split(',');
                    let regex = /([a-z]\d+)\((\d+),(\d+)\)/g;
                    let match;
                    let output = [];
                    while ((match = regex.exec(dataTemp)) !== null) {
                        let buildingAndFloor = match[1];
                        let building = buildingAndFloor[0];
                        let floor = parseInt(buildingAndFloor.slice(1));
                        let x = parseInt(match[3]);
                        let y = parseInt(match[2]);
                        output.push({building: building, floor: floor, x: x, y: y});
                    }
                    //this.player.maze.cartesianToCell()
                    var tem=[]
                    console.log(output[0].x)
                    for (let index = 0; index < output.length; index++) {
                        var temp=this.maze.cellToCartesian1(output[index].y,output[index].x);
                        //console.log(temp)
                        tem.push({x: temp.x, y:temp.y, z: temp.z});
                        
                    }
                    //console.log(tem)
                    for (let index = 0; index < this.maze.exitLocation.length; index++) {
                        console.log(this.maze.cartesianToCell(this.maze.exitLocation[index]))
                    }
                    console.log("A entrar no loadMapElevator desde o submitExamplePath")
                   this.playe(tem)
                   // wait 3 seconds
                     
                   

                   
    }

    async submitExamplePath2() {
        /* 
a2(1,21),a2(1,20),a2(2,20),a2(3,20),a2(4,20),a2(5,20),a2(5,21) (aqui deteta corredor) */
let dataTemp = "a2(21,1),a2(20,1),a2(20,2),a2(20,3),a2(20,4),a2(20,5),a2(21,5),a2(22,5)"
console.log(dataTemp);
let t=dataTemp.substring(0,2);
let building = t; // Substitua "a2" pela variável desejada
//let regex = new RegExp(building + "\\(\\d+,\\d+\\)", "g");
let items = dataTemp.split(',');
let regex = /([a-z]\d+)\((\d+),(\d+)\)/g;
let match;
let output = [];
while ((match = regex.exec(dataTemp)) !== null) {
    let buildingAndFloor = match[1];
    let building = buildingAndFloor[0];
    let floor = parseInt(buildingAndFloor.slice(1));
    let x = parseInt(match[3]);
    let y = parseInt(match[2]);
    output.push({building: building, floor: floor, x: x, y: y});
}
//this.player.maze.cartesianToCell()
var tem=[]
console.log(output[0].x)
for (let index = 0; index < output.length; index++) {
    var temp=this.maze.cellToCartesian1(output[index].y,output[index].x);
    console.log(temp)
    tem.push({x: temp.x, y:temp.y, z: temp.z});
    
}
console.log(tem)
for (let index = 0; index < this.maze.exitLocation.length; index++) {
    console.log(this.maze.cartesianToCell(this.maze.exitLocation[index]))
}

this.playe(tem)
    }

    playe(path) {
        this.player.path = path;
        this.player.currentStep = 0; // Reset to the start of the new path
    }

}