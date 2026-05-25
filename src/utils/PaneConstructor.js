import {Pane} from 'tweakpane';
import * as THREE from 'three';

export class PaneConstructor{
    constructor(scene){
        this.scene = scene;
        this.pane = new Pane();
    }

    createFolder(){
        const f = this.pane.addFolder({
        title: '',
        expanded: false,
        });
        return folder;
    }

    addAllPanels(obj){
        this.addPositionPane(obj), this.createFolder(`${obj.name} position`);
        this.addRotationPane(obj), this.createFolder(`${obj.name} rotation`);
    }

    addPositionPane(obj){
        const geometry = new THREE.ConeGeometry( 5, 20, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const cone = new THREE.Mesh(geometry, material );
        this.scene.add( cone );


        const folder = this.pane.addFolder({
        title: 'Position',
        expanded: false,
        });

        folder.addBinding(cone.position, 'x', { min: -5, max: 5, step: 0.1, label: 'X'});
        folder.addBinding(cone.position, 'y', { min: -5, max: 5, step: 0.1, label: 'Y'});
        folder.addBinding(cone.position, 'z', { min: -5, max: 5, step: 0.1, label: 'Z'});

        // const f = this.pane.addFolder({
        // title: 'Rotation',
        // expanded: false,
        // });

        // f.addBinding(cone.rotation, 'x', { min: -180, max: 180, step: 0.1, label: 'X'});
        // f.addBinding(cone.rotation, 'y', { min: -5, max: 5, step: 0.1, label: 'Y'});
        // f.addBinding(cone.rotation, 'z', { min: -5, max: 5, step: 0.1, label: 'Z'});
    }

    addRotationPane(obj){
        f.addBinding(obj.rotation, 'x', { min: -180, max: 180, step: 0.1, label: 'X'});
        f.addBinding(obj.rotation, 'y', { min: -5, max: 5, step: 0.1, label: 'Y'});
        f.addBinding(obj.rotation, 'z', { min: -5, max: 5, step: 0.1, label: 'Z'});
    }

    addPaneHelper(obj){
        const geometry = new THREE.ConeGeometry( 5, 20, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const cone = new THREE.Mesh(geometry, material );
        this.scene.add( cone );

        this.pane.addBinding(cone.position, 'x', { min: -5, max: 5, step: 0.1, label: 'POS X'});
        this.pane.addBinding(cone.position, 'y', { min: -5, max: 5, step: 0.1, label: 'POS Y'});
        this.pane.addBinding(cone.position, 'z', { min: -5, max: 5, step: 0.1, label: 'POS Z'});


    }
}