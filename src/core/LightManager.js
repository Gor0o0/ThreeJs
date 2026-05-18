import * as THREE from 'three';
import {LIGHTS_CONFIG} from "../config/light.js";

export class LightManager {
    constructor(scene) {
        this.scene = scene;
        this.lights = {};
    }
    
    createAll(){
        this._createMainLight();
        return this.lights;
    }
    
    _createMainLight(){
        const config = LIGHTS_CONFIG.main;
        
        const light = new THREE.DirectionalLight(config.color, config.intensity);
        light.position.set(config.position.x, config.position.y, config.position.z);
        
        if (config.castShadow) {
            light.castShadow = true;
            
            light.shadow.mapSize.width = config.shadowMapSize || 2048;
            light.shadow.mapSize.height = config.shadowMapSize || 2048;
            
            light.shadow.camera.near = 0.5;
            light.shadow.camera.far = 20;
            light.shadow.camera.left = -15;
            light.shadow.camera.right = 15;
            light.shadow.camera.top = 15;
            light.shadow.camera.bottom = -15;
        }
        
        this.scene.add(light);
        this.lights.main = light;
    }
    
    getLight(name){
        return this.lights[name];
    }
}
