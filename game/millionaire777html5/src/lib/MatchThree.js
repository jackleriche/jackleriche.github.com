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

        MatchThree = function (x, y, gapY, gapX, slide, ticketData) {

            var _x = x,
                _y = y,
                _gapY = gapY,
                _gapX = gapX,
                _slide = slide,
                _ticketData = ticketData,
                _turns = [],
                _turnArray = [],
                _ref = {
                    0: "",
                    1: "number1",
                    2: "number2",
                    3: "number3",
                    4: "number4",
                    5: "number5",
                    6: "number6",
                    7: "number7",
                    8: "number8",
                    9: "number9",
                    10: "number10",
                    11: "number11",
                    12: "number12"
                },
                _gameAssetArray = [],
                _rowContainerArray = [],
                _isFinished = false,
                _container = new createjs.Container(),
                _reminder = null;

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
            this.getTurnArray = function () {
                return _turnArray;
            }
            this.getRef = function () {
                return _ref;
            }
            this.getGameAssetArray = function () {
                return _gameAssetArray;
            }
            this.getRowContainerArray = function () {
                return _rowContainerArray;
            }
            this.getIsFinished = function () {
                return _isFinished;
            }
            this.getContainer = function () {
                return _container;
            }
            this.getReminder = function () {
                return _reminder;
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
                _turnArray = prv;
            }
            this.setGameAssetArray = function (prv) {
                _gameAssetArray = prv;
            }
            this.addRowContainerArray = function (prv) {
                _rowContainerArray.push(prv);
            }
            this.setIsFinished = function (prv) {
                _isFinished = prv;
            }
            this.setReminder = function (prv) {
                _reminder = prv;
            }

            init(this);
        }

        function init(t) {

            setupLayout(t);
            t.setTurns(t.getTicketData().go)

            for (var turn in t.getTurns()) {
                var current = t.getTurns()[turn],
                    turnLayout = setupTurnsLayout(t, current, turn);
            }
            // setup paused reminder
            t.setupReminder();
        }

        function setupLayout(t) {

            var cont = t.getContainer();
            cont.y = t.getY();

            var box = Helper.makeBitmapImage("box_games", {
                x: 0,
                y: 0
            }),
                boxHighlight = Helper.makeBitmapImage("box_games_glower", {
                    x: -3,
                    y: -3
                }),
                matchThreeDivider1 = Helper.makeBitmapImage("games_divider", {
                    x: 40,
                    y: 95
                }, 1, false),
                matchThreeDivider2 = Helper.makeBitmapImage("games_divider", {
                    x: 40,
                    y: 180
                }, 1, false),
                matchThreeDivider3 = Helper.makeBitmapImage("games_divider", {
                    x: 40,
                    y: 265
                }, 1, false),
                matchThreerow = Helper.makeBitmapImage('rows_game1and2', {
                    x: 37,
                    y: 25
                }, 1, false),
                matchThreeInfo = Helper.makeBitmapImage('instruction_game1', {
                    x: 20,
                    y: 370
                }, 1, false);

            // box glow highlight - reminder
            boxHighlight.name = "boxHighlight";
            matchThreerow.name = "matchThreerow";
            boxHighlight.alpha = 0;

            cont.addChild(box, matchThreeDivider1, matchThreeDivider2, matchThreeDivider3, matchThreerow, matchThreeInfo, boxHighlight);

            cont.x = R.GAMEWIDTH + 1;

            t.getSlide().addChild(cont);

            // setup listeners
            iwg.IWGEM.addEventListener(MEvent.MATCHTHREEREVEAL.type, checkRowReveal)
        }

        function setupTurnsLayout(t, turnData, itt) {

            var tokens = [],
                rowAssetsArray = [],
                iconData = turnData.v,
                rowContainer = new createjs.Container();
            rowContainer.name = "rowContainer";
            rowContainer.isRevealed = false;
            rowContainer.y = (t.getGapY() * itt) + 30;
            rowContainer.x = 90;
            t.addRowContainerArray(rowContainer);

            var values = [turnData.d0, turnData.d1, turnData.d2],
                prize = turnData.p,
                pList = Ticket.instance.getPrizeList(),
                winner = turnData.w,
                gapX = t.getGapX();

            // add background shape under for win
            var matchThreeBgShape = new createjs.Shape();
            matchThreeBgShape.graphics.beginFill("#fff").drawRect(-73, rowContainer.y - 46, 382, 84);
            matchThreeBgShape.alpha = 0;
            matchThreeBgShape.name = "matchThreeBgShape";

            rowContainer.addChild(matchThreeBgShape);

            for (var i in values) {

                var container = new createjs.Container(),
                    spacingX = gapX * i,
                    tokenString = Helper.checkObject(values[i], t.getRef()),
                    token = Helper.makeBitmapImage(tokenString, {
                        x: 0,
                        y: 0
                    }, 0, true),
                    symbol = Helper.makeBitmapImage("game1_diamond", {
                        x: 0,
                        y: 0
                    }, 1, true);

                container.x = spacingX;
                container.y = rowContainer.y;
                container.token = i;
                container.row = itt;
                container.addChild(token, symbol);

                var gameAssetFunctions = {
                    "reveal": gameReveal
                },
                    gameAsset = new GameAsset(container, {
                        isWinner: winner
                    }, gameAssetFunctions);

                rowAssetsArray.push(gameAsset);

                rowContainer.addChild(container);

                container.on('click', function (ev) {
                    Helper.stopPrompt();
                    if (rowContainer.isRevealed == false) {
                        rowContainer.isRevealed = true;
                        var current = rowAssetsArray[ev.currentTarget.token];
                        MEvent.MATCHTHREEREVEAL.t = t;
                        MEvent.MATCHTHREEREVEAL.current = current;
                        iwg.IWGEM.dispatchEvent(MEvent.MATCHTHREEREVEAL);
                        t.stopReminder();
                    }
                }, null, true);

            }

            var prizeString = "lose" + Helper.fixPrizeValue(pList[prize]),
                prizeValue = pList[prize],
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
                    prizeValue: prizeValue
                }, gameAssetFunctions);
            prizeContainer.token = 3;
            prizeContainer.row = itt;
            prizeContainer.y = rowContainer.y;
            prizeContainer.x = 240;

            rowAssetsArray.push(prizeAsset);
            prizeContainer.addChild(prizeToken, prizeSymbol);
            rowContainer.addChild(prizeContainer);

            prizeContainer.on('click', function (ev) {

                if (rowContainer.isRevealed == false) {
                    rowContainer.isRevealed = true;
                    var current = rowAssetsArray[ev.currentTarget.token];
                    MEvent.MATCHTHREEREVEAL.t = t;
                    MEvent.MATCHTHREEREVEAL.current = current;
                    iwg.IWGEM.dispatchEvent(MEvent.MATCHTHREEREVEAL);
                    t.stopReminder();
                }
            }, null, true);

            t.setY(t.getY() + t.getGapY());
            t.getContainer().addChild(rowContainer);

            var gameAssetArray = t.getGameAssetArray();
            gameAssetArray.push(rowAssetsArray);

        }

        function checkRowReveal(ev) {

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
                    if(symbol == 3){
                        c.reveal('reveal', c, delay += 600);
                    } else {
                        c.reveal('reveal', c, delay += 300);
                    }

                }
            }
            R.clickCount++;

            // delay then check winner
            var bgHighlight = contParent.getChildByName("matchThreeBgShape");
            t.checkMatchThreeWin(bgHighlight, currentRow[3], array[r]);
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

                    // var shiner = new createjs.Shape();
                    // shiner.graphics.beginFill("#fff").drawCircle(0, 0, 15);
                    // shiner.alpha = 0.5;
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

                var revealTimeLine = new TimelineLite({
                    smoothChildTiming : true,
                    onStart: function(){
                        for(var shine in shinerArray){
                            shinerArray[shine].alpha = 1;
                        }
                        if (container.token != 3) {
                            if(R.PLAYSOUND){
                                createjs.Sound.play("iconReveal");
                            }
                        } else {
                            if(R.PLAYSOUND){
                                createjs.Sound.play("prizeReveal");
                            }
                        }
                    }
                });

                revealTimeLine.to(shinerArray[0], 0.8, {
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
                }, 0)
                .to(shinerArray[1], 0.8, {
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
                }, 0)
                .to(shinerArray[2], 0.8, {
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
                }, 0)
                .to(shinerArray[3], 0.8, {
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
                }, 0)
                .to(shinerArray[4], 0.8, {
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
                }, 0)
                .to(shinerArray[5], 0.8, {
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
                }, 0)
                .to(obj, 0.3, {
                    delay: 0,
                    scaleY: 0,
                    scaleX: 0
                }, 0)
                .to(icon, 0.3, {
                    delay: 0,
                    alpha: 1
                }, 0)
                .to(clone, 0.3, {
                    delay: 0,
                    alpha: 0.8,
                    scaleY: 1.4,
                    scaleX: 1.4,
                    y: clone.y + 20
                }, 0)
                .to(clone, 0.3, {
                    delay: 0.15,
                    alpha: 0
                }, 0);
                par.addChild(clone);
                // add time line to global timeline to allow pauseing and restarting
            //    R.revealTimeline.add(revealTimeLine);
            } else {
                core.IWG.ame('error', {
                    mes: ['couldnt get icon Container - error code 03a1']
                });
            }
        }

    MatchThree.prototype.checkMatchThreeWin = function (gameContainer, prize, rowArray) {
        var bankAmount = prize.prizeValue;

        if (prize.isWinner == '1') {
            // bank amount
            core.IWG.ame('bank', {
                deposit: [bankAmount],
                log: true
            });

            var contWidth = gameContainer.parent.getBounds().width;
            var contHeight = gameContainer.parent.getBounds().height;

            var highlight = gameContainer;
            var highlightBgTimeline = new TimelineMax({
                delay: 1.8,
                repeat: 4,
                yoyo: true,
                onStart: highlightRowWinners,
                onStartParams: [prize, rowArray]
            });
            highlightBgTimeline.to(highlight, 0.7, {
                alpha: 0.3,
                ease: "easeInOut"
            })
        }
        setTimeout(function () {
            Helper.resetPrompt();
        }, 1000)
        this.isFinished();
    }

    function highlightRowWinners(prize, rowArray) {
        highlightPrizeAmount(prize);
        highlightNumberWinners(rowArray);
        var rowParent = rowArray[0].getContainer().parent.parent;
        var rowName = rowParent.getChildByName("matchThreerow");
        Helper.moveToTop(rowName);
    }

    // highlight the 7's in this winning row
    function highlightNumberWinners(rowArray) {
        for (var i = 0; i < 3; i++) {
            var numberDisplay = rowArray[i].getContainer().children[0];
            // set the 7's to gold
            numberDisplay.gotoAndStop("number_win7");
        }
    }
    // Highlight this prize amount
    function highlightPrizeAmount(prize) {
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
    }


    // setup reminders - simple tween , paused on start
    MatchThree.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

        MatchThree.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4
        });

        this.setReminder(MatchThree.REMINDER);

    }

    // restart reminder
    MatchThree.prototype.startReminder = function () {
        MatchThree.REMINDER.restart(true);
    }

    MatchThree.prototype.stopReminder = function () {
        MatchThree.REMINDER.restart();
        MatchThree.REMINDER.pause();
    }


    MatchThree.prototype.isFinished = function () {

        var allRevealed = false;
        var turns = this.getRowContainerArray();

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
    iwg._class("iwg.lib.MatchThree", MatchThree);
}(window));
