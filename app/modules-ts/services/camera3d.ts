// camera3d.ts 
import {Injectable, Inject} from '@angular/core';
// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// services
import {Mediator} from './mediator';
import {Scenes} from './scenes';
import {Cameras} from './cameras';
import {Transform3d} from './transform3d';


// component (for typing)
import {Narrative} from '../components/narrative';



// reference to singleton instance of Camera3d
// NOTE: needed since first call by browser after requestAnimationFrame
// resets the execution context (this) to 'window' and thus fails
var c3d;



// faster conditional
var record_shots:boolean = false;

// tmp matrices used in diagnostics transforms and diagnostics
var matrixa = new THREE.Matrix4(),
    matrixb = new THREE.Matrix4();

// scene, actors, billboards, timeline (for shot/animations)
var scene:THREE.Scene = new THREE.Scene(),
    actors:Object={},
    billboards:Object={},
    timeline:TimelineMax;

// permanent default csphere, and possibly transient camera and lights
var csphere:THREE.Mesh,
    camera:THREE.Camera,
    key:THREE.Light = new THREE.PointLight(0xffffff),
    fill:THREE.Light = new THREE.PointLight(0xffffff),
    back:THREE.Light = new THREE.PointLight(0xffffff);



// init lights
var set_light = (name:string, _l:Object={}) => {
  var type:string = _l['type'] || 'pointlight';


  console.log(`\n\n %%% set_lights - name = ${name} type = ${type}`);
  console.log('i3dmodel light params:');
  console.dir(_l);
  console.log(`_l['color'] = ${_l['color']}`);


  // create light type (pointlight/spotlight)
  switch(name){
    case 'key':
      if(type === 'spotlight'){
        key = new THREE.SpotLight(_l['color']);
      }else{
        key = new THREE.PointLight(_l['color']);
      }
      for(let p in _l){
        let val = _l[p];
        if((p !== 'type') && (p !== 'position')){
          if(p !== 'color'){
            key[p] = val;
          }
        }else{
          if(p === 'position'){
            key.position.fromArray(val);
          }
        }
      }
      break;
    case 'fill':
      if(type === 'spotlight'){
        fill = new THREE.SpotLight(_l['color']);
      }else{
        fill = new THREE.PointLight(_l['color']);
      }
      for(let p in _l){
        let val = _l[p];
        if((p !== 'type') && (p !== 'position')){
          if(p !== 'color'){
            fill[p] = val;
          }
        }else{
          if(p === 'position'){
            fill.position.fromArray(val);
          }
        }
      }
      break;
    case 'back':
      if(type === 'spotlight'){
        back = new THREE.SpotLight(_l['color']);
      }else{
        back = new THREE.PointLight(_l['color']);
      }
      for(let p in _l){
        let val = _l[p];
        if((p !== 'type') && (p !== 'position')){
          if(p !== 'color'){
            back[p] = val;
          }
        }else{
          if(p === 'position'){
            back.position.fromArray(val);
          }
        }
      }
      break;

    default:
      console.log(`name ${name} is unrecognized`);
  }

  if(name === 'key'){
    console.log(`key.color.r = ${key.color.r}`);
    console.log(`key.color.g = ${key.color.g}`);
    console.log(`key.color.b = ${key.color.b}`);
  }
  if(name === 'fill'){
    console.log(`fill.color.r = ${fill.color.r}`);
    console.log(`fill.color.g = ${fill.color.g}`);
    console.log(`fill.color.b = ${fill.color.b}`);
  }
  if(name === 'back'){
    console.log(`back.color.r = ${back.color.r}`);
    console.log(`back.color.g = ${back.color.g}`);
    console.log(`back.color.b = ${back.color.b}`);
  }
};


// init camera apparatus 
var initializeCamerasphere = function(sd:Object = {}) {
  // c3d.config
  var csph_:Object = c3d.config.camerasphere,     // tmp
      csphere_:Object = csph_['form'],
      children_:Object = csph_['children'],       // tmp
      camera_:Object = children_['camera']['form'],
      key_:Object = children_['key']['form'],
      fill_:Object = children_['fill']['form'],
      back_:Object = children_['back']['form'];
  // sd
  var _csph:Object = sd['camerasphere'] || {},    // tmp    
      _csphere:Object = _csph['form'] || csphere_,
      children:Object = _csph['children'] || {},  // tmp
      _camera:Object = (children['camera'] || {})['form'] || camera_,
      _key:Object = (children['key'] || {})['form'] || key_,
      _fill:Object = (children['fill'] || {})['form'] || fill_,
      _back:Object = (children['back'] || {})['form'] || back_;
  // csphere geometry and material
  var sphereGeometry:THREE.Geometry,
      sphereMaterial:THREE.Material;


  console.log('\n\n %%% initializeCamerasphere - sd:');
  console.log(_key['color']);
  console.log(_fill['color']);
  console.log(_back['color']);
  console.dir(_key);
  console.dir(_fill);
  console.dir(_back);


  // final models are _csphere, _camera, _key, _fill and _back
  // create csphere from config.camerasphere model
  sphereGeometry = new THREE.SphereGeometry(_csphere['radius'] || 50, 20, 20);
  sphereMaterial = new THREE.MeshBasicMaterial({
    color: _csphere['color'] || 'blue',
    wireframe: _csphere['wireframe'] || true,
    transparent: _csphere['transparent'] || true,
    opacity: _csphere['opacity'] || 0.5,
    visible: _csphere['visible'] || true});
  sphereMaterial.side = THREE.DoubleSide; 
  csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);


  // camera
  camera = undefined;
  if(_camera['name'] !== 'default'){
    camera = c3d.cameras.get(_camera['name']);
  }
  camera = camera || new THREE.PerspectiveCamera(_camera['fov'] || 90.0,
                                         window.innerWidth/window.innerHeight,
                                         _camera['near'] || 1.0,
                                         _camera['far'] || 1000.0);
  camera.position.fromArray(_camera['position'] || [0,0,50]);


  // lights
  set_light('key', _key);
  set_light('fill', _fill);
  set_light('back', _back);
};



// diagnostics utility functions - camera world information
var report_camera_world = function(){ 
    var cam_wp = new THREE.Vector3(),
        cam_up = new THREE.Vector3();
 
    cam_wp.setFromMatrixPosition(camera.matrixWorld);
    cam_up = csphere.localToWorld(camera.up); // destroys local camera.up !
    console.log(`camera world position:`);
    console.dir(cam_wp);
    console.log(`camera world up is:`);
    console.dir(cam_up);
};

// camera fov, position, rotation, up, and optional matrix information
var report_camera = function(report_matrix:boolean=false):void {
    var i;
    console.log("camera.fov is: " + camera.fov);
    console.log("camera.position is: ");
    console.log("x = " + camera.position.x);
    console.log("y = " + camera.position.y);
    console.log("z = " + camera.position.z);
    console.log("camera.rotation is: ");
    console.log("x = " + camera.rotation.x);
    console.log("y = " + camera.rotation.y);
    console.log("z = " + camera.rotation.z);
    console.log("camera.rotation._order is: " + camera.rotation._order);
    console.log("camera.up is: ");
    console.log("x = " + camera.up.x);
    console.log("y = " + camera.up.y);
    console.log("z = " + camera.up.z);
    if(report_matrix){
      console.log("camera.matrix (in column-order): ");
      for(i=0; i<camera.matrix.elements.length; i++){
        console.log("camera.matrix.e[" + i + "] = " + 
          camera.matrix.elements[i]);
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
var examine_matrix = function(m){
  for(var i=0; i<16; i++){
    console.log("examine_matrix: m[" + i + "] = " + m[i]);
  }

  // component representation - t-ranslation, q-uaternion rotation, s-cale
  var t = new THREE.Vector3();
  var q = new THREE.Quaternion();
  var s = new THREE.Vector3();
  m.decompose(t,q,s);
};




@Injectable()
export class Camera3d {
  config:Config;
  mediator:Mediator;
  scenes:Scenes;
  cameras:Cameras;
  transform3d:Transform3d;
  narrative:Narrative;
  canvas;
  clearColor:number = 0x000000; // default - can be set by Camera3d.place()
  alpha:number = 0.0;          // default - can be set by Camera3d.place()
  fov:number = 90.0;          // default - can be set by Camera3d.place()
  radius:number = 50.0;      // default camera z-distance set by radius of csphere 
  zoom:number = 1.0;      // zoom - dynamic tracking
  // by default the camera looks at the csphere center - pan/tilt look away
  pan:number = 0.0;       // pan - dynamic tracking
  tilt:number = 0.0;      // tilt - dynamic tracking
  // euler
  pitch:number = 0.0;     // examine-pitch (rotation of csphere around x-axis)
  yaw:number = 0.0;       // examine-yaw (rotation of csphere around y-axis)
  roll:number = 0.0;      // roll - dynamic tracking
  renderer;
  billboardsFace:boolean = false;
  billboardsTarget = new THREE.Vector3(); // world position of camera
  gl;
  stats;
  count:number = 0;
  record:boolean;
  shot:Object;


  constructor(@Inject(CONFIG) cfg:Config, 
              mediator:Mediator,
              scenes:Scenes,
              cameras:Cameras,
              transform3d:Transform3d){ 

    console.log('\n\n\n^^^^^^^^^^^^^ Camera3d constructor !!!!');
    c3d = this;
    c3d.config = cfg;
    record_shots = c3d.config.record_shots; // faster conditional test
    c3d.mediator = mediator;
    c3d.scenes = scenes;
    c3d.cameras = cameras;
    c3d.transform3d = transform3d;


    // init scene and children
    scene = new THREE.Scene();  // initial  i3d scene - later, channels guide?
    console.log(`opening scene is ${c3d.config.opening_scene}`);
    c3d.addActorToScene(c3d.config.opening_scene, scene, null);

    // initialize csphere, camera, key, fill and back
    // no arg => use as model c3d.config.camerasphere
    // results are written to closure vars csphere, camera, key, fill and back
    initializeCamerasphere();

    // add csphere - enables ui for csphere
    c3d.addActorToScene('csphere', csphere, c3d.config.opening_scene);
    console.log('added csphere');

    // add camera as child of csphere - done importantly in camera3d.place
    c3d.addActorToScene('camera', camera, 'csphere');
    console.log('added camera');

    // add lights as children of csphere - enables ui for lights
    console.log(`key = ${key}`);
    console.dir(key);
    c3d.addActorToScene('key', key, 'csphere');
    console.log('added key');
    c3d.addActorToScene('fill', fill, 'csphere');
    console.log('added fill');
    c3d.addActorToScene('back', back, 'csphere');
    console.log('added back');



    // listen for and handle resize event
    window.addEventListener( 'resize', c3d.onWindowResize, false );
   
    // keyboard functions
    window.addEventListener("keyup", function(e){
      console.log(`keyup: key = ${e.keyCode}`);
      var a:Object;

      switch(e.keyCode){
        // test-JUMP<br>
        // 8: jump out from csphere; alt-8: back to default (0,0,50)          
        case 56:
         if(e.altKey){     // alt => billboards
            // position and point the camera to the center of the scene
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 50;
            camera.lookAt(scene.position);
          }else{
            // position and point the camera to the center of the scene
            camera.position.x = -40;
            camera.position.y = 20;
            camera.position.z = 100;
            camera.lookAt(scene.position);
          }
          break;


        // CENTER/HOME - normalize camera and csphere<br>
        // m - center
        case 77: 
          a = {d:3};
          if(e.shiftKey){ // sh => home
            c3d.home(a);  
           //log({t:'camera3d', f:'home', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'home', a:a});
            }
          }else{          // no-sh => center - no change to zoom
            c3d.center(a);
           //log({t:'camera3d', f:'center', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'center', a:a});
            }
          }
          break;


        // LOOKAT<br>
        // l
        case 76:
          if(e.altKey){     // alt => billboards
            if(e.shiftKey){ // free bbs
              c3d.billboardsFree();    
             //log({t:'camera3d', f:'billboardsFree'});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'billboardsFree'});
              }
            }else{          // alt-l bbs lookAt camera
              c3d.billboardsFaceCamera();
             console.log('\n\n\n BILLBOARDS FACE CAMERA \n\n\n');
             //log({t:'camera3d', f:'billboardsFaceCamera'});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'billboardsFaceCamera'});
              }
            }
          }else{            // l => camera
            if(e.shiftKey){
              // lookAt origin in absolute coords
              camera.lookAt([0.0, 0.0, 0.0]);
             //log({t:'camera3d', f:'lookAt', a:[0.0,0.0,0.0]}); 
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'lookAt', a:[0.0,0.0,0.0]}); 
              }
            }else{
              // lookAt center of Camerasphere
              c3d.lookAtId();    
             //log({t:'camera3d', f:'lookAt'}); 
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'lookAt'}); 
              }
            }
          }
          break;


        // ZOOM<br>
        // a - zoom in          
        case 65: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
             a = {s:0.5, d:3};
              c3d.zoomflyTo(a);  
             //log({t:'camera3d', f:'zoomflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {s:0.9, d:3};
              c3d.zoomflyBy(a);
             //log({t:'camera3d', f:'zoomflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {s:0.5};  // 90/120
              c3d.zoomcutTo(a);
             //log({t:'camera3d', f:'zoomcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomcutTo', a:a});
              }
            }else{         
              a = {s:0.9};
              c3d.zoomcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'zoomcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomcutBy', a:a});
              }
            }
          }
          break;

        // s - zoom out          
        case 83: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {s:2.0, d:3};
              c3d.zoomflyTo(a);  
             //log({t:'camera3d', f:'zoomflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {s:1.1111, d:3};
              c3d.zoomflyBy(a);
             //log({t:'camera3d', f:'zoomflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {s:2.0};
              c3d.zoomcutTo(a);
             //log({t:'camera3d', f:'zoomcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomcutTo', a:a});
              }
            }else{         
              a = {s:1.1111};
              c3d.zoomcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'zoomcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'zoomcutBy', a:a});
              }
            }
          }
          break;


        // ROLL<br>
        // b - roll neg => ccw         
        case 66: 
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:-1.57, d:3};  // PI/8
             //log({t:'camera3d', f:'rollflyTo', a:a});
              c3d.rollflyTo(a);  
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:-0.3927, d:3}; // PI/4 
              c3d.rollflyBy(a);
             //log({t:'camera3d', f:'rollflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:-1.57};  
              c3d.rollcutTo(a);
             //log({t:'camera3d', f:'rollcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollcutTo', a:a});
              }
            }else{         
              a = {r:-0.3927};
              c3d.rollcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'rollcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollcutBy', a:a});
              }
            }
          }
          break;

        // n - roll pos => cw         
        case 78:
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
             a = {r:1.57, d:3};  // PI/8
              c3d.rollflyTo(a);  
             //log({t:'camera3d', f:'rollflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              c3d.rollflyBy(a);
             //log({t:'camera3d', f:'rollflyBy', a:a});
              a = {r:0.3927, d:3}; // PI/4 
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:1.57};  
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollcutTo', a:a});
              }
              c3d.rollcutTo(a);
            }else{         
              a = {r:0.3927};
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'rollcutBy', a:a});
              }
              c3d.rollcutBy(a); // 1.0/0.9 = 1.1111
            }
          }
          break;

        
        // PAN/TILT<br>
        // left arrow - pan (look) left          
        case 37: 
          if(e.shiftKey){ // sh => abs transform ('to')
            a = {r:0.7854, d:3};
            c3d.panflyTo(a);  
           //log({t:'camera3d', f:'panflyTo', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'panflyTo', a:a});
            }
          }else{          // no-sh => rel transform ('by')
            a = {r:0.19635, d:3};
            c3d.panflyBy(a);
           //log({t:'camera3d', f:'panflyBy', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'panflyBy', a:a});
            }
          }
          break;

        // right arrow - pan (look) right          
        case 39: 
          if(e.shiftKey){ // sh => abs transform ('to')
            a = {r:-0.7854, d:3};
            c3d.panflyTo(a);  
           //log({t:'camera3d', f:'panflyTo', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'panflyTo', a:a});
            }
          }else{          // no-sh => rel transform ('by')
            a = {r:-0.19635, d:3};
            c3d.panflyBy(a);
           //log({t:'camera3d', f:'panflyBy', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'panflyBy', a:a});
            }
          }
          break;

        // up arrow - tilt (look) up          
        case 38: 
          if(e.shiftKey){ // sh => abs transform ('to')
            a = {r:0.7854, d:3};
            c3d.tiltflyTo(a);  
           //log({t:'camera3d', f:'tiltflyTo', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'tiltflyTo', a:a});
            }
          }else{          // no-sh => rel transform ('by')
            a = {r:0.19635, d:3};
            c3d.tiltflyBy(a);
           //log({t:'camera3d', f:'tiltflyBy', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'tiltflyBy', a:a});
            }
          }
          break;

        // down arrow - tilt (look) down          
        case 40: 
          if(e.shiftKey){ // sh => abs transform ('to')
            a = {r:-0.7854, d:3};
            c3d.tiltflyTo(a);  
           //log({t:'camera3d', f:'tiltflyTo', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'tiltflyTo', a:a});
            }
          }else{          // no-sh => rel transform ('by')
            a = {r:-0.19635, d:3};
            c3d.tiltflyBy(a);
           //log({t:'camera3d', f:'tiltflyBy', a:a});
            if(record_shots){
              c3d.mediator.record({t:'camera3d', f:'tiltflyBy', a:a});
            }
          }
          break;



        // EXAMINE - longitudinal - 'yaw' - rotate csphere around y-axis<br>  
        // g => yaw neg => ccw         
        case 71:    
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:-1.57, d:3};  // PI/8
              c3d.yawflyTo(a);  
             //log({t:'camera3d', f:'yawflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:-0.3927, d:3}; // PI/4 
              c3d.yawflyBy(a);
             //log({t:'camera3d', f:'yawflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:-1.57};  
              c3d.yawcutTo(a);
             //log({t:'camera3d', f:'yawcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawcutTo', a:a});
              }
            }else{         
              a = {r:-0.3927};
              c3d.yawcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'yawcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawcutBy', a:a});
              }
            }
          }
          break;

        // h - yaw pos => cw         
        case 72:  
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:1.57, d:3};  // PI/8
              c3d.yawflyTo(a);  
             //log({t:'camera3d', f:'yawflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:0.3927, d:3}; // PI/4 
              c3d.yawflyBy(a);
             //log({t:'camera3d', f:'yawflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:1.57};  
              c3d.yawcutTo(a);
             //log({t:'camera3d', f:'yawcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawcutTo', a:a});
              }
            }else{         
              a = {r:0.3927};
              c3d.yawcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'yawcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'yawcutBy', a:a});
              }
            }
          }
          break;


        // EXAMINE - latitudinal - 'pitch' - rotate csphere around x-axis<br>
        // j => pitch neg => ccw         
        case 74:   
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
             a = {r:-1.57, d:3};  // PI/8
              c3d.pitchflyTo(a);  
             //log({t:'camera3d', f:'pitchflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:-0.3927, d:3}; // PI/4 
              c3d.pitchflyBy(a);
             //log({t:'camera3d', f:'pitchflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:-1.57};  
              c3d.pitchcutTo(a);
             //log({t:'camera3d', f:'pitchcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchcutTo', a:a});
              }
            }else{         
              a = {r:-0.3927};
              c3d.pitchcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'pitchcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchcutBy', a:a});
              }
            }
          }
          break;

        // k - pitch pos => cw          
        case 75:  
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:1.57, d:3};  // PI/8
              c3d.pitchflyTo(a);  
             //log({t:'camera3d', f:'pitchflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:0.3927, d:3}; // PI/4 
              c3d.pitchflyBy(a);
             //log({t:'camera3d', f:'pitchflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {r:1.57};  
              c3d.pitchcutTo(a);
             //log({t:'camera3d', f:'pitchcutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchcutTo', a:a});
              }
            }else{         
              a = {r:0.3927};
              c3d.pitchcutBy(a); // 1.0/0.9 = 1.1111
             //log({t:'camera3d', f:'pitchcutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'pitchcutBy', a:a});
              }
            }
          }
          break;

     
        // DOLLY - translation along axes and more generally<br>
        // 1 => dollyx+        
        case 49:    
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {x:20, d:3};  
              c3d.dollyflyTo(a);  
              //log({t:'camera3d', f:'dollyflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {x:10, d:3};  
              c3d.dollyflyBy(a);
              //log({t:'camera3d', f:'dollyflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {x:20};  
              c3d.dollycutTo(a);
              //log({t:'camera3d', f:'dollycutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutTo', a:a});
              }
            }else{         
              a = {x:10};
              c3d.dollycutBy(a); 
              //log({t:'camera3d', f:'dollycutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutBy', a:a});
              }
            }
          }//dollyx+
          break;

        // 2 - dollyx-        
        case 50:  
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {x:-20, d:3};  
              c3d.dollyflyTo(a);  
              //log({t:'camera3d', f:'dollyflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {x:-10, d:3};  
              c3d.dollyflyBy(a);
              //log({t:'camera3d', f:'dollyflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {x:-20};  
              c3d.dollycutTo(a);
              //log({t:'camera3d', f:'dollycutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutTo', a:a});
              }
            }else{         
              a = {x:-10};
              c3d.dollycutBy(a); 
              //log({t:'camera3d', f:'dollycutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutBy', a:a});
              }
            }
          }//50-dollyx-
          break;

        // 6 => dollyy+        
        case 54:    
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {y:20, d:3};  
              c3d.dollyflyTo(a);  
             //log({t:'camera3d', f:'dollyflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {y:10, d:3};  
              c3d.dollyflyBy(a);
             //log({t:'camera3d', f:'dollyflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {y:20};  
              c3d.dollycutTo(a);
             //log({t:'camera3d', f:'dollycutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutTo', a:a});
              }
            }else{         
              a = {y:10};
              c3d.dollycutBy(a); 
             //log({t:'camera3d', f:'dollycutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutBy', a:a});
              }
            }
          }
          break;

        // 7 - dollyy-        
        case 55:  
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {y:-20, d:3};  
              c3d.dollyflyTo(a);  
             //log({t:'camera3d', f:'dollyflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {y:-10, d:3};  
              c3d.dollyflyBy(a);
             //log({t:'camera3d', f:'dollyflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {y:-20};  
              c3d.dollycutTo(a);
             //log({t:'camera3d', f:'dollycutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutTo', a:a});
              }
            }else{         
              a = {y:-10};
              c3d.dollycutBy(a); 
             //log({t:'camera3d', f:'dollycutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutBy', a:a});
              }
            }
          }
          break;

        // O => dollyz+        
        case 79:    
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {z:20, d:3};  
              c3d.dollyflyTo(a);  
             //log({t:'camera3d', f:'dollyflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {z:10, d:3};  
              c3d.dollyflyBy(a);
             //log({t:'camera3d', f:'dollyflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {z:20};  
              c3d.dollycutTo(a);
             //log({t:'camera3d', f:'dollycutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutTo', a:a});
              }
            }else{         
              a = {z:10};
              c3d.dollycutBy(a); 
             //log({t:'camera3d', f:'dollycutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutBy', a:a});
              }
            }
          }
          break;

        // P - dollyz-        
        case 80:  
          if(e.altKey){     // alt => fly
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {z:-20, d:3};  
              c3d.dollyflyTo(a);  
             //log({t:'camera3d', f:'dollyflyTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {z:-10, d:3};  
              c3d.dollyflyBy(a);
             //log({t:'camera3d', f:'dollyflyBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
              }
            }
          }else{            // no-alt => cut
            if(e.shiftKey){ // shift  => 'to'
              a = {z:-20};  
              c3d.dollycutTo(a);
             //log({t:'camera3d', f:'dollycutTo', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutTo', a:a});
              }
            }else{         
              a = {z:-10};
              c3d.dollycutBy(a); 
             //log({t:'camera3d', f:'dollycutBy', a:a});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'dollycutBy', a:a});
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
          if(e.altKey){     // alt => z fly path also
            a = {d:20, n:6, z:true};
          }else{
            a = {d:20, n:6, z:false};
          }
          c3d.bezier(a); 
         //log({t:'camera3d', f:'bezier', a:a});
          if(record_shots){
            c3d.mediator.record({t:'camera3d', f:'bezier', a:a});
          }
          break;

        default:
          console.log(`key '${e.keyCode}' not associated with c3d function`);
      }
    });//window.addEventListener(...)
  }//ctor



  set_narrative(narrative){
    c3d.narrative = narrative;
  }

  set_timeline(tl:TimelineMax){
    timeline = tl;
  }



  // initialize scene - 'place' camera in scene
  place(i3dtemplatename:string, i3dmodel:Object):void {
    var sd = i3dmodel['scene'],  // scene-descriptor 'options' object
        i3dscene:THREE.Scene;   // possible procedural i3d-scene


    // diagnostics
    console.dir(i3dmodel);

    // clear actors and billboards associated with previous scene
    // turn off animation and seek to time=0
    if(scene){
      console.log(`\n\n\n^^^^^^ breaking down scene ${scene.name}`); 
      actors = {};
      billboards = {};
      console.log(`after cleaning: c3d.reportActors = ${c3d.reportActors()}`);
      if(timeline !== undefined){
        console.log(`before pause(0) timeline.pause = ${timeline.pause}`);
        timeline.pause(0);
        console.log(`after pause(0) timeline paused = ${timeline.paused()}`);
      }else{
        console.log(`before pause(0) timeline is UNDEFINED!!`);
      }
      csphere.material.visible = false;
      c3d.removeActorFromScene('csphere');
      c3d.removeActorFromScene(scene.name);
    }
              
    // set scene to procedural 'i3dscene' or to new empty scene
    if(sd['name']){              
      console.log(`procedural scene name = ${sd['name']}`);
      i3dscene = c3d.scenes.get(['i3d', sd['name']]);
    }
    scene = i3dscene || (new THREE.Scene());
    scene.name = i3dtemplatename || 'empty_scene';

    // add scene as root of actors tree/list
    console.log(`camera3d.place: scene.name = ${scene.name}`);
    c3d.addActorToScene(scene.name, scene, undefined);
    scene.children.forEach((c) => {
      console.log(`child of ${scene['name']} is ${c.name}`);
    });
    console.log(`new scene ${scene.name} actors = ${c3d.reportActors()}`);

    // initialize csphere, camera, and lights using model sd
    initializeCamerasphere(sd);
    report_camera_world();

    // add camera apparatus to scene and register individual parts as actors
    // add csphere as child of scene
    c3d.addActorToScene('csphere', csphere, scene);

    // add camera as child of csphere 
    c3d.addActorToScene('camera', camera, 'csphere');

    // add lights as children of csphere 
    c3d.addActorToScene('key', key, 'csphere');
    c3d.addActorToScene('fill', fill, 'csphere');
    c3d.addActorToScene('back', back, 'csphere');


    // initialize the visibility of csphere and lights when init_scene=true
    // In that case changeState is being called to create a new scene 
    // (not fwd-back) 
    // initialize the '3d-ui' (csphere,key,fill,back) according to 
    // i3dmodel['scene']['visible'] 'on'/'off' settings
    // i.e. set csphere & lights and their ui-controls 'on' or 'off'
    // according to i3dmodel.scene.visible['csphere'] etc.
    // NOTE: narrative.changeControl will set light.visible or 
    // csphere.material.visible
    for(let c of Object.keys(i3dmodel['scene']['visible'])){
      console.log(`${c} visible = ${i3dmodel['scene']['visible'][c]}`);
      c3d.narrative.changeControl(c, sd['visible'][c]);
    }

    // initialize scene renderer - always full-size and transparent background
    // NOTE: transparent bg set by alpha:true arg for WebGLRenderer ctor
    // NOTE: transparent bg => clearColor irrelevant - so use defaults
    c3d.canvas = document.getElementById(c3d.config.canvas_id);
    c3d.gl = c3d.canvas.getContext("webgl", {premultipliedAlpha: false});
    c3d.renderer = new THREE.WebGLRenderer({canvas: c3d.canvas, antialias: true, alpha: true}); // transparent
    c3d.renderer.setSize('100vw', '100vh');
    c3d.renderer.setClearColor(0x000000, 0); // default values
    c3d.renderer.setSize( window.innerWidth, window.innerHeight );


    // actors added to new scene
    console.log(`new scene ${scene.name} actors = ${c3d.reportActors()}`);
    report_camera();

    // begin camera control animation - in sync with GSAP animation
    // later add TweenMax.ticker line below before c3d.animate
    TweenMax.ticker.addEventListener('tick', c3d.render);
    setTimeout(() => {
      c3d.animate();
    },500);
  }//place


  // start rendering cycle
  animate() {
    // diagnostics
    //if(c3d.count++ < 2){
      //console.log(`\nstart animate: c3d.count === ${c3d.count}`);
      //console.log(`this === ${this}`);
      //console.log(`c3d === ${c3d}`);
    //}

    // animation update for directives registering update function via f=id
//    if(scene['animations']){
//      for(let f of Object.keys(scene['animations'])){
//        scene['animations'][f]();
//      }
//    }
    requestAnimationFrame(c3d.animate);
    //requestAnimationFrame(Camera3d.prototype.animate);

    c3d.render();
  }


  // render scene using camera<br>
  // possibly orient billboards to face (lookAt) camera
  render() {
    // diagnostics - billboards lookAt camera
//    if(c3d.count++%1000 === 0){
//      console.log(`\nbillboardsFace = ${c3d.billboardsFace}`);
//      console.log(`billboardsTarget.x = ${c3d.billboardsTarget.x}`);
//      console.log(`billboardsTarget.y = ${c3d.billboardsTarget.y}`);
//      console.log(`billboardsTarget.z = ${c3d.billboardsTarget.z}`);
//      Object.keys(billboards).forEach(function(id){
//        console.log(`bb[${id}] = ${billboards[id]}`);
//        console.log(`bb[${id}].rotation.x = ${billboards[id].rotation.x}`);
//        console.log(`bb[${id}].rotation.y = ${billboards[id].rotation.y}`);
//        console.log(`bb[${id}].rotation.z = ${billboards[id].rotation.z}`);
//      });
//    }

    if(c3d.billboardsFace){
      camera.updateMatrixWorld();
      camera.getWorldPosition(c3d.billboardsTarget); //wr cam.wpos to bbTarget
      Object.keys(billboards).forEach(function(id){
        billboards[id].lookAt(c3d.billboardsTarget);
      });
    }
    if(c3d.stats){
      c3d.stats.update();
    }
    c3d.renderer.render( scene, camera );
  }

  // set_stats
  set_stats(stats){
    console.log(`camera3d.set_stats: stats = ${stats}`);
    c3d.stats = stats;
  }


  // camera world pos = csphere.pos + camera.pos is the billboards target
  billboardsFaceCamera(){
    c3d.billboardsFace = true;
    // result of narrative.setShot logs abs_url, delta_url and shot
    // The four values comprise an e2e_spec cell
    // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
    // '{"delta') but there is no exact 'delta' to trigger shot-processing
    c3d.narrative.setShot({"delta-t":"camera3d", "f":"billboardsFaceCamera"});
  }

  // decouple billboards from possible orientation to actor target
  billboardsFree(){
    c3d.billboardsFace = false;
    // result of narrative.setShot logs abs_url, delta_url and shot
    // The four values comprise an e2e_spec cell
    // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
    // '{"delta') but there is no exact 'delta' to trigger shot-processing
    c3d.narrative.setShot({"delta-t":"camera3d", "f":"billboardsFree"});
  }


  // pan/tilt camera to point at specific 3d point x,y,z OR array x = [_x,y,z]
  lookAt(x, y, z){
    let a:number[];
    if(Array.isArray(x)){
      a = x;
    }else{
      a = [x,y,z];
    }

    if(c3d.config.unit_test){
      return a;
    }else{
      camera.lookAt(new THREE.Vector3(a[0], a[1], a[2]));
      // result of narrative.setShot logs abs_url, delta_url and shot
      // The four values comprise an e2e_spec cell
      // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
      // '{"delta') but there is no exact 'delta' to trigger shot-processing
      c3d.narrative.setShot({"delta-t":"camera3d", "f":"lookAt", "a":a});
    }
  }//lookAt(x,y,z)/lookAt([x,y,z])


  // pan/tilt camera to point at specific actor/billboard<br> 
  // no-arg default is to look at center of csphere - camerasphere
  lookAtId(id:string='csphere'){
    if(id === 'csphere'){
      let v = csphere.position;
      let a = [v.x, v.y, v.z];
      if(c3d.config.unit_test){
        return a;
      }else{
        camera.lookAt(v);
        // see above
        c3d.narrative.setShot({"delta-t":"camera3d", "f":"lookAt", "a":{}});
      }
      return;
    }
   
    // id other than 'csphere' should be present actor
    if(actors[id]){
      let v = actors[id].position;
      if(c3d.config.unit_test){
        let a;
        if(v){
          a = [v.x, v.y, v.z];
        }
        return a;
      }else{
        if(v){
          camera.lookAt(v);
          c3d.narrative.setShot({"delta-t":"camera3d", "f":"lookAt", "a":id});
        }else{
          console.log(`!Camera3d.lookAt:actors[${id}].position is undefined`);
        }
      }
    }else{
      console.log(`!Camera3d.lookAt:actors[${id}] does not exist`);
    }
  }//lookAt(id)



  // camera keybd-functions
  // normalize position orientation of csphere and camera - AND zoom
  home(a){
    a.d = a.d || 0.0;

    //shot
    c3d.shot = {delta: {
      timeline: {p: {paused:true, repeat:0},
               actors:{
                 'i3d:camera:rotation':[{dur:a.d, 
                                 p:{'x':0.0, 'y':0.0, 'z':0.0,
                                     immediateRender:false}}],
                 'i3d:csphere:position':[{dur:a.d, 
                                 p:{'x':0.0, 'y':0.0, 'z':0.0,
                                     immediateRender:false}}],
                 'i3d:csphere:scale':[{dur:a.d, 
                                 p:{'x':1.0, 'y':1.0, 'z':1.0,
                                     immediateRender:false}}],
                 'i3d:csphere:rotation':[{dur:a.d, 
                                 p:{'x':0.0, 'y':0.0, 'z':0.0,
                                     immediateRender:false}}],
                 'i2d:plane':[{dur:a.d, 
                                 p:{'x': 0.0, 'y': 0.0, immediateRender:false}}],
                 'i2d:zoom_plane': [{dur:a.d, p:{rotation: 0.0,
                 scale:1.0, svgOrigin:'0% 0%', immediateRender:false}}]
               }
              }//tl
              }//delta
    };//shot
    c3d.narrative.setShot(c3d.shot);

    // camera
    camera.position.x = 0.0;
    camera.position.y = 0.0;
    camera.up.x = 0.0;
    camera.up.y = 1.0;
    camera.up.z = 0.0;
    if(camera.fov !== c3d.fov){
      camera.fov = c3d.fov;
      camera.updateProjectionMatrix();
    }
    if(csphere.radius !== c3d.radius){          
      csphere.radius = c3d.radius;     // radius is default 50 
    }

    // dynamic trackers
    c3d.zoom = 1.0;
    c3d.roll = 0.0;
    c3d.pan = 0.0;
    c3d.tilt = 0.0;
    c3d.yaw = 0.0;
    c3d.pitch = 0.0;
  }



  // camera keybd-functions
  // normalize position orientation of csphere and camera - but NOT zoom
  center(a){
    a.d = a.d || 0.0;

    //shot
    c3d.shot = {delta: {
      timeline: {p: {paused:true, repeat:0},
               actors:{
                 'i3d:camera:rotation':[{dur:a.d, 
                                 p:{'x':0.0, 'y':0.0, 'z':0.0,
                                     immediateRender:false}}],
                 'i3d:csphere:position':[{dur:a.d, 
                                 p:{'x':0.0, 'y':0.0, 'z':0.0,
                                     immediateRender:false}}],
                 'i3d:csphere:rotation':[{dur:a.d, 
                                 p:{'x':0.0, 'y':0.0, 'z':0.0,
                                     immediateRender:false}}],
                 'i2d:plane':[{dur:a.d, 
                                 p:{'x': 0.0, 'y': 0.0, immediateRender:false}}]
               }
              }//tl
              }//delta
    };//shot
    c3d.narrative.setShot(c3d.shot);

    // camera
    camera.position.x = 0.0;
    camera.position.y = 0.0;
    camera.up.x = 0.0;
    camera.up.y = 1.0;
    camera.up.z = 0.0;
    if(camera.fov !== c3d.fov){
      camera.fov = c3d.fov;
      camera.updateProjectionMatrix();
    }

    // dynamic trackers
    c3d.roll = 0.0;
    c3d.pan = 0.0;
    c3d.tilt = 0.0;
    c3d.yaw = 0.0;
    c3d.pitch = 0.0;
  }


  
  // ZOOM<br>
  // modify csphere.scale 
  // * NOTE: dynamic camera.fov animation updates of three.js 
  // camera.updateProjectionMatrix() find an undefined projectionMatrix!<br>
  // For this reason zoom is not implemented by camera.fov<br>
  // cut - no animation
  zoomcutTo(a) {  
    c3d.zoom = a.s;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:scale':[{dur:0, 
                                 p:{x:c3d.zoom, y:c3d.zoom, z:c3d.zoom, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  zoomcutBy(a) {   
    c3d.zoom *= a.s;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:scale':[{dur:0, 
                                 p:{x:c3d.zoom, y:c3d.zoom, z:c3d.zoom, immediateRender:false}}]
                             }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  // fly - animate
  zoomflyTo(a) {  
    c3d.zoom = a.s;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:scale':[{dur:a.d, 
                                 p:{x:c3d.zoom, y:c3d.zoom, z:c3d.zoom, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  zoomflyBy(a) {
    c3d.zoom *= a.s;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:scale':[{dur:a.d, 
                                 p:{x:c3d.zoom, y:c3d.zoom, z:c3d.zoom, immediateRender:false}}]
                             }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  // ROLL<br>
  // modify camera.rotation.z<br> 
  // cut - no animation
  rollcutTo(a) {  
    c3d.roll = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:0, 
                                 p:{z:c3d.roll, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  rollcutBy(a) {   
    c3d.roll += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:0, 
                                 p:{z:c3d.roll, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  // fly - animate
  rollflyTo(a) {  
    c3d.roll = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:a.d, 
                                 p:{z:c3d.roll, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  rollflyBy(a) {   
    c3d.roll += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:a.d, 
                                 p:{z:c3d.roll, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }


  // PAN/TILT<br>
  // modify camera.rotation.y/camera.rotation.x 
  panflyTo(a) {   
    c3d.pan = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:a.d, 
                                 p:{y:c3d.pan, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  panflyBy(a) {   
    c3d.pan += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:a.d, 
                                 p:{y:c3d.pan, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  tiltflyTo(a) {   
    c3d.tilt = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:a.d, 
                                 p:{x:c3d.tilt, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  tiltflyBy(a) {   
    c3d.tilt += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:camera:rotation':[{dur:a.d, 
                                 p:{x:c3d.tilt, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }


  // EXAMINE-YAW<br>
  // longitudinal examination - rotate csphere around y-axis<br> 
  // modify csphere.rotation.y<br>
  // cut - no animation
  yawcutTo(a) {  
    c3d.yaw = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:0, 
                                 p:{y:c3d.yaw, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  yawcutBy(a) {   
    c3d.yaw += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:0, 
                                 p:{y:c3d.yaw, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  // fly - animate
  yawflyTo(a) {  
    c3d.yaw = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:a.d, 
                                 p:{y:c3d.yaw, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  yawflyBy(a) {   
    c3d.yaw += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:a.d, 
                                 p:{y:c3d.yaw, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  // EXAMINE-PITCH<br>
  // lattitudinal examination - rotate csphere around x-axis<br> 
  // modify csphere.rotation.x<br>
  // cut - no animation
  pitchcutTo(a) {  
    c3d.pitch = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:0, 
                                 p:{x:c3d.pitch, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  pitchcutBy(a) {   
    c3d.pitch += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:0, 
                                 p:{x:c3d.pitch, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }

  // fly - animate
  pitchflyTo(a) {  
    c3d.pitch = a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:a.d, 
                                 p:{x:c3d.pitch, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }
  pitchflyBy(a) {   
    c3d.pitch += a.r;

    // shot
    c3d.shot = {delta: {
                  timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:rotation':[{dur:a.d, 
                                 p:{x:c3d.pitch, immediateRender:false}}]
                              }
                            }//tl
                        }//delta
                };//shot
    c3d.narrative.setShot(c3d.shot);
  }


  // camera shot implementations
  // DOLLY - camera translation<br>
  // fly - animate (default dur=3.0)
  dollyflyTo(a) {  
    a.d = a.d || 3.0;
    a.x = a.x || csphere.position.x;
    a.y = a.y || csphere.position.y;
    a.z = a.z || csphere.position.z;

    // shot microstate-change
    c3d.shot = {delta: {
                timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:position':[{dur:a.d, 
                                 p:{x:a.x, y:a.y, z:a.z, 
                                 immediateRender:false}}]
                              }
                            }//tl
                        }//delta
              };//shot
    console.log(`dollyflyTo: c3d.shot = ${c3d.shot}`);
    c3d.narrative.setShot(c3d.shot);
  }
  dollyflyBy(a) {
    a.d = a.d || 3.0;
    a.x = a.x || 0.0;
    a.y = a.y || 0.0;
    a.z = a.z || 0.0;
    a.x = csphere.position.x + a.x; 
    a.y = csphere.position.y + a.y; 
    a.z = csphere.position.z + a.z; 

    // shot microstate-change
    c3d.shot = {delta: {
                timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:position':[{dur:a.d, 
                                 p:{x:a.x, y:a.y, z:a.z, 
                                 immediateRender:false}}]
                              }
                            }//tl
                        }//delta
              };//shot
    console.log(`dollyflyBy: c3d.shot = ${c3d.shot}`);
    c3d.narrative.setShot(c3d.shot);
  }

  // cut - no animation (dur=0)
  dollycutTo(a) {  
    a.x = a.x || csphere.position.x;
    a.y = a.y || csphere.position.y;
    a.z = a.z || csphere.position.z;

    // shot microstate-change
    c3d.shot = {delta: {
                timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:position':[{dur:0, 
                                 p:{x:a.x, y:a.y, z:a.z, 
                                 immediateRender:false}}]
                              }
                            }//tl
                        }//delta
              };//shot
    console.log(`dollycutTo: c3d.shot = ${c3d.shot}`);
    c3d.narrative.setShot(c3d.shot);
  }
  dollycutBy(a) {
    a.d = 0.0;
    a.x = a.x || 0.0;
    a.y = a.y || 0.0;
    a.z = a.z || 0.0;
    a.x = csphere.position.x + a.x; 
    a.y = csphere.position.y + a.y; 
    a.z = csphere.position.z + a.z; 

    // shot microstate-change
    c3d.shot = {delta: {
                timeline: {p: {paused:true, repeat:0},
                             actors:{
                              'i3d:csphere:position':[{dur:0, 
                                 p:{x:a.x, y:a.y, z:a.z, 
                                 immediateRender:false}}]
                              }
                            }//tl
                        }//delta
              };//shot
    c3d.narrative.setShot(c3d.shot);
  }



  // random 2d-bezier camera nav<br> 
  // use default 6 points and 'through' bezier curve type
  bezier(a={d:20, n:6, z:true}){
    var i,
        x = [],
        y = [],
        z = [],
        v = [],
        bezier;

    // bezier 'through' curve points - z:true => fly in z dimension also
    if(a.z){
      z[0] = 0.0;
    }
    x[0] = 0.0;
    y[0] = 0.0;
    if(Math.random() > 0.5){
      x[1] = 30.0*Math.random();   // ++
      y[1] = 30.0*Math.random();
      x[2] = -30.0*Math.random();  // -+
      y[2] = 30.0*Math.random();
      x[3] = -30.0*Math.random();  // --
      y[3] = -30.0*Math.random();
      x[4] = 30.0*Math.random();  // +-
      y[4] = -30.0*Math.random();
      if(a.z){
        z[1] = -10*Math.random();
        z[2] = z[1] - 30*Math.random();
        z[3] = z[2] + 30*Math.random();
        z[4] = -10*Math.random();
      }
    }else{
      x[1] = -30.0*Math.random();   // --
      y[1] = -30.0*Math.random();
      x[2] = -30.0*Math.random();  // -+
      y[2] = 30.0*Math.random();
      x[3] = 30.0*Math.random();  // ++
      y[3] = 30.0*Math.random();
      x[4] = 30.0*Math.random();  // +-
      y[4] = -30.0*Math.random();
      if(a.z){
        z[1] = -10*Math.random();
        z[2] = z[1] - 30*Math.random();
        z[3] = z[2] + 30*Math.random();
        z[4] = -10*Math.random();
      }
    }
    x[5] = 0.0;
    y[5] = 0.0;
    if(a.z){
      z[5] = 0.0;
    }

    // create values array
    for(i=0; i<a.n; i++){
      if(a.z){
        v.push({x:x[i], y:y[i], z:z[i]});
      }else{
        v.push({x:x[i], y:y[i]});
      }
    }
    bezier = {bezier:{autoRotate:true, 
                      curviness:2, 
                      values:v,
                      immediateRender:false}};

    // shot<br>
    // y-coords are webgl 
    c3d.shot = {delta: {
      timeline: {p: {paused:true, repeat:0, tweens:[]},
                 actors:{
                   'i3d:csphere:position':[{dur:a.d, p:bezier}]
                 }
                }//tl
                }//delta
    };//shot
    c3d.narrative.setShot(c3d.shot);
  }





  // camera change with NO Substate change !!! - for studio usage only!
  // translation on arbitrary axis - transform is relative and cumulative<br>
  // axis is Vector3 - will be normalized if not already
  translateAxisDistance(axis, d){
    axis.normalize();
    csphere.translateOnAxis(axis, d);
  }

  // camera change with NO Substate change !!! - for studio usage only!
  // rotate the camerasphere csphere by ordered pitch, yaw, roll
  rotate(params){
    var pitch = params.pitch || 0.0;
    var yaw = params.yaw || 0.0;
    var roll = params.roll || 0.0;

    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
    csphere.applyMatrix(matrixa);
  }

  // camera change with NO Substate change !!! - for studio usage only!
  // rotation around arbitraray axis - transform is relative and cumulative<br>
  // axis is Vector3 - will be normalized if not already
  rotateAxisAngle(x,y,z, angle){
    var axis = new THREE.Vector3(x,y,z);
    axis.normalize();
    csphere.rotateOnAxis(axis, angle);
  }

  // camera change with NO Substate change !!! - for studio usage only!
  // relative rotation/scale 
  // * NOTE: params = {pitch:p, yaw:y, roll:r, zoom:scale}
  relRotateScale(params){
    //Object.keys(params).forEach(function(p){
    //});
    var pitch = params.pitch || 0.0;
    var yaw = params.yaw || 0.0;
    var roll = params.roll || 0.0;
    var scale = params.zoom || 1.0;

    // rotate-scale-translate (by x/y/z* scale)
    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
    matrixa.multiplyScalar(scale);  // scale
    //examine_matrix(matrixa);
          
    // apply relative rotation-scale to csphere
    csphere.applyMatrix(matrixa);
    //examine_matrix(csphere.matrix);
  }


  // camera change with NO Substate change !!! - for studio usage only!
  // transform the camerasphere csphere by combination of translation,
  // rotation and zoom
  // * NOTE: params = { tx:x, ty:y, tz:z, pitch:p, yaw:y, roll:r, zoom:z}
  transform(params){
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

    // examine initial csphere matrix
    //examine_matrix(csphere.matrix);

    // absolute translation - matrixb
    matrixb.makeTranslation(x, y, z);
    //examine_matrix(matrixb);
    
    // apply absolute translation to csphere
    csphere.applyMatrix(matrixb);
    //examine_matrix(csphere.matrix);

    // rotate-scale-translate (by x/y/z* scale)
    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
    matrixa.multiplyScalar(scale);  // scale
    //examine_matrix(matrixa);
          
    // apply relative rotation-scale to csphere
    csphere.applyMatrix(matrixa);
    examine_matrix(csphere.matrix);
  }//transform - no substate change!














  // add a passed in actor Object3d to scene - register in actors by id<br>
  // the scene is an Object3d and is the root of the scenegraph tree
  addActorToScene(id:string, o3d:THREE.Object3d, pid:string){

    // o3d is scene - not really needed but creates canonical root actor
    if(o3d === scene){
      actors[id] = o3d; // add scene as root with id i3d-templatename
      o3d.name = id; 
      console.log(`added scene with id = ${id} o3d.name = ${o3d.name}`);
      return true;
    }

    // if id is already present, begin replacement by removing the 
    // corresponding o3d from its parent in the tree, and from the actors list
    for(let name of Object.keys(scene.children)){
      //console.log(`scene contains ${name} with val = ${scene[name]}`);
      if(name === id){
        console.log(`actor ${id} === ${name} is duplicate! did not add!`);
        c3d.removeActorFromScene(id);
      }
    };

    // add new actor to parent in tree and to actors list
    o3d.name = id;
    if(pid && actors[pid]){
      actors[pid].add(o3d); // add to parent
    }else{
      scene.add(o3d);       // add as root to scene
    }
    actors[id] = o3d;       // add node itself
    o3d.updateMatrix(); //needed?
    console.log(`added actor ${id} = ${o3d} with pid = ${pid} to scene`);
    //console.log(`actors[${id}] = ${actors[id]}`);
    return true;
  }

  // remove actor Object3d from the scene
  removeActorFromScene(id:string){
    var node = actors[id],
        p;

    if(node){
      if(node.parent){
        p = node.parent;
        p.remove(node);
      }else{
        scene.remove(node);
      }
      delete actors[id];
    }
  }    

  actor(id){
    console.log(`Camera3d.actor(id=${id})!`);
    console.dir(actors[id]);
    return actors[id] || null;
  }

  reportActors(){
    console.log('Camera3d.reportActors()!');
    return Object.keys(actors); // ids
  }


  // add a passed in actor/billboard Object3d to the scene
  addBillboardToScene(id, o3d, pid){
    // addActor returns true if no webgl duplicate found => can add to bb list
    if(c3d.addActorToScene(id, o3d, pid)){
      billboards[id] = o3d;
    }
  }
  // remove actor/billboard Object3d from the scene
  removeBillboardFromScene(id){
    if(billboards[id]){
      delete billboards[id];
    }
    c3d.removeActorFromScene(id);
  }

  billboard(id){
    return billboards[id] || null;
  }
  reportBillboards(){
    return Object.keys(billboards); // ids
  }



  // show/hide actor 
  // exp: a = {name:'csphere', val='on'/'off'}) 
  // OR
  // turn light a.name on-off 
  // exp: a = {name:['key'|'fill'|'back'], val='on'/'off'}}
  actor_visibility(a, from_ui:boolean=false){
    var actor = actors[a.name],
        b:boolean;

    console.log(`c3d.actor_visibility name=${a.name} val=${a.val}`);
    console.log(`c3d.actor_visibility actor=${actor} from_ui=${from_ui}`);
    if(actor){
      b = (a.val === 'on' ? true : false);
      console.log(`c3d.actor_visibility actor.material=${actor.material}`);
      if(actor.material){
        console.log(`c3d.actor_visibility setting actor.material.visible=${a.val}`);
        actor.material.visible = b; // object - exp: csphere
      }else{
        console.log(`c3d.actor_visibility setting actor.visible=${a.val}`);
        actor.visible = b;
      }
      // narrative-ui ignores request for change of non-existing control
      if(from_ui === false){
        c3d.narrative.changeControl(a.name, a.val);

        // result of narrative.setShot logs abs_url, delta_url and shot
        // The four values comprise an e2e_spec cell
        // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
        // '{"delta') but there is no exact 'delta' to trigger shot-processing
        c3d.narrative.setShot({"delta-t":"camera3d", "f":"actor_visibility", "a":{"name":a.name, "val":a.val}});
      }
    }else{  //reset checkbox - attempt was made to toggle non-existent control
      let val = (a.val === true ? 'off' : 'on'); // send back 'undo' state
      c3d.narrative.changeControl(a.name, val);
    }
  }

  // diagnostics
  report_visibility(){
    // globals visibility
    var report:string="";

    console.log('camera3d.report_visibility:');
    if(!csphere ){
      report = report + "csphere undefined;";
    }else{
      if(!csphere.material){
        report = report + "csphere.material undefined;";
      }else{
        console.log(`csphere.material.visible = ${csphere.material.visible}`);
      }
    }
    if(!key){
      report = report + "key undefined;";
    }else{
      console.log(`key.visible = ${key.visible}`);
    }
    if(!fill){
      report = report + "fill undefined;";
    }else{
      console.log(`fill.visible = ${fill.visible}`);
    }
    if(!back){
      report = report + "back undefined;";
    }else{
      console.log(`back.visible = ${back.visible}`);
    }

    // matches and actor visibility
    if(c3d.actor('csphere')){
      console.log(`c3d.actor('csphere') === csphere is ${c3d.light('csphere') === csphere}`);
      console.log(`c3d.actor('csphere').material.visible is ${c3d.actor('csphere').material.visible}`);
    }else{
      report = report + "actor csphere undefined;";
    }
    if(c3d.light('key')){
      console.log(`c3d.light('key') === key is ${c3d.light('key') === key}`);
      console.log(`c3d.light('key').visible = ${c3d.light('key').visible}`);
    }else{
      report = report + "actor key undefined;";
    }
    if(c3d.light('fill')){
      console.log(`c3d.light('fill') === fill is ${c3d.light('fill') === fill}`);
      console.log(`c3d.light('fill').visible = ${c3d.light('fill').visible}`);
    }else{
      report = report + "actor fill undefined;";
    }
    if(c3d.light('back')){
      console.log(`c3d.light('back') === back is ${c3d.light('back') === back}`);
      console.log(`c3d.light('back').visible = ${c3d.light('back').visible}`);
    }else{
      report = report + "actor back undefined;";
    }

    console.log(`report = ${report}`);
    console.log(`new scene ${scene.name} actors = ${c3d.reportActors()}`);
  }

  light(id){
    return c3d.actor(id);
  }

  get_csphere(){
    return csphere;
  }

  // get webgl rendering context
  get_gl(){
    return c3d.gl;
  }

  // get scene
  get_scene(){
    return scene;
  }


  // change camera.aspect on window resize and render w. new projection matrix<br>
  // first two lines commented out to allow viewport resize and aspect ratio
  // distortion to keep constant x and y projections
  onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight;  
    //camera.updateProjectionMatrix();
    if(c3d.renderer){
      c3d.renderer.setSize( window.innerWidth, window.innerHeight );
      c3d.render();
    }
  };
}
