// config.ts
// use OpaqueToken CONFIG in provide(CONFIG, {useValue: config})
// where config is the const implementation of the interface Config

import {OpaqueToken, provide} from '@angular/core';
import Config from './config.interface';
export let CONFIG = new OpaqueToken('simple');


// provider override experiment - no effect
var PI = new OpaqueToken('pi');

export const config:Config = {

  // recall that the ui radio-button is static - not dynamically created
  controls: ['i2d', 'i3d', 'base', 'fps', 'csphere', 'key', 'fill', 'back'],
  controlstates: {ui: true, i2d: true, i3d: true, base: true, fps: true, 
                  csphere: true, key: true, fill: true, back: true},
  scenes: ['scene1', 'scene2', 'scene3'],
  scenestates: {scene1:false, scene2:false, scene3:false},
  scenepaths: {opening: 'opening://///no-shot:',
    scene1:'scene1:/space:model1/stage:/bg:/display:/establishing:',
    scene2:'scene2:/space:model2/stage2:modelA/bg2:/display2:/establishing:',
    //scene3:'scene3:/space:modelhead/stage:/bg2:/display2:/establishing:'
    scene3:'scene3:/space:modelteapot/stage:/bg3:/display2:/establishing:'
  },

  // metastate: '{scene}/{i3d}/{shot}/',  // for VR
  // substates: ['scene', 'i3d', 'shot'],
  metastate: '{scene}/{i3d}/{i2d}/{base}/{ui}/{shot}/',
  substates: ['scene', 'i3d', 'i2d', 'base', 'ui', 'shot'],  // shot last!

  opening_scene: 'opening',
  canvas_id: '3D',

  // fully specified camerasphere instrumentality (scene init defaults)
  // NOTE: do not specify target for spotlight - it is always default [0,0,0]
  camerasphere: {form: { radius:50.0, 
                         wireframe:true,
                         transparent:true, 
                         opacity:0.5, 
                         color:"blue" },
                 transform:{},
                 children:{
                   camera: {form: { name: 'default',
                              fov: 90,
                              near: 1,
                              far: 1000,
                              position:[0,0,50]
                   }},//camera
                   key: {form: {type:"'pointlight'",
                           color: 'orange', 
                           intensity: 2.5,
                           distance: 100.0,
                           position: [50.0,20.0,20.0]
                   }},
                   fill: {form: {type:"'pointlight'",
                            color: 'blue', 
                            intensity: 0.8,
                            distance: 100.0,
                            position: [-50.0,-10.0, 0.0]
                   }},
                   back: {form: {type:"'pointlight'",
                            color: 'grey', 
                            intensity: 2.5,
                            distance: 100.0,
                            position: [-40.0,-10.0,-50.0]
                   }}
                 }//children
  },//camerasphere
  preload_textures: {Escher_png: './images/Escher.png',
                     glad_png: './images/glad.png',
                     p2_jpg: './images/p2.jpg',
                     sky_jpg: './images/sky.jpg'},

  unit_test: false,
  e2e_test: false,
  name: 'dome2',

  server_host: 'localhost',
  server_port: 8081,   // channels
  server_connect: false,
  record_stream: false,
  record_shots: false,
  channels: ['actions'],

  // targets for action execs
  targets:{narrative:{}, camera3d:{}, camera2d:{}, mediator:{}, animation:{},
    models:{}, scenes:{}, templatecache:{}},

  provider_overrides: [provide(PI, {useValue: 3.14})] 
};

