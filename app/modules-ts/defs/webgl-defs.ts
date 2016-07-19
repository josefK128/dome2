export var fsh = `
precision highp float;
varying vec2 vUv;
uniform float color;
uniform sampler2D map;
void main(void){
  gl_FragColor = texture2D(map, vUv);
  //gl_FragColor = vec4(vec3(color), 1.0);   // rgb, alpha
}
`;

export var fsh_filter = `
precision highp float;
varying vec2 vUv;
uniform float color;
uniform sampler2D map;
void main(void){
  // 1
  gl_FragColor = texture2D(map, vUv).bgra;

  // 2
  //if(vUv[0] >= vUv[1]){
  //  gl_FragColor = texture2D(map, vUv);
  //}else{
  //  gl_FragColor = texture2D(map, vUv).bgra;
  //}

  // 3
  //gl_FragColor = vec4(vec3(color), 1.0);   // rgb, alpha
}
`;

export var Escher_png;
(new THREE.TextureLoader()).load('./images/Escher.png', function(texture){
  Escher_png = texture;
});

export var glad_png; 
(new THREE.TextureLoader()).load('./images/glad.png', function(texture){
  glad_png = texture;
});

export var sky_jpg;
(new THREE.TextureLoader()).load('./images/sky.jpg', function(texture){
  sky_jpg = texture;
});

export var vsh = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}  
`;


