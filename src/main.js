import * as THREE from 'three';
import {SceneManager} from "./core/SceneManager.js";
import {CameraManager} from "./core/CameraManager.js";
import {LightManager} from "./core/LightManager.js";
import {Settings} from "./utils/Settings.js"
import {ShipGenerator} from "./utils/ShipGenerator.js"
import {SkySettings} from "./utils/SkySettings.js"
import {ModelLoader} from "./core/ModelLoader.js"
import {PaneConstructor} from "./utils/PaneConstructor.js"
import { FlyControls } from 'three/examples/jsm/Addons.js';

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
        
        this.time = 0;
        this.cube = null;

        this.paneConstructor = null;
        
        this.init()
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

        this.settings = new Settings(scene);
        this.settings.createAllHelpers();
        this.settings.createAllMeshes();
        
        this.skySettings = new SkySettings(scene);
        this.skySettings.createStars();
        
        this.shipGenerator = new ShipGenerator(scene);
        this.shipGenerator.createShip('scout');
        this.model = this.shipGenerator.ship;
        
        this.modelLoader = new ModelLoader(scene);
        //this.modelLoader.load(3);

        this.paneConstructor = new PaneConstructor(scene);
        this.paneConstructor.addAllPanels(this.model);
        
        window.addEventListener('resize', () => this.onWindowResize());

        this.animate();
    }
    createFlyControls(){
		this.controls = new FlyControls(this.camera, this.renderDomElement);

		this.controls.movementSpeed = 2500;
		this.controls.domElement = container;
		this.controls.rollSpeed = Math.PI / 6;
		this.controls.autoForward = false;
		this.controls.dragToLook = false;
        return this.controls;
    }
    
    onWindowResize(){
        this.cameraManager.onWindowResize();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate(){
        requestAnimationFrame(() => this.animate());
        this.time += 0.016;
        
        this.cameraManager.update();
        
        this.renderer.render(
            this.sceneManager.getScene(),
            this.cameraManager.getCamera()
        )
    }
}

const game = new Main();