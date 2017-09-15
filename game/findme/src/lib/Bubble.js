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
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        GameObject      = lib.GameObject,
        Bubble = function (name) {

            var _instance       = this,
                _super          = null,
                _icon           = null,
                _iconNum        = null,
                _populated      = false,
                _scale          = 1,
                _rotation       = 0,
                _subcribe       = function() {
                }(),
                _unsubscribe    = function(){
                };

            // getters
            this.getIcon            = function(prv) {
                return _icon;
            };
            this.getBubbleScale     = function() {
                return _scale;
            };
            this.getPopulated       = function() {
                return _populated;
            };
            this.getColourVariation = function(iconName,iconNum) {

                var primaryName          = iconName,
                    colourVariations     = iconType[iconNum],
                    colourNum            = Math.floor((Math.random() * colourVariations)) + 1,
                    iconNameAndColour;

                if (colourNum > 1) {
                    iconNameAndColour = primaryName +"_"+ colourNum;
                } else {
                    iconNameAndColour = primaryName;
                }
                return iconNameAndColour;

            };

            // setters
            this.setIcon            = function(prv,iconNum) {

                _icon           = prv;
                _iconNum        = iconNum;
                _populated      = true;

                this.setVisable(true);
                this.setClickable(true);

                var icon        = this.getStage().getChildByName("icon"),
                    bubble      = this.getStage().getChildByName("bubbleBackground"),
                    iconName = this.getColourVariation(_icon,_iconNum);

                icon.gotoAndStop(iconName);
                icon.iconName = iconName;

                // reset icon
                icon.alpha      = 1;
                bubble.alpha    = 1;

                if (Sound.instance.getSound()) {
                    createjs.Sound.play("newBubble");
                }

                icon.scaleX = icon.scaleY = _instance.getScale();
                bubble.scaleX = bubble.scaleY = _instance.getScale();

                this.setBubbleScale( _instance.getScale());

                this.getStage().update();
            };
            this.setBubbleScale     = function(value) {
                _scale = value;
            };
            this.setPopulated       = function(bool) {

                _populated = bool;

            };
            this.setRotation        = function(num) {

                if(typeof(num) === "number"){

                    _rotation   = num;
                    var icon    = _instance.getStage().getChildByName("icon");
                    TweenMax.set(icon, { rotation: _rotation});
                    _instance.getStage().update();

                }
            };

            _instance.__proto__ = new GameObject(name, {w:94, h: 94}, 2);
            _super = _instance.__proto__;

            init.bind(_instance)();

        };

    function init() {

        setupLayout.bind(this)();
        this.getStage().update();

    };

    function setupLayout() {

        var self            = this,
            bubble          = Helper.makeBitmapImage('bubble_big', {x:47, y: 47}, 0, true, MasterSS),
            icon            = Helper.makeBitmapImage('egg', {x:47, y: 47}, 0, true, MasterSS),
            hitBox          = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawCircle(47,47,47));

        bubble.name          = "bubbleBackground";
        icon.name            = "icon";

        bubble.hitArea = hitBox;

        bubble.on('click', function () {
                        
            if (window.com.camelot.iwg.lib.Board.instance.getBubbleClickCounter() === 0){
                
                window.com.camelot.iwg.lib.Board.instance.incBubbleClickCounter();
                if( self.getClickable()) {
    
                    self.setClickable(false);
    
                    if ( self.getEnabled()){
    
                        self.setEnabled(false);
                        self.setVisable(false);
    
                        var iconsLeft =  Number(com.camelot.iwg.lib.Board.instance.getIconsLeft());
    
                        if ( iconsLeft === 1 || self.getIcon() === "star"){
    
                            bankBubble.bind(self)();
                        
                        } else {
                            // reveal aninmation
                            popBubble.bind(self)();
                        }
    
                    } else {
                        // bounce animation
                        wrongBubble.bind(self)();
    
                    };
                }
                
                setTimeout(function() {
                    window.com.camelot.iwg.lib.Board.instance.decBubbleClickCounter();  
                }, 100 );
                
            }
            
            
            
        });

        this.getStage().addChild(bubble, icon);

    };

    function bankBubble() {

       // iwg.IWGEM.trigger("bankBubble")
        var self                = this,
            bubbleBackground    = this.getStage().getChildByName("bubbleBackground"),
            icon                = this.getStage().getChildByName("icon"),
            iconValue           = this.getIcon(),
            popTimeline         = new TimelineMax({
                onStartParams: [iconValue],
                onStart: function(iconValue){
                    self.setActive(true);
                    if ( Sound.instance.getSound()){
                        createjs.Sound.play("bubblePop");
                    };
                },
                onCompleteParams: [iconValue],
                onComplete: function(iconValue){
    
                    self.setActive(false);
                    self.setPopulated(false);
                    self.setRotation(0);
                    TweenMax.set( self.getCanvas(), { x: self.getPosition().x, y: self.getPosition().y });
    
                    iwg.IWGEM.trigger('updateLegend', [iconValue]);
    
                    if ( iconValue !== "star") {
                        iwg.IWGEM.trigger('nextLevel');
                    }
                    
                }
            });
            
            if ( iconValue === "star") {
                iwg.IWGEM.trigger("bubbleClick", [true]);
                iwg.IWGEM.trigger('incStar');
            } else {
                iwg.IWGEM.trigger("bubbleClick", [false]);
            }

            popTimeline.to(bubbleBackground, 0.5, { alpha:0, ease:Elastic.easeInOut}, "0")
                       .to(self.getCanvas(), 0.7, { x: 790, y: 35, scaleX:0.5, scaleY:0.5, ease:Power4.easeInOut})
                       .to(icon, 0.5, { scaleX:0.1, scaleY:0.1, alpha:0, delay:0.2, ease:Elastic.easeInOut,
                            onStart: function(){
                                if ( Sound.instance.getSound()){
                                    iwg.IWGEM.trigger('highlightPrizeTable');
                                    if ( iconValue === "star") {
                                        createjs.Sound.play("bonusStars");
                                    } else {
                                        createjs.Sound.play("bankSymbol");
                                    }
                                };
                            }
                       });

        // only fire "hide text on last go" if not a star
        if (iconValue != "star") {
            iwg.IWGEM.trigger("lastFind");
        }
    };

    function popBubble() {

        var self                = this,
            bubbleBackground    = this.getStage().getChildByName("bubbleBackground"),
            icon                = this.getStage().getChildByName("icon"),
            popTimeline         = new TimelineMax({ onStart: function(){
                iwg.IWGEM.trigger("bubbleClick");
                  self.setActive(true);
                if ( Sound.instance.getSound()){
                    createjs.Sound.play("bubblePop");
                };
            }, onComplete: function(){
                self.setActive(false);
                self.setPopulated(false);
                self.setRotation(0);
            }});

            popTimeline.to(bubbleBackground, 0.5, { alpha:0, ease:Elastic.easeInOut}, "0")
                       .to(icon, 0.5, { scaleX:0.1, scaleY:0.1, alpha:0, delay:0, ease:Elastic.easeInOut}, "0");



    };

    function wrongBubble() {

        if ( this.getVisable() ){

            var self                = this,
                bubbleBackground    = this.getStage().getChildByName("bubbleBackground"),
                icon                = this.getStage().getChildByName("icon"),
                origBubX            = this.getBubbleScale(),
                origIconX           = this.getBubbleScale();

                self.setActive(true);

                var bubbleTween = TweenMax.to(bubbleBackground, 0.25, { scaleX:0.75, scaleY:0.75, rotation:180, ease:Bounce.easeInOut, yoyo:true, repeat:1,
                                onStart: function() {
                                    if (Sound.instance.getSound()) {
                                        createjs.Sound.play("symbolSpin");
                                    }
                                },
                                onComplete: function() {
                                    bubbleBackground.scaleX = bubbleBackground.scaleY = origBubX;
                                    self.getStage().update();

                                }});

                var iconTween = TweenMax.to(icon, 0.25, {  scaleX:0.9, scaleY:0.9, delay:"0",  ease:Bounce.easeInOut, yoyo:true, repeat:1,
                                onStart: function() {

                                },
                                onComplete: function() {
                                    icon.scaleX = icon.scaleY = origIconX;
                                    self.setClickable(true);
                                    self.getStage().update();
                                    self.setActive(false);
                                }});

        }

    };

    function wobbleBubble(delay) {

        return false;

        var self                    = this,
            bubbleBackground        = this.getStage().getChildByName("bubbleBackground"),
            wobbleBubbleTimeline    = new TimelineMax({onStart: function() {
                self.setActive(true);
            },onComplete: function(){
                self.setActive(false);
                iwg.IWGEM.trigger('wobbleBubbleInit');
            }});

            wobbleBubbleTimeline.to(bubbleBackground, 2, { scaleX:0.8, scaleY:0.8, rotation:180 , delay:delay / 30, ease:Elastic.easeIn, repeat:1, yoyo:true });


    };

    Bubble.prototype.destroy = function() {

        this.unsubscribe();
        //this.getCanvas().parentNode.removeChild(this.getCanvas());

    };

    Bubble.VERSION = '0_0_1';
    IWGInit = function () {
        _Bubble = new Bubble();
    };
    iwg._class("iwg.lib.Bubble", Bubble);
}(window));
