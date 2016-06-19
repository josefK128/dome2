System.config({
  transpiler: "typescript",
  typescriptOptions: {
    "target": "es5",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  // for systemjs to correctly substitute for truncated paths
  map: {
    'app' : './',
    'rxjs': '../node_modules/rxjs',
    'socket.io-client' : '../node_modules/socket.io-client/socket.io.js',
    '@angular'                         : '../node_modules/@angular'
  },

  // for systemjs to correctly substitute for implied files and/or ts/js
  packages: {
    'app'  : {main: 'modules/main.js', defaultExtension: 'js'},
    'socket.io-client' : {defaultExtension: 'js'},  // doesn't work ?!
    'rxjs'             : {defaultExtension: 'js'},  // doesn't work ?!
    '@angular/core'                    : {main: 'index.js'},
    '@angular/common'                  : {main: 'index.js'},
    '@angular/compiler'                : {main: 'index.js'},
    '@angular/router'                  : {main: 'index.js'},
    '@angular/platform-browser'        : {main: 'index.js'},
    '@angular/platform-browser-dynamic': {main: 'index.js'}
  }
});
