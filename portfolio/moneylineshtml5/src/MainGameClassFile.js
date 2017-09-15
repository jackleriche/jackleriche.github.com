	(function (window) {
	    "use strict";
	    // set local paths to external files.
	    // public variables

	    var IWGInit,
	        _moneyLines,
	        camelot = window.com.camelot,
	        core = camelot.core,
	        iwg = camelot.iwg,
	        lib = iwg.lib,
	        R = lib.R,
	        Legend = lib.Legend,
	        SS = lib.flassets.MasterSS,
	        Twinkle = lib.Twinkle,
	        GameAsset = lib.GameAsset,
	        AssetContainer = lib.AssetContainer,
	        Swipe = lib.Swipe,
	        MEvent = lib.MEvent,
	        images = window.com.camelot.core.iwgLoadQ.images,
	        hammertime = Hammer(iwg.iwgCanvas),
	        clickOrder = [],
	        tileEnabled = true,
	        mainTileArray = [[], [], [], [], [], []], // create array for tiles position
	        simLegend = new Legend(),
	        legend = new Legend(),
	        swipe = null,
	        rowPrizeArray = [],
	        colPrizeArray = [],
	        revealTilesArray = [],
	        soundPath = "src/imports/sounds/",
	        revealDelay = 2000,
	        cont = true,
	        autoReveal = false,
	        turnReveal = 0,
	        splashButtonEnable = false,
	        nummmm = 0,
	        scale = 0,
	        isPromptShow = false,
	        tilesLeft = 6,
	        endGameShine = [[-122, -121], [122, -124], [121, 123], [-121, 122], [-127, -68], [121, -84], [84, 123], [-121, 92]],

	        sideShow = "left",
	        // tileBank
	        tileBank = [],
	        toPrompt = [],

	        // sounds
	        tileRevealSound = null,

	        splashArray = [0, 1, 2, 3, 4, 5, 6, 7, 8],
	        splashRandomArray = shuffle(splashArray),

	        // corners
	        cornerReveals = [0, 0, 0, 0], // to check the corner wins and only accumulate once
	        cornersWon = false, // to only bank the corner win once
	        cornerPanelArray = [],
	        cornerTileArray = [],

	        // simulation Game
	        simTileArray = [[], [], [], [], [], []],
	        simCornerPanelArray = [],


	        _MoneyLines,

	        MoneyLines = function () {

	            R.ParseCheck_Ticket();
                iwg.IWGEM.addEventListener(core.IWG.FULLSCREEN.type, refreshStaticStages);
	            iwg.IWGEM.addEventListener(MEvent.STARTGAME.type, startGame);
	            iwg.IWGEM.addEventListener(core.IWG.PAUSE.type, pauseGame);
                iwg.IWGEM.addEventListener(core.IWG.RESIZE.type, refreshStaticStages);

	            // game code
	            R.STAGE = new createjs.Stage(iwg.iwgCanvas);
	            createjs.Touch.enable(R.STAGE, false, true);
	            R.STAGE.enableMouseOver(10);
	            R.STAGE.canvas.height = core.IWG.ame('get', {
	                vars: ['gameHeight']
	            });
	            R.STAGE.canvas.width = core.IWG.ame('get', {
	                vars: ['gameWidth']
	            });
	            R.GAME = document.getElementById("IWGcanvas");

	            R.rescale();

                // // get pause stuff in
	                var pm = new createjs.Shape();
	                pm.graphics.f("rgba(0,0,0,0.6)").dr(-200, -200, 1300, 840);

	                var pausedIcon = new createjs.Shape();
	                pausedIcon.graphics.f().s("#FFFFFF").ss(5, 1, 1).p("AFKAAQAACIhhBhQhgBhiJAAQiIAAhhhhQhghhAAiIQAAiIBghhQBhhgCIAAQCJAABgBgQBhBhAACIg");
	                pausedIcon.y = 300;
	                pausedIcon.x = 480;

	                var pmText = new createjs.Shape();
	                pmText.graphics.f("#FFFFFF").s().p("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");
	                pmText.y = 300;
	                pmText.x = 480;

	                R.PAUSESCREEN.addChild(pm, pausedIcon, pmText);


	            TweenLite.ticker.fps(24);
                TweenLite.ticker.addEventListener("tick", R.tick);
                R.lastInterval = new Date().getTime();

	            iwg.IWGEM.addEventListener(MEvent.THROTTLE.type, onThrottle);

	            camelot.iwg.lib.flassets.MasterSS.ss = new createjs.SpriteSheet(camelot.iwg.lib.flassets.MasterSS.spriteSheet);

	            setTimeout(function () {
	                R.GAMESTATE = R.INTRO;
	            }, 3500);

	            // set up prize amount
	            mainPrizePanelSetup();

	            // create sim legend + bank
	            setUpFakeLegend();
	            checkForManipulation();

	            var splashContainer = new createjs.Container(),
	                splashButton = R.makeBitmapImage("buttonplay", {
	                    x: 480,
	                    y: (core.IWG.ame('get', {
	                        vars: ['availableHeight']
	                    }) / R.SCALE) + 200
	                }),
	                logoBig = R.makeBitmapImage("logobig", {
	                    x: 480,
	                    y: 120
	                }),
	                i = 0,
	                background = new createjs.Container(),
	                starburst1 = new createjs.Bitmap(images.starburst),
	                starburst2 = starburst1.clone(true),
	                winUpTo = null,
	                winShiner = null,

	                boxContainer = new createjs.Container(),
	                box1 = R.makeBitmapImage("tileturnbig", {
	                    x: 480,
	                    y: (core.IWG.ame('get', {
	                        vars: ['availableHeight']
	                    }) / R.SCALE)
	                }),
	                box2 = R.makeBitmapImage("tileturnbig", {
	                    x: 480,
	                    y: (core.IWG.ame('get', {
	                        vars: ['availableHeight']
	                    }) / R.SCALE)
	                }),
	                box3 = R.makeBitmapImage("tileturnbig", {
	                    x: 480,
	                    y: (core.IWG.ame('get', {
	                        vars: ['availableHeight']
	                    }) / R.SCALE)
	                }),

	                // slide movement
	                X = null,
	                windowShow = "left";
	            splashButton.defaultState = "buttonplay";
	            splashButton.hover = "buttonplayover";

	            R.BACKGROUND = background;

	            starburst1.regX = 385;
	            starburst1.regY = 449;
	            starburst1.x = 960 / 2;
	            starburst1.y = (core.IWG.ame('get', {
	                vars: ['gameHeight']
	            }) / R.SCALE);
	            starburst2.regX = 385;
	            starburst2.regY = 449;
	            starburst2.x = 960 / 2;
	            starburst2.y = (core.IWG.ame('get', {
	                vars: ['gameHeight']
	            }) / R.SCALE);
	            starburst2.alpha = 0.2;
	            starburst1.scaleX = starburst1.scaleY = 2.5;
	            starburst2.scaleX = starburst2.scaleY = 2.5;

	            // turn off the movement if the screen is larger then ipad as resource heavy
	            if (R.THROTTLE != true) {
	                TweenMax.to(starburst2, 20, {
	                    rotation: -190,
	                    repeat: -1,
	                    yoyo: true,
	                    ease: "linear"
	                });
	            }

	            boxContainer.addChild(box1, box2, box3);

	            var tl = new TimelineLite({
	                repeat: 0,
	                onComplete: slideBoxOff
	            });

	            tl.to(box1, 0.5, {
	                y: 300,
	                ease: "Power4.easeInOut"
	            }, "moveUp")
	                .to(box2, 0.5, {
	                    y: 300,
	                    ease: "Power4.easeInOut"
	                }, "moveUp")
	                .to(box3, 0.5, {
	                    y: 300,
	                    ease: "Power4.easeInOut"
	                }, "moveUp")
	                .to(box2, 0.5, {
	                    x: 310,
	                    ease: "Power4.easeInOut"
	                }, "moveOut")
	                .to(box3, 0.5, {
	                    x: 650,
	                    ease: "Power4.easeInOut"
	                }, "moveOut")
	                .call(reveal, [box1, box1.x, 300])
	                .call(reveal, [box2, 310, 300])
	                .call(reveal, [box3, 650, 300])

	            function reveal(box, boxX, boxY) {
	                // random tile to display on splash, removing from array of available to
	                // reduce chance of duplicates

	                var random = splashRandomArray.pop();
	                var string = "t" + random,
	                    iconHighlight = R.makeBitmapImage("tilehighlightbig", {
	                        x: boxX,
	                        y: 300
	                    }),
	                    icon = R.makeBitmapImage(string, {
	                        x: boxX,
	                        y: boxY
	                    });
	                icon.scaleY = 0;
	                iconHighlight.alpha = 0;

	                box.gotoAndPlay("tileturnbig");
	                //box.gotoAndPlay("tilepurplebig");
	                TweenLite.to(icon, 0.6, {
	                    delay: 0.2,
	                    scaleY: 1,
	                    ease: "Power4.easeInOut"
	                });
	                box.addEventListener("animationend", function () {
	                    box.gotoAndStop("tilepurplebig");
	                });

	                var iconHighlightTimeLine = new TimelineLite();
	                iconHighlightTimeLine.to(iconHighlight, 0.5, {
	                    delay: 0.7,
	                    alpha: 1,
	                    ease: "Power4.easeInOut"
	                })
	                    .to(iconHighlight, 0.5, {
	                        alpha: 0,
	                        ease: "Power4.easeInOut"
	                    })
	                    .to(iconHighlight, 0.5, {
	                        alpha: 1,
	                        ease: "Power4.easeInOut"
	                    })
	                    .to(iconHighlight, 0.5, {
	                        alpha: 0,
	                        ease: "Power4.easeInOut"
	                    })
	                    .to(iconHighlight, 0.5, {
	                        alpha: 1,
	                        ease: "Power4.easeInOut"
	                    })
	                    .to(iconHighlight, 0.5, {
	                        alpha: 0,
	                        ease: "Power4.easeInOut"
	                    });
	                boxContainer.addChild(icon, iconHighlight);

	            }

	            function slideBoxOff() {
	                var winShineContainer = new createjs.Container();
	                if (i < 1) {
	                    i++;
	                    tl.append(TweenLite.to(boxContainer, 1, {
	                        delay: 1,
	                        x: -1000,
	                        ease: "Power4.easeInOut"
	                    }))
	                    winUpTo = R.makeBitmapImage("winupto", {
	                        x: 480,
	                        y: 320
	                    });
	                    winUpTo.alpha = 0;
	                    winShineContainer.addChild(winUpTo);
	                    tl.append(TweenLite.to(winUpTo, 0.2, {
	                        alpha: 1,
	                        ease: "Power4.easeInOut",
	                        onComplete: function () {
	                            splashContainer.addChild(winShineContainer);
	                        }
	                    }));
	                    tl.append(TweenLite.to(splashButton, 0.5, {
	                        y: 480,
	                        ease: "Power4.easeInOut"
	                    }));
	                }
	            }
	            splashButton.on('click', function () {
	                iwg.IWGEM.dispatchEvent(MEvent.STARTGAME);
	            }, null, true);

	            splashButton.addEventListener("mouseover", R.CURSORPOINTER);
	            splashButton.addEventListener("mouseout", R.CURSORDEFAULT);
	            splashButton.addEventListener("keydown", R.CURSORPOINTER);
	            splashButton.addEventListener("keyup", R.CURSORDEFAULT);

	            R.BACKGROUND.addChild(starburst1, starburst2);
	            R.STAGE.addChild(R.BACKGROUND);
	            splashContainer.addChild(logoBig, boxContainer, splashButton);

	            function startGame() {

	                swipe = new Swipe(R.STAGE);

	                if (R.GAMESTATE === 0) {
	                    createjs.Sound.play("knockWood");

	                    // set the game state to playing, this also fixes bug with double game coming up
	                    R.GAMESTATE = R.PLAYING;
	                    var splashOff = new TimelineLite({
	                        onComplete: removeSplash
	                    });
	                    splashOff.to(logoBig, 0.3, {
	                        x: -1000,
	                        ease: "Power4.easeInOut"
	                    })
	                        .to(winUpTo, 0.3, {
	                            x: -1000,
	                            ease: "Power4.easeInOut"
	                        }, "-=0.2")
	                        .to(splashButton, 0.3, {
	                            y: 1000,
	                            ease: "Power4.easeInOut"
	                        }, "-=0.3");
	                    setupGameLayout();
	                }
	            }

	            function removeSplash() {
	                R.STAGE.removeChild(splashContainer);
	            }

	            function setupGameLayout() {

	                var mainGameContainer = new createjs.Container(),
	                    leftWindow = new createjs.Container(),
	                    leftWindowLeftPane = new createjs.Container(),
	                    leftWindowLeftPaneAlpha = R.makeBitmapImage("framechoose", {
	                        x: 0,
	                        y: 0
	                    }),
	                    leftWindowLeftPaneInstruction = R.makeBitmapImage("instruction", {
	                        x: 0,
	                        y: -10
	                    }),
	                    leftWindowSound = new createjs.Bitmap(images.audioOn),
	                    leftWindowSoundContainer = new createjs.Container(),

	                    leftWindowRightPane = new createjs.Container(),
	                    leftWindowRightPaneAlpha = R.makeBitmapImage("framechoose", {
	                        x: 0,
	                        y: 0
	                    }),

	                    rightWindow = new createjs.Container(),
	                    rightWindowGameBG = R.makeBitmapImage("framegame", {
	                        x: 0,
	                        y: 0
	                    });

	                leftWindowSound.name = "soundButton";
	                leftWindow.setBounds(0, 0, 960, 640);
	                rightWindow.setBounds(0, 0, 960, 640);


	                R.LEFTWINDOWRIGHTPANE = leftWindowRightPane;
	                R.LEFTWINDOW = leftWindow;
	                R.RIGHTWINDOW = rightWindow;
	                R.RIGHTWINDOW.y = 0;
	                leftWindowSound.scaleX = leftWindowSound.scaleY = 0.75;

	                mainGameContainer.addChild(leftWindow, rightWindow);
	                R.MAINGAMECONTAINER = mainGameContainer;

	                // logo
	                var moneyLineLogo = R.makeBitmapImage("logosmall", {
	                    x: 800,
	                    y: 800
	                });
	                R.LOGO = moneyLineLogo;

	                leftWindowLeftPane.x = core.IWG.ame('get', {
	                    vars: ['availableWidth']
	                }) / R.SCALE + 203;
	                leftWindowLeftPane.y = 250;
	                leftWindowRightPane.x = core.IWG.ame('get', {
	                    vars: ['availableWidth']
	                }) / R.SCALE + 203;
	                leftWindowRightPane.y = 250;

	                leftWindowSoundContainer.x = -190;
	                leftWindowSoundContainer.y = -190;
	                leftWindowSoundContainer.alpha = 0;

	                rightWindow.x = R.RIGHTWINDOWSTARTX = core.IWG.ame('get', {
	                    vars: ['availableWidth']
	                }) / R.SCALE + 203;
	                rightWindow.y = 200;
	                rightWindowGameBG.x = 320;
	                rightWindowGameBG.y = 110;

	                // add to pane's
	                leftWindowSoundContainer.addChild(leftWindowSound);
	                leftWindowLeftPane.addChild(leftWindowLeftPaneAlpha, leftWindowLeftPaneInstruction, leftWindowSoundContainer),
	                leftWindowRightPane.addChild(leftWindowRightPaneAlpha);

	                // add to window's
	                leftWindow.addChild(leftWindowLeftPane, leftWindowRightPane);
	                rightWindow.addChild(rightWindowGameBG);
	                // add to stage
	                R.STAGE.addChild(moneyLineLogo, mainGameContainer);

	                var SlideInGame = new TimelineLite()
	                SlideInGame.to(moneyLineLogo, 0.5, {
	                    delay: 0.9,
	                    y: 550,
	                    ease: "Power4.easeInOut"
	                })
	                    .to(leftWindowLeftPane, 0.5, {
	                        x: 260,
	                        ease: "Power4.easeInOut"
	                    }, 0)
	                    .to(leftWindowRightPane, 0.5, {
	                        x: 700,
	                        ease: "Power4.easeInOut"
	                    }, 0)
	                    .to(leftWindowSoundContainer, 0.5, {
	                        alpha: 1,
	                        ease: "Power4.easeInOut"
	                    }, 0)

	                swipe.enabled(true, R.GAME, R.MAINGAMECONTAINER, 70);


	                leftWindowSoundContainer.on('click', function () {
	                    MEvent.TOGGLESOUND.that = this;
	                    iwg.IWGEM.dispatchEvent(MEvent.TOGGLESOUND);
	                });

	                boardPanelSetup();

	            }

	            //-------------------------------\/add stage assets\/------------------------------------------//
	            R.STAGE.addChild(splashContainer);
	            //
	            R.STAGE.enableMouseOver(20);
	            R.STAGE.update();

	            //singleton instance
	            MoneyLines.instance = this;
	            core.IWG.ame('killLoader');

	        };

	    //static variable
	    MoneyLines.VERSION = '0.0.1';

	    function checkIfAutoReveal(c) {
	        return false;
	    }

	    function boardPanelSetup() {

	        smallPanelSetup();
	        // setup event listeners
	        iwg.IWGEM.addEventListener(MEvent.MOVERIGHT.type, moveRightComplete);
	        iwg.IWGEM.addEventListener(MEvent.MOVELEFT.type, moveLeftComplete);
	        iwg.IWGEM.addEventListener(MEvent.CHECKENDGAME.type, checkEndGame);
	        iwg.IWGEM.addEventListener(MEvent.ENABLETOUCH.type, enableTouch);
	        iwg.IWGEM.addEventListener(MEvent.DISABLETOUCH.type, disableTouch);
	        iwg.IWGEM.addEventListener(MEvent.ADDTURN.type, addTurn);
	        iwg.IWGEM.addEventListener(MEvent.LEGENDENDTURN.type, legendEndTurn);
	        iwg.IWGEM.addEventListener(MEvent.TILEREVEALED.type, tileRevealed);
	        iwg.IWGEM.addEventListener(MEvent.REVEALING.type, revealing);
	        iwg.IWGEM.addEventListener(MEvent.CORNERWIN.type, cornerWinner);
	        iwg.IWGEM.addEventListener(MEvent.ENDGAME.type, endGame);
	        iwg.IWGEM.addEventListener(MEvent.TOGGLESOUND.type, toggleSound);
	        iwg.IWGEM.addEventListener(MEvent.WINREVEAL.type, winReavel);

	        // swipe prompt
	        iwg.IWGEM.addEventListener(MEvent.SWIPEPROMPT.type, swipePrompt);

	        //mainPrizePanelSetup();
	        mainTileSetup();
	        mainTileLegendSetup();
	        cornerTileSetup();
	        endGameSetup();

	        setTimeout(function () {
	            promptTiles();
	        }, 4000);
	        promptMessage();

	    }

	    function pauseGame(ev) {
	        // check sound
	        var state = ev.data;
	        var tweens = TweenMax.getAllTweens(true);

	        if (state === false) {
	            // unpause
	            // return sound to original state
                createjs.Sound.setMute(false);
                R.revealTimeline.call(function(){});
	            R.revealTimeline.play();
	            for (var tween in tweens) {
	                tweens[tween].play();
	            }
	        } else if (state === true) {
	            // pause
	            // force sound off
                createjs.Sound.setMute(true);
	            R.PAUSECAPTURE = [R.GOES, R.TILESTURNED];
	            R.revealTimeline.pause();
	            for (var tween in tweens) {
	                tweens[tween].pause()
	            }
	        }
            refreshStaticStages(ev);
	    }

	    //private setup panel
	    function smallPanelSetup() {

	        var X = -130,
	            Y = -130,
	            row = 0,
	            buttonArray = [];

	        for (var i = 0; i < 9; i++) {

	            if ((i % 3 == 0) && (row != 0)) {
	                Y += 130;
	                X = -130;
	                row++;
	            } else if (row === 0) {
	                row++;
	            } else {
	                X += 130;
	            }

	            var button = R.makeBitmapImage("tileturnbigq", {
	                x: 0,
	                y: 0
	            }),
	                buttonContainer = new createjs.Container();
	            // add properties to button and buttonIcon to retrieve them easier in tileReveal();
	            button.name = "tile";
	            // add properties to buttonContainer
	            buttonContainer.name = "container";
	            buttonContainer.isRevealed = false;
	            buttonContainer.x = X;
	            buttonContainer.y = Y;

	            buttonContainer.addChild(button);

	            R.TILES.push(buttonContainer);

	            R.LEFTWINDOWRIGHTPANE.addChild(buttonContainer);
	            // event listeners for buttonContainer
	            buttonContainer.on('click', function (evt) {

	                stopPrompt();
	                var obj = evt.target,
	                    name = obj.name;

	                while (name != "container") {
	                    obj = obj.parent;
	                    if (obj.name) {
	                        name = obj.name;
	                    }
	                }

	                if (obj.isRevealed === false) {
	                    cont = false;
	                    tileReveal(obj, obj.x, obj.y);
	                    R.TURNSLEFT++;
	                    setTimeout(function () {
	                        promptTiles();
	                    }, 4000);

	                }
	            }, null, true);

	            buttonContainer.addEventListener('mouseover', function (evt) {
	                stopPrompt();
	                if (tileEnabled) {
	                    var obj = evt.target;
	                    if (obj.isRevealed === false) {
	                        createjs.Sound.play("knockWood");
	                        TweenLite.to(obj, 0.2, {
	                            x: obj.x,
	                            scaleY: 1.1,
	                            scaleX: 1.1
	                        });
	                        pointer();
	                    }
	                }
	            });

	            buttonContainer.addEventListener('mouseout', function (evt) {
	                var obj = evt.target;
	                promptTiles();
	                TweenLite.to(obj, 0.2, {
	                    scaleY: 1,
	                    scaleX: 1
	                });
	                pointerOut();
	            });
	        }
	    }

	    function tileReveal(tileContainer, tileX, tileY) {
	        var tile = tileContainer.getChildByName('tile');
	        try {
	            if (tileEnabled) {
	                if ((R.TURNS < 6) && (tile.isRevealed != true)) {
	                    tilesLeft--;

	                    if (tilesLeft === 0) {
	                        // fire swipe reminder
	                        iwg.IWGEM.dispatchEvent(MEvent.SWIPEPROMPT);

	                    }
	                    moveToTop(tileContainer);
	                    tile._ticketLabel = R._ticketGameData[0][R.TURNS][0];

	                    R.CLICKORDER.push(tile);

	                    tileContainer.isRevealed = true;
	                    var random = R.randomFromInterval(0, 8),
	                        iconShow = "t" + R._ticketGameData[0][R.TURNS][0],
	                        icon = R.makeBitmapImage(iconShow, {
	                            x: tileX,
	                            y: tileY
	                        });
	                    icon.scaleY = 0;

	                    var tileRevealTimeline = new TimelineLite();
	                    createjs.Sound.play("knockWoodShort");


	                    tileRevealTimeline.call(function () {
	                        tile.gotoAndPlay("tileturnbigq")
	                    }, 0)
	                        .to(icon, 0.43, {
	                            delay: 0.43,
	                            scaleY: 1,
	                            scaleX: 1,
	                            ease: "Power4.easeInOut"
	                        })

	                    tile.on('animationend', function () {
	                        this.stop();
	                        checkIfAutoReveal(R.CLICKORDER);
	                    })

	                    R.LEFTWINDOWRIGHTPANE.addChild(icon);

	                } else {
	                    if (tilesLeft === 0) {

	                        // remove click event from button
	                        var buttons = R.TILES;
	                        for (var button in buttons) {
	                            buttons[button].removeEventListener("click", function (e) {
	                                e.preventDefault();
	                            }, false);
	                        }
	                    }
	                }
	            }
	        } catch (err) {
	            alert(err);
	        }
	        R.TURNS++;

	        if (isPromptShow === true) {
	            var prompt = R.RIGHTWINDOW.getChildByName('prompt');
	            R.RIGHTWINDOW.removeChild(prompt);
	            isPromptShow = false;
	        }
	    }

	    function mainTileSetup() {
	        var gridCount = 0,
	            X = 0,
	            Y = -175;

	        for (var i = 0; i < 6; i++) {
	            X = 50;
	            Y += 85;
	            for (var j = 0; j < 6; j++) {
	                X += 85;
	                var tileContainer = new createjs.Container(),
	                    tileTokenNumber = R._ticketBoardGameData[gridCount++],
	                    tileBG = R.makeBitmapImage("tilegreysmall", {
	                        x: X,
	                        y: Y
	                    }),
	                    tileIcon = R.makeBitmapImage("t" + tileTokenNumber, {
	                        x: X,
	                        y: Y
	                    }),
	                    tileHighlight = R.makeBitmapImage("tilehighlightsmall", {
	                        x: X,
	                        y: Y
	                    }),
	                    tileAssetFunctions = {
	                        "reveal": tileGameReveal,
	                        "winReveal": tileGameWinReveal
	                    };
	                tileHighlight.alpha = 0;
	                tileContainer.isRevealed = false;
	                tileIcon.scaleX = 0.7;
	                tileIcon.scaleY = 0.7;

	                var gameAsset = new GameAsset(tileContainer, {}, tileAssetFunctions);
	                gameAsset.setTicketLabel(parseInt(tileTokenNumber));
	                // add to a game tile array
	                tileContainer.addChild(tileBG, tileIcon, tileHighlight);
	                R.RIGHTWINDOW.addChild(tileContainer);

	                mainTileArray[i].push(gameAsset);
	            }
	        }

	        mainTileArray[0][0].getContainer().cb = 0;
	        mainTileArray[0][5].getContainer().cb = 1;
	        mainTileArray[5][0].getContainer().cb = 2;
	        mainTileArray[5][5].getContainer().cb = 3;
	        // push tiles to cornerArray
	        cornerPanelArray.push(mainTileArray[0][0]);
	        cornerPanelArray.push(mainTileArray[0][5]);
	        cornerPanelArray.push(mainTileArray[5][0]);
	        cornerPanelArray.push(mainTileArray[5][5]);

	        // add eventlisteners to the corner tiles
	        mainTileArray[0][0].getContainer().addEventListener('tileIsRevealing', addCornerSection);
	        mainTileArray[0][5].getContainer().addEventListener('tileIsRevealing', addCornerSection);
	        mainTileArray[5][0].getContainer().addEventListener('tileIsRevealing', addCornerSection);
	        mainTileArray[5][5].getContainer().addEventListener('tileIsRevealing', addCornerSection);
	    }

	    function mainPrizePanelSetup() {

	        for (var i = 0; i < 6; i++) {
	            // setup rows
	            var rowPrizeValue = R._ticketPrizeArray[R._tokenRows[i]];
	        }
	    }

	    function cornerTileSetup() {

	        var cornerTileContainer = new createjs.Container();
	        R.CORNERTILECONTAINER = cornerTileContainer;

	        cornerTileContainer.x = 800;
	        cornerTileContainer.y = -122;

	        var cornerTileInstruction = R.makeBitmapImage('4cornerbonus', {
	            x: 0,
	            y: 0
	        });

	        var cornerX = -45;
	        var cornerY = 85;

	        for (var i = 0; i < 4; i++) {
	            if (i === 2) {
	                cornerX = -45;
	                cornerY += 90;
	            }
	            var cornerTile = new createjs.Container();
	            cornerTile.x = cornerX;
	            cornerTile.y = cornerY;
	            var cornerTileBG = R.makeBitmapImage("tilepurplesmall", {
	                x: 0,
	                y: 0
	            });
	            cornerTileBG.alpha = 0.5;
	            var cornerTileIcon = R.makeBitmapImage('corner' + (i + 1), {
	                x: 0,
	                y: 10
	            });
	            cornerTileIcon.name = "num";
	            var cornerTileIconReveal = R.makeBitmapImage("t" + cornerPanelArray[i].getTicketLabel(), {
	                x: 0,
	                y: 0
	            });
	            cornerTileIconReveal.alpha = 0;
	            cornerTileIconReveal.scaleX = 0.7;
	            cornerTileIconReveal.scaleY = 0.7;
	            var cornerTileHighlight = R.makeBitmapImage("tilehighlightsmall", {
	                x: 0,
	                y: 0
	            });
	            cornerTileHighlight.alpha = 0;

	            cornerTile.addChild(cornerTileBG, cornerTileIcon, cornerTileIconReveal, cornerTileHighlight);
	            var cornerTileFunctions = {
	                "reveal": cornerReveal,
	                "winReveal": cornerWinner
	            };
	            var cornerTileGameAsset = new GameAsset(cornerTile, {}, cornerTileFunctions);

	            // set ticketLabel to the reprisentive corner tile icon on the game
	            cornerTileGameAsset.setTicketLabel(cornerPanelArray[i].getTicketLabel());
	            cornerTileContainer.addChild(cornerTile);
	            cornerTileArray.push(cornerTileGameAsset);
	            R.CORNERTILEARRAY = cornerTileArray;

	            cornerX += 90;
	        }

	        cornerTileContainer.addChild(cornerTileInstruction);
	        R.RIGHTWINDOW.addChild(cornerTileContainer);

	        R.RIGHTWINDOW.addEventListener('cornerWinner', cornerWinner);
	    }

	    /*/
    	Setup the main prize panel and set the numbers
    /*/
	    function mainPrizePanelSetup() {
	        for (var i = 0; i < 6; i++) {
	            // setup rows
	            var rowPrizeValue = R._ticketPrizeArray[R._tokenRows[i]];
	            rowPrizeArray.push(winConvert(rowPrizeValue));
	            // setup column
	            var colPrizeValue = R._ticketPrizeArray[R._tokenCols[i]];
	            colPrizeArray.push(winConvert(colPrizeValue));

	        }
	    }

	    function mainTileLegendSetup() {

	        // loop through rows
	        for (var i = 0; i < 6; i++) {
	            // reset row
	            var legendRow = new Array();
	            // setup each tile
	            for (var j = 0; j < 6; j++) {
	                legendRow.push(mainTileArray[i][j]);
	            }
	            // prize legend asset setup
	            var prizeY = -95;
	            var prizeRowContainer = new createjs.Container(),
	                prizeRowMoneyString = formatPrize(rowPrizeArray[i]),
	                prizeRowText = R.makeBitmapImage(prizeRowMoneyString, {
	                    x: 0,
	                    y: 0
	                }),
	                prizeRowHighlight = R.makeBitmapImage('lozengevhighlight', {
	                    x: 6,
	                    y: 2
	                }),

	                prizeRowFunctions = {
	                    "winPrizeReveal": prizeWinReveal
	                };

	            prizeRowContainer.addChild(prizeRowHighlight, prizeRowText);
	            prizeRowContainer.x = 42;
	            prizeRowContainer.y = prizeY + (i * 84);
	            prizeRowHighlight.alpha = 0;

	            var prizeRowAsset = new GameAsset(prizeRowContainer, {}, prizeRowFunctions);

	            // create main legend class reference
	            legend.pushLegendRow(prizeRowAsset, legendRow);

	            R.legend = legend;

	            R.RIGHTWINDOW.addChild(prizeRowContainer);

	        }

	        // loop through cols
	        for (var k = 0; k < 6; k++) {
	            // reset row
	            var legendCol = new Array();
	            // setup each tile
	            for (var l = 0; l < 6; l++) {
	                legendCol.push(mainTileArray[l][k]);
	            }
	            // prize legend asset setup
	            var prizeX = 135;
	            var prizeColContainer = new createjs.Container(),
	                prizeColMoneyString = formatPrize(colPrizeArray[k]),
	                prizeColText = R.makeBitmapImage(prizeColMoneyString, {
	                    x: 0,
	                    y: 0
	                }),
	                prizeColHighlight = R.makeBitmapImage('lozengehhighlight', {
	                    x: 2,
	                    y: 4
	                }),

	                prizeColFunctions = {
	                    "winPrizeReveal": prizeWinReveal
	                };


	            prizeColContainer.addChild(prizeColHighlight, prizeColText);
	            prizeColContainer.x = prizeX + (k * 84);
	            prizeColContainer.y = -165;
	            prizeColHighlight.alpha = 0;

	            var prizeColAsset = new GameAsset(prizeColContainer, {}, prizeColFunctions);

	            // create main legend class reference
	            legend.pushLegendRow(prizeColAsset, legendCol);

	            R.RIGHTWINDOW.addChild(prizeColContainer);
	        }
	    }
	    // check at beginning of game for faking xml
	    function setUpFakeLegend() {

	        var gridCount = 0;

	        for (var i = 0; i < 6; i++) {
	            // reset row
	            var legendRow = new Array(),
	                prize = {};
	            prize.ticketLabel = rowPrizeArray[i];
	            prize.winReveal = false;
	            prize.getWinReveal = function () {
	                return this.winReveal;
	            }
	            // setup each tile
	            for (var j = 0; j < 6; j++) {
	                // create objects for each piece
	                var o = {};
	                o.ticketLabel = R._ticketBoardGameData[gridCount++];
	                o.isRevealed = false;
	                o.isWinRevealed = false;
	                o._isCounted = false;
	                o.getIsRevealed = function () {
	                    return this.isRevealed;
	                }
	                o.getTicketLabel = function () {
	                    return this.ticketLabel;
	                }
	                o.getWinReveal = function () {
	                    return this.isWinRevealed;
	                }
	                o.getIsCounted = function () {
	                    return this._isCounted;
	                }
	                o.setIsRevealed = function (prv) {
	                    this.isRevealed = prv;
	                }
	                o.setTicketLabel = function (prv) {
	                    this.ticketLabel = prv;
	                }
	                o.setWinReveal = function (prv) {
	                    this.isWinRevealed = prv;
	                }
	                o.setIsCounted = function (prv) {
	                    this._isCounted;
	                }


	                // set up the grid
	                simTileArray[i].push(o);
	                legendRow.push(simTileArray[i][j]);
	            }
	            simLegend.pushLegendRow(prize, legendRow);
	        }

	        simCornerPanelArray.push(simTileArray[0][0]);
	        simCornerPanelArray.push(simTileArray[0][5]);
	        simCornerPanelArray.push(simTileArray[5][0]);
	        simCornerPanelArray.push(simTileArray[5][5]);

	        for (var y = 0; y < 6; y++) {
	            // reset row
	            var legendCol = new Array();
	            // setup each tile
	            var prize = {};
	            prize.ticketLabel = colPrizeArray[y];
	            prize.winReveal = false;
	            prize.getWinReveal = function () {
	                return this.winReveal;
	            }
	            for (var z = 0; z < 6; z++) {
	                // push col
	                // get prize for that col
	                legendCol.push(simTileArray[z][y]);
	            }
	            simLegend.pushLegendRow(prize, legendCol);
	        }
	    }

	    function checkForManipulation() {

	        for (var turn in R.turnsArray) {
	            var count = simLegend.countLegend(R.turnsArray[turn]);
	            simLegend.updateLegend(R.turnsArray[turn], 1, true, count);
	        }

	        // now check for corner manipulation
	        // if all objects in simCornerArray are revealed and the prize tier is not tier 6 then error
	        var simCornerWinner = false,
	            simCornerCheck = [];

	        for (var o in simCornerPanelArray) {

	            var check = simCornerPanelArray[o].isRevealed;
	            simCornerCheck.push(check);

	        }
	        var check = identical(simCornerCheck)

	        if (check === true && parseInt(R._ticketPrizeTier) !== 9) {
	            core.IWG.ame('error', {
	                mes: ['error 3 - ticket manipulation to corner winner']
	            });
	        }
	        // if check is true, then check if in tier 6

	    }

	    function identical(array) {
	        for (var i = 0; i < array.length - 1; i++) {
	            if (array[i] != true) {
	                return false;
	            }
	        }
	        return true;
	    }

	    function endGameSetup() {

	        R.LOCK = false;
	        enableTouch();

	        var endGameBG = null,
	            prizeString = null,
	            shadow = new createjs.Shadow("#000000", 2, 2, 5),
	            endGameHighlight = null,
	            endGameText = null,
	            endGamePrizeAmount = null;

	        var endGameContainer = new createjs.Container();
	        endGameContainer.x = (core.IWG.ame('get', {
	            vars: ['gameWidth']
	        }) * 2) + 201;
	        endGameContainer.y = 270;

	        R.ENDGAME = endGameContainer;

	        if (core.IWG.ame('get', {
	            vars: ['iwgIsWager']
	        }) === true) {


	            if (R._ticketWinner === "1") {

	                prizeString = "£" + R._ticketPrizeAmount + "win";

	                endGameBG = R.makeBitmapImage('bgendgamepurple', {
	                    x: 0,
	                    y: 0
	                });
	                // end game highlight
	                endGameHighlight = R.makeBitmapImage('endgamehighlight', {
	                    x: 0,
	                    y: 0
	                });
	                endGameHighlight.alpha = 1;

	                // end game text
	                endGameText = R.makeBitmapImage('wintext', {
	                    x: 0,
	                    y: 0
	                });
	                endGameText.x = 0;
	                endGameText.y = -70;

	                // end game prize amount
	                endGamePrizeAmount = R.makeBitmapImage(prizeString, {
	                    x: -3,
	                    y: -18
	                });
	                endGameContainer.addChild(endGameBG, endGameHighlight, endGameText, endGamePrizeAmount);
	                sparkle();

	            } else {

	                endGameBG = R.makeBitmapImage('bgendgame', {
	                    x: 0,
	                    y: 0
	                });

	                // end game highlight
	                endGameHighlight = null;

	                // end game text
	                endGameText = R.makeBitmapImage('losetext', {
	                    x: 0,
	                    y: 0
	                });
	                endGameText.x = 0;
	                endGameText.y = -60;
	                // end game prize amount
	                endGamePrizeAmount = null;
	                endGameContainer.addChild(endGameBG, endGameHighlight, endGameText, endGamePrizeAmount);
	            }
	        } else {

	            endGameBG = R.makeBitmapImage('bgendgame', {
	                x: 0,
	                y: 0
	            });
	            endGameContainer.addChild(endGameBG);

	        }

	        var endGameButton = R.makeBitmapImage('buttonfinish', {
	            x: 0,
	            y: 75
	        });
	        endGameButton.cursor = "pointer";


	        endGameButton.on('click', function () {
	            iwg.IWGEM.dispatchEvent(MEvent.ENDGAME);
	        }, null, true);
	        //moveToTop(endGameButton);

	        endGameContainer.addChild(endGameButton);

	        R.ENDGAME.alpha = 0;
	        R.RIGHTWINDOW.addChild(endGameContainer);

	    }

	    function sparkle() {

	        for (var x = 0; x < endGameShine.length; x++) {

	            var xStat = endGameShine[x][0],
	                yStat = endGameShine[x][1],
	                randDelay = R.randomFromInterval(0, 1),
	                randTime = Math.random() + 0.5,

	                img = R.makeBitmapImage("shiner", {
	                    x: xStat,
	                    y: yStat
	                });
	            img.scaleX = 0;
	            img.scaleY = 0;

	            TweenMax.to(img, randTime, {
	                delay: randDelay,
	                scaleX: 1,
	                scaleY: 1,
	                repeat: -1,
	                rotation: 360,
	                yoyo: true,
	                ease: "Power4.easeInOut"
	            })

	            R.ENDGAME.addChild(img);
	        }

	    }

	    function promptMessage() {

	        if (R.TURNS < 6) {

	            if (isPromptShow === false) {

	                isPromptShow = true;

	                var text = null,
	                    bg = R.makeBitmapImage('bg_reminder', {
	                        x: 0,
	                        y: 0
	                    }, 1);

	                if (tilesLeft != NaN) {
	                    var tiles = "swipenumber" + tilesLeft;
	                }

	                if (tilesLeft > 1) {
	                    text = R.makeBitmapImage('swipe2', {
	                        x: -3,
	                        y: 0
	                    }, 1);
	                } else {
	                    text = R.makeBitmapImage('swipe1', {
	                        x: -3,
	                        y: 0
	                    }, 1);
	                }
	                var tilesNum = R.makeBitmapImage(tiles, {
	                    x: 45,
	                    y: 3
	                }, 1);

	                var messageContainer = new createjs.Container();
	                messageContainer.x = 800;
	                messageContainer.y = 180;
	                messageContainer.alpha = 0;

	                messageContainer.addChild(bg, text, tilesNum);
	                messageContainer.name = "prompt";

	                R.RIGHTWINDOW.addChild(messageContainer);

	                R.promptTimeline.to(messageContainer, 2, {
	                    alpha: 1,
	                    ease: "Power4.easeInOut"
	                });

	            }
	        }
	    }

	    function endGame(evt) {

	        top.location.href = "http://www.sideplay.com/portfolio/game/45/Money%20Lines";

	    }

	    /*/
        Method to take scroll window from one container to another, with custom
        event called when finished

        from: @object (container)
        to: @object (container)
        e: @string	(event name)
    /*/
	    function scrollWindow(from, to, e) {
	        var scroll = new TimelineLite({
	            onComplete: scrollComplete
	        })
	        var call = e;
	        scroll.to(from[0], 0.2, from[1], 0)
	            .to(to[0], 0.2, to[1], 0)


	        function scrollComplete() {
	            R.STAGE.dispatchEvent(call);
	        }
	    }

	    function revealTiles() {

	        var revealTilesTimeLine = new TimelineLite(),
	            mc = new Object(),
	            delay = 0;
	        // This checks if the game has been set to auto reveal, which blasts through the queue of
	        // icons clicked previous, otherwise it goes through them until the queue is finished then
	        // scrolls back to allow the user to select the remaining icons

	        while (R.CLICKORDER.length > 0) {

	            var turn = R.CLICKORDER.shift();
	            var boxValue = turn._ticketLabel;
	            var tween = new TweenMax(mc, 0, {
	                delay: delay,
	                onCompleteScope: this,
	                onComplete: function (boxValue) {
	                    var count = legend.countLegend(boxValue);
	                    legend.updateLegend(boxValue, 800, false, count);
	                    turnReveal++;
	                    R.TURNSLEFT--;
	                },
	                onCompleteParams: [boxValue]
	            });
	            delay += 4;

	        }
	    }

	    function promptTiles() {

	        toPrompt = [];
	        if (R.TURNS < 6) {
	            for (var x = 0; x < R.TILES.length; x++) {
	                if (R.TILES[x].isRevealed == false) {
	                    toPrompt.push(R.TILES[x]);
	                }
	            }
	            for (var i = 0; i < toPrompt.length; i++) {
	                R.promptAnimation.to(toPrompt, 0.5, {
	                    delay: 2.5,
	                    scaleY: 1.1,
	                    scaleX: 1.1,
	                    ease: "easeInOut"
	                })
	                    .to(toPrompt, 0.5, {
	                        scaleY: 1,
	                        scaleX: 1,
	                        ease: "easeInOut"
	                    })

	            }
	        }
	    }

	    function stopPrompt() {

	        for (var tile in R.TILES) {
	            R.TILES[tile].scaleY = R.TILES[tile].scaleX = 1;
	        }

	        R.promptAnimation.clear();
	    }

	    /*/
     * Helper Method to convert numbers into defined strings
     *
    /*/
	    function winConvert(winAmountFormated) {
	        var newWinFormat;

	        switch (winAmountFormated) {
	        case 50000:
	            newWinFormat = "50,000";
	            break;
	        case 5000:
	            newWinFormat = "5,000";
	            break;
	        case 1000:
	            newWinFormat = "1,000";
	            break;
	        default:
	            newWinFormat = winAmountFormated;
	        }
	        return newWinFormat;
	    }

	    /*/
     *	format method for masterSS retiveal
    /*/
	    function formatPrize(winAmountFormated) {
	        var newWinFormat;
	        var strArray = winAmountFormated.split(".");
	        newWinFormat = "£" + strArray[0];

	        return newWinFormat;
	    }

	    function makePrize(winAmount) {
	        var prizeContainer = new createjs.Container(),
	            prizeAmount = R.makeBitmapImage(winAmount, {
	                x: 0,
	                y: 0
	            });

	        prizeContainer.addChild(prizeAmount);

	        return prizeContainer;
	    }

	    function tickHandler() {
	        R.STAGE.update();
	    }

	    function checkEndGame() {
	        if (!R.HASFINISHED) {
	            R.HASFINISHED = true;
	            if (R.GOES >= 5) {
	                var buttons = R.LEFTWINDOWRIGHTPANE.getChildByName("container");
	                R.ENDGAME.alpha = 1;
	                var endGameMessage = function () {
	                    tileEnabled = false;
	                    var endGameTimeLine = new TimelineLite();
	                    endGameTimeLine.to(R.ENDGAME, 0.5, {
	                        delay: 7,
	                        onComplete: function () {
	                            R.LOCK = false;
	                        },
	                        x: 800,
	                        ease: "linear"
	                    }, "endGame")
	                        .to(R.LOGO, 0.5, {
	                            delay: 5,
	                            alpha: 0,
	                            ease: "linear"
	                        }, "endGame")
	                        .call(function () {
	                           createjs.Sound.play("endWin");
	                        });
	                }
	                // bank from ticket
	                core.IWG.ame('bank', {
	                    deposit: [R._ticketPrizeAmount],
	                    log: true
	                });

	                if (core.IWG.ame('bank', {
	                    balance: 'finalAmount',
	                    raw: true,
	                    log: true
	                }) > 0) {
	                    var bankAmount = "£" + core.IWG.ame('bank', {
	                        balance: 'finalAmount',
	                        raw: true,
	                        log: true
	                    });
	                    endGameMessage();
	                } else {
	                    endGameMessage();
	                }

	            }
	        }
	    }

	    function addCornerSection(evt) {

	        var target = evt.target,
	            index = target.cb;

	        if (cornerTileArray[index].getIsRevealed() === false) {
	            cornerTileArray[index].setIsRevealed(true);

	            cornerTileArray[index].reveal("reveal", cornerTileArray[index], 0);
	            R.CORNERWINS++;
	        }
	    }
	    /*
        -----------------------------
            MAIN TILE GAME REVEAL
        -----------------------------
        */
	    function tileGameReveal() {

	        R.TILESTURNED++;

	        // push gameAsset to an array
	        // create a timeline
	        var ga = this,
	            obj = this.getContainer(),
	            ticket = this.getTicketLabel(),
	            c = legend.countLegend(ticket);

	        revealTilesArray.push(obj);
	        moveToTop(obj);
	        MEvent.REVEALING.ga = ga;
	        MEvent.REVEALING.obj = obj
	        MEvent.REVEALING.c = c;
	        MEvent.REVEALING.ticket = ticket;

	        iwg.IWGEM.dispatchEvent(MEvent.REVEALING);

	    }

	    /*/
            Method to reveal main game tiles
        /*/
	    function tileGameWinReveal() {

	        this.setIsRevealed(true);

	        var highlight = this.getContainer().children[2],
	            tileHighlight = new TimelineLite();

	        highlight.scaleX = 1.05;
	        highlight.scaleY = 1.05;

	        tileHighlight.from(highlight, 0.5, {
	            alpha: 1,
	            delay: 1
	        })
	            .to(highlight, 0.8, {
	                alpha: 0
	            })
	            .from(highlight, 0.5, {
	                alpha: 1
	            })
	            .to(highlight, 0.8, {
	                alpha: 0
	            })
	            .from(highlight, 0.5, {
	                alpha: 1
	            });
	    }

	    /*/
        Method to reveal main game tiles
    /*/
	    var hasWon = false;

	    function prizeWinReveal() {

	        var highlight = this.getContainer().children[0],
	            text = this.getContainer().children[1],
	            current = text.currentAnimation,
	            string = text.currentAnimation + "white",
	            winHighlight = new TimelineLite();

	        winHighlight.call(function () {
	            text.gotoAndStop(string)
	        })
	            .from(highlight, 0.5, {
	                alpha: 1
	            })
	            .call(function () {
	                text.gotoAndStop(current)
	            })
	            .to(highlight, 0.8, {
	                alpha: 0
	            })
	            .call(function () {
	                text.gotoAndStop(string)
	            })
	            .from(highlight, 0.5, {
	                alpha: 1
	            })
	            .call(function () {
	                text.gotoAndStop(current)
	            })
	            .to(highlight, 0.8, {
	                alpha: 0
	            })
	            .call(function () {
	                text.gotoAndStop(string)
	            })
	            .from(highlight, 0.5, {
	                alpha: 1
	            });

	        if (!R.pause && hasWon === false) {
	            hasWon = true;
                createjs.Sound.play("cornerWin");
	        }

	        iwg.IWGEM.dispatchEvent(MEvent.SHOWENDGAMEMESSAGE);

	    }

	    /*/
            Method for corner reveals
        /*/
	    function cornerReveal() {
	        // get tile asset
	        var obj = this.getContainer(),
	            // put layers needed into variables
	            number = obj.children[1],
	            revealIcon = obj.children[2],
	            // create timeline
	            cornerRevealTimeLine = new TimelineLite({
	                delay: 0.3
	            });
	        revealIcon.scaleY = 0;
	        revealIcon.alpha = 0;

	        cornerRevealTimeLine.call(function () {
	            obj.children[0].gotoAndPlay("tileturnsmallreverse")
	        }, 0)
	            .call(function () {
                    createjs.Sound.play("cornerAdd");
	            })
	            .to(number, 0.5, {
	                scaleY: 0,
	                ease: "Power4.easeInOut"
	            }, 0)
	            .to(obj.children[0], 0.1, {
	                scaleY: 0.95,
	                scaleX: 0.95,
	                ease: "Power4.easeInOut"
	            }, 0)
	            .to(obj.children[0], 0.4, {
	                alpha: 1
	            }, "flipside")
	            .to(revealIcon, 0.4, {
	                alpha: 1,
	                scaleY: 0.7,
	                ease: "Power4.easeInOut"
	            }, "flipside");

	        obj.children[0].addEventListener("animationend", function () {
	            obj.children[0].stop();
	        });

	        R.cornerRevealTimeLine.add(cornerRevealTimeLine);

	    }

	    /*/
        Method for corner winner
    /*/
	    function cornerWinner() {

	        for (var tile in cornerTileArray) {
	            var that = cornerTileArray[tile],
	                highlight = that.getContainer().children[3],
	                cornerHighlightTL = new TimelineLite();
	            cornerHighlightTL.from(highlight, 0.5, {
	                alpha: 1
	            })
	                .to(highlight, 0.8, {
	                    alpha: 0
	                })
	                .from(highlight, 0.5, {
	                    alpha: 1
	                })
	                .to(highlight, 0.8, {
	                    alpha: 0
	                })
	                .from(highlight, 0.5, {
	                    alpha: 1
	                });
	        }
	        if (!R.pause) {
                createjs.Sound.play("cornerWin");
	        }

	        for (var tile in cornerPanelArray) {
	            var that = cornerPanelArray[tile],
	                highlight = that.getContainer().children[2],
	                cornerHighlightTL = new TimelineLite();

	            cornerHighlightTL.from(highlight, 0.5, {
	                alpha: 1
	            })
	                .to(highlight, 0.8, {
	                    alpha: 0
	                })
	                .from(highlight, 0.5, {
	                    alpha: 1
	                })
	                .to(highlight, 0.8, {
	                    alpha: 0
	                })
	                .from(highlight, 0.5, {
	                    alpha: 1
	                });
	        }

	        iwg.IWGEM.dispatchEvent(MEvent.SHOWENDGAMEMESSAGE);
	    }

	    /*/
		  Add Turn
	    /*/
	    function addTurn() {
	        R.LOCK = true;
	        R.TILESTURNED = 0;
	        if (R.GOES === 5) {
	            if (!R.simGame) {
	                iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
	            }
	        } else {
	            R.GOES++;
	            R.TURNTIMELINE.clear();
	        }
	    }
	    /*/
        Method to take obj and change mouse cursor to pointer
    /*/
	    function pointer(evt) {
	        document.body.style.cursor = "pointer";
	    }

	    /*/
        Method to take obj and change mouse cursor to default
    /*/
	    function pointerOut(evt) {
	        document.body.style.cursor = "default";
	    }

	    function moveLeftComplete() {
	        // scroll has finished
	        if (sideShow === "right") {
	            sideShow = "left";
	            cont = true;
	        }
	        // moved outside to restart prompts on a left swipe
	        setTimeout(function () {
	            promptTiles();
	        }, 3500);
	    }

	    /*/
        Method to move object index to top
    /*/
	    function moveToTop(t) {
	        t.parent.setChildIndex(t, t.parent.getNumChildren() - 1);
	    }

	    function moveRightComplete() {
	        // scroll has finished
	        stopPrompt();
	        revealTiles();
	        if (R.swipePrompt != null) {
	            R.swipePrompt.pause();
	            R.swipePrompt.seek(0);
	        }
	    }

	    function onThrottle() {}

	    function legendEndTurn() {
	        if (R.TURNSLEFT === 0) {
	            if (R.GOES < 6) {
	                setTimeout(function () {
	                    promptMessage();
	                    R.LOCK = false;
	                }, 1000);
	            }
	        }
	    }

	    function swipePrompt() {

	        var arrow_inner = new createjs.Shape();
	        arrow_inner.graphics.f().s("rgba(255,255,255,0.8)").ss(4, 2, 1).p("AApANIhRDdAApgMIhRjd");
	        arrow_inner.x = 930;
	        arrow_inner.y = 250;
	        arrow_inner.alpha = 0;

	        R.swipePrompt = TweenMax.to(arrow_inner, 2, {
	            alpha: 1,
	            repeat: -1,
	            yoyo: true,
	            ease: "linear"
	        });

	        R.LEFTWINDOW.addChild(arrow_inner);

	    }

	    function toggleSound(ev) {

	        var container = ev.that;
	        container.removeAllChildren();
	        if (R.PLAYSOUND === true) {
                R.PLAYSOUND = false;
	            createjs.Sound.setMute(true);
	            var bmp = new createjs.Bitmap(images.audioOff);
	            bmp.scaleX = bmp.scaleY = 0.75;

	            container.addChild(bmp);
	        } else {
                R.PLAYSOUND = true;
	            createjs.Sound.setMute(false);
	            var bmp = new createjs.Bitmap(images.audioOn);
	            bmp.scaleX = bmp.scaleY = 0.75;
	            container.addChild(bmp);
	        }
	    }
	    function revealing(ev) {

	        var ga = ev.ga,
	            t = ev.obj,
	            tileBackground = t.children[0],
	            tileIcon = t.children[1],
	            c = ev.c,
	            ticket = ev.ticket;

	        var tl = new TimelineLite({
	            paused: true
	        });
            // timeline bug fix
            tl.call(function(){});

	        tl.call(function () {
	            tileBackground.gotoAndPlay('tileturnsmall');
	            createjs.Sound.play("knockWoodShort");

	        }).add(TweenLite.to(tileIcon, 0.4, {
	            scaleY: 0,
	            scaleX: 0.7
	        })).add(TweenLite.to(tileIcon, 0.4, {
	            scaleY: 0.7,
	            scaleX: 0.7
	        })).call(function () {
                t.dispatchEvent('tileIsRevealing');
	            t.isRevealed = true;
	            tileBackground.removeAllEventListeners();
                var failSafe = true;
	            tileBackground.addEventListener("animationend", function () {
                    failSafe = false;
                    tileBackground.gotoAndStop("tileturnsmallpurple");
	            });

	            nummmm++;
	            tileEnabled = true;
	            MEvent.TILEREVEALED.numRevealed = nummmm;
	            MEvent.TILEREVEALED.countTotal = c;
	            MEvent.TILEREVEALED.ticketLabel = ticket;
	            iwg.IWGEM.dispatchEvent(MEvent.TILEREVEALED);
	            if (!ga.endOfReveal) {
	                ga.endOfReveal = true;
	            }
                if (failSafe){
                    tileBackground.gotoAndStop("tileturnsmallpurple");
                }
	        });

	        tl.seek(0);
	        tl.play();
	        R.revealTimeline.add(tl);
	    }


	    function tileRevealed(ev) {

	        var numRevealed = ev.numRevealed,
	            countTotal = ev.countTotal,
	            ticketLabel = ev.ticketLabel;


	        if (numRevealed === countTotal) {
	            nummmm = 0;
	        }

	        legend.checkRowWin(ticketLabel, 900);
	    }

	    function winReavel(ev) {
	        // I want to play a little game with you!
	        var endRevealsCount = 0;
	        for (var tile in R.winRevealAssets) {

	            var legendItem = R.winRevealAssets[tile];
	            if (legendItem.endOfReveal) {
	                endRevealsCount++
	            }
	            if (endRevealsCount >= 6) {
	                for (var t in R.winRevealAssets) {
	                    R.winRevealAssets[t].reveal("winReveal", R.winRevealAssets[t], 100);
	                    var prizeItem = R.prizeItemArray[0];
	                    prizeItem.reveal("winPrizeReveal", prizeItem, 100);
	                }
	            }
	        }
	    }
        function refreshStaticStages(e) {
            setTimeout(R.STAGE.update(), 200)
        }

	    function cornerWin(ev) {

	    }

	    function disableTouch() {
	        createjs.Touch.disable(R.STAGE);
	    }

	    function enableTouch() {
	        createjs.Touch.enable(R.STAGE);
	    }

	    function shuffle(o) { //v1.0
	        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	        return o;
	    };

	    IWGInit = function () {
	        _moneyLines = new MoneyLines();
	    }
	    //namespace path
	    iwg._class("core.IWGInit", IWGInit);
	    iwg._class("MoneyLines", MoneyLines);
	}(window));
