// textures.ts - angular rc1.0
import {Injectable, Inject} from '@angular/core';

// configuration
import Config from '../configs/config.interface';
import {CONFIG} from '../configs/@config';

// shaders and textures 
import {fsh} from '../views/webgl-defs';
import {fsh_filter} from '../views/webgl-defs';
import {vsh} from '../views/webgl-defs';
import {Escher_png} from '../views/webgl-defs';
import {glad_png} from '../views/webgl-defs';
import {sky_jpg} from '../views/webgl-defs';


// texture loader and ShaderMaterial factory function
var loader = new THREE.TextureLoader(),
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
  textures:Object;
  webgl_defs:Object;

  // NOTE: all templates must be listed and have defined ({}) sets of textures
  constructor(@Inject(CONFIG) cfg:Config) {
    this.config = cfg;
    this.webgl_defs = {fsh:fsh, fsh_filter:fsh_filter, vsh:vsh,
                  Escher_png:Escher_png, glad_png:glad_png, sky_jpg:sky_jpg};
    this.textures = { 
//      'Escher_png': createShaderMaterial(Escher_png),
//      'glad_png': createShaderMaterial(glad_png),
//      'sky_jpg': createShaderMaterial(sky_jpg),
//      'Escherf_png': createShaderMaterial(Escher_png, fsh_filter),
//      'gladf_png': createShaderMaterial(glad_png, fsh_filter),
//      'skyf_jpg': createShaderMaterial(sky_jpg, fsh_filter)
    };
  }//ctor




  // if needed,create array of keys from dotted path string
  // path can be simple string such as 'i3d'
  // or a punctuated object-branch path such as 'i3d.space.texture1'
  // or an array of object-branch keys such as ['i3d', 'space', 'texture1']
  branch(path){
    var keys:string[],
        branch:Object = this.textures;

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
  get(name:string, path):Promise<THREE.ShaderMaterial>{
    var material,
        resolve,
        reject;

    if(this.textures[name] === undefined){      
      let onload = (texture) => {        
        // prepare ShaderMaterial
        material = createShaderMaterial(texture);

        // cache for subsequent requests and return
        this.textures[name] = material;         
        resolve(material);
      };

      let progress = (p) => {
        console.log(`${p.loaded/p.total}% loaded`);
      };
      
      let onerror = (e) => {
        reject(e);
      };

      return new Promise((resolve, reject) => {
        loader.load(path, onload, progress, onerror);
      });
    }else{
      return Promise.resolve(this.branch(name));
    }
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

}
