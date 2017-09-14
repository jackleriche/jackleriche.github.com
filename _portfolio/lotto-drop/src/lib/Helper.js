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
                Helper.listToMatrix = function (list, elementsPerSubArray) {
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
                Helper.getRandomNumber = function (min, max) {
                    return Math.random() * (max - min) + min;
                };
                Helper.between = function (x, min, max) {
                    return x >= min && x <= max;
                };
                Helper.shuffleArray = function (array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;
                    while (0 !== currentIndex) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };
                Helper.sortArray = function (array) {
                    return array.sort(function (a, b) { return a - b; });
                };
                Helper.isInArray = function (value, array) {
                    return array.indexOf(value) > -1;
                };
                Helper._instance = new Helper();
                return Helper;
            })();
            iwg.Helper = Helper;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Helper.js.map