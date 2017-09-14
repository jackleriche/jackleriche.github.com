(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Sound           = lib.Sound,
        Ticket          = lib.Ticket,
        Calendar        = lib.Calendar,
        images          = core.iwgLoadQ.images,
        ImageSS         = lib.SS.ImageSS,
        FullTurnSS      = lib.SS.FullTurnSS,
        PrizeSS         = lib.SS.PrizeSS,
        EndGame = function (name) {

			if (!name){
                console.warn('EndGame instance has no name');
                return false;
            }

            if (typeof EndGame.instance === "object") {
               return EndGame.instance;
            }
            EndGame.instance = this;

		    var _instance       = this,
		        _name           = name,
		        _stage          = null,
                _canvas         = null,
                _active         = false,
                _enabled        = false,
                _height         = null,
                _width          = null,
                _endPageTurn    = false,
                _prizeText      = null,
                _fullTurn       = null,
                _position       = {
                    x: 0,
                    y: 0
                },
                _endGame        = function() {

                    _enabled = true;
                    _active  = true;
                    
                    var turnAnim        = _stage.getChildByName('turnAnim'),
                        endGameContainer    = _stage.getChildByName('endGameContainer'),
                    	endText         = endGameContainer.getChildByName('endText'),
                        prizeText       = endGameContainer.getChildByName('prizeText'),
                        finishButton    = endGameContainer.getChildByName('finishButton');
                    
                    TweenMax.to(finishButton, 1, { alpha:1, delay:3 });
                    
                    
                       
                    if ( core.IWG.ame('get', {vars: ['iwgIsWager'] })){
                        
                        if ( Ticket.instance.getOutcome().wT === 0){
                            
                            if (Sound.instance.getSound()) {
                                createjs.Sound.play("soundEndLose");
                            };
                                
                            endText.gotoAndStop('lose-message');
                            endText.y   = 200;
                            prizeText.visible = false;
                                                         
                        } else {

                            if (Sound.instance.getSound()) {
                                createjs.Sound.play("soundEndWin");
                            };
                            
                            checkAnimFrame.bind(_instance)();
                            endText.gotoAndStop('win-message');

                        }
                        
                        var bounds  	= endText.getBounds();
                        
                        endText.regX    = bounds.width / 2;
                        endText.regY    = bounds.height / 2;
                        
                    } else {
                        
                        endText.visible     	= false;
                        prizeText.visible       = false;
                        finishButton.x          = 200;
                        finishButton.y          = 220;
                           
                    };
                    
                    TweenMax.to(endText, 1, { alpha:1, delay:3 });
                    TweenMax.to(prizeText, 1, { alpha:1, delay:3 });   
                    
                    TweenMax.to(finishButton, 1, { scaleX: 1.1, scaleY: 1.1, delay: 4, yoyo: true, repeat: -1});
                                        
                    turnAnim.gotoAndPlay("fullTurn");
                    TweenMax.to(_canvas, 1, { y:100 });

                },
                _closeGame      = function() {
                    top.location.href =  "http://www.sideplay.com/portfolio/game/69/AMFAY%20%C2%A31000";
                },
                _update         = function() {
                    if (_active) {
                        _stage.update();
                    }
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('endGame', _endGame);
                    iwg.IWGEM.on('closeGame', _closeGame); 
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('endGame');
                    iwg.IWGEM.off('closeGame');
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
            this.getEndPageTurn = function() {
                return _endPageTurn;
            };
            this.getPrizeText   = function() {
                return _prizeText;  
            };
            

            // setters
            this.setWidth       = function(prv) {
                _width = prv;
            };
            this.setHeight      = function(prv) {
                _height = prv;
            };
            this.setActive  = function( prv ) {
                _active = prv;
            };
            this.setEndPageTurn  = function( prv ) {
                _endPageTurn = prv;
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

            // unsubscribe
            this.unsubscribe        = function() {
                _unsubscribe;
            };

            core.IWG.ame('canvasStack', {
                create: _name,
                parentDiv: 'scaleDiv',
                w: 370,
                h: 410,
                z: 9
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();

        };

    function init() {

       setupLayout.bind(this)();
       
       // align canvas
       TweenMax.set( this.getCanvas(), { x: 50, y: 10 });

       this.getStage().update();

    }

    //  check the frame for the current win state and show the end game based on that 
    function checkAnimFrame() {
    	// only show on first end turn


            var ticketAmount = Ticket.instance.getOutcome().amount,
                _x = 60,
                _y = 170,
                _frameName = "win_"+ ticketAmount;
                
            console.log(ticketAmount);
                
            switch (ticketAmount)
            {
                case 12000:
                    _x = 180;
                    _y = 218;
                    break;
                case 500:
                    _x = 250;
                    _y = 230;
                    break;
                case 100:
                    _x = 260;
                    _y = 240;
                    break;
                case 40:
                    _x = 275;
                    _y = 250;
                    break;
                case 20:
                    _x = 275;
                    _y = 250;
                    break;
                case 10:
                    _x = 275;
                    _y = 250;
                    break;
                case 5:
                    _x = 295;
                    _y = 250;
                    break;
                case 2:
                    _x = 295;
                    _y = 250;
                    break;
                case 1:
                    _x = 295;
                    _y = 250;
                    break;   
                 default:
                    _frameName = "ERROR";
                    _x = 0;
                    _y = 0; 
            } 
            
            // set the text offset based on current prize value
            this.getStage().getChildByName('endGameContainer').getChildByName('prizeText').x = _x;
            this.getStage().getChildByName('endGameContainer').getChildByName('prizeText').y = _y;
            this.getStage().getChildByName('endGameContainer').getChildByName('prizeText').gotoAndPlay(_frameName);
       
        
    }
    
    function setupLayout() {
        
            var turnAnim        = Helper.makeBitmapImage("fullTurn_00", {x: 0, y: 0}, 1, false, FullTurnSS),
                endGameContainer    = new createjs.Container(),
                endText         = Helper.makeBitmapImage('lose-message', {x: 210, y: 140}, 0, true, ImageSS),               
                prizeText       = Helper.makeBitmapImage("win_1000", {x: 180, y: 220}, 0, true, ImageSS),
                finishButton    = Helper.makeBitmapImage('button_finish', {x: 180, y: 305}, 0, true, ImageSS);
                
            turnAnim.name       = "turnAnim";
            endGameContainer.name   = "endGameContainer";
            endText.name        = "endText";
            prizeText.name      = "prizeText";
            finishButton.name   = "finishButton";
            
            finishButton.rotation = -4;
            
            endGameContainer.addChild( endText, prizeText, finishButton )
                
            this.getStage().addChild( turnAnim, endGameContainer );
            
            finishButton.on('click', function(){
                iwg.IWGEM.trigger('closeGame');
            },this,true);  
            
    };

    EndGame.prototype.destroy = function() {
        this.unsubscribe();
    }

    EndGame.VERSION = '0_0_1';
    IWGInit = function () {
        _EndGame = new EndGame();
    };
    iwg._class("iwg.lib.EndGame", EndGame);
}(window));
