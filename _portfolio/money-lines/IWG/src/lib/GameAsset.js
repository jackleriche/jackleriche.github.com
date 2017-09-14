(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot             = window.com.camelot,
        iwg                 = camelot.iwg,
        lib                 = iwg.lib,
        R                   = lib.R,
        GS                  = window.com.greensock,


    /**
        * This is the GameAsset constructor. It takes a movie clip reference and an Object
        * as its parameters. The object as parameters is allowing a convenient way to define
        * variable arguments to be passed in the constructor in a similar way that the
        * Tweener class does.
        * This should allow for clear object definition in a compact way without having to
        * use/define a massive number of object accessors. Only those that are required for
        * runtime manipulation should end up being defined.
        *
        * @param MovieClip
        * @param Object
    **/
    GameAsset = function ( container, parameters, functions) {

        var _ticketLabel,
        _container      = container,
        _fns            = functions,
        //  _gameAssetMc ,                      // Reference to a movie clip on the stage
        // State Properties
        _isEnabled = false,                     // indicate if the asset is enabled
        _isClicked,                             // indicate if the asset has been clicked
        _isShown,                               // indicate if the asset is shown
        _isRevealed = false,                    // indicate if the asset has been revealed
        _isWinRevealed = false,                 // indicate if the asset has been win revealed
        _isWinner,                              // indicate if the asset is a winner
        _revealComplete = false,                // reveal complete, to test if end of reveal has happened

        // Show Properties
        _animateShow = false,                   // indicate animation rather than simple visibility
        _animateShowMode = 'fade',              // 'show' 'fade' or 'play'
        _showHideAnimationPath,                 // FLA clip path to play for animated show/hide
        _showFrameLabel = null,                 // FLA clip path label for the show animation
        _showDuration = 0,                      // count of frames used for fade/play

        // Hide Properties
        _hideFrameLabel,                        // FLA clip path label for the hide animation
        _hideDuration,                          // count of frames used for fade/play

        // Reveal Properties
        _revealDuration,                        // number of frames taken to reveal

        // Legend Reveal Properties
        _legendRevealDuration,                  // number of frames taken to legend reveal

        // Win Reveal Properties
        _winRevealDuration,                     // number of frames taken to win reveal
        _prizeValue = 0,                        // prize value to bank when win reveal is called, defaulted to 0 to stop winReveals without a prize value banking null

        // Dynamic Text Properties
        _dynamicTextPath = null,                // the path to the Text field

        // Filter Properties
        _animateHighlight = false,              // set the animate highlight

        // counter
        _isCounted = false;

        //setter
        this.setTicketLabel = function (prv) {
            _ticketLabel = prv;
        };
        this.setIsCounted = function (prv) {
            _isCounted = prv;
        }
        this.setIsRevealed = function (prv) {
            _isRevealed = prv;
        };
        this.setWinReveal = function(prv) {
            _isWinRevealed = prv;
        };

        // getters
        this.getTicketLabel = function () {
            return _ticketLabel;
        };
        this.getIsCounted = function(){
            return _isCounted;
        }
        this.getIsRevealed = function () {
            return _isRevealed;
        };
        this.getContainer = function () {
            return _container;
        };
        this.getFunctions = function() {
            return _fns;
        };
        this.getWinReveal = function() {
            return _isWinRevealed;
        };

        // Process the parameters object here
        var validProperty;
        for (var prop in parameters) {
            validProperty = false;
            for (var tProp in propMap) {
                if (tProp == prop) {
                    this[tProp]  = parameters[prop];
                    validProperty = true;
                    break;
                }
            }
            if (validProperty == false) {
                throw new Error("'"+prop+"' is not a valid property");
            }
        }
        GameAsset.instance = this;
    }

    /**
     * Method called to execute the clip legend reveal.
     *
     * @param key       - function key to call
     * @param context   -
     * @param delay     - Number for how long to delay the reveal by
     **/
    GameAsset.prototype.reveal = function( key, context, delay ) {

        var functions   = this.getFunctions();

        if (functions[key]) {
            setTimeout(function(){
                functions[key].apply(context);
            }, delay);

        } else {
            throw key + "() is undefined"; // function symbol is undefined
        }
    };

    //static method
    GameAsset.STATICMETHOD = function () {
        console.log('static method');
    };

    //public method
    GameAsset.prototype.publicMethod2 = function () {
        console.log('publicMethod2');
    };

    //private method
    function privateMethod() {
        console.log('privateMethod');
        iwg.IWGEM.E_YOUR_EVENT.dispatch();
    }

    //namespace path
    iwg._class("iwg.lib.GameAsset", GameAsset);
}(window));
