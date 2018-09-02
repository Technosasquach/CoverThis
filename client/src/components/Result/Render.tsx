import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

import { books } from "./../../public/second_dump";
import { FrontEndController } from "./../../service/controller";

import "./Render.less";

export default class Render extends React.Component<{frontEnd: FrontEndController},{}> {

    mount: any;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cube: THREE.Mesh;
    raycaster: THREE.Raycaster;
    mouse = new THREE.Vector2();
    INTERSECTED: any;
    frameId: any;
    controls: any; // THREE.TrackballControls;

    componentDidMount() {

        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        //ADD SCENE
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x011627 );
        
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
        this.camera.position.set(35,35,35);

        // LIGHTS
        this.scene.add( new THREE.AmbientLight( 0x222222 ) );
    
        // ADD POINT CLOUD
        const scale = 1.5;
        const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const dimensions = {
            maxD1: 0,
            maxD2: 0,
            maxD3: 0,
            minD1: 0,
            minD2: 0,
            minD3: 0
        }
        books.forEach((val: any) => {
            const material = new THREE.MeshBasicMaterial({ color: catagoryToColour(val.Category) });
            this.cube = new THREE.Mesh(geometry, material);

            this.cube.translateX(val.d1 * scale);
            this.cube.translateY(val.d2 * scale);
            this.cube.translateZ(val.d3 * scale);
            this.scene.add(this.cube);

            dimensions.maxD1 = dimensions.maxD1 < val.d1 ? val.d1 : dimensions.maxD1;
            dimensions.maxD2 = dimensions.maxD2 < val.d2 ? val.d2 : dimensions.maxD2;
            dimensions.maxD3 = dimensions.maxD3 < val.d3 ? val.d3 : dimensions.maxD3;
            dimensions.minD1 = dimensions.minD1 > val.d1 ? val.d1 : dimensions.minD1;
            dimensions.minD2 = dimensions.minD2 > val.d2 ? val.d2 : dimensions.minD2;
            dimensions.minD3 = dimensions.minD3 > val.d3 ? val.d3 : dimensions.minD3;
        });

        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1), 
            new THREE.MeshBasicMaterial({ color: 0xffffff }));
        this.cube.translateX(5);
        this.cube.translateY(3);
        this.cube.translateZ(2);
        this.scene.add(this.cube);

        const axisSpace = 10;
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff
        });
        
        let geometryD1 = new THREE.Geometry();
        geometryD1.vertices.push(
            new THREE.Vector3( dimensions.minD1 * scale  - axisSpace, dimensions.minD2 * scale  - axisSpace, dimensions.minD3 * scale  - axisSpace),
            new THREE.Vector3( dimensions.maxD1 * scale  + axisSpace, dimensions.minD2 * scale  - axisSpace, dimensions.minD3 * scale  - axisSpace),
        );
        let geometryD2 = new THREE.Geometry();
        geometryD2.vertices.push(
            new THREE.Vector3( dimensions.minD1 * scale  - axisSpace, dimensions.minD2 * scale  - axisSpace, dimensions.minD3 * scale  - axisSpace ),
            new THREE.Vector3( dimensions.minD1 * scale  - axisSpace, dimensions.maxD2 * scale  + axisSpace, dimensions.minD3 * scale  - axisSpace ),
        );
        let geometryD3 = new THREE.Geometry();
        geometryD3.vertices.push(
            new THREE.Vector3( dimensions.minD1 * scale  - axisSpace, dimensions.minD2 * scale  - axisSpace, dimensions.minD3 * scale  - axisSpace ),
            new THREE.Vector3( dimensions.minD1 * scale  - axisSpace, dimensions.minD2 * scale  - axisSpace, dimensions.maxD3 * scale  + axisSpace ),
        );
        
        this.scene.add( new THREE.Line( geometryD1, lineMaterial ) );
        this.scene.add( new THREE.Line( geometryD2, lineMaterial ) );
        this.scene.add( new THREE.Line( geometryD3, lineMaterial ) );

        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const size = 10;
        // const scale = 1.5;
        // const center = (size * scale)/2;
        // for(let i = 0; i < size; i++) {
        //     for(let j = 0; j < size; j++) {
        //         for(let k = 0; k < size; k++) {
        //             const material = new THREE.MeshBasicMaterial(
        //                 { color: rgbToHex(i,j,k,size) });
        //             this.cube = new THREE.Mesh(geometry, material);
        //             this.cube.translateX(-center + i * scale);
        //             this.cube.translateY(-center + j * scale);
        //             this.cube.translateZ(-center + k * scale);
        //             this.scene.add(this.cube);
        //         }
        //     }
        // }
        this.raycaster = new THREE.Raycaster();

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        // this.renderer.setClearColor('#000000');
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement)

        // CONTROLS
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.minDistance = 0;
        this.controls.maxDistance = 100;

        // document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        window.addEventListener( 'resize', this.onWindowResize, false );

        this.animate();
    }

    componentWillUnmount(){
        // this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    // onDocumentMouseMove( e: any) {
    //     e.preventDefault();
    //     this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    //     this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    //     // this.mouse.z = 5;
    // }

    animate = () => {
        requestAnimationFrame( this.animate );

        // this.raycaster.setFromCamera( this.mouse, this.camera );
        // let intersects = this.raycaster.intersectObjects( this.scene.children );
        // // for ( var i = 0; i < intersects.length; i++ ) {
        //     this.INTERSECTED = intersects[ 0 ].object;
        //     this.INTERSECTED.material.color.set( 0xff0000 );
        // // }
        // // if ( intersects.length > 0 ) {
        // //     if ( this.INTERSECTED != intersects[ 0 ].object ) {
        // //         if ( this.INTERSECTED ) this.INTERSECTED.material.color.set( this.INTERSECTED.currentHex );
        // //         this.INTERSECTED = intersects[ 0 ].object;
        // //         this.INTERSECTED.currentHex = this.INTERSECTED.material.color;
        // //         this.INTERSECTED.material.color.set( 0xff0000 );
        // //     }
        // // } else {
        // //     if ( this.INTERSECTED ) this.INTERSECTED.material.color.set( this.INTERSECTED.currentHex );
        // //     this.INTERSECTED = null;
        // // }
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }

    render() {
        return (
            <div
                style={{ width: '100vw', height: '100vh' }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }
}

// function componentToHex(c: number, range: number) {
//     let hex = ((255/range) * c).toString(16);
//     hex = hex.length == 1 ? "0" + hex : hex;
//     hex = hex.length == 4 ? hex.substring(0,hex.length-2) : hex;
//     return hex;
// }

// function rgbToHex(r: number, g: number, b: number, range: number) {
//     return "#" + componentToHex(r, range) + componentToHex(g, range) + componentToHex(b, range);
// }

import { catagories, colours } from "./../../public/renderSupport";
function catagoryToColour(cat: string): number {
    for (let i = 0; i < catagories.length; i++ ) {
        if(cat == catagories[i]) {
            return colours[i];
        }
    }
    return 0xffffff;
}