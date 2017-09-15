(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        images          = core.iwgLoadQ.images,
        CalendarSS      = lib.SS.CalendarSS,
        Helper          = lib.Helper,
        Calendar  = function (name) {
            
			if (!name){
                console.warn('Calendar instance has no name');
                return false;
            }

            // singleton
            if (typeof Calendar.instance === "object") {
                return Calendar.instance;
            }
            Calendar.instance = this;


		    var _instance       = this,
                _name           = name,
                _stage          = null,
                _canvas         = null,
                _calendarBg     = null,
                _calendarFlip   = null,
                _calendarMonth  = null,
                _active         = false,
                _height         = null,
                _width          = null,
                _update         = function () {
                    if(_active) {
                        _stage.update();
                    }
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('update', _update);
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
            this.getCalendarFlip  = function(){
                return _calendarFlip;
            };
            this.getCalendarMonth  = function(){
                return _calendarMonth;
            };
            this.getCalendarBg  = function(){
                return _calendarBg;
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
            this.setActive  = function( prv ) {
                _active = prv;
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };

    	    core.IWG.ame('canvasStack', {
                create: _name,
                w: 200,
                h: 280,
                z: 7,
                parentDiv: "scaleDiv"
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();

        };

    function init() {

        setupLayout.bind(this)();
        
        // align canvas
        TweenMax.set( this.getCanvas(), { x: 180, y: -90 });

        this.getStage().update();

    }

    function setupLayout() {
        
        this._calendarBg        = Helper.makeBitmapImage("calendar_background", {x: 0, y: 0}, 1, false, CalendarSS);
        this._calendarMonth     = Helper.makeBitmapImage("calendar_month_00", {x: 0, y: 0}, 1, false, CalendarSS); 
        this._calendarFlip      = Helper.makeBitmapImage("calendar_00", {x: 0, y: 0}, 1, false, CalendarSS);
        this.getStage().addChild(this._calendarBg,this._calendarMonth,this._calendarFlip);
        
        this._calendarMonth.gotoAndStop("month");
        
        var self = this;
        
        this._calendarMonth.on('click', function () {
            // pause test
            console.log("clicked");
            self.pause();
        });


    }
    
    Calendar.prototype.start = function () {
        var self = this;
        this.setActive(true);
        this._calendarFlip.gotoAndPlay("flip");
        this._calendarFlip.on("change", function(evt){ 
            var currentFlipFrame = self._calendarFlip.currentFrame;
          
           if( currentFlipFrame == 5) {
                
                var currentMonthFrame = self._calendarMonth.currentFrame;

                if(currentMonthFrame == 26) {
                    currentMonthFrame = 14;
                } 
                
                self._calendarMonth.gotoAndStop(currentMonthFrame+1);
                
           }
            
        });
        this._calendarFlip.on("animationend", function(evt){ 

             self._calendarFlip.gotoAndPlay("flip");
                             
        });
    };
    
    Calendar.prototype.pause = function () {
        //this._calendarFlip.stop();
        //this.setActive(false);
    };
    
    Calendar.prototype.resume = function () {
        this.setActive(true);
        this._calendarFlip.play();
    };

    Calendar.prototype.destroy = function() {
        this.unsubscribe();
    };

    Calendar.VERSION = '0_0_1';

    iwg._class("iwg.lib.Calendar", Calendar);
}(window));
