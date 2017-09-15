(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Scale 			= function (name) {

			if (!Helper.isDefined(name)) {
				console.warn('scale hasnt been given a name - terminating module creation');
				return false;
			}
			
			if (typeof Scale.instance === "object") {
                return Scale.instance;
            }
            Scale.instance = this;

            var _instance       = this,
                _name           = name,
                _enabled        = false,
                _parent         = null,
				_dimensions     = {
                    w:  null,
                    h:  null,
                    ow: null,
                    oh: null
                },
                _scaleFactor	= null,
                
				_scaleDiv		= document.createElement('div'),
                _subcribe       = function() {
                }(),
                _unsubscribe    = function() {
                };

                // getters
                this.getEnabled     = function() {
                    return _enabled;
                };
                this.getParent      = function() {
                    return _parent;  
                };
                this.getDimensions  = function() {
                    return _dimensions;  
                };
                this.getScaleFactor = function() {
                    return _scaleFactor;
                };
                this.getScaleDiv    = function() {
                    return _scaleDiv;
                };
                
                // setters
                this.setEnabled     = function(prv) {
                    _enabled = prv;
                };
                this.setParent      = function(prv) {
                    _parent = prv;  
                };
                this.setDimensions  = function(prv) {
                    if (Helper.isDefined(prv.w)) {
                         _dimensions.w = prv.w;  
                    };
                    if (Helper.isDefined(prv.h)) {
                         _dimensions.h = prv.h;  
                    };
                    if (Helper.isDefined(prv.ow)) {
                         _dimensions.ow = prv.ow;  
                    };
                    if (Helper.isDefined(prv.oh)) {
                         _dimensions.oh = prv.oh;  
                    };                   
                };
                this.setScaleFactor = function(prv) {
                    _scaleFactor = prv;  
                };
                
        init.bind(this)();

    };
    
    function init () {
        
        setupScaleDiv.bind(this)();
        moveIWGholderIntoScaleDiv.bind(this)();
        scaleFactor.bind(this)();
        alignScaleDiv.bind(this)();
        
    };
    
    function setupScaleDiv() {
      
        // create new element
        this.setParent(document.getElementById('IWGholder'));
        
        var scaleDiv            = this.getScaleDiv();
        
        scaleDiv.id             = "scaleDiv";
        scaleDiv.style.width    = "960px";
        scaleDiv.style.height   = "640px";

        this.getParent().appendChild(scaleDiv);
        
    };
    
    function moveIWGholderIntoScaleDiv() {
        
        var iwgCanvas = document.getElementById('IWGcanvas');
        this.getScaleDiv().appendChild(iwgCanvas);
          
    };
    
    function scaleFactor() {
      
        var w           = window.innerWidth ,           // screen width
            h           = window.innerHeight,           // screen height
            ow          = 960,                          // your default game width
            oh          = 640;                          // your default game height
            scaleFactor = Math.min(h / oh, w / ow);
            
        this.setDimensions({w: w, h: h, ow: ow, oh: oh});
        this.setScaleFactor(scaleFactor);         
        
    };
    
    function alignScaleDiv() {

        // now position the scaleDiv correctly in the screen
        var background      = document.getElementById('background'),
            marginLeft      = (960 - window.innerWidth) / 2,
            marginTop       = (640 - window.innerHeight) / 2;
            
        

        scaleDiv.style.left  = "-" + marginLeft + "px";
        scaleDiv.style.top   = "-" + marginTop + "px";
        
        background.style.left  = "-" + (marginLeft + 160) +"px";
        background.style.top   = "-" + (marginTop + 65) + "px";

        if ( this.getScaleFactor() > 1 ){
            this.setScaleFactor(1);
            this.getScaleDiv().style.left  	= Math.abs(marginLeft) + "px";
            this.getScaleDiv().style.top  	= Math.abs(marginTop) + "px";
        };

        // move all elements into scaleDiv
        TweenMax.to(this.getScaleDiv(), 0, { delay: 1, scaleX: this.getScaleFactor(), scaleY: this.getScaleFactor() });
        TweenMax.to( background , 0, { delay: 1, scaleX: this.getScaleFactor(), scaleY: this.getScaleFactor(), onComplete: function() {
            iwg.IWGEM.trigger('gameReady');
        }});
 
    };

    Scale.VERSION = '0_0_1';
    IWGInit = function () {
        _Scale = new Scale();
    };
    iwg._class("iwg.lib.Scale", Scale);
}(window));
