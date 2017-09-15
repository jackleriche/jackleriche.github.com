(function (window) {
    "use strict";
    //set local paths to external files.
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        GS = window.com.greensock,
        MEvent = function () {
            //singletonCache
            if (typeof MEvent.instance === "object") {
                return MEvent.instance;
            }
            //singleton instance
            MEvent.instance = this;
        },
        //make instance if needed
        _MEvent = new MEvent();
    MEvent.VERSION = '0_0_1';

    // Start Game
    MEvent.SPLASHBUTTONCLICK        = {type: 'splashButtonClick'};
    MEvent.MAINGAMEINTRO            = {type: 'mainGameIntro'};
    MEvent.CHECKENDGAME             = {type: 'checkEndGame'};
    MEvent.ENDGAMEINTRO             = {type: 'endGameIntro'};
    
    MEvent.CHECKISFINISHED          = {type: "checkIsFinished"};
    
    // check game wins  
    MEvent.CHECKMATCH               = {type: 'checkMatch'};

    
    // sound
    MEvent.TOGGLESOUND              = {type: "toggleSound"};
    
    MEvent.PROMPT                   = {type: "prompt"};



    //namespace path
    iwg._class("iwg.lib.MEvent", MEvent);
}(window));