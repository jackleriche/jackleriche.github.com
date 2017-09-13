//loader need to find a function at com.camelot.core.IWGInit(); so be able to start game.
//all game files should be in the namespace com.camelot.iwg

/// <reference path="../../typings/tsd.d.ts" />

module com.camelot.core {

    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAME = IWG.FrostyBingo,
        LIB = IWG.lib;

    export function IWGInit() {
        
        var pluginCount:number = 0;
        CORE.IWG.ame('plugin', {module: ['canvasstack_module_1']});
        IWG.IWGEM.on(CORE.IWGEVENT.PLUGIN_LOADED, pluginsLoaded);
        IWG.gameObjectsArray = [];
        IWG.scenesArray = [];
        
        function pluginsLoaded(evt) {
            pluginCount++;
            if (pluginCount === 1) {
                console.log("plugins loaded");
                 var Game = new GAME("FrostyBingo");
            }
        } // end pluginsLoaded
        
    }
}