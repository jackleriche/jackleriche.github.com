(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Ticket          = lib.Ticket,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        GameObject = function (name, dimensions, zindex) {

			if (!name){
                console.warn('GameObject instance has no name');
                return false;
            }

		    var _instance       = this,
		        _name           = name,
		        _stage          = null,
                _canvas         = null,
                _active         = false,
                _width          = null,
                _height         = null,
                _revealed       = false,
                _ticketLabel    = null,
                _enabled        = false,    // indicate if the asset is enabled
                _clicked        = false,    // indicate if the asset has been clicked
                _visable        = false,
                _parent         = this,
                _position       = {
                    x: 0,
                    y: 0
                },
                _dimensions     = {
                    w: dimensions.w,
                    h: dimensions.h
                },
                _scale          = 1,
                _alpha          = 1,
                _rotation       = 0,
                _zindex         = zindex,
                _layoutPosition = [],
                _update         = function () {
                    if(_active) {
                        _stage.update();
                    }
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('update', _update);
                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('update');
                }();

            // getters
            this.getName            = function() {
                return _name;
            };
            this.getStage           = function() {
                return _stage;
            };
            this.getCanvas          = function() {
                return _canvas;
            };
            this.getActive          = function() {
                return _active;
            };
            this.getHeight          = function() {
                return _height;
            };
            this.getWidth           = function() {
                return _width;
            };
            this.getRevealed        = function() {
                return _revealed;
            };
            this.getTicketLabel     = function() {
                return _ticketLabel;
            };
            this.getEnabled         = function() {
                return _enabled;
            };
            this.getVisable         = function() {
                return _visable;
            };
            this.getClickable         = function() {
                return _clicked;
            };
            this.getParent          = function() {
                return _parent;
            };
            this.getPosition        = function() {
                return _position;
            };
            this.getAlpha           = function() {
                return _alpha;
            };
            this.getScale           = function() {
                return _scale;
            };
            this.getDimensions      = function() {
                return _dimensions;
            };
            this.getLayoutPositions = function() {
                return _layoutPosition;
            };

            // setters
            this.setWidth           = function(prv) {
                _width = prv;
            };
            this.setHeight          = function(prv) {
                _height = prv;
            };
            this.setRevealed        = function(prv) {
                _revealed = prv;
            };
            this.setEnabled         = function(bool) {
                _enabled = bool;
            };
            this.setActive          = function(prv) {
                _active = prv;
            };
            this.setVisable         = function(prv) {
                _visable = prv;
            };
            this.setParent          = function(parent) {
                // if parent is set, need to remove canvas and apply the bitmaps to a container which is then added to the parent
                /*
                var container = new createjs.Container(),
                    children = _stage.children;

                for (var i = 0; i < children.length; i++){
                    container.addChild(children[i]);
                }

                parent.addChild(container);
                */

                _parent = parent;
            };
            this.setPosition        = function(prv) {
                if ( prv.x ) {
                    _position.x = prv.x;
                };

                if ( prv.y ) {
                    _position.y = prv.y;
                };

                TweenMax.set(_canvas, { x: _position.x, y: _position.y });

            };
            this.setScale           = function(num) {

                if(typeof(num) === "number"){
                    _scale = num;
                    TweenMax.set(_canvas, {scale: _scale});
                }

            };
            this.setAlpha           = function(num) {

                if(typeof(num) === "number"){
                    _alpha = num;
                    TweenMax.set(_canvas, {alpha: _alpha});
                }

            };
            this.setClickable          = function(prv) {
                _clicked = prv;
            };

            // unsubscribe
            this.unsubscribe        = function() {
                _unsubscribe;
            };

            core.IWG.ame('canvasStack', {
                create: _name,
                parentDiv: 'scaleDiv',
                w: dimensions.w,
                h: dimensions.h,
                z: _zindex
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            createjs.Touch.enable(_stage, false, true);

            init.bind(this)();

        };

    function init() {};

    GameObject.prototype.destroy = function() {

        var self = this;
        this.unsubscribe();
        //remove canvas
        TweenMax.to(self.getCanvas(), 0.7, {alpha: 0, onComplete: function(){
            if(self.getCanvas().parentNode !== null) {
                self.getCanvas().parentNode.removeChild(self.getCanvas());
            }
        }});

    };

    GameObject.VERSION = '0_0_1';

    IWGInit = function () {

        _GameObject = new GameObject();

    };

    iwg._class("iwg.lib.GameObject", GameObject);
}(window));
