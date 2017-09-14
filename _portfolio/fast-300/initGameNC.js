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
                CAMELOT.core.iwgLoadQ.installPlugin(createjs.Sound);
                createjs.Sound.alternateExtensions = ["ogg"];
                var Game = new BOOM.GameManager();
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
            this._refreshScale = 0;
            this._isLandscape = false;
            this._gameArea = null;
            this._rotationDiv = null;
            this._fullScreenMask = null;
            this._horizontalHeight = 0;
            this._scrollCheckEvent = null;
            this.gameLoaded = false;
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            if (this.game.device.desktop) {
                this._initDesktopSpecificSettings();
            }
            else {
                this._initMobileSpecificSettings();
            }
            this._initGenericSettings();
            BOOM.SignalManager.instance.dispatch("switchStateSignal", "Preloader");
        };
        Boot.prototype._initGenericSettings = function () {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            if (this.game.device.iPad || this.game.device.desktop) {
                this.scale.pageAlignVertically = true;
            }
            this.scale.refresh();
        };
        Boot.prototype._initDesktopSpecificSettings = function () {
            this.game.time.desiredFps = 60;
        };
        Boot.prototype._initMobileSpecificSettings = function () {
            this.game.time.desiredFps = 60;
            this.game.forceSingleUpdate = true;
            this.scale.forceOrientation(true, false);
            this.scale.enterIncorrectOrientation.add(this._enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this._leaveIncorrectOrientation, this);
            window.addEventListener("scroll", this._scrollCheckEvent);
            window.addEventListener("touchend", this._scrollCheckEvent);
        };
        Boot.prototype._gameResized = function () {
        };
        Boot.prototype._enterIncorrectOrientation = function () {
            this._isLandscape = false;
            this.game.paused = true;
        };
        Boot.prototype._leaveIncorrectOrientation = function () {
            this._isLandscape = true;
            this.game.paused = false;
        };
        Boot.prototype.update = function () {
        };
        return Boot;
    }(Phaser.State));
    BOOM.Boot = Boot;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameSheet = (function () {
        function GameSheet(key, alternateKeyName) {
            this._key = '';
            this._filename = '';
            alternateKeyName == null ?
                this._key = key :
                this._key = alternateKeyName;
            this._filename = key;
            GameSheet.spritesheets.push(this);
        }
        GameSheet.prototype.getKey = function () {
            return this._key;
        };
        GameSheet.prototype.getFilename = function () {
            return this._filename;
        };
        GameSheet.spritesheets = [];
        return GameSheet;
    }());
    BOOM.GameSheet = GameSheet;
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
        GameGroup.prototype.unsubscribeSignals = function () {
        };
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
        GameState.prototype.unsubscribeSignals = function () {
        };
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
        NonDisplayObject.prototype.unsubscribeSignals = function () {
        };
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
        return NonDisplayObject;
    }());
    BOOM.NonDisplayObject = NonDisplayObject;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
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
            this._onComplete = null;
            this._onCompleteScope = null;
            this._onCompleteParams = null;
            this._spent = false;
            this._internalCounter = 0;
            this._maxCallbacks = maxCallbacks;
            this._onComplete = onComplete;
            this._onCompleteScope = scope;
            this._onCompleteParams = params;
            this._spent = false;
            if (timer > 0) {
                this._timer = BOOM.GameManager.instance.time.create(true);
                (_a = this._timer).add.apply(_a, [timer, this._onComplete, this._onCompleteScope].concat(this._onCompleteParams));
                this._timer.start();
            }
            if (this._maxCallbacks === 0) {
                this._fireOnCompleteCallback();
            }
            var _a;
        }
        Control.prototype.done = function () {
            if (this._spent === false) {
                this._internalCounter++;
                if (this._internalCounter === this._maxCallbacks) {
                    this._fireOnCompleteCallback();
                }
            }
            else {
                BOOM.Debug.instance.warn('Control.done() called after it already completed.', BOOM.DEBUGTYPE.ERROR, this);
            }
        };
        Control.prototype._fireOnCompleteCallback = function () {
            if (this._timer != null) {
                this._timer.stop(true);
                this._timer.destroy();
                this._timer = null;
            }
            this._onComplete.bind(this._onCompleteScope).apply(void 0, this._onCompleteParams);
            this._spent = true;
            this._onComplete = null;
            this._onCompleteScope = null;
            this._onCompleteParams = null;
            this._maxCallbacks = null;
            this._internalCounter = null;
        };
        return Control;
    }());
    BOOM.Control = Control;
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
            this.game.load.onLoadComplete.add(this._waitForAudioToDecode, this);
            this.load.start();
        };
        Preloader_Core.prototype.setupLoadingScene = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] [preload] Setting up loading scene...', 'preload');
        };
        Preloader_Core.prototype.addAssetsToLoad = function () {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] [preload] Adding assets to load...', 'preload');
            this.setSpritesheetDataToLoad();
            this.setAudioDataToLoad();
        };
        Preloader_Core.prototype.fileStarted = function (progress, cacheKey, fileUrl) {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.filestarted(' + progress + ', ' + cacheKey + ', '
                + fileUrl + ')', 'preload');
        };
        Preloader_Core.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileLoaded(' + progress + ', ' + cacheKey +
                ', ' + success + ', ' + totalLoaded + ', ' + totalFiles + ')', 'preload');
        };
        Preloader_Core.prototype.fileFailed = function (cacheKey, errorObj) {
            BOOM.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileFailed(' + cacheKey + errorObj + ')', 'preload');
        };
        Preloader_Core.prototype.setSpritesheetDataToLoad = function () {
            var _this = this;
            BOOM.GameSheet.spritesheets.forEach(function (GS) {
                _this.game.load.atlasJSONArray(GS.getKey(), BOOM.GameManager.BASE_PATH + ("/assets/spritesheets/" + GS.getFilename() + ".png"), BOOM.GameManager.BASE_PATH + ("/assets/spritesheets/" + GS.getFilename() + ".json"));
            });
        };
        Preloader_Core.prototype.setAudioDataToLoad = function () {
            var _this = this;
            BOOM.GameSound.gameSounds.forEach(function (SR) {
                var filePathArray = Array();
                BOOM.GameSound.supportedExtensions.forEach(function (ext) {
                    var fileString = BOOM.GameManager.BASE_PATH + ("/assets/audio/" + SR.getName() + "." + ext);
                    filePathArray.push(fileString);
                });
                _this.game.load.audio(SR.getName(), filePathArray, true);
                SR.createSound();
            });
        };
        Preloader_Core.prototype._waitForAudioToDecode = function () {
            var _this = this;
            var audioDecodingControl = new BOOM.Control(BOOM.GameSound.gameSounds.length, function () {
                _this._addSheetsToGPUTexturePriority();
            }, this);
            BOOM.GameSound.gameSounds.forEach(function (GS) {
                _this._checkIfAudioIsDecoded(audioDecodingControl, GS);
            });
        };
        Preloader_Core.prototype._checkIfAudioIsDecoded = function (control, sound) {
            var _this = this;
            if (sound.getSound().isDecoded) {
                control.done();
            }
            else {
                this.game.time.events.add(15, function () {
                    _this._checkIfAudioIsDecoded(control, sound);
                });
            }
        };
        Preloader_Core.prototype._addSheetsToGPUTexturePriority = function () {
            var spriteSheetKeyNames = Array();
            BOOM.GameSheet.spritesheets.forEach(function (GS) {
                spriteSheetKeyNames.push(GS.getKey());
            });
            this.game.renderer.setTexturePriority(spriteSheetKeyNames);
            this.onLoad();
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
    var SoundChannels = (function () {
        function SoundChannels() {
        }
        SoundChannels.BACKGROUND = 'background';
        SoundChannels.FX_SOUNDS = 'fx_sounds';
        return SoundChannels;
    }());
    BOOM.SoundChannels = SoundChannels;
    var GameSoundChannel = (function () {
        function GameSoundChannel(name, initialVolume) {
            this._name = name;
            this._sounds = [];
            this._previousVolume = initialVolume;
            this._volume = initialVolume;
            this._isMuted = false;
        }
        GameSoundChannel.prototype.addGameSound = function (sound) {
            this._sounds.push(sound);
        };
        GameSoundChannel.prototype.getGameSound = function (soundName) {
            for (var i = 0; i < this._sounds.length; i++) {
                if (this._sounds[i].getName() == soundName) {
                    return this._sounds[i];
                }
            }
            return null;
        };
        GameSoundChannel.prototype.getGameSounds = function () {
            return this._sounds;
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
        GameSoundChannel.prototype.isMuted = function () {
            return this._isMuted;
        };
        GameSoundChannel.prototype.setVolume = function (volume) {
            this._volume = volume;
            if (this._isMuted) {
                this._previousVolume = volume;
            }
            else {
                this._volume = volume;
                var values = this._sounds;
                for (var i = 0; i < values.length; i++) {
                    values[i].setCurrentVolume(volume);
                }
            }
        };
        GameSoundChannel.prototype.mute = function (value) {
            this._isMuted = value;
            var values = this._sounds;
            if (value) {
                this._previousVolume = this._volume;
                this._volume = 0;
                for (var i = 0; i < values.length; i++) {
                    values[i].setCurrentVolume(0);
                }
            }
            else {
                this._volume = this._previousVolume;
                for (var i = 0; i < values.length; i++) {
                    values[i].setCurrentVolume(this._previousVolume);
                }
            }
        };
        return GameSoundChannel;
    }());
    BOOM.GameSoundChannel = GameSoundChannel;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameSound = (function () {
        function GameSound(name, channel, maxVolume, isLoop, initialVolume, allowMultiple) {
            if (maxVolume === void 0) { maxVolume = 1; }
            if (isLoop === void 0) { isLoop = false; }
            if (initialVolume === void 0) { initialVolume = 1; }
            if (allowMultiple === void 0) { allowMultiple = true; }
            this._name = "";
            this._maxVolume = -1;
            this._currentVolume = -1;
            this._isLoop = null;
            this._allowMultiple = null;
            this._channel = "";
            this._sound = null;
            this._isPlaying = false;
            this._name = name;
            this._channel = channel;
            this._maxVolume = maxVolume;
            this._currentVolume = initialVolume;
            this._isLoop = isLoop;
            this._allowMultiple = allowMultiple;
            GameSound.gameSounds.push(this);
        }
        GameSound.prototype.createSound = function () {
            this._sound = new Phaser.Sound(BOOM.GameManager.instance, this._name, this._currentVolume, this._isLoop);
            BOOM.GameManager.instance.getAudioManager().addSound(this);
        };
        GameSound.prototype.manuallyAssignSound = function (audio) {
            BOOM.GameManager.instance.cache.addSound(this._name, null, audio, true, true);
            this._sound = new Phaser.Sound(BOOM.GameManager.instance, this._name, this._currentVolume, this._isLoop);
            BOOM.GameManager.instance.getAudioManager().addSound(this);
        };
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
        GameSound.prototype.isPlaying = function () {
            return this._isPlaying;
        };
        GameSound.prototype.setIsPlaying = function (value) {
            this._isPlaying = value;
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
        GameSound.gameSounds = Array(0);
        GameSound.supportedExtensions = Array('mp3', 'ogg');
        return GameSound;
    }());
    BOOM.GameSound = GameSound;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var AudioManager = (function () {
        function AudioManager() {
            var _this = this;
            this._soundChannels = [];
            this._subscribeSignals();
            this.addSoundChannel('fx_sounds', 1);
            this.addSoundChannel('background', 1);
            this._isMuted = false;
            this._isMutedByVisibility = false;
            if (!BOOM.GameManager.instance.device.desktop) {
                document.addEventListener("visibilitychange", function () {
                    if (document.visibilityState === 'hidden') {
                        if (!_this._isMuted) {
                            _this._muteAudio();
                        }
                        _this._isMutedByVisibility = true;
                    }
                    else {
                        if (!_this._isMutedByUser && _this._isMutedByVisibility) {
                            _this._muteAudio();
                        }
                        _this._isMutedByVisibility = false;
                    }
                }, false);
            }
            BOOM.Debug.instance.log("Audio Manager has been initialised and added.", BOOM.DEBUGTYPE.INIT, this);
        }
        AudioManager.prototype._subscribeSignals = function () {
            if (com.camelot.core.IWG.ame('get', 'audioSupported') === true) {
                BOOM.SignalManager.instance.add(AudioManager.PLAY_AUDIO, this._playAudio, this);
                BOOM.SignalManager.instance.add(AudioManager.STOP_AUDIO, this._stopAudio, this);
                BOOM.SignalManager.instance.add(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
                BOOM.SignalManager.instance.add(AudioManager.MUTE_ALL_CHANNELS, this._muteAudioByUser, this);
            }
        };
        AudioManager.prototype._unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove(AudioManager.PLAY_AUDIO, this._playAudio, this);
            BOOM.SignalManager.instance.remove(AudioManager.STOP_AUDIO, this._stopAudio, this);
            BOOM.SignalManager.instance.remove(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            BOOM.SignalManager.instance.remove(AudioManager.MUTE_ALL_CHANNELS, this._muteAudioByUser, this);
        };
        AudioManager.prototype.addSoundChannel = function (channelName, initialVolume) {
            var soundChannel = new BOOM.GameSoundChannel(channelName, initialVolume);
            this._soundChannels.push(soundChannel);
        };
        AudioManager.prototype.addSound = function (sound) {
            var soundChannel = this._getSoundChannel(sound.getChannel());
            soundChannel.addGameSound(sound);
        };
        AudioManager.prototype._playAudio = function (gameSound, channelName, isFadeIn, duration, delay) {
            var channel = this._getSoundChannel(channelName);
            var sound = gameSound.getSound();
            sound.allowMultiple = gameSound.getAllowMultiple();
            gameSound.setIsPlaying(true);
            if (channel.isMuted()) {
                sound.volume = 0;
                sound.play();
                return;
            }
            if (isFadeIn) {
                sound.volume = 0;
                sound.play();
                var step = { value: 0 };
                var fadeInTween = BOOM.GameManager.instance.make.tween(step).to({
                    value: 1
                }, duration, Phaser.Easing.Linear.None, true, delay);
                fadeInTween.onUpdateCallback(function () {
                    gameSound.setCurrentVolume(step.value);
                }, this);
                fadeInTween.onComplete.add(function () {
                    gameSound.setCurrentVolume(step.value);
                }, this);
            }
            else {
                if (delay !== undefined) {
                    var t = BOOM.GameManager.instance.time.create(true);
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
        AudioManager.prototype._stopAudio = function (soundName, channelName, isFadeOut, duration, delay) {
            var _this = this;
            var gameSound = this._getSoundChannel(channelName).getGameSound(soundName.getName());
            var sound = gameSound.getSound();
            gameSound.setIsPlaying(false);
            if (sound != null) {
                if (isFadeOut) {
                    var step = { value: sound.volume };
                    var fadeOutTween = BOOM.GameManager.instance.make.tween(step).to({
                        value: 0
                    }, duration, Phaser.Easing.Linear.None, true, delay);
                    fadeOutTween.onUpdateCallback(function () {
                        sound.volume = _this._getSoundChannel(channelName).getVolume() * step.value;
                    }, this);
                    fadeOutTween.onComplete.add(function () {
                        sound.stop();
                    }, this);
                }
                else {
                    if (delay !== undefined) {
                        var t = BOOM.GameManager.instance.time.create(true);
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
        AudioManager.prototype._setChannelVolume = function (channelName, volume, isFade, duration) {
            var soundChannel = this._getSoundChannel(channelName);
            if (!this._isMuted) {
                if (isFade) {
                    var step = { value: soundChannel.getVolume() };
                    var tween = BOOM.GameManager.instance.make.tween(step).to({
                        value: volume
                    }, duration, Phaser.Easing.Linear.None);
                    tween.onUpdateCallback(function () {
                        soundChannel.setVolume(step.value);
                    });
                    tween.onComplete.add(function () {
                        soundChannel.setVolume(volume);
                    }, this);
                    tween.start();
                }
                else {
                    soundChannel.setVolume(volume);
                }
            }
            else {
                soundChannel.setVolume(volume);
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
        AudioManager.prototype._muteAudioByUser = function () {
            this._isMutedByUser = !this._isMutedByUser;
            this._muteAudio();
        };
        AudioManager.prototype._muteAudioChannels = function (mute) {
            var soundChannels = this._soundChannels;
            for (var i = 0; i < soundChannels.length; i++) {
                var soundChannel = this._soundChannels[i];
                soundChannel.mute(mute);
            }
        };
        AudioManager.prototype._stopAllSounds = function () {
            var soundChannel = this._getSoundChannel(BOOM.SoundChannels.FX_SOUNDS);
            if (soundChannel != null) {
                var gameSounds = soundChannel.getGameSounds();
                for (var i = 0; i < gameSounds.length; i++) {
                    gameSounds[i].getSound().stop();
                }
            }
            soundChannel = this._getSoundChannel(BOOM.SoundChannels.BACKGROUND);
            if (soundChannel != null) {
                gameSounds = soundChannel.getGameSounds();
                for (var i = 0; i < gameSounds.length; i++) {
                    gameSounds[i].getSound().stop();
                }
            }
        };
        AudioManager.prototype._musicCrossFade = function (soundname) {
            var _this = this;
            var gameSound = this._getSoundChannel(BOOM.SoundChannels.BACKGROUND).getGameSound("");
            var sound;
            var isASound = false;
            if (gameSound != null) {
                sound = gameSound.getSound();
                isASound = true;
            }
            var step = { value: 1 };
            var fadeOutTween = BOOM.GameManager.instance.make.tween(step).to({
                value: 0
            }, 1500, Phaser.Easing.Linear.None, true, 0);
            fadeOutTween.onUpdateCallback(function () {
                if (isASound) {
                    sound.volume = step.value;
                }
            }, this);
            fadeOutTween.onComplete.add(function () {
                if (isASound) {
                    sound.stop();
                }
                var gameSound = _this._getSoundChannel(BOOM.SoundChannels.BACKGROUND).getGameSound(soundname);
                var sound2 = gameSound.getSound();
                sound2.volume = 0;
                sound2.play();
                var step = { value: 0 };
                var fadeInTween = BOOM.GameManager.instance.make.tween(step).to({
                    value: 1
                }, 1500, Phaser.Easing.Linear.None, true, 0);
                fadeInTween.onUpdateCallback(function () {
                    sound2.volume = step.value;
                }, _this);
            }, this);
        };
        AudioManager.prototype._getSoundChannel = function (soundChannelName) {
            for (var i = 0; i < this._soundChannels.length; i++) {
                if (this._soundChannels[i].getName() === soundChannelName) {
                    return this._soundChannels[i];
                }
            }
            return null;
        };
        AudioManager.PLAY_AUDIO = "playAudio";
        AudioManager.STOP_AUDIO = "stopAudio";
        AudioManager.SET_CHANNEL_VOLUME = "setChannelVolume";
        AudioManager.MUTE_ALL_CHANNELS = "muteAll";
        return AudioManager;
    }());
    BOOM.AudioManager = AudioManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Sounds = (function () {
        function Sounds() {
        }
        Sounds.BONUS_SPARKLE = new BOOM.GameSound("bonussparkle", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.COUNT_UP = new BOOM.GameSound("countup", BOOM.SoundChannels.FX_SOUNDS);
        Sounds.MATCH = new BOOM.GameSound("match", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.COIN = new BOOM.GameSound("coin", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.PLAY = new BOOM.GameSound("play", BOOM.SoundChannels.FX_SOUNDS);
        Sounds.PRIZE_1 = new BOOM.GameSound("prize1", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.PRIZE_2 = new BOOM.GameSound("prize2", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.PRIZE_3 = new BOOM.GameSound("prize3", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.WAD_1 = new BOOM.GameSound("wad_1", BOOM.SoundChannels.FX_SOUNDS, 1, false, 1, false);
        Sounds.WHOOSH_1 = new BOOM.GameSound("whoosh_1", BOOM.SoundChannels.FX_SOUNDS);
        Sounds.WHOOSH_2 = new BOOM.GameSound("whoosh_2", BOOM.SoundChannels.FX_SOUNDS);
        Sounds.END_LOSE = new BOOM.GameSound("endlose", BOOM.SoundChannels.FX_SOUNDS);
        Sounds.END_WIN = new BOOM.GameSound("endwin", BOOM.SoundChannels.FX_SOUNDS);
        return Sounds;
    }());
    BOOM.Sounds = Sounds;
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.addImage = function (name) {
            var image = com.camelot.core.iwgLoadQ.getResult(name);
            this.game.cache.addImage(name, null, image);
        };
        Preloader.prototype.addSpriteSheet = function (name) {
            var image = com.camelot.core.iwgLoadQ.getResult(name);
            var frames = com.camelot.core.iwgLoadQ.getResult(name + "-data");
            this.game.cache.addTextureAtlas(name, null, image, frames, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        };
        Preloader.prototype.addSounds = function () {
            if (com.camelot.core.IWG.ame('get', 'audioSupported') === true) {
                BOOM.GameSound.gameSounds.forEach(function (sound) {
                    var audio = com.camelot.core.iwgLoadQ.getResult(sound.getName());
                    sound.manuallyAssignSound(audio);
                });
            }
        };
        Preloader.prototype.addBitmapFont = function (name, space) {
            var image = com.camelot.core.iwgLoadQ.getResult(name);
            var frames = com.camelot.core.iwgLoadQ.getResult(name + "-data");
            this.game.cache.addBitmapFont(name, null, image, frames, 'xml', space);
        };
        Preloader.prototype.create = function () {
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.style.width = com.camelot.core.IWG.ame('get', 'gameWidth') + "px";
            IWGholder.style.height = com.camelot.core.IWG.ame('get', 'gameHeight') + "px";
            var canvas = document.getElementById("IWGcanvas");
            IWGholder.removeChild(canvas);
            this.addImage('background');
            this.addImage("pause");
            this.addSpriteSheet("masterSS");
            this.addSpriteSheet("sparkleSS");
            this.addBitmapFont("prizes-export", 0);
            this.addBitmapFont("big_font-export", 3);
            this.addSounds();
            BOOM.TicketManager.instance.requestNewTicket(function () {
                BOOM.SignalManager.instance.dispatch('switchStateSignal', 'MainGame');
            }, this);
        };
        return Preloader;
    }(BOOM.GameState));
    BOOM.Preloader = Preloader;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(x, y, concealer, symbol, prizeConcealer, prize) {
            var _this = this;
            _super.call(this);
            this._name = null;
            this._revealed = false;
            this._winner = false;
            this._base = null;
            this._symbol = null;
            this._symbolName = null;
            this._concealer = null;
            this._shadow_concealer = null;
            this._prizeConcealer = null;
            this._prize = null;
            this._sound = null;
            this._hitAreaHeight = 0;
            this._value = null;
            this._position = null;
            this._particles = [];
            this._idling = false;
            this._idleTimer = null;
            this._killIdle = false;
            this._idleWadTween = null;
            this._idleShadowTween = null;
            this._idleShimmerAnim = null;
            this._pulsingWin = false;
            this._position = new Phaser.Point(x, y);
            this.position.setTo(x, y);
            this.pivot.set(0.5, 0.5);
            this._base = concealer;
            if (symbol) {
                this._symbol = this.game.add.sprite(0, 0, "masterSS", symbol, this);
                this._symbol.anchor.setTo(0.5, 0.5);
                this._symbol.alpha = 0;
                this._symbol.scale.set(0.5, 0.5);
            }
            if (concealer) {
                if (this._base === "money_wad") {
                    this._shadow_concealer = this.game.add.sprite(0, 0, "masterSS", "wad_shadow", this);
                    this._shadow_concealer.anchor.setTo(0.5, 0.5);
                }
                this._concealer = this.game.add.sprite(0, 0, "masterSS", concealer, this);
                this._concealer.anchor.setTo(0.5, 0.5);
                this._hitAreaHeight += this._concealer.height;
            }
            if (prize) {
                this._prize = this.game.add.bitmapText(0, 55, "prizes-export", BOOM.CurrencyManager.instance.formatCurrency(prize, true), 31, this);
                this._prize.anchor.setTo(0.5, 0.5);
                this._prize.alpha = 0;
                this._prize.scale.set(0.5, 0.5);
            }
            if (prizeConcealer) {
                this._prizeConcealer = this.game.add.sprite(0, 60, "masterSS", prizeConcealer, this);
                this._prizeConcealer.anchor.setTo(0.5, 0.5);
                this._hitAreaHeight += this._prizeConcealer.height;
            }
            this._concealer.inputEnabled = true;
            this._concealer.input.useHandCursor = true;
            this._concealer.hitArea = new Phaser.Rectangle(-this.width / 2, -this.width / 2, this.width, this._hitAreaHeight);
            this._concealer.events.onInputDown.add(function () {
                if (!_this._revealed) {
                    _this._revealed = true;
                    _this.reveal();
                    BOOM.SignalManager.instance.dispatch('startInactive');
                    if (_this.game.device.vibration) {
                        window.navigator.vibrate(100);
                    }
                }
            }, this);
            this._concealer.events.onInputOver.add(function () {
                BOOM.SignalManager.instance.dispatch('endInactive');
                _this._concealer.scale.setTo(1.04, 1.04);
            }, this);
            this._concealer.events.onInputOut.add(function () {
                _this._concealer.scale.setTo(1, 1);
                BOOM.SignalManager.instance.dispatch('startInactive');
            }, this);
        }
        Object.defineProperty(Icon.prototype, "revealed", {
            get: function () {
                return this._revealed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "winner", {
            get: function () {
                return this._winner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "symbolName", {
            get: function () {
                return this._symbolName;
            },
            set: function (name) {
                this._symbolName = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (num) {
                this._value = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "sounds", {
            get: function () {
                return this._sound;
            },
            set: function (sound) {
                this._sound = sound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "particles", {
            set: function (array) {
                this._particles = array;
            },
            enumerable: true,
            configurable: true
        });
        Icon.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('endInactive', this._killInactive, this);
            BOOM.SignalManager.instance.add('startInactive', this._inactive, this);
            BOOM.SignalManager.instance.add('mainGameEnd', this._endGameLoseTint, this);
            BOOM.SignalManager.instance.add('syncUpWinPulses', this._prizePulseOnWin, this);
        };
        Icon.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('endInactive', this._killInactive, this);
            BOOM.SignalManager.instance.remove('startInactive', this._inactive, this);
            BOOM.SignalManager.instance.remove('mainGameEnd', this._endGameLoseTint, this);
            BOOM.SignalManager.instance.remove('syncUpWinPulses', this._prizePulseOnWin, this);
        };
        Icon.prototype.reveal = function () {
            var _this = this;
            Icon.NUM_REVEALING++;
            Icon.CLICK_COUNT++;
            this._concealer.scale.setTo(1, 1);
            this._concealer.destroy();
            if (this._shadow_concealer) {
                this._shadow_concealer.destroy();
            }
            if (this._idleShimmerAnim) {
                this._idleShimmerAnim.alpha = 0;
            }
            this._symbol.alpha = 1;
            this.game.add.tween(this._symbol.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out, true);
            var sound;
            if ((Icon.CLICK_COUNT % 2) == 0) {
                sound = this._sound[0];
            }
            else {
                sound = this._sound[1];
            }
            BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, sound, BOOM.SoundChannels.FX_SOUNDS);
            var emitter = null;
            if (this._particles.length > 0) {
                emitter = this.game.add.emitter(this.worldPosition.x, this.worldPosition.y, 10);
                emitter.setXSpeed(-150, 150);
                emitter.setYSpeed(-200, -400);
                emitter.gravity = 1000;
                for (var i = 0; i < this._particles.length; i++) {
                    var particleString = this._particles[i];
                    var particle = emitter.makeParticles('masterSS', particleString, 1, true);
                }
                emitter.start(false, 1700, 0);
                this.game.add.existing(emitter);
                emitter.forEachAlive(function (particle) {
                    _this.game.add.tween(particle).to({ alpha: 0 }, 300, "Linear", true, 700);
                }, particle);
                this.game.time.events.add(1700, function () {
                    emitter.kill();
                    emitter.destroy();
                });
            }
            this.game.time.events.add(1000, function () {
                if (_this._prize) {
                    var prizeConcealerTween = _this.game.add.tween(_this._prizeConcealer).to({ alpha: 0 }, 200, "Linear", true);
                    var stars = _this.game.add.sprite(0, -20, "sparkleSS", "animSparklesFire_00000", _this);
                    stars.anchor.setTo(0.5, 0.5);
                    var starAnim = stars.animations.add('stars', Phaser.Animation.generateFrameNames('animSparklesFire_', 0, 17, '', 5), 30, false);
                    stars.animations.play('stars');
                    starAnim.onComplete.add(function () {
                        stars.visible = false;
                    });
                    BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.PRIZE_1, BOOM.SoundChannels.BACKGROUND);
                    _this._prize.alpha = 1;
                    var prizeTween = _this.game.add.tween(_this._prize.scale).to({ x: 1, y: 1 }, 400, Phaser.Easing.Back.Out, true);
                }
                Icon.NUM_REVEALING--;
                Icon.NUM_REVEALED++;
                _this._callCheckMatchWhenNoneRevealing();
                if (_this._prize) {
                    prizeTween.onComplete.add(function () {
                        _this._callCheckMatchWhenNoneRevealing();
                    });
                }
                else {
                    _this._callCheckMatchWhenNoneRevealing();
                }
                BOOM.SignalManager.instance.dispatch('checkEndGame');
                BOOM.SignalManager.instance.dispatch('clickCount');
            });
        };
        Icon.prototype._callCheckMatchWhenNoneRevealing = function () {
            this.game.time.events.add(200, function () {
                if (Icon.NUM_REVEALING == 0) {
                    BOOM.SignalManager.instance.dispatch('checkMatch');
                }
            });
        };
        Icon.prototype.winReveal = function (control) {
            var _this = this;
            this._winner = true;
            this._symbol.scale.set(1, 1);
            var winReveal = this.game.add.tween(this._symbol.scale).to({
                x: [1.2, 1],
                y: [1.2, 1]
            }, 1000, Phaser.Easing.Quadratic.InOut, true, 250, 2);
            winReveal.onStart.add(function () {
                if (_this.symbolName == 20) {
                    BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.BONUS_SPARKLE, BOOM.SoundChannels.FX_SOUNDS);
                }
                else {
                    BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.MATCH, BOOM.SoundChannels.FX_SOUNDS);
                }
            });
            winReveal.onComplete.add(function () {
                if (control != null) {
                    control.done();
                }
            });
            this._pulsingWin = true;
            BOOM.SignalManager.instance.dispatch('syncUpWinPulses');
            com.camelot.core.IWG.ame('bank', {
                deposit: [Number(this._value)],
                log: true
            });
        };
        Icon.prototype._prizePulseOnWin = function () {
            var _this = this;
            if (this._pulsingWin && this._prize != null) {
                var pulseWinTextSlowly = this.game.add.tween(this._prize.scale).to({
                    x: [1.15, 1],
                    y: [1.15, 1]
                }, 1000, Phaser.Easing.Quadratic.InOut, true, 250);
                pulseWinTextSlowly.onComplete.add(function () {
                    var continuousPulse = _this.game.add.tween(_this._prize.scale).to({
                        x: [1.15, 1],
                        y: [1.15, 1]
                    }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1);
                });
            }
        };
        Icon.prototype._inactive = function () {
            var _this = this;
            if (!this._revealed) {
                this._idling = true;
                this._concealer.scale.setTo(1, 1);
                if (this._idleTimer == null) {
                    this._idleTimer = this.game.time.create(true);
                    this._idleTimer.add(2500, function () {
                        _this._killIdle = false;
                        if (_this._base === "money_wad") {
                            _this._idleTweenAnimation();
                        }
                        else {
                            _this._idleShimmerAnimation();
                        }
                    }, this);
                    this._idleTimer.start();
                }
            }
        };
        Icon.prototype._idleTweenAnimation = function () {
            var _this = this;
            if (!this._idling) {
                return;
            }
            this._idleShadowTween = this.game.make.tween(this._shadow_concealer.scale).to({
                x: [0.5, 1]
            }, 850, Phaser.Easing.Bounce.Out, true);
            this._idleWadTween = this.game.make.tween(this._concealer).to({
                y: [this._concealer.position.y - 10, this._concealer.position.y]
            }, 850, Phaser.Easing.Bounce.Out, true);
            var prizeConcealerTween = this.game.add.tween(this._prizeConcealer.scale).to({
                x: [1.1, 1],
                y: [1.1, 1]
            }, 850, Phaser.Easing.Bounce.Out, true);
            this._idleWadTween.chain(prizeConcealerTween);
            var t = this.game.time.create(true);
            t.add(2000, function () {
                if (_this._killIdle) {
                    _this._killIdle = false;
                }
                else {
                    _this._idleTweenAnimation();
                }
            }, this);
            t.start();
        };
        Icon.prototype._idleShimmerAnimation = function () {
            var _this = this;
            this._idleShimmerAnim = this.game.add.sprite(0, 0, 'masterSS', "coin_shimmer1", this);
            this._idleShimmerAnim.anchor.setTo(0.5, 0.5);
            this._idleShimmerAnim.animations.add('shimmer', Phaser.Animation.generateFrameNames('coin_shimmer', 1, 8, '', 0), 30, false);
            if (this._idleShimmerAnim) {
                this._idleShimmerAnim.animations.play('shimmer');
                this._idleShimmerAnim.animations.getAnimation('shimmer').onComplete.add(function () {
                    _this._idleShimmerAnim.alpha = 0;
                    _this.game.time.events.add(4000, function () {
                        if (_this._killIdle) {
                            _this._killIdle = false;
                        }
                        else {
                            if (_this._idleShimmerAnim) {
                                _this._idleShimmerAnim.alpha = 1;
                                _this._idleShimmerAnim.animations.play('shimmer');
                            }
                        }
                    }, _this);
                });
            }
        };
        Icon.prototype._killInactive = function () {
            if (this._idling) {
                this._idling = false;
                this._killIdle = true;
                if (this._idleTimer != null) {
                    this._idleTimer.destroy();
                    this._idleTimer = null;
                }
                if (this._idleShimmerAnim != null) {
                    this._idleShimmerAnim.destroy();
                    this._idleShimmerAnim = null;
                }
                if (this._idleShadowTween != null) {
                    this._idleShadowTween.stop();
                    this._idleShadowTween = null;
                }
                if (this._idleWadTween != null) {
                    this._concealer.position.setTo(0, 0);
                    this._idleWadTween.stop();
                    this._idleWadTween = null;
                }
            }
        };
        Icon.prototype._endGameLoseTint = function () {
            if (!this._winner) {
                if (this._prize != null) {
                    this._symbol.tint = 0x929292;
                    this._prize.tint = 0x929292;
                    this._prize.alpha = 0.4;
                    this._symbol.alpha = 0.4;
                }
            }
        };
        Icon.NUM_REVEALING = 0;
        Icon.NUM_REVEALED = 0;
        Icon.CLICK_COUNT = 0;
        return Icon;
    }(BOOM.GameGroup));
    BOOM.Icon = Icon;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var Match = (function (_super) {
        __extends(Match, _super);
        function Match() {
            _super.call(this);
            this._noMatches = 2;
            this._matchIcons = [];
            this._icons = [];
            this._revealed = 0;
            this._clickCount = 0;
            this._currentlyMatching = false;
            this._queuedMatch = false;
        }
        Object.defineProperty(Match.prototype, "numberOfMatches", {
            set: function (no) {
                this._noMatches = no;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Match.prototype, "matchIcons", {
            set: function (icons) {
                this._matchIcons = icons;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Match.prototype, "icons", {
            set: function (icons) {
                this._icons = icons;
            },
            enumerable: true,
            configurable: true
        });
        Match.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('checkMatch', this._checkMatch, this);
            BOOM.SignalManager.instance.add('clickCount', this._incClickCount, this);
        };
        Match.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('checkMatch', this._checkMatch, this);
            BOOM.SignalManager.instance.remove('clickCount', this._incClickCount, this);
        };
        Match.prototype._checkMatch = function (calledFromClick) {
            var _this = this;
            if (calledFromClick === void 0) { calledFromClick = true; }
            if (calledFromClick) {
                this._revealed++;
            }
            if (this._currentlyMatching) {
                this._queuedMatch = true;
                return;
            }
            this._currentlyMatching = true;
            var allMatchIconsDone = new BOOM.Control(this._matchIcons.length, function () {
                if (BOOM.Icon.NUM_REVEALED === (_this._icons.length + _this._matchIcons.length) && !_this._queuedMatch) {
                    BOOM.SignalManager.instance.dispatch('mainGameEnd');
                }
                else {
                    _this._currentlyMatching = false;
                    if (_this._queuedMatch) {
                        _this._queuedMatch = false;
                        if (BOOM.Icon.NUM_REVEALING === 0) {
                            _this._checkMatch(false);
                        }
                    }
                }
            }, this);
            for (var i = 0; i < this._matchIcons.length; i++) {
                var allPrizeIconsDone = new BOOM.Control(this._icons.length, function (control) {
                    control.done();
                }, this, -1, allMatchIconsDone);
                var matchIcon = this._matchIcons[i];
                for (var j = 0; j < this._icons.length; j++) {
                    var icon = this._icons[j];
                    if (icon.revealed && (matchIcon.revealed || icon.symbolName === 20)) {
                        if (matchIcon.symbolName === icon.symbolName && icon.symbolName !== 20) {
                            if (!icon.winner) {
                                var allWinHighlightControl = new BOOM.Control(2, function (control) {
                                    control.done();
                                }, this, -1, allPrizeIconsDone);
                                matchIcon.winReveal(allWinHighlightControl);
                                icon.winReveal(allWinHighlightControl);
                            }
                            else {
                                allPrizeIconsDone.done();
                            }
                        }
                        else if (icon.symbolName === 20) {
                            if (!icon.winner) {
                                icon.winReveal(allPrizeIconsDone);
                            }
                            else {
                                allPrizeIconsDone.done();
                            }
                        }
                        else {
                            allPrizeIconsDone.done();
                        }
                    }
                    else {
                        allPrizeIconsDone.done();
                    }
                }
            }
        };
        Match.prototype._incClickCount = function () {
            var _this = this;
            this._clickCount++;
            this.game.time.events.add(4000, function () {
                _this._clickCount--;
                if (_this._clickCount === 0) {
                    BOOM.SignalManager.instance.dispatch('startInactive');
                }
            });
        };
        return Match;
    }(BOOM.GameGroup));
    BOOM.Match = Match;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var MainGamePanelGroup = (function (_super) {
        __extends(MainGamePanelGroup, _super);
        function MainGamePanelGroup() {
            _super.call(this);
            this._mainGamePanel = null;
            this._winningSymbolsGroup = null;
            this._yourSymbolsGroup = null;
            this._muteButton = null;
            this._mainGamePanel = this.game.make.sprite(0, 0, "masterSS", "main_game_panel");
            this._mainGamePanel.anchor.setTo(.5, .5);
            this.addChild(this._mainGamePanel);
            this._winningSymbolsGroup = new Phaser.Group(this.game);
            this._yourSymbolsGroup = new Phaser.Group(this.game);
            this.add(this._winningSymbolsGroup);
            this.add(this._yourSymbolsGroup);
            this._winningSymbolsGroup.position.setTo(0, -186);
            this._yourSymbolsGroup.position.setTo(0, 64);
            var matchIconPos = [
                [-115, 0],
                [0, 0],
                [115, 0],
            ];
            var matchIcons = [];
            for (var i = 0; i < matchIconPos.length; i++) {
                var matchIcon = BOOM.TicketManager.instance.getTicket().match[i];
                var position = matchIconPos[i];
                var element = new BOOM.Icon(position[0], position[1], "coin", this._iconSymbol(matchIcon));
                element.symbolName = matchIcon;
                element.particles = ['coin_pt1', 'coin_pt2', 'coin_pt3', 'coin_pt4', 'coin_pt5', 'stars_1', 'stars_2', 'stars_2', 'stars_5', 'stars_6', 'stars_3'];
                element.sounds = [BOOM.Sounds.COIN, BOOM.Sounds.COIN];
                matchIcons.push(element);
                this._winningSymbolsGroup.add(element);
            }
            var iconPos = [
                [-190, -115],
                [-60, -115],
                [70, -115],
                [190, -115],
                [-190, 0],
                [-60, 0],
                [70, 0],
                [190, 0],
                [-190, 115],
                [-60, 115],
                [70, 115],
                [190, 115]
            ];
            var icons = [];
            for (var i = 0; i < iconPos.length; i++) {
                var turnData = BOOM.TicketManager.instance.getTicket().turns[i];
                var position = iconPos[i];
                var element = new BOOM.Icon(position[0], position[1], "money_wad", this._iconSymbol(turnData.t), "prize_text", turnData.p);
                element.symbolName = turnData.t;
                element.value = turnData.p;
                element.particles = ['wad_pt1', 'wad_pt2', 'wad_pt3', 'wad_pt4', 'wad_pt5', 'wad_pt6', 'stars_1', 'stars_2', 'stars_2', 'stars_5', 'stars_6', 'stars_3'];
                element.sounds = [BOOM.Sounds.WAD_1, BOOM.Sounds.WAD_1];
                icons.push(element);
                this._yourSymbolsGroup.add(element);
            }
            var match = new BOOM.Match();
            match.icons = icons;
            match.matchIcons = matchIcons;
        }
        MainGamePanelGroup.prototype._iconSymbol = function (index) {
            var symbolString = null;
            switch (index) {
                case 0:
                    symbolString = "boat";
                    break;
                case 1:
                    symbolString = "car";
                    break;
                case 2:
                    symbolString = "car2";
                    break;
                case 3:
                    symbolString = "chest";
                    break;
                case 4:
                    symbolString = "chopper";
                    break;
                case 5:
                    symbolString = "coins";
                    break;
                case 6:
                    symbolString = "diamond";
                    break;
                case 7:
                    symbolString = "flag";
                    break;
                case 8:
                    symbolString = "flash";
                    break;
                case 9:
                    symbolString = "gold";
                    break;
                case 10:
                    symbolString = "helmet";
                    break;
                case 11:
                    symbolString = "key";
                    break;
                case 12:
                    symbolString = "plane";
                    break;
                case 13:
                    symbolString = "pot";
                    break;
                case 14:
                    symbolString = "road";
                    break;
                case 15:
                    symbolString = "safe";
                    break;
                case 16:
                    symbolString = "sneaker";
                    break;
                case 17:
                    symbolString = "stopwatch";
                    break;
                case 18:
                    symbolString = "money";
                    break;
                case 19:
                    symbolString = "wheel";
                    break;
                case 20:
                    symbolString = "30";
                default:
                    break;
            }
            return symbolString;
        };
        return MainGamePanelGroup;
    }(BOOM.GameGroup));
    BOOM.MainGamePanelGroup = MainGamePanelGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var ChanceAmountText = (function (_super) {
        __extends(ChanceAmountText, _super);
        function ChanceAmountText() {
            var _this = this;
            _super.call(this);
            this._packedText = null;
            this._withText = null;
            this._amountText = null;
            this._topPrizesText = null;
            this._spriteArrays = [];
            this._offset = 0;
            this._originalPosition = null;
            this._groupedSprites = null;
            this._groupActiveTween = null;
            this._spacing = 2;
            this._idleTweens = [];
            this._originalPosition = new Phaser.Point(227, 428);
            this._groupedSprites = new Phaser.Group(BOOM.GameManager.instance);
            this.add(this._groupedSprites);
            this._groupedSprites.y = this._originalPosition.y;
            this.visible = false;
            this.position.set(this._originalPosition.x, 0);
            this._offset = 50;
            this._groupedSprites.position.y += this._offset;
            this._packedText = this.game.make.sprite(0, 0, "masterSS", "main_packed");
            this._packedText.anchor.setTo(.5, .5);
            this.addChild(this._packedText);
            this._spriteArrays.push(this._packedText);
            this._withText = this.game.make.sprite(0, 0, "masterSS", "main_with");
            this._withText.anchor.setTo(.5, .5);
            this.addChild(this._withText);
            this._spriteArrays.push(this._withText);
            this._amountText = this.game.make.sprite(0, 0, "masterSS", "main_300");
            this._amountText.anchor.setTo(.5, .5);
            this.addChild(this._amountText);
            this._spriteArrays.push(this._amountText);
            this._topPrizesText = this.game.make.sprite(0, 0, "masterSS", "main_top_prizes");
            this._topPrizesText.anchor.setTo(.5, .5);
            this.addChild(this._topPrizesText);
            this._spriteArrays.push(this._topPrizesText);
            for (var i = 0; i < this._spriteArrays.length; i++) {
                this._spriteArrays[i].y = 1000;
            }
            this.onDestroy.add(function () { _this._clearIdleTimer(); });
        }
        ChanceAmountText.prototype.intro = function () {
            var _this = this;
            this.visible = true;
            var chanceHit = false;
            var bestTween = this.game.add.tween(this._packedText).to({
                y: this._groupedSprites.y
            }, 500, Phaser.Easing.Quadratic.Out, true);
            bestTween.onStart.add(function () {
                _this._playWhoosh(250, BOOM.Sounds.WHOOSH_1);
            });
            var chanceTween = this.game.add.tween(this._withText).to({
                y: this._originalPosition.y
            }, 500, Phaser.Easing.power2, true, 150);
            chanceTween.onStart.add(function () {
                _this._playWhoosh(250, BOOM.Sounds.WHOOSH_1);
            }, this);
            chanceTween.onUpdateCallback(function () {
                if (_this._withText.y + (_this._withText.height * 0.5) < _this._packedText.y + (_this._packedText.height * 0.5)) {
                    BOOM.GameManager.instance.tweens.remove(chanceTween);
                    BOOM.GameManager.instance.tweens.remove(bestTween);
                    chanceHit = true;
                    _this._addBestAndChance();
                }
            }, this);
            chanceTween.onComplete.add(function () {
                if (!chanceHit) {
                    _this._addBestAndChance();
                }
            });
            var offHit = false;
            var winningTween = this.game.add.tween(this._amountText).to({
                y: this._originalPosition.y
            }, 500, Phaser.Easing.power2, true, 300);
            winningTween.onStart.add(function () {
                _this._playWhoosh(250, BOOM.Sounds.WHOOSH_1);
            });
            winningTween.onUpdateCallback(function () {
                if (_this._amountText.y + (_this._amountText.height * 0.5) < _this._groupedSprites.y + (_this._groupedSprites.height * 0.5)) {
                    BOOM.GameManager.instance.tweens.remove(winningTween);
                    offHit = true;
                    _this._offHit();
                }
            }, this);
            winningTween.onComplete.add(function () {
                if (!offHit) {
                    _this._offHit();
                }
            });
            var amountText = false;
            var amountTextTween = this.game.add.tween(this._topPrizesText).to({
                y: this._originalPosition.y
            }, 500, Phaser.Easing.power2, true, 450);
            amountTextTween.onStart.add(function () {
                _this._playWhoosh(250, BOOM.Sounds.WHOOSH_2);
            }, this);
            amountTextTween.onUpdateCallback(function () {
                if (_this._topPrizesText.y + (_this._topPrizesText.height * 0.5) < _this._groupedSprites.y + (_this._groupedSprites.height * 0.5)) {
                    BOOM.GameManager.instance.tweens.remove(amountTextTween);
                    amountText = true;
                    _this._amountHit();
                }
            }, this);
            amountTextTween.onComplete.add(function () {
                if (!amountText) {
                    _this._amountHit();
                }
            });
        };
        ChanceAmountText.prototype._playWhoosh = function (delay, sound) {
            var t = BOOM.GameManager.instance.time.create(true);
            t.add(delay, function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, sound, BOOM.SoundChannels.BACKGROUND);
            }, this);
            t.start();
        };
        ChanceAmountText.prototype._addBestAndChance = function () {
            this._groupedSprites.add(this._packedText);
            this._groupedSprites.add(this._withText);
            this._packedText.position.set(0, 0);
            this._withText.x = 0;
            this._withText.y = (this._packedText.y + this._spacing);
            this._addTooBunchedGroup(40);
        };
        ChanceAmountText.prototype._offHit = function () {
            this._groupedSprites.add(this._amountText);
            this._amountText.x = 0;
            this._amountText.y = this._withText.y + this._spacing;
            this._addTooBunchedGroup(20);
        };
        ChanceAmountText.prototype._amountHit = function () {
            this._groupedSprites.add(this._topPrizesText);
            this._topPrizesText.x = 0;
            this._topPrizesText.y = this._amountText.y + this._spacing;
            this._addTooBunchedGroup(0, true);
        };
        ChanceAmountText.prototype._addTooBunchedGroup = function (newOffset, final) {
            var _this = this;
            if (final === void 0) { final = false; }
            var currentPosition = this._groupedSprites.y;
            this._offset = newOffset;
            this._clearActiveTween();
            var impactTween = this.game.add.tween(this._groupedSprites).to({
                y: currentPosition - 20
            }, 100, Phaser.Easing.Quadratic.Out, true);
            this._groupActiveTween = impactTween;
            impactTween.onComplete.add(function () { impactTweenHang.start(); _this._groupActiveTween = impactTweenHang; });
            var impactTweenHang = this.game.add.tween(this._groupedSprites).to({
                y: currentPosition - 22
            }, 100, Phaser.Easing.Quadratic.Out, false);
            impactTweenHang.onComplete.add(function () { impactTweenHang2.start(); _this._groupActiveTween = impactTweenHang2; });
            var impactTweenHang2 = this.game.add.tween(this._groupedSprites).to({
                y: currentPosition - 19
            }, 100, Phaser.Easing.Quadratic.Out, false);
            impactTweenHang2.onComplete.add(function () { backTooOffset.start(); _this._groupActiveTween = backTooOffset; });
            var backTooOffset = this.game.add.tween(this._groupedSprites).to({
                y: this._originalPosition.y + this._offset
            }, 400, Phaser.Easing.Quadratic.Out, false);
            backTooOffset.onComplete.add(function () {
                if (final) {
                    _this._setUpIldeTimer();
                }
            });
        };
        ChanceAmountText.prototype._clearActiveTween = function () {
            if (this._groupActiveTween != undefined) {
                BOOM.GameManager.instance.tweens.remove(this._groupActiveTween);
            }
        };
        ChanceAmountText.prototype._setUpIldeTimer = function () {
            this._setUpIdle();
            this._idleTimerEvent = BOOM.GameManager.instance.time.events.loop(4000, this._setUpIdle, this);
        };
        ChanceAmountText.prototype._clearIdleTimer = function () {
            if (this._idleTimerEvent != undefined) {
                BOOM.GameManager.instance.time.events.remove(this._idleTimerEvent);
            }
            this._clearIdleTweens();
        };
        ChanceAmountText.prototype._setUpIdle = function (scale) {
            if (scale === void 0) { scale = 1.03; }
            for (var i = 0; i < this._spriteArrays.length; i++) {
                this._idleAnimaiton(275 * i, this._spriteArrays[i], scale);
            }
        };
        ChanceAmountText.prototype._clearIdleTweens = function () {
            for (var i = 0; i < this._idleTweens.length; i++) {
                BOOM.GameManager.instance.tweens.remove(this._idleTweens[i]);
            }
            this._idleTweens = [];
        };
        ChanceAmountText.prototype._removeFromIdleArray = function (tween) {
            for (var i = 0; i < this._idleTweens.length; i++) {
                if (tween == this._idleTweens[i]) {
                    BOOM.GameManager.instance.tweens.remove(tween);
                    this._idleTweens.splice(i, 1);
                    break;
                }
            }
        };
        ChanceAmountText.prototype._idleAnimaiton = function (delay, object, scaleSize) {
            var _this = this;
            if (scaleSize === void 0) { scaleSize = 1.03; }
            var scale = this.game.add.tween(object.scale).to({
                x: scaleSize
            }, 150, Phaser.Easing.Quadratic.InOut, true, delay);
            this._idleTweens.push(scale);
            scale.onComplete.add(function () {
                scale2.start();
                _this._removeFromIdleArray(scale);
                _this._idleTweens.push(scale2);
            }, this);
            var scale2 = this.game.add.tween(object.scale).to({
                x: 1
            }, 150, Phaser.Easing.Quadratic.InOut, false, 0);
            scale2.onComplete.add(function () {
                _this._removeFromIdleArray(scale2);
            }, this);
        };
        return ChanceAmountText;
    }(BOOM.GameGroup));
    BOOM.ChanceAmountText = ChanceAmountText;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var MainGameGroup = (function (_super) {
        __extends(MainGameGroup, _super);
        function MainGameGroup() {
            var _this = this;
            _super.call(this);
            this._logoGroup = null;
            this._logoFast = null;
            this._logoAmount = null;
            this._logoGlow = null;
            this._logoShimmer = null;
            this._chanceAmountText = null;
            this._instructions = null;
            this._mainGamePanelGroup = null;
            this._logoGroup = new Phaser.Group(this.game);
            this.addChild(this._logoGroup);
            this._logoGroup.position.setTo(227, 153);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this._logoGlow = this.game.make.sprite(0, 0, "masterSS", "logo_glow");
            this._logoGlow.anchor.setTo(.5, .5);
            this._logoGlow.alpha = 0;
            this._logoGroup.addChild(this._logoGlow);
            this._logoFast = this.game.make.sprite(0, -479, "masterSS", "logo_fast");
            this._logoFast.anchor.setTo(.5, .5);
            this._logoGroup.addChild(this._logoFast);
            this._logoAmount = this.game.make.sprite(0, -473, "masterSS", "logo_300");
            this._logoAmount.anchor.setTo(.5, .5);
            this._logoGroup.addChild(this._logoAmount);
            this._chanceAmountText = new BOOM.ChanceAmountText();
            this.add(this._chanceAmountText);
            this._logoShimmer = this.game.add.sprite(0, 7, 'masterSS', 'brand_shimmer_1');
            this._logoShimmer.anchor.setTo(0.5, 0.5);
            this._logoShimmer.alpha = 0;
            this._logoShimmer.animations.add('shimmer', Phaser.Animation.generateFrameNames('brand_shimmer_', 1, 10, '', 0), 30, false);
            this._logoShimmer.animations.play('shimmer');
            this._logoShimmer.animations.getAnimation('shimmer').onComplete.add(function () {
                _this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                    _this._logoShimmer.animations.play('shimmer');
                });
            });
            this._logoGroup.addChild(this._logoShimmer);
            this._instructions = this.game.make.sprite(this.game.width / 2, 614, "masterSS", "textInstructionsA");
            this._instructions.anchor.setTo(.5, .5);
            this._instructions.alpha = 0;
            this.addChild(this._instructions);
            this._mainGamePanelGroup = new BOOM.MainGamePanelGroup();
            this._mainGamePanelGroup.position.setTo(772, 960);
            this.addChild(this._mainGamePanelGroup);
        }
        MainGameGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add("mainGameStart", this._mainGameTransitionIn, this);
            BOOM.SignalManager.instance.add("mainGameEnd", this._mainGameTransitionOut, this);
        };
        MainGameGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove("mainGameStart", this._mainGameTransitionIn, this);
            BOOM.SignalManager.instance.remove("mainGameEnd", this._mainGameTransitionOut, this);
        };
        MainGameGroup.prototype._mainGameTransitionIn = function () {
            var logoAmountTween = this.game.add.tween(this._logoAmount).to({
                y: 7
            }, 500, Phaser.Easing.Quintic.Out, true);
            var logoFastTween = this.game.add.tween(this._logoFast).to({
                y: 0
            }, 500, Phaser.Easing.Quintic.Out, true, 50);
            var logoGlowTween = this.game.add.tween(this._logoGlow).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 1000);
            var shimmerTween = this.game.add.tween(this._logoShimmer).to({
                alpha: 1
            }, 1000, Phaser.Easing.Linear.None, true, 2000);
            var instructionsTween = this.game.add.tween(this._instructions).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 1000);
            var mainGamePanelTween = this.game.add.tween(this._mainGamePanelGroup).to({
                y: 315
            }, 500, Phaser.Easing.Back.Out, true, 500);
            this._chanceAmountText.intro();
            mainGamePanelTween.onComplete.add(function () {
                BOOM.SignalManager.instance.dispatch('startInactive');
            });
        };
        MainGameGroup.prototype._mainGameTransitionOut = function () {
            var _this = this;
            this._logoShimmer.destroy();
            BOOM.SignalManager.instance.dispatch('hideSoundButton');
            var logoGroupOutTween = this.game.add.tween(this._logoGroup).to({
                x: -320
            }, 500, Phaser.Easing.Back.Out, true);
            logoGroupOutTween.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_2, BOOM.SoundChannels.BACKGROUND);
            });
            var bestChanceGroupOutTween = this.game.add.tween(this._chanceAmountText).to({
                x: -320
            }, 500, Phaser.Easing.Back.Out, true, 100);
            var mainGamePanelMoveTween = this.game.add.tween(this._mainGamePanelGroup).to({
                x: 335
            }, 550, Phaser.Easing.Quadratic.InOut, true, 50);
            mainGamePanelMoveTween.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_1, BOOM.SoundChannels.BACKGROUND);
            });
            mainGamePanelMoveTween.onComplete.add(function () {
                var elasticBounceOnEnd = _this.game.add.tween(_this._mainGamePanelGroup).to({
                    x: [346, 339, 341]
                }, 700, Phaser.Easing.Quadratic.Out, true);
                elasticBounceOnEnd.interpolation(Phaser.Math.catmullRomInterpolation);
                BOOM.SignalManager.instance.dispatch("endGameShow");
            });
        };
        return MainGameGroup;
    }(BOOM.GameGroup));
    BOOM.MainGameGroup = MainGameGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var EndGameGroup = (function (_super) {
        __extends(EndGameGroup, _super);
        function EndGameGroup() {
            var _this = this;
            _super.call(this);
            this._endGamePanel = null;
            this._finishButton = null;
            this._finishButtonAlt = null;
            this._finishButtonTweenA = null;
            this._finishButtonTweenB = null;
            this._endMessage = null;
            this._line = null;
            this._youWon = null;
            this._endAmount = null;
            this._starAnim = null;
            this._inactive = false;
            this._endGamePanel = this.game.add.sprite(0, 0, "masterSS", "end_game_panel");
            this._endGamePanel.anchor.setTo(.5, .5);
            this.addChild(this._endGamePanel);
            this._finishButtonAlt = this.game.make.sprite(0, 160, "masterSS", "finish_button_rollover");
            this._finishButtonAlt.anchor.setTo(.5, .5);
            this.addChild(this._finishButtonAlt);
            this._finishButton = this.game.add.sprite(0, 160, "masterSS", "finish_button");
            this._finishButton.anchor.setTo(.5, .5);
            this.addChild(this._finishButton);
            this._finishButton.events.onInputDown.add(function () {
                if (_this._finishButton.inputEnabled) {
                    _this._finishButton.inputEnabled = false;
                    _this._killXFadeTweens();
                    _this._disableFinishButton();
                    com.camelot.core.IWG.ame('closeGame');
                    _this._finishButton.frameName = "finish_button_rollover";
                }
            });
            this._finishButton.events.onInputOver.add(function () {
                _this._killXFadeTweens();
                _this._finishButton.frameName = "finish_button_rollover";
            });
            this._finishButton.events.onInputOut.add(function () {
                _this._finishButtonXFade();
                _this._finishButton.frameName = "finish_button";
            });
            this._finishButton.events.onInputDown.add(function () {
                _this._killXFadeTweens();
                _this._finishButton.frameName = "finish_button_rollover";
            });
            this._disableFinishButton();
            var isWager = com.camelot.core.IWG.ame('get', { vars: ['iwgIsWager'] });
            if (isWager) {
                if (BOOM.TicketManager.instance.getTicket().isWinner) {
                    this._createWin();
                }
                else {
                    this._createLose();
                }
            }
            else {
                this._createTrial();
            }
        }
        EndGameGroup.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('endGameShow', this._show, this);
        };
        EndGameGroup.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('endGameShow', this._show, this);
        };
        EndGameGroup.prototype._disableFinishButton = function () {
            this._finishButton.inputEnabled = false;
            this._finishButton.tint = 0xc3c3c3;
            this._killXFadeTweens();
        };
        EndGameGroup.prototype._enableFinishButton = function () {
            this._finishButton.inputEnabled = true;
            this._finishButton.input.useHandCursor = true;
            this._finishButton.tint = 0xffffff;
            this._finishButtonXFade();
        };
        EndGameGroup.prototype._createWin = function () {
            var _this = this;
            this._starAnim = this.game.add.sprite(0, 0, "sparkleSS", "animSparklesExplode_00000", this);
            this._starAnim.anchor.setTo(0.5, 0.5);
            this._starAnim.visible = false;
            var anim = this._starAnim.animations.add('stars', Phaser.Animation.generateFrameNames('animSparklesExplode_', 0, 23, '', 5), 30, false);
            anim.onComplete.add(function () {
                _this._starAnim.visible = false;
            });
            this._endMessage = this.game.add.sprite(0, -224, "masterSS", "panelTextCongrats");
            this._endMessage.anchor.setTo(.5, .5);
            this.addChild(this._endMessage);
            this._line = this.game.add.sprite(0, -192, "masterSS", "panelDetailLine");
            this._line.anchor.setTo(.5, .5);
            this.addChild(this._line);
            this._youWon = this.game.add.sprite(0, -64, "masterSS", "panelTextYouWon");
            this._youWon.anchor.setTo(.5, .5);
            this.addChild(this._youWon);
            var startAmount = null;
            if (BOOM.TicketManager.instance.getTicket().amount <= 40) {
                startAmount = BOOM.CurrencyManager.instance.formatCurrency(BOOM.TicketManager.instance.getTicket().amount, true);
            }
            else {
                startAmount = BOOM.CurrencyManager.instance.formatCurrency(0, true);
            }
            this._endAmount = this.game.add.bitmapText(0, 20, "big_font-export", startAmount, 50);
            this._endAmount.anchor.setTo(.5, .5);
            this.addChild(this._endAmount);
        };
        EndGameGroup.prototype._createLose = function () {
            this._endMessage = this.game.add.sprite(0, -55, "masterSS", "better_luck");
            this._endMessage.anchor.setTo(0.5, 0.5);
            this.addChild(this._endMessage);
        };
        EndGameGroup.prototype._createTrial = function () {
            this._endMessage = this.game.add.sprite(0, -55, "masterSS", "panelTextThanks");
            this._endMessage.anchor.setTo(0.5, 0.5);
            this.addChild(this._endMessage);
        };
        EndGameGroup.prototype._finalBankCheck = function () {
            var rawBank = com.camelot.core.IWG.ame('bank', { balance: 'currentAmount', raw: true });
            if (rawBank !== BOOM.TicketManager.instance.getTicket().amount) {
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
                    textField.text = BOOM.CurrencyManager.instance.formatCurrency(Math.round(counter), true);
                    textField.updateTransform();
                    if (oU !== null) {
                        oU.bind(oCS)();
                    }
                    if (counter > targetValue) {
                        textField.text = BOOM.CurrencyManager.instance.formatCurrency(targetValue, true);
                        BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.STOP_AUDIO, BOOM.Sounds.COUNT_UP, BOOM.SoundChannels.FX_SOUNDS);
                        if (oC !== null) {
                            oC.bind(oCS)();
                        }
                        this.game.time.events.remove(timer);
                    }
                }, this, onUpdate, onComplete, onCompleteScope);
                timer.timer.start();
            }
            else {
                textField.text = BOOM.CurrencyManager.instance.formatCurrency(targetValue, true);
                onComplete();
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.STOP_AUDIO, BOOM.Sounds.COUNT_UP, BOOM.SoundChannels.FX_SOUNDS);
            }
        };
        EndGameGroup.prototype._show = function () {
            var _this = this;
            this._finalBankCheck();
            var moveInTween = this.game.add.tween(this).to({
                y: 317
            }, 550, Phaser.Easing.Quadratic.InOut, true);
            moveInTween.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_1, BOOM.SoundChannels.BACKGROUND);
            });
            moveInTween.onComplete.add(function () {
                var elasticBounce = _this.game.add.tween(_this).to({
                    y: [323, 319, 320]
                }, 800, Phaser.Easing.Quadratic.Out, true);
                if (com.camelot.core.IWG.ame('get', { vars: ['iwgIsWager'] })) {
                    if (BOOM.TicketManager.instance.getTicket().isWinner) {
                        BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.COUNT_UP, BOOM.SoundChannels.FX_SOUNDS);
                        _this.createCounter(_this._endAmount, 0, BOOM.TicketManager.instance.getTicket().amount, 130, null, null, function () {
                            _this._starAnim.visible = true;
                            _this._starAnim.animations.play('stars');
                            BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.BONUS_SPARKLE, BOOM.SoundChannels.FX_SOUNDS);
                            BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.END_WIN, BOOM.SoundChannels.FX_SOUNDS);
                            _this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                                _this._fadeButton();
                            });
                        }, null, true);
                    }
                    else {
                        BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.END_LOSE, BOOM.SoundChannels.FX_SOUNDS);
                        _this._fadeButton();
                    }
                }
                else {
                    _this._fadeButton();
                    BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.END_LOSE, BOOM.SoundChannels.FX_SOUNDS);
                }
            });
        };
        EndGameGroup.prototype._fadeButton = function () {
            this._enableFinishButton();
        };
        EndGameGroup.prototype._finishButtonXFade = function () {
            var _this = this;
            this._inactive = false;
            this._finishButtonTweenA = this.game.add.tween(this._finishButton).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, true).delay(750);
            this._finishButtonTweenB = this.game.add.tween(this._finishButton).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, false).delay(1000);
            this._finishButtonTweenA.onComplete.add(function () {
                if (!_this._inactive) {
                    _this._finishButtonTweenB.start();
                }
            });
            this._finishButtonTweenB.onComplete.add(function () {
                if (!_this._inactive) {
                    _this._finishButtonTweenA.start();
                }
            });
        };
        EndGameGroup.prototype._killXFadeTweens = function () {
            if (this._finishButtonTweenA != null) {
                this._finishButtonTweenA.stop();
                this._finishButtonTweenA = null;
            }
            if (this._finishButtonTweenB != null) {
                this._finishButtonTweenB.stop();
                this._finishButtonTweenB = null;
            }
            this._finishButton.alpha = 1;
            this._finishButton.frameName = "finish_button";
            this._inactive = true;
        };
        return EndGameGroup;
    }(BOOM.GameGroup));
    BOOM.EndGameGroup = EndGameGroup;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SplashGroup = (function (_super) {
        __extends(SplashGroup, _super);
        function SplashGroup() {
            var _this = this;
            _super.call(this);
            this._logo = null;
            this._logoShimmer = null;
            this._playButton = null;
            this._playButtonAlt = null;
            this._playButtonTweenA = null;
            this._playButtonTweenB = null;
            this._packedWithText = null;
            this._topprizes = null;
            this._groupedText = null;
            this._bestCurrentTween = null;
            this._amountCurrentTween = null;
            this._inactive = false;
            this._groupedTween = null;
            this.endYPosition = 0;
            this._logo = this.game.make.sprite(this.game.width / 2, 192, "masterSS", "splash_logo");
            this._logo.anchor.setTo(.5, .5);
            this.addChild(this._logo);
            this.endYPosition = 535;
            this._logoShimmer = this.game.add.sprite(this.game.width / 2, 192, 'masterSS', 'splash_brand_shimmer_1');
            this._logoShimmer.anchor.setTo(0.5, 0.5);
            this._logoShimmer.animations.add('shimmer', Phaser.Animation.generateFrameNames('splash_brand_shimmer_', 1, 11, '', 0), 30, false);
            this._logoShimmer.animations.play('shimmer');
            this._logoShimmer.animations.getAnimation('shimmer').onComplete.add(function () {
                _this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                    _this._logoShimmer.animations.play('shimmer');
                });
            });
            this.addChild(this._logoShimmer);
            this._playButtonAlt = this.game.make.sprite(this.game.width / 2, 416, "masterSS", "buttonPlay_rollover");
            this._playButtonAlt.anchor.setTo(.5, .5);
            this.addChild(this._playButtonAlt);
            this._playButton = this.game.make.sprite(this.game.width / 2, 416, "masterSS", "buttonPlay");
            this._playButton.anchor.setTo(.5, .5);
            this._disablePlayButton();
            this._playButton.events.onInputDown.add(function () {
                if (_this._playButton.inputEnabled) {
                    _this._playButton.inputEnabled = false;
                    _this._playButton.frameName = "buttonPlay";
                    BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.PLAY, BOOM.SoundChannels.BACKGROUND);
                    _this._playButton.frameName = "buttonPlay_rollover";
                    _this._killPlayButtonTweens();
                    _this._transitionOut();
                }
            }, this);
            this._playButton.events.onInputOver.add(function () {
                _this._killPlayButtonTweens();
                _this._playButton.frameName = "buttonPlay_rollover";
            });
            this._playButton.events.onInputOut.add(function () {
                _this._killPlayButtonTweens();
                _this._playButton.frameName = "buttonPlay";
                _this._playButtonXFadeTween();
            });
            this.addChild(this._playButton);
            this._packedWithText = this.game.make.sprite(this.game.width / 2, 768, "masterSS", "splash_packed_with");
            this._packedWithText.anchor.setTo(.5, .5);
            this.addChild(this._packedWithText);
            this._topprizes = this.game.make.sprite(this.game.width / 2, 768, "masterSS", "splash_300_top_prizes");
            this._topprizes.anchor.setTo(.5, .5);
            this.addChild(this._topprizes);
            this._textIntro();
            this._groupedText = new Phaser.Group(BOOM.GameManager.instance);
            this.add(this._groupedText);
        }
        SplashGroup.prototype._textIntro = function () {
            var _this = this;
            var delay = 1000;
            var delayUntilSecond = 125;
            var bestIntro = BOOM.GameManager.instance.add.tween(this._packedWithText).to({
                y: this.endYPosition + 10
            }, 300, Phaser.Easing.Quadratic.Out, true, delay);
            bestIntro.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_1, BOOM.SoundChannels.BACKGROUND);
            });
            this._bestCurrentTween = bestIntro;
            bestIntro.onComplete.add(function () {
                bestIntro2.start();
                _this._bestCurrentTween = bestIntro2;
            });
            var timer = BOOM.GameManager.instance.time.create(true);
            timer.add(delay + delayUntilSecond, function () {
                _this._winningTextIntro();
            }, this);
            timer.start();
            var bestIntro2 = BOOM.GameManager.instance.add.tween(this._packedWithText).to({
                y: this.endYPosition + 16,
            }, delayUntilSecond, Phaser.Easing.Quadratic.In, false);
            bestIntro2.interpolation(Phaser.Math.catmullRomInterpolation);
        };
        SplashGroup.prototype._winningTextIntro = function () {
            var _this = this;
            var endPoint = this._packedWithText.y;
            var bestIntro = BOOM.GameManager.instance.add.tween(this._topprizes).to({
                y: this.endYPosition + 6
            }, 250, Phaser.Easing.power2, true, 0);
            bestIntro.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_1, BOOM.SoundChannels.BACKGROUND);
            });
            bestIntro.onComplete.add(function () {
                _this._crash();
            });
            this._amountCurrentTween = bestIntro;
        };
        SplashGroup.prototype._crash = function () {
            var _this = this;
            this._clearBestTweens();
            this._groupedText.position.set(this._packedWithText.x, this._packedWithText.y);
            this._groupedText.add(this._packedWithText);
            this._packedWithText.position.set(0, 0);
            this._groupedText.add(this._topprizes);
            this._topprizes.position.set(0, this._packedWithText.y);
            var crash = BOOM.GameManager.instance.add.tween(this._groupedText).to({
                y: this.endYPosition - 15
            }, 300, Phaser.Easing.Back.Out, true);
            this._groupedTween = crash;
            crash.onComplete.add(function () {
                toPosition.start();
                _this._groupedTween = toPosition;
                _this._enablePlayButton();
            });
            var toPosition = BOOM.GameManager.instance.add.tween(this._groupedText).to({
                y: this.endYPosition
            }, 400, Phaser.Easing.Back.Out, false);
        };
        SplashGroup.prototype._clearBestTweens = function () {
            if (this._bestCurrentTween != undefined) {
                BOOM.GameManager.instance.tweens.remove(this._bestCurrentTween);
            }
        };
        SplashGroup.prototype._clearAmountTweens = function () {
            if (this._amountCurrentTween != undefined) {
                BOOM.GameManager.instance.tweens.remove(this._amountCurrentTween);
            }
        };
        SplashGroup.prototype._clearTweensAndDefaultPosition = function () {
            this._clearBestTweens();
            this._clearAmountTweens();
            if (this._groupedTween != undefined) {
                BOOM.GameManager.instance.tweens.remove(this._groupedTween);
            }
            this._groupedText.position.set(this.game.width * 0.5, this.endYPosition);
            this._groupedText.add(this._packedWithText);
            this._groupedText.add(this._topprizes);
            this._packedWithText.position.set(0, 0);
            this._topprizes.position.set(0, (this._packedWithText.y + (this._packedWithText.height * 0.5) + (this._topprizes.height * 0.5) + 0));
        };
        SplashGroup.prototype._disablePlayButton = function () {
            this._playButton.inputEnabled = false;
            this._playButton.tint = 0xc3c3c3;
            this._killPlayButtonTweens();
        };
        SplashGroup.prototype._enablePlayButton = function () {
            this._playButton.inputEnabled = true;
            this._playButton.input.useHandCursor = true;
            this._playButton.tint = 0xffffff;
            this._playButtonXFadeTween();
        };
        SplashGroup.prototype._transitionOut = function () {
            var _this = this;
            this._logoShimmer.destroy();
            this._playButtonAlt.destroy();
            var playButtonFadeOutTween = this.game.add.tween(this._playButton).to({
                alpha: 0
            }, 400, Phaser.Easing.Linear.None, true);
            playButtonFadeOutTween.onComplete.add(function () {
                _this._playButton.destroy();
            });
            var logoLaunchUpTween = this.game.add.tween(this._logo).to({
                y: -320
            }, 500, Phaser.Easing.Back.In, true, 450);
            logoLaunchUpTween.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_2, BOOM.SoundChannels.BACKGROUND);
            });
            var bestChanceOfLaunchDownTween = this.game.add.tween(this._packedWithText).to({
                y: 350
            }, 400, Phaser.Easing.Back.In, true, 1200);
            bestChanceOfLaunchDownTween.onStart.add(function () {
                _this._clearTweensAndDefaultPosition();
            });
            var winningLaunchDownTween = this.game.add.tween(this._topprizes).to({
                y: 350
            }, 400, Phaser.Easing.Back.In, true, 1000);
            bestChanceOfLaunchDownTween.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_1, BOOM.SoundChannels.BACKGROUND);
            });
            winningLaunchDownTween.onStart.add(function () {
                BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.PLAY_AUDIO, BOOM.Sounds.WHOOSH_1, BOOM.SoundChannels.BACKGROUND);
            });
            bestChanceOfLaunchDownTween.onComplete.add(function () {
                _this.destroy();
                BOOM.SignalManager.instance.dispatch("mainGameStart");
            });
        };
        SplashGroup.prototype._playButtonXFadeTween = function () {
            var _this = this;
            this._inactive = false;
            this._playButtonTweenA = this.game.add.tween(this._playButton).to({
                alpha: 0
            }, 500, Phaser.Easing.Linear.None, true).delay(750);
            this._playButtonTweenB = this.game.add.tween(this._playButton).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, false).delay(1000);
            this._playButtonTweenA.onComplete.add(function () {
                if (!_this._inactive) {
                    _this._playButtonTweenB.start();
                }
            });
            this._playButtonTweenB.onComplete.add(function () {
                if (!_this._inactive) {
                    _this._playButtonTweenA.start();
                }
            });
        };
        SplashGroup.prototype._killPlayButtonTweens = function () {
            if (this._playButtonTweenA != null) {
                this._playButtonTweenA.stop();
                this._playButtonTweenA = null;
            }
            if (this._playButtonTweenB != null) {
                this._playButtonTweenB.stop();
                this._playButtonTweenB = null;
            }
            this._playButton.alpha = 1;
            this._playButton.frameName = "buttonPlay";
            this._inactive = true;
        };
        return SplashGroup;
    }(BOOM.GameGroup));
    BOOM.SplashGroup = SplashGroup;
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
            var _this = this;
            this._div = document.createElement('div');
            this._div.id = "pauseOverlay";
            var pauseIcon = com.camelot.core.iwgLoadQ.images.pause;
            pauseIcon.id = 'pauseIcon';
            var scaleFactor = window.innerHeight / 640;
            pauseIcon.style.width = 192 * scaleFactor + "px";
            var IWGholder = document.getElementById('IWGholder');
            IWGholder.appendChild(this._div);
            this._div.appendChild(pauseIcon);
            BOOM.GameManager.instance.stage.disableVisibilityChange = false;
            BOOM.GameManager.instance.onPause.add(function () {
                _this._show();
            }, this);
            BOOM.GameManager.instance.onResume.add(function () {
                _this._hide();
            }, this);
        };
        Pause.prototype._show = function () {
            this._div.style.display = "block";
            this._div.style.opacity = '1';
            var shuffleButton = document.getElementById('pauseIcon');
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
    var Sound = (function (_super) {
        __extends(Sound, _super);
        function Sound() {
            _super.call(this);
            this._soundButton = null;
            this._isMuted = false;
            this._enabled = false;
            this._init();
        }
        Object.defineProperty(Sound.prototype, "enabled", {
            set: function (bool) {
                this._enabled = bool;
                if (bool) {
                    this._soundButton.inputEnabled = true;
                    this._soundButton.input.useHandCursor = true;
                }
                else {
                    this._soundButton.inputEnabled = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Sound.prototype.subscribeSignals = function () {
            BOOM.SignalManager.instance.add('hideSoundButton', this._hide, this);
        };
        Sound.prototype.unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('hideSoundButton', this._hide, this);
        };
        Sound.prototype._init = function () {
            var _this = this;
            this._soundButton = this.game.add.sprite(0, -20, "masterSS", "sound_button_on", this);
            this._soundButton.anchor.setTo(0.5, 0.5);
            this._soundButton.inputEnabled = false;
            this._soundButton.events.onInputUp.add(function () {
                if (_this._enabled) {
                    if (_this._soundButton.getBounds().contains(_this.game.input.mousePointer.x, _this.game.input.mousePointer.y) ||
                        _this.game.input.mousePointer.x === -1) {
                        BOOM.SignalManager.instance.dispatch(BOOM.AudioManager.MUTE_ALL_CHANNELS);
                        if (_this._isMuted) {
                            _this._soundButton.frameName = "sound_button_on";
                            _this._isMuted = false;
                        }
                        else {
                            _this._soundButton.frameName = "buttonAudio_Off";
                            _this._isMuted = true;
                        }
                    }
                }
            });
        };
        Sound.prototype._hide = function () {
            this.game.add.tween(this._soundButton).to({ alpha: 0 }, 300, "Linear", true);
            this._enabled = false;
        };
        return Sound;
    }(BOOM.GameGroup));
    BOOM.Sound = Sound;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var CurrencyManager = (function () {
        function CurrencyManager(currency, useISO, useMinorIfPresent) {
            this._selectedCurrency = null;
            this._useISOCode = null;
            this._useMinorIfPresent = null;
            this._selectedCurrencyData = null;
            if (CurrencyManager.instance === null) {
                CurrencyManager.instance = this;
            }
            else {
                throw new Error("Cannot make 2 CurrencyManagers, use .instance instead.");
            }
            if (this._checkCurrencySupport(currency.toUpperCase())) {
                this._selectedCurrency = currency.toUpperCase();
            }
            else {
                this._selectedCurrency = "GBP";
                console.warn("Currency '", currency.toUpperCase(), "' not found, defaulting to 'GBP'.");
            }
            this._useISOCode = useISO;
            this._useMinorIfPresent = useMinorIfPresent;
            this._selectedCurrencyData = this._getCurrencyData(this._selectedCurrency);
        }
        CurrencyManager.prototype._checkCurrencySupport = function (currency) {
            for (var i = 0; i < CurrencyManager.CURRENCY_CODES.length; i++) {
                if (CurrencyManager.CURRENCY_CODES[i].ISOCode === currency) {
                    return true;
                }
            }
            return false;
        };
        CurrencyManager.prototype._getCurrencyData = function (curr) {
            for (var i = 0; i < CurrencyManager.CURRENCY_CODES.length; i++) {
                if (CurrencyManager.CURRENCY_CODES[i].ISOCode === curr) {
                    return CurrencyManager.CURRENCY_CODES[i];
                }
            }
        };
        CurrencyManager.prototype.formatCurrency = function (value, ignoreDecimalsWherePossible) {
            var decimalPrecision = this._selectedCurrencyData.decimalPrecision;
            if (ignoreDecimalsWherePossible) {
                if (this._checkIsInt(value)) {
                    decimalPrecision = 0;
                }
            }
            var returnString = "";
            var preppedValue = this._prepNumbers(value, decimalPrecision, 3, this._selectedCurrencyData.majorDelimiter, this._selectedCurrencyData.minorDelimiter);
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
        CurrencyManager.prototype._prepNumbers = function (numIn, n, x, s, c) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = numIn.toFixed(Math.max(0, ~~n));
            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };
        CurrencyManager.prototype._checkIsInt = function (value) {
            return typeof value === "number" &&
                isFinite(value) &&
                Math.floor(value) === value;
        };
        CurrencyManager.instance = null;
        CurrencyManager.DECIMAL_ZERO = 0;
        CurrencyManager.DECIMAL_ONE = 1;
        CurrencyManager.DECIMAL_TWO = 2;
        CurrencyManager.DECIMAL_THREE = 3;
        CurrencyManager.CURRENCY_CODES = [
            { country: "United Kingdom", currency: "Pound", ISOCode: "GBP", minorPresent: true, majorSymbol: "£", minorSymbol: "p", decimalPrecision: CurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "United States", currency: "Dollar", ISOCode: "USD", minorPresent: true, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: CurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Euro Member Countries", currency: "Euro", ISOCode: "EUR", minorPresent: false, majorSymbol: "€", minorSymbol: "", decimalPrecision: CurrencyManager.DECIMAL_TWO, majorPosition: "R", minorPosition: "", majorDelimiter: ".", minorDelimiter: "," },
            { country: "Japan", currency: "Yen", ISOCode: "JPY", minorPresent: false, majorSymbol: "¥", minorSymbol: "", decimalPrecision: CurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Mexico", currency: "Peso", ISOCode: "MXN", minorPresent: false, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: CurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." }
        ];
        return CurrencyManager;
    }());
    BOOM.CurrencyManager = CurrencyManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            this._background = null;
            this._refreshScale = 0;
            this._soundButton = null;
            this._mainGameGroup = null;
            this._endGameGroup = null;
            this._splashGroup = null;
            this.currencyManager = null;
        }
        MainGame.prototype.subscribeSignals = function () {
        };
        MainGame.prototype.unsubscribeSignals = function () {
        };
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            BOOM.Debug.instance.log('[states/MainGame.ts] [create] MainGame created!', BOOM.DEBUGTYPE.CORE);
            this.currencyManager = new BOOM.CurrencyManager("GBP", false, false);
            this._makeBackground();
            var pause = new BOOM.Pause();
            this._soundButton = new BOOM.Sound();
            var pos = new Phaser.Point(1070, 100);
            this._soundButton.position = pos;
            this._soundButton.enabled = true;
            this._splashGroup = new BOOM.SplashGroup();
            this._mainGameGroup = new BOOM.MainGameGroup();
            this._endGameGroup = new BOOM.EndGameGroup();
            this._endGameGroup.position.setTo(886, 960);
            this.add.existing(this._splashGroup);
            this.add.existing(this._mainGameGroup);
            this.add.existing(this._endGameGroup);
        };
        MainGame.prototype._makeBackground = function () {
            var bgImage = com.camelot.core.iwgLoadQ.images.background;
            var refDiv = document.getElementById('IWGholder');
            var canvas = document.createElement('canvas');
            canvas.width = 2048;
            canvas.height = 2048;
            var scaleDiv = document.createElement('div');
            var context = canvas.getContext('2d');
            canvas.id = 'background';
            scaleDiv.id = 'scaleDiv';
            scaleDiv.appendChild(canvas);
            refDiv.insertBefore(scaleDiv, document.getElementsByTagName('canvas')[0]);
            var w = com.camelot.core.IWG.ame('get', 'gameWidth');
            var h = com.camelot.core.IWG.ame('get', 'gameHeight');
            var scaleFactor = Number(Math.min(h / BOOM.GameManager.NATIVE_HEIGHT, w / BOOM.GameManager.NATIVE_WIDTH).toFixed(3));
            scaleDiv.style.transform = 'scale( ' + scaleFactor + ', ' + scaleFactor + ' )';
            var base_image = new Image();
            base_image.src = bgImage.src;
            base_image.onload = function () {
                context.drawImage(base_image, 0, 0);
                com.camelot.core.IWG.ame('killloader');
            };
        };
        MainGame.SPRITESHEET_ID = "game0";
        return MainGame;
    }(BOOM.GameState));
    BOOM.MainGame = MainGame;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameSignal = (function (_super) {
        __extends(GameSignal, _super);
        function GameSignal(signalName) {
            _super.call(this);
            this._signalId = null;
            this._signalActive = false;
            this._signalFired = false;
            this._listening = [];
            this._signalId = signalName;
            this._signalActive = false;
            this._signalFired = false;
            this._listening = [];
        }
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
            catch (e) {
                console.log(e);
            }
        };
        GameSignal.prototype.remove = function (listener, listeningContext) {
            this._listening.splice(this._listening.indexOf(listeningContext), 1);
            if (this.getNumListeners() === 0) {
                this._signalActive = false;
            }
            return _super.prototype.remove.call(this, listener, listeningContext);
        };
        GameSignal.prototype.dispatch = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            this._signalFired = true;
            _super.prototype.dispatch.apply(this, params);
        };
        GameSignal.prototype.getId = function () {
            return this._signalId;
        };
        GameSignal.prototype.isInUse = function () {
            return this._signalActive;
        };
        GameSignal.prototype.hasFired = function () {
            return this._signalFired;
        };
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
        SignalManager.prototype.add = function (identifier, listener, listeningContext, priority) {
            if (listeningContext === void 0) { listeningContext = null; }
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var added = false;
            this._signalArray.forEach(function (signal) {
                if (signal.getId() === identifier) {
                    signal.add(listener, listeningContext, priority, args);
                    added = true;
                }
            });
            if (!added) {
                var newSignal = new BOOM.GameSignal(identifier);
                this._signalArray.push(newSignal);
                newSignal.add.apply(newSignal, [listener, listeningContext, priority].concat(args));
                return true;
            }
            else {
                return false;
            }
        };
        SignalManager.prototype.remove = function (identifier, listener, listeningContext) {
            if (listeningContext === void 0) { listeningContext = null; }
            this._signalArray.forEach(function (signal) {
                if (signal.getId() === identifier) {
                    signal.remove(listener, listeningContext);
                    return true;
                }
            });
            return false;
        };
        SignalManager.prototype.dispatch = function (identifier) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            this._signalArray.forEach(function (signal) {
                if (signal.getId() === identifier) {
                    signal.dispatch.apply(signal, params);
                    return true;
                }
            });
            return false;
        };
        SignalManager.prototype.get = function (identifier) {
            var ret = null;
            this._signalArray.forEach(function (signal) {
                if (signal.getId() === identifier) {
                    ret = signal;
                }
            });
            return ret;
        };
        SignalManager.prototype.checkAllSignals = function () {
            var _this = this;
            this._signalArray.forEach(function (signal) {
                BOOM.Debug.instance.log("ID: " + signal.getId() + "\nActive: " + signal.isInUse() + "\nFired: " + signal.hasFired + "\n\n               Listening in: " + signal.getListeningContexts(), BOOM.DEBUGTYPE.DEBUG, _this);
            });
        };
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
            if (DebugController.instance === null) {
                DebugController.instance = this;
            }
            else {
                throw new Error("Cant make 2 DebugController, use .instance instead.");
            }
        }
        DebugController.prototype.log = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    if (this.ppreload) {
                        console.log('%c[PRELOAD],' + msg, "color: green");
                    }
                    break;
                case 'core':
                    if (this.pcore) {
                        console.log('%c[CORE],' + msg, "color: orange");
                    }
                    break;
                case 'animation':
                    if (this.panimation) {
                        console.log('%c[ANIMATION],' + msg, "color: blue");
                    }
                    break;
                case 'ticket':
                    if (this.pticket) {
                        console.log('%c[TICKET] ' + msg, "color: pink");
                    }
                    break;
                case 'error':
                    if (this.perror) {
                        console.log('%c[ERROR] ' + msg, "color: red");
                    }
                    break;
                case 'init':
                    if (this.perror) {
                        console.log('%c[INITIALISED] ' + msg, "color: magenta");
                    }
                    break;
                case 'debug':
                    if (this.perror) {
                        console.log('%c[DEBUG] ' + msg, "color: purple");
                    }
                    break;
                case 'general':
                default:
                    if (this.pgeneral) {
                        console.log('%c[GENERAL] ' + msg, "color: black");
                    }
                    break;
            }
        };
        DebugController.prototype.warn = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    if (this.ppreload) {
                        console.warn('%c[PRELOAD],' + msg, "color: green");
                    }
                    break;
                case 'core':
                    if (this.pcore) {
                        console.warn('%c[CORE],' + msg, "color: orange");
                    }
                    break;
                case 'animation':
                    if (this.panimation) {
                        console.warn('%c[ANIMATION],' + msg, "color: blue");
                    }
                    break;
                case 'ticket':
                    if (this.pticket) {
                        console.warn('%c[TICKET],' + msg, "color: pink");
                    }
                    break;
                case 'error':
                    if (this.perror) {
                        console.warn('%c[ERROR],' + msg, "color: red");
                    }
                    break;
                case 'init':
                    if (this.perror) {
                        console.warn('%c[INITIALISED],' + msg, "color: magenta");
                    }
                    break;
                case 'debug':
                    if (this.perror) {
                        console.warn('%c[DEBUG] ' + msg, "color: purple");
                    }
                    break;
                case 'general':
                default:
                    if (this.pgeneral) {
                        console.warn('%c[GENERAL],' + msg, "color: black");
                    }
                    break;
            }
        };
        DebugController.prototype.error = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    if (this.ppreload) {
                        console.error('%c[PRELOAD]' + msg, "color: green");
                    }
                    break;
                case 'core':
                    if (this.pcore) {
                        console.error('%c[CORE]' + msg, "color: orange");
                    }
                    break;
                case 'animation':
                    if (this.panimation) {
                        console.error('%c[ANIMATION]' + msg, "color: blue");
                    }
                    break;
                case 'ticket':
                    if (this.pticket) {
                        console.error('%c[TICKET]' + msg, "color: pink");
                    }
                    break;
                case 'error':
                    if (this.perror) {
                        console.error('%c[ERROR]' + msg, "color: red");
                    }
                    break;
                case 'init':
                    if (this.perror) {
                        console.error('%c[INITIALISED],' + msg, "color: magenta");
                    }
                    break;
                case 'debug':
                    if (this.perror) {
                        console.error('%c[DEBUG] ' + msg, "color: purple");
                    }
                    break;
                case 'general':
                default:
                    if (this.pgeneral) {
                        console.error('%c[GENERAL]' + msg, "color: black");
                    }
                    break;
            }
        };
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
        DebugController.prototype.setOff = function () {
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
        DebugController.prototype.setPreload = function () {
            if (this.ppreload) {
                console.log("%c[DEBUG] " + "Preloader messages turned off.", "color: gray");
                this.ppreload = false;
            }
            else {
                console.log("%c[DEBUG] " + "Preloader messages turned on.", "color: gray");
                this.ppreload = true;
            }
        };
        DebugController.prototype.setCore = function () {
            if (this.pcore) {
                console.log("%c[DEBUG] " + "Core messages turned off.", "color: gray");
                this.pcore = false;
            }
            else {
                console.log("%c[DEBUG] " + "Core messages turned on.", "color: gray");
                this.pcore = true;
            }
        };
        DebugController.prototype.setAnimation = function () {
            if (this.panimation) {
                console.log("%c[DEBUG] " + "Animation messages turned off.", "color: gray");
                this.panimation = false;
            }
            else {
                console.log("%c[DEBUG] " + "Animation messages turned on.", "color: gray");
                this.panimation = true;
            }
        };
        DebugController.prototype.setError = function () {
            if (this.perror) {
                console.log("%c[DEBUG] " + "Error messages turned off.", "color: gray");
                this.perror = false;
            }
            else {
                console.log("%c[DEBUG] " + "Error messages turned on.", "color: gray");
                this.perror = true;
            }
        };
        DebugController.prototype.setGeneral = function () {
            if (this.pgeneral) {
                console.log("%c[DEBUG] " + "General messages turned off.", "color: gray");
                this.pgeneral = false;
            }
            else {
                console.log("%c[DEBUG] " + "General messages turned on.", "color: gray");
                this.pgeneral = true;
            }
        };
        DebugController.prototype.setTicket = function () {
            if (this.pticket) {
                console.log("%c[DEBUG] " + "Ticket messages turned off.", "color: gray");
                this.pticket = false;
            }
            else {
                console.log("%c[DEBUG] " + "Ticket messages turned on.", "color: gray");
                this.pticket = true;
            }
        };
        DebugController.prototype.setInit = function () {
            if (this.pinit) {
                console.log("%c[DEBUG] " + "Init messages turned off.", "color: gray");
                this.pinit = false;
            }
            else {
                console.log("%c[DEBUG] " + "Init messages turned on.", "color: gray");
                this.pinit = true;
            }
        };
        DebugController.prototype.setDebug = function () {
            if (this.pinit) {
                console.log("%c[DEBUG] " + "Debug messages turned off.", "color: gray");
                this.pdebug = false;
            }
            else {
                console.log("%c[DEBUG] " + "Debug messages turned on.", "color: gray");
                this.pdebug = true;
            }
        };
        DebugController.instance = null;
        return DebugController;
    }());
    BOOM.DebugController = DebugController;
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
        }
        Debug.prototype.log = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.log(message, channel, scope);
        };
        Debug.prototype.warn = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.warn(message, channel, scope);
        };
        Debug.prototype.error = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.error(message, channel, scope);
        };
        Debug.instance = null;
        Debug.OFF = function () { Debug.instance.controller.setOff(); };
        Debug.ALL = function () { Debug.instance.controller.setAll(); };
        Debug.PRELOADER = function () { Debug.instance.controller.setPreload(); };
        Debug.CORE = function () { Debug.instance.controller.setCore(); };
        Debug.ANIMATIONS = function () { Debug.instance.controller.setAnimation(); };
        Debug.GENERAL = function () { Debug.instance.controller.setGeneral(); };
        Debug.TICKET = function () { Debug.instance.controller.setTicket(); };
        Debug.ERROR = function () { Debug.instance.controller.setError(); };
        Debug.INIT = function () { Debug.instance.controller.setInit(); };
        Debug.DEBUG = function () { Debug.instance.controller.setDebug(); };
        return Debug;
    }());
    BOOM.Debug = Debug;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var TicketManager = (function () {
        function TicketManager() {
            var thirdPartyData = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                thirdPartyData[_i - 0] = arguments[_i];
            }
            this.local = true;
            this._configObject = null;
            this._ticketObject = null;
            this._ticketIsLoaded = false;
            this._thirdPartyWrapper = null;
            this._requestLock = null;
            this._onRequestComplete = null;
            this._onRequestScope = null;
            BOOM.Debug.instance.log("TicketManager initialising.", BOOM.DEBUGTYPE.INIT);
            if (TicketManager.instance != null) {
                throw new Error("Ticket Manager is a singleton. Please use TicketManager.instance. ");
            }
            else {
                TicketManager.instance = this;
                this._thirdPartyWrapper = new (BOOM.ThirdPartyWrapper.bind.apply(BOOM.ThirdPartyWrapper, [void 0].concat(thirdPartyData)))();
            }
        }
        TicketManager.prototype.requestConfig = function (onComplete, scope) {
            if (!this._requestLock) {
                this._requestLock = true;
                this._onRequestComplete = onComplete;
                this._onRequestScope = scope;
                BOOM.Debug.instance.log("Request sent for configuration through TicketManager", BOOM.DEBUGTYPE.TICKET);
                this._thirdPartyWrapper.getConfig();
            }
            else {
                throw new Error("Cannot request config whilst another request is already in progress.");
            }
        };
        TicketManager.prototype.setConfig = function (conf) {
            if (this._requestLock) {
                this._configObject = conf;
                this._requestLock = false;
                this._onRequestComplete.bind(this._onRequestScope)();
            }
            else {
                throw new Error("Cannot set the config without doing it through a request.");
            }
        };
        TicketManager.prototype.getTicket = function () {
            if (this._ticketIsLoaded) {
                return this._ticketObject;
            }
            else {
                throw new Error("Cannot get ticket information because the ticket isn't loaded.");
            }
        };
        TicketManager.prototype.requestNewTicket = function (onComplete, scope) {
            if (!this._requestLock) {
                if (!this._ticketIsLoaded) {
                    this._requestLock = true;
                    this._onRequestComplete = onComplete;
                    this._onRequestScope = scope;
                    BOOM.Debug.instance.log("Ticket Manager request for ticket sent.", BOOM.DEBUGTYPE.TICKET);
                    this._thirdPartyWrapper.requestTicket();
                }
                else {
                    throw new Error("Cannot request a ticket whilst one is already loaded.");
                }
            }
            else {
                throw new Error("Cannot request ticket whilst the manager is already in use.");
            }
        };
        TicketManager.prototype.setTicket = function (ticket) {
            if (this._requestLock) {
                if (!this._ticketIsLoaded) {
                    BOOM.Debug.instance.log("Ticket manager ticket received.", BOOM.DEBUGTYPE.TICKET);
                    this._ticketObject = ticket;
                    this._ticketIsLoaded = true;
                    this._requestLock = false;
                    this._onRequestComplete.bind(this._onRequestScope)();
                }
                else {
                    throw new Error("Cannot set a ticket when one is already loaded. Please use requestNewTicket().");
                }
            }
            else {
                throw new Error("Cannot set the ticket manually. Please use requestNewTicket().");
            }
        };
        TicketManager.prototype.completeTicket = function () {
            if (!this._requestLock) {
                if (this._ticketIsLoaded) {
                    BOOM.Debug.instance.log("Ticket Manager complete request sent.", BOOM.DEBUGTYPE.TICKET);
                    this._thirdPartyWrapper.completeTicket();
                    this._ticketObject = null;
                    this._ticketIsLoaded = false;
                }
                else {
                    throw new Error("Cannot complete ticket when one isn't loaded.");
                }
            }
            else {
                throw new Error("Cannot complete ticket whilst the manager is already in use.");
            }
        };
        TicketManager.prototype.finishGame = function () {
            if (!this._requestLock) {
                if (!this._ticketIsLoaded) {
                    BOOM.Debug.instance.log("Ticket Manager finish game request sent.", BOOM.DEBUGTYPE.TICKET);
                    this._thirdPartyWrapper.finishGame();
                    this._ticketObject = null;
                    this._ticketIsLoaded = false;
                }
                else {
                    throw new Error("Cannot finish game with a ticket loaded. Finish the ticket first!");
                }
            }
            else {
                throw new Error("Cannot finish game whilst the manager is already in use.");
            }
        };
        TicketManager.instance = null;
        return TicketManager;
    }());
    BOOM.TicketManager = TicketManager;
    var WrapperTemplate = (function () {
        function WrapperTemplate() {
        }
        WrapperTemplate.prototype.requestTicket = function () {
            if (TicketManager.instance.local) {
                console.warn("Request ticket not defined.");
            }
            TicketManager.instance.setTicket(null);
        };
        WrapperTemplate.prototype.completeTicket = function () {
            if (TicketManager.instance.local) {
                console.warn("Request ticket not defined.");
            }
        };
        WrapperTemplate.prototype.finishGame = function () {
            if (TicketManager.instance.local) {
                console.warn("Finish game not defined.");
            }
        };
        WrapperTemplate.prototype.getConfig = function () {
            if (TicketManager.instance.local) {
                console.warn("Get config not defined.");
            }
        };
        return WrapperTemplate;
    }());
    BOOM.WrapperTemplate = WrapperTemplate;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            var thirdPartyData = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                thirdPartyData[_i - 0] = arguments[_i];
            }
            _super.call(this, GameManager.NATIVE_WIDTH, GameManager.NATIVE_HEIGHT, Phaser.AUTO, 'IWGholder', true, true);
            this._ticketManager = null;
            this._boot = null;
            this._preloader = null;
            this._maingame = null;
            if (GameManager.instance === null) {
                throw new Error("Tried to make a game manager when one already existed. To use GameManager, use GameManager.instance ");
            }
            else {
                new BOOM.Debug();
                BOOM.Debug.ALL();
                GameManager.instance = this;
                BOOM.Debug.instance.log("GameManager initialised!", BOOM.DEBUGTYPE.INIT, this);
                this._signalManager = new BOOM.SignalManager();
                this._audioManager = new BOOM.AudioManager();
                this._ticketManager = new (BOOM.TicketManager.bind.apply(BOOM.TicketManager, [void 0].concat(thirdPartyData)))();
                this._boot = new BOOM.Boot();
                this._preloader = new BOOM.Preloader();
                this._maingame = new BOOM.MainGame();
                this.state.add('Boot', this._boot, false);
                this.state.add('Preloader', this._preloader, false);
                this.state.add('MainGame', this._maingame, false);
                this._subscribeSignals();
                this.state.start('Boot');
            }
        }
        GameManager.prototype._subscribeSignals = function () {
            BOOM.SignalManager.instance.add('switchStateSignal', this._switchState, this);
        };
        GameManager.prototype._unsubscribeSignals = function () {
            BOOM.SignalManager.instance.remove('switchStateSignal', this._switchState, this);
        };
        GameManager.prototype.getAudioManager = function () {
            return this._audioManager;
        };
        GameManager.prototype._switchState = function (name) {
            this.state.start(name);
        };
        GameManager.NATIVE_WIDTH = 1136;
        GameManager.NATIVE_HEIGHT = 640;
        GameManager.BASE_PATH = '.';
        return GameManager;
    }(Phaser.Game));
    BOOM.GameManager = GameManager;
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
            this.delayUntilIdle = null;
            this.delayUntilIdleTimeOut = null;
            this._idleEnabled = null;
            this._useTimeOut = false;
            this._idleTimer = null;
            this._timerReachedIdleStart = false;
            this._idleControlled = false;
            this._idleController = null;
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
        IdleClass.prototype.coreIdleInterruptedEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleInterruptedEvent();
            }
        };
        IdleClass.prototype.replaceableIdleInterruptedEvent = function () {
        };
        IdleClass.prototype.coreBreakIdleIfActive = function () {
            if (this._idleEnabled) {
                if (!this._idleControlled) {
                    this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
                }
                else {
                    this._idleController.coreBreakIdleIfActive();
                }
            }
        };
        IdleClass.prototype.coreResumeIdleIfActive = function () {
            if (this._idleEnabled) {
                if (!this._idleControlled) {
                    this.resetAndStartOrStopTimer(TimerInteractionStatus.startOrReset);
                }
                else {
                    this._idleController.coreResumeIdleIfActive();
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
                    this.coreIdleInterruptedEvent();
                }
                this.coreStopIdleEvent();
                if (status == TimerInteractionStatus.startOrReset) {
                    this._idleTimer = BOOM.GameManager.instance.time.create(true);
                    this._idleTimer.add(this.delayUntilIdle, function () {
                        _this.coreIdleEvent();
                        _this._timerReachedIdleStart = true;
                    });
                    if (this._useTimeOut) {
                        this._idleTimer.add(this.delayUntilIdleTimeOut, function () {
                            _this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
                            _this.coreIdleTimeOutEvent();
                        });
                    }
                    this._idleTimer.start();
                }
            }
            this._timerReachedIdleStart = false;
        };
        IdleClass.prototype.setIdleController = function (idleController, useIdleController) {
            if (useIdleController === void 0) { useIdleController = true; }
            this._idleController = idleController;
            this._idleController.addToControlledIdlesArray(this);
            this.setIdleControlled(useIdleController);
        };
        IdleClass.prototype.setIdleControlled = function (value) {
            this._idleControlled = value;
            this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
        };
        IdleClass.prototype.getIdleControlled = function () {
            return this._idleControlled;
        };
        IdleClass.prototype.setTimerValues = function (delayUntilIdle, delayUntilIdleTimeOut) {
            this.delayUntilIdle = delayUntilIdle;
            this.delayUntilIdleTimeOut = delayUntilIdleTimeOut;
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
        IdleClass.prototype.removeSelfFromIdleControllerAndArray = function () {
            this.setIdleControlled(false);
            this._idleController.removeIdleClass(this);
            this._idleController = null;
        };
        IdleClass.prototype.stopTimerIdleAndRemoveFromController = function () {
            this.enableOrDisableIdle(false);
            this.removeSelfFromIdleControllerAndArray();
        };
        return IdleClass;
    }(BOOM.NonDisplayObject));
    BOOM.IdleClass = IdleClass;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var SpriteInfo = (function () {
        function SpriteInfo() {
        }
        return SpriteInfo;
    }());
    BOOM.SpriteInfo = SpriteInfo;
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
            this._outsideTrigger = null;
            this._interactivityScaling = null;
            this._internalGroupScaler = new Phaser.Group(BOOM.GameManager.instance, this);
            this.buttonSprite = BOOM.GameManager.instance.make.sprite(0, 0);
            this.buttonSprite.anchor.set(0.5, 0.5);
            this._internalGroupScaler.add(this.buttonSprite);
            if (buttonParameters.useText === true) {
                if (buttonParameters.myOwnTextObject !== undefined) {
                    this.buttonText = buttonParameters.myOwnTextObject;
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
            this.idleClass = new BOOM.IdleClass();
            this.idleClass.replaceableIdleEvent = function () {
                _this.promptTweenPart1();
            };
            this.idleClass.replaceableStopIdleEvent = function () {
                _this.clearTweens();
            };
            this.buttonSprite.inputEnabled = true;
            this.enableButton();
        }
        ButtonClass.prototype.subscribeSignals = function () {
        };
        ButtonClass.prototype.unsubscribeSignals = function () {
        };
        ;
        ButtonClass.prototype._buttonDownFunctionality = function (internal) {
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
        ButtonClass.prototype._buttonUpFunctionality = function (internal) {
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
        ButtonClass.prototype._buttonMouseOverFunctionality = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.mouseOver.x, this._interactivityScaling.mouseOver.y);
            }
            this.idleClass.coreBreakIdleIfActive();
            this.buttonMouseOver();
            this._loadTextureCheck(this.buttonOverSpriteInfo.spriteSheets, this.buttonOverSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonMouseOver = function () {
        };
        ButtonClass.prototype._buttonMouseOutFunctionality = function () {
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
            this.buttonSprite.inputEnabled = true;
            this.buttonSprite.input.useHandCursor = true;
            this.buttonEnabledStatus = true;
            this.buttonSprite.events.onInputDown.add(this._buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.add(this._buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.add(this._buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.add(this._buttonMouseOutFunctionality, this);
            this.idleClass.coreResumeIdleIfActive();
            this._enabledState();
        };
        ButtonClass.prototype.disableButton = function () {
            this.buttonSprite.inputEnabled = false;
            this.buttonEnabledStatus = false;
            this.buttonSprite.events.onInputDown.remove(this._buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.remove(this._buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.remove(this._buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.remove(this._buttonMouseOutFunctionality, this);
            this.idleClass.coreBreakIdleIfActive();
            this._disabledState();
        };
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
        ButtonClass.prototype.simulateClick = function (enableButtonAfterwards) {
            if (enableButtonAfterwards === void 0) { enableButtonAfterwards = true; }
            this.disableButton();
            this._clickWasInButton = true;
            this._buttonUpFunctionality(false);
            if (enableButtonAfterwards) {
                this.enableButton();
            }
        };
        return ButtonClass;
    }(BOOM.GameGroup));
    BOOM.ButtonClass = ButtonClass;
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
            standardFont.font = 'times new roman';
            standardFont.fontSize = 50;
            standardFont.fill = '#ffffff';
            return standardFont;
        };
        GameFonts.createMenuFont = function () {
            var standardFont = BOOM.GameManager.instance.make.text(0, 0, "");
            standardFont.anchor.set(0.5);
            standardFont.align = 'center';
            standardFont.font = 'times new roman';
            standardFont.fontSize = 45;
            standardFont.fill = '#272727';
            return standardFont;
        };
        GameFonts.createMultiplierWinFont = function () {
            var multiplierWinFont = BOOM.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 50;
            multiplierWinFont.fill = '#f0a127';
            return multiplierWinFont;
        };
        GameFonts.createMultiplierFont = function () {
            var multiplierWinFont = BOOM.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 42;
            multiplierWinFont.fill = '#ffffff';
            return multiplierWinFont;
        };
        GameFonts.createEndWinFont = function () {
            var multiplierWinFont = BOOM.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 32;
            return multiplierWinFont;
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
            this.controlledIdles = [];
        }
        IdleController.prototype.coreIdleEvent = function () {
            _super.prototype.coreIdleEvent.call(this);
            for (var i = 0; i < this.controlledIdles.length; i++) {
                if (this._fireEventCheck(this.controlledIdles[i])) {
                    this.controlledIdles[i].coreIdleEvent();
                }
            }
        };
        IdleController.prototype.coreStopIdleEvent = function () {
            _super.prototype.coreStopIdleEvent.call(this);
            for (var i = 0; i < this.controlledIdles.length; i++) {
                if (this._fireEventCheck(this.controlledIdles[i])) {
                    this.controlledIdles[i].coreStopIdleEvent();
                }
            }
        };
        IdleController.prototype.coreIdleInterruptedEvent = function () {
            _super.prototype.coreIdleInterruptedEvent.call(this);
            for (var i = 0; i < this.controlledIdles.length; i++) {
                if (this._fireEventCheck(this.controlledIdles[i])) {
                    this.controlledIdles[i].coreIdleInterruptedEvent();
                }
            }
        };
        IdleController.prototype.coreIdleTimeOutEvent = function () {
            _super.prototype.coreIdleTimeOutEvent.call(this);
            for (var i = 0; i < this.controlledIdles.length; i++) {
                if (this._fireEventCheck(this.controlledIdles[i])) {
                    this.controlledIdles[i].coreIdleTimeOutEvent();
                }
            }
        };
        IdleController.prototype.addToControlledIdlesArray = function (idleClass) {
            this.controlledIdles.push(idleClass);
        };
        IdleController.prototype.removeIdleClass = function (idleClass) {
            for (var i = 0; i < this.controlledIdles.length; i++) {
                if (idleClass == this.controlledIdles[i]) {
                    this.controlledIdles.splice(i, 1);
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
            if (panelParams.sheetName !== undefined && panelParams.backgroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(BOOM.GameManager.instance, 0, 0, panelParams.sheetName, panelParams.backgroundImageString);
                this.add(this.panelBackground);
            }
            else if (panelParams.sheetName === undefined && panelParams.backgroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(BOOM.GameManager.instance, 0, 0, panelParams.backgroundImageString);
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
        PanelClass.prototype.unsubscribeSignals = function () {
        };
        PanelClass.prototype.addButtonsToArrayAndGroup = function (buttons) {
            for (var i = 0; i < buttons.length; i++) {
                this.buttonsArray.push(buttons[i]);
                this.buttonsGroup.add(buttons[i]);
            }
        };
        PanelClass.prototype.show = function (enableButtons) {
            if (enableButtons === void 0) { enableButtons = true; }
            if (enableButtons) {
                this.enableButtons();
            }
            this.revealed = true;
            this.visible = true;
        };
        PanelClass.prototype.hide = function (disableButtons) {
            if (disableButtons === void 0) { disableButtons = true; }
            if (disableButtons) {
                this.disableButtons();
            }
            this.revealed = false;
            this.visible = false;
        };
        PanelClass.prototype.disableButtons = function () {
            for (var i = 0; i < this.buttonsArray.length; i++) {
                this.buttonsArray[i].disableButton();
            }
        };
        PanelClass.prototype.enableButtons = function () {
            for (var i = 0; i < this.buttonsArray.length; i++) {
                this.buttonsArray[i].enableButton();
            }
        };
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
    var LanguageManager = (function () {
        function LanguageManager() {
            this._config = null;
            this._selectedLanguage = null;
            if (LanguageManager.instance === null) {
                LanguageManager.instance = this;
            }
            else {
                throw new Error("Cant make 2 LanguageManager, use .instance instead.");
            }
        }
        LanguageManager.prototype.init = function (config, language) {
            this._config = config;
            if (this._checkLanguageSupport(language.toLowerCase())) {
                this._selectedLanguage = language.toLowerCase();
            }
            else {
                this._selectedLanguage = "en";
                console.warn("Language '", language.toLowerCase(), "' not found, defaulting to 'en'.");
            }
        };
        LanguageManager.prototype._checkLanguageSupport = function (lang) {
            if (this._config.supportedLanguages.hasOwnProperty(lang)) {
                return this._config.supportedLanguages[lang];
            }
            else {
                return false;
            }
        };
        LanguageManager.prototype.getAssetPackInfo = function () {
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
        LanguageManager.prototype.getDelimitedString = function (targetKey) {
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
                    return this._delimitText(thisString);
                }
                else {
                    return targetKey;
                }
            }
        };
        LanguageManager.prototype.getDelimitedErrorString = function (targetKey) {
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
                    return this._delimitText(thisString);
                }
                else {
                    return targetKey;
                }
            }
        };
        LanguageManager.prototype._delimitText = function (stringIn) {
            if (stringIn.indexOf("{{line_break}}") == -1) {
                return stringIn;
            }
            else {
                stringIn = stringIn.replace("{{line_break}}", "\n");
                return this._delimitText(stringIn);
            }
        };
        LanguageManager.instance = null;
        return LanguageManager;
    }());
    BOOM.LanguageManager = LanguageManager;
})(BOOM || (BOOM = {}));
var BOOM;
(function (BOOM) {
    var ThirdPartyWrapper = (function (_super) {
        __extends(ThirdPartyWrapper, _super);
        function ThirdPartyWrapper() {
            var thirdPartyData = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                thirdPartyData[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this._ticket = null;
            this._outcome = null;
            this._matchIcon = [];
            this._icons = [];
            this._prizeListArray = [];
            BOOM.TicketManager.instance.local = true;
            this._prizeList();
            this._getOutcome();
            this._getMatchIcons();
            this._getIcons();
        }
        ThirdPartyWrapper.prototype.requestTicket = function () {
            BOOM.Debug.instance.log("Local ticket request.", BOOM.DEBUGTYPE.TICKET);
            if (BOOM.TicketManager.instance.local) {
                var ticket = {
                    prizeTier: this._outcome.prizeTier,
                    amount: this._outcome.amount,
                    isWinner: this._outcome.isWinner,
                    match: [
                        this._matchIcon[0],
                        this._matchIcon[1],
                        this._matchIcon[2]
                    ],
                    turns: [
                        this._icons[0],
                        this._icons[1],
                        this._icons[2],
                        this._icons[3],
                        this._icons[4],
                        this._icons[5],
                        this._icons[6],
                        this._icons[7],
                        this._icons[8],
                        this._icons[9],
                        this._icons[10],
                        this._icons[11]
                    ]
                };
                BOOM.TicketManager.instance.setTicket(ticket);
            }
            else {
                throw new Error("Running on non-local with a local ticket wrapper.");
            }
        };
        ThirdPartyWrapper.prototype.completeTicket = function () {
            if (BOOM.TicketManager.instance.local) {
                BOOM.Debug.instance.log("Local ticket completed.", BOOM.DEBUGTYPE.TICKET);
                this._ticket = null;
            }
            else {
                throw new Error("Running on non-local with a local ticket wrapper.");
            }
        };
        ThirdPartyWrapper.prototype.finishGame = function () {
            window.location.href = "/";
        };
        ThirdPartyWrapper.prototype.getConfig = function () {
            if (BOOM.TicketManager.instance.local) {
                BOOM.Debug.instance.log("Local config request.", BOOM.DEBUGTYPE.TICKET);
                var config = {
                    language: "en",
                    currency: "GBP",
                    stakeAmounts: [.5, 1, 2, 5, 10],
                    finishURL: "/"
                };
                BOOM.TicketManager.instance.setConfig(config);
            }
            else {
                throw new Error("Running on non-local with a local ticket wrapper.");
            }
        };
        ThirdPartyWrapper.prototype._getOutcome = function () {
            var tOutcome = com.camelot.core.IWG.ame('ticket').outcome;
            var isWinner = false;
            if (Number(tOutcome.isWinner) === 1) {
                isWinner = true;
            }
            var outcome = {
                prizeTier: Number(tOutcome.tier),
                amount: Number(tOutcome.amount),
                isWinner: isWinner
            };
            this._outcome = outcome;
        };
        ThirdPartyWrapper.prototype._prizeList = function () {
            var prizeList = com.camelot.core.IWG.ame('ticket').prizeList.a;
            this._prizeListArray = prizeList.split(',').map(function (item) {
                return parseInt(item, 10);
            });
        };
        ThirdPartyWrapper.prototype._getMatchIcons = function () {
            var matchIcons = com.camelot.core.IWG.ame('ticket').games.g1.wS;
            for (var i = 0; i < matchIcons.split(',').length; i++) {
                var element = Number(matchIcons.split(',')[i]);
                this._matchIcon.push(element);
            }
        };
        ThirdPartyWrapper.prototype._getIcons = function () {
            for (var i = 0; i < 12; i++) {
                var icon = com.camelot.core.IWG.ame('ticket').games.g1.turn[i];
                var instantWin = false;
                if (Number(icon.iW) === 1) {
                    instantWin = true;
                }
                var iTurn = {
                    i: Number(icon.i),
                    t: Number(icon.t),
                    p: this._convertValue(icon.p),
                    w: Number(icon.w),
                    iw: instantWin,
                };
                this._icons.push(iTurn);
            }
        };
        ThirdPartyWrapper.prototype._convertValue = function (p) {
            return this._prizeListArray[Number(p)];
        };
        return ThirdPartyWrapper;
    }(BOOM.WrapperTemplate));
    BOOM.ThirdPartyWrapper = ThirdPartyWrapper;
})(BOOM || (BOOM = {}));
//# sourceMappingURL=initGameNC.js.map