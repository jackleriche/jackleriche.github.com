/// <reference path="../../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var Global = (function () {
                function Global() {
                    this._globals = [];
                    if (Global._instance) {
                        throw new Error("Error: Instantiation failed: Use Global.getInstance() instead of new.");
                    }
                    Global._instance = this;
                }
                Global.getInstance = function () {
                    return Global._instance;
                };
                Global.prototype.addToGlobal = function (name, item) {
                    for (var i = 0; i < this._globals.length; i++) {
                        var global = this._globals[i];
                        if (global.name === name) {
                            global.item = item;
                            return;
                        }
                    }
                    var globalObject = {
                        name: name,
                        item: item
                    };
                    this._globals.push(globalObject);
                };
                Global.prototype.getFromGlobal = function (name) {
                    for (var i = 0; i < this._globals.length; i++) {
                        var g = this._globals[i];
                        if (g.name === name) {
                            return g.item;
                        }
                    }
                };
                Global._instance = new Global();
                return Global;
            })();
            iwg.Global = Global;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
