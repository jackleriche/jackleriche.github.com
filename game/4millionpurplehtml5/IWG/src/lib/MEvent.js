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
    MEvent.SPLASHBUTTONCLICK        = { type: 'splashButtonClick'};
    MEvent.MAINGAMEINTRO            = {type: 'mainGameIntro'};
    MEvent.CHECKENDGAME             = {type: 'checkEndGame'};
    MEvent.ENDGAMEINTRO             = {type: 'endGameIntro'};

    // check game wins
    MEvent.CHECKMATCHTWOWIN         = {type: 'checkMatchTwoWin'};

    // swipe events
    MEvent.MOVELEFTSTART            = {type: 'moveLeftStart'};
    MEvent.MOVERIGHTSTART           = {type: 'moveRightStart'};
    MEvent.MOVELEFTCOMPLETE         = {type: 'moveLeftComplete'};
    MEvent.MOVERIGHTCOMPLETE        = {type: 'moveRightComplete'};
    MEvent.MATCHTWOREVEAL           = {type: 'matchTwoReveal'};
    MEvent.EQUALSSEVENREVEAL        = {type: 'equalsSevenReveal'};

    MEvent.MATCHONEREVEAL           = {type: 'matchOneReveal'};
    MEvent.MATCHONEMATCHREVEAL      = {type: 'matchOneMatchReveal'};

    // weight reveal
    MEvent.WEIGHTREVEAL             = {type: 'weightReveal'};

    // double match win
    MEvent.DOUBLEMATCHREVEAL        = {type: "doubleMatchReveal"}
    MEvent.DOUBLEMATCHMATCHREVEAL   = {type: "doubleMatchMatchReveal"}


    // prompts
    MEvent.RESETPROMPT              = {type: "resetPrompt"};

    // sound
    MEvent.TOGGLESOUND              = {type: "toggleSound"};



    //namespace path
    iwg._class("iwg.lib.MEvent", MEvent);
}(window));
