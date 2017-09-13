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
            	_width 		= width,
            	_sparkles	= [
            	//  [x, y, maxScale]
            	//	super
            		[314, 44, 1.3],
            		[376, 79, 1.1],
            		[426, 79, 1.1],
            		[496, 79, 1.1],
            		[564, 79, 1.1],
            		[634, 79, 1.1],
            		[654, 121, 1.3],
            	// rich
            		[274, 144, 1.3],
            		[289, 199, 1.1],
            		[399, 259, 1.1],
            		[414, 199, 1.1],
            		[452, 199, 1.1],
            		[544, 234, 1.1],
            		[573, 199, 1.1],
            		[559, 163, 1.3]
            	];

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
            this.getSparkles = function () {
                return _sparkles;
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
		var logoContainer 		= new createjs.Container,
			fingers				= Helper.makeBitmapImage('fingers', {x: (R.GAMEWIDTH/2)-20, y: 210}, 1, true),
            winUpTo             = Helper.makeBitmapImage('splash_winupto', {x: (R.GAMEWIDTH/2), y: 445}, 1, true),
            explosion           = Helper.makeBitmapImage('explosion', {x: (R.GAMEWIDTH/2), y: R.GAMEHEIGHT/2}, 1, true),
	   		button				= Helper.makeBitmapImage("button_play", {x: R.GAMEWIDTH/2, y:555}, 1, true);


			logoContainer.name 	= 'logo';
            fingers.name        = 'fingers';
            winUpTo.name        = 'winUpTo';
			button.name 		= 'button';
            explosion.name      = 'explosion';

            explosion.scaleX = explosion.scaleY = 0;

			button.on('click', function(){
				iwg.IWGEM.dispatchEvent(MEvent.SPLASHBUTTONCLICK)
			}, null, true);

		logoContainer.addChild(explosion, winUpTo, fingers);
		R.LOGOCONTAINER = logoContainer;

		container.addChild( logoContainer, button );

		R.SPLASH = container;
		R.SPLASH.name = "splash";

        TweenMax.to(button, 1, { scaleX: 1.1, scaleY: 1.1, delay: 2, repeat: -1, yoyo: true});

		R.STAGE.addChild( R.SPLASH );

		R.STAGE.update();
    }

    function splashButtonClick() {
    	// method to remove child from canvas once done
    	var t 			= R.SPLASH,
    		animateOff  = [t.getChildByName('button'), t.getChildByName('logo')],
            explosion   = R.LOGOCONTAINER.getChildByName('explosion'),
    		timeline 	= new TimelineLite({
    			onComplete: function(){	iwg.IWGEM.dispatchEvent(MEvent.MAINGAMEINTRO)
                    TweenMax.to(t.getChildByName('button'), 0.25, {alpha:0, onComplete: function(){
                        TweenMax.to(t, 0.5,{ alpha:0, onComplete: function(){
                            R.STAGE.removeChild(t)
                        }});
                    }});


                }
    		});
        var confetti = R.STAGE.getChildByName('confetti');

            timeline.to(explosion, 0.5, {scaleX: 1, scaleY: 1},0)
                    .to(confetti, 0.5, {scaleX: 1.2, scaleY: 1.2},0)


        createjs.Sound.play('sparkle');
	}
    //namespace path
    iwg._class("iwg.lib.Splash", Splash);
}(window));
