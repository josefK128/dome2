//Cube leaf-component
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


//instance
var cube;



@Component({
  selector: 'cube',
  template: ``    
})
export class Cube {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid:string;
  camera3d:Camera3d;
  transform3d:Transform3d;
  textures:Textures;

  width: number;
  height: number;
  depth: number;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
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
    cube = this;
    cube.camera3d = camera3d;
    cube.transform3d = transform3d;
    cube.textures = textures;
  }


  mesh_geometry(){
    console.log('Cube mesh_geometry()');
    cube.geometry = new THREE.BoxGeometry(cube.width, cube.height, cube.depth, 
             cube.widthSegments, cube.heightSegments, cube.depthSegments);
  }


  basic_material() {
    console.log('Cube basic_material()');

    if(cube.phong){
      cube.material = new THREE.MeshPhongMaterial( { 
        specular: cube.specular_color,
        emissive: cube.emissive_color,
        emissiveIntensity: cube.emissiveIntensity,
        shininess: cube.shininess,
        reflectivity: cube.reflectivity,
        fog: cube.fog,
        shading: THREE.FlatShading } );
    }else{
      cube.material = new THREE.MeshBasicMaterial({
        color: cube.color, 
        transparent: cube.transparent, 
        opacity: cube.opacity, 
        wireframe:cube.wireframe});
    }

    // three.js blending<br>
    // * NOTE! - brightening of opaque image intersections 
    //   sometimes occurs (?!)<br>
    //   This should NOT occur with the following:<br>
    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    // * NOTE! brightening does occur with:<br>
    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
    cube.material.depthTest = false;
    cube.material.blending = THREE.CustomBlending;
    cube.material.blendSrc = THREE.SrcAlphaFactor;
    //cube.material.blendDst = THREE.DstAlphaFactor;
    cube.material.blendDst = THREE.OneMinusSrcAlphaFactor;
    cube.material.blendEquation = THREE.AddEquation; // default

    cube.realize();
  }


  texture_material(texture:Object) {
    var name = Object.keys(texture)[0],
        path = texture[name];
        
    console.log('Cube texture_material()');
    cube.textures.get(name, path).then((material) => {
      cube.material = material;
      cube.realize();
    });
  }


  // write to THREE.js scene
  realize() {
    console.log(`%%%% Cube realize: writing cube to scene`); 

    // create a webgl sphere-node
    cube.o3d = new THREE.Mesh(cube.geometry, cube.material);
    cube.o3d.material.side = THREE.DoubleSide;
  
    // add the Object3d to the scene and store in Camera3d actors by id
    cube.camera3d.addActorToScene(cube.id, cube.o3d, cube.pid);
  
    // transform sphere - relative to parent in THREE.js scene !!!
    cube.transform3d.apply(cube.transform, cube.o3d);
  }



  // ordered sequence of component lifecycle phase-transitions:
  //ngOnChanges() { console.log(`Cube ngOnChanges`); }
  ngOnInit() { 
    var form = cube.node['form'];

    cube.pid = cube.parent['id'];
    console.log(`%%%% ngOnInit - Cube id=${cube.id} pid=${cube.pid}`); 
    console.log(`node.form.type = ${form['type']}`);
    //console.log(`node = ${cube.node}`);
    //console.log(`parent = ${cube.parent}`);

    // properties with defaults
    cube.width = form['width'] || 5;
    cube.height = form['height'] || 10;
    cube.depth = form['depth'] || 5;
    cube.widthSegments = form['widthSegments'] || 1;
    cube.heightSegments = form['heightSegments'] || 1;
    cube.depthSegments = form['depthSegments'] || 1;
    cube.color = form['color'] || 'red';
    cube.transparent = form['transparent'] || true;
    cube.opacity = form['opacity'] || 1.0;
    cube.wireframe = form['wireframe'] || false;
    cube.phong = form['phong'] || false;
    cube.emissive_color = form['emissive_color'] || 0x000000; // default undefined
    cube.emissiveIntensity = form['emissiveIntensity'] || 1;
    cube.specular_color = form['specular_color'] || 0xffffff; // default undefined
    cube.shininess = form['shininess'] || 30;
    cube.reflectivity = form['reflectivity'] || 1;
    cube.fog = (form['fog'] === undefined ? true : form['fog']);
    cube.texture = form['texture'];  // default undefined
    cube.transform = cube.node['transform'] || {};

    // geometry
    cube.mesh_geometry();

    // material
    if(cube.texture !== undefined){
      cube.texture_material(cube.texture);
    }else{
      cube.basic_material();
    }
  }

  ngAfterViewInit() { console.log(`Cube ngAfterViewInit`); }
  //ngOnDestroy() { console.log(`Cube ngOnDestroy`); }
}
