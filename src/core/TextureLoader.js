import * as THREE from 'three';
import { TEXTURES_CONFIG } from '../config/texture.js';

export class TextureLoader {
    constructor(){
        this.texture_loader = new THREE.TextureLoader();
    }

    load(url){
        const texture = this.texture_loader.load(
            url,
            (texture) => { texture.colorSpace = THREE.SRGBColorSpace;}
        );
        return texture;
    }

    loadMaps(index_map){
        if(index_map === 1){
            const url_albedo = TEXTURES_CONFIG.url.obsidian.albedo;
            const texture = this.texture_loader.load(url_albedo);
            return texture;
        }
        if(index_map === 2){
            const url_ao = TEXTURES_CONFIG.url.obsidian.ao;
            const texture = this.texture_loader.load(url_ao);
            return texture;
        }
        if(index_map === 3){
            const url_height = TEXTURES_CONFIG.url.obsidian.height;
            const texture = this.texture_loader.load(url_height);
            return texture;
        }
        if(index_map === 4){
            const url_metalic = TEXTURES_CONFIG.url.obsidian.metalic;
            const texture = this.texture_loader.load(url_metalic);
            return texture;
        }
        if(index_map === 5){
            const url_roughness = TEXTURES_CONFIG.url.obsidian.roughness;
            const texture = this.texture_loader.load(url_roughness);
            return texture;
        }
        if(index_map === 6){
            const url_normal = TEXTURES_CONFIG.url.obsidian.normal;
            const texture = this.texture_loader.load(url_normal);
            return texture;
        }
    }
}
