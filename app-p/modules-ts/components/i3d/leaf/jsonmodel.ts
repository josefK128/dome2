//Jsonmodel leaf-component
// NOTE: leaf-components have empty-string template - NOT undefined! 
// input-property attribute values used by the leaf-component are declared 
// in <name ...></name> element(s) in the templates of composite 
// components (for exp. scenes)
// NOTE: the purpose of i3d leaf-components are to create webGL objects
// and via Camera3d add them to the webGL scene rendered in the '3D' canvas,
// and register the object as a scene 'actor' via Camera3d.addActorToScene(...)

// ng
import {Component, Input} from '@angular/core';

// services
import {Camera3d} from '../../../services/camera3d';
import {Transform3d} from '../../../services/transform3d';
import {Textures} from '../../../services/textures';

// protect execution context during load
var jm;



@Component({
  selector: 'jsonmodel',
  template: ``      
})
export class Jsonmodel {
  private static MODELS:Object={};  // cache for previously fetched JSON-models

  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid:string;
  camera3d:Camera3d;
  transform3d:Transform3d;
  textures:Textures;

  phong:boolean;
  jsonmodel:Object;
  texture: Object;
  color:number;
  emissive_color:number;
  emissiveIntensity:number;
  specular_color:number;
  shininess:number;
  reflectivity:number;
  opacity: number;
  transparent: boolean; 
  wireframe: boolean;
  transform: Object;
  material: THREE.Material;
  geometry: THREE.Geometry;
  o3d:THREE.Object3d;


  constructor(camera3d: Camera3d, transform3d:Transform3d, textures:Textures) {
    jm = this;
    this.camera3d = camera3d;
    this.transform3d = transform3d;
    this.textures = textures;
  }



  mesh_geometry(jsonmodel:Object):Promise<THREE.Mesh>{
    var loader = new THREE.ObjectLoader(THREE.DefaultLoadingManager),
        name:string = Object.keys(jsonmodel)[0],
        path:string = jsonmodel[name];

    console.log('Jsonmodel mesh_geometry()');
    console.log(`loader = ${loader} loader.load path = ${path}`);
    return new Promise(function(resolve, reject){

      // if model is cached return it
      if(Jsonmodel.MODELS[name] !== undefined){      
        console.log(`cached model = ${name}`);
        resolve(Jsonmodel.MODELS[name]);
      }

      // load object and possibly material(s)
      console.log(`${name} not cached`);
      let onload = (obj, materials) => {
        console.log(`ldr.onload: typeof loaded obj = ${typeof obj}`);
        if(materials === undefined){
          resolve(obj);  // full model
        }else{
          // obj is geometry only
          jm.geometry = obj;

          // prepare possible MultiMaterial
          jm.material = materials ? new THREE.MultiMaterial(materials) : null;
   
          resolve();
        }
      };

      let progress = (p) => {
        console.log(`${100.0*p.loaded/p.total}% loaded`);
      };
    
      let onerror = (e) => {
        console.log(`loader.onerror: ${e}`);
        reject(e);
      };

      loader.load(path, onload, progress, onerror);
    });//return new Promise
  }


  basic_material() {
    console.log(`Jsonmodel basic_material() phong = ${jm.phong}`);

    if(jm.phong){
//      jm.material = new THREE.MeshPhongMaterial({
//        emissive: jm.emissive_color,
//        emissiveIntensity: jm.emissiveIntensity,
//        specular: jm.specular_color,
//        shininess: jm.shininess, 
//        reflectivity: jm.reflectivity,
//        shading:true,
//        fog:true});
      jm.material = new THREE.MeshPhongMaterial( { 
        color: 0xdddddd, 
        specular: 0x009900, 
        shininess: 30, 
        shading: THREE.FlatShading } );
    }else{
      jm.material = new THREE.MeshBasicMaterial({});
    }
    console.log(`Jsonmodel basic_material() jm.material = ${jm.material}`);

    // common material properties
    jm.material.color = jm.color; 
    jm.material.wireframe = jm.wireframe;
    jm.material.transparent = jm.transparent;
    jm.material.opacity = jm.opacity;
    //jm.material.shading = THREE.FlatShading;


    // three.js blending<br>
    // * NOTE! - brightening of opaque image intersections 
    //   sometimes occurs (?!)<br>
    //   This should NOT occur with the following:<br>
    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    // * NOTE! brightening does occur with:<br>
    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
    jm.material.depthTest = false;
    jm.material.blending = THREE.CustomBlending;
    jm.material.blendSrc = THREE.SrcAlphaFactor;
    //jm.material.blendDst = THREE.DstAlphaFactor;
    jm.material.blendDst = THREE.OneMinusSrcAlphaFactor;
    jm.material.blendEquation = THREE.AddEquation; // default

    jm.realize();
  }


  texture_material(texture:Object) {
    var name = Object.keys(texture)[0],
        path = texture[name];
        
    console.log('Jsonmodel texture_material()');
    jm.textures.get(name, path).then((material) => {
      jm.material = material;
      jm.realize();
    });
  }


  // write to THREE.js scene
  realize(model?:THREE.Mesh) {
    console.log(`%%%% Jsonmodel realize: writing jsonmodel to scene`); 
    console.log(`model = ${model}`); 

    // if cached model use it, else create new model and cache it
    if(model === undefined){
      let name:string = Object.keys(jm.jsonmodel)[0];
      console.log(`realize: name = ${name}`);

      // create a webgl sphere-node
      jm.o3d = new THREE.Mesh(jm.geometry, jm.material);
      jm.o3d.material.side = THREE.DoubleSide;
      Jsonmodel.MODELS[name] = jm.o3d;  // cache
    }else{
      jm.o3d = model;  // cached model
    }
    console.log(`realize: jm.o3d = ${jm.o3d}`);

    // add the Object3d to the scene and store in Camera3d actors by id
    jm.camera3d.addActorToScene(jm.id, jm.o3d, jm.pid);
  
    // transform sphere - relative to parent in THREE.js scene !!!
    jm.transform3d.apply(jm.transform, jm.o3d);
  }



  // ordered sequence of component lifecycle phase-transitions:
  //ngOnChanges() { console.log(`Jsonmodel ngOnChanges`); }
  ngOnInit() { 
    var form = jm.node['form'];

    jm.pid = jm.parent['id'];
    console.log(`%%%% ngOnInit - Jsonmodel id=${jm.id} pid=${jm.pid}`); 
    console.log(`node.form.type = ${form['type']}`);
    //console.log(`node = ${jm.node}`);
    //console.log(`parent = ${jm.parent}`);

    // properties with defaults - 
    jm.phong = form['phong'] || true;
    jm.jsonmodel = form['jsonmodel'];  // default undefined
    jm.color = form['color'] || 0xffffff; // default undefined
    jm.emissive_color = form['emissive_color'] || 0x000000; // default undefined
    jm.emissiveIntensity = form['emissiveIntensity'] || 1;
    jm.specular_color = form['specular_color'] || 0xffffff; // default undefined
    jm.shininess = form['shininess'] || 30;
    jm.reflectivity = form['reflectivity'] || 1;
    jm.transparent = form['transparent'] || true;
    jm.opacity = form['opacity'] || 1.0;
    jm.wireframe = form['wireframe'] || false;
    jm.texture = form['texture'];  // default undefined
    jm.transform = jm.node['transform'] || {};


    // geometry
    jm.mesh_geometry(jm.jsonmodel).then((model) => {
      console.log(`mesh_geom resolve: model = ${model}`);

//      if(model !== undefined){
//        console.log('calling jm.realize()');
//        jm.realize(model);
//      }else{
        console.log(`jm.texture = ${jm.texture}`);
        if(jm.texture !== undefined){
          console.log(`jm.texture defined`);
          for(let p of Object.keys(jm.texture)){
            console.log(`jm.texture has property ${p} val=${jm.texture[p]}`);
          }
          jm.texture_material(jm.texture);
        }else{
          console.log(`jm.texture undefined`);
          jm.basic_material();
        }
 //    }//model?
    }).catch((e) => {
      console.log(`reject: reason = ${e}`);
    });
  }


  ngAfterViewInit() { console.log(`Jsonmodel ngAfterViewInit`); }
  //ngOnDestroy() { console.log(`Jsonmodel ngOnDestroy`); }
}
