import * as THREE from 'three';


export class Settings{
    constructor(scene){
        this.scene = scene;
    }

    createAllHelpers(){
        this._createGridHelper();
        this._createAxesHelper();
    }

    createAllMeshes(){
        this._createCubeMesh();
    }

    //> -=-=| Помошники
    _createGridHelper(){
        const gridHelper = new THREE.GridHelper(20, 20, 0x00ffc3, 0x00ffc3);
        gridHelper.position.y = 0;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.5;
        console.log(gridHelper);
        this.scene.add(gridHelper)
    }

    _createAxesHelper(){
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }

    //> -=-=| Компоненты сцены
    _createCubeMesh(){
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.5
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.y = 3;
        mesh.rotation.set(0.2, 0.2, 0.2);
        
        console.log(mesh);
        this.scene.add(mesh);
    }

    _createCustomMesh(){
        
    }
}
