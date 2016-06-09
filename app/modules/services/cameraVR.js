System.register(['@angular/core', '../configs/@config'], function(exports_1, context_1) {
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
    var core_1, _config_1;
    var cvr, CameraVR;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            }],
        execute: function() {
            // reference to singleton instance of CameraVR
            // NOTE: needed since first call by browser after requestAnimationFrame
            // resets the execution context (this) to 'window' and thus fails
            CameraVR = (function () {
                function CameraVR(cfg) {
                    this.count = 0;
                    cvr = this;
                    cvr.config = cfg || {};
                    cvr.actors = {};
                    cvr.billboards = {};
                } //ctor
                // initialize scene - 'place' camera in scene
                CameraVR.prototype.place = function (canvasId, _scenename, _narrative, _scene, _clearColor, _alpha, _fov) {
                    var sphereGeometry, sphereMaterial;
                    // pass in procedural Scene or use declarative i3d-svg scene in index.html
                    cvr.scene = _scene || new THREE.Scene();
                    cvr.scene.name = _scenename || 'noname';
                    console.log("cameraVR.place: cvr.scene.name = " + cvr.scene.name);
                    cvr.addActorToScene(cvr.scene.name, cvr.scene, undefined);
                    cvr.canvasId = canvasId;
                    cvr.canvas = document.getElementById(canvasId);
                    cvr.gl = cvr.canvas.getContext("webgl", { premultipliedAlpha: false });
                    //gl = getWebGLContext(canvas);  // libs/webGL/cuon-utils.js
                    //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    // initialize scene properties
                    // clearColor - default white-transparent
                    //clearColor = _clearColor || 'transparent'; 
                    cvr.clearColor = _clearColor || 0x00000000;
                    cvr.alpha = _alpha || 0.0;
                    // initialize reference to NarrativeController scope - for UI sync
                    cvr.narrative = _narrative;
                    // diagnostics
                    //console.log(`cameraVR.place: cvr.canvasId = ${cvr.canvasId}`);
                    //console.log(`cameraVR.place: cvr.canvas = ${cvr.canvas}`);
                    //console.log(`cameraVR.place: cvr.gl = ${cvr.gl}`);
                    //console.log(`cameraVR.place: cvr.clearColor = ${cvr.clearColor}`);
                    //console.log(`camerayVR.place: cvr.alpha = ${cvr.alpha}`);
                    //console.log(`camerayVR.place: cvr.narrative = ${cvr.narrative}`);
                    // camerasphere
                    sphereGeometry = new THREE.SphereGeometry(50, 20, 20);
                    sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
                    cvr.csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                    // position the sphere
                    cvr.csphere.position.x = 0;
                    cvr.csphere.position.y = 0;
                    cvr.csphere.position.z = 0;
                    // camera
                    cvr.fov = _fov || 90.0;
                    cvr.camera = new THREE.PerspectiveCamera(cvr.fov, window.innerWidth / window.innerHeight, 1, 1000);
                    // default camera.position - could be changed by camera_sphere<br>
                    // camera.position = {x:csph.pos.x, y:csph.pos.y, z:csph.pos.z + 50}
                    cvr.camera.position.x = 0.0;
                    cvr.camera.position.y = 0.0;
                    cvr.camera.position.z = 50.0;
                    // add camera as child of csphere
                    cvr.csphere.add(cvr.camera);
                    cvr.addActorToScene('csphere', cvr.csphere, cvr.scene.name);
                    // add csphere to the scene
                    cvr.scene.add(cvr.csphere);
                    cvr.addActorToScene('camera', cvr.camera, 'csphere');
                    // renderer
                    cvr.renderer = new THREE.WebGLRenderer({ canvas: cvr.canvas, antialias: true, alpha: true });
                    cvr.renderer.setSize('100vw', '100vh');
                    // setClearColor(color, alpha) - use passed params (if given)
                    cvr.renderer.setClearColor(cvr.clearColor, cvr.alpha);
                    cvr.renderer.setSize(window.innerWidth, window.innerHeight);
                    // listen for and handle resize event
                    window.addEventListener('resize', cvr.onWindowResize, false);
                    // keyboard functions
                    window.addEventListener("keyup", function (e) {
                        console.log("keyup: key = " + e.keyCode);
                        switch (e.keyCode) {
                            // ZOOM<br>
                            // a - zoom in          
                            case 65:
                                if (e.altKey) {
                                    // position and point the camera to the center of the scene
                                    cvr.camera.position.x = 0;
                                    cvr.camera.position.y = 0;
                                    cvr.camera.position.z = 50;
                                    cvr.camera.lookAt(cvr.scene.position);
                                }
                                else {
                                    // position and point the camera to the center of the scene
                                    cvr.camera.position.x = -40;
                                    cvr.camera.position.y = 20;
                                    cvr.camera.position.z = 100;
                                    cvr.camera.lookAt(cvr.scene.position);
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    // begin camera coddntrol animation - in sync with GSAP animation
                    // later replace cvr line by TweenMax.ticker line below
                    cvr.animate();
                    //TweenMax.ticker.addEventListener('tick', cvr.render);
                }; //place
                // start rendering cycle
                CameraVR.prototype.animate = function () {
                    // diagnostics
                    if (cvr.count++ < 2) {
                        console.log("\nstart animate: cvr.count === " + cvr.count);
                        console.log("this === " + this);
                        console.log("cvr === " + cvr);
                    }
                    // animation update for directives registering update function via f=id
                    //    if(cvr.scene['animations']){
                    //      for(let f of Object.keys(cvr.scene['animations'])){
                    //        cvr.scene['animations'][f]();
                    //      }
                    //    }
                    requestAnimationFrame(cvr.animate);
                    //requestAnimationFrame(CameraVR.prototype.animate);
                    cvr.render();
                    //CameraVR.prototype.render();
                };
                // render scene using camera<br>
                // possibly orient billboards to face (lookAt) camera
                CameraVR.prototype.render = function () {
                    //    if(cvrbillboardsFace){
                    //      cvr.billboardsTarget.addVectors(csphere.position, camera.position);
                    //      cvr.billboardsTarget.z *= zoom;  // world camera.pos.z follows the radius
                    //                                   // of csphere which corresponds to z*zoom
                    //      Object.keys(cvr.billboards).forEach(function(id){
                    //        cvr.billboards[id].lookAt(cvr.billboardsTarget);
                    //      });
                    //    }
                    //    if(cvr.stats){
                    //      cvr.stats.update();
                    //    }
                    cvr.renderer.render(cvr.scene, cvr.camera);
                };
                // add a passed in actor Object3d to scene - register in actors by id<br>
                // the scene is an Object3d and is the root of the scenegraph tree
                CameraVR.prototype.addActorToScene = function (id, o3d, pid) {
                    console.log("\ncvr.addActorToScene: id = " + id + " o3d = " + o3d + " pid = " + pid);
                    // o3d is scene - not really needed but creates root actor
                    if (o3d === cvr.scene) {
                        cvr.actors[id] = o3d; // add scene as root
                        o3d.name = id;
                        console.log("added scene with id = " + id + " o3d.name = " + o3d.name);
                        return true;
                    }
                    // check duplicate
                    cvr.scene.traverse(function (o) {
                        if (o.name === id) {
                            console.log("actor " + id + " = " + o3d + " is duplicate! did not add!");
                            return false; // exception - duplication - don't add bb to bbs list
                        }
                    });
                    // add new actor to actors list
                    o3d.name = id;
                    if (pid && cvr.actors[pid]) {
                        cvr.actors[pid].add(o3d); // add to parent
                    }
                    else {
                        cvr.scene.add(o3d); // add as root to scene
                    }
                    cvr.actors[id] = o3d;
                    o3d.updateMatrix(); //needed?
                    console.log("added actor " + id + " = " + o3d + " with pid = " + pid + " to scene");
                    return true;
                };
                // remove actor Object3d from the scene
                CameraVR.prototype.removeActorFromScene = function (id) {
                    var node = cvr.actors[id], p;
                    if (node) {
                        if (node.parent) {
                            p = node.parent;
                            p.remove(node);
                        }
                        else {
                            // prev_scene is the container of all webgl actors to be removed
                            cvr.prev_scene.remove(node);
                        }
                        delete cvr.actors[id];
                    }
                };
                CameraVR.prototype.actor = function (id) {
                    return cvr.actors[id] || null;
                };
                CameraVR.prototype.reportActors = function () {
                    return Object.keys(cvr.actors); // ids
                };
                // add a passed in actor/billboard Object3d to the scene
                CameraVR.prototype.addBillboardToScene = function (id, o3d, pid) {
                    // addActor returns true if no webgl duplicate found => can add to bb list
                    if (cvr.addActorToScene(id, o3d, pid)) {
                        cvr.billboards[id] = o3d;
                    }
                };
                // remove actor/billboard Object3d from the scene
                CameraVR.prototype.removeBillboardFromScene = function (id) {
                    if (cvr.billboards[id]) {
                        delete cvr.billboards[id];
                    }
                    cvr.removeActorFromScene(id);
                };
                CameraVR.prototype.billboard = function (id) {
                    return cvr.billboards[id] || null;
                };
                CameraVR.prototype.reportBillboards = function () {
                    return Object.keys(cvr.billboards); // ids
                };
                // remove current scene
                CameraVR.prototype.changeTemplateScene = function (template, _scene) {
                    cvr.prev_scene = cvr.scene; // used to remove scene-actor children
                    cvr.scene = _scene || (new THREE.Scene());
                    cvr.scene.name = template;
                    // setClearColor(color, alpha)
                    cvr.renderer.setClearColor(cvr.clearColor, cvr.alpha);
                    cvr.renderer.setSize(window.innerWidth, window.innerHeight);
                    cvr.renderer.render(cvr.scene, cvr.camera);
                };
                // change camera.aspect on window resize and render w. new projection matrix<br>
                // first two lines commented out to allow viewport resize and aspect ratio
                // distortion to keep constant x and y projections
                CameraVR.prototype.onWindowResize = function () {
                    //camera.aspect = window.innerWidth / window.innerHeight;  
                    //camera.updateProjectionMatrix();
                    cvr.renderer.setSize(window.innerWidth, window.innerHeight);
                    cvr.render();
                };
                ;
                CameraVR = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], CameraVR);
                return CameraVR;
            }());
            exports_1("CameraVR", CameraVR);
        }
    }
});
