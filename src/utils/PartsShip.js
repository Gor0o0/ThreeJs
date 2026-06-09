import * as THREE from 'three';
import {TextureLoader} from '../core/TextureLoader.js';

export class PartsShip {
    constructor() {
        this.ship = null;
        this.cabine = null;
        this.texture_loader = new TextureLoader();
    }
    
    createCabin(){
        let maps = [];
        for(let i = 0; i < 6; i++){
            maps[i] = this.texture_loader.loadMap(i, 'hex-armor')
        }
        // const map = this.texture_loader.loadMap(0, 'hex-armor');
        // const ao = this.texture_loader.loadMap(1, 'hex-armor');
        // const metalic = this.texture_loader.loadMap(2, 'hex-armor');
        // const roughness = this.texture_loader.loadMap(3, 'hex-armor');
        // const normal = this.texture_loader.loadMap(4, 'hex-armor');
        // const height = this.texture_loader.loadMap(5, 'hex-armor');

        const geometry = new THREE.SphereGeometry();

        const material = new THREE.MeshStandardMaterial( { 
            map: maps[0], 
            aoMap: maps[1], 
            metalnessMap: maps[2],
            roughnessMap: maps[3],
            normalMap: maps[4],
            displacementMap: maps[5]
        });
        material.displacementScale = 0.2;
        material.metalness = 1;
        material.roughness = 0.5;
        material.side = 2;

        console.log(material);
        this.cabin = new THREE.Mesh(geometry, material);
        return this.cabin;
    }
}