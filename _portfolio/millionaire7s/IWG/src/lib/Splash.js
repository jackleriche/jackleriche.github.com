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
			logo				= Helper.makeBitmapImage('logo_winupto', {x: R.GAMEWIDTH/2, y: 260}, 1, true),
	   		button				= Helper.makeBitmapImage("button_play", {x: R.GAMEWIDTH/2, y:550}, 1, true);
			
			logoContainer.name 	= 'logo';
			button.name 		= 'button';
			
			Helper.reveal(true, logo, 0.5);
			Helper.reveal(true, button, 1);
			
			button.on('click', function(){
				iwg.IWGEM.dispatchEvent(MEvent.SPLASHBUTTONCLICK)
			});

		R.LOGOCONTAINER = logoContainer.addChild(logo);
				
		container.addChild( logoContainer, button );
		
		R.SPLASH = container;
		R.SPLASH.name = "splash";	
		
		R.STAGE.addChild( R.SPLASH );
		
		R.STAGE.update();
    }
    
    function makeSparkle(self, container) {
	    
	    var sparkles = self.getSparkles();
	    
	    for( var i = 0; i < sparkles.length; i++){
		    
		    var xStat       = sparkles[i][0],
                yStat       = sparkles[i][1],
                maxSize		= sparkles[i][2],
                randDelay   = R.randomFromInterval(0,1),
                randSize 	= R.randomFromInterval(0.3, 0.7),
                randTime    = Math.random()+0.5,

                img         = Helper.makeBitmapImage("shiner", {x:xStat, y:yStat});
                img.scaleX  = 0;
                img.scaleY  = 0;

                TweenMax.to(img, randTime, { delay: 0.2, scaleX: randSize, scaleY: randSize, repeat: -1, repeatDelay: randTime, rotation: 360, yoyo: true, ease: "Power4.easeInOut"});

                container.addChild(img);
		    
	    }
	    
    }
    
    function splashButtonClick() {
    	// method to remove child from canvas once done
    	var t 			=	R.SPLASH, 
    		animateOff	= [t.getChildByName('logo'), t.getChildByName('button') ],
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
	}

    //namespace path
    iwg._class("iwg.lib.Splash", Splash);
}(window));