/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images;
            var Ticket = (function () {
                function Ticket() {
                    this._ticket = null;
                    this._outcome = null;
                    this._params = [];
                    this._balls = [];
                    this._prizeList = [];
                    this._miniGame = [];
                    this._star = [];
                    this._turns = [];
                    this._total = 0;
                    this.legendPrizeValues = [];
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.prototype._setUpMiniGame = function () {
                    for (var i = 0; i < this._turns.length; i++) {
                        var currentTurn = this._turns[i];
                        var turnsObj = {
                            mG: Number(currentTurn['mG']),
                            mGR: Number(currentTurn['mGR']),
                            mGW: Number(currentTurn['mGW']),
                            mGN: currentTurn['mGN']
                        };
                        if (!isNaN(turnsObj.mG)) {
                            this._miniGame.push(turnsObj);
                        }
                    }
                    this._checkValues(this._miniGame, "mG", 1, 2);
                    this._checkValues(this._miniGame, "mGR", 0, 6);
                    this._checkValues(this._miniGame, "mGW", 0, 1);
                };
                Ticket.prototype._setUpStar = function () {
                    for (var i = 0; i < this._turns.length; i++) {
                        var currentTurn = this._turns[i];
                        var turnsObj = {
                            sA: Number(currentTurn['sA']),
                            sB: Number(currentTurn['sB']),
                            sC: Number(currentTurn['sC']),
                            sW: Number(currentTurn['sW'])
                        };
                        if (!isNaN(turnsObj.sA)) {
                            this._star.push(turnsObj);
                        }
                    }
                };
                Ticket.prototype._setUpTurns = function () {
                    this._turns = this._ticket.g1.turn;
                    this._checkValues(this._turns, "p", 0, 7);
                    this._checkValues(this._turns, "rA", 0, 60);
                    this._checkValues(this._turns, "rB", 0, 59);
                    this._checkValues(this._turns, "rC", 0, 56);
                };
                Ticket.prototype.getTurn = function (index) {
                    return this._turns[index];
                };
                Ticket.prototype.getMiniGame = function () {
                    return this._miniGame;
                };
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
                Ticket.prototype.setupTicket = function () {
                    this._ticket = CORE.IWG.ame('ticket');
                    this._outcome = {
                        amount: Number(this._ticket.outcome.amount),
                        tier: Number(this._ticket.outcome.tier),
                        wT: Number(this._ticket.outcome.wT)
                    };
                    this._params = this._ticket.params.sO.split(',');
                    this._balls = this._ticket.params.b.split(',');
                    var prizeList = this._ticket.prizeList.a.split(',');
                    for (var k in prizeList) {
                        this._prizeList.push(Number(prizeList[k]));
                    }
                    ;
                    this._setupLegend();
                    this._setUpTurns();
                    this._setUpMiniGame();
                    this._setUpStar();
                    this.errorCheck();
                    if (!CORE.IWG.ame('get', { vars: ['S_G_T_need_data'] })) {
                        this._setupGlobalBalls();
                    }
                };
                Ticket.prototype._setupGlobalBalls = function () {
                    var balls = [];
                    for (var i = 0; i < this._balls.length; i++) {
                        var element = Number(this._balls[i]);
                        balls.push(element);
                    }
                    GLOBAL.getInstance().addToGlobal('ballSelection', balls);
                };
                Ticket.prototype.errorCheck = function () {
                    var total = 0, minigame = this._miniGame[0], turnsNew = this._turns.slice(0), outcome = this._outcome.amount, wT = this._outcome.wT, tier = this._outcome.tier;
                    ;
                    if (this._prizeList.length != 8) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00007 prizelist length too long/short'] });
                    }
                    if (!((this._turns.length === 6) || (this._turns.length === 7 && minigame.mGW === 1 && minigame.mGR === 2))) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00008 turns length too short/long'] });
                    }
                    this._checkLength(this._params, 6);
                    this._checkLength(this._balls, 6);
                    for (var i = 0; i < this._turns.length; i++) {
                        var turns = this._turns[i];
                        if ((Number(turns['p']) === 4) || (Number(turns['p']) === 6)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 disallowed value in turn'] });
                        }
                        if (!(turns.hasOwnProperty('rA') && turns.hasOwnProperty('rB') && turns.hasOwnProperty('rC'))) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00011 rABC is missing'] });
                        }
                    }
                    var firstThree = turnsNew.slice(0, 3);
                    for (var i = 0; i < firstThree.length; i++) {
                        var three = Number(firstThree[i]['w']);
                        if (three === 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 win on first three turns'] });
                        }
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        total += this._prizeList[i];
                    }
                    if (total !== 151140) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00013 incorrect prize value added/changed in prize list'] });
                    }
                    if (tier === 16 && (wT !== 0 || outcome !== 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00009 losing tier but amount is not £0.00'] });
                    }
                    this._tierValues(tier, outcome);
                    if (this._miniGame.length > 0) {
                        var mGNumber = [], minigame = this._miniGame[0], minigameNumbers = minigame.mGN.split(',').map(Number);
                        if ((minigameNumbers[0] > minigameNumbers[1]) || (minigameNumbers[1] > minigameNumbers[2])) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00023 minigame prize array not in ascending order'] });
                        }
                        for (var i = 0; i < this._miniGame.length; i++) {
                            var mG = Number(this._miniGame[i].mG);
                            mGNumber.push(mG);
                        }
                        if (mGNumber.length > 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00025 no more than 1 minigame per ticket'] });
                        }
                        if (minigame.mGR === 3) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00026 disallowed value in minigame'] });
                        }
                        for (var i = 0; i < minigameNumbers.length; i++) {
                            if (minigameNumbers[i] <= 0) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00013 minigame numbers blank'] });
                            }
                        }
                        this._checkLength(minigameNumbers, 3);
                    }
                };
                Ticket.prototype._tierValues = function (tier, outcome) {
                    var winAmount = 0.00, ignore = false;
                    switch (tier) {
                        case 1:
                            winAmount = 150000.00;
                            break;
                        case 2:
                            winAmount = 1000.00;
                            break;
                        case 3:
                            winAmount = 100.00;
                            break;
                        case 4:
                            winAmount = 40.00;
                            break;
                        case 5:
                        case 6:
                        case 7:
                            winAmount = 20.00;
                            break;
                        case 8:
                        case 9:
                        case 10:
                            winAmount = 10.00;
                            break;
                        case 11:
                        case 12:
                        case 13:
                            winAmount = 5.00;
                            break;
                        case 14:
                            winAmount = 3.00;
                            break;
                        case 15:
                            winAmount = 2.00;
                            break;
                        case 16:
                            winAmount = 0.00;
                            break;
                        default:
                            ignore = true;
                    }
                    if (outcome !== winAmount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00016 amount is not vaild/tier is not vaild tier outcome'] });
                    }
                };
                Ticket.prototype._checkLength = function (array, length) {
                    if (array.length !== length) {
                        CORE.IWG.ame('error', { mess: ['mIWGd0009 too many or too few values'] });
                    }
                };
                Ticket.prototype._checkValues = function (gameData, value, min, max) {
                    for (var i = 0; i < gameData.length; i++) {
                        var turnData = gameData[i];
                        if (turnData.hasOwnProperty(value)) {
                            var v = Number(turnData[value]);
                            if (v < min || v > max) {
                                console.log(v);
                                CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                            }
                        }
                    }
                };
                Ticket.prototype._setupLegend = function () {
                    for (var i = 0; i < this.getParams().length; i++) {
                        var prizeAmount = this._prizeList[this.getParams()[i]];
                        this.legendPrizeValues.push(prizeAmount);
                    }
                };
                Ticket._instance = new Ticket();
                return Ticket;
            })();
            iwg.Ticket = Ticket;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
