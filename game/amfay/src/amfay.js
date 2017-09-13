(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Scale           = lib.Scale,
        Helper          = lib.Helper,
        images          = core.iwgLoadQ.images,
        ImageSS         = lib.SS.ImageSS,
        QueueManager    = lib.QueueManager,
        Ticket          = lib.Ticket,
        MainGameLayout  = lib.MainGameLayout,

        _Amfay,
        Amfay = function () {

            if (typeof Amfay.instance === "object") {
                return Amfay.instance;
            }
            Amfay.instance = this;

            var _name           = "background",
                _stage          = null,
                _canvas         = null,
                _mainContainer  = new createjs.Container(),
                _active         = true,
                _fps            = 24,
                _position       = {
                    x: 0,
                    y: 0
                },
                _width          = core.IWG.ame('get', {vars: ['availableWidth']}),
                _height         = core.IWG.ame('get', {vars: ['availableHeight']}),
                _ticket         = core.IWG.ame('ticket'),
                _startSound     = function() {

                    if ( Sound.instance.getSound()){

                        _bgSound.play();
                    };

                },
                _clickCount     = 0,
                _state          = null,
                _checkFinish    = function() {
                    _clickCount++;
                    if (_clickCount >= 4 && _state !== "endGame"){
                        _state  = "endGame";
                        iwg.IWGEM.trigger('endGame');
                    };                                          
                },
                _promptCount         = 0,
                _incClickCount      = function() {
                    
                    _promptCount++;
                    
                    var docu = document.getElementById('IWGholder');
                    
                    TweenMax.to(docu, 0, {delay: 4, onComplete: function() {
                        _promptCount--;
                        if(_promptCount <= 0){
                            _promptCount = 0;
                            iwg.IWGEM.trigger('promptStart');
                        }
                    }});
                      
                },
                _pauseGame      = function() {
                    _active = false;
                },
                _resumeGame     = function() {
                    _active = true;
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('startSound', _startSound);
                    iwg.IWGEM.on('animationEnd', _checkFinish)
                    iwg.IWGEM.on('showPauseScreen', _pauseGame);
                    iwg.IWGEM.on('hidePauseScreen', _resumeGame);
                    iwg.IWGEM.on('incClickCount', _incClickCount);
                    iwg.IWGEM.on('gameReady', gameReady);
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('startSound');
                    iwg.IWGEM.off('animationEnd')
                    iwg.IWGEM.off('showPauseScreen');
                    iwg.IWGEM.off('hidePauseScreen');
                    iwg.IWGEM.off('incClickCount');
                    iwg.IWGEM.off('gameReady');
                };


            // getters
            this.getStage = function(){
                return _stage;
            };
            this.getCanvas = function(){
                return _canvas;
            };
            this.getMainContainer = function(){
                return _mainContainer;
            };
            this.getActive = function(){
                return _active;
            };
            this.getFPS = function(){
                return _fps;
            };
            this.getWidth = function(){
                return _width;
            };
            this.getHeight = function(){
                return _height;
            };
            this.getTicket = function(){
                return _ticket;
            };

            // setters
            this.setWidth = function(prv) {
                _width = prv;
            };
            this.setPosition        = function(prv) {
                if ( prv.x ) {
                    _position.x = prv.x;
                };

                if ( prv.y ) {
                    _position.y = prv.y;
                };

                TweenMax.set(_canvas, { x: _position.x, y: _position.y });

            };
            this.setHeight = function(prv) {
                _height = prv;
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };

            init.bind(this)();

        };

    function init() {

        setupTicker.bind(this)();
        setupTicket.bind(this)();
        
        setupBackground.bind(this)();
        
        var scale   	    = new Scale("scale"), 
            queueManager    = new QueueManager(),
            layout          = new MainGameLayout('mainGameLayout');
        
    };

	/*
	 *	name: 			setupBackground
	 *	description:	setup background layout
	 *	params:			null
	 *	returns:		null
	 */
    function setupBackground() {

        var img     = images.bg.src,
            ele     = document.createElement("div");

            ele.id  = "background";
            ele.style.backgroundImage = "url(" + img + ")";

        document.getElementById("IWGholder").appendChild(ele);

    };
    

    /*
     *  Basic function that sets up ticker and time base for the game
     */
    function setupTicker() {

        createjs.Ticker.framerate = 12;
        createjs.Ticker.addEventListener("tick", update.bind(this));
        createjs.Ticker.paused = true;

    };

    /*
     *  Setup ticket creation and parsing ticket data into a usable form
     *  this module also handles some basic ticket checking
     *
     */
    function setupTicket() {

         var ticket = new Ticket('ticket');

    };
    
    function gameReady() {
        
        core.IWG.ame('killLoader');
          
    };

	function update() {
        
    	if ( this.getActive() ){
            
            iwg.IWGEM.trigger('update');
            
        };
        
    };

    Amfay.VERSION = '0_1_0';
    IWGInit = function () {

        var pluginCount = 0;

        core.IWG.ame('plugin', {module: ['canvasstack_module_1']});

        com.camelot.core.iwgLoadQ.installPlugin(createjs.Sound);
        createjs.Sound.alternateExtensions = ["ogg"];

        iwg.IWGEM.on(core.IWGEVENT.PLUGIN_LOADED, pluginsLoaded);

        function pluginsLoaded(evt) {
            pluginCount++;
            if (pluginCount === 1) {
                _Amfay = new Amfay();
            }
        }
    };
    iwg._class("core.IWGInit", IWGInit);
    iwg._class("iwg.Amfay", Amfay);
}(window));
