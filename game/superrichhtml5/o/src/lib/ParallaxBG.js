(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 	= window.com.camelot,
        iwg 		= camelot.iwg,
        core		= window.com.camelot.core,
        lib 		= iwg.lib,
        GS 			= window.com.greensock,
        Helper 		= lib.Helper,
        R 			= lib.R,
        MEvent		= lib.MEvent,

    ParallaxBG = function () {

        var _dragX          = 0.5,
            _dragY          = 0.5,
            _limitX         = false,
            _limitY         = false,
            _tar            = document.getElementById('IWGholder'),
            _wW             = _tar.width,
            _wH             = _tar.height,
            _rX             = _wW/2,
            _rY             = _wH/2,
            _enabled        = false,
            _orientation    = null;

        this.getDragX = function(){
            return _dragX;
        }
        this.getDragY = function(){
	        return _dragY;
        }
        this.getTar = function(){
            return _tar;
        }
        this.getwH = function(){
            return _wH;
        }
        this.getrX = function(){
            return _rX;
        }
        this.getrY = function(){
            return _rY;
        }
        this.getEnabled = function(){
            return _enabled;
        }
        this.getOrientation = function() {
            return _orientation;
        }

		/* setters with sufficient variable checking */
        this.setEnabled = function(prv){
            if (typeof(prv) === "boolean"){
                _enabled = prv;
            }
        }
        this.setOrientation = function(prv){
            if (typeof(prv) === "string"){
               var stringCheck = prv.toLowerCase();
               if (stringCheck.length != 0){
                    if (stringCheck === "portrait" || stringCheck === "landscape" || stringCheck === "landscapeflip"){
                        _orientation = stringCheck;
                    } else {
                        console.warn('setOrientation should be set to either "portrait" or "landscape"');
                    }
               }
            } else {
                console.warn('setOrientation should be of type [string]');
            }
        }

        this.doOnOrientationChange();

    }

    ParallaxBG.prototype.enabled = function (bool){
       	var self = this;
		this.setEnabled(bool);
        if(this.getEnabled()){
			var data = {};
            if ("ondeviceorientation" in window) {
            	/* Check if we have device with Gyroscope (iPhone 4 or iPod Touch 4G). */

                window.addEventListener("deviceorientation", function(event){

                    data.x = Math.round(event.beta);
                    data.y = Math.round(event.gamma);
    				data.z = Math.round(event.alpha);

                    updateBG(self, data.x, data.y);
                });

            } else if ("ondevicemotion" in window) {
	            /* Check if we have device with accelerometer (all older Apple devices) */
                window.ondevicemotion = function(event) {
                    data.x = Math.round(event.accelerationIncludingGravity.x);
                    data.y = Math.round(event.accelerationIncludingGravity.y);
    				data.z = Math.round(event.accelerationIncludingGravity.z);

					updateBG(self, data.x, data.y);
                };
            };

        }
    }

    ParallaxBG.prototype.doOnOrientationChange = function() {

        var self = this;

        switch(window.orientation)
        {
          case -90:
            self.setOrientation('landscapeFlip');
            break;
          case 90:
            self.setOrientation('landscape');
            break;
          default:
            self.setOrientation('portrait');
            break;
        }

        window.addEventListener('orientationchange', function(){
            self.doOnOrientationChange();
        });
    }

    function updateBG( self, x, y ){

        var target = self.getTar();

        switch(self.getOrientation()){
            case "landscapeflip":
                target.style.backgroundPositionX = (x * 2) * self.getDragX() + "px";
                target.style.backgroundPositionY = -y * self.getDragY() + "px";
                break;
            case "landscape":
                target.style.backgroundPositionX = -(x * 2) * self.getDragX() + "px";
                target.style.backgroundPositionY = y * self.getDragY() + "px";
                break;

            case "portrait":
                target.style.backgroundPositionX = y * self.getDragY() + "px";
                target.style.backgroundPositionY = x * self.getDragX() + "px";
                break;
        }

    }

    //namespace path
    iwg._class("iwg.lib.ParallaxBG", ParallaxBG);
}(window));
