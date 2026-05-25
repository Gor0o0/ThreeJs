import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {CAMERA_CONFIG} from "../config/camera.js";
import { FlyControls } from 'three/addons/controls/FlyControls.js';

export class CameraManager {
    constructor(renderDomElement) {
        this.camera = null;
        this.controls = null;
        this.renderDomElement = renderDomElement;
    }
    create() {

        this.camera = new THREE.PerspectiveCamera(
            CAMERA_CONFIG.fov,
            window.innerWidth / window.innerHeight,
            CAMERA_CONFIG.near,
            CAMERA_CONFIG.far
        );
        
        this.camera.position.set(
            CAMERA_CONFIG.position.x,
            CAMERA_CONFIG.position.y,
            CAMERA_CONFIG.position.z,
        )
        
        this.camera.lookAt(
            CAMERA_CONFIG.target.x,
            CAMERA_CONFIG.target.y,
            CAMERA_CONFIG.target.z
        )
        return this.camera
    }
    
    createOrbitControls(){  //setter
        this.controls = new OrbitControls(this.camera, this.renderDomElement);
        this.controls.enablePan = CAMERA_CONFIG.controls.enablePan;
        this.controls.enableDamping = CAMERA_CONFIG.controls.enableDamping;
        this.controls.enableZoom = CAMERA_CONFIG.controls.enableZoom;
        this.controls.dampingFactor = CAMERA_CONFIG.controls.dampingFactor;
        this.controls.autoRotate = CAMERA_CONFIG.controls.autoRotate;
        this.controls.rotateSpeed = CAMERA_CONFIG.controls.rotateSpeed;
        this.controls.zoomSpeed = CAMERA_CONFIG.controls.zoomSpeed;
        
        this.controls.target.set(
            CAMERA_CONFIG.target.x,
            CAMERA_CONFIG.target.y,
            CAMERA_CONFIG.target.z
        );
        
        return this.controls;
    }
    
    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
    
    update(){
        if(this.controls){
            this.controls.update();
        }
    }
    getCamera() {
        return this.camera
    }

    getControls() { //getter
        return this.controls;
    }
}