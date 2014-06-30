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
        MoneyBagSS = lib.flassets.MoneyBagSS,
        ConfettiSS = lib.flassets.ConfettiSS,
        Confetti = lib.Confetti,


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
                _confettiWinners    = [],
                _ref = {
                    0: "g1_fingers",
                    1: "g1_bars",
                    2: "g1_case",
                    3: "g1_chest",
                    4: "g1_mansion",
                    5: "g1_necklace",
                    6: "g1_ring",
                    7: "g1_vault"                    
                },
                _isFinished = false,
                _reminder = null,
                _container = new createjs.Container();
            _container.name = "match1";

            MoneyBagSS.ss = new createjs.SpriteSheet(MoneyBagSS.spriteSheet);


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
                return _turnArray;
            }
            this.setIsFinished = function (prv) {
                _isFinished = prv;
            }
            this.setContainer = function (prv) {
                _container = prv;
            }
            this.setReminder = function (prv) {
                _reminder = prv;
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
        var p = 0

        // setup paused reminder
        t.setupReminder();
    }

    function setupLayout(t) {

        var cont = t.getContainer();
        cont.y = t.getY();
        cont.x = t.getX() + 960;

        var box = Helper.makeBitmapImage("box_type1", {
                x: 0,
                y: 0
            }),            
            matchOneDivider = Helper.makeBitmapImage("game3_divider", {
                x: 40,
                y: 57
            }, 1, false),
            matchOneInfo = Helper.makeBitmapImage('instructions_g1', {
                x: 20,
                y: 370
            }, 1, false),
            divider         = new createjs.Shape(),
            divider2        = new createjs.Shape(),
            boxHighlight    = new createjs.Shape();
        
        
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
        divider.y   = 185;

        divider2.graphics.setStrokeStyle(1);
        divider2.graphics.beginStroke("#fff");
        divider2.graphics.moveTo(0, 0);
        divider2.graphics.lineTo(0, 280);
        divider2.graphics.endStroke();
        
        divider2.x  = 215;
        divider2.y  = 45;
        
        boxHighlight.name = "boxHighlight";
        cont.addChild(box, divider, divider2, matchOneInfo, boxHighlight);
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
        rowContainer.name = "rowContainer"+itt;
        rowContainer.isRevealed = false;
        rowContainer.isWinRevealed = false;
        t.addRowContainerArray(rowContainer);
        switch (parseInt(itt)) {
        case 0:
            rowContainer.x = 113;
            rowContainer.y = 98;
            break;
        case 1:
            rowContainer.x = 303;
            rowContainer.y = 98;
            break;
        
        case 2:
            rowContainer.x = 113;
            rowContainer.y = 260;
            break;
        case 3:
            rowContainer.x = 303;
            rowContainer.y = 260;
            break;
        }

        var value = turnData.t,
            prize = turnData.p,
            pList = Ticket.instance.getPrizeList(),
            winner = turnData.w,
            gapX = t.getGapX();

        var matchOneBgShape     = new createjs.Shape();
        matchOneBgShape.graphics.beginFill("#fff").drawRect(-90, -70, 190, 160);
        matchOneBgShape.alpha   = 0;
        matchOneBgShape.name    = "matchOneBgShape";
        rowContainer.addChild(matchOneBgShape);

        // create new confetti  
        var confettiWinner = new Confetti(
                [0, -70, 185, 150],           // Container Co-ords
                [-90, 0, 185, 150]            // Mask Co-ords
            );
        t.getConfettiWinners().push(confettiWinner);
        rowContainer.addChild(confettiWinner.getContainer());


        var container   = new createjs.Container(),
            spacingX    = gapX * value,
            tokenString = Helper.checkObject(value, t.getRef()),
            token = Helper.makeBitmapImage(tokenString, {
                x: 0,
                y: -10
            }, 0, true),
            symbol = Helper.makeBitmapImage("moneyBagReveal", {
                x: 0,
                y: 0
            }, 1, true, MoneyBagSS),
            shadow = Helper.makeBitmapImage("moneyBagShadow", {
                x: 0,
                y: 0
            }, 1, true, MoneyBagSS);
        
            shadow.name = 'shadow';
            symbol.name = 'symbol';
            token.name  = 'token';
        
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
        container.addChild(token, shadow, symbol);
        container.name = "tokenContainer";

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
        
        prizeContainer.name = "prizeContainer";
        prizeToken.name = "prizeToken";
        prizeString.name = "prizeString";
        prizeSymbol.name = "prizeSymbol";

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

    function matchClick(ev) {

        Helper.stopPrompt();
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
            Helper.resetPrompt();    
        }, 1000);
        
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
        var bgHighlight = contParent.getChildByName("matchOneBgShape");
        t.checkMatchOneWin(bgHighlight, currentRow[1], array[r], array);
    }

    function gameReveal() {

        if (this.getContainer()) {
            
            if (this.getIsRevealed() === false){
                this.setIsRevealed(true);
            }
            
            var container = this.getContainer(),
                revealTimeLine = new TimelineLite({
                    smoothChildTiming : true,
                    onStart: function(){
                       if (container.token != 1) {
                           if(R.PLAYSOUND){
                               createjs.Sound.play("matchOneReveal");
                           }                       
                       } else {
                           if(R.PLAYSOUND){
                               createjs.Sound.play("prizeReveal");   
                           }                       
                       }
                    }
                });
            
            // check if container is token or prize
            if(container.name === "prizeContainer"){
                
                var prizeToken = container.getChildByName("prizeToken"),
                    prizeSymbol = container.getChildByName("prizeSymbol");
                
                revealTimeLine.to(prizeSymbol, 1, {
                    delay: 0.3,
                    alpha: 0
                }, 0)
                .to(prizeToken, 1, {
                    delay: 0.3,
                    alpha: 1
                }, 0);
            } else {                
                var obj = container.getChildByName("symbol"),
                    icon = container.getChildByName("token"),
                    shadow = container.getChildByName("shadow");
                
                obj.gotoAndPlay("moneyBagReveal");
                obj.on("animationend",function(evt){
                    evt.currentTarget.stop();
                    //evt.currentTarget.visible = false;
                    shadow.alpha = 0;
                   TweenLite.to(evt.currentTarget, 0.5, {
                        alpha: 0
                    }, 0);
                });
                revealTimeLine.to(icon, 1, {
                    delay: 0.3,
                    alpha: 1
                }, 0);
            }
            // TODO - Add a On Animation End- fire event to reveal token under

        } else {
            core.IWG.ame('error', {
                mes: ['couldnt get icon Container - error code 03a1']
            });
        }

    }

    function highlightPrizeAmount(prize, rowArray) {
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));

        // play confetti win reveal
                    var confettiRow     = prize.getContainer().row;
                    var confettiWinner  = this.getConfettiWinners()[confettiRow];
                    confettiWinner.playConfettiTimeline();    
    }

    MatchOne.prototype.checkMatchOneWin = function (highlight, prize, rowArray, allRowsArray) {

        // var mainMatchRevealed = allRowsArray[3].getIsRevealed();
        
        // add to reveal queue for later if not ready yet
        // if ((prize.isWinner == '1') && (!mainMatchRevealed)) {
        //     var winAssets = [highlight, prize, rowArray, allRowsArray];
        //     this.addWinRevealQueueArray(winAssets);
        // }

        if ((prize.isWinner == '1')) {
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
                onStartScope: this,
                onStart: highlightPrizeAmount,
                onStartParams: [prize, rowArray]
            });
            highlightTimeline.to(highlight, 0.7, {
                alpha: 0,
                ease: "easeIn"
            })
        }
        setTimeout(function () {
            Helper.resetPrompt();
        }, 1000)
        this.isFinished();

    }

    // setup reminders - simple tween , paused on start
    MatchOne.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

        MatchOne.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4
        });

        this.setReminder(MatchOne.REMINDER);
    }

    // restart reminder
    MatchOne.prototype.startReminder = function () {
        MatchOne.REMINDER.restart(true);
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