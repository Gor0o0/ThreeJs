import * as THREE from 'three';
import {SceneManager} from "./core/SceneManager.js";
import {CameraManager} from "./core/CameraManager.js";
import {LightManager} from "./core/LightManager.js";
import {Settings} from "./utils/Settings.js";

class Main{
    constructor(){
        this.sceneManager = null;
        this.cameraManager = null;
        this.lightManager = null;
        this.settings = null;
        this.renderer = null;
        this.camera = null;
        
        this.time = 0;
        this.cube = null;
        
    }
    test(scene){
        // фигура и материал
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({
            color : 0xF54927,
            roughness : 0.5,
            metalness : 0.5
        });
        //> const.cube
        this.cube = new THREE.Mesh(geometry, material);
        this.cube = this.cube;
        scene.add(this.cube);
    }
    init(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enable = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        
        this.sceneManager = new SceneManager();
        const scene = this.sceneManager.create();
        
        this.cameraManager = new CameraManager(this.renderer.domElement);
        this.cameraManager.create();
        this.cameraManager.createControls();
        
        this.lightManager = new LightManager(scene);
        this.lightManager.createAll();
        //this.test(scene);

        this.settings = new Settings(scene);
        this.settings.craeteAllHelpers();
        this.settings.createAllMeshes();

        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.animate();
    }

    onWindowResize() {
        this.cameraManager.onWindowResize();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate(){
        requestAnimationFrame(() => this.animate());
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        
        // this.time += 0.016;
        // this.cube.rotation.x = this.time;
        // this.cube.rotation.y = this.time;

        this.cameraManager.update();

        this.renderer.render(
            this.sceneManager.getScene(),
            this.cameraManager.getCamera()
        )
    }
}

const game = new Main();
game.init();