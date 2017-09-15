/// <reference path="../imports/js/Sideplay.ts" />
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
                Helper.getRandomNumber = function (min, max) {
                    return Math.random() * (max - min) + min;
                };
                Helper.hasDuplicates = function (array) {
                    var valuesSoFar = Object.create(null);
                    for (var i = 0; i < array.length; ++i) {
                        var value = array[i];
                        if (value in valuesSoFar) {
                            return value;
                        }
                        valuesSoFar[value] = true;
                    }
                    return false;
                };
                Helper.ColorLuminance = function (hex, lum) {
                    hex = String(hex).replace(/[^0-9a-f]/gi, '');
                    if (hex.length < 6) {
                        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                    }
                    lum = lum || 0;
                    var rgb = "#", c, i;
                    for (i = 0; i < 3; i++) {
                        c = parseInt(hex.substr(i * 2, 2), 16);
                        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                        rgb += ("00" + c).substr(c.length);
                    }
                    return rgb;
                };
                Helper.checkHasDuplicates = function (array, object, prop) {
                    var valuesSoFar = [];
                    for (var i = 0; i < array.length; i++) {
                        var ele = array[i];
                        if (ele.hasOwnProperty(prop)) {
                            valuesSoFar.push(ele[prop]);
                            for (var j = 0; j < valuesSoFar.length; j++) {
                                var value = valuesSoFar[j];
                                if (object.hasOwnProperty(prop)) {
                                    if (value === object[prop]) {
                                        console.warn("gameObject name '" + value + "' has already been used, please select alternative name");
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
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
                Helper.sortNumber = function (a, b) {
                    return a - b;
                };
                Helper.getGameObject = function (name) {
                    var array = IWG.gameObjectsArray;
                    for (var i = 0; i < array.length; i++) {
                        var ele = array[i];
                        if (name === ele.getName()) {
                            return ele;
                        }
                    }
                    return false;
                };
                Helper.getScene = function (name) {
                    var array = IWG.scenesArray;
                    for (var i = 0; i < array.length; i++) {
                        var ele = array[i];
                        if (name === ele.getName()) {
                            return ele;
                        }
                    }
                    return false;
                };
                Helper.numberWithCommas = function (x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                };
                Helper._instance = new Helper();
                return Helper;
            })();
            iwg.Helper = Helper;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
