(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Ticket          = lib.Ticket,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        Legend          = lib.Legend,
        Timer           = lib.Timer,
        EndGame         = lib.EndGame,
        Bubble          = lib.Bubble,
        Board           = lib.Board,
        PrizeTable = function (name) {

			if (!name){
                console.warn('PrizeTable instance has no name');
                return false;
            }
            
            if (typeof PrizeTable.instance === "object") {
                return PrizeTable.instance;
            }
            PrizeTable.instance = this;
            
		    var _instance           = this,
		        _name               = name,
		        _buttonStage        = null,
		        _overlayStage       = null,
                _buttonCanvas       = null,
                _overlayCanvas      = null,
                _buttonActive       = false,
                _overlayActive      = false,
                _visible            = false,
                _isMoving           = false,
                _enabled            = true,
                _height             = null,
                _width              = null,
                _legend             = new Legend(name),
                _buttonPosition     = {
                    x: 0,
                    y: 0                    
                },
                _overlayPosition    = {
                    x: 0,
                    y: 0  
                },
                _buttonTimeline     = null,
                _update             = function() {
                    if(_buttonActive) {
                        _buttonStage.update();    
                    }
                    if (_overlayActive){
                        _overlayStage.update();  
                    }          
                },
                _endGame            = function () {
                    var greenBTN = _buttonStage.getChildByName('prizeTableButtonContainer').getChildByName('icon_legend_green');
                    
                    TweenMax.to(greenBTN, 1, { delay: 1, onStart: function() {
                        _buttonActive = true;  
                    },alpha: 1, onComplete: function() {
                        _buttonActive = false;
                    }});
                    
                    _overlayStage.update();
                },
                _showPrizeTable     = function() {
                    
                    if (Board.instance.getState() !== "panelShowing") {
                        
                        Board.instance.setState("panelShowing");
                    
                        iwg.IWGEM.trigger('hideEndGame');
                        iwg.IWGEM.trigger('gamePause');
                        iwg.IWGEM.trigger('showOverlay');
                        iwg.IWGEM.trigger('disableButtons');
                                   
                        // update the stage
                        _overlayStage.update();
                        
                        _isMoving = true;
    
                        if ( _visible !== true ){
                            
                            TweenMax.to(_overlayCanvas, 1.5, { delay: 0.3, x: 0,  overwrite:"all", ease:Elastic.easeOut, onComplete: function(){
                                _visible  = true;
                                _isMoving = false;
                            }});
                            
                        }
                       
                    }                    
                    
                },
                _hidePrizeTable     = function() {
                        
                    iwg.IWGEM.trigger('showEndGame');
                    iwg.IWGEM.trigger('hideOverlay');

                    _isMoving = true;

                    if ( _visible ){
                         _visible    = false;
                        TweenMax.to(_overlayCanvas, 1.5, {x: 1200, overwrite:"all", ease:Elastic.easeOut, onComplete: function(){
                           
                            _enabled    = true;
                            _isMoving   = false;
                            iwg.IWGEM.trigger('gamePlay');
                            
                            Board.instance.setState(null);
                        }});         
                    }
                },
                _disableButtons     = function(names) {
                    
                    if(Helper.isDefined(names)){
                        if (names.length > 0) {
                            // if there is a name go through and check name matches
                            for (var i = 0; i < names.length; i++){
                                if(names[i] === _name){
                                    _enabled = false;
                                    disableButton.bind(_instance)(_buttonStage.getChildByName('prizeTableButtonContainer').getChildByName('icon_legend'));
                                };
                            };
                        }    
                    } else if (!Helper.isDefined(names)){  // if no name is in names then disable all buttons
                        _enabled = false;
                        disableButton.bind(_instance)(_buttonStage.getChildByName('prizeTableButtonContainer').getChildByName('icon_legend'));
                    }
                },
                _enableButtons      = function(names) {
                    
                    if(Helper.isDefined(names)){
                        if (names.length > 0) {
                            // if there is a name go through and check name matches
                            for (var i = 0; i < names.length; i++){
                                if(names[i] === _name){
                                    _enabled = true;
                                    enableButton.bind(_instance)(_buttonStage.getChildByName('prizeTableButtonContainer').getChildByName('icon_legend'));
                                };
                            };
                        }
                    } else if (!Helper.isDefined(names)){
                        // if no name is in names then enable all buttons
                        _enabled = true;
                        enableButton.bind(_instance)(_buttonStage.getChildByName('prizeTableButtonContainer').getChildByName('icon_legend'));
                    };
                },
                /*
                 *  Name:           _highlightPrizeTable
                 *  Description:    event triggered when bubble finishes tween to prizeTable button, button will grow and fade to 
                 *                  another color
                 *  Params:         null
                 *  Returns:        null
                 */
                _highlightPrizeTable    = function() {
                    
                    var buttonHighlight = _buttonStage.getChildByName('prizeTableButtonContainer').getChildByName('icon_legend_green');
                    
                    var newTween = TweenMax.to(_buttonCanvas, 0.25, { scale:1.2, repeat:5, yoyo:true, overwrite:"all",
                        onStart: function() {
                            _buttonActive = true;                                
                             buttonHighlight.alpha = 1;
                        },
                        onComplete: function() {
                            buttonHighlight.alpha = 0;
                            _buttonActive = false;
                            _buttonStage.update(); 
                        }});
                },
                _subscribe              = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('endGame', _endGame);
                    iwg.IWGEM.on('showPrizeTable', _showPrizeTable);
                    iwg.IWGEM.on('hidePrizeTable', _hidePrizeTable);
                    iwg.IWGEM.on('disableButtons', _disableButtons);
                    iwg.IWGEM.on('enableButtons', _enableButtons);
                    iwg.IWGEM.on('highlightPrizeTable', _highlightPrizeTable);
                }(),
                _unsubscribe            = function() {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('endGame');
                    iwg.IWGEM.off('showLegend');
                    iwg.IWGEM.off('hideLegend');
                    iwg.IWGEM.off('disableButtons');
                    iwg.IWGEM.off('enableButtons');
                    iwg.IWGEM.off('highlightPrizeTable');
                    iwg.IWGEM.off('highlightPrizeTable');
                };
            
            // getters
            this.getName                = function() {
                return _name;  
            };
            this.getButtonStage         = function() {
                return _buttonStage;  
            };
            this.getOverlayStage        = function() {
                return _overlayStage;  
            };
            this.getButtonCanvas        = function() {
                return _buttonCanvas;  
            };
            this.getOverlayCanvas       = function() {
                return _overlayCanvas;  
            };
            this.getButtonPosition      = function() {
                return _buttonPosition;  
            };
            this.getOverlayPosition     = function() {
                return _overlayPosition;  
            };
            this.getActive              = function() {
                return _active;  
            };
            this.getEnabled             = function() {
                return _enabled;  
            };
            this.getHeight              = function() {
                return _height;  
            };
            this.getWidth               = function() {
                return _width;  
            };
            this.getLegend              = function() {
                return _legend;  
            };
            this.getIsMoving           = function () {
                return _isMoving;           
            };
                        
            // setters
            this.setWidth               = function (prv) {
                _width = prv;  
            };
            this.setHeight              = function (prv) {
                _height = prv;  
            };
            this.setButtonActive        = function (prv) {
                _buttonActive = prv;
            };
            this.setOverlayActive       = function (prv) {
                _overlayActive = prv;
            };
            this.setButtonPosition      = function (prv) {
                
                if (prv.x) {
                    _buttonPosition.x = prv.x;
                };
                if (prv.y) {
                    _buttonPosition.y = prv.y;
                };
                
                TweenMax.set(_buttonCanvas, {x: _buttonPosition.x, y: _buttonPosition.y});

            };
            this.setOverlayPosition     = function (prv) {
                
                if (prv.x) {
                    _overlayPosition.x = prv.x;
                };
                if (prv.y) {
                    _overlayPosition.y = prv.y;
                };
                
                TweenMax.set(_overlayCanvas, {x: _overlayPosition.x, y: _overlayPosition.y});

            };
            this.setIsMoving           = function (prv) {
                _isMoving = prv            
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;  
            };
            
            core.IWG.ame('canvasStack', {
                create: _name + "button",
                parentDiv: 'scaleDiv',
                w: 58,
                h: 58,
                z: 6
            });
            core.IWG.ame('canvasStack', {
                create: _name + 'overlay',
                parentDiv: 'scaleDiv',
                w: 955,
                h: 600,
                z: 3
            });

            _buttonCanvas   = document.getElementById(_name + "button");
            _overlayCanvas  = document.getElementById(_name + "overlay");
            
            _buttonStage    = new createjs.Stage(_buttonCanvas);
            _overlayStage   = new createjs.Stage(_overlayCanvas);
            
            init.bind(this)();
           
        };
    
    function init() {
        
        setupButtonLayout.bind(this)();
        setupOverlayLayout.bind(this)();
        
        this.getButtonStage().update();
        this.getOverlayStage().update();
        
    }    
    
    function setupButtonLayout() {
        
        var self            = this,  
            buttonContainer = new createjs.Container(),  
            button          = Helper.makeBitmapImage('icon_legend', { x: 29, y: 29}, 0.5, true, MasterSS),
            buttonHighlight = Helper.makeBitmapImage('icon_legend_green', { x: 29, y: 29}, 0, true, MasterSS);
        
        buttonContainer.name = "prizeTableButtonContainer";
        
        buttonHighlight.alpha = 0;
        
        buttonContainer.on('click', function(){
           
            if (self.getEnabled() && !self.getIsMoving()){
                iwg.IWGEM.trigger('showPrizeTable');
            };          
            
        });
        
        buttonContainer.addChild(button, buttonHighlight)
        this.getButtonStage().addChild(buttonContainer);

    };
    
    function setupOverlayLayout() {
        
        var tab             = Helper.makeBitmapImage('legend_tab', {x: 480, y: 45}, 1, true, MasterSS),
            close           = Helper.makeBitmapImage('icon_close', {x:29, y:77}, 1, true, MasterSS),            
            background      = new createjs.Shape();            
            close.name      = "close";
            var self        = this;

            var hitBox      = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawCircle(-20,0,100));
            close.hitArea   = hitBox;
            
            close.on('click', function(){

                if (!self.getIsMoving()) {
                    if(EndGame.instance.getEnabled()){
                        iwg.IWGEM.trigger('enableButtons', ["prizeTable"]);
                    } else {
                        iwg.IWGEM.trigger('enableButtons');
                    }                
                    iwg.IWGEM.trigger('hidePrizeTable');
                }
            });

        // give space for the border and shadow
        background.graphics.setStrokeStyle(5,"round").beginStroke('#fff').beginFill('rgba(0,0,0,0.8)').drawRoundRect(29,77,910,470,10);
        background.shadow = new createjs.Shadow("#000000", 1, 5, 10);

        this.getOverlayStage().addChild(background, close, tab);

        
        
        var prizeAmounts    = [50000,5000,400,200,100,60,40,20,10,4,2,5],
            rowX            = 60,
            rowY            = 50;
            
        // add rows
        for ( var i = 0; i < Ticket.instance.getLegend().length; i++){
            
            var legendData = Ticket.instance.getLegend()[i],
                rowContainer = new createjs.Container();
                
                rowContainer.x = rowX;
                rowContainer.y = rowY+= 75;
            
            var prize           = Helper.makeBitmapImage('l'+prizeAmounts[i], {x: 270, y: -22}, 1, false, MasterSS);
            prize.value         = prizeAmounts[i]; 
            
            if(i > 5){
                prize.x = 205;
            }
            
            rowContainer.addChild(prize);
            var rowIcons = [];
            for ( var j = 0; j < legendData.length; j++) {
                
                var iconContainer   = new createjs.Container(),
                    iconString      = iconRef[legendData[j]].toLowerCase().replace(/\s/g, ''),
                    icon            = Helper.makeBitmapImage('l'+iconString, {x: 0, y: 0 }, 1, true, MasterSS),
                    iconHighlight   = Helper.makeBitmapImage('bubble_legend', {x: 0, y: 0}, 1, true, MasterSS),
                    iconMask        = icon.clone();
                    
                iconHighlight.alpha = 0;
                
                // add filter
                var colorMatrix = new createjs.ColorMatrix();
            	colorMatrix.adjustBrightness(-100);
            	
            	iconMask.filters = [ new createjs.ColorMatrixFilter(colorMatrix) ];
                iconMask.cache(0, 0, icon.getBounds().width, icon.getBounds().height);
                
                icon.name           = "icon";
                iconHighlight.name  = "iconHighlight";
                iconMask.name       = "iconMask";

                iconContainer.iconNumber = legendData[j];
                iconContainer.niceName = iconString;
                iconContainer.name = iconRef[legendData[j]];
                iconContainer.revealed = false;
                    
                iconContainer.x = (67 * j)+30;
                iconContainer.y = 0;
                    
                iconContainer.addChild(iconHighlight, icon, iconMask);
                rowContainer.addChild(iconContainer);
                rowIcons.push(iconContainer);
            }
            
            // bonus legend row
            var sequential = false;
            if(i === Ticket.instance.getLegend().length){
                sequential = true;
            };

            this.getLegend().addRow( prize, rowIcons, sequential );
            this.getOverlayStage().addChild(rowContainer);
            
            if ( i === 5 ){
                rowX += 540;
                rowY = 50;
            }
            
        }
        
        var bonusRowBG      = new createjs.Shape(),
            bonusRowText    = new createjs.Text("bonus prize", "20px komika_axisregular", "#000");
            
        bonusRowBG.graphics.beginFill('white').drawRect(475,465,105,78);
        bonusRowText.x          = 528;
        bonusRowText.y          = 475;
        bonusRowText.lineWidth  = 100;
        bonusRowText.textAlign  = "center";
        
        this.getOverlayStage().addChild(bonusRowBG, bonusRowText);
        
    };
    
    function disableButton(button) {
        
        var self = this;
        
        TweenMax.to(button, 0.3, { onStart: function(){
            self.setButtonActive(true);
        }, delay: 0.1, alpha: 0.5, onComplete: function(){
            self.setButtonActive(false);
        } }); 
        
    }
    
    function enableButton(button) {
        
        var self = this;
        
        TweenMax.to(button, 0.3, { onStart: function(){
            self.setButtonActive(true);
        }, delay: 0.1, alpha: 1, onComplete: function(){
            self.setButtonActive(false);
        } });
        
    }
    
    PrizeTable.prototype.destroy = function() {
     
        this.unsubscribe();
        
    }
    PrizeTable.VERSION = '0_0_1';
    IWGInit = function () {
        _PrizeTable = new PrizeTable();
    };
    
    iwg._class("iwg.lib.PrizeTable", PrizeTable);
}(window));