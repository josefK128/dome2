System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Scene3;
    return {
        setters:[],
        execute: function() {
            // scene3.ts.js
            exports_1("Scene3", Scene3 = (function () {
                'use strict';
                var scene, axes, lighta, lightd, key, fill, back, loader, onload, progress, onerror, path = './webgl/models/teapot/teapot.json';
                //path = './webgl/models/tiina/tiina.json'; 
                //path = './webgl/models/mammoth/mammoth.json'; 
                //path = './webgl/models/lpsmith/head_scan.json'; 
                // scene
                scene = new THREE.Scene();
                // coordinate axes 
                axes = new THREE.AxisHelper(3000);
                axes.name = 'axes';
                scene.add(axes);
                // teapot
                loader = new THREE.ObjectLoader(THREE.DefaultLoadingManager);
                onload = (obj) => {
                    var matrixt = new THREE.Matrix4(), matrixrs = new THREE.Matrix4();
                    obj.name = 'teapot';
                    // rotate-scale-translate (by x/y/z* scale)
                    matrixrs.makeRotationFromEuler(new THREE.Euler(0.5, 2.5, 0));
                    matrixrs.multiplyScalar(1.0); // scale
                    //examine_matrix(matrixrs);
                    // apply relative rotation-scale to csphere
                    obj.applyMatrix(matrixrs);
                    // absolute translation - matrixb
                    matrixt.makeTranslation(0, 0, 10);
                    //examine_matrix(matrixt);
                    // apply absolute translation to csphere
                    obj.applyMatrix(matrixt);
                    //examine_matrix(obj.matrix);
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
                lightd = new THREE.DirectionalLight(0xaaaaaa);
                lightd.position.set(1, 1, 1);
                lightd.intensity = 0.5;
                scene.add(lightd);
                //
                //  light = new THREE.DirectionalLight( 0x002288 );
                //  light.position.set( -1, -1, -1 );
                //  scene.add( light );
                lighta = new THREE.AmbientLight('rgb(255,165,0)');
                lighta.intensity = 1.0;
                scene.add(lighta);
                // @config camerasphere lights simulation
                //  key = new THREE.PointLight('orange', 2.5, 100);
                //  key.position.set( 50, 20, 20 );
                //  scene.add(key);
                //
                //  fill = new THREE.PointLight('blue', 0.8, 100);
                //  fill.position.set( -50, -10, 0 );
                //  scene.add(fill);
                //
                //  back = new THREE.PointLight('white', 2.5, 100);
                //  back.position.set( -40, -10, -40 );  // -40, -10, -50
                //  scene.add(back);
                return scene;
            })());
        }
    }
});
