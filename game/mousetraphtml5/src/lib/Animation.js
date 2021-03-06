/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Animation = (function () {
                function Animation() {
                    this.animations = {
                        arrowSwitchAnimation: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (customParams === void 0) { customParams = null; }
                            var arrowTop = gameObject.getBitmap('arrowTop'), arrowBottom = gameObject.getBitmap('arrowBottom');
                            if (customParams[0] == "start") {
                                var tl = new TimelineMax({ repeat: -1 });
                                tl.add(TweenMax.to(arrowTop, 0.25, { alpha: 1 }));
                                tl.add(TweenMax.to(arrowTop, 0.25, { alpha: 0 }), "up");
                                tl.add(TweenMax.to(arrowBottom, 0.25, { alpha: 1 }));
                                tl.add(TweenMax.to(arrowBottom, 0.25, { alpha: 0 }), "down");
                                gameObject._animationTimeLine = tl;
                                return function () {
                                    gameObject._animationTimeLine.play();
                                };
                            }
                            else if (customParams[0] == "up") {
                                return gameObject._animationTimeLine.pause("up");
                            }
                            else if (customParams[0] == "down") {
                                return gameObject._animationTimeLine.pause("down");
                            }
                            else if (customParams[0] == "normal") {
                                return gameObject._animationTimeLine.play();
                            }
                        },
                        legendIconReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
                                var icon = gameObject.getStage().children[0], filter = gameObject.getStage().children[1];
                                var timeLine = new TimelineLite({ onStart: function () {
                                        gameObject.active = true;
                                    }, onComplete: function () {
                                        gameObject.getStage().removeChild(filter);
                                        IWG.IWGEM.trigger('animationEnd');
                                        IWG.IWGEM.trigger('checkLegendRow');
                                        gameObject.active = false;
                                    } });
                                timeLine.to(icon, time, { delay: delay, alpha: 1 }, 0)
                                    .to(filter, time, { delay: delay, alpha: 0 }, 0);
                                createjs.Sound.play("scratch2");
                            };
                        },
                        legendRowHighlight: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var bg = gameObject.getStage().children[0], current = bg.currentAnimation, newString = [current.slice(0, 9), "_highlight", current.slice(9)].join('');
                            return function () {
                                bg.gotoAndStop(newString);
                                gameObject.getStage().update();
                            };
                        },
                        prizeHightlight: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (customParams === void 0) { customParams = null; }
                            var prize = gameObject.getBitmap(customParams[1]);
                            return function () {
                                prize.gotoAndStop(customParams[0]);
                                gameObject.getStage().update();
                            };
                        },
                        collectedReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var collectedSymbol = gameObject.getBitmap('collected');
                            return function () {
                                TweenMax.to(collectedSymbol, time, { y: 80, delay: delay, alpha: 1,
                                    onComplete: function () {
                                        createjs.Sound.play("scratch2");
                                        gameObject.active = false;
                                    } });
                            };
                        },
                        moveToLegendAnimation: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (customParams === void 0) { customParams = null; }
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), time, { x: 700, y: 100, scaleX: 2, scaleY: 2, delay: delay, alpha: 1,
                                    onStart: function () {
                                        createjs.Sound.play("whirl");
                                    },
                                    onComplete: function () {
                                        IWG.IWGEM.trigger('updateLegend', [customParams[0]]);
                                        gameObject.destroy();
                                    } });
                            };
                        },
                        tile_IW_winReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
                                gameObject.getBitmap("icon").gotoAndStop("iwh" + gameObject.getPrizeValue());
                                CORE.IWG.ame('bank', { deposit: [gameObject.getPrizeValue()], log: true });
                            };
                        },
                        tile_bonus_reveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
                                var popupIcon = gameObject.getBitmap('icon');
                                gameObject.active = true;
                                TweenMax.to(popupIcon, time, { onStart: function () {
                                        popupIcon.play();
                                    },
                                    onComplete: function () {
                                        gameObject.active = false;
                                    } });
                            };
                        },
                        show_popup: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var popupMain = gameObject.getCanvas();
                            return function () {
                                TweenMax.to(popupMain, time, { x: 350, delay: delay, ease: Elastic.easeOut.config(1.5, 0.75), onStart: function () {
                                        IWG.IWGEM.trigger('popupOpening');
                                    },
                                    onComplete: function () {
                                        IWG.IWGEM.trigger('popupOpened');
                                    } });
                            };
                        },
                        hide_popup: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var popupMain = gameObject.getCanvas();
                            return function () {
                                TweenMax.to(popupMain, time, { x: -550, delay: delay, onComplete: function () {
                                        IWG.IWGEM.trigger('popupClosed');
                                    } });
                            };
                        },
                        roll_again_out: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var rollAgainIcon = gameObject.getBitmap("rollAgain"), rollAgainNum = gameObject.getBitmap("rollAgainNumber"), diceCogShadow = gameObject.getBitmap("diceBGShadow"), diceCog = gameObject.getBitmap("diceBG");
                            return function () {
                                TweenMax.to(rollAgainIcon, time, { x: 75, y: 135, delay: delay,
                                    onStart: function () {
                                        gameObject.active = true;
                                    },
                                    onComplete: function () {
                                        TweenMax.to(rollAgainIcon, 1.2, { rotation: 360, repeat: -1, ease: Linear.easeNone });
                                        TweenMax.to(diceCog, 3, { rotation: -360, repeat: -1, ease: Linear.easeNone });
                                        TweenMax.to(diceCogShadow, 3, { rotation: -360, repeat: -1, ease: Linear.easeNone });
                                    } });
                                TweenMax.to(rollAgainNum, time, { x: 75, y: 135, delay: delay });
                            };
                        },
                        roll_again_in: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var rollAgainIcon = gameObject.getBitmap("rollAgain"), rollAgainNum = gameObject.getBitmap("rollAgainNumber"), diceCogShadow = gameObject.getBitmap("diceBGShadow"), diceCog = gameObject.getBitmap("diceBG");
                            return function () {
                                TweenMax.to(rollAgainIcon, time, { x: 160, y: 100, delay: delay,
                                    onStart: function () {
                                        gameObject.active = true;
                                        TweenMax.to(rollAgainIcon, time, { rotation: 0, ease: Linear.easeNone });
                                        TweenMax.to(diceCog, time, { rotation: 0, ease: Linear.easeNone });
                                        TweenMax.to(diceCogShadow, time, { rotation: 0, ease: Linear.easeNone });
                                        TweenMax.to(rollAgainNum, time, { x: 160, y: 100, delay: delay });
                                    },
                                    onComplete: function () {
                                    } });
                            };
                        },
                        show_endGame: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var endGame = gameObject.getCanvas();
                            return function () {
                                TweenMax.to(endGame, time, { scaleX: 1, scaleY: 1, delay: delay, onComplete: function () {
                                        IWG.IWGEM.trigger('endGameShown');
                                    } });
                            };
                        },
                        endGame_finish: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var endGameFinish = gameObject.getBitmap("finishButton");
                            return function () {
                                TweenMax.to(endGameFinish, time, { scaleX: 0.9, scaleY: 0.9, repeat: -1, yoyo: true, delay: delay, onStart: function () {
                                        gameObject.active = true;
                                    } });
                            };
                        },
                        roll_dice: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (customParams === void 0) { customParams = null; }
                            var rollDice = gameObject.getBitmap("diceAnimation");
                            return function () {
                                rollDice.gotoAndPlay("dice_roll_" + customParams[0]);
                            };
                        },
                        spin_star: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (customParams === void 0) { customParams = null; }
                            var star = gameObject.getBitmap("diceStar");
                            return function () {
                                TweenMax.to(star, time, { rotation: 360, repeat: -1, delay: delay, ease: Linear.easeNone });
                            };
                        },
                        dice_scale: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (customParams === void 0) { customParams = null; }
                            var diceScale = gameObject.getBitmap("diceAnimation"), starSpin = gameObject.getBitmap("diceStar");
                            return function () {
                                if (customParams) {
                                    TweenMax.to(diceScale, time, { scaleX: 1.2, scaleY: 1.2, ease: Linear.easeNone });
                                    starSpin.alpha = 0;
                                }
                                else {
                                    TweenMax.to(diceScale, time, { scaleX: 1, scaleY: 1, ease: Linear.easeNone });
                                    starSpin.alpha = 1;
                                }
                            };
                        },
                    };
                    if (Animation._instance) {
                        throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
                    }
                    Animation._instance = this;
                }
                Animation.getInstance = function () {
                    return Animation._instance;
                };
                Animation._instance = new Animation();
                return Animation;
            })();
            iwg.Animation = Animation;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Animation.js.map