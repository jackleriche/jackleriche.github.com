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
                        frame: "icon_info",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        },
                        scale: 1
                    });
                    instructionButton.setPosition({
                        x: 180,
                        y: 515
                    });
                    instructionButton.setEnabled(true);
                    instructionButton.setAction('click', function () {
                        createjs.Sound.play("instructionButton");
                        IWG.IWGEM.trigger("showInstructions");
                        IWG.IWGEM.trigger("showOverlay");
                    });
                };
                Instruction.prototype._setupInstructionLayout = function () {
                    var instructionPane = new CLICKABLEGAMEOBJECT("instructions", { w: 310, h: 360 }, 10);
                    this._children.push(instructionPane);
                    instructionPane.addBitmap({
                        name: "instructionPane",
                        pos: {
                            x: 147,
                            y: 195
                        },
                        frame: "instructions",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    instructionPane.addBitmap({
                        name: "instructionClose",
                        pos: {
                            x: 290,
                            y: 35
                        },
                        frame: "button_close",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    instructionPane.setPosition({
                        x: 40,
                        y: 160
                    });
                    instructionPane.setAlpha(0);
                    instructionPane.setScale(0, 0);
                    instructionPane.setEnabled(false);
                    instructionPane.setAction('click', function () {
                        createjs.Sound.play('instructionButton');
                        IWG.IWGEM.trigger("hideInstructions");
                    });
                    instructionPane.addAnimation('showPane');
                    instructionPane.setAnimation('showPane', 'scaleUp');
                    instructionPane.addAnimation('hidePane');
                    instructionPane.setAnimation('hidePane', 'scaleDown');
                };
                Instruction.prototype._setInstructions = function (type) {
                    var instructions = this._children[1];
                    instructions.getStage().getChildByName('instructionPane').gotoAndStop('instructions' + type);
                };
                Instruction.prototype._showInstructions = function () {
                    var button = this._children[0];
                    button.setEnabled(false);
                    var instructions = this._children[1];
                    instructions.setEnabled(true);
                    instructions.animate("showPane");
                    IWG.IWGEM.trigger("showOverlay");
                };
                Instruction.prototype._hideInstructions = function () {
                    var button = this._children[0];
                    button.setEnabled(true);
                    var instructions = this._children[1];
                    instructions.setEnabled(false);
                    instructions.animate("hidePane");
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
