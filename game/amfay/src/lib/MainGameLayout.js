(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        images          = core.iwgLoadQ.images,
        ImageSS         = lib.SS.ImageSS,
        NoteSS          = lib.SS.NoteSS,
        PrizeRevealSS   = lib.SS.PrizeRevealSS,
        Helper          = lib.Helper,
        Calendar        = lib.Calendar,
        Sound           = lib.Sound,
        Match           = lib.Match,
        EndGame         = lib.EndGame,
        Pause           = lib.Pause,
        Ticket          = lib.Ticket,
        MainGameLayout  = function (name) {

			if (!name){
                console.warn('MainGameLayout instance has no name');
                return false;
            }

            // singleton
            if (typeof MainGameLayout.instance === "object") {
                return MainGameLayout.instance;
            }
            MainGameLayout.instance = this;


		    var _instance       = this,
                _name           = name,
                _stage          = null,
                _canvas         = null,
                _active         = false,
                _height         = null,
                _width          = null,
                _endGameStart   = function() {
                    var logo    = _stage.getChildByName('logo');
                    _active     = true;
                    TweenMax.to(logo, 1, {alpha: 0, delay:0.5, onComplete: function() {
                            
                            TweenMax.delayedCall(1, 
                                function() {
                                    _active = false; 
                                }
                            );
                               
                    }});
                },
                _update         = function() {
                    if (_active) {
                        _stage.update();
                    }
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('endGame', _endGameStart);
                }(),
                _unsubscribe  = function() {

                }();

            // getters
            this.getStage   = function(){
                return _stage;
            };
            this.getCanvas  = function(){
                return _canvas;
            };
            this.getActive  = function(){
                return _active;
            };
            this.getHeight  = function(){
                return _height;
            };
            this.getWidth   = function(){
                return _width;
            };

            // setters
            this.setWidth   = function( prv ) {
                _width = prv;
            };
            this.setHeight  = function( prv ) {
                _height = prv;
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };

    	    core.IWG.ame('canvasStack', {
                create: _name,
                w: 960,
                h: 640,
                z: 6,
                parentDiv: "scaleDiv"
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();

        };

    function init() {

        setupLayout.bind(this)();
        
        this.getStage().update();

    }
    
 

    function setupLayout() {
        
        var logo            = Helper.makeBitmapImage("logo", { x: 40, y: 205}, 1, false, ImageSS),
            instructions    = Helper.makeBitmapImage("instructions", { x: 40, y:505 }, 1, false, ImageSS),
            gameHolder      = Helper.makeBitmapImage("gameholder", {x: 430, y: 40}, 1, false, ImageSS),
            sound           = new Sound("sound"),
            calendar        = new Calendar("calendar"),
            sound           = new Sound("sound"),
            endGame         = new EndGame('endGame'),
            pause           = new Pause('pause');
            
        // create matches
        var startX      	= 480,
            startY          = 430,
            ticketData      = Ticket.instance.getTurns().reverse();
            
        for (var i = 0; i < 4; i++){
            
            var turnData        = ticketData[i],
                symbol          = [ iconRef[turnData.s0], iconRef[turnData.s1], iconRef[turnData.s2] ],
                prize           = prizeRef[Ticket.instance.getParams().pList[turnData.p]];
            
            var match   	    = new Match('match'+i);
            match.setMatchAmount(3);
            
            var icon            = Helper.makeBitmapImage('note_0', {x: 60, y: 80}, 1, true, NoteSS);
            match.setIcon(icon);
            match.setIconRevealAnimation("reveal");
            
            var symbol0      	= Helper.makeBitmapImage(symbol[0], {x: 60, y: 100}, 1, true, ImageSS),
                symbol1      	= Helper.makeBitmapImage(symbol[1], {x: 60, y: 100}, 1, true, ImageSS),
                symbol2      	= Helper.makeBitmapImage(symbol[2], {x: 60, y: 100}, 1, true, ImageSS);
                
            match.setSymbol([symbol0, symbol1, symbol2]);
            
            var prizeIcon       = Helper.makeBitmapImage('prize_word', {x: 60, y: 80}, 1, true, PrizeRevealSS);
            match.setPrizeIcon(prizeIcon);
            match.setPrizeRevealAnimation("prizeReveal");
            
            var prizeSymbol     = Helper.makeBitmapImage(prize, {x: 60, y: 80}, 1, true, ImageSS);
            match.setPrizeSymbol(prizeSymbol);
            
            match.setSeperationAmount(110);
            
            match.setup();
            
            match.setPosition({x: startX - 47, y: startY - ( 139 * i)});
            
            var symbolArray     = [turnData.s0, turnData.s1, turnData.s2];
            if ( symbolArray.allValuesMatch() ) {
                match.setWinner(true);
                match.setPrizeValue(Ticket.instance.getParams().pList[turnData.p]); 
            };
            
        }

        // setup sound
        sound.setPosition({ x: 15, y: 450 });

        pause.setPosition({x: -200, y: -200});
        
        this.getStage().addChild(logo, instructions, gameHolder );
        calendar.start();

        iwg.IWGEM.trigger('promptStart');

    }

    MainGameLayout.prototype.destroy = function() {
        this.unsubscribe();
    };

    MainGameLayout.VERSION = '0_0_1';

    IWGInit = function () {
        _MainGameLayout = new MainGameLayout();
    };

    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));
