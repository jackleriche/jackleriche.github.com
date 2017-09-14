(function (window) {
    //"use strict";

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
        DiamondSS = lib.flassets.DiamondSS,
        ConfettiSS = lib.flassets.ConfettiSS,
        Confetti = lib.Confetti,

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
            _rowContainerArray = [],
            _confettiWinners    = [],
            _reminder = null,
            _highlightTimeline = new TimelineMax({
                repeat: -1,
                yoyo: true
            });

        _container.name = "weight";

        DiamondSS.ss  = new createjs.SpriteSheet(DiamondSS.spriteSheet);
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
        this.getReminder = function () {
            return _reminder;
        }
        this.getConfettiWinners = function () {
            return _confettiWinners;
        }
        this.getHighLightTimeline = function () {
            return _highlightTimeline;
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
        this.setReminder = function(prv) {
            _reminder = prv;
        }

        init(this);

    }

    function init(t) {

        setupLayout(t);
        t.setTurnData([t.getTicketData().go[0], t.getTicketData().go[1], t.getTicketData().go[2]]);
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

        var box = Helper.makeBitmapImage("box_type1", {
                x: 0,
                y: 0
            }),
            weightRow0 = Helper.makeBitmapImage('row1', {
                x: 37,
                y: 75
            }, 1, false),
            weightRow1 = Helper.makeBitmapImage('row2', {
                x: 37,
                y: 180
            }, 1, false),
            weightRow2 = Helper.makeBitmapImage('row3', {
                x: 37,
                y: 275
            }, 1, false),

            yourWeight = Helper.makeBitmapImage('yours', {
                x: 75,
                y: 29
            }, 1, false),
            theirWeight = Helper.makeBitmapImage('theiras', {
                x: 185,
                y: 29
            }, 1, false),

            weightInfo = Helper.makeBitmapImage('instructions_g3', {
                x: 20,
                y: 370
            }, 1, false),
            divider        = new createjs.Shape(),
            boxHighlight    = new createjs.Shape();


        // boxhighlight
        boxHighlight.graphics.setStrokeStyle(12);
        boxHighlight.graphics.beginStroke("#fff");
        boxHighlight.snapToPixel = true;
        boxHighlight.graphics.drawRect(0,0,388, 333);
        boxHighlight.shadow =  new createjs.Shadow("#fff", 0, 0, 15);

        boxHighlight.x = 18;
        boxHighlight.y = 17;

        weightRow0.name     = "weightRow0";
        weightRow1.name     = "weightRow1";
        weightRow2.name     = "weightRow2";
        yourWeight.name     = "yourWeight";
        theirWeight.name    = "theirWeight";

        divider.graphics.setStrokeStyle(1);
        divider.graphics.beginStroke("#fff");
        divider.graphics.moveTo(0, 0);
        divider.graphics.lineTo(340, 0);
        divider.graphics.endStroke();

        divider.x   = 43;
        divider.y   = 155;

        var divider2 = divider.clone();
        divider2.y  = 250;

        boxHighlight.name = "boxHighlight";
        cont.addChild(box, divider, divider2, weightRow0, weightRow1, weightRow2, yourWeight, theirWeight, weightInfo, boxHighlight);
        t.getSlide().addChild(cont);

        // setup listeners
        iwg.IWGEM.addEventListener(MEvent.WEIGHTREVEAL.type, weightRowReveal);

    }

    function setupTurnsLayout(t, turnData, itt) {

        var tokens              = [],
            rowAssetsArray      = [],
            iconData            = turnData.v,
            rowContainer        = new createjs.Container();
        rowContainer.name       = "rowContainer"+itt;
        rowContainer.rowNum     = itt;
        rowContainer.isRevealed = false;
        rowContainer.y          = (t.getGapY() * itt) + 55;
        rowContainer.x          = 110;
        t.addRowContainerArray(rowContainer);

        var values  = [turnData.y, turnData.t],
            prize   = turnData.p,
            pList   = Ticket.instance.getPrizeList(),
            winner  = turnData.w,
            gapX    = t.getGapX();


        var weightBgShape = new createjs.Shape();
        weightBgShape.graphics.beginFill("#fff").drawRect(-93, rowContainer.y - 40, 382, 76);
        weightBgShape.alpha = 0;
        weightBgShape.name = "matchThreeBgShape";
        rowContainer.addChild(weightBgShape);

            var maskX = -92,
                maskY = 0,
                maskW = 378,
                maskH = 85;


             switch (parseInt(itt)) {
                case 0:
                    maskY -=47;
                    maskH +=47;
                    break;
                case 1:
                    maskY -=7;
                    maskH += 11;
                    break;
                case 2:
                    maskY -=3;
                    maskH +=9;
                    break;
            }

        // create new confetti
        var confettiWinner = new Confetti(
                [5, rowContainer.y -40, 375, 85],           // Container Co-ords
                [maskX, maskY, maskW, maskH]                // Mask Co-ords
            );
        t.getConfettiWinners().push(confettiWinner);
        rowContainer.addChild(confettiWinner.getContainer());

        for (var value in values) {

            var container   = new createjs.Container(),
                spacingX    = gapX * value,
                tokenString = "w" + values[value],
                token       = Helper.makeBitmapImage(tokenString, {
                    x: 12,
                    y: 0
                }, 0, true),
                symbol      = Helper.makeBitmapImage("diamondReveal", {
                    x: 0,
                    y: 0
                }, 1, true, DiamondSS);

            token.scaleX    = 0;
            token.scaleY    = 0;

            container.x     = spacingX;
            container.y     = rowContainer.y;
            container.token = value;
            container.row   = itt;
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

        prizeContainer.name     = "prizeContainer";
        prizeToken.name         = "prizeToken";
        prizeString.name        = "prizeString";
        prizeSymbol.name        = "prizeSymbol";

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

                TweenLite.to(icon, 0.4, {
                    delay: 0.7,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                }, 0);

                obj.gotoAndPlay("diamondReveal");

                obj.on("animationend",function(evt){
                    evt.currentTarget.stop();
                    //evt.currentTarget.visible = false;

                    TweenLite.to(evt.currentTarget, 0.5, {
                        alpha: 0
                    }, 0);
                })

            } else {
                core.IWG.ame('error', {
                    mes: ['couldnt get icon Container - error code 03a1']
                });
            }
            if (container.token != 2) {
                if(R.PLAYSOUND){
                    createjs.Sound.play("whip");
                }
            } else {
                if(R.PLAYSOUND){
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
                delay: 2.8,
                onStart: highlightPrizeAmount,
                onStartParams: [prize, rowArray] ,
                onCompleteParams: [gameContainer,this] ,
                onComplete: function(gameContainer,self){
                    // play confetti win reveal
                    var confettiRow     = gameContainer.parent.name.slice(-1);
                    var confettiWinner  = self.getConfettiWinners()[confettiRow];
                    confettiWinner.playConfettiTimeline();

                    var rowName1     = gameContainer.parent.parent.getChildByName("weightRow"+rowNum);
                    var newNum = parseInt(rowNum) + 1;
                    var blackRowText = "row" + newNum +"_b";
                    rowName1.gotoAndStop(blackRowText)
                }
            });
            // fix for reveal
            highlightTimeline.to(highlight, 0.7, {
                alpha: 0,
                ease: "easeIn"
            });

            var rowParent   = rowArray[0].getContainer().parent.parent;
            var rowNum      = rowArray[0].getContainer().parent.rowNum;
            var rowName     = rowParent.getChildByName("weightRow"+rowNum);
            var theirWeightText     = rowParent.getChildByName("theirWeight");
            var yourWeightText      = rowParent.getChildByName("yourWeight");

            Helper.moveToTop(theirWeightText);
            Helper.moveToTop(yourWeightText);
            Helper.moveToTop(rowName);

            var clonePrize      = prize.getContainer().children[0].clone();
            clonePrize.gotoAndStop("lose" + Helper.fixPrizeValue(prize.prizeValue));
            clonePrize.alpha    = 0;
            clonePrize.name     = "losePrize";
            prize.getContainer().addChild(clonePrize);
            prize.getContainer().winner = true;

            //this.pulseWinners();
        }
        setTimeout(function () {
            Helper.resetPrompt();
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

    // setup reminders - simple tween , paused on start
    Weight.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

       Weight.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4
        });

        this.setReminder(Weight.REMINDER);
    }

    // restart reminder
    Weight.prototype.startReminder = function () {
        Weight.REMINDER.restart(true);
    }

    Weight.prototype.stopReminder = function () {
        Weight.REMINDER.restart();
        Weight.REMINDER.pause();
    }

    Weight.prototype.pulseWinners = function () {
        this.getHighLightTimeline().clear();

        var turns = this.getRowContainerArray();
        // loop over all prizes
        for (var turn in turns) {
            // get prize container
            var prizeWinner = turns[turn].getChildByName("prizeContainer");

            // check for winners
            if (prizeWinner.winner == true) {

                var winPrize    = prizeWinner.getChildByName("prizeToken");
                var losePrize   = prizeWinner.getChildByName("losePrize");
                //losePrize.alpha = 1;
                //Helper.moveToTop(winPrize);
                // fade the cloned prize value
                this.getHighLightTimeline().to(winPrize, 1, {
                    scaleX: 1.1,
                    scaleY:1.1,
                    ease: "easeInOut"}, 0);
             }
        }
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
