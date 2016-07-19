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
