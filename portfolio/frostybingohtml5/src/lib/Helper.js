/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Helper = (function () {
                function Helper() {
                    if (Helper._instance) {
                        throw new Error("Error: Instantiation failed: Use Helper.getInstance() instead of new.");
                    }
                    Helper._instance = this;
                }
                Helper.getInstance = function () {
                    return Helper._instance;
                };
                Helper.prototype.listToMatrix = function (list, elementsPerSubArray) {
                    var matrix = [], i, k;
                    for (i = 0, k = -1; i < list.length; i++) {
                        if (i % elementsPerSubArray === 0) {
                            k++;
                            matrix[k] = [];
                        }
                        matrix[k].push(list[i]);
                    }
                    return matrix;
                };
                Helper.prototype.getRandomNumber = function (min, max) {
                    return Math.random() * (max - min) + min;
                };
                Helper._instance = new Helper();
                return Helper;
            })();
            iwg.Helper = Helper;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
