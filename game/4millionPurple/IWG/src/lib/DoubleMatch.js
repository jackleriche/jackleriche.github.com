(function (window) {
    "use strict";

    //set local paths to external files.
    var IWGInit, 
        camelot     = window.com.camelot,
        core        = camelot.core,
        iwg         = camelot.iwg,
        lib         = iwg.lib,
        GS          = window.com.greensock,
        Helper      = lib.Helper,
        R           = lib.R,
        GameAsset   = lib.GameAsset,
        MEvent      = lib.MEvent,
        Ticket      = lib.Ticket,
        WadSS       = lib.flassets.WadSS,
        CoinSS      = lib.flassets.CoinSS,
        REMINDER,

        DoubleMatch = function (x, y, gapY, gapX, slide, ticketData) {
            
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
                    0: "g5_boat",
                    1: "g5_bundle",
                    2: "g5_champagne",
                    3: "g5_coin",
                    4: "g5_crown",
                    5: "g5_gem",
                    6: "g5_handbag",
                    7: "g5_key",
                    8: "g5_laptop",
                    9: "g5_limo",
                    10: "g5_plane",
                    11: "g5_pound",
                    12: "g5_ring",
                    13: "g5_wallet"
                },
                _isFinished = false,
                _reminder = null,
                _container = new createjs.Container(),
                _matchArray = [];
            _container.name = "doubleMatch";
            
            WadSS.ss = new createjs.SpriteSheet(WadSS.spriteSheet);
            CoinSS.ss = new createjs.SpriteSheet(CoinSS.spriteSheet);

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
            this.getMatchArray = function(){
                return _matchArray;
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
        var prizeValues = [t.getTicketData().s0, t.getTicketData().s1]
        
        setMatch(t, prizeValues);        

        // setup paused reminder
        t.setupReminder();
    }

    function setupLayout(t) {

        var cont = t.getContainer();
        cont.y = t.getY();
        cont.x = t.getX();

        var box = Helper.makeBitmapImage("box_type2", {
                x: 0,
                y: 0
            }),
            winningSymbols = Helper.makeBitmapImage('winningsymbols', {
                x: 40,
                y: 40
            }, 1, false),
            yourSymbols = Helper.makeBitmapImage('yoursymbols', {
                x: 470,
                y: 40
            }, 1, false),
            matchOneInfo = Helper.makeBitmapImage('instructions_g5', {
                x: 20,
                y: 370
            }, 1, false),
            divider         = new createjs.Shape(),
            boxHighlight    = new createjs.Shape();


        // boxhighlight
        boxHighlight.graphics.setStrokeStyle(12);
        boxHighlight.graphics.beginStroke("#fff");
        boxHighlight.snapToPixel = true;
        boxHighlight.graphics.drawRect(0,0,805, 333);
        boxHighlight.shadow =  new createjs.Shadow("#fff", 0, 0, 15);

        boxHighlight.x = 18;
        boxHighlight.y = 17;
        
        // divider
        divider.graphics.setStrokeStyle(1);
        divider.graphics.beginStroke("#fff");
        divider.graphics.moveTo(0, 0);
        divider.graphics.lineTo(0, 280);
        divider.graphics.endStroke();
       
        divider.x   = 240;
        divider.y   = 45;
        
        boxHighlight.name = "boxHighlight";
        cont.addChild(box, divider, winningSymbols, yourSymbols, matchOneInfo, boxHighlight);
        t.getSlide().addChild(cont);
        // setup listeners
        iwg.IWGEM.addEventListener(MEvent.DOUBLEMATCHREVEAL.type, checkMatchReveal);
        iwg.IWGEM.addEventListener(MEvent.DOUBLEMATCHMATCHREVEAL.type, matchClick);
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
    
        
        rowContainer.x = parseInt(itt) * t.getGapX();
        
        // sorry about this, needed it done quick
        switch(parseInt(itt)){
            case(0):
                rowContainer.x  = 320;
                rowContainer.y  = 105;
                break;
            case(1):
                rowContainer.x  = 460;
                rowContainer.y  = 105;
                break;
            case(2):
                rowContainer.x  = 595;
                rowContainer.y  = 105;
                break;
            case(3):
                rowContainer.x  = 725;
                rowContainer.y  = 105;
                break;
            case(4):
                rowContainer.x  = 320;
                rowContainer.y  = 250;
                break;
            case(5):
                rowContainer.x  = 460;
                rowContainer.y  = 250;
                break;
            case(6):
                rowContainer.x  = 595;
                rowContainer.y  = 250;
                break;
            case(7):
                rowContainer.x  = 725;
                rowContainer.y  = 250;
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
            symbol = Helper.makeBitmapImage("wadReveal", {
                x: 0,
                y: 0
            }, 1, true, WadSS),
            shadow = Helper.makeBitmapImage("wadShadow", {
                x: 0,
                y: 0
            }, 1, true, WadSS);
        
        container.name = "tokenContainer";
        shadow.name = 'shadow';
        symbol.name = 'symbol';
        token.name  = 'token';
        
        container.token = 0;
        container.row = itt;
        container.addChild(token, shadow, symbol);

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
                MEvent.DOUBLEMATCHREVEAL.t = t;
                MEvent.DOUBLEMATCHREVEAL.current = current;
                iwg.IWGEM.dispatchEvent(MEvent.DOUBLEMATCHREVEAL);
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

    function setMatch(t, prizeValues) {
        
        for( var pv in prizeValues ){
            
            var matchString = Helper.checkObject(prizeValues[pv], t.getRef()),
                matchContainer = new createjs.Container(),
                matchToken = Helper.makeBitmapImage(matchString, {
                    x: 0,
                    y: 0
                }, 0, true),
                matchSymbol = Helper.makeBitmapImage("coinReveal", {
                    x: 0,
                    y: 0
                }, 1, true, CoinSS),
                matchAssetFunctions = {
                    "reveal": gameReveal
                },
                matchAsset = new GameAsset(matchContainer, {
                    name: "matchAsset"
                }, matchAssetFunctions);
            
            // add to turns array
            t.getRowContainerArray().push(matchContainer);
            
            matchContainer.y = 128;
            matchContainer.x = 125;
            matchContainer.asset = matchAsset;
            matchAsset.it = pv;
            
            if(parseInt(pv) === 1){
                matchContainer.y = 260;   
            }
            matchContainer.isRevealed = false;

            var matchArray = t.getMatchArray();
            matchArray.push(matchAsset);
            
            matchContainer.name = "matchContainer";
            matchSymbol.name    = "matchSymbol";
            matchToken.name     = "matchToken";

            matchContainer.on('click', function (ev) {
                
                
                var asset = ev.currentTarget.asset;
                if(asset.getIsRevealed() === false){
                    
                    asset.setIsRevealed(true);

                    R.clickCount++;
                    MEvent.DOUBLEMATCHMATCHREVEAL.that = t;
                    MEvent.DOUBLEMATCHMATCHREVEAL.it = ev.currentTarget.asset.it;

                    iwg.IWGEM.dispatchEvent(MEvent.DOUBLEMATCHMATCHREVEAL);
                    t.stopReminder();
                }
                                
            }, null, true);

            matchContainer.addChild(matchToken, matchSymbol);
            t.getContainer().addChild(matchContainer);

            var gameAssetArray = t.getGameAssetArray();
            gameAssetArray.push(matchAsset);          
            
        }
        
    }

    function matchClick(evt) {
        
        Helper.stopPrompt();        
        
        var token           = evt.it,
            t               = evt.that,
            arr             = t.getMatchArray(),
            matchToken      = arr[token],
            matchContainer  = matchToken.getContainer(),
            matchSymbol     = matchContainer.getChildByName('matchSymbol'),
            matchToken      = matchContainer.getChildByName('matchToken'),
            revealTimeLine = new TimelineLite({
                smoothChildTiming : true,
                onStart: function(){
                    if(R.PLAYSOUND){
                        createjs.Sound.play("prizeReveal");   
                    }                       
                }
            });
        matchContainer.isRevealed = true;

        
        matchSymbol.gotoAndPlay("coinReveal");
        
        matchSymbol.on("animationend",function(evt){
            evt.currentTarget.stop();
            TweenLite.to(evt.currentTarget, 0.5, {
                alpha: 0
            }, 0);
        }, null, true);
        
        revealTimeLine.to(matchToken, 1, {
            delay: 0.3,
            alpha: 1
        }, 0);
                
        setTimeout(function () {
            Helper.resetPrompt();    
        }, 1000);
        
        t.isFinished();

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
            
        } else {
            core.IWG.ame('error', {
                mes: ['couldnt get icon Container - error code 03a1']
            });
        }

    }

    function highlightPrizeAmount(prize, rowArray) {
        prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
    }

    DoubleMatch.prototype.checkMatchOneWin = function (highlight, prize, rowArray, allRowsArray) {

//        var mainMatchRevealed = allRowsArray[3].getIsRevealed();
//
//        // add to reveal queue for later if not ready yet
//        if ((prize.isWinner == '1') && (!mainMatchRevealed)) {
//            var winAssets = [highlight, prize, rowArray, allRowsArray];
//            this.addWinRevealQueueArray(winAssets);
//        }

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
                onStart: highlightPrizeAmount,
                onStartParams: [prize, rowArray]
            });
            highlightTimeline.to(highlight, 0.7, {
                alpha: 0.3,
                ease: "easeIn"
            })
        }
        setTimeout(function () {
            Helper.resetPrompt();
        }, 1000)
        this.isFinished();

    }

    // setup reminders - simple tween , paused on start
    DoubleMatch.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
        highlight.alpha = 0;

        DoubleMatch.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4
        });

        this.setReminder(DoubleMatch.REMINDER);
    }

    // restart reminder
    DoubleMatch.prototype.startReminder = function () {
        DoubleMatch.REMINDER.restart(true);
    }

    DoubleMatch.prototype.stopReminder = function () {
        DoubleMatch.REMINDER.restart();
        DoubleMatch.REMINDER.pause();
    }


    DoubleMatch.prototype.isFinished = function () {

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
    iwg._class("iwg.lib.DoubleMatch", DoubleMatch);
}(window));