//==================================
// Класс создания корабля из частей
//==================================

import * as THREE from 'three';
import {PartsShip} from './PartsShip.js';
import {SHIP_CONFIG} from '../config/ship.js';

export class ShipGenerator{
    constructor(scene) {
        this.scene = scene;
        this.ship = null;
        this.parts = new PartsShip();
    }
    
    createShip(type_ship){
        const type_scout = SHIP_CONFIG.type.scout
        const type_assault = SHIP_CONFIG.type.assault
        this.ship = new THREE.Group(
        );
        if(type_ship === type_scout){
            this.ship.scale.set(new THREE.Vector3(5, 1, 5)) ;
            console.log(this.ship)
        }
        const cabin = this.parts.createCabin();
        this.ship.add(cabin);
        this.scene.add(this.ship);
        
    }
}
