//Torus leaf-component
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


// instance
var torus;



@Component({
  selector: 'torus',
  template: ``      
})
export class Torus {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid: string;
  camera3d:Camera3d;
  transform3d:Transform3d;
  textures:Textures;

  radius: number;
  tube: number;
  arc:number;
  radialSegments: number;
  tubularSegments: number;
  texture: Object;
  color:string;
  opacity: number;
  transparent: boolean; 
  wireframe: boolean;
  phong:boolean;
  emissive_color:number;
  emissiveIntensity:number;
  specular_color:number;
  shininess:number;
  reflectivity:number;
  fog:boolean;
  transform: Object;
  material: THREE.Material;
  geometry: THREE.Geometry;
  o3d:THREE.Object3d;


  constructor(camera3d: Camera3d, transform3d:Transform3d, textures:Textures) {
    torus = this;
    torus.camera3d = camera3d;
    torus.transform3d = transform3d;
    torus.textures = textures;
  }


  mesh_geometry(){
    console.log('Torus mesh_geometry()');
    torus.geometry = new THREE.TorusGeometry(torus.radius, torus.tube, 
      torus.arc, torus.radialSegments, torus.tubularSegments);
  }


  basic_material() {
    console.log('Torus basic_material()');

    if(torus.phong){
      torus.material = new THREE.MeshPhongMaterial( { 
        specular: torus.specular_color,
        emissive: torus.emissive_color,
        emissiveIntensity: torus.emissiveIntensity,
        shininess: torus.shininess,
        reflectivity: torus.reflectivity,
        fog: torus.fog,
        shading: THREE.FlatShading } );
    }else{
      torus.material = new THREE.MeshBasicMaterial({
        color: torus.color, 
        transparent: torus.transparent, 
        opacity: torus.opacity, 
        wireframe:torus.wireframe});
    }

    // three.js blending<br>
    // * NOTE! - brightening of opaque image intersections 
    //   sometimes occurs (?!)<br>
    //   This should NOT occur with the following:<br>
    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    // * NOTE! brightening does occur with:<br>
    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
    torus.material.depthTest = false;
    torus.material.blending = THREE.CustomBlending;
    torus.material.blendSrc = THREE.SrcAlphaFactor;
    //torus.material.blendDst = THREE.DstAlphaFactor;
    torus.material.blendDst = THREE.OneMinusSrcAlphaFactor;
    torus.material.blendEquation = THREE.AddEquation; // default

    torus.realize();
  }


  texture_material(texture:Object) {
    var name = Object.keys(texture)[0],
        path = texture[name];
        
    console.log('Torus texture_material()');
    torus.textures.get(name, path).then((material) => {
      torus.material = material;
      torus.realize();
    });
  }


  // write to THREE.js scene
  realize() {
    console.log(`%%%% Torus realize: writing sphere to scene`); 

    // create a webgl sphere-node
    torus.o3d = new THREE.Mesh(torus.geometry, torus.material);
    torus.o3d.material.side = THREE.DoubleSide;
  
    // add the Object3d to the scene and store in Camera3d actors by id
    torus.camera3d.addActorToScene(torus.id, torus.o3d, torus.pid);
  
    // transform sphere - relative to parent in THREE.js scene !!!
    torus.transform3d.apply(torus.transform, torus.o3d);
  }


  // ordered sequence of component lifecycle phase-transitions:
  //ngOnChanges() { console.log(`Torus ngOnChanges`); }
  ngOnInit() { 
    var form = torus.node['form'];

    torus.pid = torus.parent['id'];
    console.log(`%%%% ngOnInit - Torus id=${torus.id} pid=${torus.pid}`); 
    console.log(`node.form.type = ${form['type']}`);
    //console.log(`node = ${torus.node}`);
    //console.log(`parent = ${torus.parent}`);

    // properties with defaults - 
    torus.phong = form['phong'] || false;
    torus.jsonmodel = form['jsonmodel'];  // default undefined
    torus.color = form['color'] || 0xffffff; // default undefined
    torus.emissive_color = form['emissive_color'] || 0x000000; // default undefined
    torus.emissiveIntensity = form['emissiveIntensity'] || 1;
    torus.specular_color = form['specular_color'] || 0xffffff; // default undefined
    torus.shininess = form['shininess'] || 30;
    torus.reflectivity = form['reflectivity'] || 1;
    torus.transparent = (form['transparent'] === undefined ? true : form['transparent']);
    torus.opacity = form['opacity'] || 1.0;
    torus.wireframe = form['wireframe'] || false;
    torus.fog = (form['fog'] === undefined ? true : form['fog']);
    torus.texture = form['texture'];  // default undefined
    torus.transform = torus.node['transform'] || {};

    // properties with defaults
    torus.radius = form['radius'] || 10;
    torus.tube = form['tube'] || 5;
    torus.arc = form['arc'] || Math.PI*2.0;
    torus.radialSegments = form['radialSegments'] || 8;
    torus.tubularSegments = form['tubularSegments'] || 6;

    // geometry
    torus.mesh_geometry();

    // material
    if(torus.texture !== undefined){
      torus.texture_material(torus.texture);
    }else{
      torus.basic_material();
    }
  }

  ngAfterViewInit() { console.log(`Torus ${torus.id} ngAfterViewInit`); }
  //ngOnDestroy() { console.log(`Torus ngOnDestroy`); }
}
