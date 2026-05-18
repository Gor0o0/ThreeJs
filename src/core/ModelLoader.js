import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ModelLoader{

    constructor(scene){
        this.scene = scene;
        this.model = null;
    }
    
    async load(){
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync( '../../models/scout.glb' );
        this.model = gltf.scene;
        console.log(this.model);
        this.model.position.set(0, 2, 0)

        this.scene.add( this.model );

    }
}