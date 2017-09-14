(function (window) {
    "use strict";

    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        core = camelot.core,
        iwg = camelot.iwg,
        lib = iwg.lib,
        GS = window.com.greensock,
        Helper = lib.Helper,
        R = lib.R,
        GameAsset = lib.GameAsset,
        MEvent = lib.MEvent,
        Ticket = lib.Ticket,
        REMINDER,

        Weight = function (x, y, gapY, gapX, slide, ticketData) {

            var _x = x,
                _y = y,
                _gapY = gapY,
                _gapX = gapX,
                _slide = slide,
                _ticketData = ticketData,
                _turnData = [],
                _turnArray = [],
                _gameAssetsArray = [],
                _isFinished = false,
                _container = new createjs.Container(),
                _rowContainerArray = [];

            _container.name = "weight";

            // getters
            this.getX = function () {
                return _x;
            };
            this.getY = function () {
                return _y;
            };
            this.getGapY = function () {
                return _gapY;
            };
            this.getGapX = function () {
                return _gapX;
            };
            this.getSlide = function () {
                return _slide;
            };
            this.getTicketData = function () {
                return _ticketData;
            };
            this.getTurnData = function () {
                return _turnData;
            }
            this.getTurnArray = function () {
                return _turnArray;
            }
            this.getIsFinished = function () {
                return _isFinished;
            }
            this.getContainer = function () {
                return _container;
            }
            this.getGameAssetArray = function () {
                return _gameAssetsArray;
            }
            this.getRowContainerArray = function () {
                return _rowContainerArray;
            }

            // setters
            this.setX = function (prv) {
                _x = prv;
            };
            this.setY = function (prv) {
                _y = prv;
            };
            this.setGapY = function (prv) {
                _gapY = prv;
            };
            this.setGapX = function (prv) {
                _gapX = prv;
            };
            this.setSlide = function (prv) {
                _slide = prv;
            };
            this.setTurnData = function (prv) {
                _turnData = prv;
            };
            this.setTurnArray = function (prv) {
                return _turnArray;
            }
            this.setIsFinished = function (prv) {
                _isFinished = prv;
            }
            this.setContainer = function (prv) {
                _container = prv;
            }
            this.addRowContainerArray = function (prv) {
                _rowContainerArray.push(prv);
            }

            init(this);

        }

        function init(t) {

            setupLayout(t);
            t.setTurnData([t.getTicketData().go[0], t.getTicketData().go[1], t.getTicketData().go[2], t.getTicketData().go[3]]);
            for (var turn in t.getTurnData()) {
                var current = t.getTurnData()[turn],
                    turnLayout = setupTurnsLayout(t, current, turn);
            }
            // setup paused reminder
            t.setupReminder();
        }

        function setupLayout(t) {

            var cont = t.getContainer();
            cont.y = t.getY();
            cont.x = t.getX();

            var box = Helper.makeBitmapImage("box_games", {
                x: 0,
                y: 0
            }),
                boxHighlight = Helper.makeBitmapImage("box_games_glower", {
                    x: -3,
                    y: -3
                }, 0),
                weightDivider1 = Helper.makeBitmapImage("games_divider", {
                    x: 40,
                    y: 120
                }, 1, false),
                weightDivider2 = Helper.makeBitmapImage("games_divider", {
                    x: 40,
                    y: 195
                }, 1, false),
                weightDivider3 = Helper.makeBitmapImage("games_divider", {
                    x: 40,
                    y: 270
                }, 1, false),
                weightRow = Helper.makeBitmapImage('rows_game4', {
                    x: 37,
                    y: 55
                }, 1, false),
                weightCol = Helper.makeBitmapImage('game4_labelling', {
                    x: 85,
                    y: 25
                }, 1, false),
                weightInfo = Helper.makeBitmapImage('instruction_game4', {
                    x: 20,
                    y: 370
                }, 1, false);
            weightRow.name = "weightRow";
            boxHighlight.name = "boxHighlight";
            cont.addChild(box, weightDivider1, weightDivider2, weightDivider3, weightRow, weightCol, weightInfo, boxHighlight);
            t.getSlide().addChild(cont);

            // setup listeners
            iwg.IWGEM.addEventListener(MEvent.WEIGHTREVEAL.type, weightRowReveal);

        }

        function setupTurnsLayout(t, turnData, itt) {

            var tokens = [],
                rowAssetsArray = [],
                iconData = turnData.v,
                rowContainer = new createjs.Container();
            rowContainer.name = "rowContainer";
            rowContainer.isRevealed = false;
            rowContainer.y = (t.getGapY() * itt) + 42;
            rowContainer.x = 110;
            t.addRowContainerArray(rowContainer);

            var values = [turnData.y, turnData.t],
                prize = turnData.p,
                pList = Ticket.instance.getPrizeList(),
                winner = turnData.w,
                gapX = t.getGapX();

            var weightBgShape = new createjs.Shape();
            weightBgShape.graphics.beginFill("#fff").drawRect(-93, rowContainer.y - 40, 382, 76);
            weightBgShape.alpha = 0;
            weightBgShape.name = "matchThreeBgShape";
            rowContainer.addChild(weightBgShape);

            for (var value in values) {

                var container = new createjs.Container(),
                    spacingX = gapX * value,
                    tokenString = "w" + values[value],
                    token = Helper.makeBitmapImage(tokenString, {
                        x: 12,
                        y: 0
                    }, 0, true),
                    symbol = Helper.makeBitmapImage("game4_seven", {
                        x: 0,
                        y: 0
                    }, 1, true);
                container.x = spacingX;
                container.y = rowContainer.y;
                container.token = value;
                container.row = itt;
                container.addChild(token, symbol);

                container.on('click', function (ev) {
                    if (rowContainer.isRevealed == false) {
                        rowContainer.isRevealed = true;
                        var current = rowAssetsArray[ev.currentTarget.token];
                        MEvent.WEIGHTREVEAL.t = t;
                        MEvent.WEIGHTREVEAL.current = current;
                        iwg.IWGEM.dispatchEvent(MEvent.WEIGHTREVEAL);
                        t.stopReminder();
                    }

                }, null, true);

                var gameAssetFunctions = {
                    "reveal": gameReveal
                },
                    gameAsset = new GameAsset(container, {
                        isWinner: winner
                    }, gameAssetFunctions);

                rowAssetsArray.push(gameAsset);

                rowContainer.addChild(container);
            }

            var prizeString = "lose" + Helper.fixPrizeValue(pList[prize]),
                prizeContainer = new createjs.Container(),
                prizeToken = Helper.makeBitmapImage(prizeString, {
                    x: 0,
                    y: 0
                }, 0, true),
                prizeSymbol = Helper.makeBitmapImage("word_prize", {
                    x: 0,
                    y: 0
                }, 1, true),
                prizeAssetFunctions = {
                    "reveal": gameReveal
                },
                prizeAsset = new GameAsset(prizeContainer, {
                    isWinner: winner,
                    prizeValue: pList[prize]
                }, gameAssetFunctions);
            prizeContainer.token = 2;
            prizeContainer.row = itt;
            prizeContainer.y = rowContainer.y;
            prizeContainer.x = 220;

            prizeContainer.on('click', function (ev) {
                if (rowContainer.isRevealed == false) {
                    rowContainer.isRevealed = true;
                    var current = rowAssetsArray[ev.currentTarget.token];
                    MEvent.WEIGHTREVEAL.t = t;
                    MEvent.WEIGHTREVEAL.current = current;
                    iwg.IWGEM.dispatchEvent(MEvent.WEIGHTREVEAL);
                    t.stopReminder();
                }
            }, null, true);

            rowAssetsArray.push(prizeAsset);
            prizeContainer.addChild(prizeToken, prizeSymbol);
            rowContainer.addChild(prizeContainer);

            t.setY(t.getY() + t.getGapY());

            t.getContainer().addChild(rowContainer);

            var gameAssetArray = t.getGameAssetArray();
            gameAssetArray.push(rowAssetsArray);

        }

        function weightRowReveal(ev) {

            var token = ev.current.getContainer().token,
                r = ev.current.getContainer().row,
                t = ev.t,
                array = t.getGameAssetArray(),
                currentRow = array[r],
                contParent = ev.current.getContainer().parent,
                delay = 0;
            ev.current.reveal('reveal', ev.current, 0);
            ev.current.setIsRevealed(true);

            for (var symbol in currentRow) {
                var c = currentRow[symbol];
                if (!c.getIsRevealed()) {
                    c.setIsRevealed(true);
                    c.reveal('reveal', c, delay += 800);
                }
            }
            Helper.stopPrompt();
            R.clickCount++;
            // delay then check winner
            var bgHighlight = contParent.getChildByName("matchThreeBgShape");
            t.checkWeightWin(bgHighlight, currentRow[2], array[r], delay);

        }

        function gameReveal() {

            this.setIsRevealed(true);
            if (this.getContainer()) {

                var container = this.getContainer(),
                    par = container.parent,
                    obj = container.children[1],
                    icon = container.children[0],
                    cloneY = container.y,
                    cloneStartX = container.x,
                    rowNum = container.row,
                    shinerArray = [];

                var clone = container.children[1].clone();
                clone.y = container.y - 20;
                clone.x = container.x;
                clone.scaleX = clone.scaleY = 0;

                for (var i = 0; i <= 5; i++) {

                    var shiner = Helper.makeBitmapImage("game1_diamond", {
                        x: 0,
                        y: 0
                    }, 1);
                    shiner.x = container.x;
                    shiner.y = container.y;
                    shiner.scaleX = shiner.scaleY = 0.25;
                    container.parent.addChild(shiner);
                    shinerArray.push(shiner);
                }

                TweenLite.to(shinerArray[0], 0.8, {
                    bezier: [{
                        x: shinerArray[0].x,
                        y: shinerArray[0].y
                    }, {
                        x: shinerArray[0].x - 30,
                        y: shinerArray[0].y - 30
                    }, {
                        x: shinerArray[0].x - 60,
                        y: shinerArray[0].y + 30
                    }],
                    alpha: 0
                });
                TweenLite.to(shinerArray[1], 0.8, {
                    bezier: [{
                        x: shinerArray[1].x,
                        y: shinerArray[1].y
                    }, {
                        x: shinerArray[1].x - 20,
                        y: shinerArray[1].y - 40
                    }, {
                        x: shinerArray[1].x - 40,
                        y: shinerArray[1].y + 30
                    }],
                    alpha: 0
                });
                TweenLite.to(shinerArray[2], 0.8, {
                    bezier: [{
                        x: shinerArray[2].x,
                        y: shinerArray[2].y
                    }, {
                        x: shinerArray[2].x - 10,
                        y: shinerArray[2].y - 50
                    }, {
                        x: shinerArray[2].x - 20,
                        y: shinerArray[2].y + 30
                    }],
                    alpha: 0
                });
                TweenLite.to(shinerArray[3], 0.8, {
                    bezier: [{
                        x: shinerArray[3].x,
                        y: shinerArray[3].y
                    }, {
                        x: shinerArray[3].x + 10,
                        y: shinerArray[3].y - 50
                    }, {
                        x: shinerArray[3].x + 20,
                        y: shinerArray[3].y + 30
                    }],
                    alpha: 0
                });
                TweenLite.to(shinerArray[4], 0.8, {
                    bezier: [{
                        x: shinerArray[4].x,
                        y: shinerArray[4].y
                    }, {
                        x: shinerArray[4].x + 20,
                        y: shinerArray[4].y - 40
                    }, {
                        x: shinerArray[4].x + 40,
                        y: shinerArray[4].y + 30
                    }],
                    alpha: 0
                });
                TweenLite.to(shinerArray[5], 0.8, {
                    bezier: [{
                        x: shinerArray[5].x,
                        y: shinerArray[5].y
                    }, {
                        x: shinerArray[5].x + 30,
                        y: shinerArray[5].y - 30
                    }, {
                        x: shinerArray[5].x + 60,
                        y: shinerArray[5].y + 30
                    }],
                    alpha: 0
                });

                TweenLite.to(obj, 0.3, {
                    delay: 0,
                    scaleY: 0,
                    scaleX: 0
                });
                TweenLite.to(icon, 0.3, {
                    delay: 0,
                    alpha: 1
                });
                TweenLite.to(clone, 0.3, {
                    delay: 0,
                    alpha: 0.8,
                    scaleY: 1.4,
                    scaleX: 1.4,
                    y: clone.y + 20
                });
                TweenLite.to(clone, 0.3, {
                    delay: 0.15,
                    alpha: 0
                });

                par.addChild(clone);

            } else {
                core.IWG.ame('error', {
                    mes: ['couldnt get icon Container - error code 03a1']
                });
            }
            if (container.token != 2) {
                if (R.PLAYSOUND) {
                    createjs.Sound.play("weightReveal");
                }
            } else {
                if (R.PLAYSOUND) {
                    createjs.Sound.play("prizeReveal");
                }
            }

        }

    Weight.prototype.checkWeightWin = function (gameContainer, prize, rowArray, delay) {

        var bankAmount = prize.prizeValue;
        if (prize.isWinner == '1') {
            // bank amount
            core.IWG.ame('bank', {
                deposit: [bankAmount],
                log: true
            });

            var highlight = gameContainer;
            var highlightTimeline = new TimelineMax({
                delay: 2.5,
                repeat: 4,
                yoyo: true,
                onStart: highlightPrizeAmount,
                onStartParams: [prize, rowArray]
            });
            highlightTimeline.to(highlight, 0.7, {
                alpha: 0.3,
                ease: "easeIn"
            })
            var rowParent = rowArray[0].getContainer().parent.parent;
            var rowName = rowParent.getChildByName("weightRow");
            Helper.moveToTop(rowName);

        }
        setTimeout(function () {
            R.clickCount--;
            MEvent.RESETPROMPT.param = R.clickCount;
            iwg.IWGEM.dispatchEvent(MEvent.RESETPROMPT);
        }, 1000)
        this.isFinished();
    }

    function highlightPrizeAmount(prize, rowArray) {

        for (var i = 0; i <= 1; i++) {
            var numberDisplay = rowArray[i].getContainer().children[0],
                string = numberDisplay.currentAnimation + "g";

            numberDisplay.gotoAndStop(string);

        }
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
    }

    function makeWinSound() {
        createjs.Sound.play("glossy_success_19");
    }

    function makeSound(sound) {

        createjs.Sound.play(sound);
        createjs.Sound.play(sound, "", 200);
        createjs.Sound.play(sound, "", 500);

        setTimeout(function () {
            R.clickCount--;
            MEvent.RESETPROMPT.param = R.clickCount;
            iwg.IWGEM.dispatchEvent(MEvent.RESETPROMPT);
        }, 1000)

    }
    /*
    Weight.prototype.reminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;
        var highlightTimeline = new TimelineMax({
            delay: 1,
            repeat: -1,
            yoyo: true
        });
        highlightTimeline.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn"
        });

        R.REMINDERS.push(highlightTimeline);
    }
    */

    // setup reminders - simple tween , paused on start
    Weight.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

        Weight.REMINDER = TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            delay: 1,
            repeat: -1,
            yoyo: true
        });

        Weight.REMINDER.pause();
    }

    // restart reminder
    Weight.prototype.startReminder = function () {
        Weight.REMINDER.restart();
    }

    Weight.prototype.stopReminder = function () {
        Weight.REMINDER.restart();
        Weight.REMINDER.pause();
    }


    Weight.prototype.isFinished = function () {

        var turns = this.getRowContainerArray(),
            allRevealed = false;

        for (var turn in turns) {
            if (turns[turn]) {
                if (turns[turn].isRevealed === false) {
                    allRevealed = false;
                    break;
                } else {
                    allRevealed = true;
                }
            }
        }

        if (allRevealed) {
            this.setIsFinished(true);
            // fire event to check all games in mainGame class
            iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
        }
    }

    //namespace path
    iwg._class("iwg.lib.Weight", Weight);
}(window));