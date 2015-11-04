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
                    this._subscribe();
                    this._setupButtonLayout();
                    this._setupInstructionLayout();
                }
                Instruction.prototype._subscribe = function () {
                    IWG.IWGEM.on("showInstructions", this._showInstructions.bind(this));
                    IWG.IWGEM.on("hideInstructions", this._hideInstructions.bind(this));
                    IWG.IWGEM.on("setInstructions", this._setInstructions.bind(this));
                    IWG.IWGEM.on("instructionPaneUp", this._pauseGame.bind(this));
                    IWG.IWGEM.on("instructionPaneDown", this._resumeGame.bind(this));
                };
                Instruction.prototype._unsubscribe = function () {
                    IWG.IWGEM.on("showInstructions");
                    IWG.IWGEM.on("hideInstructions");
                    IWG.IWGEM.on("setInstructions");
                };
                Instruction.prototype._setupButtonLayout = function () {
                    var instructionButton = new CLICKABLEGAMEOBJECT("instructionButton", { w: 54, h: 54 });
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
                Instruction.prototype._showInstructions = function () {
                    GLOBAL.getInstance().addToGlobal('gameState', 'instruction');
                    var button = this._children[0];
                    button.setEnabled(false);
                    var instructions = this._children[1];
                    instructions.setEnabled(true);
                    instructions.animate("showPane");
                    IWG.IWGEM.trigger("showOverlay");
                };
                Instruction.prototype._hideInstructions = function () {
                    GLOBAL.getInstance().addToGlobal('gameState', 'splash');
                    var button = this._children[0];
                    button.setEnabled(true);
                    var instructions = this._children[1];
                    instructions.setEnabled(false);
                    instructions.animate("hidePane");
                    IWG.IWGEM.trigger("hideOverlay");
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
