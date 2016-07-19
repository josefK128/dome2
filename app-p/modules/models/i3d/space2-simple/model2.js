System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model2;
    return {
        setters:[],
        execute: function() {
            exports_1("Model2", Model2 = { scene: {
                    name: 'scene2',
                    camera: null,
                    camerasphere: null,
                    visible: { csphere: 'on', key: 'on', fill: 'on', back: 'on' }
                },
                branches: {},
                actors: {
                    sphereA: { radius: 20 }
                }
            });
        }
    }
});
