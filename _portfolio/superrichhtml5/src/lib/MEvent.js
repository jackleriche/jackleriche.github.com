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
	MEvent.SPLASHBUTTONCLICK 			= {type: 'splashButtonClick'};
	MEvent.MAINGAMEINTRO				= {type: 'mainGameIntro'};
	MEvent.CHECKENDGAME					= {type: 'checkEndGame'};
	MEvent.ENDGAMEINTRO					= {type: 'endGameIntro'};

	// check game wins
	MEvent.CHECKMATCHTWOWIN				= {type: 'checkMatchTwoWin'};

	// swipe events
	MEvent.MOVELEFT						= {type: 'moveLeft'};
	MEvent.MOVERIGHT					= {type: 'moveRight'};
	MEvent.MOVELEFTSTART				= {type: 'moveLeftStart'};
	MEvent.MOVERIGHTSTART				= {type: 'moveRightStart'};
	MEvent.MOVELEFTCOMPLETE				= {type: 'moveLeftComplete'};
	MEvent.MOVERIGHTCOMPLETE			= {type: 'moveRightComplete'};

	// reset prompt
	MEvent.RESETPROMPT					= {type: 'resetPrompt'};

	// toggle sounds
	MEvent.TOGGLESOUND					= {type: 'toggleSound'};

    //namespace path
    iwg._class("iwg.lib.MEvent", MEvent);
}(window));
