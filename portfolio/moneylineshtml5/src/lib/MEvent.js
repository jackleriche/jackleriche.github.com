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
    MEvent.VERSION = '0_0_0';

    // Start Game
    MEvent.STARTGAME = {
        type: 'startGame'
    };
    MEvent.ENDGAME = {
        type: 'endGame'
    };

    // add turn
    MEvent.ADDTURN = {
        type: 'addTurn'
    };

    //static variable
    MEvent.MOVERIGHT = {
        type: 'moveRight'
    };
    MEvent.MOVELEFT = {
        type: 'moveLeft'
    };
    MEvent.CHECKENDGAME = {
        type: 'checkEndGame'
    };

    MEvent.ENABLETOUCH = {
        type: 'enableTouch'
    };
    MEvent.DISABLETOUCH = {
        type: 'disableTouch'
    };

    // legend
    MEvent.LEGENDENDTURN = {
        type: 'legendEndTurn'
    };

    // tile revealed
    MEvent.TILEREVEALED = {
        type: 'tileRevealed'
    };
    MEvent.TILEISREVEALING = {
        type: 'tileIsRevealing'
    };
    MEvent.REVEALING = {
        type: 'revealing'
    };
    MEvent.CORNERWIN = {
        type: 'cornerWin'
    };
    MEvent.WINREVEAL = {
        type: 'winReveal'
    };


    // throttle
    MEvent.THROTTLE = {
        type: 'throttle'
    };

    // end game message
    MEvent.SHOWENDGAMEMESSAGE = {
        type: 'showEndGameMessage'
    };

    // swipe prompt
    MEvent.SWIPEPROMPT = {
        type: 'swipePrompt'
    };

    // toggleSound
    MEvent.TOGGLESOUND = {
        type: 'toggleSound'
    };








    //namespace path
    iwg._class("iwg.lib.MEvent", MEvent);
}(window));
