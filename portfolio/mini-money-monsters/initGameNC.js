var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IWG;
(function (IWG) {
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
            this._config = config;
            if (this.checkLanguageSupport(language.toLowerCase())) {
                this._selectedLanguage = language.toLowerCase();
            }
            else {
                this._selectedLanguage = "en";
                console.warn("Language '", language.toLowerCase(), "' not found, defaulting to 'en'.");
            }
            if (this.checkCurrencySupport(currency.toUpperCase())) {
                this._selectedCurrency = currency.toUpperCase();
            }
            else {
                this._selectedCurrency = "GBP";
                console.warn("Currency '", currency.toUpperCase(), "' not found, defaulting to 'GBP'.");
            }
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
            { country: "United States", currency: "Dollar", ISOCode: "USD", minorPresent: true, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Euro Member Countries", currency: "Euro", ISOCode: "EUR", minorPresent: false, majorSymbol: "€", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "R", minorPosition: "", majorDelimiter: ".", minorDelimiter: "," },
            { country: "Japan", currency: "Yen", ISOCode: "JPY", minorPresent: false, majorSymbol: "¥", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Mexico", currency: "Peso", ISOCode: "MXN", minorPresent: false, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." }
        ];
        return LanguageCurrencyManager;
    }());
    IWG.LanguageCurrencyManager = LanguageCurrencyManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
            this._horizontalHeight = 0;
            this.gameLoaded = false;
        }
        Boot.prototype.preload = function () {
            this.load.image('sideplay', './assets/loader/sideplay.png');
            this.load.image('entertainment', './assets/loader/entertainment.png');
            this.load.json("langConfig", "./js/langConfig.json");
        };
        Boot.prototype.create = function () {
            var _this = this;
            IWG.Debug.instance.log("Boot created", IWG.DEBUGTYPE.INIT, this);
            IWG.LanguageCurrencyManager.instance.init(this.cache.getJSON("langConfig"), "en", "GBP", false, false);
            console.warn("Remember to scrape the webpage to get the appropriate values for the language and currency handler");
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignVertically = true;
            this.scale.refresh();
            this.game.time.desiredFps = 60;
            this.game.tweens.frameBased = true;
            if (!this.game.device.desktop) {
                IWG.DeviceManager.instance.fullscreen = true;
                IWG.DeviceManager.instance.orientation = true;
                IWG.DeviceManager.instance.init();
                IWG.DeviceManager.instance.update();
            }
            var done = false;
            window.addEventListener("scroll", function () {
                if (document.body.scrollTop > 80) {
                    _this.removeSlideUp();
                    if (!done) {
                        done = true;
                    }
                }
            });
            var font = {
                google: {
                    families: ['Cabin Sketch::latin', 'Quattrocento::latin', 'Noto+Sans:400,700:latin']
                },
                active: function () {
                    IWG.SignalManager.instance.dispatch('states.SwitchState', 'Preloader');
                },
                timeout: 5000,
                inactive: function () {
                    IWG.Debug.instance.error("font could not be loaded :C", IWG.DEBUGTYPE.ERROR);
                    IWG.SignalManager.instance.dispatch('states.SwitchState', 'Preloader');
                }
            };
            WebFont.load(font);
        };
        Boot.prototype.removeSlideUp = function () {
            this._fullScreenMask.className = "fs_off";
        };
        Boot.prototype.addFullScreenOverlays = function () {
            this._gameArea = document.getElementById('gameArea');
            this._state = null;
            this._rotationDiv = document.createElement("div");
            this._fullScreenMask = document.createElement("div");
            this._fullScreenMask.id = "fullScreenMask";
            this._rotationDiv.id = "rotateDevice";
            this._fullScreenMask.className = "fs_off";
            this._rotationDiv.className = "hide";
            var slideText = document.createElement("p");
            slideText.appendChild(document.createTextNode('Slide up to start'));
            this._fullScreenMask.appendChild(slideText);
            document.body.appendChild(this._rotationDiv);
            document.body.appendChild(this._fullScreenMask);
        };
        Boot.prototype.goToFullscreen = function () {
            console.log(this.scale.isFullScreen);
            if (!this.scale.isFullScreen) {
                this.scale.startFullScreen(false, false);
                this._rotationDiv.className = "hide";
                if (!this.gameLoaded) {
                    this.game.state.start('Preloader', true, false);
                    this.gameLoaded = true;
                }
            }
        };
        Boot.prototype.onFullscreenChange = function () {
            if (this.scale.isFullScreen) {
                console.log('Game is in fullscreen');
                this.game.input.onUp.remove(this.goToFullscreen, this);
            }
            else {
                console.log('Game is NOT in fullscreen');
                this.scale.stopFullScreen();
                this.game.input.onUp.add(this.goToFullscreen, this);
                this.game.scale.refresh();
            }
        };
        Boot.prototype.gameResized = function () {
            if (this._horizontalHeight !== null && this._horizontalHeight !== undefined && window.innerHeight < this._horizontalHeight) {
                this._fullScreenMask.className = "fs_on";
            }
        };
        Boot.prototype.enterIncorrectOrientation = function () {
            this.orientated = false;
            this._rotationDiv.className = "show";
            this._gameArea.className = "hide";
            this.scale.scaleMode = this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        Boot.prototype.leaveIncorrectOrientation = function () {
            this.orientated = true;
            this._rotationDiv.className = "hide";
            this._gameArea.className = "show";
        };
        return Boot;
    }(Phaser.State));
    IWG.Boot = Boot;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var GameGroup = (function (_super) {
        __extends(GameGroup, _super);
        function GameGroup() {
            _super.call(this, IWG.GameManager.instance);
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
            IWG.SignalManager.instance.add('states.SwitchState', this._onStateSwitch, this);
        };
        GameGroup.prototype._onStateSwitch = function () {
            this.destroy();
        };
        GameGroup.prototype.destroy = function () {
            this.unsubscribeSignals();
            IWG.SignalManager.instance.remove('states.SwitchState', this._onStateSwitch, this);
            _super.prototype.destroy.call(this, true, false);
        };
        ;
        return GameGroup;
    }(Phaser.Group));
    IWG.GameGroup = GameGroup;
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
            IWG.SignalManager.instance.add('states.SwitchState', this._onStateSwitch, this);
        };
        GameState.prototype._onStateSwitch = function () {
            this.destroy();
        };
        GameState.prototype.destroy = function () {
            this.unsubscribeSignals();
            IWG.SignalManager.instance.remove('states.SwitchState', this._onStateSwitch, this);
        };
        ;
        GameState.prototype.create = function () {
            this._addStateSwitch();
            this.subscribeSignals();
        };
        return GameState;
    }(Phaser.State));
    IWG.GameState = GameState;
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
            IWG.SignalManager.instance.add('states.SwitchState', this._onStateSwitch, this);
        };
        NonDisplayObject.prototype._onStateSwitch = function () {
            this.destroy();
        };
        NonDisplayObject.prototype.destroy = function () {
            this.unsubscribeSignals();
            IWG.SignalManager.instance.remove('states.SwitchState', this._onStateSwitch, this);
        };
        ;
        return NonDisplayObject;
    }());
    IWG.NonDisplayObject = NonDisplayObject;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var MainGameGroup = (function (_super) {
        __extends(MainGameGroup, _super);
        function MainGameGroup() {
            _super.call(this);
            this._logo = null;
            this._iconArray = [];
            this._instructions = null;
            this.game.add.sprite(545, 20, "masterSS", "GRID_box.png", this);
            this._logo = this.game.add.sprite(45, -10, "masterSS", "LOGO_small.png", this);
            var centreGroup = new IWG.CentreGroup();
            centreGroup.position.setTo(492, 50);
            this.add(centreGroup);
            this._setupSelection();
            var bonusGame = new IWG.BonusGroup();
            bonusGame.position.setTo(115, 510);
            this.add(bonusGame);
            this.game.add.image(550, 590, "masterSS", "instructions.png", this);
        }
        MainGameGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('SplashScreenGroup.mainGameIntro', this._mainGameIntro, this);
            IWG.SignalManager.instance.add('endGameIntro', this._fadeLogo, this);
        };
        MainGameGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('SplashScreenGroup.mainGameIntro', this._mainGameIntro, this);
            IWG.SignalManager.instance.remove('endGameIntro', this._fadeLogo, this);
        };
        MainGameGroup.prototype._setupSelection = function () {
            var x = 70;
            var y = 190;
            for (var i = 0; i < 9; i++) {
                if (i % 3 === 0 && i !== 0) {
                    y = y + 110;
                    x = 70;
                }
                else if (i !== 0) {
                    x = x + 140;
                }
                var icon = new IWG.Icon();
                this._iconArray.push(icon);
                this.add(icon);
                icon.position.setTo(x, y);
            }
        };
        MainGameGroup.prototype._mainGameIntro = function () {
            this.game.add.tween(this).to({ alpha: 1 }, 500, 'Linear', true, 0, 0, false);
            IWG.SignalManager.instance.dispatch('MainGameGroup.moveSoundButton', { x: 450, y: 550 });
            IWG.SignalManager.instance.dispatch('Icon.animateIdle', "start");
            var soundTimer = this.game.time.create(false);
            var random = this.game.rnd.integerInRange(4000, 9000);
            var rand = this.game.rnd.integerInRange(1, 3);
            soundTimer.loop(random, function () {
                if (rand === 1) {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.GREMLIN1, IWG.SoundChannels.FX_SOUNDS);
                }
                else if (rand === 2) {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.GREMLIN2, IWG.SoundChannels.FX_SOUNDS);
                }
                else if (rand === 3) {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.GREMLIN3, IWG.SoundChannels.FX_SOUNDS);
                }
                random = this.game.rnd.integerInRange(2000, 7000);
                rand = this.game.rnd.integerInRange(1, 3);
            }, this);
            soundTimer.start();
        };
        MainGameGroup.prototype._fadeLogo = function (logoDelay) {
            this.game.add.tween(this._logo).to({ alpha: 0 }, 500, 'Linear', true);
        };
        return MainGameGroup;
    }(IWG.GameGroup));
    IWG.MainGameGroup = MainGameGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            this._splashScreenGroup = null;
            this._mainGameGroup = null;
            this._endGameGroup = null;
        }
        MainGame.prototype.subscribeSignals = function () {
        };
        ;
        MainGame.prototype.unsubscribeSignals = function () {
        };
        ;
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            IWG.Debug.instance.log('[states/MainGame.ts] [create] MainGame created!', IWG.DEBUGTYPE.CORE);
            var background = this.game.add.image(0, 0, 'bg');
            background.height = this.game.height;
            background.width = this.game.width;
            background.smoothed = true;
            this.stage.disableVisibilityChange = true;
            this._splashScreenGroup = new IWG.SplashScreenGroup();
            this.add.existing(this._splashScreenGroup);
            this._mainGameGroup = new IWG.MainGameGroup();
            this._mainGameGroup.alpha = 0;
            this._endGameGroup = new IWG.EndScreenGroup();
            this._endGameGroup.alpha = 1;
            this.add.existing(this._mainGameGroup);
            this.add.existing(this._endGameGroup);
            IWG.SignalManager.instance.checkAllSignals();
            this.add.existing(new IWG.OverlayGroup(100, 100, (false), IWG.OverlayGroup.MINI, IWG.OverlayGroup.TRIAL_TOP, IWG.OverlayGroup.AUDIO_COMBINED));
            this._dustFairies(24);
            var div = document.createElement('div');
            div.id = "background-div";
            div.style.position = "absolute";
            var backImage = document.createElement('img');
            backImage.id = "background";
            backImage.setAttribute('src', 'assets/img/largebg.png');
            backImage.setAttribute('height', '100');
            backImage.setAttribute('width', '100');
            div.appendChild(backImage);
            document.getElementById('gameArea').appendChild(div);
            window.addEventListener('resize', IWG.GameManager.instance.resize);
            IWG.GameManager.instance.resize();
        };
        ;
        MainGame.prototype._dustFairies = function (number) {
            var farieArray = [];
            for (var i = 0; i < number; i++) {
                var element = this.game.add.sprite(this.game.rnd.integerInRange(100, 400), this.game.rnd.integerInRange(100, 400), "masterSS", "background_dust" + this.game.rnd.integerInRange(1, 3) + ".png", this._splashScreenGroup);
                farieArray.push(element);
                this.game.add.tween(element).to({
                    x: element.position.x + this.game.rnd.integerInRange(0, 20),
                    y: element.position.y + this.game.rnd.integerInRange(0, 20) }, this.game.rnd.integerInRange(4000, 10000), "Linear", true, this.game.rnd.integerInRange(0, 2000), -1, true);
            }
        };
        MainGame.SPRITESHEET_ID = "game0";
        return MainGame;
    }(IWG.GameState));
    IWG.MainGame = MainGame;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Sounds = (function () {
        function Sounds() {
        }
        Sounds.BACKGROUND = 'background';
        Sounds.CLICK = 'click';
        Sounds.PLAYSTART = 'playstart';
        Sounds.REVEAL = 'reveal';
        Sounds.BASKETREVEAL = 'basketreveal';
        Sounds.SUSHISHOW = 'sushishow';
        Sounds.TICKER = 'ticker';
        Sounds.BONUSCOLLECT = 'BONUSCOLLECT';
        Sounds.BONUSWIN = 'bonusWin';
        Sounds.BOXSMOKE = 'boxSmoke';
        Sounds.COUNTUP = 'countUp';
        Sounds.ENDWIN = 'endWin';
        Sounds.ENDLOSE = 'endLose';
        Sounds.MONSTER1 = 'monster1';
        Sounds.MONSTER2 = 'monster2';
        Sounds.MONSTER3 = 'monster3';
        Sounds.MONSTER4 = 'monster4';
        Sounds.MONSTERSPLAT = 'monsterSplat';
        Sounds.ROLLOVER = 'rollover';
        Sounds.ROWWIN = 'rowWin';
        Sounds.WOODHIT = 'woodHit';
        Sounds.GREMLIN1 = 'gremlin1';
        Sounds.GREMLIN2 = 'gremlin2';
        Sounds.GREMLIN3 = 'gremlin3';
        return Sounds;
    }());
    IWG.Sounds = Sounds;
    ;
    var SoundChannels = (function () {
        function SoundChannels() {
        }
        SoundChannels.BACKGROUND = 'background';
        SoundChannels.FX_SOUNDS = 'fx_sounds';
        return SoundChannels;
    }());
    IWG.SoundChannels = SoundChannels;
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
            this._sound = new Phaser.Sound(game, name, this._currentVolume, isLoop);
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
            IWG.Debug.instance.log("Audio Manager has been initialised and added.", IWG.DEBUGTYPE.INIT, this);
        }
        ;
        AudioManager.prototype._subscribeSignals = function () {
            IWG.SignalManager.instance.add(AudioManager.PLAY_AUDIO, this._playAudio, this);
            IWG.SignalManager.instance.add(AudioManager.STOP_AUDIO, this._stopAudio, this);
            IWG.SignalManager.instance.add(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            IWG.SignalManager.instance.add(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
            IWG.SignalManager.instance.add("toggleSFX", this._toggleSFX, this);
            IWG.SignalManager.instance.add("toggleMusic", this._toggleMusic, this);
        };
        ;
        AudioManager.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove(AudioManager.PLAY_AUDIO, this._playAudio, this);
            IWG.SignalManager.instance.remove(AudioManager.STOP_AUDIO, this._stopAudio, this);
            IWG.SignalManager.instance.remove(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            IWG.SignalManager.instance.remove(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
            IWG.SignalManager.instance.remove("toggleSFX", this._toggleSFX, this);
            IWG.SignalManager.instance.remove("toggleMusic", this._toggleMusic, this);
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
        AudioManager.prototype._toggleMusic = function (toggle) {
            if (!toggle) {
                this._setChannelVolume(SoundChannels.BACKGROUND, 0);
            }
            else {
                this._setChannelVolume(SoundChannels.BACKGROUND, 1);
            }
        };
        ;
        AudioManager.prototype._toggleSFX = function (toggle) {
            if (!toggle) {
                this._setChannelVolume(SoundChannels.FX_SOUNDS, 0);
            }
            else {
                this._setChannelVolume(SoundChannels.FX_SOUNDS, 1);
            }
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
        AudioManager.PLAY_AUDIO = "playAudio";
        AudioManager.STOP_AUDIO = "stopAudio";
        AudioManager.SET_CHANNEL_VOLUME = "setChannelVolume";
        AudioManager.MUTE_ALL_CHANNELS = "muteAll";
        return AudioManager;
    }());
    IWG.AudioManager = AudioManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var DeviceManager = (function () {
        function DeviceManager() {
            this._initialised = false;
            this._gameArea = null;
            this._useProperFullscreen = true;
            this._useFullscreen = false;
            this._useOrientation = false;
            this._pauseOnIncorrect = false;
            this._autoRefresh = false;
            this._currentlyFullscreen = false;
            this._fullscreenDiv = null;
            this._currentOrientation = null;
            this._orientationDiv = null;
            if (DeviceManager.instance == null) {
                DeviceManager.instance = this;
            }
            else {
                throw new Error("Cannot create multiple instances of DeviceManager, please use DeviceManager.instance instead.");
            }
        }
        Object.defineProperty(DeviceManager.prototype, "useProperFullscreen", {
            get: function () {
                return this._useProperFullscreen;
            },
            set: function (input) {
                this._useProperFullscreen = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "fullscreen", {
            get: function () {
                return this._useFullscreen;
            },
            set: function (input) {
                this._useFullscreen = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "orientation", {
            get: function () {
                return this._useOrientation;
            },
            set: function (input) {
                this._useOrientation = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "pauseOnIncorrect", {
            get: function () {
                return this._pauseOnIncorrect;
            },
            set: function (input) {
                this._pauseOnIncorrect = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "autoRefresh", {
            get: function () {
                return this._autoRefresh;
            },
            set: function (input) {
                this._autoRefresh = input;
            },
            enumerable: true,
            configurable: true
        });
        DeviceManager.prototype.init = function () {
            if (!this._initialised) {
                this._initialised = true;
                this._gameArea = document.getElementById('gameArea');
                if (IWG.GameManager.instance.device.iPad) {
                    this._useFullscreen = false;
                }
                if (this._useFullscreen) {
                    if (this._useProperFullscreen && this._supportsFullscreen()) {
                        this._addWebAPIFullscreenOverlay();
                    }
                    else {
                        this._addFullscreenOverlay();
                    }
                }
                if (this._useOrientation) {
                    IWG.GameManager.instance.scale.forceOrientation(true, false);
                    this._addOrientationOverlay();
                }
            }
        };
        DeviceManager.prototype.update = function () {
            if (this._useFullscreen) {
                this._checkFullscreen();
            }
        };
        DeviceManager.prototype.deviceStatus = function () {
            return { fullscreen: this._currentlyFullscreen, orientation: this._currentOrientation };
        };
        DeviceManager.prototype._addFullscreenOverlay = function () {
            this._fullscreenDiv = document.createElement("div");
            this._fullscreenDiv.id = "fullScreenMask";
            this._fullscreenDiv.className = "fs_off";
            var slideText = document.createElement("p");
            slideText.appendChild(document.createTextNode("Swipe up to go fullscreen."));
            this._fullscreenDiv.appendChild(slideText);
            document.body.appendChild(this._fullscreenDiv);
            this._addFullscreenListeners();
        };
        ;
        DeviceManager.prototype._addWebAPIFullscreenOverlay = function () {
            this._fullscreenDiv = document.createElement("div");
            this._fullscreenDiv.id = "fullScreenMask";
            this._fullscreenDiv.className = "fs_off";
            var slideText = document.createElement("p");
            slideText.appendChild(document.createTextNode("Tap to go fullscreen."));
            this._fullscreenDiv.appendChild(slideText);
            this._fullscreenDiv.style.height = "100%";
            document.body.appendChild(this._fullscreenDiv);
            this._addWebAPIFullscreenListeners();
        };
        ;
        DeviceManager.prototype._addFullscreenListeners = function () {
            var _this = this;
            window.addEventListener('scroll', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('touchmove', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('resize', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('touchend', function () {
                _this._checkFullscreen(true);
                IWG.GameManager.instance.time.events.add(150, function () {
                    _this._checkFullscreen();
                });
            });
            window.addEventListener('visibilitychange', function () {
                if (!(document.visibilityState === "hidden")) {
                    _this._displayFullscreenOverlay();
                }
            });
        };
        DeviceManager.prototype._addWebAPIFullscreenListeners = function () {
            var _this = this;
            this._fullscreenDiv.addEventListener('mousedown', function () {
                _this._goProperFullscreen();
            });
            this._fullscreenDiv.addEventListener('touchdown', function () {
                _this._goProperFullscreen();
            });
            window.addEventListener('resize', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('visibilitychange', function () {
                if (!(document.visibilityState === "hidden")) {
                    _this._displayFullscreenOverlay();
                }
            });
        };
        DeviceManager.prototype._checkFullscreen = function (goFull) {
            if (goFull === void 0) { goFull = false; }
            var windowInnerHeight = Math.min(window.innerWidth, window.innerHeight);
            var screenHeight = Math.min(window.screen.width, window.screen.height);
            var magicRatio = 8;
            var difference = Math.abs(windowInnerHeight - screenHeight);
            IWG.GameManager.instance.debug.reset();
            if ((100 / screenHeight) * difference > magicRatio) {
                this._displayFullscreenOverlay();
            }
            else {
                this._deviceInFullscreen();
            }
        };
        DeviceManager.prototype._goProperFullscreen = function () {
            IWG.GameManager.instance.scale.startFullScreen(false);
        };
        DeviceManager.prototype._displayFullscreenOverlay = function () {
            if (this._pauseOnIncorrect) {
                IWG.GameManager.instance.paused = true;
            }
            window.removeEventListener('scroll', this._removeDefault);
            window.removeEventListener('touchmove', this._removeDefault);
            this._currentlyFullscreen = false;
            this._fullscreenDiv.className = "fs_on";
        };
        DeviceManager.prototype._deviceInFullscreen = function () {
            if (this._pauseOnIncorrect) {
                IWG.GameManager.instance.paused = false;
            }
            window.addEventListener('scroll', this._removeDefault);
            window.addEventListener('touchmove', this._removeDefault);
            this._currentlyFullscreen = false;
            this._fullscreenDiv.className = "fs_off";
        };
        DeviceManager.prototype._addOrientationOverlay = function () {
            this._orientationDiv = document.createElement("div");
            this._orientationDiv.id = "rotateDevice";
            this._orientationDiv.className = "hide";
            document.body.appendChild(this._orientationDiv);
            this._setupOrientationListeners();
        };
        DeviceManager.prototype._setupOrientationListeners = function () {
            IWG.GameManager.instance.scale.enterIncorrectOrientation.add(this._displayOrientationOverlay, this);
            IWG.GameManager.instance.scale.leaveIncorrectOrientation.add(this._gameCorrectOrientation, this);
        };
        DeviceManager.prototype._displayOrientationOverlay = function () {
            if (this._pauseOnIncorrect) {
                IWG.GameManager.instance.paused = true;
            }
            if (this._useProperFullscreen) {
                IWG.GameManager.instance.scale.stopFullScreen();
            }
            this._currentOrientation = "portrait";
            this._orientationDiv.className = "show";
            this._gameArea.className = "hide";
        };
        DeviceManager.prototype._gameCorrectOrientation = function () {
            this._currentOrientation = "landscape";
            this._orientationDiv.className = "hide";
            this._gameArea.className = "show";
            this._checkFullscreen();
        };
        DeviceManager.prototype._supportsFullscreen = function () {
            var tsfixDocument = document;
            return (tsfixDocument.fullscreenEnabled ||
                tsfixDocument.webkitFullscreenEnabled ||
                tsfixDocument.mozFullScreenEnabled ||
                tsfixDocument.msFullscreenEnabled);
        };
        DeviceManager.prototype._removeDefault = function (e) {
            console.log("Scrolling disabled");
            if (e.preventDefault) {
                e.preventDefault();
            }
        };
        DeviceManager.instance = null;
        return DeviceManager;
    }());
    IWG.DeviceManager = DeviceManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
        TicketManager.prototype.getIsTrialGame = function () {
            return this._ticket.outcome.try == 1 ? true : false;
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
        TicketManager.prototype.getGameOneTurn = function (turnNumber) {
            return this._ticket.turns.g1[turnNumber];
        };
        TicketManager.prototype.getGrid = function () {
            return this._ticket.params.grid;
        };
        TicketManager.prototype.getPrizeList = function () {
            return this._ticket.prizeList;
        };
        TicketManager.prototype.validate = function () {
            var totalWinValue = 0;
            var winCount = 0;
            var winPrize = -1;
            var symbols = [];
            if (this.getIsWinner()) {
                if (this._ticket.outcome.amount === 0) {
                    IWG.GameManager.instance.getErrorManager().fire("#T001", 'INVALID TICKET: OUTCOME AMOUNT IS 0 ON A WINNING TICKET', 0);
                    return false;
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    if (this._ticket.turns.g1[i].w === 1) {
                        winCount++;
                    }
                }
                if (winCount !== 3) {
                    IWG.GameManager.instance.getErrorManager().fire("#T003", "INVALID TICKET: INCORRECT WIN COUNT", 0);
                    return false;
                }
            }
            else {
                if (this._ticket.outcome.amount !== 0) {
                    IWG.GameManager.instance.getErrorManager().fire("#T004", 'INVALID TICKET: OUTCOME AMOUNT IS ' + this._ticket.outcome.amount + ' ON A LOSING TICKET', 0);
                    return false;
                }
            }
            return true;
        };
        return TicketManager;
    }());
    IWG.TicketManager = TicketManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
            this._signalActive = true;
            this._listening.push(listeningContext);
            return _super.prototype.add.apply(this, [listener, listeningContext, priority].concat(args));
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
    IWG.GameSignal = GameSignal;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SignalManager = (function () {
        function SignalManager() {
            this._signalArray = null;
            if (SignalManager.instance != null) {
                throw new Error("Tried to make a signal manager when one already existed. To use SignalManager, use SignalManager.instance.");
            }
            else {
                SignalManager.instance = this;
                this._signalArray = [];
                IWG.Debug.instance.log("Signal Manager has been initialised and added.", IWG.DEBUGTYPE.INIT, this);
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
                var newSignal = new IWG.GameSignal(addID);
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
                IWG.Debug.instance.log("ID: " + signal.ID + "\nActive: " + signal.inUse + "\nFired: " + signal.hasFired + "\nListening in: " + signal.getListeningContexts(), IWG.DEBUGTYPE.DEBUG, _this);
            });
        };
        ;
        SignalManager.instance = null;
        return SignalManager;
    }());
    IWG.SignalManager = SignalManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
    IWG.DebugController = DebugController;
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
    IWG.DEBUGTYPE = DEBUGTYPE;
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
    IWG.Debug = Debug;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var ErrorManager = (function () {
        function ErrorManager() {
        }
        ErrorManager.prototype.fire = function (errorCode, errorMessage, severity) {
            switch (severity) {
                case 0:
                    if (IWG.GameManager.DEBUG) {
                        console.error("[CRITICAL] Error: " + errorCode + " Description: " + errorMessage);
                    }
                    else {
                        console.error("[CRITICAL] Error: " + errorCode);
                    }
                    break;
                case 1:
                    if (IWG.GameManager.DEBUG) {
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
    IWG.ErrorManager = ErrorManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    (function (LegendType) {
        LegendType[LegendType["ALL"] = 0] = "ALL";
        LegendType[LegendType["SINGLEROW"] = 1] = "SINGLEROW";
        LegendType[LegendType["SEQUENTIAL"] = 2] = "SEQUENTIAL";
    })(IWG.LegendType || (IWG.LegendType = {}));
    var LegendType = IWG.LegendType;
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
    IWG.LegendManager = LegendManager;
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
    })(IWG.RevealType || (IWG.RevealType = {}));
    var RevealType = IWG.RevealType;
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
    IWG.Reveal = Reveal;
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
    IWG.DataSet = DataSet;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var T40_Ticket_Manager = (function () {
        function T40_Ticket_Manager() {
            this.hasInitialised = false;
            this.loadedTicket = false;
            this.development = false;
            this.ticketInfo = null;
            this.gameResultFromAPI = null;
            this.globalAudioVolume = 1;
            this.basePath = '/';
            this.finishURL = '';
            this.trialGame = 0;
            this.TotalNumTurns = -1;
            this.currentTurnNum = -1;
            this.prizeAmounts = [];
            this.outcomeAmount = -1;
            this.prizeTier = -1;
            this._hasWon = -1;
            this._game1Information = [];
            this._outCome = null;
            this._ticket = null;
            this._params = null;
            this._games = null;
            this._pList = null;
            this._upperCurrencySymbol = "$";
            this._lowerCurrencySymbol = "¢";
            this._dualSymbolCurrency = true;
        }
        T40_Ticket_Manager.prototype.init = function (input1) {
            this.ticketInfo = input1;
            return this.initTicket();
            ;
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
            var grid = gameResultFromAPI.ticket.params['@attributes']['grid'].split(',').map(Number);
            this.prizeAmounts = gameResultFromAPI.ticket.params['@attributes'].pList.split(',');
            this._hasWon = +gameResultFromAPI.ticket.outcome['@attributes']['wT'];
            if (gameResultFromAPI.ticket.outcome['@attributes']['amount'] !== undefined) {
                this.trialGame = +gameResultFromAPI.ticket.outcome['@attributes']['try'];
            }
            this.TotalNumTurns = +gameResultFromAPI.ticket.g1.go.length;
            this._game1Information = [];
            for (var i = 0; i < this.TotalNumTurns; i++) {
                var gameRow = ({
                    i: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['i'],
                    w: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['w'],
                    pIndex: parseInt(gameResultFromAPI.ticket.g1.go[i]['@attributes']['p'])
                });
                this._game1Information.push(gameRow);
            }
            this._games = ({
                g1: this._game1Information
            });
            this._params = ({
                wT: this._hasWon,
                grid: grid
            });
            this._outCome = ({
                amount: this.outcomeAmount,
                prizeTier: this.prizeTier
            });
            this._ticket = ({
                outcome: this._outCome,
                params: this._params,
                turns: this._games,
                prizeList: this.prizeAmounts
            });
            IWG.GameManager.instance.getTicketManager().setTicket(this._ticket);
            this.currentTurnNum = 0;
            this.loadedTicket = true;
            gameResultFromAPI = null;
            return IWG.GameManager.instance.getTicketManager().validate();
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
            IWG.Debug.instance.log("Game has finished and the ticket data has been flushed.", IWG.DEBUGTYPE.TICKET);
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
        T40_Ticket_Manager.prototype._flushTicketData = function () {
            this.loadedTicket = false;
        };
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
    IWG.T40_Ticket_Manager = T40_Ticket_Manager;
})(IWG || (IWG = {}));
;
var IWG;
(function (IWG) {
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager(loader) {
            _super.call(this, GameManager.NATIVE_WIDTH, GameManager.NATIVE_HEIGHT, Phaser.AUTO, 'gameArea', true, true);
            this._errorManager = new IWG.ErrorManager();
            this._boot = null;
            this._preloader = null;
            this._maingame = null;
            this._legendManager = null;
            this._ticketManager = null;
            this._T40_TicketManager = null;
            this._gameValue = 0;
            this._isRevealingSymbol = false;
            this._queue = new collections.Queue();
            this._clickCount = 0;
            this._lastSymbolRevealed = false;
            this.symbolsRevealedNumber = 0;
            this._endGameCount = 0;
            if (GameManager.instance === null) {
                throw new Error("Tried to make a game manager when one already existed. To use GameManager, use GameManager.instance ");
            }
            else {
                new IWG.Debug();
                IWG.Debug.ALL();
                GameManager.instance = this;
                IWG.Debug.instance.log("GameManager initialised!", IWG.DEBUGTYPE.INIT, this);
                this._signalManager = new IWG.SignalManager();
                this._audioManager = new IWG.AudioManager(this);
                this._languageCurrency = new IWG.LanguageCurrencyManager();
                this._deviceManager = new IWG.DeviceManager();
                this._ticketManager = new IWG.TicketManager();
                this._T40_TicketManager = new IWG.T40_Ticket_Manager();
                if (this._T40_TicketManager.init(loader)) {
                    IWG.Debug.instance.log("T40Link initialised!", IWG.DEBUGTYPE.INIT, this);
                    this._boot = new IWG.Boot();
                    this._preloader = new IWG.Preloader();
                    this._maingame = new IWG.MainGame();
                    this.state.add('Boot', this._boot, false);
                    this.state.add('Preloader', this._preloader, false);
                    this.state.add('MainGame', this._maingame, false);
                    this._subscribeSignals();
                    this.state.start('Boot');
                }
            }
            this._legendManager = new IWG.LegendManager(this);
            this._legendManager.setupLegend(this.getGameBoard(), this.getGameMultipliers(), [], true);
        }
        ;
        GameManager.prototype.resize = function () {
            var _gameOriginalWidth = 1136;
            var _gameOriginalHeight = 640;
            var _screenWidth = window.innerWidth;
            var _screenHeight = window.innerHeight;
            var scaleRatio = Math.min(_screenWidth / _gameOriginalWidth, _screenHeight / _gameOriginalHeight);
            var _gameCurrentWidth = window.innerWidth;
            var _gameCurrentHeight = window.innerHeight;
            var imageWidth = 2048 * scaleRatio;
            var imageHeight = 2048 * scaleRatio;
            var bg = document.getElementById('background');
            bg.offsetHeight = _screenHeight;
            bg.setAttribute('width', imageWidth + "px");
            bg.setAttribute('height', imageHeight + "px");
            var imagePositionY = ((imageHeight - _screenHeight) / 2);
            var imagePositionX = ((imageWidth - _screenWidth) / 2);
            var div = document.getElementById('background-div');
            div.style.top = -imagePositionY + "px";
            div.style.left = -imagePositionX + "px";
            div.style.position = "fixed";
            var gameArea = document.getElementById('gameArea');
        };
        ;
        GameManager.prototype._subscribeSignals = function () {
            IWG.SignalManager.instance.add('states.SwitchState', this._switchState, this);
            IWG.SignalManager.instance.add('Icon.clickCount', this._incClickCount, this);
            IWG.SignalManager.instance.add('addSymbolToReveal', this._revealNextSymbol, this);
            IWG.SignalManager.instance.add('updateCompleteSignal', this._finishReveal, this);
            IWG.SignalManager.instance.add('incEndGameCount', this._endGameCheck, this);
            IWG.SignalManager.instance.add('SplashScreenGroup.gameValue', this._setGameValue, this);
        };
        ;
        GameManager.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('states.SwitchState', this._switchState, this);
            IWG.SignalManager.instance.remove('Icon.clickCount', this._incClickCount, this);
            IWG.SignalManager.instance.remove('addSymbolToReveal', this._revealNextSymbol, this);
            IWG.SignalManager.instance.remove('updateCompleteSignal', this._finishReveal, this);
            IWG.SignalManager.instance.remove('incEndGameCount', this._endGameCheck, this);
            IWG.SignalManager.instance.remove('SplashScreenGroup.gameValue', this._setGameValue, this);
        };
        ;
        GameManager.prototype._switchState = function (name) {
            this.state.start(name);
        };
        GameManager.prototype.getTicketManager = function () {
            return this._ticketManager;
        };
        GameManager.prototype.getAudioManager = function () {
            return this._audioManager;
        };
        ;
        GameManager.prototype._setGameValue = function (value) {
            this._gameValue = Number(value);
        };
        GameManager.prototype.getGameValue = function () {
            return this._gameValue;
        };
        GameManager.prototype._incClickCount = function () {
            this._clickCount++;
            if (this._clickCount === 6) {
                IWG.SignalManager.instance.dispatch('MainGameGroup.disableButtons');
            }
            else {
                IWG.SignalManager.instance.dispatch('Icon.animateIdle', 'restart');
            }
        };
        GameManager.prototype._revealNextSymbol = function (value) {
            if (value !== undefined) {
                this._queue.add(value);
            }
            else if (this._lastSymbolRevealed) {
                IWG.SignalManager.instance.dispatch('endGameIntro');
            }
            if (!this._isRevealingSymbol && !this._queue.isEmpty()) {
                this._isRevealingSymbol = true;
                IWG.SignalManager.instance.dispatch('populateGridSignal', this._queue.dequeue());
                ;
            }
            if (this._queue.isEmpty() && this._clickCount === 6) {
                this._lastSymbolRevealed = true;
            }
        };
        GameManager.prototype.getClickCount = function () {
            return this._clickCount;
        };
        GameManager.prototype.getSymbol = function (index) {
            var animations = [];
            var idle = null;
            var burst = null;
            var collected = null;
            switch (index) {
                case 0:
                    idle = 'blackidle';
                    burst = 'blackburst';
                    collected = 'black_splat_';
                    break;
                case 1:
                    idle = 'blueidle';
                    burst = 'blueburst';
                    collected = 'blue_splat_';
                    break;
                case 2:
                    idle = 'greenidle';
                    burst = 'greenburst';
                    collected = 'green_splat_';
                    break;
                case 3:
                    idle = 'orangeidle';
                    burst = 'orangeburst';
                    collected = 'orange_splat_';
                    break;
                case 4:
                    idle = 'purpleidle';
                    burst = 'purpleburst';
                    collected = 'pink_splat_';
                    break;
                case 5:
                    idle = 'redidle';
                    burst = 'redburst';
                    collected = 'red_splat_';
                    break;
                case 6:
                    idle = 'torquiseidle';
                    burst = 'torquiseburst';
                    collected = 'turquoise_splat_';
                    break;
                case 7:
                    idle = 'whiteidle';
                    burst = 'whiteburst';
                    collected = 'white_splat_';
                    break;
                case 8:
                    idle = 'yellowidle';
                    burst = 'yellowburst';
                    collected = 'yellow_splat_';
                    break;
                default:
                    throw new Error("Invalid tile number!");
            }
            animations.push(idle, burst, collected);
            return animations;
        };
        GameManager.prototype.getErrorManager = function () {
            return this._errorManager;
        };
        GameManager.prototype.prepNumbers = function (numIn, n, x, s, c) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = numIn.toFixed(Math.max(0, ~~n));
            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
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
        GameManager.prototype.getLegendManager = function () {
            return this._legendManager;
        };
        GameManager.prototype.getGameBoard = function () {
            var boardData = this._ticketManager.getGrid();
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
        GameManager.prototype.getGameMultipliers = function () {
            var prizeList = [];
            for (var index = 0; index < GameManager.instance.getTicketManager().getPrizeList().length; index++) {
                prizeList.push(Number(GameManager.instance.getTicketManager().getPrizeList()[index]));
            }
            return prizeList;
        };
        GameManager.prototype._finishReveal = function () {
            this._isRevealingSymbol = false;
            this._revealNextSymbol();
        };
        GameManager.prototype._endGameCheck = function () {
            this._endGameCount++;
            if (this._endGameCount > 5) {
                IWG.SignalManager.instance.dispatch('endGameIntro');
                if (this._ticketManager.getIsWinner()) {
                    IWG.SignalManager.instance.dispatch('gameFinished');
                }
                else {
                    IWG.SignalManager.instance.dispatch('gameFinished');
                }
            }
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
        GameManager.NATIVE_HEIGHT = 640;
        GameManager.NATIVE_WIDTH = 1136;
        GameManager.DEBUG = false;
        return GameManager;
    }(Phaser.Game));
    IWG.GameManager = GameManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    (function (TimerInteractionStatus) {
        TimerInteractionStatus[TimerInteractionStatus["startOrReset"] = 0] = "startOrReset";
        TimerInteractionStatus[TimerInteractionStatus["stop"] = 1] = "stop";
    })(IWG.TimerInteractionStatus || (IWG.TimerInteractionStatus = {}));
    var TimerInteractionStatus = IWG.TimerInteractionStatus;
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
                    this._idleTimer = IWG.GameManager.instance.time.create(true);
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
    }(IWG.NonDisplayObject));
    IWG.IdleClass = IdleClass;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SpriteInfo = (function () {
        function SpriteInfo() {
        }
        return SpriteInfo;
    }());
    IWG.SpriteInfo = SpriteInfo;
    var ButtonEvents = (function () {
        function ButtonEvents() {
            this.onInputUp = new Phaser.Signal();
            this.onInputDown = new Phaser.Signal();
            this.onInputOver = new Phaser.Signal();
            this.onInputOut = new Phaser.Signal();
        }
        return ButtonEvents;
    }());
    IWG.ButtonEvents = ButtonEvents;
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
            this.buttonEvents = new ButtonEvents();
            this._currentSpriteInfo = null;
            this._clickWasInButton = null;
            this._internalGroupScaler = null;
            this._OutsideTrigger = null;
            this._interactivityScaling = null;
            this._internalGroupScaler = new Phaser.Group(IWG.GameManager.instance, this);
            this.buttonSprite = IWG.GameManager.instance.make.sprite(0, 0);
            this.buttonSprite.anchor.set(0.5, 0.5);
            this._internalGroupScaler.add(this.buttonSprite);
            if (buttonParameters.useText === true) {
                if (buttonParameters.MyOwnTextObject !== undefined) {
                    this.buttonText = buttonParameters.MyOwnTextObject;
                    this._internalGroupScaler.add(this.buttonText);
                    this._internalGroupScaler.bringToTop(this.buttonText);
                }
                else {
                    this.buttonText = new Phaser.Text(IWG.GameManager.instance, 0, 0, "", {
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
            if (buttonParameters.buttonUpSpriteSheetName !== undefined) {
                this.buttonUpSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName;
            }
            this.buttonUpSpriteInfo.frameName = buttonParameters.buttonUpStateImageName;
            (buttonParameters.buttonOverSpriteSheetName === undefined) ? this.buttonOverSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName :
                this.buttonOverSpriteInfo.spriteSheets = buttonParameters.buttonOverSpriteSheetName;
            (buttonParameters.buttonOverStateImageName === undefined) ? this.buttonOverSpriteInfo.frameName = buttonParameters.buttonUpStateImageName :
                this.buttonOverSpriteInfo.frameName = buttonParameters.buttonOverStateImageName;
            (buttonParameters.buttonDownSpriteSheetName === undefined) ? this.buttonDownSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName :
                this.buttonDownSpriteInfo.spriteSheets = buttonParameters.buttonDownSpriteSheetName;
            (buttonParameters.buttonDownStateImageName === undefined) ? this.buttonDownSpriteInfo.frameName = buttonParameters.buttonUpStateImageName :
                this.buttonDownSpriteInfo.frameName = buttonParameters.buttonDownStateImageName;
            (buttonParameters.buttonDisabledSpriteSheetName === undefined) ? this.buttonDisabledSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName :
                this.buttonDisabledSpriteInfo.spriteSheets = buttonParameters.buttonDisabledSpriteSheetName;
            (buttonParameters.buttonDisabledStateImageName === undefined) ? this.buttonDisabledSpriteInfo.frameName = buttonParameters.buttonUpStateImageName :
                this.buttonDisabledSpriteInfo.frameName = buttonParameters.buttonDisabledStateImageName;
            this.idleClass = new IWG.IdleClass();
            this.idleClass.replaceableIdleEvent = function () { _this.promptTweenPart1(); };
            this.idleClass.replaceableStopIdleEvent = function () { _this.clearTweens(); };
            this.buttonSprite.inputEnabled = true;
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
            this._loadTextureCheck(this.buttonUpSpriteInfo.spriteSheets, this.buttonUpSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonUp = function () {
        };
        ButtonClass.prototype.buttonMouseOverFunctionality = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.mouseOver.x, this._interactivityScaling.mouseOver.y);
            }
            this.idleClass.coreBreakIdleIfActive();
            this.buttonMouseOver();
            this._loadTextureCheck(this.buttonOverSpriteInfo.spriteSheets, this.buttonOverSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonMouseOver = function () {
        };
        ButtonClass.prototype.buttonMouseOutFunctionality = function () {
            this._clickWasInButton = false;
            this._defaultState();
            this.buttonMouseOut();
            this.idleClass.coreResumeIdleIfActive();
        };
        ButtonClass.prototype.buttonMouseOut = function () {
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
            if (this.activeTween !== undefined) {
                this.game.tweens.remove(this.activeTween);
                this.activeTween = null;
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
                instance.game.tweens.remove(buttonPrompt);
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
                instance.game.tweens.remove(buttonPrompt);
                if (_this.buttonEnabledStatus) {
                    instance.promptTweenPart1();
                }
            });
            buttonPrompt.start();
        };
        ButtonClass.prototype.enableButton = function () {
            this.buttonSprite.input.useHandCursor = true;
            this.buttonSprite.inputEnabled = true;
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
            this.buttonSprite.input.useHandCursor = false;
            this.buttonSprite.inputEnabled = false;
            this.buttonEnabledStatus = false;
            this.buttonSprite.events.onInputDown.remove(this.buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.remove(this.buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.remove(this.buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.remove(this.buttonMouseOutFunctionality, this);
            this.idleClass.coreBreakIdleIfActive();
            this._disabledState();
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
        return ButtonClass;
    }(IWG.GameGroup));
    IWG.ButtonClass = ButtonClass;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Control = (function () {
        function Control(maxCallbacks, onComplete, scope, timer) {
            if (timer === void 0) { timer = -1; }
            var params = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                params[_i - 4] = arguments[_i];
            }
            this._maxCallbacks = -1;
            this._timer = null;
            this._internalCounter = -1;
            this._oCC = null;
            this._oCS = null;
            this._oCP = null;
            this._spent = false;
            this._internalCounter = 0;
            this._maxCallbacks = maxCallbacks;
            this._oCC = onComplete;
            this._oCS = scope;
            this._oCP = params;
            this._spent = false;
            if (timer > 0) {
                this._timer = IWG.GameManager.instance.time.create(true);
                (_a = this._timer).add.apply(_a, [timer, this._oCC, this._oCS].concat(this._oCP));
                this._timer.start();
            }
            ;
            if (this._maxCallbacks === 0) {
                this._fireOnCompleteCallback();
            }
            var _a;
        }
        ;
        Control.prototype.done = function () {
            if (this._spent === false) {
                this._internalCounter++;
                if (this._internalCounter === this._maxCallbacks) {
                    this._fireOnCompleteCallback();
                }
            }
            else {
                IWG.Debug.instance.warn('Control.done() called after it already completed.', IWG.DEBUGTYPE.ERROR, this);
            }
        };
        ;
        Control.prototype._fireOnCompleteCallback = function () {
            if (this._timer != null) {
                this._timer.stop(true);
                this._timer.destroy();
                this._timer = null;
            }
            this._oCC.bind(this._oCS).apply(void 0, this._oCP);
            this._spent = true;
            this._oCC = null;
            this._oCS = null;
            this._oCP = null;
            this._maxCallbacks = null;
            this._internalCounter = null;
        };
        ;
        return Control;
    }());
    IWG.Control = Control;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var GameFonts = (function () {
        function GameFonts() {
        }
        GameFonts.createStandardFont = function () {
            var standardFont = IWG.GameManager.instance.make.text(0, 0, "");
            standardFont.anchor.set(0.5);
            standardFont.align = 'center';
            standardFont.font = 'times new roman';
            standardFont.fontSize = 50;
            standardFont.fill = '#ffffff';
            return standardFont;
        };
        GameFonts.createMenuFont = function () {
            var standardFont = IWG.GameManager.instance.make.text(0, 0, "");
            standardFont.anchor.set(0.5);
            standardFont.align = 'center';
            standardFont.font = 'times new roman';
            standardFont.fontSize = 45;
            standardFont.fill = '#272727';
            return standardFont;
        };
        GameFonts.createMultiplierWinFont = function () {
            var multiplierWinFont = IWG.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 50;
            multiplierWinFont.fill = '#f0a127';
            return multiplierWinFont;
        };
        GameFonts.createMultiplierFont = function () {
            var multiplierWinFont = IWG.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 42;
            multiplierWinFont.fill = '#ffffff';
            return multiplierWinFont;
        };
        GameFonts.createEndWinFont = function () {
            var multiplierWinFont = IWG.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 32;
            return multiplierWinFont;
        };
        return GameFonts;
    }());
    IWG.GameFonts = GameFonts;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
    }(IWG.IdleClass));
    IWG.IdleController = IdleController;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
                this.panelBackground = new Phaser.Image(IWG.GameManager.instance, 0, 0, panelParams.sheetName, panelParams.backGroundImageString);
                this.add(this.panelBackground);
            }
            else if (panelParams.sheetName === undefined && panelParams.backGroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(IWG.GameManager.instance, 0, 0, panelParams.backGroundImageString);
                this.add(this.panelBackground);
            }
            else {
            }
            this.revealed = false;
            this.buttonsGroup = new Phaser.Group(IWG.GameManager.instance);
            this.add(this.buttonsGroup);
            this.idleController = new IWG.IdleController();
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
            var revealTimer = IWG.GameManager.instance.time.create(true);
            revealTimer.add(delay, function () {
                symbolToReveal.simulateClick(false);
            }, this);
            revealTimer.start();
        };
        return PanelClass;
    }(IWG.GameGroup));
    IWG.PanelClass = PanelClass;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
    IWG.Particle = Particle;
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
        Reveals.Fade_Out = function (objToAnimate, onCompleteListener, onCompleteContext) {
            if (onCompleteListener === void 0) { onCompleteListener = function () { }; }
            if (onCompleteContext === void 0) { onCompleteContext = this; }
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            var anim = new (RevealAnimations.bind.apply(RevealAnimations, [void 0].concat([onCompleteListener, onCompleteContext], params)))();
            anim.Fade_Out(objToAnimate);
        };
        return Reveals;
    }());
    IWG.Reveals = Reveals;
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
            var t = IWG.GameManager.instance.time.create(true);
            var fadeOutAnimation = IWG.GameManager.instance.add.tween(objToAnimate).to({ alpha: 0 }, 80, Phaser.Easing.Linear.None, true);
            if (group.name === "icon") {
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.WOODHIT, IWG.SoundChannels.FX_SOUNDS);
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.BOXSMOKE, IWG.SoundChannels.FX_SOUNDS);
            }
            else {
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.REVEAL, IWG.SoundChannels.FX_SOUNDS);
            }
            fadeOutAnimation.onComplete.add(function () {
                _this._onCompleteFunc.bind(_this._onCompleteScope).apply(void 0, _this._onCompleteParams);
            }, this);
            frames.forEach(function (frame) {
                var newEmitter = group.game.add.emitter(objToAnimate.world.x + frame.xOffset, objToAnimate.world.y + frame.yOffset, frame.maxParticles);
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
                IWG.GameManager.instance.camera.shake(0.001, 200);
                newEmitter.start(true, 3000, null, frame.maxParticles);
                newEmitter.setRotation(-frame.rotation, frame.rotation);
                t.add(3000, function () {
                    newEmitter.destroy(true);
                }, _this);
            });
            t.start();
        };
        ;
        RevealAnimations.prototype.Fade_Out = function (objToAnimate) {
            var fadeOutAnimation = IWG.GameManager.instance.add.tween(objToAnimate).to({ alpha: 0 }, 80, Phaser.Easing.Linear.None, true);
        };
        ;
        return RevealAnimations;
    }());
    ;
})(IWG || (IWG = {}));
;
var IWG;
(function (IWG) {
    var Preloader_Core = (function (_super) {
        __extends(Preloader_Core, _super);
        function Preloader_Core() {
            _super.apply(this, arguments);
        }
        Preloader_Core.prototype.preload = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [preload] Preloader CORE preloading...', 'core');
            _super.prototype.preload.call(this);
        };
        Preloader_Core.prototype.create = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [create] Preloader CORE creating...', 'core');
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
            IWG.Debug.instance.log('[core/Preloader_core.ts] [preload] Setting up loading scene...', 'preload');
        };
        Preloader_Core.prototype.addAssetsToLoad = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [preload] Adding assets to load...', 'preload');
        };
        Preloader_Core.prototype.fileStarted = function (progress, cacheKey, fileurl) {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.filestarted(' + progress + ', ' + cacheKey + ', ' + fileurl + ')', 'preload');
        };
        Preloader_Core.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileLoaded(' + progress + ', ' + cacheKey + ', ' + success + ', ' + totalLoaded + ', ' + totalFiles + ')', 'preload');
        };
        Preloader_Core.prototype.fileFailed = function (cacheKey, errorObj) {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileFailed(' + cacheKey + errorObj + ')', 'preload');
        };
        Preloader_Core.prototype.onLoad = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.onLoad()', 'preload');
        };
        return Preloader_Core;
    }(Phaser.State));
    IWG.Preloader_Core = Preloader_Core;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var BonusGroup = (function (_super) {
        __extends(BonusGroup, _super);
        function BonusGroup() {
            _super.call(this);
            this._count = 0;
            this._bonusArray = [];
            this._bonusTokens = [];
            this._panelHighlight = null;
            this._instantText = null;
            this._valueText = null;
            this._value = 0;
            this._winText = null;
            this._subscribeSignals();
            this.game.add.sprite(0, 0, "masterSS", "INSTANTWIN_panel.png", this);
            this._panelHighlight = this.game.add.sprite(0, 0, "masterSS", "INSTANTWIN_panelGLOW.png", this);
            this._panelHighlight.alpha = 0;
            var group = this.game.add.group(this, "textGroup");
            group.position.setTo(80, 15);
            this._instantText = this.game.add.sprite(0, 0, "masterSS", "instant_text.png", group);
            this._valueText = this.game.add.sprite(93, 12, "masterSS", "5p_text.png", group);
            this._valueText.anchor.setTo(0.5, 0.5);
            this._winText = this.game.add.sprite(110, 0, "masterSS", "win_text.png", group);
            this.add(group);
            for (var i = 0; i < 3; i++) {
                var bonusOutline = new Phaser.Point(115 + (80 * i), 70);
                this._bonusArray.push(bonusOutline);
            }
        }
        BonusGroup.prototype._subscribeSignals = function () {
            IWG.SignalManager.instance.add('Tile.revealBonus', this._reveal, this);
            IWG.SignalManager.instance.add('SplashScreenGroup.gameValue', this._updateBonusAmount, this);
        };
        BonusGroup.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('Tile.revealBonus', this._reveal, this);
            IWG.SignalManager.instance.remove('SplashScreenGroup.gameValue', this._updateBonusAmount, this);
        };
        BonusGroup.prototype._updateBonusAmount = function () {
            switch (IWG.GameManager.instance.getGameValue()) {
                case 0.2:
                case 0.5:
                case 1:
                    this._value = 5;
                    break;
                case 2:
                case 5:
                    this._value = 10;
                    break;
                case 10:
                case 15:
                case 20:
                    this._value = 20;
                    break;
                default:
                    this._value = 0;
                    break;
            }
            this._valueText.loadTexture("masterSS", this._value + "p_text.png");
        };
        BonusGroup.prototype._reveal = function (token) {
            this._bonusTokens.push(token.getToken());
            var oriX = token.position.x + 492;
            var oriY = token.position.y + 50;
            var xPos = this._bonusArray[this._count].x + 80;
            var yPos = this._bonusArray[this._count].y + 520;
            token.getToken().alpha = 0;
            this.game.stage.addChild(token.getToken());
            token.getToken().position.setTo(oriX, oriY);
            token.getToken().alpha = 1;
            this.game.add.tween(token.getToken()).to({ x: xPos, y: yPos }, 500, 'Linear', true, 1000);
            this._count++;
            if (this._count === 3) {
                this._bonusWinner();
            }
        };
        BonusGroup.prototype._bonusWinner = function () {
            var timer = this.game.time.events.add(2000, function () {
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.BONUSWIN, IWG.SoundChannels.FX_SOUNDS);
            });
            for (var i = 0; i < this._bonusTokens.length; i++) {
                var element = this._bonusTokens[i];
                element.scale.setTo(1, 1);
                var timeline = null;
                timeline = this.game.add.tween(element.scale).to({ x: 1.5, y: 1.5 }, 1000, Phaser.Easing.Elastic.InOut, true, 2000, -1, true);
                timeline.repeatDelay(4000);
            }
            this.game.add.tween(this._panelHighlight).to({ alpha: 1 }, 1000, 'Linear', true, 4000);
        };
        return BonusGroup;
    }(IWG.GameGroup));
    IWG.BonusGroup = BonusGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(game, x, y, Array, highlight) {
            var _this = this;
            _super.call(this, game);
            this._thisGroupState = "MainGame";
            this._spr_tileBg = null;
            this._spr_tileCollected = null;
            this._spr_tileWin = null;
            this._spr_tileSymbol = null;
            this._spr_bonusSymbol = null;
            this._winRevealFinalTween = null;
            this._isCorner = false;
            this.symbolName = "";
            this.name = "tile";
            this._subscribeSignals();
            this.position.x = x;
            this.position.y = y;
            this._spr_tileWin = this.game.add.sprite(-3, 6, "masterSS", highlight, this);
            this._spr_tileWin.alpha = 0;
            this._spr_tileWin.anchor.setTo(0.5, 0.5);
            var collectedString = Array[1] + "0001.png";
            var string = IWG.GameManager.instance.getSymbol(1);
            this._spr_tileCollected = this.create(0, 0, 'masterSS', Array[2] + this.game.rnd.integerInRange(1, 3) + ".png");
            this._spr_bonusSymbol = this.create(0, 0, 'masterSS', "GEM_symbol.png");
            this._spr_tileCollected.anchor.set(0.5, 0.5);
            this._spr_tileCollected.alpha = 0;
            this._spr_bonusSymbol.anchor.set(0.5, 0.5);
            this._spr_bonusSymbol.alpha = 0;
            this._spr_bonusSymbol.scale.setTo(0, 0);
            var coords = this._checkCoords(Array[0]);
            this._spr_tileSymbol = this.create(coords.x, coords.y, 'MonsterSS', Array[0] + "0001.png");
            this._spr_tileSymbol.anchor.set(0.5, 0.5);
            this._spr_tileSymbol.name = Array[0];
            this._spr_tileSymbol.animations.add('idle', Phaser.Animation.generateFrameNames(Array[0], 0, 36, '.png', 4), 18, true);
            this._spr_tileSymbol.animations.add('burst', Phaser.Animation.generateFrameNames(Array[1], 0, 11, '.png', 4), 18, true);
            var timer = this.game.time.create(true);
            timer.add(this.game.rnd.integerInRange(0, 3000), function () {
                _this._spr_tileSymbol.animations.play('idle');
            });
            timer.start();
            this.symbolName = Array[0].toLowerCase();
        }
        Tile.prototype._subscribeSignals = function () {
        };
        Tile.prototype._unsubscribeSignals = function () {
        };
        Tile.prototype.getToken = function () {
            return this._spr_bonusSymbol;
        };
        ;
        Tile.prototype._onStateSwitch = function (state) {
            if (state !== this._thisGroupState) {
                this._destroy();
            }
        };
        Tile.prototype._destroy = function () {
            this._unsubscribeSignals();
            this.destroy(true, false);
        };
        Tile.prototype._checkCoords = function (monster) {
            var coords = {
                x: 0,
                y: 0
            };
            monster = monster.replace("idle", "");
            switch (monster) {
                case "white":
                    coords.x = 3;
                    coords.y = 0;
                    break;
                case "red":
                    coords.x = 3;
                    coords.y = -5;
                    break;
                case "blue":
                    coords.x = 0;
                    coords.y = 0;
                    break;
                case "green":
                    coords.x = 0;
                    coords.y = 2;
                    break;
                case "yellow":
                    coords.x = -2;
                    coords.y = 0;
                    break;
                case "orange":
                    coords.x = 5;
                    coords.y = -5;
                    break;
                case "black":
                    coords.x = 3;
                    coords.y = 0;
                    break;
                case "torquise":
                    coords.x = 0;
                    coords.y = 3;
                    break;
                case "purple":
                    coords.x = -2;
                    coords.y = 0;
                    break;
                default:
                    console.log(monster);
                    break;
            }
            return coords;
        };
        Tile.prototype.reveal = function (delay, onComplete, instance) {
            if (onComplete === void 0) { onComplete = function () { }; }
            if (instance === void 0) { instance = this; }
            this.flipAnimation(delay, true, onComplete, instance);
        };
        Tile.prototype.bonusReveal = function (delay, onComplete, instance) {
            var _this = this;
            if (onComplete === void 0) { onComplete = function () { }; }
            if (instance === void 0) { instance = this; }
            this.game.time.events.add(delay, function () {
                var scale = _this.game.add.tween(_this._spr_bonusSymbol.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true);
                var alpha = _this.game.add.tween(_this._spr_bonusSymbol).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
                alpha.onComplete.add(function () {
                    IWG.SignalManager.instance.dispatch('Tile.revealBonus', _this);
                }, _this);
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.BONUSCOLLECT, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        };
        Tile.prototype.reset = function () {
        };
        Tile.prototype.winRowReveal = function (delay, onComplete, instance) {
            var _this = this;
            if (onComplete === void 0) { onComplete = function () { }; }
            if (instance === void 0) { instance = this; }
            var tween = this.game.add.tween(this._spr_tileWin).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 3, true);
            tween.onComplete.add(function () {
                _this.game.add.tween(_this._spr_tileWin).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 300);
                IWG.SignalManager.instance.dispatch('incEndGameCount');
            }, this);
        };
        Tile.prototype.flipAnimation = function (delay, withGold, onComplete, instance) {
            var _this = this;
            var revealDuration = 100;
            var revealDelay = 50;
            var anim = this.game.time.events.add(delay, function () {
                _this._spr_tileSymbol.animations.play('burst', 18, false, false);
                if (_this._spr_tileSymbol.name === "blackidle" || _this._spr_tileSymbol.name === "blueidle") {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.MONSTER1, IWG.SoundChannels.FX_SOUNDS);
                }
                else if (_this._spr_tileSymbol.name === "orangeidle" || _this._spr_tileSymbol.name === "greenidle" || _this._spr_tileSymbol.name === "yellowidle") {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.MONSTER2, IWG.SoundChannels.FX_SOUNDS);
                }
                else if (_this._spr_tileSymbol.name === "purpleidle" || _this._spr_tileSymbol.name === "redidle") {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.MONSTER3, IWG.SoundChannels.FX_SOUNDS);
                }
                else if (_this._spr_tileSymbol.name === "torquiseidle" || _this._spr_tileSymbol.name === "whiteidle") {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.MONSTER4, IWG.SoundChannels.FX_SOUNDS);
                }
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.MONSTERSPLAT, IWG.SoundChannels.FX_SOUNDS);
                _this._spr_tileSymbol.animations.currentAnim.onComplete.add(function () {
                    _this._spr_tileSymbol.alpha = 0;
                    _this._spr_tileCollected.alpha = 1;
                    if (onComplete !== undefined) {
                        onComplete.bind(instance)();
                    }
                });
            }, this);
        };
        return Tile;
    }(Phaser.Group));
    IWG.Tile = Tile;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Multiplier = (function (_super) {
        __extends(Multiplier, _super);
        function Multiplier(game, x, y, textIn, directionIn, _align) {
            if (_align === void 0) { _align = "left"; }
            _super.call(this, game);
            this._align = _align;
            this._thisGroupState = "MainGame";
            this._isPulsing = false;
            this._anticipationTween = null;
            this._subscribeSignals();
            this.position.x = x;
            this.position.y = y;
            this._startPositionX = x;
            this._startPositionY = y;
            this._direction = directionIn;
            this._multiText = game.add.bitmapText(0, 0, 'prizes', IWG.GameManager.instance.formatCurrency(textIn));
            this._multiTextWin = game.add.bitmapText(0, 0, 'prizesWin', IWG.GameManager.instance.formatCurrency(textIn));
            this._multiText.scale.set(2.5, 2.5);
            this._multiTextWin.scale.set(2.5, 2.5);
            if (this._align === "right") {
                this._multiText.anchor.setTo(1, 0.5);
                this._multiTextWin.anchor.setTo(1, 0.5);
            }
            else if (this._align === "center") {
                this._multiText.anchor.setTo(0.5, 0.5);
                this._multiTextWin.anchor.setTo(0.5, 0.5);
            }
            else {
                this._multiText.anchor.setTo(0, 0.5);
                this._multiTextWin.anchor.setTo(0, 0.5);
            }
            if (directionIn == "vertical") {
                this._multiText.y = -100;
                this._multiText.x = -80;
                this._multiTextWin.y = -100;
                this._multiTextWin.x = -80;
            }
            else {
                this._multiText.y = -80;
                this._multiText.x = -105;
                this._multiTextWin.y = -80;
                this._multiTextWin.x = -105;
            }
            this.add(this._multiText);
            this.add(this._multiTextWin);
            this._multiTextWin.alpha = 0;
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
        };
        Multiplier.prototype.setPrizeValue = function (prizeAmount) {
            this._prizeValue = prizeAmount;
        };
        Multiplier.prototype.getPrizeValue = function () {
            return this._prizeValue;
        };
        Multiplier.prototype.setAlignment = function (alignment) {
            this._align = alignment;
            this._multiText.align = alignment;
        };
        Multiplier.prototype.getAlignment = function () {
            return this._align;
        };
        Multiplier.prototype.winReveal = function (delay) {
            var winTween = this.game.add.tween(this._multiTextWin).to({
                frameBased: true,
                alpha: 1,
            }, 60, Phaser.Easing.power2, true);
        };
        return Multiplier;
    }(Phaser.Group));
    IWG.Multiplier = Multiplier;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
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
            this._prize = null;
            this._turn = 0;
            this._bonusReveal = false;
            this.create();
        }
        CentreGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('populateGridSignal', this._populateGridArrays, this);
            IWG.SignalManager.instance.add('gridNextRevealSignal', this._revealNextGridElement, this);
            IWG.SignalManager.instance.add('gridRevealSymbolSignal', this._revealSymbolsOnGrid, this);
            IWG.SignalManager.instance.add('gridRevealAnticiSignal', this._anticipationWin, this);
            IWG.SignalManager.instance.add('gridRevealWinSignal', this._revealNextWin, this);
            IWG.SignalManager.instance.add('bonusReveal', this._revealBonus, this);
        };
        ;
        CentreGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('populateGridSignal', this._populateGridArrays, this);
            IWG.SignalManager.instance.remove('gridNextRevealSignal', this._revealNextGridElement, this);
            IWG.SignalManager.instance.remove('gridRevealAnticiSignal', this._anticipationWin, this);
            IWG.SignalManager.instance.remove('gridRevealSymbolSignal', this._revealSymbolsOnGrid, this);
            IWG.SignalManager.instance.remove('gridRevealWinSignal', this._revealNextWin, this);
            IWG.SignalManager.instance.remove('bonusReveal', this._revealBonus, this);
        };
        ;
        ;
        CentreGroup.prototype.create = function () {
            var tilePositionX = 125;
            var tilePositionY = 32;
            this._grp_gridGroup = new Phaser.Group(this.game);
            this._grp_gridGroup.name = 'gridGroup';
            this._grp_gridGroup.position.setTo(0, 0);
            var i = 0;
            for (var y = 0; y < 6; y++) {
                for (var x = 0; x < 6; x++) {
                    var iconString = IWG.GameManager.instance.getSymbol(IWG.GameManager.instance.getTicketManager().getGrid()[i]);
                    var highlight = "highlight_middle.png";
                    if (i % 6 === 0) {
                        highlight = "highlight_left.png";
                    }
                    else if (i % 6 === 5) {
                        highlight = "highlight_right.png";
                    }
                    var tileToAdd = new IWG.Tile(this.game, 0, 0, iconString, highlight);
                    tileToAdd.pivot.set(0.5, 0.5);
                    tileToAdd.position.setTo(x * 88 + tilePositionX, y * 88 + tilePositionY);
                    this._arr_gridTile.setValue(i, tileToAdd);
                    this._grp_gridGroup.add(tileToAdd);
                    i++;
                }
            }
            ;
            this._grp_rowGroup = new Phaser.Group(this.game);
            this._grp_rowGroup.position.setTo(150, 90);
            this._grp_columnGroup = new Phaser.Group(this.game);
            this._grp_columnGroup.position.setTo(190, 40);
            var pList = IWG.GameManager.instance.getTicketManager().getPrizeList();
            for (var j = 0; j < 6; j++) {
                var multiplierRowTile;
                multiplierRowTile = new IWG.Multiplier(this.game, 14, j * 85, pList[j], "horizontal", "right");
                this._arr_rowMultipliers.setValue(j, multiplierRowTile);
                this._grp_rowGroup.add(multiplierRowTile);
            }
            ;
            for (var k = 0; k < 6; k++) {
                var multiplierColTile;
                multiplierColTile = new IWG.Multiplier(this.game, k * 91, 0, pList[k + 6], "vertical", "center");
                this._arr_columnMultipliers.setValue(k, multiplierColTile);
                this._grp_columnGroup.add(multiplierColTile);
            }
            ;
            this.add(this._grp_gridGroup, false);
            this.add(this._grp_columnGroup, false);
            this.add(this._grp_rowGroup, false);
        };
        ;
        CentreGroup.prototype._populateGridArrays = function (symbol) {
            var _this = this;
            var reveals = IWG.GameManager.instance.getLegendManager().reveal([symbol]);
            IWG.GameManager.instance.symbolsRevealedNumber++;
            reveals.forEach(function (r) {
                switch (r.getRevealType()) {
                    case IWG.RevealType.SYMBOL:
                        var tile = _this._arr_gridTile.getValue(r.getIndex());
                        _this._arr_symbolsToReveal.push(tile);
                        break;
                    case IWG.RevealType.ANTICIPATION_ROW:
                        _this._arr_rowsToAnticipation.push(_this._arr_rowMultipliers.getValue(r.getIndex()));
                        break;
                    case IWG.RevealType.ANTICIPATION_COLUMN:
                        _this._arr_colToAnticipation.push(_this._arr_columnMultipliers.getValue(r.getIndex()));
                        break;
                    case IWG.RevealType.SYMBOL_WINNER:
                        _this._arr_tileWinToReveal.push(_this._arr_gridTile.getValue(r.getIndex()));
                        break;
                    case IWG.RevealType.SYMBOL_BONUS:
                        _this._arr_bonusToReveal.push(_this._arr_gridTile.getValue(r.getIndex()));
                        break;
                    case IWG.RevealType.ROW:
                        _this._prize += _this._arr_rowMultipliers.getValue(r.getIndex()).getPrizeValue();
                        _this._arr_rowsToReveal.push(_this._arr_rowMultipliers.getValue(r.getIndex()));
                        break;
                    case IWG.RevealType.COLUMN:
                        _this._prize += _this._arr_columnMultipliers.getValue(r.getIndex()).getPrizeValue();
                        _this._arr_colToReveal.push(_this._arr_columnMultipliers.getValue(r.getIndex()));
                        break;
                }
                ;
            });
            IWG.SignalManager.instance.dispatch('gridRevealSymbolSignal');
        };
        ;
        CentreGroup.prototype._revealNextGridElement = function () {
            if (this._arr_symbolsToReveal.length !== 0) {
                IWG.SignalManager.instance.dispatch('gridRevealSymbolSignal');
            }
            else if (this._arr_rowsToAnticipation.length !== 0 || this._arr_colToAnticipation.length !== 0) {
                IWG.SignalManager.instance.dispatch('gridRevealAnticiSignal');
            }
            else if (this._arr_tileWinToReveal.length !== 0) {
                IWG.SignalManager.instance.dispatch('gridRevealWinSignal');
            }
            else {
                IWG.SignalManager.instance.dispatch('updateCompleteSignal');
            }
        };
        ;
        CentreGroup.prototype._revealSymbolsOnGrid = function () {
            var count = 0;
            var ticketData = IWG.GameManager.instance.getTicketManager().getGameOneTurn(this._turn);
            if (ticketData.w === 1) {
                var bonusTile = this.game.rnd.integerInRange(0, this._arr_symbolsToReveal.length - 1);
            }
            for (var i = 0; i < this._arr_symbolsToReveal.length; i++) {
                var bonusReveal = false;
                if (i === bonusTile && this._bonusReveal === false) {
                    this._revealBonus(this._arr_symbolsToReveal[i], (1000 + (i * 500)) + 500);
                    this._bonusReveal = true;
                }
                if (i === this._arr_symbolsToReveal.length - 1) {
                    this._arr_symbolsToReveal[i].reveal(1000 + (i * 500), function () {
                        this._arr_symbolsToReveal = [];
                        IWG.SignalManager.instance.dispatch('gridNextRevealSignal', this);
                        this._bonusReveal = false;
                        this._selectSound(count);
                    }, this);
                }
                else {
                    this._arr_symbolsToReveal[i].reveal(1000 + (i * 500), function () {
                        this._selectSound(count);
                        count++;
                    }, this);
                }
            }
            this._turn++;
        };
        ;
        CentreGroup.prototype._selectSound = function (count) {
        };
        ;
        CentreGroup.prototype._revealBonus = function (tile, delay) {
            tile.bonusReveal(delay);
        };
        ;
        CentreGroup.prototype._anticipationWin = function (type) {
            this._arr_colToAnticipation = [];
            this._arr_rowsToAnticipation = [];
            IWG.SignalManager.instance.dispatch('gridNextRevealSignal', this);
        };
        ;
        CentreGroup.prototype._revealNextWin = function () {
            var _this = this;
            var bwt = this.game.time.create(true);
            var bigwinDelay = 150;
            var eft = this.game.time.create(true);
            var endFlashReveal = 1000;
            this._arr_rowsToReveal.forEach(function (row) {
                row.winReveal(0);
                eft.add(endFlashReveal, function () {
                }, _this);
            });
            this._arr_colToReveal.forEach(function (col) {
                col.winReveal(0);
                eft.add(endFlashReveal, function () {
                }, _this);
            });
            for (var i = 0; i < this._arr_tileWinToReveal.length; i++) {
                if (i === this._arr_tileWinToReveal.length - 1) {
                    bwt.add(bigwinDelay, function (i) {
                        _this._arr_tileWinToReveal[i].winRowReveal(0);
                    }, this, i);
                }
                else {
                    bwt.add(bigwinDelay, function (i) {
                        _this._arr_tileWinToReveal[i].winRowReveal(0);
                    }, this, i);
                    eft.add(endFlashReveal, function (i) {
                        IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.ROWWIN, IWG.SoundChannels.FX_SOUNDS);
                    }, this, i);
                }
                bigwinDelay += 100;
            }
            ;
            bwt.start();
            eft.start();
        };
        ;
        CentreGroup.prototype._getTurn = function () {
            return this._turn;
        };
        return CentreGroup;
    }(IWG.GameGroup));
    IWG.CentreGroup = CentreGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var EndScreenGroup = (function (_super) {
        __extends(EndScreenGroup, _super);
        function EndScreenGroup() {
            var _this = this;
            _super.call(this);
            this._endPanel = null;
            this._endMessage = null;
            this._finishButton = null;
            this._endAmount = null;
            this._istrial = IWG.GameManager.instance.getTicketManager().getIsTrialGame();
            this._iswinner = IWG.GameManager.instance.getTicketManager().getIsWinner();
            this._endPanel = this.game.add.sprite(this.game.width / 2 - 300, -215, "masterSS", "END_panel.png", this);
            this._endPanel.anchor.setTo(0.5, 0.5);
            var playStates = {
                buttonUpStateImageName: "FINISH_button.png",
                buttonUpSpriteSheetName: "masterSS",
            };
            this._finishButton = new IWG.ButtonClass(playStates);
            this._finishButton.position.setTo(0, 60);
            this._finishButton.alpha = 0;
            this._finishButton.idleClass.setTimerValues(0, 0);
            this._finishButton.idleClass.enableOrDisableIdle(true);
            this._finishButton.idleClass.resetAndStartOrStopTimer(IWG.TimerInteractionStatus.startOrReset);
            this._finishButton.buttonEvents.onInputDown.add(function () {
                _this._finishButton.disableButton();
            }, this);
            this._endPanel.addChild(this._finishButton);
            if (this._istrial) {
                this._createTrial();
            }
            else {
                if (this._iswinner) {
                    this._createWin();
                }
                else {
                    this._createLose();
                }
            }
        }
        EndScreenGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('endGameIntro', this._show, this);
        };
        EndScreenGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('endGameIntro', this._show, this);
        };
        EndScreenGroup.prototype._createWin = function () {
            this._endMessage = this.game.add.image(0, -34, "masterSS", "WIN_message.png", this);
            this._endMessage.anchor.setTo(0.5, 0.5);
            this._endMessage.scale.setTo(0.8, 0.8);
            this._endAmount = this.game.add.bitmapText(0, -7, "win", "");
            this._endAmount.scale.set(1.9, 1.9);
            this._endAmount.anchor.setTo(0.5, 0.5);
            this._endPanel.addChild(this._endAmount);
            this._endPanel.addChild(this._endMessage);
        };
        EndScreenGroup.prototype._createLose = function () {
            this._endMessage = this.game.add.image(5, -5, "masterSS", "end_lose.png", this);
            this._endMessage.anchor.setTo(0.5, 0.5);
            this._endPanel.addChild(this._endMessage);
        };
        EndScreenGroup.prototype._createTrial = function () {
            this._endMessage = this.game.add.image(5, -5, "masterSS", "end_lose.png", this);
            this._endMessage.anchor.setTo(0.5, 0.5);
            this._endPanel.addChild(this._endMessage);
        };
        EndScreenGroup.prototype.createCounter = function (textField, currentValue, targetValue, speed, onStart, onUpdate, onComplete, onCompleteScope, isAnimated) {
            var counter = currentValue;
            var winAmount = targetValue - currentValue;
            var speedVariation = winAmount / speed;
            var tween;
            if (onStart !== null) {
                onStart.bind(onCompleteScope);
            }
            var timer = this.game.time.events.loop(1, function (oU, oC, oCS) {
                var realRandom = this.game.rnd.realInRange(speedVariation, speedVariation + (speedVariation * 0.1));
                counter += realRandom;
                textField.text = IWG.LanguageCurrencyManager.instance.formatCurrency(counter);
                if (oU !== null) {
                    oU.bind(oCS)();
                }
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.COUNTUP, IWG.SoundChannels.FX_SOUNDS);
                if (counter > targetValue) {
                    textField.text = IWG.LanguageCurrencyManager.instance.formatCurrency(targetValue);
                    if (oC !== null) {
                        oC.bind(oCS)();
                    }
                    this.game.time.events.remove(timer);
                    if (isAnimated) {
                        IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.ENDWIN, IWG.SoundChannels.FX_SOUNDS);
                    }
                }
            }, this, onUpdate, onComplete, onCompleteScope);
        };
        EndScreenGroup.prototype._show = function () {
            var rawbank = IWG.GameManager.instance.getTicketManager().getTotalAmount();
            var endDelay = 0;
            this._endPanel.alpha = 1;
            if (!this._istrial) {
                if (this._iswinner) {
                    endDelay = 1000;
                }
            }
            var movePanel = this.game.add.tween(this._endPanel).to({ y: this.game.height / 2 - 240 }, 1000, Phaser.Easing.Bounce.Out, true, endDelay);
            movePanel.onComplete.add(function () {
                var _this = this;
                if (!this._istrial) {
                    if (this._iswinner) {
                        var func = function () {
                            var fadeButton = _this.game.add.tween(_this._finishButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
                            fadeButton.onComplete.add(function () {
                                _this._finishButton.enableButton();
                            }, _this);
                        };
                        this.createCounter(this._endAmount, 0, rawbank, 130, null, null, func, null, true);
                    }
                    else {
                        IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS);
                        var fadeButton = this.game.add.tween(this._finishButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
                        fadeButton.onComplete.add(function () {
                            _this._finishButton.enableButton();
                        }, this);
                    }
                }
                else {
                    IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS);
                    var fadeButton = this.game.add.tween(this._finishButton).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
                    fadeButton.onComplete.add(function () {
                        _this._finishButton.enableButton();
                    }, this);
                }
            }, this);
        };
        return EndScreenGroup;
    }(IWG.GameGroup));
    IWG.EndScreenGroup = EndScreenGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var OverlayGroup = (function (_super) {
        __extends(OverlayGroup, _super);
        function OverlayGroup(smallButtonx, smallbuttonY, isTrial, overlayType, trialPosition, audioSettings) {
            _super.call(this);
            this._isTrial = null;
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
            ;
            if (trialPosition != null) {
                this._thisTrialPos = trialPosition;
            }
            if (audioSettings != null) {
                this._thisAudioType = audioSettings;
                if (!(this._thisType === OverlayGroup.FULLMENU) && (this._thisAudioType === OverlayGroup.AUDIO_SPLIT)) {
                    IWG.Debug.instance.warn("Cannot set audioSetting to split without using a FULLMENU type.");
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
            IWG.SignalManager.instance.add('MainGameGroup.moveSoundButton', this._moveSoundButton, this);
            IWG.SignalManager.instance.add('endGameIntro', this._hide, this);
        };
        ;
        OverlayGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('MainGameGroup.moveSoundButton', this._moveSoundButton, this);
            IWG.SignalManager.instance.remove('endGameIntro', this._hide, this);
        };
        ;
        ;
        OverlayGroup.prototype._addTextToMenu = function () {
        };
        ;
        OverlayGroup.prototype._moveSoundButton = function (coords) {
            var _this = this;
            console.log('in');
            var tween = this.game.add.tween(this._btn_smallAudioButton).to({ alpha: 0 }, 500, 'Linear', true);
            tween.onComplete.add(function () {
                _this._btn_smallAudioButton.position.setTo(coords.x, coords.y);
                var bringBack = _this.game.add.tween(_this._btn_smallAudioButton).to({ alpha: 1 }, 500, 'Linear', true);
            }, this);
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
            this._btn_smallAudioButton.events.onInputOver.add(function () {
                _this._btn_smallAudioButton.scale.setTo(1.1, 1.1);
            }, this);
            this._btn_smallAudioButton.events.onInputOut.add(function () {
                _this._btn_smallAudioButton.scale.setTo(1, 1);
            }, this);
            this._btn_smallAudioButton.events.onInputDown.add(function () {
                _this._btn_smallAudioButton.scale.setTo(.9, .9);
            }, this);
        };
        ;
        OverlayGroup.prototype._addFullMenu = function () {
            var _this = this;
            this._gfx_bgDim = this.game.make.graphics(0, 0);
            this.add(this._gfx_bgDim);
            this._gfx_bgDim.beginFill(0x000000, 0.65);
            this._gfx_bgDim.drawRect(0, 0, IWG.GameManager.instance.width, IWG.GameManager.instance.height);
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
            ;
            this._addTextToMenu();
        };
        ;
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
        ;
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
        ;
        OverlayGroup.prototype._musicToggle = function () {
            if (OverlayGroup._musicMuted === true) {
                if (!OverlayGroup._audioMuted) {
                    IWG.SignalManager.instance.dispatch("toggleMusic", true);
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
                IWG.SignalManager.instance.dispatch("toggleMusic", false);
                OverlayGroup._musicMuted = true;
                return true;
            }
        };
        ;
        OverlayGroup.prototype._audioToggle = function () {
            if (OverlayGroup._audioMuted === true) {
                IWG.SignalManager.instance.dispatch("toggleSFX", true);
                if (!OverlayGroup._musicMuted) {
                    IWG.SignalManager.instance.dispatch("toggleMusic", true);
                }
                OverlayGroup._audioMuted = false;
                return false;
            }
            else {
                IWG.SignalManager.instance.dispatch("toggleSFX", false);
                IWG.SignalManager.instance.dispatch("toggleMusic", false);
                OverlayGroup._audioMuted = true;
                return true;
            }
        };
        ;
        OverlayGroup.prototype._hide = function () {
            var _this = this;
            var hide = this.game.add.tween(this).to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
            hide.onComplete.add(function () {
                _this.destroy();
            }, this);
        };
        ;
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
    }(IWG.GameGroup));
    IWG.OverlayGroup = OverlayGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SplashScreenGroup = (function (_super) {
        __extends(SplashScreenGroup, _super);
        function SplashScreenGroup() {
            var _this = this;
            _super.call(this);
            this._logo = null;
            this._betPanel = null;
            this._playButtonHighlight = null;
            this._playButton = null;
            this._minusBet = null;
            this._plusBet = null;
            this._betValue = null;
            this._prizeArray = [
                '0.20',
                '0.50',
                '1.00',
                '2.00',
                '5.00',
                '10.00',
                '15.00',
                '20.00'
            ];
            this._prizeArrayPointer = 0;
            this._value = 5;
            this._logo = this.game.add.sprite(this.game.width / 2, this.game.height / 2 - 170, "masterSS", "LOGO_big.png", this);
            this._logo.anchor.setTo(0.5, 0.5);
            this._betPanel = this.game.add.sprite(this.game.width / 2 + 10, this.game.height / 2 + 45, "masterSS", "BET_panel.png", this);
            this._betPanel.anchor.setTo(0.5, 0.5);
            this._betValue = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 + 60, "Bet", "£0.20", 72, this);
            this._betValue.anchor.set(0.5, 0.5);
            this._playButtonHighlight = this.game.add.sprite(0, 0, 'masterSS', 'just_glow.png', this);
            this._playButtonHighlight.anchor.setTo(0.5, 0.5);
            this._playButtonHighlight.position.setTo(this.game.width / 2, this.game.height / 2 + 235);
            this._playButtonHighlight.alpha = 0;
            var playStates = {
                buttonUpStateImageName: "playidle_01.png",
                buttonUpSpriteSheetName: "playButtonSS",
                buttonDownStateImageName: "PLAY_button.png",
                buttonDownSpriteSheetName: "masterSS",
                buttonOverStateImageName: "PLAY_button.png",
                buttonOverSpriteSheetName: "masterSS"
            };
            this._playButton = this.game.add.sprite(0, 0, 'playButtonSS', 'playidle0001.png', this);
            this._playButton.anchor.setTo(0.5, 0.5);
            this._playButton.position.setTo(this.game.width / 2, this.game.height / 2 + 235);
            this._playButton.inputEnabled = true;
            this._playButton.input.useHandCursor = true;
            this._playButton.smoothed = false;
            this._playButton.animations.add('idle', Phaser.Animation.generateFrameNames('playidle', 0, 12, '.png', 4), 18, true);
            this._playButton.animations.add('click', Phaser.Animation.generateFrameNames('playclick', 0, 19, '.png', 4), 18, true);
            this._playButton.play('idle');
            this._playButton.events.onInputOver.add(function () {
                _this.game.add.tween(_this._playButtonHighlight).to({ alpha: 1 }, 400, "Linear", true, 0);
            }, this);
            this._playButton.events.onInputOut.add(function () {
                _this.game.add.tween(_this._playButtonHighlight).to({ alpha: 0 }, 400, "Linear", true, 0);
            }, this);
            this._playButton.events.onInputDown.add(function () {
                _this._playButton.inputEnabled = false;
                _this._playButton.input.useHandCursor = false;
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.PLAYSTART, IWG.SoundChannels.FX_SOUNDS);
                _this._minusBet.disableButton();
                _this._plusBet.disableButton();
                _this._splashOutro();
                IWG.SignalManager.instance.dispatch('SplashScreenGroup.gameValue', Number(_this._prizeArray[_this._prizeArrayPointer]));
            }, this);
            var minusStates = {
                buttonUpStateImageName: "LEFT_arrow.png",
                buttonUpSpriteSheetName: "masterSS"
            };
            var plusStates = {
                buttonUpStateImageName: "RIGHT_arrow.png",
                buttonUpSpriteSheetName: "masterSS"
            };
            this._minusBet = new IWG.ButtonClass(minusStates);
            this._plusBet = new IWG.ButtonClass(plusStates);
            this._minusBet.position.setTo(this.game.width / 2 - 165, this.game.height / 2 + 45);
            this._plusBet.position.setTo(this.game.width / 2 + 165, this.game.height / 2 + 45);
            this._minusBet.buttonEvents.onInputDown.add(function () {
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.ROLLOVER, IWG.SoundChannels.FX_SOUNDS);
                if (_this._prizeArrayPointer > 0) {
                    _this._prizeArrayPointer--;
                    _this._plusBet.enableButton();
                }
                if (_this._prizeArrayPointer === 0) {
                    _this._minusBet.disableButton();
                }
                _this._updateBet();
            }, this);
            this._plusBet.buttonEvents.onInputDown.add(function () {
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.ROLLOVER, IWG.SoundChannels.FX_SOUNDS);
                if (_this._prizeArrayPointer < 7) {
                    _this._prizeArrayPointer++;
                    _this._minusBet.enableButton();
                }
                if (_this._prizeArrayPointer === 7) {
                    _this._plusBet.disableButton();
                }
                _this._updateBet();
            }, this);
            this._minusBet.disableButton();
        }
        SplashScreenGroup.prototype._splashOutro = function () {
            var _this = this;
            this._playButton.animations.play('click', 18, false, false);
            this._playButton.animations.currentAnim.onComplete.add(function () {
                var playTween = _this.game.add.tween(_this._playButton).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
                IWG.SignalManager.instance.dispatch('playAudio', IWG.Sounds.BACKGROUND, IWG.SoundChannels.BACKGROUND);
                var logoTween = _this.game.add.tween(_this._logo).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 100);
                var minusTween = _this.game.add.tween(_this._minusBet).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 100);
                var plusTween = _this.game.add.tween(_this._plusBet).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 100);
                var valueTween = _this.game.add.tween(_this._betValue).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 100);
                var panelTween = _this.game.add.tween(_this._betPanel).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 300);
                panelTween.onComplete.add(function () {
                    IWG.SignalManager.instance.dispatch('SplashScreenGroup.mainGameIntro');
                }, _this);
            }, this);
        };
        SplashScreenGroup.prototype._updateBet = function () {
            this._betValue.text = "£" + this._prizeArray[this._prizeArrayPointer];
        };
        return SplashScreenGroup;
    }(IWG.GameGroup));
    IWG.SplashScreenGroup = SplashScreenGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon() {
            var _this = this;
            _super.call(this);
            this._bot = null;
            this._top = null;
            this._symbol = null;
            this._front = null;
            this._glow = null;
            this._topAnim = null;
            this._topPosition = null;
            this.name = "icon";
            this._bot = this.game.add.sprite(62, 45, "masterSS", "BOX_bottom.png", this);
            this._bot.anchor.setTo(0.5, 0.5);
            this._symbol = this.game.add.sprite(62, 20, "MonsterSS");
            this._symbol.animations.add('idle', Phaser.Animation.generateFrameNames('blackidle', 0, 36, '.png', 4), 18, true);
            this._symbol.anchor.setTo(0.5, 0.5);
            this._symbol.alpha = 0;
            this.add(this._symbol);
            this._glow = this.game.add.sprite(62, 40, "masterSS", "instantwin_highlight.png", this);
            this._glow.anchor.setTo(0.5, 0.5);
            this._glow.scale.setTo(0, 0);
            this._glow.alpha = 0;
            this._front = this.game.add.sprite(62, 60, "masterSS", "BOX_bottom_front.png", this);
            this._front.anchor.setTo(0.5, 0.5);
            this._top = this.game.add.sprite(62, 27, "masterSS", "BOX_top.png", this);
            this._top.anchor.setTo(0.5, 0.5);
            this._top.hitArea = new Phaser.Rectangle(-62, -31, 124, 100);
            this._top.inputEnabled = false;
            this._top.events.onInputOver.add(function () {
                IWG.SignalManager.instance.dispatch('Icon.animateIdle', "stop");
                _this._liftTop();
            }, this);
            this._top.events.onInputOut.add(function () {
                IWG.SignalManager.instance.dispatch('Icon.animateIdle', "restart");
                _this._dropTop();
            }, this);
            this._top.events.onInputDown.add(function () {
                _this._click();
            }, this);
            var oriX = this._top.position.x;
            this._topAnim = this.game.add.tween(this._top).to({ x: oriX + 3, angle: [0, this.game.rnd.integerInRange(2, 5), this.game.rnd.integerInRange(-2, -5), 0] }, 500, Phaser.Easing.Linear.None, false, this.game.rnd.integerInRange(4000, 8000), -1, true);
            this._topAnim.repeatDelay(this.game.rnd.integerInRange(1000, 4000));
            this._topAnim.interpolation(Phaser.Math.catmullRomInterpolation);
            this._topPosition = new Phaser.Point(this._top.position.x, this._top.position.y);
        }
        Icon.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('MainGameGroup.disableButtons', this._disable, this);
            IWG.SignalManager.instance.add('SplashScreenGroup.mainGameIntro', this._enableButtons, this);
            IWG.SignalManager.instance.add('MainGameGroup.enableButtons', this._enableButtons, this);
            IWG.SignalManager.instance.add('Icon.animateIdle', this._idleAnimationControl, this);
        };
        ;
        Icon.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('MainGameGroup.disableButtons', this._disable, this);
            IWG.SignalManager.instance.remove('SplashScreenGroup.mainGameIntro', this._enableButtons, this);
            IWG.SignalManager.instance.remove('MainGameGroup.enableButtons', this._enableButtons, this);
            IWG.SignalManager.instance.remove('Icon.animateIdle', this._idleAnimationControl, this);
        };
        ;
        Icon.prototype._liftTop = function () {
            var liftUp = this.game.add.tween(this._top).to({ y: this._topPosition.y - 15 }, 100, 'Linear', true, 0);
            this.game.add.tween(this._glow.scale).to({ x: 0.7, y: 2 }, 100, "Linear", true, 0);
            this.game.add.tween(this._glow).to({ alpha: 1 }, 100, "Linear", true, 0);
        };
        Icon.prototype._dropTop = function () {
            var liftUp = this.game.add.tween(this._top).to({ y: this._topPosition.y }, 100, 'Linear', true, 0);
            this.game.add.tween(this._glow.scale).to({ x: 0, y: 0 }, 100, "Linear", true, 0);
            this.game.add.tween(this._glow).to({ alpha: 0 }, 100, "Linear", true, 0);
        };
        Icon.prototype._click = function () {
            var _this = this;
            this._top.alpha = 0;
            this._top.inputEnabled = false;
            this.alive = false;
            var revealFrames = [
                new IWG.Particle(["BOX_piece1.png"], 1, { min: -300, max: 300 }, { min: -200, max: -700 }, 0, 0, 2000, -62, -62),
                new IWG.Particle(["BOX_piece2.png"], 1, { min: -300, max: 300 }, { min: -200, max: -700 }, 0, 0, 2000, -62, -62),
                new IWG.Particle(["BOX_piece3.png"], 1, { min: -300, max: 300 }, { min: -200, max: -700 }, 0, 0, 2000, -62, -62),
                new IWG.Particle(["BOX_piece4.png"], 1, { min: -300, max: 300 }, { min: -200, max: -700 }, 0, 0, 2000, -62, -62),
                new IWG.Particle(["BOX_piece5.png"], 1, { min: -300, max: 300 }, { min: -200, max: -700 }, 0, 0, 2000, -62, -62),
                new IWG.Particle(["BOX_smoke.png"], 10, { min: -40, max: 40 }, { min: -50, max: -100 }, 0, 40, -1, -62, -62, 1, 0, 1, 1, 2000, 20)
            ];
            var ticket = IWG.GameManager.instance.getTicketManager();
            var ticketData = ticket.getGameOneTurn(IWG.GameManager.instance.getClickCount());
            IWG.Reveals.Pop_Reveal(this._top, null, this, 'masterSS', revealFrames, function () {
                var animation = IWG.GameManager.instance.getSymbol(ticketData.pIndex)[0];
                _this._symbol.loadTexture('MonsterSS', animation + "0001.png");
                _this._symbol.alpha = 0;
                _this._symbol.animations.add('idle', Phaser.Animation.generateFrameNames(animation, 0, 36, '.png', 4), 18, true);
                var tween = _this.game.add.tween(_this._symbol).to({ alpha: 1 }, 1000, 'Linear', true);
                tween.onComplete.add(function () {
                    _this._symbol.animations.play('idle');
                }, _this);
                IWG.SignalManager.instance.dispatch('Icon.clickCount');
                IWG.SignalManager.instance.dispatch('addSymbolToReveal', ticketData.pIndex, _this);
            }, this);
        };
        Icon.prototype._disable = function () {
            var _this = this;
            this._top.inputEnabled = false;
            this._top.input.useHandCursor = false;
            var colorBlend = { step: 0 };
            this.game.add.tween(colorBlend).to({ step: 100 }, 1000, Phaser.Easing.Default, false)
                .onUpdateCallback(function () {
                if (_this.alive) {
                    _this._bot.alpha = 0;
                    _this._top.tint = Phaser.Color.interpolateColor(0xffffff, 0x737373, 100, colorBlend.step, 1);
                    _this._front.tint = Phaser.Color.interpolateColor(0xffffff, 0x737373, 100, colorBlend.step, 1);
                    _this.game.add.tween(_this._top).to({ alpha: 0.7 }, 1500, 'Linear', true, 500);
                    _this.game.add.tween(_this._front).to({ alpha: 0.7 }, 1500, 'Linear', true, 500);
                    _this._idleAnimationControl('stop');
                }
            })
                .start();
        };
        Icon.prototype._enableButtons = function () {
            this._top.inputEnabled = true;
            this._top.input.useHandCursor = true;
        };
        Icon.prototype._idleAnimationControl = function (state) {
            if (state === "start") {
                this._topAnim.start();
                return true;
            }
            else if (state === "restart") {
                this._topAnim.stop();
                this._top.angle = 0;
                var oriX = this._top.position.x;
                this._topAnim = this.game.add.tween(this._top).to({ x: oriX + 3, angle: [0, this.game.rnd.integerInRange(2, 5), this.game.rnd.integerInRange(-2, -5), 0] }, 500, Phaser.Easing.Linear.None, false, this.game.rnd.integerInRange(4000, 8000), -1, true);
                this._topAnim.repeatDelay(this.game.rnd.integerInRange(1000, 4000));
                this._topAnim.interpolation(Phaser.Math.catmullRomInterpolation);
                this._topAnim.start();
                return true;
            }
            else if (state === "stop") {
                this._topAnim.stop(true);
                this._top.angle = 0;
                return true;
            }
            return false;
        };
        return Icon;
    }(IWG.GameGroup));
    IWG.Icon = Icon;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
            this._gfx_background = null;
            this._logoGroup = null;
            this._gfx_spMainSquare = null;
            this._gfx_spSmallSquare1 = null;
            this._gfx_spSmallSquare2 = null;
            this._gfx_spSmallSquare3 = null;
            this._gfx_spSmallSquare4 = null;
            this._sideplayLogo = null;
            this._entertainnment = null;
            this._loadingBar = null;
            this._completed = 0;
        }
        Preloader.prototype.setupLoadingScene = function () {
            _super.prototype.setupLoadingScene.call(this);
            this._gfx_background = this.game.make.graphics(0, 0);
            this._gfx_background.beginFill(0xFFFFFF, 1);
            this._gfx_background.drawRect(0, 0, this.game.width, this.game.height);
            this.add.existing(this._gfx_background);
            this._logoGroup = this.game.make.group();
            this._gfx_spMainSquare = this.game.make.graphics(-34, 0);
            this._gfx_spMainSquare.beginFill(0x454847, 1);
            this._gfx_spMainSquare.drawRect(0, 0, 206, 181);
            this._gfx_spMainSquare.pivot.set(this._gfx_spMainSquare.width / 2, this._gfx_spMainSquare.height / 2);
            this._logoGroup.add(this._gfx_spMainSquare);
            this._gfx_spSmallSquare1 = this.game.make.graphics(106, -72);
            this._gfx_spSmallSquare1.beginFill(0x00ADEE, 1);
            this._gfx_spSmallSquare1.drawRect(-0, 0, 61, 38);
            this._gfx_spSmallSquare1.pivot.set(this._gfx_spSmallSquare1.width / 2, this._gfx_spSmallSquare1.height / 2);
            this._logoGroup.add(this._gfx_spSmallSquare1);
            this._gfx_spSmallSquare2 = this.game.make.graphics(106, -24);
            this._gfx_spSmallSquare2.beginFill(0x00ADEE, 1);
            this._gfx_spSmallSquare2.drawRect(0, 0, 61, 38);
            this._gfx_spSmallSquare2.pivot.set(this._gfx_spSmallSquare2.width / 2, this._gfx_spSmallSquare2.height / 2);
            this._logoGroup.add(this._gfx_spSmallSquare2);
            this._gfx_spSmallSquare3 = this.game.make.graphics(106, 24);
            this._gfx_spSmallSquare3.beginFill(0x00ADEE, 1);
            this._gfx_spSmallSquare3.drawRect(0, 0, 61, 38);
            this._gfx_spSmallSquare3.pivot.set(this._gfx_spSmallSquare3.width / 2, this._gfx_spSmallSquare3.height / 2);
            this._logoGroup.add(this._gfx_spSmallSquare3);
            this._gfx_spSmallSquare4 = this.game.make.graphics(106, 72);
            this._gfx_spSmallSquare4.beginFill(0x00ADEE, 1);
            this._gfx_spSmallSquare4.drawRect(0, 0, 61, 38);
            this._gfx_spSmallSquare4.pivot.set(this._gfx_spSmallSquare4.width / 2, this._gfx_spSmallSquare4.height / 2);
            this._logoGroup.add(this._gfx_spSmallSquare4);
            this._logoGroup.position.setTo(this.game.world.centerX, this.game.world.centerY - 40);
            this.add.existing(this._logoGroup);
            this._sideplayLogo = this.game.make.image(-36, 65, 'sideplay');
            this._sideplayLogo.anchor.setTo(.5, .5);
            this._sideplayLogo.scale.setTo(.55, .55);
            this._logoGroup.add(this._sideplayLogo);
            this._entertainnment = this.game.make.image(0, 105, 'entertainment');
            this._entertainnment.anchor.setTo(.5, .5);
            this._entertainnment.scale.setTo(.55, .55);
            this._logoGroup.add(this._entertainnment);
            this._loadingBar = this.game.make.graphics(this.game.world.centerX, this.game.world.centerY + 120);
            this._loadingBar.beginFill(0x00ADEE);
            this._loadingBar.lineWidth = 2;
            this._loadingBar.lineColor = 0x000000;
            this._loadingBar.drawRect(0, 0, this.game.width + 4, 10);
            this._loadingBar.pivot.set(this._loadingBar.width / 2, this._loadingBar.height / 2);
            this._loadingBar.scale.set(0, 1);
            this.add.existing(this._loadingBar);
            this._introAnimation();
        };
        Preloader.prototype._introAnimation = function () {
            var _this = this;
            this._gfx_spSmallSquare1.visible = false;
            this._gfx_spSmallSquare2.visible = false;
            this._gfx_spSmallSquare3.visible = false;
            this._gfx_spSmallSquare4.y += 38;
            this._sideplayLogo.alpha = 0;
            var squareMask = this.game.make.graphics(this.game.world.centerX, this.game.world.centerY);
            squareMask.beginFill(0xFF3333, 1);
            squareMask.drawRect(0, 51, 200, -100);
            this.add.existing(squareMask);
            this._gfx_spSmallSquare4.mask = squareMask;
            var sideplayMask = this.game.make.graphics(this.game.world.centerX, this.game.world.centerY);
            sideplayMask.beginFill(0xFF3333, 1);
            sideplayMask.drawRect(-138, -138, 276, 276);
            this.add.existing(sideplayMask);
            this._sideplayLogo.mask = sideplayMask;
            var entertainmentMask = this.game.make.graphics(this.game.world.centerX, this.game.world.centerY);
            entertainmentMask.beginFill(0xFF3333, 1);
            entertainmentMask.drawRect(-138, 51, 276, 100);
            this.add.existing(entertainmentMask);
            this._entertainnment.mask = entertainmentMask;
            this._entertainnment.position.y -= 55;
            var scaleUp = this.game.add.tween(this._gfx_spSmallSquare4).to({ y: 72 }, 400, Phaser.Easing.Quadratic.In, true);
            scaleUp.onComplete.add(function () {
                _this._gfx_spSmallSquare3.visible = true;
                _this._gfx_spSmallSquare3.position.y = 72;
                var firstPop = _this.game.add.tween(_this._gfx_spSmallSquare3).to({ y: 24 }, 300, Phaser.Easing.Linear.None, true);
                firstPop.onComplete.add(function () {
                    _this._gfx_spSmallSquare1.position.y = 24;
                    _this._gfx_spSmallSquare2.position.y = 24;
                    _this._gfx_spSmallSquare2.visible = true;
                    var secondPop = _this.game.add.tween(_this._gfx_spSmallSquare2).to({ y: -24 }, 300, Phaser.Easing.Linear.None, true);
                    secondPop.onComplete.add(function () {
                        _this._gfx_spSmallSquare1.position.y = -24;
                        _this._gfx_spSmallSquare1.visible = true;
                        var thirdPop = _this.game.add.tween(_this._gfx_spSmallSquare1).to({ y: -72 }, 400, Phaser.Easing.Quadratic.Out, true);
                        _this._sideplayLogo.x -= 200;
                        var sideplayScrollIn = _this.game.add.tween(_this._sideplayLogo).to({ x: -36, alpha: 1 }, 700, Phaser.Easing.Quartic.Out, true);
                        var entertainmentDropIn = _this.game.add.tween(_this._entertainnment).to({ y: 105 }, 1000, Phaser.Easing.Bounce.Out, true, 150);
                        entertainmentDropIn.onComplete.add(function () {
                            _this._onComplete();
                        }, _this);
                    }, _this);
                }, _this);
            }, this);
        };
        ;
        Preloader.prototype.addAssetsToLoad = function () {
            var path = "";
            if (path === 'https://sta-williamhill.static.virtuefusion.com/assets/files/com.sideplay/sherluck-holmes/current/zip/') {
                console.log('Path override');
                path = 'dist/';
            }
            this.load.image('bg', path + './assets/img/bg_main.png');
            this.load.atlasJSONArray('masterSS', path + './assets/spritesheets/masterSS.png', path + './assets/spritesheets/masterSS.json');
            this.load.atlasJSONArray('MonsterSS', path + './assets/spritesheets/MonsterSS.png', path + './assets/spritesheets/MonsterSS.json');
            this.load.atlasJSONArray('playButtonSS', path + './assets/spritesheets/playButtonSS.png', path + './assets/spritesheets/playButtonSS.json');
            this.load.audio(IWG.Sounds.BACKGROUND, [path + './assets/audio/background/background.mp3', path + './assets/audio/background/background.ogg']);
            this.load.audio(IWG.Sounds.REVEAL, [path + './assets/audio/reveal/reveal.mp3', path + './assets/audio/reveal/reveal.ogg']);
            this.load.audio(IWG.Sounds.BONUSCOLLECT, [path + './assets/audio/Sounds/bonusCollect.mp3', path + './assets/audio/Sounds/bonusCollect.ogg']);
            this.load.audio(IWG.Sounds.BONUSWIN, [path + './assets/audio/Sounds/bonusWin.mp3', path + './assets/audio/Sounds/bonusWin.ogg']);
            this.load.audio(IWG.Sounds.BOXSMOKE, [path + './assets/audio/Sounds/boxSmoke.mp3', path + './assets/audio/Sounds/boxSmoke.ogg']);
            this.load.audio(IWG.Sounds.COUNTUP, [path + './assets/audio/Sounds/countUp.mp3', path + './assets/audio/Sounds/countUp.ogg']);
            this.load.audio(IWG.Sounds.ENDLOSE, [path + './assets/audio/Sounds/endLose.mp3', path + './assets/audio/Sounds/endLose.ogg']);
            this.load.audio(IWG.Sounds.ENDWIN, [path + './assets/audio/Sounds/endWin.mp3', path + './assets/audio/Sounds/endWin.ogg']);
            this.load.audio(IWG.Sounds.MONSTER1, [path + './assets/audio/Sounds/monster1.mp3', path + './assets/audio/Sounds/monster1.ogg']);
            this.load.audio(IWG.Sounds.MONSTER2, [path + './assets/audio/Sounds/monster2.mp3', path + './assets/audio/Sounds/monster2.ogg']);
            this.load.audio(IWG.Sounds.MONSTER3, [path + './assets/audio/Sounds/monster3.mp3', path + './assets/audio/Sounds/monster3.ogg']);
            this.load.audio(IWG.Sounds.MONSTER4, [path + './assets/audio/Sounds/monster4.mp3', path + './assets/audio/Sounds/monster4.ogg']);
            this.load.audio(IWG.Sounds.MONSTERSPLAT, [path + './assets/audio/Sounds/monsterSplat.mp3', path + './assets/audio/Sounds/monsterSplat.ogg']);
            this.load.audio(IWG.Sounds.ROLLOVER, [path + './assets/audio/Sounds/rollover.mp3', path + './assets/audio/Sounds/rollover.ogg']);
            this.load.audio(IWG.Sounds.ROWWIN, [path + './assets/audio/Sounds/rowWin.mp3', path + './assets/audio/Sounds/rowWin.ogg']);
            this.load.audio(IWG.Sounds.WOODHIT, [path + './assets/audio/Sounds/woodHit.mp3', path + './assets/audio/Sounds/woodHit.ogg']);
            this.load.audio(IWG.Sounds.PLAYSTART, [path + './assets/audio/Sounds/playButton.mp3', path + './assets/audio/Sounds/playButton.ogg']);
            this.load.audio(IWG.Sounds.GREMLIN1, [path + './assets/audio/Sounds/gremlin1.mp3', path + './assets/audio/Sounds/gremlin1.ogg']);
            this.load.audio(IWG.Sounds.GREMLIN2, [path + './assets/audio/Sounds/gremlin2.mp3', path + './assets/audio/Sounds/gremlin2.ogg']);
            this.load.audio(IWG.Sounds.GREMLIN3, [path + './assets/audio/Sounds/gremlin3.mp3', path + './assets/audio/Sounds/gremlin3.ogg']);
            this.load.bitmapFont('Bet', './assets/fonts/BET_font-export.png', './assets/fonts/BET_font-export.xml');
            this.load.bitmapFont('prizes', './assets/fonts/PRIZES_font-export.png', './assets/fonts/PRIZES_font-export.xml', -10, 0);
            this.load.bitmapFont('prizesWin', './assets/fonts/PRIZES_font-highlight-export.png', './assets/fonts/PRIZES_font-highlight-export.xml', -10, 0);
            this.load.bitmapFont('win', './assets/fonts/WIN_font-export.png', './assets/fonts/WIN_font-export.xml', -10, 0);
            this.load.bitmapFont('bonus', './assets/fonts/INSTANTWIN_font-export.png', './assets/fonts/INSTANTWIN_font-export.xml');
            this.load.atlasJSONArray("languagePack", path + "./assets/spritesheets/" + IWG.LanguageCurrencyManager.instance.getAssetPackInfo().assetImgName, path + "./assets/spritesheets/" + IWG.LanguageCurrencyManager.instance.getAssetPackInfo().assetImgJsonName);
            this.load.atlasJSONArray('overlay', path + './assets/spritesheets/overlay.png', path + './assets/spritesheets/overlay.json');
        };
        Preloader.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this._loadingBar.scale.x = progress / 100;
        };
        Preloader.prototype._assignSounds = function () {
            IWG.GameManager.instance.getAudioManager().addSoundChannel(IWG.SoundChannels.BACKGROUND, 0);
            IWG.GameManager.instance.getAudioManager().addSoundChannel(IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BACKGROUND, IWG.SoundChannels.BACKGROUND, 0.5, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.PLAYSTART, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.REVEAL, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.SUSHISHOW, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BONUSCOLLECT, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BONUSWIN, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BOXSMOKE, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.COUNTUP, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ENDWIN, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MONSTER1, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MONSTER2, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MONSTER3, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MONSTER4, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MONSTERSPLAT, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ROLLOVER, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ROWWIN, IWG.SoundChannels.FX_SOUNDS, 0.6);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.WOODHIT, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.GREMLIN1, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.GREMLIN2, IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.GREMLIN3, IWG.SoundChannels.FX_SOUNDS, 1);
        };
        ;
        Preloader.prototype.onLoad = function () {
            _super.prototype.onLoad.call(this);
            this._assignSounds();
            this._onComplete();
        };
        ;
        Preloader.prototype._onComplete = function () {
            this._completed++;
            if (this._completed === 2) {
                IWG.SignalManager.instance.dispatch('states.SwitchState', 'MainGame');
            }
        };
        ;
        return Preloader;
    }(IWG.Preloader_Core));
    IWG.Preloader = Preloader;
})(IWG || (IWG = {}));
//# sourceMappingURL=initGameNC.js.map