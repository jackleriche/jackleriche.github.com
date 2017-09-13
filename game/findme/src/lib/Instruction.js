(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        GameObject      = lib.GameObject,
        Helper          = lib.Helper,
        Sound           = lib.Sound,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        Board           = lib.Board,
        EndGame         = lib.EndGame,
        backgroundSound = null,

        Instruction = function (name) {

			if (!name){
            	console.warn('Instruction instance has no name');
                return false;
            }

            if (typeof Instruction.instance === "object") {
                return Instruction.instance;
            }
            Instruction.instance = this;

		    var _instance           = this,
                _name               = name,
                _overlayStage       = null,
                _buttonStage        = null,
                _overlayCanvas      = null,
                _buttonCanvas       = null,
                _overlayActive      = false,
                _buttonActive       = false,
                _enabled            = true,
                _visible            = true,
                _state              = 'start',
                _isMoving           = false,
                _height             = null,
                _width              = null,
                _position           = {
                    x: 0,
                    y: 0
                },
                _update             = function() {
                   if(_buttonActive) {
                        _buttonStage.update();
                    }
                    if (_overlayActive){
                        _overlayStage.update();
                    }
                },
                _gameStart          = function() {
                    _state = 'running';
                    iwg.IWGEM.trigger('hideInstruction');
                },
                _enableButtons      = function(names) {

                    if(Helper.isDefined(names)){
                        if (names.length > 0) {
                           // if there is a name go through and check name matches
                            for (var i = 0; i < names.length; i++){
                                if(names[i] === _name){
                                    _enabled = true;
                                    enableButton.bind(_instance)(_buttonStage.getChildByName('icon_instructions'));
                                };
                            };
                        };
                    } else if (!Helper.isDefined(names)){
                        // if no name is in names then enable all buttons
                        if (EndGame.instance.getEnabled() === false){
                            _enabled = true;
                            enableButton.bind(_instance)(_buttonStage.getChildByName('icon_instructions'));
                        };
                    };
                },
                _disableButtons     = function(names) {

                    if(Helper.isDefined(names)){
                        if (names.length > 0) {
                           // if there is a name go through and check name matches
                            for (var i = 0; i < names.length; i++){
                                if(names[i] === _name){
                                    _enabled = false;
                                    disablebutton.bind(_instance)(_buttonStage.getChildByName('icon_instructions'));
                                };
                            };
                        }
                    } else if (!Helper.isDefined(names)){
                        // if no name is in names then disable all buttons
                        _enabled = false;
                        disablebutton.bind(_instance)(_buttonStage.getChildByName('icon_instructions'));
                    };



                },
                _showInstruction    = function() {
                    
                    if (Board.instance.getState() !== "panelShowing") {
                        
                        Board.instance.setState("panelShowing");

                        iwg.IWGEM.trigger('showOverlay');
                        TweenMax.set(_overlayCanvas, {scaleX: 1, scaleY: 1});
                        iwg.IWGEM.trigger('gamePause');
                        iwg.IWGEM.trigger('disableButtons');
    
                        if ( _state !== "start" ){
                            
                            var close = _overlayStage.getChildByName('close');
                            close.visible = true;
                            
                        }
    
                        _overlayStage.update();
                        _isMoving = true;
    
                        if ( _visible !== true ){
                            TweenMax.to(_overlayCanvas, 1.5, { x: 20, ease:Elastic.easeOut, onComplete: function(){
                                _visible = true;
                                _isMoving = false;
                            }});
                        }
                        
                    };

                },
                _hideInstruction    = function() {
                    iwg.IWGEM.trigger('gamePlay');
                    iwg.IWGEM.trigger('hideOverlay');

                    _isMoving = true;

                    if ( _visible ){
                        TweenMax.to(_overlayCanvas, 1.5, {x: -1200, ease:Elastic.easeOut, onComplete: function(){
                            
                            _visible        = false;
                            _buttonActive   = false;
                            _isMoving       = false;
                            
                            Board.instance.setState(null);
                            
                        }});
                    }

                },
                _subscribe          = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('gameStart', _gameStart);
                    iwg.IWGEM.on('disableButtons', _disableButtons);
                    iwg.IWGEM.on('enableButtons', _enableButtons);
                    iwg.IWGEM.on('showInstruction', _showInstruction);
                    iwg.IWGEM.on('hideInstruction', _hideInstruction);
                    iwg.IWGEM.on('showPauseScreen', stopSound);
                    iwg.IWGEM.on('hidePauseScreen', restartSound);
                    iwg.IWGEM.on('restartMusic'   , restartSound);
                }(),
                _unsubscribe        = function() {
                    iwg.IWGEM.off('update');
                    iwg.IEGEM.off('panelClick');
                    iwg.IWGEM.off('disableButtons');
                    iwg.IWGEM.off('enableButtons');
                    iwg.IWGEM.off('startGame');
                    iwg.IWGEM.off('showInstruction');
                    iwg.IWGEM.off('showPauseScreen');
                    iwg.IWGEM.off('hidePauseScreen');
                    iwg.IWGEM.off('restartMusic');
                }

            // getters
            this.getName            = function() {
                return _name;
            };
            this.getCanvas          = function() {
                return _overlayStage;
            };
            this.getButtonStage     = function() {
                return _buttonStage;
            };
            this.getOverlayStage    = function() {
                return _overlayStage;
            };
            this.getOverlayCanvas   = function() {
                return _overlayCanvas;
            };
            this.getButtonCanvas    = function() {
                return _buttonCanvas;
            };
            this.getActive          = function() {
                return _active;
            };
            this.getState           = function() {
                return _state;
            };
            this.getEnabled         = function() {
                return _enabled;
            };
            this.getHeight          = function() {
                return _height;
            };
            this.getWidth           = function() {
                return _width;
            };
            this.getPosition        = function() {
                return _position;
            };
            this.getIsMoving           = function () {
                return _isMoving;           
            };

            // setters
            this.setState           = function(prv) {
                _state = prv;
            };
            this.setWidth           = function(prv) {
                _width = prv;
            };
            this.setHeight          = function(prv) {
                _height = prv;
            };
            this.setOverlayPosition = function(prv) {
                if (prv.x) {
                    _position.x = prv.x;
                };
                if (prv.y) {
                    _position.y = prv.y;
                };
                TweenMax.set(_overlayCanvas, { x: _position.x, y: _position.y});
            };
            this.setButtonPosition  = function(prv) {
                if (prv.x) {
                    _position.x = prv.x;
                };
                if (prv.y) {
                    _position.y = prv.y;
                };
                TweenMax.set(_buttonCanvas, { x: _position.x, y: _position.y});
            };
            this.setOverlayActive   = function(prv) {
                _overlayActive = prv;
            };
            this.setButtonActive    = function(prv) {
                _buttonActive = prv;
            };
            this.setIsMoving        = function (prv) {
                _isMoving = prv            
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };

            core.IWG.ame('canvasStack', {
                create: _name + 'button',
                parentDiv: 'scaleDiv',
                w: 58,
                h: 58,
                z: 10
            });
            core.IWG.ame('canvasStack', {
                create: _name + 'overlay',
                parentDiv: 'scaleDiv',
                w: 925,
                h: 560,
                z: 4
            });

            _buttonCanvas   = document.getElementById(_name + 'button');
            _overlayCanvas  = document.getElementById(_name + 'overlay');
            _buttonStage    = new createjs.Stage(_buttonCanvas);
            _overlayStage   = new createjs.Stage(_overlayCanvas);

            init.bind(this)();
        };

    function init() {

        var self = this;

        setupOverlayLayout.bind(this)();
        setupButtonLayout.bind(this)();

        // setup click event
        this.getOverlayStage().on('click', function(){
            if(self.getState() !== 'start'){
                iwg.IWGEM.trigger('panelClick');
            }
        });

        setTimeout(function(){
            self.getOverlayStage().update();
            self.getButtonStage().update();
        }, 1);

    };

    function setupOverlayLayout() {

        var self            = this,
            logo            = Helper.makeBitmapImage('logo', {x: 460, y: 80}, 1, true, MasterSS),
            close           = Helper.makeBitmapImage('icon_close', {x:30, y:90}, 1, true, MasterSS),
            instructions    = Helper.makeBitmapImage('overlay_instructions', { x: 460, y: 310}, 1, true, MasterSS),
            buttonHitbox	= new createjs.Shape(),
            background      = new createjs.Shape();


            var button      = new createjs.Container(),
                playButton  = Helper.makeBitmapImage('button_start', { x: 96, y: 50}, 1, true, MasterSS);

            button.x = 480;
            button.y = 413;

            button.addChild(playButton);

            var highlightTimeline = new TimelineMax({delay: 4, repeat: -1, repeatDelay: 0.2 });

            highlightTimeline.call(function(){
                                self.setOverlayActive(true);
                             })
                             .to(playButton, 0.5, { scaleX: 1.1, scaleY: 1.1 }, "start")
							 .to(playButton, 0.5, { scaleX: 1, scaleY: 1 }, "end")

            close.name      = "close";
            playButton.name = "play";

            var hitBox      = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawCircle(-50,-50,150));
            close.hitArea   = hitBox;
            close.visible   = false;


            playButton.on('click', function(){
                iwg.IWGEM.trigger('gameStart');

                createjs.Sound.play("startButton");

                backgroundSound = createjs.Sound.play("backgroundLoop", {interrupt: createjs.Sound.INTERRUPT_NONE, loop:-1});
 
                button.parent.removeChild(button);
                self.setOverlayActive(false);
            });

            close.on('click', function(){
                if (!self.getIsMoving()) {
                    iwg.IWGEM.trigger('enableButtons');
                    iwg.IWGEM.trigger('hideInstruction');
                    self.setOverlayActive(false);
                    highlightTimeline.kill();
                }
            });



        // give space for the border and shadow
        background.x = 8;
        background.graphics.setStrokeStyle(5,"round").beginStroke('#fff').beginFill('rgba(0,0,0,0.8)').drawRoundRect(0,90,910,430,10);
        background.shadow = new createjs.Shadow("#000000", 1, 5, 10);

        this.getOverlayStage().addChild(background, close, instructions, button, logo);
    };

    function restartSound() {
        // only replay if not on start screen still
        if(Instruction.instance.getState() !== "start" && Sound.instance.getSound()) {

            stopSound();

            backgroundSound = createjs.Sound.play("backgroundLoop", {interrupt: createjs.Sound.INTERRUPT_NONE, loop:-1});
        }
    }
    function stopSound() {
        backgroundSound = createjs.Sound.stop();
        backgroundSound = null;
    }

    function setupButtonLayout() {

        var self    = this,
            button  = Helper.makeBitmapImage('icon_instructions', { x: 29, y: 29}, 0.5, true, MasterSS);

        button.on('click', function(){
            if (self.getEnabled() && !self.getIsMoving()){
                iwg.IWGEM.trigger('showInstruction');
            }; 
        });

        this.getButtonStage().addChild(button);

    };

    function disablebutton(button) {

        var self = this;

        TweenMax.to( button, 0.3, { onStart: function(){
            self.setButtonActive( true );
        }, delay: 0.1, alpha: 0.5, onComplete: function(){
            self.setButtonActive( false );
        } });

    };

    function enableButton(button) {

        var self = this;

        TweenMax.to(button, 0.3, { onStart: function(){
            self.setButtonActive( true );
        }, delay: 0.1, alpha: 1, onComplete: function(){
            self.setButtonActive( false );
        } });

    };


    Instruction.prototype.destroy = function() {

        this.unsubscribe();

    }
    Instruction.VERSION = '0_0_1';
    IWGInit = function () {

        _Instruction = new Instruction();

    };
    iwg._class("iwg.lib.Instruction", Instruction);
}(window));
