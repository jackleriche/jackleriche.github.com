/// <reference path="../typings/tsd.d.ts" />
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
        private removeSlideUp();
        private addFullScreenOverlays();
        goToFullscreen(): void;
        onFullscreenChange(): void;
        gameResized(): void;
        private enterIncorrectOrientation();
        private leaveIncorrectOrientation();
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
    class MainGameGroup extends GameGroup {
        private _logo;
        private _iconArray;
        private _instructions;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _setupSelection();
        private _mainGameIntro();
        private _fadeLogo(logoDelay);
    }
}
declare module IWG {
    class MainGame extends GameState {
        static SPRITESHEET_ID: string;
        private _splashScreenGroup;
        private _mainGameGroup;
        private _endGameGroup;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        create(): void;
        private _dustFairies(number);
    }
}
declare module IWG {
    class Sounds {
        static BACKGROUND: string;
        static CLICK: string;
        static PLAYSTART: string;
        static REVEAL: string;
        static BASKETREVEAL: string;
        static SUSHISHOW: string;
        static TICKER: string;
        static BONUSCOLLECT: string;
        static BONUSWIN: string;
        static BOXSMOKE: string;
        static COUNTUP: string;
        static ENDWIN: string;
        static ENDLOSE: string;
        static MONSTER1: string;
        static MONSTER2: string;
        static MONSTER3: string;
        static MONSTER4: string;
        static MONSTERSPLAT: string;
        static ROLLOVER: string;
        static ROWWIN: string;
        static WOODHIT: string;
        static GREMLIN1: string;
        static GREMLIN2: string;
        static GREMLIN3: string;
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
        private _toggleMusic(toggle);
        private _toggleSFX(toggle);
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
        grid: Array<number>;
    }
    interface IGames {
        g1: ITurns[];
    }
    interface ITurns {
        i: number;
        w: number;
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
        getIsWinner(): boolean;
        getTotalAmount(): number;
        getGameOneTurn(turnNumber: number): ITurns;
        getGrid(): Array<number>;
        getPrizeList(): Array<string>;
        validate(): boolean;
    }
}
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
    class ErrorManager {
        fire(errorCode: string, errorMessage: string, severity: number): void;
    }
}
declare module IWG {
    enum LegendType {
        ALL = 0,
        SINGLEROW = 1,
        SEQUENTIAL = 2,
    }
    class LegendManager {
        private _game;
        private _board;
        private _rows;
        private _columns;
        private _bonusCoins;
        private _revealed;
        private _isRevealFinished;
        private _revealedObjects;
        private _revealedBonus;
        constructor(game: Phaser.Game);
        private _init();
        setupLegend(rows: any[], prizes: any[], bonusCoins: any[], createColumns: boolean): void;
        getTotalAmmount(toReveal: number[]): number;
        addRow(index: number, objects: any[], prize: number): void;
        addColumn(index: number, objects: any[], prize: number): void;
        getRowObjects(index: number): any[];
        getColumnObjects(index: number): any[];
        getRowPrize(index: number): number;
        getColumnPrize(index: number): number;
        reveal(toReveal: any[]): Reveal[];
        private _contains(values, value);
    }
    enum RevealType {
        AUDIT = 0,
        SYMBOL = 1,
        SYMBOL_WINNER = 2,
        SYMBOL_BONUS = 3,
        ANTICIPATION_ROW = 4,
        ANTICIPATION_COLUMN = 5,
        ROW = 6,
        COLUMN = 7,
        CORNER = 8,
    }
    class Reveal {
        private _type;
        private _index;
        constructor(type: RevealType, index: number);
        getIndex(): number;
        getRevealType(): RevealType;
    }
    class DataSet {
        private _index;
        private _objects;
        private _prize;
        private _revealed;
        private _anticipationRevealed;
        private _indexes;
        constructor(index: number, objects: any[], prize: number);
        getIndex(): number;
        setIndex(value: number): void;
        getObjects(): any[];
        setObjects(value: any[]): void;
        getPrize(): number;
        setPrize(value: number): void;
        isAnticipationRevealed(): boolean;
        setIsAnticipationRevealed(value: boolean): void;
        isRevealed(): boolean;
        setIsRevealed(value: boolean): void;
        getIndexes(): number[];
        setIndexes(value: number[]): void;
        numberOfWinnersInRow(revealed: any[]): number;
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
    class GameManager extends Phaser.Game {
        static instance: GameManager;
        static NATIVE_HEIGHT: number;
        static NATIVE_WIDTH: number;
        private _signalManager;
        private _audioManager;
        private _languageCurrency;
        private _deviceManager;
        static DEBUG: boolean;
        private _errorManager;
        private _boot;
        private _preloader;
        private _maingame;
        private _legendManager;
        private _ticketManager;
        private _T40_TicketManager;
        private _gameValue;
        private _isRevealingSymbol;
        private _queue;
        private _clickCount;
        private _lastSymbolRevealed;
        symbolsRevealedNumber: number;
        constructor(loader: any);
        resize(): void;
        private _subscribeSignals();
        private _unsubscribeSignals();
        private _switchState(name);
        getTicketManager(): TicketManager;
        getAudioManager(): AudioManager;
        private _setGameValue(value);
        getGameValue(): number;
        private _incClickCount();
        private _revealNextSymbol(value?);
        getClickCount(): number;
        getSymbol(index: number): Array<string>;
        getErrorManager(): ErrorManager;
        private prepNumbers(numIn, n, x, s, c);
        formatCurrency(numToFormat: number | string): string;
        getLegendManager(): LegendManager;
        getGameBoard(): number[][];
        getGameMultipliers(): number[];
        private _finishReveal();
        private _endGameCount;
        private _endGameCheck();
        message(messageIn: string, ...args: any[]): void;
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
    class ButtonEvents {
        onInputUp: Phaser.Signal;
        onInputDown: Phaser.Signal;
        onInputOver: Phaser.Signal;
        onInputOut: Phaser.Signal;
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
        buttonEvents: ButtonEvents;
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
    class Control {
        private _maxCallbacks;
        private _timer;
        private _internalCounter;
        private _oCC;
        private _oCS;
        private _oCP;
        private _spent;
        constructor(maxCallbacks: number, onComplete: Function, scope: any, timer?: number, ...params: any[]);
        done(): void;
        private _fireOnCompleteCallback();
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
        static Fade_Out(objToAnimate: Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText, onCompleteListener?: Function, onCompleteContext?: any, ...params: any[]): void;
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
    class BonusGroup extends GameGroup {
        private _count;
        private _bonusArray;
        private _bonusTokens;
        private _panelHighlight;
        private _instantText;
        private _valueText;
        private _value;
        private _winText;
        constructor();
        private _subscribeSignals();
        _unsubscribeSignals(): void;
        private _updateBonusAmount();
        private _reveal(token);
        private _bonusWinner();
    }
}
declare module IWG {
    class Tile extends Phaser.Group {
        private _thisGroupState;
        private _spr_tileBg;
        private _spr_tileCollected;
        private _spr_tileWin;
        private _spr_tileSymbol;
        private _spr_bonusSymbol;
        private _winRevealFinalTween;
        private _isCorner;
        symbolName: string;
        name: string;
        private _subscribeSignals();
        private _unsubscribeSignals();
        getToken(): Phaser.Sprite;
        private _onStateSwitch(state);
        private _destroy();
        constructor(game: Phaser.Game, x: number, y: number, Array: Array<string>, highlight: string);
        private _checkCoords(monster);
        reveal(delay: number, onComplete?: () => any, instance?: any): void;
        bonusReveal(delay: number, onComplete?: () => any, instance?: any): void;
        reset(): void;
        winRowReveal(delay: number, onComplete?: () => any, instance?: any): void;
        flipAnimation(delay: number, withGold: boolean, onComplete?: () => any, instance?: any): void;
    }
}
declare module IWG {
    class Multiplier extends Phaser.Group {
        private _align;
        private _thisGroupState;
        private _multiBackground;
        private _multiBackgroundGold;
        private _multiText;
        private _multiTextWin;
        private _direction;
        private _goldPlateRef;
        private _prizeValue;
        private _prizeValueString;
        private _isPulsing;
        private _anticipationTween;
        private _startPositionX;
        private _startPositionY;
        private _subscribeSignals();
        private _unsubscribeSignals();
        private _onStateSwitch(state);
        private _destroy();
        constructor(game: Phaser.Game, x: number, y: number, textIn: string, directionIn: string, _align?: string);
        setBackground(backgroundIn: string): void;
        setSymbol(symbolIn: string): void;
        setPrizeValue(prizeAmount: number): void;
        getPrizeValue(): number;
        setAlignment(alignment: string): void;
        getAlignment(): string;
        winReveal(delay: number): void;
    }
}
declare module IWG {
    class CentreGroup extends GameGroup {
        private _thisGroupState;
        private _spr_gridPanel;
        private _grp_gridGroup;
        private _grp_columnGroup;
        private _grp_rowGroup;
        private _grp_cornersGroup;
        private _arr_gridTile;
        private _arr_cornersTile;
        private _arr_columnMultipliers;
        private _arr_rowMultipliers;
        private _arr_symbolsToReveal;
        private _arr_cornersToReveal;
        private _arr_rowsToReveal;
        private _arr_colToReveal;
        private _arr_rowsToAnticipation;
        private _arr_colToAnticipation;
        private _arr_bonusToReveal;
        private _arr_tileWinToReveal;
        private _fromBonus;
        private _prize;
        private _turn;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor();
        create(): void;
        private _populateGridArrays(symbol);
        private _revealNextGridElement();
        private _bonusReveal;
        private _revealSymbolsOnGrid();
        private _selectSound(count);
        private _revealBonus(tile, delay);
        private _anticipationWin(type);
        private _revealNextWin();
        private _getTurn();
    }
}
declare module IWG {
    class EndScreenGroup extends GameGroup {
        private _endPanel;
        private _endMessage;
        private _finishButton;
        private _endAmount;
        private _istrial;
        private _iswinner;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor();
        private _createWin();
        private _createLose();
        private _createTrial();
        createCounter(textField: Phaser.BitmapText, currentValue: number, targetValue: number, speed: number, onStart: () => any, onUpdate: () => any, onComplete: () => any, onCompleteScope: any, isAnimated: boolean): void;
        private _show();
    }
}
declare module IWG {
    class OverlayGroup extends GameGroup {
        static NONE: string;
        static MINI: string;
        static FULLMENU: string;
        static TRIAL_TOP: string;
        static TRIAL_BTM: string;
        static AUDIO_SPLIT: string;
        static AUDIO_COMBINED: string;
        private _isTrial;
        private _thisType;
        private _thisTrialPos;
        private _thisAudioType;
        private _btn_smallAudioButton;
        private _btn_smallMenuCog;
        private _gfx_bgDim;
        private _grp_menuGroup;
        private _img_menu;
        private _img_menuBG;
        private _btn_audioAll;
        private _btn_audioMusic;
        private _trialBanner;
        private static _musicMuted;
        private static _audioMuted;
        private _menuShowing;
        private _menuAnimating;
        private _smallX;
        private _smallY;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor(smallButtonx: number, smallbuttonY: number, isTrial: boolean, overlayType?: string, trialPosition?: string, audioSettings?: string);
        private _addTextToMenu();
        private _moveSoundButton(coords);
        private _addSmallAudioButton();
        private _addFullMenu();
        private _openMenu();
        private _closeMenu();
        private _musicToggle();
        private _audioToggle();
        private _hide();
    }
}
declare module IWG {
    class SplashScreenGroup extends GameGroup {
        private _logo;
        private _betPanel;
        private _playButtonHighlight;
        private _playButton;
        private _minusBet;
        private _plusBet;
        private _betValue;
        private _prizeArray;
        private _prizeArrayPointer;
        private _value;
        constructor();
        private _splashOutro();
        private _updateBet();
    }
}
declare module IWG {
    class Icon extends GameGroup {
        private _bot;
        private _top;
        private _symbol;
        private _front;
        private _glow;
        private _topAnim;
        private _topPosition;
        name: string;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _liftTop();
        private _dropTop();
        private _click();
        private _disable();
        private _enableButtons();
        private _idleAnimationControl(state);
    }
}
declare module IWG {
    class Preloader extends Preloader_Core {
        private _gfx_background;
        private _logoGroup;
        private _gfx_spMainSquare;
        private _gfx_spSmallSquare1;
        private _gfx_spSmallSquare2;
        private _gfx_spSmallSquare3;
        private _gfx_spSmallSquare4;
        private _sideplayLogo;
        private _entertainnment;
        private _loadingBar;
        private _completed;
        setupLoadingScene(): void;
        private _introAnimation();
        addAssetsToLoad(): void;
        fileLoaded(progress: any, cacheKey: any, success: any, totalLoaded: any, totalFiles: any): void;
        private _assignSounds();
        onLoad(): void;
        private _onComplete();
    }
}
