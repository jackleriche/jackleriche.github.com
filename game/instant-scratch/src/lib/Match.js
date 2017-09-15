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
                    if (_type === void 0) { _type = null; }
                    this._name = _name;
                    this._type = _type;
                    this._clickCount = 0;
                    this._winningSymbols = [];
                    this._playableSymbols = [];
                    this._instantWin = [];
                    this._revealedIcons = [];
                    this._subscribe();
                }
                Match.prototype.getName = function () {
                    return this._name;
                };
                Match.prototype._subscribe = function () {
                    IWG.IWGEM.on('decClickCount', this._decCount.bind(this));
                };
                Match.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('decClickCount');
                };
                Match.prototype.addSymbol = function (go, type) {
                    if (go) {
                        this._clickCount++;
                        if (type === "winning") {
                            this._winningSymbols.push(go);
                        }
                        else {
                            this._playableSymbols.push(go);
                        }
                    }
                    return false;
                };
                Match.prototype._decCount = function (name, go) {
                    if (name === this._name) {
                        this._clickCount--;
                        if (this._clickCount === 0) {
                            IWG.IWGEM.trigger('matchFinished', [this._name]);
                        }
                        this._checkMatch(go);
                    }
                    else {
                        console.warn('no match class found with that name');
                    }
                };
                Match.prototype._checkMatch = function (go) {
                    if (this._type !== "match3") {
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
                    }
                    else {
                        this._revealedIcons.push(go);
                        if (this._revealedIcons.length === this._playableSymbols.length) {
                            var ticketLabels = [];
                            for (var i = 0; i < this._playableSymbols.length; i++) {
                                var element = this._playableSymbols[i];
                                var ticketLabel = element.getTicketLabel();
                                ticketLabels.push(ticketLabel);
                            }
                            var arr = {};
                            for (var j = 0; j < ticketLabels.length; j++) {
                                var e = ticketLabels[j];
                                if (arr.hasOwnProperty(String(e))) {
                                    arr[String(e)].push(this._playableSymbols[j]);
                                }
                                else {
                                    arr[String(e)] = [this._playableSymbols[j]];
                                }
                            }
                            for (var prop in arr) {
                                if (arr[prop].length > 2) {
                                    for (var b = 0; b < arr[prop].length; b++) {
                                        var gameObject = arr[prop][b];
                                        gameObject.winReveal();
                                    }
                                    CORE.IWG.ame('bank', { deposit: [arr[prop][0].getPrizeValue()], log: true });
                                }
                            }
                        }
                    }
                    for (var k = 0; k < this._instantWin.length; k++) {
                        var instantWinLabel = this._instantWin[k];
                        if (instantWinLabel == go.getTicketLabel()) {
                            go.winReveal();
                            CORE.IWG.ame('bank', { deposit: [go.getPrizeValue()], log: true });
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
