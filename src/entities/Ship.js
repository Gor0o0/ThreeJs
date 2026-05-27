import * as THREE from 'three';

export class Ship{
    constructor(scene){
        this.scene = scene;
        this.model = null;
        this.camera = null;

        this.init();
    }
    
    init(){
        console.log(this.scene);
    }

    move(delta){
        //> логика из main/animate
    }
}