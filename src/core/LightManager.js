import * as THREE from 'three';
import {LIGHTS_CONFIG} from "../config/light.js";

export class LightManager {
    constructor(scene) {
        this.scene = scene;
        this.lights = {};
    }
    
    createAll(){
        this._createMainLight();
        this._createAmbientLight();
        return this.lights;
    }
    
    _createMainLight(){
        const config = LIGHTS_CONFIG.main
        const light = 
            new THREE.DirectionalLight(config.color, config.intensity);
        light.position.set(config.position.x, config.position.y, config.position.z);
        
        if(config.castShadow){
            light.castShadow = true;
            light.shadow.mapSize.with = config.shadowMapSize;
            light.shadow.mapSize.height = config.shadowMapSize;
            
            light.shadow.camera.near = 0.5;
            light.shadow.camera.far = 20;
        }
        this.scene.add(light);
        this.lights.main = light;

        const helper = new THREE.DirectionalLightHelper( light, 5 );
        this.scene.add( helper );

    }

    _createAmbientLight(){
        const light = new THREE.AmbientLight( 'yellow' ); // soft white light
        light.position.x = -3;
        light.position.y = 3;
        light.intensity = 0.5;

        this.scene.add( light );
        this.lights.ambient = light;
        console.log(light);

    }
    
    getLight(name){
        return this.lights[name];
    }
}