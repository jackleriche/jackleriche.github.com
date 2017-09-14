/// <reference path="../typings/tsd.d.ts" />
declare module com.camelot.core {
    function IWGInit(): void;
}
declare module BOOM {
    class Boot extends Phaser.State {
        private _refreshScale;
        private _isLandscape;
        private _gameArea;
        private _rotationDiv;
        private _fullScreenMask;
        private _horizontalHeight;
        private _scrollCheckEvent;
        gameLoaded: boolean;
        preload(): void;
        create(): void;
        private _initGenericSettings();
        private _initDesktopSpecificSettings();
        private _initMobileSpecificSettings();
        private _gameResized();
        private _enterIncorrectOrientation();
        private _leaveIncorrectOrientation();
        update(): void;
    }
}
declare module BOOM {
    class GameSheet {
        static spritesheets: Array<GameSheet>;
        private _key;
        private _filename;
        constructor(key: string, alternateKeyName?: string);
        getKey(): string;
        getFilename(): string;
    }
}
declare module BOOM {
    class GameGroup extends Phaser.Group {
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _addStateSwitch();
        private _onStateSwitch();
        destroy(): void;
    }
    class GameState extends Phaser.State {
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _addStateSwitch();
        private _onStateSwitch();
        destroy(): void;
        create(): void;
    }
    class NonDisplayObject {
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _addStateSwitch();
        private _onStateSwitch();
        destroy(): void;
        constructor();
    }
}
declare module BOOM {
    class Control {
        private _maxCallbacks;
        private _timer;
        private _internalCounter;
        private _onComplete;
        private _onCompleteScope;
        private _onCompleteParams;
        private _spent;
        constructor(maxCallbacks: number, onComplete: Function, scope: any, timer?: number, ...params: any[]);
        done(): void;
        private _fireOnCompleteCallback();
    }
}
declare module BOOM {
    class Preloader_Core extends Phaser.State {
        preload(): void;
        create(): void;
        setupLoadingScene(): void;
        addAssetsToLoad(): void;
        fileStarted(progress: number, cacheKey: string, fileUrl: string): void;
        fileLoaded(progress: number, cacheKey: string, success: boolean, totalLoaded: number, totalFiles: number): void;
        fileFailed(cacheKey: string, errorObj: string): void;
        setSpritesheetDataToLoad(): void;
        setAudioDataToLoad(): void;
        private _waitForAudioToDecode();
        private _checkIfAudioIsDecoded(control, sound);
        private _addSheetsToGPUTexturePriority();
        onLoad(): void;
    }
}
declare module BOOM {
    class SoundChannels {
        static BACKGROUND: string;
        static FX_SOUNDS: string;
    }
    class GameSoundChannel {
        private _name;
        private _sounds;
        private _previousVolume;
        private _volume;
        private _isMuted;
        constructor(name: string, initialVolume: number);
        addGameSound(sound: GameSound): void;
        getGameSound(soundName: string): GameSound;
        getGameSounds(): GameSound[];
        getName(): string;
        setName(value: string): void;
        getVolume(): number;
        setIsMuted(value: boolean): void;
        isMuted(): boolean;
        setVolume(volume: number): void;
        mute(value: boolean): void;
    }
}
declare module BOOM {
    class GameSound {
        static gameSounds: GameSound[];
        static supportedExtensions: string[];
        private _name;
        private _maxVolume;
        private _currentVolume;
        private _isLoop;
        private _allowMultiple;
        private _channel;
        private _sound;
        private _isPlaying;
        constructor(name: string, channel: string, maxVolume?: number, isLoop?: boolean, initialVolume?: number, allowMultiple?: boolean);
        createSound(): void;
        manuallyAssignSound(audio: any): void;
        getName(): string;
        setName(value: string): void;
        getMaxVolume(): number;
        setMaxVolume(value: number): void;
        getCurrentVolume(): number;
        setCurrentVolume(volume: number): void;
        setDesiredVolume(volume: number): void;
        getChannel(): string;
        setChannel(value: string): void;
        isLoop(): boolean;
        setIsLoop(value: boolean): void;
        isPlaying(): boolean;
        setIsPlaying(value: boolean): void;
        getSound(): Phaser.Sound;
        setSound(value: Phaser.Sound): void;
        getAllowMultiple(): boolean;
        setAllowMultiple(value: boolean): void;
    }
}
declare module BOOM {
    class AudioManager {
        static PLAY_AUDIO: string;
        static STOP_AUDIO: string;
        static SET_CHANNEL_VOLUME: string;
        static MUTE_ALL_CHANNELS: string;
        private _soundChannels;
        private _isMuted;
        private _isMutedByVisibility;
        private _isMutedByUser;
        constructor();
        private _subscribeSignals();
        private _unsubscribeSignals();
        addSoundChannel(channelName: string, initialVolume: number): void;
        addSound(sound: GameSound): void;
        private _playAudio(gameSound, channelName, isFadeIn?, duration?, delay?);
        private _stopAudio(soundName, channelName, isFadeOut?, duration?, delay?);
        private _setChannelVolume(channelName, volume, isFade?, duration?);
        private _muteAudio();
        private _muteAudioByUser();
        private _muteAudioChannels(mute);
        private _stopAllSounds();
        private _musicCrossFade(soundname);
        private _getSoundChannel(soundChannelName);
    }
}
declare module BOOM {
    class Sounds {
        static BONUS_SPARKLE: GameSound;
        static COUNT_UP: GameSound;
        static MATCH: GameSound;
        static COIN: GameSound;
        static PLAY: GameSound;
        static PRIZE_1: GameSound;
        static PRIZE_2: GameSound;
        static PRIZE_3: GameSound;
        static WAD_1: GameSound;
        static WHOOSH_1: GameSound;
        static WHOOSH_2: GameSound;
        static END_LOSE: GameSound;
        static END_WIN: GameSound;
    }
    class Preloader extends GameState {
        addImage(name: string): void;
        addSpriteSheet(name: string): void;
        addSounds(): void;
        addBitmapFont(name: string, space: number): void;
        create(): void;
    }
}
declare module BOOM {
    interface IConfig {
        language: string;
        currency: string;
        stakeAmounts: number[];
        finishURL: string;
    }
}
declare module BOOM {
    interface ITicket {
        prizeTier: number;
        amount: number;
        isWinner: boolean;
        match: Array<number>;
        turns: Array<ITurn>;
    }
}
declare module BOOM {
    class Icon extends GameGroup {
        static NUM_REVEALING: number;
        static NUM_REVEALED: number;
        static CLICK_COUNT: number;
        private _name;
        private _revealed;
        private _winner;
        private _base;
        private _symbol;
        private _symbolName;
        private _concealer;
        private _shadow_concealer;
        private _prizeConcealer;
        private _prize;
        private _sound;
        private _hitAreaHeight;
        private _value;
        private _position;
        private _particles;
        private _idling;
        private _idleTimer;
        private _killIdle;
        private _idleWadTween;
        private _idleShadowTween;
        private _idleShimmerAnim;
        private _pulsingWin;
        revealed: boolean;
        winner: boolean;
        symbolName: number | string;
        value: number;
        sounds: GameSound[];
        particles: Array<string>;
        constructor(x: number, y: number, concealer: string, symbol?: string, prizeConcealer?: string, prize?: number);
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        reveal(): void;
        private _callCheckMatchWhenNoneRevealing();
        winReveal(control?: Control): void;
        private _prizePulseOnWin();
        private _inactive();
        private _idleTweenAnimation();
        private _idleShimmerAnimation();
        private _killInactive();
        private _endGameLoseTint();
    }
}
declare module BOOM {
    class Match extends GameGroup {
        private _noMatches;
        private _matchIcons;
        private _icons;
        private _revealed;
        private _clickCount;
        private _currentlyMatching;
        private _queuedMatch;
        numberOfMatches: number;
        matchIcons: Array<Icon>;
        icons: Array<Icon>;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _checkMatch(calledFromClick?);
        private _incClickCount();
    }
}
declare module BOOM {
    class MainGamePanelGroup extends GameGroup {
        private _mainGamePanel;
        private _winningSymbolsGroup;
        private _yourSymbolsGroup;
        private _muteButton;
        constructor();
        private _iconSymbol(index);
    }
}
declare module BOOM {
    class ChanceAmountText extends GameGroup {
        private _packedText;
        private _withText;
        private _amountText;
        private _topPrizesText;
        private _spriteArrays;
        private _offset;
        private _originalPosition;
        private _groupedSprites;
        private _groupActiveTween;
        private _spacing;
        private _idleTweens;
        private _idleTimerEvent;
        constructor();
        intro(): void;
        private _playWhoosh(delay, sound);
        private _addBestAndChance();
        private _offHit();
        private _amountHit();
        private _addTooBunchedGroup(newOffset, final?);
        private _clearActiveTween();
        private _setUpIldeTimer();
        private _clearIdleTimer();
        private _setUpIdle(scale?);
        private _clearIdleTweens();
        private _removeFromIdleArray(tween);
        private _idleAnimaiton(delay, object, scaleSize?);
    }
}
declare module BOOM {
    class MainGameGroup extends GameGroup {
        private _logoGroup;
        private _logoFast;
        private _logoAmount;
        private _logoGlow;
        private _logoShimmer;
        private _chanceAmountText;
        private _instructions;
        private _mainGamePanelGroup;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor();
        private _mainGameTransitionIn();
        private _mainGameTransitionOut();
    }
}
declare module BOOM {
    class EndGameGroup extends GameGroup {
        private _endGamePanel;
        private _finishButton;
        private _finishButtonAlt;
        private _finishButtonTweenA;
        private _finishButtonTweenB;
        private _endMessage;
        private _line;
        private _youWon;
        private _endAmount;
        private _starAnim;
        private _inactive;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _disableFinishButton();
        private _enableFinishButton();
        private _createWin();
        private _createLose();
        private _createTrial();
        private _finalBankCheck();
        createCounter(textField: Phaser.BitmapText, currentValue: number, targetValue: number, speed: number, onStart: () => any, onUpdate: () => any, onComplete: () => any, onCompleteScope: any, isAnimated: boolean): void;
        private _show();
        private _fadeButton();
        private _finishButtonXFade();
        private _killXFadeTweens();
    }
}
declare module BOOM {
    class SplashGroup extends GameGroup {
        private _logo;
        private _logoShimmer;
        private _playButton;
        private _playButtonAlt;
        private _playButtonTweenA;
        private _playButtonTweenB;
        private _packedWithText;
        private _topprizes;
        private _groupedText;
        private _bestCurrentTween;
        private _amountCurrentTween;
        private _inactive;
        private _groupedTween;
        private endYPosition;
        constructor();
        private _textIntro();
        private _winningTextIntro();
        private _crash();
        private _clearBestTweens();
        private _clearAmountTweens();
        private _clearTweensAndDefaultPosition();
        private _disablePlayButton();
        private _enablePlayButton();
        private _transitionOut();
        private _playButtonXFadeTween();
        private _killPlayButtonTweens();
    }
}
declare module BOOM {
    class Pause {
        private _div;
        private _enabled;
        constructor();
        private _subscribe();
        private _unsubscribe();
        private _create();
        private _show();
        private _hide();
        private _destroy();
    }
}
declare module BOOM {
    class Sound extends GameGroup {
        private _soundButton;
        private _isMuted;
        private _enabled;
        enabled: boolean;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _init();
        private _hide();
    }
}
declare module BOOM {
    interface ICurrencyCodes {
        country: string;
        currency: string;
        ISOCode: string;
        minorPresent: boolean;
        majorSymbol: string;
        minorSymbol: string;
        decimalPrecision: number;
        majorPosition: string;
        minorPosition: string;
        majorDelimiter: string;
        minorDelimiter: string;
    }
    class CurrencyManager {
        static instance: CurrencyManager;
        static DECIMAL_ZERO: number;
        static DECIMAL_ONE: number;
        static DECIMAL_TWO: number;
        static DECIMAL_THREE: number;
        private static CURRENCY_CODES;
        private _selectedCurrency;
        private _useISOCode;
        private _useMinorIfPresent;
        private _selectedCurrencyData;
        constructor(currency: string, useISO: boolean, useMinorIfPresent: boolean);
        private _checkCurrencySupport(currency);
        private _getCurrencyData(curr);
        formatCurrency(value: number, ignoreDecimalsWherePossible?: boolean): string;
        private _prepNumbers(numIn, n, x, s, c);
        private _checkIsInt(value);
    }
}
declare module BOOM {
    class MainGame extends GameState {
        static SPRITESHEET_ID: string;
        private _background;
        private _refreshScale;
        private _soundButton;
        private _mainGameGroup;
        private _endGameGroup;
        private _splashGroup;
        currencyManager: CurrencyManager;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        create(): void;
        private _makeBackground();
    }
}
declare module BOOM {
    class GameSignal extends Phaser.Signal {
        private _signalId;
        private _signalActive;
        private _signalFired;
        private _listening;
        constructor(signalName: string);
        add(listener: Function, listeningContext?: any, priority?: number, ...args: any[]): Phaser.SignalBinding;
        remove(listener: Function, listeningContext: any): Function;
        dispatch(...params: any[]): void;
        getId(): string;
        isInUse(): boolean;
        hasFired(): boolean;
        getListeningContexts(): string;
    }
}
declare module BOOM {
    class SignalManager {
        static instance: SignalManager;
        private _signalArray;
        constructor();
        add(identifier: string, listener: Function, listeningContext?: any, priority?: number, ...args: any[]): boolean;
        remove(identifier: string, listener: Function, listeningContext?: any): boolean;
        dispatch(identifier: string, ...params: any[]): boolean;
        get(identifier: string): Phaser.Signal;
        checkAllSignals(): void;
    }
}
declare module BOOM {
    class DebugController {
        static instance: DebugController;
        ppreload: boolean;
        pcore: boolean;
        panimation: boolean;
        pticket: boolean;
        perror: boolean;
        pgeneral: boolean;
        pinit: boolean;
        pdebug: boolean;
        constructor();
        log(msg: string, channel?: string, scope?: any): void;
        warn(msg: string, channel?: string, scope?: any): void;
        error(msg: string, channel?: string, scope?: any): void;
        setAll(): void;
        setOff(): void;
        setPreload(): void;
        setCore(): void;
        setAnimation(): void;
        setError(): void;
        setGeneral(): void;
        setTicket(): void;
        setInit(): void;
        setDebug(): void;
    }
    class DEBUGTYPE {
        static PRELOADER: string;
        static ANIMATION: string;
        static GENERAL: string;
        static CORE: string;
        static TICKET: string;
        static ERROR: string;
        static INIT: string;
        static DEBUG: string;
    }
    class Debug {
        static instance: Debug;
        controller: DebugController;
        static OFF: () => any;
        static ALL: () => any;
        static PRELOADER: () => any;
        static CORE: () => any;
        static ANIMATIONS: () => any;
        static GENERAL: () => any;
        static TICKET: () => any;
        static ERROR: () => any;
        static INIT: () => any;
        static DEBUG: () => any;
        constructor();
        log(message: string, channel?: string, scope?: any): void;
        warn(message: string, channel?: string, scope?: any): void;
        error(message: string, channel?: string, scope?: any): void;
    }
}
declare module BOOM {
    class TicketManager {
        static instance: TicketManager;
        local: boolean;
        private _configObject;
        private _ticketObject;
        private _ticketIsLoaded;
        private _thirdPartyWrapper;
        private _requestLock;
        private _onRequestComplete;
        private _onRequestScope;
        constructor(...thirdPartyData: any[]);
        requestConfig(onComplete: Function, scope: any): void;
        setConfig(conf: IConfig): void;
        getTicket(): ITicket;
        requestNewTicket(onComplete: Function, scope: any): void;
        setTicket(ticket: ITicket): void;
        completeTicket(): void;
        finishGame(): void;
    }
    class WrapperTemplate {
        requestTicket(): void;
        completeTicket(): void;
        finishGame(): void;
        getConfig(): void;
    }
}
declare module BOOM {
    class GameManager extends Phaser.Game {
        static instance: GameManager;
        static NATIVE_WIDTH: number;
        static NATIVE_HEIGHT: number;
        static BASE_PATH: string;
        private _signalManager;
        private _audioManager;
        private _ticketManager;
        private _boot;
        private _preloader;
        private _maingame;
        private _subscribeSignals();
        private _unsubscribeSignals();
        constructor(...thirdPartyData: any[]);
        getAudioManager(): AudioManager;
        private _switchState(name);
    }
}
declare module BOOM {
    enum TimerInteractionStatus {
        startOrReset = 0,
        stop = 1,
    }
    class IdleClass extends NonDisplayObject {
        delayUntilIdle: number;
        delayUntilIdleTimeOut: number;
        private _idleEnabled;
        private _useTimeOut;
        private _idleTimer;
        private _timerReachedIdleStart;
        private _idleControlled;
        private _idleController;
        constructor();
        coreIdleEvent(): void;
        replaceableIdleEvent(): void;
        coreStopIdleEvent(): void;
        replaceableStopIdleEvent(): void;
        coreIdleTimeOutEvent(): void;
        replaceableIdleTimeOutEvent(): void;
        coreIdleInterruptedEvent(): void;
        replaceableIdleInterruptedEvent(): void;
        coreBreakIdleIfActive(): void;
        coreResumeIdleIfActive(): void;
        resetAndStartOrStopTimer(status: TimerInteractionStatus): void;
        setIdleController(idleController: IdleController, useIdleController?: boolean): void;
        setIdleControlled(value: boolean): void;
        getIdleControlled(): boolean;
        setTimerValues(delayUntilIdle: number, delayUntilIdleTimeOut: number): void;
        enableOrDisableIdleTimeOut(value: boolean): void;
        getUseTimeOutStatus(): boolean;
        enableOrDisableIdle(value: boolean): void;
        getUseIdleStatus(): boolean;
        destroy(): void;
        removeSelfFromIdleControllerAndArray(): void;
        stopTimerIdleAndRemoveFromController(): void;
    }
}
declare module BOOM {
    class SpriteInfo {
        spriteSheets: any;
        frameName: any;
    }
    interface IInteractivityScaling {
        useInteractivityScaling: boolean;
        mouseOver?: Phaser.Point;
        mouseDown?: Phaser.Point;
        disabledState?: Phaser.Point;
    }
    interface IButtonParameters {
        buttonUpStateImageName: string;
        buttonUpSpriteSheetName?: string;
        buttonDownStateImageName?: string;
        buttonDownSpriteSheetName?: string;
        buttonOverStateImageName?: string;
        buttonOverSpriteSheetName?: string;
        buttonDisabledSpriteSheetName?: string;
        buttonDisabledStateImageName?: string;
        useText?: boolean;
        textMessage?: string;
        myOwnTextObject?: Phaser.Text;
        myOwnButtonObject?: Phaser.Button;
        interactivityScaling?: IInteractivityScaling;
        useTints?: boolean;
    }
    class ButtonClass extends GameGroup {
        buttonSprite: Phaser.Sprite;
        buttonText: Phaser.Text;
        inactivePromptTime: number;
        activeTween: Phaser.Tween;
        buttonEnabledStatus: boolean;
        buttonUpSpriteInfo: SpriteInfo;
        buttonDownSpriteInfo: SpriteInfo;
        buttonOverSpriteInfo: SpriteInfo;
        buttonDisabledSpriteInfo: SpriteInfo;
        idleClass: IdleClass;
        private _currentSpriteInfo;
        private _clickWasInButton;
        private _internalGroupScaler;
        private _outsideTrigger;
        private _interactivityScaling;
        constructor(buttonParameters: IButtonParameters);
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _buttonDownFunctionality(internal?);
        buttonDown(): void;
        private _buttonUpFunctionality(internal?);
        buttonUp(): void;
        private _buttonMouseOverFunctionality();
        buttonMouseOver(): void;
        private _buttonMouseOutFunctionality();
        buttonMouseOut(): void;
        private _enabledState();
        enabledState(): void;
        private _disabledState();
        disabledState(): void;
        private _defaultState();
        defaultState(): void;
        clearTweens(): void;
        promptTweenPart1(): void;
        promptTweenPart2(): void;
        enableButton(): void;
        disableButton(): void;
        getScalerGroup(): Phaser.Group;
        private _loadTextureCheck(spriteSheet, frameName);
        simulateClick(enableButtonAfterwards?: boolean): void;
    }
}
declare module BOOM {
    class GameFonts {
        static createStandardFont(): Phaser.Text;
        static createMenuFont(): Phaser.Text;
        static createMultiplierWinFont(): Phaser.Text;
        static createMultiplierFont(): Phaser.Text;
        static createEndWinFont(): Phaser.Text;
    }
}
declare module BOOM {
    class IdleController extends IdleClass {
        controlledIdles: IdleClass[];
        constructor();
        coreIdleEvent(): void;
        coreStopIdleEvent(): void;
        coreIdleInterruptedEvent(): void;
        coreIdleTimeOutEvent(): void;
        addToControlledIdlesArray(idleClass: IdleClass): void;
        removeIdleClass(idleClass: IdleClass): void;
        private _fireEventCheck(idleClass);
    }
}
declare module BOOM {
    interface IPanelParameters {
        sheetName?: string;
        backgroundImageString?: string;
    }
    class PanelClass extends GameGroup {
        buttonsArray: ButtonClass[];
        panelBackground: Phaser.Image;
        revealed: boolean;
        buttonsGroup: Phaser.Group;
        idleController: IdleController;
        constructor(panelParams: IPanelParameters);
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        addButtonsToArrayAndGroup(buttons: ButtonClass[]): void;
        show(enableButtons?: boolean): void;
        hide(disableButtons?: boolean): void;
        disableButtons(): void;
        enableButtons(): void;
        simulateClickAllButtons(): void;
        simulateClickWithDelay(symbolToReveal: ButtonClass, delay: number): void;
    }
}
declare module BOOM {
    interface IAssetsControl {
        useAssetPack: boolean;
        assetImgName: string;
        assetImgJsonName: string;
        extras: IAssetsExtra[];
    }
    interface IAssetsExtra {
        assetImgName: string;
        assetImgJsonName: string;
    }
    class LanguageManager {
        static instance: LanguageManager;
        private _config;
        private _selectedLanguage;
        constructor();
        init(config: any, language: string): void;
        private _checkLanguageSupport(lang);
        getAssetPackInfo(): IAssetsControl;
        getDelimitedString(targetKey: string): string;
        getDelimitedErrorString(targetKey: string): string;
        private _delimitText(stringIn);
    }
}
declare module BOOM {
    interface IOutcome {
        prizeTier: number;
        amount: number;
        isWinner: boolean;
    }
    interface ITurn {
        i: number;
        t: number;
        p: number;
        w: number;
        iw: boolean;
    }
    class ThirdPartyWrapper extends WrapperTemplate {
        private _ticket;
        private _outcome;
        private _matchIcon;
        private _icons;
        private _prizeListArray;
        constructor(...thirdPartyData: any[]);
        requestTicket(): void;
        completeTicket(): void;
        finishGame(): void;
        getConfig(): void;
        private _getOutcome();
        private _prizeList();
        private _getMatchIcons();
        private _getIcons();
        private _convertValue(p);
    }
}
