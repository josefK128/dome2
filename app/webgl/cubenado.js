// simple-scene3d.js
// plane_tetrahedra_sphere
var Scene = (function(){
  'use strict';

  var scene;
  var gui;
  var params;
  var text;
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
  // particlesystem vars
  var particleSystem;
  var tick = 0;
  var clock = new THREE.Clock(true);
  var options;
  var spawnerOptions;
  var controls;
  var r = 0.0;
  var s = 0.0;
  var y = 0.0;
  var TWOPI = 6.28;


  // scene
  scene = new THREE.Scene();

  // coordinate axes 
  axes = new THREE.AxisHelper(3000);
  scene.add(axes);

  // create the ground plane
//  planeGeometry = new THREE.PlaneGeometry(100,60); // 60,20
//  //planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffaa,  
//  planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,  
//    transparent:true, opacity:0.8});
//  plane = new THREE.Mesh(planeGeometry,planeMaterial);
//  plane.material.side = THREE.DoubleSide;
//  // rotate and position the plane
//  //plane.rotation.x=-0.5*Math.PI;
//  plane.rotation.x=-0.45*Math.PI;
//  plane.position.x=15;
//  plane.position.y=-0.1;
//  plane.position.z=0;
//  // add the plane to the scene
//  scene.add(plane);
//
//  // create a cube
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
  //scene.fog = new THREE.FogExp2( 0xcccccc, 0.03 );

  // lights
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );

  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );


  // GPU particlesystem - init
  // The GPU Particle system extends THREE.Object3D, and so you can use it
  // as you would any other scene graph component.	Particle positions will be
  // relative to the position of the particle system, but you will probably only need one
  // system for your whole scene
  particleSystem = new THREE.GPUParticleSystem({
  	maxParticles: 10000,
        texture: 'images/p2.jpg'
  });
  scene.add( particleSystem);
  console.log("created & added to scene particlesystem with texture 'p2.jpg'");

  // options passed during each spawned
  options = {
  	position: new THREE.Vector3(0.0, -50.0, 0.0),
  	positionRandomness: .3,
  	velocity: new THREE.Vector3(1.0, 1.0, 1.0),  // was 0,0,0
  	velocityRandomness: .5,
  	color: 0xaa88ff,
  	colorRandomness: .2,
  	turbulence: .5,
  	lifetime: 2,
  	size: 5,
  	sizeRandomness: 1
  };
  spawnerOptions = {
  	spawnRate: 100,         // temp!!!!!!!!! later - count
  	horizontalSpeed: 1.5,
  	verticalSpeed: 1.33,
  	timeScale: 1
  }

  // small gui (2 controls)
//  gui = new DAT.GUI({
//    height: 3*32-1  // nlines*32-1
//  });
//  params = {
//    NOTE: 'focus/L-mouse to move slider',
//    cubes: 1000,
//    randomness: 0.5
//  };
//  gui.add(params, 'NOTE');
//  gui.add(params, 'cubes').min(10).max(10000).step(10).onFinishChange(function(){
//    console.log(`params.cubes = ${params.cubes}`);
//  });
//  gui.add(params, 'randomness').min(0).max(1.0).step(0.1).onFinishChange(function(){
//    console.log(`params.randomness = ${params.randomness}`);
//  });

  // large gui (9 controls)
  gui = new DAT.GUI({
    height: 9*32-1  // nlines*32-1
  });
  gui.add(options, "velocityRandomness", 0, 3);
  gui.add(options, "positionRandomness", 0, 3);
  gui.add(options, "size", 1, 20);
  gui.add(options, "sizeRandomness", 0, 25);
  gui.add(options, "colorRandomness", 0, 1);
  gui.add(options, "lifetime", .1, 10);
  gui.add(options, "turbulence", 0, 1);
  gui.add(spawnerOptions, "spawnRate", 10, 10000);  // 10, 30000
  gui.add(spawnerOptions, "timeScale", -1, 1);


  // push specific animation for particle system to array of
  // frame-update animations called from Camera3D in its animation loop
  if(!scene['animations']){
    scene['animations'] = [];
  }
  scene['animations'].push( function(){
    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;
    if (tick < 0) tick = 0;
    if (delta > 0) {
      if(y > 50.0){
        y = -50 + Math.random();
        r = 2.0 + Math.random();
        s = Math.random();
      }else{
        r += 2.0 * Math.random();
        s += 0.1 * Math.random();
        y += 4.0 * spawnerOptions.verticalSpeed * Math.max(r,s);   // was 4.0
      }
      options.position.x = r*Math.sin(s * TWOPI);
      options.position.y = y;                   
      options.position.x = r*Math.cos(s * TWOPI);

      for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
    	// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
    	// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
    	particleSystem.spawnParticle(options);
      }
    }
    particleSystem.update(tick);
  });

  // return composed scene
  return scene;
})();
