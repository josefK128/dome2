// camera3d.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';
// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// service
import {Mediator} from './mediator';



// reference to singleton instance of Camera3d
// NOTE: needed since first call by browser after requestAnimationFrame
// resets the execution context (this) to 'window' and thus fails
var c3d;



// faster conditional
var record_shots:boolean = false;

// tmp matrices used in diagnostics transforms and diagnostics
var matrixa = new THREE.Matrix4();
var matrixb = new THREE.Matrix4();


// diagnostics utility functions - camera world information
var report_camera_world = function(){ 
    var cam_wp = new THREE.Vector3(),
        cam_up = new THREE.Vector3();
 
    cam_wp.setFromMatrixPosition(c3d.camera.matrixWorld);
    cam_up = c3d.csphere.localToWorld(c3d.camera.up); // destroys local camera.up !
    console.log(`camera world position:`);
    console.dir(cam_wp);
    console.log(`camera world up is:`);
    console.dir(cam_up);
};

// camera fov, position, rotation, up, and optional matrix information
var report_camera = function(report_matrix:boolean=false):void {
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
    if(report_matrix){
      console.log("c3d.camera.matrix (in column-order): ");
      for(i=0; i<c3d.camera.matrix.elements.length; i++){
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
  narrative;
  canvasId:string;
  canvas;
  camera;
  csphere;
  clearColor:number;
  alpha:number;
  aspect:number;          // w.innerW/w.innerH - for dollyXTo translation factor
  fov:number = 90.0;      // default - can be set by Camera3d.place()
  radius:number = 50.0;   // default camera z-distance set by radius of csphere 
  zoom:number = 1.0;      // zoom - dynamic tracking
  // by default the camera looks at the csphere center - pan/tilt look away
  pan:number = 0.0;       // pan - dynamic tracking
  tilt:number = 0.0;      // tilt - dynamic tracking
  // euler
  pitch:number = 0.0;     // examine-pitch (rotation of csphere around x-axis)
  yaw:number = 0.0;       // examine-yaw (rotation of csphere around y-axis)
  roll:number = 0.0;      // roll - dynamic tracking
  renderer;
  scene;
  prev_scene;
  actors:Object={};
  billboards:Object={};
  billboardsFace:boolean = false;
  billboardsTarget = new THREE.Vector3(); // world position of camera
  gl;
  stats;
  count:number = 0;
  record:boolean;
  shot:Object;


  constructor(@Inject(CONFIG) cfg:Config, mediator:Mediator) {
    c3d = this;
    c3d.config = cfg;
    record_shots = c3d.config.record_shots; // faster conditional test
    c3d.mediator = mediator;
    c3d.actors = {};
    c3d.billboards = {};

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
            c3d.camera.position.x = 0;
            c3d.camera.position.y = 0;
            c3d.camera.position.z = 50;
            c3d.camera.lookAt(c3d.scene.position);
          }else{
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
             //log({t:'camera3d', f:'billboardsFaceCamera'});
              if(record_shots){
                c3d.mediator.record({t:'camera3d', f:'billboardsFaceCamera'});
              }
            }
          }else{            // l => camera
            if(e.shiftKey){
              // lookAt origin in absolute coords
              c3d.camera.lookAt([0.0, 0.0, 0.0]);
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



  // initialize scene - 'place' camera in scene
  place(canvasId, _scenename, _narrative, _scene, _clearColor, _alpha, _fov) {
    var sphereGeometry,
        sphereMaterial;

    // pass in procedural Scene or use declarative i3d-svg scene in index.html
    c3d.scene = _scene || new THREE.Scene();
    c3d.scene.name = _scenename || 'noname';

    // save scene as prev_scene used to remove scene-actor children
    c3d.prev_scene = c3d.scene;  
    
    console.log(`camera3d.place: c3d.scene.name = ${c3d.scene.name}`);
    c3d.addActorToScene(c3d.scene.name, c3d.scene, undefined);
    
    c3d.canvasId = canvasId;
    c3d.canvas = document.getElementById(canvasId);
    c3d.gl = c3d.canvas.getContext("webgl", {premultipliedAlpha: false});
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
    sphereGeometry = new THREE.SphereGeometry(50,20,20);
    sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    c3d.csphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

    // position the sphere
    c3d.csphere.position.x=0;
    c3d.csphere.position.y=0;
    c3d.csphere.position.z=0;

    // camera
    c3d.fov = _fov || 90.0;
    c3d.camera = new THREE.PerspectiveCamera( c3d.fov, window.innerWidth / window.innerHeight, 1, 1000 );

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
    c3d.renderer = new THREE.WebGLRenderer({canvas: c3d.canvas, antialias: true, alpha: true});
    c3d.renderer.setSize('100vw', '100vh');

    // setClearColor(color, alpha) - use passed params (if given)
    c3d.renderer.setClearColor(c3d.clearColor, c3d.alpha);
    c3d.renderer.setSize( window.innerWidth, window.innerHeight );

    // report_camera - to get camera matrix supply boolean arg 'true'
    report_camera_world();
    report_camera();

    // begin camera control animation - in sync with GSAP animation
    // later replace c3d line by TweenMax.ticker line below
    c3d.animate();
    //TweenMax.ticker.addEventListener('tick', c3d.render);
  }//place



  // remove current scene
  changeTemplateScene(template, _scene){
    c3d.prev_scene = c3d.scene; // used to remove scene-actor children
    c3d.scene = _scene || (new THREE.Scene());
    c3d.scene.name = template;

    // setClearColor(color, alpha)
    c3d.renderer.setClearColor(c3d.clearColor, c3d.alpha);
    c3d.renderer.setSize( window.innerWidth, window.innerHeight );
    c3d.renderer.render(c3d.scene, c3d.camera);
  }



  // start rendering cycle
  animate() {
    // diagnostics
    if(c3d.count++ < 2){
      console.log(`\nstart animate: c3d.count === ${c3d.count}`);
      console.log(`this === ${this}`);
      console.log(`c3d === ${c3d}`);
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
  }

  // render scene using camera<br>
  // possibly orient billboards to face (lookAt) camera
  render() {
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

    if(c3d.stats){
      c3d.stats.update();
    }
    c3d.renderer.render( c3d.scene, c3d.camera );
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
    c3d.narrative.setShot(`{"delta-t":"camera3d", "f":"billboardsFaceCamera"}`);
  }

  // decouple billboards from possible orientation to actor target
  billboardsFree(){
    c3d.billboardsFace = false;
    // result of narrative.setShot logs abs_url, delta_url and shot
    // The four values comprise an e2e_spec cell
    // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
    // '{"delta') but there is no exact 'delta' to trigger shot-processing
    c3d.narrative.setShot(`{"delta-t":"camera3d", "f":"billboardsFree"}`);
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
      c3d.camera.lookAt(new THREE.Vector3(a[0], a[1], a[2]));
      // result of narrative.setShot logs abs_url, delta_url and shot
      // The four values comprise an e2e_spec cell
      // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
      // '{"delta') but there is no exact 'delta' to trigger shot-processing
      c3d.narrative.setShot(`{"delta-t":"camera3d", "f":"lookAt", "a":${a}}`);
    }
  }//lookAt(x,y,z)/lookAt([x,y,z])


  // pan/tilt camera to point at specific actor/billboard<br> 
  // no-arg default is to look at center of csphere - camerasphere
  lookAtId(id:string='csphere'){
    if(id === 'csphere'){
      let v = c3d.csphere.position;
      let a = [v.x, v.y, v.z];
      if(c3d.config.unit_test){
        return a;
      }else{
        if(c3d.csphere){
          c3d.camera.lookAt(v);
          // see above
          c3d.narrative.setShot(`{"delta-t":"camera3d", "f":"lookAt", "a":{}}`);
        }else{
          console.log(`!Camera3d.lookAt:csphere is undefined`);
        }
      }
      return;
    }
   
    // id other than 'csphere' should be present actor
    if(c3d.actors[id]){
      let v = c3d.actors[id].position;
      if(c3d.config.unit_test){
        let a;
        if(v){
          a = [v.x, v.y, v.z];
        }
        return a;
      }else{
        if(v){
          c3d.camera.lookAt(v);
          c3d.narrative.setShot(`{"delta-t":"camera3d", "f":"lookAt", "a":id}`);
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
    this.shot = {delta: {
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
    this.shot = 'shot-anim:' + JSON.stringify(this.shot);
    c3d.narrative.setShot(this.shot);

    // camera
    c3d.camera.position.x = 0.0;
    c3d.camera.position.y = 0.0;
    c3d.camera.up.x = 0.0;
    c3d.camera.up.y = 1.0;
    c3d.camera.up.z = 0.0;
    if(c3d.camera.fov !== c3d.fov){
      c3d.camera.fov = c3d.fov;
      c3d.camera.updateProjectionMatrix();
    }
    if(c3d.csphere.radius !== c3d.radius){          
      c3d.csphere.radius = c3d.radius;     // radius is default 50 
    }

    // dynamic trackers
    c3d.zoom = 1.0;
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
    c3d.shot = 'shot-anim:' + JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
    c3d.narrative.setShot(c3d.shot);
  }


  // camera shot implementations
  // DOLLY - camera translation<br>
  // fly - animate (default dur=3.0)
  dollyflyTo(a) {  
    a.d = a.d || 3.0;
    a.x = a.x || c3d.csphere.position.x;
    a.y = a.y || c3d.csphere.position.y;
    a.z = a.z || c3d.csphere.position.z;

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
    c3d.narrative.changeShot(c3d.shot);
  }
  dollyflyBy(a) {
    a.d = a.d || 3.0;
    a.x = a.x || 0.0;
    a.y = a.y || 0.0;
    a.z = a.z || 0.0;
    a.x = c3d.csphere.position.x + a.x; 
    a.y = c3d.csphere.position.y + a.y; 
    a.z = c3d.csphere.position.z + a.z; 

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
    c3d.narrative.changeShot(c3d.shot);
  }

  // cut - no animation (dur=0)
  dollycutTo(a) {  
    a.x = a.x || c3d.csphere.position.x;
    a.y = a.y || c3d.csphere.position.y;
    a.z = a.z || c3d.csphere.position.z;

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
    c3d.narrative.changeShot(c3d.shot);
  }
  dollycutBy(a) {
    a.d = 0.0;
    a.x = a.x || 0.0;
    a.y = a.y || 0.0;
    a.z = a.z || 0.0;
    a.x = c3d.csphere.position.x + a.x; 
    a.y = c3d.csphere.position.y + a.y; 
    a.z = c3d.csphere.position.z + a.z; 

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
    console.log(`dollycutBy: c3d.shot = ${JSON.stringify(c3d.shot)}`);
    c3d.narrative.changeShot(c3d.shot);
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
    c3d.shot = JSON.stringify(c3d.shot);
    c3d.narrative.setShot(c3d.shot);
  }





  // camera change with NO Substate change !!! - for studio usage only!
  // translation on arbitrary axis - transform is relative and cumulative<br>
  // axis is Vector3 - will be normalized if not already
  translateAxisDistance(axis, d){
    axis.normalize();
    c3d.csphere.translateOnAxis(axis, d);
  }

  // camera change with NO Substate change !!! - for studio usage only!
  // rotate the camerasphere csphere by ordered pitch, yaw, roll
  rotate(params){
    var pitch = params.pitch || 0.0;
    var yaw = params.yaw || 0.0;
    var roll = params.roll || 0.0;

    matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
    c3d.csphere.applyMatrix(matrixa);
  }

  // camera change with NO Substate change !!! - for studio usage only!
  // rotation around arbitraray axis - transform is relative and cumulative<br>
  // axis is Vector3 - will be normalized if not already
  rotateAxisAngle(x,y,z, angle){
    var axis = new THREE.Vector3(x,y,z);
    axis.normalize();
    c3d.csphere.rotateOnAxis(axis, angle);
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
    c3d.csphere.applyMatrix(matrixa);
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
    matrixa.multiplyScalar(scale);  // scale
    //examine_matrix(matrixa);
          
    // apply relative rotation-scale to csphere
    c3d.csphere.applyMatrix(matrixa);
    examine_matrix(c3d.csphere.matrix);
  }//transform - no substate change!














  // add a passed in actor Object3d to scene - register in actors by id<br>
  // the scene is an Object3d and is the root of the scenegraph tree
  addActorToScene(id, o3d, pid){

    console.log(`\nc3d.addActorToScene: id = ${id} o3d = ${o3d} pid = ${pid}`);

    // o3d is scene - not really needed but creates root actor
    if(o3d === c3d.scene){
      c3d.actors[id] = o3d; // add scene as root
      o3d.name = id; 
      console.log(`added scene with id = ${id} o3d.name = ${o3d.name}`);
      return true;
    }

    // check duplicate
    c3d.scene.traverse((o) => {
      if(o.name === id){
        console.log(`actor ${id} = ${o3d} is duplicate! did not add!`);
        return false ; // exception - duplication - don't add bb to bbs list
      }
    });

    // add new actor to actors list
    o3d.name = id;
    if(pid && c3d.actors[pid]){
      c3d.actors[pid].add(o3d); // add to parent
    }else{
      c3d.scene.add(o3d);       // add as root to scene
    }
    c3d.actors[id] = o3d;
    o3d.updateMatrix(); //needed?
    console.log(`added actor ${id} = ${o3d} with pid = ${pid} to scene`);
    return true;
  }

  // remove actor Object3d from the scene
  removeActorFromScene(id){
    var node = c3d.actors[id],
        p;

    if(node){
      if(node.parent){
        p = node.parent;
        p.remove(node);
      }else{
        // prev_scene is the container of all webgl actors to be removed
        c3d.prev_scene.remove(node);
      }
      delete c3d.actors[id];
    }
  }    

  actor(id){
    return c3d.actors[id] || null;
  }

  reportActors(){
    console.log('Camera3d.reportActors()!');
    return Object.keys(c3d.actors); // ids
  }


  // add a passed in actor/billboard Object3d to the scene
  addBillboardToScene(id, o3d, pid){
    // addActor returns true if no webgl duplicate found => can add to bb list
    if(c3d.addActorToScene(id, o3d, pid)){
      c3d.billboards[id] = o3d;
    }
  }
  // remove actor/billboard Object3d from the scene
  removeBillboardFromScene(id){
    if(c3d.billboards[id]){
      delete c3d.billboards[id];
    }
    c3d.removeActorFromScene(id);
  }

  billboard(id){
    return c3d.billboards[id] || null;
  }
  reportBillboards(){
    return Object.keys(c3d.billboards); // ids
  }



  // turn light a.name on-off 
  // a = {name:['key'|'fill'|'back'], val='on'/'off'}
  toggle_light(a){
    if(c3d.actors[a.name]){
      c3d.actors[a.name].visible = a.val;
      c3d.narrative.changeControl(a.name, a.val);

      // result of narrative.setShot logs abs_url, delta_url and shot
      // The four values comprise an e2e_spec cell
      // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
      // '{"delta') but there is no exact 'delta' to trigger shot-processing
      c3d.narrative.setShot(`shot-fixed:{"delta-t":"camera3d", "f":"toggle_light", "a":{"name":"${a.name}","val":${a.val}}}`);
    }
  }



  light(id){
    return c3d.actor(id);
  }

  get_csphere(){
    return c3d.csphere;
  }

  // get webgl rendering context
  get_gl(){
    return c3d.gl;
  }

  // get scene
  get_scene(){
    return c3d.scene;
  }


  // change camera.aspect on window resize and render w. new projection matrix<br>
  // first two lines commented out to allow viewport resize and aspect ratio
  // distortion to keep constant x and y projections
  onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight;  
    //camera.updateProjectionMatrix();
    c3d.renderer.setSize( window.innerWidth, window.innerHeight );
    c3d.render();
  };
}
