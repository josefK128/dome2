System.register(['@angular/core', '../configs/@config', './mediator'], function(exports_1, context_1) {
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
    var core_1, _config_1, mediator_1;
    var c3d, Camera3d;
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
            }],
        execute: function() {
            // reference to singleton instance of Camera3d
            // NOTE: needed since first call by browser after requestAnimationFrame
            // resets the execution context (this) to 'window' and thus fails
            Camera3d = (function () {
                function Camera3d(cfg, mediator) {
                    this.count = 0;
                    c3d = this;
                    c3d.config = cfg;
                    c3d.record_shots = c3d.config.record_shots;
                    c3d.mediator = mediator;
                    c3d.actors = {};
                    c3d.billboards = {};
                } //ctor
                // set_stats
                Camera3d.prototype.set_stats = function (stats) {
                    console.log("camera3d.set_stats: stats = " + stats);
                    c3d.stats = stats;
                };
                // initialize scene - 'place' camera in scene
                Camera3d.prototype.place = function (canvasId, _scenename, _narrative, _scene, _clearColor, _alpha, _fov) {
                    var sphereGeometry, sphereMaterial;
                    // pass in procedural Scene or use declarative i3d-svg scene in index.html
                    c3d.scene = _scene || new THREE.Scene();
                    c3d.scene.name = _scenename || 'noname';
                    // save scene as prev_scene used to remove scene-actor children
                    c3d.prev_scene = c3d.scene;
                    console.log("camera3d.place: c3d.scene.name = " + c3d.scene.name);
                    c3d.addActorToScene(c3d.scene.name, c3d.scene, undefined);
                    c3d.canvasId = canvasId;
                    c3d.canvas = document.getElementById(canvasId);
                    c3d.gl = c3d.canvas.getContext("webgl", { premultipliedAlpha: false });
                    //gl = getWebGLContext(canvas);  // libs/webGL/cuon-utils.js
                    //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    // initialize scene properties
                    // clearColor - default white-transparent
                    //clearColor = _clearColor || 'transparent'; 
                    c3d.clearColor = _clearColor || 0x00000000;
                    c3d.alpha = _alpha || 0.0;
                    // initialize reference to NarrativeController scope - for UI sync
                    c3d.narrative = _narrative;
                    // diagnostics
                    //console.log(`camera3d.place: c3d.canvasId = ${c3d.canvasId}`);
                    //console.log(`camera3d.place: c3d.canvas = ${c3d.canvas}`);
                    //console.log(`camera3d.place: c3d.gl = ${c3d.gl}`);
                    //console.log(`camera3d.place: c3d.clearColor = ${c3d.clearColor}`);
                    //console.log(`camerayVR.place: c3d.alpha = ${c3d.alpha}`);
                    //console.log(`camerayVR.place: c3d.narrative = ${c3d.narrative}`);
                    // camerasphere
                    sphereGeometry = new THREE.SphereGeometry(50, 20, 20);
                    sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
                    c3d.csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                    // position the sphere
                    c3d.csphere.position.x = 0;
                    c3d.csphere.position.y = 0;
                    c3d.csphere.position.z = 0;
                    // camera
                    c3d.fov = _fov || 90.0;
                    c3d.camera = new THREE.PerspectiveCamera(c3d.fov, window.innerWidth / window.innerHeight, 1, 1000);
                    // default camera.position - could be changed by camera_sphere<br>
                    // camera.position = {x:csph.pos.x, y:csph.pos.y, z:csph.pos.z + 50}
                    c3d.camera.position.x = 0.0;
                    c3d.camera.position.y = 0.0;
                    c3d.camera.position.z = 50.0;
                    // add camera as child of csphere
                    c3d.csphere.add(c3d.camera);
                    c3d.addActorToScene('csphere', c3d.csphere, c3d.scene.name);
                    // add csphere to the scene
                    c3d.scene.add(c3d.csphere);
                    c3d.addActorToScene('camera', c3d.camera, 'csphere');
                    // renderer
                    c3d.renderer = new THREE.WebGLRenderer({ canvas: c3d.canvas, antialias: true, alpha: true });
                    c3d.renderer.setSize('100vw', '100vh');
                    // setClearColor(color, alpha) - use passed params (if given)
                    c3d.renderer.setClearColor(c3d.clearColor, c3d.alpha);
                    c3d.renderer.setSize(window.innerWidth, window.innerHeight);
                    // listen for and handle resize event
                    window.addEventListener('resize', c3d.onWindowResize, false);
                    // keyboard functions
                    window.addEventListener("keyup", function (e) {
                        console.log("keyup: key = " + e.keyCode);
                        var a;
                        switch (e.keyCode) {
                            // ZOOM<br>
                            // a - zoom in          
                            case 65:
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
                            // DOLLY - translation along axes and more generally<br>
                            // 1 => dollyx+        
                            case 49:
                                if (e.altKey) {
                                    if (e.shiftKey) {
                                        a = { x: 20, d: 3 };
                                        c3d.dollyflyTo(a);
                                        //log({t:'camera3d', f:'dollyflyTo', a:a});
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: 20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: 10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (c3d.record_shots) {
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
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10, d: 3 };
                                        c3d.dollyflyBy(a);
                                        //log({t:'camera3d', f:'dollyflyBy', a:a});
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollyflyBy', a: a });
                                        }
                                    }
                                }
                                else {
                                    if (e.shiftKey) {
                                        a = { x: -20 };
                                        c3d.dollycutTo(a);
                                        //log({t:'camera3d', f:'dollycutTo', a:a});
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutTo', a: a });
                                        }
                                    }
                                    else {
                                        a = { x: -10 };
                                        c3d.dollycutBy(a);
                                        //log({t:'camera3d', f:'dollycutBy', a:a});
                                        if (c3d.record_shots) {
                                            c3d.mediator.record({ t: 'camera3d', f: 'dollycutBy', a: a });
                                        }
                                    }
                                } //50-dollyx-
                                break;
                            default:
                                break;
                        }
                    }); //window.addEventListener(...)
                    // begin camera control animation - in sync with GSAP animation
                    // later replace c3d line by TweenMax.ticker line below
                    c3d.animate();
                    //TweenMax.ticker.addEventListener('tick', c3d.render);
                }; //place
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
                    c3d.narrative.changeShot(c3d.shot);
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
                    c3d.narrative.changeShot(c3d.shot);
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
                    c3d.narrative.changeShot(c3d.shot);
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
                    c3d.narrative.changeShot(c3d.shot);
                };
                // start rendering cycle
                Camera3d.prototype.animate = function () {
                    // diagnostics
                    if (c3d.count++ < 2) {
                        console.log("\nstart animate: c3d.count === " + c3d.count);
                        console.log("this === " + this);
                        console.log("c3d === " + c3d);
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
                    //    if(c3dbillboardsFace){
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
                    if (this.stats) {
                        this.stats.update();
                    }
                    c3d.renderer.render(c3d.scene, c3d.camera);
                };
                // add a passed in actor Object3d to scene - register in actors by id<br>
                // the scene is an Object3d and is the root of the scenegraph tree
                Camera3d.prototype.addActorToScene = function (id, o3d, pid) {
                    console.log("\nc3d.addActorToScene: id = " + id + " o3d = " + o3d + " pid = " + pid);
                    // o3d is scene - not really needed but creates root actor
                    if (o3d === c3d.scene) {
                        c3d.actors[id] = o3d; // add scene as root
                        o3d.name = id;
                        console.log("added scene with id = " + id + " o3d.name = " + o3d.name);
                        return true;
                    }
                    // check duplicate
                    c3d.scene.traverse(function (o) {
                        if (o.name === id) {
                            console.log("actor " + id + " = " + o3d + " is duplicate! did not add!");
                            return false; // exception - duplication - don't add bb to bbs list
                        }
                    });
                    // add new actor to actors list
                    o3d.name = id;
                    if (pid && c3d.actors[pid]) {
                        c3d.actors[pid].add(o3d); // add to parent
                    }
                    else {
                        c3d.scene.add(o3d); // add as root to scene
                    }
                    c3d.actors[id] = o3d;
                    o3d.updateMatrix(); //needed?
                    console.log("added actor " + id + " = " + o3d + " with pid = " + pid + " to scene");
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
                            // prev_scene is the container of all webgl actors to be removed
                            c3d.prev_scene.remove(node);
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
                // remove current scene
                Camera3d.prototype.changeTemplateScene = function (template, _scene) {
                    c3d.prev_scene = c3d.scene; // used to remove scene-actor children
                    c3d.scene = _scene || (new THREE.Scene());
                    c3d.scene.name = template;
                    // setClearColor(color, alpha)
                    c3d.renderer.setClearColor(c3d.clearColor, c3d.alpha);
                    c3d.renderer.setSize(window.innerWidth, window.innerHeight);
                    c3d.renderer.render(c3d.scene, c3d.camera);
                };
                // change camera.aspect on window resize and render w. new projection matrix<br>
                // first two lines commented out to allow viewport resize and aspect ratio
                // distortion to keep constant x and y projections
                Camera3d.prototype.onWindowResize = function () {
                    //camera.aspect = window.innerWidth / window.innerHeight;  
                    //camera.updateProjectionMatrix();
                    c3d.renderer.setSize(window.innerWidth, window.innerHeight);
                    c3d.render();
                };
                ;
                Camera3d = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object, mediator_1.Mediator])
                ], Camera3d);
                return Camera3d;
            }());
            exports_1("Camera3d", Camera3d);
        }
    }
});
