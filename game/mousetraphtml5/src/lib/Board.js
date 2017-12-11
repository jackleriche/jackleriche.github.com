/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, TICKET = IWG.Ticket, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, TILE = IWG.Tile, POPUP = IWG.Popup, ENDGAME = IWG.EndGame, GLOBAL = IWG.Global;
            var Board = (function () {
                function Board() {
                    this.boardObjectsArray = [];
                    this.ticketTotalTurns = -1;
                    this.gameEnding = false;
                    this.popUpCardOpen = false;
                    this.counter = null;
                    this.arrowSpinnerSquare = null;
                    this.moveTypeDice = true;
                    this.popupMoveNumber = -1;
                    this.popUpTokenNumber = -1;
                    if (Board._instance) {
                        throw new Error("Error: Instantiation failed: Use Board.getInstance() instead of new.");
                    }
                    Board._instance = this;
                    GLOBAL.getInstance().addToGlobal('board', this);
                    this._subscribeBoard();
                }
                Board.prototype._subscribeBoard = function () {
                    IWG.IWGEM.on('popupClosed', this.animatePopupSquare.bind(this));
                    IWG.IWGEM.on('startTurn', this.startTurn.bind(this));
                    IWG.IWGEM.on('queueFinished', this.checkOnLegendUpdate.bind(this));
                };
                Board.prototype._unsubscribeBoard = function () {
                    IWG.IWGEM.off('popupClosed');
                    IWG.IWGEM.off('startTurn');
                    IWG.IWGEM.off('queueFinished');
                };
                Board.getInstance = function () {
                    return Board._instance;
                };
                Board.prototype.getIconName = function (iconNumber) {
                    return this.iconRefs[iconNumber];
                };
                Board.prototype.getBoardArray = function () {
                    return this.boardArray;
                };
                Board.prototype.getAllBoardObjects = function () {
                    return this.boardObjectsArray;
                };
                Board.prototype.getBoardObject = function (tileNumber) {
                    return this.boardObjectsArray[tileNumber];
                };
                Board.prototype.initTicket = function () {
                    TICKET.getInstance().setupTicket();
                    this.boardNum = TICKET.getInstance().getBoardNumber();
                    this.ticketTotalTurns = TICKET.getInstance().getTurns().length;
                };
                Board.prototype.setupBoard = function (boardArray, tilePositions, iconRefs) {
                    this.boardArray = boardArray[this.boardNum];
                    this.tilePositions = tilePositions;
                    this.iconRefs = iconRefs;
                    var mouseSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
                    for (var i = 0; i < this.boardArray.length; i++) {
                        var tileX = this.tilePositions[i][0], tileY = this.tilePositions[i][1], iconNumber = this.boardArray[i], iconObject = this.getIconName(iconNumber);
                        var tileObject = new TILE("tileNumber_" + i, iconNumber, iconObject.name, iconObject.frameName, { w: 100, h: 100 });
                        tileObject.setPosition({ x: tileX, y: tileY });
                        if (iconObject.value) {
                            tileObject.setPrizeValue(iconObject.value);
                        }
                        if (iconObject.frameName) {
                            tileObject.createTile(mouseSpriteSheet);
                        }
                        if (i === 16) {
                            tileObject.createSwitchTile(mouseSpriteSheet);
                        }
                        this.boardObjectsArray.push(tileObject);
                    }
                    this.arrowSpinnerSquare = this.boardObjectsArray[16];
                    TICKET.getInstance().errorCheck(Board._instance);
                };
                Board.prototype.setupPopup = function () {
                    this.popupObject = new POPUP("popup", { w: 320, h: 190 });
                    this.popupObject.setPosition({ x: -800, y: 250 });
                    this.popupObject.createPopup();
                };
                Board.prototype.checkShortPath = function (landed) {
                    var moveAmount = -1;
                    if (!landed) {
                        if (this.moveTypeDice) {
                            moveAmount = this.diceRollNumber;
                        }
                        else {
                            moveAmount = this.popupMoveNumber;
                        }
                        if (this.counter.sqStartNum + moveAmount == this.counter.sqDestNum) {
                            this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["up"]);
                        }
                        else if (this.counter.sqStartNum + (moveAmount + 3) == this.counter.sqDestNum) {
                            this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["down"]);
                            this.counter.sqCurrentNum = 19;
                        }
                    }
                    else {
                        var nextLandSquare = TICKET.getInstance().getTurn(Board.totalTurns + 1).bP - 1;
                        var nextDiceRoll = TICKET.getInstance().getTurn(Board.totalTurns + 1).d1;
                        var totalDest = this.counter.sqStartNum + nextDiceRoll;
                        if (totalDest === nextLandSquare) {
                            this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["up"]);
                        }
                        else {
                            this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["down"]);
                            this.counter.sqCurrentNum = 19;
                        }
                    }
                };
                Board.prototype.setupEndGame = function () {
                    this.endGameObject = new ENDGAME("EndGame", { w: 320, h: 190 });
                    this.endGameObject.setPosition({ x: 30, y: 0 });
                    this.endGameObject.setScale(0, 0);
                    this.endGameObject.createEndGame();
                };
                Board.prototype.checkShortPathOnThisTurn = function (fromSq, toSq, moveDistance) {
                    if ((fromSq <= 16) && (toSq > 16)) {
                        if (fromSq + moveDistance == toSq) {
                            this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["up"]);
                        }
                        else if (fromSq + (moveDistance + 3) == toSq) {
                            this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["down"]);
                        }
                        else {
                            console.log("error on cross road check");
                        }
                    }
                    else {
                        this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["normal"]);
                    }
                };
                Board.prototype.startTurn = function () {
                    this.counter.sqStartNum = this.counter.sqCurrentNum;
                    this.diceDestination = TICKET.getInstance().getTurn(Board.totalTurns).bP;
                    this.diceRollNumber = TICKET.getInstance().getTurn(Board.totalTurns).d1;
                    this.counter.sqDestNum = this.diceDestination - 1;
                    this.moveTypeDice = true;
                    this.counter.moveCounterNext();
                    this.checkShortPathOnThisTurn(this.counter.sqStartNum, this.counter.sqDestNum, this.diceRollNumber);
                };
                Board.prototype.addCollected = function (tileObject) {
                    tileObject.animate("collected");
                };
                Board.prototype.accumulateSquare = function (square, token, tileObject, isPopup, moveSpaces) {
                    this.addCollected(tileObject);
                    var iconClone = new GAMEOBJECT("iconClone", { w: 100, h: 100 }, 11);
                    iconClone.addBitmap({
                        name: "icon",
                        pos: { x: 50, y: 50 },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                        frame: tileObject.frameName,
                        scale: 1,
                        doReg: { center: true }
                    });
                    iconClone.setPosition(tileObject.getPosition());
                    iconClone.addAnimation('moveToLegend');
                    iconClone.setAnimation("moveToLegend", "moveToLegendAnimation", 0.5, 0.5, [token, square]);
                    iconClone.animate("moveToLegend");
                    if (isPopup) {
                        this.counter.setCounterDirection(token);
                        this.popupObject.updateMessage(token, moveSpaces);
                        this.popupMoveNumber = moveSpaces;
                        this.popUpTokenNumber = tileObject.tokenNumber;
                    }
                };
                Board.prototype.checkOnLegendUpdate = function () {
                    if (!this.popUpCardOpen) {
                        this.endGameCheck();
                    }
                    else {
                        this.moveAfterLegend();
                    }
                };
                Board.prototype.moveAfterLegend = function () {
                    IWG.IWGEM.trigger('popupLanded');
                    this.popUpCardOpen = false;
                };
                Board.prototype.animatePopupSquare = function () {
                    var tileObject = this.boardObjectsArray[this.counter.moveStartSquare];
                    tileObject.animate("bonusLanded");
                    this.playBonusSquareMoveSound();
                    this.moveTypeDice = false;
                };
                Board.prototype.playBonusSquareMoveSound = function () {
                    switch (this.popUpTokenNumber) {
                        case 6:
                            createjs.Sound.play("looptheloop");
                            break;
                        case 7:
                            createjs.Sound.play("bootkick");
                            break;
                        case 8:
                            createjs.Sound.play("meow");
                            break;
                    }
                };
                Board.prototype.endGameCheck = function () {
                    if ((Board.totalTurns + 1) == this.ticketTotalTurns) {
                        if (!this.gameEnding) {
                            this.gameEnding = true;
                            this.endGameStart();
                        }
                    }
                    else {
                        this.enableGameButtons();
                    }
                };
                Board.prototype.enableGameButtons = function () {
                    if (!this.popUpCardOpen) {
                        this.diceObject.setEnabled(true);
                    }
                };
                Board.prototype.endGameStart = function () {
                    IWG.IWGEM.trigger('endGameStart');
                };
                Board.prototype.accumulateIW = function (square, iwTokenNum, tileObject) {
                    createjs.Sound.play("yipee");
                    this.addCollected(tileObject);
                    tileObject.winReveal();
                    IWG.IWGEM.trigger('iwLanded');
                    this.endGameCheck();
                };
                Board.prototype.accumulateRollAgain = function (square, token, tileObject) {
                    this.addCollected(tileObject);
                    IWG.IWGEM.trigger('rollAgainLanded');
                    this.endGameCheck();
                };
                Board.prototype.processSquare = function (square, tileObject) {
                    var token = tileObject.tokenNumber;
                    tileObject.active = true;
                    switch (token) {
                        case 0:
                            if (square == 16) {
                                this.checkShortPath(true);
                            }
                            else {
                                tileObject.active = false;
                            }
                            this.endGameCheck();
                            break;
                        case 6:
                        case 7:
                        case 8:
                            this.popUpCardOpen = true;
                            var moveSpaces = TICKET.getInstance().getTurn(Board.totalTurns).eM;
                            var moveDestination = TICKET.getInstance().getTurn(Board.totalTurns).eBp;
                            var moveDestinationToken = TICKET.getInstance().getTurn(Board.totalTurns).eTt;
                            this.counter.moveStartToken = token;
                            this.counter.moveStartSquare = square;
                            this.counter.sqDestNum = moveDestination - 1;
                            this.accumulateSquare(square, token, tileObject, true, moveSpaces);
                            break;
                        case 9:
                            this.accumulateRollAgain(square, token, tileObject);
                            break;
                        case 10:
                        case 11:
                        case 12:
                            this.accumulateIW(square, token, tileObject);
                            break;
                        default:
                            this.accumulateSquare(square, token, tileObject);
                            break;
                    }
                };
                Board._instance = new Board();
                Board.totalTurns = -1;
                return Board;
            })();
            iwg.Board = Board;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Board.js.map