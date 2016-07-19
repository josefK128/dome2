System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var fsh, fsh_filter, Escher_png, glad_png, sky_jpg, vsh;
    return {
        setters:[],
        execute: function() {
            exports_1("fsh", fsh = `
precision highp float;
varying vec2 vUv;
uniform float color;
uniform sampler2D map;
void main(void){
  gl_FragColor = texture2D(map, vUv);
  //gl_FragColor = vec4(vec3(color), 1.0);   // rgb, alpha
}
`);
            exports_1("fsh_filter", fsh_filter = `
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
`);
            (new THREE.TextureLoader()).load('./images/Escher.png', function (texture) {
                exports_1("Escher_png", Escher_png = texture);
            });
            (new THREE.TextureLoader()).load('./images/glad.png', function (texture) {
                exports_1("glad_png", glad_png = texture);
            });
            (new THREE.TextureLoader()).load('./images/sky.jpg', function (texture) {
                exports_1("sky_jpg", sky_jpg = texture);
            });
            exports_1("vsh", vsh = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}  
`);
        }
    }
});
