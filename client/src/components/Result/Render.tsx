import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

import "./Render.less";

export default class Render extends React.Component<{},{}> {

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
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000');
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement)
        //ADD SCENE
        this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x222222 );
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
        this.camera.position.set( 0, 0, 30 );

        // LIGHTS
        this.scene.add( new THREE.AmbientLight( 0x222222 ) );
        const light = new THREE.PointLight( 0xffffff, 20, 100 );
        // light.translateX(1);
        // light.translateY(1);
        // light.translateZ(1);
        light.position.copy( this.camera.position );
        this.camera.add( light );

        // CONTROLS
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.minDistance = 0;
        this.controls.maxDistance = 50;
    
        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const size = 10;
        const scale = 1.5;
        const center = (size * scale)/2;
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                for(let k = 0; k < size; k++) {
                    const material = new THREE.MeshBasicMaterial(
                        { color: rgbToHex(i,j,k,size) });
                    this.cube = new THREE.Mesh(geometry, material);
                    this.cube.translateX(-center + i * scale);
                    this.cube.translateY(-center + j * scale);
                    this.cube.translateZ(-center + k * scale);
                    this.scene.add(this.cube);
                }
            }
        }
        this.raycaster = new THREE.Raycaster();
        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
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

    onDocumentMouseMove( event: any) {
        event.preventDefault();
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    animate = () => {
        requestAnimationFrame( this.animate );
        this.controls.update();

        this.raycaster.setFromCamera( this.mouse, this.camera );
        let intersects = this.raycaster.intersectObjects( this.scene.children );
        if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
                if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                this.INTERSECTED = intersects[ 0 ].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex( 0xff0000 );
            }
        } else {
            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
            this.INTERSECTED = null;
        }

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

function componentToHex(c: number, range: number) {
    let hex = ((255/range) * c).toString(16);
    hex = hex.length == 1 ? "0" + hex : hex;
    hex = hex.length == 4 ? hex.substring(0,hex.length-2) : hex;
    return hex;
}

function rgbToHex(r: number, g: number, b: number, range: number) {
    return "#" + componentToHex(r, range) + componentToHex(g, range) + componentToHex(b, range);
}