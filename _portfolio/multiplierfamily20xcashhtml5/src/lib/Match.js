/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Match = (function () {
                function Match(_name) {
                    this._name = _name;
                    this._clickCount = 0;
                    this._winningSymbols = [];
                    this._playableSymbols = [];
                    this._instantWin = [];
                    this._subscribe();
                }
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
