/// <reference path="../typings/tsd.d.ts" />
declare module com.camelot.core {
    function IWGInit(): void;
}
declare module BOOM {
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
        private enterIncorrectOrientation();
        private leaveIncorrectOrientation();
    }
}
declare module BOOM {
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
declare module BOOM {
    class Ticket {
        private _ticketXML;
        private _params;
        private _outcome;
        private _prizeList;
        private _turns;
        private _index;
        private _currentTurn;
        private _prizeListNumbered;
        static instance: Ticket;
        constructor();
        checkAmmount(prize: number): void;
        private _errorChecks();
        private _tierCheck(tier, outcome);
        private _checkLength(array, length);
        private _checkArrayForNumbers(array);
        private _checkPrizeID(array);
        private _checkValues(gameData, value, min, max);
        private _checkColumWin(turnData);
        private _checkCornerWin(turnData);
        private _sortGrid(grid);
        getTicket(): this;
        getGrid(): any;
        getOutcome(): any;
        getWager(): boolean;
        getCurrentTurn(): any;
        getTurns(): any[];
        getPrizeList(): any;
        getNextTurn(): any;
    }
}
declare module BOOM {
    class SplashGroup extends GameGroup {
        private _lights;
        private _lightTopLeft;
        private _lightTopRight;
        private _lightMidLeft;
        private _lightBotRight;
        private _lightBotMid;
        private _logo;
        private _winupto;
        private _playButton;
        private _instructions;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _create();
        private _hide();
        private _show();
    }
}
declare module BOOM {
    class SelectionGridGroup extends GameGroup {
        private iconArray;
        private _logo;
        private _instructions;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _setupLayout();
        private _show();
        private _hideLogo(endDelay);
    }
}
declare module BOOM {
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
declare module BOOM {
    enum ButtonState {
        DefaultState = 0,
        MouseOver = 1,
        MouseDown = 2,
        Disabled = 3,
    }
    class SpriteInfo {
        spriteSheets: any;
        frameName: any;
        swapTexture(spriteSheet: string, frameName: string): void;
    }
    interface iInteractivityScaling {
        useInteractivityScaling: boolean;
        mouseOver?: Phaser.Point;
        mouseDown?: Phaser.Point;
        disabledState?: Phaser.Point;
    }
    interface iButtonStateImages {
        buttonUpStateImageName?: string;
        buttonUpSpriteSheetName?: string;
        buttonDownStateImageName?: string;
        buttonDownSpriteSheetName?: string;
        buttonOverStateImageName?: string;
        buttonOverSpriteSheetName?: string;
        buttonDisabledSpriteSheetName?: string;
        buttonDisabledStateImageName?: string;
    }
    interface IButtonParameters {
        buttonStateImages: iButtonStateImages;
        useText?: boolean;
        textMessage?: string;
        MyOwnTextObject?: Phaser.Text;
        MyOwnButtonObject?: Phaser.Button;
        interactivityScaling?: iInteractivityScaling;
        useTints?: boolean;
        pixelPerfect?: boolean;
    }
    class ButtonEvents {
        onInputUp: Phaser.Signal;
        onInputDown: Phaser.Signal;
        onInputOver: Phaser.Signal;
        onInputOut: Phaser.Signal;
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
        buttonEvents: ButtonEvents;
        buttonState: ButtonState;
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
        setButtonImages(buttonStateImages: iButtonStateImages, setUnderfinedStatesTooButtonUpImage?: boolean): void;
        private _checkNewSpriteInfo();
    }
}
declare module BOOM {
    class EndGameGroup extends GameGroup {
        private _endgamePanel;
        private _endgameButton;
        private _endMessage;
        private _endAmount;
        private _endGroup;
        constructor();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _create();
        private _createWin();
        private _createLose();
        private _createTrial();
        private _finalBankCheck();
        createCounter(textField: Phaser.BitmapText, currentValue: number, targetValue: number, speed: number, onStart: () => any, onUpdate: () => any, onComplete: () => any, onCompleteScope: any, isAnimated: boolean): void;
        private _hide();
        private _show();
    }
}
declare module BOOM {
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
declare module BOOM {
    class Tile extends Phaser.Group {
        private _thisGroupState;
        private _spr_tileBackground;
        private _spr_tileBackgroundGold;
        private _spr_tileBackgroundWinGold;
        private _spr_tileSymbol;
        private _spr_bonusSymbol;
        private _winRevealFinalTween;
        symbolName: string;
        private _isCorner;
        private _subscribeSignals();
        private _unsubscribeSignals();
        private _onStateSwitch(state);
        private _destroy();
        constructor(game: Phaser.Game, x: number, y: number, backgroundIn: string, symbolIn: string);
        resize(width: number, height: number): void;
        setBackground(backgroundIn: string): void;
        setSymbolAlpha(value: number): void;
        animateAndChangeSymbol(symbolIn: string, delay: number): void;
        animateAndChangeCornerSymbol(symbolIn: string, delay: number): void;
        setSymbol(symbolIn: string): void;
        getSymbol(): string;
        isCorner(): boolean;
        setIsCorner(value: boolean): void;
        reveal(delay: number, onComplete?: () => any, instance?: any): void;
        flashWinReveal(delay: number, oc?: () => any, instance?: any): void;
        reset(): void;
        winRowReveal(delay: number, onComplete?: () => any, instance?: any): void;
        cornerReveal(delay: number, onComplete?: () => any, instance?: any): void;
        bonusHide(): void;
        auditReveal(symbol: string): void;
        auditFrame(): void;
        auditHide(): void;
        fromBonusReveal(): void;
        fromBonusWinReveal(): void;
        fromBonusAuditReveal(): void;
        flipAnimation(delay: number, withGold: boolean, onComplete?: () => any, instance?: any): void;
        flipStartAnimation(delay: number): void;
    }
}
declare module BOOM {
    class Multiplier extends Phaser.Group {
        private _thisGroupState;
        private _multiBackground;
        private _multiBackgroundGold;
        private _multiText;
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
        constructor(game: Phaser.Game, x: number, y: number, backgroundIn: string, textIn: string, directionIn: string);
        setBackground(backgroundIn: string): void;
        setSymbol(symbolIn: string): void;
        setPrizeValue(prizeAmount: number): void;
        getPrizeValue(): number;
        private _startPulse();
        private _stopPulse();
        winReveal(delay: number): void;
        flashWinReveal(): void;
        reset(): void;
        animateAndSwitchMultiplier(textIn: string): void;
        fromBonusWinReveal(): void;
    }
}
declare module BOOM {
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
        private _numberCornersRevealed;
        private _prize;
        private winRevealHighlight;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        constructor();
        create(): void;
        private _populateBoard();
        private _populateGridArrays(symbol);
        private _revealNextGridElement();
        private _revealSymbolsOnGrid();
        private _selectSound(count);
        private _revealCorner();
        private _anticipationWin(type);
        private _startHighlights();
        private _stopHighlights();
        private _revealNextWin();
    }
}
declare module BOOM {
    class MainGame extends GameState {
        static SPRITESHEET_ID: string;
        private _ticket;
        private _splashGroup;
        private _centreGroup;
        private _selectionGridGroup;
        private _endGameGroup;
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        create(): void;
        private _showGame();
    }
}
declare module BOOM {
    class Sounds {
        static BACKGROUNDLOOP: string;
        static BONUSREVEAL: string;
        static BONUSWIN: string;
        static ENDLOSE: string;
        static ENDWIN: string;
        static PLAYBUTTON: string;
        static PRESENTCLICK: string;
        static ROWWIN: string;
        static TILETURN: string;
        static TILETURN2: string;
        static TILETURN3: string;
        static TILETURN4: string;
        static TILETURN5: string;
        static PRESENTSMASH: string;
        static COUNT: string;
        static LINEWIN: string;
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
declare module BOOM {
    interface ITicket {
        outcome: IOutcome;
        params: IParams;
        turns: ITurns[];
    }
    interface IOutcome {
        amount: number;
        prizeTier: number;
    }
    interface IParams {
        wT: number;
        stake: number;
    }
    interface ITurns {
        i: number;
        a: number;
        b: number;
        w: number;
        value: number;
    }
    class TicketManager {
        private _ticket;
        reset(): void;
        setTicket(objIn: any): void;
        getTicket(): ITicket;
        getStake(): number;
        getIsWinner(): boolean;
        getTotalAmount(): number;
        getTurn(turnNumber: number): ITurns;
        getTurnValue(turnNumber: number): number;
        getTurnWinStatus(turnNumber: number): boolean;
        getTurnFirstSymbol(turnNumber: number): number;
        getTurnSecondSymbol(turnNumber: number): number;
    }
}
declare module BOOM {
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
declare module BOOM {
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
        private _debugClearTimer;
        private _debugArray;
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
declare module BOOM {
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
declare module BOOM {
    enum Direction {
        left = 0,
        right = 1,
    }
    interface PopRevealParams {
        thingToTween: any;
        tweenAroundPosition: Phaser.Point;
        maxSize: Phaser.Point;
        onComplete?: () => any;
        speedPercentage?: number;
        upPositionTime?: number;
        direction?: Direction;
        delay?: number;
    }
    interface ShadowObjectPulseParams {
        mainObject: any;
        secondayObject: any;
        gr_parent: any;
        scaleBeforeTween: Phaser.Point;
        delay: number;
        onComplete?: () => any;
    }
    interface PopDownParams {
        tweenAroundPosition: Phaser.Point;
        maxSize: Phaser.Point;
        thingToTween: any;
        onComplete?: () => any;
        speedPercentage?: number;
        direction?: Direction;
        delay: number;
    }
    class PopRevealTween {
        private _tweenAngles;
        private _tweenPositions;
        scaleUpSymbol(popRevealParams: PopRevealParams): void;
        shadowObjectPulse(shadowObjectPulseParams: ShadowObjectPulseParams): void;
        tweenDownOFSymbolReveal(popDownParams: PopDownParams): void;
    }
}
declare module BOOM {
    interface PowerPulseTweenParams {
        containingGroup: Phaser.Group;
        tweenAroundPosition: Phaser.Point;
        mainObject?: any;
        topLayerGlow: any;
        bottomLayerGlow: any;
        delay?: number;
        direction?: Direction;
        goingIntoUpPose?: () => any;
        goingOutOfUpPose?: () => any;
        onComplete?: () => any;
    }
    class PowerPulseTween {
        private _doubleIdleAngles;
        private _doublerIdleTweenXPositions;
        powerPulseTweenMethod(powerPulseTweenParams: PowerPulseTweenParams): void;
    }
}
declare module BOOM {
    class ReuseableTweens {
        popRevealTweens: PopRevealTween;
        powerPulseTween: PowerPulseTween;
        flashWinText(textToCopy: Phaser.Text, grp_Parent: Phaser.Group, fontType: Phaser.Text, FlashSize: number, scaleUpSize: number, triggerRepeat: boolean): void;
    }
}
declare module BOOM {
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
        private _game2Information;
        private _outCome;
        private _ticket;
        private _params;
        private _upperCurrencySymbol;
        private _lowerCurrencySymbol;
        private _dualSymbolCurrency;
        init(input1: any): boolean;
        initTicket(): boolean;
        xmlToJson(xml: any): {};
        gameFinished(): void;
        isWinningGame(): boolean;
        getIsTrial(): number;
        private _flushTicketData();
        isDualCurrency(): boolean;
        getUpperCurrencySymbol(): string;
        getLowerCurrencySymbol(): string;
    }
}
declare module BOOM {
    class ErrorManager {
        fire(errorCode: string, errorMessage: string, severity: number): void;
    }
}
declare module BOOM {
    class CurrencySymbols {
        upperCurrencySymbol: string;
        lowerCurrencySymbol: string;
    }
    class GameManager extends Phaser.Game {
        static instance: GameManager;
        static NATIVE_HEIGHT: number;
        static NATIVE_WIDTH: number;
        static DEBUG: boolean;
        static OFFLINE: boolean;
        private _currentTurnIndex;
        private _completedGameRows;
        private _basePath;
        private _signalManager;
        private _ticketManager;
        private _ticket;
        private _errorManager;
        private _debugManager;
        private _legendManager;
        private _boot;
        private _preloader;
        private _mainGame;
        audioManager: AudioManager;
        reuseTweens: ReuseableTweens;
        private _gameIsErrorFree;
        private _ticketIsErrorFree;
        currentStake: number;
        private _mainGameAnimsFinished;
        private _betSceneAnimsFinished;
        private _endWinAnimsFinished;
        private _endLoseAnimsFinished;
        private _languageCurrency;
        private _lastPlacedBet;
        private _symbolsRevealedNumber;
        private _isRevealingSymbol;
        private _queue;
        private _clickCount;
        private _lastSymbolRevealed;
        symbolsRevealedNumber: number;
        constructor(loader: any, basePath?: string);
        private _subscribeSignals();
        private _unsubscribeSignals();
        getNextGameRow(): ITurns;
        checkIfMainGameIntroFinished(): void;
        showWinPanelWhenAnimsFinished(): void;
        showLosePanelWhenAnimsFinished(): void;
        private _switchState(state, clearWorld?, clearCache?);
        private _updateCompletedGameRows();
        getBasePath(): string;
        getRandomNumberPosOrNeg(range: number): number;
        private _pauseAllTweens();
        private _resumeAllTweens();
        moveAcrossGroupsKeepingWorldTransform(object: any, targetObject: Phaser.Group): void;
        getWorldTransForm(object: any): Phaser.Point;
        private _resetGameRowIndex();
        getTicketManager(): TicketManager;
        getErrorManager(): ErrorManager;
        getLegendManager(): LegendManager;
        getGameBoard(): number[][];
        formatCurrency(numToFormat: number | string): string;
        private prepNumbers(numIn, n, x, s, c);
        getGameMultipliers(): number[];
        message(messageIn: string, ...args: any[]): void;
        getAudioManager(): AudioManager;
        private _finishReveal();
        private _revealNextSymbol(value?);
        getSymbol(index: number): string;
        private _incClickCount();
    }
}
declare module BOOM {
    class Icon extends GameGroup {
        private _symbol;
        private _iconTop;
        private _iconBot;
        private _iconBow;
        private _shadow;
        private _value;
        private _boxType;
        private _enabled;
        private _idleTopAnimation;
        private _idleBowAnimation;
        constructor(boxType: number);
        private _click();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _getSymbol(index);
        private _tweenTint(spriteToTween, startColor, endColor, duration);
        private _disable();
        private _idleAnimationControl(state);
    }
}
declare module BOOM {
    class SoundButton extends GameGroup {
        private _button;
        private _active;
        constructor();
        private init();
        private _buttonPress();
        subscribeSignals(): void;
        unsubscribeSignals(): void;
        private _move();
    }
}
declare module BOOM {
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
declare module BOOM {
    class Spinner {
        _spinner: any;
        _spinnerCircle: any;
        _hasBeenHidden: boolean;
        _time: Phaser.Timer;
        constructor();
        hideSpinner(): void;
        showSpinner(): void;
        showSpinnerImmediately(): void;
    }
}
declare module BOOM {
    class GameFonts {
        static createStandardFont(): Phaser.Text;
        static createMultiplierWinFont(): Phaser.Text;
        static createEndWinFont(): Phaser.Text;
        static flashWinText(textToCopy: Phaser.Text, grp_Parent: Phaser.Group, fontType: Phaser.Text, FlashSize: number, scaleUpSize: number, triggerRepeat: boolean): void;
    }
}
declare module BOOM {
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
declare module BOOM {
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
declare module BOOM {
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
        constructor(smallButtonx: number, smallbuttonY: number, isTrial: number, overlayType?: string, trialPosition?: string, audioSettings?: string);
        private _addTextToMenu();
        private _addSmallAudioButton();
        private _addFullMenu();
        private _openMenu();
        private _closeMenu();
        private _musicToggle();
        private _audioToggle();
    }
}
declare module BOOM {
    class CamelotPreloader extends GameState {
        addImage(name: string): void;
        addSpriteSheet(name: string): void;
        addSound(id: string): void;
        addBitmapFont(name: string, space: number): void;
        create(): void;
    }
}
