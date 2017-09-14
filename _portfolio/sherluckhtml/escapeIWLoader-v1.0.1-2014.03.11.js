/**
  * @file
  * Title: E-scape HTML5 Loader
  * @desc E-scape Instant Win "Loader" for HTML5 Instant Win Games.
  * @copyright Copyright (C) E-scape Interactive Ltd 2014.
  * @authors Keith Roberts, Jack Le Riche
  * @date 2014-03-11
  * @version 1.0.1
  *
  * @misc
  * Requires: createjs 2013-12-12, available at: http://code.createjs.com/createjs-2013.12.12.min.js
  * Requires: canvas called "game"
  * Requires: stage called "gameStage"
  * Requires: top level container called "maskerCont"
  * Requires: ticker on the gameStage
  * Requires: visible function called "start()"
  * Requires: visible object called "soundObj" with the child "isMuted"
  *
  * @todo
  * Browser / Device specific handling,
  * Internal and External Versions?
  */

/** @namespace
  * @desc Contains functions for invoking error messages, preloading content, scaling to window size. Also has common functions.
  */
var escapeIWLoader = escapeIWLoader || {};

/**
 * Error Invoker. Contains functions for invoking errors.
 * @namespace escapeIWLoader.errorInvoker
 * @memberof escapeIWLoader
 * @example Quick Start:
 * escapeIWLoader.errorInvoker.invokeError("An Error");
 */
escapeIWLoader.errorInvoker = (function(){
  var self = new Object();

  /**
   * Invoke Errors.
   *
   * @param message String
   * @return true if message is defined.
   */
  self.invokeError = function(message){
    if(message != undefined){
      gameStage.removeAllEventListeners();
      gameStage.removeAllChildren();
      createjs.Ticker.removeAllEventListeners();

      soundObj.isMuted = true;
      createjs.Sound.setMute(soundObj.isMuted);

      var errorMessage = new createjs.Text("","20px Arial","#ffffff");
      errorMessage.maxWidth = game.width;
      errorMessage.x = game.width/2;
      errorMessage.y = game.height/2;
      errorMessage.textAlign = "center";

      if(message != "FPS") {
        errorMessage.text = "Sorry, you have encountered an error. The error is:\n\n\n" + message;
      } else {
        errorMessage.text = "Sorry, your measured Frame Rate is too slow,\n\n please use a different browser or a faster device.\n\nAlternatively, retry by reloading the page."
      }
      gameStage.addChild(errorMessage);
      gameStage.update();
      return true;
    } else {
      return false;
    }
  };

  /**
   * Externally Visible
   */
  var returnable = new Object();
  /**
   * Call internal error invoking function.
   *
   * @param {string} message error message
   * @function escapeIWLoader.errorInvoker.invokeError
   * @returns {boolean} true or false
   * @example escapeIWLoader.errorInvoker.invokeError("An Error");
   */
  returnable.invokeError = function(message){
    return self.invokeError(message);
  };
  return returnable;
})()
/**
 * Preloader. Contains functions for preloading.
 * @namespace escapeIWLoader.preloader
 * @memberof escapeIWLoader

 * @example Quick Start:
 * //Start the listeners and scale the canvas
 * escapeIWLoader.scaleOrient.setSize();
 * escapeIWLoader.scaleOrient.startResizeHandler();
 * //Set up the preloader
 * escapeIWLoader.preloader.setTouch(true); //enable touch
 * escapeIWLoader.preloader.setTicketFile({id:"ticketFromFile",src:"ticket.xml", type:createjs.LoadQueue.XML}); //set the ticket
 * escapeIWLoader.preloader.setManifests(HQImageManifest,HQSoundManifest,LQImageManifest); //send the manifests
 * escapeIWLoader.preloader.startPreload(); //start preloading
 */
escapeIWLoader.preloader = (function(){
  var self = new Object();
  self.highImageManifest = null;
  self.highSoundManifest = null;
  self.lowImageManifest = null;
  self.ticketFile = null;
  self.scaleAtStartOfLoad = true;
  self.preloadInternal = {};
  self.touchEnabled = false;
  self.manifestsSet = false;
  self.ticketFileSet = false;
  self.currentQuality = null;
  self.enableQualitySelection = true;

  /**
   * Sets whether the quality selection screen will be enabled or not. If false then quality will default to "high"
   *
   * @param bool
   * @return true if set to true
   */
  self.setQualityEnabled = function(bool){
    self.enableQualitySelection = bool;
    if(bool){
      return true;
    } else {
      self.currentQuality = "high";
      self.enableQualitySelection = false;
      return false;
    }
  };
  /**
   * Sets the manifests for the preloader. Checks if they aren't null.
   *
   * @param HI JSON (High Quality Image Manifest)
   * @param HS JSON (High Quality Sound Manifest)
   * @param LI JSON (Low Quality Image Manifest)
   *
   * @return true if all manifests are set.
   */
  self.setManifests = function(HI,HS,LI){
    self.highImageManifest = HI;
    self.highSoundManifest = HS;
    self.lowImageManifest = LI;

    if(self.highImageManifest != null && self.highImageManifest != null && self.lowImageManifest != null){
      self.manifestsSet = true;
      return true;
    } else {
      self.manifestsSet = false;
      self.highImageManifest = null;
      self.highSoundManifest = null;
      self.lowImageManifest = null;
      return false;
    }
  };
  /**
   * Sets the ticket file for the preloader. Checks that it isn't null.
   *
   * @param TF JSON (Ticket File)
   * @example escapeIWLoader.preloader.setTicketFile({id:"ticketFromFile",src:"ticket.xml", type:createjs.LoadQueue.XML});
   * @return true if not null.
   */
  self.setTicketFile = function(TF){
    self.ticketFile = TF;

    if(self.ticketFile != null){
      self.ticketFileSet = true;
      return true;
    } else {
      self.ticketFileSet = false;
      self.ticketFile = null;
      return false;
    }
  };
  /**
   * Sets the quality. Used for loading high or low quality content.
   *
   * @param input String
   * @return true if not null.
   */
  self.setHighLowQuality = function(input){
  	self.currentQuality = input;
  	if(self.currentQuality != null){
  		return true;
  	} else {
  		self.currentQuality = null;
  		return false;
  	}
  };
  /**
   * Sets whether touch will be enabled on the canvas.
   *
   * @param bool
   * @return true if enabled.
   */
  self.setTouch = function(bool){
  	if(bool){
  		self.touchEnabled = true;
  		return true;
  	} else {
  		self.touchEnabled = false;
  		return false;
  	}
  };
  /**
   * Preloads content from the manifests. Invokes errors if something is missing.
   * Requires "scaleAtStartOfLoad", all manifests, ticket, quality to be set.
   * Calls "handlePreloadProgress","handlePreloadError","handlePreloadComplete"
   * @throws escapeIWLoader.errorInvoker.invokeError
   */
  self.preload = function(){
    if(self.scaleAtStartOfLoad){
      escapeIWLoader.scaleOrient.setSize();
		}
		self.preloadInternal.loadingBarCont = new createjs.Container();
		self.preloadInternal.loadingBarHeight = 20;
		self.preloadInternal.loadingBarWidth = 300;
		self.preloadInternal.loadingBarColour = createjs.Graphics.getRGB(255,255,255);
		self.preloadInternal.loadingBar = new createjs.Shape();
		self.preloadInternal.loadingBar.graphics.f(self.preloadInternal.loadingBarColour).dr(0,0,1,self.preloadInternal.loadingBarHeight).ef();
		self.preloadInternal.frame = new createjs.Shape();
		self.preloadInternal.padding = 3;
		self.preloadInternal.frame.graphics.ss(1).s(self.preloadInternal.loadingBarColour).dr(-self.preloadInternal.padding/2, -self.preloadInternal.padding/2, self.preloadInternal.loadingBarWidth+self.preloadInternal.padding, self.preloadInternal.loadingBarHeight+self.preloadInternal.padding);
		self.preloadInternal.loadingBarCont.addChild(self.preloadInternal.loadingBar, self.preloadInternal.frame);
		self.preloadInternal.loadingBarCont.x = Math.round(game.width/2 - self.preloadInternal.loadingBarWidth/2);
		self.preloadInternal.loadingBarCont.y = game.height/2;
		gameStage.addChild(self.preloadInternal.loadingBarCont);

		self.preloadInternal.preLoader = new createjs.LoadQueue(false);
		if(self.highImageManifest == null || self.highSoundManifest == null || self.lowImageManifest == null){
			escapeIWLoader.errorInvoker.invokeError(" A Manifest is Not Defined!");
		}
		if(self.currentQuality == "high"){
			self.preloadInternal.preLoader.installPlugin(createjs.Sound);
			createjs.Sound.alternateExtensions = ["ogg"];
		}

		self.preloadInternal.preLoader.on("complete", self.handlePreloadComplete);
		self.preloadInternal.preLoader.on("progress", self.handlePreloadProgress);
		self.preloadInternal.preLoader.on("error", self.handlePreloadError);
		if(self.currentQuality == "high"){
			self.preloadInternal.preLoader.loadManifest(self.highImageManifest,false);
			self.preloadInternal.preLoader.loadManifest(self.highSoundManifest,false);
		} else {
			self.preloadInternal.preLoader.loadManifest(self.lowImageManifest,false);
		}
		if(self.ticketFile != null){
			self.preloadInternal.preLoader.loadFile(self.ticketFile);
		} else {
			escapeIWLoader.errorInvoker.invokeError("Ticket Not Defined!");
		}
  };
  /**
   * High / Low Quality Selector Screen.
   * Contains 2 buttons for the selection choice. Sets "self.setHighLowQuality" to "high" or "low" based on choice.
   */
  self.preloadLandingScreen = function(){
  	//2 clickable buttons for selecting high and low quality
  	self.preloadInternal.buttonCont = new createjs.Container();
  	gameStage.addChild(self.preloadInternal.buttonCont);

  	var lbCont = new createjs.Container();
  	self.preloadInternal.buttonCont.addChild(lbCont);

  	var lowButton = new createjs.Shape();
  	lowButton.graphics.f("#ff00ff").dr(0,0,150,40).ef();
  	lbCont.addChild(lowButton);
  	var lowButtonText = new createjs.Text("Low Quality","15px Arial","#ffffff");
  	lowButtonText.x = lowButton.x = 300;
  	lowButtonText.y = lowButton.y = 300;
  	lbCont.addChild(lowButtonText);


  	var hbCont = new createjs.Container();
  	self.preloadInternal.buttonCont.addChild(hbCont);

  	var highButton = new createjs.Shape();
  	highButton.graphics.f("#ff00ff").dr(0,0,150,40).ef();
  	hbCont.addChild(highButton);
  	var highButtonText = new createjs.Text("High Quality","15px Arial","#ffffff");
  	highButtonText.x = highButton.x = 500;
  	highButtonText.y = highButton.y = 300;
  	hbCont.addChild(highButtonText);

  	lbCont.on("click", function(){
  		gameStage.removeChild(self.preloadInternal.buttonCont);
  		self.setHighLowQuality("low");
      self.preload();
  	},null,true);

  	hbCont.on("click", function(){
  		gameStage.removeChild(self.preloadInternal.buttonCont);
  		self.setHighLowQuality("high");
      self.preload();
  	},null,true);

  	gameStage.update();
  };
  /**
   * Scales the progress bar of the preloader.
   */
  self.handlePreloadProgress = function(event){
  	self.preloadInternal.loadingBar.scaleX = self.preloadInternal.preLoader.progress * self.preloadInternal.loadingBarWidth;
  	gameStage.update();
  };
  /**
   * Handles errors thrown by the preloader.
   * @throws escapeIWLoader.errorInvoker.invokeError
   */
  self.handlePreloadError = function(info){
  	switch(info.text) {
  		case "FILE_LOAD_ERROR":
  			escapeIWLoader.errorInvoker.invokeError(info.text + ":" + info.item.id);
  		break;
  		default:
  			escapeIWLoader.errorInvoker.invokeError("Unknown Preload Error");
  		break;
  	}
  };
  /**
   * Handles completion of preloading. Checks if touch is allowed to be enabled. Calls "start()"
   */
  self.handlePreloadComplete = function(event){
  	if(self.touchEnabled){
  		createjs.Touch.enable(gameStage);
  	}
    self.removePreloaderBar();
  	start();
  };
  /**
   * Sets whether the game should scale and get it's orientation at the start of preloading.
   */
  self.setScale = function(bool){
    self.scaleAtStartOfLoad = bool;
    if(bool){
      return true;
    } else {
      self.scaleAtStartOfLoad = false;
      return false;
    }
  };
  /**
   * Removes the progress bar of the preloader.
   */
  self.removePreloaderBar = function(){
    gameStage.removeChild(self.preloadInternal.loadingBarCont);
  };

  /**
   * Externally Visible
   */
  var returnable = new Object();
  /**
   * Sets the image and sound manifests.
   *
   * @param {JSON} HI High Quality Image Manifest
   * @param {JSON} HS High Quality Sound Manifest
   * @param {JSON} LI Low Quality Image Manifest
   * @return {boolean} true if all are set, else false (result of function)
   * @function escapeIWLoader.preloader.setManifests
   * @example escapeIWLoader.preloader.setManifests(HQImageManifest,HQSoundManifest,LQImageManifest);
   */
  returnable.setManifests = function(HI,HS,LI){
    return self.setManifests(HI,HS,LI);
  };
  /**
   * Sets the ticket file.
   * @param {JSON} TF Ticket File Load Request
   * @example escapeIWLoader.preloader.setTicketFile({id:"ticketFromFile",src:"ticket.xml", type:createjs.LoadQueue.XML});
   * @returns {boolean} true if successful, else false (result of function)
   * @function escapeIWLoader.preloader.setTicketFile
   */
  returnable.setTicketFile = function(TF){
    return self.setTicketFile(TF);
  };
  /**
   * Sets whether touch is enabled.
   * @param {boolean} bool True or False (enabled or disabled)
   * @default false (disabled), kept the same as the createjs default.
   * @return {boolean} true if successful, else false (result of function)
   * @function escapeIWLoader.preloader.setTouch
   * @example escapeIWLoader.preloader.setTouch(true);
   */
  returnable.setTouch = function(bool){
  	return self.setTouch(bool);
  };
  /**
   * Gets whether touch is enabled or not.
   *
   * @return {boolean} true or false (enabled or disabled)
   * @function escapeIWLoader.preloader.getTouch
   * @example escapeIWLoader.preloader.getTouch(); //will return true or false
   */
  returnable.getTouch = function(){
  	return self.touchEnabled;
  };
  /**
   * Gets the quality.
   *
   * @return {string} "high","low",null
   * @function escapeIWLoader.preloader.getQuality
   * @example escapeIWLoader.preloader.getQuality();
   */
  returnable.getQuality = function(){
  	return self.currentQuality;
  };
  /**
   * Gets the result of preloaded content by id specified in the JSON.
   *
   * @param {string} input ID of item
   * @return {Object} getResult of preloaded item
   * @function escapeIWLoader.preloader.getPreloaderResults
   * @example escapeIWLoader.preloader.getPreloaderResults("itemID"); //returns the item by its ID, specified in the manifest
   */
  returnable.getPreloaderResults = function(input){
  	return self.preloadInternal.preLoader.getResult(input);
  };
  /**
   * Gets whether the manifests are set or not
   * @return {boolean} true or false (value of "self.manifestsSet")
   * @function escapeIWLoader.preloader.getManifestStatus
   * @example escapeIWLoader.preloader.getManifestStatus(); //returns true or false if set or not
   */
  returnable.getManifestStatus = function(){
  	return self.manifestsSet;
  };
  /**
   * Gets whether the ticket file has been set
   * @return {boolean} true or false (value of "self.ticketFileSet")
   * @function escapeIWLoader.preloader.getTicketFileStatus
   * @example escapeIWLoader.preloader.getTicketFileStatus(); //return true or false if set or not
   */
  returnable.getTicketFileStatus = function(){
  	return self.ticketFileSet;
  };
  /**
   * Starts preloading on the quality selection screen.
   * @function escapeIWLoader.preloader.startPreload
   * @example escapeIWLoader.preloader.startPreload(); //start preload (or quality selection screen)
   */
  returnable.startPreload = function(){
    if(!self.enableQualitySelection){
      self.preload();
    } else {
    	self.preloadLandingScreen();
    }
  };
  /**
   * Sets whether the canvas will be scaled at the start of preloading
   * @param {boolean} bool True or False (enabled or disabled)
   * @default true (enabled)
   * @return {boolean} true or false (result of function)
   * @function escapeIWLoader.preloader.setScaleAtStart
   * @example escapeIWLoader.preloader.setScaleAtStart(true); //enables scaling at the start of preloading
   */
  returnable.setScaleAtStart = function(bool){
    return self.setOrientScale(bool);
  };
  /**
   * Sets whether the quality selection screen will be shown
   * @param {boolean} bool True or False (enabled or disabled)
   * @default true (enabled)
   * @return {boolean} true or false (result of function)
   * @function escapeIWLoader.preloader.setQualityEnabled
   * @example escapeIWLoader.preloader.setQualityEnabled(true); //enables the quality selection screen
   */
  returnable.setQualityEnabled = function(bool){
    return self.setQualityEnabled(bool);
  };

  return returnable;
})()
/**
 * Overlay Masker. Creates a mask above everything to hide items moving out of the stage
 * @namespace escapeIWLoader.overlayMasker
 * @memberof escapeIWLoader
 * @example Quick Start:
 * escapeIWLoader.overlayMasker.setMaskerColour("#123456");
 * escapeIWLoader.overlayMasker.mask();
 */
escapeIWLoader.overlayMasker = (function(){
  var self = new Object();
  self.maskerColour = null;
  self.maskerLaunchCount = 0;
  self.rightBoundary = 960;
  self.bottomBoundary = 640;
  /**
   * Sets the colour of the masker. Returns true if not null.
   *
   * @param colour String Hex colour eg "#ff00ff"
   * @return true if not null.
   */
  self.setMaskerColour = function(colour){
    self.maskerColour = colour;
    if(self.maskerColour != null){
      return true;
    } else {
      self.maskerColour = null;
      return false;
    }
  };
  /**
   * Draws three masking shapes on the left, right and bottom sides, 10k pixels out from their sides
   * @requires "maskerCont" to be defined.
   * @return true if successful and first time run.
   * @throws escapeIWLoader.errorInvoker.invokeError
   */
  self.mask = function(){
    if(self.maskerColour != null){
      if(self.maskerLaunchCount > 0){
        return false;
      } else {
        var maskers = new Array();
        var maskerColour = self.maskerColour;
        for( var i = 0; i < 3; i++) {
          maskers[i] = new createjs.Shape();
          maskerCont.addChild(maskers[i]);
        }
        maskers[0].graphics.f(maskerColour).dr(1, 0, -10000, 10000).ef();
        maskers[1].graphics.f(maskerColour).dr(-1, self.bottomBoundary-1, 10000, 10000).ef();
        maskers[2].graphics.f(maskerColour).dr(self.rightBoundary-1, 0, 10000, 10000).ef();
        self.maskerLaunchCount++;
        return true;
      }
    } else {
      escapeIWLoader.errorInvoker.invokeError("Masker launched before colour set.");
      return false;
    }
  };
  self.setBoundaries = function(right,bottom){
    self.rightBoundary = right;
    self.bottomBoundary = bottom;
    if(self.rightBoundary==null || self.bottomBoundary==null){
      return false;
    } else {
      return true;
    }
  };
  /**
   * Externally Visible
   */
  var returnable = new Object();
  /**
   * Sets the colour of the masker.
   * @function escapeIWLoader.overlayMasker.setMaskerColour
   * @param {string} colour
   * @return {boolean} true or false (result of function).
   * @example escapeIWLoader.overlayMasker.setMaskerColour("#ff0000");
   */
  returnable.setMaskerColour = function(colour) {
    return self.setMaskerColour(colour);
  };
  /**
   * Draws the mask.
   * @function escapeIWLoader.overlayMasker.mask
   * @returns {boolean} true or false (result of function).
   * @example escapeIWLoader.overlayMasker.mask()
   */
  returnable.mask = function(){
    return self.mask();
  };
  /**
   * Gets the masker colour.
   * @function escapeIWLoader.overlayMasker.getMaskerColour
   * @returns {string} colour
   * @example escapeIWLoader.overlayMasker.getMaskerColour();
   */
  returnable.getMaskerColour = function(){
    return self.maskerColour;
  };
  /**
   * Set the boundaries.
   * @function escapeIWLoader.overlayMasker.setBoundaries
   * @param {Number} right The x position that the right boundary will start
   * @param {Number} bottom The y position that that bottom boundary will start
   * @returns {Boolean} True or False
   * @example escapeIWLoader.overlayMasker.setBoundaries(right,bottom);
   * @defaults 960,640
   */
  returnable.setBoundaries = function(right,bottom){
    return self.setBoundaries(right,bottom);
  };
    /**
   * Get the boundaries.
   * @function escapeIWLoader.overlayMasker.getBoundaries
   * @param {String} "right" or "bottom"
   * @returns {Number} Value of that boundary or false if not valid
   * @example escapeIWLoader.overlayMasker.getBoundaries(input);
   */
  returnable.getBoundaries = function(input){
    if(input == "right"){
      return self.rightBoundary;
    } else if (input == "bottom"){
      return self.bottomBoundary;
    } else {
      return false;
    }
  };
  return returnable;
})()
/**
 * Scales the game to the window size, gets orientation.
 * @namespace escapeIWLoader.scaleOrient
 * @memberof escapeIWLoader
 * @example Quick Start, Full Window Scaling:
 * escapeIWLoader.scaleOrient.startResizeHandler();
 * escapeIWLoader.scaleOrient.setSize()
 *
 * Quick Start, Pause on Specified Orientation:
 * escapeIWLoader.scaleOrient.setPausedOrientation("portrait");
 * escapeIWLoader.scaleOrient.startOrientationHandler();
 */
escapeIWLoader.scaleOrient = (function(){
  var self = new Object();
  self.gamePaused = false;
  self.pauseOnOrientation = "portrait";
  self.cWidth = 960;
  self.cHeight = 640;
  self.gWidth = 960;
  self.gHeight = 640

  /**
   * Adds an event listener for orientation change
   */
  self.startOrientationHandler =function(){
    window.addEventListener("orientationchange",self.getOrientationAndPause,false);
  };
  /**
   * Adds an event listener for resize
   */
  self.startResizeHandler = function(){
    window.onresize = function(){self.setSize();};
  };
  /**
   * Gets the orientation, changes the pause variable
   * @requires "self.findLandscape"
   * @returns true if the game is paused.
   */
  self.getOrientationAndPause = function(){
    if(self.pauseOnOrientation == "portrait"){
      if(!self.findLandscape() && window.orientation != undefined){
        self.gamePaused = true;
        return true;
      } else {
        self.gamePaused = false;
        self.rescale();
        return false;
      }
    } else if (self.pauseOnOrientation == "landscape") {
      if(self.findLandscape() && window.orientation != undefined){
        self.gamePaused = true;
        return true;
      } else {
        self.gamePaused = false;
        self.rescale();
        return false;
      }
    } else {
      escapeIWLoader.errorInvoker.invokeError("Pause orientation invalid.");
      return false;
    }
  };
  /**
   * Finds out whether the screen is landscape or not
   * @returns true if landscape
   */
  self.findLandscape = function(){
    if(window.innerWidth >= window.innerHeight){
      return true;
    } else {
      return false;
    }
  };
  /**
   * Sets the canvas size to the window size.
   * Calls rescale.
   */
  self.setSize = function(){
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    self.rescale();
  };
  /**
   * Scales the gameStage to fit the window size without altering the aspect ratio
   */
  self.rescale = function(){
    SCALE = 1 - self.resize(true);

    gameStage.scaleX = SCALE;
    gameStage.scaleY = SCALE;

    game.width = window.innerWidth;
    game.height = window.innerHeight;
  };
  /**
   * Resizes to optimal size while maintaining aspect ratio.
   */
  self.resize = function(getScaleUp){
    var initialWidth = window.innerWidth,
        initialHeight = window.innerHeight,
        cssHeight   =   self.cHeight,
        cssWidth    =   self.cWidth,
        scaleUp,
        myRatio = cssWidth / cssHeight,
        windowRatio = initialWidth / initialHeight;

    GAMEHEIGHT = self.gHeight;
    GAMEWIDTH = self.gWidth;

    if (myRatio >= windowRatio) {
      scaleUp = ((cssWidth - initialWidth)/cssWidth);
    } else {
      scaleUp = ((cssHeight - initialHeight)/cssHeight);
    }

    var trueX = initialWidth/2;
    var gameX = GAMEWIDTH * ( 1 - scaleUp) / 2;

    gameStage.x = trueX - gameX;

    if (getScaleUp) {
      return scaleUp;
    }
  };
  /*
   * Sets the orientation to pause on.
   */
  self.setPausedOrientation = function(orientation){
    self.pauseOnOrientation = orientation;
    if(self.pauseOnOrientation == "portrait" || self.pauseOnOrientation == "landscape"){
      return true;
    } else {
      self.pauseOnOrientation = "portrait";
      return false;
    }
  };
  /*
   * Set the width and height that the scaler will use to scale the canvas and stage
   */
  self.setWidthHeight = function(cW,cH,gW,gH){
    self.cHeight = cH;
    self.cWidth = cW;
    self.gHeight = gH;
    self.gWidth = gW;

    if(self.cHeight==null || self.cWidth == null || self.gHeight== null || self.gWidth == null){
      return false;
    } else {
      return true;
    }
  };

  /**
   * Externally Visible
   */
  var returnable = new Object();
  /**
   * Gets the orientation that will set the paused variable to true.
   * @function escapeIWLoader.scaleOrient.getPausedOrientation
   * @returns {string} "portrait" or "landscape"
   * @example escapeIWLoader.scaleOrient.getPausedOrientation();
   */
  returnable.getPausedOrientation = function(){
    return self.pauseOnOrientation;
  };
  /**
   *  Sets the orientation to pause on.
   * @function escapeIWLoader.scaleOrient.setPausedOrientation
   * @returns {boolean} true or false if successful or not.
   * @param {String} orientation "portrait" or "landscape"
   * @default "portrait"
   * @example escapeIWLoader.scaleOrient.setPausedOrientation("portrait");
   */
  returnable.setPausedOrientation = function(orientation){
    return self.setPausedOrientation(orientation);
  };
  /**
   * Gets the value of the gamePaused variable.
   * @function escapeIWLoader.scaleOrient.getPaused
   * @returns {boolean} gamePaused
   * @example escapeIWLoader.scaleOrient.getPaused();
   */
  returnable.getPaused = function(){
    return self.gamePaused;
  };
  /**
   * Calls the function that adds the event listener for orientation detection.
   * @function escapeIWLoader.scaleOrient.startOrientationHandler
   * @example escapeIWLoader.scaleOrient.startOrientationHandler();
   */
  returnable.startOrientationHandler = function(){
    self.startOrientationHandler();
  };
  /**
   * Calls the function that adds the handler for resizing.
   * @function escapeIWLoader.scaleOrient.startResizeHandler
   * @example escapeIWLoader.scaleOrient.startResizeHandler();
   */
  returnable.startResizeHandler = function(){
    self.startResizeHandler();
  };
  /**
   * Calls the function that sets the canvas to the size of the window.
   * @function escapeIWLoader.scaleOrient.setSize
   * @example escapeIWLoader.scaleOrient.setSize();
   */
  returnable.setSize = function(){
    self.setSize();
  };
  /**
   * Sets the width and height that the scaler will use to calculate the resizing of the canvas and the stage
   * @function escapeIWLoader.scaleOrient.setWidthHeight
   * @param {Number} cW width
   * @param {Number} cH height
   * @param {Number} gW width
   * @param {Number} gH height
   * @returns {Boolean} True or false
   * @example escapeIWLoader.scaleOrient.setWidthHeight(960,640,960,640);
   * @defaults 960,640,960,640
   */
  returnable.setWidthHeight = function(cW,cH,gW,gH){
    return self.setWidthHeight(cW,cH,gW,gH);
  };
  return returnable;
})()
/**
 * Commonly used functions
 * @namespace escapeIWLoader.commonFunctions
 * @memberof escapeIWLoader
 */
escapeIWLoader.commonFunctions = (function(){
  var self = new Object();

  self.randomiseArray = function(array){
    var newArray = new Array();
    while (array.length > 0) {
      var arr = array.splice(Math.floor(Math.random() * array.length), 1);
      newArray.push(arr[0]);
    }
    return newArray;
  };
  self.createSprites = function(sSheet, xIn, yIn, frame, SoP, xReg, yReg, alphaIn) {
    if(sSheet == undefined || sSheet == null){escapeIWLoader.errorInvoker.invokeError("createSprites: missing param: sSheet"); return;}
    if(xIn == undefined || xIn == null){xIn = 0;}
    if(yIn == undefined || yIn == null){yIn = 0;}
    if(xReg == undefined || xReg == null){xReg = "left";}
    if(yReg == undefined || yReg == null){yReg = "top";}
    if(alphaIn == undefined || alphaIn == null){alphaIn = 0;}
    if(SoP == undefined || SoP == null){SoP = "stop";}

    var variable = new createjs.Sprite(new createjs.SpriteSheet(sSheet));
    variable.x = xIn;
    variable.y = yIn;
    variable.alpha = alphaIn;
    if(SoP == "play"){
      variable.gotoAndPlay(frame);
    } else {
      variable.gotoAndStop(frame);
    }

    self.adjustXReg(variable,xReg);
    self.adjustYReg(variable,yReg);

    return variable;
  };
  self.adjustXReg = function(target,xReg){
    switch(xReg){
      case "left":
        target.regX = 0;
      break;
      case "center":
        target.regX = target.spriteSheet._frames[target.currentFrame].rect.width/2;
      break;
      case "right":
        target.regX = target.spriteSheet._frames[target.currentFrame].rect.width;
      break;
      default:
        target.regX = 0;
      break;
    }
    return target;
  };
  self.adjustYReg = function(target,yReg){
    switch(yReg){
      case "top":
        target.regY = 0;
      break;
      case "center":
        target.regY = target.spriteSheet._frames[target.currentFrame].rect.height/2;
      break;
      case "bottom":
        target.regY = target.spriteSheet._frames[target.currentFrame].rect.height;
      break;
      default:
        target.regY = 0;
      break;
    }
    return target;
  };
  /**
   * Externally Visible
   */
  var returnable = new Object();

  /**
   * Adjusts the X registration point
   * @function escapeIWLoader.commonFunctions.adjustXRegPoint
   * @param {Sprite} target target sprite
   * @param {String} xReg "left","center","right"
   */
  returnable.adjustXRegPoint = function(target, xReg){
    return self.adjustXReg(target,xReg)
  };
  /**
   * Adjusts the Y registration point
   * @function escapeIWLoader.commonFunctions.adjustYRegPoint
   * @param {Sprite} target target sprite
   * @param {String} yReg "top","center","bottom"
   */
  returnable.adjustYRegPoint = function(target, yReg){
    return self.adjustYReg(target,yReg)
  };
  /**
   *  Creates sprites from the spritesheet at X and Y locations, correct frame, X and Y registrations and alpha.
   * @function escapeIWLoader.commonFunctions.createSprites
   * @param {spritesheet} sSheet createjs spritesheet
   * @param {Number} xIn X coordinate, default 0
   * @param {Number} yIn Y coordinate, default 0
   * @param {String} frame target frame
   * @param {String} SoP "stop" or "play". default "stop"
   * @param {String} xReg X registration point, default "left"
   * @param {String} yReg Y registration point, default "top"
   * @param {Number} alphaIn alpha, default 0
   * @returns {Sprite} Sprite
   */
  returnable.createSprites = function(sSheet,xIn, yIn, frame, SoP, xReg, yReg, alphaIn){
    return self.createSprites(sSheet, xIn, yIn, frame, SoP, xReg, yReg, alphaIn);
  };
  /**
   * Gets data out of a ticket.
   * @function escapeIWLoader.commonFunctions.getTicketData
   * @param {Object} ticketRawData Raw XML, result of escapeIWLoader.preloader.getPreloaderResults("ticketFromFile");
   * @param {String} tagname tagname eg: outcome, turn
   * @param {Number} index index
   * @param {String} attribute attribute eg: amount, wT, prizeTier
   * @returns {String} value of target attribute
   * @example escapeIWLoader.commonFunctions.getTicketData(myRawTicket,"outcome",0,"amount");
   */
  returnable.getTicketData = function(ticketRawData,tagname,index,attribute){
    return ticketRawData.getElementsByTagName(tagname)[index].getAttribute(attribute);
  };
  /**
   * Randomises arrays
   * @function escapeIWLoader.commonFunctions.randomiseArray
   * @param {Array} Array Array to be randomised
   * @returns {Array} Shuffled Array
   */
  returnable.randomiseArray = function(array){
    return self.randomiseArray(array);
  };
  return returnable;
})()
