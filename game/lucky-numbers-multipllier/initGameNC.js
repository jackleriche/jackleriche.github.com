var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var core;
        (function (core) {
            var CAMELOT = com.camelot;
            function IWGInit() {
                var pluginCount = 0;
                CAMELOT.core.IWG.ame('plugin', { module: ['canvasstack_module_1'] });
                CAMELOT.core.iwgLoadQ.installPlugin(createjs.Sound);
                createjs.Sound.alternateExtensions = ["ogg"];
                CAMELOT.iwg.IWGEM.on(CAMELOT.core.IWGEVENT.PLUGIN_LOADED, pluginsLoaded);
                function pluginsLoaded(evt) {
                    pluginCount++;
                    if (pluginCount === 1) {
                        console.log("plugins loaded");
                        var object = {
                            basePath: 'iwg/'
                        };
                        var Game = new BOOM.GameManager(object);
                    }
                }
            }
            core.IWGInit = IWGInit;
        })(core = camelot.core || (camelot.core = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
var BOOM;
(function (BOOM) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
            this._horizontalHeight = 0;
            this.gameLoaded = false;
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.refresh();
            this.game.time.desiredFps = 60;
            this.game.tweens.frameBased = true;
            if (!this.game.device.desktop) {
                this.game.scale.forceOrientation(true);
                this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
                this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            }
            BOOM.SignalManager.instance.dispatch('switchStateSignal', "Preloader");
        };
        Boot.prototype.enterIncorrectOrientation = function () {
            this.orientated = false;
            this.game.paused = true;
        };
        Boot.prototype.leaveIncorrectOrientation = function () {
            this.orientated = true;
            this.game.paused = false;
        };
        return Boot;
    }(Phaser.State));
    BOOM.Boot = Boot;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameGroup = (function (_super) {
        __extends(GameGroup, _super);
        function GameGroup() {
            _super.call(this, BOOM.GameManager.instance);
            this.subscribeSignals();
            this._addStateSwitch();
        }
        GameGroup.prototype.subscribeSignals = function () {
        };
        ;
        GameGroup.prototype.unsubscribeSignals = function () {
        };
        ;
        GameGroup.prototype._addStateSwitch = function () {
            BOOM.SignalManager.instance.add('switchStateSignal', this._onStateSwitch, this);
        };
        GameGroup.prototype._onStateSwitch = function () {
            this.destroy();
        };
        GameGroup.prototype.destroy = function () {
            this.unsubscribeSignals();
            BOOM.SignalManager.instance.remove('switchStateSignal', this._onStateSwitch, this);
            _super.prototype.destroy.call(this, true, false);
        };
        ;
        return GameGroup;
    }(Phaser.Group));
    BOOM.GameGroup = GameGroup;
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.call(this);
        }
        GameState.prototype.subscribeSignals = function () {
        };
        ;
        GameState.prototype.unsubscribeSignals = function () {
        };
        ;
        GameState.prototype._addStateSwitch = function () {
            BOOM.SignalManager.instance.add('switchStateSignal', this._onStateSwitch, this);
        };
        GameState.prototype._onStateSwitch = function () {
            this.destroy();
        };
        GameState.prototype.destroy = function () {
            this.unsubscribeSignals();
            BOOM.SignalManager.instance.remove('switchStateSignal', this._onStateSwitch, this);
        };
        ;
        GameState.prototype.create = function () {
            this._addStateSwitch();
            this.subscribeSignals();
        };
        return GameState;
    }(Phaser.State));
    BOOM.GameState = GameState;
    var NonDisplayObject = (function () {
        function NonDisplayObject() {
            this.subscribeSignals();
            this._addStateSwitch();
        }
        NonDisplayObject.prototype.subscribeSignals = function () {
        };
        ;
        NonDisplayObject.prototype.unsubscribeSignals = function () {
        };
        ;
        NonDisplayObject.prototype._addStateSwitch = function () {
            BOOM.SignalManager.instance.add('switchStateSignal', this._onStateSwitch, this);
        };
        NonDisplayObject.prototype._onStateSwitch = function () {
            this.destroy();
        };
        NonDisplayObject.prototype.destroy = function () {
            this.unsubscribeSignals();
            BOOM.SignalManager.instance.remove('switchStateSignal', this._onStateSwitch, this);
        };
        ;
        return NonDisplayObject;
    }());
    BOOM.NonDisplayObject = NonDisplayObject;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Helper = (function () {
        function Helper() {
        }
        Helper.removeCharaters = function (number) {
            var value = parseFloat(number.replace(/,/g, ''));
            return value;
        };
        Helper.shuffleArray = function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        };
        Helper.formatCurrency = function (amount) {
            return amount.toString().replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            });
        };
        return Helper;
    }());
    BOOM.Helper = Helper;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Ticket = (function () {
        function Ticket() {
            this._ticketXML = com.camelot.core.IWG.ame('ticket');
            this._params = null;
            this._outcome = null;
            this._prizeList = [];
            this._turns = [];
            this._index = 0;
            this._currentTurn = null;
            this._prizeListNumbered = [];
            this._dataObjects = [];
            if (Ticket.instance === null) {
                Ticket.instance = this;
                var winner = false;
                if (this._ticketXML.outcome.wT === "1") {
                    winner = true;
                }
                ;
                this._outcome = {
                    amount: BOOM.Helper.removeCharaters(this._ticketXML.outcome.amount),
                    tier: parseInt(this._ticketXML.outcome.tier, 10),
                    isWinner: winner
                };
                this._sortParams();
                this._sortPrizeList();
                this._sortTurns();
                this._errorChecks();
            }
            else {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
        }
        Object.defineProperty(Ticket.prototype, "dataObjects", {
            get: function () {
                return this._dataObjects;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ticket.prototype, "turns", {
            get: function () {
                return this._turns;
            },
            enumerable: true,
            configurable: true
        });
        Ticket.prototype._sortParams = function () {
            var data = this._ticketXML.params.a;
            var groups = data.split(',');
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var s = group.split(';');
                var usableData = [];
                for (var j = 0; j < s.length; j++) {
                    usableData.push(Number(s[j]));
                }
                var dataObject = {
                    prize: usableData[0],
                    tileNumbers: [usableData[1], usableData[2], usableData[3], usableData[4]]
                };
                this._dataObjects.push(dataObject);
            }
            ;
        };
        Ticket.prototype._sortPrizeList = function () {
            var pList = this._ticketXML.pList.a.split(',');
            for (var i = 0; i < pList.length; i++) {
                var element = Number(pList[i]);
                this._prizeList.push(element);
            }
        };
        Ticket.prototype._sortTurns = function () {
            var data = this._ticketXML.params.t;
            for (var i = 0; i < data.length; i++) {
                var turnData = data[i];
                var dataObject = {
                    m: turnData.m,
                    n: turnData.n,
                    p: turnData.p,
                    t: turnData.t,
                    w: turnData.w,
                };
                this._turns.push(dataObject);
            }
        };
        Ticket.prototype.checkAmmount = function (prize) {
            var rawBank = com.camelot.core.IWG.ame('bank', { balance: 'currentAmount', raw: true });
            if (prize !== rawBank) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd0007 prize amount not equal to bank'] });
            }
            if (rawBank !== Number(this._outcome.amount)) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd0008 outcome amount not equal to bank'] });
            }
            com.camelot.core.IWG.ame('bank', { reset: true });
        };
        Ticket.prototype._errorChecks = function () {
            var total = 0, turnNumVals = [], turnTokenVals = [], tier = parseInt(this._outcome.tier, 10), outcome = parseInt(this._outcome.amount, 10), winner = Number(this._outcome.isWinner);
            for (var i = 0; i < this._prizeList.length; i++) {
                this._prizeListNumbered.push(Number(this._prizeList[i]));
                total += Number(this._prizeList[i]);
            }
            if (total !== 311188) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd0009 incorrect prize list amount'] });
            }
            for (var i = 0; i < this._turns.length; i++) {
                if (isNaN(parseInt(this._turns[i].n))) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
                }
                if (isNaN(parseInt(this._turns[i].t))) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
                }
                if (isNaN(parseInt(this._turns[i].w))) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
                }
                if (isNaN(parseInt(this._turns[i].m))) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
                }
                if (isNaN(parseInt(this._turns[i].p))) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
                }
            }
            if (isNaN(parseInt(this._outcome.tier, 10))) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
            }
            if (isNaN(parseInt(this._outcome.amount, 10))) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
            }
            if (isNaN(parseInt(this._ticketXML.outcome.wT, 10))) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00018 - value null, NaN or missing'] });
            }
            this._checkLength(this._prizeListNumbered, 10);
            this._checkLength(this._turns, 18);
            this._checkArrayForNumbers(this._prizeListNumbered);
            if (isNaN(this._outcome.amount)) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00010 outcome amount not a valid number'] });
            }
            if (this._outcome.amount > 0 && !this._outcome.isWinner) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00011 outcome amount does not match win flag'] });
            }
            else if (this._outcome.amount === 0 && this._outcome.isWinner) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00011 outcome amount does not match win flag'] });
            }
            this._tierCheck(tier, outcome);
            for (var i = 0; i < this._turns.length; i++) {
                turnNumVals.push(parseInt(this._turns[i].n, 10));
            }
            turnNumVals.sort(function (a, b) { return a - b; });
            this._checkUniqueValues(turnNumVals);
            this._checkValues(this._turns, "n", 0, 18);
            for (var i = 0; i < this._turns.length; i++) {
                turnTokenVals.push(parseInt(this._turns[i].t, 10));
            }
            turnTokenVals.sort(function (a, b) { return a - b; });
            this._checkUniqueValues(turnTokenVals);
            this._checkValues(this._turns, "t", 1, 27);
            this._checkValues(this._turns, "p", 0, 9);
            this._checkValues(this._turns, 'w', 0, 1);
            for (var i = 0; i < this._turns.length; i++) {
                var w = this._turns[i].w;
                var p = this._turns[i].p;
                if (w == 1 && p == 0) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00019 p and w value pairing incorrect'] });
                }
                else if (w == 0 && p != 0) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00019 p and w value pairing incorrect'] });
                }
            }
            var boardInfoString = this._ticketXML.params.a;
            if (boardInfoString.indexOf(",") == -1 || boardInfoString.indexOf(";") == -1) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00013 board delimiter missing'] });
            }
            var boardInfoSplit = boardInfoString.split(",");
            this._checkLength(boardInfoSplit, 9);
            for (var i = 0; i < boardInfoSplit.length; i++) {
                var tmpClusterInfo = boardInfoSplit[i].split(";");
                this._checkLength(tmpClusterInfo, 5);
                this._checkArrayForNumbers(tmpClusterInfo);
                if (parseInt(tmpClusterInfo[0], 10) < 0 || parseInt(tmpClusterInfo[0], 10) > 9) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00016 ticket value out of range'] });
                }
            }
        };
        Ticket.prototype._tierCheck = function (tier, outcome) {
            var winAmount = 0.00, ignore = false;
            switch (tier) {
                case 1:
                    winAmount = 300000.00;
                    break;
                case 2:
                    winAmount = 10000.00;
                    break;
                case 3:
                    winAmount = 5000.00;
                    break;
                case 4:
                    winAmount = 1000.00;
                    break;
                case 5:
                    winAmount = 500.00;
                    break;
                case 6:
                case 7:
                    winAmount = 200.00;
                    break;
                case 8:
                case 9:
                case 10:
                    winAmount = 100.00;
                    break;
                case 11:
                case 12:
                    winAmount = 80.00;
                    break;
                case 13:
                case 14:
                    winAmount = 60.00;
                    break;
                case 15:
                case 16:
                    winAmount = 50.00;
                    break;
                case 17:
                case 18:
                    winAmount = 40.00;
                    break;
                case 19:
                case 20:
                case 21:
                    winAmount = 30.00;
                    break;
                case 22:
                case 23:
                case 24:
                    winAmount = 20.00;
                    break;
                case 25:
                case 26:
                case 27:
                    winAmount = 15.00;
                    break;
                case 28:
                    winAmount = 12.00;
                    break;
                case 29:
                case 30:
                    winAmount = 10.00;
                    break;
                case 31:
                    winAmount = 9.00;
                    break;
                case 32:
                    winAmount = 8.00;
                    break;
                case 33:
                    winAmount = 6.00;
                    break;
                case 34:
                    winAmount = 5.00;
                    break;
                case 35:
                    winAmount = 3.00;
                    break;
                case 36:
                    winAmount = 0.00;
                    break;
                default:
                    ignore = true;
            }
            if (outcome !== winAmount) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00013 amount is not vaild/tier is not vaild tier outcome'] });
            }
        };
        Ticket.prototype._checkLength = function (array, length) {
            if (array.length !== length) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00014 too many or too few values in array'] });
            }
        };
        Ticket.prototype._checkArrayForNumbers = function (array) {
            for (var i = 0; i < array.length; i++) {
                var arrayNumber = array[i];
                if (isNaN(parseInt(arrayNumber, 10))) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00015 array is not numbers only'] });
                }
            }
        };
        Ticket.prototype._checkValues = function (gameData, value, min, max) {
            for (var i = 0; i < gameData.length; i++) {
                var turnData = gameData[i];
                if (turnData.hasOwnProperty(value)) {
                    var v = parseInt(turnData[value], 10);
                    if (v < min || v > max || isNaN(v)) {
                        com.camelot.core.IWG.ame('error', { mess: ['mIWGd00016 ticket value out of range'] });
                    }
                }
            }
        };
        Ticket.prototype._checkUniqueValues = function (arrIn) {
            for (var i = 0; i < arrIn.length - 1; i++) {
                if (arrIn[i] === arrIn[i + 1] || isNaN(arrIn[i]) || isNaN(arrIn[i + 1])) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00017 array value null, NaN or not unique'] });
                }
            }
        };
        Ticket.prototype.getTicket = function () {
            return this;
        };
        Ticket.prototype.getOutcome = function () {
            return this._outcome;
        };
        Ticket.prototype.getWager = function () {
            return com.camelot.core.IWG.ame('get', { vars: ['iwgIsWager'] });
        };
        Ticket.prototype.getCurrentTurn = function () {
            return this._currentTurn;
        };
        Ticket.prototype.getTurns = function () {
            var numbers = [];
            for (var i = 0; i < this._turns.length; i++) {
                numbers.push(this._turns[i].value);
            }
            return numbers;
        };
        Ticket.prototype.getPrizeAmount = function (index) {
            return this._prizeList[index];
        };
        Ticket.prototype.getNextTurn = function () {
            this._currentTurn = this._turns[this._index];
            this._index++;
            return this._currentTurn;
        };
        Ticket.instance = null;
        return Ticket;
    }());
    BOOM.Ticket = Ticket;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SplashGroup = (function (_super) {
        __extends(SplashGroup, _super);
        function SplashGroup() {
            _super.call(this);
            this._lights = null;
            this._lightTopLeft = null;
            this._lightTopRight = null;
            this._lightMidLeft = null;
            this._lightBotRight = null;
            this._lightBotMid = null;
            this._logo = null;
            this._winupto = null;
            this._playButton = null;
            this._instructions = null;
            this._create();
        }
        SplashGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('showSplashGroup', this._show, this);
            BOOM.SignalManager.instance.add('splashOutro', this._hide, this);
        };
        SplashGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('showSplashGroup', this._show, this);
            BOOM.SignalManager.instance.remove('splashOutro', this._hide, this);
        };
        SplashGroup.prototype._create = function () {
            var _this = this;
            this._logo = this.game.add.image(this.game.width / 2, -300, "masterSS", "logo.png", this);
            this._logo.anchor.setTo(0.5, 0.5);
            this._winupto = this.game.add.image(this.game.width / 2, -300, "masterSS", "winupto.png", this);
            this._winupto.anchor.setTo(0.5, 0.5);
            var states = {
                buttonUpStateImageName: "button_play.png",
                buttonUpSpriteSheetName: "masterSS",
                buttonDownStateImageName: "button_play_over.png",
                buttonDownSpriteSheetName: "masterSS",
                buttonOverStateImageName: "button_play_over.png",
                buttonOverSpriteSheetName: "masterSS"
            };
            var buttonConfig = {
                buttonStateImages: states
            };
            this._playButton = new BOOM.ButtonClass(buttonConfig);
            this._playButton.disableButton();
            this._playButton.alpha = 0;
            this._playButton.position.setTo(this.game.width / 2, this.game.height / 2 + 140);
            this._playButton.idleClass.setTimerValues(0, 0);
            this._playButton.idleClass.enableOrDisableIdle(true);
            this._playButton.idleClass.resetAndStartOrStopTimer(BOOM.TimerInteractionStatus.startOrReset);
            this._playButton.buttonEvents.onInputDown.add(function () {
                _this._playButton.disableButton();
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.PLAYBUTTON, BOOM.SoundChannels.FX_SOUNDS);
                var buttonClick = _this.game.add.tween(_this._playButton.scale).to({ x: 0.9, y: 0.9 }, 50, Phaser.Easing.Linear.None, true);
                buttonClick.yoyo(true);
                buttonClick.onComplete.add(function () {
                    BOOM.SignalManager.instance.dispatch('splashOutro');
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.BACKGROUNDSOUND, BOOM.SoundChannels.BACKGROUND);
                }, _this);
            }, this);
            this._show();
        };
        SplashGroup.prototype._hide = function () {
            var _this = this;
            var winTween = this.game.add.tween(this._winupto).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            var logoTween = this.game.add.tween(this._logo).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            playTween.onComplete.add(function () {
                BOOM.SignalManager.instance.dispatch('moveSoundButton');
                BOOM.SignalManager.instance.dispatch('animateIdle', "start");
                BOOM.SignalManager.instance.dispatch('startGameSignal');
                _this.destroy();
                _this._playButton.destroy();
            }, this);
        };
        SplashGroup.prototype._show = function () {
            var _this = this;
            var winTween = this.game.add.tween(this._winupto).to({ y: this.game.height / 2 + 40 }, 1500, Phaser.Easing.Bounce.Out, true, 150);
            var logoTween = this.game.add.tween(this._logo).to({ y: this.game.height / 2 - 150 }, 1500, Phaser.Easing.Bounce.Out, true, 250);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 950);
            logoTween.onComplete.add(function () {
                var twinkle1 = this.game.add.sprite(420, 115, "masterSS", "sparkle.png", this);
                twinkle1.anchor.setTo(0.5, 0.5);
                this.game.add.tween(twinkle1).to({ rotate: 360 }, 1000, Phaser.Easing.Linear.None, true, 200, -1, true);
                this.game.add.tween(twinkle1.scale).to({ x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true, 200, -1, true);
                var twinkle2 = this.game.add.sprite(355, 65, "masterSS", "sparkle.png", this);
                twinkle2.anchor.setTo(0.5, 0.5);
                this.game.add.tween(twinkle2).to({ rotate: 360 }, 1000, Phaser.Easing.Linear.None, true, 200, -1, true);
                this.game.add.tween(twinkle2.scale).to({ x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true, 200, -1, true);
            }, this);
            playTween.onComplete.add(function () {
                _this._playButton.enableButton();
            }, this);
        };
        return SplashGroup;
    }(BOOM.GameGroup));
    BOOM.SplashGroup = SplashGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(_x, _y, _text, _color, _multi) {
            if (_multi === void 0) { _multi = null; }
            _super.call(this);
            this._x = _x;
            this._y = _y;
            this._text = _text;
            this._color = _color;
            this._multi = _multi;
            this.flipAnimation = null;
            this._face = null;
            this._reverseFace = null;
            this._shadow = null;
            this._number = null;
            this._highlight = null;
            this._reverseText = null;
            this._prompt = null;
            this._create();
        }
        Object.defineProperty(Tile.prototype, "face", {
            get: function () {
                return this._face;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "shadow", {
            get: function () {
                return this._shadow;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "number", {
            get: function () {
                return this._number;
            },
            set: function (object) {
                this._number = object;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "multi", {
            get: function () {
                return this._multi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "reverseFace", {
            get: function () {
                return this._reverseFace;
            },
            set: function (string) {
                this._reverseFace = string;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "highlight", {
            get: function () {
                return this._highlight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "reverseText", {
            get: function () {
                return this._reverseText;
            },
            set: function (string) {
                this._reverseText = string;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "prompt", {
            get: function () {
                return this._prompt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "setHighlight", {
            set: function (string) {
                this._highlight = this.game.add.sprite(0, 0, "masterSS", string);
                this._highlight.anchor.setTo(0.5, 0.5);
                this.add(this._highlight);
            },
            enumerable: true,
            configurable: true
        });
        Tile.prototype._create = function () {
            this.position.setTo(this._x, this._y);
            this.pivot.set(0.5, 0.5);
            this._shadow = this.game.add.sprite(10, 10, "masterSS", "tile_shadow.png");
            this._shadow.anchor.setTo(0.5, 0.5);
            this.add(this._shadow);
            this._face = this.game.add.sprite(0, 0, "masterSS", this._color);
            this._face.anchor.setTo(0.5, 0.5);
            this.add(this._face);
            if (this._multi) {
                var multi = this.game.add.sprite(-23, -23, "masterSS", this._multi);
                multi.anchor.setTo(0.5, 0.5);
                this.add(multi);
            }
            this._prompt = this.game.add.sprite(-25, -25, "masterSS", "tile_prompt.png");
            this._prompt.alpha = 0;
            this.add(this._prompt);
            this._number = this.game.add.bitmapText(0, -10, "numbers-export", this._text.toString(), 44);
            this._number.anchor.setTo(0.5, 0.5);
            this.add(this._number);
        };
        Tile.prototype.flip = function (delay, face, text, destroy, queue, multi) {
            var _this = this;
            if (face === void 0) { face = null; }
            if (text === void 0) { text = null; }
            if (destroy === void 0) { destroy = false; }
            if (queue === void 0) { queue = false; }
            if (multi === void 0) { multi = null; }
            if (this._reverseFace) {
                face = this._reverseFace;
            }
            ;
            if (this._reverseText) {
                text = this._reverseText;
            }
            var flipTile = this.game.add.tween(this.scale).to({ y: 0 }, 400, "Quart.easeOut", true, delay);
            flipTile.onStart.add(function () {
                if (_this._highlight) {
                    _this._highlight.alpha = 0;
                    _this._highlight.destroy();
                    _this._highlight = null;
                }
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN, BOOM.SoundChannels.FX_SOUNDS);
            });
            if (face || text) {
                flipTile.onComplete.add(function () {
                    if (face) {
                        _this.face.loadTexture("masterSS", face);
                    }
                    if (text) {
                        _this.number.setText(text);
                        _this.number.alpha = 1;
                    }
                    if (Number(multi) > 0) {
                        var multiString = "mx" + multi + ".png";
                        _this._multi = _this.game.add.sprite(-45, -45, "masterSS", multiString);
                        _this.add(_this._multi);
                        var parent = _this.parent;
                        parent.bringToTop(_this);
                        if (_this.name === "SelectableTile") {
                            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.MULTIPLIERTILE, BOOM.SoundChannels.FX_SOUNDS);
                        }
                    }
                    var flipBack = _this.game.add.tween(_this.scale).to({ y: 1 }, 400, "Quart.easeOut", true);
                    flipBack.onComplete.add(function () {
                        if (_this.name === "SelectableTile") {
                            _this.face.inputEnabled = true;
                            _this.face.input.useHandCursor = true;
                        }
                        if (destroy) {
                            _this.fade(1000);
                            if (queue) {
                                BOOM.QueueManager.instance.playing = false;
                                BOOM.SignalManager.instance.dispatch('playNextInQueue');
                            }
                        }
                    }, _this);
                }, this);
            }
        };
        Tile.prototype.matched = function (delay, face, multi) {
            if (face === void 0) { face = null; }
            if (multi === void 0) { multi = null; }
            var faceString = "tile_turned.png";
            if (Number(multi) > 0) {
                faceString = "tile_mx4.png";
                var multiString = "mx" + multi + ".png";
                this._multi = this.game.add.sprite(-45, -45, "masterSS", multiString);
                this._multi.alpha = 0;
            }
            var reverseFace = this.game.add.sprite(-25, -25, "masterSS", faceString);
            reverseFace.alpha = 0;
            this.add(reverseFace);
            this.bringToTop(this._number);
            if (this._multi) {
                this.add(this._multi);
                this.bringToTop(this._multi);
            }
            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN, BOOM.SoundChannels.FX_SOUNDS);
            this.game.add.tween(reverseFace).to({ alpha: 1 }, 500, "Linear", true, delay);
            this.game.add.tween(this._multi).to({ alpha: 1 }, 500, "Linear", true, delay);
        };
        Tile.prototype.makePrompt = function () {
            var _this = this;
            var fadeOn = this.game.add.tween(this._prompt).to({ alpha: 1 }, 1000, "Linear", true);
            fadeOn.onComplete.add(function () {
                var fadeOff = _this.game.add.tween(_this._prompt).to({ alpha: 0 }, 1000, "Linear", true);
            }, this);
        };
        Tile.prototype.fade = function (delay) {
            var fadeOff = this.game.add.tween(this).to({ alpha: 0.5 }, 400, "Quart.easeOut", true, delay);
            var removeShadow = this.game.add.tween(this._shadow).to({ alpha: 0 }, 400, "Quart.easeOut", true, delay);
            return false;
        };
        Tile.prototype.setFace = function (face) {
            this._face.loadTexture('masterSS', face);
        };
        Tile.prototype.destroy = function (delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            var fadeShadow = this.game.add.tween(this._shadow).to({ alpha: 0 }, 400, "Quart.easeOut", true, delay);
            var fadeOff = this.game.add.tween(this).to({ alpha: 0 }, 400, "Quart.easeOut", true, delay);
            fadeOff.onComplete.add(function () {
                _this.parent.removeChild(_this);
                _super.prototype.destroy.call(_this);
            }, this);
        };
        return Tile;
    }(BOOM.GameGroup));
    BOOM.Tile = Tile;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SelectableTile = (function (_super) {
        __extends(SelectableTile, _super);
        function SelectableTile(x, y, string, color) {
            var _this = this;
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            _super.call(this, x, y, string, color);
            this._selected = false;
            this.enable = false;
            this.name = "SelectableTile";
            this.face.events.onInputUp.add(function () {
                if (_this.enable) {
                    _this.face.inputEnabled = false;
                    _this.face.input.useHandCursor = false;
                    _this.game.canvas.style.cursor = "default";
                    BOOM.SignalManager.instance.dispatch('killPrompt');
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILESELECT, BOOM.SoundChannels.FX_SOUNDS);
                    _this.enable = false;
                    _this.selected = true;
                    _this.reveal();
                }
            }, this);
            this.enable = false;
        }
        Object.defineProperty(SelectableTile.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (state) {
                this._selected = state;
            },
            enumerable: true,
            configurable: true
        });
        SelectableTile.prototype.shuffle = function (delay) {
            var _this = this;
            var blur;
            var randomNumber = this.game.rnd.integerInRange(1, 34);
            var randomString;
            if (randomNumber > 9) {
                randomString = "blur00" + randomNumber;
            }
            else {
                randomString = "blur000" + randomNumber;
            }
            var timer = this.game.time.create(true);
            timer.add(delay, function () {
                _this.number.alpha = 0;
                blur = _this.game.add.sprite(_this.position.x - 28, _this.position.y - 28, "masterSS", randomString + ".png");
                blur.animations.add('blur', Phaser.Animation.generateFrameNames('blur', 0, 34, '.png', 4), 30, true);
                blur.animations.play('blur');
            }, this);
            timer.start();
            var timer2 = this.game.time.create(true);
            timer2.add(delay + 2000, function () {
                blur.destroy();
            }, this);
            timer2.start();
            this.flip(delay + 2000, "tile.png", "?", false, false);
            return false;
        };
        SelectableTile.prototype.reveal = function (autoPlay) {
            if (autoPlay === void 0) { autoPlay = false; }
            var count = BOOM.GameManager.instance.incClickCount();
            var turnData = BOOM.Ticket.instance.turns[count - 1];
            this.setHighlight = "tile_queue.png";
            var turnFace = "tile_turned.png";
            if (Number(turnData.m) > 0) {
                turnFace = "tile_mx4.png";
            }
            var delay = 0;
            if (autoPlay) {
                delay = 1000;
            }
            BOOM.QueueManager.instance.add([this, turnData, turnFace, delay]);
            return true;
        };
        return SelectableTile;
    }(BOOM.Tile));
    BOOM.SelectableTile = SelectableTile;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var QueueManager = (function () {
        function QueueManager() {
            this._queue = [];
            this.playing = false;
            QueueManager.instance = this;
            this._subscribe();
        }
        QueueManager.prototype._subscribe = function () {
            BOOM.SignalManager.instance.add('playNextInQueue', this._play, this);
            BOOM.SignalManager.instance.add('winner', this._pauseQueue, this);
        };
        ;
        QueueManager.prototype._unsubscribe = function () {
            BOOM.SignalManager.instance.remove('playNextInQueue', this._play, this);
            BOOM.SignalManager.instance.remove('winner', this._pauseQueue, this);
        };
        ;
        QueueManager.prototype.add = function (tween) {
            if (tween) {
                this._queue.push(tween);
                this._play();
                return true;
            }
            return false;
        };
        QueueManager.prototype._play = function () {
            if (this._queue.length > 0) {
                if (this.playing === false) {
                    var tween = this._queue.shift();
                    var delay = 600;
                    if (tween[3]) {
                        delay = 600 + tween[3];
                    }
                    tween[0].flip(delay, tween[2], tween[1].t, true, true, tween[1].m);
                    setTimeout(function () {
                        BOOM.SignalManager.instance.dispatch('checkLegend', tween[1]);
                    }, delay);
                    this.playing = true;
                }
            }
            else {
                BOOM.SignalManager.instance.dispatch('promptHighlight');
            }
        };
        QueueManager.prototype._pauseQueue = function () {
            var _this = this;
            this.playing = false;
            BOOM.GameManager.instance.time.events.add(4000, function () {
                _this.playing = true;
                _this._play();
            }, this);
        };
        return QueueManager;
    }());
    BOOM.QueueManager = QueueManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var MainGameLayout = (function (_super) {
        __extends(MainGameLayout, _super);
        function MainGameLayout() {
            _super.call(this);
            this._remainingGoes = 18;
            this._cloversReady = 0;
            this._instructions = null;
            this._cloverArray = [];
            this._tilesGroup = null;
            this._tileArray = [];
            this._multiTileArray = [];
            this._autoPlayButton = null;
            this._selectionsLeft = null;
            this._shuffleCount = 0;
            this._promptHighlightActive = true;
            this._promptTimeline = null;
            this._tileCount = 0;
            this._create();
        }
        MainGameLayout.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('splashOutro', this._show, this);
            BOOM.SignalManager.instance.add('shuffle', this._shuffle, this);
            BOOM.SignalManager.instance.add('disableTiles', this._disableTiles, this);
            BOOM.SignalManager.instance.add('decGoesLeft', this._reduceGoesLeft, this);
            BOOM.SignalManager.instance.add('autoPlay', this._autoPlay, this);
            BOOM.SignalManager.instance.add('endShuffle', this._promptHighlight, this);
            BOOM.SignalManager.instance.add('killPrompt', this._killPrompt, this);
            BOOM.SignalManager.instance.add('promptHighlight', this._promptHighlight, this);
        };
        MainGameLayout.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('splashOutro', this._show, this);
            BOOM.SignalManager.instance.remove('shuffle', this._shuffle, this);
            BOOM.SignalManager.instance.remove('disableTiles', this._disableTiles, this);
            BOOM.SignalManager.instance.remove('decGoesLeft', this._reduceGoesLeft, this);
            BOOM.SignalManager.instance.remove('autoPlay', this._autoPlay, this);
            BOOM.SignalManager.instance.remove('playNextInQueue', this._checkEndGame, this);
            BOOM.SignalManager.instance.remove('endShuffle', this._promptHighlight, this);
            BOOM.SignalManager.instance.remove('killPrompt', this._killPrompt, this);
            BOOM.SignalManager.instance.remove('promptHighlight', this._promptHighlight, this);
        };
        MainGameLayout.prototype._create = function () {
            var _this = this;
            var queueManager = new BOOM.QueueManager();
            var cloverPos = [
                [133, 105],
                [308, 105],
                [483, 105],
                [658, 105],
                [833, 105],
                [220, 305],
                [395, 305],
                [570, 305],
                [745, 305]
            ];
            for (var i = 0; i < cloverPos.length; i++) {
                var element = new BOOM.Clover(i, cloverPos[i][0], cloverPos[i][1], BOOM.Ticket.instance.dataObjects[i]);
                this._cloverArray.push(element);
                this.add(element);
            }
            var multiTilePos = [
                [395, 465, "tile_mx4.png", "mx2.png"],
                [450, 465, "tile_mx4.png", "mx3.png"],
                [505, 465, "tile_mx4.png", "mx4.png"],
                [560, 465, "tile_mx4.png", "mx5.png"]
            ];
            for (var k = 0; k < multiTilePos.length; k++) {
                var multiTile = new BOOM.Tile(multiTilePos[k][0], multiTilePos[k][1], "?", multiTilePos[k][2], multiTilePos[k][3]);
                this._multiTileArray.push(multiTile);
                this.add(multiTile);
            }
            this._tilesGroup = this.game.make.group();
            var tilePos = [
                [40, 300],
                [40, 355],
                [40, 410],
                [40, 465],
                [40, 520],
                [95, 465],
                [95, 520],
                [150, 520],
                [205, 520],
                [260, 520],
                [315, 520],
                [370, 520],
                [425, 520],
                [480, 520],
                [535, 520],
                [590, 520],
                [645, 520],
                [700, 520],
                [755, 520],
                [810, 520],
                [865, 520],
                [865, 465],
                [920, 520],
                [920, 465],
                [920, 410],
                [920, 355],
                [920, 300]
            ];
            for (var j = 0; j < tilePos.length; j++) {
                var tile = new BOOM.SelectableTile(tilePos[j][0], tilePos[j][1], j + 1, "tile_turned.png");
                this._tileArray.push(tile);
                this._tilesGroup.add(tile);
            }
            this.add(this._tilesGroup);
            this._instructions = this.game.add.sprite(BOOM.GameManager.NATIVE_WIDTH / 2, 590, "masterSS", "instructions.png", this);
            this._instructions.anchor.setTo(0.5, 0.5);
            this._selectionsLeft = this.game.add.bitmapText(BOOM.GameManager.NATIVE_WIDTH / 2, 410, "goesleft-export", this._remainingGoes + " GOES LEFT", 52, this);
            this._selectionsLeft.anchor.setTo(0.5, 0.5);
            this._selectionsLeft.alpha = 0;
            var states = {
                buttonUpStateImageName: "button_autplay.png",
                buttonUpSpriteSheetName: "masterSS",
                buttonDownStateImageName: "button_autplay_over.png",
                buttonDownSpriteSheetName: "masterSS",
                buttonOverStateImageName: "button_autplay_over.png",
                buttonOverSpriteSheetName: "masterSS"
            };
            var buttonConfig = {
                buttonStateImages: states
            };
            this._autoPlayButton = new BOOM.ButtonClass(buttonConfig);
            this._autoPlayButton.position.setTo(BOOM.GameManager.NATIVE_WIDTH / 2, 465);
            this._autoPlayButton.alpha = 0;
            this._autoPlayButton.disableButton();
            this._autoPlayButton.buttonEvents.onInputDown.add(function () {
                _this._autoPlayButton.disableButton();
                BOOM.SignalManager.instance.dispatch('autoPlay');
            }, this);
            this.alpha = 0;
        };
        MainGameLayout.prototype._show = function () {
            if (this.alpha === 0) {
                var fadeOn = this.game.add.tween(this).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
                fadeOn.onStart.add(function () {
                    BOOM.SignalManager.instance.dispatch('showOverlay');
                }, this);
                return true;
            }
            return false;
        };
        MainGameLayout.prototype._shuffle = function () {
            var _this = this;
            this.game.time.events.add(800, function () {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.SHUFFLE, BOOM.SoundChannels.FX_SOUNDS);
            }, this);
            var count = 0;
            for (var i = 0; i < this._multiTileArray.length; i++) {
                var element = this._multiTileArray[i];
                var delay = 100 * i;
                var moveUp = this.game.add.tween(element).to({ y: element.position.y - 30 }, 200, "Quart.easeOut", false, delay);
                var moveDown = this.game.add.tween(element).to({ y: element.position.y + 55 }, 400, "Quart.easeOut");
                var fadeOff = this.game.add.tween(element).to({ alpha: 0 }, 400, "Quart.easeOut");
                moveUp.chain(moveDown);
                moveDown.chain(fadeOff);
                moveUp.start();
                moveUp.onComplete.add(function () {
                    count++;
                    if (count === 4) {
                        BOOM.SignalManager.instance.dispatch('cloverShuffle');
                        var shuffledArray = BOOM.Helper.shuffleArray(_this._tileArray);
                        var delay = 0;
                        for (var j = 0; j < shuffledArray.length; j++) {
                            var tile = shuffledArray[j];
                            delay = 500 + (50 * j);
                            tile.shuffle(delay);
                        }
                        var showAutoPlay = _this.game.add.tween(_this._autoPlayButton).to({ alpha: 1 }, 500, "Linear", true, delay + 3000);
                        showAutoPlay.onComplete.add(function () {
                            BOOM.SignalManager.instance.dispatch('endShuffle');
                            _this.game.add.tween(_this._selectionsLeft).to({ alpha: 1 }, 500, "Linear", true);
                            _this._autoPlayButton.enableButton();
                            for (var i = 0; i < _this._tileArray.length; i++) {
                                var tile = _this._tileArray[i];
                                tile.enable = true;
                            }
                        }, _this);
                    }
                }, this);
            }
            this._shuffleMultiTiles();
            return true;
        };
        MainGameLayout.prototype._shuffleMultiTiles = function () {
            var _this = this;
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                _this.game.time.events.repeat(200, 7, function () {
                    _this._shuffleCount++;
                    for (var j = 0; j < _this._tileArray.length; j++) {
                        var resetTile = _this._tileArray[j];
                        resetTile.setFace("tile_turned.png");
                    }
                    var randomTileArray = [
                        _this._tileArray[_this.game.rnd.integerInRange(0, _this._tileArray.length - 1)],
                        _this._tileArray[_this.game.rnd.integerInRange(0, _this._tileArray.length - 1)],
                        _this._tileArray[_this.game.rnd.integerInRange(0, _this._tileArray.length - 1)],
                        _this._tileArray[_this.game.rnd.integerInRange(0, _this._tileArray.length - 1)],
                    ];
                    for (var i = 0; i < randomTileArray.length; i++) {
                        var tile = randomTileArray[i];
                        tile.setFace("tile_mx4.png");
                    }
                    if (_this._shuffleCount === 7) {
                        _this.game.time.events.add(1500, function () {
                            BOOM.SignalManager.instance.dispatch('Audio.stopAudio', BOOM.Sounds.SHUFFLE, BOOM.SoundChannels.FX_SOUNDS);
                        }, _this);
                    }
                }, _this);
            }, this);
        };
        MainGameLayout.prototype._disableTiles = function () {
            for (var i = 0; i < this._tileArray.length; i++) {
                var element = this._tileArray[i];
                element.enable = false;
            }
        };
        MainGameLayout.prototype._checkEndGame = function () {
            this._tileCount++;
            if (this._tileCount === 18) {
                this._showEndGame();
            }
        };
        MainGameLayout.prototype._showEndGame = function () {
            var _this = this;
            var playButtonOff = this.game.add.tween(this._autoPlayButton).to({ alpha: 0 }, 500, "Linear", true);
            playButtonOff.onComplete.add(function () {
                _this._autoPlayButton.parent.removeChild(_this._autoPlayButton);
                _this._autoPlayButton.destroy();
            }, this);
            var instructionsOff = this.game.add.tween(this._instructions).to({ alpha: 0 }, 500, "Linear", true);
            instructionsOff.onComplete.add(function () {
                _this._instructions.parent.removeChild(_this._instructions);
                _this._instructions.destroy();
            }, this);
            var tilesDown = this.game.add.tween(this._tilesGroup).to({ y: 90 }, 750, "Linear", true, 3000);
            var cloverDelay = 0;
            var array = this._cloverArray.reverse();
            for (var j = 0; j < array.length; j++) {
                var clover = this._cloverArray[j];
                cloverDelay = 3000 + (j * 100);
                var cloverDown = this.game.add.tween(clover).to({ y: clover.position.y + 120 }, 500, "Quart.easeOut", true, cloverDelay);
                cloverDown.onStart.add(function () {
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.CLOVER, BOOM.SoundChannels.FX_SOUNDS);
                }, this);
            }
            var t = this.game.time.create(true);
            t.add(cloverDelay, function () {
                BOOM.SignalManager.instance.dispatch('endGameShow');
            }, this);
            t.start();
            return true;
        };
        MainGameLayout.prototype._reduceGoesLeft = function () {
            var goesLeftText = " GOES LEFT";
            this._remainingGoes--;
            if (this._remainingGoes == 1) {
                goesLeftText = " GO LEFT";
            }
            this._selectionsLeft.text = this._remainingGoes + goesLeftText;
            this._checkFadeSelected();
            return true;
        };
        MainGameLayout.prototype._checkFadeSelected = function () {
            if (this._remainingGoes == 0) {
                this._autoPlayFade();
                for (var l = 0; l < this._tileArray.length; l++) {
                    var tile = this._tileArray[l];
                    if (!tile.selected) {
                        tile.fade(100);
                    }
                }
            }
        };
        MainGameLayout.prototype._autoPlayFade = function () {
            this._autoPlayButton.disableButton();
            this.game.add.tween(this._autoPlayButton).to({ alpha: 0 }, 500, "Linear", true, 200);
            this.game.add.tween(this._selectionsLeft).to({ alpha: 0 }, 500, "Linear", true, 200);
        };
        MainGameLayout.prototype._autoPlay = function () {
            this._autoPlayFade();
            this._promptHighlightActive = false;
            BOOM.SignalManager.instance.dispatch('killPrompt');
            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.AUTOPLAY, BOOM.SoundChannels.FX_SOUNDS);
            var cleanArray = [];
            for (var l = 0; l < this._tileArray.length; l++) {
                var tile = this._tileArray[l];
                if (!tile.selected) {
                    cleanArray.push(tile);
                }
            }
            var revealArray = [];
            for (var j = 0; j < this._remainingGoes; j++) {
                var tile = cleanArray.shift();
                revealArray.push(tile);
            }
            for (var k = 0; k < revealArray.length; k++) {
                var revealTile = revealArray[k];
                revealTile.selected = true;
                revealTile.reveal(true);
            }
            for (var l = 0; l < this._tileArray.length; l++) {
                var tile = this._tileArray[l];
                if (!tile.selected) {
                    tile.fade(100);
                }
            }
        };
        MainGameLayout.prototype._killPrompt = function (state) {
            if (this._promptTimeline) {
                this._promptTimeline.timer.stop();
            }
            for (var i = 0; i < this._tileArray.length; i++) {
                var tile = this._tileArray[i];
                if (tile.prompt) {
                    tile.prompt.alpha = 0;
                }
            }
        };
        MainGameLayout.prototype._promptHighlight = function () {
            var _this = this;
            if (this._remainingGoes > 0) {
                this._promptTimeline = this.game.time.events.loop(Phaser.Timer.SECOND * 4, function () {
                    var shuffleArray = BOOM.Helper.shuffleArray(_this._tileArray);
                    var promptArray = [];
                    for (var i = 0; i < _this._tileArray.length; i++) {
                        var tile = _this._tileArray[i];
                        if (tile.enable) {
                            tile.makePrompt();
                        }
                    }
                }, this);
                this._promptTimeline.timer.start();
            }
            else {
                this._showEndGame();
            }
        };
        return MainGameLayout;
    }(BOOM.GameGroup));
    BOOM.MainGameLayout = MainGameLayout;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    (function (TimerInteractionStatus) {
        TimerInteractionStatus[TimerInteractionStatus["startOrReset"] = 0] = "startOrReset";
        TimerInteractionStatus[TimerInteractionStatus["stop"] = 1] = "stop";
    })(BOOM.TimerInteractionStatus || (BOOM.TimerInteractionStatus = {}));
    var TimerInteractionStatus = BOOM.TimerInteractionStatus;
    var IdleClass = (function (_super) {
        __extends(IdleClass, _super);
        function IdleClass() {
            _super.call(this);
            this.delayUntillIdle = null;
            this.delayUntillIdleTimeOut = null;
            this._idleEnabled = null;
            this._useTimeOut = false;
            this._timerReachedIdleStart = false;
            this._idleControlled = false;
            this._idleConroller = null;
        }
        IdleClass.prototype.coreIdleEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleEvent();
            }
        };
        IdleClass.prototype.replaceableIdleEvent = function () {
        };
        IdleClass.prototype.coreStopIdleEvent = function () {
            if (this._idleEnabled) {
                this.replaceableStopIdleEvent();
            }
        };
        IdleClass.prototype.replaceableStopIdleEvent = function () {
        };
        IdleClass.prototype.coreIdleTimeOutEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleTimeOutEvent();
            }
        };
        IdleClass.prototype.replaceableIdleTimeOutEvent = function () {
        };
        IdleClass.prototype.coreIdleInteruptedEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleInteruptedEvent();
            }
        };
        IdleClass.prototype.replaceableIdleInteruptedEvent = function () {
        };
        IdleClass.prototype.coreBreakIdleIfActive = function () {
            if (this._idleEnabled) {
                if (!this._idleControlled) {
                    this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
                }
                else {
                    this._idleConroller.coreBreakIdleIfActive();
                }
            }
        };
        IdleClass.prototype.coreResumeIdleIfActive = function () {
            if (this._idleEnabled) {
                if (!this._idleControlled) {
                    this.resetAndStartOrStopTimer(TimerInteractionStatus.startOrReset);
                }
                else {
                    this._idleConroller.coreResumeIdleIfActive();
                }
            }
        };
        IdleClass.prototype.resetAndStartOrStopTimer = function (status) {
            var _this = this;
            if (this._idleTimer !== undefined) {
                this._idleTimer.destroy();
            }
            if (!this._idleControlled && this._idleEnabled) {
                if (this._timerReachedIdleStart) {
                    this.coreIdleInteruptedEvent();
                }
                this.coreStopIdleEvent();
                if (status == TimerInteractionStatus.startOrReset) {
                    this._idleTimer = BOOM.GameManager.instance.time.create(true);
                    this._idleTimer.add(this.delayUntillIdle, function () {
                        _this.coreIdleEvent();
                        _this._timerReachedIdleStart = true;
                    });
                    if (this._useTimeOut) {
                        this._idleTimer.add(this.delayUntillIdleTimeOut, function () {
                            _this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
                            _this.coreIdleTimeOutEvent();
                        });
                    }
                    this._idleTimer.start();
                }
            }
            this._timerReachedIdleStart = false;
        };
        IdleClass.prototype.setIdleController = function (idleContoller, useIdleController) {
            if (useIdleController === void 0) { useIdleController = true; }
            this._idleConroller = idleContoller;
            this._idleConroller.addTooControlledIdlesArray(this);
            this.setIdleControlled(useIdleController);
        };
        IdleClass.prototype.setIdleControlled = function (value) {
            this._idleControlled = value;
            this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
        };
        IdleClass.prototype.getIdleControlled = function () {
            return this._idleControlled;
        };
        IdleClass.prototype.setTimerValues = function (delayUntillIdle, delayUntillIdleTimeOut) {
            this.delayUntillIdle = delayUntillIdle;
            this.delayUntillIdleTimeOut = delayUntillIdleTimeOut;
        };
        IdleClass.prototype.enableOrDisableIdleTimeOut = function (value) {
            this._useTimeOut = value;
        };
        IdleClass.prototype.getUseTimeOutStatus = function () {
            return this._useTimeOut;
        };
        IdleClass.prototype.enableOrDisableIdle = function (value) {
            this._idleEnabled = value;
            if (!this._idleEnabled) {
                this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
            }
        };
        IdleClass.prototype.getUseIdleStatus = function () {
            return this._idleEnabled;
        };
        IdleClass.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this._idleTimer !== undefined) {
                this._idleTimer.destroy();
            }
        };
        IdleClass.prototype.removeSelfFromIdleControlerAndArray = function () {
            this.setIdleControlled(false);
            this._idleConroller.removeIdleClass(this);
            this._idleConroller = null;
        };
        IdleClass.prototype.stopTimerIdleAndRemoveFromController = function () {
            this.enableOrDisableIdle(false);
            this.removeSelfFromIdleControlerAndArray();
        };
        return IdleClass;
    }(BOOM.NonDisplayObject));
    BOOM.IdleClass = IdleClass;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    (function (ButtonState) {
        ButtonState[ButtonState["DefaultState"] = 0] = "DefaultState";
        ButtonState[ButtonState["MouseOver"] = 1] = "MouseOver";
        ButtonState[ButtonState["MouseDown"] = 2] = "MouseDown";
        ButtonState[ButtonState["Disabled"] = 3] = "Disabled";
    })(BOOM.ButtonState || (BOOM.ButtonState = {}));
    var ButtonState = BOOM.ButtonState;
    var SpriteInfo = (function () {
        function SpriteInfo() {
        }
        SpriteInfo.prototype.swapTexture = function (spriteSheet, frameName) {
            this.spriteSheets = spriteSheet;
            this.frameName = frameName;
        };
        return SpriteInfo;
    }());
    BOOM.SpriteInfo = SpriteInfo;
    var ButtonEvents = (function () {
        function ButtonEvents() {
            this.onInputUp = new Phaser.Signal();
            this.onInputDown = new Phaser.Signal();
            this.onInputOver = new Phaser.Signal();
            this.onInputOut = new Phaser.Signal();
        }
        return ButtonEvents;
    }());
    BOOM.ButtonEvents = ButtonEvents;
    var ButtonClass = (function (_super) {
        __extends(ButtonClass, _super);
        function ButtonClass(buttonParameters) {
            var _this = this;
            _super.call(this);
            this.buttonSprite = null;
            this.buttonText = null;
            this.inactivePromptTime = -1;
            this.activeTween = null;
            this.buttonEnabledStatus = null;
            this.buttonUpSpriteInfo = null;
            this.buttonDownSpriteInfo = null;
            this.buttonOverSpriteInfo = null;
            this.buttonDisabledSpriteInfo = null;
            this.idleClass = null;
            this._currentSpriteInfo = null;
            this._clickWasInButton = null;
            this._internalGroupScaler = null;
            this._OutsideTrigger = null;
            this._interactivityScaling = null;
            this.buttonEvents = new ButtonEvents();
            this._internalGroupScaler = new Phaser.Group(BOOM.GameManager.instance, this);
            this.buttonSprite = BOOM.GameManager.instance.make.sprite(0, 0);
            this.buttonSprite.anchor.set(0.5, 0.5);
            this._internalGroupScaler.add(this.buttonSprite);
            if (buttonParameters.useText === true) {
                if (buttonParameters.MyOwnTextObject !== undefined) {
                    this.buttonText = buttonParameters.MyOwnTextObject;
                    this._internalGroupScaler.add(this.buttonText);
                    this._internalGroupScaler.bringToTop(this.buttonText);
                }
                else {
                    this.buttonText = new Phaser.Text(BOOM.GameManager.instance, 0, 0, "", {
                        font: "20px Arial",
                        align: "center"
                    });
                    this.buttonText.fill = '#FFF';
                    this.buttonText.anchor.set(0.5, 0.5);
                    this._internalGroupScaler.add(this.buttonText);
                    this._internalGroupScaler.bringToTop(this.buttonText);
                    if (buttonParameters.textMessage !== undefined) {
                        this.buttonText.text = buttonParameters.textMessage;
                    }
                }
            }
            if (buttonParameters.interactivityScaling !== undefined) {
                this._interactivityScaling = buttonParameters.interactivityScaling;
                if (this._interactivityScaling.mouseOver === undefined) {
                    this._interactivityScaling.mouseOver = new Phaser.Point(1.05, 1.05);
                }
                if (this._interactivityScaling.mouseDown === undefined) {
                    this._interactivityScaling.mouseDown = new Phaser.Point(0.95, 0.95);
                }
                if (this._interactivityScaling.disabledState === undefined) {
                    this._interactivityScaling.disabledState = new Phaser.Point(0.95, 0.95);
                }
            }
            else {
                this._interactivityScaling = ({
                    useInteractivityScaling: true,
                    mouseOver: new Phaser.Point(1.05, 1.05),
                    mouseDown: new Phaser.Point(0.95, 0.95),
                    disabledState: new Phaser.Point(0.95, 0.95)
                });
            }
            this._currentSpriteInfo = new SpriteInfo();
            this.buttonUpSpriteInfo = new SpriteInfo();
            this.buttonDownSpriteInfo = new SpriteInfo();
            this.buttonOverSpriteInfo = new SpriteInfo();
            this.buttonDisabledSpriteInfo = new SpriteInfo();
            this.setButtonImages(buttonParameters.buttonStateImages);
            this.idleClass = new BOOM.IdleClass();
            this.idleClass.replaceableIdleEvent = function () { _this.promptTweenPart1(); };
            this.idleClass.replaceableStopIdleEvent = function () { _this.clearTweens(); };
            this.buttonSprite.inputEnabled = true;
            if (buttonParameters.pixelPerfect !== undefined) {
                this.buttonSprite.input.pixelPerfectOver = buttonParameters.pixelPerfect;
                this.buttonSprite.input.pixelPerfectClick = buttonParameters.pixelPerfect;
            }
            else {
                this.buttonSprite.input.pixelPerfectOver = false;
                this.buttonSprite.input.pixelPerfectClick = false;
                this.buttonSprite.input.boundsSprite;
            }
            this.enableButton();
        }
        ButtonClass.prototype.subscribeSignals = function () {
        };
        ;
        ButtonClass.prototype.unsubscribeSignals = function () {
        };
        ;
        ;
        ButtonClass.prototype.buttonDownFunctionality = function (internal) {
            if (internal === void 0) { internal = true; }
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.mouseDown.x, this._interactivityScaling.mouseDown.y);
            }
            this._clickWasInButton = true;
            this.idleClass.coreBreakIdleIfActive();
            this.buttonDown();
            this.buttonState = ButtonState.MouseDown;
            this._loadTextureCheck(this.buttonDownSpriteInfo.spriteSheets, this.buttonDownSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonDown = function () {
            this.buttonEvents.onInputDown.dispatch();
        };
        ButtonClass.prototype.buttonUpFunctionality = function (internal) {
            if (internal === void 0) { internal = true; }
            this._defaultState();
            if (this._clickWasInButton == true) {
                this.buttonUp();
            }
            this.idleClass.coreResumeIdleIfActive();
        };
        ButtonClass.prototype.buttonUp = function () {
            this.buttonEvents.onInputUp.dispatch();
        };
        ButtonClass.prototype.buttonMouseOverFunctionality = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.mouseOver.x, this._interactivityScaling.mouseOver.y);
            }
            this.idleClass.coreBreakIdleIfActive();
            this.buttonState = ButtonState.MouseOver;
            this.buttonMouseOver();
            this._loadTextureCheck(this.buttonOverSpriteInfo.spriteSheets, this.buttonOverSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonMouseOver = function () {
            this.buttonEvents.onInputOver.dispatch();
        };
        ButtonClass.prototype.buttonMouseOutFunctionality = function () {
            this._clickWasInButton = false;
            this._defaultState();
            this.buttonMouseOut();
            this.idleClass.coreResumeIdleIfActive();
        };
        ButtonClass.prototype.buttonMouseOut = function () {
            this.buttonEvents.onInputOut.dispatch();
        };
        ButtonClass.prototype._enabledState = function () {
            this._defaultState();
            this.enabledState();
        };
        ButtonClass.prototype.enabledState = function () {
        };
        ButtonClass.prototype._disabledState = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.disabledState.x, this._interactivityScaling.disabledState.y);
            }
            this._loadTextureCheck(this.buttonDisabledSpriteInfo.spriteSheets, this.buttonDisabledSpriteInfo.frameName);
            this.disabledState();
        };
        ButtonClass.prototype.disabledState = function () {
            this.buttonSprite.tint = 0x71717e;
        };
        ButtonClass.prototype._defaultState = function () {
            this.buttonState = ButtonState.DefaultState;
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(1, 1);
            }
            this._loadTextureCheck(this.buttonUpSpriteInfo.spriteSheets, this.buttonUpSpriteInfo.frameName);
            this.defaultState();
        };
        ButtonClass.prototype.defaultState = function () {
            this.buttonSprite.tint = 0xffffff;
            this.rotation = 0;
        };
        ButtonClass.prototype.clearTweens = function () {
            if (this.activeTween !== null) {
                this.game.tweens.remove(this.activeTween);
                this.activeTween = null;
                this.getScalerGroup().scale.set(1, 1);
            }
        };
        ButtonClass.prototype.promptTweenPart1 = function () {
            var _this = this;
            var instance = this;
            var buttonPrompt = this.game.add.tween(this.getScalerGroup().scale).to({
                x: 1.04,
                y: 1.04
            }, 600, Phaser.Easing.power2, false, 0);
            this.activeTween = buttonPrompt;
            buttonPrompt.onComplete.add(function () {
                instance.game.tweens.remove(_this.activeTween);
                _this.activeTween = null;
                if (_this.buttonEnabledStatus) {
                    instance.promptTweenPart2();
                }
            });
            buttonPrompt.start();
        };
        ButtonClass.prototype.promptTweenPart2 = function () {
            var _this = this;
            var instance = this;
            var buttonPrompt = this.game.add.tween(this.getScalerGroup().scale).to({
                x: 1,
                y: 1
            }, 600, Phaser.Easing.power2, false, 0);
            this.activeTween = buttonPrompt;
            buttonPrompt.onComplete.add(function () {
                instance.game.tweens.remove(_this.activeTween);
                _this.activeTween = null;
                if (_this.buttonEnabledStatus) {
                    instance.promptTweenPart1();
                }
            });
            buttonPrompt.start();
        };
        ButtonClass.prototype.enableButton = function () {
            this.buttonSprite.inputEnabled = true;
            this.buttonSprite.input.useHandCursor = true;
            this.buttonEnabledStatus = true;
            this.buttonSprite.events.onInputDown.add(this.buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.add(this.buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.add(this.buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.add(this.buttonMouseOutFunctionality, this);
            this.idleClass.coreResumeIdleIfActive();
            this._enabledState();
        };
        ;
        ButtonClass.prototype.disableButton = function () {
            this.buttonSprite.inputEnabled = false;
            this.buttonSprite.input.useHandCursor = false;
            this.buttonEnabledStatus = false;
            this.buttonSprite.events.onInputDown.remove(this.buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.remove(this.buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.remove(this.buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.remove(this.buttonMouseOutFunctionality, this);
            this.idleClass.coreBreakIdleIfActive();
        };
        ;
        ButtonClass.prototype.getScalerGroup = function () {
            return this._internalGroupScaler;
        };
        ButtonClass.prototype._loadTextureCheck = function (spriteSheet, frameName) {
            var same = false;
            if (this._currentSpriteInfo.spriteSheets == spriteSheet && this._currentSpriteInfo.frameName == frameName) {
                same = true;
            }
            if (!same) {
                this.buttonSprite.loadTexture((spriteSheet == null) ? frameName : spriteSheet, (spriteSheet == null) ? null : frameName);
                this._currentSpriteInfo.spriteSheets = spriteSheet;
                this._currentSpriteInfo.frameName = frameName;
            }
        };
        ButtonClass.prototype.simulateClick = function (enableButtonAfterWards) {
            if (enableButtonAfterWards === void 0) { enableButtonAfterWards = true; }
            this.disableButton();
            this._clickWasInButton = true;
            this.buttonUpFunctionality(false);
            if (enableButtonAfterWards) {
                this.enableButton();
            }
        };
        ButtonClass.prototype.setButtonImages = function (buttonStateImages, setUnderfinedStatesTooButtonUpImage) {
            if (setUnderfinedStatesTooButtonUpImage === void 0) { setUnderfinedStatesTooButtonUpImage = true; }
            if (buttonStateImages.buttonUpSpriteSheetName !== undefined) {
                this.buttonUpSpriteInfo.spriteSheets = buttonStateImages.buttonUpSpriteSheetName;
            }
            if (buttonStateImages.buttonUpStateImageName !== undefined) {
                this.buttonUpSpriteInfo.frameName = buttonStateImages.buttonUpStateImageName;
            }
            if (buttonStateImages.buttonOverSpriteSheetName === undefined) {
                if (setUnderfinedStatesTooButtonUpImage == true) {
                    this.buttonOverSpriteInfo.spriteSheets = this.buttonUpSpriteInfo.spriteSheets;
                }
            }
            else {
                this.buttonOverSpriteInfo.spriteSheets = buttonStateImages.buttonOverSpriteSheetName;
            }
            if (buttonStateImages.buttonOverStateImageName === undefined) {
                if (setUnderfinedStatesTooButtonUpImage == true) {
                    this.buttonOverSpriteInfo.frameName = this.buttonUpSpriteInfo.frameName;
                }
            }
            else {
                this.buttonOverSpriteInfo.frameName = buttonStateImages.buttonOverStateImageName;
            }
            if (buttonStateImages.buttonDownSpriteSheetName === undefined) {
                if (setUnderfinedStatesTooButtonUpImage == true) {
                    this.buttonDownSpriteInfo.spriteSheets = this.buttonUpSpriteInfo.spriteSheets;
                }
            }
            else {
                this.buttonDownSpriteInfo.spriteSheets = buttonStateImages.buttonDownSpriteSheetName;
            }
            if (buttonStateImages.buttonDownStateImageName === undefined) {
                if (setUnderfinedStatesTooButtonUpImage == true) {
                    this.buttonDownSpriteInfo.frameName = this.buttonUpSpriteInfo.frameName;
                }
            }
            else {
                this.buttonDownSpriteInfo.frameName = buttonStateImages.buttonDownStateImageName;
            }
            if (buttonStateImages.buttonDisabledSpriteSheetName === undefined) {
                if (setUnderfinedStatesTooButtonUpImage == true) {
                    this.buttonDisabledSpriteInfo.spriteSheets = this.buttonUpSpriteInfo.spriteSheets;
                }
            }
            else {
                this.buttonDisabledSpriteInfo.spriteSheets = buttonStateImages.buttonDisabledSpriteSheetName;
            }
            if (buttonStateImages.buttonDisabledStateImageName === undefined) {
                if (setUnderfinedStatesTooButtonUpImage == true) {
                    this.buttonDisabledSpriteInfo.frameName = this.buttonUpSpriteInfo.frameName;
                }
            }
            else {
                this.buttonDisabledSpriteInfo.frameName = buttonStateImages.buttonDisabledStateImageName;
            }
            this._checkNewSpriteInfo();
        };
        ButtonClass.prototype._checkNewSpriteInfo = function () {
            switch (this.buttonState) {
                case ButtonState.DefaultState:
                    this._loadTextureCheck(this.buttonUpSpriteInfo.spriteSheets, this.buttonUpSpriteInfo.frameName);
                    break;
                case ButtonState.Disabled:
                    this._loadTextureCheck(this.buttonDisabledSpriteInfo.spriteSheets, this.buttonDisabledSpriteInfo.frameName);
                    break;
                case ButtonState.MouseOver:
                    this._loadTextureCheck(this.buttonOverSpriteInfo.spriteSheets, this.buttonOverSpriteInfo.frameName);
                    break;
                case ButtonState.MouseDown:
                    this._loadTextureCheck(this.buttonDownSpriteInfo.spriteSheets, this.buttonDownSpriteInfo.frameName);
                    break;
                default:
                    break;
            }
        };
        return ButtonClass;
    }(BOOM.GameGroup));
    BOOM.ButtonClass = ButtonClass;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var EndGameGroup = (function (_super) {
        __extends(EndGameGroup, _super);
        function EndGameGroup() {
            _super.call(this);
            this._endgamePanel = null;
            this._endgameButton = null;
            this._endMessage = null;
            this._endAmount = null;
            this._endGroup = this.game.add.group(this, "endGameGroup", true);
            this._winGroup = this.game.add.group(this._endGroup, "endGameGroup", true);
            this._isWinner = false;
            this._create();
        }
        EndGameGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('endGameShow', this._show, this);
        };
        EndGameGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('endGameShow', this._show, this);
        };
        EndGameGroup.prototype._create = function () {
            var _this = this;
            this._endGroup.position.setTo(BOOM.GameManager.NATIVE_WIDTH / 2, -300);
            this._endgamePanel = this.game.add.image(0, 0, "masterSS", "bg_endgame.png", this._endGroup);
            this._endgamePanel.anchor.setTo(0.5, 0.5);
            this._endgamePanel.alpha = 1;
            var states = {
                buttonUpStateImageName: "button_finish.png",
                buttonUpSpriteSheetName: "masterSS",
                buttonDownStateImageName: "button_finish_over.png",
                buttonDownSpriteSheetName: "masterSS",
                buttonOverStateImageName: "button_finish_over.png",
                buttonOverSpriteSheetName: "masterSS"
            };
            var buttonConfig = {
                buttonStateImages: states
            };
            this._endgameButton = new BOOM.ButtonClass(buttonConfig);
            this._endgameButton.position.setTo(0, 50);
            this._endgameButton.disableButton();
            this._endgameButton.buttonEvents.onInputUp.add(function () {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.PLAYBUTTON, BOOM.SoundChannels.FX_SOUNDS);
                _this._endgameButton.disableButton();
                com.camelot.core.IWG.ame('closeGame');
            }, this);
            this._endgameButton.alpha = 0;
            this._endGroup.add(this._endgameButton);
            var iswager = BOOM.Ticket.instance.getWager();
            if (iswager) {
                if (BOOM.Ticket.instance.getOutcome().isWinner) {
                    this._createWin();
                }
                else {
                    this._createLose();
                }
            }
            else {
                this._createTrial();
            }
            this.alpha = 1;
        };
        EndGameGroup.prototype._createWin = function () {
            this._isWinner = true;
            var startAmount = "£0";
            if (BOOM.Ticket.instance.getOutcome().amount <= 40) {
                startAmount = "£" + BOOM.Ticket.instance.getOutcome().amount;
            }
            this._winGroup = this.game.add.group(this, "winMessage", true);
            this._endMessage = this.game.add.image(0, 0, "masterSS", "end_win.png", this._winGroup);
            this._endAmount = this.game.add.bitmapText(540, -22, "ends-export", startAmount, 50);
            this._winGroup.add(this._endAmount);
            this._winGroup.position.setTo(-this._winGroup.width / 2, -25);
            this._winGroup.pivot.set(0.5, 0.5);
            this._endGroup.add(this._winGroup);
        };
        EndGameGroup.prototype._createLose = function () {
            this._isWinner = false;
            this._endMessage = this.game.add.image(0, -8, "masterSS", "end_lose.png", this._endGroup);
            this._endMessage.anchor.setTo(0.5, 0.5);
        };
        EndGameGroup.prototype._createTrial = function () {
            this._endMessage = this.game.add.image(0, -8, "masterSS", "end_trial.png", this._endGroup);
            this._endMessage.anchor.setTo(0.5, 0.5);
        };
        EndGameGroup.prototype._finalBankCheck = function () {
            var rawBank = com.camelot.core.IWG.ame('bank', { balance: 'currentAmount', raw: true });
            if (rawBank !== BOOM.Ticket.instance.getOutcome().amount) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd0008 outcome amount not equal to bank'] });
            }
        };
        EndGameGroup.prototype.createCounter = function (textField, currentValue, targetValue, speed, onStart, onUpdate, onComplete, onCompleteScope, isAnimated) {
            var counter = currentValue;
            var winAmount = targetValue - currentValue;
            var speedVariation = winAmount / speed;
            if (isAnimated) {
                var fadeOn = this.game.add.tween(textField).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
            }
            if (onStart !== null) {
                onStart.bind(onCompleteScope);
            }
            if (targetValue > 40) {
                var timer = this.game.time.events.loop(1, function (oU, oC, oCS) {
                    var realRandom = this.game.rnd.realInRange(speedVariation, speedVariation + (speedVariation * 0.1));
                    counter += realRandom;
                    textField.text = "£" + BOOM.Helper.formatCurrency(Math.round(counter));
                    if (oU !== null) {
                        oU.bind(oCS)();
                    }
                    this._winGroup.position.setTo(-this._winGroup.width / 2, -25);
                    this._winGroup.pivot.set(0.5, 0.5);
                    if (counter > targetValue) {
                        textField.text = "£" + BOOM.Helper.formatCurrency(targetValue);
                        BOOM.SignalManager.instance.dispatch('Audio.stopAudio', BOOM.Sounds.COUNTUP, BOOM.SoundChannels.FX_SOUNDS);
                        if (oC !== null) {
                            oC.bind(oCS)();
                        }
                        this.game.time.events.remove(timer);
                    }
                }, this, onUpdate, onComplete, onCompleteScope);
                timer.timer.start();
            }
            else {
                textField.text = "£" + BOOM.Helper.formatCurrency(targetValue);
                onComplete();
                BOOM.SignalManager.instance.dispatch('Audio.stopAudio', BOOM.Sounds.COUNTUP, BOOM.SoundChannels.FX_SOUNDS);
            }
        };
        EndGameGroup.prototype._hide = function () {
        };
        EndGameGroup.prototype._show = function () {
            var _this = this;
            var show = this.game.add.tween(this._endGroup).to({ y: 50 }, 2000, Phaser.Easing.Bounce.Out, true);
            BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.SET_CHANNEL_VOLUME, "background", 0, true, 5000);
            show.onComplete.add(function () {
                if (BOOM.Ticket.instance.getWager()) {
                    if (BOOM.Ticket.instance.getOutcome().isWinner) {
                        BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.COUNTUP, BOOM.SoundChannels.FX_SOUNDS);
                        _this.createCounter(_this._endAmount, 0, BOOM.Ticket.instance.getOutcome().amount, 130, null, null, function () {
                            _this._fadeButton();
                        }, null, true);
                    }
                    else {
                        _this._fadeButton();
                    }
                }
                else {
                    _this._fadeButton();
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ENDLOSE, BOOM.SoundChannels.FX_SOUNDS);
                }
            }, this);
        };
        EndGameGroup.prototype._fadeButton = function () {
            var _this = this;
            var fadeButton = this.game.add.tween(this._endgameButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
            fadeButton.onComplete.add(function () {
                _this._endgameButton.enableButton();
                _this._endgameButton.idleClass.enableOrDisableIdle(true);
                _this._endgameButton.idleClass.resetAndStartOrStopTimer(BOOM.TimerInteractionStatus.startOrReset);
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ENDWIN, BOOM.SoundChannels.FX_SOUNDS);
            }, this);
        };
        return EndGameGroup;
    }(BOOM.GameGroup));
    BOOM.EndGameGroup = EndGameGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            this._ticket = null;
            this._splashGroup = null;
            this._mainGameLayout = null;
            this._endGameGroup = null;
        }
        MainGame.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('startGameSignal', this._showGame, this);
        };
        ;
        MainGame.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('startGameSignal', this._showGame, this);
        };
        ;
        MainGame.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.stage.disableVisibilityChange = false;
            this.game.onPause.add(function () {
                _this._pause();
            });
            this.game.onResume.add(function () {
                _this._unpause();
            });
            var bgImage = com.camelot.core.iwgLoadQ.images.bg;
            bgImage.id = "bgImage";
            bgImage.style.transform = "scale(1.2)";
            var refDiv = document.getElementById('IWGholder');
            document.body.insertBefore(bgImage, refDiv);
            var soundButton = new BOOM.SoundButton();
            soundButton.position.setTo(this.game.width / 2, this.game.height / 2 + 230);
            var pause = new BOOM.Pause();
            this._mainGameLayout = new BOOM.MainGameLayout();
            this._endGameGroup = new BOOM.EndGameGroup();
            this._splashGroup = new BOOM.SplashGroup();
            BOOM.SignalManager.instance.dispatch('initMainGame', function () {
                BOOM.GameManager.instance.checkIfMainGameIntroFinished();
            }, this);
        };
        MainGame.prototype._showGame = function () {
        };
        MainGame.prototype._pause = function () {
            BOOM.SignalManager.instance.dispatch('showPause');
        };
        MainGame.prototype._unpause = function () {
            BOOM.SignalManager.instance.dispatch('hidePause');
        };
        MainGame.SPRITESHEET_ID = "game0";
        return MainGame;
    }(BOOM.GameState));
    BOOM.MainGame = MainGame;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Sounds = (function () {
        function Sounds() {
        }
        Sounds.PLAYBUTTON = "playButton";
        Sounds.SHUFFLEBUTTON = "shuffleButton";
        Sounds.SHUFFLE = "shuffle";
        Sounds.AUTOPLAY = "autoPlay";
        Sounds.TILESELECT = "tileSelect";
        Sounds.TILETURN = "tileTurn";
        Sounds.MULTIPLIERTILE = "multiplierTile";
        Sounds.ROWWIN = "rowWin";
        Sounds.ENDWIN = "endWin";
        Sounds.ENDLOSE = "endLose";
        Sounds.COUNT = "count";
        Sounds.COUNTUP = "countUp";
        Sounds.CLOVER = "clover";
        Sounds.BACKGROUNDSOUND = "backgroundsound";
        return Sounds;
    }());
    BOOM.Sounds = Sounds;
    ;
    var SoundChannels = (function () {
        function SoundChannels() {
        }
        SoundChannels.BACKGROUND = 'background';
        SoundChannels.FX_SOUNDS = 'fx_sounds';
        return SoundChannels;
    }());
    BOOM.SoundChannels = SoundChannels;
    ;
    var GameSoundChannel = (function () {
        function GameSoundChannel(name, initialVolume) {
            this._name = name;
            this._sounds = new collections.LinkedDictionary();
            this._volume = initialVolume;
            this._desiredVolume = initialVolume;
        }
        GameSoundChannel.prototype.addGameSound = function (sound) {
            this._sounds.setValue(sound.getName(), sound);
        };
        GameSoundChannel.prototype.getGameSound = function (soundName) {
            return this._sounds.getValue(soundName);
        };
        GameSoundChannel.prototype.getGameSounds = function () {
            return this._sounds.values();
        };
        GameSoundChannel.prototype.getName = function () {
            return this._name;
        };
        GameSoundChannel.prototype.setName = function (value) {
            this._name = value;
        };
        GameSoundChannel.prototype.getVolume = function () {
            return this._volume;
        };
        GameSoundChannel.prototype.setIsMuted = function (value) {
            this._isMuted = value;
        };
        GameSoundChannel.prototype.getIsMuted = function () {
            return this._isMuted;
        };
        GameSoundChannel.prototype.setVolume = function (volume) {
            this._volume = volume;
            if (this._isMuted) {
                this._desiredVolume = volume;
            }
            else {
                this._volume = volume;
                var values = this._sounds.values();
                for (var i = 0; i < values.length; i++) {
                    values[i].setCurrentVolume(volume);
                }
            }
        };
        GameSoundChannel.prototype.mute = function (value) {
            this._isMuted = value;
            var values = this._sounds.values();
            for (var i = 0; i < values.length; i++) {
                if (value) {
                    this._desiredVolume = values[i].getCurrentVolume();
                    values[i].setCurrentVolume(0);
                }
                else {
                    values[i].setCurrentVolume(this._desiredVolume);
                }
            }
        };
        return GameSoundChannel;
    }());
    var GameSound = (function () {
        function GameSound(game, name, channel, maxVolume, isLoop, initialVolume, allowMultiple) {
            this._name = name;
            this._channel = channel;
            maxVolume === undefined ? this._maxVolume = maxVolume : this._maxVolume = maxVolume;
            initialVolume === undefined ? this._currentVolume = maxVolume : this._currentVolume = initialVolume;
            isLoop === undefined ? this._isLoop = false : this._isLoop = isLoop;
            allowMultiple === undefined ? this._allowMultiple = true : this._allowMultiple = allowMultiple;
            this._sound = game.add.audio(name, this._currentVolume, isLoop);
        }
        GameSound.prototype.getName = function () {
            return this._name;
        };
        GameSound.prototype.setName = function (value) {
            this._name = value;
        };
        GameSound.prototype.getMaxVolume = function () {
            return this._maxVolume;
        };
        GameSound.prototype.setMaxVolume = function (value) {
            this._maxVolume = value;
        };
        GameSound.prototype.getCurrentVolume = function () {
            return this._currentVolume;
        };
        GameSound.prototype.setCurrentVolume = function (volume) {
            this._currentVolume = this._maxVolume * volume;
            this._sound.volume = this._currentVolume;
        };
        GameSound.prototype.setDesiredVolume = function (volume) {
            this._currentVolume = this._maxVolume * volume;
        };
        GameSound.prototype.getChannel = function () {
            return this._channel;
        };
        GameSound.prototype.setChannel = function (value) {
            this._channel = value;
        };
        GameSound.prototype.isLoop = function () {
            return this._isLoop;
        };
        GameSound.prototype.setIsLoop = function (value) {
            this._isLoop = value;
        };
        GameSound.prototype.getSound = function () {
            return this._sound;
        };
        GameSound.prototype.setSound = function (value) {
            this._sound = value;
        };
        GameSound.prototype.getAllowMultiple = function () {
            return this._allowMultiple;
        };
        GameSound.prototype.setAllowMultiple = function (value) {
            this._allowMultiple = value;
        };
        return GameSound;
    }());
    var AudioManager = (function () {
        function AudioManager(game) {
            this._currentlyPlayingBGMusic = null;
            this._game = game;
            this._soundChannels = new collections.LinkedDictionary();
            this._subscribeSignals();
            BOOM.Debug.instance.log("Audio Manager has been initialised and added.", BOOM.DEBUGTYPE.INIT, this);
        }
        ;
        AudioManager.prototype._subscribeSignals = function () {
            BOOM.SignalManager.instance.add(AudioManager.PLAY_AUDIO, this._playAudio, this);
            BOOM.SignalManager.instance.add(AudioManager.STOP_AUDIO, this._stopAudio, this);
            BOOM.SignalManager.instance.add(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            BOOM.SignalManager.instance.add(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
        };
        ;
        AudioManager.prototype._unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove(AudioManager.PLAY_AUDIO, this._playAudio, this);
            BOOM.SignalManager.instance.remove(AudioManager.STOP_AUDIO, this._stopAudio, this);
            BOOM.SignalManager.instance.remove(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            BOOM.SignalManager.instance.remove(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
        };
        ;
        AudioManager.prototype.addSoundChannel = function (channelName, initialVolume) {
            var soundChannel = new GameSoundChannel(channelName, initialVolume);
            this._soundChannels.setValue(channelName, soundChannel);
        };
        ;
        AudioManager.prototype.addSound = function (game, soundName, channelName, maxVolume, isLoop, initialVolume, allowMultiple) {
            var sound = new GameSound(this._game, soundName, channelName, maxVolume, isLoop, initialVolume, allowMultiple);
            var soundChannel = this._soundChannels.getValue(channelName);
            soundChannel.addGameSound(sound);
        };
        ;
        AudioManager.prototype._setChannelVolume = function (channelName, volume, isFade, duration) {
            console.log(channelName, volume, isFade, duration);
            var soundChannel = this._soundChannels.getValue(channelName);
            console.log(this._soundChannels.getValue(channelName));
            var gameSounds = soundChannel.getGameSounds();
            if (!this._isMuted) {
                for (var i = 0; i < gameSounds.length; i++) {
                    var gameSound = gameSounds[i];
                    if (isFade) {
                        var tween = this._game.add.tween(gameSound.getSound()).to({ volume: volume }, duration, Phaser.Easing.Linear.None);
                        tween.onComplete.add(function () {
                            gameSound.setCurrentVolume(volume);
                        }, this);
                        tween.start();
                    }
                    else {
                        gameSound.setCurrentVolume(volume);
                    }
                }
            }
            else {
                for (var i = 0; i < gameSounds.length; i++) {
                    var gameSound = gameSounds[i];
                    gameSound.setDesiredVolume(volume);
                }
            }
        };
        ;
        AudioManager.prototype._stopAllSounds = function () {
            var soundChannel = this._soundChannels.getValue(SoundChannels.FX_SOUNDS);
            if (soundChannel != null) {
                var gameSounds = soundChannel.getGameSounds();
                for (var i = 0; i < gameSounds.length; i++) {
                    gameSounds[i].getSound().stop();
                }
                ;
            }
            soundChannel = this._soundChannels.getValue(SoundChannels.BACKGROUND);
            if (soundChannel != null) {
                gameSounds = soundChannel.getGameSounds();
                for (var i = 0; i < gameSounds.length; i++) {
                    gameSounds[i].getSound().stop();
                }
                ;
            }
        };
        AudioManager.prototype._stopAudio = function (soundName, channelName, isFadeOut, duration, delay) {
            var _this = this;
            var gameSound = this._soundChannels.getValue(channelName).getGameSound(soundName);
            if (gameSound != null) {
                var sound = gameSound.getSound();
                sound.volume = gameSound.getCurrentVolume();
                if (isFadeOut) {
                    var step = { value: 1 };
                    var fadeOutTween = this._game.make.tween(step).to({ value: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
                    fadeOutTween.onUpdateCallback(function () {
                        sound.volume = _this._currentMusicVolume * step.value;
                    }, this);
                    fadeOutTween.onComplete.add(function () {
                        sound.stop();
                    }, this);
                }
                else {
                    if (delay !== undefined) {
                        var t = this._game.time.create(true);
                        t.add(delay, function () {
                            sound.stop();
                        }, this);
                        t.start();
                    }
                    else {
                        sound.stop();
                    }
                }
            }
        };
        AudioManager.prototype._playAudio = function (soundName, channelName, isFadeIn, duration, delay) {
            var _this = this;
            if ((channelName === SoundChannels.BACKGROUND)) {
                this._currentlyPlayingBGMusic = soundName;
            }
            var gameSound = this._soundChannels.getValue(channelName).getGameSound(soundName);
            var sound = gameSound.getSound();
            sound.volume = gameSound.getCurrentVolume();
            sound.allowMultiple = gameSound.getAllowMultiple();
            if (isFadeIn) {
                sound.volume = 0;
                sound.play();
                var step = { value: 0 };
                var fadeInTween = this._game.make.tween(step).to({ value: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
                fadeInTween.onUpdateCallback(function () {
                    sound.volume = _this._currentMusicVolume * step.value;
                }, this);
            }
            else {
                if (delay !== undefined) {
                    var t = this._game.time.create(true);
                    t.add(delay, function () {
                        sound.play();
                    }, this);
                    t.start();
                }
                else {
                    sound.play();
                }
            }
        };
        ;
        AudioManager.prototype._musicCrossFade = function (soundname) {
            var _this = this;
            var gameSound = this._soundChannels.getValue(SoundChannels.BACKGROUND).getGameSound(this._currentlyPlayingBGMusic);
            var sound;
            var isASound = false;
            if (gameSound != null) {
                sound = gameSound.getSound();
                isASound = true;
            }
            var step = { value: 1 };
            var fadeOutTween = this._game.make.tween(step).to({ value: 0 }, 1500, Phaser.Easing.Linear.None, true, 0);
            fadeOutTween.onUpdateCallback(function () {
                if (isASound) {
                    sound.volume = _this._currentMusicVolume * step.value;
                }
            }, this);
            fadeOutTween.onComplete.add(function () {
                if (isASound) {
                    sound.stop();
                }
                _this._currentlyPlayingBGMusic = soundname;
                var gameSound = _this._soundChannels.getValue(SoundChannels.BACKGROUND).getGameSound(soundname);
                var sound2 = gameSound.getSound();
                sound2.volume = 0;
                sound2.play();
                var step = { value: 0 };
                var fadeInTween = _this._game.make.tween(step).to({ value: 1 }, 1500, Phaser.Easing.Linear.None, true, 0);
                fadeInTween.onUpdateCallback(function () {
                    sound2.volume = _this._currentMusicVolume * step.value;
                }, _this);
            }, this);
        };
        AudioManager.prototype._muteAudioChannels = function (mute) {
            var channelNames = this._soundChannels.keys();
            for (var i = 0; i < channelNames.length; i++) {
                var soundChannel = this._soundChannels.getValue(channelNames[i]);
                soundChannel.mute(mute);
            }
        };
        AudioManager.prototype._muteAudio = function () {
            if (!this._isMuted) {
                this._isMuted = true;
                this._muteAudioChannels(true);
            }
            else {
                this._isMuted = false;
                this._muteAudioChannels(false);
            }
        };
        AudioManager.PLAY_AUDIO = "Audio.playAudio";
        AudioManager.STOP_AUDIO = "Audio.stopAudio";
        AudioManager.SET_CHANNEL_VOLUME = "Audio.setChannelVolume";
        AudioManager.MUTE_ALL_CHANNELS = "Audio.muteAll";
        return AudioManager;
    }());
    BOOM.AudioManager = AudioManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var TicketManager = (function () {
        function TicketManager() {
        }
        TicketManager.prototype.reset = function () {
            this._ticket = null;
        };
        TicketManager.prototype.setTicket = function (objIn) {
            this._ticket = objIn;
        };
        TicketManager.prototype.getTicket = function () {
            return this._ticket;
        };
        TicketManager.prototype.getStake = function () {
            return this._ticket.params.stake;
        };
        TicketManager.prototype.getIsWinner = function () {
            if (this._ticket.params.wT === 1) {
                return true;
            }
            else {
                return false;
            }
        };
        TicketManager.prototype.getTotalAmount = function () {
            return this._ticket.outcome.amount;
        };
        TicketManager.prototype.getTurn = function (turnNumber) {
            return this._ticket.turns[turnNumber];
        };
        TicketManager.prototype.getTurnValue = function (turnNumber) {
            return this._ticket.turns[turnNumber].value;
        };
        TicketManager.prototype.getTurnWinStatus = function (turnNumber) {
            if (this._ticket.turns[turnNumber].w === 1) {
                return true;
            }
            else {
                return false;
            }
        };
        TicketManager.prototype.getTurnFirstSymbol = function (turnNumber) {
            return this._ticket.turns[turnNumber].a;
        };
        TicketManager.prototype.getTurnSecondSymbol = function (turnNumber) {
            return this._ticket.turns[turnNumber].b;
        };
        return TicketManager;
    }());
    BOOM.TicketManager = TicketManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameSignal = (function (_super) {
        __extends(GameSignal, _super);
        function GameSignal(signalName) {
            _super.call(this);
            this._signalID = null;
            this._signalActive = false;
            this._signalFired = false;
            this._listening = [];
            this._signalID = signalName;
            this._signalActive = false;
            this._signalFired = false;
            this._listening = [];
        }
        ;
        GameSignal.prototype.add = function (listener, listeningContext, priority) {
            if (listeningContext === void 0) { listeningContext = null; }
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            try {
                this._signalActive = true;
                this._listening.push(listeningContext);
                return _super.prototype.add.apply(this, [listener, listeningContext, priority].concat(args));
            }
            catch (err) {
                console.error(err);
            }
        };
        ;
        GameSignal.prototype.remove = function (listener, listeningContext) {
            this._listening.splice(this._listening.indexOf(listeningContext), 1);
            if (this.getNumListeners() === 0) {
                this._signalActive = false;
            }
            return _super.prototype.remove.call(this, listener, listeningContext);
        };
        ;
        GameSignal.prototype.dispatch = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            this._signalFired = true;
            _super.prototype.dispatch.apply(this, params);
        };
        Object.defineProperty(GameSignal.prototype, "ID", {
            get: function () {
                return this._signalID;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GameSignal.prototype, "inUse", {
            get: function () {
                return this._signalActive;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GameSignal.prototype, "hasFired", {
            get: function () {
                return this._signalFired;
            },
            enumerable: true,
            configurable: true
        });
        ;
        GameSignal.prototype.getListeningContexts = function () {
            var retString = '';
            this._listening.forEach(function (context) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec(context["constructor"].toString());
                var name = (results && results.length > 1) ? results[1] : "";
                retString += name;
                retString += ", ";
            });
            retString += ".";
            return retString.replace(', .', '.');
        };
        ;
        return GameSignal;
    }(Phaser.Signal));
    BOOM.GameSignal = GameSignal;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SignalManager = (function () {
        function SignalManager() {
            this._signalArray = null;
            if (SignalManager.instance != null) {
                throw new Error("Tried to make a signal manager when one already existed. To use SignalManager, use SignalManager.instance.");
            }
            else {
                SignalManager.instance = this;
                this._signalArray = [];
                BOOM.Debug.instance.log("Signal Manager has been initialised and added.", BOOM.DEBUGTYPE.INIT, this);
            }
        }
        ;
        SignalManager.prototype.add = function (addID, listener, listeningContext, priority) {
            if (listeningContext === void 0) { listeningContext = null; }
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var added = false;
            this._signalArray.forEach(function (signal) {
                if (signal.ID === addID) {
                    signal.add(listener, listeningContext, priority, args);
                    added = true;
                }
            });
            if (!added) {
                var newSignal = new BOOM.GameSignal(addID);
                this._signalArray.push(newSignal);
                newSignal.add.apply(newSignal, [listener, listeningContext, priority].concat(args));
                return true;
            }
            else {
                return false;
            }
        };
        ;
        SignalManager.prototype.remove = function (removeID, listener, listeningContext) {
            if (listeningContext === void 0) { listeningContext = null; }
            this._signalArray.forEach(function (signal) {
                if (signal.ID === removeID) {
                    signal.remove(listener, listeningContext);
                    return true;
                }
            });
            return false;
        };
        ;
        SignalManager.prototype.dispatch = function (dispatchID) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            this._signalArray.forEach(function (signal) {
                if (signal.ID === dispatchID) {
                    signal.dispatch.apply(signal, params);
                    return true;
                }
            });
            return false;
        };
        ;
        SignalManager.prototype.get = function (getID) {
            var ret = null;
            this._signalArray.forEach(function (signal) {
                if (signal.ID === getID) {
                    ret = signal;
                }
            });
            return ret;
        };
        ;
        SignalManager.prototype.checkAllSignals = function () {
            var _this = this;
            this._signalArray.forEach(function (signal) {
                BOOM.Debug.instance.log("ID: " + signal.ID + "\nActive: " + signal.inUse + "\nFired: " + signal.hasFired + "\nListening in: " + signal.getListeningContexts(), BOOM.DEBUGTYPE.DEBUG, _this);
            });
        };
        ;
        SignalManager.instance = null;
        return SignalManager;
    }());
    BOOM.SignalManager = SignalManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var DebugController = (function () {
        function DebugController() {
            this.ppreload = false;
            this.pcore = false;
            this.panimation = false;
            this.pticket = false;
            this.perror = false;
            this.pgeneral = false;
            this.pinit = false;
            this.pdebug = false;
            this._debugClearTimer = null;
            this._debugArray = null;
            if (DebugController.instance === null) {
                DebugController.instance = this;
            }
            else {
                throw new Error("Cant make 2 DebugController, use .instance instead.");
            }
            ;
        }
        DebugController.prototype.log = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    {
                        if (this.ppreload) {
                            console.log('%c[PRELOAD],' + msg, "color: green");
                        }
                        break;
                    }
                    ;
                case 'core':
                    {
                        if (this.pcore) {
                            console.log('%c[CORE],' + msg, "color: orange");
                        }
                        break;
                    }
                    ;
                case 'animation':
                    {
                        if (this.panimation) {
                            console.log('%c[ANIMATION],' + msg, "color: blue");
                        }
                        break;
                    }
                    ;
                case 'ticket':
                    {
                        if (this.pticket) {
                            console.log('%c[TICKET] ' + msg, "color: pink");
                        }
                        break;
                    }
                    ;
                case 'error':
                    {
                        if (this.perror) {
                            console.log('%c[ERROR] ' + msg, "color: red");
                        }
                        break;
                    }
                    ;
                case 'init':
                    {
                        if (this.perror) {
                            console.log('%c[INITIALISED] ' + msg, "color: magenta");
                        }
                        break;
                    }
                    ;
                case 'debug':
                    {
                        if (this.perror) {
                            console.log('%c[DEBUG] ' + msg, "color: purple");
                        }
                        break;
                    }
                    ;
                case 'general':
                default:
                    {
                        if (this.pgeneral) {
                            console.log('%c[GENERAL] ' + msg, "color: black");
                        }
                        break;
                    }
                    ;
            }
        };
        ;
        DebugController.prototype.warn = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    {
                        if (this.ppreload) {
                            console.warn('%c[PRELOAD],' + msg, "color: green");
                        }
                        break;
                    }
                    ;
                case 'core':
                    {
                        if (this.pcore) {
                            console.warn('%c[CORE],' + msg, "color: orange");
                        }
                        break;
                    }
                    ;
                case 'animation':
                    {
                        if (this.panimation) {
                            console.warn('%c[ANIMATION],' + msg, "color: blue");
                        }
                        break;
                    }
                    ;
                case 'ticket':
                    {
                        if (this.pticket) {
                            console.warn('%c[TICKET],' + msg, "color: pink");
                        }
                        break;
                    }
                    ;
                case 'error':
                    {
                        if (this.perror) {
                            console.warn('%c[ERROR],' + msg, "color: red");
                        }
                        break;
                    }
                    ;
                case 'init':
                    {
                        if (this.perror) {
                            console.warn('%c[INITIALISED],' + msg, "color: magenta");
                        }
                        break;
                    }
                    ;
                case 'debug':
                    {
                        if (this.perror) {
                            console.warn('%c[DEBUG] ' + msg, "color: purple");
                        }
                        break;
                    }
                    ;
                case 'general':
                default:
                    {
                        if (this.pgeneral) {
                            console.warn('%c[GENERAL],' + msg, "color: black");
                        }
                        break;
                    }
                    ;
            }
        };
        ;
        DebugController.prototype.error = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    {
                        if (this.ppreload) {
                            console.error('%c[PRELOAD]' + msg, "color: green");
                        }
                        break;
                    }
                    ;
                case 'core':
                    {
                        if (this.pcore) {
                            console.error('%c[CORE]' + msg, "color: orange");
                        }
                        break;
                    }
                    ;
                case 'animation':
                    {
                        if (this.panimation) {
                            console.error('%c[ANIMATION]' + msg, "color: blue");
                        }
                        break;
                    }
                    ;
                case 'ticket':
                    {
                        if (this.pticket) {
                            console.error('%c[TICKET]' + msg, "color: pink");
                        }
                        break;
                    }
                    ;
                case 'error':
                    {
                        if (this.perror) {
                            console.error('%c[ERROR]' + msg, "color: red");
                        }
                        break;
                    }
                    ;
                case 'init':
                    {
                        if (this.perror) {
                            console.error('%c[INITIALISED],' + msg, "color: magenta");
                        }
                        break;
                    }
                    ;
                case 'debug':
                    {
                        if (this.perror) {
                            console.error('%c[DEBUG] ' + msg, "color: purple");
                        }
                        break;
                    }
                    ;
                case 'general':
                default:
                    {
                        if (this.pgeneral) {
                            console.error('%c[GENERAL]' + msg, "color: black");
                        }
                        break;
                    }
                    ;
            }
        };
        ;
        DebugController.prototype.setAll = function () {
            console.log("%c[DEBUG] " + "Debug messages showing ALL.", "color: gray");
            this.panimation = true;
            this.pcore = true;
            this.perror = true;
            this.pgeneral = true;
            this.ppreload = true;
            this.pticket = true;
            this.pinit = true;
            this.pdebug = true;
        };
        ;
        DebugController.prototype.setOFF = function () {
            console.log("%c[DEBUG] " + "Debug messages showing NONE.", "color: gray");
            this.panimation = false;
            this.pcore = false;
            this.perror = false;
            this.pgeneral = false;
            this.ppreload = false;
            this.pticket = false;
            this.pinit = false;
            this.pdebug = false;
        };
        ;
        DebugController.prototype.setPRELOAD = function () {
            if (this.ppreload) {
                console.log("%c[DEBUG] " + "Preloader messages turned off.", "color: gray");
                this.ppreload = false;
            }
            else {
                console.log("%c[DEBUG] " + "Preloader messages turned on.", "color: gray");
                this.ppreload = true;
            }
        };
        DebugController.prototype.setCORE = function () {
            if (this.pcore) {
                console.log("%c[DEBUG] " + "Core messages turned off.", "color: gray");
                this.pcore = false;
            }
            else {
                console.log("%c[DEBUG] " + "Core messages turned on.", "color: gray");
                this.pcore = true;
            }
        };
        DebugController.prototype.setANIMATION = function () {
            if (this.panimation) {
                console.log("%c[DEBUG] " + "Animation messages turned off.", "color: gray");
                this.panimation = false;
            }
            else {
                console.log("%c[DEBUG] " + "Animation messages turned on.", "color: gray");
                this.panimation = true;
            }
        };
        DebugController.prototype.setERROR = function () {
            if (this.perror) {
                console.log("%c[DEBUG] " + "Error messages turned off.", "color: gray");
                this.perror = false;
            }
            else {
                console.log("%c[DEBUG] " + "Error messages turned on.", "color: gray");
                this.perror = true;
            }
        };
        DebugController.prototype.setGENERAL = function () {
            if (this.pgeneral) {
                console.log("%c[DEBUG] " + "General messages turned off.", "color: gray");
                this.pgeneral = false;
            }
            else {
                console.log("%c[DEBUG] " + "General messages turned on.", "color: gray");
                this.pgeneral = true;
            }
        };
        DebugController.prototype.setTICKET = function () {
            if (this.pticket) {
                console.log("%c[DEBUG] " + "Ticket messages turned off.", "color: gray");
                this.pticket = false;
            }
            else {
                console.log("%c[DEBUG] " + "Ticket messages turned on.", "color: gray");
                this.pticket = true;
            }
        };
        DebugController.prototype.setINIT = function () {
            if (this.pinit) {
                console.log("%c[DEBUG] " + "Init messages turned off.", "color: gray");
                this.pinit = false;
            }
            else {
                console.log("%c[DEBUG] " + "Init messages turned on.", "color: gray");
                this.pinit = true;
            }
        };
        ;
        DebugController.prototype.setDEBUG = function () {
            if (this.pinit) {
                console.log("%c[DEBUG] " + "Debug messages turned off.", "color: gray");
                this.pdebug = false;
            }
            else {
                console.log("%c[DEBUG] " + "Debug messages turned on.", "color: gray");
                this.pdebug = true;
            }
        };
        ;
        DebugController.instance = null;
        return DebugController;
    }());
    BOOM.DebugController = DebugController;
    ;
    var DEBUGTYPE = (function () {
        function DEBUGTYPE() {
        }
        DEBUGTYPE.PRELOADER = "preload";
        DEBUGTYPE.ANIMATION = "animation";
        DEBUGTYPE.GENERAL = "general";
        DEBUGTYPE.CORE = "core";
        DEBUGTYPE.TICKET = "ticket";
        DEBUGTYPE.ERROR = "error";
        DEBUGTYPE.INIT = "init";
        DEBUGTYPE.DEBUG = "debug";
        return DEBUGTYPE;
    }());
    BOOM.DEBUGTYPE = DEBUGTYPE;
    var Debug = (function () {
        function Debug() {
            this.controller = null;
            if (Debug.instance === null) {
                Debug.instance = this;
                this.controller = new DebugController();
                this.log("DebugManager initialised.", DEBUGTYPE.INIT, this);
            }
            else {
                throw new Error("Cant make 2 debug, use .instance instead.");
            }
            ;
        }
        ;
        Debug.prototype.log = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.log(message, channel, scope);
        };
        ;
        Debug.prototype.warn = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.warn(message, channel, scope);
        };
        ;
        Debug.prototype.error = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.error(message, channel, scope);
        };
        ;
        Debug.instance = null;
        Debug.OFF = function () { Debug.instance.controller.setOFF(); };
        Debug.ALL = function () { Debug.instance.controller.setAll(); };
        Debug.PRELOADER = function () { Debug.instance.controller.setPRELOAD(); };
        Debug.CORE = function () { Debug.instance.controller.setCORE(); };
        Debug.ANIMATIONS = function () { Debug.instance.controller.setANIMATION(); };
        Debug.GENERAL = function () { Debug.instance.controller.setGENERAL(); };
        Debug.TICKET = function () { Debug.instance.controller.setTICKET(); };
        Debug.ERROR = function () { Debug.instance.controller.setERROR(); };
        Debug.INIT = function () { Debug.instance.controller.setINIT(); };
        Debug.DEBUG = function () { Debug.instance.controller.setDEBUG(); };
        return Debug;
    }());
    BOOM.Debug = Debug;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    (function (LegendType) {
        LegendType[LegendType["ALL"] = 0] = "ALL";
        LegendType[LegendType["SINGLEROW"] = 1] = "SINGLEROW";
        LegendType[LegendType["SEQUENTIAL"] = 2] = "SEQUENTIAL";
    })(BOOM.LegendType || (BOOM.LegendType = {}));
    var LegendType = BOOM.LegendType;
    ;
    var LegendManager = (function () {
        function LegendManager(game) {
            this._isRevealFinished = false;
            this._game = game;
        }
        LegendManager.prototype._init = function () {
            this._board = [];
            this._rows = new collections.LinkedDictionary();
            this._columns = new collections.LinkedDictionary();
            this._revealed = [];
            this._revealedObjects = 0;
            this._revealedBonus = 0;
        };
        LegendManager.prototype.setupLegend = function (rows, prizes, bonusCoins, createColumns) {
            this._init();
            this._bonusCoins = bonusCoins;
            var row;
            var column;
            var boardIndex = 0;
            for (var y = 0; y < rows.length; y++) {
                row = new DataSet(y, rows[y], prizes[y]);
                var indexes = [];
                for (var x = 0; x < rows[y].length; x++) {
                    indexes.push(boardIndex);
                    var object = rows[y][x];
                    this._board.push(object);
                    boardIndex++;
                }
                row.setIndexes(indexes);
                this._rows.setValue(y, row);
            }
            var prizeIndex = 6;
            if (createColumns) {
                for (var i = 0; i < this._rows.size(); i++) {
                    var objects = [];
                    var indexes = [];
                    for (var j = 0; j < this._rows.size(); j++) {
                        indexes.push(i + (j * 5) + j);
                        objects.push(this._rows.getValue(j).getObjects()[i]);
                    }
                    column = new DataSet(i, objects, prizes[prizeIndex++]);
                    column.setIndexes(indexes);
                    this._columns.setValue(i, column);
                }
            }
        };
        LegendManager.prototype.getTotalAmmount = function (toReveal) {
            var totalAmmount = 0;
            for (var i = 0; i < this._rows.size(); i++) {
                var row = this._rows.getValue(i);
                var rowValues = row.getObjects();
                var rowWinner = true;
                for (var j = 0; j < rowValues.length; j++) {
                    if (!this._contains(toReveal, rowValues[j])) {
                        rowWinner = false;
                    }
                }
                if (rowWinner) {
                    totalAmmount += row.getPrize();
                }
            }
            for (var i = 0; i < this._columns.size(); i++) {
                var column = this._columns.getValue(i);
                var columnValues = column.getObjects();
                var columnWinner = true;
                for (var j = 0; j < columnValues.length; j++) {
                    if (!this._contains(toReveal, columnValues[j])) {
                        columnWinner = false;
                    }
                }
                if (columnWinner) {
                    totalAmmount += column.getPrize();
                }
            }
            if (this._contains(toReveal, this._board[0]) &&
                this._contains(toReveal, this._board[5]) &&
                this._contains(toReveal, this._board[this._board.length - 6]) &&
                this._contains(toReveal, this._board[this._board.length - 1])) {
                totalAmmount += 20;
            }
            return totalAmmount;
        };
        LegendManager.prototype.addRow = function (index, objects, prize) {
            var row = new DataSet(index, objects, prize);
            this._rows.setValue(index, row);
        };
        LegendManager.prototype.addColumn = function (index, objects, prize) {
            var column = new DataSet(index, objects, prize);
            this._columns.setValue(index, column);
        };
        LegendManager.prototype.getRowObjects = function (index) {
            return this._rows.getValue(index).getObjects();
        };
        LegendManager.prototype.getColumnObjects = function (index) {
            return this._columns.getValue(index).getObjects();
        };
        LegendManager.prototype.getRowPrize = function (index) {
            return this._rows.getValue(index).getPrize();
        };
        LegendManager.prototype.getColumnPrize = function (index) {
            return this._columns.getValue(index).getPrize();
        };
        LegendManager.prototype.reveal = function (toReveal) {
            var reveal;
            var reveals = [];
            for (var i = 0; i < toReveal.length; i++) {
                var nextReveal = toReveal[i];
                reveal = new Reveal(RevealType.AUDIT, this._revealedObjects);
                reveals.push(reveal);
                var counter = 0;
                for (var j = 0; j < this._board.length; j++) {
                    if (this._board[j] === nextReveal) {
                        reveal = new Reveal(RevealType.SYMBOL, j);
                        reveals.push(reveal);
                        counter++;
                        if (j === 0 || j === 5 || j === this._board.length - 1 || j === this._board.length - 6) {
                            reveal = new Reveal(RevealType.CORNER, j);
                            reveals.push(reveal);
                        }
                    }
                }
                this._revealed.push(nextReveal);
                for (var k = 0; k < this._rows.keys().length; k++) {
                    var row = this._rows.getValue(k);
                    if (!row.isAnticipationRevealed() && row.numberOfWinnersInRow(this._revealed) === 5) {
                        reveal = new Reveal(RevealType.ANTICIPATION_ROW, this._rows.getValue(k).getIndex());
                        reveals.push(reveal);
                        row.setIsAnticipationRevealed(true);
                    }
                    else if (!row.isRevealed() && row.numberOfWinnersInRow(this._revealed) === 6) {
                        reveal = new Reveal(RevealType.ROW, this._rows.getValue(k).getIndex());
                        reveals.push(reveal);
                        var indexes = row.getIndexes();
                        for (var l = 0; l < indexes.length; l++) {
                            ;
                            reveal = new Reveal(RevealType.SYMBOL_WINNER, indexes[l]);
                            reveals.push(reveal);
                        }
                        row.setIsRevealed(true);
                    }
                }
                for (var k = 0; k < this._columns.keys().length; k++) {
                    var column = this._columns.getValue(k);
                    if (!column.isAnticipationRevealed() && column.numberOfWinnersInRow(this._revealed) === 5) {
                        reveal = new Reveal(RevealType.ANTICIPATION_COLUMN, this._columns.getValue(k).getIndex());
                        reveals.push(reveal);
                        column.setIsAnticipationRevealed(true);
                    }
                    else if (!column.isRevealed() && column.numberOfWinnersInRow(this._revealed) === 6) {
                        reveal = new Reveal(RevealType.COLUMN, this._columns.getValue(k).getIndex());
                        reveals.push(reveal);
                        var indexes = column.getIndexes();
                        for (var l = 0; l < indexes.length; l++) {
                            reveal = new Reveal(RevealType.SYMBOL_WINNER, indexes[l]);
                            reveals.push(reveal);
                        }
                        column.setIsRevealed(true);
                    }
                }
                this._revealedObjects++;
            }
            return reveals;
        };
        LegendManager.prototype._contains = function (values, value) {
            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) {
                    return true;
                }
            }
            return false;
        };
        return LegendManager;
    }());
    BOOM.LegendManager = LegendManager;
    (function (RevealType) {
        RevealType[RevealType["AUDIT"] = 0] = "AUDIT";
        RevealType[RevealType["SYMBOL"] = 1] = "SYMBOL";
        RevealType[RevealType["SYMBOL_WINNER"] = 2] = "SYMBOL_WINNER";
        RevealType[RevealType["SYMBOL_BONUS"] = 3] = "SYMBOL_BONUS";
        RevealType[RevealType["ANTICIPATION_ROW"] = 4] = "ANTICIPATION_ROW";
        RevealType[RevealType["ANTICIPATION_COLUMN"] = 5] = "ANTICIPATION_COLUMN";
        RevealType[RevealType["ROW"] = 6] = "ROW";
        RevealType[RevealType["COLUMN"] = 7] = "COLUMN";
        RevealType[RevealType["CORNER"] = 8] = "CORNER";
    })(BOOM.RevealType || (BOOM.RevealType = {}));
    var RevealType = BOOM.RevealType;
    ;
    var Reveal = (function () {
        function Reveal(type, index) {
            this._index = index;
            this._type = type;
        }
        Reveal.prototype.getIndex = function () {
            return this._index;
        };
        Reveal.prototype.getRevealType = function () {
            return this._type;
        };
        return Reveal;
    }());
    BOOM.Reveal = Reveal;
    var DataSet = (function () {
        function DataSet(index, objects, prize) {
            this._index = index;
            this._objects = objects;
            this._prize = prize;
            this._revealed = false;
            this._anticipationRevealed = false;
            this._indexes = [];
        }
        DataSet.prototype.getIndex = function () {
            return this._index;
        };
        DataSet.prototype.setIndex = function (value) {
            this._index = value;
        };
        DataSet.prototype.getObjects = function () {
            return this._objects;
        };
        DataSet.prototype.setObjects = function (value) {
            this._objects = value;
        };
        DataSet.prototype.getPrize = function () {
            return this._prize;
        };
        DataSet.prototype.setPrize = function (value) {
            this._prize = value;
        };
        DataSet.prototype.isAnticipationRevealed = function () {
            return this._anticipationRevealed;
        };
        DataSet.prototype.setIsAnticipationRevealed = function (value) {
            this._anticipationRevealed = value;
        };
        DataSet.prototype.isRevealed = function () {
            return this._revealed;
        };
        DataSet.prototype.setIsRevealed = function (value) {
            this._revealed = value;
        };
        DataSet.prototype.getIndexes = function () {
            return this._indexes;
        };
        DataSet.prototype.setIndexes = function (value) {
            this._indexes = value;
        };
        DataSet.prototype.numberOfWinnersInRow = function (revealed) {
            var winners = 0;
            for (var i = 0; i < this._objects.length; i++) {
                for (var j = 0; j < revealed.length; j++) {
                    if (this._objects[i] == revealed[j]) {
                        winners++;
                    }
                }
            }
            return winners;
        };
        return DataSet;
    }());
    BOOM.DataSet = DataSet;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    (function (Direction) {
        Direction[Direction["left"] = 0] = "left";
        Direction[Direction["right"] = 1] = "right";
    })(BOOM.Direction || (BOOM.Direction = {}));
    var Direction = BOOM.Direction;
    var PopRevealTween = (function () {
        function PopRevealTween() {
            this._tweenAngles = [-10, -15, -13, 0];
            this._tweenPositions = [new Phaser.Point(-8, 0), new Phaser.Point(-13, 0), new Phaser.Point(-11, 0), new Phaser.Point(0, 0)];
        }
        PopRevealTween.prototype.scaleUpSymbol = function (popRevealParams) {
            popRevealParams.thingToTween.scale.set(0, 0);
            popRevealParams.thingToTween.visible = true;
            if (popRevealParams.direction === undefined) {
                popRevealParams.direction = Direction.left;
            }
            if (popRevealParams.upPositionTime === undefined) {
                popRevealParams.upPositionTime = 500;
            }
            if (popRevealParams.delay === undefined) {
                popRevealParams.delay = 0;
            }
            var myTweenAngles = [];
            var myTweenPosition = [];
            if (popRevealParams.direction == Direction.right) {
                for (var i = 0; i < this._tweenAngles.length; i++) {
                    myTweenAngles.push(-this._tweenAngles[i]);
                    myTweenPosition.push(new Phaser.Point(popRevealParams.tweenAroundPosition.x + -this._tweenPositions[i].x, popRevealParams.tweenAroundPosition.y + -this._tweenPositions[i].y));
                }
            }
            else {
                for (var i = 0; i < this._tweenAngles.length; i++) {
                    myTweenAngles.push(this._tweenAngles[i]);
                    myTweenPosition.push(new Phaser.Point(popRevealParams.tweenAroundPosition.x + this._tweenPositions[i].x, popRevealParams.tweenAroundPosition.y + this._tweenPositions[i].y));
                }
            }
            var symbolTweenUpIntoPoseScale = BOOM.GameManager.instance.add.tween(popRevealParams.thingToTween.scale).to({
                x: popRevealParams.maxSize.x * 1.5,
                y: popRevealParams.maxSize.y * 1.5,
            }, 70, Phaser.Easing.power2, false, popRevealParams.delay);
            var symbolTweenUpIntoPoseRotation = BOOM.GameManager.instance.add.tween(popRevealParams.thingToTween).to({
                angle: myTweenAngles[0],
                x: myTweenPosition[0].x,
                y: myTweenPosition[0].y
            }, 70, Phaser.Easing.power2, false, popRevealParams.delay);
            symbolTweenUpIntoPoseRotation.onComplete.add(function () {
                BOOM.GameManager.instance.tweens.remove(symbolTweenUpIntoPoseRotation);
                BOOM.GameManager.instance.tweens.remove(symbolTweenUpIntoPoseScale);
                symbolTweenUpPoseScale.start();
                symbolTweenUpPoseRotation.start();
            });
            var symbolTweenUpPoseScale = BOOM.GameManager.instance.add.tween(popRevealParams.thingToTween.scale).to({
                x: popRevealParams.maxSize.x * 1.8,
                y: popRevealParams.maxSize.y * 1.8,
            }, popRevealParams.upPositionTime, Phaser.Easing.power2, false, 0);
            var symbolTweenUpPoseRotation = BOOM.GameManager.instance.add.tween(popRevealParams.thingToTween).to({
                angle: myTweenAngles[1],
                x: myTweenPosition[1].x,
                y: myTweenPosition[1].y
            }, popRevealParams.upPositionTime, Phaser.Easing.power2, false, 0);
            symbolTweenUpPoseRotation.onComplete.add(function () {
                BOOM.GameManager.instance.tweens.remove(symbolTweenUpPoseScale);
                BOOM.GameManager.instance.tweens.remove(symbolTweenUpPoseRotation);
                if (popRevealParams.onComplete !== undefined) {
                    popRevealParams.onComplete();
                }
            });
            symbolTweenUpIntoPoseScale.start();
            symbolTweenUpIntoPoseRotation.start();
        };
        PopRevealTween.prototype.shadowObjectPulse = function (shadowObjectPulseParams) {
            shadowObjectPulseParams.gr_parent.addAt(shadowObjectPulseParams.secondayObject, shadowObjectPulseParams.gr_parent.getChildIndex(shadowObjectPulseParams.mainObject));
            shadowObjectPulseParams.secondayObject.grp_core_symbolImage.visible = true;
            shadowObjectPulseParams.secondayObject.position.x = shadowObjectPulseParams.mainObject.x;
            shadowObjectPulseParams.secondayObject.position.y = shadowObjectPulseParams.mainObject.y;
            shadowObjectPulseParams.secondayObject.angle = shadowObjectPulseParams.mainObject.angle;
            shadowObjectPulseParams.secondayObject.alpha = 1;
            var symbolImageScale = BOOM.GameManager.instance.add.tween(shadowObjectPulseParams.mainObject.scale).to({
                x: shadowObjectPulseParams.scaleBeforeTween.x - 0.2,
                y: shadowObjectPulseParams.scaleBeforeTween.y - 0.2
            }, 150, Phaser.Easing.power2, false, shadowObjectPulseParams.delay);
            symbolImageScale.chain(symbolImageScaleUp);
            var symbolImageScaleUp = BOOM.GameManager.instance.add.tween(shadowObjectPulseParams.mainObject.scale).to({
                x: shadowObjectPulseParams.scaleBeforeTween.x + 0.2,
                y: shadowObjectPulseParams.scaleBeforeTween.y + 0.2
            }, 150, Phaser.Easing.power2, false, shadowObjectPulseParams.delay);
            symbolImageScale.start();
            var symbolPulseScale = BOOM.GameManager.instance.add.tween(shadowObjectPulseParams.secondayObject.scale).to({
                x: 2,
                y: 2
            }, 500, Phaser.Easing.power2, false, shadowObjectPulseParams.delay);
            var symbolPulseAlpha = BOOM.GameManager.instance.add.tween(shadowObjectPulseParams.secondayObject).to({
                alpha: 0
            }, 500, Phaser.Easing.power2, false, shadowObjectPulseParams.delay);
            symbolPulseScale.onComplete.add(function () {
                shadowObjectPulseParams.secondayObject.destroy();
                if (shadowObjectPulseParams.onComplete !== undefined) {
                    shadowObjectPulseParams.onComplete();
                }
            });
            symbolPulseScale.start();
            symbolPulseAlpha.start();
        };
        PopRevealTween.prototype.tweenDownOFSymbolReveal = function (popDownParams) {
            if (popDownParams.direction === undefined) {
                popDownParams.direction = Direction.left;
            }
            if (popDownParams.delay === undefined) {
                popDownParams.delay = 0;
            }
            var myTweenAngles = [];
            var myTweenPosition = [];
            if (popDownParams.direction == Direction.right) {
                for (var i = 0; i < this._tweenAngles.length; i++) {
                    myTweenAngles.push(-this._tweenAngles[i]);
                    myTweenPosition.push(new Phaser.Point(popDownParams.tweenAroundPosition.x + -this._tweenPositions[i].x, popDownParams.tweenAroundPosition.y + -this._tweenPositions[i].y));
                }
            }
            else {
                for (var i = 0; i < this._tweenAngles.length; i++) {
                    myTweenAngles.push(this._tweenAngles[i]);
                    myTweenPosition.push(new Phaser.Point(popDownParams.tweenAroundPosition.x + this._tweenPositions[i].x, popDownParams.tweenAroundPosition.y + this._tweenPositions[i].y));
                }
            }
            var symbolTweenOutOFPoseScale = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: popDownParams.maxSize.x * 1.75,
                y: popDownParams.maxSize.y * 1.75,
            }, 250, Phaser.Easing.power2, false, 0);
            var symbolTweenOutOfPoseRotation = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[2],
                x: myTweenPosition[2].x,
                y: myTweenPosition[2].y
            }, 250, Phaser.Easing.power2, false, 0);
            symbolTweenOutOfPoseRotation.onComplete.add(function () {
                symbolTweenOutOFPoseScale2.start();
                moveRot.start();
            });
            var symbolTweenOutOFPoseScale2 = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: 1,
                y: 1
            }, 50, Phaser.Easing.power2, false, 0);
            var moveRot = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[2] * 0.3,
                x: myTweenPosition[2].x * 0.3,
                y: myTweenPosition[2].y * 0.3
            }, 50, Phaser.Easing.power2, false, 0);
            symbolTweenOutOFPoseScale2.onComplete.add(function () {
                DownScale.start();
                DownRot.start();
            });
            var DownScale = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: 0.95,
                y: 0.95
            }, 20, Phaser.Easing.power2, false, 0);
            var DownRot = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[2] * 0.3,
                x: myTweenPosition[2].x * 0.3,
                y: myTweenPosition[2].y * 0.3
            }, 20, Phaser.Easing.power2, false, 0);
            DownScale.onComplete.add(function () { bounceUp.start(); bounceUpRot.start(); });
            var bounceUp = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: 1.05,
                y: 1.05
            }, 70, Phaser.Easing.power2, false, 0);
            var bounceUpRot = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[2] * 0.2,
                x: myTweenPosition[2].x * 0.2,
                y: myTweenPosition[2].y * 0.2
            }, 70, Phaser.Easing.power2, false, 0);
            bounceUpRot.onComplete.add(function () { backToNorm.start(); backToNormRot.start(); });
            var backToNorm = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: 1,
                y: 1
            }, 20, Phaser.Easing.power2, false, 0);
            var backToNormRot = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[2] * 0.2,
                x: myTweenPosition[2].x * 0.2,
                y: myTweenPosition[2].y * 0.2
            }, 20, Phaser.Easing.power2, false, 0);
            backToNorm.onComplete.add(function () { smallBounce.start(); smallBounceRot.start(); });
            var smallBounce = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: 1.02,
                y: 1.02
            }, 20, Phaser.Easing.power2, false, 0);
            var smallBounceRot = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[2] * 0.1,
                x: myTweenPosition[2].x * 0.1,
                y: myTweenPosition[2].y * 0.1
            }, 20, Phaser.Easing.power2, false, 0);
            smallBounceRot.onComplete.add(function () { backToNorm2.start(); backToNormRot2.start(); });
            var backToNorm2 = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween.scale).to({
                x: 1,
                y: 1
            }, 20, Phaser.Easing.power2, false, 0);
            var backToNormRot2 = BOOM.GameManager.instance.add.tween(popDownParams.thingToTween).to({
                angle: myTweenAngles[3] * 1,
                x: myTweenPosition[3].x * 1,
                y: myTweenPosition[3].y * 1
            }, 20, Phaser.Easing.power2, false, 0);
            backToNorm2.onComplete.add(function () {
                if (popDownParams.onComplete !== undefined) {
                    popDownParams.onComplete();
                }
            }, this);
            symbolTweenOutOFPoseScale.start();
            symbolTweenOutOfPoseRotation.start();
        };
        return PopRevealTween;
    }());
    BOOM.PopRevealTween = PopRevealTween;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var PowerPulseTween = (function () {
        function PowerPulseTween() {
            this._doubleIdleAngles = [-2, -2, -2, 0];
            this._doublerIdleTweenXPositions = [-2, -3, -2, 0];
        }
        PowerPulseTween.prototype.powerPulseTweenMethod = function (powerPulseTweenParams) {
            var personalIdleAngles = [];
            var personalIdleTweenXPositions = [];
            if (powerPulseTweenParams.direction === undefined) {
                powerPulseTweenParams.direction = BOOM.Direction.left;
            }
            if (powerPulseTweenParams.delay === undefined) {
                powerPulseTweenParams.delay = 0;
            }
            if (powerPulseTweenParams.direction == BOOM.Direction.right) {
                for (var i = 0; i < this._doubleIdleAngles.length; i++) {
                    personalIdleAngles[i] = -this._doubleIdleAngles[i];
                }
                for (var i = 0; i < this._doublerIdleTweenXPositions.length; i++) {
                    personalIdleTweenXPositions[i] = powerPulseTweenParams.tweenAroundPosition.x + -this._doublerIdleTweenXPositions[i];
                }
            }
            else {
                for (var i = 0; i < this._doubleIdleAngles.length; i++) {
                    personalIdleAngles[i] = this._doubleIdleAngles[i];
                }
                for (var i = 0; i < this._doublerIdleTweenXPositions.length; i++) {
                    personalIdleTweenXPositions[i] = powerPulseTweenParams.tweenAroundPosition.x + this._doublerIdleTweenXPositions[i];
                }
            }
            var symbolTweenUp = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup.scale).to({
                x: 1.1,
                y: 1.1
            }, 1000, Phaser.Easing.power2, false, 0);
            var symbolTweenUpPos = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup).to({
                x: personalIdleTweenXPositions[0],
                angle: personalIdleAngles[0]
            }, 1000, Phaser.Easing.power2, false, 0);
            var symbolBackAlphaUp = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.bottomLayerGlow).to({
                alpha: 0.7
            }, 700, Phaser.Easing.power2, false, 300);
            var symbolFrontAlphaDownPoseUp = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.topLayerGlow).to({
                alpha: 0.1
            }, 200, Phaser.Easing.power2, false, 800);
            symbolBackAlphaUp.onComplete.add(function () {
                symbolTweenUpPose.start();
                symbolTweenUpPosePos.start();
                symbolBackAlphaPoseUp.start();
                symbolFrontAlphaPoseUp.start();
                if (powerPulseTweenParams.goingIntoUpPose !== undefined) {
                    powerPulseTweenParams.goingIntoUpPose();
                }
            });
            var symbolTweenUpPose = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup.scale).to({
                x: 1.12,
                y: 1.12
            }, 200, Phaser.Easing.power2, false, 0);
            var symbolTweenUpPosePos = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup).to({
                x: personalIdleTweenXPositions[1],
                angle: personalIdleAngles[1]
            }, 200, Phaser.Easing.power2, false, 0);
            var symbolBackAlphaPoseUp = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.bottomLayerGlow).to({
                alpha: 0.9
            }, 200, Phaser.Easing.power2, false, 0);
            var symbolFrontAlphaPoseUp = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.topLayerGlow).to({
                alpha: 0.5
            }, 200, Phaser.Easing.power2, false, 0);
            symbolFrontAlphaPoseUp.onComplete.add(function () {
                symbolTweenDropingOutPose.start();
                symbolTweenUpDropingOutPose.start();
                symbolBackAlphaDropingOutPose.start();
                symbolFrontAlphaDropingOutPose.start();
            });
            var symbolTweenDropingOutPose = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup.scale).to({
                x: 1.11,
                y: 1.11
            }, 400, Phaser.Easing.power2, false, 0);
            var symbolTweenUpDropingOutPose = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup).to({
                x: personalIdleTweenXPositions[2],
                angle: personalIdleAngles[2]
            }, 400, Phaser.Easing.power2, false, 0);
            var symbolBackAlphaDropingOutPose = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.bottomLayerGlow).to({
                alpha: 0.9
            }, 400, Phaser.Easing.power2, false, 0);
            var symbolFrontAlphaDropingOutPose = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.topLayerGlow).to({
                alpha: 0.4
            }, 400, Phaser.Easing.power2, false, 0);
            symbolFrontAlphaDropingOutPose.onComplete.add(function () {
                symbolFrontAlphaPoseDown.start();
                symbolBackAlphaDown.start();
                tweenSymbolGroupDown.start();
                symbolTweenBackDown.start();
                if (powerPulseTweenParams.goingOutOfUpPose !== undefined) {
                    powerPulseTweenParams.goingOutOfUpPose();
                }
            });
            var symbolFrontAlphaPoseDown = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.topLayerGlow).to({
                alpha: 0.1
            }, 500, Phaser.Easing.power2, false, 0);
            var symbolBackAlphaDown = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.bottomLayerGlow).to({
                alpha: 0.0
            }, 1000, Phaser.Easing.power2, false, 0);
            var tweenSymbolGroupDown = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.power2, false, 0);
            var symbolTweenBackDown = BOOM.GameManager.instance.add.tween(powerPulseTweenParams.containingGroup).to({
                x: personalIdleTweenXPositions[3],
                angle: 0
            }, 1000, Phaser.Easing.power2, false, 0);
            symbolTweenBackDown.onComplete.add(function () {
                if (powerPulseTweenParams.onComplete !== undefined) {
                    powerPulseTweenParams.onComplete();
                }
            });
            symbolTweenUp.start();
            symbolTweenUpPos.start();
            symbolBackAlphaUp.start();
            symbolFrontAlphaDownPoseUp.start();
        };
        return PowerPulseTween;
    }());
    BOOM.PowerPulseTween = PowerPulseTween;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var ReuseableTweens = (function () {
        function ReuseableTweens() {
            this.popRevealTweens = new BOOM.PopRevealTween();
            this.powerPulseTween = new BOOM.PowerPulseTween();
        }
        ReuseableTweens.prototype.flashWinText = function (textToCopy, grp_Parent, fontType, FlashSize, scaleUpSize, triggerRepeat) {
            if (textToCopy != null) {
                var slightScaleUp = BOOM.GameManager.instance.add.tween(textToCopy.scale).to({ x: scaleUpSize,
                    y: scaleUpSize }, 300, Phaser.Easing.power2, false, 0);
                slightScaleUp.onComplete.add(function () { slightScaleDown.start(); });
                var slightScaleDown = BOOM.GameManager.instance.add.tween(textToCopy.scale).to({ x: 1,
                    y: 1 }, 300, Phaser.Easing.power2, false, 0);
                var flashText = fontType;
                grp_Parent.addAt(flashText, grp_Parent.getChildIndex(textToCopy));
                flashText.x = textToCopy.x;
                flashText.y = textToCopy.y;
                flashText.angle = textToCopy.angle;
                flashText.scale.set(1, 1);
                flashText.fontSize = textToCopy.fontSize;
                flashText.alpha = 0.8;
                flashText.text = textToCopy.text;
                var revelMulti = BOOM.GameManager.instance.add.tween(flashText.scale).to({ x: FlashSize,
                    y: FlashSize }, 500, Phaser.Easing.power2, false, 0);
                var revelMultiAlpha = BOOM.GameManager.instance.add.tween(flashText).to({ alpha: 0 }, 500, Phaser.Easing.power2, false, 0);
                slightScaleUp.start();
                revelMulti.start();
                revelMultiAlpha.start();
                revelMulti.onComplete.add(function () { flashText.destroy(); if (triggerRepeat) {
                    BOOM.SignalManager.instance.dispatch("startFlashingAnimation");
                } });
            }
        };
        ;
        return ReuseableTweens;
    }());
    BOOM.ReuseableTweens = ReuseableTweens;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var T40_Ticket_Manager = (function () {
        function T40_Ticket_Manager() {
            this.hasInitialised = false;
            this.loadedTicket = false;
            this.development = false;
            this.ticketInfo = null;
            this.gameResultFromAPI = null;
            this.globalAudioVolume = 1;
            this.basePath = '/';
            this.finishURL = 'localhost:1234/index-dist.html';
            this.trialGame = 0;
            this.TotalNumTurns = -1;
            this.currentTurnNum = -1;
            this.prizeAmounts = [];
            this.outcomeAmount = -1;
            this.prizeTier = -1;
            this._hasWon = -1;
            this._game1Information = [];
            this._game2Information = [];
            this._outCome = null;
            this._ticket = null;
            this._params = null;
            this._upperCurrencySymbol = "$";
            this._lowerCurrencySymbol = "¢";
            this._dualSymbolCurrency = true;
        }
        T40_Ticket_Manager.prototype.init = function (input1) {
            this.ticketInfo = input1;
            if (this.ticketInfo === undefined) {
                this.ticketInfo = {
                    basePath: '',
                    ticket: '<?xml version="1.0" encoding="UTF-8" ?><ticket><outcome amount="250.00" tier="2" wT="1"/><params pList="35000,250,100,50,40,25,20,15,10,8,5,3"/><g1><go i="1" d0="4" d1="1" d2="4" p="3" w="0" /><go i="2" d0="5" d1="9" d2="2" p="5" w="0" /><go i="3" d0="6" d1="8" d2="5" p="4" w="0" /><go i="4" d0="7" d1="7" d2="10" p="11" w="0" /></g1><g2><go i="5" b0="3" b1="7" t="10" p="10" w="1" /><go i="6" b0="3" b1="9" t="12" p="5" w="0" /><go i="7" b0="7" b1="1" t="8" p="5" w="0" /><go i="8" b0="9" b1="6" t="15" p="0" w="0" /></g2></ticket>',
                    finishURL: ''
                };
            }
            return this.initTicket();
        };
        T40_Ticket_Manager.prototype.initTicket = function () {
            var xml = this.ticketInfo.ticket;
            xml = (new DOMParser).parseFromString(xml, 'text/xml');
            var gameResultFromAPI = this.xmlToJson(xml);
            if (gameResultFromAPI === null || gameResultFromAPI === undefined) {
                console.error("No valid instantGameBetResult passed into ticketmanager. \nGame has terminated.");
                return false;
            }
            this.basePath = this.ticketInfo.basePath;
            this.finishURL = this.ticketInfo.finishURL;
            this.outcomeAmount = +gameResultFromAPI.ticket.outcome['@attributes']['amount'];
            this.prizeTier = +gameResultFromAPI.ticket.outcome['@attributes']['tier'];
            var pl = gameResultFromAPI.ticket.params['@attributes'].pList;
            this.prizeAmounts = pl.split(',');
            this._hasWon = +gameResultFromAPI.ticket.outcome['@attributes']['wT'];
            if (gameResultFromAPI.ticket.outcome['@attributes']['amount'] !== undefined) {
                this.trialGame = (+gameResultFromAPI.ticket.outcome['@attributes']['try'] === 1) ? 1 : 0;
            }
            this.TotalNumTurns = +gameResultFromAPI.ticket.g1.go.length;
            this._game1Information = [];
            for (var i = 0; i < this.TotalNumTurns; i++) {
                var gameRow = ({
                    i: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['i'],
                    a: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['s0'],
                    b: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['s1'],
                    w: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['w'],
                    value: +this.prizeAmounts[parseInt(gameResultFromAPI.ticket.g1.go[i]['@attributes']['p'])]
                });
                this._game1Information.push(gameRow);
            }
            this._params = ({
                wT: this._hasWon,
                stake: 2
            });
            this._outCome = ({
                amount: this.outcomeAmount,
                prizeTier: this.prizeTier
            });
            this._ticket = ({
                outcome: this._outCome,
                params: this._params,
                turns: this._game1Information
            });
            BOOM.GameManager.instance.getTicketManager().setTicket(this._ticket);
            this.currentTurnNum = 0;
            this.loadedTicket = true;
            gameResultFromAPI = null;
            return true;
        };
        T40_Ticket_Manager.prototype.xmlToJson = function (xml) {
            var attr, child, attrs = xml.attributes, children = xml.childNodes, key = xml.nodeType, obj = {}, i = -1;
            if (key == 1 && attrs.length) {
                obj[key = '@attributes'] = {};
                while (attr = attrs.item(++i)) {
                    obj[key][attr.nodeName] = attr.nodeValue;
                }
                i = -1;
            }
            else if (key == 3) {
                obj = xml.nodeValue;
            }
            while (child = children.item(++i)) {
                key = child.nodeName;
                if (obj.hasOwnProperty(key)) {
                    if (obj.toString.call(obj[key]) != '[object Array]') {
                        obj[key] = [obj[key]];
                    }
                    obj[key].push(this.xmlToJson(child));
                }
                else {
                    obj[key] = this.xmlToJson(child);
                }
            }
            return obj;
        };
        T40_Ticket_Manager.prototype.gameFinished = function () {
            this._flushTicketData();
        };
        ;
        T40_Ticket_Manager.prototype.isWinningGame = function () {
            if (this._hasWon == 1) {
                return true;
            }
            else {
                return false;
            }
        };
        T40_Ticket_Manager.prototype.getIsTrial = function () {
            return this.trialGame;
        };
        T40_Ticket_Manager.prototype._flushTicketData = function () {
            this.loadedTicket = false;
        };
        ;
        T40_Ticket_Manager.prototype.isDualCurrency = function () {
            return this._dualSymbolCurrency;
        };
        T40_Ticket_Manager.prototype.getUpperCurrencySymbol = function () {
            return this._upperCurrencySymbol;
        };
        T40_Ticket_Manager.prototype.getLowerCurrencySymbol = function () {
            return this._lowerCurrencySymbol;
        };
        return T40_Ticket_Manager;
    }());
    BOOM.T40_Ticket_Manager = T40_Ticket_Manager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var ErrorManager = (function () {
        function ErrorManager() {
        }
        ErrorManager.prototype.fire = function (errorCode, errorMessage, severity) {
            switch (severity) {
                case 0:
                    if (BOOM.GameManager.DEBUG) {
                        console.error("[CRITICAL] Error: " + errorCode + " Description: " + errorMessage);
                    }
                    else {
                        console.error("[CRITICAL] Error: " + errorCode);
                    }
                    break;
                case 1:
                    if (BOOM.GameManager.DEBUG) {
                        console.error("[SEVERE] Error: " + errorCode + " Description: " + errorMessage);
                    }
                    else {
                        console.error("[SEVERE] Error: " + errorCode);
                    }
                    break;
                case 2:
                    break;
            }
        };
        return ErrorManager;
    }());
    BOOM.ErrorManager = ErrorManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var CurrencySymbols = (function () {
        function CurrencySymbols() {
        }
        return CurrencySymbols;
    }());
    BOOM.CurrencySymbols = CurrencySymbols;
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager(loader, basePath) {
            _super.call(this, GameManager.NATIVE_WIDTH, GameManager.NATIVE_HEIGHT, Phaser.AUTO, 'IWGholder', true, true);
            this._currentTurnIndex = -1;
            this._completedGameRows = 0;
            this._basePath = "";
            this._signalManager = null;
            this._helper = new BOOM.Helper();
            this._ticketManager = new BOOM.TicketManager();
            this._ticket = new BOOM.Ticket();
            this._errorManager = new BOOM.ErrorManager();
            this._debugManager = null;
            this._legendManager = null;
            this._boot = new BOOM.Boot();
            this._preloader = new BOOM.CamelotPreloader();
            this._mainGame = new BOOM.MainGame();
            this.audioManager = null;
            this.reuseTweens = null;
            this._gameIsErrorFree = false;
            this._ticketIsErrorFree = false;
            this.currentStake = -1;
            this._mainGameAnimsFinished = 0;
            this._betSceneAnimsFinished = 0;
            this._endWinAnimsFinished = 0;
            this._endLoseAnimsFinished = 0;
            this._lastPlacedBet = -1;
            this._symbolsRevealedNumber = 0;
            this._isRevealingSymbol = false;
            this._queue = new collections.Queue();
            this._clickCount = 0;
            this._lastSymbolRevealed = false;
            this.symbolsRevealedNumber = 0;
            if (GameManager.instance === null) {
                throw new Error("Tried to make a game manager when one already existed. To use GameManager, use GameManager.instance ");
            }
            else {
                GameManager.instance = this;
                this.reuseTweens = new BOOM.ReuseableTweens();
                this._basePath = loader.basePath;
                this._debugManager = new BOOM.Debug();
                BOOM.Debug.ALL();
                this._signalManager = new BOOM.SignalManager();
                this.audioManager = new BOOM.AudioManager(this);
                this.currentStake = 2;
                this.state.add('Boot', this._boot, false);
                this.state.add('Preloader', this._preloader, false);
                this.state.add('MainGame', this._mainGame, false);
                this._subscribeSignals();
                this.state.start('Boot');
            }
        }
        ;
        GameManager.prototype._subscribeSignals = function () {
            BOOM.SignalManager.instance.add('switchStateSignal', this._switchState, this);
            BOOM.SignalManager.instance.add('updateCompletedGameRows', this._updateCompletedGameRows, this);
            BOOM.SignalManager.instance.add('pauseAllTweens', this._pauseAllTweens, this);
            BOOM.SignalManager.instance.add('resumeAllTweens', this._resumeAllTweens, this);
        };
        ;
        GameManager.prototype._unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('switchStateSignal', this._switchState, this);
            BOOM.SignalManager.instance.remove('updateCompletedGameRows', this._updateCompletedGameRows, this);
            BOOM.SignalManager.instance.remove('pauseAllTweens', this._pauseAllTweens, this);
            BOOM.SignalManager.instance.remove('resumeAllTweens', this._resumeAllTweens, this);
        };
        ;
        GameManager.prototype.getNextGameRow = function () {
            this._currentTurnIndex++;
            return this._ticketManager.getTurn(this._currentTurnIndex);
        };
        ;
        GameManager.prototype.checkIfMainGameIntroFinished = function () {
            this._mainGameAnimsFinished++;
            if (this._mainGameAnimsFinished >= BOOM.SignalManager.instance.get('initMainGame').getNumListeners()) {
                this._mainGameAnimsFinished = 0;
                BOOM.SignalManager.instance.dispatch('mainGameReady');
            }
        };
        ;
        GameManager.prototype.showWinPanelWhenAnimsFinished = function () {
            this._endWinAnimsFinished++;
            if (this._endWinAnimsFinished >= BOOM.SignalManager.instance.get('animateToEndWin').getNumListeners()) {
                this._endWinAnimsFinished = 0;
                BOOM.SignalManager.instance.dispatch('onAllEndWinAnims');
            }
        };
        ;
        GameManager.prototype.showLosePanelWhenAnimsFinished = function () {
            this._endLoseAnimsFinished++;
            if (this._endLoseAnimsFinished >= BOOM.SignalManager.instance.get('animateToEndLose').getNumListeners()) {
                this._endLoseAnimsFinished = 0;
                BOOM.SignalManager.instance.dispatch('onAllLoseAnims');
            }
        };
        ;
        GameManager.prototype._switchState = function (state, clearWorld, clearCache) {
            if (clearWorld === void 0) { clearWorld = true; }
            if (clearCache === void 0) { clearCache = false; }
            this.state.start(state, clearWorld, clearCache);
        };
        ;
        GameManager.prototype._updateCompletedGameRows = function () {
            var _this = this;
            this._completedGameRows++;
            if (this._completedGameRows == 6) {
                var t = this.time.create(true);
                t.add(1000, function () {
                    if (_this._ticketManager.getIsWinner()) {
                        BOOM.SignalManager.instance.dispatch('animateToEndWin', GameManager.instance.showWinPanelWhenAnimsFinished, GameManager.instance);
                        BOOM.SignalManager.instance.dispatch('gameFinished');
                    }
                    else {
                        BOOM.SignalManager.instance.dispatch('animateToEndLose', GameManager.instance.showLosePanelWhenAnimsFinished, GameManager.instance);
                        BOOM.SignalManager.instance.dispatch('gameFinished');
                    }
                }, this);
                t.start();
            }
        };
        ;
        GameManager.prototype.getBasePath = function () {
            return this._basePath;
        };
        GameManager.prototype.getRandomNumberPosOrNeg = function (range) {
            var randomNumber = Math.random();
            if (Math.random() > 0.5) {
                randomNumber = -randomNumber;
            }
            randomNumber *= range;
            return randomNumber;
        };
        ;
        GameManager.prototype._pauseAllTweens = function () {
            GameManager.instance.tweens.pauseAll();
        };
        GameManager.prototype._resumeAllTweens = function () {
            GameManager.instance.tweens.resumeAll();
        };
        GameManager.prototype.getTicketManager = function () {
            return this._ticketManager;
        };
        GameManager.prototype.getErrorManager = function () {
            return this._errorManager;
        };
        GameManager.prototype.message = function (messageIn) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (GameManager.DEBUG) {
                console.log(messageIn, args);
            }
        };
        GameManager.prototype.getAudioManager = function () {
            return this.audioManager;
        };
        ;
        GameManager.prototype.incClickCount = function () {
            this._clickCount++;
            BOOM.SignalManager.instance.dispatch('decGoesLeft');
            if (this._clickCount === 18) {
                BOOM.SignalManager.instance.dispatch('disableTiles', [false]);
            }
            return this._clickCount;
        };
        GameManager.prototype.stopAudio = function () {
        };
        GameManager.NATIVE_HEIGHT = 640;
        GameManager.NATIVE_WIDTH = 960;
        GameManager.DEBUG = false;
        GameManager.OFFLINE = true;
        return GameManager;
    }(Phaser.Game));
    BOOM.GameManager = GameManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Clover = (function (_super) {
        __extends(Clover, _super);
        function Clover(_index, _x, _y, _data) {
            if (_index === void 0) { _index = 0; }
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            if (_data === void 0) { _data = null; }
            _super.call(this);
            this._index = _index;
            this._x = _x;
            this._y = _y;
            this._data = _data;
            this._value = 0;
            this._clover = null;
            this._winClover = null;
            this._shimmer = null;
            this._amount = null;
            this._wordPrize = null;
            this._tileArray = [];
            this._matched = 0;
            this._winnerWinnerChickenDinner = false;
            this._create();
        }
        Clover.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('cloverShuffle', this._showTiles, this);
            BOOM.SignalManager.instance.add('checkLegend', this._checkLegend, this);
        };
        ;
        Clover.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('cloverShuffle', this._showTiles, this);
            BOOM.SignalManager.instance.remove('checkLegend', this._checkLegend, this);
        };
        ;
        Clover.prototype._create = function () {
            this.position.setTo(this._x, this._y);
            this.pivot.set(0.5, 0.5);
            this._clover = this.game.add.sprite(0, 0, "masterSS", "clover.png", this);
            this._clover.anchor.setTo(0.5, 0.5);
            this._winClover = this.game.add.sprite(0, 0, "masterSS", "clover_highlight.png", this);
            this._winClover.anchor.setTo(0.5, 0.5);
            this._winClover.alpha = 0;
            this._shimmer = this.game.add.sprite(0, 0, "masterSS", "shimmer0001.png", this);
            this._shimmer.anchor.setTo(0.5, 0.5);
            this._shimmer.animations.add('shimmer', Phaser.Animation.generateFrameNames('shimmer', 0, 25, '.png', 4), 30, true);
            var title = this.game.add.sprite(0, -75, "masterSS", "game" + (this._index + 1) + ".png", this);
            title.anchor.setTo(0.5, 0.5);
            var tilePos = [
                [-30, -30],
                [30, -30],
                [-30, 30],
                [30, 30]
            ];
            for (var i = 0; i < tilePos.length; i++) {
                var element = new BOOM.Tile(tilePos[i][0], tilePos[i][1], "?", "tile.png");
                element.reverseText = this._data.tileNumbers[i];
                this.add(element);
                this._tileArray.push(element);
            }
            this._wordPrize = this.game.add.sprite(0, 80, "masterSS", "word_prize.png", this);
            this._wordPrize.anchor.setTo(0.5, 0.5);
            var amount;
            this._value = amount = BOOM.Ticket.instance.getPrizeAmount(this._data.prize);
            this._amount = this.game.add.bitmapText(-4, 70, "prize-export", "£" + BOOM.Helper.formatCurrency(amount), 42);
            this._amount.anchor.setTo(0.5, 0.5);
            this.add(this._amount);
            this._amount.alpha = 0;
        };
        Clover.prototype._showAmount = function () {
            this.game.add.tween(this._wordPrize).to({ alpha: 0 }, 500, "Linear", true);
            this.game.add.tween(this._amount).to({ alpha: 1 }, 500, "Linear", true);
        };
        Clover.prototype._showTiles = function () {
            var _this = this;
            var delay = 0;
            for (var i = 0; i < this._tileArray.length; i++) {
                var tile = this._tileArray[i];
                delay = (this._index * 200) + i * 100;
                tile.flip(delay, null, this._data.tileNumbers[i]);
            }
            var timer = this.game.time.create(true);
            timer.add(delay, function () {
                _this._showAmount();
                BOOM.SignalManager.instance.dispatch('cloverFinished');
            }, this);
            timer.start();
        };
        Clover.prototype._checkLegend = function (turnData) {
            var _this = this;
            for (var i = 0; i < this._tileArray.length; i++) {
                var tile = this._tileArray[i];
                if (Number(turnData.t) === Number(tile.reverseText)) {
                    this._matched++;
                    var turnFace = "tile_turned.png";
                    if (Number(turnData.m) > 0) {
                        turnFace = "tile_mx4.png";
                        this._value = this._value * Number(turnData.m);
                        var fadeOff = this.game.add.tween(this._amount).to({ alpha: 0 }, 500, "Linear", true);
                        fadeOff.onComplete.add(function () {
                            _this._amount.text = _this._amount.text + "x" + turnData.m;
                            var fadeOn = _this.game.add.tween(_this._amount).to({ alpha: 1 }, 500, "Linear", true);
                        }, this);
                    }
                    if (Number(turnData.m) > 0) {
                        var multiString = "mx" + turnData.m + ".png";
                    }
                    tile.matched(1500, turnFace, turnData.m);
                    tile.setHighlight = "tile_highlight.png";
                    tile.highlight.alpha = 0;
                    tile.highlight.sendToBack();
                    this.game.add.tween(tile.highlight).to({ alpha: 1 }, 500, "Linear", true, 2000);
                }
            }
            if (this._matched === 4) {
                if (this._winnerWinnerChickenDinner === false) {
                    this._winnerWinnerChickenDinner = true;
                    this._winningClover();
                }
            }
        };
        Clover.prototype._winningClover = function () {
            var _this = this;
            com.camelot.core.IWG.ame('bank', { deposit: [this._value] });
            var winner = this.game.add.tween(this._winClover).to({ alpha: 1 }, 500, "Linear", true, 2000, 3, true);
            winner.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
            }, this);
            winner.onComplete.add(function () {
                var highlight = _this.game.add.bitmapText(-4, 70, "prize_win-export", _this._amount.text, 42);
                highlight.anchor.setTo(0.5, 0.5);
                _this.add(highlight);
                highlight.alpha = 0;
                _this.game.add.tween(_this._winClover).to({ alpha: 1 }, 500, "Linear", true);
                for (var j = 0; j < _this._tileArray.length; j++) {
                    var tile = _this._tileArray[j];
                    _this.game.add.tween(tile.highlight).to({ alpha: 0 }, 500, "Linear", true);
                }
                _this.game.add.tween(highlight).to({ alpha: 1 }, 500, "Linear", true);
                _this.game.add.tween(_this._clover).to({ alpha: 0 }, 500, "Linear", true);
                _this._shimmer.animations.play('shimmer');
            }, this);
        };
        return Clover;
    }(BOOM.GameGroup));
    BOOM.Clover = Clover;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SoundButton = (function (_super) {
        __extends(SoundButton, _super);
        function SoundButton() {
            _super.call(this);
            this._button = null;
            this._active = true;
            this.init();
            this.subscribeSignals();
        }
        SoundButton.prototype.init = function () {
            this._button = this.game.add.image(0, 0, "masterSS", "sound_on.png", this);
            this._button.anchor.setTo(0.5, 0.5);
            this._button.inputEnabled = true;
            this._button.input.useHandCursor = true;
            this._button.events.onInputUp.add(function () {
                this._buttonPress();
            }, this);
        };
        SoundButton.prototype._buttonPress = function () {
            if (this._active) {
                this._button.loadTexture("masterSS", "sound_off.png");
                this.game.sound.mute = true;
                this._active = false;
            }
            else {
                this._button.loadTexture("masterSS", "sound_on.png");
                this.game.sound.mute = false;
                this._active = true;
            }
        };
        SoundButton.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('moveSoundButton', this._move, this);
            BOOM.SignalManager.instance.add('endGameShow', this._remove, this);
        };
        ;
        SoundButton.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('moveSoundButton', this._move, this);
            BOOM.SignalManager.instance.remove('endGameShow', this._remove, this);
        };
        ;
        SoundButton.prototype._move = function () {
            var _this = this;
            var tween = this.game.add.tween(this).to({ alpha: 0 }, 300, "Linear", true, 0);
            tween.onComplete.add(function () {
                _this.position.setTo(40, 240);
                _this.game.add.tween(_this).to({ alpha: 1 }, 300, "Linear", true, 300);
            }, this);
        };
        SoundButton.prototype._remove = function () {
            var tween = this.game.add.tween(this).to({ alpha: 0 }, 300, "Linear", true, 0);
            this._active = false;
        };
        return SoundButton;
    }(BOOM.GameGroup));
    BOOM.SoundButton = SoundButton;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Preloader_Core = (function (_super) {
        __extends(Preloader_Core, _super);
        function Preloader_Core() {
            _super.apply(this, arguments);
        }
        Preloader_Core.prototype.preload = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] [preload] Preloader CORE preloading...', 'core');
            _super.prototype.preload.call(this);
        };
        Preloader_Core.prototype.create = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] [create] Preloader CORE creating...', 'core');
            _super.prototype.create.call(this);
            this.stage.disableVisibilityChange = true;
            this.game.load.reset();
            this.setupLoadingScene();
            this.addAssetsToLoad();
            this.game.load.onFileStart.add(this.fileStarted, this);
            this.game.load.onFileComplete.add(this.fileLoaded, this);
            this.game.load.onFileError.add(this.fileFailed, this);
            this.game.load.onLoadComplete.add(this.onLoad, this);
            this.load.start();
        };
        Preloader_Core.prototype.setupLoadingScene = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] [preload] Setting up loading scene...', 'preload');
        };
        Preloader_Core.prototype.addAssetsToLoad = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] [preload] Adding assets to load...', 'preload');
        };
        Preloader_Core.prototype.fileStarted = function (progress, cacheKey, fileurl) {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.filestarted(' + progress + ', ' + cacheKey + ', ' + fileurl + ')', 'preload');
        };
        Preloader_Core.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileLoaded(' + progress + ', ' + cacheKey + ', ' + success + ', ' + totalLoaded + ', ' + totalFiles + ')', 'preload');
        };
        Preloader_Core.prototype.fileFailed = function (cacheKey, errorObj) {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileFailed(' + cacheKey + errorObj + ')', 'preload');
        };
        Preloader_Core.prototype.onLoad = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.onLoad()', 'preload');
        };
        return Preloader_Core;
    }(Phaser.State));
    BOOM.Preloader_Core = Preloader_Core;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Spinner = (function () {
        function Spinner() {
            this._hasBeenHidden = false;
            this._spinner = document.createElement("div");
            this._spinnerCircle = document.createElement("div");
            this._spinner.id = "spinner";
            this._spinner.className = "hide";
            this._spinnerCircle.id = "spinnerCircle";
            this._spinnerCircle.className = "circle";
            this._spinner.appendChild(this._spinnerCircle);
            document.body.appendChild(this._spinner);
            this.showSpinner();
        }
        ;
        Spinner.prototype.hideSpinner = function () {
            this._hasBeenHidden = true;
            this._spinner.className = "hide";
        };
        Spinner.prototype.showSpinner = function () {
            this._hasBeenHidden = false;
            this._time = BOOM.GameManager.instance.time.create(true);
            this._time.add(1000, function () {
                if (!this._hasBeenHidden) {
                    this.showSpinnerImmediately();
                }
            }, this);
            this._time.start();
        };
        Spinner.prototype.showSpinnerImmediately = function () {
            this._spinner.className = "show";
        };
        return Spinner;
    }());
    BOOM.Spinner = Spinner;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameFonts = (function () {
        function GameFonts() {
        }
        GameFonts.createStandardFont = function () {
            var standardFont = BOOM.GameManager.instance.make.text(0, 0, "");
            standardFont.anchor.set(0.5);
            standardFont.align = 'center';
            standardFont.font = 'Noto Sans';
            standardFont.fontSize = 30;
            standardFont.fill = '#ffffff';
            standardFont.stroke = '##00334d';
            standardFont.strokeThickness = 4;
            return standardFont;
        };
        GameFonts.createMultiplierWinFont = function () {
            var multiplierWinFont = BOOM.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'Noto Sans';
            multiplierWinFont.fontSize = 32;
            multiplierWinFont.fontWeight = 'bold';
            multiplierWinFont.fill = '#00334d';
            multiplierWinFont.stroke = '#FFFFFF';
            multiplierWinFont.strokeThickness = 4;
            return multiplierWinFont;
        };
        GameFonts.createEndWinFont = function () {
            var multiplierWinFont = BOOM.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'Noto Sans';
            multiplierWinFont.fontSize = 32;
            multiplierWinFont.fontWeight = 'bold';
            multiplierWinFont.fill = '#ffffff';
            multiplierWinFont.stroke = '#402503';
            multiplierWinFont.strokeThickness = 7;
            return multiplierWinFont;
        };
        GameFonts.flashWinText = function (textToCopy, grp_Parent, fontType, FlashSize, scaleUpSize, triggerRepeat) {
            if (textToCopy != null) {
                var slightScaleUp = BOOM.GameManager.instance.add.tween(textToCopy.scale).to({ x: scaleUpSize,
                    y: scaleUpSize }, 300, Phaser.Easing.power2, false, 0);
                slightScaleUp.onComplete.add(function () { slightScaleDown.start(); });
                var slightScaleDown = BOOM.GameManager.instance.add.tween(textToCopy.scale).to({ x: 1,
                    y: 1 }, 300, Phaser.Easing.power2, false, 0);
                var flashText = fontType;
                grp_Parent.addAt(flashText, grp_Parent.getChildIndex(textToCopy));
                flashText.x = textToCopy.x;
                flashText.y = textToCopy.y;
                flashText.scale.set(1, 1);
                flashText.fontSize = textToCopy.fontSize;
                flashText.alpha = 0.8;
                flashText.text = textToCopy.text;
                var revelMulti = BOOM.GameManager.instance.add.tween(flashText.scale).to({ x: FlashSize,
                    y: FlashSize }, 500, Phaser.Easing.power2, false, 0);
                var revelMultiAlpha = BOOM.GameManager.instance.add.tween(flashText).to({ alpha: 0 }, 500, Phaser.Easing.power2, false, 0);
                slightScaleUp.start();
                revelMulti.start();
                revelMultiAlpha.start();
                revelMulti.onComplete.add(function () { flashText.destroy(); if (triggerRepeat) {
                    BOOM.SignalManager.instance.dispatch('startFlashingAnimation');
                } });
            }
        };
        return GameFonts;
    }());
    BOOM.GameFonts = GameFonts;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var IdleController = (function (_super) {
        __extends(IdleController, _super);
        function IdleController() {
            _super.call(this);
            this.contolledIdles = [];
        }
        IdleController.prototype.coreIdleEvent = function () {
            _super.prototype.coreIdleEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreIdleEvent();
                }
            }
        };
        IdleController.prototype.coreStopIdleEvent = function () {
            _super.prototype.coreStopIdleEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreStopIdleEvent();
                }
            }
        };
        IdleController.prototype.coreIdleInteruptedEvent = function () {
            _super.prototype.coreIdleInteruptedEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreIdleInteruptedEvent();
                }
            }
        };
        IdleController.prototype.coreIdleTimeOutEvent = function () {
            _super.prototype.coreIdleTimeOutEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreIdleTimeOutEvent();
                }
            }
        };
        IdleController.prototype.addTooControlledIdlesArray = function (idleClass) {
            this.contolledIdles.push(idleClass);
        };
        IdleController.prototype.removeIdleClass = function (idleClass) {
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (idleClass == this.contolledIdles[i]) {
                    this.contolledIdles.splice(i, 1);
                }
            }
        };
        IdleController.prototype._fireEventCheck = function (idleClass) {
            if (idleClass.getUseIdleStatus() && idleClass.getIdleControlled()) {
                return true;
            }
            else {
                return false;
            }
        };
        return IdleController;
    }(BOOM.IdleClass));
    BOOM.IdleController = IdleController;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var PanelClass = (function (_super) {
        __extends(PanelClass, _super);
        function PanelClass(panelParams) {
            _super.call(this);
            this.buttonsArray = [];
            this.panelBackground = null;
            this.revealed = null;
            this.buttonsGroup = null;
            this.idleController = null;
            if (panelParams.sheetName !== undefined && panelParams.backGroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(BOOM.GameManager.instance, 0, 0, panelParams.sheetName, panelParams.backGroundImageString);
                this.add(this.panelBackground);
            }
            else if (panelParams.sheetName === undefined && panelParams.backGroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(BOOM.GameManager.instance, 0, 0, panelParams.backGroundImageString);
                this.add(this.panelBackground);
            }
            else {
            }
            this.revealed = false;
            this.buttonsGroup = new Phaser.Group(BOOM.GameManager.instance);
            this.add(this.buttonsGroup);
            this.idleController = new BOOM.IdleController();
        }
        PanelClass.prototype.subscribeSignals = function () {
        };
        ;
        PanelClass.prototype.unsubscribeSignals = function () {
        };
        ;
        ;
        PanelClass.prototype.addButtonsToArrayAndGroup = function (buttons) {
            for (var i = 0; i < buttons.length; i++) {
                this.buttonsArray.push(buttons[i]);
                this.buttonsGroup.add(buttons[i]);
            }
        };
        ;
        PanelClass.prototype.show = function (enableButtons) {
            if (enableButtons === void 0) { enableButtons = true; }
            if (enableButtons) {
                this.enableButtons();
            }
            this.revealed = true;
            this.visible = true;
        };
        ;
        PanelClass.prototype.hide = function (disableButtons) {
            if (disableButtons === void 0) { disableButtons = true; }
            if (disableButtons) {
                this.disableButtons();
            }
            this.revealed = false;
            this.visible = false;
        };
        ;
        PanelClass.prototype.disableButtons = function () {
            for (var i = 0; i < this.buttonsArray.length; i++) {
                this.buttonsArray[i].disableButton();
            }
        };
        ;
        PanelClass.prototype.enableButtons = function () {
            for (var i = 0; i < this.buttonsArray.length; i++) {
                this.buttonsArray[i].enableButton();
            }
        };
        ;
        PanelClass.prototype.simulateClickAllButtons = function () {
            var counter = 0;
            for (var i = 0; i < this.buttonsArray.length; i++) {
                if (this.buttonsArray[i].buttonEnabledStatus) {
                    this.buttonsArray[i].disableButton();
                    this.simulateClickWithDelay(this.buttonsArray[i], 300 * counter);
                    counter++;
                }
            }
        };
        PanelClass.prototype.simulateClickWithDelay = function (symbolToReveal, delay) {
            var revealTimer = BOOM.GameManager.instance.time.create(true);
            revealTimer.add(delay, function () {
                symbolToReveal.simulateClick(false);
            }, this);
            revealTimer.start();
        };
        return PanelClass;
    }(BOOM.GameGroup));
    BOOM.PanelClass = PanelClass;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Particle = (function () {
        function Particle(frameNames, maxParticles, xSpeed, ySpeed, xOffset, yOffset, gravity, width, height, maxScale, minScale, scaleFadeNumber, alpha, alphaFadeNumber, rotation) {
            if (frameNames === void 0) { frameNames = []; }
            if (maxParticles === void 0) { maxParticles = 1; }
            if (xSpeed === void 0) { xSpeed = { min: 200, max: 200 }; }
            if (ySpeed === void 0) { ySpeed = { min: 200, max: 200 }; }
            if (xOffset === void 0) { xOffset = 0; }
            if (yOffset === void 0) { yOffset = 0; }
            if (gravity === void 0) { gravity = 2000; }
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            if (maxScale === void 0) { maxScale = 1; }
            if (minScale === void 0) { minScale = 1; }
            if (scaleFadeNumber === void 0) { scaleFadeNumber = null; }
            if (alpha === void 0) { alpha = 1; }
            if (alphaFadeNumber === void 0) { alphaFadeNumber = null; }
            if (rotation === void 0) { rotation = 90; }
            this.frameNames = frameNames;
            this.maxParticles = maxParticles;
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
            this.maxScale = maxScale;
            this.minScale = minScale;
            this.scaleFadeNum = scaleFadeNumber;
            this.alpha = alpha;
            this.alphaFadeNum = alphaFadeNumber;
            this.xOffset = xOffset;
            this.yOffset = yOffset;
            this.gravity = gravity;
            this.width = width;
            this.height = height;
            this.rotation = rotation;
        }
        return Particle;
    }());
    BOOM.Particle = Particle;
    ;
    var Reveals = (function () {
        function Reveals() {
        }
        Reveals.Pop_Reveal = function (objToAnimate, objToFinish, group, key, frames, onCompleteListener, onCompleteContext) {
            if (key === void 0) { key = null; }
            if (frames === void 0) { frames = null; }
            if (onCompleteListener === void 0) { onCompleteListener = function () { }; }
            if (onCompleteContext === void 0) { onCompleteContext = this; }
            var params = [];
            for (var _i = 7; _i < arguments.length; _i++) {
                params[_i - 7] = arguments[_i];
            }
            var anim = new (RevealAnimations.bind.apply(RevealAnimations, [void 0].concat([onCompleteListener, onCompleteContext], params)))();
            anim.Pop_Reveal(objToAnimate, objToFinish, group, key, frames);
        };
        ;
        Reveals.Explode_Reveal = function () {
        };
        ;
        Reveals.Hidden_Lasers = function () {
        };
        ;
        return Reveals;
    }());
    BOOM.Reveals = Reveals;
    var RevealAnimations = (function () {
        function RevealAnimations(onCompleteListener, onCompleteContext) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            this._onCompleteFunc = null;
            this._onCompleteScope = null;
            this._onCompleteParams = null;
            this._onCompleteFunc = onCompleteListener;
            this._onCompleteScope = onCompleteContext;
            this._onCompleteParams = params;
        }
        RevealAnimations.prototype.Pop_Reveal = function (objToAnimate, objToFinish, group, key, frames) {
            var _this = this;
            if (key === void 0) { key = null; }
            if (frames === void 0) { frames = null; }
            var emittersCreates = [];
            var t = BOOM.GameManager.instance.time.create(true);
            var fadeOutAnimation = BOOM.GameManager.instance.add.tween(objToAnimate).to({ alpha: 0 }, 80, Phaser.Easing.Linear.None, true);
            fadeOutAnimation.onComplete.add(function () {
                _this._onCompleteFunc.bind(_this._onCompleteScope).apply(void 0, _this._onCompleteParams);
            }, this);
            frames.forEach(function (frame) {
                var newEmitter = group.game.add.emitter(objToAnimate.world.x + frame.xOffset, objToAnimate.world.y + frame.yOffset);
                newEmitter.height = frame.height;
                newEmitter.width = frame.width;
                newEmitter.setXSpeed(frame.xSpeed.min, frame.xSpeed.max);
                newEmitter.setYSpeed(frame.ySpeed.min, frame.ySpeed.max);
                newEmitter.gravity = frame.gravity;
                newEmitter.setScale(frame.minScale, frame.maxScale, frame.minScale, frame.maxScale, frame.alphaFadeNum);
                newEmitter.setRotation(-frame.rotation, frame.rotation);
                newEmitter.makeParticles(key, frame.frameNames);
                if (frame.alphaFadeNum != null) {
                    newEmitter.setAlpha(frame.alpha, 0, frame.alphaFadeNum);
                }
                else {
                    newEmitter.setAlpha(frame.alpha, frame.alpha);
                }
                newEmitter.start(true, 3000, null, frame.maxParticles);
                newEmitter.setRotation(-frame.rotation, frame.rotation);
                t.add(3000, function () {
                    newEmitter.destroy(true);
                }, _this);
            });
            t.start();
        };
        ;
        return RevealAnimations;
    }());
    ;
})(BOOM || (BOOM = {}));
;
var BOOM;
(function (BOOM) {
    var LanguageCurrencyManager = (function () {
        function LanguageCurrencyManager() {
            this._config = null;
            this._selectedCurrency = null;
            this._selectedLanguage = null;
            this._useISOCode = null;
            this._useMinorIfPresent = null;
            this._selectedCurrencyData = null;
            if (LanguageCurrencyManager.instance === null) {
                LanguageCurrencyManager.instance = this;
            }
            else {
                throw new Error("Cant make 2 LanguageCurrencyManager, use .instance instead.");
            }
        }
        LanguageCurrencyManager.prototype.init = function (config, language, currency, useISO, useMinorIfPresent) {
            this._selectedLanguage = "en";
            this._selectedCurrency = "GBP";
            this._useISOCode = useISO;
            this._useMinorIfPresent = useMinorIfPresent;
            this._selectedCurrencyData = this.getCurrencyData(this._selectedCurrency);
        };
        LanguageCurrencyManager.prototype.checkLanguageSupport = function (lang) {
            if (this._config.supportedLanguages.hasOwnProperty(lang)) {
                return this._config.supportedLanguages[lang];
            }
            else {
                return false;
            }
        };
        LanguageCurrencyManager.prototype.getAssetPackInfo = function () {
            if (this._config.useAssetPacks && this._config.assets.hasOwnProperty(this._selectedLanguage)) {
                if (this._config.assets[this._selectedLanguage].useAssetPack) {
                    return this._config.assets[this._selectedLanguage];
                }
                else {
                    return this._config.assets.empty;
                }
            }
            else {
                return this._config.assets.empty;
            }
        };
        LanguageCurrencyManager.prototype.getDelimitedString = function (targetKey) {
            var thisString = "";
            var targetObject = null;
            for (var i = 0; i < this._config.messages.length; i++) {
                if (this._config.messages[i].key === targetKey) {
                    targetObject = this._config.messages[i];
                }
            }
            if (targetObject == null) {
                return targetKey;
            }
            else {
                if (targetObject.values.hasOwnProperty(this._selectedLanguage)) {
                    thisString = targetObject.values[this._selectedLanguage];
                    return this.delimitText(thisString);
                }
                else {
                    return targetKey;
                }
            }
        };
        LanguageCurrencyManager.prototype.getDelimitedErrorString = function (targetKey) {
            var thisString = "";
            var targetObject = null;
            for (var i = 0; i < this._config.errors.length; i++) {
                if (this._config.errors[i].key === targetKey) {
                    targetObject = this._config.errors[i];
                }
            }
            if (targetObject == null) {
                return targetKey;
            }
            else {
                if (targetObject.values.hasOwnProperty(this._selectedLanguage)) {
                    thisString = targetObject.values[this._selectedLanguage];
                    return this.delimitText(thisString);
                }
                else {
                    return targetKey;
                }
            }
        };
        LanguageCurrencyManager.prototype.delimitText = function (stringIn) {
            if (stringIn.indexOf("{{line_break}}") == -1) {
                return stringIn;
            }
            else {
                stringIn = stringIn.replace("{{line_break}}", "\n");
                return this.delimitText(stringIn);
            }
        };
        LanguageCurrencyManager.prototype.checkCurrencySupport = function (curr) {
            for (var i = 0; i < LanguageCurrencyManager.CURRENCY_CODES.length; i++) {
                if (LanguageCurrencyManager.CURRENCY_CODES[i].ISOCode === curr) {
                    return true;
                }
            }
            return false;
        };
        LanguageCurrencyManager.prototype.getCurrencyData = function (curr) {
            for (var i = 0; i < LanguageCurrencyManager.CURRENCY_CODES.length; i++) {
                if (LanguageCurrencyManager.CURRENCY_CODES[i].ISOCode === curr) {
                    return LanguageCurrencyManager.CURRENCY_CODES[i];
                }
            }
        };
        LanguageCurrencyManager.prototype.formatCurrency = function (value) {
            var returnString = "";
            var preppedValue = this.prepNumbers(value, this._selectedCurrencyData.decimalPrecision, 3, this._selectedCurrencyData.majorDelimiter, this._selectedCurrencyData.minorDelimiter);
            if (this._useISOCode) {
                returnString = this._selectedCurrency;
                returnString += " ";
                returnString += preppedValue;
            }
            else {
                if (this._selectedCurrencyData.minorPresent && this._useMinorIfPresent) {
                    if (value >= 1) {
                        if (this._selectedCurrencyData.majorPosition === "R") {
                            returnString = preppedValue;
                            returnString += " ";
                            returnString += this._selectedCurrencyData.majorSymbol;
                        }
                        else {
                            returnString = this._selectedCurrencyData.majorSymbol;
                            returnString += preppedValue;
                        }
                    }
                    else {
                        if (this._selectedCurrencyData.majorPosition === "R") {
                            returnString = preppedValue;
                            returnString += " ";
                            returnString += this._selectedCurrencyData.minorSymbol;
                        }
                        else {
                            returnString = this._selectedCurrencyData.minorSymbol;
                            returnString += preppedValue;
                        }
                    }
                }
                else {
                    if (this._selectedCurrencyData.majorPosition === "R") {
                        returnString = preppedValue;
                        returnString += " ";
                        returnString += this._selectedCurrencyData.majorSymbol;
                    }
                    else {
                        returnString = this._selectedCurrencyData.majorSymbol;
                        returnString += preppedValue;
                    }
                }
            }
            return returnString;
        };
        LanguageCurrencyManager.prototype.prepNumbers = function (numIn, n, x, s, c) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = numIn.toFixed(Math.max(0, ~~n));
            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };
        LanguageCurrencyManager.instance = null;
        LanguageCurrencyManager.DECIMAL_ZERO = 0;
        LanguageCurrencyManager.DECIMAL_ONE = 1;
        LanguageCurrencyManager.DECIMAL_TWO = 2;
        LanguageCurrencyManager.DECIMAL_THREE = 3;
        LanguageCurrencyManager.CURRENCY_CODES = [
            { country: "United Kingdom", currency: "Pound", ISOCode: "GBP", minorPresent: true, majorSymbol: "£", minorSymbol: "p", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "United States", currency: "Dollar", ISOCode: "USD", minorPresent: true, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Euro Member Countries", currency: "Euro", ISOCode: "EUR", minorPresent: false, majorSymbol: "€", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "R", minorPosition: "", majorDelimiter: ".", minorDelimiter: "," },
            { country: "Japan", currency: "Yen", ISOCode: "JPY", minorPresent: false, majorSymbol: "¥", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Mexico", currency: "Peso", ISOCode: "MXN", minorPresent: false, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." }
        ];
        return LanguageCurrencyManager;
    }());
    BOOM.LanguageCurrencyManager = LanguageCurrencyManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Overlay = (function () {
        function Overlay() {
            this._div = null;
            this._enabled = true;
            this._create();
            this._subscribe();
        }
        Overlay.prototype._subscribe = function () {
            BOOM.SignalManager.instance.add('showOverlay', this._show, this);
        };
        ;
        Overlay.prototype._unsubscribe = function () {
            BOOM.SignalManager.instance.remove('showOverlay', this._show, this);
        };
        ;
        Overlay.prototype._create = function () {
            var _this = this;
            this._div = document.createElement('div');
            this._div.id = "overlay";
            var shuffleButton = com.camelot.core.iwgLoadQ.images.shuffle;
            shuffleButton.id = 'shuffleButton';
            shuffleButton.onclick = function () {
                if (_this._enabled) {
                    shuffleButton.className = "click";
                    _this._enabled = false;
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.SHUFFLEBUTTON, BOOM.SoundChannels.FX_SOUNDS);
                    _this._hide();
                }
            };
            shuffleButton.onmouseover = function () {
                _this._buttonReminder();
            };
            var scaleFactor = window.innerHeight / 640;
            shuffleButton.style.width = 274 * scaleFactor + "px";
            shuffleButton.style.opacity = "0";
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.appendChild(this._div);
            IWGholder.appendChild(shuffleButton);
        };
        Overlay.prototype._show = function () {
            var self = this;
            this._div.style.display = "block";
            var shuffleButton = document.getElementById('shuffleButton');
            shuffleButton.style.display = "block";
            shuffleButton.style.opacity = "1";
            shuffleButton.style.top = "50%";
            shuffleButton.style.left = "50%";
            shuffleButton.style.marginLeft = "-" + shuffleButton.clientWidth / 2 + "px";
            shuffleButton.style.marginTop = "-" + shuffleButton.clientHeight / 2 + "px";
            var op = 0;
            var timer = setInterval(function () {
                if (op > 1) {
                    clearInterval(timer);
                    self._div.style.display = 'block';
                    self._buttonReminder();
                }
                self._div.style.opacity = op;
                self._div.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op + 0.05;
            }, 50);
        };
        ;
        Overlay.prototype._buttonReminder = function () {
            var shuffleButton = document.getElementById('shuffleButton');
            setTimeout(function () {
                shuffleButton.className = "prompt";
            }, 1000);
        };
        Overlay.prototype._hide = function () {
            var self = this;
            var shuffleButton = document.getElementById('shuffleButton');
            setTimeout(function () {
                var op = 1;
                var timer = setInterval(function () {
                    if (op <= 0.1) {
                        clearInterval(timer);
                        self._div.style.display = 'none';
                        self._destroy();
                        BOOM.SignalManager.instance.dispatch('shuffle');
                    }
                    self._div.style.opacity = op;
                    self._div.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    shuffleButton.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op -= op * 0.2;
                }, 50);
            }, 1000);
        };
        ;
        Overlay.prototype._destroy = function () {
            this._unsubscribe();
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.removeChild(this._div);
            var shuffleButton = document.getElementById('shuffleButton');
            IWGholder.removeChild(shuffleButton);
        };
        return Overlay;
    }());
    BOOM.Overlay = Overlay;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Pause = (function () {
        function Pause() {
            this._div = null;
            this._enabled = true;
            this._create();
            this._subscribe();
        }
        Pause.prototype._subscribe = function () {
            BOOM.SignalManager.instance.add('showPause', this._show, this);
            BOOM.SignalManager.instance.add('hidePause', this._hide, this);
        };
        ;
        Pause.prototype._unsubscribe = function () {
            BOOM.SignalManager.instance.remove('showPause', this._show, this);
            BOOM.SignalManager.instance.remove('hidePause', this._hide, this);
        };
        ;
        Pause.prototype._create = function () {
            this._div = document.createElement('div');
            this._div.id = "pauseOverlay";
            var shuffleButton = com.camelot.core.iwgLoadQ.images.pause;
            shuffleButton.id = 'pause';
            var scaleFactor = window.innerHeight / 640;
            shuffleButton.style.width = 192 * scaleFactor + "px";
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.appendChild(this._div);
            this._div.appendChild(shuffleButton);
        };
        Pause.prototype._show = function () {
            this._div.style.display = "block";
            this._div.style.opacity = '1';
            var shuffleButton = document.getElementById('pause');
            shuffleButton.style.marginLeft = "calc( 50% - " + shuffleButton.clientWidth / 2 + "px)";
            shuffleButton.style.marginTop = "calc( 50% - " + shuffleButton.clientHeight / 2 + "px)";
        };
        ;
        Pause.prototype._hide = function () {
            this._div.style.display = "none";
            this._div.style.opacity = '0';
        };
        ;
        Pause.prototype._destroy = function () {
            this._unsubscribe();
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.removeChild(this._div);
        };
        return Pause;
    }());
    BOOM.Pause = Pause;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var CamelotPreloader = (function (_super) {
        __extends(CamelotPreloader, _super);
        function CamelotPreloader() {
            _super.apply(this, arguments);
        }
        CamelotPreloader.prototype.addImage = function (name) {
            var image = com.camelot.core.iwgLoadQ.getResult(name);
            this.game.cache.addImage(name, null, image);
        };
        CamelotPreloader.prototype.addSpriteSheet = function (name) {
            var image = com.camelot.core.iwgLoadQ.getResult(name);
            var frames = com.camelot.core.iwgLoadQ.getResult(name + "-data");
            this.game.cache.addTextureAtlas(name, null, image, frames, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        };
        CamelotPreloader.prototype.addSound = function (id) {
            var audio = com.camelot.core.iwgLoadQ.getResult(id);
            this.game.cache.addSound(id, null, audio, true, true);
        };
        CamelotPreloader.prototype.addBitmapFont = function (name, space) {
            var image = com.camelot.core.iwgLoadQ.getResult(name);
            var frames = com.camelot.core.iwgLoadQ.getResult(name + "-data");
            this.game.cache.addBitmapFont(name, null, image, frames, 'xml', space);
        };
        CamelotPreloader.prototype.create = function () {
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.style.width = window.innerWidth + "px";
            IWGholder.style.height = window.innerHeight + "px";
            var canvas = document.getElementById("IWGcanvas");
            IWGholder.removeChild(canvas);
            this.addImage('bg');
            this.game.load.script('gray', '../filters/Gray.js');
            this.addSpriteSheet("masterSS");
            this.addBitmapFont("numbers-export", 0);
            this.addBitmapFont("ends-export", 0);
            this.addBitmapFont("prize-export", -4);
            this.addBitmapFont("prize_win-export", -4);
            this.addBitmapFont("goesleft-export", 0);
            this.addSound("backgroundsound");
            this.addSound("playButton");
            this.addSound("shuffleButton");
            this.addSound("shuffle");
            this.addSound("autoPlay");
            this.addSound("tileSelect");
            this.addSound("tileTurn");
            this.addSound("multiplierTile");
            this.addSound("rowWin");
            this.addSound("endWin");
            this.addSound("endLose");
            this.addSound("count");
            this.addSound("countUp");
            this.addSound("clover");
            BOOM.GameManager.instance.getAudioManager().addSoundChannel(BOOM.SoundChannels.FX_SOUNDS, 1);
            BOOM.GameManager.instance.getAudioManager().addSoundChannel(BOOM.SoundChannels.BACKGROUND, 1);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.BACKGROUNDSOUND, BOOM.SoundChannels.BACKGROUND, 0.1, true, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.PLAYBUTTON, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.SHUFFLEBUTTON, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.SHUFFLE, BOOM.SoundChannels.FX_SOUNDS, 1, true, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.AUTOPLAY, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILESELECT, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILETURN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.MULTIPLIERTILE, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.ENDWIN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.ENDLOSE, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.COUNT, BOOM.SoundChannels.FX_SOUNDS, 0.3, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.COUNTUP, BOOM.SoundChannels.FX_SOUNDS, 0.3, false, 1, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.CLOVER, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.SignalManager.instance.dispatch('switchStateSignal', 'MainGame');
            com.camelot.core.IWG.ame('killloader');
            var overlay = new BOOM.Overlay();
        };
        return CamelotPreloader;
    }(BOOM.GameState));
    BOOM.CamelotPreloader = CamelotPreloader;
})(BOOM || (BOOM = {}));
//# sourceMappingURL=initGameNC.js.map