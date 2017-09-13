(function (window) {
    //"use strict";
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
        ConfettiSS = lib.flassets.ConfettiSS,
        Confetti = lib.Confetti,

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
                _confettiWinners    = [],
                _ref = {
                    1: "g5_laptop",
                    2: "g5_plane",
                    3: "g5_limo",
                    4: "g5_pot",
                    5: "g5_ring",
                    6: "g5_handbag",
                    7: "g5_gem",
                    8: "g5_wallet",
                    9: "g5_crown",
                    10: "g5_pound",
                    11: "g5_key",
                    12: "g5_boat",
                    13: "g5_champagne"
                },
                _isFinished = false,
                _reminder = null,
                _container = new createjs.Container(),
                _matchArray = [],
                _highlightTimeline = new TimelineMax({
                    repeat: -1,
                    yoyo: true
                });
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


        // set up prize
        var prizeValues = [t.getTicketData().s0, t.getTicketData().s1]

        setMatch(t, prizeValues);

        for (var turns in t.getTurns()) {
            var current = t.getTurns()[turns],
                turnLayout = setupTurnsLayout(t, current, turns);
        }

        setupDivider(t);

        // promote your symbols text
        var rowParent   = t.getContainer();
        var rowName     = rowParent.getChildByName("yourSymbols");
        Helper.moveToTop(rowName);

        var winningSymbolsName     = rowParent.getChildByName("winningSymbols");
        Helper.moveToTop(winningSymbolsName);

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
                /*x: 47,*/x:43,
                y: 40
            }, 1, false),
            yourSymbols = Helper.makeBitmapImage('yoursymbols', {
                x: 433,
                y: 40
            }, 1, false),
            matchOneInfo = Helper.makeBitmapImage('instructions_g5', {
                x: 20,
                y: 370
            }, 1, false),
            boxHighlight    = new createjs.Shape();


        // boxhighlight
        boxHighlight.graphics.setStrokeStyle(12);
        boxHighlight.graphics.beginStroke("#fff");
        boxHighlight.snapToPixel = true;
        boxHighlight.graphics.drawRect(0,0,805, 333);
        boxHighlight.shadow =  new createjs.Shadow("#fff", 0, 0, 15);

        boxHighlight.x = 18;
        boxHighlight.y = 17;

        yourSymbols.name = "yourSymbols";
        winningSymbols.name = "winningSymbols";

        boxHighlight.name = "boxHighlight";
        cont.addChild(box, winningSymbols, yourSymbols, matchOneInfo, boxHighlight);
        t.getSlide().addChild(cont);
        // setup listeners
        iwg.IWGEM.addEventListener(MEvent.DOUBLEMATCHREVEAL.type, checkMatchReveal);
        //iwg.IWGEM.addEventListener(MEvent.DOUBLEMATCHMATCHREVEAL.type, matchClick);
    }

    function setupDivider(t){
        // divider
        var dividerA = new createjs.Shape();

        dividerA.graphics.setStrokeStyle(2).beginStroke("#fff").moveTo(0, 0).lineTo(0, 321).endStroke();

        dividerA.x   = /*254*//*251*/247;
        dividerA.y   = /*45*/23;

        dividerA.name = "g5DividerA";

        var cont = t.getContainer();
        cont.addChild(dividerA);
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
        rowContainer.x = parseInt(itt) * t.getGapX();

        var maskX = -81,
            maskY = -22,
            maskW = 142,
            maskH = 166;

        var contXArr = [323,463,603,743,323,463,603,743];
        var contYArr = [105,105,105,105,250,250,250,250];

        var maskYAdjust = [0,0,0,0,20,20,20,20];
        var maskWAdjust = [0,0,0,2,0,0,0,2];
        var maskHAdjust = [0,0,0,0,-10,-10,-10,-10];

        // sorry about this, needed it done quick
        rowContainer.x = contXArr[parseInt(itt)];
        rowContainer.y = contYArr[parseInt(itt)];
        maskY += maskYAdjust[parseInt(itt)];
        maskH += maskHAdjust[parseInt(itt)];
        maskW += maskWAdjust[parseInt(itt)];

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

        // create new confetti
        var confettiWinner = new Confetti(
                [10, -60, 135, 140],           // Container Co-ords
                [maskX, maskY, maskW, maskH]   // Mask Co-ords
            );
        t.getConfettiWinners().push(confettiWinner);
        rowContainer.addChild(confettiWinner.getContainer());

        var container = new createjs.Container(),
            spacingX = gapX * value,
            tokenString = Helper.checkObject(value, t.getRef()),
            token = Helper.makeBitmapImage(tokenString, {
                x: -10,
                y: 0
            }, 0, true),
            symbol = Helper.makeBitmapImage("wadReveal", {
                x: -10,
                y: -10
            }, 1, true, WadSS),
            shadow = Helper.makeBitmapImage("wadShadow", {
                x: -10,
                y: -10
            }, 1, true, WadSS);

        container.name  = "tokenContainer";
        shadow.name     = 'shadow';
        symbol.name     = 'symbol';
        token.name      = 'token';

        container.token = 0;
        container.row = itt;
        container.addChild(token, shadow, symbol);

        container.on('click', function (ev) {
            if (rowContainer.isRevealed == false) {
                rowContainer.isRevealed = true;
                var current = rowAssetsArray[ev.currentTarget.token];
                this.asset.setIsRevealed(true);
                MEvent.DOUBLEMATCHREVEAL.row    = rowContainer
                MEvent.DOUBLEMATCHREVEAL.t = this.asset;
                MEvent.DOUBLEMATCHREVEAL.self = t;
                iwg.IWGEM.dispatchEvent(MEvent.DOUBLEMATCHREVEAL);
                t.stopReminder();
                setTimeout(function () {
                    Helper.resetPrompt();
                }, 1000);
            }
        }, null, true);

        var gameAssetFunctions = {
            "reveal": gameReveal
        };
        var gameAsset = new GameAsset(container, {
            isWinner: turnData.w,
            name: "gameAsset"
        }, gameAssetFunctions);
        gameAsset.rowContainer = rowContainer;
        container.asset = gameAsset;

        gameAsset.setTicketLabel(value);

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
        prizeAsset.setTicketLabel(value);
        prizeAsset.rowContainer = rowContainer;

        prizeContainer.token = 1;
        prizeContainer.row = itt;
        prizeContainer.y = 60;
        prizeContainer.asset = prizeAsset;

        prizeContainer.name = "prizeContainer";
        prizeToken.name     = "prizeToken";
        prizeString.name    = "prizeString";
        prizeSymbol.name    = "prizeSymbol";

        prizeContainer.on('click', function (ev) {
            if (rowContainer.isRevealed == false) {
                rowContainer.isRevealed = true;
                var current = rowAssetsArray[ev.currentTarget.token];
                MEvent.DOUBLEMATCHREVEAL.row    = rowContainer;
                MEvent.DOUBLEMATCHREVEAL.t = this.asset;
                MEvent.DOUBLEMATCHREVEAL.self = t;
                iwg.IWGEM.dispatchEvent(MEvent.DOUBLEMATCHREVEAL);
                t.stopReminder();
                setTimeout(function () {
                    Helper.resetPrompt();
                }, 1000);
            }
        }, null, true);

        rowAssetsArray.push(prizeAsset);
        prizeContainer.addChild(prizeToken, prizeSymbol);
        rowContainer.addChild(prizeContainer);

        t.setY(t.getY() + t.getGapY());

        t.getContainer().addChild(rowContainer);

        var gameAssetArray = t.getGameAssetArray();
        gameAssetArray.push(rowAssetsArray);

        rowContainer.rowAssets = rowAssetsArray;
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
            matchContainer.x = /*140*/135;
            matchContainer.asset = matchAsset;
            matchAsset.it = pv;
            matchAsset.confettiNum = parseInt(pv);
            matchAsset.setTicketLabel(prizeValues[pv]);


            var maskX = /*-15*/-10,
                maskY = 0,
                maskW = /*230*//*225*/218,
                maskH = 166;

            if(parseInt(pv) === 1){
                matchContainer.y = 260;
                matchSymbol.y += 10;
                maskY += 33;
                maskH -= 9;
            }
            matchContainer.isRevealed = false;

            var matchArray = t.getMatchArray();
            matchArray.push(matchAsset);

            matchContainer.name = "matchContainer"+pv;
            matchSymbol.name    = "matchSymbol";
            matchToken.name     = "matchToken";

            // create new confetti
            var confettiWinner = new Confetti(
                    [-101, -105, 10, 10],               // Container Co-ords
                    [maskX, maskY, maskW, maskH]   // Mask Co-ords
                );
            t.getConfettiWinners().push(confettiWinner);
            matchContainer.addChild(confettiWinner.getContainer());

            matchContainer.on('click', function (ev) {
                var asset = ev.currentTarget.asset;
                if(asset.getIsRevealed() === false){
                    asset.setIsRevealed(true);
                    this.isRevealed = true;
                    R.clickCount++;
                    MEvent.DOUBLEMATCHREVEAL.t = this.asset;
                    MEvent.DOUBLEMATCHREVEAL.self = t;
                    iwg.IWGEM.dispatchEvent(MEvent.DOUBLEMATCHREVEAL);
                    t.stopReminder();
                    setTimeout(function () {
                        Helper.resetPrompt();
                    }, 1000);
                }
            }, null, true);

            matchContainer.addChild(matchToken, matchSymbol);
            t.getContainer().addChild(matchContainer);
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
            revealTimeLine  = new TimelineLite({
                smoothChildTiming : true,
                onStart: function(){
                    if(R.PLAYSOUND){
                        createjs.Sound.play("whoosh");
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
            alpha: 1,
            onStart: function(){
                if(R.PLAYSOUND){
                    createjs.Sound.play("whoosh2");
                }
            }
        }, 0);

        // check for other winners not banked yet
        var winQueue    = t.getWinRevealQueueArray(),
            matchQueue  = t.getMatchArray();

        for(var piece in matchQueue){

            // get ticket label
            var ticketLabel = matchQueue[piece].getTicketLabel();

            // now go through bankedArray and find if any had been matched
            // first checking some are in the winQueue
            if (winQueue.length > 0) {

                // loop over all the revealed asets and reveal them
                for (var i = 0; i < winQueue.length; i++) {

                    // remove from the array
                    if (ticketLabel === winQueue[i][1].getTicketLabel()){
                        var w = winQueue[i];
                        t.checkMatchOneWin(w[0], w[1], w[2], w[3]);
                    }

                }
            }
        }

        setTimeout(function () {
            Helper.resetPrompt();
        }, 1000);

        t.isFinished();
    }

    function checkMatchReveal(ev) {

        var self    = ev.self,
            t       = ev.t,
            currentRow  = null,
            delay       = 0;

        if(t.name !== "matchAsset"){
            currentRow  = t.rowContainer.rowAssets;
        } else {
            // reveal match
            var coin = t.getContainer().getChildByName('matchSymbol'),
                token = t.getContainer().getChildByName('matchToken');

            var revealTimeLine = new TimelineLite({
                smoothChildTiming : true,
                onStart: function(){
                    if(R.PLAYSOUND){
                        createjs.Sound.play("whoosh");
                    }
                }
            });

            coin.gotoAndPlay("coinReveal");
            coin.on("animationend",function(evt){
                evt.currentTarget.stop();
                TweenLite.to(evt.currentTarget, 0.5, {
                    alpha: 0
                }, 0);
            }, null, true);

            revealTimeLine.to(token, 1, {
                delay: 0.3,
                alpha: 1,
                onStart: function(){
                    if(R.PLAYSOUND){
                        createjs.Sound.play("whoosh2");
                    }
                }
            }, 0);

            t.setIsRevealed(true);
        }


        if (currentRow){
            for (var symbol in currentRow) {
                var c = currentRow[symbol];
                c.reveal('reveal', c, 0);
            }
        }
        Helper.stopPrompt();
        R.clickCount++;
        // delay then check winner


        // loop through winning symbols
        for(var winningSymbol in self.getMatchArray()){

            var winningToken = self.getMatchArray()[winningSymbol].getTicketLabel();



            // loop through the yourSymbols array
            for(var yourSymbol in self.getGameAssetArray() ) {
                // get one of the assets
                var yours = self.getGameAssetArray()[yourSymbol][0];
                // check if any of yourSymbols have been clicked
                if (yours.rowContainer.isRevealed === true && yours.rowContainer.isWinRevealed === false){
                    if (self.getMatchArray()[winningSymbol].getIsRevealed()){
                        if (winningToken === yours.getTicketLabel()){

                            var winningMatchAsset = self.getMatchArray()[winningSymbol];

                            yours.rowContainer.isWinRevealed = true;
                            var bgHighlight = yours.getContainer().getChildByName("matchThreeBgShape");
                            // win reveal now
                            var rowassetArray = self.getGameAssetArray()[yourSymbol];
                            var bankAmount = rowassetArray[1].prizeValue;
                            core.IWG.ame('bank', {
                                deposit: [bankAmount],
                                log: true
                            });
                            highlightPrizeAmount( rowassetArray[1], rowassetArray, self,winningMatchAsset);
                        }
                    }
                }
            }
        }
        self.isFinished();
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
                           createjs.Sound.play("moneyStack");
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
                    delay: 0.25,
                    alpha: 0
                }, 0)
                .to(prizeToken, 1, {
                    delay: 1,
                    alpha: 1
                }, 0);

            } else {
                var obj = container.getChildByName("symbol"),
                    icon = container.getChildByName("token"),
                    shadow = container.getChildByName("shadow");

                obj.gotoAndPlay("moneyBagReveal");
                obj.on("animationend",function(evt){
                    evt.currentTarget.stop();
                    shadow.alpha = 0;
                   TweenLite.to(evt.currentTarget, 0.5, {
                        alpha: 0
                    }, 0);
                });
                revealTimeLine.to(icon, 1, {
                    delay: 1,
                    alpha: 1
                }, 0);
            }

        } else {
            core.IWG.ame('error', {
                mes: ['couldnt get icon Container - error code 03a1']
            });
        }

    }

    function highlightPrizeAmount(prize, rowArray, self, winningMatchAsset) {
        setTimeout(function(){

            prize.getContainer().children[0].gotoAndStop("win" + Helper.fixPrizeValue(prize.prizeValue));
            // play confetti win reveal
            var confettiRow     = parseInt(prize.getContainer().row) + 2;
            var confettiWinner  = self.getConfettiWinners()[confettiRow];
            confettiWinner.playConfettiTimeline();

            // play confetti win reveal on the match token
            var matchRow             = winningMatchAsset.confettiNum;
            var matchConfettiWinner  = self.getConfettiWinners()[matchRow];

            matchConfettiWinner.playConfettiTimeline();

        }, 2000);

        var clonePrize      = prize.getContainer().children[0].clone();
        clonePrize.gotoAndStop("lose" + Helper.fixPrizeValue(prize.prizeValue));
        clonePrize.alpha    = 0;
        clonePrize.name     = "losePrize";
        prize.getContainer().addChild(clonePrize);
        prize.getContainer().winner = true;
    }

    DoubleMatch.prototype.checkMatchOneWin = function (highlight, prize, rowArray) {

        var winners     = this.getMatchArray(),
            tokenValues = [];
        for ( var token in winners){
            tokenValues.push(winners[token].getTicketLabel());
        }

        if ( prize.isWinner == '1' && winners[0].getIsRevealed() == true && winners[1].getIsRevealed() == true ) {
            rowArray.isWinRevealed = true;
            // bank amount

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
    DoubleMatch.prototype.setupReminder = function () {
        var contParent = this.getContainer();
        var highlight = contParent.getChildByName("boxHighlight");
            highlight.alpha = 0;

        DoubleMatch.REMINDER = new TweenMax.to(highlight, 0.7, {
            alpha: 1,
            ease: "easeIn",
            repeat: -1,
            yoyo: true,
            delay: 4,
            onStartScope: this,
            onStartParams: [this,true],
            onStart: doCoinReminder
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
        doCoinReminder(this,false);
    }

    function doCoinReminder(self,state) {
        // loop over coins, if not reveals then play reminders on them
        for (var i = 0; i < 2; i++) {
            var matchCont = self.getContainer().getChildByName("matchContainer"+i);
            if (!matchCont.isRevealed) {
                var coin = matchCont.getChildByName("matchSymbol");
                if (state) {
                    coin.gotoAndPlay("coinReminder");
                 } else {
                    coin.gotoAndStop("coinReveal");
                }
            }
        }
    }

    DoubleMatch.prototype.pulseWinners = function () {
        this.getHighLightTimeline().clear();

        var turns = this.getRowContainerArray();
        // loop over all prizes
        for (var turn in turns) {
            // get prize container
            var prizeWinner = turns[turn].getChildByName("prizeContainer");

            if (prizeWinner) {
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
