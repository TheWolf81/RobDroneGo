import * as THREE from "three";

export default class Elevator {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create an elevator (box-like structure)

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the front wall of the elevator (a rectangle representing doors)
        let geometry = new THREE.PlaneGeometry(0.95, 1.0);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
        let doors = new THREE.Mesh(geometry, material);
        doors.position.set(0.0, 0.0, 0.025);
        this.object.add(doors);

        // Create the back wall of the elevator
        let backWall = new THREE.Mesh(geometry, material);
        backWall.rotateY(Math.PI);
        backWall.position.set(0.0, 0.0, -0.025);
        this.object.add(backWall);

        // Create the left wall of the elevator with reduced width
geometry = new THREE.BoxGeometry(0.025, 0.5, 0.5); // Alterada a largura para 0.025
let leftWall = new THREE.Mesh(geometry, material);
leftWall.position.set(-0.5125, 0.0, 0.0); // Ajuste na posição para manter o centro da parede
this.object.add(leftWall);

// Create the right wall of the elevator with reduced width
let rightWall = new THREE.Mesh(geometry, material); // Usando a mesma geometria
rightWall.position.set(0.5125, 0.0, 0.0); // Ajuste na posição para manter o centro da parede
this.object.add(rightWall);


        // Create the top panel of the elevator
        geometry = new THREE.PlaneGeometry(1.05, 1.05);
        let topPanel = new THREE.Mesh(geometry, material);
        topPanel.rotateX(Math.PI / 2);
        topPanel.position.set(0.0, 0.5, 0.0);
        this.object.add(topPanel);
    }
}
