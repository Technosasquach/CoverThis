import * as React from "react";
import * as THREE from "three";
// import { OrbitControls } from "three-orbitcontrols-ts";

import "./Render.less";

export default class Render extends React.Component<{},{}> {

    mount: any;
    container: HTMLDivElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    raycaster: THREE.Raycaster;
    renderer: any;
    mouse = new THREE.Vector2();
    INTERSECTED: any;
    radius = 100;
    theta = 0;
    
    componentDidMount() {
        this.init();
        this.animate();
    }
			
	init() {
        this.container = document.createElement( 'div' );
        document.body.appendChild( this.container );
        var info = document.createElement( 'div' );
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
        this.container.appendChild( info );
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xf0f0f0 );
        const light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 1, 1, 1 ).normalize();
        this.scene.add( light );
        const geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
        for ( var i = 0; i < 2000; i ++ ) {
            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            this.scene.add( object );
        }
        this.raycaster = new THREE.Raycaster();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild( this.renderer.domElement);
        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        //
        window.addEventListener( 'resize', this.onWindowResize, false );
    }
            
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
            
    onDocumentMouseMove( e: any ) {
        e.preventDefault();
        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }
			//
    animate = () => {
        requestAnimationFrame( this.animate );
        
        this.theta += 0.1;
        this.camera.position.x = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        this.camera.position.y = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        this.camera.position.z = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.camera.lookAt( this.scene.position );
        this.camera.updateMatrixWorld(false);
        // find intersections
        this.raycaster.setFromCamera( this.mouse, this.camera );
        var intersects = this.raycaster.intersectObjects( this.scene.children );
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

// function componentToHex(c: number, range: number) {
//     let hex = ((255/range) * c).toString(16);
//     hex = hex.length == 1 ? "0" + hex : hex;
//     hex = hex.length == 4 ? hex.substring(0,hex.length-2) : hex;
//     return hex;
// }

// function rgbToHex(r: number, g: number, b: number, range: number) {
//     return "#" + componentToHex(r, range) + componentToHex(g, range) + componentToHex(b, range);
// }