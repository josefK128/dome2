// simple-config.ts
// use OpaqueToken CONFIG in provide(CONFIG, {useValue: config})
// where config is the const implementation of the interface Config

import {OpaqueToken, provide} from '@angular/core';
import Config from './config.interface';
export let CONFIG = new OpaqueToken('simple');


// provider override experiment - no effect
var PI = new OpaqueToken('pi');

export const config:Config = {
  url_pattern: '{scene}/{i3d}/{shot}/',
  url_keys: ['scene', 'i3d', 'shot'],
  canvas_id: '3D',
  opening_scene: 'opening',
  scene: Scene,
  test: false,
  name: 'dome2',
  items: ['cherry', 'apricot', 'apple'],
  hostL: 'localhost',
  portL: 8082,
  f: () => {
      document.getElementById('name').innerHTML = `hello ${config.name}`;
  },
  provider_defaults: [provide(PI, {useValue: 3.14})] 
};

