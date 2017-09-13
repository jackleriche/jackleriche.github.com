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
                    this._winningSymbols = [];
                    this._turns = [];
                    this._multiOrder = [];
                    this._turnNums = [];
                    this._prizeNums = [];
                    this._multiNums = [];
                    this._symbolNums = [];
                    this._winnerNums = [];
                    this._count = 0;
                    this._w = 0;
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.prototype._setupTurns = function () {
                    this._turns = this._ticket.g1.turn;
                    for (var i = 0; i < this._turns.length; i++) {
                        var iNums = Number(this._turns[i]['i']);
                        var tNums = Number(this._turns[i]['t']);
                        var pNums = Number(this._turns[i]['p']);
                        var mNums = Number(this._turns[i]['m']);
                        var wNums = Number(this._turns[i]['w']);
                        this._turnNums.push(iNums);
                        this._symbolNums.push(tNums);
                        this._prizeNums.push(pNums);
                        this._winnerNums.push(wNums);
                        if (wNums === 1) {
                            this._w++;
                        }
                        if (!isNaN(mNums)) {
                            this._multiNums.push(mNums);
                        }
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
                    var wS = this._ticket.g1.wS.split(',');
                    for (var i in wS) {
                        this._winningSymbols.push(Number(wS[i]));
                    }
                    this._setupTurns();
                    this._rangeChecks();
                    this._errorCheck();
                    this._checkBalance();
                };
                Ticket.prototype._rangeChecks = function () {
                    this._checkValues(this._turns, "i", 1, 15);
                    this._checkValues(this._turns, "p", 0, 11);
                    this._checkValues(this._turns, "t", 1, 43);
                    this._checkValues(this._turns, "w", 0, 1);
                };
                Ticket.prototype._errorCheck = function () {
                    var total = 0, outcome = this._outcome.amount, wT = this._outcome.wT, tier = this._outcome.tier;
                    this._checkLength(this._prizeList, 12);
                    this._checkArrayForNumbers(this._prizeList);
                    this._checkArrayForNumbers(this._prizeNums);
                    this._checkArrayForNumbers(this._turnNums);
                    this._checkArrayForNumbers(this._symbolNums);
                    this._checkArrayForNumbers(this._winningSymbols);
                    this._checkLength(this._prizeNums, 15);
                    this._checkLength(this._winningSymbols, 5);
                    this._tierValues(tier, outcome);
                    this._checkForDuplicates(this._turnNums);
                    this._checkForDuplicates(this._winningSymbols);
                    if (isNaN(outcome)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00008 outcome amount NaN'] });
                    }
                    if (tier === 43 && (wT !== 0 || outcome !== 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00009 losing tier but amount is not £0.00'] });
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        total += this._prizeList[i];
                    }
                    if (total !== 1056905) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00013 incorrect prize value added/changed in prize list'] });
                    }
                    for (var i = 0; i < this._winnerNums.length; i++) {
                        var w = this._winnerNums[i];
                        if (tier === 43 && w !== 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00017 w value on a losing ticket'] });
                        }
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        if (this._prizeList[i] <= 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00023 prizeList blank'] });
                        }
                    }
                    for (var i = 0; i < this._winningSymbols.length; i++) {
                        if (this._winningSymbols[i] <= 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00025 winning symbol blank'] });
                        }
                    }
                    for (var i = 0; i < this._symbolNums.length; i++) {
                        var t = this._symbolNums[i], m = Number(this._turns[i]['m']), wins = Number(this._turns[i]['w']), prize = Number(this._turns[i]['p']);
                        if ((t > 40) && (isNaN(m))) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00018 no multiplier when it should be present'] });
                        }
                        else if ((!isNaN(m)) && (t < 40)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00024 multiplier present when shouldnt be'] });
                        }
                        if ((t === 41) && (m !== 5)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 wrong multiplier value'] });
                        }
                        else if ((t === 42) && (m !== 10)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 wrong multiplier value'] });
                        }
                        else if ((t === 43) && (m !== 20)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 wrong multiplier value'] });
                        }
                        if (t > 30 && t < 41) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 not valid symbol number'] });
                        }
                        if ((t === 5) || (t == 10) || (t === 20)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 not valid symbol number'] });
                        }
                        if (wins === 1) {
                            var value = this.getPrizeList()[prize];
                            if (t === 41 && m === 5) {
                                var multiple = value * 5;
                                CORE.IWG.ame('bank', { deposit: [multiple], log: true });
                            }
                            else if (t === 42 && m === 10) {
                                var multiple = value * 10;
                                CORE.IWG.ame('bank', { deposit: [multiple], log: true });
                            }
                            else if (t === 43 && m === 20) {
                                var multiple = value * 20;
                                CORE.IWG.ame('bank', { deposit: [multiple], log: true });
                            }
                            else {
                                CORE.IWG.ame('bank', { deposit: [value], log: true });
                            }
                        }
                    }
                    if (tier === 1 || tier === 11 || tier === 15 || tier === 20 || tier === 25) {
                        console.log('times 20');
                        if ((this._multiNums[0] !== 20) || (this._multiNums[0] === undefined)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00026 tier should have a multiplier value'] });
                        }
                    }
                    else if (tier === 3 || tier === 6 || tier === 10 || tier === 14 || tier === 18 || tier === 24 || tier === 30) {
                        console.log('times 10');
                        if ((this._multiNums[0] !== 10) || (this._multiNums[0] === undefined)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00026 tier should have a multiplier value'] });
                        }
                    }
                    else if (tier === 5 || tier === 9 || tier === 29 || tier === 35) {
                        console.log('times 5');
                        if ((this._multiNums[0] !== 5) || (this._multiNums[0] === undefined)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00026 tier should have a multiplier value'] });
                        }
                    }
                    else {
                        if (this._multiNums[0] > 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00027 tier should not have a multiplier value'] });
                        }
                    }
                    for (var i = 0; i < this._winningSymbols.length; i++) {
                        if (this._winningSymbols[i] > 30 || this._winningSymbols[i] < 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 not valid winning number'] });
                        }
                    }
                    if (this._multiNums.length === 0 && outcome > 0) {
                        var symList = [];
                        for (var j in this._symbolNums) {
                            for (var k in this._winningSymbols) {
                                if (this._symbolNums[j] == this._winningSymbols[k]) {
                                    symList.push(this._symbolNums[j]);
                                }
                            }
                        }
                        if (symList.length != this._w) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00029 matching symbols do not match amount of winners'] });
                        }
                    }
                };
                Ticket.prototype._checkBalance = function () {
                    var inlineBank = CORE.IWG.ame('bank', { balance: 'currentAmount', raw: true });
                    if (inlineBank !== this._outcome.amount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00026 bank != ticket amount'] });
                    }
                    CORE.IWG.ame('bank', { reset: true });
                };
                Ticket.prototype._checkArrayForNumbers = function (array) {
                    for (var i = 0; i < array.length; i++) {
                        var arrayNumber = array[i];
                        if (isNaN(arrayNumber)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00015 array is not numbers only'] });
                        }
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
                        case 2:
                            winAmount = 1000000.00;
                            break;
                        case 3:
                        case 4:
                            winAmount = 50000.00;
                            break;
                        case 5:
                        case 6:
                        case 7:
                            winAmount = 5000.00;
                            break;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            winAmount = 1000.00;
                            break;
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                            winAmount = 500.00;
                            break;
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                            winAmount = 200.00;
                            break;
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                        case 26:
                            winAmount = 100.00;
                            break;
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                            winAmount = 50.00;
                            break;
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                            winAmount = 25.00;
                            break;
                        case 37:
                        case 38:
                        case 39:
                            winAmount = 15.00;
                            break;
                        case 40:
                        case 41:
                            winAmount = 10.00;
                            break;
                        case 42:
                            winAmount = 5.00;
                            break;
                        case 43:
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
