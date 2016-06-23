// simple-config.ts
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
  controlstates: {ui: true, i2d: false, i3d: true, base: true, fps: true, csphere: true, key: true, fill: true, back: true},
  scenes: ['scene1', 'scene2'],
  scenestates: {scene1:false, scene2:false},
  scenepaths: {opening: 'opening://///no-shot:',
    scene1:'scene1:/space:model1/stage:/bg:/display:/shot:',
    scene2:'scene2:/space2:model2/stage2:/bg2:/display2:/shot2:'
  },

  // metastate: '{scene}/{i3d}/{shot}/',  // for VR
  // substates: ['scene', 'i3d', 'shot'],
  // shotroot: '//leaf-shot:'
  metastate: '{scene}/{i3d}/{i2d}/{base}/{ui}/{shot}/',
  substates: ['scene', 'i3d', 'i2d', 'base', 'ui', 'shot'],
  shotroot: '/////leaf-shot:',

  canvas_id: '3D',
  opening_scene: 'opening',

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

