import * as THREE from 'three';
import {Pane} from 'tweakpane';

export class PaneConstructor{
    constructor(scene){
        this.scene = scene;
        this.pane = new Pane();
    }

    createFolder(name){
        const folder = this.pane.addFolder({
            title: `${name}`,
            expanded: false,
        });
        return folder;
    }

    addAllPanels(obj){
        this.addPositionPane(obj, this.createFolder(`${obj.name} position`));
        this.addRotationPane(obj, this.createFolder(`${obj.name} rotation`));
    }

    addPositionPane(obj, folder){
        folder.addBinding(obj.position, 'x', {min: -5,max: 5, step: 0.1, label: 'X'});
        folder.addBinding(obj.position, 'y', {min: -5,max: 5, step: 0.1, label: 'Y'});
        folder.addBinding(obj.position, 'z', {min: -5,max: 5, step: 0.1, label: 'Z'});
    }

    addRotationPane(obj, folder){
        folder.addBinding(obj.rotation, 'x', {min: -180,max: 180, step: 0.001, label: 'X'});
        folder.addBinding(obj.rotation, 'y', {min: -180,max: 180, step: 0.001, label: 'Y'});
        folder.addBinding(obj.rotation, 'z', {min: -180,max: 180, step: 0.001, label: 'Z'});
    }

}