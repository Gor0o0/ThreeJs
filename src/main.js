import * as THREE from 'three';
import {SceneManager} from "./core/SceneManager.js";
import {CameraManager} from "./core/CameraManager.js";
import {LightManager} from "./core/LightManager.js";
import {Settings} from "./utils/Settings.js"
import {ShipGenerator} from "./utils/ShipGenerator.js"
import {SkySettings} from "./utils/SkySettings.js"
import {ModelLoader} from "./core/ModelLoader.js"
import { Ship } from './entities/Ship.js';

class Main{
    constructor(){
        this.sceneManager = null;
        this.cameraManager = null;
        this.lightManager = null;
        this.settings = null;
        this.renderer = null;
        this.camera = null;
        
        this.skySettings = null;
        this.shipGenerator = null;
        this.modelLoader = null;
        
        this.clock = null;
        this.model = null;

        this.ship = null;

        this.asteroid = null;

        this.ship = null;
        this.cruiser = null;

        this.init()
    }
    
    init(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        this.sceneManager = new SceneManager();
        const scene = this.sceneManager.create();

        this.cruiser = new Ship(scene);

        this.cameraManager = new CameraManager(this.renderer.domElement);
        this.cameraManager.create();
        this.cameraManager.createFlyControls();
        //this.cameraManager.createOrbitControls();

        this.lightManager = new LightManager(scene);
        this.lightManager.createAll();

        this.settings = new Settings(scene);
        this.settings.createAllHelpers();
        this.settings.createAllMeshes();
        
        this.skySettings = new SkySettings(scene);
        this.skySettings.createStars();
        
        this.shipGenerator = new ShipGenerator(scene);
        //this.shipGenerator.createShip('scout');
        //this.model = this.shipGenerator.ship
        
        this.modelLoader = new ModelLoader(scene);
        this.modelLoader.load(0);

        setTimeout(()=> {
            this.ship = this.modelLoader.model
            this.modelLoader.model = null;
            this.cruiser = new Ship(scene);
        }, 500)

        this.clock = new THREE.Clock();

        window.addEventListener('resize', () => this.onWindowResize());

        this.animate();
    }

    
    onWindowResize(){
        this.cameraManager.onWindowResize();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate(){
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        
        this.cameraManager.update(delta);

        const camera = this.cameraManager.getCamera();

        if(this.ship && camera){ //> тут мы можем склеить объекты между собой
            this.ship.position.copy(camera.position);
            this.ship.position.x = -5;
            this.ship.position.y -= 15;
            this.ship.position.z = 7;

            this.ship.rotation.x = camera.rotation.x;
            this.ship.rotation.y = camera.rotation.y - 45;
            this.ship.rotation.z = camera.rotation.z - 60;
        }

        this.renderer.render(
            this.sceneManager.getScene(),
            this.cameraManager.getCamera(),
            this.camera = this.cameraManager.getCamera()
        )
    }
}

const game = new Main();