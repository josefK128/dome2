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
