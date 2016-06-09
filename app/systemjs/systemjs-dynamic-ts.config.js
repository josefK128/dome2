System.config({
  transpiler: "typescript",
  typescriptOptions: {
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  // for systemjs to correctly substitute for truncatrd paths
  map: {
    'app' : './',
    'rxjs': '../node_modules/rxjs',
    '@angular'                         : '../node_modules/@angular'
  },

  // for systemjs to correctly substitute for implied files and/or ts/js
  packages: {
    'app'  : {main: 'modules-ts/main.ts', defaultExtension: 'ts'},
    'rxjs'                             : {main: 'index.js'},
    '@angular/core'                    : {main: 'index.js'},
    '@angular/common'                  : {main: 'index.js'},
    '@angular/compiler'                : {main: 'index.js'},
    '@angular/router'                  : {main: 'index.js'},
    '@angular/platform-browser'        : {main: 'index.js'},
    '@angular/platform-browser-dynamic': {main: 'index.js'}
  }
});
