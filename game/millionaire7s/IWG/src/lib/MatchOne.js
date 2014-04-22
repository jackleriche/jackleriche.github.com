(function (window) {
    "use strict";

    //set local paths to external files.
    var IWGInit, camelot = window.com.camelot,
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

        MatchOne = function (x, y, gapY, gapX, slide, ticketData) {

            var _x = x,
                _y = y,
                _gapY = gapY,
                _gapX = gapX,
                _slide = slide,
                _ticketData = ticketData,
                _turns = [],
                _turnArray = [],
                _gameAssetArray = [],
                _rowContainerArray = [],
                _winRevealQueueArray = [],
                _ref = {
                    0: "symbol_bars",
                    1: "symbol_case",
                    2: "symbol_cash",
                    3: "symbol_notes",
                    4: "symbol_pot",
                    5: "symbol_safe",
                    6: "symbol_wallet",
                    7: "symbols_sack"
                },
                _isFinished = false,
                _container = new createjs.Container();
            _container.name = "match1";

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
            this.getTurns = function () {
                return _turns;
            }
            this.getGameAssetArray = function () {
                return _gameAssetArray;
            }
            this.getTurnArray = function () {
                return _turnArray;
            }
            this.getRef = function () {
                return _ref;
            }
            this.getIsFinished = function () {
                return _isFinished;
            }
            this.getContainer = function () {
                return _container;
            }
            this.getRowContainerArray = function () {
                return _rowContainerArray;
            }
            this.getWinRevealQueueArray = function () {
                return _winRevealQueueArray;
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
            this.setTurns = function (prv) {
                _turns = prv;
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
            this.addWinRevealQueueArray = function (prv) {
                _winRevealQueueArray.push(prv);
            }

            init(this);
        };

    function init(t) {

        setupLayout(t);
        t.setTurns(t.getTicketData().go)

        for (var turns in t.getTurns()) {
            var current = t.getTurns()[turns],
                turnLayout = setupTurnsLayout(t, current, turns);
        }
        // set up prize
        var p = t.getTicketData().s0;
        setMatch(t, p);

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
            matchOneDivider = Helper.makeBitmapImage("game3_divider", {
                x: 40,
                y: 57
            }, 1, false),
            matchOneCol = Helper.makeBitmapImage('game3_labelling', {
                x: 30,
                y: 25
            }, 1, false),
            matchOneInfo = Helper.makeBitmapImage('instruction_game3', {
                x: 20,
                y: 370
            }, 1, false);
        boxHighlight.name = "boxHighlight";
        cont.addChild(box, matchOneDivider, matchOneCol, matchOneInfo, boxHighlight);
        t.getSlide().addChild(cont);
        // setup listeners
        iwg.IWGEM.addEventListener(MEvent.MATCHONEREVEAL.type, checkMatchReveal);
        iwg.IWGEM.addEventListener(MEvent.MATCHONEMATCHREVEAL.type, matchClick);
    }

    function setupTurnsLayout(t, turnData, itt) {

        var tokens = [],
            rowAssetsArray = [],
            iconData = turnData.v,
            rowContainer = new createjs.Container();
        rowContainer.name = "rowContainer";
        rowContainer.isRevealed = false;
        rowContainer.isWinRevealed = false;
        t.addRowContainerArray(rowContainer);
        switch (parseInt(itt)) {
        case 0:
            rowContainer.x = 303;
            rowContainer.y = 108;
            break;
        case 1:
            rowContainer.x = 113;
            rowContainer.y = 260;
            break;
        case 2:
            rowContainer.x = 303;
            rowContainer.y = 260;
            break;
        }

        var value = turnData.s,
            prize = turnData.p,
            pList = Ticket.instance.getPrizeList(),
            winner = turnData.w,
            gapX = t.getGapX();

        var matchOneBgShape = new createjs.Shape();
        matchOneBgShape.graphics.beginFill("#fff").drawRect(-95, -56, 190, 152);
        matchOneBgShape.alpha = 0;
        matchOneBgShape.name = "matchThreeBgShape";
        rowContainer.addChild(matchOneBgShape);

        var container = new createjs.Container(),
            spacingX = gapX * value,
            tokenString = Helper.checkObject(value, t.getRef()),
            token = Helper.makeBitmapImage(tokenString, {
                x: 0,
                y: 20
            }, 0, true),
            symbol = Helper.makeBitmapImage("game3_pound", {
                x: 0,
                y: 0
            }, 1, true);
        switch (tokenString) {
        case ("symbol_notes"):
        case ("symbol_wallet"):
        case ("symbol_cash"):
        case ("symbol_case"):
            token.regY += 15;
            break;

        case ("symbol_safe"):
        case ("symbol_pot"):
        case ("symbol_bars"):
            token.regY += 7;
            break;

        }
        container.token = 0;
        container.row = itt;
        container.addChild(token, symbol);

        container.on('click', function (ev) {
            if (rowContainer.isRevealed == false) {
                rowContainer.isRevealed = true;
                var current = rowAssetsArray[ev.currentTarget.token];
                MEvent.MATCHONEREVEAL.t = t;
                MEvent.MATCHONEREVEAL.current = current;
                iwg.IWGEM.dispatchEvent(MEvent.MATCHONEREVEAL);
                t.stopReminder();
            }
        }, null, true);

        var gameAssetFunctions = {
            "reveal": gameReveal
        };
        var gameAsset = new GameAsset(container, {
            isWinner: turnData.w,
            name: "gameAsset"
        }, gameAssetFunctions);

        rowAssetsArray.push(gameAsset);
        rowContainer.addChild(container);


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
        prizeContainer.token = 1;
        prizeContainer.row = itt;
        prizeContainer.y = 60;

        prizeContainer.on('click', function (ev) {
            if (rowContainer.isRevealed == false) {
                rowContainer.isRevealed = true;
                var current = rowAssetsArray[ev.currentTarget.token];
                MEvent.MATCHONEREVEAL.t = t;
                MEvent.MATCHONEREVEAL.current = current;
                iwg.IWGEM.dispatchEvent(MEvent.MATCHONEREVEAL);
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

    function setMatch(t, turnWinner) {
        var matchString = Helper.checkObject(turnWinner, t.getRef()),
            matchContainer = new createjs.Container(),
            matchToken = Helper.makeBitmapImage(matchString, {
                x: 0,
                y: 0
            }, 0, true),
            matchSymbol = Helper.makeBitmapImage("game3_coin", {
                x: 0,
                y: 0
            }, 1, true),
            matchAssetFunctions = {
                "reveal": gameReveal
            },
            matchAsset = new GameAsset(matchContainer, {
                name: "matchAsset"
            }, matchAssetFunctions);
        matchContainer.y = 128
        matchContainer.x = 115;
        matchContainer.isRevealed = false;
        t.addRowContainerArray(matchContainer);

        matchContainer.on('click', function (ev) {
            matchContainer.isRevealed = true;
            MEvent.MATCHONEMATCHREVEAL.t = t;
            iwg.IWGEM.dispatchEvent(MEvent.MATCHONEMATCHREVEAL);
            t.stopReminder();
        }, null, true);

        matchContainer.addChild(matchToken, matchSymbol);
        t.getContainer().addChild(matchContainer);

        var gameAssetArray = t.getGameAssetArray();
        gameAssetArray.push(matchAsset);



    }

    function matchClick(ev) {

        var token = ev.t.getGameAssetArray()[3];
        token.reveal('reveal', token, 0);
        token.getContainer().isRevealed = true;

        // delay for issue with isRevealed flag
        setTimeout(function () {
            // check for other winners not banked yet
            var winQueue = ev.t.getWinRevealQueueArray();
            if (winQueue.length > 0) {
                // loop over all the revealed asets and reveal them
                for (var i = 0; i < winQueue.length; i++) {
                    // remove from the array
                    var w = winQueue[i];
                    ev.t.checkMatchOneWin(w[0], w[1], w[2], w[3]);
                }
            }
        }, 1)


        setTimeout(function () {
            R.clickCount--;
            MEvent.RESETPROMPT.param = R.clickCount;
            iwg.IWGEM.dispatchEvent(MEvent.RESETPROMPT);
        }, 1000)
        ev.t.isFinished();

    }

    function checkMatchReveal(ev) {

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
                c.reveal('reveal', c, delay += 800);
            }
        }
        Helper.stopPrompt();
        R.clickCount++;
        // delay then check winner
        var bgHighlight = contParent.getChildByName("matchThreeBgShape");
        t.checkMatchOneWin(bgHighlight, currentRow[1], array[r], array);
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
            clone.y = container.y;
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
        if (container.token != 1) {
            if (R.PLAYSOUND) {
                createjs.Sound.play("matchOneReveal");
            }
        } else {
            if (R.PLAYSOUND) {
                createjs.Sound.play("prizeReveal");
            }
        }

    }

    function highlightPrizeAmount(prize, rowArray) {
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
    }

    MatchOne.prototype.checkMatchOneWin = function (highlight, prize, rowArray, allRowsArray) {

        var mainMatchRevealed = allRowsArray[3].getIsRevealed();

        // add to reveal queue for later if not ready yet
        if ((prize.isWinner == '1') && (!mainMatchRevealed)) {
            var winAssets = [highlight, prize, rowArray, allRowsArray];
            this.addWinRevealQueueArray(winAssets);
        }

        if ((prize.isWinner == '1') && (mainMatchRevealed)) {
            rowArray.isWinRevealed = true;
            // bank amount
            var bankAmount = prize.prizeValue;
            core.IWG.ame('bank', {
                deposit: [bankAmount],
                log: true
            });
            var highlightTimeline = new TimelineMax({
                delay: 2,
                repeat: 4,
                yoyo: true,
                onStart: highlightPrizeAmount,
                onStartParams: [prize, rowArray]
            });
            highlightTimeline.to(highlight, 0.7, {
                alpha: 0.3,
                ease: "easeIn"
            })
        }
        setTimeout(function () {
            R.clickCount--;
            MEvent.RESETPROMPT.param = R.clickCount;
            iwg.IWGEM.dispatchEvent(MEvent.RESETPROMPT);
        }, 1000)
        this.isFinished();

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

    // setup reminders - simple tween , paused on start
    MatchOne.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

        MatchOne.REMINDER = TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            delay: 1,
            repeat: -1,
            yoyo: true
        });

        MatchOne.REMINDER.pause();
    }

    // restart reminder
    MatchOne.prototype.startReminder = function () {
        MatchOne.REMINDER.restart();
    }

    MatchOne.prototype.stopReminder = function () {
        MatchOne.REMINDER.restart();
        MatchOne.REMINDER.pause();
    }


    MatchOne.prototype.isFinished = function () {

        var turns = this.getRowContainerArray(),
            allRevealed = false;

        for (var turn in turns) {
            if (turns[turn]) {
                if (turns[turn].isRevealed === false) {
                    allRevealed = false;
                    break
                } else {
                    allRevealed = true;
                }
            }
        }
        if (allRevealed) {
            // reset and pause reminder
            this.stopReminder();

            this.setIsFinished(true);
            // fire event to check all games in mainGame class
            iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
        }
    }
    //namespace path
    iwg._class("iwg.lib.MatchOne", MatchOne);
}(window));