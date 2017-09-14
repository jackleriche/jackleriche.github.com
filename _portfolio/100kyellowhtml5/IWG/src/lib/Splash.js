(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 		= window.com.camelot,
        core 			= window.com.camelot.core,
        iwg 			= camelot.iwg,
        lib 			= iwg.lib,
        R           	= lib.R,
        images			= core.iwgLoadQ.images,
        SS          	= lib.flassets.MasterSS,
        MEvent			= lib.MEvent,
        gameAsset 		= lib.gameAsset,
        Helper			= lib.Helper,

    Splash = function (name, height, width) {

            var _name 		= name,
            	_height		= height,
            	_width 		= width;

            // getters
            this.getHeight = function () {
                return _height;
            };
            this.getWidth = function () {
                return _width;
            };
            this.getName = function () {
                return _name;
            };

            // setters
            this.setHeight = function (prv) {
                _height = prv;
            };
            this.setWidth = function (prv) {
                _width = prv;
            };
            this.setName = function (prv) {
                _name = prv;
            };

            init(this);

    }

    //private method
    function init(self) {

    	iwg.IWGEM.addEventListener(MEvent.SPLASHBUTTONCLICK.type, splashButtonClick);

        // set up containers
        var container 			= new createjs.Container();
        	container.name 		= self.getName();

		// logo
		var fingers				= Helper.makeBitmapImage('fingers', {x:0, y: 0}, 1, true),
            winUpTo             = Helper.makeBitmapImage('splash_100k', {x:0, y: 0}, 1, true),
	   		button				= Helper.makeBitmapImage("play", {x:0, y:0}, 1, true);

        fingers.x   = button.x = winUpTo.x = R.GAMEWIDTH/2;
        fingers.y   = R.GAMEHEIGHT/2;
        winUpTo.y   = 110;

        button.y    = 530;

            fingers.name        = 'fingers';
            winUpTo.name        = 'winUpTo';
			button.name 		= 'button';

			button.on('click', function(){
				iwg.IWGEM.dispatchEvent(MEvent.SPLASHBUTTONCLICK)
			}, null, true);


		container.addChild( fingers, winUpTo, button );

		R.SPLASH = container;
        R.SPLASH.setBounds( 0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
		R.SPLASH.name = "splash";

        TweenMax.to(button, 1, { scaleX: 1.1, scaleY: 1.1, delay: 2, repeat: -1, yoyo: true});

		//R.STAGE.addChild( R.SPLASH );

    }

    function splashButtonClick() {
    	// method to remove child from canvas once done
        if(R.PLAYSOUND){
            var popSound = createjs.Sound.play("pop");
            popSound.volume = 0.001;
        }

    	var t 			= R.SPLASH,
    		animateOff  = [t.getChildByName('winUpTo'), t.getChildByName('fingers')],
    		timeline 	= new TimelineLite({
    			onStart: function(){
    				iwg.IWGEM.dispatchEvent(MEvent.MAINGAMEINTRO)
    			},
    			onComplete: function(){
    				R.STAGE.removeChild(t);
    			}
    		});

		for (var i = 0; i < animateOff.length; i++){
			timeline.staggerTo( animateOff, 0.3, { x:-960 }, 0.2);
		}

        var playButton = t.getChildByName('button');

        TweenMax.to(playButton, 10, { useFrames:true, alpha:0, delay: 0});


	}
    //namespace path
    iwg._class("iwg.lib.Splash", Splash);
}(window));
