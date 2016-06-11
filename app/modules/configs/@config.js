// simple-config.ts
// use OpaqueToken CONFIG in provide(CONFIG, {useValue: config})
// where config is the const implementation of the interface Config
System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var CONFIG, PI, config;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("CONFIG", CONFIG = new core_1.OpaqueToken('simple'));
            // provider override experiment - no effect
            PI = new core_1.OpaqueToken('pi');
            exports_1("config", config = {
                url_pattern: '{scene}/{i3d}/{shot}/',
                url_keys: ['scene', 'i3d', 'shot'],
                canvas_id: '3D',
                opening_scene: 'opening',
                scene: Scene,
                test: false,
                name: 'dome2',
                server_host: 'localhost',
                server_port: 8080,
                provider_defaults: [core_1.provide(PI, { useValue: 3.14 })]
            });
        }
    }
});
