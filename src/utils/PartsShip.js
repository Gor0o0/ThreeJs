import * as THREE from 'three';
import { TextureLoader } from '../core/TextureLoader.js';

// -=-=| Скрипт для запчастей корабля
export class PartsShip{
    constructor(){
        this.ship = null;
        this.cabin = null;
        this.texture_loader = new TextureLoader();
    }

    createCabin(){
        const map = this.texture_loader.loadMaps(1);
        const ao = this.texture_loader.loadMaps(2);
        const height = this.texture_loader.loadMaps(3);
        const metalic = this.texture_loader.loadMaps(4);
        const roughness = this.texture_loader.loadMaps(5);
        const normal = this.texture_loader.loadMaps(6);
        
        const coneGeometry = new THREE.ConeGeometry(3, 4, 10); // radiusTop, radiusBottom, height
        const material = new THREE.MeshStandardMaterial({map: map, aoMap: ao, displacementMap: height, metalnessMap: metalic, roughnessMap: roughness, normalMap: normal}); 

        this.cabin = new THREE.Mesh(coneGeometry, material);
        this.cabin.position.set(0, 0, 0); // (2.5, 5, 0)
        this.cabin.scale.set(0.3,0.3,0.3);
        return this.cabin;
    }
}