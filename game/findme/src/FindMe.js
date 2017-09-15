(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Sound           = lib.Sound,
        Helper          = lib.Helper,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        BackgroundSS    = lib.flassets.BackgroundSS,
        Ticket          = lib.Ticket,
        MainGameLayout  = lib.MainGameLayout,

        _FindMe,
        FindMe = function () {

            if (typeof FindMe.instance === "object") {
                return FindMe.instance;
            }
            FindMe.instance = this;

            var _name           = "background",
                _stage          = null,
                _canvas         = null,
                _mainContainer  = new createjs.Container(),
                _active         = false,
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
                _subscribe      = function() {
                    iwg.IWGEM.on('startSound', _startSound);
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('startSound');
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
        // create new element
        var iwgHolder           = document.getElementById('IWGholder'),
            scaleDiv            = document.createElement("div");

        scaleDiv.id             = "scaleDiv";
        scaleDiv.style.width    = "960px";
        scaleDiv.style.height   = "640px";

        iwgHolder.appendChild(scaleDiv);


        setupTicker.bind(this)();
        setupTicket.bind(this)();


        var layout = new MainGameLayout('mainGameLayout');

        Sound.instance.setSound(true);

        scale.bind(this)();

        iwg.IWGEM.trigger('disableButtons');
        setupBackground.bind(this)();
    }

	/*
	 *	name: 			setupBackground
	 *	description:	setup background layout
	 *	params:			null
	 *	returns:		null
	 */
    function setupBackground() {

        var img     = images.backgroundSS.src,
            ele     = document.createElement("div");

            ele.id  = "background";
            ele.style.backgroundImage = "url(" + img + ")";

        document.getElementById("scaleDiv").appendChild(ele)

        TweenMax.set(ele, { x: -150, y: -2, scale: 2 });

    }

    /*
     *  Basic function that sets up ticker and time base for the game
     */
    function setupTicker() {

        // set up touch and tick
        createjs.Ticker.setFPS(this.getFPS());
        TweenLite.ticker.fps(this.getFPS());
        TweenLite.defaultEase = Linear.easeNone;
        createjs.Touch.enable(this.getStage(), false, true);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.addEventListener("tick", update);

    }

    /*
     *  Setup ticket creation and parsing ticket data into a usable form
     *  this module also handles some basic ticket checking
     *
     */
    function setupTicket() {

         var ticket = new Ticket('ticket');

    }

    /*
     *  Add scalling functionality to all stages in the gamee
     */
    function scale() {

        // browser viewport size
        var iwgHolder   = document.getElementById('IWGholder'),
            canvasArray = [],
            w           = com.camelot.core.IWG.ame('get','gameWidth'),    // screen width
            h           = com.camelot.core.IWG.ame('get','gameHeight'),   // screen height
            ow          = 960,                  // your default game width
            oh          = 640;                  // your default game height



        // move child elements into scaleDiv
        /*
        for( var i = 0; i < document.getElementsByTagName('canvas').length; i++){
            var ele = document.getElementsByTagName('canvas')[i];
            canvasArray.push(ele);
        };

        // move all elements into scaleDiv
        for(var j = 0; j < canvasArray.length; j++){
            scaleDiv.appendChild(canvasArray[j]);
        };
        */

        var scale = Math.min(h / oh, w / ow);

        // now position the scaleDiv correctly in the screen
        var marginLeft      = (960 - window.innerWidth) / 2,
            marginTop       = (640 - window.innerHeight) / 2;

        scaleDiv.style.marginLeft  = "-" + marginLeft + "px";
        scaleDiv.style.marginTop   = "-" + marginTop + "px";

        if ( scale > 1 ){
            scale = 1;
            scaleDiv.style.marginLeft  	= Math.abs(marginLeft) + "px";
        }

        if (w === 700 && h === 500){
	        scaleDiv.style.marginTop	= -90 + "px";
        }

        // move all elements into scaleDiv
        TweenMax.to(scaleDiv, 0, { delay:0.5, scaleX: scale, scaleY: scale , onComplete:function(){
           core.IWG.ame('killLoader');
        }});
    }

	function update() {

        iwg.IWGEM.trigger('update');

    }

    FindMe.VERSION = '0_1_0';
    IWGInit = function () {

        var pluginCount = 0;

        core.IWG.ame('plugin', {module: ['canvasstack_module_1']});

        createjs.Sound.alternateExtensions = ["ogg"];

        iwg.IWGEM.on(core.IWGEVENT.PLUGIN_LOADED, pluginsLoaded);

        function pluginsLoaded(evt) {
            pluginCount++;
            if (pluginCount === 1) {
                _FindMe = new FindMe();
            }
        }


    };
    iwg._class("core.IWGInit", IWGInit);
    iwg._class("iwg.FindMe", FindMe);
}(window));
