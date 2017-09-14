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
        Helper				= lib.Helper,
        hammertime          = Hammer(iwg.iwgCanvas, {
	        prevent_default: true
        }),

	Swipe = function (stage) {

		if (typeof Swipe.instance === "object") {
            return Swipe.instance;
        }

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
            _startX         = 0,
            _dragDirection  = null,
            _dragDistance   = null,
			_isMoving		= false,
            _toggle         = false,
            _toggleArray    = null;

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
        this.getIsMoving = function(){
	        return _isMoving;
        }
        this.getToggle = function(){
            return _toggle;
        }
        this.getToggleArray = function(){
            return _toggleArray;
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
        this.setIsMoving = function(prv){
	        _isMoving = prv;
        }
        this.setToggle = function(prv){
	        _toggle = prv;
        }
        this.setToggleArray = function(prv){
            _toggleArray = prv;
        }

        Swipe.instance = this;

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
						    	if(self.getIsMoving() === false){
									iwg.IWGEM.dispatchEvent(MEvent.MOVELEFTSTART);
									self.setIsMoving(true);
						    	}
						    } else {
						    	move = 0;
						    }
						} else {
						    if(self.getDragDistance() < -self.getBuffer()){
						    	R.MAINGAMECONTAINER.x = move + self.getBuffer();
						    	if(self.getIsMoving() === false){
							    	iwg.IWGEM.dispatchEvent(MEvent.MOVERIGHTSTART);
									self.setIsMoving(true);
							    }
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
                var movedBy = self.getDragDistance(),
					s 		= self.getStage();
				// set isMoving to false
				self.setIsMoving(false);
                /* out of bounds */
                if (s.x >= 0){
                    self.returnToZero();
                } else if ( s.x <= -self.getUpperBound() ){
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

                    if ( movedBy < -250) {

                        self.moveRight();
                        self.setCurrentScreen(current + 1);
						iwg.IWGEM.dispatchEvent(MEvent.MOVERIGHTCOMPLETE);
					} else if ( movedBy > 250) {
                       	self.moveLeft();
                        self.setCurrentScreen(current - 1);
                        iwg.IWGEM.dispatchEvent(MEvent.MOVELEFTCOMPLETE);
                    } else {
                        var returnTo = self.getScreensX()[self.getCurrentScreen()];
                        moveTimeLine.to(s, 0.2, { x: -returnTo, ease: "Power4.easeInOut"})
                            .call(function(){
                                s.x = -returnTo;
                                self.setCurrentStageX(s.x);
                               //
                            });
                        if (self.getCurrentScreen() === 0){
                        	Helper.showPrompt('left', 4000);
                        } else {
	                        Helper.showPrompt('right', 4000);
                        }
                    }
                }
            });
        }
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
                                    });
		Helper.showPrompt("left", 4000);

        this.updateToggle(0);
        this.setCurrentScreen(0);
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
        moveTimeLine.to(s, 0.2, { x: -R.THIRDGAMEWINDOW.x, ease: "Power4.easeInOut"})
                                    .call(function(){
                                        s.x = -R.THIRDGAMEWINDOW.x;
                                    })

		Helper.showPrompt('right', 4000);

        this.setCurrentScreen(this.getScreensX().length - 1);
        this.updateToggle(this.getScreensX().length - 1);
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
	            if ( current >= 0){
	                self.setCurrentScreen(current - 1);
	            }
			})
	    }
    }

    Swipe.prototype.moveRight = function(){

		var go = checkValidMovement(this.getScreens().length, this.getCurrentScreen(), 'right');
		if(go){
		 	var self            = this,
		        current         = self.getCurrentScreen(),
		        s               = self.getStage(),
		        moveTimeLine    = new TimelineLite(),
		        moveTo  		= self.getScreensX()[self.getCurrentScreen() + 1];

		    moveTimeLine.to(s, 0.2, { x: -moveTo, ease: "Power4.easeInOut"})
		    .call(function(){
		        s.x = -moveTo;
		        self.setCurrentStageX(s.x);
                if(current <= self.getScreensX().length){
                    self.setCurrentScreen(current + 1);
                }

            });
		}
    }

    Swipe.prototype.enableToggle = function(bool){
        this.setToggle(bool);

        var toggleArray = [];

        if(this.getToggle() === true){

            // put circles on stage
            var screens         = this.getScreensX().length,
                toggleContainer = new createjs.Container(),
                count           = null;

            for (var i = 0; i < screens; i++){

                var startX = i * 25,
                    screenToggle = new createjs.Shape();
                screenToggle.graphics.beginFill("white").drawCircle(0, 0, 8);
                //Set position of Shape instance.
                screenToggle.y      = 610;
                screenToggle.x      = startX;
                screenToggle.alpha  = 0.5;
                count               = i + 1;

                // add to toggle container
                toggleContainer.addChild(screenToggle);

                // set first to active
                if(i === 0){
                    screenToggle.alpha = 1;
                }

                toggleArray.push(screenToggle);

            }

            toggleContainer.width = count * 23;
            toggleContainer.regX = toggleContainer.width / 2;

            toggleContainer.x = R.GAMEWIDTH / 2;

            R.STAGE.addChild(toggleContainer);

            this.setToggleArray(toggleArray);

        }

    }

    Swipe.prototype.updateToggle = function(num){

        // get the toggleArray
        var toggles = this.getToggleArray();
        // clear all toggles
        for (var toggle in toggles){
            toggles[toggle].alpha = 0.5;
        }
        // set new toggle[num] to alpha 1
        if (num >= 0 && num <= this.getScreensX().length){
            toggles[num].alpha = 1;
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
