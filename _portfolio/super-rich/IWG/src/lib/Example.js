(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        iwg = camelot.iwg,
        GS = window.com.greensock,

    Example = function () {
        if (typeof Example.instance === "object") {
                return Example.instance;
            }
            var _privateVar = 'private var';

            //getter/setter
            this.getPrivate = function () {
                return _privateVar;
            };
            this.setPrivate = function (prv) {
                _privateVar = prv;
            };

            Example.instance = this;
    }
		
    //static method
    Example.STATICMETHOD = function () {
        console.log('static method');
    };

    //public method
    Example.prototype.publicMethod2 = function () {
        console.log('publicMethod2');
    };

    //private method
    function privateMethod() {
        console.log('privateMethod');
        iwg.IWGEM.E_YOUR_EVENT.dispatch();
    }

    //namespace path
    iwg._class("iwg.lib.Example", Example);
}(window));