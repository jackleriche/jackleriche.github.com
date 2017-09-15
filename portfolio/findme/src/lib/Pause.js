(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Board			= lib.Board,
        Pause = function (name) {

            var _instance       = this,
                _name           = name,
                _canvas         = null,
                _stage          = null,
                _active         = false,
                _enabled        = false,
                _position       = {
                    x: 0,
                    y: 0
                },
                /*
                 *  name:           _gamePause
                 *  description:    method called when game is paused
                 *  params:         null
                 *  returns:        null
                 */
                _gamePause     = function() {
                    // show pause screen
                    _active = true;
                    TweenMax.set(_canvas, { scale: 1});
                    TweenMax.set(_stage, { alpha: 1});
                    if (Board.instance.getState() === "showRemainingTokens"){
	                    Board.instance.getRemainingTimeline().pause();
	                }
                    _active = false;
                },
                /*
                 *  name:           _gamePlay
                 *  description:    method called when game is resumed
                 *  params:         null
                 *  returns:        null
                 */
                _gamePlay     = function() {
                    // hide pause screen
                    _active = true;
                    TweenMax.set(_canvas, { scale: 0});
                    TweenMax.set(_stage, { alpha: 0});
                    // continue remaining token array animation
		            if (Board.instance.getState() === "showRemainingTokens"){
			        	Board.instance.getRemainingTimeline().play();    
		            }
		            _active = false;

                    createjs.Sound.setMute(false);
                    
                    // continue timer if panel is not showing
                    if ( Board.instance.getState() !== "panelShowing") {
                        iwg.IWGEM.trigger("gamePlay");   
                    };		            
                },
                _update         = function() {
                    if (_active) {
                        _stage.update();
                    }
                },
                _subcribe       = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('showPauseScreen', _gamePause);
                    iwg.IWGEM.on('hidePauseScreen', _gamePlay);
                    iwg.IWGEM.on('fadeStartPauseScreen', _gamePlay);
                    iwg.IWGEM.on(core.IWGEVENT.PAUSE, pauseGame);
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('showPauseScreen');
                    iwg.IWGEM.off('hidePauseScreen');
                    iwg.IWGEM.off('fadeStartPauseScreen');
                    iwg.IWGEM.off(core.IWGEVENT.PAUSE);
                };

                // getters
                this.getStage       = function() {
                    return _stage;
                };
                this.getCanvas      = function() {
                    return _canvas;
                };
                this.getActive      = function() {
                    return _active;
                };
                this.getEnabled     = function() {
                    return _enabled;
                };
                this.getHeight      = function() {
                    return _height;
                };
                this.getWidth       = function() {
                    return _width;
                };

                // setters
                this.setWidth       = function(prv) {
                    _width = prv;
                };
                this.setHeight      = function(prv) {
                    _height = prv;
                };
                this.setPosition    = function(prv) {
                    if (prv.x) {
                        _position.x = prv.x;
                    };
                    if (prv.y) {
                        _position.y = prv.y;
                    };
                    TweenMax.set(_canvas, { x: _position.x, y: _position.y});
                };

        // setters
        this.setPosition

        // setup canvas and stage
        core.IWG.ame('canvasStack', {
            create: _name,
            parentDiv: 'scaleDiv',
            w: 2000,
            h: 1000,
            z: 100
        });

        _canvas = document.getElementById(_name);
        _stage  = new createjs.Stage(_canvas);

        init.bind(this)();

    };

    function init() {

        setupLayout.bind(this)();
        this.getStage().update();
        iwg.IWGEM.trigger('fadeStartPauseScreen');
    };

    function setupLayout() {

        // // get pause stuff in
        var pm = new createjs.Shape();
        pm.graphics.f("rgba(0,0,0,0.6)").dr(0, 0, 2000, 1000);

        var pausedIcon = new createjs.Shape();
        pausedIcon.graphics.f().s("#FFFFFF").ss(5, 1, 1).p("AFKAAQAACIhhBhQhgBhiJAAQiIAAhhhhQhghhAAiIQAAiIBghhQBhhgCIAAQCJAABgBgQBhBhAACIg");
        pausedIcon.y = 500;
        pausedIcon.x = 1250;

        var pmText = new createjs.Shape();
        pmText.graphics.f("#FFFFFF").s().p("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");
        pmText.y = 500;
        pmText.x = 1250;

        this.getStage().addChild(pm, pausedIcon, pmText);

        this.getStage().on('click', function() {

            iwg.IWGEM.trigger('hidePauseScreen');

        });

    };

    var previousState 	= null,
		pauseCount		= 0,
		gameState		= null;

    function pauseGame(ev) {

        pauseCount++;
        setTimeout(function(){

	        pauseCount--;
	        if ( pauseCount === 0){

		     	if (ev === false) {


		        } else if (ev === true) {
                    iwg.IWGEM.trigger("showPauseScreen");
			        createjs.Sound.setMute(true);
		        	iwg.IWGEM.trigger("gamePause");
		        };
	        };

        }, 10);

    };


    Pause.prototype.destroy = function() {

        this.unsubscribe();
        this.getCanvas().parentNode.removeChild(this.getCanvas());

    };

    Pause.VERSION = '0_0_1';
    IWGInit = function () {
        _Pause = new Pause();
    };
    iwg._class("iwg.lib.Pause", Pause);
}(window));
