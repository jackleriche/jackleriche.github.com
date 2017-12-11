/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, GLOBAL = IWG.Global, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, OVERLAY = IWG.Overlay, SPRITESHEETS = IWG.SpriteSheets;
            var Instruction = (function () {
                function Instruction(name) {
                    this._children = [];
                    this._iActive = false;
                    this._subscribe();
                    this._setupButtonLayout();
                    this._setupInstructionLayout();
                }
                Instruction.prototype.getIActive = function () {
                    return this._iActive;
                };
                Instruction.prototype._subscribe = function () {
                    IWG.IWGEM.on("showInstructions", this._showInstructions.bind(this));
                    IWG.IWGEM.on("hideInstructions", this._hideInstructions.bind(this));
                    IWG.IWGEM.on("setInstructions", this._setInstructions.bind(this));
                    IWG.IWGEM.on("checkI", this._checkIActive.bind(this));
                    IWG.IWGEM.on("instructionPaneUp", this._pauseGame.bind(this));
                    IWG.IWGEM.on("instructionPaneDown", this._resumeGame.bind(this));
                    IWG.IWGEM.on("instructionsSetActive", this._setActive.bind(this));
                    IWG.IWGEM.on('checkInstruction', this._check.bind(this));
                };
                Instruction.prototype._unsubscribe = function () {
                    IWG.IWGEM.off("showInstructions");
                    IWG.IWGEM.off("hideInstructions");
                    IWG.IWGEM.off("checkI");
                    IWG.IWGEM.off("setInstructions");
                };
                Instruction.prototype._setupButtonLayout = function () {
                    var instructionButton = new CLICKABLEGAMEOBJECT("instructionButton", { w: 54, h: 54 }, 7);
                    this._children.push(instructionButton);
                    instructionButton.addBitmap({
                        name: "instructionButton",
                        pos: {
                            x: 27,
                            y: 27
                        },
                        frame: "button_info",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        },
                        scale: 1
                    });
                    instructionButton.setPosition({
                        x: 855,
                        y: 525
                    });
                    var hitbox = new createjs.Shape();
                    hitbox.graphics.beginFill("#000").drawRect(0, 0, 100, 100);
                    hitbox.alpha = 0.01;
                    instructionButton.getStage().addChild(hitbox);
                    instructionButton.getStage().update();
                    instructionButton.setEnabled(true);
                    instructionButton.setAction('click', function () {
                        createjs.Sound.play('iButton');
                        IWG.IWGEM.trigger("showInstructions");
                        IWG.IWGEM.trigger("showOverlay");
                    });
                };
                Instruction.prototype._setupInstructionLayout = function () {
                    var instructionPane = new CLICKABLEGAMEOBJECT("instructions", { w: 655, h: 240 }, 10);
                    this._children.push(instructionPane);
                    instructionPane.addBitmap({
                        name: "instructionPane",
                        pos: {
                            x: 318,
                            y: 20
                        },
                        frame: "instructions" + GLOBAL.getInstance().getFromGlobal('method'),
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 318,
                                y: 0
                            }
                        }
                    });
                    instructionPane.addBitmap({
                        name: "buttonClose",
                        pos: {
                            x: 630,
                            y: 20
                        },
                        frame: "button_close",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    instructionPane.setPosition({
                        x: 170,
                        y: 200
                    });
                    instructionPane.setAlpha(0);
                    instructionPane.setScale(0, 0);
                    instructionPane.setEnabled(false);
                    instructionPane.setAction('click', function () {
                        createjs.Sound.play('iButton');
                        IWG.IWGEM.trigger("hideInstructions");
                    });
                    instructionPane.addAnimation('showPane');
                    instructionPane.setAnimation('showPane', 'scaleUp', 1, 0, ['instructionPaneUp']);
                    instructionPane.addAnimation('hidePane');
                    instructionPane.setAnimation('hidePane', 'scaleDown', 1, 0, ['instructionPaneDown']);
                };
                Instruction.prototype._setInstructions = function (type) {
                    var instructions = this._children[1];
                    instructions.getStage().getChildByName('instructionPane').gotoAndStop('instructions' + type);
                };
                Instruction.prototype._setActive = function (state) {
                    var instructions = this._children[0];
                    instructions.setEnabled(state);
                };
                Instruction.prototype._showInstructions = function () {
                    GLOBAL.getInstance().addToGlobal('gameState', 'instruction');
                    var button = this._children[0];
                    button.setEnabled(false);
                    var instructions = this._children[1];
                    instructions.setEnabled(true);
                    instructions.animate("showPane");
                    IWG.IWGEM.trigger("showOverlay");
                    this._iActive = true;
                };
                Instruction.prototype._hideInstructions = function () {
                    GLOBAL.getInstance().addToGlobal('gameState', 'splash');
                    var button = this._children[0];
                    button.setEnabled(true);
                    var instructions = this._children[1];
                    instructions.animate("hidePane");
                    IWG.IWGEM.trigger("hideOverlay");
                    this._iActive = false;
                };
                Instruction.prototype._check = function () {
                    var pane = this._children[1];
                    if (this._iActive) {
                        pane.setAlpha(1);
                        pane.setScale(1, 1);
                    }
                    ;
                };
                Instruction.prototype._checkIActive = function () {
                    var isPaused = GLOBAL.getInstance().getFromGlobal('pause').getPause();
                    if (!isPaused && this._iActive === true) {
                        IWG.IWGEM.trigger("pause");
                    }
                };
                Instruction.prototype._pauseGame = function () {
                    TweenMax.pauseAll();
                };
                Instruction.prototype._resumeGame = function () {
                    TweenMax.resumeAll();
                };
                Instruction.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return Instruction;
            })();
            iwg.Instruction = Instruction;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
