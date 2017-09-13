(function (window) {
    "use strict";

    // declare the paths to resources used. If they don't yet exist create a reference to them.
    if (!window.com.camelot.iwg) {
        window.com.camelot.iwg = {};
    }
    if (!window.com.camelot.iwg.lib) {
        window.com.camelot.iwg.lib = {};
    }

    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        SS = window.com.camelot.iwg.lib.flassets.MasterSS,
        core = camelot.core,
        fps,
        fpsCount = 0,
        lowFPScount = 0,
        lastCalledTime = null,

        R = function () {

            if (typeof R.instance === "object") {
                return R.instance;
            }
            //singleton
            var _instance = this;
            R.instance = this;

        };

    R.simBank = 0;

    R.PLAYSOUND = true;
    R.PAUSESOUND = null;
    R.PAUSE = false;
    R.THROTTLE = false;

    //static var
    R.UPSCALE = null;
    R.GAMEWIDTH = null;
    R.GAMEHEIGHT = null;
    R.SCALE = null;
    R.OLDHEIGHT = null;
    R.OLDWIDTH = null;
    R.SCALEWIDTH = null;
    R.SCALEHEIGHT = null;

    // corner winner
    R.CORNERWINS = 0;
    R.ISCORNERWINNER = false;

    // delay
    R.DELAY = 500;

    // reveal timelines
    R.pause = false;
    R.revealTimeline = new TimelineMax({
        paused: true
    });
    R.revealTimeline.call(function () {});
    R.cornerRevealTimeLine = new TimelineLite({
        delay: 0.2
    });
    R.cornerRevealTimeLine.call(function () {});
    R.promptAnimation = new TimelineMax({
        repeat: -1
    });
    R.promptTimeline = new TimelineLite();

    R.prizeItemArray = [];
    R.winRevealAssets = [];
    R.winRevealsTL = new TimelineLite({
        pause: true
    })

    // tiles
    R.TILES = [];
    R.CORNERTILEARRAY = [];

    // banked clicks
    R.CLICKORDER = [];

    // lock touch
    R.LOCK = false;

    // window shown
    R.WINDOWSHOW = 'left';

    // has game finished
    R.HASFINISHED = false;

    //ticket need to be a blank object so it can be created
    R._ticket = {};
    R.rowWon = 0;
    R.STAGE = null;
    R.isUpdate = false;

    // starting positions
    R.RIGHTWINDOWSTARTX = 0;

    // turns left
    R.TURNSLEFT = 0;

    /**
     *
     * @type {Object}
     * @private
     */
    R._cash = 0;

    R._ticket = core.IWG.ame('ticket');
    R._ticketIsWin = {};
    R._prizeArray = [];
    R._loseArray = [];

    R._ticketGameData = [],
    R._ticketBoardGameData = R._ticket.params.grid.split(","),
    R._ticketPrizeTier,
    R._ticketPrizeAmount,
    R._ticketPrizeArray = [],
    R._ticketWinner,
    R._ticketGridArray = [], // to hold a grid reference to all the token
    R._tokenRows = [], // rows taken from the ticket
    R._tokenCols = [], // cols taken from the ticket
    R._ticketCorners = [],

    // Game States
    R.GAMESTATE = null;
    R.INTRO = 0;
    R.PLAYING = 1;
    R.GAMEEND = 2;

    //counters
    R.CLICKCOUNT = 0;
    R.GOES = 0;
    R.TURNS = 0;
    R.TILESTURNED = 0;

    // pause assets
    // capturing current turn and current tile
    R.PAUSECAPTURE = [];
    R.TURNTIMELINE = new TimelineLite();

    R.AUDIO = {};
    R.isLOCKAUDIO = false;

    // assets
    R.LOGO = null;
    R.GAME = null;

    // containers
    R.LEFTWINDOWRIGHTPANE = null;
    R.BACKGROUND = null;
    R.MAINGAMECONTAINER = null;
    R.LEFTWINDOW = null;
    R.RIGHTWINDOW = null;
    R.CORNERTILECONTAINER = null;
    R.ENDGAME = null;
    R.PROMPT = null;
    R.swipePrompt = null;
    R.PAUSESCREEN = new createjs.Container();

    R.PAUSETWEENS = [];

    R.lastInterval = new Date().getTime();
    var killInterval = 10000;
    setTimeout(function () {
        killInterval = 800;
    }, 1000);



    R.intervalHeartbeat = function () {

        var now = new Date().getTime();
        var kill = now - R.lastInterval;
        if (kill > killInterval) {
            // don't trigger on small stutters less than 1000ms
            if (window.com.camelot.core.IWG.PAUSE.data !== true) {
                window.com.camelot.core.IWG.PAUSE = {
                    type: "pauseGame",
                    data: true
                };
                window.com.camelot.iwg.IWGEM.dispatchEvent(window.com.camelot.core.IWG.PAUSE);
                TweenLite.ticker.removeEventListener("tick", R.tick);
                R.STAGE.addChild(R.PAUSESCREEN);

                R.STAGE.on("click", function () {
                    createjs.Sound.play("pop");
                    R.lastInterval = new Date().getTime();
                    TweenLite.ticker.addEventListener("tick", R.tick);
                    window.com.camelot.core.IWG.PAUSE = {
                        type: "pauseGame",
                        data: false
                    };
                    window.com.camelot.iwg.IWGEM.dispatchEvent(window.com.camelot.core.IWG.PAUSE);
                    R.STAGE.update();
                    R.STAGE.removeChild(R.PAUSESCREEN);
                    R.refreshStaticStages();
                }, null, true);
            }
        }
    }
    R.tick = function () {

        R.intervalHeartbeat();
        R.STAGE.update();
        R.lastInterval = new Date().getTime();

    }
    R.refreshStaticStages = function(e) {
        setTimeout(function(){
            R.STAGE.update()
        }, 200);
    }

    R.rescale = function () {


        R.SCALE = 1 - R.resize(true);

        R.SCALEWIDTH = core.IWG.ame('get', {
            vars: ['gameWidth']
        });
        R.SCALEHEIGHT = core.IWG.ame('get', {
            vars: ['gameHeight']
        });

        R.STAGE.scaleX = R.SCALE;
        R.STAGE.scaleY = R.SCALE;

        TweenMax.resumeAll(true, true)
    }
    R.resize = function (getScaleUp) {
        R.pause = false;

        // check if the orrientation is correct
        var checkOrientation = core.IWG.ame('get', {
            vars: ['gameOrientationCorrect']
        });

        if (checkOrientation) {

            var initialWidth = core.IWG.ame('get', {
                vars: ['gameWidth']
            }),
                initialHeight = core.IWG.ame('get', {
                    vars: ['gameHeight']
                }),
                availableWidth = core.IWG.ame('get', {
                    vars: ['availableWidth']
                }),
                avablableHeight = core.IWG.ame('get', {
                    vars: ['availableHeight']
                }),
                cssHeight = 640,
                cssWidth = 960,
                scaleUp,
                myRatio = cssWidth / cssHeight,
                windowRatio = initialWidth / initialHeight;

            R.GAMEHEIGHT = 640;
            R.GAMEWIDTH = 960;

            if (myRatio >= windowRatio) {
                scaleUp = R.UPSCALE = ((cssWidth - initialWidth) / cssWidth);
            } else {
                scaleUp = R.UPSCALE = ((cssHeight - initialHeight) / cssHeight);
            }

            var trueX = initialWidth / 2;
            var gameX = R.GAMEWIDTH * (1 - scaleUp) / 2;

            R.STAGE.x = trueX - gameX;

            if (getScaleUp) {
                return scaleUp;
            }

        } else {

            R.pause = true;

        }
    }
    R.halt = function () {
        createjs.Sound.setMute(true);
    }

    R.makeBitmapImage = function (name, pos, alpha) {
        var BitmapImage = new createjs.Sprite(SS.ss);
        BitmapImage.gotoAndStop(name);
        BitmapImage.x = pos.x;
        BitmapImage.y = pos.y;
        if (alpha) {
            BitmapImage.alpha = alpha
        }
        return BitmapImage;
    }

    R.Orientation = function () {

        function changeOrientation() {
            var orien = window.orientation;
            switch (orien) {
            case 0:
                game.className = "portrait";
                break;
            case 90:
                game.className = "landscape-left";
                break;
            case -90:
                game.className = "landscape-right";
                break;
            default:
                game.className = "portrait-down";
                break;
            }
        }
        var support = document.documentElement.className
        var s = support.split(" ");
        for (var check in s) {
            if (check === "touch") {
                R.GAME = document.getElementById("IWGcanvas");

                window.addEventListener("orientationchange", changeOrientation, false);
                changeOrientation();
            }
        }
    }
    R.shuffle = function (o) { //v1.0
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    R.randomFromInterval = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
    /*
     * Sparkle
     *
     *       co-ords: @object       (x,y)
     *         image: @string       (url)
     *      duration: @number       (number of miliseconds the animation lasts)
     *    animations: @Object       (instructions for animation)
     * self destruct: @bool
     *
     */
    R.sparkle = function (ords, image, duration, animations, parentContainer, destruct) {

        var x = 0,
            y = 0;

        if (ords.hasOwnProperty('x')) {
            x = ords.x;
        }
        if (ords.hasOwnProperty('y')) {
            y = ords.y;
        }

        var img = R.makeBitmapImage(image, {
            x: 0,
            y: 0
        });
        img.x = x;
        img.y = y;
        img.scaleX = 0.5;
        img.scaleY = 0.5;
    }

    //Static method to create ticket
    //This could be called from any file with R.ParseCheck_Ticket();
    R.turnsArray = [];

    R.ParseCheck_Ticket = function () {

        var outcomeXML = R._ticket.outcome,
            paramsXML = R._ticket.params,
            prizeListXML = R._ticket.prizeList,
            games1XML = R._ticket.g1;

        // get the prize tier and prizes
        R._ticketPrizeTier = outcomeXML.tier;
        var pArray = prizeListXML.a;
        R._ticketPrizeArray = pArray.split(",");

        var gridArray = paramsXML.grid;
        R._ticketGridArray = gridArray.split(",");
        R._ticketCorners = new Array(R._ticketGridArray[0], R._ticketGridArray[5], R._ticketGridArray[30], R._ticketGridArray[35]);

        var rowArray = paramsXML.r;
        R._tokenRows = rowArray.split(",");
        var colArray = paramsXML.c;
        R._tokenCols = colArray.split(",");

        var prizeAmountString = outcomeXML.amount;
        prizeAmountString = prizeAmountString.split(",").join(""); // remove commas
        R._ticketPrizeAmount = parseFloat(prizeAmountString); // make a number
        R._ticketWinner = outcomeXML.isWinner;

        var ticketCalcTotal = 0;

        var turnsG1XML = games1XML.turn;
        var game1 = [];

        var g1_colWin = false;
        var g1_rowWin = false;
        var g1_cornersWin = false;
        var cornerCount = 0;

        // Process Main XML
        for (var turn in turnsG1XML) {

            var turnXML = turnsG1XML[turn];
            var g1_s = turnXML.s; // tokens won on this turn
            var g1_p = R._ticketPrizeArray[turnXML.prizeId]; // prize index into array
            var g1_w = turnXML.w; // ticket win result
            // get the column winˆ

            R.turnsArray.push(g1_s);

            if (turnXML.wF == "c") {
                g1_colWin = true;
            }
            // get the row win
            if (turnXML.wF == "r") {
                g1_rowWin = true;
            }
            // get the corner win
            if (turnXML.wF == "cnW") {
                g1_cornersWin = true;
            }
            game1.push([g1_s, g1_p, g1_w, g1_colWin, g1_rowWin, g1_cornersWin]);

            // add prize to running total
            if (turnXML.prizeId != "-1") {
                if (typeof g1_p != "undefined") {
                    ticketCalcTotal += parseInt(g1_p);
                }
            }
            // check for corner win
            for (var i = 0; i < R._ticketCorners.length; i++) {
                if (g1_s == R._ticketCorners[i]) {
                    cornerCount++;
                }
            }
        }

        // add all game arrays into main ticketdata
        R._ticketGameData.push(game1);
        // check prize value to ticket
        if (ticketCalcTotal != R._ticketPrizeAmount) {
            core.IWG.ame('error', {
                mes: ['error 1 - no match prize total']
            });
        }
        // check that 4 wins are present
        if (cornerCount === 4) {
            // corner winner
            // if not tier 9 then error because you shouldn't have corners
            if (R._ticketPrizeTier != 9) {
                core.IWG.ame('error', {
                    mes: ['error 1 - no match prize total']
                });
            }
        } else {
            // not 4 corners
            // if tier 9 then error because you should have corners
            if (R._ticketPrizeTier == 9) {
                core.IWG.ame('error', {
                    mes: ['not 4 corners']
                });
            }
        }
    }
    R.CURSORPOINTER = function (evt) {
        var tar = evt.target;
        var tarTimeline = new TimelineLite();
        tarTimeline.to(tar, 0.2, {
            scaleX: 0.9,
            scaleY: 0.9
        })
            .call(function () {
                tar.gotoAndStop(tar.hover)
            })

        document.body.style.cursor = 'pointer';
    }
    R.CURSORDEFAULT = function (evt) {
        var tar = evt.target;
        var tarTimeline = new TimelineLite();
        tarTimeline.to(tar, 0.2, {
            scaleX: 1,
            scaleY: 1
        })
            .call(function () {
                tar.gotoAndStop(tar.defaultState)
            });

        document.body.style.cursor = 'default';
    }

    iwg._class("iwg.lib.R", R);
}(window));
