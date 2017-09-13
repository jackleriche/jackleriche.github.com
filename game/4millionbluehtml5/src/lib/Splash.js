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
		var logoContainer 		= new createjs.Container,
		    splashBackground    = Helper.makeBitmapImage('bg_splash_new', { x: (R.GAMEWIDTH/2)-20, y: 210}, 1, true),
			fingers				= Helper.makeBitmapImage('splash_fingers', {x: (R.GAMEWIDTH/2)-20, y: 140}, 1, true),
            winUpTo             = Helper.makeBitmapImage('splash_winupto', {x: (R.GAMEWIDTH/2), y: 370}, 1, true),
            triangles           = Helper.makeBitmapImage('bg_splash_triangles', { x: (R.GAMEWIDTH/2), y: 50}, 1, false),
            starburst           = Helper.makeBitmapImage('bg_splash_starburst', { x: (R.GAMEWIDTH/2), y: 50}, 1, false),
	   		button				= Helper.makeBitmapImage("button_play", {x: R.GAMEWIDTH/2, y:510}, 1, true);
        
            starburst.regX      = R.GAMEWIDTH/2;
            starburst.regY      = 100;
            
            triangles.regX      = R.GAMEWIDTH/2;
            triangles.regY      = 100;
        
            triangles.scaleX    = triangles.scaleY = 0;
            starburst.scaleX    = starburst.scaleY = 0;
            
            
			splashBackground.name   = 'splashBackground';
			logoContainer.name 	    = 'logo';
            fingers.name            = 'fingers';
            winUpTo.name            = 'winUpTo';
			button.name 		    = 'button';
			triangles.name          = 'triangles';
			starburst.name          = 'starburst';
			
			button.on('click', function(){
				iwg.IWGEM.dispatchEvent(MEvent.SPLASHBUTTONCLICK)
			}, null, true);

		logoContainer.addChild(starburst, triangles, winUpTo, fingers);
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
            triangles   = R.LOGOCONTAINER.getChildByName('triangles'),
            starburst   = R.LOGOCONTAINER.getChildByName('starburst'),
    		timeline 	= new TimelineLite({
    			onComplete: function(){	iwg.IWGEM.dispatchEvent(MEvent.MAINGAMEINTRO)
                   TweenMax.to(t.getChildByName('button'), 0.25, {alpha:0, onComplete: function(){
                       TweenMax.to(t, 0.5,{ alpha:0, onComplete: function(){
                           R.STAGE.removeChild(t)
                       }});  
                   }});
                                      
                   
                } 			
    		});
    		
    		 timeline.to(starburst, 0.2, { scaleX: 1, scaleY: 1 }, 0)
    		         .to(triangles, 0.5, { scaleX: 1, scaleY: 1 }, 0);
    		
            createjs.Sound.play('sparkle');
	}
    //namespace path
    iwg._class("iwg.lib.Splash", Splash);
}(window));