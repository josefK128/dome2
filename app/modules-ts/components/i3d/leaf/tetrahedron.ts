// Tetrahedron leaf-component
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
var tetra;



@Component({
  selector: 'tetrahedron',
  template: '',
  providers: []
})
export class Tetrahedron {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid: string;
  camera3d:Camera3d;
  transform3d:Transform3d;
  textures:Textures;

  radius: number;
  detail: number;
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
    tetra = this;
    tetra.camera3d = camera3d;
    tetra.transform3d = transform3d;
    tetra.textures = textures;
  }


  mesh_geometry(){
    console.log('Tetrahedron mesh_geometry()');
    tetra.geometry = new THREE.TetrahedronGeometry(tetra.radius, tetra.detail);
  }


  basic_material() {
    console.log('Tetrahedron basic_material()');

    if(tetra.phong){
      tetra.material = new THREE.MeshPhongMaterial( { 
        specular: tetra.specular_color,
        emissive: tetra.emissive_color,
        emissiveIntensity: tetra.emissiveIntensity,
        shininess: tetra.shininess,
        reflectivity: tetra.reflectivity,
        fog: tetra.fog,
        shading: THREE.FlatShading } );
    }else{
      tetra.material = new THREE.MeshBasicMaterial({
        color: tetra.color, 
        transparent: tetra.transparent, 
        opacity: tetra.opacity, 
        wireframe:tetra.wireframe});
    }

    // three.js blending<br>
    // * NOTE! - brightening of opaque image intersections 
    //   sometimes occurs (?!)<br>
    //   This should NOT occur with the following:<br>
    //   tetrahedronMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    // * NOTE! brightening does occur with:<br>
    //   tetrahedronMaterial.blendDst = THREE.DstAlphaFactor;
    tetra.material.depthTest = false;
    tetra.material.blending = THREE.CustomBlending;
    tetra.material.blendSrc = THREE.SrcAlphaFactor;
    //tetra.material.blendDst = THREE.DstAlphaFactor;
    tetra.material.blendDst = THREE.OneMinusSrcAlphaFactor;
    tetra.material.blendEquation = THREE.AddEquation; // default

    tetra.realize();
  }


  texture_material(texture:Object) {
    var name = Object.keys(texture)[0],
        path = texture[name];
        
    console.log('Tetrahedron texture_material()');
    tetra.textures.get(name, path).then((material) => {
      tetra.material = material;
      tetra.realize();
    });
  }


  // write to THREE.js scene
  realize() {
    console.log(`%%%% Tetrahedron realize: writing tetrahedron to scene`); 

    // create a webgl tetrahedron-node
    tetra.o3d = new THREE.Mesh(tetra.geometry, tetra.material);
    tetra.o3d.material.side = THREE.DoubleSide;
  
    // add the Object3d to the scene and store in Camera3d actors by id
    tetra.camera3d.addActorToScene(tetra.id, tetra.o3d, tetra.pid);
  
    // transform tetrahedron - relative to parent in THREE.js scene !!!
    tetra.transform3d.apply(tetra.transform, tetra.o3d);
  }


  // ordered sequence of component lifecycle phase-transitions:
  // ngOnChanges() { console.log(`Tetrahedron ngOnChanges`); }
  // calculate properties of tetrahedron from model on node
  ngOnInit() { 
    var form = tetra.node['form'];

    tetra.pid = tetra.parent['id'];
    console.log(`%%%% ngOnInit - Tetrahedron id=${tetra.id} pid=${tetra.pid}`); 
    console.log(`node.form.type = ${form['type']}`);
    //console.log(`node = ${tetra.node}`);
    //console.log(`parent = ${tetra.parent}`);

    // properties with defaults
    tetra.radius = form['radius'] || 10;
    tetra.detail = form['detail'] || 0;
    tetra.texture = form['texture'];  // default undefined
    tetra.color = form['color'] || 'red';
    tetra.transparent = form['transparent'] || true;
    tetra.opacity = form['opacity'] || 1.0;
    tetra.wireframe = form['wireframe'] || false;
    tetra.phong = form['phong'] || false;
    tetra.emissive_color = form['emissive_color'] || 0x000000; // default undefined
    tetra.emissiveIntensity = form['emissiveIntensity'] || 1;
    tetra.specular_color = form['specular_color'] || 0xffffff; // default undefined
    tetra.shininess = form['shininess'] || 30;
    tetra.reflectivity = form['reflectivity'] || 1;
    tetra.fog = (form['fog'] === undefined ? true : form['fog']);
    tetra.transform = tetra.node['transform'] || {};

    // geometry
    tetra.mesh_geometry();

    // material
    if(tetra.texture !== undefined){
      tetra.texture_material(tetra.texture);
    }else{
      tetra.basic_material();
    }
  }
  
//  ngDoCheck() { console.log(`Tetrahedron ngDoCheck`); }
//  ngAfterContentInit() { console.log(`Tetrahedron ngAfterContentInit`); }
//  ngAfterContentChecked() {console.log(`Tetrahedron ngAfterContentChecked`);}
  ngAfterViewInit() { console.log(`Tetrahedron ngAfterViewInit`); }
//  ngAfterViewChecked() { console.log(`Tetrahedron ngAfterViewChecked`); }
  ngOnDestroy() { console.log(`Tetrahedron ngOnDestroy`); }
}
