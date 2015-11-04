var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, SPRITESHEETS = IWG.SpriteSheets;
            var BallAudit = (function (_super) {
                __extends(BallAudit, _super);
                function BallAudit(name, _noBalls) {
                    if (_noBalls === void 0) { _noBalls = 10; }
                    _super.call(this, name);
                    this._noBalls = _noBalls;
                    this._audit = [];
                    this._index = 0;
                    this._ballAuditSubscribe();
                    this.setDimensions({
                        w: 960,
                        h: 50
                    });
                    this._setupLayout();
                }
                BallAudit.prototype._ballAuditSubscribe = function () {
                    IWG.IWGEM.on('ballAudit', this._ballAudit.bind(this));
                };
                BallAudit.prototype._ballAuditUnsubscribe = function () {
                    IWG.IWGEM.off('ballAudit');
                };
                BallAudit.prototype._setupLayout = function () {
                    for (var i = 0; i < this._noBalls; i++) {
                        var ball = new GAMEOBJECT("ball" + i, { w: 48, h: 48 }, 1, this);
                        ball.addBitmap({
                            name: "emptyBall",
                            pos: {
                                x: 24,
                                y: 24
                            },
                            frame: "audit_single",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: true
                            },
                            scale: 1
                        });
                        ball.addBitmap({
                            name: "auditBall",
                            pos: {
                                x: 24,
                                y: 24
                            },
                            frame: "audit_single",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: true
                            },
                            scale: 0,
                            alpha: 0
                        });
                        ball.setScale(0, 0);
                        ball.setAlpha(0);
                        ball.setPosition({
                            x: 48 * i
                        });
                        ball.addAnimation("shrinkAuditBall");
                        ball.setAnimation("shrinkAuditBall", "shrinkAuditBall");
                        ball.addAnimation("growAuditBall");
                        ball.setAnimation("growAuditBall", "growAuditBall");
                        this.addChild(ball);
                        this._audit.push(ball);
                        var delay = (0.5 + (i / 10));
                        TweenMax.to(ball.getCanvas(), 0.3, { delay: delay, alpha: 1, scaleX: 1, scaleY: 1, ease: Bounce.easeOut });
                    }
                };
                BallAudit.prototype._ballAudit = function (ballColor, ballNumber) {
                    var color = ballColor.split("_")[1];
                    var auditBall = this._audit[this._index];
                    auditBall.animate("shrinkAuditBall");
                    var bitmap = auditBall.getBitmap("auditBall");
                    bitmap.gotoAndStop('auditball_' + color);
                    var numberWang = new createjs.Text(ballNumber, "bold 20px Arial", "black");
                    numberWang.name = 'numberWang';
                    numberWang.textAlign = "center";
                    numberWang.x = 23;
                    numberWang.y = 10;
                    numberWang.alpha = 0;
                    auditBall.getStage().addChild(numberWang);
                    auditBall.animate("growAuditBall");
                    this._index++;
                };
                return BallAudit;
            })(iwg.Scene);
            iwg.BallAudit = BallAudit;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
