System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model1;
    return {
        setters:[],
        execute: function() {
            // metaforms model
            exports_1("Model1", Model1 = { scene: {
                    name: 'scene1',
                    camerasphere: null,
                    visible: { csphere: 'on', key: 'on', fill: 'on', back: 'on' }
                },
                shot: {},
                branches: {},
                actors: [
                    { id: 'sphere1',
                        form: { radius: 5 },
                        transform: {},
                        children: [] },
                    { id: 'sphere2',
                        form: { radius: 10 },
                        transform: {},
                        children: [] }
                ] //actors
            }); //Model1
        }
    }
});
