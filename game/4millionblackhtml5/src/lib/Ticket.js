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
                    this._games = [];
                    this._game1 = [];
                    this._game1prizes = [];
                    this._game1Turns = [];
                    this._game2 = [];
                    this._game3 = [];
                    this._game4 = [];
                    this._game4v0 = [];
                    this._game4v1 = [];
                    this._game5 = [];
                    this._game5prizes = [];
                    this._game5winning = [];
                    this._game5nums = [];
                    this._sArray = [];
                    this._turns = [];
                    this._wNums = [];
                    this._pNums = [];
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.prototype._setupGame1Turns = function () {
                    for (var i = 0; i < this._ticket.g1.go.length; i++) {
                        var turnNums = Number(this._ticket.g1.go[i]['t']);
                        var prizeNums = Number(this._ticket.g1.go[i]['p']);
                        var win = Number(this._ticket.g1.go[i]['w']);
                        var turnSymbols = null;
                        if (turnNums === 0) {
                            turnSymbols = "fingers";
                        }
                        else if (turnNums === 1) {
                            turnSymbols = "g1_vault";
                        }
                        else if (turnNums === 2) {
                            turnSymbols = "g1_bars";
                        }
                        else if (turnNums === 3) {
                            turnSymbols = "g1_case";
                        }
                        else if (turnNums === 4) {
                            turnSymbols = "g1_chest";
                        }
                        else if (turnNums === 5) {
                            turnSymbols = "g1_mansion";
                        }
                        else if (turnNums === 6) {
                            turnSymbols = "g1_necklace";
                        }
                        else if (turnNums === 7) {
                            turnSymbols = "g1_ring";
                        }
                        if (turnNums < 0 || turnNums > 7) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        this._game1.push(turnSymbols);
                        this._game1Turns.push(turnNums);
                        this._game1prizes.push(prizeNums);
                        this._wNums.push(win);
                        this._pNums.push(prizeNums);
                    }
                };
                Ticket.prototype._setupGame2Turns = function () {
                    var turns = this._ticket.g2.go;
                    for (var i = 0; i < turns.length; i++) {
                        var win = Number(this._ticket.g2.go[i]['w']);
                        var prizeNums = Number(this._ticket.g2.go[i]['p']);
                        var currentTurn = turns[i];
                        var turnsObj = {
                            i: Number(currentTurn.i),
                            b0: Number(currentTurn.b0),
                            b1: Number(currentTurn.b1),
                            t: Number(currentTurn.t),
                            prize: Number(currentTurn.p)
                        };
                        if (turnsObj.t < 3 || turnsObj.t > 17) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        this._game2.push(turnsObj);
                        this._wNums.push(win);
                        this._pNums.push(prizeNums);
                    }
                };
                Ticket.prototype._setupGame3Turns = function () {
                    var turns = this._ticket.g3.go;
                    for (var i = 0; i < turns.length; i++) {
                        var win = Number(this._ticket.g3.go[i]['w']);
                        var prizeNums = Number(this._ticket.g3.go[i]['p']);
                        var currentTurn = turns[i];
                        var turnsObj = {
                            i: Number(currentTurn.i),
                            y: Number(currentTurn.y),
                            t: Number(currentTurn.t),
                            prize: Number(currentTurn.p)
                        };
                        if (turnsObj.y < 12 || turnsObj.y > 30) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        if (turnsObj.t < 10 || turnsObj.t > 28) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        this._game3.push(turnsObj);
                        this._wNums.push(win);
                        this._pNums.push(prizeNums);
                    }
                };
                Ticket.prototype._setupGame4Turns = function () {
                    var turns = this._ticket.g4.go;
                    for (var i = 0; i < turns.length; i++) {
                        var win = Number(this._ticket.g4.go[i]['w']);
                        var prizeNums = Number(this._ticket.g4.go[i]['p']);
                        var currentTurn = turns[i];
                        var v0 = Number(currentTurn.v0);
                        var v1 = Number(currentTurn.v1);
                        this._game4v0.push(v0);
                        this._game4v1.push(v1);
                        var symbol = null;
                        var symbolV1 = null;
                        if (v0 === 1) {
                            symbol = "g4_bars";
                        }
                        else if (v0 === 2) {
                            symbol = "g4_bike";
                        }
                        else if (v0 === 3) {
                            symbol = "g4_bubbly";
                        }
                        else if (v0 === 4) {
                            symbol = "g4_car";
                        }
                        else if (v0 === 5) {
                            symbol = "g4_chopper";
                        }
                        else if (v0 === 6) {
                            symbol = "g4_coins";
                        }
                        else if (v0 === 7) {
                            symbol = "g4_diamond";
                        }
                        else if (v0 === 8) {
                            symbol = "g4_gem";
                        }
                        else if (v0 === 9) {
                            symbol = "g4_safe";
                        }
                        else {
                            symbol = "g4_watch";
                        }
                        if (v1 === 1) {
                            symbolV1 = "g4_bars";
                        }
                        else if (v1 === 2) {
                            symbolV1 = "g4_bike";
                        }
                        else if (v1 === 3) {
                            symbolV1 = "g4_bubbly";
                        }
                        else if (v1 === 4) {
                            symbolV1 = "g4_car";
                        }
                        else if (v1 === 5) {
                            symbolV1 = "g4_chopper";
                        }
                        else if (v1 === 6) {
                            symbolV1 = "g4_coins";
                        }
                        else if (v1 === 7) {
                            symbolV1 = "g4_diamond";
                        }
                        else if (v1 === 8) {
                            symbolV1 = "g4_gem";
                        }
                        else if (v1 === 9) {
                            symbolV1 = "g4_safe";
                        }
                        else {
                            symbolV1 = "g4_watch";
                        }
                        if (v0 < 1 || v0 > 10) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        if (v1 < 1 || v1 > 10) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        var turnsObj = {
                            i: Number(currentTurn.i),
                            v0: symbol,
                            v1: symbolV1,
                            prize: Number(currentTurn.p)
                        };
                        this._game4.push(turnsObj);
                        this._wNums.push(win);
                        this._pNums.push(prizeNums);
                    }
                };
                Ticket.prototype._setupGame5Turns = function () {
                    var s0 = Number(this._ticket.g5.s0);
                    var s1 = Number(this._ticket.g5.s1);
                    this._sArray = [s0, s1];
                    for (var k in this._sArray) {
                        var turnSymbols = null;
                        if (this._sArray[k] === 1) {
                            turnSymbols = "g5_laptop";
                        }
                        else if (this._sArray[k] === 2) {
                            turnSymbols = "g5_plane";
                        }
                        else if (this._sArray[k] === 3) {
                            turnSymbols = "g5_limo";
                        }
                        else if (this._sArray[k] === 4) {
                            turnSymbols = "g5_pot";
                        }
                        else if (this._sArray[k] === 5) {
                            turnSymbols = "g5_ring";
                        }
                        else if (this._sArray[k] === 6) {
                            turnSymbols = "g5_handbag";
                        }
                        else if (this._sArray[k] === 7) {
                            turnSymbols = "g5_gem";
                        }
                        else if (this._sArray[k] === 8) {
                            turnSymbols = "g5_wallet";
                        }
                        else if (this._sArray[k] === 9) {
                            turnSymbols = "g5_crown";
                        }
                        else if (this._sArray[k] === 10) {
                            turnSymbols = "g5_pound";
                        }
                        else if (this._sArray[k] === 11) {
                            turnSymbols = "g5_key";
                        }
                        else if (this._sArray[k] === 12) {
                            turnSymbols = "g5_boat";
                        }
                        else {
                            turnSymbols = "g5_cards";
                        }
                        this._game5winning.push(turnSymbols);
                        if (this._sArray[k] < 1 || this._sArray[k] > 13) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                    }
                    for (var i = 0; i < this._ticket.g5.go.length; i++) {
                        var win = Number(this._ticket.g5.go[i]['w']);
                        var turnNums = Number(this._ticket.g5.go[i]['s']);
                        var prizeNums = Number(this._ticket.g5.go[i]['p']);
                        var turnSymbols = null;
                        if (turnNums === 1) {
                            turnSymbols = "g5_laptop";
                        }
                        else if (turnNums === 2) {
                            turnSymbols = "g5_plane";
                        }
                        else if (turnNums === 3) {
                            turnSymbols = "g5_limo";
                        }
                        else if (turnNums === 4) {
                            turnSymbols = "g5_pot";
                        }
                        else if (turnNums === 5) {
                            turnSymbols = "g5_ring";
                        }
                        else if (turnNums === 6) {
                            turnSymbols = "g5_handbag";
                        }
                        else if (turnNums === 7) {
                            turnSymbols = "g5_gem";
                        }
                        else if (turnNums === 8) {
                            turnSymbols = "g5_wallet";
                        }
                        else if (turnNums === 9) {
                            turnSymbols = "g5_crown";
                        }
                        else if (turnNums === 10) {
                            turnSymbols = "g5_pound";
                        }
                        else if (turnNums === 11) {
                            turnSymbols = "g5_key";
                        }
                        else if (turnNums === 12) {
                            turnSymbols = "g5_boat";
                        }
                        else {
                            turnSymbols = "g5_cards";
                        }
                        if (turnNums < 1 || turnNums > 13) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
                        }
                        this._game5nums.push(turnNums);
                        this._game5.push(turnSymbols);
                        this._game5prizes.push(prizeNums);
                        this._wNums.push(win);
                        this._pNums.push(prizeNums);
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
                Ticket.prototype.getPrizeList = function () {
                    if (this._prizeList) {
                        return this._prizeList;
                    }
                    return false;
                };
                Ticket.prototype.getGame1 = function () {
                    return this._game1;
                };
                ;
                Ticket.prototype.getGame1prizes = function () {
                    return this._game1prizes;
                };
                ;
                Ticket.prototype.getGame2 = function () {
                    return this._game2;
                };
                ;
                Ticket.prototype.getGame3 = function () {
                    return this._game3;
                };
                ;
                Ticket.prototype.getGame4 = function () {
                    return this._game4;
                };
                ;
                Ticket.prototype.getGame4prizes = function () {
                    return this._game1prizes;
                };
                ;
                Ticket.prototype.getGame5 = function () {
                    return this._game5;
                };
                ;
                Ticket.prototype.getGame5prizes = function () {
                    return this._game5prizes;
                };
                ;
                Ticket.prototype.getGame5winning = function () {
                    return this._game5winning;
                };
                ;
                Ticket.prototype.setupTicket = function () {
                    this._ticket = CORE.IWG.ame('ticket');
                    this._outcome = {
                        amount: Number(this._ticket.outcome.amount),
                        tier: Number(this._ticket.outcome.tier),
                        wT: Number(this._ticket.outcome.wT)
                    };
                    var prizeList = this._ticket.params.pList.split(',');
                    for (var k in prizeList) {
                        this._prizeList.push(Number(prizeList[k]));
                    }
                    ;
                    this._setupGame1Turns();
                    this._setupGame2Turns();
                    this._setupGame3Turns();
                    this._setupGame4Turns();
                    this._setupGame5Turns();
                    this._errorCheck();
                };
                Ticket.prototype._rangeChecks = function () {
                };
                Ticket.prototype._errorCheck = function () {
                    var total = 0, outcome = this._outcome.amount, wT = this._outcome.wT, tier = this._outcome.tier;
                    this._checkLength(this._prizeList, 11);
                    this._checkArrayForNumbers(this._prizeList);
                    this._tierValues(tier, outcome);
                    if (isNaN(outcome)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00008 outcome amount NaN'] });
                    }
                    if (tier === 32 && (wT !== 0 || outcome !== 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00009 losing tier but amount is not £0.00'] });
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        total += this._prizeList[i];
                    }
                    if (total !== 4116705) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00013 incorrect prize value added/changed in prize list'] });
                    }
                    for (var i = 0; i < this._wNums.length; i++) {
                        var w = this._wNums[i];
                        if (tier === 32 && w !== 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00017 w value on a losing ticket'] });
                        }
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        if (this._prizeList[i] <= 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00023 prizeList blank'] });
                        }
                    }
                    for (var i = 0; i < this._pNums.length; i++) {
                        var prizes = this._pNums[i];
                        if (prizes < 0 || prizes > 10) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 value out of valid range'] });
                        }
                    }
                    this._game1Checks();
                    this._game2Checks();
                    this._game3Checks();
                    this._game4Checks();
                    this._game5Checks();
                    this._checkBalance();
                };
                Ticket.prototype._checkBalance = function () {
                    var inlineBank = CORE.IWG.ame('bank', { balance: 'currentAmount', raw: true });
                    if (inlineBank !== this._outcome.amount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00026 bank != ticket amount'] });
                    }
                    CORE.IWG.ame('bank', { reset: true });
                };
                Ticket.prototype._game1Checks = function () {
                    this._checkArrayForNumbers(this._game1Turns);
                    this._checkArrayForNumbers(this._game1prizes);
                    this._checkLength(this._game1Turns, 4);
                    this._checkLength(this._game1prizes, 4);
                    for (var i = 0; i < this._game1Turns.length; i++) {
                        var wins = Number(this._ticket.g1.go[i]['w']);
                        var prize = Number(this._ticket.g1.go[i]['p']);
                        if (this._game1Turns[i] === 0 && wins === 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 game turn symbol is winner'] });
                        }
                        else if (this._game1Turns[i] !== 0 && wins === 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00024 game winner does not match winning symbol'] });
                        }
                        if (wins < 0 || wins > 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 value out of valid range'] });
                        }
                        if (wins === 1) {
                            var value = this.getPrizeList()[prize];
                            CORE.IWG.ame('bank', { deposit: [value], log: true });
                        }
                    }
                };
                Ticket.prototype._game2Checks = function () {
                    var nums = [];
                    this._checkLength(this._ticket.g2.go, 3);
                    for (var i = 0; i < 3; i++) {
                        var wins = Number(this._ticket.g2.go[i]['w']);
                        var b0 = this._game2[i].b0;
                        var b1 = this._game2[i].b1;
                        var t = this._game2[i].t;
                        var p = this._game2[i].prize;
                        if (b0 + b1 !== t) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00025 numbers do not add up'] });
                        }
                        if (t === 10 && wins === 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 game turn symbol is winner'] });
                        }
                        else if (t !== 10 && wins === 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00024 game winner does not match winning symbol'] });
                        }
                        if (wins < 0 || wins > 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 value out of valid range'] });
                        }
                        if (wins === 1) {
                            var value = this.getPrizeList()[p];
                            CORE.IWG.ame('bank', { deposit: [value], log: true });
                        }
                    }
                    this._checkArrayForNumbers(nums);
                };
                Ticket.prototype._game3Checks = function () {
                    var nums = [];
                    this._checkLength(this._ticket.g3.go, 3);
                    for (var i = 0; i < 3; i++) {
                        var wins = Number(this._ticket.g3.go[i]['w']);
                        var y = this._game3[i].y;
                        var t = this._game3[i].t;
                        var p = this._game3[i].prize;
                        nums.push(y, t, p, wins);
                        if (y > t && wins === 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 game turn symbol is winner'] });
                        }
                        else if (y < t && wins === 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00024 game winner does not match winning symbol'] });
                        }
                        if (wins < 0 || wins > 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 value out of valid range'] });
                        }
                        if (wins === 1) {
                            var value = this.getPrizeList()[p];
                            CORE.IWG.ame('bank', { deposit: [value], log: true });
                        }
                    }
                    this._checkArrayForNumbers(nums);
                };
                Ticket.prototype._game4Checks = function () {
                    var nums = [];
                    this._checkLength(this._ticket.g4.go, 3);
                    for (var i = 0; i < 3; i++) {
                        var wins = Number(this._ticket.g4.go[i]['w']);
                        var v0 = this._game4v0[i];
                        var v1 = this._game4v1[i];
                        var p = this._game4[i].prize;
                        nums.push(v0, v1, p, wins);
                        if (v0 === v1 && wins === 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 game turn symbol is winner'] });
                        }
                        else if (v0 !== v1 && wins === 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00024 game winner does not match winning symbol'] });
                        }
                        if (wins < 0 || wins > 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 value out of valid range'] });
                        }
                        if (wins === 1) {
                            var value = this.getPrizeList()[p];
                            CORE.IWG.ame('bank', { deposit: [value], log: true });
                        }
                    }
                    this._checkArrayForNumbers(nums);
                };
                Ticket.prototype._game5Checks = function () {
                    var nums = [];
                    this._checkLength(this._ticket.g5.go, 8);
                    for (var i = 0; i < 8; i++) {
                        var wins = Number(this._ticket.g5.go[i]['w']);
                        var s = this._game5nums[i];
                        var p = this._game5prizes[i];
                        nums.push(s, p, wins);
                        if (s !== this._sArray[0] && s !== this._sArray[1] && wins === 1) {
                            console.log(s, this._sArray[0], this._sArray[1], wins);
                            CORE.IWG.ame('error', { mess: ['mIWGd00024 game winner does not match winning symbol'] });
                        }
                        if (s === this._sArray[0] && wins === 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 game turn symbol is winner'] });
                        }
                        else if (s === this._sArray[1] && wins === 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00019 game turn symbol is winner'] });
                        }
                        if (wins < 0 || wins > 1) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 value out of valid range'] });
                        }
                        if (wins === 1) {
                            var value = this.getPrizeList()[p];
                            CORE.IWG.ame('bank', { deposit: [value], log: true });
                        }
                    }
                    this._checkArrayForNumbers(nums);
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
                        CORE.IWG.ame('error', { mess: ['mIWGd00018 incorrect/duplicate value in the array'] });
                    }
                };
                Ticket.prototype._tierValues = function (tier, outcome) {
                    var winAmount = 0.00, ignore = false;
                    switch (tier) {
                        case 1:
                            winAmount = 4000000.00;
                            break;
                        case 2:
                        case 3:
                            winAmount = 100000.00;
                            break;
                        case 4:
                        case 5:
                        case 6:
                            winAmount = 10000.00;
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            winAmount = 5000.00;
                            break;
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                            winAmount = 1000.00;
                            break;
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                            winAmount = 500.00;
                            break;
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                            winAmount = 100.00;
                            break;
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                            winAmount = 50.00;
                            break;
                        case 28:
                            winAmount = 25.00;
                            break;
                        case 29:
                        case 30:
                            winAmount = 20.00;
                            break;
                        case 31:
                            winAmount = 10.00;
                            break;
                        case 32:
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
