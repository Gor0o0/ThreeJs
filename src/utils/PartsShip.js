import * as THREE from 'three';

// -=-=| Скрипт для запчастей корабля
export class PartsShip{
    constructor(){
        this.ship = null;
        this.cabin = null;
    }

    createCabin(){
        const sprite = new THREE.TextureLoader().load('../../textures/metal.png');
        
        const coneGeometry = new THREE.ConeGeometry(3, 4, 10); // radiusTop, radiusBottom, height
        const material = new THREE.MeshStandardMaterial({map: sprite});

        
        this.cabin = new THREE.Mesh(coneGeometry, material);
        this.cabin.position.set(2.5, 5, 0);
        this.cabin.scale.set(0.3,0.3,0.3);
        return this.cabin;
    }
}