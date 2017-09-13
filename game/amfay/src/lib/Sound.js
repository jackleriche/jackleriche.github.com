(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        core = camelot.core,
        iwg = camelot.iwg,
        lib = iwg.lib,
        GS = window.com.greensock,
        Helper          = lib.Helper,
        images          = core.iwgLoadQ.images,
        ImageSS         = lib.SS.ImageSS,

        Sound = function (name) {

            if (!Helper.isDefined(name)){
                console.warn('Sound class has not been given a name, terminating class construction');
                return false;
            }

            if (typeof Sound.instance === "object") {
                return Sound.instance;
            }

            Sound.instance = this;

            var _instance       = this,
                _canvas         = null,
                _stage          = null,
                _active         = false,
                _name 		    = name,
            	_height         = null,
            	_width 		    = null,
                _position       = {
                    x: 0,
                    y: 0                    
                },
                _sound          = true,
                _soundOn        = function() {
                    _sound = true;
                    createjs.Sound.setMute(false);

                    iwg.IWGEM.trigger('restartMusic');
                    
                    _stage.getChildByName('soundButton').gotoAndStop('sound_on');
                    _stage.update();                      
                },
                _soundOff       = function() {
                    _sound = false;
                    createjs.Sound.setMute(true);
                    
                    _stage.getChildByName('soundButton').gotoAndStop('sound_off');
                    _stage.update();                    
                },
                _subscribe      = function() {
                    iwg.IWGEM.on("soundShow", soundShow);
                    iwg.IWGEM.on("soundHide", soundHide);
                    iwg.IWGEM.on("soundOn", _soundOn);
                    iwg.IWGEM.on("soundOff", _soundOff);
                }(),
                _unsubscribe = function(){
                    iwg.IWGEM.off("soundShow");
                    iwg.IWGEM.off("soundHide");
                    iwg.IWGEM.off("soundOn");
                    iwg.IWGEM.off("soundOff");
                }();

            // getters
            this.getCanvas = function(){
                return _canvas;
            };
            this.getStage = function() {
                return _stage;
            };
            this.getActive = function () {
                return _active;
            };
            this.getHeight = function () {
                return _height;
            };
            this.getWidth = function () {
                return _width;
            };
            this.getName = function () {
                return _name;
            };
            this.getPosition = function() {
                return _position;
            };
            this.getSound = function() {
                return _sound;
            };
            

            // setters
            this.setHeight = function (prv) {
                _height = prv;
            };
            this.setWidth = function (prv) {
                _width = prv;
            };
            this.setActive = function (prv) {
                _active = prv;
            };
            this.setPosition = function (prv) {
                
                if (prv.x) {
                    _position.x = prv.x;
                };
                if (prv.y) {
                    _position.y = prv.y;
                };
                
                TweenMax.set(_canvas, {x: _position.x, y: _position.y});

            }
            this.setSound   = function (prv) {
                _sound = prv;
            };

            this.unsubscribe = function () {
                _unsubscribe;
            };

            core.IWG.ame('canvasStack', {
                create: _name,
                w: 48,
                h: 48,
                z: 101,
                parentDiv: "scaleDiv"
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();
        };

        //private method
        function init() {

            setupButton.bind(this)();
            this.getStage().update();

        };

        function setupButton() {
            
            var self    	    = this,
                soundButton     = Helper.makeBitmapImage("sound_on", {x:24, y:24}, 1, true, ImageSS),
                hitBox          = new createjs.Shape();
                
            hitBox.graphics.beginFill("red").drawCircle(24, 24, 24);
                
            soundButton.hitArea = hitBox;
            soundButton.name    = "soundButton";
            soundButton.on('click', function(){
                if (self.getSound()){
                    // if sound is on set to false
                    iwg.IWGEM.trigger("soundOff");
                } else {
                    // if sound is off set to true
                    iwg.IWGEM.trigger("soundOn");
                }
            });

            this.getStage().addChild(soundButton);

        };

        function soundShow () {
            var t = Sound.instance,
                button  = Bagatelle.instance.getStage().getChildByName('sbutton').getChildByName('soundButton');

            TweenMax.to(button, 0.5, {alpha: 1,
                onStart: function(){
                    t.setActive(true);
                },
                onComplete: function(){
                    t.setActive(false);
                }
            });

        }

        function soundHide () {
            var button  = Bagatelle.instance.getStage().getChildByName('sbutton').getChildByName('soundButton');
            TweenMax.to(button,0.5, { alpha: 0});
        }

    Sound.prototype.tick = function() {
        if ( this.getActive() ){
            this.getStage().update();
        }
    };

    //namespace path
    iwg._class("iwg.lib.Sound", Sound);

}(window));
