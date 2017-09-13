/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, HELPER = IWG.Helper, images = CORE.iwgLoadQ.images, GLOBAL = IWG.Global;
            var Ticket = (function () {
                function Ticket() {
                    this._ticket = null;
                    this._outcome = null;
                    this._params = [];
                    this._prizeList = [];
                    this._multiplier = [];
                    this._rings = [];
                    this._ring1 = [];
                    this._ring2 = [];
                    this._ring3 = [];
                    this._ring4 = [];
                    this._offsetArray0 = [];
                    this._offsetArray1 = [];
                    this._turns = [];
                    this._total = 0;
                    this._column0 = [];
                    this._column1 = [];
                    this._column2 = [];
                    this._column3 = [];
                    this._column4 = [];
                    this._column5 = [];
                    this._column6 = [];
                    this._column7 = [];
                    this._column0_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column1_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column2_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column3_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column4_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column5_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column6_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this._column7_count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.legendPrizeValues = [];
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.prototype._setUpOffsets = function () {
                    for (var i = 0; i < this._turns.length; i++) {
                        var currentTurn = this._turns[i];
                        if (currentTurn['name'] === 'go0') {
                            var prizeOffset = Number(currentTurn['pzOffset']);
                            var multiOffset = Number(currentTurn['multiOffset']);
                            this._offsetArray0.push(prizeOffset, multiOffset);
                        }
                        else {
                            var r1Offset = Number(currentTurn['r1Offset']);
                            var r2Offset = Number(currentTurn['r2Offset']);
                            var r3Offset = Number(currentTurn['r3Offset']);
                            var r4Offset = Number(currentTurn['r4Offset']);
                            this._offsetArray1.push(r1Offset, r2Offset, r3Offset, r4Offset);
                        }
                    }
                };
                Ticket.prototype._setUpTurns = function () {
                    this._turns = this._ticket.turn;
                };
                Ticket.prototype._setUpRings = function (rNum, ring) {
                    for (var i in ring) {
                        var symbols = ring[i];
                        if (symbols === 'bl') {
                            symbols = 'coin';
                        }
                        else if (symbols === 'fr') {
                            symbols = 'free';
                        }
                        else if (symbols === 'wh') {
                            symbols = 'goldbar';
                        }
                        else if (symbols === 'or') {
                            symbols = 'piggy';
                        }
                        else if (symbols === 'ye') {
                            symbols = 'pound';
                        }
                        else if (symbols === 'pu') {
                            symbols = 'ring';
                        }
                        else if (symbols === 'gr') {
                            symbols = 'seven';
                        }
                        else if (symbols === 'la') {
                            symbols = 'crown';
                        }
                        else if (symbols === 're') {
                            symbols = 'horseshoe';
                        }
                        else {
                        }
                        if (rNum === 1) {
                            this._ring1.push(symbols);
                        }
                        else if (rNum === 2) {
                            this._ring2.push(symbols);
                        }
                        else if (rNum === 3) {
                            this._ring3.push(symbols);
                        }
                        else {
                            this._ring4.push(symbols);
                        }
                    }
                };
                Ticket.prototype._setUpCount = function (column, colNum) {
                    for (var i in column) {
                        var symbols = column[i];
                        var indexNum = -1;
                        if (symbols === 'free') {
                            indexNum = 0;
                        }
                        else if (symbols === 'coin') {
                            indexNum = 1;
                        }
                        else if (symbols === 'goldbar') {
                            indexNum = 2;
                        }
                        else if (symbols === 'piggy') {
                            indexNum = 3;
                        }
                        else if (symbols === 'pound') {
                            indexNum = 4;
                        }
                        else if (symbols === 'ring') {
                            indexNum = 5;
                        }
                        else if (symbols === 'seven') {
                            indexNum = 6;
                        }
                        else if (symbols === 'crown') {
                            indexNum = 7;
                        }
                        else if (symbols === 'horseshoe') {
                            indexNum = 8;
                        }
                        else {
                        }
                        this['_column' + colNum + '_count'][indexNum] += 1;
                    }
                };
                Ticket.prototype._checkCount = function () {
                    var winningCols = [];
                    for (var j = 0; j < 8; j++) {
                        var testArray = this["_column" + j + "_count"];
                        var isFree = testArray[0];
                        for (var i = 0; i < testArray.length; i++) {
                            var symbolCount = testArray[i];
                            var winningObject = {
                                num: null,
                                icons: null
                            };
                            if (symbolCount === 3) {
                                winningObject.num = j;
                                winningObject.icons = this["_column" + j];
                                winningCols.push(winningObject);
                            }
                            else if (isFree > 0 && symbolCount === 2) {
                                winningObject.num = j;
                                winningObject.icons = this["_column" + j];
                                winningCols.push(winningObject);
                            }
                        }
                    }
                    GLOBAL.getInstance().addToGlobal('winner', winningCols);
                };
                Ticket.prototype._setupColumns = function () {
                    for (var i = 0; i < 8; i++) {
                        this["_column" + i].push(this._ring1[i], this._ring2[i], this._ring3[i], this._ring4[i]);
                        this._setUpCount(this["_column" + i], i);
                    }
                };
                Ticket.prototype.setupTicket = function () {
                    this._ticket = CORE.IWG.ame('ticket');
                    var amount = this._ticket.outcome.amount;
                    amount = amount.replace(/\,/g, '');
                    this._outcome = {
                        tier: Number(this._ticket.outcome.prizeTier),
                        amount: Number(amount)
                    };
                    this._params = {
                        wT: Number(this._ticket.params.wT),
                        wAmount: Number(this._ticket.params.wAmount),
                        win1Amount: Number(this._ticket.params.win1Amount),
                        win1X: Number(this._ticket.params.win1X),
                        win1IndexPos: Number(this._ticket.params.win1IndexPos),
                        win1Colour: this._ticket.params.win1Colour,
                        win2Amount: Number(this._ticket.params.win2Amount),
                        win2X: Number(this._ticket.params.win2X),
                        win2IndexPos: Number(this._ticket.params.win2IndexPos),
                        win2Colour: this._ticket.params.win2Colour,
                        win3Amount: Number(this._ticket.params.win3Amount),
                        win3X: Number(this._ticket.params.win3X),
                        win3IndexPos: Number(this._ticket.params.win3IndexPos),
                        win3Colour: this._ticket.params.win3Colour
                    };
                    this._rings = {
                        ring1: this._ticket.params.ring1.split(','),
                        ring2: this._ticket.params.ring2.split(','),
                        ring3: this._ticket.params.ring3.split(','),
                        ring4: this._ticket.params.ring4.split(',')
                    };
                    this._setUpRings(1, this._rings.ring1);
                    this._setUpRings(2, this._rings.ring2);
                    this._setUpRings(3, this._rings.ring3);
                    this._setUpRings(4, this._rings.ring4);
                    var prizeList = this._ticket.params.pzAmounts.split(',');
                    for (var i in prizeList) {
                        this._prizeList.push(Number(prizeList[i]));
                    }
                    ;
                    var multiplier = this._ticket.params.multi.split(',');
                    for (var i in multiplier) {
                        this._multiplier.push(Number(multiplier[i]));
                    }
                    ;
                    this._setUpTurns();
                    this._setUpOffsets();
                    this._setupColumns();
                    this._checkCount();
                    this.errorCheck();
                    this._setupWinningData();
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
                Ticket.prototype.getParams = function () {
                    return this._params;
                };
                ;
                Ticket.prototype.getPrize = function () {
                    return this._prizeList;
                };
                ;
                Ticket.prototype.getMultiplier = function () {
                    return this._multiplier;
                };
                ;
                Ticket.prototype.getOffset0 = function () {
                    return this._offsetArray0;
                };
                ;
                Ticket.prototype.getOffset1 = function () {
                    return this._offsetArray1;
                };
                ;
                Ticket.prototype.getColumn = function (i) {
                    return this["_column" + i];
                };
                ;
                Ticket.prototype.getRings = function () {
                    return this._rings;
                };
                ;
                Ticket.prototype.getRing1 = function () {
                    return this._ring1;
                };
                ;
                Ticket.prototype.getRing2 = function () {
                    return this._ring2;
                };
                ;
                Ticket.prototype.getRing3 = function () {
                    return this._ring3;
                };
                ;
                Ticket.prototype.getRing4 = function () {
                    return this._ring4;
                };
                ;
                Ticket.prototype.errorCheck = function () {
                    var prizeTotal, outcome = Number(this._outcome.amount), wT = Number(this._params.wT), rings = this._rings, tier = this._outcome.tier, prizes = [2, 5, 10, 50, 100, 250, 1000, 70000];
                    console.log();
                    this._checkLength(this._prizeList, 8);
                    if (isNaN(this._outcome.amount)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00008 outcome amount NaN'] });
                    }
                    if (tier === 33 && (wT !== 0 || outcome !== 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00009 losing tier but amount is not £0.00'] });
                    }
                    this._checkRingArray(rings.ring1);
                    this._checkRingArray(rings.ring2);
                    this._checkRingArray(rings.ring3);
                    this._checkRingArray(rings.ring4);
                    this._checkArrayForNumbers(this._prizeList);
                    for (var i = 0; i < this._prizeList.length; i++) {
                        if (this._prizeList[i] <= 0) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00023 pzAmount blank'] });
                        }
                    }
                    var result = [], prizes2 = this._prizeList.slice();
                    while (prizes.length > 0 && prizes2.sort(HELPER.sortNumber).length > 0) {
                        if (prizes[0] < prizes2[0]) {
                            prizes.shift();
                        }
                        else if (prizes[0] > prizes2[0]) {
                            prizes2.shift();
                        }
                        else {
                            result.push(prizes.shift());
                            prizes2.shift();
                        }
                    }
                    if (result.length !== 8) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00024 incorrect/duplicate value in pzAmounts'] });
                    }
                    this._checkArrayForNumbers(this._multiplier);
                    this._checkArrayForNumbers(this._offsetArray0);
                    this._checkArrayForNumbers(this._offsetArray1);
                    this._checkLength(this._multiplier, 8);
                    this._checkLength(this._turns, 2);
                    this._checkValues(this._turns, "pzOffset", 1, 7);
                    this._checkValues(this._turns, "multiOffset", 1, 7);
                    this._checkValues(this._turns, "r1Offset", 1, 7);
                    this._checkValues(this._turns, "r2Offset", 1, 7);
                    this._checkValues(this._turns, "r3Offset", 1, 7);
                    this._checkValues(this._turns, "r4Offset", 1, 7);
                    this._tierValues(tier, outcome);
                };
                Ticket.prototype._checkArrayForNumbers = function (array) {
                    for (var i = 0; i < array.length; i++) {
                        var arrayNumber = array[i];
                        if (isNaN(arrayNumber)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00012 not a number within prize/multi/offset'] });
                        }
                    }
                };
                Ticket.prototype._checkLength = function (array, length) {
                    if (array.length !== length) {
                        CORE.IWG.ame('error', { mess: ['mIWGd0007 too many or too few values'] });
                    }
                };
                Ticket.prototype._checkRingArray = function (ring) {
                    for (var i = 0; i < ring.length; i++) {
                        var ringIcon = ring[i];
                        if (!isNaN(ringIcon)) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 number is present in ring'] });
                        }
                        if (ring.length !== 8) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00011 ring not long enough'] });
                        }
                    }
                };
                Ticket.prototype._tierValues = function (tier, outcome) {
                    var winAmount = 0.00, ignore = false;
                    switch (tier) {
                        case 1:
                            winAmount = 70000.00;
                            break;
                        case 2:
                            winAmount = 5000.00;
                            break;
                        case 3:
                            winAmount = 4000.00;
                            break;
                        case 4:
                            winAmount = 2000.00;
                            break;
                        case 5:
                            winAmount = 1250.00;
                            break;
                        case 6:
                        case 7:
                            winAmount = 1000.00;
                            break;
                        case 8:
                        case 9:
                            winAmount = 500.00;
                            break;
                        case 10:
                            winAmount = 400.00;
                            break;
                        case 11:
                        case 12:
                            winAmount = 250.00;
                            break;
                        case 13:
                        case 14:
                            winAmount = 200.00;
                            break;
                        case 15:
                            winAmount = 100.00;
                            break;
                        case 16:
                            winAmount = 100.00;
                            break;
                        case 17:
                        case 18:
                            winAmount = 50.00;
                            break;
                        case 19:
                            winAmount = 40.00;
                            break;
                        case 20:
                            winAmount = 30.00;
                            break;
                        case 21:
                            winAmount = 25.00;
                            break;
                        case 22:
                        case 23:
                        case 24:
                            winAmount = 20.00;
                            break;
                        case 25:
                            winAmount = 15.00;
                            break;
                        case 26:
                        case 27:
                        case 28:
                            winAmount = 10.00;
                            break;
                        case 29:
                            winAmount = 8.00;
                            break;
                        case 30:
                            winAmount = 5.00;
                            break;
                        case 31:
                            winAmount = 4.00;
                            break;
                        case 32:
                            winAmount = 2.00;
                            break;
                        case 33:
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
                Ticket.prototype._setupLegend = function () {
                    for (var i = 0; i < this.getParams().length; i++) {
                        var prizeAmount = this._prizeList[this.getParams()[i]];
                        this.legendPrizeValues.push(prizeAmount);
                    }
                };
                Ticket.prototype._setupWinningData = function () {
                    var winningCols = [];
                    var winningCol1 = {
                        winAmount: this._params.win1Amount,
                        winMultiplier: this._params.win1X,
                        winIndex: this._params.win1IndexPos,
                        winColour: this._params.win1Colour
                    };
                    var winningCol2 = {
                        winAmount: this._params.win2Amount,
                        winMultiplier: this._params.win2X,
                        winIndex: this._params.win2IndexPos,
                        winColour: this._params.win2Colour
                    };
                    var winningCol3 = {
                        winAmount: this._params.win3Amount,
                        winMultiplier: this._params.win3X,
                        winIndex: this._params.win3IndexPos,
                        winColour: this._params.win3Colour
                    };
                    winningCols.push(winningCol1, winningCol2, winningCol3);
                    if (winningCol1.winAmount + winningCol2.winAmount + winningCol3.winAmount > this._outcome.amount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00013 winningCols do not equal amount'] });
                    }
                    var bank = 0;
                    for (var i = 0; i < winningCols.length; i++) {
                        var element = winningCols[i];
                        if (element.winAmount !== 0) {
                            var total = element.winAmount * element.winMultiplier;
                            bank += total;
                            if (element.winMultiplier !== this._multiplier[element.winIndex]) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00014 mismatch multipliers'] });
                            }
                            if (element.winAmount !== this._prizeList[element.winIndex]) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00015 mismatch winAmounts'] });
                            }
                        }
                    }
                    if (bank !== this._params.wAmount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00015 mismatch winAmounts'] });
                    }
                    for (var j = 0; j < GLOBAL.getInstance().getFromGlobal('winner').length; j++) {
                        var ele = GLOBAL.getInstance().getFromGlobal('winner')[j];
                        var icon = HELPER.hasDuplicates(ele.icons);
                        var symbol = null;
                        switch (icon) {
                            case "coin":
                                symbol = "bl";
                                break;
                            case "goldbar":
                                symbol = "wh";
                                break;
                            case "piggy":
                                symbol = "or";
                                break;
                            case "pound":
                                symbol = "ye";
                                break;
                            case "ring":
                                symbol = "pu";
                                break;
                            case "seven":
                                symbol = "gr";
                                break;
                            case "crown":
                                symbol = "la";
                                break;
                            case "horseshoe":
                                symbol = "re";
                                break;
                            default:
                                CORE.IWG.ame('error', { mess: ['mIWGd00018 fake symbol'] });
                        }
                        if (symbol !== winningCols[j].winColour) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00017 does not match winning symbol'] });
                        }
                    }
                    if (Number(this._params.wT) === 1 && (GLOBAL.getInstance().getFromGlobal('winner').length === 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00019 ticket has been tampered'] });
                    }
                };
                Ticket._instance = new Ticket();
                return Ticket;
            })();
            iwg.Ticket = Ticket;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
