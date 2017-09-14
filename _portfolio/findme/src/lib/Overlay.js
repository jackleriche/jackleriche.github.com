(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        BackgroundSS    = lib.flassets.BackgroundSS,
        GameObject      = lib.GameObject,

        Overlay = function (name) {
	
			return false;

			if (!name){
            	console.warn('Overlay instance has no name');
                return false;
            }

            if (typeof Overlay.instance === "object") {
                return Overlay.instance;
            }
            Overlay.instance = this;

		    var _instance       = this,
                _super          = null,
                _name           = name,
                _showOverlay    = function() {
                    
                    TweenMax.to(_instance.getCanvas(), 0.7, { autoAlpha: 0.75 });
                    
                },
                _hideOverlay    = function() {
                    
                    TweenMax.to(_instance.getCanvas(), 0.7, { autoAlpha: 0 });
                    
                }, 
                _subscribe      = function() {
                    iwg.IWGEM.on("showOverlay", _showOverlay);
                    iwg.IWGEM.on("hideOverlay", _hideOverlay);
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off("showOverlay");
                    iwg.IWGEM.off("hideOverlay");
                };

            _instance.__proto__ = new GameObject(name, {w:1500, h: 640}, 3);
            _super = _instance.__proto__;

            init.bind(this)();

        };

    function init() {

        setupLayout.bind(this)();
        
        this.setPosition({x: -300, y: 0});
        this.getStage().update();

    };

    function setupLayout(){

        var bg          = Helper.makeBitmapImage("bg", {x:0, y:0}, 1, false, BackgroundSS),
            blurFilter  = new createjs.BlurFilter(5, 5, 1);
            
        bg.filters      = [blurFilter];
            
        var bounds      = blurFilter.getBounds();
        bg.cache(0, 0, 1500, 640);

        iwg.IWGEM.trigger('showOverlay');
        this.getStage().addChild(bg);
        
    };

    Overlay.prototype.destroy = function() {

        this.unsubscribe();

    };


    Overlay.VERSION = '0_0_1';
    IWGInit = function () {
        _Overlay = new Overlay();
    };
    iwg._class("iwg.lib.Overlay", Overlay);
}(window));
