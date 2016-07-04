System.register(['@angular/core', '../configs/@config', './mediator', './scenes', './cameras', './transform3d'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, _config_1, mediator_1, scenes_1, cameras_1, transform3d_1;
    var c3d, record_shots, matrixa, matrixb, csphere, camera, fov, near, far, key, fill, back, lighttypes, set_camera, set_light, initializeCamerasphere, report_camera_world, report_camera, examine_matrix, Camera3d;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            },
            function (mediator_1_1) {
                mediator_1 = mediator_1_1;
            },
            function (scenes_1_1) {
                scenes_1 = scenes_1_1;
            },
            function (cameras_1_1) {
                cameras_1 = cameras_1_1;
            },
            function (transform3d_1_1) {
                transform3d_1 = transform3d_1_1;
            }],
        execute: function() {
            // reference to singleton instance of Camera3d
            // NOTE: needed since first call by browser after requestAnimationFrame
            // resets the execution context (this) to 'window' and thus fails
            // faster conditional
            record_shots = false;
            // tmp matrices used in diagnostics transforms and diagnostics
            matrixa = new THREE.Matrix4(), matrixb = new THREE.Matrix4();
            // permanent default csphere, camera and lights
            fov = 90.0, near = 1, far = 1000;
            // init camera
            set_camera = function (cam) {
                c3d.camera = cam['name'] ? c3d.cameras.get(cam['name']) || camera : camera;
                c3d.camera.fov = cam['fov'] || fov;
                c3d.camera.near = cam['near'] || near;
                c3d.camera.far = cam['far'] || far;
                c3d.camera.position.x =
                    (cam['position'] && cam['position'][0] ? cam['position'][0] : 0.0);
                c3d.camera.position.y =
                    (cam['position'] && cam['position'][1] ? cam['position'][1] : 0.0);
                c3d.camera.position.z =
                    (cam['position'] && cam['position'][2] ? cam['position'][2] : 50.0);
            };
            // init lights
            set_light = function (type, light, form) {
                var location;
                console.log("type=" + type + " lighttypes[" + type + "]=" + lighttypes[type] + " form:");
                console.dir(form);
                for (var _i = 0, _a = Object.keys(form); _i < _a.length; _i++) {
                    var p = _a[_i];
                    console.log("p = " + p);
                    if (p === 'position' || p === 'target') {
                        if (p === 'target') {
                            light.target = new Object3D();
                            c3d.scene.add(light.target); // see Spotlight three.js docs
                        }
                        location = (p === 'target' ? light.target.position : light.position);
                        location.x = form[p][0] || 0.0;
                        location.y = form[p][1] || 0.0;
                        location.z = form[p][2] || 0.0;
                        continue;
                    }
                    if ((p === 'type') && (form[p] !== lighttypes[type])) {
                        if (form[p] === 'spotlight') {
                            light = new THREE.SpotLight(0x111111);
                        }
                        else {
                            light = new THREE.PointLight(0x111111);
                        }
                    }
                    else {
                        light[p] = form[p];
                    }
                }
            };
            // init camera apparatus 
            initializeCamerasphere = function (sd) {
                if (sd === void 0) { sd = {}; }
                var csph = sd['camerasphere'] || c3d.config.camerasphere || {}, 
                // 1
                form = csph['form'] || {}, ch = csph['children'] || {}, 
                // 2 - children: camera, key, fill, back - use form objects
                cam = (ch['camera'] || {})['form'] || {}, k = (ch['key'] || {})['form'] || {}, f = (ch['fill'] || {})['form'] || {}, b = (ch['back'] || {})['form'] || {}, cs;
                // csphere - c3d.sphere is not presently necessary but retined for possible
                // future use - as an alternate csphere (as c3d.camera is already used) 
                c3d.csphere = csphere;
                cs = csphere;
                cs.geometry['radius'] = form['radius'] || cs.geometry['radius'] || 50.0;
                cs.material['wireframe'] = form['wireframe'] ||
                    cs.material['wireframe'] || true;
                cs.material['transparent'] = form['transparent'] ||
                    cs.material['transparent'] || true;
                cs.material['opacity'] = form['opacity'] || cs.material['opacity'] || 0.5;
                cs.material['color'].set(form['color'] || cs.material['color'] || "blue");
                // camera
                set_camera(cam);
                // lights
                set_light('key', key, k);
                set_light('fill', fill, f);
                set_light('back', back, b);
                // add csphere to the scene - c3d.scene.name used as id in camera.place
                // when scene was added as root of actors tree/list
                c3d.addActorToScene('csphere', c3d.csphere, c3d.scene.name);
                // add camera as child of csphere
                c3d.addActorToScene('camera', c3d.camera, 'csphere');
                // add lights as children of csphere
                c3d.addActorToScene('key', key, 'csphere');
                c3d.addActorToScene('fill', fill, 'csphere');
                c3d.addActorToScene('back', back, 'csphere');
            };
            // diagnostics utility functions - camera world information
            report_camera_world = function () {
                var cam_wp = new THREE.Vector3(), cam_up = new THREE.Vector3();
                cam_wp.setFromMatrixPosition(c3d.camera.matrixWorld);
                cam_up = c3d.csphere.localToWorld(c3d.camera.up); // destroys local camera.up !
                console.log("camera world position:");
                console.dir(cam_wp);
                console.log("camera world up is:");
                console.dir(cam_up);
            };
            // camera fov, position, rotation, up, and optional matrix information
            report_camera = function (report_matrix) {
                if (report_matrix === void 0) { report_matrix = false; }
                var i;
                console.log("c3d.camera.fov is: " + c3d.camera.fov);
                console.log("c3d.camera.position is: ");
                console.log("x = " + c3d.camera.position.x);
                console.log("y = " + c3d.camera.position.y);
                console.log("z = " + c3d.camera.position.z);
                console.log("c3d.camera.rotation is: ");
                console.log("x = " + c3d.camera.rotation.x);
                console.log("y = " + c3d.camera.rotation.y);
                console.log("z = " + c3d.camera.rotation.z);
                console.log("c3d.camera.rotation._order is: " + c3d.camera.rotation._order);
                console.log("c3d.camera.up is: ");
                console.log("x = " + c3d.camera.up.x);
                console.log("y = " + c3d.camera.up.y);
                console.log("z = " + c3d.camera.up.z);
                if (report_matrix) {
                    console.log("c3d.camera.matrix (in column-order): ");
                    for (i = 0; i < c3d.camera.matrix.elements.length; i++) {
                        console.log("c3d.camera.matrix.e[" + i + "] = " +
                            c3d.camera.matrix.elements[i]);
                    }
                }
            };
            // examine information from o3d.matrix - local matrix unless world=true
            // in which case examines o3d.matrixWorld
            // * NOTE: if o3d has no object parent (i.e is at the root of the scenegraph)
            //   then o3d.matrix === o3d.matrixWorld<br>
            //   This is true for csphere (camerasphere) for example<br>
            // reports:<br>
            //   translation Vector3<br>
            //   rotation    Quaternion<br>
            //   scalar      Vector3
            examine_matrix = function (m) {
                for (var i = 0; i < 16; i++) {
                    console.log("examine_matrix: m[" + i + "] = " + m[i]);
                }
                // component representation - t-ranslation, q-uaternion rotation, s-cale
                var t = new THREE.Vector3();
                var q = new THREE.Quaternion();
                var s = new THREE.Vector3();
                m.decompose(t, q, s);
            };
            Camera3d = (function () {
                function Camera3d(cfg, mediator, scenes, cameras, transform3d) {
                    this.clearColor = 0x000000; // default - can be set by Camera3d.place()
                    this.alpha = 0.0; // default - can be set by Camera3d.place()
                    this.fov = 90.0; // default - can be set by Camera3d.place()
                    this.radius = 50.0; // default camera z-distance set by radius of csphere 
                    this.zoom = 1.0; // zoom - dynamic tracking
                    // by default the camera looks at the csphere center - pan/tilt look away
                    this.pan = 0.0; // pan - dynamic tracking
                    this.tilt = 0.0; // tilt - dynamic tracking
                    // euler
                    this.pitch = 0.0; // examine-pitch (rotation of csphere around x-axis)
                    this.yaw = 0.0; // examine-yaw (rotation of csphere around y-axis)
                    this.roll = 0.0; // roll - dynamic tracking
                    this.actors = {};
                    this.billboards = {};
                    this.billboardsFace = false;
                    this.billboardsTarget = new THREE.Vector3(); // world position of camera
                    this.count = 0;
                    var csph, form, cam, sphereGeometry, sphereMaterial;
                    c3d = this;
                    c3d.config = cfg;
                    record_shots = c3d.config.record_shots; // faster conditional test
                    c3d.mediator = mediator;
                    c3d.scenes = scenes;
                    c3d.cameras = cameras;
                    c3d.transform3d = transform3d;
                    // csphere and camera - brief references for long name-paths
                    csph = c3d.config.camerasphere;
                    form = csph.form;
                    cam = (csph['children'] || {})['camera'] || {};
                    // create csphere and camera
                    sphereGeometry = new THREE.SphereGeometry(form['r'] || 50, 20, 20);
                    sphereMaterial = new THREE.MeshBasicMaterial({
                        color: form['color'] || 'blue',
                        wireframe: form['wireframe'] || true,
                        transparent: form['transparent'] || true,
                        opacity: form['opacity'] || 0.5,
                        visible: form['visible'] || true });
                    sphereMaterial.side = THREE.DoubleSide;
                    csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                    camera = new THREE.PerspectiveCamera(cam['fov'] || 90.0, window.innerWidth / window.innerHeight, cam['near'] || 1.0, cam['far'] || 1000.0);
                    camera.position.set(0.0, 0.0, form['r'] || 50);
                    // create camera lights attached to csphere and their types state set
                    // NOTE:lights will be initialized (including color) in initialize_csphere
                    key = new THREE.SpotLight(0x111111);
                    fill = new THREE.SpotLight(0x111111);
                    back = new THREE.PointLight(0x111111);
                    lighttypes = { key: 'spotlight', fill: 'spotlight', back: 'pointlight' };
                    // init c3d.scene and children
                    c3d.scene = new THREE.Scene(); // initial empty scene - channels guide
                    c3d.addActorToScene(c3d.config.opening_scene, c3d.scene, null);
                    // add csphere - enables ui for csphere
                    c3d.addActorToScene('csphere', csphere, 'opening');
                    // add camera as child of csphere - done importantly in camera3d.place
                    // setting c3d.camera to camera other then camera3d closure 'camera'
                    // allows introduction of entirely new camera - here it is irrelevant
                    c3d.camera = camera;
                    c3d.addActorToScene('camera', c3d.camera, 'csphere');
                    // add lights as children of csphere - enables ui for lights
                    c3d.addActorToScene('key', key, 'csphere');
                    c3d.addActorToScene('fill', fill, 'csphere');
                    c3d.addActorToScene('back', back, 'csphere');
                    // listen for and handle resize event
                    window.addEventListener('resize', c3d.onWindowResize, false);
                    // keyboard functions
                    window.addEventListener("keyup", function (e) {
                        console.log("keyup: key = " + e.keyCode);
                        var a;
                        switch (e.keyCode) {
                            // test-JUMP<br>
                            // 8: jump out from csphere; alt-8: back to default (0,0,50)          
                            case 56:
                                if (e.altKey) {
                                    // position and point the camera to the center of the scene
                                    c3d.camera.position.x = 0;
                                    c3d.camera.position.y = 0;
                                    c3d.camera.position.z = 50;
                                    c3d.camera.lookAt(c3d.scene.position);
                                }
                                else {
                                    // position and point the camera to the center of the scene
                                    c3d.camera.position.x = -40;
                                    c3d.camera.position.y = 20;
                                    c3d.camera.position.z = 100;
                                    c3d.camera.lookAt(c3d.scene.position);
                                }
                                break;
                            // CENTER/HOME - normalize camera and csphere<br>
                            // m - center
                            case 77:
                                a = { d: 3 };
                                if (e.shiftKey) {
                                    c3d.home(a);
                                    //log({t:'camera3d', f:'home', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'home', a: a });
                                    }
                                }
                                else {
                                    c3d.center(a);
                                    //log({t:'camera3d', f:'center', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'center', a: a });
                                    }
                                }
                                break;
                            // LOOKAT<br>
                            // l
                            case 76:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        c3d.billboardsFree();
                                        //log({t:'camera3d', f:'billboardsFree'});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'billboardsFree' });
                                        }
                                    }
                                    else {
                                        c3d.billboardsFaceCamera();
                                        //log({t:'camera3d', f:'billboardsFaceCamera'});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'billboardsFaceCamera' });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        // lookAt origin in absolute coords
                                        c3d.camera.lookAt([0.0, 0.0, 0.0]);
                                        //log({t:'camera3d', f:'lookAt', a:[0.0,0.0,0.0]}); 
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'lookAt', a: [0.0, 0.0, 0.0] });
                                        }
                                    }
                                    else {
                                        // lookAt center of Camerasphere
                                        c3d.lookAtId();
                                        //log({t:'camera3d', f:'lookAt'}); 
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'lookAt' });
                                        }
                                    }
                                }
                                break;
                            // ZOOM<br>
                            // a - zoom in          
                            case 65:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { s: 0.5, d: 3 };
                                        c3d.zoomflyTo(a);
                                        //log({t:'camera3d', f:'zoomflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 0.9, d: 3 };
                                        c3d.zoomflyBy(a);
                                        //log({t:'camera3d', f:'zoomflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { s: 0.5 }; // 90/120
                                        c3d.zoomcutTo(a);
                                        //log({t:'camera3d', f:'zoomcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 0.9 };
                                        c3d.zoomcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'zoomcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // s - zoom out          
                            case 83:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { s: 2.0, d: 3 };
                                        c3d.zoomflyTo(a);
                                        //log({t:'camera3d', f:'zoomflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 1.1111, d: 3 };
                                        c3d.zoomflyBy(a);
                                        //log({t:'camera3d', f:'zoomflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { s: 2.0 };
                                        c3d.zoomcutTo(a);
                                        //log({t:'camera3d', f:'zoomcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { s: 1.1111 };
                                        c3d.zoomcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'zoomcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'zoomcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // ROLL<br>
                            // b - roll neg => ccw         
                            case 66:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: -1.57, d: 3 }; // PI/8
                                        //log({t:'camera3d', f:'rollflyTo', a:a});
                                        c3d.rollflyTo(a);
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -0.3927, d: 3 }; // PI/4 
                                        c3d.rollflyBy(a);
                                        //log({t:'camera3d', f:'rollflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: -1.57 };
                                        c3d.rollcutTo(a);
                                        //log({t:'camera3d', f:'rollcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -0.3927 };
                                        c3d.rollcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'rollcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // n - roll pos => cw         
                            case 78:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: 1.57, d: 3 }; // PI/8
                                        c3d.rollflyTo(a);
                                        //log({t:'camera3d', f:'rollflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollflyTo', a: a });
                                        }
                                    }
                                    else {
                                        c3d.rollflyBy(a);
                                        //log({t:'camera3d', f:'rollflyBy', a:a});
                                        a = { r: 0.3927, d: 3 }; // PI/4 
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: 1.57 };
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollcutTo', a: a });
                                        }
                                        c3d.rollcutTo(a);
                                    }
                                    else {
                                        a = { r: 0.3927 };
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'rollcutBy', a: a });
                                        }
                                        c3d.rollcutBy(a); // 1.0/0.9 = 1.1111
                                    }
                                }
                                break;
                            // PAN/TILT<br>
                            // left arrow - pan (look) left          
                            case 37:
                                if (e.shiftKey) {
                                    a = { r: 0.7854, d: 3 };
                                    c3d.panflyTo(a);
                                    //log({t:'camera3d', f:'panflyTo', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'panflyTo', a: a });
                                    }
                                }
                                else {
                                    a = { r: 0.19635, d: 3 };
                                    c3d.panflyBy(a);
                                    //log({t:'camera3d', f:'panflyBy', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'panflyBy', a: a });
                                    }
                                }
                                break;
                            // right arrow - pan (look) right          
                            case 39:
                                if (e.shiftKey) {
                                    a = { r: -0.7854, d: 3 };
                                    c3d.panflyTo(a);
                                    //log({t:'camera3d', f:'panflyTo', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'panflyTo', a: a });
                                    }
                                }
                                else {
                                    a = { r: -0.19635, d: 3 };
                                    c3d.panflyBy(a);
                                    //log({t:'camera3d', f:'panflyBy', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'panflyBy', a: a });
                                    }
                                }
                                break;
                            // up arrow - tilt (look) up          
                            case 38:
                                if (e.shiftKey) {
                                    a = { r: 0.7854, d: 3 };
                                    c3d.tiltflyTo(a);
                                    //log({t:'camera3d', f:'tiltflyTo', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'tiltflyTo', a: a });
                                    }
                                }
                                else {
                                    a = { r: 0.19635, d: 3 };
                                    c3d.tiltflyBy(a);
                                    //log({t:'camera3d', f:'tiltflyBy', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'tiltflyBy', a: a });
                                    }
                                }
                                break;
                            // down arrow - tilt (look) down          
                            case 40:
                                if (e.shiftKey) {
                                    a = { r: -0.7854, d: 3 };
                                    c3d.tiltflyTo(a);
                                    //log({t:'camera3d', f:'tiltflyTo', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'tiltflyTo', a: a });
                                    }
                                }
                                else {
                                    a = { r: -0.19635, d: 3 };
                                    c3d.tiltflyBy(a);
                                    //log({t:'camera3d', f:'tiltflyBy', a:a});
                                    if (record_shots) {
                                        c3d.mediator.record({ t: 'camera3d', f: 'tiltflyBy', a: a });
                                    }
                                }
                                break;
                            // EXAMINE - longitudinal - 'yaw' - rotate csphere around y-axis<br>  
                            // g => yaw neg => ccw         
                            case 71:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: -1.57, d: 3 }; // PI/8
                                        c3d.yawflyTo(a);
                                        //log({t:'camera3d', f:'yawflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -0.3927, d: 3 }; // PI/4 
                                        c3d.yawflyBy(a);
                                        //log({t:'camera3d', f:'yawflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: -1.57 };
                                        c3d.yawcutTo(a);
                                        //log({t:'camera3d', f:'yawcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -0.3927 };
                                        c3d.yawcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'yawcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // h - yaw pos => cw         
                            case 72:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: 1.57, d: 3 }; // PI/8
                                        c3d.yawflyTo(a);
                                        //log({t:'camera3d', f:'yawflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 0.3927, d: 3 }; // PI/4 
                                        c3d.yawflyBy(a);
                                        //log({t:'camera3d', f:'yawflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: 1.57 };
                                        c3d.yawcutTo(a);
                                        //log({t:'camera3d', f:'yawcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 0.3927 };
                                        c3d.yawcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'yawcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'yawcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // EXAMINE - latitudinal - 'pitch' - rotate csphere around x-axis<br>
                            // j => pitch neg => ccw         
                            case 74:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: -1.57, d: 3 }; // PI/8
                                        c3d.pitchflyTo(a);
                                        //log({t:'camera3d', f:'pitchflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -0.3927, d: 3 }; // PI/4 
                                        c3d.pitchflyBy(a);
                                        //log({t:'camera3d', f:'pitchflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: -1.57 };
                                        c3d.pitchcutTo(a);
                                        //log({t:'camera3d', f:'pitchcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: -0.3927 };
                                        c3d.pitchcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'pitchcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // k - pitch pos => cw          
                            case 75:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { r: 1.57, d: 3 }; // PI/8
                                        c3d.pitchflyTo(a);
                                        //log({t:'camera3d', f:'pitchflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 0.3927, d: 3 }; // PI/4 
                                        c3d.pitchflyBy(a);
                                        //log({t:'camera3d', f:'pitchflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { r: 1.57 };
                                        c3d.pitchcutTo(a);
                                        //log({t:'camera3d', f:'pitchcutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchcutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { r: 0.3927 };
                                        c3d.pitchcutBy(a); // 1.0/0.9 = 1.1111
                                        //log({t:'camera3d', f:'pitchcutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'pitchcutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // DOLLY - translation along axes and more generally<br>
                            // 1 => dollyx+        
                            case 49:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { x: 20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: 20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                } //dollyx+
                                break;
                            // 2 - dollyx-        
                            case 50:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { x: -20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: -20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                } //50-dollyx-
                                break;
                            // 6 => dollyy+        
                            case 54:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { y: 20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: 10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { y: 20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: 10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // 7 - dollyy-        
                            case 55:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { y: -20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: -10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { y: -20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { y: -10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // O => dollyz+        
                            case 79:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { z: 20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { z: 10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { z: 20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { z: 10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // P - dollyz-        
                            case 80:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { z: -20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { z: -10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { z: -20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { z: -10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                }
                                break;
                            // 0 - bezier 'through' curve          
                            // * NOTE: bezier() will always fail e2e-spec test because at each run
                            //   the vertices and control points are chosen by Math.random() so
                            //   one run will never match another.
                            case 48:
                                // uses default dur=10 npoints=6
                                if (e.altKey) {
                                    a = { d: 20, n: 6, z: true };
                                }
                                else {
                                    a = { d: 20, n: 6, z: false };
                                }
                                c3d.bezier(a);
                                //log({t:'camera3d', f:'bezier', a:a});
                                if (record_shots) {
                                    c3d.mediator.record({ t: 'camera3d', f: 'bezier', a: a });
                                }
                                break;
                            default:
                                console.log("key '" + e.keyCode + "' not associated with c3d function");
                        }
                    }); //window.addEventListener(...)
                } //ctor
                Camera3d.prototype.set_narrative = function (narrative) {
                    c3d.narrative = narrative;
                };
                // initialize scene - 'place' camera in scene
                Camera3d.prototype.place = function (i3dscenename, i3dmodel) {
                    var sd = i3dmodel['scene'], // scene-descriptor 'options' object
                    i3dscene; // possible procedural i3d-scene
                    // diagnostics
                    console.dir(i3dmodel);
                    // clear actors and billboards associated with previous scene
                    if (c3d.scene) {
                        console.log("\n\n\n^^^^^^ breaking down c3d.scene " + c3d.scene.name);
                        c3d.actors = {};
                        c3d.billboards = {};
                        console.log("after: c3d.reportActors = " + c3d.reportActors());
                    }
                    // set c3d.scene to procedural 'i3dscene' or to new empty scene
                    if (sd['name']) {
                        console.log("procedural scene name = " + sd['name']);
                        i3dscene = c3d.scenes.get(['i3d', sd['name']]);
                    }
                    c3d.scene = i3dscene || (new THREE.Scene());
                    c3d.scene.name = i3dscenename || 'empty_scene';
                    // add scene as root of actors tree/list
                    console.log("camera3d.place: c3d.scene.name = " + c3d.scene.name);
                    c3d.addActorToScene(c3d.scene.name, c3d.scene, undefined);
                    // set properties of csphere, camera, and lights
                    initializeCamerasphere(sd);
                    report_camera_world();
                    // initialize scene renderer - always full-size and transparent background
                    // NOTE: transparent bg set by alpha:true arg for WebGLRenderer ctor
                    // NOTE: transparent bg => clearColor irrelevant - so use defaults
                    c3d.canvas = document.getElementById(c3d.config.canvas_id);
                    c3d.gl = c3d.canvas.getContext("webgl", { premultipliedAlpha: false });
                    c3d.renderer = new THREE.WebGLRenderer({ canvas: c3d.canvas, antialias: true, alpha: true }); // transparent
                    c3d.renderer.setSize('100vw', '100vh');
                    c3d.renderer.setClearColor(0x000000, 0); // default values
                    c3d.renderer.setSize(window.innerWidth, window.innerHeight);
                    // actors added to new scene
                    console.log("new scene " + c3d.scene.name + " actors = " + c3d.reportActors());
                    report_camera();
                    // begin camera control animation - in sync with GSAP animation
                    // later replace c3d line by TweenMax.ticker line below
                    c3d.animate();
                    //TweenMax.ticker.addEventListener('tick', c3d.render);
                }; //place
                // start rendering cycle
                Camera3d.prototype.animate = function () {
                    // diagnostics
                    if (c3d.count++ < 2) {
                    }
                    // animation update for directives registering update function via f=id
                    //    if(c3d.scene['animations']){
                    //      for(let f of Object.keys(c3d.scene['animations'])){
                    //        c3d.scene['animations'][f]();
                    //      }
                    //    }
                    requestAnimationFrame(c3d.animate);
                    //requestAnimationFrame(Camera3d.prototype.animate);
                    c3d.render();
                };
                // render scene using camera<br>
                // possibly orient billboards to face (lookAt) camera
                Camera3d.prototype.render = function () {
                    //    if(c3d.billboardsFace){
                    //      c3d.billboardsTarget.addVectors(csphere.position, camera.position);
                    //      c3d.billboardsTarget.z *= zoom;  // world camera.pos.z follows the radius
                    //                                   // of csphere which corresponds to z*zoom
                    //      Object.keys(c3d.billboards).forEach(function(id){
                    //        c3d.billboards[id].lookAt(c3d.billboardsTarget);
                    //      });
                    //    }
                    //    if(c3d.stats){
                    //      c3d.stats.update();
                    //    }
                    if (c3d.stats) {
                        c3d.stats.update();
                    }
                    c3d.renderer.render(c3d.scene, c3d.camera);
                };
                // set_stats
                Camera3d.prototype.set_stats = function (stats) {
                    console.log("camera3d.set_stats: stats = " + stats);
                    c3d.stats = stats;
                };
                // camera world pos = csphere.pos + camera.pos is the billboards target
                Camera3d.prototype.billboardsFaceCamera = function () {
                    c3d.billboardsFace = true;
                    // result of narrative.setShot logs abs_url, delta_url and shot
                    // The four values comprise an e2e_spec cell
                    // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
                    // '{"delta') but there is no exact 'delta' to trigger shot-processing
                    c3d.narrative.setShot({ "delta-t": "camera3d", "f": "billboardsFaceCamera" });
                };
                // decouple billboards from possible orientation to actor target
                Camera3d.prototype.billboardsFree = function () {
                    c3d.billboardsFace = false;
                    // result of narrative.setShot logs abs_url, delta_url and shot
                    // The four values comprise an e2e_spec cell
                    // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
                    // '{"delta') but there is no exact 'delta' to trigger shot-processing
                    c3d.narrative.setShot({ "delta-t": "camera3d", "f": "billboardsFree" });
                };
                // pan/tilt camera to point at specific 3d point x,y,z OR array x = [_x,y,z]
                Camera3d.prototype.lookAt = function (x, y, z) {
                    var a;
                    if (Array.isArray(x)) {
                        a = x;
                    }
                    else {
                        a = [x, y, z];
                    }
                    if (c3d.config.unit_test) {
                        return a;
                    }
                    else {
                        c3d.camera.lookAt(new THREE.Vector3(a[0], a[1], a[2]));
                        // result of narrative.setShot logs abs_url, delta_url and shot
                        // The four values comprise an e2e_spec cell
                        // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
                        // '{"delta') but there is no exact 'delta' to trigger shot-processing
                        c3d.narrative.setShot({ "delta-t": "camera3d", "f": "lookAt", "a": a });
                    }
                }; //lookAt(x,y,z)/lookAt([x,y,z])
                // pan/tilt camera to point at specific actor/billboard<br> 
                // no-arg default is to look at center of csphere - camerasphere
                Camera3d.prototype.lookAtId = function (id) {
                    if (id === void 0) { id = 'csphere'; }
                    if (id === 'csphere') {
                        var v = c3d.csphere.position;
                        var a = [v.x, v.y, v.z];
                        if (c3d.config.unit_test) {
                            return a;
                        }
                        else {
                            c3d.camera.lookAt(v);
                            // see above
                            c3d.narrative.setShot({ "delta-t": "camera3d", "f": "lookAt", "a": {} });
                        }
                        return;
                    }
                    // id other than 'csphere' should be present actor
                    if (c3d.actors[id]) {
                        var v = c3d.actors[id].position;
                        if (c3d.config.unit_test) {
                            var a = void 0;
                            if (v) {
                                a = [v.x, v.y, v.z];
                            }
                            return a;
                        }
                        else {
                            if (v) {
                                c3d.camera.lookAt(v);
                                c3d.narrative.setShot({ "delta-t": "camera3d", "f": "lookAt", "a": id });
                            }
                            else {
                                console.log("!Camera3d.lookAt:actors[" + id + "].position is undefined");
                            }
                        }
                    }
                    else {
                        console.log("!Camera3d.lookAt:actors[" + id + "] does not exist");
                    }
                }; //lookAt(id)
                // camera keybd-functions
                // normalize position orientation of csphere and camera - AND zoom
                Camera3d.prototype.home = function (a) {
                    a.d = a.d || 0.0;
                    //shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { 'x': 0.0, 'y': 0.0, 'z': 0.0,
                                                immediateRender: false } }],
                                    'i3d:csphere:position': [{ dur: a.d,
                                            p: { 'x': 0.0, 'y': 0.0, 'z': 0.0,
                                                immediateRender: false } }],
                                    'i3d:csphere:scale': [{ dur: a.d,
                                            p: { 'x': 1.0, 'y': 1.0, 'z': 1.0,
                                                immediateRender: false } }],
                                    'i3d:csphere:rotation': [{ dur: a.d,
                                            p: { 'x': 0.0, 'y': 0.0, 'z': 0.0,
                                                immediateRender: false } }],
                                    'i2d:plane': [{ dur: a.d,
                                            p: { 'x': 0.0, 'y': 0.0, immediateRender: false } }],
                                    'i2d:zoom_plane': [{ dur: a.d, p: { rotation: 0.0,
                                                scale: 1.0, svgOrigin: '0% 0%', immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = 'shot-anim:' + JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                    // camera
                    c3d.camera.position.x = 0.0;
                    c3d.camera.position.y = 0.0;
                    c3d.camera.up.x = 0.0;
                    c3d.camera.up.y = 1.0;
                    c3d.camera.up.z = 0.0;
                    if (c3d.camera.fov !== c3d.fov) {
                        c3d.camera.fov = c3d.fov;
                        c3d.camera.updateProjectionMatrix();
                    }
                    if (c3d.csphere.radius !== c3d.radius) {
                        c3d.csphere.radius = c3d.radius; // radius is default 50 
                    }
                    // dynamic trackers
                    c3d.zoom = 1.0;
                    c3d.roll = 0.0;
                    c3d.pan = 0.0;
                    c3d.tilt = 0.0;
                    c3d.yaw = 0.0;
                    c3d.pitch = 0.0;
                };
                // ZOOM<br>
                // modify csphere.scale 
                // * NOTE: dynamic camera.fov animation updates of three.js 
                // camera.updateProjectionMatrix() find an undefined projectionMatrix!<br>
                // For this reason zoom is not implemented by camera.fov<br>
                // cut - no animation
                Camera3d.prototype.zoomcutTo = function (a) {
                    c3d.zoom = a.s;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:scale': [{ dur: 0,
                                            p: { x: c3d.zoom, y: c3d.zoom, z: c3d.zoom, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = 'shot-anim:' + JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.zoomcutBy = function (a) {
                    c3d.zoom *= a.s;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:scale': [{ dur: 0,
                                            p: { x: c3d.zoom, y: c3d.zoom, z: c3d.zoom, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // fly - animate
                Camera3d.prototype.zoomflyTo = function (a) {
                    c3d.zoom = a.s;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:scale': [{ dur: a.d,
                                            p: { x: c3d.zoom, y: c3d.zoom, z: c3d.zoom, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.zoomflyBy = function (a) {
                    c3d.zoom *= a.s;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:scale': [{ dur: a.d,
                                            p: { x: c3d.zoom, y: c3d.zoom, z: c3d.zoom, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // ROLL<br>
                // modify camera.rotation.z<br> 
                // cut - no animation
                Camera3d.prototype.rollcutTo = function (a) {
                    c3d.roll = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: 0,
                                            p: { z: c3d.roll, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.rollcutBy = function (a) {
                    c3d.roll += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: 0,
                                            p: { z: c3d.roll, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // fly - animate
                Camera3d.prototype.rollflyTo = function (a) {
                    c3d.roll = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { z: c3d.roll, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.rollflyBy = function (a) {
                    c3d.roll += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { z: c3d.roll, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // PAN/TILT<br>
                // modify camera.rotation.y/camera.rotation.x 
                Camera3d.prototype.panflyTo = function (a) {
                    c3d.pan = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { y: c3d.pan, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.panflyBy = function (a) {
                    c3d.pan += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { y: c3d.pan, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.tiltflyTo = function (a) {
                    c3d.tilt = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { x: c3d.tilt, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.tiltflyBy = function (a) {
                    c3d.tilt += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:camera:rotation': [{ dur: a.d,
                                            p: { x: c3d.tilt, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // EXAMINE-YAW<br>
                // longitudinal examination - rotate csphere around y-axis<br> 
                // modify csphere.rotation.y<br>
                // cut - no animation
                Camera3d.prototype.yawcutTo = function (a) {
                    c3d.yaw = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: 0,
                                            p: { y: c3d.yaw, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.yawcutBy = function (a) {
                    c3d.yaw += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: 0,
                                            p: { y: c3d.yaw, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // fly - animate
                Camera3d.prototype.yawflyTo = function (a) {
                    c3d.yaw = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: a.d,
                                            p: { y: c3d.yaw, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.yawflyBy = function (a) {
                    c3d.yaw += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: a.d,
                                            p: { y: c3d.yaw, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // EXAMINE-PITCH<br>
                // lattitudinal examination - rotate csphere around x-axis<br> 
                // modify csphere.rotation.x<br>
                // cut - no animation
                Camera3d.prototype.pitchcutTo = function (a) {
                    c3d.pitch = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: 0,
                                            p: { x: c3d.pitch, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.pitchcutBy = function (a) {
                    c3d.pitch += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: 0,
                                            p: { x: c3d.pitch, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // fly - animate
                Camera3d.prototype.pitchflyTo = function (a) {
                    c3d.pitch = a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: a.d,
                                            p: { x: c3d.pitch, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.pitchflyBy = function (a) {
                    c3d.pitch += a.r;
                    // shot
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:rotation': [{ dur: a.d,
                                            p: { x: c3d.pitch, immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // camera shot implementations
                // DOLLY - camera translation<br>
                // fly - animate (default dur=3.0)
                Camera3d.prototype.dollyflyTo = function (a) {
                    a.d = a.d || 3.0;
                    a.x = a.x || c3d.csphere.position.x;
                    a.y = a.y || c3d.csphere.position.y;
                    a.z = a.z || c3d.csphere.position.z;
                    // shot microstate-change
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:position': [{ dur: a.d,
                                            p: { x: a.x, y: a.y, z: a.z,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    console.log("dollyflyTo: c3d.shot = " + c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.dollyflyBy = function (a) {
                    a.d = a.d || 3.0;
                    a.x = a.x || 0.0;
                    a.y = a.y || 0.0;
                    a.z = a.z || 0.0;
                    a.x = c3d.csphere.position.x + a.x;
                    a.y = c3d.csphere.position.y + a.y;
                    a.z = c3d.csphere.position.z + a.z;
                    // shot microstate-change
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:position': [{ dur: a.d,
                                            p: { x: a.x, y: a.y, z: a.z,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    console.log("dollyflyBy: c3d.shot = " + c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // cut - no animation (dur=0)
                Camera3d.prototype.dollycutTo = function (a) {
                    a.x = a.x || c3d.csphere.position.x;
                    a.y = a.y || c3d.csphere.position.y;
                    a.z = a.z || c3d.csphere.position.z;
                    // shot microstate-change
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:position': [{ dur: 0,
                                            p: { x: a.x, y: a.y, z: a.z,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    console.log("dollycutTo: c3d.shot = " + c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                Camera3d.prototype.dollycutBy = function (a) {
                    a.d = 0.0;
                    a.x = a.x || 0.0;
                    a.y = a.y || 0.0;
                    a.z = a.z || 0.0;
                    a.x = c3d.csphere.position.x + a.x;
                    a.y = c3d.csphere.position.y + a.y;
                    a.z = c3d.csphere.position.z + a.z;
                    // shot microstate-change
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0 },
                                actors: {
                                    'i3d:csphere:position': [{ dur: 0,
                                            p: { x: a.x, y: a.y, z: a.z,
                                                immediateRender: false } }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    console.log("dollycutBy: c3d.shot = " + JSON.stringify(c3d.shot));
                    c3d.narrative.setShot(c3d.shot);
                };
                // random 2d-bezier camera nav<br> 
                // use default 6 points and 'through' bezier curve type
                Camera3d.prototype.bezier = function (a) {
                    if (a === void 0) { a = { d: 20, n: 6, z: true }; }
                    var i, x = [], y = [], z = [], v = [], bezier;
                    // bezier 'through' curve points - z:true => fly in z dimension also
                    if (a.z) {
                        z[0] = 0.0;
                    }
                    x[0] = 0.0;
                    y[0] = 0.0;
                    if (Math.random() > 0.5) {
                        x[1] = 30.0 * Math.random(); // ++
                        y[1] = 30.0 * Math.random();
                        x[2] = -30.0 * Math.random(); // -+
                        y[2] = 30.0 * Math.random();
                        x[3] = -30.0 * Math.random(); // --
                        y[3] = -30.0 * Math.random();
                        x[4] = 30.0 * Math.random(); // +-
                        y[4] = -30.0 * Math.random();
                        if (a.z) {
                            z[1] = -10 * Math.random();
                            z[2] = z[1] - 30 * Math.random();
                            z[3] = z[2] + 30 * Math.random();
                            z[4] = -10 * Math.random();
                        }
                    }
                    else {
                        x[1] = -30.0 * Math.random(); // --
                        y[1] = -30.0 * Math.random();
                        x[2] = -30.0 * Math.random(); // -+
                        y[2] = 30.0 * Math.random();
                        x[3] = 30.0 * Math.random(); // ++
                        y[3] = 30.0 * Math.random();
                        x[4] = 30.0 * Math.random(); // +-
                        y[4] = -30.0 * Math.random();
                        if (a.z) {
                            z[1] = -10 * Math.random();
                            z[2] = z[1] - 30 * Math.random();
                            z[3] = z[2] + 30 * Math.random();
                            z[4] = -10 * Math.random();
                        }
                    }
                    x[5] = 0.0;
                    y[5] = 0.0;
                    if (a.z) {
                        z[5] = 0.0;
                    }
                    // create values array
                    for (i = 0; i < a.n; i++) {
                        if (a.z) {
                            v.push({ x: x[i], y: y[i], z: z[i] });
                        }
                        else {
                            v.push({ x: x[i], y: y[i] });
                        }
                    }
                    bezier = { bezier: { autoRotate: true,
                            curviness: 2,
                            values: v,
                            immediateRender: false } };
                    // shot<br>
                    // y-coords are webgl 
                    c3d.shot = { delta: {
                            timeline: { p: { paused: true, repeat: 0, tweens: [] },
                                actors: {
                                    'i3d:csphere:position': [{ dur: a.d, p: bezier }]
                                }
                            } //tl
                        } //delta
                    }; //shot
                    c3d.shot = JSON.stringify(c3d.shot);
                    c3d.narrative.setShot(c3d.shot);
                };
                // camera change with NO Substate change !!! - for studio usage only!
                // translation on arbitrary axis - transform is relative and cumulative<br>
                // axis is Vector3 - will be normalized if not already
                Camera3d.prototype.translateAxisDistance = function (axis, d) {
                    axis.normalize();
                    c3d.csphere.translateOnAxis(axis, d);
                };
                // camera change with NO Substate change !!! - for studio usage only!
                // rotate the camerasphere csphere by ordered pitch, yaw, roll
                Camera3d.prototype.rotate = function (params) {
                    var pitch = params.pitch || 0.0;
                    var yaw = params.yaw || 0.0;
                    var roll = params.roll || 0.0;
                    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
                    c3d.csphere.applyMatrix(matrixa);
                };
                // camera change with NO Substate change !!! - for studio usage only!
                // rotation around arbitraray axis - transform is relative and cumulative<br>
                // axis is Vector3 - will be normalized if not already
                Camera3d.prototype.rotateAxisAngle = function (x, y, z, angle) {
                    var axis = new THREE.Vector3(x, y, z);
                    axis.normalize();
                    c3d.csphere.rotateOnAxis(axis, angle);
                };
                // camera change with NO Substate change !!! - for studio usage only!
                // relative rotation/scale 
                // * NOTE: params = {pitch:p, yaw:y, roll:r, zoom:scale}
                Camera3d.prototype.relRotateScale = function (params) {
                    //Object.keys(params).forEach(function(p){
                    //});
                    var pitch = params.pitch || 0.0;
                    var yaw = params.yaw || 0.0;
                    var roll = params.roll || 0.0;
                    var scale = params.zoom || 1.0;
                    // rotate-scale-translate (by x/y/z* scale)
                    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
                    matrixa.multiplyScalar(scale); // scale
                    //examine_matrix(matrixa);
                    // apply relative rotation-scale to csphere
                    c3d.csphere.applyMatrix(matrixa);
                    //examine_matrix(csphere.matrix);
                };
                // camera change with NO Substate change !!! - for studio usage only!
                // transform the camerasphere csphere by combination of translation,
                // rotation and zoom
                // * NOTE: params = { tx:x, ty:y, tz:z, pitch:p, yaw:y, roll:r, zoom:z}
                Camera3d.prototype.transform = function (params) {
                    var x = params.tx || 0.0;
                    var y = params.ty || 0.0;
                    var z = params.tz || 0.0;
                    var pitch = params.pitch || 0.0;
                    var yaw = params.yaw || 0.0;
                    var roll = params.roll || 0.0;
                    var scale = params.zoom || 1.0;
                    //Object.keys(params).forEach(function(p){
                    //  console.log(`params[${p}] = ${params[p]}`);
                    //});
                    // examine initial c3d.csphere matrix
                    //examine_matrix(c3d.csphere.matrix);
                    // absolute translation - matrixb
                    matrixb.makeTranslation(x, y, z);
                    //examine_matrix(matrixb);
                    // apply absolute translation to csphere
                    c3d.csphere.applyMatrix(matrixb);
                    //examine_matrix(c3d.csphere.matrix);
                    // rotate-scale-translate (by x/y/z* scale)
                    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
                    matrixa.multiplyScalar(scale); // scale
                    //examine_matrix(matrixa);
                    // apply relative rotation-scale to csphere
                    c3d.csphere.applyMatrix(matrixa);
                    examine_matrix(c3d.csphere.matrix);
                }; //transform - no substate change!
                // add a passed in actor Object3d to scene - register in actors by id<br>
                // the scene is an Object3d and is the root of the scenegraph tree
                Camera3d.prototype.addActorToScene = function (id, o3d, pid) {
                    console.log("\nc3d.addActorToScene: id = " + id + " o3d = " + o3d + " pid = " + pid);
                    // o3d is scene - not really needed but creates canonical root actor
                    if (o3d === c3d.scene) {
                        c3d.actors[id] = o3d; // add scene as root with id i3d-templatename
                        o3d.name = id;
                        console.log("added scene with id = " + id + " o3d.name = " + o3d.name);
                        return true;
                    }
                    // if id is already present, begin replacement by removing the 
                    // corresponding o3d from its parent in the tree, and from the actors list
                    for (var _i = 0, _a = Object.keys(c3d.scene.children); _i < _a.length; _i++) {
                        var name_1 = _a[_i];
                        console.log("c3d.scene contains " + name_1 + " with val = " + c3d.scene[name_1]);
                        if (name_1 === id) {
                            console.log("actor " + id + " === " + name_1 + " is duplicate! did not add!");
                            c3d.removeActorFromScene(id);
                        }
                    }
                    ;
                    // add new actor to parent in tree and to actors list
                    o3d.name = id;
                    if (pid && c3d.actors[pid]) {
                        c3d.actors[pid].add(o3d); // add to parent
                    }
                    else {
                        c3d.scene.add(o3d); // add as root to scene
                    }
                    c3d.actors[id] = o3d; // add node itself
                    o3d.updateMatrix(); //needed?
                    console.log("added actor " + id + " = " + o3d + " with pid = " + pid + " to scene");
                    console.log("c3d.actors[" + id + "] = " + c3d.actors[id]);
                    return true;
                };
                // remove actor Object3d from the scene
                Camera3d.prototype.removeActorFromScene = function (id) {
                    var node = c3d.actors[id], p;
                    if (node) {
                        if (node.parent) {
                            p = node.parent;
                            p.remove(node);
                        }
                        else {
                            c3d.scene.remove(node);
                        }
                        delete c3d.actors[id];
                    }
                };
                Camera3d.prototype.actor = function (id) {
                    return c3d.actors[id] || null;
                };
                Camera3d.prototype.reportActors = function () {
                    console.log('Camera3d.reportActors()!');
                    return Object.keys(c3d.actors); // ids
                };
                // add a passed in actor/billboard Object3d to the scene
                Camera3d.prototype.addBillboardToScene = function (id, o3d, pid) {
                    // addActor returns true if no webgl duplicate found => can add to bb list
                    if (c3d.addActorToScene(id, o3d, pid)) {
                        c3d.billboards[id] = o3d;
                    }
                };
                // remove actor/billboard Object3d from the scene
                Camera3d.prototype.removeBillboardFromScene = function (id) {
                    if (c3d.billboards[id]) {
                        delete c3d.billboards[id];
                    }
                    c3d.removeActorFromScene(id);
                };
                Camera3d.prototype.billboard = function (id) {
                    return c3d.billboards[id] || null;
                };
                Camera3d.prototype.reportBillboards = function () {
                    return Object.keys(c3d.billboards); // ids
                };
                // show/hide actor 
                // exp: a = {name:'csphere', val='on'/'off'}) 
                // OR
                // turn light a.name on-off 
                // exp: a = {name:['key'|'fill'|'back'], val='on'/'off'}}
                Camera3d.prototype.actor_visibility = function (a, from_ui) {
                    if (from_ui === void 0) { from_ui = false; }
                    var actor = c3d.actors[a.name];
                    console.log("c3d.actor_visibility name=" + a.name + " val=" + a.val);
                    console.log("c3d.actor_visibility actor=" + actor + " from_ui=" + from_ui);
                    if (actor) {
                        console.log("c3d.actor_visibility actor.material=" + actor.material);
                        if (actor.material) {
                            console.log("c3d.actor_visibility setting actor.material.visible=" + a.val);
                            actor.material.visible = a.val; // object - exp: csphere
                        }
                        else {
                            console.log("c3d.actor_visibility setting actor.visible=" + a.val);
                            actor.visible = a.val;
                        }
                        // narrative-ui ignores request for change of non-existing control
                        if (from_ui === false) {
                            c3d.narrative.changeControl(a.name, a.val);
                            // result of narrative.setShot logs abs_url, delta_url and shot
                            // The four values comprise an e2e_spec cell
                            // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
                            // '{"delta') but there is no exact 'delta' to trigger shot-processing
                            c3d.narrative.setShot({ "delta-t": "camera3d", "f": "change_control", "a": { "name": a.name, "val": a.val } });
                        }
                    }
                    else {
                        var val = (a.val === true ? 'off' : 'on'); // send back 'undo' state
                        c3d.narrative.changeControl(a.name, val);
                    }
                };
                Camera3d.prototype.light = function (id) {
                    return c3d.actor(id);
                };
                Camera3d.prototype.get_csphere = function () {
                    return c3d.csphere;
                };
                // get webgl rendering context
                Camera3d.prototype.get_gl = function () {
                    return c3d.gl;
                };
                // get scene
                Camera3d.prototype.get_scene = function () {
                    return c3d.scene;
                };
                // change camera.aspect on window resize and render w. new projection matrix<br>
                // first two lines commented out to allow viewport resize and aspect ratio
                // distortion to keep constant x and y projections
                Camera3d.prototype.onWindowResize = function () {
                    //camera.aspect = window.innerWidth / window.innerHeight;  
                    //camera.updateProjectionMatrix();
                    if (c3d.renderer) {
                        c3d.renderer.setSize(window.innerWidth, window.innerHeight);
                        c3d.render();
                    }
                };
                ;
                Camera3d = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, mediator_1.Mediator, scenes_1.Scenes, cameras_1.Cameras, transform3d_1.Transform3d])
                ], Camera3d);
                return Camera3d;
            }());
            exports_1("Camera3d", Camera3d);
        }
    }
});
