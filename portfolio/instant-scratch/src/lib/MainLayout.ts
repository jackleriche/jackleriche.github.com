/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {

    var CAMELOT: any        = com.camelot,
        CORE                = CAMELOT.core,
        IWG                 = CAMELOT.iwg,
        GLOBAL              = IWG.Global,
        GAMEOBJECT          = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS        = IWG.SpriteSheets,
        ANIMATION           = IWG.Animation,
        SOUND               = IWG.Sound,
        SCENE               = IWG.Scene,
        SCALE               = IWG.Scale,
        PAUSE               = IWG.Pause,
        SPLASH              = IWG.Splash,
        MATCH               = IWG.Match,
        SCRATCH             = IWG.Scratch,
        TICKET              = IWG.Ticket,
		ENDGAME             = IWG.EndGame,
        HELPER              = IWG.Helper;
        

    export class MainLayout {
        
        private _match: Match               = new MATCH('match', 'match3');
        private _game: string               = null;
        private _icons: Array<GameObject>   = [];
        
        constructor() {
            this._subscribe();
            this._init();
            
            this._setupBackground();
            this._setupSplash();
            
        }
        
        private _subscribe():void {
            IWG.IWGEM.on('mainGameIntro',   this._mainGameSetup.bind(this) );
            IWG.IWGEM.on('matchFinished',   this._checkFinished.bind(this) );
            IWG.IWGEM.on('loadGame',        this._loadGame.bind(this) );
            IWG.IWGEM.on('scratchComplete', this._scratchComplete.bind(this));
            IWG.IWGEM.on('cardComplete',    this._cardFlipComplete.bind(this));
            
            IWG.IWGEM.on(CORE.IWGEVENT.SUBLOADER_COMPLETE, this._subloaderComplete.bind(this) );
            
        }
        
        private _unsubscribe():void {
            IWG.IWGEM.off('mainGameIntro');
        }
        
        /*
         *  name:           _init
         *  description:    initialise InstantScratch class, setup SCALE, PAUSE, SOUND
         *  params:         null
         *  returns:        null
         */
        private _init(): void {
            
            // call scale class
            var scale = new SCALE(document.getElementById('IWGholder'));
            
            // hack for subloading bar
            var exsisting_el = document.getElementById("scaleDiv");
            var _loadBar_div = document.createElement("div");
            _loadBar_div.id  = "loadBar";
            
            document.getElementById("IWGholder").insertBefore(_loadBar_div, exsisting_el);
            
            // setup sound class
            var sound = new SOUND();
            sound.setDimensions({
                w: 50,
                h: 50
            });
            sound.setZindex("11");
            sound.setScale(1, 1);
            sound.setPosition({ x: 880, y: 42 });
            
            
        } // end _init()
        
        /**
         *  name:           _setupBackground
         *  description:    sets up the background
         *  params:         null
         *  returns:        null
         */
        private _setupBackground(): void { 
           
            var spritesheet   = SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS")
           
            // setup background
			var splashBg = new GAMEOBJECT( 'splashBg', { w: 1300, h: 770 }, 0 );
            splashBg.addBitmap({
				name: "splashBg",
				pos: {
					x: 0,
					y: 0
				},
				frame: "bg_splash",
				spriteSheet: spritesheet,
				doReg: {
					custom: {
                        x: 0,
                        y: 0
                    }
				}
			});
            splashBg.setAlpha(1);
            splashBg.setScale(1.1, 1.1);
            splashBg.setPosition({
                x: -100,
                y: -100
            });
            
        }
        
        
        /*
         *  name:           _setupSplash
         *  description:    setup splash screen
         *  params:         null
         *  returns:        null
         */
        private _setupSplash(): void {
            
            var splash = new SPLASH("splash");
            splash.setDimensions({
                w: 960,
                h: 640
            });
            splash.setZindex("6");
           
        } // end _setupSplash()
        
        /*
         *  name:           _mainGameSetup
         *  description:    setup mianGame
         *  params:         null
         *  returns:        null
         */
        private _mainGameSetup(): void {
            
            var spritesheet   = SPRITESHEETS.getInstance().getSpriteSheet("master-"+this._game+"-SS");
            var animationSS   = SPRITESHEETS.getInstance().getSpriteSheet("master-"+this._game+"splash-SS");

            var mainGameScene = new SCENE('mainGame');
            mainGameScene.setDimensions({
                w: 960,
                h: 640
            });
            mainGameScene.setZindex(10);
            mainGameScene.setAlpha(0);
            
            var animationScene = new SCENE('animationScene');
            animationScene.setDimensions({
                w: 960,
                h: 640
            });
            animationScene.setZindex(9);
            animationScene.setAlpha(1);
            
            // set the instant win symbol
            this._match.setInstantWin('coin');
            
            // add background 
            var gameBG = new GAMEOBJECT('bg_game', { w: 960, h: 640 }, 1, mainGameScene);
            gameBG.addBitmap({ 
                name: "bg_game",
                pos: {
                    x: 480,
                    y: 320
                },
                frame: "bg_game",
                doReg: {
                    center: true
                },
                spriteSheet: spritesheet 
            }); 
            gameBG.setPosition({
                x: 0,
                y: 0              
            });
            
            // game box reminder
            var boxReminder = new CLICKABLEGAMEOBJECT('boxReminder', { w: 574, h: 504 }, 1, mainGameScene);
            boxReminder.addBitmap({ 
                name: "boxReminder",
                pos: {
                    x: 287,
                    y: 252
                },
                frame: "panel_glow",
                alpha: 0,
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS")
            }); 
            boxReminder.setPosition({
                x: 386.5,
                y: 71             
            }); 
            boxReminder.setReminder(true, 'boxReminder');
            boxReminder.animate('reminder1');
            
            // add background 
            var gameScale = new CLICKABLEGAMEOBJECT('bg_scale', { w: 960, h: 640 }, 1, mainGameScene);
            gameScale.setAlpha(0.01);
            gameScale.setEnabled(false);
            gameScale.setZindex('11');
            
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#fff").drawRect(0, 0, 960, 640);
            gameScale.getStage().addChild(shape);
            gameScale.getStage().update();
            
            
            // add animation
            var splashanim = new GAMEOBJECT('splashanim', { w: 960, h: 640 }, 1, animationScene);
            splashanim.addBitmap({ 
                name: "splashanim",
                pos: {
                    x: 0,
                    y: 0
                },
                frame: animationSS._animations[0],
                scale: {
                    x: 2,
                    y: 2
                },
                doReg: {
                    custom: {
                        x: 0,
                        y: 0 
                    }
                },
                spriteSheet: animationSS
            }); 
            splashanim.setPosition({
                x: 0,
                y: 0              
            });
            splashanim.addAnimation('splashAnim');
            splashanim.setAnimation('splashAnim', 'splashAnim', 1, 4, mainGameScene);
            
            // scratch panel
            var scratch = new SCRATCH('scratchPad');
            scratch.setParent(mainGameScene);
            scratch.setZindex( "3" );
            scratch.setDimensions({
                w: 508,
                h: 334
            });
            scratch.setPosition({
                x: 419,
                y: 103
            });
            scratch.setPercentageComplete( 75 );
            
            scratch.setFoilPeel( true );
            scratch.setImage( "notes", "master-"+this._game+"-SS" );
            
            scratch.setup();
            
            // set positions for the symbols
            var position = [
                [430, 100], [580, 100], [730, 100],
                [430, 210], [580, 210], [730, 210],
                [430, 320], [580, 320], [730, 320],
            ];

            for ( var i = 0; i < position.length; i++ ) {
                
                var prizePos = position[i];
                var prizes   = TICKET.getInstance().getPrizeList()[TICKET.getInstance().getTurnPrize()[i]];
                var frames   = prizes;
                
                // add prize amount 
                var prizeAmount = new GAMEOBJECT('prizeAmount' + i, { w: 182, h: 130 }, 1, mainGameScene);                
                this._icons.push(prizeAmount);
                prizeAmount.active = false;

                prizeAmount.setPrizeValue( prizes );
                
                // set the frames of the bitmaps
                if (TICKET.getInstance().getTurn(i).iW !== undefined) {
                    frames = 'coin_outline';
                    prizes = 'coin';
                    prizeAmount.setPrizeValue( 5 );
                } else {
                    frames = 'p' + prizes;
                }

                prizeAmount.addBitmap({ 
                    name: "winHighlight",
                    pos: {
                        x: 91,
                        y: 65
                    },
                    frame: "pen",
                    alpha: 0,
                    doReg: {
                        center: true
                    },
                    spriteSheet: spritesheet
                }); 
                prizeAmount.addBitmap({ 
                    name: "winHighlight_white",
                    pos: {
                        x: 96,
                        y: 65
                    },
                    frame: "highlight_white",
                    alpha: 0,
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS")
                }); 
                prizeAmount.addBitmap({ 
                    name: "prize",
                    pos: {
                        x: 91,
                        y: 65
                    },
                    frame: frames,
                    alpha: 1,
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS"),
                }); 
                if (frames === 'coin_outline') {
                    prizeAmount.addBitmap({ 
                        name: "coin",
                        pos: {
                            x: 93.5,
                            y: 57
                            
                        },
                        frame: "Coin",
                        alpha: 0,
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS"),
                    });     
                }
                
                // set position
                prizeAmount.setPosition({
                    x: prizePos[0],
                    y: prizePos[1]
                });

                // setup match playable and instant symbols
                prizeAmount.setTicketLabel(prizes);
                this._match.addSymbol(prizeAmount, 'playable')
                
                // setup animations
                prizeAmount.setAnimation('winReveal', 'prizeAmountWin', 0.2, 4);
                
            } // end for loop
            
            this._cardFlip();              

        } // end _mainGameSetup()
        
        /*
         *  name:           _cardFlip
         *  description:    animate the card flip animation
         *  params:         null
         *  returns:        null
         */
        private _cardFlip(): void {
            var preview = HELPER.getGameObject('splashanim');
            preview.animate('splashAnim');

        }
        
        /*
         *  name:           _cardFlip
         *  description:    animate the card flip animation
         *  params:         null
         *  returns:        null
         */
        private _cardFlipComplete(): void {
            HELPER.getScene('animationScene').destroy();
            for (var i = 0; i < 6; i++) {
                HELPER.getGameObject('gameClick' + i).destroy();
            }
        }
        
        /*
         *  name:           _setupEndgame
         *  description:    setup end screen
         *  params:         null
         *  returns:        null
         */
        private _setupEndgame(): void {
            
            var endGame = new ENDGAME("endGame");
            endGame.setDimensions({
                w: 275,
                h: 260
            });
            endGame.setPosition({
                x: 140,
                y: 340
            });
            endGame.setZindex("1");
            
        } // end _setupEndGame()
        
        /**
         *  name:           _checkFinished();
         *  description:    checks all matches have been finished
         *  params:         null;
         *  returns:        null;
         */
        private _checkFinished(): Boolean {
            // remove box reminder
            HELPER.getGameObject('boxReminder').destroy();
            
            // delay the end game creation to allow for animation and bank
            if ( TICKET.getInstance().getOutcome().amount > 0 ) {
                
                TweenMax.delayedCall( 3, () => {
                    this._setupEndgame();  
                    IWG.IWGEM.trigger('showEndGame');  
                });
                
                return true;
                
            } 
                
            this._setupEndgame();  
            IWG.IWGEM.trigger('showEndGame');
            
            return false;  
            
        } // end _checkFinished();
        
        /**
         *  name:           loadGame
         *  description:    load the correct animation in, and collect the correct assests
         *  params:         game: string
         *  return:         null
         */
        private _loadGame(game): void { 
            
            // gather the correct resources
            var subManifest = [];
                        
            // json
            subManifest.push({ "src": "src/imports/img/master-"+game+"-SS.png", "id": "master-"+game+"-SS" });
            subManifest.push({ "src": "src/imports/json/master-"+game+"-SS.json", "id": "master-"+game+"-SS-data", type: createjs.LoadQueue.JSON });
            
            subManifest.push({ "src": "src/imports/img/master-"+game+"splash-SS.png", "id": "master-"+game+"splash-SS" });
            subManifest.push({ "src": "src/imports/json/master-"+game+"splash-SS.json", "id": "master-"+game+"splash-SS-data", type: createjs.LoadQueue.JSON });

            // set game 
            this._game = game;

            // subload that in
            CORE.IWG.ame('subloader', subManifest );
            
        } // end _loadGame()
        
        
        /**
         *  name:           _subloaderComplete
         *  description:    subloader complete event
         *  params:         null
         *  return:         null
         */
        private _subloaderComplete():void {

            // create spriteSheet
            // add game spritesheet to SPRITESHEETS
            var spriteSheetData = CORE.iwgLoadQ.getResult("master-"+this._game+"-SS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("master-"+this._game+"-SS", spriteSheetData);
            
            var splashAnimation = CORE.iwgLoadQ.getResult("master-"+this._game+"splash-SS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("master-"+this._game+"splash-SS", splashAnimation);
            
            // remove the event listener
            IWG.IWGEM.off( CORE.IWGEVENT.SUBLOADER_COMPLETE, this._loadGame );
            this._mainGameSetup();
            
        } // end _subloaderComplete()
        
        /**
         *  name:           _scratchComplete
         *  description:    calls checkMatch on all gameObjects
         *  params:         null
         *  returns:        null
         */
        private _scratchComplete(): void {
            
            for( var i = 0; i < this._icons.length; i++ ){
                var icon = this._icons[i];
                IWG.IWGEM.trigger('decClickCount', [this._match.getName(), icon ])    
            }
            
        } // end _scratchComplete()
        
    }
}