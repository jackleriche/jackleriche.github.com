//loader need to find a function at com.camelot.core.IWGInit(); so be able to start game.
//all game files should be in the namespace com.camelot.iwg
/// <reference path="../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var core;
        (function (core) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAME = IWG.LottoDrop, LIB = IWG.lib;
            function IWGInit() {
                var pluginCount = 0;
                CORE.IWG.ame('plugin', { module: ['canvasstack_module_1'] });
                CORE.iwgLoadQ.installPlugin(createjs.Sound);
                createjs.Sound.alternateExtensions = ["ogg"];
                IWG.IWGEM.on(CORE.IWGEVENT.PLUGIN_LOADED, pluginsLoaded);
                IWG.gameObjectsArray = [];
                IWG.scenesArray = [];
                function pluginsLoaded(evt) {
                    pluginCount++;
                    if (pluginCount === 1) {
                        console.log("plugins loaded");
                        var Game = new GAME("LottoDrop");
                    }
                }
            }
            core.IWGInit = IWGInit;
        })(core = camelot.core || (camelot.core = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=IWGinit.js.map