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
                            basePath: 'iwg/',
                            ticket: '<?xml version="1.0" encoding="UTF-8" ?><ticket><outcome amount="100.00" tier="2" wT="1"/><params pList="5000,75,40,25,20,10,5,2,1"/><g1><go i="1" s0="8" s1="8" p="1" w="1" /><go i="2" s0="8" s1="1" p="3" w="0" /><go i="3" s0="4" s1="0" p="0" w="0" /><go i="4" s0="6" s1="9" p="8" w="0" /><go i="5" s0="2" s1="8" p="4" w="0" /><go i="6" s0="4" s1="8" p="4" w="0" /></g1></ticket>',
                            finishURL: '/instantWin/1746b1c7-b233-40e3-b72a-da8996cb3d9f/view'
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
            BOOM.LanguageCurrencyManager.instance.init(this.cache.getJSON("langConfig"), "en", "GBP", false, false);
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.refresh();
            this.game.time.desiredFps = 60;
            this.game.tweens.frameBased = true;
            BOOM.SignalManager.instance.dispatch('switchStateSignal', "Preloader");
        };
        Boot.prototype.enterIncorrectOrientation = function () {
            this.orientated = false;
        };
        Boot.prototype.leaveIncorrectOrientation = function () {
            this.orientated = true;
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
    var Ticket = (function () {
        function Ticket() {
            this._ticketXML = com.camelot.core.IWG.ame('ticket');
            this._params = null;
            this._outcome = null;
            this._prizeList = null;
            this._turns = null;
            this._index = 0;
            this._currentTurn = null;
            this._prizeListNumbered = [];
            if (Ticket.instance === null) {
                Ticket.instance = this;
                var data = this._ticketXML.params;
                this._params = {
                    grid: this._sortGrid(data.grid)
                };
                this._outcome = {
                    amount: Number(this._ticketXML.outcome.amount),
                    tier: Number(this._ticketXML.outcome.prizeTier),
                    isWinner: Number(this._ticketXML.outcome.isWinner)
                };
                this._prizeList = {
                    a: this._ticketXML.prizeList.a,
                    c: this._ticketXML.prizeList.c
                };
                var turns = [];
                for (var i = 0; i < this._ticketXML.games.game.turn.length; i++) {
                    var turnData = this._ticketXML.games.game.turn[i];
                    var turn = {
                        name: turnData.name,
                        value: turnData.value,
                        w: turnData.w,
                        prizeID: turnData.prizeID,
                        columnWin: this._checkColumWin(turnData),
                        cornerWin: this._checkCornerWin(turnData)
                    };
                    if (turn.prizeID === 'C') {
                        turn.prizeID = '20';
                    }
                    turns.push(turnData);
                    if (Number(turn.w) === 1) {
                        if (Number(turn.prizeID) >= 0) {
                            if (Number(turn.prizeID) === 20) {
                                com.camelot.core.IWG.ame('bank', { deposit: [20], log: true });
                            }
                            else {
                                var prize = Number(this.getPrizeList()[Number(turn.prizeID)]);
                                com.camelot.core.IWG.ame('bank', { deposit: [prize], log: true });
                            }
                        }
                        else if (!Number(turn.prizeID)) {
                            var location = turn.prizeID.indexOf('|');
                            var prizeNum = Number(turn.prizeID.slice(0, location));
                            var prize = Number(this.getPrizeList()[prizeNum]) + 20;
                            com.camelot.core.IWG.ame('bank', { deposit: [prize], log: true });
                        }
                    }
                }
                ;
                this._turns = turns;
                this._errorChecks();
            }
            else {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
        }
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
            var total = 0, value = [], wins = [], prizeID = [], tier = Number(this._outcome.tier), outcome = Number(this._outcome.amount), winner = Number(this._outcome.isWinner);
            for (var i = 0; i < this._turns.length; i++) {
                var turn = this._turns[i];
                value.push(Number(turn.value));
                wins.push(Number(turn.w));
                prizeID.push(turn.prizeID);
            }
            for (var i = 0; i < this.getPrizeList().length; i++) {
                this._prizeListNumbered.push(Number(this.getPrizeList()[i]));
                total += Number(this.getPrizeList()[i]);
            }
            if (total !== 55841) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd0009 incorrect prize list amount'] });
            }
            this._checkLength(this._prizeListNumbered, 12);
            this._checkLength(this._turns, 6);
            this._checkLength(value, 6);
            this._checkLength(wins, 6);
            this._checkLength(prizeID, 6);
            this._checkLength(this._params.grid, 36);
            this._checkArrayForNumbers(this._prizeListNumbered);
            this._checkArrayForNumbers(value);
            this._checkArrayForNumbers(wins);
            this._checkArrayForNumbers(this._params.grid);
            this._checkPrizeID(prizeID);
            if (isNaN(this._outcome.amount)) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00010 outcome amount not a valid number'] });
            }
            if (outcome > 0 && winner != 1) {
                com.camelot.core.IWG.ame('error', { mess: ['mIWGd00011 outcome amount not £0 on a losing ticket'] });
            }
            for (var i = 0; i < wins.length; i++) {
                if (wins[i] === 1 && winner === 0) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00012 winning turn on a losing ticket'] });
                }
            }
            this._tierCheck(tier, outcome);
            this._checkValues(this._turns, 'w', 0, 1);
            this._checkValues(this._turns, 'value', 0, 8);
            this._checkValues(this._turns, 'prizeID', -1, 11);
            for (var i = 0; i < this._params.grid.length; i++) {
                var gridNum = this._params.grid[i];
                if (gridNum < 0 || gridNum > 8) {
                    com.camelot.core.IWG.ame('error', { mess: ['mIWGd00016 ticket value out of range'] });
                }
            }
            for (var i = 0; i < this._turns.length; i++) {
                var turn = this._turns[i];
                if (turn.cornerWin) {
                    if (isNaN(Number(turn.cornerWin))) {
                        com.camelot.core.IWG.ame('error', { mess: ['mIWGd00015 value is not numbers only'] });
                    }
                    if (Number(turn.cornerWin) < 0 || Number(turn.cornerWin) > 1) {
                        com.camelot.core.IWG.ame('error', { mess: ['mIWGd00016 ticket value out of range'] });
                    }
                }
            }
        };
        Ticket.prototype._tierCheck = function (tier, outcome) {
            var winAmount = 0.00, ignore = false;
            switch (tier) {
                case 1:
                    winAmount = 50000.00;
                    break;
                case 2:
                    winAmount = 5000.00;
                    break;
                case 3:
                    winAmount = 400.00;
                    break;
                case 4:
                    winAmount = 200.00;
                    break;
                case 5:
                    winAmount = 100.00;
                    break;
                case 6:
                case 7:
                    winAmount = 60.00;
                    break;
                case 8:
                case 9:
                    winAmount = 40.00;
                    break;
                case 10:
                case 11:
                    winAmount = 20.00;
                    break;
                case 12:
                    winAmount = 10.00;
                    break;
                case 13:
                    winAmount = 5.00;
                    break;
                case 14:
                    winAmount = 4.00;
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
                if (arrayNumber !== 'C') {
                    if (isNaN(Number(arrayNumber))) {
                        com.camelot.core.IWG.ame('error', { mess: ['mIWGd00015 array is not numbers only'] });
                    }
                }
            }
        };
        Ticket.prototype._checkPrizeID = function (array) {
            for (var i = 0; i < array.length; i++) {
                var arrayNumber = array[i];
                if (arrayNumber !== 'C') {
                    if (arrayNumber.indexOf('|C') === -1) {
                        if (isNaN(Number(arrayNumber))) {
                            com.camelot.core.IWG.ame('error', { mess: ['mIWGd00015 array is not numbers only'] });
                        }
                    }
                }
            }
        };
        Ticket.prototype._checkValues = function (gameData, value, min, max) {
            for (var i = 0; i < gameData.length; i++) {
                var turnData = gameData[i];
                if (turnData.hasOwnProperty(value)) {
                    var v = Number(turnData[value]);
                    if (v < min || v > max) {
                        com.camelot.core.IWG.ame('error', { mess: ['mIWGd00016 ticket value out of range'] });
                    }
                }
            }
        };
        Ticket.prototype._checkColumWin = function (turnData) {
            if (turnData.columnWin) {
                return turnData.columnWin;
            }
            return null;
        };
        Ticket.prototype._checkCornerWin = function (turnData) {
            if (turnData.cornerWin) {
                return turnData.cornerWin;
            }
            return null;
        };
        Ticket.prototype._sortGrid = function (grid) {
            var ar = [];
            var a = grid.split(',');
            for (var k in a) {
                ar.push(Number(a[k]));
            }
            ;
            return ar;
        };
        Ticket.prototype.getTicket = function () {
            return this;
        };
        Ticket.prototype.getGrid = function () {
            return this._params.grid;
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
        Ticket.prototype.getPrizeList = function () {
            return this._prizeList.a.split(',');
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
            var soundButton = new BOOM.SoundButton();
            soundButton.position.setTo(this.game.width / 2, this.game.height / 2 + 220);
            this._lights = this.game.add.image(this.game.width / 2, this.game.height / 2, "masterSS", "bg_splash_lights.png", this);
            this._lights.anchor.setTo(0.5, 0.5);
            this._lightTopLeft = this.game.add.image(280, 58, "masterSS", "light_red.png", this);
            this._lightTopLeft.anchor.setTo(0.5, 0.5);
            this._lightTopLeft.alpha = 0.8;
            this._lightTopRight = this.game.add.image(829, 115, "masterSS", "light_green.png", this);
            this._lightTopRight.anchor.setTo(0.5, 0.5);
            this._lightMidLeft = this.game.add.image(228, 273, "masterSS", "light_yellow.png", this);
            this._lightMidLeft.anchor.setTo(0.5, 0.5);
            this._lightMidLeft.alpha = 0.8;
            this._lightBotRight = this.game.add.image(770, 410, "masterSS", "light_yellow.png", this);
            this._lightBotRight.anchor.setTo(0.5, 0.5);
            this._lightBotRight.alpha = 0.8;
            this._lightBotMid = this.game.add.image(610, 500, "masterSS", "light_red.png", this);
            this._lightBotMid.anchor.setTo(0.5, 0.5);
            this._lightBotMid.alpha = 0.8;
            this._logo = this.game.add.image(this.game.width / 2, this.game.height / 2 - 150, "masterSS", "logo_splash.png", this);
            this._logo.position.setTo(this.game.width / 2, -300);
            this._logo.anchor.setTo(0.5, 0.5);
            this._winupto = this.game.add.image(this.game.width / 2, this.game.height / 2, "masterSS", "winupto.png", this);
            this._winupto.position.setTo(this.game.width / 2, -300);
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
            this._playButton.position.setTo(this.game.width / 2, this.game.height / 2 + 120);
            this._playButton.buttonEvents.onInputDown.add(function () {
                _this._playButton.disableButton();
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.BACKGROUNDLOOP, BOOM.SoundChannels.BACKGROUND);
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.PLAYBUTTON, BOOM.SoundChannels.FX_SOUNDS);
                var buttonClick = _this.game.add.tween(_this._playButton.scale).to({ x: 0.9, y: 0.9 }, 50, Phaser.Easing.Linear.None, true);
                buttonClick.yoyo(true);
                buttonClick.onComplete.add(function () {
                    BOOM.SignalManager.instance.dispatch('splashOutro');
                }, _this);
            }, this);
            var playIdle = this.game.add.tween(this._playButton.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None, true, 4000, -1);
            playIdle.yoyo(true, 500);
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
            var winTween = this.game.add.tween(this._winupto).to({ y: this.game.height / 2 }, 1500, Phaser.Easing.Bounce.Out, true, 150);
            var logoTween = this.game.add.tween(this._logo).to({ y: this.game.height / 2 - 150 }, 1500, Phaser.Easing.Bounce.Out, true, 250);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 950);
            logoTween.onComplete.add(function () {
                this._playButton.enableButton();
            }, this);
            var lightTopLeftTween = this.game.add.tween(this._lightTopLeft).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 250, -1, true);
            lightTopLeftTween.repeatDelay(this.game.rnd.integerInRange(6000, 10000));
            var lightTopRightTween = this.game.add.tween(this._lightTopRight).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 250, -1, true);
            lightTopRightTween.repeatDelay(this.game.rnd.integerInRange(2000, 8000));
            var lightMidLeftTween = this.game.add.tween(this._lightMidLeft).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 650, -1, true);
            lightMidLeftTween.repeatDelay(this.game.rnd.integerInRange(3000, 8000));
            var lightBotRightTween = this.game.add.tween(this._lightBotRight).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 1500, -1, true);
            lightBotRightTween.repeatDelay(this.game.rnd.integerInRange(4000, 8000));
            var lightBotMidTween = this.game.add.tween(this._lightBotMid).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 950, -1, true);
            lightBotMidTween.repeatDelay(this.game.rnd.integerInRange(2000, 9000));
        };
        return SplashGroup;
    }(BOOM.GameGroup));
    BOOM.SplashGroup = SplashGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SelectionGridGroup = (function (_super) {
        __extends(SelectionGridGroup, _super);
        function SelectionGridGroup() {
            _super.call(this);
            this.iconArray = [];
            this._logo = null;
            this._instructions = null;
            this._setupLayout();
        }
        SelectionGridGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('splashOutro', this._show, this);
            BOOM.SignalManager.instance.add('logoDelay', this._hideLogo, this);
        };
        SelectionGridGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('splashOutro', this._show, this);
            BOOM.SignalManager.instance.remove('logoDelay', this._hideLogo, this);
        };
        SelectionGridGroup.prototype._setupLayout = function () {
            this._logo = this.game.add.image(0, 0, "masterSS", "logo_game.png", this);
            this._logo.position.setTo(0, -140);
            var outline = this.game.add.image(0, 0, "masterSS", "divs_choose.png", this);
            var x = 65;
            var y = 55;
            var boxTypeArr = Phaser.ArrayUtils.shuffle([1, 1, 1, 2, 2, 2, 3, 3, 3]);
            for (var i = 0; i < 9; i++) {
                if (i % 3 === 0 && i !== 0) {
                    y = y + 110;
                    x = 65;
                }
                else if (i !== 0) {
                    x = x + 110;
                }
                var icon = new BOOM.Icon(boxTypeArr[i]);
                this.add(icon);
                icon.position.setTo(x, y);
            }
            this._instructions = this.game.add.image(-15, 393, "masterSS", "instructions.png", this);
        };
        SelectionGridGroup.prototype._show = function () {
        };
        SelectionGridGroup.prototype._hideLogo = function (endDelay) {
            this.game.add.tween(this._logo).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, endDelay);
        };
        return SelectionGridGroup;
    }(BOOM.GameGroup));
    BOOM.SelectionGridGroup = SelectionGridGroup;
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
            this._endGroup = null;
            this._create();
        }
        EndGameGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('endGameIntro', this._show, this);
            BOOM.SignalManager.instance.add('endGameIntro', this._finalBankCheck, this);
        };
        EndGameGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('endGameIntro', this._show, this);
            BOOM.SignalManager.instance.remove('endGameIntro', this._finalBankCheck, this);
        };
        EndGameGroup.prototype._create = function () {
            var _this = this;
            this._endgamePanel = this.game.add.image(0, -300, "masterSS", "bg_endgame.png", this);
            this._endgamePanel.anchor.setTo(0.5, 0.5);
            this._endgamePanel.alpha = 0;
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
            this._endgameButton.alpha = 0.0;
            this._endgameButton.disableButton();
            this._endgameButton.position.setTo(0, 75);
            this._endgameButton.buttonEvents.onInputUp.add(function () {
                _this._endgameButton.disableButton();
                com.camelot.core.IWG.ame('closeGame');
            }, this);
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
            this._endgamePanel.addChild(this._endgameButton);
        };
        EndGameGroup.prototype._createWin = function () {
            var amount = 'end' + BOOM.Ticket.instance.getOutcome().amount + '.png';
            this._endMessage = this.game.add.image(0, -28, "masterSS", "end_win.png", this);
            this._endMessage.anchor.setTo(0.5, 0.5);
            var style = { font: "32px Arial", fill: "#ffff00", align: "center" };
            this._endAmount = this.game.add.bitmapText(0, 18, "endamounts-export", "", 50);
            this._endAmount.anchor.setTo(0.5, 0.5);
            this._endAmount.alpha = 0;
            this._endgamePanel.addChild(this._endMessage);
            this._endgamePanel.addChild(this._endAmount);
        };
        EndGameGroup.prototype._createLose = function () {
            this._endMessage = this.game.add.image(0, -10, "masterSS", "end_lose.png", this);
            this._endMessage.anchor.setTo(0.5, 0.5);
            this._endgamePanel.addChild(this._endMessage);
        };
        EndGameGroup.prototype._createTrial = function () {
            this._endMessage = this.game.add.image(0, -10, "masterSS", "end_trial.png", this);
            this._endMessage.anchor.setTo(0.5, 0.5);
            this._endgamePanel.addChild(this._endMessage);
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
            var tween;
            if (isAnimated) {
                var fadeOn = this.game.add.tween(textField).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0);
                fadeOn.onComplete.add(function () {
                    tween = this.game.add.tween(textField.scale).to({
                        x: 1.1,
                        y: 1.1
                    }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                    tween.yoyo(true, 0);
                }, this);
            }
            if (onStart !== null) {
                onStart.bind(onCompleteScope);
            }
            if (targetValue > 40) {
                var timer = this.game.time.events.loop(1, function (oU, oC, oCS) {
                    var realRandom = this.game.rnd.realInRange(speedVariation, speedVariation + (speedVariation * 0.1));
                    counter += realRandom;
                    textField.text = BOOM.LanguageCurrencyManager.instance.formatCurrency(counter);
                    if (oU !== null) {
                        oU.bind(oCS)();
                    }
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.COUNT, BOOM.SoundChannels.FX_SOUNDS);
                    if (counter > targetValue) {
                        textField.text = BOOM.LanguageCurrencyManager.instance.formatCurrency(targetValue);
                        if (oC !== null) {
                            oC.bind(oCS)();
                        }
                        this.game.time.events.remove(timer);
                        if (isAnimated) {
                            tween.stop();
                            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ENDWIN, BOOM.SoundChannels.FX_SOUNDS);
                        }
                    }
                }, this, onUpdate, onComplete, onCompleteScope);
            }
            else {
                textField.text = BOOM.LanguageCurrencyManager.instance.formatCurrency(targetValue);
                onComplete();
            }
        };
        EndGameGroup.prototype._hide = function () {
        };
        EndGameGroup.prototype._show = function () {
            var endDelay = 1500;
            this._endgamePanel.alpha = 1;
            if (BOOM.Ticket.instance.getWager()) {
                if (BOOM.Ticket.instance.getOutcome().isWinner) {
                    endDelay = 3000;
                }
            }
            BOOM.SignalManager.instance.dispatch('logoDelay', endDelay);
            var movePanel = this.game.add.tween(this._endgamePanel).to({ y: 75 }, 1000, Phaser.Easing.Bounce.Out, true, endDelay);
            movePanel.onComplete.add(function () {
                var _this = this;
                if (BOOM.Ticket.instance.getWager()) {
                    if (BOOM.Ticket.instance.getOutcome().isWinner) {
                        var func = function () {
                            var fadeButton = _this.game.add.tween(_this._endgameButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
                            fadeButton.onComplete.add(function () {
                                _this._endgameButton.enableButton();
                                var endIdle = _this.game.add.tween(_this._endgameButton.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None, true, 4000, -1);
                                endIdle.yoyo(true, 500);
                            }, _this);
                        };
                        this.createCounter(this._endAmount, 0, BOOM.Ticket.instance.getOutcome().amount, 130, null, null, func, null, true);
                    }
                    else {
                        BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ENDLOSE, BOOM.SoundChannels.FX_SOUNDS);
                        var fadeButton = this.game.add.tween(this._endgameButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
                        fadeButton.onComplete.add(function () {
                            _this._endgameButton.enableButton();
                            var endIdle = _this.game.add.tween(_this._endgameButton.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None, true, 4000, -1);
                            endIdle.yoyo(true, 500);
                        }, this);
                    }
                }
                else {
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ENDLOSE, BOOM.SoundChannels.FX_SOUNDS);
                    var fadeButton = this.game.add.tween(this._endgameButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
                    fadeButton.onComplete.add(function () {
                        _this._endgameButton.enableButton();
                        var endIdle = _this.game.add.tween(_this._endgameButton.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Linear.None, true, 4000, -1);
                        endIdle.yoyo(true, 500);
                    }, this);
                }
            }, this);
            if (BOOM.Ticket.instance.getOutcome().isWinner) {
            }
            else {
            }
        };
        return EndGameGroup;
    }(BOOM.GameGroup));
    BOOM.EndGameGroup = EndGameGroup;
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
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(game, x, y, backgroundIn, symbolIn) {
            _super.call(this, game);
            this._thisGroupState = "MainGame";
            this._spr_tileBackground = null;
            this._spr_tileBackgroundGold = null;
            this._spr_tileBackgroundWinGold = null;
            this._spr_tileSymbol = null;
            this._spr_bonusSymbol = null;
            this._winRevealFinalTween = null;
            this.symbolName = "";
            this._isCorner = false;
            this._subscribeSignals();
            this.position.x = x;
            this.position.y = y;
            if (backgroundIn != null) {
                this._spr_tileBackground = this.create(0, 0, 'masterSS', backgroundIn);
                this._spr_tileBackgroundWinGold = this.create(0, 0, 'masterSS', 'tile_win.png');
                this._spr_tileBackgroundWinGold.name = 'goldBg';
                this._spr_tileBackgroundGold = this.create(0, 0, 'masterSS', 'tile_collected.png');
                this._spr_bonusSymbol = this.create(0, 0, 'masterSS', symbolIn.toLowerCase());
                this._spr_tileBackgroundWinGold.anchor.set(0.5, 0.5);
                this._spr_tileBackgroundGold.anchor.set(0.5, 0.5);
                this._spr_tileBackground.anchor.set(0.5, 0.5);
                this._spr_bonusSymbol.anchor.set(0.5, 0.5);
                this._spr_tileBackgroundGold.alpha = 0;
                this._spr_tileBackgroundWinGold.alpha = 0;
                this._spr_bonusSymbol.alpha = 0;
            }
            this._spr_tileSymbol = this.create(0, 0, 'masterSS', symbolIn.toLowerCase());
            this._spr_tileSymbol.anchor.set(0.5, 0.5);
            this.symbolName = symbolIn.toLowerCase();
        }
        Tile.prototype._subscribeSignals = function () {
        };
        Tile.prototype._unsubscribeSignals = function () {
        };
        Tile.prototype._onStateSwitch = function (state) {
            if (state !== this._thisGroupState) {
                this._destroy();
            }
        };
        Tile.prototype._destroy = function () {
            this._unsubscribeSignals();
            this.destroy(true, false);
        };
        Tile.prototype.resize = function (width, height) {
            this.width = width;
            this.height = height;
        };
        Tile.prototype.setBackground = function (backgroundIn) {
            this._spr_tileBackground.loadTexture('masterSS', backgroundIn);
        };
        Tile.prototype.setSymbolAlpha = function (value) {
            this._spr_tileSymbol.alpha = value;
        };
        Tile.prototype.animateAndChangeSymbol = function (symbolIn, delay) {
            this.symbolName = symbolIn.toLowerCase();
            this.flipStartAnimation(delay);
        };
        ;
        Tile.prototype.animateAndChangeCornerSymbol = function (symbolIn, delay) {
            var _this = this;
            var fadeInBG = this.game.add.image(0, 0, 'masterSS', 'tile_collected.png');
            fadeInBG.anchor.setTo(.5, .5);
            fadeInBG.alpha = 0;
            this.add(fadeInBG);
            this.sendToBack(fadeInBG);
            this.sendToBack(this._spr_tileBackground);
            var fadeInSymbol = this.game.make.image(0, 0, 'masterSS', symbolIn.toLowerCase());
            fadeInSymbol.anchor.setTo(.5, .5);
            fadeInSymbol.alpha = 0;
            this.add(fadeInSymbol);
            var fadeInSymbolTween = this.game.add.tween(fadeInSymbol).to({ alpha: 1 }, 450, Phaser.Easing.Sinusoidal.InOut, true);
            fadeInSymbolTween.onComplete.add(function () {
                _this.setSymbol(symbolIn);
                fadeInSymbol.destroy();
            }, this);
            var fadeInTween = this.game.add.tween(fadeInBG).to({ alpha: 1 }, 450, Phaser.Easing.Sinusoidal.InOut, true, delay);
            fadeInTween.onComplete.add(function () {
                _this.sendToBack(_this._spr_tileBackgroundWinGold);
                _this._spr_tileBackgroundWinGold.alpha = 1;
                _this._spr_tileBackground.loadTexture('masterSS', 'tile_collected.png');
                fadeInBG.destroy();
            }, this);
        };
        ;
        Tile.prototype.setSymbol = function (symbolIn) {
            this.symbolName = symbolIn.toLowerCase();
            this._spr_tileSymbol.loadTexture('masterSS', symbolIn.toLowerCase());
        };
        Tile.prototype.getSymbol = function () {
            return this.symbolName;
        };
        Tile.prototype.isCorner = function () {
            return this._isCorner;
        };
        Tile.prototype.setIsCorner = function (value) {
            this._isCorner = value;
        };
        Tile.prototype.reveal = function (delay, onComplete, instance) {
            if (onComplete === void 0) { onComplete = function () { }; }
            if (instance === void 0) { instance = this; }
            this.flipAnimation(delay, true, onComplete, instance);
        };
        Tile.prototype.flashWinReveal = function (delay, oc, instance) {
            var _this = this;
            if (oc === void 0) { oc = function () { }; }
            if (instance === void 0) { instance = this; }
            var revealFrames = [
                new BOOM.Particle(['tile_shard_a.png', 'tile_shard_b.png', 'tile_shard_c.png'], 3, { min: -300, max: 300 }, { min: 0, max: -700 }, -15, 0, 2000, 30, 30),
                new BOOM.Particle(['tile_shard_d.png', 'tile_shard_e.png', 'tile_shard_f.png', 'tile_shard_g.png', 'tile_shard_h.png'], 5, { min: -450, max: 450 }, { min: 0, max: -850 }),
                new BOOM.Particle(['tile_shard_i.png'], 1, { min: 0, max: 0 }, { min: 0, max: 0 }, 0, 0, 0, 10, 10, 2, 1, 1800, 1, 1800),
            ];
            this.game.time.events.add(delay * 200, function () {
                _this._spr_tileBackground.alpha = 0;
                _this._spr_tileBackgroundGold.alpha = 0;
                BOOM.Reveals.Pop_Reveal(_this._spr_tileBackgroundGold, _this._spr_tileBackgroundGold, _this, 'masterSS', revealFrames, oc, instance);
            }, this);
        };
        Tile.prototype.reset = function () {
            if (this._winRevealFinalTween !== null) {
                this._winRevealFinalTween.stop();
                this._winRevealFinalTween = null;
            }
            this._spr_tileBackgroundGold.alpha = 0;
            this._spr_tileBackgroundWinGold.alpha = 0;
        };
        Tile.prototype.winRowReveal = function (delay, onComplete, instance) {
            if (onComplete === void 0) { onComplete = function () { }; }
            if (instance === void 0) { instance = this; }
        };
        Tile.prototype.cornerReveal = function (delay, onComplete, instance) {
            if (onComplete === void 0) { onComplete = function () { }; }
            if (instance === void 0) { instance = this; }
            var tileFlash = this.game.make.sprite(0, 0, 'masterSS', 'tile_collected.png');
            this.add(tileFlash);
            tileFlash.anchor.setTo(0.5, 0.5);
            tileFlash.alpha = 0;
            var tween = this.game.add.tween(tileFlash).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true, delay);
            tween.onComplete.add(function () {
                var tween2 = this.game.add.tween(tileFlash).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, delay);
                tween2.onComplete.add(function () {
                    this.remove(tileFlash, true, true);
                    onComplete.bind(instance)();
                }, this);
            }, this);
        };
        Tile.prototype.bonusHide = function () {
            this.sendToBack(this._spr_bonusSymbol);
            this.sendToBack(this);
            var slideToBonusArea = this.game.add.tween(this._spr_bonusSymbol.position).to({ x: 100, y: 550 }, 1000, Phaser.Easing.Bounce.Out, true, 100, 0, false);
        };
        Tile.prototype.auditReveal = function (symbol) {
            this.setSymbol(symbol);
            this.flipAnimation(0, true);
        };
        Tile.prototype.auditFrame = function () {
        };
        Tile.prototype.auditHide = function () {
            this.game.add.tween(this._spr_tileSymbol).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this._spr_tileBackgroundGold).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        };
        Tile.prototype.fromBonusReveal = function () {
            this._spr_tileBackgroundGold.alpha = 1;
            this._spr_tileBackgroundGold.visible = true;
        };
        Tile.prototype.fromBonusWinReveal = function () {
            this._spr_tileBackgroundWinGold.alpha = 1;
            this._spr_tileBackgroundWinGold.visible = true;
        };
        Tile.prototype.fromBonusAuditReveal = function () {
            this.position.y = 0;
            this._spr_tileBackgroundGold.alpha = 1;
            this._spr_tileBackgroundGold.visible = true;
        };
        Tile.prototype.flipAnimation = function (delay, withGold, onComplete, instance) {
            var revealDuration = 500;
            var revealDelay = 50;
            var flip = this.game.add.tween(this._spr_tileBackground).to({ alpha: 1 }, revealDuration, Phaser.Easing.Bounce.Out, true, delay, 0, false);
            flip.onComplete.add(function () {
                if (this._isCorner) {
                    BOOM.SignalManager.instance.dispatch("revealCorner");
                }
                if (withGold) {
                    var symbolTween = this.game.add.tween(this._spr_tileBackgroundGold).to({ alpha: 1 }, revealDuration, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                    symbolTween.onComplete.add(function () {
                        this._spr_tileBackgroundWinGold.alpha = 1;
                        if (onComplete !== undefined) {
                            onComplete.bind(instance)();
                        }
                    }, this);
                }
                else {
                    this.game.add.tween(this._spr_tileBackgroundGold).to({ alpha: 1 }, revealDuration, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                }
            }, this);
        };
        Tile.prototype.flipStartAnimation = function (delay) {
            var revealDuration = 500;
            var revealDelay = 200;
            var flip = this.game.add.tween(this._spr_tileBackground.scale).to({ y: 0 }, revealDuration, Phaser.Easing.Bounce.Out, true, delay, 0, false);
            var symbolFlip = this.game.add.tween(this._spr_tileSymbol.scale).to({ y: 0 }, revealDuration, Phaser.Easing.Bounce.Out, true, delay, 0, false);
            flip.onComplete.add(function () {
                this._spr_tileSymbol.scale.y = 0;
                this._spr_tileSymbol.alpha = 1;
                this._spr_tileSymbol.loadTexture('masterSS', this.symbolName);
                this.game.add.tween(this._spr_tileBackground.scale).to({ y: 1 }, revealDuration, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.game.add.tween(this._spr_tileSymbol.scale).to({ y: 1 }, revealDuration, Phaser.Easing.Bounce.Out, true, 0, 0, false);
            }, this);
        };
        return Tile;
    }(Phaser.Group));
    BOOM.Tile = Tile;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Multiplier = (function (_super) {
        __extends(Multiplier, _super);
        function Multiplier(game, x, y, backgroundIn, textIn, directionIn) {
            _super.call(this, game);
            this._thisGroupState = "MainGame";
            this._isPulsing = false;
            this._anticipationTween = null;
            this._subscribeSignals();
            this.position.x = x;
            this.position.y = y;
            this._startPositionX = x;
            this._startPositionY = y;
            this._direction = directionIn;
            this._multiBackground = this.create(0, 0, 'masterSS', backgroundIn);
            this._multiText = game.add.bitmapText(0, 0, 'prizes-export', BOOM.GameManager.instance.formatCurrency(textIn));
            this._multiText.anchor.setTo(0.5, 0.5);
            this._multiText.scale.set(1.5, 1.5);
            this.add(this._multiText);
            if (directionIn == "vertical") {
                this._multiText.y = -23;
            }
            else {
                this._multiText.y = -17;
                this._multiText.x = -5;
            }
            this._prizeValueString = BOOM.GameManager.instance.formatCurrency(textIn);
            this._multiBackground.anchor.set(0.5, 0.5);
        }
        Multiplier.prototype._subscribeSignals = function () {
        };
        Multiplier.prototype._unsubscribeSignals = function () {
        };
        Multiplier.prototype._onStateSwitch = function (state) {
            if (state === this._thisGroupState) {
            }
            else {
                this._destroy();
            }
        };
        Multiplier.prototype._destroy = function () {
            this._unsubscribeSignals();
            this.destroy(true, false);
        };
        Multiplier.prototype.setBackground = function (backgroundIn) {
            this._multiBackground.loadTexture('masterSS', backgroundIn);
        };
        Multiplier.prototype.setSymbol = function (symbolIn) {
            this._prizeValueString = BOOM.GameManager.instance.formatCurrency(symbolIn);
        };
        Multiplier.prototype.setPrizeValue = function (prizeAmount) {
            this._prizeValue = prizeAmount;
        };
        Multiplier.prototype.getPrizeValue = function () {
            return this._prizeValue;
        };
        Multiplier.prototype._startPulse = function () {
            if (this._isPulsing) {
                var tweenObj;
                if (this._anticipationTween !== null) {
                    this._anticipationTween.stop();
                }
                if (this._direction === "horizontal") {
                    tweenObj = { x: this._startPositionX + 10 };
                }
                else {
                    tweenObj = { y: this._startPositionY + 10 };
                }
                this._anticipationTween = this.game.add.tween(this).to(tweenObj, 500, Phaser.Easing.Linear.None, true, 0, -1);
                this._anticipationTween.yoyo(true, 2000);
            }
        };
        Multiplier.prototype._stopPulse = function () {
            if (this._isPulsing) {
                var tweenObj;
                this._isPulsing = false;
                if (this._direction === "horizontal") {
                    tweenObj = { x: this._startPositionX };
                }
                else {
                    tweenObj = { y: this._startPositionY };
                }
                this._anticipationTween.stop();
                this._anticipationTween = this.game.add.tween(this).to(tweenObj, 200, Phaser.Easing.Linear.None, true, 0, 1);
                this._anticipationTween.onComplete.add(function () {
                }, this);
            }
        };
        Multiplier.prototype.winReveal = function (delay) {
            var name = null;
            if (this._direction === "vertical") {
                name = "prize_bg_h_win.png";
            }
            else {
                name = "prize_bg_v_win.png";
            }
            var mFlash = this.game.make.sprite(0, 0, 'masterSS', name);
            this.add(mFlash);
            this.bringToTop(this._multiText);
            mFlash.alpha = 0;
            mFlash.anchor.setTo(0.5, 0.5);
            var fiTween = this.game.add.tween(mFlash).to({
                frameBased: true,
                alpha: 1,
            }, 150, Phaser.Easing.power2, false);
            fiTween.onComplete.add(function () {
                var foTween = this.game.add.tween(mFlash).to({
                    frameBased: true,
                    alpha: 0,
                }, 150, Phaser.Easing.power2, false);
                foTween.onComplete.add(function () {
                    this.remove(mFlash, true, true);
                }, this);
                foTween.start();
            }, this, 0);
            fiTween.start();
        };
        Multiplier.prototype.flashWinReveal = function () {
            var winRevealDuration = 400;
            var winRevealDurationComplete = 600;
            this._stopPulse();
            var name = null;
            if (this._direction === "vertical") {
                name = "prize_bg_h_win.png";
            }
            else {
                name = "prize_bg_v_win.png";
            }
            var mFlash = this.game.make.sprite(0, 0, 'masterSS', name);
            this.add(mFlash);
            this.bringToTop(this._multiText);
            mFlash.alpha = 0;
            mFlash.anchor.setTo(0.5, 0.5);
            var tween = this.game.add.tween(mFlash).to({ alpha: 1 }, winRevealDuration, Phaser.Easing.Linear.None, true, 5);
        };
        Multiplier.prototype.reset = function () {
            this._stopPulse();
            this._isPulsing = false;
        };
        Multiplier.prototype.animateAndSwitchMultiplier = function (textIn) {
            var name = null;
            if (this._direction === "vertical") {
                name = "prize_bg_h_win.png";
            }
            else {
                name = "prize_bg_v_win.png";
            }
            this.setPrizeValue(Number(textIn));
            var mFlash = this.game.make.sprite(0, 0, 'masterSS', name);
            this.add(mFlash);
            mFlash.alpha = 0;
            mFlash.anchor.setTo(0.5, 0.5);
            var fiTween = this.game.add.tween(mFlash).to({
                frameBased: true,
                alpha: 1,
            }, 150, Phaser.Easing.power2, false);
            fiTween.onComplete.add(function () {
                textIn = textIn + "";
                var foTween = this.game.add.tween(mFlash).to({
                    frameBased: true,
                    alpha: 0,
                }, 150, Phaser.Easing.power2, false);
                foTween.onComplete.add(function () {
                    this.remove(mFlash, true, true);
                }, this);
                foTween.start();
            }, this, 0);
            fiTween.start();
        };
        ;
        Multiplier.prototype.fromBonusWinReveal = function () {
        };
        return Multiplier;
    }(Phaser.Group));
    BOOM.Multiplier = Multiplier;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var CentreGroup = (function (_super) {
        __extends(CentreGroup, _super);
        function CentreGroup() {
            _super.call(this);
            this._thisGroupState = "MainGame";
            this._spr_gridPanel = null;
            this._grp_gridGroup = null;
            this._grp_columnGroup = null;
            this._grp_rowGroup = null;
            this._grp_cornersGroup = null;
            this._arr_gridTile = new collections.LinkedDictionary();
            this._arr_cornersTile = new collections.LinkedDictionary();
            this._arr_columnMultipliers = new collections.LinkedDictionary();
            this._arr_rowMultipliers = new collections.LinkedDictionary();
            this._arr_symbolsToReveal = [];
            this._arr_cornersToReveal = [];
            this._arr_rowsToReveal = [];
            this._arr_colToReveal = [];
            this._arr_rowsToAnticipation = [];
            this._arr_colToAnticipation = [];
            this._arr_bonusToReveal = [];
            this._arr_tileWinToReveal = [];
            this._fromBonus = false;
            this._numberCornersRevealed = 0;
            this._prize = null;
            this.winRevealHighlight = [];
            this.create();
        }
        CentreGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('startGameSignal', this._populateBoard, this);
            BOOM.SignalManager.instance.add('populateGridSignal', this._populateGridArrays, this);
            BOOM.SignalManager.instance.add('gridNextRevealSignal', this._revealNextGridElement, this);
            BOOM.SignalManager.instance.add('gridRevealSymbolSignal', this._revealSymbolsOnGrid, this);
            BOOM.SignalManager.instance.add('gridRevealAnticiSignal', this._anticipationWin, this);
            BOOM.SignalManager.instance.add('gridRevealWinSignal', this._revealNextWin, this);
            BOOM.SignalManager.instance.add('revealCorner', this._revealCorner, this);
        };
        ;
        CentreGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('startGameSignal', this._populateBoard, this);
            BOOM.SignalManager.instance.remove('populateGridSignal', this._populateGridArrays, this);
            BOOM.SignalManager.instance.remove('gridNextRevealSignal', this._revealNextGridElement, this);
            BOOM.SignalManager.instance.remove('gridRevealAnticiSignal', this._anticipationWin, this);
            BOOM.SignalManager.instance.remove('gridRevealSymbolSignal', this._revealSymbolsOnGrid, this);
            BOOM.SignalManager.instance.remove('gridRevealWinSignal', this._revealNextWin, this);
            BOOM.SignalManager.instance.remove('revealCorner', this._revealCorner, this);
        };
        ;
        CentreGroup.prototype.create = function () {
            var tilePositionX = 106;
            var tilePositionY = 70;
            this._grp_gridGroup = new Phaser.Group(this.game);
            this._grp_gridGroup.name = 'gridGroup';
            this._grp_gridGroup.position.setTo(0, 0);
            var i = 0;
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 6; x++) {
                    var tileToAdd = new BOOM.Tile(this.game, 0, 0, 'tile_start.png', 'tile_start.png');
                    tileToAdd.position.setTo(x * 77 + tilePositionX + tileToAdd.width / 2, y * 77 + tilePositionY + tileToAdd.height / 2);
                    this._arr_gridTile.setValue(i, tileToAdd);
                    this._grp_gridGroup.add(tileToAdd);
                    i++;
                }
            }
            ;
            this._grp_rowGroup = new Phaser.Group(this.game);
            this._grp_rowGroup.position.setTo(60, 100);
            this._grp_columnGroup = new Phaser.Group(this.game);
            this._grp_columnGroup.position.setTo(140, 40);
            var multipliers = BOOM.GameManager.instance.getGameMultipliers();
            var tempRowMultipliers = [20, 20, 20, 20, 20, 20];
            var tempColMultipliers = [20, 20, 20, 20, 20, 20];
            this._grp_cornersGroup = new Phaser.Group(this.game);
            this._grp_cornersGroup.position.setTo(140, 400);
            for (var j = 0; j < 6; j++) {
                var multiplierRowTile;
                multiplierRowTile = new BOOM.Multiplier(this.game, 0, j * 77, 'prize_bg_v.png', "£" + multipliers[j], "horizontal");
                this._arr_rowMultipliers.setValue(j, multiplierRowTile);
                this._grp_rowGroup.add(multiplierRowTile);
            }
            ;
            for (var k = 0; k < 6; k++) {
                var multiplierColTile;
                multiplierColTile = new BOOM.Multiplier(this.game, k * 77, 0, 'prize_bg_h.png', "£" + multipliers[k + 6], "vertical");
                this._arr_columnMultipliers.setValue(k, multiplierColTile);
                this._grp_columnGroup.add(multiplierColTile);
            }
            ;
            var cornersBG = this.game.add.image(0, 0, "masterSS", "4cornersbackground.png", this._grp_cornersGroup);
            cornersBG.anchor.setTo(0.5, 0.5);
            cornersBG.position.setTo(cornersBG.width / 2 - 35, 180);
            var text = this.game.add.image(0, 0, "masterSS", "4corners_labelling.png", this._grp_cornersGroup);
            text.anchor.setTo(0.5, 0.5);
            text.position.setTo(30, 180);
            var value = this.game.add.image(0, 0, "masterSS", "4corners_20.png", this._grp_cornersGroup);
            value.name = "white";
            value.anchor.setTo(0.5, 0.5);
            value.position.setTo(378, 180);
            var gold = this.game.add.image(0, 0, "masterSS", "4corners_20_win.png", this._grp_cornersGroup);
            gold.name = "gold";
            gold.anchor.setTo(0.5, 0.5);
            gold.position.setTo(378, 180);
            gold.alpha = 0;
            tilePositionX = 100;
            tilePositionY = 180;
            for (var x = 0; x < 4; x++) {
                var tileToAdd = new BOOM.Tile(this.game, 0, 0, 'tile_start.png', '4corners_' + (x + 1) + '.png');
                tileToAdd.scale.setTo(0.8, 0.8);
                tileToAdd.position.setTo(x * 60 + tilePositionX + tileToAdd.width / 2, tilePositionY);
                this._arr_cornersTile.setValue(x, tileToAdd);
                this._grp_cornersGroup.add(tileToAdd);
                i++;
                tileToAdd.name = "corner" + x;
            }
            this.add(this._grp_gridGroup, false);
            this.add(this._grp_columnGroup, false);
            this.add(this._grp_rowGroup, false);
            this.add(this._grp_cornersGroup, false);
        };
        ;
        CentreGroup.prototype._populateBoard = function () {
            var i = 0;
            var delay = 0;
            var gameBoard = BOOM.GameManager.instance.getGameBoard();
            var multipliers = BOOM.GameManager.instance.getGameMultipliers();
            var tempRowMultipliers = multipliers.slice(0, 6);
            var tempColMultipliers = multipliers.slice(6, 12);
            var t = this.game.time.create(true);
            for (var i = 0; i <= 11; i++) {
                var x = i;
                var y = 0;
                if (i < 6) {
                    t.add(delay, function (i, tempColMultipliers, tempRowMultipliers) {
                        this._arr_columnMultipliers.getValue(i).reset();
                        this._arr_rowMultipliers.getValue(i).reset();
                        this._arr_columnMultipliers.getValue(i).animateAndSwitchMultiplier(tempColMultipliers[i]);
                        this._arr_rowMultipliers.getValue(i).animateAndSwitchMultiplier(tempRowMultipliers[i]);
                    }, this, i, tempColMultipliers, tempRowMultipliers);
                }
                for (var o = 0; o < i + 1; o++) {
                    var xOut = x - o;
                    var yOut = y + o;
                    if ((xOut < 6) && (yOut < 6)) {
                        var index = (yOut * 6) + xOut;
                        var tile = BOOM.GameManager.instance.getGameBoard()[yOut][xOut];
                        t.add(delay, function (index, tile) {
                            this._arr_gridTile.getValue(index).reset();
                            this._arr_gridTile.getValue(index).animateAndChangeSymbol(BOOM.GameManager.instance.getSymbol(tile), 15);
                            if (index === this._arr_gridTile.size() - 1) {
                            }
                        }, this, index, tile);
                    }
                }
                delay += 100;
            }
            t.start();
        };
        ;
        CentreGroup.prototype._populateGridArrays = function (symbol) {
            var _this = this;
            var reveals = BOOM.GameManager.instance.getLegendManager().reveal([symbol]);
            BOOM.GameManager.instance.symbolsRevealedNumber++;
            reveals.forEach(function (r) {
                switch (r.getRevealType()) {
                    case BOOM.RevealType.SYMBOL:
                        var tile = _this._arr_gridTile.getValue(r.getIndex());
                        if (r.getIndex() === 0 || r.getIndex() === 5 || r.getIndex() === 35 || r.getIndex() === 30) {
                            tile.setIsCorner(true);
                        }
                        _this._arr_symbolsToReveal.push(tile);
                        break;
                    case BOOM.RevealType.ANTICIPATION_ROW:
                        _this._arr_rowsToAnticipation.push(_this._arr_rowMultipliers.getValue(r.getIndex()));
                        break;
                    case BOOM.RevealType.ANTICIPATION_COLUMN:
                        _this._arr_colToAnticipation.push(_this._arr_columnMultipliers.getValue(r.getIndex()));
                        break;
                    case BOOM.RevealType.SYMBOL_WINNER:
                        _this._arr_tileWinToReveal.push(_this._arr_gridTile.getValue(r.getIndex()));
                        break;
                    case BOOM.RevealType.SYMBOL_BONUS:
                        _this._arr_bonusToReveal.push(_this._arr_gridTile.getValue(r.getIndex()));
                        break;
                    case BOOM.RevealType.ROW:
                        _this._prize += _this._arr_rowMultipliers.getValue(r.getIndex()).getPrizeValue();
                        _this._arr_rowsToReveal.push(_this._arr_rowMultipliers.getValue(r.getIndex()));
                        break;
                    case BOOM.RevealType.COLUMN:
                        _this._prize += _this._arr_columnMultipliers.getValue(r.getIndex()).getPrizeValue();
                        _this._arr_colToReveal.push(_this._arr_columnMultipliers.getValue(r.getIndex()));
                        break;
                }
                ;
            });
            BOOM.SignalManager.instance.dispatch('gridRevealSymbolSignal');
        };
        ;
        CentreGroup.prototype._revealNextGridElement = function () {
            if (this._arr_symbolsToReveal.length !== 0) {
                BOOM.SignalManager.instance.dispatch('gridRevealSymbolSignal');
            }
            else if (this._arr_rowsToAnticipation.length !== 0 || this._arr_colToAnticipation.length !== 0) {
                BOOM.SignalManager.instance.dispatch('gridRevealAnticiSignal');
            }
            else if (this._arr_tileWinToReveal.length !== 0) {
                BOOM.SignalManager.instance.dispatch('gridRevealWinSignal');
            }
            else {
                BOOM.SignalManager.instance.dispatch('updateCompleteSignal');
            }
        };
        CentreGroup.prototype._revealSymbolsOnGrid = function () {
            var count = 0;
            for (var i = 0; i < this._arr_symbolsToReveal.length; i++) {
                if (i === this._arr_symbolsToReveal.length - 1) {
                    this._arr_symbolsToReveal[i].reveal(2000 + (i * 1000), function () {
                        this._arr_symbolsToReveal = [];
                        BOOM.SignalManager.instance.dispatch('gridNextRevealSignal', this);
                        this._selectSound(count);
                    }, this);
                }
                else {
                    this._arr_symbolsToReveal[i].reveal(2000 + (i * 1000), function () {
                        this._selectSound(count);
                        count++;
                    }, this);
                }
            }
        };
        ;
        CentreGroup.prototype._selectSound = function (count) {
            if (count === 0) {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN, BOOM.SoundChannels.FX_SOUNDS);
            }
            else if (count === 1) {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN2, BOOM.SoundChannels.FX_SOUNDS);
            }
            else if (count === 2) {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN3, BOOM.SoundChannels.FX_SOUNDS);
            }
            else if (count === 3) {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN4, BOOM.SoundChannels.FX_SOUNDS);
            }
            else if (count === 4) {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.TILETURN5, BOOM.SoundChannels.FX_SOUNDS);
            }
        };
        CentreGroup.prototype._revealCorner = function () {
            this._arr_cornersTile.getValue(this._numberCornersRevealed).animateAndChangeCornerSymbol("4corners_" + (this._numberCornersRevealed + 1) + "_collected.png", 0);
            this._numberCornersRevealed++;
            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.BONUSREVEAL, BOOM.SoundChannels.FX_SOUNDS);
            if (this._numberCornersRevealed === 4) {
                this._numberCornersRevealed++;
                com.camelot.core.IWG.ame('bank', { deposit: [20], log: true });
                for (var i = 0; i < 4; i++) {
                    this._arr_cornersTile.getValue(i).flashWinReveal(4);
                }
                this.game.time.events.add(1000, function () {
                    this._arr_gridTile.getValue(0).flashWinReveal(0, function () {
                        BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
                    }, this);
                    this._arr_gridTile.getValue(5).flashWinReveal(1, function () {
                        BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
                    }, this);
                    this._arr_gridTile.getValue(30).flashWinReveal(2, function () {
                        BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
                    }, this);
                    this._arr_gridTile.getValue(35).flashWinReveal(3, function () {
                        BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
                    }, this);
                    this.winRevealHighlight.push(this.game.add.tween(this._arr_gridTile.getValue(0).getByName('goldBg')).to({ alpha: 0.3 }, 1000, Phaser.Easing.Linear.None, false, 3000, 2, true));
                    this.winRevealHighlight.push(this.game.add.tween(this._arr_gridTile.getValue(5).getByName('goldBg')).to({ alpha: 0.3 }, 1000, Phaser.Easing.Linear.None, false, 3000, 2, true));
                    this.winRevealHighlight.push(this.game.add.tween(this._arr_gridTile.getValue(30).getByName('goldBg')).to({ alpha: 0.3 }, 1000, Phaser.Easing.Linear.None, false, 3000, 2, true));
                    this.winRevealHighlight.push(this.game.add.tween(this._arr_gridTile.getValue(35).getByName('goldBg')).to({ alpha: 0.3 }, 1000, Phaser.Easing.Linear.None, false, 3000, 2, true));
                    this._startHighlights();
                }, this);
                this.game.time.events.add(2000, function () {
                    BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.BONUSWIN, BOOM.SoundChannels.FX_SOUNDS);
                    console.log('in');
                    var tween = this.game.add.tween(this._grp_cornersGroup.getByName("gold")).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                    tween.onComplete.add(function () {
                        this.game.add.tween(this._grp_cornersGroup.getByName("white")).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                    }, this);
                    this._grp_cornersGroup.getByName("gold").alpha = 1.0;
                }, this);
            }
        };
        CentreGroup.prototype._anticipationWin = function (type) {
            this._arr_colToAnticipation = [];
            this._arr_rowsToAnticipation = [];
            BOOM.SignalManager.instance.dispatch('gridNextRevealSignal', this);
        };
        ;
        CentreGroup.prototype._startHighlights = function () {
            for (var i = 0; i < this.winRevealHighlight.length; i++) {
                var tweens = this.winRevealHighlight[i];
                tweens.start();
            }
        };
        CentreGroup.prototype._stopHighlights = function () {
            for (var i = 0; i < this.winRevealHighlight.length; i++) {
                var tweens = this.winRevealHighlight[i];
                tweens.stop();
                console.log(tweens);
            }
        };
        CentreGroup.prototype._revealNextWin = function () {
            var _this = this;
            var bwt = this.game.time.create(true);
            var bigwinDelay = 150;
            var eft = this.game.time.create(true);
            var endFlashReveal = 1000;
            this._arr_rowsToReveal.forEach(function (row) {
                row.winReveal(0);
                eft.add(endFlashReveal, function () {
                    row.flashWinReveal();
                }, _this);
            });
            this._arr_colToReveal.forEach(function (col) {
                col.winReveal(0);
                eft.add(endFlashReveal, function () {
                    col.flashWinReveal();
                }, _this);
            });
            for (var i = 0; i < this._arr_tileWinToReveal.length; i++) {
                if (i === this._arr_tileWinToReveal.length - 1) {
                    bwt.add(bigwinDelay, function (i) {
                        _this._arr_tileWinToReveal[i].winRowReveal(0);
                    }, this, i);
                    eft.add(endFlashReveal, function (i) {
                        _this._arr_tileWinToReveal[i].flashWinReveal(i, function () {
                            this._arr_colToReveal = [];
                            this._arr_rowsToReveal = [];
                            this._arr_tileWinToReveal = [];
                            BOOM.SignalManager.instance.dispatch('gridNextRevealSignal', this);
                            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
                            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.LINEWIN, BOOM.SoundChannels.FX_SOUNDS);
                        }, _this);
                        com.camelot.core.IWG.ame('bank', { deposit: [_this._prize], log: true });
                    }, this, i);
                }
                else {
                    bwt.add(bigwinDelay, function (i) {
                        _this._arr_tileWinToReveal[i].winRowReveal(0);
                    }, this, i);
                    eft.add(endFlashReveal, function (i) {
                        _this._arr_tileWinToReveal[i].flashWinReveal(i, function () {
                            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS);
                        }, _this);
                    }, this, i);
                }
                bigwinDelay += 100;
                this.winRevealHighlight.push(this.game.add.tween(this._arr_tileWinToReveal[i].getByName('goldBg')).to({ alpha: 0.3 }, 1000, Phaser.Easing.Linear.None, false, 3000, 2, true));
                this._startHighlights();
            }
            ;
            bwt.start();
            eft.start();
        };
        ;
        return CentreGroup;
    }(BOOM.GameGroup));
    BOOM.CentreGroup = CentreGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            this._ticket = null;
            this._splashGroup = null;
            this._centreGroup = null;
            this._selectionGridGroup = null;
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
            _super.prototype.create.call(this);
            this.stage.disableVisibilityChange = false;
            var bgImage = com.camelot.core.iwgLoadQ.images.bg;
            var refDiv = document.getElementById('IWGholder');
            document.body.insertBefore(bgImage, refDiv);
            this._splashGroup = new BOOM.SplashGroup();
            this._centreGroup = new BOOM.CentreGroup();
            this._centreGroup.position.setTo(BOOM.GameManager.NATIVE_WIDTH, BOOM.GameManager.NATIVE_HEIGHT);
            this._centreGroup.alpha = 0;
            this._selectionGridGroup = new BOOM.SelectionGridGroup();
            this._selectionGridGroup.position.setTo(BOOM.GameManager.NATIVE_WIDTH, BOOM.GameManager.NATIVE_HEIGHT);
            this._selectionGridGroup.alpha = 0;
            this._endGameGroup = new BOOM.EndGameGroup();
            this._endGameGroup.position.setTo(770, 0);
            BOOM.SignalManager.instance.dispatch('initMainGame', function () {
                BOOM.GameManager.instance.checkIfMainGameIntroFinished();
            }, this);
        };
        MainGame.prototype._showGame = function () {
            this._centreGroup.position.setTo(0, 0);
            var fade = this.game.add.tween(this._centreGroup).to({ alpha: 1.0 }, 300, Phaser.Easing.Linear.None, true);
            this._selectionGridGroup.position.setTo(590, 150);
            var fade = this.game.add.tween(this._selectionGridGroup).to({ alpha: 1.0 }, 300, Phaser.Easing.Linear.None, true);
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
        Sounds.BACKGROUNDLOOP = "backgroundLoop";
        Sounds.BONUSREVEAL = "bonusReveal";
        Sounds.BONUSWIN = "bonusWin";
        Sounds.ENDLOSE = "endLose";
        Sounds.ENDWIN = "endWin";
        Sounds.PLAYBUTTON = "playButton";
        Sounds.PRESENTCLICK = "presentClick";
        Sounds.ROWWIN = "rowWin";
        Sounds.TILETURN = "tileTurn";
        Sounds.TILETURN2 = "tileTurn2";
        Sounds.TILETURN3 = "tileTurn3";
        Sounds.TILETURN4 = "tileTurn4";
        Sounds.TILETURN5 = "tileTurn5";
        Sounds.PRESENTSMASH = "presentSmash";
        Sounds.COUNT = "tick";
        Sounds.LINEWIN = "lineWin";
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
            var soundChannel = this._soundChannels.getValue(channelName);
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
            if (sound != null) {
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
            this._languageCurrency = null;
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
                this._legendManager = new BOOM.LegendManager(this);
                this._legendManager.setupLegend(this.getGameBoard(), this.getGameMultipliers(), [], true);
                this._languageCurrency = new BOOM.LanguageCurrencyManager();
                this._ticket.checkAmmount(this._legendManager.getTotalAmmount(this._ticket.getTurns()));
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
            BOOM.SignalManager.instance.add('resetGame', this._resetGameRowIndex, this);
            BOOM.SignalManager.instance.add('pauseAllTweens', this._pauseAllTweens, this);
            BOOM.SignalManager.instance.add('resumeAllTweens', this._resumeAllTweens, this);
            BOOM.SignalManager.instance.add('updateCompleteSignal', this._finishReveal, this);
            BOOM.SignalManager.instance.add('addSymbolToReveal', this._revealNextSymbol, this);
            BOOM.SignalManager.instance.add('buttonClick', this._incClickCount, this);
        };
        ;
        GameManager.prototype._unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('switchStateSignal', this._switchState, this);
            BOOM.SignalManager.instance.remove('updateCompletedGameRows', this._updateCompletedGameRows, this);
            BOOM.SignalManager.instance.remove('resetGame', this._resetGameRowIndex, this);
            BOOM.SignalManager.instance.remove('pauseAllTweens', this._pauseAllTweens, this);
            BOOM.SignalManager.instance.remove('resumeAllTweens', this._resumeAllTweens, this);
            BOOM.SignalManager.instance.remove('updateCompleteSignal', this._finishReveal, this);
            BOOM.SignalManager.instance.remove('addSymbolToReveal', this._revealNextSymbol, this);
            BOOM.SignalManager.instance.remove('buttonClick', this._incClickCount, this);
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
        GameManager.prototype.moveAcrossGroupsKeepingWorldTransform = function (object, targetObject) {
            var localTransform = new Phaser.Point();
            var objectWorldTransform = GameManager.instance.getWorldTransForm(object);
            var targetWorldTransform = GameManager.instance.getWorldTransForm(targetObject);
            localTransform.x = (objectWorldTransform.x - targetWorldTransform.x);
            localTransform.y = (objectWorldTransform.y - targetWorldTransform.y);
            targetObject.add(object);
            object.x = localTransform.x;
            object.y = localTransform.y;
        };
        GameManager.prototype.getWorldTransForm = function (object) {
            var objectWorldTransform = new Phaser.Point();
            objectWorldTransform.set(0, 0);
            var objectChecker = object;
            while (!(objectChecker instanceof Phaser.World)) {
                objectWorldTransform.x += objectChecker.x;
                objectWorldTransform.y += objectChecker.y;
                objectChecker = objectChecker.parent;
            }
            return objectWorldTransform;
        };
        GameManager.prototype._resetGameRowIndex = function () {
            this._currentTurnIndex = -1;
            this._completedGameRows = 0;
        };
        GameManager.prototype.getTicketManager = function () {
            return this._ticketManager;
        };
        GameManager.prototype.getErrorManager = function () {
            return this._errorManager;
        };
        GameManager.prototype.getLegendManager = function () {
            return this._legendManager;
        };
        GameManager.prototype.getGameBoard = function () {
            var boardData = this._ticket.getGrid();
            var board = [];
            var row = [];
            for (var i = 0; i < boardData.length; i++) {
                row.push(boardData[i]);
                if (i % 6 === 5) {
                    board.push(row);
                    row = [];
                }
            }
            return board;
        };
        ;
        GameManager.prototype.formatCurrency = function (numToFormat) {
            var retString = "\u00A3";
            if (typeof numToFormat === 'string') {
                numToFormat = numToFormat.replace(/\D/g, '');
                retString += this.prepNumbers(+numToFormat, 0, 3, ',', '.');
            }
            else {
                retString += this.prepNumbers(+numToFormat, 0, 3, ',', '.');
            }
            return retString;
        };
        ;
        GameManager.prototype.prepNumbers = function (numIn, n, x, s, c) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = numIn.toFixed(Math.max(0, ~~n));
            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };
        ;
        GameManager.prototype.getGameMultipliers = function () {
            var prizeList = [];
            for (var index = 0; index < BOOM.Ticket.instance.getPrizeList().length; index++) {
                prizeList.push(Number(BOOM.Ticket.instance.getPrizeList()[index]));
            }
            return prizeList;
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
        GameManager.prototype._finishReveal = function () {
            this._isRevealingSymbol = false;
            this._revealNextSymbol();
        };
        GameManager.prototype._revealNextSymbol = function (value) {
            if (value !== undefined) {
                this._queue.add(value);
            }
            else if (this._lastSymbolRevealed) {
                BOOM.SignalManager.instance.dispatch('endGameIntro');
            }
            if (!this._isRevealingSymbol && !this._queue.isEmpty()) {
                this._isRevealingSymbol = true;
                BOOM.SignalManager.instance.dispatch('populateGridSignal', this._queue.dequeue());
                ;
            }
            if (this._queue.isEmpty() && this._clickCount === 6) {
                this._lastSymbolRevealed = true;
            }
        };
        GameManager.prototype.getSymbol = function (index) {
            var string = null;
            switch (index) {
                case 0:
                    string = 'symbol_bauble.png';
                    break;
                case 1:
                    string = 'symbol_bell.png';
                    break;
                case 2:
                    string = 'symbol_candle.png';
                    break;
                case 3:
                    string = 'symbol_cane.png';
                    break;
                case 4:
                    string = 'symbol_gingerbread.png';
                    break;
                case 5:
                    string = 'symbol_holly.png';
                    break;
                case 6:
                    string = 'symbol_tree.png';
                    break;
                case 7:
                    string = 'symbol_snowflake.png';
                    break;
                case 8:
                    string = 'symbol_sack.png';
                    break;
                default:
                    throw new Error("Invalid tile number!");
            }
            return string;
        };
        GameManager.prototype._incClickCount = function () {
            this._clickCount++;
            if (this._clickCount === 6) {
                BOOM.SignalManager.instance.dispatch('disableButtons');
            }
            else {
                BOOM.SignalManager.instance.dispatch('animateIdle', 'restart');
            }
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
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(boxType) {
            var _this = this;
            _super.call(this);
            this._symbol = null;
            this._iconTop = null;
            this._iconBot = null;
            this._iconBow = null;
            this._shadow = null;
            this._value = 2;
            this._boxType = null;
            this._enabled = true;
            this._boxType = boxType;
            this._shadow = this.game.add.image(60, 70, "masterSS", "present" + boxType + "_shadow.png", this);
            this._shadow.anchor.setTo(0.5, 0.5);
            this._iconBot = this.game.add.image(60, 83, "masterSS", "present" + boxType + "_bottom.png", this);
            this._iconBot.anchor.setTo(0.5, 0.5);
            this._iconBot.inputEnabled = true;
            this._iconTop = this.game.add.sprite(60, 61, "masterSS", "present" + boxType + "_top.png", this);
            this._iconTop.anchor.setTo(0.5, 0.75);
            this._iconTop.inputEnabled = true;
            var x = 0;
            var y = 0;
            if (this._boxType === 1) {
                x = 70;
                y = 51;
            }
            else if (this._boxType === 2) {
                x = 60;
                y = 47;
            }
            else {
                x = 50;
                y = 51;
            }
            this._iconBow = this.game.add.image(x, y, "masterSS", "present" + boxType + "_bow.png", this);
            this._iconBow.anchor.setTo(0.5, 0.75);
            this._iconBow.inputEnabled = true;
            this._iconTop.events.onInputDown.add(function () {
                _this._click();
            }, this);
            this._iconBot.events.onInputDown.add(function () {
                _this._click();
            }, this);
            this._iconBow.events.onInputDown.add(function () {
                _this._click();
            }, this);
            this._iconBot.events.onInputOver.add(function () {
                BOOM.SignalManager.instance.dispatch('animateIdle', "stop");
                _this.scale.setTo(1.1, 1.1);
            }, this);
            this._iconBow.events.onInputOver.add(function () {
                BOOM.SignalManager.instance.dispatch('animateIdle', "stop");
                _this.scale.setTo(1.1, 1.1);
            }, this);
            this._iconTop.events.onInputOver.add(function () {
                BOOM.SignalManager.instance.dispatch('animateIdle', "stop");
                _this.scale.setTo(1.1, 1.1);
            }, this);
            this._iconBot.events.onInputOut.add(function () {
                BOOM.SignalManager.instance.dispatch('animateIdle', "restart");
                _this.scale.setTo(1, 1);
            }, this);
            this._iconBow.events.onInputOut.add(function () {
                BOOM.SignalManager.instance.dispatch('animateIdle', "restart");
                _this.scale.setTo(1, 1);
            }, this);
            this._iconTop.events.onInputOut.add(function () {
                BOOM.SignalManager.instance.dispatch('animateIdle', "restart");
                _this.scale.setTo(1, 1);
            }, this);
            var timeLine = null;
            this._idleTopAnimation = this.game.add.tween(this._iconTop).to({ angle: [0, 8, -8, 0] }, 1000, Phaser.Easing.Linear.None, false, 4000, -1);
            this._idleTopAnimation.repeatDelay(200);
            this._idleTopAnimation.interpolation(Phaser.Math.catmullRomInterpolation);
            this._idleBowAnimation = this.game.add.tween(this._iconBow).to({ angle: [0, 8, -8, 0] }, 1000, Phaser.Easing.Linear.None, false, 4000, -1);
            this._idleBowAnimation.repeatDelay(200);
            this._idleBowAnimation.interpolation(Phaser.Math.catmullRomInterpolation);
            this._iconBot.input.useHandCursor = true;
            this._iconBow.input.useHandCursor = true;
            this._iconTop.input.useHandCursor = true;
            this.pivot.set(60, 60);
        }
        Icon.prototype._click = function () {
            var _this = this;
            this._iconTop.inputEnabled = false;
            this._iconBot.inputEnabled = false;
            this._iconBow.inputEnabled = false;
            var index = BOOM.Ticket.instance.getNextTurn();
            var iconString = this._getSymbol(Number(index.value));
            this._symbol = this.game.add.image(60, 70, "masterSS", iconString, this);
            this._symbol.anchor.setTo(0.5, 0.5);
            this._symbol.alpha = 0;
            this._symbol.scale.setTo(0, 0);
            var timeLine = null;
            timeLine = this.game.add.tween(this._iconBot).to({ angle: [0, 8, -8, 0, 8, -8, 0] }, 800, Phaser.Easing.Linear.None, true);
            timeLine = this.game.add.tween(this._iconTop).to({ angle: [0, -8, 8, 0, -8, 8, 0] }, 800, Phaser.Easing.Linear.None, true, 50);
            timeLine = this.game.add.tween(this._iconBow).to({ angle: [0, 5, -5, 0, 5, -5, 0] }, 800, Phaser.Easing.Linear.None, true, 100);
            timeLine.interpolation(Phaser.Math.catmullRomInterpolation);
            timeLine.onComplete.add(function () {
                BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.PRESENTSMASH, BOOM.SoundChannels.FX_SOUNDS);
                _this._iconBot.destroy();
                _this._iconTop.destroy();
                _this._iconBow.destroy();
                _this._shadow.destroy();
                var revealFrames = [
                    new BOOM.Particle(['present' + _this._boxType + '_top.png'], 1, { min: -300, max: 300 }, { min: -200, max: -700 }, 0, -25, 2000, 30, 30),
                    new BOOM.Particle(['present' + _this._boxType + '_bottom.png'], 1, { min: -300, max: 300 }, { min: -100, max: -700 }, 0, 25, 2000, 30, 30),
                    new BOOM.Particle(['present' + _this._boxType + '_bow.png'], 1, { min: -300, max: 300 }, { min: -400, max: -700 }, 0, -35, 2000, 30, 30),
                ];
                BOOM.Reveals.Pop_Reveal(_this._iconBot, _this._symbol, _this, 'masterSS', revealFrames, function () {
                    _this.game.add.tween(_this._symbol).to({ alpha: 1 }, 800, Phaser.Easing.Quadratic.InOut, true);
                    _this.game.add.tween(_this._symbol.scale).to({ x: 1, y: 1 }, 800, Phaser.Easing.Bounce.Out, true);
                }, _this);
            }, this);
            BOOM.SignalManager.instance.dispatch('Audio.playAudio', BOOM.Sounds.PRESENTCLICK, BOOM.SoundChannels.FX_SOUNDS);
            BOOM.SignalManager.instance.dispatch('buttonClick');
            BOOM.SignalManager.instance.dispatch('addSymbolToReveal', (Number(BOOM.Ticket.instance.getCurrentTurn().value)), this);
        };
        Icon.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('disableButtons', this._disable, this);
            BOOM.SignalManager.instance.add('animateIdle', this._idleAnimationControl, this);
        };
        ;
        Icon.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('disableButtons', this._disable, this);
            BOOM.SignalManager.instance.remove('animateIdle', this._idleAnimationControl, this);
        };
        ;
        Icon.prototype._getSymbol = function (index) {
            var string = null;
            switch (index) {
                case 0:
                    string = 'symbol_bauble.png';
                    break;
                case 1:
                    string = 'symbol_bell.png';
                    break;
                case 2:
                    string = 'symbol_candle.png';
                    break;
                case 3:
                    string = 'symbol_cane.png';
                    break;
                case 4:
                    string = 'symbol_gingerbread.png';
                    break;
                case 5:
                    string = 'symbol_holly.png';
                    break;
                case 6:
                    string = 'symbol_tree.png';
                    break;
                case 7:
                    string = 'symbol_snowflake.png';
                    break;
                case 8:
                    string = 'symbol_sack.png';
                    break;
                default:
                    throw new Error("Invalid tile number!");
            }
            return string;
        };
        Icon.prototype._tweenTint = function (spriteToTween, startColor, endColor, duration) {
            var colorBlend = { step: 0 };
            this.game.add.tween(colorBlend).to({ step: 100 }, duration, Phaser.Easing.Default, false)
                .onUpdateCallback(function () {
                spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);
            })
                .start();
        };
        Icon.prototype._disable = function () {
            var _this = this;
            this._iconTop.inputEnabled = false;
            this._iconBot.inputEnabled = false;
            this._iconBow.inputEnabled = false;
            this._iconBot.input.useHandCursor = false;
            this._iconBow.input.useHandCursor = false;
            this._iconTop.input.useHandCursor = false;
            var timer = this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                _this._tweenTint(_this._iconTop, 0xffffff, 0x737373, 1000);
                _this._tweenTint(_this._iconBot, 0xffffff, 0x737373, 1000);
                _this._tweenTint(_this._iconBow, 0xffffff, 0x737373, 1000);
                _this._idleAnimationControl('stop');
            }, this);
        };
        Icon.prototype._idleAnimationControl = function (state) {
            if (state === "start") {
                this._idleTopAnimation.start();
                this._idleBowAnimation.start();
                return true;
            }
            else if (state === "restart") {
                this._idleTopAnimation.stop();
                this._idleBowAnimation.stop();
                this._iconTop.angle = 0;
                this._iconBow.angle = 0;
                this._idleTopAnimation = this.game.add.tween(this._iconTop).to({ angle: [0, 8, -8, 0] }, 1000, Phaser.Easing.Linear.None, false, 4000, -1);
                this._idleTopAnimation.repeatDelay(200);
                this._idleTopAnimation.interpolation(Phaser.Math.catmullRomInterpolation);
                this._idleBowAnimation = this.game.add.tween(this._iconBow).to({ angle: [0, 8, -8, 0] }, 1000, Phaser.Easing.Linear.None, false, 4000, -1);
                this._idleBowAnimation.repeatDelay(200);
                this._idleBowAnimation.interpolation(Phaser.Math.catmullRomInterpolation);
                this._idleTopAnimation.start();
                this._idleBowAnimation.start();
                return true;
            }
            else if (state === "stop") {
                this._idleTopAnimation.stop(true);
                this._idleBowAnimation.stop(true);
                this._iconTop.angle = 0;
                this._iconBow.angle = 0;
                return true;
            }
            return false;
        };
        return Icon;
    }(BOOM.GameGroup));
    BOOM.Icon = Icon;
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
            var lines = this.game.add.image(0, 0, "masterSS", "sound_line.png", this);
            lines.anchor.setTo(0.5, 0.5);
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
        };
        ;
        SoundButton.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('moveSoundButton', this._move, this);
        };
        ;
        SoundButton.prototype._move = function () {
            this.position.setTo(766, 510);
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
    var OverlayGroup = (function (_super) {
        __extends(OverlayGroup, _super);
        function OverlayGroup(smallButtonx, smallbuttonY, isTrial, overlayType, trialPosition, audioSettings) {
            _super.call(this);
            this._isTrial = -1;
            this._thisType = OverlayGroup.NONE;
            this._thisTrialPos = OverlayGroup.TRIAL_TOP;
            this._thisAudioType = OverlayGroup.AUDIO_COMBINED;
            this._btn_smallAudioButton = null;
            this._btn_smallMenuCog = null;
            this._gfx_bgDim = null;
            this._grp_menuGroup = null;
            this._img_menu = null;
            this._img_menuBG = null;
            this._btn_audioAll = null;
            this._btn_audioMusic = null;
            this._trialBanner = null;
            this._menuShowing = false;
            this._menuAnimating = false;
            this._smallX = -1;
            this._smallY = -1;
            this._isTrial = isTrial;
            this._smallX = smallButtonx;
            this._smallY = smallbuttonY;
            if (overlayType != null) {
                this._thisType = overlayType;
            }
            if (trialPosition != null) {
                this._thisTrialPos = trialPosition;
            }
            if (audioSettings != null) {
                this._thisAudioType = audioSettings;
                if (!(this._thisType === OverlayGroup.FULLMENU) && (this._thisAudioType === OverlayGroup.AUDIO_SPLIT)) {
                    this._thisAudioType = OverlayGroup.AUDIO_COMBINED;
                }
            }
            if (this._isTrial) {
                this._trialBanner = this.game.make.image(0, 0, 'overlay', 'trial');
                this.add(this._trialBanner);
            }
            if (this._thisType === OverlayGroup.FULLMENU) {
                this._addFullMenu();
            }
            else if (this._thisType === OverlayGroup.MINI) {
                this._addSmallAudioButton();
            }
        }
        OverlayGroup.prototype.subscribeSignals = function () {
        };
        ;
        OverlayGroup.prototype.unsubscribeSignals = function () {
        };
        ;
        OverlayGroup.prototype._addTextToMenu = function () {
        };
        OverlayGroup.prototype._addSmallAudioButton = function () {
            var _this = this;
            var tex = "settings_audio";
            if (OverlayGroup._audioMuted) {
                tex += '_off';
            }
            else {
                tex += '_on';
            }
            this._btn_smallAudioButton = this.game.make.sprite(this._smallX, this._smallY, 'overlay', tex);
            this.add(this._btn_smallAudioButton);
            this._btn_smallAudioButton.anchor.setTo(.5, .5);
            this._btn_smallAudioButton.inputEnabled = true;
            this._btn_smallAudioButton.events.onInputUp.add(function () {
                _this._btn_smallAudioButton.scale.setTo(1, 1);
                if (_this._btn_smallAudioButton.getBounds().contains(_this.game.input.mousePointer.x, _this.game.input.mousePointer.y) || _this.game.input.mousePointer.x === -1) {
                    if (_this._audioToggle()) {
                        _this._btn_smallAudioButton.loadTexture("overlay", 'settings_audio_off');
                    }
                    else {
                        _this._btn_smallAudioButton.loadTexture("overlay", 'settings_audio_on');
                    }
                }
            }, this);
            this._btn_smallAudioButton.events.onInputDown.add(function () {
                _this._btn_smallAudioButton.scale.setTo(.9, .9);
            }, this);
        };
        OverlayGroup.prototype._addFullMenu = function () {
            var _this = this;
            this._gfx_bgDim = this.game.make.graphics(0, 0);
            this.add(this._gfx_bgDim);
            this._gfx_bgDim.beginFill(0x000000, 0.65);
            this._gfx_bgDim.drawRect(0, 0, BOOM.GameManager.instance.width, BOOM.GameManager.instance.height);
            this._gfx_bgDim.endFill();
            this._gfx_bgDim.alpha = 0;
            this._gfx_bgDim.inputEnabled = false;
            this._gfx_bgDim.events.onInputUp.add(function () {
                if (_this._menuShowing === true) {
                    _this._closeMenu();
                }
            }, this);
            this._btn_smallMenuCog = this.game.make.sprite(this._smallX, this._smallY, 'overlay', 'settings_cog');
            this.add(this._btn_smallMenuCog);
            this._btn_smallMenuCog.anchor.setTo(.5, .5);
            this._btn_smallMenuCog.inputEnabled = true;
            this._btn_smallMenuCog.events.onInputUp.add(function () {
                _this._btn_smallMenuCog.scale.setTo(1, 1);
                if (_this._btn_smallMenuCog.getBounds().contains(_this.game.input.mousePointer.x, _this.game.input.mousePointer.y) || _this.game.input.mousePointer.x === -1) {
                    if (_this._menuShowing === true) {
                        _this._closeMenu();
                    }
                    else {
                        _this._openMenu();
                    }
                }
            }, this);
            this._btn_smallMenuCog.events.onInputDown.add(function () {
                _this._btn_smallMenuCog.scale.setTo(.9, .9);
            }, this);
            this._grp_menuGroup = this.game.make.group();
            this.add(this._grp_menuGroup);
            this._grp_menuGroup.position.setTo(460, 265);
            this._grp_menuGroup.position.y += 530;
            this._img_menu = this.game.make.image(0, 0, 'overlay', 'instructions_frame');
            this._img_menu.anchor.setTo(.5, .5);
            this._grp_menuGroup.add(this._img_menu);
            this._img_menuBG = this.game.make.image(0, -51, 'overlay', 'overlay_top');
            this._img_menuBG.anchor.setTo(.5, .5);
            this._grp_menuGroup.add(this._img_menuBG);
            if (this._thisAudioType === OverlayGroup.AUDIO_SPLIT) {
                var tex = "icon_allsounds";
                if (OverlayGroup._audioMuted) {
                    tex += '_off';
                }
                this._btn_audioAll = this.game.make.sprite(-170, 190, 'overlay', tex);
                this._btn_audioAll.anchor.setTo(.5, .5);
                this._grp_menuGroup.add(this._btn_audioAll);
                this._btn_audioAll.inputEnabled = true;
                this._btn_audioAll.events.onInputUp.add(function () {
                    if (_this._btn_audioAll.getBounds().contains(_this.game.input.mousePointer.x, _this.game.input.mousePointer.y) || _this.game.input.mousePointer.x === -1) {
                        var ret = _this._audioToggle();
                        console.log(ret);
                        if (ret) {
                            _this._btn_audioAll.loadTexture("overlay", "icon_allsounds_off");
                            if (_this._btn_audioMusic != null) {
                                _this._btn_audioMusic.loadTexture("overlay", "icon_music_off");
                            }
                        }
                        else {
                            _this._btn_audioAll.loadTexture("overlay", "icon_allsounds");
                            if (!OverlayGroup._musicMuted) {
                                if (_this._btn_audioMusic != null) {
                                    _this._btn_audioMusic.loadTexture("overlay", "icon_music");
                                }
                            }
                        }
                    }
                }, this);
                tex = "icon_music";
                if (OverlayGroup._musicMuted) {
                    tex += '_off';
                }
                this._btn_audioMusic = this.game.make.sprite(170, 190, 'overlay', tex);
                this._btn_audioMusic.anchor.setTo(.5, .5);
                this._grp_menuGroup.add(this._btn_audioMusic);
                this._btn_audioMusic.inputEnabled = true;
                this._btn_audioMusic.events.onInputUp.add(function () {
                    if (_this._btn_audioMusic.getBounds().contains(_this.game.input.mousePointer.x, _this.game.input.mousePointer.y) || _this.game.input.mousePointer.x === -1) {
                        if (_this._musicToggle()) {
                            _this._btn_audioMusic.loadTexture("overlay", "icon_music_off");
                        }
                        else {
                            _this._btn_audioMusic.loadTexture("overlay", "icon_music");
                        }
                    }
                }, this);
            }
            else {
                var tex = "icon_mute";
                if (OverlayGroup._audioMuted) {
                    tex += '_off';
                }
                this._btn_audioAll = this.game.make.sprite(0, 190, 'overlay', tex);
                this._btn_audioAll.anchor.setTo(.5, .5);
                this._grp_menuGroup.add(this._btn_audioAll);
                this._btn_audioAll.inputEnabled = true;
                this._btn_audioAll.events.onInputUp.add(function () {
                    if (_this._btn_audioAll.getBounds().contains(_this.game.input.mousePointer.x, _this.game.input.mousePointer.y) || _this.game.input.mousePointer.x === -1) {
                        if (_this._audioToggle()) {
                            _this._btn_audioAll.loadTexture("overlay", "icon_mute_off");
                        }
                        else {
                            _this._btn_audioAll.loadTexture("overlay", "icon_mute");
                        }
                    }
                }, this);
            }
            this._addTextToMenu();
        };
        OverlayGroup.prototype._openMenu = function () {
            var _this = this;
            if (this._thisType === OverlayGroup.FULLMENU) {
                if (this._menuAnimating === false) {
                    this._menuAnimating = true;
                    this._btn_smallMenuCog.inputEnabled = false;
                    var spinIconTween = this.game.add.tween(this._btn_smallMenuCog).to({ rotation: Math.PI * 3 }, 1200, Phaser.Easing.Quadratic.InOut, true);
                    var moveUpMenuTween = this.game.add.tween(this._grp_menuGroup).to({ y: this._grp_menuGroup.y - 530 }, 1200, Phaser.Easing.Quadratic.InOut, true);
                    this._gfx_bgDim.visible = true;
                    var fadeInBGTween = this.game.add.tween(this._gfx_bgDim).to({ alpha: 1 }, 1200, Phaser.Easing.Quadratic.InOut, true);
                    fadeInBGTween.onComplete.add(function () {
                        _this._gfx_bgDim.inputEnabled = true;
                        _this._btn_smallMenuCog.inputEnabled = true;
                        _this._menuAnimating = false;
                        _this._menuShowing = true;
                    }, this);
                }
            }
        };
        OverlayGroup.prototype._closeMenu = function () {
            var _this = this;
            if (this._thisType === OverlayGroup.FULLMENU) {
                if (this._menuAnimating === false) {
                    this._menuAnimating = true;
                    this._gfx_bgDim.inputEnabled = false;
                    this._btn_smallMenuCog.inputEnabled = false;
                    var spinIconTween = this.game.add.tween(this._btn_smallMenuCog).to({ rotation: -Math.PI * 3 }, 1200, Phaser.Easing.Quadratic.InOut, true);
                    var moveUpMenuTween = this.game.add.tween(this._grp_menuGroup).to({ y: this._grp_menuGroup.y + 530 }, 1200, Phaser.Easing.Quadratic.InOut, true);
                    this._gfx_bgDim.visible = true;
                    var fadeInBGTween = this.game.add.tween(this._gfx_bgDim).to({ alpha: 0 }, 1200, Phaser.Easing.Quadratic.InOut, true);
                    fadeInBGTween.onComplete.add(function () {
                        _this._btn_smallMenuCog.inputEnabled = true;
                        _this._menuAnimating = false;
                        _this._menuShowing = false;
                    }, this);
                }
            }
        };
        OverlayGroup.prototype._musicToggle = function () {
            if (OverlayGroup._musicMuted === true) {
                if (!OverlayGroup._audioMuted) {
                }
                else {
                    return true;
                }
                OverlayGroup._musicMuted = false;
                return false;
            }
            else {
                if (OverlayGroup._audioMuted) {
                    return true;
                }
                OverlayGroup._musicMuted = true;
                return true;
            }
        };
        OverlayGroup.prototype._audioToggle = function () {
            if (OverlayGroup._audioMuted === true) {
                if (!OverlayGroup._musicMuted) {
                }
                OverlayGroup._audioMuted = false;
                return false;
            }
            else {
                OverlayGroup._audioMuted = true;
                return true;
            }
        };
        OverlayGroup.NONE = "noOverlayGroup";
        OverlayGroup.MINI = "audioButton";
        OverlayGroup.FULLMENU = "fullMenu";
        OverlayGroup.TRIAL_TOP = "trialTop";
        OverlayGroup.TRIAL_BTM = "trialBtm";
        OverlayGroup.AUDIO_SPLIT = "audioSplit";
        OverlayGroup.AUDIO_COMBINED = "audioComined";
        OverlayGroup._musicMuted = false;
        OverlayGroup._audioMuted = false;
        return OverlayGroup;
    }(BOOM.GameGroup));
    BOOM.OverlayGroup = OverlayGroup;
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
            this.addBitmapFont("prizes-export", 0);
            this.addBitmapFont("endamounts-export", 3);
            this.addSound("backgroundLoop");
            this.addSound("bonusReveal");
            this.addSound("bonusWin");
            this.addSound("endLose");
            this.addSound("endWin");
            this.addSound("playButton");
            this.addSound("presentClick");
            this.addSound("rowWin");
            this.addSound("tileTurn");
            this.addSound("tileTurn2");
            this.addSound("tileTurn3");
            this.addSound("tileTurn4");
            this.addSound("tileTurn5");
            this.addSound("presentSmash");
            this.addSound("tick");
            this.addSound("lineWin");
            BOOM.GameManager.instance.getAudioManager().addSoundChannel(BOOM.SoundChannels.BACKGROUND, 0.3);
            BOOM.GameManager.instance.getAudioManager().addSoundChannel(BOOM.SoundChannels.FX_SOUNDS, 1);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.BACKGROUNDLOOP, BOOM.SoundChannels.BACKGROUND, 0.3, true, 0.3, false);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.BONUSREVEAL, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.BONUSWIN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.ENDLOSE, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.ENDWIN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.PLAYBUTTON, BOOM.SoundChannels.FX_SOUNDS, 0.5, false, 0.5, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.PRESENTCLICK, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.ROWWIN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILETURN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILETURN2, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILETURN3, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILETURN4, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.TILETURN5, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.PRESENTSMASH, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.COUNT, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.GameManager.instance.getAudioManager().addSound(this.game, BOOM.Sounds.LINEWIN, BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            BOOM.SignalManager.instance.dispatch('switchStateSignal', 'MainGame');
            com.camelot.core.IWG.ame('killloader');
        };
        return CamelotPreloader;
    }(BOOM.GameState));
    BOOM.CamelotPreloader = CamelotPreloader;
})(BOOM || (BOOM = {}));
//# sourceMappingURL=initGameNC.js.map