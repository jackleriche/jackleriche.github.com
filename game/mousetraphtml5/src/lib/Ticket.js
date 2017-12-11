/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images;
            var Ticket = (function () {
                function Ticket() {
                    this._ticket = null;
                    this._outcome = null;
                    this._params = null;
                    this._turns = [];
                    this._boardNumber = -1;
                    this.errorTokenList = [];
                    this.errorPrizeList = [];
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.getInstance = function () {
                    return Ticket._instance;
                };
                Ticket.prototype.getTicket = function () {
                    return this._ticket;
                };
                Ticket.prototype.getOutcome = function () {
                    return this._outcome;
                };
                ;
                Ticket.prototype.getParams = function () {
                    return this._params;
                };
                ;
                Ticket.prototype.getTurns = function () {
                    return this._turns;
                };
                ;
                Ticket.prototype.getTurn = function (turnNumber) {
                    return this._turns[turnNumber];
                };
                Ticket.prototype.getBoardNumber = function () {
                    return this._boardNumber;
                };
                Ticket.prototype.sortTurns = function () {
                    var turns = this._ticket.turn;
                    for (var i = 0; i < turns.length; i++) {
                        var currentTurn = turns[i];
                        var turnsObj = {
                            name: currentTurn.name,
                            d1: Number(currentTurn.d1),
                            bP: Number(currentTurn.bP),
                            tT: Number(currentTurn.tT),
                            w: Number(currentTurn.w),
                            prizeID: Number(currentTurn.prizeID),
                            prize: this._params.pList[Number(currentTurn.prizeID)]
                        };
                        if (currentTurn.eM) {
                            turnsObj["eM"] = Number(currentTurn.eM);
                        }
                        if (currentTurn.eBp) {
                            turnsObj["eBp"] = Number(currentTurn.eBp);
                        }
                        if (currentTurn.eTt) {
                            turnsObj["eTt"] = Number(currentTurn.eTt);
                        }
                        this._turns.push(turnsObj);
                    }
                };
                Ticket.prototype.setupTicket = function () {
                    this._ticket = CORE.IWG.ame('ticket');
                    this._boardNumber = Number(this._ticket.params.bN);
                    this._outcome = {
                        amount: Number(this._ticket.outcome.amount),
                        tier: Number(this._ticket.outcome.prizeTier)
                    };
                    var cleanpList = [];
                    var pList = this._ticket.params.pList.split(',');
                    for (var k in pList) {
                        cleanpList.push(Number(pList[k]));
                    }
                    ;
                    this._params = {
                        bN: this._boardNumber,
                        pList: cleanpList,
                        wT: Number(this._ticket.params.wT)
                    };
                    this.sortTurns();
                };
                Ticket.prototype.errorCheck = function (board) {
                    console.log("Error check");
                    var lastPosition = 0;
                    var lastBpPosition = 0;
                    var lastEbpPosition = 0;
                    var boardTokenDice;
                    var boardTokenPopup;
                    var total = 0;
                    var dice1Roll;
                    var finalLocation;
                    for (var i = 0; i < this._turns.length; i++) {
                        var currentTurn = this.getTurn(i);
                        var d1 = currentTurn.d1;
                        var bP = currentTurn.bP;
                        var tT = currentTurn.tT;
                        var eM = currentTurn.eM;
                        var eBp = currentTurn.eBp;
                        var eBt = currentTurn.eTt;
                        dice1Roll = d1;
                        this.errorTokenList.push(tT);
                        if (eBt != undefined) {
                            this.errorTokenList.push(eBt);
                        }
                        for (var i = 0; i < this._params.pList.length; i++) {
                            total += this._params.pList[i];
                        }
                        if (total !== 8668) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00007 incorrect prize value added in pList'] });
                        }
                        var prize = 0;
                        switch (tT) {
                            case 10:
                                prize = 2;
                                break;
                            case 11:
                                prize = 5;
                                break;
                            case 12:
                                prize = 50;
                                break;
                        }
                        switch (eBt) {
                            case 10:
                                prize = 2;
                                break;
                            case 11:
                                prize = 5;
                                break;
                            case 12:
                                prize = 50;
                                break;
                        }
                        if (prize != 0) {
                            this.errorPrizeList.push(prize);
                        }
                        var extraMove = 0;
                        if (eM != undefined) {
                            switch (tT) {
                                case 6:
                                case 8:
                                    extraMove = eM;
                                    break;
                                case 7:
                                    extraMove = -eM;
                                    break;
                            }
                        }
                        lastBpPosition = bP;
                        lastEbpPosition = eBp;
                        boardTokenDice = board.getBoardObject(bP - 1).tokenNumber;
                        if (boardTokenDice != tT) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00008 board token mismatch - normal turn'] });
                        }
                        finalLocation = dice1Roll + lastPosition;
                        if (finalLocation > 24) {
                            finalLocation -= 24;
                        }
                        if (finalLocation != bP) {
                            if (finalLocation != bP - 3) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00009 shortcut or dice mismatch on turn'] });
                            }
                        }
                        if (extraMove == 0) {
                            lastPosition = bP;
                        }
                        else {
                            boardTokenPopup = board.getBoardObject(eBp - 1).tokenNumber;
                            if (boardTokenPopup != eBt) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00010 board token mismatch popup' + i] });
                            }
                            finalLocation = bP + extraMove;
                            if (finalLocation > 24) {
                                finalLocation -= 24;
                            }
                            if (finalLocation != eBp) {
                                if (finalLocation != eBp - 3) {
                                    CORE.IWG.ame('error', { mess: ['mIWGd00011 EBP mismatch on turn'] });
                                }
                            }
                            lastPosition = eBp;
                        }
                        if ((tT == 9) || (eBt == 9)) {
                            if (this._turns.length != 7) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00012 Error on turn ' + i + " extra turn but not enough turns"] });
                            }
                        }
                    }
                };
                Ticket._instance = new Ticket();
                return Ticket;
            })();
            iwg.Ticket = Ticket;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Ticket.js.map