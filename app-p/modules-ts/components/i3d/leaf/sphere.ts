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
  transform: Object;
  material: THREE.Material;
  geometry: THREE.Geometry;
  o3d:THREE.Object3d;


  constructor(camera3d: Camera3d, transform3d:Transform3d, textures:Textures) {
    this.camera3d = camera3d;
    this.transform3d = transform3d;
    this.textures = textures;
  }


  mesh_geometry(){
    console.log('Sphere mesh_geometry()');
    this.geometry = new THREE.SphereGeometry(this.radius, this.widthSegments,
                                            this.heightSegments);
  }


  basic_material() {
    console.log('Sphere basic_material()');
    this.material = new THREE.MeshBasicMaterial({
      color: this.color, 
      transparent: this.transparent, 
      opacity: this.opacity, 
      wireframe:this.wireframe});

    // three.js blending<br>
    // * NOTE! - brightening of opaque image intersections 
    //   sometimes occurs (?!)<br>
    //   This should NOT occur with the following:<br>
    //   sphereMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    // * NOTE! brightening does occur with:<br>
    //   sphereMaterial.blendDst = THREE.DstAlphaFactor;
    this.material.depthTest = false;
    this.material.blending = THREE.CustomBlending;
    this.material.blendSrc = THREE.SrcAlphaFactor;
    //this.material.blendDst = THREE.DstAlphaFactor;
    this.material.blendDst = THREE.OneMinusSrcAlphaFactor;
    this.material.blendEquation = THREE.AddEquation; // default

    this.realize();
  }


  texture_material(texture:Object) {
    var name = Object.keys(texture)[0],
        path = texture[name];
        
    console.log('Sphere texture_material()');
    this.textures.get(name, path).then((material) => {
      this.material = material;
      this.realize();
    });
  }


  // write to THREE.js scene
  realize() {
    console.log(`%%%% Sphere realize: writing sphere to scene`); 

    // create a webgl sphere-node
    this.o3d = new THREE.Mesh(this.geometry, this.material);
    this.o3d.material.side = THREE.DoubleSide;
  
    // add the Object3d to the scene and store in Camera3d actors by id
    this.camera3d.addActorToScene(this.id, this.o3d, this.pid);
  
    // transform sphere - relative to parent in THREE.js scene !!!
    this.transform3d.apply(this.transform, this.o3d);
  }


  // ordered sequence of component lifecycle phase-transitions:
  // ngOnChanges() { console.log(`Sphere ngOnChanges`); }
  // calculate properties of sphere from model on node
  ngOnInit() { 
    var form = this.node['form'];

    this.pid = this.parent['id'];
    console.log(`%%%% ngOnInit - Sphere id=${this.id} pid=${this.pid}`); 
    console.log(`node.form.type = ${form['type']}`);
    console.log(`node.form.color = ${form['color']}`);
    //console.log(`node = ${this.node}`);
    //console.log(`parent = ${this.parent}`);

    // properties with defaults
    this.radius = form['radius'] || 10;
    this.widthSegments = form['widthSegments'] || 8;
    this.heightSegments = form['heightSegments'] || 6;
    this.texture = form['texture'];  // default undefined
    this.color = form['color'] || 'red';
    this.transparent = form['transparent'] || true;
    this.opacity = form['opacity'] || 1.0;
    this.wireframe = form['wireframe'] || false;
    this.transform = this.node['transform'] || {};

    // geometry
    this.mesh_geometry();

    // material
    if(this.texture !== undefined){
      this.texture_material(this.texture);
    }else{
      this.basic_material();
    }
  }
  

  ngAfterViewInit() { console.log(`Sphere ngAfterViewInit`); }
  //ngOnDestroy() { console.log(`Sphere ngOnDestroy`); }
}
