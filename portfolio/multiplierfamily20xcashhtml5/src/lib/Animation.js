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
                        spin: function (gameObject, time, delay, scale) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            if (scale === void 0) { scale = 1.1; }
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), iwg.Helper.getRandomNumber(1, 4), { rotation: 360, scaleY: 1, scaleX: 1, alpha: 1, delay: iwg.Helper.getRandomNumber(2, 5), repeat: -1, yoyo: true });
                            };
                        },
                        splashButtonReminder: function (gameObject, time, delay) {
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
                                var highlight = gameObject.getBitmap('splashButtonHighlight');
                                highlight.alpha = 0;
                                timeline.to(gameObject.getCanvas(), 1, { delay: delay }, "start")
                                    .to(highlight, 1, { alpha: 1, yoyo: true, repeat: -1 }, "reminder");
                                timeline.play();
                            };
                        },
                        bagReminder: function (gameObject, time, delay, scale) {
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
                                var icon = gameObject.getBitmap('icon');
                                timeline.to(gameObject.getCanvas(), 1, { scale: 1, delay: delay }, "start")
                                    .to(gameObject.getCanvas(), 1, { scaleX: scale, scaleY: scale, yoyo: true, repeat: -1 }, "reminder");
                                timeline.play();
                            };
                        },
                        poundReminder: function (gameObject, time, delay, scale) {
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
                                var icon = gameObject.getBitmap('icon');
                                timeline.to(gameObject.getCanvas(), 1, { delay: delay }, "start")
                                    .to(gameObject.getCanvas(), 1, { scaleX: scale, scaleY: scale, yoyo: true, repeat: -1 }, "reminder");
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
                                delay: delay,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                var white = gameObject.getBitmap('button'), yellow = gameObject.getBitmap('button_glow');
                                timeline.to(yellow, 1, { alpha: 1, yoyo: true, repeat: -1, repeatDelay: 0.5 }, "yellow");
                                timeline.play();
                                gameObject.animationTimeLine = timeline;
                            };
                        },
                        symbolReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: delay,
                                onComplete: function () {
                                    TweenMax.delayedCall(1, function () {
                                        gameObject.active = false;
                                        gameObject.getBitmap('icon').alpha = 0;
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            return function () {
                                var icon = gameObject.getBitmap('icon');
                                var symbolNumber = gameObject.getBitmap('symbol_number');
                                icon.gotoAndPlay('Pound');
                                timeline.to(symbolNumber, time, { alpha: 1, delay: 0.5 }, 'on');
                                timeline.play();
                            };
                        },
                        iconReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 1,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getBitmap('icon').alpha = 0;
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            return function () {
                                var icon = gameObject.getBitmap('icon');
                                var stars = gameObject.getBitmap('stars');
                                var symbolNumber = gameObject.getBitmap('symbol_number');
                                var wordPrize = gameObject.getBitmap('wordPrize');
                                var prize = gameObject.getBitmap('prize');
                                gameObject.active = true;
                                icon.gotoAndPlay('Bag');
                                stars.gotoAndPlay('Trail');
                                timeline.to(wordPrize, time, { alpha: 0 }, 'off')
                                    .to(icon, time, { alpha: 0 })
                                    .to(prize, 1, { alpha: 1 }, 'on')
                                    .to(symbolNumber, time, { delay: 0.3, scaleX: 1.2, scaleY: 1.2, ease: Bounce.easeInOut }, 'on')
                                    .to(symbolNumber, time, { delay: 0.1, scaleX: 1, scaleY: 1 });
                                timeline.play();
                            };
                        },
                        iconPrizeReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: delay,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getBitmap('icon').alpha = 0;
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            return function () {
                                var icon = gameObject.getBitmap('icon');
                                var stars = gameObject.getBitmap('stars');
                                var symbolNumber = gameObject.getBitmap('symbol_number');
                                var wordPrize = gameObject.getBitmap('wordPrize');
                                var prize = gameObject.getBitmap('prize');
                                gameObject.active = true;
                                timeline.to(wordPrize, time, { alpha: 0 }, 'off')
                                    .to(prize, 1, { delay: 0.1, alpha: 1 }, 'off')
                                    .to(prize, 1, { delay: 0.3, onStart: function () {
                                        icon.gotoAndPlay('Bag');
                                    }, onComplete: function () {
                                        stars.gotoAndPlay('Trail');
                                    } })
                                    .to(icon, time, { alpha: 0, onStart: function () {
                                    } }, 'icon')
                                    .to(symbolNumber, time, { delay: 0.3, scaleX: 1.2, scaleY: 1.2, ease: Bounce.easeInOut })
                                    .to(symbolNumber, time, { delay: 0.1, scaleX: 1, scaleY: 1 });
                                timeline.play();
                            };
                        },
                        symbolWinReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, overwrite: true, delay: 4,
                                onComplete: function () {
                                    TweenMax.delayedCall(1, function () {
                                        gameObject.active = false;
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            return function () {
                                var symbol = gameObject.getBitmap('symbol_number');
                                var symbolHighlight = gameObject.getBitmap('symbol_highlight');
                                var winHighlight = gameObject.getBitmap('highlight');
                                timeline.to(symbolHighlight, time, { alpha: 1, repeat: 4, yoyo: true }, 'pulse')
                                    .to(winHighlight, time * 3, { alpha: 1 }, 'pulse')
                                    .to(symbol, time, { alpha: 0 }, 'off');
                                timeline.play();
                            };
                        },
                        iconWinReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, overwrite: true, delay: 4,
                                onComplete: function () {
                                    TweenMax.delayedCall(5, function () {
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            return function () {
                                var prize = gameObject.getBitmap('prize');
                                var highlight = gameObject.getBitmap('prize_highlight');
                                var symbol = gameObject.getBitmap('symbol_number');
                                var symbolHighlight = gameObject.getBitmap('symbol_highlight');
                                var winHighlight = gameObject.getBitmap('highlight');
                                if (gameObject.getTicketLabel() === 41 || gameObject.getTicketLabel() === 42 || gameObject.getTicketLabel() === 43) {
                                    timeline.call(function () {
                                        var anim = symbol.currentAnimation;
                                        symbol.gotoAndPlay(anim);
                                    }).to(highlight, time, { alpha: 1, repeat: 4, yoyo: true, onStart: function () {
                                            createjs.Sound.play('multiWin');
                                        } }, 'pulse')
                                        .to(winHighlight, time * 3, { alpha: 1 }, 'pulse')
                                        .to(prize, time, { alpha: 0 }, 'off');
                                }
                                else {
                                    timeline.to(symbolHighlight, time, { alpha: 1, repeat: 4, yoyo: true, onStart: function () {
                                            createjs.Sound.play('rowWin');
                                        } }, 'pulse')
                                        .to(highlight, time, { alpha: 1, repeat: 4, yoyo: true }, 'pulse')
                                        .to(winHighlight, time * 3, { alpha: 1 }, 'pulse')
                                        .to(symbol, time, { alpha: 0 }, 'off')
                                        .to(prize, time, { alpha: 0 }, 'off');
                                }
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