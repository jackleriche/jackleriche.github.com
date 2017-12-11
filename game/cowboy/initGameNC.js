var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        TicketManager.prototype.getGameOneTurn = function (turnNumber) {
            return this._ticket.turns.g1[turnNumber];
        };
        TicketManager.prototype.validate = function () {
            var totalWinValue = 0;
            var winCount = 0;
            var winPrize = -1;
            var symbols = [];
            console.log(this._ticket);
            if (this.getIsWinner()) {
                if (this._ticket.outcome.amount === 0) {
                    return false;
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    if (this._ticket.turns.g1[i].w === 1) {
                        if (winCount === 0) {
                            totalWinValue += this._ticket.turns.g1[i].value;
                        }
                        if (winPrize === -1) {
                            winPrize = this._ticket.turns.g1[i].value;
                        }
                        winCount++;
                    }
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    if (winPrize != this._ticket.turns.g1[i].value && this._ticket.turns.g1[i].w === 1) {
                        return false;
                    }
                }
                if (winCount !== 3) {
                    return false;
                }
            }
            else {
                if (this._ticket.outcome.amount !== 0) {
                    return false;
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    symbols.push(this._ticket.turns.g1[i].value);
                    if (this._ticket.turns.g1[i].w === 1) {
                        return false;
                    }
                }
                symbols.sort(function (a, b) { return a - b; });
                for (var i = 0; i < symbols.length - 2; i++) {
                    if (symbols[i] != undefined && symbols[i + 1] != undefined && symbols[i + 2] != undefined) {
                        if (symbols[i] === symbols[i + 1] && symbols[i + 1] === symbols[i + 2]) {
                            return false;
                        }
                    }
                }
            }
            if (totalWinValue !== this._ticket.outcome.amount) {
                console.log(totalWinValue, this._ticket.outcome.amount);
                return false;
            }
            return true;
        };
        return TicketManager;
    }());
    IWG.TicketManager = TicketManager;
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
            this.load.image('loadingScreen', './assets/img/loadingScreen.png');
            this.load.image('horse', './assets/img/horse.png');
            this.load.image('box', './assets/img/box.png');
            this.load.json("langConfig", "./js/langConfig.json");
        };
        Boot.prototype.create = function () {
            IWG.LanguageCurrencyManager.instance.init(this.cache.getJSON("langConfig"), "en", "GBP", false, false);
            IWG.Debug.instance.log("Boot created", IWG.DEBUGTYPE.INIT, this);
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignVertically = true;
            this.scale.refresh();
            this.game.time.desiredFps = 60;
            this.game.tweens.frameBased = true;
            if (this.game.device.desktop) {
            }
            else {
                IWG.DeviceManager.instance.fullscreen = true;
                IWG.DeviceManager.instance.orientation = true;
            }
            IWG.DeviceManager.instance.init();
            IWG.DeviceManager.instance.update();
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
        return Boot;
    }(Phaser.State));
    IWG.Boot = Boot;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Sounds = (function () {
        function Sounds() {
        }
        Sounds.SOUND_IDS = "soundID";
        Sounds.BACKGROUNDLOOP = 'backgroundLoop';
        Sounds.CLICK = 'click';
        Sounds.ROLLOVER = 'rollover';
        Sounds.PLAYBUTTON = 'playButton';
        Sounds.GUNSHOT = 'gunShot';
        Sounds.PRIZEREVEAL = 'prizeReveal';
        Sounds.BONUSKEY = 'bonusKey';
        Sounds.EAGLEFLY = 'eagleFly';
        Sounds.ENDWIN = 'endWin';
        Sounds.ENDLOSE = 'endLose';
        Sounds.MULTIPLER = 'multiplierWin';
        Sounds.JAILDOOR = 'jailDoor';
        Sounds.ROWWIN = 'rowWin';
        Sounds.SWOOSH = 'swoosh';
        Sounds.MEGASWOOSH = 'mega_swoosh';
        Sounds.COUNT = 'count';
        Sounds.KERCHING = 'kerching';
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
        };
        ;
        AudioManager.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove(AudioManager.PLAY_AUDIO, this._playAudio, this);
            IWG.SignalManager.instance.remove(AudioManager.STOP_AUDIO, this._stopAudio, this);
            IWG.SignalManager.instance.remove(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            IWG.SignalManager.instance.remove(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
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
    IWG.AudioManager = AudioManager;
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
            if (this.activeTween !== undefined && this.game !== null) {
                this.game.tweens.remove(this.activeTween);
            }
            this.activeTween = null;
        };
        ButtonClass.prototype.getButtonSprite = function () {
            return this.buttonSprite;
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
                if (instance.game !== null && _this !== null) {
                    instance.game.tweens.remove(buttonPrompt);
                    if (_this.buttonEnabledStatus) {
                        instance.promptTweenPart2();
                    }
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
                if (instance.game !== null && _this !== null) {
                    instance.game.tweens.remove(buttonPrompt);
                    if (_this.buttonEnabledStatus) {
                        instance.promptTweenPart1();
                    }
                }
            });
            buttonPrompt.start();
        };
        ButtonClass.prototype.enableButton = function () {
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
            { country: "United Kingdom", currency: "Pound", ISOCode: "GBP", minorPresent: true, majorSymbol: "£", minorSymbol: "p", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "United States", currency: "Dollar", ISOCode: "USD", minorPresent: true, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Euro Member Countries", currency: "Euro", ISOCode: "EUR", minorPresent: false, majorSymbol: "€", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "R", minorPosition: "", majorDelimiter: ".", minorDelimiter: "," },
            { country: "Japan", currency: "Yen", ISOCode: "JPY", minorPresent: false, majorSymbol: "¥", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Mexico", currency: "Peso", ISOCode: "MXN", minorPresent: false, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." }
        ];
        return LanguageCurrencyManager;
    }());
    IWG.LanguageCurrencyManager = LanguageCurrencyManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Prize_Core = (function (_super) {
        __extends(Prize_Core, _super);
        function Prize_Core(gamePanel, buttonParams) {
            _super.call(this, buttonParams);
            this._thisTurn = null;
            this._isWinner = null;
            this.gameNumber = -1;
            this.prizeAmountValueFormatted = 'n';
            this.prizeAmountValue = 'n';
            this.prizeIndex = null;
            this._onAnimationComplete = function () { throw new Error("No animation complete set! Did you forget to call a super? "); };
            this._onAnimationCompleteScope = null;
            this._numberOfRevealingObjects = 1;
            this._numberOfCountingObjects = 1;
            this._numberOfWinningObjects = 1;
            this._numberOfLosingObjects = 1;
            this._numRevealedObjects = 0;
            this._rowInitialised = false;
            this._rowHasRevealed = false;
            this._rowHasCountedUp = false;
            this._checkedForWin = false;
            this._winRevealed = false;
            this._cycleFinished = false;
            this._rowPressed = false;
            this.grp_concealerGroup = null;
            this.grp_prizeGroup = null;
            this.gamePanel = null;
            this.gamePanel = gamePanel;
            this.grp_concealerGroup = this.game.make.group();
            this.add(this.grp_concealerGroup);
            this.grp_concealerGroup.add(this.getScalerGroup());
            this.idleClass.setIdleController(this.gamePanel.idleController, true);
            this.idleClass.enableOrDisableIdle(true);
            this.idleClass.enableOrDisableIdleTimeOut(true);
            this.grp_prizeGroup = this.game.make.group();
            this.add(this.grp_prizeGroup);
            this.grp_prizeGroup.alpha = 0;
            this.grp_prizeGroup.visible = false;
        }
        Prize_Core.prototype.revealSymbolsAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.revealWinAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.countUpAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.revealLoseAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.subscribeSignals = function () {
        };
        ;
        Prize_Core.prototype.unsubscribeSignals = function () {
        };
        ;
        ;
        Prize_Core.prototype.buttonUp = function () {
            this.prizePressed();
            this.disableButton();
            this.idleClass.coreResumeIdleIfActive();
            this.idleClass.removeSelfFromIdleControlerAndArray();
            this.idleClass.enableOrDisableIdle(false);
        };
        Prize_Core.prototype.prizePressed = function () {
            if (!this._rowPressed) {
                this._rowPressed = true;
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype.updateGameRow_Core = function (winIndex) {
            if (winIndex === void 0) { winIndex = null; }
            if (!this._rowInitialised) {
                IWG.Debug.instance.log("Initialising and begining animation on a match 3 row.", IWG.DEBUGTYPE.CORE);
                this._rowInitialised = true;
                var turn = IWG.GameManager.instance.getNextPrize();
                this.prizeAmountValue = turn.a.toString();
                this.prizeAmountValueFormatted = IWG.LanguageCurrencyManager.instance.formatCurrency(turn.a);
                this.prizeIndex = turn.i;
                if (turn.w === 0) {
                    this._isWinner = false;
                }
                else {
                    this._isWinner = true;
                }
                this.updateGameRow_Core();
            }
            else if (!this._rowHasRevealed) {
                this._rowHasRevealed = true;
                IWG.Debug.instance.log("Revealing this symbol ... ", IWG.DEBUGTYPE.CORE);
                this.revealPrize();
            }
            else if (!this._checkedForWin) {
                this._checkedForWin = true;
                IWG.Debug.instance.log("Checking for win and pushing for array..  ", IWG.DEBUGTYPE.CORE);
                if (this._isWinner) {
                    IWG.SignalManager.instance.dispatch('addWinningRevealedPrize', this);
                }
                else {
                    this._winRevealed = true;
                    this.updateGameRow_Core();
                }
            }
            else if (!this._winRevealed) {
                this._winRevealed = true;
                IWG.Debug.instance.log("Win revealed. ", IWG.DEBUGTYPE.CORE);
                this.winReveal(winIndex);
            }
            else if (!this._cycleFinished) {
                this._cycleFinished = true;
                IWG.Debug.instance.log("Cycle finished. This prize has finished all it needs to do! ", IWG.DEBUGTYPE.CORE);
                IWG.SignalManager.instance.dispatch('addFinishedRevealedPrize', this);
            }
        };
        ;
        Prize_Core.prototype._getSymbolFromTicket = function (partToGet) {
            switch (partToGet) {
                case 'prize': {
                    IWG.Debug.instance.log("Returned value from ticket. It was " + this._thisTurn.value, IWG.DEBUGTYPE.TICKET);
                    console.log("getting value from ticket " + this._thisTurn.value);
                    return this._thisTurn.value;
                }
                default: {
                    IWG.Debug.instance.error("This value doesnt exist on the rowcore ticket.", IWG.DEBUGTYPE.ERROR);
                    break;
                }
            }
        };
        Prize_Core.prototype.revealPrize = function () {
            var _this = this;
            this.revealSymbolsAnimation(function () {
                _this._checkAllRevealAnimations();
            }, this);
        };
        Prize_Core.prototype.winReveal = function (winIndex) {
            var _this = this;
            this.revealWinAnimation(function () {
                _this._checkAllWinnerAnimations();
            }, this);
        };
        Prize_Core.prototype._checkAllRevealAnimations = function () {
            this._numRevealedObjects++;
            IWG.Debug.instance.log("Reveal animations complete: " + this._numRevealedObjects + " / " + this._numberOfRevealingObjects, IWG.DEBUGTYPE.ANIMATION);
            if (this._numRevealedObjects === this._numberOfRevealingObjects) {
                IWG.Debug.instance.log("All reveal animations completed for the GameRow.", IWG.DEBUGTYPE.ANIMATION);
                this._numRevealedObjects = 0;
                this._numberOfRevealingObjects = 0;
                this._onAnimationComplete = function () { throw new Error("No on animation complete set! Did you forget to call a super? "); };
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype._checkAllCountingAnimations = function () {
            this._numRevealedObjects++;
            IWG.Debug.instance.log("Counting animations complete: " + this._numRevealedObjects + " / " + this._numberOfCountingObjects, IWG.DEBUGTYPE.ANIMATION);
            if (this._numRevealedObjects === this._numberOfCountingObjects) {
                IWG.Debug.instance.log("All counting animations completed for the GameRow.", IWG.DEBUGTYPE.ANIMATION);
                this._numRevealedObjects = 0;
                this._numberOfCountingObjects = 0;
                this._onAnimationComplete = function () { throw new Error("No on animation complete set! Did you forget to call a super? "); };
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype._checkAllWinnerAnimations = function () {
            this._numRevealedObjects++;
            IWG.Debug.instance.log("Win animations complete: " + this._numRevealedObjects + " / " + this._numberOfWinningObjects, IWG.DEBUGTYPE.ANIMATION);
            if (this._numRevealedObjects === this._numberOfWinningObjects) {
                IWG.Debug.instance.log("All win animations completed for the GameRow.", IWG.DEBUGTYPE.ANIMATION);
                this._numRevealedObjects = 0;
                this._numberOfWinningObjects = 0;
                this._onAnimationComplete = function () { throw new Error("No on animation set! Did you forget to call a super? "); };
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype.onAnimationComplete = function () {
            this._onAnimationComplete.bind(this._onAnimationCompleteScope)();
        };
        Prize_Core.prototype.isWinner = function () {
            if (this._thisTurn.w === 0) {
                return false;
            }
            else {
                return true;
            }
        };
        Prize_Core.prototype.getRevealed = function () {
            return this._rowHasRevealed;
        };
        return Prize_Core;
    }(IWG.ButtonClass));
    IWG.Prize_Core = Prize_Core;
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
            var smokeEmitter = group.game.add.emitter(objToAnimate.world.x, objToAnimate.world.y);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.GUNSHOT, IWG.SoundChannels.FX_SOUNDS);
            smokeEmitter.setXSpeed(-40, 40);
            smokeEmitter.setYSpeed(-20, 20);
            smokeEmitter.gravity = -400;
            smokeEmitter.setAlpha(0.5, 0, 2000, Phaser.Easing.Quadratic.In);
            smokeEmitter.setScale(0, 2, 0, 2);
            smokeEmitter.makeParticles('barrelExplosion', 'smoke.png', 10, false, false);
            smokeEmitter.start(true, 2000, null, 10);
            t.add(2000, function () {
                smokeEmitter.destroy(true);
            }, this);
            var fadeOutAnimation = IWG.GameManager.instance.add.tween(objToAnimate).to({ alpha: 0 }, 80, Phaser.Easing.Linear.None, true);
            fadeOutAnimation.onComplete.add(function () {
                group.add(objToFinish);
                objToFinish.scale = new PIXI.Point(0, 0);
                objToFinish.anchor.setTo(.5, .5);
                objToAnimate.destroy();
                var bounceInTween = IWG.GameManager.instance.add.tween(objToFinish.scale).to({ x: 1, y: 1 }, 1400, Phaser.Easing.Bounce.Out, true);
                bounceInTween.onComplete.add(function () {
                    _this._onCompleteFunc.bind(_this._onCompleteScope).apply(void 0, _this._onCompleteParams);
                }, _this);
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
})(IWG || (IWG = {}));
;
var IWG;
(function (IWG) {
    var Prize = (function (_super) {
        __extends(Prize, _super);
        function Prize(game, gamePanel) {
            _super.call(this, gamePanel, {
                buttonUpSpriteSheetName: 'mainGame',
                buttonUpStateImageName: "barrell",
                interactivityScaling: {
                    useInteractivityScaling: true,
                    disabledState: new Phaser.Point(1, 1),
                    mouseOver: new Phaser.Point(1.1, 1.1),
                    mouseDown: new Phaser.Point(0.9, 0.9)
                }
            });
            this._symbolwinAnimationFinished = 0;
            this._winValueTxt = null;
            this._goldHighlightText = null;
            this.myCountUpValue = null;
            this._idleWhenReady = false;
            this._idleTweensArray = [];
            this._game = game;
            this._goldHighlightText = this._game.add.bitmapText(-10, -50, 'font', "£1,000", 38);
            this._goldHighlightText.anchor.setTo(.5, .5);
            this._goldHighlightText.tint = 0xFF88FF;
            this._goldHighlightText.alpha = 0;
            this.grp_prizeGroup.add(this._goldHighlightText);
            this._winValueTxt = this._game.add.bitmapText(-10, -50, 'font', "£1,000", 38);
            this._winValueTxt.text = this.prizeAmountValueFormatted;
            this._winValueTxt.anchor.setTo(.5, .5);
            this.grp_prizeGroup.add(this._winValueTxt);
            this.alpha = 0;
            this.scale.setTo(0, 0);
            this.rotation = Math.PI * 0.25;
        }
        Prize.prototype.subscribeSignals = function () {
        };
        Prize.prototype.unsubscribeSignals = function () {
        };
        Prize.prototype.symbolFinishedWinAnimation = function () {
            this._symbolwinAnimationFinished++;
        };
        Prize.prototype.createAnimation = function () {
            var _this = this;
            this.disableButton();
            var alphaInTween = this._game.make.tween(this).to({ alpha: 1, rotation: 0 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            var scaleUpTween = this._game.make.tween(this.scale).to({ x: 1, y: 1 }, 1300, Phaser.Easing.Back.Out, true);
            scaleUpTween.onComplete.add(function () {
                _this.enableButton();
            });
        };
        Prize.prototype._createGlowFilter = function () {
            var fragmentSrc = [
                'precision lowp float;',
                'varying vec2 vTextureCoord;',
                'varying vec4 vColor;',
                'uniform sampler2D uSampler;',
                'void main() {',
                'vec4 sum = vec4(0);',
                'vec2 texcoord = vTextureCoord;',
                'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                'float factor = 0.0;',
                'if (dist == 0.0) {',
                'factor = 2.0;',
                '} else {',
                'factor = 2.0/abs(float(dist));',
                '}',
                'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
                '}',
                'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
                '}'
            ];
            return new Phaser.Filter(this._game, null, fragmentSrc);
        };
        Prize.prototype.revealSymbolsAnimation = function (onCompleteFunction, scope) {
            var _this = this;
            _super.prototype.revealSymbolsAnimation.call(this, onCompleteFunction, scope, true);
            this._winValueTxt.text = this.prizeAmountValueFormatted;
            this._goldHighlightText.text = this.prizeAmountValueFormatted;
            IWG.SignalManager.instance.dispatch('screenShakeSignal');
            IWG.SignalManager.instance.dispatch('barrellClicked', this);
            var revealFrames = [
                new IWG.Particle(['barrel_piece_1.png', 'barrel_piece_2.png', 'barrel_piece_3.png'], 3, { min: -300, max: 300 }, { min: 0, max: -700 }, -15, 0, 2000, 30, 30),
                new IWG.Particle(['barrel_piece_1.png',], 5, { min: -450, max: 450 }, { min: 0, max: -850 }),
                new IWG.Particle(['barrel_piece_2.png'], 1, { min: 0, max: 0 }, { min: 0, max: 0 }, 0, 0, 0, 10, 10, 2, 1, 1800, 1, 1800),
                new IWG.Particle(['barrel_piece_3.png'], 1, { min: -50, max: 100 }, { min: -400, max: -500 }, 30, -30, 2000, 0, 0, 1, 1, null, 1, null, 75)];
            IWG.Reveals.Pop_Reveal(this.buttonSprite, this._winValueTxt, this, 'barrelExplosion', revealFrames, function () {
                _this.onAnimationComplete();
            }, this);
        };
        Prize.prototype.revealWinAnimation = function (onCompleteFunction, scope) {
            var _this = this;
            _super.prototype.revealWinAnimation.call(this, onCompleteFunction, scope, true);
            this.grp_prizeGroup.add(this._winValueTxt);
            this.grp_prizeGroup.alpha = 1;
            this.grp_prizeGroup.visible = true;
            this._goldHighlightText.alpha = 1;
            var winTextMask = this._game.make.graphics(-this._winValueTxt.width, this._winValueTxt.y);
            this.grp_prizeGroup.add(winTextMask);
            winTextMask.beginFill(0x000000, 1);
            winTextMask.drawRect(-this._goldHighlightText.width / 2 + this._goldHighlightText.width, -this._goldHighlightText.height / 2 - 30, this._goldHighlightText.width, this._goldHighlightText.height + 30);
            var sparkleEmitter = this._game.make.emitter(-this._winValueTxt.width / 2, -15, 400);
            this.grp_prizeGroup.add(sparkleEmitter);
            sparkleEmitter.makeParticles('barrelExplosion', 'win_sparkle.png');
            sparkleEmitter.gravity = 400;
            sparkleEmitter.setXSpeed(-50, 50);
            sparkleEmitter.setYSpeed(-150, 150);
            sparkleEmitter.setScale(0.2, 0.6, 0.2, 0.6);
            sparkleEmitter.setAlpha(1, 0, 1200);
            sparkleEmitter.height = this._winValueTxt.height;
            sparkleEmitter.start(false, 10000, 0.1, 350);
            this._winValueTxt.mask = winTextMask;
            var maskOverTween = this._game.add.tween(winTextMask).to({ x: 0 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            var emitterOverTween = this._game.add.tween(sparkleEmitter).to({ x: this._winValueTxt.width / 2 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            emitterOverTween.onComplete.add(function () {
                sparkleEmitter.on = false;
                var pulseTween = _this._game.add.tween(_this._goldHighlightText.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                _this.onAnimationComplete();
            });
            var sparkleBG = this._game.make.sprite(-5, -55, 'mainGame', 'sparkle');
            sparkleBG.anchor.setTo(.5, .5);
            sparkleBG.alpha = 0;
            sparkleBG.scale.setTo(.5, .5);
            this.grp_prizeGroup.add(sparkleBG);
            this.grp_prizeGroup.sendToBack(sparkleBG);
            var constantRotation = this._game.make.tween(sparkleBG).to({ rotation: Math.PI * 2 }, 5000, Phaser.Easing.Linear.None, true, 0, -1);
            var scaleUpTween = this._game.make.tween(sparkleBG.scale).to({ x: 1.6, y: 1.6 }, 850, Phaser.Easing.Back.Out, true);
            var fadeInTween = this._game.make.tween(sparkleBG).to({ alpha: 1 }, 850, Phaser.Easing.Quadratic.InOut, true);
            fadeInTween.onComplete.add(function () {
            }, this);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.ROWWIN, IWG.SoundChannels.FX_SOUNDS);
        };
        return Prize;
    }(IWG.Prize_Core));
    IWG.Prize = Prize;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var MainGameGroup = (function (_super) {
        __extends(MainGameGroup, _super);
        function MainGameGroup() {
            _super.call(this);
            this._elFurrito = null;
            this._barrells = [];
            this._barrellsShadows = [];
            this._barrellsExplosion = [];
            this._clickCount = 0;
            this._key = null;
        }
        MainGameGroup.prototype._setupLayout = function () {
            var gamePanel = new IWG.PanelClass({});
            var barralPosArray = [
                [530, 550],
                [520, 360],
                [670, 370],
                [660, 480],
                [780, 560],
                [840, 340],
                [820, 450],
                [970, 390],
                [980, 530]
            ];
            this._barrells = [];
            this._clickCount = 0;
            for (var i = 0; i < barralPosArray.length; i++) {
                var pos = barralPosArray[i];
                var icon = new IWG.Prize(this.game, gamePanel);
                icon.getButtonSprite().anchor.setTo(0.5, 1.0);
                icon.position.setTo(pos[0], pos[1]);
                icon.alpha = 1;
                icon.scale.setTo(1, 0.0);
                icon.rotation = 0;
                var shadow = this.game.add.image(0, 0, 'mainGame', 'barrel_shadow');
                shadow.alpha = 0;
                shadow.anchor.setTo(0.5, 0.5);
                shadow.position.setTo(pos[0] - 3, pos[1] - 10);
                shadow.scale.setTo(1.1, 1.0);
                var explosion = this.game.add.image(0, 0, 'mainGame', 'explosion', this);
                explosion.alpha = 0;
                explosion.blendMode = 2;
                explosion.anchor.setTo(0.5, 0.5);
                explosion.scale.setTo(0.8, 0.8);
                explosion.position.setTo(pos[0], pos[1] - 230);
                this.add(icon);
                this._barrells.push(icon);
                this._barrellsShadows.push(shadow);
                this._barrellsExplosion.push(explosion);
            }
            gamePanel.idleController.setTimerValues(4000, 14000);
            gamePanel.idleController.enableOrDisableIdle(true);
            gamePanel.idleController.enableOrDisableIdleTimeOut(true);
            gamePanel.idleController.resetAndStartOrStopTimer(IWG.TimerInteractionStatus.startOrReset);
            gamePanel.idleController.replaceableIdleTimeOutEvent = function () { gamePanel.simulateClickAllButtons(); };
            this.add(gamePanel);
            this._elFurrito = this.game.add.sprite(0, 0, "cowboyIdle", 'cowboyIdle_1', this);
            this._furritoIdle(false);
            this._elFurrito.position.setTo(-300, 230);
            this._elFurrito.anchor.setTo(0.5, 0);
            this.alpha = 0;
        };
        MainGameGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('barrellClicked', this._barrellClicked, this);
            IWG.SignalManager.instance.add('showMainGame', this._show, this);
            IWG.SignalManager.instance.add('hideFurrito', this._hideElFurrito, this);
            IWG.SignalManager.instance.add('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.add('keyUnlock', this._keyAnimation, this);
            IWG.SignalManager.instance.add('endGameIntro', this._endGame, this);
        };
        ;
        MainGameGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('barrellClicked', this._barrellClicked, this);
            IWG.SignalManager.instance.remove('showMainGame', this._show, this);
            IWG.SignalManager.instance.remove('hideFurrito', this._hideElFurrito, this);
            IWG.SignalManager.instance.remove('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.remove('keyUnlock', this._keyAnimation, this);
            IWG.SignalManager.instance.remove('endGameIntro', this._endGame, this);
        };
        ;
        MainGameGroup.prototype._furritoIdle = function (load) {
            if (load === void 0) { load = true; }
            if (load) {
                this._elFurrito.loadTexture('cowboyIdle');
            }
            this._elFurrito.animations.add('idle', Phaser.Animation.generateFrameNames('cowboyIdle_', 0, 12, "", 0), 12, true);
            this._elFurrito.play('idle');
        };
        MainGameGroup.prototype._furritoFire = function () {
            var boom = IWG.GameManager.instance.rnd.integerInRange(0, 1) ? true : false;
            var texture = 'cowboyShotLeftAnimation';
            var animation = 'shootLeft';
            var prefix = 'cowboyShotLeft_';
            var upperFrame = 8;
            if (boom) {
                texture = 'cowboyShotRightAnimation';
                animation = 'shootRight';
                prefix = 'cowboyShotRight_';
                upperFrame = 6;
            }
            this._elFurrito.loadTexture(texture);
            this._elFurrito.animations.add(animation, Phaser.Animation.generateFrameNames(prefix, 1, upperFrame, "", 0), 12, false);
            this._elFurrito.animations.currentAnim.onComplete.add(function () {
                this._furritoIdle();
            }, this);
            this._elFurrito.play(animation);
        };
        MainGameGroup.prototype._barrellClicked = function (barrel) {
            this._clickCount++;
            this._furritoFire();
            if (this._clickCount === 1) {
                IWG.SignalManager.instance.dispatch('vulture', this);
            }
            if (this._clickCount === 3) {
                this._keyAnimation(barrel);
            }
            if (this._clickCount > 5) {
                IWG.SignalManager.instance.dispatch('endGameIntro', this);
                for (var i = 0; i < this._barrells.length; i++) {
                    var element = this._barrells[i];
                    element.buttonSprite.inputEnabled = false;
                }
            }
            for (var i = 0; i < this._barrells.length; i++) {
                if (this._barrells[i].getRevealed()) {
                    this._barrellsExplosion[i].alpha = 0.5;
                }
            }
        };
        MainGameGroup.prototype._keyAnimation = function (barrel) {
            this._key = this.game.add.sprite(barrel.position.x, barrel.position.y, "keyAnimation", 'key_1', this);
            this._key.scale.setTo(0.8, 0.8);
            this._key.anchor.setTo(0.5, 0.5);
            this._key.loadTexture('keyAnimation');
            var unlock = this._key.animations.add('key', Phaser.Animation.generateFrameNames('key_', 1, 19, "", 0), 12, false);
            unlock.play();
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.BONUSKEY, IWG.SoundChannels.FX_SOUNDS);
            this.game.add.tween(this._key).to({ x: 770, y: 240 }, 1000, Phaser.Easing.Linear.None, true);
            unlock.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('openJailDoor');
                this._key.alpha = 0;
            }, this);
        };
        MainGameGroup.prototype._show = function () {
            this.position.setTo(0);
            this.alpha = 1;
            this._showElFurrito();
            for (var i = 0; i < this._barrells.length; i++) {
                var grow = this.game.add.tween(this._barrells[i].scale).to({ y: 1 }, 500, Phaser.Easing.Bounce.Out, true, 1000);
            }
        };
        MainGameGroup.prototype._resetGame = function () {
            this._elFurrito.scale.setTo(-1, 1);
            var moveFurrito = this.game.add.tween(this._elFurrito).to({ x: this._elFurrito.position.x - 300 }, 300, Phaser.Easing.Quintic.In, true);
            for (var i = 0; i < this._barrells.length; i++) {
                if (this._barrells[i].getRevealed()) {
                    var alpha = this.game.add.tween(this._barrells[i]).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
                    var explosions = this.game.add.tween(this._barrellsExplosion[i]).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0);
                }
                else {
                    var disapear = this.game.add.tween(this._barrells[i].scale).to({ y: 0 }, 500, Phaser.Easing.Exponential.In, true, 0);
                    var shadows = this.game.add.tween(this._barrellsShadows[i]).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
                }
            }
        };
        MainGameGroup.prototype._endGame = function () {
            for (var i = 0; i < this._barrells.length; i++) {
                if (!this._barrells[i].getRevealed()) {
                    var shadows = this.game.add.tween(this._barrellsShadows[i]).to({ alpha: 1 }, 700, Phaser.Easing.Linear.None, true, 0);
                    var explosions = this.game.add.tween(this._barrellsShadows[i]).to({ alpha: 0.7 }, 700, Phaser.Easing.Linear.None, true, 0);
                    var tint = this.game.add.tween(this._barrells[i]).to({ tint: 0x4D4D4D }, 700, Phaser.Easing.Linear.None, true, 0);
                }
            }
        };
        MainGameGroup.prototype._hideElFurrito = function () {
            this._elFurrito.scale.setTo(-1, 1);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.SWOOSH, IWG.SoundChannels.FX_SOUNDS);
            var hide = this.game.add.tween(this._elFurrito).to({ x: this._elFurrito.position.x - 300 }, 1000, Phaser.Easing.Quintic.In, true);
            hide.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('showEndGame');
            }, this);
        };
        MainGameGroup.prototype._showElFurrito = function () {
            var moveFurrito = this.game.add.tween(this._elFurrito).to({ x: 150 }, 1000, Phaser.Easing.Quintic.In, true, 1000);
            moveFurrito.onStart.add(function () {
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.SWOOSH, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        };
        return MainGameGroup;
    }(IWG.GameGroup));
    IWG.MainGameGroup = MainGameGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SplashGroup = (function (_super) {
        __extends(SplashGroup, _super);
        function SplashGroup() {
            _super.call(this);
            this._gameName = null;
            this._winupto = null;
            this._bigCactus = null;
            this._skull = null;
            this._playButton = null;
            this._weed = null;
            this._weedTween = null;
            var spritesheet = 'startScreen';
            this._gameName = this.game.add.image(0, 0, spritesheet, 'cowboyCash', this);
            this._gameName.anchor.setTo(0.5, 0.5);
            this._gameName.position.setTo(this.game.width / 2, -150);
            this._winupto = this.game.add.image(0, 0, spritesheet, 'winupto', this);
            this._winupto.anchor.setTo(0.5, 0.5);
            this._winupto.position.setTo(this.game.width / 2, -150);
            this._weed = this.game.add.image(0, 0, 'mainGame', 'tumbleweed', this);
            this._weed.anchor.setTo(0.5, 0.5);
            this._weed.position.setTo(1300, 400);
            this._weed.alpha = 1;
            this._bigCactus = this.game.add.image(0, 0, spritesheet, 'cactus', this);
            this._bigCactus.anchor.setTo(0.5, 1.0);
            this._bigCactus.position.setTo(this.game.width / 2, 575);
            this._bigCactus.alpha = 0;
            this._playButton = this.game.add.image(0, 0, spritesheet, 'buttonBackground', this);
            this._playButton.anchor.setTo(0.5, 0.5);
            this._playButton.position.setTo(this.game.width / 2, 550);
            this._playButton.alpha = 0;
            this._skull = this.game.add.image(0, 0, spritesheet, 'skull', this);
            this._skull.anchor.setTo(0.5, 0.5);
            this._skull.position.setTo(700, 575);
            this._skull.alpha = 0;
            var playTextImage = this.game.add.image(0, 0, spritesheet, 'playText', this);
            playTextImage.anchor.setTo(0.5, 0.5);
            this._playButton.addChild(playTextImage);
            var idleAnimation = this.game.add.tween(this._playButton.scale).to({ x: 0.9, y: 0.9 }, 500, Phaser.Easing.Quadratic.Out, true, 100, -1);
            idleAnimation.yoyo(true, 3000);
            this._weedTween = this.game.add.tween(this._weed).to({ x: -50 }, 3500, Phaser.Easing.Linear.None, true, 5000, -1);
            this._weedTween.repeatDelay(this.game.rnd.integerInRange(10000, 20000));
            var weedRotation = this.game.add.tween(this._weed).to({ angle: -359 }, 500, Phaser.Easing.Linear.None, true, 100, -1);
            weedRotation.onComplete.add(function () {
                this._weed.angle = 0;
            }, this);
            var jumpTimer = this.game.time.create(false);
            jumpTimer.loop(2000, function () {
                var tween = this.game.add.tween(this._weed).to({ y: this._weed.y - 20 }, this.game.rnd.integerInRange(100, 200), Phaser.Easing.Bounce.In, true);
                tween.yoyo(true);
            }, this);
            jumpTimer.start();
            this._playButton.events.onInputUp.add(function () {
                this._playButton.inputEnabled = false;
                IWG.SignalManager.instance.dispatch('mainGameIntro');
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.PLAYBUTTON, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        }
        SplashGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('showSplashGroup', this._show, this);
            IWG.SignalManager.instance.add('mainGameIntro', this._hide, this);
        };
        SplashGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('showSplashGroup', this._show, this);
            IWG.SignalManager.instance.remove('mainGameIntro', this._hide, this);
        };
        SplashGroup.prototype._show = function () {
            this._bigCactus.alpha = 0;
            this._bigCactus.scale.y = 1.0;
            this._bigCactus.scale.x = 1.0;
            this._gameName.position.y = -150;
            this._winupto.position.y = -150;
            this._gameName.alpha = 1;
            this._winupto.alpha = 1;
            var nameTween = this.game.add.tween(this._gameName).to({ y: 185 }, 500, Phaser.Easing.Linear.None, true);
            var winUpTween = this.game.add.tween(this._winupto).to({ y: 215 }, 500, Phaser.Easing.Linear.None, true);
            var cactusTween = this.game.add.tween(this._bigCactus).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            var skullTween = this.game.add.tween(this._skull).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            playTween.onComplete.add(function () {
                this._playButton.inputEnabled = true;
            }, this);
            var weedTween = this.game.add.tween(this._weed).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.BACKGROUNDLOOP, IWG.SoundChannels.BACKGROUND);
            IWG.SignalManager.instance.dispatch('Audio.setChannelVolume', IWG.SoundChannels.BACKGROUND, 1, true, 500);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.MEGASWOOSH, IWG.SoundChannels.FX_SOUNDS);
        };
        SplashGroup.prototype._hide = function () {
            var nameTween = this.game.add.tween(this._gameName).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            var winUpTween = this.game.add.tween(this._winupto).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            var cactusTween = this.game.add.tween(this._bigCactus.scale).to({ y: 0, x: 0.5 }, 250, Phaser.Easing.Exponential.Out, true);
            var skullTween = this.game.add.tween(this._skull).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            var weedTween = this.game.add.tween(this._weed).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 500);
        };
        return SplashGroup;
    }(IWG.GameGroup));
    IWG.SplashGroup = SplashGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            this._mainGameGroup = null;
            this._backgroundGroup = null;
            this._endGroup = null;
            this._splashGroup = null;
        }
        MainGame.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('startGame', this._startGame, this);
            IWG.SignalManager.instance.add('restartGame', this._restart, this);
            IWG.SignalManager.instance.add('screenShakeSignal', this._shake, this);
        };
        MainGame.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('startGame', this._startGame, this);
            IWG.SignalManager.instance.remove('restartGame', this._restart, this);
            IWG.SignalManager.instance.remove('screenShakeSignal', this._shake, this);
        };
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            IWG.Debug.instance.log('[states/MainGame.ts] [create] MainGame created!', IWG.DEBUGTYPE.CORE);
            this.stage.disableVisibilityChange = true;
            this._backgroundGroup = new IWG.BackgroundGroup();
            this.add.existing(this._backgroundGroup);
            this._splashGroup = new IWG.SplashGroup();
            this.add.existing(this._splashGroup);
            this._endGroup = new IWG.EndGameGroup();
            this.add.existing(this._endGroup);
            this._endGroup.position.setTo(1300);
            this._mainGameGroup = new IWG.MainGameGroup();
            this.add.existing(this._mainGameGroup);
            IWG.SignalManager.instance.dispatch('initialIntro');
            IWG.SignalManager.instance.checkAllSignals();
        };
        MainGame.prototype._restart = function () {
            this._endGroup.position.set(1300, 0);
        };
        MainGame.prototype._startGame = function () {
            if (this._mainGameGroup === null) {
                this._mainGameGroup = new IWG.MainGameGroup();
                this.add.existing(this._mainGameGroup);
            }
            else {
                this._mainGameGroup.destroy();
                this._mainGameGroup = new IWG.MainGameGroup();
                this.add.existing(this._mainGameGroup);
            }
            this._mainGameGroup._setupLayout();
            IWG.SignalManager.instance.dispatch('showMainGame');
        };
        MainGame.prototype._shake = function (x, y, repeats) {
            if (x === void 0) { x = 5; }
            if (y === void 0) { y = 5; }
            if (repeats === void 0) { repeats = 2; }
            if (Math.random() > 0.5) {
                x = -x;
            }
            if (Math.random() > 0.5) {
                y = -y;
            }
            var shake1 = IWG.GameManager.instance.add.tween(this._mainGameGroup).to({
                x: x,
                y: y
            }, 50, Phaser.Easing.power2, true, 0, repeats, true);
            shake1.onStart.add(function () {
                var shake1 = IWG.GameManager.instance.add.tween(this._backgroundGroup).to({
                    x: x,
                    y: y
                }, 50, Phaser.Easing.power2, true, 0, repeats, true);
            }, this);
        };
        MainGame.SPRITESHEET_ID = "game0";
        return MainGame;
    }(IWG.GameState));
    IWG.MainGame = MainGame;
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
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager(loader) {
            _super.call(this, GameManager.NATIVE_WIDTH, GameManager.NATIVE_HEIGHT, Phaser.AUTO, 'gameArea', true, true);
            this._signalManager = null;
            this._audioManager = null;
            this._ticketManager = null;
            this._T40_TicketManager = null;
            this._languageCurrency = null;
            this._deviceManager = null;
            this._boot = null;
            this._preloader = null;
            this._maingame = null;
            this._prizeNum = null;
            this._arr_winningPrizes = [];
            this._arr_finishedPrizes = [];
            new IWG.Debug();
            IWG.Debug.ALL();
            if (GameManager.instance === null) {
                throw new Error("Tried to make a game manager when one already existed. To use GameManager, use GameManager.instance ");
            }
            else {
                GameManager.instance = this;
                IWG.Debug.instance.log("GameManager initialised!", IWG.DEBUGTYPE.INIT, this);
                this._signalManager = new IWG.SignalManager();
                this._audioManager = new IWG.AudioManager(this);
                this._ticketManager = new IWG.TicketManager();
                this._T40_TicketManager = new IWG.T40_Ticket_Manager();
                this._languageCurrency = new IWG.LanguageCurrencyManager();
                this._deviceManager = new IWG.DeviceManager();
                this._prizeNum = -1;
                if (this._T40_TicketManager.init(loader)) {
                    console.log("Ticket = " + loader);
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
                else {
                    throw new Error("Invalid ticket. Bye bye");
                }
            }
        }
        ;
        GameManager.prototype._subscribeSignals = function () {
            IWG.SignalManager.instance.add('states.SwitchState', this._switchState, this);
            IWG.SignalManager.instance.add('addWinningRevealedPrize', this._addWinningRevealedPrize, this);
            IWG.SignalManager.instance.add('addFinishedRevealedPrize', this._addFinishedPrize, this);
            IWG.SignalManager.instance.add('restartGame', this._restartGame, this);
        };
        ;
        GameManager.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('states.SwitchState', this._switchState, this);
            IWG.SignalManager.instance.remove('addWinningRevealedPrize', this._addWinningRevealedPrize, this);
            IWG.SignalManager.instance.remove('addFinishedRevealedPrize', this._addFinishedPrize, this);
            IWG.SignalManager.instance.remove('restartGame', this._restartGame, this);
        };
        GameManager.prototype._switchState = function (name) {
            this.state.start(name);
        };
        GameManager.prototype._restartGame = function () {
            this._prizeNum = -1;
            this._arr_winningPrizes = [];
        };
        GameManager.prototype._addWinningRevealedPrize = function (prize) {
            if (prize != null) {
                this._arr_winningPrizes.push(prize);
                console.log('array length: ', this._arr_winningPrizes.length);
                if (this._arr_winningPrizes.length === 3) {
                    var counter = 0;
                    this._arr_winningPrizes.forEach(function (prize) {
                        prize.updateGameRow_Core(counter);
                        counter++;
                    });
                }
            }
        };
        ;
        GameManager.prototype._addFinishedPrize = function (prize) {
            if (prize != null) {
                this._arr_finishedPrizes.push(prize);
                if (this._arr_finishedPrizes.length === 6) {
                    if (this._ticketManager.getIsWinner()) {
                        IWG.SignalManager.instance.dispatch('gameFinished', 'win');
                    }
                    else {
                        IWG.SignalManager.instance.dispatch('gameFinished', 'lose');
                    }
                }
            }
        };
        ;
        GameManager.prototype.getNextPrize = function () {
            this._prizeNum++;
            return { a: GameManager.instance.getTicketManager().getGameOneTurn(this._prizeNum).value, w: GameManager.instance.getTicketManager().getGameOneTurn(this._prizeNum).w, i: GameManager.instance.getTicketManager().getGameOneTurn(this._prizeNum).pIndex };
        };
        GameManager.prototype.getTicketManager = function () {
            return this._ticketManager;
        };
        GameManager.prototype.getAudioManager = function () {
            return this._audioManager;
        };
        GameManager.NATIVE_HEIGHT = 640;
        GameManager.NATIVE_WIDTH = 1136;
        return GameManager;
    }(Phaser.Game));
    IWG.GameManager = GameManager;
})(IWG || (IWG = {}));
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
    var BackgroundGroup = (function (_super) {
        __extends(BackgroundGroup, _super);
        function BackgroundGroup() {
            _super.call(this);
            this._preload = null;
            this._sky = null;
            this._redsky = null;
            this._mountains = null;
            this._ground = null;
            this._clouds = null;
            this._clouds2 = null;
            this._town = null;
            this._townLights = null;
            this._sun = null;
            this._rays = null;
            this._doorHole = null;
            this._door = null;
            this._vulture = null;
            this._cloudsTween = null;
            this._cloudsTween2 = null;
            this._cactus = null;
            this._cactusShadow = null;
            this._currentSkyAlpha = 0;
            this._preload = this.game.add.image(0, 0, 'loadingScreen', this);
            this._preload.sendToBack();
            this._createBackground();
        }
        BackgroundGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('initialIntro', this._initialAnimation, this);
            IWG.SignalManager.instance.add('mainGameIntro', this._mainGameIntro, this);
            IWG.SignalManager.instance.add('endGameIntro', this._endGameIntro, this);
            IWG.SignalManager.instance.add('openJailDoor', this._openJailDoor, this);
            IWG.SignalManager.instance.add('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.add('vulture', this._playVultureAnimation, this);
        };
        BackgroundGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('initialIntro', this._initialAnimation, this);
            IWG.SignalManager.instance.remove('mainGameIntro', this._mainGameIntro, this);
            IWG.SignalManager.instance.remove('endGameIntro', this._endGameIntro, this);
            IWG.SignalManager.instance.remove('openJailDoor', this._openJailDoor, this);
            IWG.SignalManager.instance.remove('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.remove('vulture', this._playVultureAnimation, this);
        };
        BackgroundGroup.prototype._createBackground = function () {
            var spritesheet = 'background';
            this._sky = this.game.add.image(0, 0, spritesheet, 'sky', this);
            this._sky.alpha = 0;
            this._rays = this.game.add.image(0, 0, 'background', 'rays', this);
            this._rays.anchor.setTo(0.5, 0.5);
            this._rays.position.setTo(this.game.width / 2, -400);
            this._rays.alpha = 0.3;
            this._sun = this.game.add.image(0, 0, 'startScreen', 'sun', this);
            this._sun.anchor.setTo(0.5, 0.5);
            this._sun.position.setTo(this.game.width / 2, -500);
            this._redsky = this.game.add.image(0, 0, spritesheet, 'endSky', this);
            this._redsky.scale.setTo(1, 1.1);
            this._redsky.alpha = 0;
            this._clouds = this.game.add.image(0, 0, spritesheet, 'clouds_1', this);
            this._clouds.anchor.setTo(0.5, 0.5);
            this._clouds.position.setTo(1300, 150);
            this._clouds2 = this.game.add.image(0, 0, spritesheet, 'clouds_2', this);
            this._clouds2.anchor.setTo(0.5, 0.5);
            this._clouds2.position.setTo(1300, 80);
            this._mountains = this.game.add.image(0, 0, spritesheet, 'mountains', this);
            this._mountains.position.setTo(0, 242);
            this._town = this.game.add.sprite(0, 0, spritesheet, 'town', this);
            this._town.anchor.setTo(0.5, 0.5);
            this._town.position.setTo(this.game.width / 2, 500);
            this._town.alpha = 0;
            this._doorHole = this.game.add.image(0, 0, 'mainGame', 'doorHole');
            this._doorHole.anchor.setTo(0.5, 0.5);
            this._doorHole.scale.setTo(0.7, 0.7);
            this._doorHole.position.setTo(203, 55);
            this._town.addChild(this._doorHole);
            this._door = this.game.add.sprite(0, 0, 'jailDoor', 'jailDoor_001');
            this._door.anchor.setTo(0.5, 0.5);
            this._door.scale.setTo(0.7, 0.7);
            this._door.position.setTo(210, 55);
            this._town.addChild(this._door);
            this._townLights = this.game.add.image(0, 0, spritesheet, 'townLights', this);
            this._townLights.anchor.setTo(0.5, 0.5);
            this._townLights.position.setTo(this.game.width / 2 - 134, 190);
            this._townLights.alpha = 0;
            this._ground = this.game.add.image(0, 0, spritesheet, 'ground', this);
            this._ground.anchor.setTo(0.5, 0);
            this._ground.position.setTo(this.game.width / 2, 900);
            this._cactus = this.game.add.image(0, 0, "mainGame", 'cactus', this);
            this._cactus.position.setTo(100, 330);
            this._cactus.anchor.setTo(0.5, 1.0);
            this._cactus.scale.setTo(0.0, 0.0);
            this._cactusShadow = this.game.add.image(0, 0, spritesheet, 'cactusShadow', this);
            this._cactusShadow.anchor.setTo(0.5, 0);
            this._cactusShadow.scale.setTo(1.2, 1.2);
            this._cactusShadow.position.setTo(this._cactusShadow.width / 2 - 17, 300);
            this._cactusShadow.alpha = 0;
            this._cloudsTween = this.game.add.tween(this._clouds).to({ x: -200 }, 30000, Phaser.Easing.Linear.None, true, 3000, -1);
            this._cloudsTween.repeatDelay(this.game.rnd.integerInRange(5000, 15000));
            this._cloudsTween.onLoop.add(function () {
                this._clouds.position.setTo(1300, this.game.rnd.integerInRange(10, 150));
            }, this);
            this._cloudsTween2 = this.game.add.tween(this._clouds2).to({ x: -200 }, 37000, Phaser.Easing.Linear.None, true, 12000, -1);
            this._cloudsTween2.repeatDelay(this.game.rnd.integerInRange(2000, 25000));
            this._cloudsTween2.onLoop.add(function () {
                this._clouds2.position.setTo(1300, this.game.rnd.integerInRange(5, 190));
            }, this);
            this._vulture = this.game.add.sprite(0, 0, 'vultureAnimation', 'vulture_1');
            this._vulture.anchor.setTo(0.5, 0.5);
            this._vulture.position.setTo(-100, 150);
            this._town.addChild(this._vulture);
        };
        BackgroundGroup.prototype._initialAnimation = function () {
            var groundTween = this.game.add.tween(this._ground).to({ y: 350 }, 500, Phaser.Easing.Quintic.Out, true, 0);
            groundTween.onComplete.add(function () {
                var mountainsTween = this.game.add.tween(this._mountains).to({ y: 180 }, 500, Phaser.Easing.Exponential.Out, true, 0);
                mountainsTween.onComplete.add(function () {
                    var raysTween = this.game.add.tween(this._rays).to({ y: 300 }, 500, Phaser.Easing.Exponential.Out, true, 250);
                    var sunTween = this.game.add.tween(this._sun).to({ y: 220 }, 500, Phaser.Easing.Exponential.Out, true, 250);
                    var skyTween = this.game.add.tween(this._sky).to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None, true, 0);
                    sunTween.onComplete.add(function () {
                        IWG.SignalManager.instance.dispatch('showSplashGroup');
                        this._preload.destroy();
                    }, this);
                }, this);
            }, this);
        };
        BackgroundGroup.prototype._mainGameIntro = function () {
            this._town.alpha = 1;
            this._vulture.alpha = 1;
            var moveGround = this.game.add.tween(this._ground).to({ y: 262 }, 500, Phaser.Easing.Linear.None);
            var moveMountains = this.game.add.tween(this._mountains).to({ y: 500 }, 1200, Phaser.Easing.Linear.None);
            var raysTween = this.game.add.tween(this._rays).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0);
            var sunTween = this.game.add.tween(this._sun).to({ y: 700 }, 1000, Phaser.Easing.Exponential.In, true, 800);
            sunTween.onComplete.add(function () {
                var moveTown = this.game.add.tween(this._town).to({ y: 185 }, 1000, Phaser.Easing.Exponential.Out, true, 0);
                this.game.add.tween(this._cactus.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Exponential.Out, true, 1000);
                IWG.SignalManager.instance.dispatch('startGame');
            }, this);
            moveGround.start();
            moveMountains.start();
        };
        BackgroundGroup.prototype._endGameIntro = function () {
            var redSky = this.game.add.tween(this._redsky).to({ alpha: 1 }, 700, 'Linear', true, 0);
            var lights = this.game.add.tween(this._townLights).to({ alpha: 1 }, 700, Phaser.Easing.Elastic.InOut, true, 0);
            var ground = this.game.add.tween(this._ground).to({ tint: 0xABABAB }, 700, Phaser.Easing.Linear.None, true);
            var ground = this.game.add.tween(this._town).to({ tint: 0xABABAB }, 700, Phaser.Easing.Linear.None, true);
            var cactus = this.game.add.tween(this._cactusShadow).to({ alpha: 1 }, 700, Phaser.Easing.Linear.None, true);
            redSky.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('hideFurrito', this);
            }, this);
        };
        BackgroundGroup.prototype._openJailDoor = function () {
            this._door.loadTexture('jailDoor');
            this._door.animations.add('open', Phaser.Animation.generateFrameNames('jailDoor_00', 1, 4, "", 0), 12, false);
            this._door.play('open');
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.JAILDOOR, IWG.SoundChannels.FX_SOUNDS);
            this._door.animations.currentAnim.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('showMultiplier');
            }, this);
        };
        BackgroundGroup.prototype._playVultureAnimation = function () {
            this._vulture.loadTexture('vultureAnimation');
            this._vulture.animations.add('fly', Phaser.Animation.generateFrameNames('vulture_', 1, 17, "", 0), 12, false);
            this._vulture.play('fly');
            var vultureUp = this.game.add.tween(this._vulture).to({ y: this._vulture.position.y - 100 }, 1500, 'Linear', true);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.EAGLEFLY, IWG.SoundChannels.FX_SOUNDS);
            vultureUp.onComplete.add(function () {
                this._vulture.alpha = 0;
                this._vulture.loadTexture('vultureAnimation');
                this._vulture.animations.add('fly', Phaser.Animation.generateFrameNames('vulture_', 17, 1, "", 0), 12, false);
                this._vulture.play('fly');
                this._vulture.position.setTo(-100, 150);
            }, this);
        };
        BackgroundGroup.prototype._resetGame = function () {
            var lights = this.game.add.tween(this._townLights).to({ alpha: 0 }, 300, 'Linear', true, 750);
            var redSky = this.game.add.tween(this._redsky).to({ alpha: 0 }, 700, 'Linear', true, 750);
            var ground = this.game.add.tween(this._ground).to({ tint: 0xFFFFFF }, 700, Phaser.Easing.Linear.None, true);
            var ground = this.game.add.tween(this._town).to({ tint: 0xFFFFFF }, 700, Phaser.Easing.Linear.None, true);
            var cactus = this.game.add.tween(this._cactusShadow).to({ alpha: 0 }, 700, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this._cactus.scale).to({ y: 0, x: 0 }, 500, Phaser.Easing.Exponential.Out, true, 0);
            var moveTown = this.game.add.tween(this._town).to({ y: 500 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            var moveMountains = this.game.add.tween(this._mountains).to({ y: 242 }, 1200, Phaser.Easing.Linear.None, true, 1450);
            var moveGround = this.game.add.tween(this._ground).to({ y: 350 }, 1200, Phaser.Easing.Linear.None, true, 1450);
            var sunTween = this.game.add.tween(this._sun).to({ y: 220 }, 500, Phaser.Easing.Linear.None, true, 1900);
            var raysMoveTween = this.game.add.tween(this._rays).to({ y: 300 }, 500, Phaser.Easing.Linear.None, true, 1900);
            var raysAlphaTween = this.game.add.tween(this._rays).to({ alpha: 0.3 }, 300, Phaser.Easing.Linear.None, true, 2200);
            raysAlphaTween.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('showSplashGroup');
            }, this);
            this._door.loadTexture('jailDoor');
            this._door.animations.add('open', Phaser.Animation.generateFrameNames('jailDoor_00', 4, 1, "", 0), 12, false);
            this._door.play('open');
        };
        return BackgroundGroup;
    }(IWG.GameGroup));
    IWG.BackgroundGroup = BackgroundGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var EndGameGroup = (function (_super) {
        __extends(EndGameGroup, _super);
        function EndGameGroup() {
            _super.call(this);
            this._poster = null;
            this._firstText = null;
            this._secondText = null;
            this._amount = null;
            this._finishButton = null;
            this._spritesheet = 'endGame';
            this._multiplier = null;
            this._multi = "x" + this.game.rnd.integerInRange(1, 5).toString();
            this.alpha = 0;
            this._createPoster();
        }
        EndGameGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('showEndGame', this._show, this);
            IWG.SignalManager.instance.add('restartGame', this._hide, this);
            IWG.SignalManager.instance.add('showMultiplier', this._showMultiplier, this);
        };
        EndGameGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('showEndGame', this._show, this);
            IWG.SignalManager.instance.remove('restartGame', this._hide, this);
            IWG.SignalManager.instance.remove('showMultiplier', this._showMultiplier, this);
        };
        EndGameGroup.prototype._createPoster = function () {
            this._poster = this.game.add.sprite(0, 0, this._spritesheet, 'endPoster');
            this._poster.position.setTo(this._poster.width / 2, this._poster.height / 2);
            this._poster.anchor.setTo(0.5, 0.5);
            this._poster.scale.setTo(0.0, 0.0);
            if (IWG.GameManager.instance.getTicketManager().getIsWinner()) {
                this._createWin();
            }
            else {
                this._createLose();
            }
            this._createFinishButton();
        };
        EndGameGroup.prototype._createFinishButton = function () {
            this._multiplier = this.game.add.bitmapText(0, 0, 'font', this._multi, 38);
            this._multiplier.anchor.setTo(0.5, 0.5);
            this._multiplier.position.setTo(768, 247);
            this._multiplier.alpha = 0;
            this._finishButton = this.game.add.sprite(0, 0, this._spritesheet, 'endButton');
            this._finishButton.anchor.setTo(0.5, 0.5);
            this._finishButton.position.setTo(20, 200);
            this._finishButton.scale.setTo(1.0, 1.0);
            var finishTextImage = this.game.add.sprite(0, 0, this._spritesheet, 'finishText');
            finishTextImage.anchor.setTo(0.5, 0.5);
            this._finishButton.addChild(finishTextImage);
            this._poster.addChild(this._finishButton);
            var idleAnimation = this.game.add.tween(this._finishButton.scale).to({ x: 0.9, y: 0.9 }, 500, Phaser.Easing.Quadratic.Out, true, 100, -1);
            idleAnimation.yoyo(true, 3000);
            this._finishButton.inputEnabled = true;
            this._finishButton.events.onInputUp.add(function () {
                this._finishButton.inputEnabled = false;
                IWG.SignalManager.instance.dispatch('restartGame', this);
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.PLAYBUTTON, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        };
        EndGameGroup.prototype._createWin = function () {
            this._firstText = this.game.add.image(0, 0, this._spritesheet, 'congratulations');
            this._firstText.anchor.setTo(0.5, 0.5);
            this._firstText.position.setTo(-30, -220);
            this._poster.addChild(this._firstText);
            this._secondText = this.game.add.image(0, 0, this._spritesheet, 'youhavewon');
            this._secondText.anchor.setTo(0.5, 0.5);
            this._secondText.position.setTo(-10, 50);
            this._poster.addChild(this._secondText);
            this._amount = this.game.add.bitmapText(0, 0, 'font_big', '', 60);
            this._amount.anchor.setTo(0.5, 0.5);
            this._amount.angle = -5;
            this._amount.position.setTo(-5, 110);
            this._poster.addChild(this._amount);
        };
        EndGameGroup.prototype._createLose = function () {
            this._firstText = this.game.add.image(0, 0, this._spritesheet, 'wanted');
            this._firstText.anchor.setTo(0.5, 0.5);
            this._firstText.position.setTo(-30, -220);
            this._poster.addChild(this._firstText);
            this._secondText = this.game.add.image(0, 0, this._spritesheet, 'youhavewon');
            this._secondText.anchor.setTo(0.5, 0.5);
            this._secondText.position.setTo(-10, 50);
            this._poster.addChild(this._secondText);
        };
        EndGameGroup.prototype._show = function () {
            var amount = IWG.GameManager.instance.getTicketManager().getTotalAmount();
            this._amount.setText("");
            this.alpha = 1;
            IWG.SignalManager.instance.dispatch('Audio.setChannelVolume', IWG.SoundChannels.BACKGROUND, 0, true, 500);
            if (amount > 0) {
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.ENDWIN, IWG.SoundChannels.FX_SOUNDS);
            }
            else {
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS);
            }
            var scaleTween = this.game.add.tween(this._poster.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Quintic.Out, true, 1000);
            scaleTween.onComplete.add(function () {
                this.createCounter(this._amount, 0, IWG.GameManager.instance.getTicketManager().getTotalAmount() * Number(this._multi.slice(1, 2)), 210, null, null, null, null, true);
                this.game.add.tween(this._finishButton.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Quintic.Out, true);
                this._finishButton.inputEnabled = true;
            }, this);
        };
        EndGameGroup.prototype._hide = function () {
            var scaleTween = this.game.add.tween(this._poster).to({ y: this._poster.position.y + 700 }, 1000, Phaser.Easing.Quintic.In, true);
            scaleTween.onComplete.add(function () {
                this._poster.position.setTo(this._poster.width / 2, this._poster.height / 2);
                this._poster.scale.setTo(0.0, 0.0);
            }, this);
            scaleTween.start();
            var fade = this.game.add.tween(this._multiplier).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        };
        EndGameGroup.prototype.createCounter = function (textField, currentValue, targetValue, speed, onStart, onUpdate, onComplete, onCompleteScope, isAnimated) {
            var counter = currentValue;
            var winAmount = targetValue - currentValue;
            var speedVariation = winAmount / speed;
            var tween;
            if (isAnimated) {
                tween = this.game.add.tween(textField.scale).to({
                    x: 1.1,
                    y: 1.1
                }, 500, Phaser.Easing.Linear.None, false, 0, -1);
                tween.yoyo(true, 0);
                tween.start();
            }
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
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.COUNT, IWG.SoundChannels.FX_SOUNDS);
                if (counter > targetValue) {
                    textField.text = IWG.LanguageCurrencyManager.instance.formatCurrency(targetValue);
                    if (oC !== null) {
                        oC.bind(oCS)();
                    }
                    this.game.time.events.remove(timer);
                    if (isAnimated) {
                        tween.stop();
                        IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.KERCHING, IWG.SoundChannels.FX_SOUNDS);
                    }
                }
            }, this, onUpdate, onComplete, onCompleteScope);
        };
        EndGameGroup.prototype._showMultiplier = function () {
            var fade = this.game.add.tween(this._multiplier).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
        };
        return EndGameGroup;
    }(IWG.GameGroup));
    IWG.EndGameGroup = EndGameGroup;
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
            var pl = gameResultFromAPI.ticket.params['@attributes'].pList;
            this.prizeAmounts = pl.split(',');
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
                    value: +this.prizeAmounts[parseInt(gameResultFromAPI.ticket.g1.go[i]['@attributes']['p'])],
                    pIndex: parseInt(gameResultFromAPI.ticket.g1.go[i]['@attributes']['p'])
                });
                this._game1Information.push(gameRow);
            }
            this._games = ({
                g1: this._game1Information
            });
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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
            this.grp_loadingAssets = null;
            this.img_loaderBG = null;
            this.spr_loadingGameLogo = null;
            this.spr_loadingBar = null;
            this._currentFeature = -1;
            this._horse = null;
            this._bar = null;
        }
        Preloader.prototype.setupLoadingScene = function () {
            var loadingScreen = this.game.add.image(0, 0, 'loadingScreen');
            loadingScreen.alpha = 0;
            this._horse = this.game.add.image(0, 0, 'horse');
            this._horse.anchor.setTo(0.5, 0.5);
            this._horse.position.setTo(-this._horse.width, 382);
            this._horse.scale.setTo(0.7, 0.7);
            this._horse.angle = -10;
            this._bar = this.game.add.graphics(0, 0);
            this._bar.position.setTo(410, 520);
            this._bar.beginFill(0xff3300);
            this._bar.drawRect(0, 0, 400, 33);
            this._bar.scale.set(0, 1);
            this._bar.alpha = 0;
            var box = this.game.add.image(0, 0, 'box');
            box.alpha = 0;
            box.anchor.setTo(0.5, 0.5);
            box.position.setTo(this.game.width / 2, 540);
            var alphaTween = this.game.add.tween(loadingScreen).to({ alpha: 1.0 }, 250, Phaser.Easing.Linear.None, true);
            alphaTween.onComplete.add(function () {
                this.game.add.tween(box).to({ alpha: 1.0 }, 250, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this._bar).to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None, true);
            }, this);
            var horseTween = this.game.add.tween(this._horse).to({ angle: 10 }, 500, Phaser.Easing.Linear.None, false, 0, -1, true);
            horseTween.start();
        };
        Preloader.prototype.addAssetsToLoad = function () {
            var path = "";
            if (path === 'https://sta-williamhill.static.virtuefusion.com/assets/files/com.sideplay/sherluck-holmes/current/zip/') {
                console.log('Path override');
                path = 'dist/';
            }
            this.load.atlasJSONArray('cowboyIdle', path + './assets/spritesheets/cowboyIdleAnimation.png', path + './assets/spritesheets/cowboyIdleAnimation.json');
            this.load.atlasJSONArray('background', path + './assets/spritesheets/background.png', path + './assets/spritesheets/background.json');
            this.load.atlasJSONArray('endGame', path + './assets/spritesheets/endGame.png', path + './assets/spritesheets/endGame.json');
            this.load.atlasJSONArray('mainGame', path + './assets/spritesheets/mainGame.png', path + './assets/spritesheets/mainGame.json');
            this.load.atlasJSONArray('barrelExplosion', path + './assets/spritesheets/barrelExplosion.png', path + './assets/spritesheets/barrelExplosion.json');
            this.load.atlasJSONArray('cowboyShotLeftAnimation', path + './assets/spritesheets/cowboyShotLeftAnimation.png', path + './assets/spritesheets/cowboyShotLeftAnimation.json');
            this.load.atlasJSONArray('cowboyShotRightAnimation', path + './assets/spritesheets/cowboyShotRightAnimation.png', path + './assets/spritesheets/cowboyShotRightAnimation.json');
            this.load.atlasJSONArray('jailDoor', path + './assets/spritesheets/jailDoor.png', path + './assets/spritesheets/jailDoor.json');
            this.load.atlasJSONArray('keyAnimation', path + './assets/spritesheets/keyAnimation.png', path + './assets/spritesheets/keyAnimation.json');
            this.load.atlasJSONArray('overlay', path + './assets/spritesheets/overlay.png', path + './assets/spritesheets/overlay.json');
            this.load.atlasJSONArray('vultureAnimation', path + './assets/spritesheets/vultureAnimation.png', path + './assets/spritesheets/vultureAnimation.json');
            this.load.atlasJSONArray('startScreen', path + './assets/spritesheets/startScreen.png', path + './assets/spritesheets/startScreen.json');
            this.load.bitmapFont('font', path + './assets/fonts/font.png', path + './assets/fonts/font.fnt');
            this.load.bitmapFont('font_big', path + './assets/fonts/font_big.png', path + './assets/fonts/font_big.fnt');
            this.load.audio('backgroundLoop', ['./assets/audio/background/background.mp3', './assets/audio/background/background.mp3']);
            this.load.audio('click', ['./assets/audio/click/click.mp3', './assets/audio/click/click.mp3']);
            this.load.audio('rollover', ['./assets/audio/rollover/rollover.mp3', './assets/audio/rollover/rollover.mp3']);
            this.load.audio('playButton', ['./assets/audio/play_button/playButton.mp3', './assets/audio/play_button/playButton.mp3']);
            this.load.audio('gunShot', ['./assets/audio/barrel_shoot/gunShot.mp3', './assets/audio/barrel_shoot/gunShot.mp3']);
            this.load.audio('prizeReveal', ['./assets/audio/prize_reveal/prizeReveal.mp3', './assets/audio/prize_reveal/prizeReveal.mp3']);
            this.load.audio('bonusKey', ['./assets/audio/bonus_key/bonusKey.mp3', './assets/audio/bonus_key/bonusKey.mp3']);
            this.load.audio('eagleFly', ['./assets/audio/eagle_fly/eagleFly.mp3', './assets/audio/eagle_fly/eagleFly.mp3']);
            this.load.audio('endWin', ['./assets/audio/end_win/endWin.mp3', './assets/audio/end_win/endWin.mp3']);
            this.load.audio('endLose', ['./assets/audio/end_Lose/endLose.mp3', './assets/audio/end_Lose/endLose.mp3']);
            this.load.audio('multiplierWin', ['./assets/audio/multiplier_win/multiplierWin.mp3', './assets/audio/multiplier_win/multiplierWin.mp3']);
            this.load.audio('jailDoor', ['./assets/audio/jail_door/jailDoor.mp3', './assets/audio/jail_door/jailDoor.mp3']);
            this.load.audio('rowWin', ['./assets/audio/row_win/rowWin.mp3', './assets/audio/row_win/rowWin.mp3']);
            this.load.audio('swoosh', ['./assets/audio/swoosh/bet_slide.mp3', './assets/audio/swoosh/bet_slide.mp3']);
            this.load.audio('mega_swoosh', ['./assets/audio/swoosh/mega_swoosh.mp3', './assets/audio/swoosh/mega_swoosh.mp3']);
            this.load.audio('count', ['./assets/audio/count_up/tick.mp3', './assets/audio/count_up/tick.mp3']);
            this.load.audio('kerching', ['./assets/audio/kerching/kerching.mp3', './assets/audio/kerching/kerching.mp3']);
        };
        Preloader.prototype._loadSoundsToAudioManager = function () {
            IWG.GameManager.instance.getAudioManager().addSoundChannel(IWG.SoundChannels.BACKGROUND, 1);
            IWG.GameManager.instance.getAudioManager().addSoundChannel(IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BACKGROUNDLOOP, IWG.SoundChannels.BACKGROUND, 1, true, 1, false);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.CLICK, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ROLLOVER, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.PLAYBUTTON, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.GUNSHOT, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.PRIZEREVEAL, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BONUSKEY, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.EAGLEFLY, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ENDWIN, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MULTIPLER, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.JAILDOOR, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ROWWIN, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.SWOOSH, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MEGASWOOSH, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.COUNT, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.KERCHING, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
        };
        Preloader.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this._horse.position.setTo(-this._horse.width + (progress * 1250 / 100), this._horse.position.y);
            this._bar.scale.set(progress / 100, 1);
        };
        Preloader.prototype.onLoad = function () {
            this._loadSoundsToAudioManager();
            IWG.SignalManager.instance.dispatch('states.SwitchState', 'MainGame');
        };
        return Preloader;
    }(IWG.Preloader_Core));
    IWG.Preloader = Preloader;
})(IWG || (IWG = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdEdhbWVOQy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL1NSQy9qcy9jb3JlL2NsYXNzZXMvR2FtZVNpZ25hbC50cyIsIi4uL1NSQy9qcy9jb3JlL21hbmFnZXJzL1NpZ25hbE1hbmFnZXIudHMiLCIuLi9TUkMvanMvbWFuYWdlcnMvVGlja2V0TWFuYWdlci50cyIsIi4uL1NSQy9qcy9zdGF0ZXMvQm9vdC50cyIsIi4uL1NSQy9qcy9jb3JlL21hbmFnZXJzL0F1ZGlvTWFuYWdlci50cyIsIi4uL1NSQy9qcy9jb3JlL2NsYXNzZXMvU2lnbmFsU3Vic2NyaXB0aW9uQ2xhc3Nlcy50cyIsIi4uL1NSQy9qcy9jb3JlL2NsYXNzZXMvSWRsZUNsYXNzLnRzIiwiLi4vU1JDL2pzL2NvcmUvY2xhc3Nlcy9CdXR0b25DbGFzcy50cyIsIi4uL1NSQy9qcy9jb3JlL2NsYXNzZXMvSWRsZUNvbnRyb2xsZXIudHMiLCIuLi9TUkMvanMvY29yZS9jbGFzc2VzL1BhbmVsQ2xhc3MudHMiLCIuLi9TUkMvanMvY29yZS9jbGFzc2VzL0dhbWVGb250cy50cyIsIi4uL1NSQy9qcy9jb3JlL21hbmFnZXJzL0xhbmd1YWdlQ3VycmVuY3lNYW5hZ2VyLnRzIiwiLi4vU1JDL2pzL2NvcmUvUHJpemVfQ29yZS50cyIsIi4uL1NSQy9qcy9jb3JlL2NsYXNzZXMvUmV2ZWFscy50cyIsIi4uL1NSQy9qcy9vYmplY3RzL1ByaXplLnRzIiwiLi4vU1JDL2pzL2dyb3Vwcy9NYWluR2FtZUdyb3VwLnRzIiwiLi4vU1JDL2pzL2dyb3Vwcy9TcGxhc2hHcm91cC50cyIsIi4uL1NSQy9qcy9zdGF0ZXMvTWFpbkdhbWUudHMiLCIuLi9TUkMvanMvY29yZS9tYW5hZ2Vycy9EZWJ1Z01hbmFnZXIudHMiLCIuLi9TUkMvanMvY29yZS9tYW5hZ2Vycy9HYW1lTWFuYWdlci50cyIsIi4uL1NSQy9qcy9jb3JlL1ByZWxvYWRlcl9Db3JlLnRzIiwiLi4vU1JDL2pzL2NvcmUvbWFuYWdlcnMvRGV2aWNlTWFuYWdlci50cyIsIi4uL1NSQy9qcy9ncm91cHMvQmFja2dyb3VuZEdyb3VwLnRzIiwiLi4vU1JDL2pzL2dyb3Vwcy9FbmRHYW1lR3JvdXAudHMiLCIuLi9TUkMvanMvbWFuYWdlcnMvVDQwX1RpY2tldF9NYW5hZ2VyLnRzIiwiLi4vU1JDL2pzL29iamVjdHMvQmFycmVsLnRzIiwiLi4vU1JDL2pzL3N0YXRlcy9QcmVsb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxJQUFPLEdBQUcsQ0FrRVQ7QUFsRUQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSO1FBQWdDLDhCQUFhO1FBTXpDLG9CQUFtQixVQUFrQjtZQUNqQyxpQkFBTyxDQUFDO1lBTkosY0FBUyxHQUFxQixJQUFJLENBQUM7WUFDbkMsa0JBQWEsR0FBaUIsS0FBSyxDQUFDO1lBQ3BDLGlCQUFZLEdBQWtCLEtBQUssQ0FBQztZQUNwQyxlQUFVLEdBQW9CLEVBQUUsQ0FBQztZQUlyQyxJQUFJLENBQUMsU0FBUyxHQUFRLFVBQVUsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFJLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFLLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDOztRQUdNLHdCQUFHLEdBQVYsVUFBVyxRQUFrQixFQUFFLGdCQUE0QixFQUFFLFFBQW9CO1lBQWxELGdDQUE0QixHQUE1Qix1QkFBNEI7WUFBRSx3QkFBb0IsR0FBcEIsWUFBb0I7WUFBRSxjQUFjO2lCQUFkLFdBQWMsQ0FBZCxzQkFBYyxDQUFkLElBQWM7Z0JBQWQsNkJBQWM7O1lBQzdGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLGdCQUFLLENBQUMsR0FBRyxjQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLFNBQUss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S0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV0SSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQSxDQUFDO29CQUNoQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0csSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMs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QUksQ0FBQztZQUNyQyxlQUFVLEdBQXNCLElBQUksQ0FBQztZQWtCekMsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBRWhDLElBQUksQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsUUFBUSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFckIsSUFBSSxDQUFDLFVBQVUsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsTUFBTSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxN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QUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLFNBQVMsR0FBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUN4SCxJQUFJLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUN2SCxJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEksSUFBSSxVQUFVLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNILElBQUksU0FBUyxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUUsQ0FBQztZQUNoSSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULElBQUksU0FBUyxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUUsQ0FBQztZQUUxSCxpQkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsVUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BHLGlCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xHLGlCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUMsVUFBVSxFQUFFLGlCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkcsQ0FBQztRQUVPLDJCQUFLLEdBQWI7WUFDSSxJQUFJLFNBQVMsR0FBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUMxSCxJQUFJLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUN6SCxJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4SSxJQUFJLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0SCxJQUFJLFNBQVMsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxD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TUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsUUFBUSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFD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QUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUM3RyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUN6SCxJQUFJLFVBQVUsR0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztZQUN6SCxJQUFJLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkgsSUFBSSxhQUFhLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pILElBQUksY0FBYyxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqSSxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsaUJBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVMLHNCQUFDO0lBQUQsQ0FBQyxBQXBSRCxDQUFxQyxhQUFTLEdBb1I3QztJQXBSWSxtQkFBZSxrQkFvUjNCLENBQUE7QUFDTCxDQUFDLEVBdFJNLEdBQUcsS0FBSCxHQUFHLFFBc1JUO0FDdFJELElBQU8sR0FBRyxDQXdNVDtBQXhNRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBQ1I7UUFBa0MsZ0NBQVM7UUFjdkM7WUFFSSxpQkFBTyxDQUFDO1lBZEosWUFBTyxHQUF1RCxJQUFJLENBQUM7WUFDbkUsZUFBVSxHQUFvRCxJQUFJLENBQUM7WUFDbkUsZ0JBQVcsR0FBbUQsSUFBSSxDQUFDO1lBQ25FLFlBQU8sR0FBdUQsSUFBSSxDQUFDO1lBQ25FLGtCQUFhLEdBQWlELElBQUksQ0FBQztZQUNuRSxpQkFBWSxHQUFrRCxTQUFTLENBQUM7WUFDeEUsZ0JBQVcsR0FBeUIsSUFBSSxDQUFDO1lBQ3pDLFdBQU0sR0FBMEIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFRdkYsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVNLHVDQUFnQixHQUF2QjtZQUNJLGlCQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1RCxpQkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUQsaUJBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVNLHlDQUFrQixHQUF6QjtZQUNJLGlCQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvRCxpQkFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0QsaUJBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsQ0FBQztRQUVPLG9DQUFhLEdBQXJCO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRW5DLEVBQUUsQ0FBQSxDQUFDLGVBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV0QixDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFFRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBRU8sMENBQW1CLEdBQTNCO1lBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV6QyxJQUFJLGVBQWUsR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM5RixlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFDLElBQUksYUFBYSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuSixhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUN4QyxpQkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyRCxpQkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsVUFBTSxDQUFDLFVBQVUsRUFBRSxpQkFBYSxDQUFDLFNBQVMsQ0FBRSxDQUFDO1lBQ3BHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNaLENBQUM7UUFFTyxpQ0FBVSxHQUFsQjtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUd4QyxDQUFDO1FBRU8sa0NBQVcsR0FBbkI7WUFDSSxJQUFJLENBQUMsVUFBVSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRU8sNEJBQUssR0FBYjtZQUNJLElBQUksTUFBTSxHQUFZLGVBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUVmLGlCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRWxHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLGlCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUMsTUFBTSxFQUFFLGlCQUFhLENBQUMsU0FBUyxDQUFFLENBQUM7WUFDaEcsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGlCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUMsT0FBTyxFQUFFLGlCQUFhLENBQUMsU0FBUyxDQUFFLENBQUM7WUFDakcsQ0FBQztZQUVELElBQUksVUFBVSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVySSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxlQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsY0FBYyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUMzQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDO1FBRU8sNEJBQUssR0FBYjtZQUVJLElBQUksVUFBVSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzSSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRyxDQUFDO1FBTU0sb0NBQWEsR0FBcEIsVUFBcUIsU0FBcUIsRUFBRSxZQUFtQixFQUFFLFdBQWtCLEVBQUUsS0FBWSxFQUFFLE9BQWdCLEVBQUUsUUFBaUIsRUFBRSxVQUFrQixFQUFFLGVBQW9CLEVBQUUsVUFBa0I7WUFDaE0sSUFBSSxPQUFPLEdBQVUsWUFBWSxDQUFDO1lBQ2xDLElBQUksU0FBUyxHQUFVLFdBQVcsR0FBRyxZQUFZLENBQUM7WUFDbEQsSUFBSSxjQUFjLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QyxJQUFJLEtBQWtCLENBQUM7WUFFdkIsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztnQkFDWCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQzVDLENBQUMsRUFBRyxHQUFHO29CQUNQLENBQUMsRUFBRyxHQUFHO2lCQUNWLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFbEIsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7WUFFRCxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsVUFBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUc7Z0JBQzVFLElBQUksVUFBVSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTNHLE9BQU8sSUFBSSxVQUFVLENBQUM7Z0JBQ3RCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsMkJBQXVCLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUUsRUFBRSxDQUFBLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ1osRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUNELGlCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUMsS0FBSyxFQUFFLGlCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRTFGLEVBQUUsQ0FBQSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQSxDQUFDO29CQUN0QixTQUFTLENBQUMsSUFBSSxHQUFHLDJCQUF1QixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzlFLEVBQUUsQ0FBQSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO3dCQUNaLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO3dCQUNYLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDYixpQkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsVUFBTSxDQUFDLFFBQVEsRUFBRSxpQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqRyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQU9PLHNDQUFlLEdBQXZCO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRyxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBdE1ELENBQWtDLGFBQVMsR0FzTTFDO0lBdE1ZLGdCQUFZLGVBc014QixDQUFBO0FBQ0wsQ0FBQyxFQXhNTSxHQUFHLEtBQUgsR0FBRyxRQXdNVDtBQzNNRCxJQUFPLEdBQUcsQ0E0TVQ7QUE1TUQsV0FBTyxHQUFHLEVBQUMsQ0FBQztJQUNSO1FBQUE7WUFHVyxtQkFBYyxHQUFZLEtBQUssQ0FBQztZQUNoQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztZQUU3QixlQUFVLEdBQVEsSUFBSSxDQUFDO1lBQ3ZCLHNCQUFpQixHQUFRLElBQUksQ0FBQztZQUM5QixzQkFBaUIsR0FBVyxDQUFDLENBQUM7WUFFOUIsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixjQUFTLEdBQVcsRUFBRSxDQUFDO1lBS3ZCLGNBQVMsR0FBVyxDQUFDLENBQUM7WUFDdEIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQixtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO1lBRTVCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1lBRTVCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsY0FBUyxHQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLFlBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQztZQUVyQixzQkFBaUIsR0FBYSxFQUFFLENBQUM7WUFDakMsYUFBUSxHQUFhLElBQUksQ0FBQztZQUMxQixZQUFPLEdBQVksSUFBSSxDQUFDO1lBQ3hCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsV0FBTSxHQUFXLElBQUksQ0FBQztZQUN0QixXQUFNLEdBQWMsSUFBSSxDQUFDO1lBRXpCLHlCQUFvQixHQUFXLEdBQUcsQ0FBQztZQUNuQyx5QkFBb0IsR0FBVyxHQUFHLENBQUM7WUFDbkMsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBc0toRCxDQUFDO1FBbktVLGlDQUFJLEdBQVgsVUFBWSxNQUFXO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFBQSxDQUFDO1FBQzlCLENBQUM7UUFFTSx1Q0FBVSxHQUFqQjtZQUdJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ2pDLEdBQUcsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUV2RCxJQUFJLGlCQUFpQixHQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEtBQUssSUFBSSxJQUFJLGlCQUFpQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztnQkFDakcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBR0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBRzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTFFLElBQUksRUFBRSxHQUFXLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUdsQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0RSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdFLENBQUM7WUFHRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBRTVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFHNUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2xELElBQUksT0FBTyxHQUFXLENBQUM7b0JBQ25CLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDekQsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUN6RCxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMxRixNQUFNLEVBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN6RSxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNYLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2FBQzdCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztnQkFDWixFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2hCLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzVCLENBQUMsQ0FBQztZQUlILElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztnQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDL0IsQ0FBQyxDQUFDO1lBR0gsZUFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFHeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxlQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUQsQ0FBQztRQUdBLHNDQUFTLEdBQWhCLFVBQWlCLEdBQU87WUFDZCxJQUFJLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQ3RCLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUN6QixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFDbEIsR0FBRyxHQUFHLEVBQUUsRUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0MsQ0FBQztnQkFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN4QixDQUFDO1lBQ0QsT0FBTyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hDLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVNLHlDQUFZLEdBQW5CO1lBQ0ksU0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMseURBQXlELEVBQUUsYUFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWhHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7O1FBRU0sMENBQWEsR0FBcEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7UUFFTyw2Q0FBZ0IsR0FBeEI7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDO1FBT00sMkNBQWMsR0FBckI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3BDLENBQUM7UUFPTSxtREFBc0IsR0FBN0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7UUFPTSxtREFBc0IsR0FBN0I7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7UUFDTCx5QkFBQztJQUFELENBQUMsQUExTUQsSUEwTUM7SUExTVksc0JBQWtCLHFCQTBNOUIsQ0FBQTtBQUNMLENBQUMsRUE1TU0sR0FBRyxLQUFILEdBQUcsUUE0TVQ7QUFBQSxDQUFDO0FFMU1GLElBQU8sR0FBRyxDQThRVDtBQTlRRCxXQUFPLEdBQUcsRUFBQyxDQUFDO0lBR1I7UUFBK0IsNkJBQWM7UUFBN0M7WUFBK0IsOEJBQWM7WUFFakMsc0JBQWlCLEdBQWlCLElBQUksQ0FBQztZQUV2QyxpQkFBWSxHQUFpQixJQUFJLENBQUM7WUFDbEMsd0JBQW1CLEdBQWtCLElBQUksQ0FBQztZQUMxQyxtQkFBYyxHQUFrQixJQUFJLENBQUM7WUFFckMsb0JBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUU3QixXQUFNLEdBQWlCLElBQUksQ0FBQztZQUM1QixTQUFJLEdBQW9CLElBQUksQ0FBQztRQStQekMsQ0FBQztRQXhQVSxxQ0FBaUIsR0FBeEI7WUFHSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM5RCxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUV4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUV4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxRQUFRLENBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUVwQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUUsQ0FBQztZQUM1QyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQztZQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUcsR0FBRyxDQUFDLENBQUM7WUFFL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekYsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBR1QsSUFBSSxVQUFVLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FB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