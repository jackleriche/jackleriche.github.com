(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Sound           = lib.Sound,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        Timer = function (name) {

			if (!name){
            	console.warn('Timer instance has no name');
                return false;
            }

            if (typeof Timer.instance === "object") {
               return Timer.instance;
            }
            Timer.instance = this;

		    var _instance       = this,
		        _name           = name,
		        _stage          = null,
                _canvas         = null,
                _active         = true,
                _height         = null,
                _width          = null,
                _zIndex         = 0,
                _orientation    = "landscape",
                _position       = {
                    x: null,
                    y: null
                },
                _reg            = {
                    x: null,
                    y: null
                },
                _alpha          = 1,
                _scale          = {
                    x: 1,
                    y: 1
                },
                _markers        = [],
                _bubbleBar      = [],
                _time           = 0,
                _timer          = null,
                _bubbleTimer    = null,
                _running        = false,
                _currentTime    = 0,
                _previousTrophy = null,
                _currentTrophy  = null,
                /*
                 *  Name:           _gameStart
                 *  Description:    Method called to start game, creates a timeline for the bubbles and a tween for the
                 *					time set also triggers nextLevel which kicks game off from -1 to 0;
                 *  Params:         null
                 *  Returns:        null
                 */
                _gameStart      = function() {

                    _running    = true;
                    _active     = true;
                    // stagger bubbles
                    _bubbleTimer = new TimelineMax();
                    _bubbleTimer.staggerTo(_bubbleBar, 0.2, { alpha: 0 }, 3);

                    // time
                    _timer = TweenMax.to(_canvas, 1, { repeat: 90, onComplete: function(){
                        iwg.IWGEM.trigger('initEndGame');
                    },onRepeat: function() {
                        _currentTime++
                        checkMarkers.bind(_instance)();
                        updateTimer.bind(_instance)();

                    }});

                    // start game
                    iwg.IWGEM.trigger('nextLevel');

                },
                /*
                 *  Name:           _gamePause
                 *  Description:    Pause the game timer
                 *  Params:         null
                 *  Returns:        null
                 */
                _gamePause      = function() {
                    if (_running){
                        _active = false;
                        _timer.pause();
                        _bubbleTimer.pause();
                    };
                },
                /*
                 *  Name:           _gamePlay
                 *  Description:    Plays the game timer
                 *  Params:         null
                 *  Returns:        null
                 */
                _gamePlay       = function() {
                    if (_running){
                        _active = true;
                        _timer.play();
                        _bubbleTimer.play();
                    };
                },
                /*
                 *  Name:           _endGame
                 *  Description:    called on endGame to kill timers
                 *  Params:         null
                 *  Returns:        null
                 */
                _endGame        = function() {

                    _running    = false;

                },
                _update         = function() {
                    if ( _active ){
                        _stage.update();
                    }
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('gameStart', _gameStart);
                    iwg.IWGEM.on('gamePause', _gamePause);
                    iwg.IWGEM.on('gamePlay', _gamePlay);
                    iwg.IWGEM.on('endGame', _endGame);
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('gameStart');
                    iwg.IWGEM.off('gamePause');
                    iwg.IWGEM.off('gamePlay');
                    iwg.IWGEM.off('endGame');
                };

            // getters
            this.getStage           = function () {
                return _stage;
            };
            this.getCanvas          = function () {
                return _canvas;
            };
            this.getActive          = function () {
                return _active;
            };
            this.getHeight          = function () {
                return _height;
            };
            this.getWidth           = function () {
                return _width;
            };
            this.getOrientation     = function () {
                return _orientation;
            };
            this.getMarkers         = function () {
                return _markers;
            };
            this.getBubbleBar       = function () {
                return _bubbleBar;
            };
            this.getTime            = function () {
                return _time;
            };
            this.getRunning         = function () {
                return _running;
            };
            this.getCurrentTime     = function () {
                return _currentTime;
            };
            this.getCurrentTrophy   = function () {
                return _currentTrophy;
            };
            this.getPreviousTrophy   = function () {
                return _previousTrophy;
            };

            // setters
            this.setActive          = function ( prv ) {
                _active = prv;
            };
            this.setWidth           = function ( prv ) {
                _width = prv;
            };
            this.setHeight          = function ( prv ) {
                _height = prv;
            };
            this.setPosition        = function ( prv ) {
                if (prv.x) {
                    _position.x = prv.x;
                };
                if (prv.y) {
                    _position.y = prv.y;
                };
                TweenMax.set(_canvas, { x: _position.x, y: _position.y});
            };
            this.setTime            = function ( prv ) {
                // may need to add functionality to add time during coutdown
                if (_time === 0 ){
                    _time = prv;
                }
            };
            this.setCurrentTrophy   = function ( prv ) {
                _currentTrophy = prv;
            };
            this.setPreviousTrophy   = function ( prv ) {
                _previousTrophy = prv;
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };

            core.IWG.ame('canvasStack', {
                create: _name,
                parentDiv: 'scaleDiv',
                w: 960,
                h: 55,
                z: 4
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();

        };

    function init() {

        setupLayout.bind(this)();

    }

    function setupLayout() {

        var bar                 = Helper.makeBitmapImage( 'timer_bubble_container', {x: 0, y: 0}, 1, false, MasterSS ),
            timeString          = new createjs.Text( 'TIME: ', "20px komika_axisregular", '#ffffff' ),
            remainingTime       = new createjs.Text( '0:90', "bold 30px komika_axisregular", '#ffffff' ),
            barBubbleContainer  = new createjs.Container();

            timeString.textBaseline = "alphabetic";
            timeString.x        = 50;
            timeString.y        = 40;

            remainingTime.name  = 'remainingTime';
            remainingTime.textBaseline = "alphabetic";
            remainingTime.x     = 120;
            remainingTime.y     = 40;

        timeString.shadow       = new createjs.Shadow("#000000", 2, 2, 3);
        remainingTime.shadow    = new createjs.Shadow("#000000", 2, 2, 3);

        if (this.getOrientation() === "landscape") {
            bar.x = 200;
        };

        for ( var i = 0; i < 30; i++ ) {

            var bubble = Helper.makeBitmapImage('bubble_tube_cropped', {x: 225 + (24 * i), y: 28}, 1, true, MasterSS );
            this.getBubbleBar().push(bubble);
            barBubbleContainer.addChild(bubble);

        };

        this.getBubbleBar().reverse();
        this.getStage().addChild(bar, timeString, remainingTime, barBubbleContainer);

        var self = this;
        setTimeout(function () {
            self.getStage().update();
        }, 10);
    }

    function checkMarkers() {

        // set previous to
        this.setPreviousTrophy( this.getCurrentTrophy() );

        var self = this,
            currentTrophy   = null;

        for ( var i = 0; i < this.getMarkers().length; i++ ) {

            if ( this.getCurrentTime() > this.getMarkers()[i].time ){
                // remove  marker
                var marker          = this.getMarkers()[i];
                if( !marker.isPlaying ){
                    marker.isPlaying = true;
                    TweenMax.to(marker, 1.5, {  delay: 0, rotation:360, alpha: 0.4, ease:Elastic.easeOut, onStart: function(){
                            if ( Sound.instance.getSound()){
                                createjs.Sound.play("trophyWobble");
                            };
                        }, onComplete: function() {
                        self.getMarkers().pop();
                    }});
                }
            }

            currentTrophy = this.getMarkers()[i];

        }

        var markerName = this.getMarkers()[this.getMarkers().length - 1].name;
        this.setCurrentTrophy( markerName );

        // check if marker has changed

        if(this.getCurrentTrophy() !== this.getPreviousTrophy()) {

            wobbleTrophy(currentTrophy, self)

        }

    }

    function wobbleTrophy(trophy, self) {

        TweenMax.to(trophy, 1.2, {onStart: function(){
            self.setActive(true);
        }, delay: 0, rotation: 15,  yoyo:true, repeat:-1, ease:Elastic.easeInOut, onComplete: function() {
            self.setActive(false);
        }} )

    }

    function updateTimer() {

        var timeLeft = 90 - this.getCurrentTime();

        if (timeLeft.toString().length <= 1){
            timeLeft = "0"+timeLeft;
        }

        this.getStage().getChildByName('remainingTime').text = "0:" + timeLeft;
        this.getStage().update();

    }

    Timer.prototype.addMarker = function(img, pos, sec, name) {

        // set positions
        var posX    = 0,
            posY    = 0;

        if ( pos.x ) {
            posX = pos.x
        }
        if ( pos.y ) {
            posY = pos.y
        }

        var img         = Helper.makeBitmapImage(img, {x: posX, y: posY}, 1, true, MasterSS);
        img.time        = sec;
        img.isPlaying   = false;
        img.name        = name;

        this.getMarkers().push(img);
        this.getStage().addChild(img);
        this.getStage().update();

    };

    Timer.prototype.destroy = function() {

        this.unsubscribe();

    };

    Timer.VERSION = '0_0_1';
    IWGInit = function () {
        _Timer = new Timer();
    };
    iwg._class("iwg.lib.Timer", Timer);
}(window));
