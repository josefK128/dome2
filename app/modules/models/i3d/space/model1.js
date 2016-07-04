System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model1;
    return {
        setters:[],
        execute: function() {
            exports_1("Model1", Model1 = { scene: {
                    name: 'scene1',
                    camerasphere: null,
                    visible: { csphere: 'on', key: 'on', fill: 'on', back: 'on' }
                },
                branches: {},
                actors: { sphere1: { radius: 5 },
                    sphere2: { radius: 10 }
                }
            });
        }
    }
});
