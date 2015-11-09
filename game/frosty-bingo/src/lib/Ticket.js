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
                    this._prizeList = [];
                    this._gNumber = -1;
                    this._card1 = [];
                    this._card2 = [];
                    this._card3 = [];
                    this._card4 = [];
                    this._cards = [this._card1, this._card2, this._card3, this._card4];
                    this._dPos = [];
                    this._turns = [];
                    this._total = 0;
                    if (Ticket._instance) {
                        throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
                    }
                    Ticket._instance = this;
                }
                Ticket.prototype._setUpCards = function () {
                    var cards = [
                        this._ticket.params.c1,
                        this._ticket.params.c2,
                        this._ticket.params.c3,
                        this._ticket.params.c4
                    ];
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i].split(",");
                        for (var j = 0; j < card.length; j++) {
                            var number = Number(card[j]);
                            this._cards[i].push(number);
                        }
                    }
                };
                Ticket.prototype._setupDoublers = function () {
                    var ticket = this._ticket, originalDoublerPos = ticket.params.dPos;
                    var dPos = originalDoublerPos.split(','), cleandPos = [], card = [], index = 0;
                    for (var i = 0; i < dPos.length; i++) {
                        var pos, posNumber;
                        pos = dPos[i].substring(2);
                        if (pos.charAt(0) === "v") {
                            posNumber = Number(pos.substring(1));
                            posNumber += 5;
                        }
                        else if (pos.charAt(0) === "h") {
                            posNumber = Number(pos.substring(1));
                        }
                        card.push(posNumber);
                        if (i % 2) {
                            cleandPos.push(card);
                            card = [];
                        }
                    }
                    ;
                    this._dPos = cleandPos;
                };
                Ticket.prototype._setupTurns = function () {
                    this._turns = this._ticket.turn;
                    this._checkValues(this._turns, "b", -1, 75);
                    this._checkValues(this._turns, "name", 1, 20);
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
                Ticket.prototype.getCard1 = function () {
                    return this._card1;
                };
                Ticket.prototype.getCard2 = function () {
                    return this._card2;
                };
                Ticket.prototype.getCard3 = function () {
                    return this._card3;
                };
                Ticket.prototype.getCard4 = function () {
                    return this._card4;
                };
                Ticket.prototype.setupTicket = function () {
                    this._ticket = CORE.IWG.ame('ticket');
                    this._outcome = {
                        amount: Number(this._ticket.outcome.amount),
                        tier: Number(this._ticket.outcome.prizeTier)
                    };
                    this._params = this._ticket.params;
                    var prizeList = this._ticket.params.pList.split(',');
                    for (var k in prizeList) {
                        this._prizeList.push(Number(prizeList[k]));
                    }
                    ;
                    this._setUpCards();
                    this._setupDoublers();
                    this._setupTurns();
                    this.errorCheck();
                };
                Ticket.prototype.errorCheck = function () {
                    var prizeTotal, ignore = false, tier = this._outcome.tier, winAmount = 0.00;
                    if (this._prizeList.length != 14) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00007 prizelist length too long/short'] });
                    }
                    var bNumbers = [];
                    for (var i = 0; i < this._turns.length; i++) {
                        var b = Number(this._turns[i]["b"]);
                        bNumbers.push(b);
                    }
                    var bNumSort = bNumbers.sort();
                    for (var i = 0; i < bNumbers.length - 1; i++) {
                        if (bNumSort[i + 1] == bNumSort[i]) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00008 duplicate b value'] });
                        }
                    }
                    if (this._turns.length !== 20) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00009 turns !== 20'] });
                    }
                    var minusArray = [], allBoardNumbers = [], card1 = this._card1.slice(0);
                    card1.sort();
                    for (var i = 0; i < card1.length; i++) {
                        allBoardNumbers.push(card1[i]);
                        if (card1[i + 1] == card1[i]) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 duplicate c1 number'] });
                        }
                        if (card1[i] === -1) {
                            minusArray.push(card1[i]);
                        }
                    }
                    var card2 = this._card2.slice(0);
                    card2.sort();
                    for (var i = 0; i < card2.length; i++) {
                        allBoardNumbers.push(card2[i]);
                        if (card2[i + 1] == card2[i]) {
                            console.log(card2[i]);
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 duplicate c2 number'] });
                        }
                        if (card2[i] === -1) {
                            minusArray.push(card2[i]);
                        }
                    }
                    var card3 = this._card3.slice(0);
                    card3.sort();
                    for (var i = 0; i < card3.length; i++) {
                        allBoardNumbers.push(card3[i]);
                        if (card3[i + 1] == card3[i]) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 duplicate c3 number'] });
                        }
                        if (card3[i] === -1) {
                            minusArray.push(card3[i]);
                        }
                    }
                    var card4 = this._card4.slice(0);
                    card4.sort();
                    for (var i = 0; i < card4.length; i++) {
                        allBoardNumbers.push(card4[i]);
                        if (card4[i + 1] == card4[i]) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00010 duplicate c4 number'] });
                        }
                        if (card4[i] === -1) {
                            minusArray.push(card4[i]);
                        }
                    }
                    if (minusArray.length !== 4) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00011 card has > or < than one -1'] });
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        if (isNaN(this._prizeList[i])) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00013 incorrect prize value added/changed in prize list'] });
                        }
                    }
                    for (var i = 0; i < this._prizeList.length; i++) {
                        this._total += this._prizeList[i];
                    }
                    if (this._total !== 311439) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00013 incorrect prize value added/changed in prize list'] });
                    }
                    var matches = [];
                    for (var i = 0; i < bNumbers.length; i++) {
                        for (var j = 0; j < allBoardNumbers.length; j++) {
                            if (allBoardNumbers[j] === bNumbers[i]) {
                                matches.push(bNumbers[i]);
                                break;
                            }
                        }
                    }
                    if (matches.length !== 20) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00014 incorrect number added to the ticket'] });
                    }
                    if (this._card1[12] && this._card2[12] && this._card3[12] && this._card4[12] !== -1) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00015 not valid position for a free square'] });
                    }
                    for (var i = 0; i < this._cards.length; i++) {
                        var cards = this._cards[i].length;
                        if (cards !== 25) {
                            CORE.IWG.ame('error', { mess: ['mIWGd00016 too many/few card numbers'] });
                        }
                    }
                    if (this._outcome.tier === 30 && (Number(this._params.wT) !== 0 || this._outcome.amount !== 0)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00017 win on lose ticket'] });
                    }
                    if (isNaN(this._outcome.amount)) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00018 disallowed value in amount'] });
                    }
                    switch (tier) {
                        case 1:
                            winAmount = 300000.00;
                            break;
                        case 2:
                            winAmount = 10000.00;
                            break;
                        case 3:
                            winAmount = 1350.00;
                            break;
                        case 4:
                            winAmount = 1000.00;
                            break;
                        case 5:
                        case 6:
                            winAmount = 200.00;
                            break;
                        case 7:
                        case 8:
                            winAmount = 100.00;
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            winAmount = 50.00;
                            break;
                        case 13:
                        case 14:
                            winAmount = 30.00;
                            break;
                        case 15:
                        case 16:
                            winAmount = 25.00;
                            break;
                        case 17:
                        case 18:
                        case 19:
                            winAmount = 20.00;
                            break;
                        case 20:
                            winAmount = 15.00;
                            break;
                        case 21:
                        case 22:
                        case 23:
                            winAmount = 12.00;
                            break;
                        case 24:
                        case 25:
                            winAmount = 10.00;
                            break;
                        case 26:
                        case 27:
                        case 28:
                            winAmount = 6.00;
                            break;
                        case 29:
                            winAmount = 5.00;
                            break;
                        case 30:
                            winAmount = 3.00;
                            break;
                        case 31:
                            winAmount = 0.00;
                            break;
                        default:
                            ignore = true;
                    }
                    if (this._outcome.amount !== winAmount) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00019 amount is not vaild/tier is not vaild tier outcome'] });
                    }
                    for (var i = 0; i < this._cards.length; i++) {
                        var cards = this._cards[i];
                        for (var j = 0; j < cards.length; j++) {
                            var cardNumbers = cards[j];
                            if (isNaN(cardNumbers)) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00023 card number NaN'] });
                            }
                        }
                    }
                    for (var i = 0; i < this._cards.length; i++) {
                        var cards = this._cards[i];
                        for (var j = 0; j < cards.length; j++) {
                            var cardNumbers = cards[j].toString();
                            var n = cardNumbers.indexOf('.');
                            if (n === 1) {
                                CORE.IWG.ame('error', { mess: ['mIWGd00024 card number has decimal'] });
                            }
                        }
                    }
                };
                Ticket.prototype.getDoublerPos = function (index) {
                    var doublerPosition = this._dPos[index];
                    return doublerPosition;
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
