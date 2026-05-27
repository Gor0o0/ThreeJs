import * as THREE from 'three';
import {TEXTURES_CONFIG} from '../config/texture.js';

export class TextureLoader {
    constructor() {
        this.texture_loader = new THREE.TextureLoader();
    }

    load(count, key){
        for(let i = 0; i < count + 1; i++){
            this.loadMap(i, key);
            return
        };
    }

    loadMap(index, key){
        const url = TEXTURES_CONFIG.url[key][index];
        const texture = this.texture_loader.load(url);
        return texture;
    }
    
}