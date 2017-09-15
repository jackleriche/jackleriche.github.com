/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Compare = (function () {
                function Compare(_name) {
                    this._name = _name;
                    this._isFinished = false;
                    this._yours = null;
                    this._theirs = null;
                    this._background = null;
                    this._winIcon = null;
                    this._subscribe();
                }
                Compare.prototype._subscribe = function () {
                    IWG.IWGEM.on('checkCompare', this._checkWin.bind(this));
                };
                Compare.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('checkCompare');
                };
                Compare.prototype._checkWin = function (name) {
                    if (name === this._name) {
                        var remainingIcons = [];
                        if (this._yours.getRevealed() === false) {
                            remainingIcons.push(this._yours);
                        }
                        if (this._theirs.getRevealed() === false) {
                            remainingIcons.push(this._theirs);
                        }
                        if (this._winIcon.getRevealed() === false) {
                            remainingIcons.push(this._winIcon);
                        }
                        var delay = 1;
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
                        if (this._yours.getTicketLabel() > this._theirs.getTicketLabel()) {
                            this._yours.winReveal();
                            this._theirs.winReveal();
                            this._winIcon.winReveal();
                            this._background.winReveal();
                        }
                        IWG.IWGEM.trigger('compareFinished', [this._name]);
                    }
                    ;
                };
                Compare.prototype.addSymbol = function (go, type) {
                    if (go) {
                        if (type === "yours") {
                            this._yours = go;
                        }
                        else if (type === "theirs") {
                            this._theirs = go;
                        }
                        else if (type === "background") {
                            this._background = go;
                        }
                        else {
                            this._winIcon = go;
                        }
                    }
                    return false;
                };
                Compare.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return Compare;
            })();
            iwg.Compare = Compare;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
