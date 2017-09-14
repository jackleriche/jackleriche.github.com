/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Equals = (function () {
                function Equals(_name) {
                    this._name = _name;
                    this._isFinished = false;
                    this._highlight = null;
                    this._numbers = [];
                    this._equals = null;
                    this._total = null;
                    this._prize = null;
                    this._subscribe();
                }
                Equals.prototype._subscribe = function () {
                    IWG.IWGEM.on('checkEquals', this._checkWin.bind(this));
                };
                Equals.prototype._unsubscribe = function () {
                };
                Equals.prototype._checkWin = function (name) {
                    if (name === this._name) {
                        var remainingIcons = [];
                        for (var i = 0; i < this._numbers.length; i++) {
                            var element = this._numbers[i];
                            if (!element.getRevealed()) {
                                remainingIcons.push(element);
                            }
                        }
                        if (this._equals.getRevealed() === false) {
                            remainingIcons.push(this._equals);
                        }
                        if (this._prize.getRevealed() === false) {
                            remainingIcons.push(this._prize);
                        }
                        var delay = 0.5;
                        for (var i = 0; i < remainingIcons.length; i++) {
                            var go = remainingIcons[i];
                            go.setEnabled(false);
                            if (!go.getRevealed()) {
                                if (go.getName().indexOf('prize') >= 0) {
                                    delay += 1.5;
                                }
                                TweenMax.to(go, delay, { onCompleteParams: [go], onComplete: function (go) {
                                        go.reveal();
                                    } });
                                delay += 0.5;
                            }
                        }
                        if (this._equals.getTicketLabel() === this._total && this._numbers[0].getTicketLabel() + this._numbers[1].getTicketLabel() === this._total) {
                            for (var i = 0; i < this._numbers.length; i++) {
                                var element = this._numbers[i];
                                element.winReveal();
                            }
                            this._equals.winReveal();
                            this._prize.winReveal();
                            this._highlight.winReveal();
                        }
                        IWG.IWGEM.trigger('equalsFinished', [this._name]);
                    }
                };
                Equals.prototype.setTotal = function (total) {
                    if (total) {
                        this._total = total;
                    }
                    ;
                };
                Equals.prototype.addNumber = function (go, type) {
                    if (go) {
                        if (type === "number") {
                            this._numbers.push(go);
                        }
                        else if (type === "equals") {
                            this._equals = go;
                        }
                        else if (type === "highlight") {
                            this._highlight = go;
                        }
                        else {
                            this._prize = go;
                        }
                    }
                };
                Equals.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return Equals;
            })();
            iwg.Equals = Equals;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
