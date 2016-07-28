// Sphere leaf-component
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
var sphere;



@Component({
  selector: 'sphere',
  template: '',
  providers: []
})
export class Sphere {
  @Input() model: Object;
  @Input() node: Object;
  @Input() parent: Object;
  @Input() id: string;
  pid: string;
  camera3d:Camera3d;
  transform3d:Transform3d;
  textures:Textures;

  radius: number;
  widthSegments: number;
  heightSegments: number;
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
    sphere = this;
    sphere.camera3d = camera3d;
    sphere.transform3d = transform3d;
    sphere.textures = textures;
  }


  mesh_geometry(){
    console.log('Sphere mesh_geometry()');
    sphere.geometry = new THREE.SphereGeometry(sphere.radius, sphere.widthSegments,
                                            sphere.heightSegments);
  }


  basic_material() {
    console.log('Sphere basic_material()');

    if(sphere.phong){
      sphere.material = new THREE.MeshPhongMaterial( { 
        specular: sphere.specular_color,
        emissive: sphere.emissive_color,
        emissiveIntensity: sphere.emissiveIntensity,
        shininess: sphere.shininess,
        reflectivity: sphere.reflectivity,
        fog: sphere.fog,
        shading: THREE.FlatShading } );
    }else{
      sphere.material = new THREE.MeshBasicMaterial({
        color: sphere.color, 
        transparent: sphere.transparent, 
        opacity: sphere.opacity, 
        wireframe:sphere.wireframe});
    }

    // three.js blending<br>
    // * NOTE! - brightening of opaque image intersections 
    //   sometimes occurs (?!)<br>
    //   This should NOT occur with the following:<br>
    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    // * NOTE! brightening does occur with:<br>
    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
    sphere.material.depthTest = false;
    sphere.material.blending = THREE.CustomBlending;
    sphere.material.blendSrc = THREE.SrcAlphaFactor;
    //sphere.material.blendDst = THREE.DstAlphaFactor;
    sphere.material.blendDst = THREE.OneMinusSrcAlphaFactor;
    sphere.material.blendEquation = THREE.AddEquation; // default

    sphere.realize();
  }


  texture_material(texture:Object) {
    var name = Object.keys(texture)[0],
        path = texture[name];
        
    console.log('Sphere texture_material()');
    sphere.textures.get(name, path).then((material) => {
      sphere.material = material;
      sphere.realize();
    });
  }


  // write to THREE.js scene
  realize() {
    console.log(`%%%% Sphere realize: writing sphere to scene`); 

    // create a webgl sphere-node
    sphere.o3d = new THREE.Mesh(sphere.geometry, sphere.material);
    sphere.o3d.material.side = THREE.DoubleSide;
  
    // add the Object3d to the scene and store in Camera3d actors by id
    sphere.camera3d.addActorToScene(sphere.id, sphere.o3d, sphere.pid);
  
    // transform sphere - relative to parent in THREE.js scene !!!
    sphere.transform3d.apply(sphere.transform, sphere.o3d);
  }


  // ordered sequence of component lifecycle phase-transitions:
  // ngOnChanges() { console.log(`Sphere ngOnChanges`); }
  // calculate properties of sphere from model on node
  ngOnInit() { 
    var form = sphere.node['form'];

    sphere.pid = sphere.parent['id'];
    console.log(`%%%% ngOnInit - Sphere id=${sphere.id} pid=${sphere.pid}`); 
    console.log(`node.form.type = ${form['type']}`);
    console.log(`node.form.color = ${form['color']}`);
    //console.log(`node = ${sphere.node}`);
    //console.log(`parent = ${sphere.parent}`);

    // properties with defaults
    sphere.radius = form['radius'] || 10;
    sphere.widthSegments = form['widthSegments'] || 8;
    sphere.heightSegments = form['heightSegments'] || 6;
    sphere.texture = form['texture'];  // default undefined
    sphere.color = form['color'] || 'red';
    sphere.transparent = form['transparent'] || true;
    sphere.opacity = form['opacity'] || 1.0;
    sphere.wireframe = form['wireframe'] || false;
    sphere.phong = form['phong'] || false;
    sphere.emissive_color = form['emissive_color'] || 0x000000; // default undefined
    sphere.emissiveIntensity = form['emissiveIntensity'] || 1;
    sphere.specular_color = form['specular_color'] || 0xffffff; // default undefined
    sphere.shininess = form['shininess'] || 30;
    sphere.reflectivity = form['reflectivity'] || 1;
    sphere.fog = (form['fog'] === undefined ? true : form['fog']);
    sphere.transform = sphere.node['transform'] || {};

    // geometry
    sphere.mesh_geometry();

    // material
    if(sphere.texture !== undefined){
      sphere.texture_material(sphere.texture);
    }else{
      sphere.basic_material();
    }
  }
  

  ngAfterViewInit() { console.log(`Sphere ngAfterViewInit`); }
  //ngOnDestroy() { console.log(`Sphere ngOnDestroy`); }
}
