System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Scene3;
    return {
        setters:[],
        execute: function() {
            // scene3.ts.js
            // plane_tetrahedra_sphere
            exports_1("Scene3", Scene3 = (function () {
                'use strict';
                var scene, axes, light, key, fill, back, loader, onload, progress, onerror, path = './webgl/models/teapot/teapot.json';
                // scene
                scene = new THREE.Scene();
                // coordinate axes 
                axes = new THREE.AxisHelper(3000);
                scene.add(axes);
                // teapot
                loader = new THREE.ObjectLoader(THREE.DefaultLoadingManager);
                onload = (obj) => {
                    scene.add(obj);
                };
                progress = (p) => {
                    console.log(`${100.0 * p.loaded / p.total}% loaded`);
                };
                onerror = (e) => {
                    console.log(`loader.onerror: ${e}`);
                };
                loader.load(path, onload, progress, onerror);
                // lights
                //  light = new THREE.DirectionalLight( 0xffffff );
                //  light.position.set( 1, 1, 1 );
                //  scene.add( light );
                //
                //  light = new THREE.DirectionalLight( 0x002288 );
                //  light.position.set( -1, -1, -1 );
                //  scene.add( light );
                //
                //  light = new THREE.AmbientLight( 0x222222 );
                //  scene.add( light );
                // @config camerasphere lights simulation
                key = new THREE.PointLight('orange', 2.5, 100);
                key.position.set(50, 20, 20);
                scene.add(key);
                fill = new THREE.PointLight('blue', 0.8, 100);
                fill.position.set(-50, -10, 0);
                scene.add(fill);
                back = new THREE.PointLight('white', 2.5, 100);
                back.position.set(-40, -10, -40); // -40, -10, -50
                scene.add(back);
                // return composed scene
                return scene;
            })());
        }
    }
});
