// simple-scene3d.js
// plane_tetrahedra_sphere
var Scene = (function(){
  'use strict';

  var scene;
  var axes;
  var planeGeometry;
  var planeMaterial;
  var plane;
  var cubeGeometry;
  var cubeMaterial;
  var cube;
  var sphereGeometry;
  var sphereMaterial;
  var sphere;
  var geometry;
  var material;
  var mesh;
  var light;


  // scene
  scene = new THREE.Scene();

  // coordinate axes 
  axes = new THREE.AxisHelper(3000);
  scene.add(axes);

  // create the ground plane
  planeGeometry = new THREE.PlaneGeometry(100,60); // 60,20
  //planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffaa,  
  planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,  
    transparent:true, opacity:0.8});
  plane = new THREE.Mesh(planeGeometry,planeMaterial);
  plane.material.side = THREE.DoubleSide;
  // rotate and position the plane
  //plane.rotation.x=-0.5*Math.PI;
  plane.rotation.x=-0.45*Math.PI;
  plane.position.x=15;
  plane.position.y=-0.1;
  plane.position.z=0;
  // add the plane to the scene
  scene.add(plane);

  // create a cube
  cubeGeometry = new THREE.BoxGeometry(4,4,4);
  cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // position the cube
  cube.position.x=-4;
  cube.position.y=3;
  cube.position.z=20;
  // add the cube to the scene
  scene.add(cube);

  // create a sphere
  sphereGeometry = new THREE.SphereGeometry(4,20,20);
  sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
  sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  // position the sphere
  sphere.position.x=20;
  sphere.position.y=4;
  sphere.position.z=2;
  // add the sphere to the scene
  scene.add(sphere);

  // fog
  //scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  // lights
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );

  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  // return composed scene
  return scene;
})();
