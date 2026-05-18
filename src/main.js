import * as THREE from 'three';
import {SceneManager} from "./core/SceneManager.js";
import {CameraManager} from "./core/CameraManager.js";
import {LightManager} from "./core/LightManager.js";
import {Settings} from "./utils/Settings.js";
import {ShipGenerator} from "./utils/ShipGenerator.js";
import {SkySettings} from "./utils/SkySettings.js";
import {ModelLoader} from "./core/ModelLoader.js";


class Main{
    constructor(){
        this.sceneManager = null;
        this.cameraManager = null;
        this.lightManager = null;
        this.settings = null;
        this.renderer = null;
        this.camera = null;

        this.skySettings = null;
        // Для будущего вызова класса делающего корабль
        this.shipGenerator = null;

        this.modelLoader = null;

        this.time = 0;
        this.cube = null;
        this.cylinder;
        this.cone;
    }
    test(scene){
        // // фигура и материал
        // const geometry = new THREE.BoxGeometry(5, 5, 5);
        // const material = new THREE.MeshStandardMaterial({
        //     color : 0xF54927,
        //     roughness : 0.5,
        //     metalness : 0.5
        // });
        
        // //> const.cube
        // this.cube = new THREE.Mesh(geometry, material);
        // this.cube = this.cube;
        // scene.add(this.cube);
        

        const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 12, 32); // radiusTop, radiusBottom, height
        const cylinderMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.5
        });
        
        this.cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this.cylinder.position.set(-2, 3, 0);
        this.cylinder.scale.set(0.1,0.1,0.1);
        scene.add(this.cylinder);


        const coneGeometry = new THREE.ConeGeometry(3, 4, 10); // radiusTop, radiusBottom, height
        const coneMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.5
        });
        
        this.cone = new THREE.Mesh(coneGeometry, coneMaterial);
        this.cone.position.set(2.5, 3, 0);
        this.cone.scale.set(0.3,0.3,0.3);
        scene.add(this.cone);
    }
    init(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        
        this.sceneManager = new SceneManager();
        const scene = this.sceneManager.create();
        
        this.cameraManager = new CameraManager(this.renderer.domElement);
        this.cameraManager.create();
        this.cameraManager.createControls();
        
        this.lightManager = new LightManager(scene);
        this.lightManager.createAll();
        this.test(scene);

        this.settings = new Settings(scene);
        this.settings.createAllHelpers();
        this.settings.createAllMeshes();

        this.skySettings = new SkySettings(scene);
        this.skySettings.createStars();
        //> чтоб генератор знал куда добавлять
        this.shipGenerator = new ShipGenerator(scene);
        this.shipGenerator.createShip('scout');

        this.modelLoader = new ModelLoader(scene);
        this.modelLoader.load();


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