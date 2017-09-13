/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, HELPER = IWG.Helper, SYNCANIMATION = IWG.SyncAnimation;
            var Animation = (function () {
                function Animation() {
                    this.animations = {
                        click: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
                                gameObject.setEnabled(false);
                                TweenMax.to(gameObject.getCanvas(), 0.2, { onStart: function () {
                                        gameObject.active = true;
                                    }, repeat: 1, scaleX: 0.8, scaleY: 0.8, ease: Bounce.easeIn, yoyo: true, onComplete: function () {
                                        gameObject.active = false;
                                    } });
                            };
                        },
                        rollover: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), 0.2, { onStart: function () {
                                        gameObject.active = true;
                                    }, scaleX: scale, scaleY: scale, onComplete: function () {
                                    } });
                            };
                        },
                        rollout: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), 0.2, { onStart: function () {
                                        gameObject.active = true;
                                    }, scaleX: 1, scaleY: 1, onComplete: function () {
                                    } });
                            };
                        },
                        scaleDown: function (gameObject, time, delay, customParams) {
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), 1, { onStart: function () {
                                        gameObject.active = true;
                                    }, alpha: 0, scaleX: 0, scaleY: 0, onComplete: function () {
                                        gameObject.active = false;
                                        if (customParams) {
                                            IWG.IWGEM.trigger(customParams[0]);
                                        }
                                    } });
                            };
                        },
                        scaleUp: function (gameObject, time, delay, customParams) {
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), 1, { onStart: function () {
                                        gameObject.active = true;
                                    }, alpha: 1, scaleX: 1, scaleY: 1, onComplete: function () {
                                        gameObject.active = false;
                                        if (customParams) {
                                            IWG.IWGEM.trigger(customParams[0]);
                                        }
                                    } });
                            };
                        },
                        reminder: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                timeline.to(gameObject.getCanvas(), 1, { delay: delay }, "start")
                                    .to(gameObject.getCanvas(), 1, { scaleX: scale, scaleY: scale, yoyo: true, repeat: -1 }, "reminder");
                                timeline.play();
                            };
                        },
                        pulse: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                timeline.to(gameObject.getCanvas(), 1, { delay: delay, alpha: 1, yoyo: true, repeat: -1 }, "start");
                                timeline.play();
                            };
                        },
                        shimmer: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                timeline.to(gameObject.getBitmap('shimmer'), 0, { delay: 4 }, "start")
                                    .to(gameObject.getBitmap('shimmer'), 0.7, { x: 400, repeat: -1, repeatDelay: 1, ease: Linear.easeNone }, "reminder");
                                timeline.play();
                            };
                        },
                        highlightPulse: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                timeline.to(gameObject.getCanvas(), 1, { delay: delay, alpha: 0.6, yoyo: true, repeat: -1 }, "start");
                                timeline.play();
                            };
                        },
                        boxReminder: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            gameObject.animationTimeLine = timeline;
                            var reminder = gameObject.getBitmap('boxReminder');
                            timeline.to(reminder, 0, { delay: delay }, "start")
                                .to(reminder, 0.6, { alpha: 1, yoyo: true, repeat: -1 }, "reminder");
                            return function () {
                                timeline.play();
                            };
                        },
                        buttonReminder: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true,
                                delay: 2,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                var white = gameObject.getBitmap('button'), yellow = gameObject.getBitmap('button_glow');
                                timeline.to(yellow, 1, { alpha: 0 }, "start")
                                    .to(yellow, 0.5, { alpha: 1, yoyo: true, repeat: -1, repeatDelay: 0.5 }, "yellow")
                                    .to(gameObject.getCanvas(), 0.5, { scaleX: 1.1, scaleY: 1.1, yoyo: true, repeat: -1, repeatDelay: 0.5 }, "yellow");
                                timeline.play();
                                gameObject.animationTimeLine = timeline;
                            };
                        },
                        prizeAmountWin: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, delay: 1,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                var pen = gameObject.getBitmap('winHighlight');
                                var highlight = gameObject.getBitmap('winHighlight_white');
                                gameObject.active = true;
                                if (gameObject.getBitmap('coin') !== null) {
                                    gameObject.getBitmap('coin').alpha = 1;
                                    gameObject.getBitmap('coin').gotoAndPlay('Coin');
                                    createjs.Sound.play('bonusWin');
                                }
                                else {
                                    timeline.to(pen, 0.2, { alpha: 1, onStart: function () {
                                            pen.gotoAndPlay('pen');
                                            createjs.Sound.play('markerPen', { delay: 100 });
                                        } });
                                    timeline.to(highlight, 0.4, { delay: 1.8, alpha: 1, onComplete: function () {
                                            createjs.Sound.play('rowWin');
                                        } });
                                    timeline.play();
                                }
                            };
                        },
                        splashAnim: function (gameObject, time, delay, custom1) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0,
                                useFrames: true,
                                onComplete: function () {
                                    gameObject.active = false;
                                    gameObject.setEnabled(false);
                                }
                            });
                            return function () {
                                var icon = gameObject.getBitmap('splashanim');
                                var mainLayout = custom1;
                                gameObject.active = true;
                                icon.gotoAndPlay(icon.currentAnimation);
                                createjs.Sound.play('gamePreview', { delay: 500 });
                                timeline.to(mainLayout.getDiv(), 5, { delay: 28, alpha: 1, onStart: function () {
                                        IWG.IWGEM.trigger('soundShow');
                                    } }, 'on')
                                    .to(icon, 2, { delay: 0, alpha: 0, onComplete: function () {
                                        mainLayout.getChildren()[2].setZindex('1');
                                        IWG.IWGEM.trigger('cardComplete');
                                    } }, 'off');
                                timeline.play();
                            };
                        }
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
