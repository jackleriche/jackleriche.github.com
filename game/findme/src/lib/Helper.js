(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        _Helper,
        Helper = function () {

            if (typeof Helper.instance === "object") {
                return Helper.instance;
            }
            Helper.instance = this;

            var _subscribe    = function() {

                }(),
                _unsubscribe  = function() {

                }();


            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };

        };

    /*
        Creates bitmapImage using properties passed in
        @Params name
        @Params position - object {x: Number, y: Number}
        @Params alpha - Number 0 - 1
        @Params doReg - Bool
        @Params customSS - Object reference
        @Return BitnmapImage

    */
    Helper.makeBitmapImage = function (name, pos, alpha, doReg, customSS) {
        
        // needs a SS passed in
        if (!Helper.isDefined(customSS)) {
            console.warn('no sprite sheet mentioned -- terminating makeBitmapImage()');
            return false;
        }

        var BitmapImage = new createjs.Sprite(customSS.ss);
        BitmapImage.gotoAndStop(name);
        BitmapImage.x = pos.x;
        BitmapImage.y = pos.y;
        BitmapImage.name = name;

        var w = null,
            h = null;

       if (BitmapImage.getBounds()) {
           w = BitmapImage.getBounds().width;
           h = BitmapImage.getBounds().height;
       }

       if (doReg) {
           BitmapImage.regX = w / 2;
           BitmapImage.regY = h / 2;
       }


       if (alpha < 1) {
           BitmapImage.alpha = alpha;
       }
        return BitmapImage;
    }

    // checks
    /*
        is defined
    */
    Helper.isDefined = function(obj) {
        return obj !== null && typeof obj !== "undefined";
    };
    
    /*/
        methods to return random int
    /*/
    Helper.getRandomInt = function (min, max) { 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    

    /*/
        methods to help shuffle
    /*/
    Helper.shuffle = function (o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    
    /*/
        remove all format from string 
    /*/
    Helper.removeFormat = function (string) {
        
        return string.toLowerCase().replace(/\s/g, '');
        
    }
    
    /*
     *	Name:			getRandomFromArray
     *	Description:	returns a random item from array
     *	Params:			array:Array
     *	Returns:		array:Array
     */
    Helper.getRandomFromArray  = function (array) {
        
        return array[Math.floor(Math.random() * this.length)]
          
    };
    
    /*
     *	Name:			randomArray
     *	Description:	random an array 
     *	Params:			array:Array
     *	Returns:		object from array
     */
    Helper.shuffleArray = function (array) {
      
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
            
        }
        
        return array; 
          
    };

    /*
     *	Name:			alValuesSame
     *	Description:	check value of array are the same and return true/false
     *	Params:			array:Array, value:Property
     *	Returns:		Bool
     */
     Helper.allValuesSame = function (array, prop) {
         
        for(var i = 1; i < array.length; i++) {
            if(array[i].getIsRevealed !== array[0])
                return false;
        }
        return true;  
         
     };
     
    /*
     *  Name:           formatInt
     *  Description:    format integars to include comma seperation
     *  Params:         val:INT
     *  Returns:        val:STRING
     */
    Helper.formatInt = function (val) {
        
        return val.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");;
          
    };

    Helper.VERSION = '0_0_1';
    iwg._class("iwg.lib.Helper", Helper);
}(window));
