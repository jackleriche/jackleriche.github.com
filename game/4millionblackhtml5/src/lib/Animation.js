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
                        fadeOut: function (gameObject, time, delay) {
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), 1, { onStart: function () {
                                        gameObject.active = true;
                                    }, alpha: 0, onComplete: function () {
                                        gameObject.active = false;
                                    } });
                            };
                        },
                        fadeIn: function (gameObject, time, delay) {
                            return function () {
                                TweenMax.to(gameObject.getCanvas(), 1, { onStart: function () {
                                        gameObject.active = true;
                                    }, alpha: 1, onComplete: function () {
                                        gameObject.active = false;
                                    } });
                            };
                        },
                        boxReminder: function (gameObject, time, delay, customParams) {
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
                            var highlight = gameObject.getBitmap('background_highlight');
                            timeline.to(highlight, 0, { delay: delay }, "start")
                                .to(highlight, 0.4, {
                                onStart: function () {
                                    if (customParams) {
                                        var winningSymbols = customParams.getWinningSymbols();
                                        for (var i = 0; i < winningSymbols.length; i++) {
                                            var coin = winningSymbols[i];
                                            if (!coin.getRevealed()) {
                                                coin.active = true;
                                                var coinSpin = coin.getBitmap("icon");
                                                coinSpin.gotoAndPlay('CoinHalf');
                                            }
                                        }
                                    }
                                }, alpha: 1, yoyo: true, repeat: -1 }, "reminder");
                            return function () {
                                timeline.play();
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
                                timeline.to(gameObject.getCanvas(), 1, { delay: 1 }, "start")
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
                                delay: 1,
                                onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                gameObject.animationTimeLine = timeline;
                                var white = gameObject.getBitmap('button'), glow = gameObject.getBitmap('button_border_glow'), yellow = gameObject.getBitmap('button_glow');
                                timeline.to(glow, 1, { alpha: 1 })
                                    .to(yellow, 0.5, { alpha: 1, yoyo: true, repeat: -1, repeatDelay: 0.5 }, "yellow");
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
                        winHighlight: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var highlight = gameObject.getBitmap('row_highlight');
                            var timeline = new TimelineLite({
                                delay: 0, onStart: function () {
                                    gameObject.active = true;
                                }, onComplete: function () {
                                    gameObject.active = false;
                                }
                            });
                            return function () {
                                if (gameObject.getName().indexOf('2') >= 0) {
                                    var row = gameObject.getBitmap('row_text');
                                    timeline.to(row, 1, { alpha: 1, delay: delay }, 'on');
                                }
                                else if (gameObject.getName().indexOf('3') >= 0) {
                                    var row = gameObject.getBitmap('row_text');
                                    timeline.to(row, 1, { alpha: 1, delay: delay }, 'on');
                                }
                                else if (gameObject.getName().indexOf('4') >= 0) {
                                    var row = gameObject.getBitmap('row_text');
                                    timeline.to(row, 1, { alpha: 1, delay: delay }, 'on');
                                }
                                timeline.to(highlight, 1, { alpha: 1, delay: delay, onStart: function () {
                                        createjs.Sound.play('rowWin');
                                    } }, 'on');
                            };
                        },
                        iconRevealG1: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, onStart: function () {
                                    TweenMax.delayedCall(1.3, function () {
                                        gameObject.getChildren()[1].reveal();
                                    });
                                },
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                        gameObject.setEnabled(false);
                                    });
                                }
                            });
                            var count = 0;
                            return function () {
                                count++;
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('icon');
                                var symbol = gameObject.getBitmap('symbol_number');
                                var flare = gameObject.getParent();
                                var flareB = null;
                                if (flare) {
                                    flareB = gameObject.getParent().getBitmap('flare');
                                }
                                gameObject.active = true;
                                icon.gotoAndPlay('Bag');
                                if (flareB !== null && count < 2) {
                                    flare.setZindex(10);
                                    flareB.gotoAndPlay('flare');
                                }
                                ;
                                timeline.to(symbol, time, { delay: 0.9, alpha: 1 }, 'on')
                                    .to(icon, time, { delay: 1.5, alpha: 0 }, 'off');
                                timeline.play();
                            };
                        },
                        prizeRevealG1: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, onStart: function () {
                                    TweenMax.delayedCall(1.4, function () {
                                        gameObject.getParent().reveal();
                                    });
                                },
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            var count = 0;
                            return function () {
                                count++;
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('word_prize');
                                var symbol = gameObject.getBitmap('prize');
                                gameObject.active = true;
                                if (count < 2) {
                                    createjs.Sound.play('wordPrize');
                                }
                                timeline.to(icon, time, { delay: 0.1, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        winRevealG1: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.getChildren()[0].active = true;
                                    gameObject.getChildren()[1].active = true;
                                },
                                paused: true, delay: 3,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getChildren()[0].active = false;
                                        gameObject.getChildren()[1].active = false;
                                    });
                                }
                            });
                            return function () {
                                var highlight = gameObject.getChildren()[0];
                                var prize = gameObject.getChildren()[1].getBitmap('prize_highlight');
                                gameObject.getChildren()[1].winReveal();
                                GLOBAL.getInstance().getFromGlobal('winners').push(gameObject.getChildren()[1]);
                                timeline.to(highlight.getCanvas(), 1, { alpha: 1, onStart: function () {
                                        createjs.Sound.play('rowWin');
                                    } }, "highlight")
                                    .to(prize, 1, { alpha: 1 }, "highlight")
                                    .to(prize, 0.5, { alpha: 0, yoyo: true, repeat: 5 });
                                timeline.play();
                            };
                        },
                        iconRevealG2: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            var count = 0;
                            return function () {
                                count++;
                                gameObject.setScale(1, 1);
                                gameObject.active = true;
                                var icon = gameObject.getBitmap('icon');
                                var symbol = gameObject.getBitmap('symbol');
                                var nameThing = gameObject.getName().indexOf('icon_2');
                                var flare = gameObject.getParent();
                                var flareB = null;
                                if (flare) {
                                    flareB = gameObject.getParent().getBitmap('flare');
                                }
                                if (gameObject.getName().indexOf('icon_2') != 9) {
                                    icon.gotoAndPlay('GBP');
                                    createjs.Sound.play('game2Pound');
                                    if (flareB !== null && count < 2) {
                                        flare.setZindex(10);
                                        flareB.gotoAndPlay('flare');
                                    }
                                    ;
                                }
                                timeline.to(icon, time, { delay: 1.2, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        winRevealG2: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.getChildren()[0].active = true;
                                    gameObject.active = true;
                                },
                                paused: true, delay: 5,
                                onComplete: function () {
                                    TweenMax.delayedCall(1, function () {
                                        gameObject.getChildren()[0].active = false;
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                var highlight = gameObject.getBitmap('symbol_highlight');
                                timeline.to(highlight, 1, { alpha: 1 }, 'on');
                                if (gameObject.getChildren()[0] !== undefined) {
                                    var go = gameObject.getChildren()[0];
                                    var prize = gameObject.getChildren()[0].getBitmap('prize_highlight');
                                    GLOBAL.getInstance().getFromGlobal('winners').push(gameObject.getChildren()[0]);
                                    timeline.to(prize, 1, { alpha: 1 }, 'on')
                                        .to(prize, 0.5, { alpha: 0, yoyo: true, repeat: 5 });
                                }
                                timeline.play();
                            };
                        },
                        iconRevealG3: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0,
                                onComplete: function () {
                                    if (gameObject.getChildren()[1]) {
                                        gameObject.getChildren()[1].reveal();
                                    }
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            var count = 0;
                            return function () {
                                count++;
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('icon');
                                var symbol = gameObject.getBitmap('symbol_number');
                                var burst = null;
                                if (gameObject.getParent()) {
                                    burst = gameObject.getParent().getBitmap('burst');
                                }
                                gameObject.active = true;
                                if (burst !== null && count < 2) {
                                    burst.gotoAndPlay('burst');
                                }
                                ;
                                if (count < 2) {
                                    createjs.Sound.play('game3Diamond');
                                }
                                icon.gotoAndPlay('Diamond');
                                timeline.to(icon, time, { delay: 1.2, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        winRevealG3: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                    createjs.Sound.play('rowWin');
                                },
                                paused: true, delay: 5,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                var row = gameObject.getBitmap('row_highlight');
                                var text = gameObject.getBitmap('row_text');
                                timeline.to(row, 1, { alpha: 1 }, 'on')
                                    .to(text, 1, { alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        prizeRevealG3: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, delay: 5,
                                onComplete: function () {
                                    TweenMax.delayedCall(1, function () {
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            return function () {
                                GLOBAL.getInstance().getFromGlobal('winners').push(gameObject);
                                var prize = gameObject.getBitmap('prize_highlight');
                                timeline.to(prize, 1, { alpha: 1 }, 'on')
                                    .to(prize, 0.5, { alpha: 0, yoyo: true, repeat: 5 });
                                timeline.play();
                            };
                        },
                        prizeWinG3: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
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
                                timeline.play();
                            };
                        },
                        yoursWinG3: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, delay: 5,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                var symbol = gameObject.getBitmap('symbol_highlight');
                                timeline.to(symbol, 1, { onStart: function () {
                                        gameObject.active = true;
                                    }, alpha: 1, onComplete: function () {
                                        gameObject.active = false;
                                    } }, 'on');
                                timeline.play();
                            };
                        },
                        iconRevealG4: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0,
                                onComplete: function () {
                                    if (gameObject.getChildren()[1]) {
                                        gameObject.getChildren()[1].reveal();
                                    }
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            var count = 0;
                            return function () {
                                count++;
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('icon');
                                var symbol = gameObject.getBitmap('symbol_number');
                                gameObject.active = true;
                                if (count < 2) {
                                    createjs.Sound.play('game4Moneyclip');
                                }
                                icon.gotoAndPlay('Money_Clip');
                                timeline.to(icon, time, { delay: 1.2, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        winRevealG4: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, delay: 5,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                var row = gameObject.getBitmap('row_highlight');
                                var text = gameObject.getBitmap('row_text');
                                timeline.to(row, 1, { onStart: function () {
                                        gameObject.active = true;
                                        createjs.Sound.play('rowWin');
                                    }, alpha: 1, onComplete: function () {
                                        gameObject.active = false;
                                    } }, 'on');
                                timeline.to(text, 1, { alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        prizeRevealG4: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.active = true;
                                },
                                paused: true, delay: 5,
                                onComplete: function () {
                                    TweenMax.delayedCall(1, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                var prize = gameObject.getBitmap('prize_highlight');
                                GLOBAL.getInstance().getFromGlobal('winners').push(gameObject);
                                timeline.to(prize, 1, { alpha: 1 }, 'on')
                                    .to(prize, 0.5, { alpha: 0, yoyo: true, repeat: 5 });
                                timeline.play();
                            };
                        },
                        iconRevealG5: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0.2,
                                onComplete: function () {
                                    if (gameObject.getChildren()[1]) {
                                        gameObject.getChildren()[1].reveal();
                                    }
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                gameObject.setScale(1, 1);
                                IWG.IWGEM.trigger('decClickCount', ['matchG5', gameObject]);
                                var icon = gameObject.getBitmap('icon');
                                var symbol = gameObject.getBitmap('symbol_number');
                                gameObject.active = true;
                                if (gameObject.getChildren().length > 1) {
                                    if (gameObject.getChildren()[1].getName().indexOf('flare') > 0) {
                                        gameObject.getChildren()[1].getBitmap('flare').gotoAndPlay('flare');
                                    }
                                }
                                icon.gotoAndPlay('Cash_Wad');
                                timeline.to(icon, time, { delay: 1.2, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        winRevealG5: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    createjs.Sound.play('rowWin');
                                    gameObject.getChildren()[0].active = true;
                                    gameObject.getChildren()[1].active = true;
                                },
                                paused: true, delay: 3.5,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getChildren()[0].active = false;
                                        gameObject.getChildren()[1].active = false;
                                    });
                                }
                            });
                            return function () {
                                var highlight = gameObject.getChildren()[0];
                                var prize = gameObject.getChildren()[1].getBitmap('prize_highlight');
                                gameObject.getChildren()[1].winReveal();
                                GLOBAL.getInstance().getFromGlobal('winners').push(gameObject.getChildren()[1]);
                                timeline.to(highlight.getCanvas(), 1, { alpha: 1 }, "highlight")
                                    .to(prize, 1, { alpha: 1 }, "highlight")
                                    .to(prize, 0.5, { alpha: 0, yoyo: true, repeat: 5 });
                                timeline.play();
                            };
                        },
                        winRevealPrizeG5: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 2; }
                            var timeline = new TimelineMax({
                                onStart: function () {
                                    gameObject.getChildren()[0].active = true;
                                },
                                paused: true, delay: 3.5,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getChildren()[0].active = false;
                                    });
                                }
                            });
                            return function () {
                                var highlight = gameObject.getChildren()[0];
                                timeline.to(highlight.getCanvas(), 1, { alpha: 1 }, "highlight");
                                timeline.play();
                            };
                        },
                        iconReveal: function (gameObject, time, delay, customParams) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0.2,
                                onComplete: function () {
                                    if (gameObject.getChildren()[1]) {
                                        gameObject.getChildren()[1].reveal();
                                    }
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('icon');
                                var symbol = gameObject.getBitmap('symbol_number');
                                gameObject.active = true;
                                if (gameObject.getChildren().length > 1) {
                                    if (gameObject.getChildren()[1].getName().indexOf('flare') > 0) {
                                        gameObject.getChildren()[1].getBitmap('flare').gotoAndPlay('flare');
                                    }
                                }
                                icon.gotoAndPlay(customParams);
                                timeline.to(icon, time, { delay: 1.2, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        prizeReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0,
                                onComplete: function () {
                                    if (gameObject.getParent()) {
                                        gameObject.getParent().reveal();
                                    }
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                    });
                                }
                            });
                            var count = 0;
                            return function () {
                                count++;
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('word_prize');
                                var symbol = gameObject.getBitmap('prize');
                                gameObject.active = true;
                                if (count < 2) {
                                    createjs.Sound.play('wordPrize');
                                }
                                timeline.to(icon, time, { delay: 0, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1 }, 'on');
                                timeline.play();
                            };
                        },
                        prizeWinReveal: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            var timeline = new TimelineMax({
                                paused: true, delay: 0.2,
                                onComplete: function () {
                                    TweenMax.delayedCall(0.5, function () {
                                        gameObject.getStage().update();
                                        gameObject.active = false;
                                    });
                                }
                            });
                            return function () {
                                gameObject.setScale(1, 1);
                                var icon = gameObject.getBitmap('prize');
                                var symbol = gameObject.getBitmap('prize_highlight');
                                gameObject.active = true;
                                timeline.to(icon, time, { delay: 0.1, alpha: 0 }, 'off')
                                    .to(symbol, time, { delay: 0.2, alpha: 1, yoyo: true, repeat: 6 }, 'on');
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
                                    .to(symbol, time, { alpha: 0 }, 'off')
                                    .to(winHighlight, time, { alpha: 1 });
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
                                        .to(prize, time, { alpha: 0 }, 'off')
                                        .to(winHighlight, time, { alpha: 1 });
                                }
                                else {
                                    timeline.to(symbolHighlight, time, { alpha: 1, repeat: 4, yoyo: true, onStart: function () {
                                            createjs.Sound.play('rowWin');
                                        } }, 'pulse')
                                        .to(highlight, time, { alpha: 1, repeat: 4, yoyo: true }, 'pulse')
                                        .to(symbol, time, { alpha: 0 }, 'off')
                                        .to(prize, time, { alpha: 0 }, 'off')
                                        .to(winHighlight, time, { alpha: 1 });
                                    ;
                                }
                                timeline.play();
                            };
                        },
                        prizePulse: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
                                var prize = gameObject.getBitmap('prize_highlight');
                                console.log(gameObject.getName());
                                TweenMax.to(prize, 0.5, { onStart: function () {
                                        gameObject.active = true;
                                    }, delay: 5, alpha: 0, yoyo: true, repeat: -1 });
                            };
                        },
                        endButtonPulse: function (gameObject, time, delay) {
                            if (time === void 0) { time = 1; }
                            if (delay === void 0) { delay = 0; }
                            return function () {
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
