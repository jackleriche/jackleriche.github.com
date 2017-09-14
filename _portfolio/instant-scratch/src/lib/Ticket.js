/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, HELPER = IWG.Helper, images = CORE.iwgLoadQ.images;
            var Ticket = (function () {
                function Ticket() {
                    this._ticket = null;
                    this._outcome = null;
                    this._prizeList = [];
                    this._winCount = 0;
                    this._tracker = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._instantWin = false;
                    this._numbersArray = [];
                    this._winningSymbols = [];
                    this._turns = [];
                    this._multiOrder = [];
                    this._turnNums = [];
                    this._prizeNums = [];
                    this._multiNums = [];
                    this._symbolNums = [];
                    this._winnerNums = [];
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.prototype._setupTurns = function () {
                    this._turns = this._ticket.g1.turn;
                    for (var i = 0; i < this._turns.length; i++) {
                        var iNums = Number(this._turns[i]['i']);
                        var prize = Number(this._turns[i]['p']);
                        var wins = Number(this._turns[i]['w']);
                        var instant = Number(this._turns[i]['iW']);
                        var turnsObj = {
                            i: iNums,
                            p: prize,
                            w: wins
                        };
                        this._turnNums.push(iNums);
                        this._numbersArray.push(turnsObj);
                        this._prizeNums.push(prize);
                        if (wins === 1) {
                            this._tracker[prize] += 1;
                            this._winCount++;
                            if (!isNaN(instant) && instant === 1) {
                                if (this._tracker.indexOf(1) === 6) {
                                    this._instantWin = true;
                                    CORE.IWG.ame('bank', { deposit: [5], log: true });
                                }
                            }
                            else if (this._tracker.indexOf(3) !== -1) {
                                var prizeIndex = this._tracker.indexOf(3);
                                var prizeValue = this.getPrizeList()[prizeIndex];
                                CORE.IWG.ame('bank', { deposit: [prizeValue], log: true });
                            }
                        }
                        this._checkNumber(iNums);
                        this._checkNumber(prize);
                        this._checkNumber(wins);
                    }
                };
                Ticket.prototype.getTurn = function (index) {
                    return this._turns[index];
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
                Ticket.prototype.getWinningSymbols = function () {
                    return this._winningSymbols;
                };
                ;
                Ticket.prototype.getSymbolNumber = function () {
                    return this._symbolNums;
                };
                ;
                Ticket.prototype.getTurnPrize = function () {
                    return this._prizeNums;
                };
                ;
                Ticket.prototype.getMultiNum = function () {
                    return this._multiNums;
                };
                ;
                Ticket.prototype.getPrizeList = function () {
                    if (this._prizeList) {
                        return this._prizeList;
                    }
                    return false;
                };
                Ticket.prototype.setupTicket = function () {
                    this._ticket = CORE.IWG.ame('ticket');
                    this._outcome = {
                        amount: Number(this._ticket.outcome.amount),
                        tier: Number(this._ticket.outcome.tier),
                        wT: Number(this._ticket.outcome.wT)
                    };
                    var prizeList = this._ticket.prizeList.a.split(',');
                    for (var k in prizeList) {
                        this._prizeList.push(Number(prizeList[k]));
                    }
                    ;
                    this._setupTurns();
                    this._rangeChecks();
                    this._errorCheck();
                    this._resetBank();
                };
                Ticket.prototype._resetBank = function () {
                    var inlineBank = CORE.IWG.ame('bank', { balance: 'currentAmount', raw: true });
                    if (inlineBank !== this._outcome.amount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00026 bank != ticket amount'] });
                    }
                    CORE.IWG.ame('bank', { reset: true });
                };
                Ticket.prototype._rangeChecks = function () {
                    this._checkValues(this._turns, "i", 1, 9);
                    this._checkValues(this._turns, "p", 0, 8);
                    this._checkValues(this._turns, "w", 0, 1);
                };
                Ticket.prototype._errorCheck = function () {
                    var total = 0, outcome = this._outcome.amount, wT = this._outcome.wT, tier = this._outcome.tier;
                    this._checkLength(this._prizeList, 9);
                    this._checkArrayForNumbers(this._prizeList);
                    this._tierValues(tier, outcome);
                    this._checkForDuplicates(this._turnNums);
                    this._checkLength(this._turnNums, 9);
                    if (isNaN(outcome)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00008 outcome amount NaN'] });
                    }
                    if (tier === 11 && (wT !== 0 || outcome !== 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00009 losing tier but amount is not £0.00'] });
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        total += this._prizeList[i];
                    }
                    if (total !== 10678) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00013 incorrect prize value added/changed in prize list'] });
                    }
                    for (var i = 0; i < this._winnerNums.length; i++) {
                        var w = this._winnerNums[i];
                        if (tier === 11 && w !== 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00017 w value on a losing ticket'] });
                        }
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        if (this._prizeList[i] <= 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00023 prizeList blank'] });
                        }
                    }
                    if (this._winCount > 3) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00024 too many winners'] });
                    }
                    if (this._instantWin && this._winCount > 1) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00024 too many winners'] });
                    }
                };
                Ticket.prototype._checkArrayForNumbers = function (array) {
                    for (var i = 0; i < array.length; i++) {
                        var arrayNumber = array[i];
                        if (isNaN(arrayNumber)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00015 array is not numbers only'] });
                        }
                    }
                };
                Ticket.prototype._checkNumber = function (value) {
                    if (isNaN(value)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00014 value is not valid number'] });
                    }
                };
                Ticket.prototype._checkForDuplicates = function (array) {
                    var arr = array.slice(), sorted_arr = arr.sort(HELPER.sortNumber), results = [];
                    for (var i = 0; i < arr.length - 1; i++) {
                        if (sorted_arr[i + 1] == sorted_arr[i]) {
                            results.push(sorted_arr[i]);
                        }
                    }
                    if (results.length !== 0) {
                        CORE.IWG.ame('error', { mess: ['mIWGd0014 duplicate number when there shouldnt be'] });
                    }
                };
                Ticket.prototype._checkLength = function (array, length) {
                    if (array.length !== length) {
                        CORE.IWG.ame('error', { mess: ['mIWGd0007 too many or too few values'] });
                    }
                };
                Ticket.prototype._checkOrder = function (values, values2, length) {
                    var result = [];
                    while (values.length > 0 && values2.sort(HELPER.sortNumber).length > 0) {
                        if (values[0] < values2[0]) {
                            values.shift();
                        }
                        else if (values[0] > values2[0]) {
                            values2.shift();
                        }
                        else {
                            result.push(values.shift());
                            values2.shift();
                        }
                    }
                    if (result.length !== length) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00011 incorrect/duplicate value in the array'] });
                    }
                };
                Ticket.prototype._tierValues = function (tier, outcome) {
                    var winAmount = 0.00, ignore = false;
                    switch (tier) {
                        case 1:
                            winAmount = 10000.00;
                            break;
                        case 2:
                            winAmount = 500.00;
                            break;
                        case 3:
                            winAmount = 100.00;
                            break;
                        case 4:
                            winAmount = 40.00;
                            break;
                        case 5:
                            winAmount = 20.00;
                            break;
                        case 6:
                            winAmount = 10.00;
                            break;
                        case 7:
                        case 8:
                            winAmount = 5.00;
                            break;
                        case 9:
                            winAmount = 2.00;
                            break;
                        case 10:
                            winAmount = 1.00;
                            break;
                        case 11:
                            winAmount = 0.00;
                            break;
                        default:
                            ignore = true;
                    }
                    if (outcome !== winAmount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00016 amount is not vaild/tier is not vaild tier outcome'] });
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
                Ticket._instance = new Ticket();
                return Ticket;
            })();
            iwg.Ticket = Ticket;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
