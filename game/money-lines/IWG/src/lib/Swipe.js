(function (window) {
   // "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot             = window.com.camelot,
        core                = camelot.core,
        IWGBank             = core.IWGBank,
        iwg                 = camelot.iwg,
        lib                 = iwg.lib,
        MEvent 				= lib.MEvent,
        R                   = window.com.camelot.iwg.lib.R,
        GS                  = window.com.greensock,
        hammertime          = Hammer(iwg.iwgCanvas, {
	        prevent_default: true
        }),
 

    Swipe = function (stage) { 
        
        var _enabled        = false,
            _ele            = null,
            _stage          = stage,
            _iWidth         = null,
            _targetWidth    = null,
            _targetHeight   = null,
            _currentScreen  = null,
            _screensX       = null,
            _lock           = false,
            _placeholderX   = null,
            _placeholderY   = null,
            _isDrag         = false,
            _friction       = 0.96,
            _lowerBound     = null,
            _upperBound     = null,
            _percentage     = 20,
            _currentStageX  = 0,
            _isChecking 	= false,
            _buffer			= 0,
            // drag properties
            _startX         = 0,
            _dragDirection  = null,
            _dragDistance   = null;
    
        /* getter */
        this.getStage = function () {
            return _stage;
        };
        this.getIsChecking = function () {
            return _isChecking;
        };
        this.getEnabled = function () {
            return _enabled;
        };
        this.getEle = function () {
            return _ele;
        };
        this.getTargetHeight = function () {
            return _targetHeight;
        };
        this.getTargetWidth = function () {
            return _targetWidth;
        };
        this.getCurrentScreen = function () {
            return _currentScreen;
        };
        this.getLock = function () {
            return _lock;
        };
        this.getPlaceholderX = function () {
            return _placeholderX;
        };
        this.getPlaceholderY = function () {
            return _placeholderY;
        };
        this.getFlag = function () {
            return _isDrag;
        };
        this.getLowerBound = function () {
            return _lowerBound;
        };
        this.getUpperBound = function () {
            return _upperBound;
        };
        this.getiWidth = function () {
            return _iWidth;
        };
        this.getPercentage = function () {
            return _percentage;
        };
        this.getCurrentStageX = function () {
            return _currentStageX;
        };
        this.getFriction = function () {
            return _friction;
        };
        this.getScreensX = function () {
            return _screensX;
        }
        this.getStartX = function() {
            return _startX;
        }
        this.getDragDirection = function(){
            return _dragDirection;
        }
        this.getDragDistance = function() {
            return _dragDistance;
        }
        this.getBuffer = function() {
	        return _buffer;
        }
    
        /* setters */
        this.setEnabled = function (prv) {
            if (typeof (prv) === "boolean") {
                _enabled = prv;
            }
        };
        this.setCurrentScreen = function (prv) {
            _currentScreen = prv;
        };
        this.setEle = function (prv) {
            _ele = prv;
        };
        this.setStage = function (prv) {
            _stage = prv;
        };
        this.setTargetWidth = function (prv) {
            _targetWidth = prv;
        };
        this.setTargetHeight = function (prv) {
            _targetHeight = prv;
        };
        this.setLock = function (prv) {
            _lock = prv;
        };
        this.setPlaceholderX = function (prv) {
            _placeholderX = prv;
        };
        this.setPlaceholderY = function (prv) {
            _placeholderY = prv;
        };
        this.setFlag = function (prv) {
            _isDrag = prv;
        };
        this.setLowerBound = function (prv) {
            _lowerBound = prv;
        };
        this.setUpperBound = function (prv) {
            _upperBound = prv;
        };
        this.setiWidth = function (prv) {
            _iWidth = prv;
        };
        this.setCurrentStageX = function (prv) {
            _currentStageX = prv;
        };
        this.setFriction = function (prv) {
            _friction = prv;
        };
        this.setScreensX = function (prv) {
            _screensX = prv;
        }
        this.setStartX = function (prv) {
            _startX = prv;
        }
        this.setDragDirection = function(prv){
            _dragDirection = prv;
        }
        this.setDragDistance = function(prv) {
            _dragDistance = prv;
        }
        this.setIsChecking = function (prv) {
        	_isChecking = prv;
        }
        this.setBuffer = function(prv) {
	        _buffer = prv;
        }
    };
    
    Swipe.prototype.enabled = function (bool, ele, mainContainer, buffer) {

        
        var self = this,
            bounds = mainContainer.getBounds();
        
        this.setEnabled(bool);
        this.setEle(ele);
        this.setStage(mainContainer);
        this.setBuffer(buffer);
        // use index
        this.setCurrentScreen(0);
        this.setTargetWidth( bounds.width );
        this.setTargetHeight( bounds.height );
    
        this.setBounds();
        this.setScreenPositions();
    
        if (this.getEnabled()){
        
			var self = this;

            hammertime.on("drag", function(ev){
            if(R.LOCK === false){
	            
            	self.setDragDirection(ev.gesture.direction);
                self.setDragDistance(ev.gesture.deltaX);
                self.setStartX(ev.gesture.startEvent.center.pageX);
                var move = 0;
				
				move = self.getCurrentStageX() + self.getDragDistance();
					
				/*/ buffer logic.			
				 *	used to allow a buffer to any movement, if no buffer is set the code will still works
				/*/
				if (move < -self.getLowerBound() && move > (-self.getUpperBound() - 360) ){
					if(self.getDragDirection() === "right"){
					    if(self.getDragDistance() > self.getBuffer()){
					    	R.MAINGAMECONTAINER.x = move - self.getBuffer();
					    } else {
					    	move = 0;
					    }
					} else {
					    if(self.getDragDistance() < -self.getBuffer()){
					    	R.MAINGAMECONTAINER.x = move + self.getBuffer();	
					    } else {
					    	move = 0;
					    }
					}
				}
			}
            
		});

            hammertime.on("dragend", function(e){
                //var end
                self.setFlag(null);
                var movedBy =  self.getDragDistance(),                    
					s = self.getStage();
                /* out of bounds */
                if (s.x > 0){
                    self.returnToZero();
                } else if ( s.x < -self.getUpperBound() ){
                    self.returnToEnd();
                } else {
                    self.setCurrentStageX( s.x );
                    var current = self.getCurrentScreen(),
                        sibling = getSiblings(current),
                        screens = self.getScreensX(),
                        lower   = null,
                        higher  = null;
                    
                    if (sibling[0] !== null){
                        lower   = screens[sibling[0]];
                    }
                    if (sibling[1] !== null){
                        higher  = screens[sibling[1]];
                    }
                    var moveTimeLine = new TimelineLite();
                    
                    if ( movedBy < 0 && movedBy < -(higher/8)) {
						self.moveRight();
						iwg.IWGEM.dispatchEvent(MEvent.MOVERIGHT);
					} else if ( movedBy > 0 && movedBy > (lower/8)) {
                        self.moveLeft();
                        iwg.IWGEM.dispatchEvent(MEvent.MOVELEFT);
                    } else {
                        var returnTo = self.getScreensX()[self.getCurrentScreen()];
                        moveTimeLine.to(s, 0.2, { x: -returnTo, ease: "Power4.easeInOut"})
                                    .call(function(){
                                        s.x = -returnTo;
                                        self.setCurrentStageX(s.x);
                                        self.setCurrentScreen(current);
                                    })
                    }
                   
                }

            });

        }
    }
    
    Swipe.prototype.setDimensions = function(){
    
            var tar = this.getTarget();
    
            this.setTargetWidth(tar.width);
            this.setTargetHeight(tar.height);

    }
    
    Swipe.prototype.lock = function(){
    
            if ( this.getLock === true){
                console.warn('Swipe is already set to lock')
                return false;
            } else {
                this.setLock(true);
                
            }
    }
    
    /*
        method used to set bounds of game
    */
    Swipe.prototype.setBounds = function(){
    
        var totalWidth  = this.getTargetWidth(),
            noScreens   = this.getScreens(this.getStage()).length,
            width       = Math.round(totalWidth/noScreens),
            percentage  = (width / 100) * this.getPercentage();
    
        this.setiWidth(width);
    
        /* set lower bound */
        this.setLowerBound(0 - percentage);
    
        /* set upper bound */
        var lessOne     = noScreens - 1,
            upperStartX = lessOne * width;
    
        this.setUpperBound(upperStartX);
    }
    
    Swipe.prototype.getScreens = function(){
		var cont = this.getStage();
        return cont.children;
    }
    
    Swipe.prototype.returnToZero = function(){
    
        var s = this.getStage();
        var moveTimeLine = new TimelineLite()
        moveTimeLine.to(s, 0.2, { x: 0, ease: "Power4.easeInOut"})
                                    .call(function(){
                                        s.x = 0;
                                    })
        this.setCurrentStageX(0);
    }

    Swipe.prototype.setCurrentScreen = function(num){
        var current = this.getCurrentScreen();

        var newNum = current + num;

        this.setCurrentScreen(newNum);

    }
    
    Swipe.prototype.returnToEnd = function(){
        
        var s       = this.getStage(),
            that    = this;

        var moveTimeLine = new TimelineLite()
        moveTimeLine.to(s, 0.2, { x: -R.RIGHTWINDOWSTARTX, ease: "Power4.easeInOut"})
                                    .call(function(){
                                        s.x = -R.RIGHTWINDOWSTARTX;
                                    })
        this.setCurrentStageX(-R.RIGHTWINDOWSTARTX);
        this.setCurrentScreen(that.getCurrentScreen());
    }
    
    Swipe.prototype.setScreenPositions = function() {
        
        var children    = this.getStage().children,
            childXArray = [];
        for ( var child in children) {
            childXArray.push(children[child].x);
        }
        
        this.setScreensX(childXArray);
    }
        
    Swipe.prototype.moveLeft = function(){
    
    	iwg.IWGEM.dispatchEvent(MEvent.ENABLETOUCH); 
    
	    var go = checkValidMovement(this.getScreens().length, this.getCurrentScreen(), 'left');
		if(go){
			var self            = this,
	            current         = self.getCurrentScreen(),
	            s               = self.getStage(),
	            moveTimeLine    = new TimelineLite(),
	            moveTo  = self.getScreensX()[self.getCurrentScreen() - 1];
	        moveTimeLine.to(s, 0.2, { x: -moveTo, ease: "Power4.easeInOut"})
	        .call(function(){
	            s.x = -moveTo;
	            self.setCurrentStageX(s.x);
	            if ( current > 0){
	                self.setCurrentScreen(current - 1);
	            }
			})
	    }
    }

    Swipe.prototype.moveRight = function(){
    
    	iwg.IWGEM.dispatchEvent(MEvent.DISABLETOUCH); 
   
		var go = checkValidMovement(this.getScreens().length, this.getCurrentScreen(), 'right');
		if(go){
		
			R.simGame = false;
			
		 	var self            = this,
		        current         = self.getCurrentScreen(),
		        s               = self.getStage(),
		        moveTimeLine    = new TimelineLite(),
		        moveTo  		= self.getScreensX()[self.getCurrentScreen() + 1];
		                    
		    moveTimeLine.to(s, 0.2, { x: -moveTo, ease: "Power4.easeInOut"})
		    .call(function(){
		        s.x = -moveTo;
		        self.setCurrentStageX(s.x);
		        self.setCurrentScreen(current + 1);
		    })
		    
		    
		}   
        
    }
    
    function checkValidMovement(num, current, direction){
	    var go 		= null,
			numScreens = num - 1;
    	
	    if( current > 0 && direction === "left" ) {
	    	return true;
	    } else if (current < numScreens && direction === "right" ) {
			return true;
		} 
		return false;
    }

    function getSiblings(c) {
        
        var prev = c - 1,
            next = c + 1;
        if ( prev < 0 ){
            prev = null;
        }
        return [ prev, next ];
        
    }
    
    iwg._class("iwg.lib.Swipe", Swipe);
}(window));