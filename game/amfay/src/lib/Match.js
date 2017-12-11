(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        images          = core.iwgLoadQ.images,
        ImageSS         = lib.SS.ImageSS,
        Sound           = lib.Sound,
        Helper          = lib.Helper,
        GameObject      = lib.GameObject,
        QueueManager    = lib.QueueManager,
		_Match,
		
        Match = function (name) {
            
            if (!Helper.isDefined(name)) {
				console.warn('Match hasnt been given a name - terminating module creation');
				return false;
			}

            var _instance               = this,
                _name                   = name,
                _canvas                 = null,
                _stage                  = null,
                _active                 = false,
                _enabled                = false,
                _position               = {
                    x: 0,
                    y: 0
                },
                _matchAmount            = 2,                        // default matchAmount set to 2
                _row                    = [],
                _icon   	            = null,
                _iconRevealAnimation    = null, 
                _symbol                 = null,
                _prizeIcon              = null,
                _prizeRevealAnimation   = null,
                _prizeSymbol            = null,
                _seperationAmount       = null,
                _revealed               = false,
                _queued                 = false,
                _winner                 = null,
                _prizeValue             = null,
                _promptHighlight        = null,
                _clickCount             = 0,
                /*
                    name:           _promptStart
                    description:    highlight prompt
                    params:         null
                    return:         null              
                */
                _promptStart            = function() {
                    
                    if ( !_revealed && !_queued ) {
                        _promptHighlight.play();
                    };
                                          
                },
                /*
                    name:           _promptStop
                    description:    prompt highlight off
                    params:         null
                    return:         null              
                */
                _promptStop             = function() {
                    
                    iwg.IWGEM.trigger('incClickCount');
                    
                    _promptHighlight.seek(0);
                    _promptHighlight.restart(true); 
                    _promptHighlight.pause(); 
                                   
                },
                _update         = function() {
                    if (_active) {
                        _stage.update();
                    }
                },
                _subcribe       = function() {
                    iwg.IWGEM.on('update', _update);  
                    iwg.IWGEM.on('promptStart', _promptStart);
                    iwg.IWGEM.on('promptStop', _promptStop);                 
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('promptStart');
                    iwg.IWGEM.off('promptStop');
                };

                // getters
                this.getName        = function() {
                    return _name; 
                };
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
                this.getPosition    = function() {
                    return _position;  
                };
                this.getMatchAmount = function() {
                    return _matchAmount;
                };
                this.getRow         = function() {
                    return _row;  
                };
                this.getIcon        = function() {
                    return _icon;  
                };
                this.getIconRevealAnimation = function() {
                    return _iconRevealAnimation;  
                };
                this.getSymbol      = function() {
                    return _symbol;  
                };
                this.getPrizeIcon   = function() {
                    return _prizeIcon;  
                };
                this.getPrizeRevealAnimation = function() {
                    return _prizeRevealAnimation;  
                };
                this.getPrizeSymbol = function() {
                    return _prizeSymbol;  
                };
                this.getSeperationAmount    = function() {
                    return _seperationAmount;  
                };
                this.getRevealed    = function() {
                    return _revealed;  
                };
                this.getQueued      = function() {
                    return _queued;  
                };
                this.getWinner      = function() {
                    return _winner;
                };
                this.getPrizeValue = function() {
                    return _prizeValue;
                };
                this.getPrompthighlight = function() {
                    return _promptHighlight;  
                };

                // setters
                this.setMatchAmount = function(num) {
                
                    if(Helper.isNum(num)) {
                        _matchAmount    = num;    
                    } else {
                        console.log('setMatch amount has to be of typeOf num');
                    };
                      
                };
                this.setActive      = function(bool) {
                    _active = bool;
                };
                this.setIcon    	= function(icon) {
                    _icon   = icon;
                };
                this.setIconRevealAnimation = function(prv) {
                    _iconRevealAnimation = prv;  
                };
                this.setSymbol      = function(symbol) {
                    _symbol = symbol;
                };
                this.setPrizeIcon   = function(icon) {
                    _prizeIcon   = icon;
                };
                this.setPrizeRevealAnimation = function(prv) {
                    _prizeRevealAnimation = prv;  
                };
                this.setPrizeSymbol = function(symbol) {
                    _prizeSymbol = symbol;
                };
                this.setSeperationAmount    = function(px) {
                    _seperationAmount = px;  
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
                
                this.setRevealed    = function(prv) {
                    _revealed = prv;  
                };
                this.setEnabled 	= function(prv) {
                    _enabled = prv;  
                };
                this.setQueued      = function(prv) {
                    _queued = prv;
                };
                this.setWinner      = function(prv) {
                    _winner       = prv;
                };
                this.setPrizeValue = function(prv) {
                    _prizeValue = prv;
                }; 
                this.setPromptHighlight = function(prv) {
                    _promptHighlight = prv;  
                };
                

        // setup canvas and stage
        core.IWG.ame('canvasStack', {
            create: _name,
            w: 516,
            h: 170,
            z: 100,
            parentDiv: "scaleDiv"
        });

        _canvas = document.getElementById(_name);
        _stage  = new createjs.Stage(_canvas);
        
        createjs.Touch.enable(_stage);
        _stage.enableMouseOver(10);
    	_stage.mouseMoveOutside = true;
    };

    
    Match.prototype.setup   = function() {
        
        var self = this;
        
        var rowName     = 4 - this.getName().replace('match',''),
            row         = Helper.makeBitmapImage("row"+rowName, {x: 20, y: 70 }, 1, false, ImageSS);
        
        // symbol and icon setup
        var symbolContainer = new createjs.Container();
        for ( var i = 0; i < this.getMatchAmount(); i++ ){
            
            // create symbols
            var tokenContainer      = new createjs.Container(),
                icon                = this.getIcon().clone();
            
            tokenContainer.name     = "token" + i;
            tokenContainer.i        = i;
            tokenContainer.x        = 50 + i * this.getSeperationAmount();
            tokenContainer.revealed = false;
            
            icon.name               = "icon";
            
            tokenContainer.on('rollover', function() {
                iwg.IWGEM.trigger('promptStop');
                
                if (self.getEnabled() === false ){
                    var icon = this.getChildByName('icon');
                
                    TweenMax.to(icon, 0.2, {onStart: function(){
                        self.setActive(true);
                    },scaleX: 1.2, scaleY: 1.2, onComplete: function() {
                        if(this.clicked === false) {
                            self.setActive(false);
                        }
                    }});
                };
            });
            
            tokenContainer.on('rollout', function() {
                
                if (self.getEnabled() === false) {
                    var icon = this.getChildByName('icon');
                    TweenMax.to(icon, 0.2, {onStart: function(){
                        self.setActive(true);
                    },scaleX: 1, scaleY: 1, onComplete: function() {
                        if(this.clicked === false) {
                            self.setActive(false);
                        };
                    }});
                };
            });
                
            tokenContainer.on('click', function() {
                
                if ( !self.getEnabled() ) {
                    
                    iwg.IWGEM.trigger('promptStop');
                
                    self.setActive(true);
                    self.setEnabled(true);
                    
                    var icon = this.getChildByName('icon');
                    
                    TweenMax.set(icon, { scaleX: 1, scaleY: 1 });
                    if ( !this.revealed && !self.getQueued() ){
                         if (Sound.instance.getSound()) {
                            createjs.Sound.play("soundRollover");
                         } 
                        // add to queue
                        self.setQueued(true);
                        QueueManager.instance.addToQueue([self, this.name]);
                    };
                }
            }, null, true);
            
            var symbol      = this.getSymbol()[i].clone();
            symbol.visible  = false;
            symbol.name     = "symbol";
            symbol.scaleX   = symbol.scaleY = 0;
        
            tokenContainer.addChild(icon, symbol);
            symbolContainer.addChild(tokenContainer);
            
            this.addToRow(tokenContainer);
            
        };  
        
        // prize setup
        var prizeContainer  = new createjs.Container(),
            prizeIcon       = this.getPrizeIcon(),
            prizeSymbol     = this.getPrizeSymbol();
            
        prizeContainer.name = "prize";
        prizeIcon.name      = "prizeIcon";
        prizeSymbol.name    = "prizeSymbol";
        
        prizeSymbol.visible = false;
        prizeSymbol.scaleX = prizeSymbol.scaleY = 0;
        
        prizeContainer.addChild(prizeIcon, prizeSymbol);
        prizeContainer.x = 50 + (this.getMatchAmount()) * this.getSeperationAmount();
        prizeContainer.y = 20;
        prizeContainer.revealed = false;
        
        prizeContainer.on('rollover', function() {
            
            iwg.IWGEM.trigger('promptStop');
                
            if (self.getEnabled() === false ){
                var icon = this.getChildByName('prizeIcon');
            
                TweenMax.to(icon, 0.2, {onStart: function(){
                    self.setActive(true);
                },scaleX: 1.2, scaleY: 1.2, onComplete: function() {
                    if(this.clicked === false) {
                        self.setActive(false);
                    }
                }});
            };
        });
            
        prizeContainer.on('rollout', function() {
            iwg.IWGEM.trigger('promptStop');
            if (self.getEnabled() === false) {
                var icon = this.getChildByName('prizeIcon');
                TweenMax.to(icon, 0.2, {onStart: function(){
                    self.setActive(true);
                },scaleX: 1, scaleY: 1, onComplete: function() {
                    if(this.clicked === false) {
                        self.setActive(false);
                    };
                }});
            };
        });
        
        prizeContainer.on('click', function() {
            
            if (!this.revealed && !self.getQueued() && !self.getEnabled()) {
                
                iwg.IWGEM.trigger('promptStop');
                
                self.setEnabled(true);
                // add to queue
                self.setQueued(true);
                QueueManager.instance.addToQueue([self, "prize"]);
                if (Sound.instance.getSound()) {
                    createjs.Sound.play("soundRollover");
                } 
                var prizeIcon = this.getChildByName('prizeIcon');
                TweenMax.set(prizeIcon, { scaleX: 1, scaleY: 1 });
                
            };
        },  null, true);
        
        var queueHighlight       = createHighlight(this.getName(), "white");
        queueHighlight.name      = "queueHighlight";
        
        var winHighlight         = createHighlight(this.getName(), "black");
        winHighlight.name        = "winHighlight";
        
        var promptHighlight      = createHighlight(this.getName(), "orange");
        promptHighlight.name     = "promptHighlight";
        
        this.addToRow(prizeContainer);
        
        this.getStage().addChild( queueHighlight, winHighlight, promptHighlight, row, symbolContainer, prizeContainer );
        this.getStage().update();
        
        setupPromptHighlight.bind(self)();
 
    };
    
    function setupPromptHighlight() {
        
        var stage   = this.getStage(),
            self    = this,
            tween   = TweenMax.to(stage.getChildByName('promptHighlight'), 1, { onStart: function(){
                self.setActive(true);
            }, delay: 4, alpha: 0.7, yoyo: true, repeat: -1, paused:true });
        
        this.setPromptHighlight(tween);      
        
    }
    
    Match.prototype.addToRow = function(obj) {
        this.getRow().push(obj);  
    };
    
    Match.prototype.reveal = function(startIcon) {
        
        iwg.IWGEM.trigger('promptStop');
        
        var self = this;
        self.setRevealed(true);
        this.getStage().getChildByName('queueHighlight').alpha = 0;
        
        this.setActive(true);
        // queued now moved to set on click
        
        // reveal sequence
        for ( var i = 0; i < this.getRow().length; i++){
            
            if ( this.getRow()[i].name === startIcon ){
                
                if ( this.getRow()[i].name === "prize") {
                    
                    var token           	    = this.getRow()[i],
                        prizeIcon               = this.getRow()[i].getChildByName('prizeIcon'),
                        prizeSymbol             = this.getRow()[i].getChildByName('prizeSymbol');
                    
                    if ( Helper.isDefined(this.getPrizeRevealAnimation()) ){
                        
                        var prizeReveal     	= new GameObject('prizeRevealFor' + this.getName(), {w: 400, h: 400}, 7),
                            pos                 = this.getPosition();
                        
                        prizeReveal.setPosition({x: pos.x + 145, y: pos.y - 90 });
                        var explosion           = prizeIcon.clone();
                        explosion.x             = 65;
                        explosion.y             = 75;
                        explosion.scaleX    	= explosion.scaleY = 1;
                        prizeReveal.getStage().addChild(explosion);
                        prizeReveal.getStage().getChildByName('prizeIcon').gotoAndPlay(this.getPrizeRevealAnimation());
                        prizeReveal.setActive(true);

                        prizeIcon.visible       = false;
                        prizeSymbol.visible     = true;
                        
                        if (prizeSymbol.currentAnimation === "calendar") {
                            TweenMax.to(prizeSymbol, 0.5, {scaleX: 0.9, scaleY: 0.8, ease: Bounce.easeOut });
                        } else {    
                            TweenMax.to(prizeSymbol, 0.5, {scaleX: 1, scaleY: 1, ease: Bounce.easeOut });
                        };                        
                        
                        
                        // delay for sound play to ensure it's in line with reveal animation
                        prizeReveal.getStage().getChildByName('prizeIcon').on('change', function (event) {
                            if(this.currentAnimationFrame === 10) {
                                // play prize sound
                                if (Sound.instance.getSound()) {
                                    createjs.Sound.play("soundPrizeReveal");
                                }                          
                            }
                        });
                        prizeReveal.getStage().getChildByName('prizeIcon').on('animationend', function (event) {

                            token.revealed  	= true;
                            
                            TweenMax.to(prizeReveal.getStage(), 1, {alpha: 0, onComplete: function() {
                                prizeReveal.destroy();
                                prizeReveal.setActive(false);
                            }});
                            
                            revealNext.bind(self)();
                            
                        });
                    };
                    
                } else {
                
                    var icon        = this.getRow()[i].getChildByName('icon'),
                        symbol      = this.getRow()[i].getChildByName('symbol'),
                        soundOnce   = false;
                        
                    // play token reveal animation && show symbol     
                    icon.gotoAndPlay( this.getIconRevealAnimation() );
                    // delay for sound play to ensure it's in line with reveal animation
                    icon.on('change', function (event) {
                        if((icon.currentAnimationFrame > 3) && (!soundOnce) ) {
                            soundOnce = true;
                            if (Sound.instance.getSound()) {
                                createjs.Sound.play("soundMoney");
                            }                          
                        }
                    });
                    icon.on('animationend', function (event) {
                        this.visible = false;
                        
                        symbol.visible  = true;
                        icon.visible    = false;
                        
                        // play money sound
                        if (Sound.instance.getSound()) {
                            createjs.Sound.play("soundSymbolReveal");
                        }
                        
                        TweenMax.to(symbol, 0.25, {scaleX: 1, scaleY: 1, ease: Bounce.easeOut, onComplete: function(){
                            revealNext.bind(self)();
                        }});
                        
                        if( !this.parent.revealed ){
                            this.parent.revealed = true;
                        };
                        
                    }); 
                };
            };
        };
    };
    
    
    /*
        name:           revealNext
        description:    reveal the next token in the row array that is not revealed
        param:          null
        return:         null
    */
    function revealNext() {
        
        var row         = this.getRow(),
            allRevealed = true;
            
        for (var i = 0; i < row.length; i++ ) {
            var token = row[i];
            if ( !token.revealed ) {
                // reveal that token
                this.reveal(token.name);
                allRevealed = false;             
                return false;
            }
        };
        
        if (allRevealed) {
            
            if ( this.getWinner() ) {
                core.IWG.ame('bank', {deposit: [this.getPrizeValue()], log: true});
                this.winHighlight();
            };
            // short delay to ensure all revealed on last turn
            TweenMax.to(this, 0.5, { onCompleteScope:this, onComplete: function(){
                this.setActive(false);
            }});
           
            iwg.IWGEM.trigger('animationEnd');
            
        };
    };   
    
    function createHighlight(name, colour) {
        
        var highLight = new createjs.Shape(); 
        highLight.graphics.beginFill(colour);
        highLight.alpha = 0;
        
        switch ( name ) {
            case "match0":
                highLight.graphics.moveTo(0, 26).lineTo(515, 26).lineTo(515, 155).lineTo(513, 157).lineTo(510, 158)
                .lineTo(508, 160).lineTo(506, 162).lineTo(10, 162).lineTo(9, 161).lineTo(7, 160).lineTo(5, 158).lineTo(3, 155).lineTo(0, 29)
            break;
            case "match3":
                highLight.graphics.moveTo(10, 29).lineTo(505, 29).lineTo(512, 35).lineTo(515, 39).lineTo(515, 166).lineTo(0, 166).lineTo(0, 39)                
            break;
            default:
                highLight.graphics.moveTo(0, 29).lineTo(515, 29).lineTo(515, 165).lineTo(0, 165)
            break;            
        }
        
        return highLight;
                
    } 
    
    Match.prototype.queueHighlight = function() {
        
        // play row queue sound
        if (Sound.instance.getSound()) {
            createjs.Sound.play("soundRollover");
        }
      
        this.getStage().getChildByName('queueHighlight').alpha = 0.5;
        this.getStage().update();
        this.setActive(false);
          
    };
    
    Match.prototype.winHighlight = function() {
      
        // play row win sound
        if (Sound.instance.getSound()) {
            createjs.Sound.play("soundRowWin");
        }
                        
        this.getStage().getChildByName('winHighlight').alpha = 0.3;
        // also update the prize amount to be the black version
        if (this.getPrizeValue() !== 12000) {
            var winAmount   = "pw"+this.getPrizeValue();
            this.getPrizeSymbol().gotoAndStop(winAmount);
        } else {
            this.getPrizeSymbol().gotoAndStop("calendar_stroke");
        };
        
        this.getStage().update();
          
    };

    Match.prototype.destroy = function() {

        this.unsubscribe();
        this.getCanvas().parentNode.removeChild(this.getCanvas());

    };

    Match.VERSION = '0_0_1';
    IWGInit = function () {
        _Match = new Match();
    };
    iwg._class("iwg.lib.Match", Match);
}(window));
