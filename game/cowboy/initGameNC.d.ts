/// <reference path="../typings/tsd.d.ts" />
declare module IWG {
    class GameSignal extends Phaser.Signal {
        private _signalID;
        private _signalActive;
        private _signalFired;
        private _listening;
        constructor(signalName: string);
        add(listener: Function, listeningContext?: any, priority?: number, ...args: any[]): Phaser.SignalBinding;
        remove(listener: Function, listeningContext: any): Function;
        dispatch(...params: any[]): void;
        ID: string;
        inUse: boolean;
        hasFired: boolean;
        getListeningContexts(): string;
    }
}
declare module IWG {
    class SignalManager {
        static instance: SignalManager;
        private _signalArray;
        constructor();
        add(addID: string, listener: Function, listeningContext?: any, priority?: number, ...args: any[]): boolean;
        remove(removeID: string, listener: Function, listeningContext?: any): boolean;
        dispatch(dispatchID: string, ...params: any[]): boolean;
        get(getID: string): Phaser.Signal;
        checkAllSignals(): void;
    }
}
declare module IWG {
    interface ITicket {
        outcome: IOutcome;
        params: IParams;
        turns: IGames;
        prizeList: string[];
    }
    interface IOutcome {
        amount: number;
        prizeTier: number;
        try?: number;
    }
    interface IParams {
        wT: number;
        stake: number;
    }
    interface IGames {
        g1: ITurns[];
    }
    interface ITurns {
        i: number;
        w: number;
        value: number;
        pIndex: number;
    }
    interface IPrizeList {
        pList: string[];
    }
    class TicketManager {
        private _ticket;
        reset(): void;
        setTicket(objIn: any): void;
        getTicket(): ITicket;
        getIsTrialGame(): boolean;
        getStake(): number;
        getIsWinner(): boolean;
        getTotalAmount(): number;
        getGameOneTurn(turnNumber: number): ITurns;
        validate(): boolean;
    }
}
declare module IWG {
    class Boot extends Phaser.State {
        orientated: Boolean;
        private _gameArea;
        private _state;
        private _rotationDiv;
        private _fullScreenMask;
        private _horizontalHeight;
        gameLoaded: boolean;
        preload(): void;
        create(): void;
    }
}
declare module IWG {
    class Sounds {
        static SOUND_IDS: string;
        static BACKGROUNDLOOP: string;
        static CLICK: string;
        static ROLLOVER: string;
        static PLAYBUTTON: string;
        static GUNSHOT: string;
        static PRIZEREVEAL: string;
        static BONUSKEY: string;
        static EAGLEFLY: string;
        static ENDWIN: string;
        static ENDLOSE: string;
        static MULTIPLER: string;
        static JAILDOOR: string;
        static ROWWIN: string;
        static SWOOSH: string;
        static MEGASWOOSH: string;
        static COUNT: string;
        static KERCHING: string;
    }
    class SoundChannels {
        static BACKGROUND: string;
        static FX_SOUNDS: string;
    }
    class AudioManager {
        static PLAY_AUDIO: string;
        static STOP_AUDIO: string;
        static SET_CHANNEL_VOLUME: string;
        static MUTE_ALL_CHANNELS: string;
        private _game;
        private _previousVolume;
        private _currentSFXVolume;
        private _currentMusicVolume;
        private _isMuted;
        private _soundChannels;
        private _currentlyPlayingBGMusic;
        constructor(game: Phaser.Game);
        private _subscribeSignals();
        private _unsubscribeSignals();
        addSoundChannel(channelName: string, initialVolume: number): void;
        addSound(game: Phaser.Game, soundName: string, channelName: string, maxVolume?: number, isLoop?: boolean, initialVolume?: number, allowMultiple?: boolean): void;
        private _setChannelVolume(channelName, volume, isFade?, duration?);
        private _stopAllSounds();
        private _stopAudio(soundName, channelName, isFadeOut?, duration?, delay?);
        private _playAudio(soundName, channelName, isFadeIn?, duration?, delay?);
        private _musicCrossFade(soundname);
        private _muteAudioChannels(mute);
        private _muteAudio();
    }
}
declare module IWG {
    class GameGroup extends Phaser.Group {
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _addStateSwitch();
        private _onStateSwitch();
        destroy(): void;
        constructor();
    }
    class GameState extends Phaser.State {
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _addStateSwitch();
        private _onStateSwitch();
        destroy(): void;
        constructor();
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
declare module IWG {
    enum TimerInteractionStatus {
        startOrReset = 0,
        stop = 1,
    }
    class IdleClass extends NonDisplayObject {
        delayUntillIdle: number;
        delayUntillIdleTimeOut: number;
        private _idleEnabled;
        private _useTimeOut;
        private _idleTimer;
        private _timerReachedIdleStart;
        private _idleControlled;
        private _idleConroller;
        constructor();
        coreIdleEvent(): void;
        replaceableIdleEvent(): void;
        coreStopIdleEvent(): void;
        replaceableStopIdleEvent(): void;
        coreIdleTimeOutEvent(): void;
        replaceableIdleTimeOutEvent(): void;
        coreIdleInteruptedEvent(): void;
        replaceableIdleInteruptedEvent(): void;
        coreBreakIdleIfActive(): void;
        coreResumeIdleIfActive(): void;
        resetAndStartOrStopTimer(status: TimerInteractionStatus): void;
        setIdleController(idleContoller: IdleController, useIdleController?: boolean): void;
        setIdleControlled(value: boolean): void;
        getIdleControlled(): boolean;
        setTimerValues(delayUntillIdle: number, delayUntillIdleTimeOut: number): void;
        enableOrDisableIdleTimeOut(value: boolean): void;
        getUseTimeOutStatus(): boolean;
        enableOrDisableIdle(value: boolean): void;
        getUseIdleStatus(): boolean;
        destroy(): void;
        removeSelfFromIdleControlerAndArray(): void;
        stopTimerIdleAndRemoveFromController(): void;
    }
}
declare module IWG {
    class SpriteInfo {
        spriteSheets: any;
        frameName: any;
    }
    interface iInteractivityScaling {
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
        MyOwnTextObject?: Phaser.Text;
        MyOwnButtonObject?: Phaser.Button;
        interactivityScaling?: iInteractivityScaling;
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
        private _OutsideTrigger;
        private _interactivityScaling;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor(buttonParameters: IButtonParameters);
        private buttonDownFunctionality(internal?);
        buttonDown(): void;
        private buttonUpFunctionality(internal?);
        buttonUp(): void;
        private buttonMouseOverFunctionality();
        buttonMouseOver(): void;
        private buttonMouseOutFunctionality();
        buttonMouseOut(): void;
        private _enabledState();
        enabledState(): void;
        private _disabledState();
        disabledState(): void;
        private _defaultState();
        defaultState(): void;
        clearTweens(): void;
        getButtonSprite(): Phaser.Sprite;
        promptTweenPart1(): void;
        promptTweenPart2(): void;
        enableButton(): void;
        disableButton(): void;
        getScalerGroup(): Phaser.Group;
        private _loadTextureCheck(spriteSheet, frameName);
        simulateClick(enableButtonAfterWards?: boolean): void;
    }
}
declare module IWG {
    class IdleController extends IdleClass {
        contolledIdles: IdleClass[];
        constructor();
        coreIdleEvent(): void;
        coreStopIdleEvent(): void;
        coreIdleInteruptedEvent(): void;
        coreIdleTimeOutEvent(): void;
        addTooControlledIdlesArray(idleClass: IdleClass): void;
        removeIdleClass(idleClass: IdleClass): void;
        private _fireEventCheck(idleClass);
    }
}
declare module IWG {
    interface IPanelParamiters {
        sheetName?: string;
        backGroundImageString?: string;
    }
    class PanelClass extends GameGroup {
        buttonsArray: ButtonClass[];
        panelBackground: Phaser.Image;
        revealed: boolean;
        buttonsGroup: Phaser.Group;
        idleController: IdleController;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor(panelParams: IPanelParamiters);
        addButtonsToArrayAndGroup(buttons: ButtonClass[]): void;
        show(enableButtons?: boolean): void;
        hide(disableButtons?: boolean): void;
        disableButtons(): void;
        enableButtons(): void;
        simulateClickAllButtons(): void;
        simulateClickWithDelay(symbolToReveal: ButtonClass, delay: number): void;
    }
}
declare module IWG {
    class GameFonts {
        static createStandardFont(): Phaser.Text;
        static createMenuFont(): Phaser.Text;
        static createMultiplierWinFont(): Phaser.Text;
        static createMultiplierFont(): Phaser.Text;
        static createEndWinFont(): Phaser.Text;
    }
}
declare module IWG {
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
    class LanguageCurrencyManager {
        static instance: LanguageCurrencyManager;
        static DECIMAL_ZERO: number;
        static DECIMAL_ONE: number;
        static DECIMAL_TWO: number;
        static DECIMAL_THREE: number;
        private static CURRENCY_CODES;
        private _config;
        private _selectedCurrency;
        private _selectedLanguage;
        private _useISOCode;
        private _useMinorIfPresent;
        private _selectedCurrencyData;
        constructor();
        init(config: any, language: string, currency: string, useISO: boolean, useMinorIfPresent: boolean): void;
        private checkLanguageSupport(lang);
        getAssetPackInfo(): IAssetsControl;
        getDelimitedString(targetKey: string): string;
        getDelimitedErrorString(targetKey: string): string;
        private delimitText(stringIn);
        private checkCurrencySupport(curr);
        private getCurrencyData(curr);
        formatCurrency(value: number): string;
        private prepNumbers(numIn, n, x, s, c);
    }
}
declare module IWG {
    class Prize_Core extends ButtonClass {
        private _thisTurn;
        private _isWinner;
        gameNumber: number;
        prizeAmountValueFormatted: string;
        prizeAmountValue: string;
        prizeIndex: number;
        private _onAnimationComplete;
        private _onAnimationCompleteScope;
        private _numberOfRevealingObjects;
        private _numberOfCountingObjects;
        private _numberOfWinningObjects;
        private _numberOfLosingObjects;
        private _numRevealedObjects;
        private _rowInitialised;
        private _rowHasRevealed;
        private _rowHasCountedUp;
        private _checkedForWin;
        private _winRevealed;
        private _cycleFinished;
        private _rowPressed;
        grp_concealerGroup: Phaser.Group;
        grp_prizeGroup: Phaser.Group;
        gamePanel: PanelClass;
        revealSymbolsAnimation(onCompleteFunction: () => any, scope: any, animationPlaying?: boolean): void;
        revealWinAnimation(onCompleteFunction: () => any, scope: any, animationPlaying?: boolean): void;
        countUpAnimation(onCompleteFunction: () => any, scope: any, animationPlaying?: boolean): void;
        revealLoseAnimation(onCompleteFunction: () => any, scope: any, animationPlaying?: boolean): void;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor(gamePanel: PanelClass, buttonParams: IButtonParameters);
        buttonUp(): void;
        prizePressed(): void;
        updateGameRow_Core(winIndex?: number): void;
        private _getSymbolFromTicket(partToGet);
        revealPrize(): void;
        winReveal(winIndex: number): void;
        private _checkAllRevealAnimations();
        private _checkAllCountingAnimations();
        private _checkAllWinnerAnimations();
        onAnimationComplete(): void;
        isWinner(): boolean;
        getRevealed(): boolean;
    }
}
declare module IWG {
    class Particle {
        frameNames: string[];
        maxParticles: number;
        xSpeed: {
            min: number;
            max: number;
        };
        ySpeed: {
            min: number;
            max: number;
        };
        xOffset: number;
        yOffset: number;
        gravity: number;
        width: number;
        height: number;
        rotation: number;
        maxScale: number;
        minScale: number;
        scaleFadeNum: number;
        alpha: number;
        alphaFadeNum: number;
        constructor(frameNames?: string[], maxParticles?: number, xSpeed?: {
            min: number;
            max: number;
        }, ySpeed?: {
            min: number;
            max: number;
        }, xOffset?: number, yOffset?: number, gravity?: number, width?: number, height?: number, maxScale?: number, minScale?: number, scaleFadeNumber?: number, alpha?: number, alphaFadeNumber?: number, rotation?: number);
    }
    class Reveals {
        static Pop_Reveal(objToAnimate: Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText, objToFinish: Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText, group: Phaser.Group, key?: string, frames?: Particle[], onCompleteListener?: Function, onCompleteContext?: any, ...params: any[]): void;
        static Explode_Reveal(): void;
        static Hidden_Lasers(): void;
    }
}
declare module IWG {
    class Prize extends Prize_Core {
        private _game;
        private _symbolwinAnimationFinished;
        private _winValueTxt;
        private _goldHighlightText;
        myCountUpValue: number;
        private _idleWhenReady;
        private _idleTweensArray;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor(game: Phaser.Game, gamePanel: PanelClass);
        symbolFinishedWinAnimation(): void;
        createAnimation(): void;
        private _createGlowFilter();
        revealSymbolsAnimation(onCompleteFunction: () => any, scope: any): void;
        revealWinAnimation(onCompleteFunction: () => any, scope: any): void;
    }
}
declare module IWG {
    class MainGameGroup extends GameGroup {
        private _elFurrito;
        private _barrells;
        private _barrellsShadows;
        private _barrellsExplosion;
        private _clickCount;
        private _key;
        constructor();
        _setupLayout(): void;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _furritoIdle(load?);
        private _furritoFire();
        private _barrellClicked(barrel);
        private _keyAnimation(barrel);
        private _show();
        private _resetGame();
        private _endGame();
        private _hideElFurrito();
        private _showElFurrito();
    }
}
declare module IWG {
    class SplashGroup extends GameGroup {
        private _gameName;
        private _winupto;
        private _bigCactus;
        private _skull;
        private _playButton;
        private _weed;
        private _weedTween;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor();
        private _show();
        private _hide();
    }
}
declare module IWG {
    class MainGame extends GameState {
        static SPRITESHEET_ID: string;
        private _mainGameGroup;
        private _backgroundGroup;
        private _endGroup;
        private _splashGroup;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        create(): void;
        private _restart();
        private _startGame();
        private _shake(x?, y?, repeats?);
    }
}
declare module IWG {
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
        setOFF(): void;
        setPRELOAD(): void;
        setCORE(): void;
        setANIMATION(): void;
        setERROR(): void;
        setGENERAL(): void;
        setTICKET(): void;
        setINIT(): void;
        setDEBUG(): void;
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
declare module IWG {
    class GameManager extends Phaser.Game {
        static instance: GameManager;
        static NATIVE_HEIGHT: number;
        static NATIVE_WIDTH: number;
        private _signalManager;
        private _audioManager;
        private _ticketManager;
        private _T40_TicketManager;
        private _languageCurrency;
        private _deviceManager;
        private _boot;
        private _preloader;
        private _maingame;
        private _prizeNum;
        private _arr_winningPrizes;
        private _arr_finishedPrizes;
        constructor(loader: any);
        private _subscribeSignals();
        private _unsubscribeSignals();
        private _switchState(name);
        private _restartGame();
        private _addWinningRevealedPrize(prize);
        private _addFinishedPrize(prize);
        getNextPrize(): {
            a: number;
            w: number;
            i: number;
        };
        getTicketManager(): TicketManager;
        getAudioManager(): AudioManager;
    }
}
declare module IWG {
    class Preloader_Core extends Phaser.State {
        preload(): void;
        create(): void;
        setupLoadingScene(): void;
        addAssetsToLoad(): void;
        fileStarted(progress: any, cacheKey: any, fileurl: any): void;
        fileLoaded(progress: any, cacheKey: any, success: any, totalLoaded: any, totalFiles: any): void;
        fileFailed(cacheKey: any, errorObj: any): void;
        onLoad(): void;
    }
}
declare module IWG {
    class DeviceManager {
        static instance: DeviceManager;
        private _initialised;
        private _gameArea;
        private _useProperFullscreen;
        private _useFullscreen;
        private _useOrientation;
        private _pauseOnIncorrect;
        private _autoRefresh;
        private _currentlyFullscreen;
        private _fullscreenDiv;
        private _currentOrientation;
        private _orientationDiv;
        useProperFullscreen: boolean;
        fullscreen: boolean;
        orientation: boolean;
        pauseOnIncorrect: boolean;
        autoRefresh: boolean;
        constructor();
        init(): void;
        update(): void;
        deviceStatus(): {
            fullscreen: boolean;
            orientation: string;
        };
        private _addFullscreenOverlay();
        private _addWebAPIFullscreenOverlay();
        private _addFullscreenListeners();
        private _addWebAPIFullscreenListeners();
        private _checkFullscreen(goFull?);
        private _goProperFullscreen();
        private _displayFullscreenOverlay();
        private _deviceInFullscreen();
        private _addOrientationOverlay();
        private _setupOrientationListeners();
        private _displayOrientationOverlay();
        private _gameCorrectOrientation();
        private _supportsFullscreen();
        private _removeDefault(e);
    }
}
declare module IWG {
    class BackgroundGroup extends GameGroup {
        private _preload;
        private _sky;
        private _redsky;
        private _mountains;
        private _ground;
        private _clouds;
        private _clouds2;
        private _town;
        private _townLights;
        private _sun;
        private _rays;
        private _doorHole;
        private _door;
        private _vulture;
        private _cloudsTween;
        private _cloudsTween2;
        private _cactus;
        private _cactusShadow;
        private _currentSkyAlpha;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor();
        private _createBackground();
        private _initialAnimation();
        private _mainGameIntro();
        private _endGameIntro();
        private _openJailDoor();
        private _playVultureAnimation();
        private _resetGame();
    }
}
declare module IWG {
    class EndGameGroup extends GameGroup {
        private _poster;
        private _firstText;
        private _secondText;
        private _amount;
        private _finishButton;
        private _spritesheet;
        private _multiplier;
        private _multi;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _createPoster();
        private _createFinishButton();
        private _createWin();
        private _createLose();
        private _show();
        private _hide();
        createCounter(textField: Phaser.Text, currentValue: number, targetValue: number, speed: number, onStart: () => any, onUpdate: () => any, onComplete: () => any, onCompleteScope: any, isAnimated: boolean): void;
        private _showMultiplier();
    }
}
declare module IWG {
    class T40_Ticket_Manager {
        hasInitialised: boolean;
        loadedTicket: boolean;
        development: boolean;
        ticketInfo: any;
        gameResultFromAPI: any;
        globalAudioVolume: number;
        basePath: string;
        finishURL: string;
        trialGame: number;
        TotalNumTurns: number;
        currentTurnNum: number;
        prizeAmounts: string[];
        outcomeAmount: number;
        prizeTier: number;
        private _hasWon;
        private _game1Information;
        private _outCome;
        private _ticket;
        private _params;
        private _games;
        private _pList;
        private _upperCurrencySymbol;
        private _lowerCurrencySymbol;
        private _dualSymbolCurrency;
        init(input1: any): boolean;
        initTicket(): boolean;
        xmlToJson(xml: any): any;
        gameFinished(): void;
        isWinningGame(): boolean;
        private _flushTicketData();
        isDualCurrency(): boolean;
        getUpperCurrencySymbol(): string;
        getLowerCurrencySymbol(): string;
    }
}
declare module IWG {
    class Preloader extends Preloader_Core {
        private grp_loadingAssets;
        private img_loaderBG;
        private spr_loadingGameLogo;
        private spr_loadingBar;
        private _currentFeature;
        private _horse;
        private _bar;
        setupLoadingScene(): void;
        addAssetsToLoad(): void;
        private _loadSoundsToAudioManager();
        fileLoaded(progress: any, cacheKey: any, success: any, totalLoaded: any, totalFiles: any): void;
        onLoad(): void;
    }
}
