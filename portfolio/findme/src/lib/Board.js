(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Bubble          = lib.Bubble,
        Ticket          = lib.Ticket,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        Board           = function (name) {

			if (!name){
                console.warn('Board instance has no name');
                return false;
            }

            if (typeof Board.instance === "object") {
                return Board.instance;
            }
            Board.instance = this;

		    var _instance       	= this,
		        _name           	= name,
		        _stage          	= null,
                _canvas         	= null,
                _active         	= false,
                _state				= null,
                _level          	= -1,           // set as -1 as game hasnt started yet!
                _iconsLeft      	= 3,
                _populate       	= [],
                _height         	= null,
                _width          	= null,
                _layoutPosition 	= [],
                _bubbles        	= [],
                _bubbleClickCounter = 0,
                _remainingBubbles	= [],
                _stars          	= 0,
                _endGameDisplayed   = false,
                _remainingTimeline	= null,
                /*
                 *  Name:           _initEndGame
                 *  Description:    Method called to pop all remaining bubbes on the screen and reveal
                 *					the remaining tokens that the player was to achive
                 *  Params:         null
                 *  Returns:        null
                 */
                _initEndGame        = function () {
                    
                    // check for end game state, only end game once
                    if (!_endGameDisplayed) {
                        
                        _endGameDisplayed = true;
    
                        var bubblesArray = [];
                        for (var i = 0; i < _bubbles.length; i++) {
    
                            bubblesArray.push(_bubbles[i].getCanvas());
    
                        }
                        iwg.IWGEM.trigger('wordBubbleDestroy');
    
                        TweenMax.staggerTo(bubblesArray, 0.4, { alpha: 0 }, "+0.01", _destroyBubbles.bind(_bubbles));
    
                        // bring in remaining icons
                        iwg.IWGEM.trigger('disableButtons');
                        iwg.IWGEM.trigger('gamePause');
                        iwg.IWGEM.trigger('showRemainingTokens');
                    
                    }

                },
                /*
                 *  Name:           _destroyBubbles
                 *  Description:    Method called to destroy all bubbles in the bubbleArray
                 *                  array is bound to 'this'
                 *  Params:         bubbleArray: Array
                 *  Returns:        null
                 */
                _destroyBubbles         = function () {

                    var array = this;
                    for ( var i = 0; i < array.length; i++) {
                        array[i].destroy();
                    };

                },
                 /*
                 *  Name:           _showRemainingTokens
                 *  Description:    Gathers up the remaining Tokens that the player was meant to collect
                 *					before time ran out, displays them on screen and moves them to prizeTableIcon
                 *  Params:         icon:String
                 *  Returns:        null
                 */
                _showRemainingTokens    = function () {
	                
	                _state					= "showRemainingTokens";

                    var turnsLeft           = 14 - _level,
                    	bubbleArray         = [];

                    for (var i = 0; i < turnsLeft; i++){

                        var iconNum = Ticket.instance.getTurns()[ _level + i ].f,
                            icon    = iconRef[iconNum].toLowerCase().replace(/\s/g, ''),
                            bubble  = _remainingBubbles.shift();

                        bubble.setIcon(icon,iconNum);

                        bubble.setAlpha(1);
                        bubble.setScale(0);

                        bubbleArray.push( bubble );

                        var bubbleBG    = bubble.getStage().getChildByName('icon'),
                            bubbleToken = bubble.getStage().getChildByName('bubbleBackground');

                        iwg.IWGEM.trigger('updateLegend', [bubble.getIcon()]);	

                        TweenMax.to(bubbleBG, 0.7, { scale: 1, alpha: 1, ease: Elastic.easeInOut});
                        TweenMax.to(bubbleToken, 0.7, { scale: 1, alpha: 1, ease: Elastic.easeInOut});

                    }

					var starsNotWon = Ticket.instance.getStarCount() - _stars;
                    
                    for ( var j = 0; j < starsNotWon; j++ ){

                        var iconNum = 71,
                            icon    = iconRef[iconNum].toLowerCase().replace(/\s/g, ''),
                            bonusBubble  = _remainingBubbles.pop();

                        bonusBubble.setIcon(icon);
                        bonusBubble.setAlpha(1);
                        bonusBubble.setScale(0);

                        bubbleArray.push( bonusBubble );

                        var bubbleBG    = bonusBubble.getStage().getChildByName('icon'),
                            bubbleToken = bonusBubble.getStage().getChildByName('bubbleBackground');

                        iwg.IWGEM.trigger('updateLegend', [bonusBubble.getIcon()]);

                        TweenMax.to(bubbleBG, 0.7, { scale: 1, alpha: 1, ease: Elastic.easeInOut});
                        TweenMax.to(bubbleToken, 0.7, { scale: 1, alpha: 1, ease: Elastic.easeInOut});

                    }

                    var bubbleCanvasArray = [];
                    for ( var k = 0; k < bubbleArray.length; k++ ) {
                        bubbleCanvasArray.push(bubbleArray[k].getCanvas());
                    };

                    _remainingTimeline = new TimelineMax({ onComplete: function(){
                        iwg.IWGEM.trigger('endGame');

                        for ( var k = 0; k < bubbleArray.length; k++) {
                            bubbleArray[k].destroy();
                        };

                    }});

                    _remainingTimeline.staggerTo(bubbleCanvasArray, 0.5, { scale: 1, ease: Elastic.easeInOut }, "+0.1")
                      .call( function(){
                          iwg.IWGEM.trigger('highlightPrizeTable');
                      })
                      .staggerTo(bubbleCanvasArray, 0.5, { x: 790, y: 35, scale: 0.5, alpha: 0.2}, "+0.1");

                },
                /*
                 *  Name:           _nextTurn
                 *  Description:    Takes an icon, itterates through all buubbles and enables bubbles which match, disables the rest
                 *                  also calls other events that initiate a new turn
                 *  Params:         icon:String
                 *  Returns:        null
                 */
                _nextLevel              = function () {

                    // populate board with previous turn data
                    if ( _level >= 0) {

                        for(var i = 0; i < _populate.length; i++) {
                            var bubble = Helper.getRandomFromArray(findRandomBubble.bind(_instance)());
                            bubble.setIcon(_populate[i]);
                            bubble.setScale(bubble.getScale());
                            if(bubble.getPopulated()){
                                bubble.setActive(false);
                            }

                        }

                    }
                    // empty _populate
                    _populate = [];

                    _level++                // knocks the level to 0 and starts game on first call
                    if ( _level < 14 ){
                        iwg.IWGEM.trigger('Board.nextLevel');
                    } else {

                        _initEndGame();
                        return false;

                    }

                    var icon        = Helper.removeFormat(iconRef[Ticket.instance.getTurns()[_level].f]),
                        pop         = Ticket.instance.getTurns()[_level].n.split(',');
                        for (var i = 0; i < pop.length; i++){

                            _populate.push( Helper.removeFormat(iconRef[Number(pop[i])]) );

                        }

                    for (var i = 0; i < _bubbles.length; i++){

                        var bubble = _bubbles[i];
                        // set all tokens to enabled = false
                        bubble.setEnabled(false);
                        // if the token matches the icon then set to true
                        if (bubble.getIcon() === icon || bubble.getIcon() === "star"){
                            bubble.setEnabled(true);
                        };

                    }

                },
                /*
                 *  Name:           _reduceIconsLeft
                 *  Description:    Remove 1 from iconsLeft
                 *  Params:         null
                 *  Returns:        null
                 */
                _reduceIconsLeft    = function() {
                    _iconsLeft--;
                },
                /*
                 *  Name:           _wobbleBubbleInit
                 *  Description:    initiallise wobble bubble, find two random bubbles and make call wobbleBubble() on each of them, then
                 *                  call _wobbleBubble after the animations
                 *  Params:         null
                 *  Returns:        null
                 */
                _wobbleBubbleInit   = function() {

                    //find random bubble
                    var bubble = Helper.getRandomFromArray(findRandomBubble.bind(_instance)(true));
                    bubble.wobbleBubble();

                },
                /*
                 *  Name:           _incStar
                 *  Description:    increment captured star
                 *  Params:         null
                 *  Returns:        null
                 */
                _incStar            = function () {
                    _stars++;
                },
                /*
                 *  Name:           _gameStart
                 *  Description:    called on game start, this method activates both the instruction and prize table buttons
                 *  Params:         null
                 *  Returns:        null
                 */
                _gameStart          = function () {
                    iwg.IWGEM.trigger('enableButtons');
                },
                _update             = function () {
                    if(_active) {
                        _stage.update();
                    }
                },
                _subscribe          = function () {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('gameStart', _gameStart);
                    iwg.IWGEM.on('nextLevel', _nextLevel);
                    iwg.IWGEM.on('Bubble.reduceIconsLeft', _reduceIconsLeft);
                    iwg.IWGEM.on('wobbleBubbleInit', _wobbleBubbleInit);
                    iwg.IWGEM.on('initEndGame', _initEndGame);
                    iwg.IWGEM.on('showRemainingTokens', _showRemainingTokens);
                    iwg.IWGEM.on('incStar', _incStar);
                }(),
                _unsubscribe        = function () {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('gameStart');
                    iwg.IWGEM.off('nextTurn');
                    iwg.IWGEM.off('Bubble.reduceIconsLeft');
                    iwg.IWGEM.off('wobbleBubbleInit');
                    iwg.IWGEM.off('initEndGame');
                    iwg.IWGEM.off('showRemainingTokens');
                    iwg.IWGEM.off('incStar');
                };

            // getters
            this.getName            = function() {
                return _name;
            };
            this.getStage           = function() {
                return _stage;
            };
            this.getCanvas          = function() {
                return _canvas;
            };
            this.getActive          = function() {
                return _active;
            };
            this.getState			= function() {
	          	return _state;  
            };
            this.getLevel           = function() {
                return _level;
            };
            this.getHeight          = function() {
                return _height;
            };
            this.getWidth           = function() {
                return _width;
            };
            this.getLayoutPositions = function() {
                return _layoutPosition;
            };
            this.getBubbles         = function() {
                return _bubbles;
            };
            this.getBubbleClickCounter  = function() {
                return _bubbleClickCounter;  
            };
            this.getRemainingBubbles = function() {
	          	return _remainingBubbles;
            };
            this.getIconsLeft       = function() {
                return _iconsLeft;
            };
            this.getStars           = function() {
                return _stars;
            };
            this.getRemainingTimeline	= function() {
	          	return _remainingTimeline;  
            };

            // setters
            this.setActive          = function(prv) {
                _active = prv;
            };
            this.setWidth           = function(prv) {
                _width = prv;
            };
            this.setHeight          = function(prv) {
                _height = prv;
            };
            this.setBubbles         = function(prv) {
                _bubbles = [];
                _bubbles = prv;
            };
            this.setIconsLeft       = function(prv) {
                _iconsLeft = prv;
            };
            this.setState           = function(prv) {
                _state = prv;  
            };
            
            this.incBubbleClickCounter  = function() {
                _bubbleClickCounter++;
            };
            this.decBubbleClickCounter  = function() {
                _bubbleClickCounter--;
            };
            
            // unsubscribe
            this.unsubscribe        = function() {
                _unsubscribe;
            };


            core.IWG.ame('canvasStack', {
                create: _name,
                parentDiv: 'scaleDiv',
                w: 925,
                h: 560,
                z: 0
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();

        };

    function init() {

	    setupRemainingTokens.bind(this)();

    };

    function setupRemainingTokens() {

	    var bubblePosition = [
            [460, 300],
            [360, 300],
            [560, 300],
            [260, 300],
            [660, 300],
            [160, 300],
            [760, 300],
            [460, 190],
            [360, 190],
            [560, 190],
            [260, 190],
            [660, 190],
            [160, 190],
            [760, 190],
            [560,410],
            [360,410],
            [460,410]
        ];

        for ( var i = 0; i < 17; i++){

	        var bubble = new Bubble('remaining' + i);
	        bubble.setPosition({x:bubblePosition[i][0], y: bubblePosition[i][1]});
	        this.getRemainingBubbles().push(bubble);

        };

    }

    /*
     *  Name:           findRandombubbles
     *  Description:    finds a random bubble in the bubble array with the property passed in
     *  Params:         prop:Function, value:Bool
     *  Returns:        Bubble:Object
     */
    function findRandomBubble(pop) {

        var bubbleArray = [];


        // sifts through all bubbles to see if populated
        for ( var i = 0; i < this.getBubbles().length; i++) {

            var bubble = this.getBubbles()[i];
            if ( pop ){
                if (bubble.getPopulated()) {
                    // pushes non populated bubbles into an array
                    bubbleArray.push(bubble);
                };
            } else {
               if (!bubble.getPopulated()) {
                    // pushes non populated bubbles into an array
                    bubbleArray.push(bubble);
                };
            }

        }
        // retrieves and returns random array
        return Helper.shuffleArray(bubbleArray);

    };

    Board.prototype.addLayoutPosition = function(prv) {

        this.getLayoutPositions().push(prv);

    };

    Board.prototype.setupBoard = function() {

        var positions           = this.getLayoutPositions();

        for (var i = 0; i < positions.length; i++) {

            // retrieve position data
            var positionData    = positions[i];
            var bubble          = new Bubble('bubble_'+i);
            bubble.setPosition({x: positionData.x - 47, y: positionData.y - 47});
            bubble.setScale(positionData.scale);

            this.getBubbles().push(bubble);

        }

        // shuffle the bubble array location
        var shuffledArray = Helper.shuffle(this.getBubbles());
        this.setBubbles(shuffledArray);

        this.getStage().update();

    };

    Board.prototype.populateIcons = function() {

        var initialIcons  = Ticket.instance.getParams().i;

        for ( var j = 0; j < initialIcons.length; j++){

            var data    = initialIcons[j],
            icon        = iconRef[data];

            if (Helper.isDefined(icon)) {
                var icon = icon.toLowerCase().replace(/\s/g, '');
            }

            var bubble      = this.getBubbles()[j];
            bubble.setIcon(icon, data);

        }

    };

    Board.prototype.destroy = function() {

        this.unsubscribe();

    };

    Board.VERSION = '0_0_1';
    IWGInit = function () {
        _Board = new Board();
    };
    iwg._class("iwg.lib.Board", Board);
}(window));