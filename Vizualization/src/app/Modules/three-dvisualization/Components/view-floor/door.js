import * as THREE from "three";

export default class Door {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture for the door
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a group of objects to represent the door
        this.object = new THREE.Group();

        // Create the main part of the door (a rectangle)
        let geometry = new THREE.BoxGeometry(1.0, 2.0, 0.05);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
        let mainPart = new THREE.Mesh(geometry, material);
        this.object.add(mainPart);

        // Create the doorknob (a small sphere) on the right side
        geometry = new THREE.SphereGeometry(0.05, 16, 16);
        let knobMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        let doorknob = new THREE.Mesh(geometry, knobMaterial);
        doorknob.position.set(0.5, 0.0, 0.025);
        this.object.add(doorknob);
    }
}
