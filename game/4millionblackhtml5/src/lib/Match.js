/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Match = (function () {
                function Match(_name, _type) {
                    this._name = _name;
                    this._type = _type;
                    this._types = ["match", "match2"];
                    this._clickCount = 0;
                    this._winningSymbols = [];
                    this._playableSymbols = [];
                    this._instantWin = [];
                    this._background = null;
                    var legit = false;
                    for (var i = 0; i < this._types.length; i++) {
                        var element = this._types[i];
                        if (this._type === element) {
                            legit = true;
                        }
                    }
                    if (!legit) {
                        console.warn('Match type in ' + this._name + ' is incorrect or unset');
                    }
                    this._subscribe();
                }
                Match.prototype._subscribe = function () {
                    IWG.IWGEM.on('decClickCount', this._decCount.bind(this));
                };
                Match.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('decClickCount');
                };
                Match.prototype.getWinningSymbols = function () {
                    return this._winningSymbols;
                };
                Match.prototype.addSymbol = function (go, type) {
                    if (go) {
                        this._clickCount++;
                        if (type === "winning") {
                            this._winningSymbols.push(go);
                            return true;
                        }
                        else {
                            this._playableSymbols.push(go);
                            return true;
                        }
                    }
                    return false;
                };
                Match.prototype.addBackground = function (go) {
                    this._background = go;
                    return false;
                };
                Match.prototype._decCount = function (name, go) {
                    if (name === this._name) {
                        this._checkMatch(go);
                    }
                };
                Match.prototype._checkMatch = function (go) {
                    if (this._type === "match") {
                        for (var i = 0; i < this._winningSymbols.length; i++) {
                            var winningSymbol = this._winningSymbols[i];
                            if (winningSymbol.getRevealed()) {
                                for (var j = 0; j < this._playableSymbols.length; j++) {
                                    var playableSymbol = this._playableSymbols[j];
                                    if (winningSymbol.getTicketLabel() === playableSymbol.getTicketLabel()) {
                                        if (playableSymbol.getRevealed() && (!playableSymbol.getWinRevealed())) {
                                            playableSymbol.winReveal();
                                            winningSymbol.winReveal();
                                        }
                                    }
                                }
                            }
                        }
                        for (var k = 0; k < this._instantWin.length; k++) {
                            var instantWinLabel = this._instantWin[k];
                            if (instantWinLabel == go.getTicketLabel()) {
                                go.winReveal();
                            }
                        }
                    }
                    else if (this._type === "match2") {
                        IWG.IWGEM.trigger('matchFinished', [this._name]);
                        var remainingIcons = [];
                        for (var i = 0; i < this._playableSymbols.length; i++) {
                            var element = this._playableSymbols[i];
                            if (element.getRevealed() === false) {
                                remainingIcons.push(element);
                            }
                        }
                        if (!this._winningSymbols[0].getRevealed()) {
                            remainingIcons.push(this._winningSymbols[0]);
                        }
                        var delay = 1.2;
                        for (var j = 0; j < remainingIcons.length; j++) {
                            var go = remainingIcons[j];
                            go.setEnabled(false);
                            if (!go.getRevealed()) {
                                if (go.getName().indexOf('prize') >= 0) {
                                    delay += 1.2;
                                }
                                TweenMax.to(go, delay, { onCompleteParams: [go], onComplete: function (go) {
                                        go.reveal();
                                    } });
                                delay += 1.2;
                            }
                        }
                        if (this._playableSymbols[0].getTicketLabel() === this._playableSymbols[1].getTicketLabel()) {
                            this._playableSymbols[0].winReveal();
                            this._playableSymbols[1].winReveal();
                            this._winningSymbols[0].winReveal();
                            this._background.winReveal();
                        }
                    }
                };
                Match.prototype.setInstantWin = function (ticketLabel) {
                    if (this._instantWin.indexOf(ticketLabel) !== -1) {
                        console.warn('ticketLabel :' + ticketLabel + ', already included in InstantWin array');
                        return false;
                    }
                    this._instantWin.push(ticketLabel);
                    return true;
                };
                return Match;
            })();
            iwg.Match = Match;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
