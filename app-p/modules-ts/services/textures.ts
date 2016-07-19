// textures.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// shaders 
import {fsh} from '../defs/webgl-defs';
import {fsh_filter} from '../defs/webgl-defs';
import {vsh} from '../defs/webgl-defs';



// texture loader and ShaderMaterial factory function
var textures:Textures,
    loader = new THREE.TextureLoader(),
    createShaderMaterial = (texture:THREE.Texture, _fshader?:string) => {
      var material:THREE.ShaderMaterial,
          fshader = _fshader || fsh;

      // resolution filtering
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;

      // assuming you want the texture to repeat in both directions:<br>
      // how many times to repeat in each direction - default is (1,1),
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      // shaderMaterial<br>
      // = new THREE.MeshLambertMaterial({ map : texture });<br>
      // color is defined by one float (!?) => f f f ? so 1.0 => white ?
      material = new THREE.ShaderMaterial({
        uniforms: {
          color: {type:'f', value:1.0},
          map: {type:'t', value:texture}
        },
        vertexShader: vsh,
        fragmentShader: fshader,
        transparent:true
      });

      // three.js blending<br>
      // NOTE! - brightening of opaque image intersections 
      // sometimes occurs (?!)
      // This should NOT occur with the following:<br>
      // material.blendDst = THREE.OneMinusSrcAlphaFactor;<br>
      // NOTE! brightening does occur with:
      //material.blendDst = THREE.DstAlphaFactor;
      //
      //material.depthTest = false;
      //material.blending = THREE.CustomBlending;
      material.blendSrc = THREE.SrcAlphaFactor; // default
      //material.blendDst = THREE.DstAlphaFactor;
      material.blendDst = THREE.OneMinusSrcAlphaFactor; // default
      material.blendEquation = THREE.AddEquation; // default

      return material;
    };



@Injectable()
export class Textures {
  config: any;
  materials:Object;
  webgl_defs:Object;

  // NOTE: all templates must be listed and have defined ({}) sets of materials
  constructor(@Inject(CONFIG) cfg:Config) {
    textures = this;
    this.config = cfg;
    this.webgl_defs = {fsh:fsh, fsh_filter:fsh_filter, vsh:vsh};
    this.materials = {};
    console.log('ctor: preload');
    this.preload(this.config.preload_textures);
  }//ctor



  preload(images:Object){
    for(let t of Object.keys(images)){
      this.get(t, images[t]).then((material) => {
        textures.materials[t] = material;
      }).catch((e) => {
        console.log(`! failed to preload material for ${t} path ${images[t]}`);
      });
    }
  }


  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'i3d.space.texture1'
  // or an array of object-branch keys such as ['i3d', 'space', 'texture1']
  branch(path){
    var keys:string[],
        branch:Object = this.materials;

    console.log(`branch():path = ${path}`);
    if(!Array.isArray(path)){
      keys = (path.includes('.') ? path.split('.') : [path]);
      //keys = (pathstring.indexOf('.') > -1 ? pathstring.split('.') : [pathstring]);
      console.log(`Array.isArray(keys) = ${Array.isArray(keys)}`);
      console.log(`keys = ${keys}`);
    }else{
      keys = path;
    }

    // operate using array of branch keys
    for(let s of keys){
      // ignore key = ''
      if(s.length > 0){
        console.log(`branch: key = ${s}  branch = ${branch} branch[${s}] = ${branch[s]}`);
        branch = (branch[s] ? branch[s] : undefined);
        if(branch === undefined){
          console.log(`!!!!!!!!!!!!!!!!!! branch from ${name} is undefined!`);
          return undefined;
        }
      }
    }
    return branch;
  }

  // example: get('texture6')
  // example: get(['texture6'])
  get(name:string, path:string):Promise<THREE.ShaderMaterial>{
    var material:THREE.ShaderMaterial = this.materials[name];

    for(let t of Object.keys(this.materials)){
      console.log(`this.materials[${t}] = ${this.materials[t]}`);
    }
    for(let t of Object.keys(textures.materials)){
      console.log(`textures.materials[${t}] = ${textures.materials[t]}`);
    }


    return new Promise(function(resolve, reject){

      // if material is cached return it
      if(material !== undefined){      
        console.log(`textures.get: cached material = ${material}`);
        resolve(material);
      }

      // if not cached get the texture createShaderMaterial and cache it
      let onload = (texture) => {
        // prepare ShaderMaterial
        material = createShaderMaterial(texture);

        // cache for subsequent requests and return
        textures.materials[name] = material;         
        resolve(material);
      };

      let progress = (p) => {
        console.log(`${100*p.loaded/p.total}% loaded`);
      };
    
      let onerror = (e) => {
        reject(e);
      };

      console.log('loader.load');
      loader.load(path, onload, progress, onerror);
    });//return new Promise
  }


  // example: add('texture6', {...})
  add(path, texturename:string, texture:Object){
    var branch = this.branch(path);
    if(branch){
      branch[texturename] = texture;
      return true;
    }
    return undefined;
  }

  // example: remove('texture6')
  // example: remove(['texture6']])
  remove(path){
    var branch = this.branch(path);
    if(branch){
      branch = undefined;
      return true;
    }
    return undefined;
  }
};//Textures

