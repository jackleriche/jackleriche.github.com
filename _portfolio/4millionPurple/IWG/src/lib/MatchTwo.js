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
        MoneyClipSS = lib.flassets.MoneyClipSS,
        ConfettiSS = lib.flassets.ConfettiSS,
        Confetti = lib.Confetti,

        MatchTwo = function (x, y, gapY, gapX, slide, ticketData) {

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
                    1: "g4_bars",
                    2: "g4_bike",
                    3: "g4_bubbly",
                    4: "g4_car",
                    5: "g4_chopper",
                    6: "g4_clip",
                    7: "g4_coins",
                    8: "g4_diamond",
                    9: "g4_gem",
                    10: "g4_safe"
                },
                _gameAssetArray = [],
                _rowContainerArray = [],
                _confettiWinners    = [],
                _isFinished = false,
                _container = new createjs.Container(),
                _reminder = null;

            MoneyClipSS.ss = new createjs.SpriteSheet(MoneyClipSS.spriteSheet);
            ConfettiSS.ss = new createjs.SpriteSheet(ConfettiSS.spriteSheet);



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
            this.getConfettiWinners = function () {
                return _confettiWinners;
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
            cont.x = t.getX();

            var box = Helper.makeBitmapImage("box_type1", {
                    x: 0,
                    y: 0
                }),
                matchTworow1 = Helper.makeBitmapImage('row1', {
                    x: 37,
                    y: 55
                }, 1, false),
                matchTworow2 = Helper.makeBitmapImage('row2', {
                    x: 37,
                    y: 170
                }, 1, false),
                matchTworow3 = Helper.makeBitmapImage('row3', {
                    x: 37,
                    y: 265
                }, 1, false),
                matchTwoInfo = Helper.makeBitmapImage('instructions_g4', {
                    x: 15,
                    y: 370
                }, 1, false),
                divider      = new createjs.Shape(),
                boxHighlight = new createjs.Shape();


            // boxhighlight
            boxHighlight.graphics.setStrokeStyle(12);
            boxHighlight.graphics.beginStroke("#fff");
            boxHighlight.snapToPixel = true;
            boxHighlight.graphics.drawRect(0,0,388, 333);
            boxHighlight.shadow =  new createjs.Shadow("#fff", 0, 0, 15);

            boxHighlight.x = 18;
            boxHighlight.y = 17;
            
            divider.graphics.setStrokeStyle(1);
            divider.graphics.beginStroke("#fff");
            divider.graphics.moveTo(0, 0);
            divider.graphics.lineTo(340, 0);
            divider.graphics.endStroke();
            
            divider.x   = 43;
            divider.y   = 142;
            
            var divider2 = divider.clone();
            divider2.y  = 245;
            

            // box glow highlight - reminder
            boxHighlight.name = "boxHighlight";
            matchTworow1.name = "matchTworow1";
            matchTworow2.name = "matchTworow2";
            matchTworow3.name = "matchTworow3";
            boxHighlight.alpha = 0;

            cont.addChild(box, divider, divider2, matchTworow1, matchTworow2, matchTworow3, matchTwoInfo, boxHighlight );

            t.getSlide().addChild(cont);

            // setup listeners
            iwg.IWGEM.addEventListener(MEvent.MATCHTWOREVEAL.type, checkRowReveal)
        }

        function setupTurnsLayout(t, turnData, itt) {

            var tokens = [],
                rowAssetsArray = [],
                iconData = turnData.v,
                rowContainer = new createjs.Container();
            rowContainer.name = "rowContainer"+itt;
            rowContainer.isRevealed = false;
            rowContainer.y = (t.getGapY() * itt) + 45;
            rowContainer.x = 90;
            t.addRowContainerArray(rowContainer);

            var values = [turnData.v0, turnData.v1],
                prize = turnData.p,
                pList = Ticket.instance.getPrizeList(),
                winner = turnData.w,
                gapX = t.getGapX();

            // add background shape under for win
            var matchTwoBgShape = new createjs.Shape();
            matchTwoBgShape.graphics.beginFill("#fff").drawRect(-73, rowContainer.y - 46, 382, 84);
            matchTwoBgShape.alpha = 0;
            matchTwoBgShape.name = "matchTwoBgShape";

            rowContainer.addChild(matchTwoBgShape);

             // create new confetti  
            var confettiWinner = new Confetti(
                    [5, rowContainer.y -55, 370, 100],           // Container Co-ords
                    [-70, 0, 370, 100]                           // Mask Co-ords
                );
            t.getConfettiWinners().push(confettiWinner);
            rowContainer.addChild(confettiWinner.getContainer());


            for (var i in values) {
    
                var container = new createjs.Container(),
                    spacingX = gapX * i + 30,
                    tokenString = Helper.checkObject(values[i], t.getRef()),
                    token = Helper.makeBitmapImage(tokenString, {
                        x: 0,
                        y: 0
                    }, 0, true),
                    symbol = Helper.makeBitmapImage("moneyClipReveal", {
                        x: 0,
                        y: 5
                    }, 1, true, MoneyClipSS);

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
                        MEvent.MATCHTWOREVEAL.t = t;
                        MEvent.MATCHTWOREVEAL.current = current;
                        iwg.IWGEM.dispatchEvent(MEvent.MATCHTWOREVEAL);
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
            prizeContainer.token = 2;
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
                    MEvent.MATCHTWOREVEAL.t = t;
                    MEvent.MATCHTWOREVEAL.current = current;
                    iwg.IWGEM.dispatchEvent(MEvent.MATCHTWOREVEAL);
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
            var bgHighlight = contParent.getChildByName("matchTwoBgShape");
            t.checkMatchTwoWin(bgHighlight, currentRow[2], array[r]);
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
                
                var revealTimeLine = new TimelineLite({
                    smoothChildTiming : true,
                    onStart: function(){
                        for(var shine in shinerArray){
                            shinerArray[shine].alpha = 1;
                        }
                        if (container.token != 3) {
                            if(R.PLAYSOUND){
                                createjs.Sound.play("cashBundle");    
                            }                            
                        } else {
                            if(R.PLAYSOUND){
                                createjs.Sound.play("prizeReveal");    
                            }                            
                        }
                    }                    
                });

                revealTimeLine.to(icon, 1.5, {
                    delay: 0.25,
                    alpha: 1
                }, 0);

                obj.gotoAndPlay("moneyClipReveal");

                obj.on("animationend",function(evt){
                    evt.currentTarget.stop();
                    //evt.currentTarget.visible = false;

                    TweenLite.to(evt.currentTarget, 0.5, {
                        alpha: 0
                    }, 0);

                })

                // TODO - Add a On Animation End- fire event to reveal token under

            } else {
                core.IWG.ame('error', {
                    mes: ['couldnt get icon Container - error code 03a1']
                });
            }
        }

    MatchTwo.prototype.checkMatchTwoWin = function (gameContainer, prize, rowArray) {
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
                onStartParams: [prize, rowArray],
                onCompleteParams: [gameContainer,this] ,
                onComplete: function(gameContainer,self){
                    // play confetti win reveal
                    var confettiRow     = gameContainer.parent.name.slice(-1);
                    var confettiWinner  = self.getConfettiWinners()[confettiRow];
                    confettiWinner.playConfettiTimeline();       
                }
            });
            highlightBgTimeline.to(highlight, 0.7, {
                alpha: 0,
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
        var rowName = rowParent.getChildByName("matchTworow");
       // Helper.moveToTop(rowName);
    }

    // highlight the 7's in this winning row
    function highlightNumberWinners(rowArray) {
        for (var i = 0; i < 3; i++) {
            var numberDisplay = rowArray[i].getContainer().children[0];
        }
    }
    // Highlight this prize amount
    function highlightPrizeAmount(prize) {
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
    }


    // setup reminders - simple tween , paused on start
    MatchTwo.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;
        
        MatchTwo.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4
        });

        this.setReminder(MatchTwo.REMINDER);

    }

    // restart reminder
    MatchTwo.prototype.startReminder = function () {
        MatchTwo.REMINDER.restart(true);
    }

    MatchTwo.prototype.stopReminder = function () {
        MatchTwo.REMINDER.restart();
        MatchTwo.REMINDER.pause();
    }


    MatchTwo.prototype.isFinished = function () {

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
    iwg._class("iwg.lib.MatchTwo", MatchTwo);
}(window));