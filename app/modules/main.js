System.register(['@angular/platform-browser-dynamic', './components/narrative'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, narrative_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (narrative_1_1) {
                narrative_1 = narrative_1_1;
            }],
        execute: function() {
            // start application
            platform_browser_dynamic_1.bootstrap(narrative_1.Narrative, narrative_1.Narrative.provider_defaults);
        }
    }
});
