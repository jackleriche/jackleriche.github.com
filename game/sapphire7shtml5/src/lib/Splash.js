(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot    = window.com.camelot,
        core         = window.com.camelot.core,
        iwg 			= camelot.iwg,
        lib 			= iwg.lib,
        R           	= lib.R,
        images			= core.iwgLoadQ.images,
        SS          	= lib.flassets.MasterSS,
        buttonSS        = lib.flassets.ButtonSS,
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
        	container.name 	= self.getName();
        
		// logo
		var sapphire    = Helper.makeBitmapImage('logo', {x:0, y: 0}, 1, true),
            winUpTo      = Helper.makeBitmapImage('winupto', {x:0, y: 0}, 1, true),
	   		button   	   = Helper.makeBitmapImage("play", {x:0, y:0}, 1, true, buttonSS);

        sapphire.x  = button.x = winUpTo.x = R.GAMEWIDTH/2;
        sapphire.y  = 200;

        winUpTo.y   = 570;
        
        button.y    = 510;
        
        button.x    = 610;
        
        sapphire.name      = 'sapphire';
        winUpTo.name      = 'winUpTo';
		button.name 		= 'button';

        button.on('click', function(){
			iwg.IWGEM.dispatchEvent(MEvent.SPLASHBUTTONCLICK)
		}, null, true);
        
		container.addChild( sapphire, winUpTo, button );
		
		R.SPLASH = container;
        R.SPLASH.setBounds( 0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
    
        setTimeout(function(){
            // play animation
            button.gotoAndPlay('play');
        }, 4000); 
		
    }
    
    function splashButtonClick() {
    	// method to remove child from canvas once done
        if(R.PLAYSOUND){
            var popSound = createjs.Sound.play("pop");
        }
        
    	var t = R.SPLASH,
    		animateOff = [ t.getChildByName('sapphire'), t.getChildByName('button'), t.getChildByName('winUpTo') ],
    		timeline = new TimelineLite({
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
    
	}
    //namespace path
    iwg._class("iwg.lib.Splash", Splash);
}(window));