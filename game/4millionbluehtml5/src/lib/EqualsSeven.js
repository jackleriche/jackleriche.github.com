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
        Ticket = lib.Ticket,
        MEvent = lib.MEvent,
        REMINDER,
        PoundSS = lib.flassets.PoundSS,
        ConfettiSS = lib.flassets.ConfettiSS,
        Confetti = lib.Confetti,

        EqualsSeven = function (x, y, gapY, gapX, slide, ticketData) {

            var _x = x,
                _y = y,
                _gapY = gapY,
                _gapX = gapX,
                _slide = slide,
                _ticketData = ticketData,
                _turnData = [],
                _turnArray = [],
                _isFinished = false,
                _container = new createjs.Container(),
                _gameAssetArray = [],
                _rowContainerArray = [],
                _confettiWinners    = [],
                _reminder = null,
                _highlightTimeline = new TimelineMax({
                    repeat: -1,
                    yoyo: true                    
                });
            _container.name = "equals";
            

            PoundSS.ss = new createjs.SpriteSheet(PoundSS.spriteSheet);
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
                return _gameAssetArray;
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
            this.setGameAssetArray = function (prv) {
                _gameAssetArray = prv;
            }
            this.addRowContainerArray = function (prv) {
                _rowContainerArray.push(prv);
            }
            this.setReminder = function (prv) {
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

            var box = Helper.makeBitmapImage("box_type1", {
                    x: 0,
                    y: 0
                }),
                equalsRow0 = Helper.makeBitmapImage('row1', {
                    x: 37,
                    y: 55
                }, 1, false),
                equalsRow1 = Helper.makeBitmapImage('row2', {
                    x: 37,
                    y: 170
                }, 1, false),
                equalsRow2 = Helper.makeBitmapImage('row3', {
                    x: 37,
                    y: 265
                }, 1, false),
                matchThreeInfo = Helper.makeBitmapImage('instructions_g2', {
                    x: 20,
                    y: 370
                }, 1, false),
                divider         = new createjs.Shape(),
                boxHighlight    = new createjs.Shape();
            
            divider.graphics.setStrokeStyle(1);
            divider.graphics.beginStroke("#fff");
            divider.graphics.moveTo(0, 0);
            divider.graphics.lineTo(340, 0);
            divider.graphics.endStroke();
            
            divider.x   = 43;
            divider.y   = 142;
            
            var divider2 = divider.clone();
            divider2.y  = 245;
            
            
            // boxhighlight
            boxHighlight.graphics.setStrokeStyle(12);
            boxHighlight.graphics.beginStroke("#fff");
            boxHighlight.snapToPixel = true;
            boxHighlight.graphics.drawRoundRect(0,0,388, 333, 10);
            boxHighlight.shadow =  new createjs.Shadow("#fff", 0, 0, 15);
            
            boxHighlight.x = 18;
            boxHighlight.y = 17;
            

            // box glow highlight - reminder
            boxHighlight.name = "boxHighlight";
            equalsRow0.name = "equalsRow0";
            equalsRow1.name = "equalsRow1";
            equalsRow2.name = "equalsRow2";
            boxHighlight.alpha = 0;

            cont.addChild(divider, divider2, equalsRow0, equalsRow1, equalsRow2, matchThreeInfo, box, boxHighlight );

            cont.x = R.GAMEWIDTH + 1;

            t.getSlide().addChild(cont);

            // setup listeners
            iwg.IWGEM.addEventListener(MEvent.EQUALSSEVENREVEAL.type, checkRowReveal);
        }

        function setupTurnsLayout(t, turnData, itt) {

            var tokens = [],
                rowAssetsArray = [],
                iconData = turnData.v,
                rowContainer = new createjs.Container();
            
            rowContainer.name = "rowContainer"+itt;
            rowContainer.rowNum = itt;
            rowContainer.isRevealed = false;
            rowContainer.y = (t.getGapY() * itt) + 45;
            rowContainer.x = 100;
            t.addRowContainerArray(rowContainer);

            var values = [turnData.b0, turnData.b1, turnData.t],
                prize = turnData.p,
                pList = Ticket.instance.getPrizeList(),
                winner = turnData.w,
                gapX = t.getGapX();

            // add background shape under for win
            var matchThreeBgShape = new createjs.Shape();
            matchThreeBgShape.graphics.beginFill("#fff").drawRect(-73, rowContainer.y - 46, 382, 84);
            matchThreeBgShape.alpha = 0;
            matchThreeBgShape.name = "matchThreeBgShape";

            var maskX = -80,
                maskY = 0,
                maskW = 377,
                maskH = 95;


             switch (parseInt(itt)) {
                case 0:
                    maskY -=21;
                    maskH +=28 ;
                    break;
                case 1:
                    maskH += 6;
                    break;
                case 2:
                    maskH += 10;
                    break;
            }

            // create new confetti  
            var confettiWinner = new Confetti(
                    [5, rowContainer.y -46, 375, 95],           // Container Co-ords
                    [maskX, maskY, maskW, maskH]                           // Mask Co-ords
                );
            t.getConfettiWinners().push(confettiWinner);
            rowContainer.addChild(confettiWinner.getContainer());

            var plusImage = Helper.makeBitmapImage("game2_plus", {
                x: 23,
                y: rowContainer.y - 10
            }, 1, false);
            var equalsImage = Helper.makeBitmapImage("game2_equals", {
                x: 95,
                y: rowContainer.y - 10
            }, 1, false);

            rowContainer.addChild(matchThreeBgShape, plusImage, equalsImage);

            for (var value in values) {

                // swap token based on type
                var barOrMark   = "poundReveal",
                    ssToUse     =  PoundSS;
                if (value == 2) {
                    barOrMark   = "game2_questionmark";
                    ssToUse     =   null;
                }

                var container = new createjs.Container(),
                    spacingX = gapX * value,
                    tokenString = "number" + values[value],
                    token = Helper.makeBitmapImage(tokenString, {
                        x: 0,
                        y: 0
                    }, 0, true),

                    symbol = Helper.makeBitmapImage(barOrMark, {
                        x: 0,
                        y: 0
                    }, 1, true, ssToUse);
                    
                if ( value < 2 ){
                    symbol.scaleX = symbol.scaleY = 0.8;
                }
                if (value == 1) {
                  token.x -= 4
                }

                container.x = spacingX;
                if (value == 2 && (values[value].length == 1)) {
                    token.x += 4;
                } else if (value == 2 && (values[value].length == 2)) {
                    token.x += 4;
                }
                container.y = rowContainer.y;
                container.token = value;
                container.row = itt;
                container.addChild(token, symbol);

                if (value != 2){
                    container.on('click', function (ev) {
                        if (rowContainer.isRevealed == false) {
                            iwg.IWGEM.dispatchEvent(MEvent.CLICKCOUNT);
                            rowContainer.isRevealed = true;
                            var current = rowAssetsArray[ev.currentTarget.token];
                            MEvent.EQUALSSEVENREVEAL.t = t;
                            MEvent.EQUALSSEVENREVEAL.current = current;
                            iwg.IWGEM.dispatchEvent(MEvent.EQUALSSEVENREVEAL);
                        }
                    }, null, true);
                }

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
            prizeContainer.token = 3;
            prizeContainer.row = itt;
            prizeContainer.y = rowContainer.y;
            prizeContainer.x = 240;

            prizeContainer.name     = "prizeContainer";
            prizeToken.name         = "prizeToken";
            prizeString.name        = "prizeString";
            prizeSymbol.name        = "prizeSymbol"

            prizeContainer.on('click', function (ev) {
                if (rowContainer.isRevealed == false) {
                    iwg.IWGEM.dispatchEvent(MEvent.CLICKCOUNT);
                    rowContainer.isRevealed = true;
                    var current = rowAssetsArray[ev.currentTarget.token];
                    MEvent.EQUALSSEVENREVEAL.t = t;
                    MEvent.EQUALSSEVENREVEAL.current = current;
                    iwg.IWGEM.dispatchEvent(MEvent.EQUALSSEVENREVEAL);
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
                    c.setIsRevealed(true);
                    if( symbol == 3 ){
                        c.reveal('reveal', c, delay += 1800);    //prize
                    } else if( symbol == 2 ){
                        c.reveal('reveal', c, delay += 1500);    
                    } else {
                        c.reveal('reveal', c, delay += 400);
                    }
                }
            }
            Helper.stopPrompt();
            R.clickCount++;
            // delay then check winner
            var bgHighlight = contParent.getChildByName("matchThreeBgShape");
            t.checkEqualsSevenWin(bgHighlight, currentRow[3], array[r]);
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

                var revealTimeLine = new TimelineLite({
                    smoothChildTiming : true,
                    onStart: function(){
                        for(var shine in shinerArray){
                            shinerArray[shine].alpha = 1;
                        }
                        switch (container.token) {
                        case "2":
                            break;
                        case 3:
                            if(R.PLAYSOUND){
                                createjs.Sound.play('prizeReveal');    
                            }                            
                            break;
                        default:
                            if(R.PLAYSOUND){
                                createjs.Sound.play('equalsSevenReveal');    
                            }                            
                            break;
                        }
                    }
                });
                if (container.token == 2){
                    // question mark reveal
                     
                    for (var shine in shinerArray){
                        container.parent.removeChild(shinerArray[shine]);
                    }
                    
                    revealTimeLine.to(obj, 0.3, {
                        delay: 0.3,
                        scaleY: 0,
                        scaleX: 0
                    },0)
                    .to(icon, 0.3, {
                        delay: 0.8,
                        alpha: 1
                    },0)
                    .to(clone, 0.3, {
                        delay: 0.3,
                        alpha: 0.8,
                        scaleY: 1.4,
                        scaleX: 1.4,
                        y: clone.y + 20
                    },0)
                    .to(clone, 0.3, {
                        delay: .35,
                        alpha: 0
                    },0);

                    
                } else {

                    revealTimeLine.to(icon, 1.3, {
                        delay: 0.5,
                        alpha: 1
                    }, 0);

                    obj.gotoAndPlay("poundReveal");

                    obj.on("animationend",function(evt){
                        evt.currentTarget.stop();
                        //evt.currentTarget.visible = false;

                        TweenLite.to(evt.currentTarget, 0.5, {
                            alpha: 0
                        }, 0);
                    });
                }
            } else {
                core.IWG.ame('error', {
                    mess: ['couldnt get icon Container - error code 02a1']
                });
            }
        }

    EqualsSeven.prototype.checkEqualsSevenWin = function (gameContainer, prize, rowArray) {

        var bankAmount = prize.prizeValue;

        if (prize.isWinner == '1') {
            // bank amount
            core.IWG.ame('bank', {
                deposit: [bankAmount],
                log: true
            });

            var highlight = gameContainer;
            var highlightTimeline = new TimelineMax({
                delay: 4.7,
                repeat: 4,
                yoyo: true,
                onStartScope: this,
                onStart: highlightPrizeAmount,
                onStartParams: [prize, rowArray]
            });
            // fix for reveal
            highlightTimeline.to(highlight, 0.7, {
                alpha: 0,
                ease: "easeIn"
            })
        }
        setTimeout(function () {
            Helper.resetPrompt();
        }, 1000);
        this.isFinished();
    }


    // highlight the 10's in this winning row
    function highlightNumberWinners(rowArray) {
        for (var i = 0; i < 3; i++) {
            var numberDisplay = rowArray[i].getContainer().children[0],
                string = numberDisplay.currentAnimation;
            var s = string.replace('number', 'number_win');
            numberDisplay.gotoAndStop(s);
        }
    }

    function highlightPrizeAmount(prize, rowArray) {
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
        highlightNumberWinners(rowArray);

        var rowParent = rowArray[0].getContainer().parent.parent;
        var rowNum = rowArray[0].getContainer().parent.rowNum;
        
        var rowName = rowParent.getChildByName("equalsRow"+rowNum);
        
        Helper.moveToTop(rowName);

        // play confetti win reveal
        var confettiStart = new TweenMax.to(prize.getContainer(), 15, {
            useFrames:true,
            onCompleteScope: this,
            onCompleteParams: [rowName],
            onComplete: function(){
                    // play confetti win reveal
                    var confettiRow     = prize.getContainer().row;
                    var confettiWinner  = this.getConfettiWinners()[confettiRow];
                    confettiWinner.playConfettiTimeline(); 

                    var newNum = parseInt(rowNum) + 1;
                    var blackRowText = "row" + newNum +"_b";
                    rowName.gotoAndStop(blackRowText);       
            }
        });

        


        var clonePrize      = prize.getContainer().children[0].clone();
        clonePrize.gotoAndStop("lose" + Helper.fixPrizeValue(prize.prizeValue));
        clonePrize.alpha    = 0;
        clonePrize.name     = "losePrize";
        prize.getContainer().addChild(clonePrize);
        prize.getContainer().winner = true;

        //this.pulseWinners();
    }


    // setup reminders - simple tween , paused on start
    EqualsSeven.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

        EqualsSeven.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4
        });

        this.setReminder(EqualsSeven.REMINDER);
    }

    // restart reminder
    EqualsSeven.prototype.startReminder = function () {
        EqualsSeven.REMINDER.restart(true);
    }

    EqualsSeven.prototype.stopReminder = function () {
        EqualsSeven.REMINDER.restart();
        EqualsSeven.REMINDER.pause();
    }

    EqualsSeven.prototype.pulseWinners = function () {
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
                
                // fade the cloned prize value 
                this.getHighLightTimeline().to(winPrize, 1, {
                    scaleX: 1.1,
                    scaleY:1.1,
                    ease: "easeInOut"}, 0);
             } 
        }
    }

    EqualsSeven.prototype.isFinished = function () {

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
            // reset and pause reminder
            this.stopReminder();

            this.setIsFinished(true);
            // fire event to check all games in mainGame class
            iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
        }
    }
    
    //namespace path
    iwg._class("iwg.lib.EqualsSeven", EqualsSeven);
}(window));