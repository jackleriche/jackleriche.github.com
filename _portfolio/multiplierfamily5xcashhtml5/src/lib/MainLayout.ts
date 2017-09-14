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
        TICKET              = IWG.Ticket,
		ENDGAME             = IWG.EndGame,
        HELPER              = IWG.Helper;
        

    export class MainLayout {
        
        private _match:Match    = new MATCH('match');
        
        constructor() {
            this._subscribe();
            this._init();
            
            this._setupSplash();
           
            this._setupEndgame();
        }
        
        private _subscribe():void {
            IWG.IWGEM.on('mainGameIntro', this._mainGameSetup.bind(this) );
            IWG.IWGEM.on('matchFinished', this._checkFinished.bind(this) );
        }
        private _unsubscribe():void {
            IWG.IWGEM.off('mainGameIntro');
        }
        
        /*
         *  name:           _init
         *  description:    initialise 5xCash class, setup SCALE, PAUSE, SOUND and background
         *  params:         null
         *  returns:        null
         */
        private _init(): void {
            
            // call scale class
            var scale = new SCALE(document.getElementById('IWGholder'));
            
            // setup Pause class
            // var pause = new PAUSE();
            // pause.setPosition({
            //     x: -200,
            //     y: -80 
            // });
            
            // setup sound class
            var sound = new SOUND();
            sound.setDimensions({
                w: 50,
                h: 50
            }); 
            sound.setZindex("11");
            sound.setScale(1, 1);
            sound.setPosition({ x: 865, y: 65 });
            
            // setup background
            var background = new GAMEOBJECT('mainBG', { w: 1300, h: 770});
            background.addBitmap({ 
                name: "bg",
                pos: {
                    x: 0,
                    y: 0
                },
                frame: "bg_game",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS") 
            }); 
            // background.setPosition({
            //     x: -170,
            //     y: -100                
            // });
            background.setScale(1.2, 1.2);
            
            // add match instant Win symbols
            this._match.setInstantWin(41);
            
        } // end _init()
        
        
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
            
            var mainGameScene = new SCENE('mainGame');
            mainGameScene.setDimensions({
                w: 960,
                h: 640
            });
            mainGameScene.setZindex(10);
            mainGameScene.setAlpha(0);
            
            // add smaller logo 
            var logoGame = new GAMEOBJECT('logoGame', { w: 900, h: 400}, 1, mainGameScene);
            logoGame.addBitmap({ 
                name: "logoGame",
                pos: {
                    x: 450,
                    y: 200
                },
                frame: "logo_game",
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS") 
            }); 
            logoGame.setPosition({
                x: 480 - 450,
                y: -87                
            });
            
            // sort out shiners
            var shinerData = [
                [130, 30],
                [122, 93],
                [120, 150],
                [775, 35],
                [830, 110],              
                [818, 158] 
            ]
            
            for( var i = 0; i < shinerData.length; i++ ){
                
                var shinerGO = new GAMEOBJECT("shinerBrand" + i, { w: 54, h: 54 }, 1, mainGameScene);
                shinerGO.addBitmap({
                    name: "shiner" + i,
                    pos: {
                        x: 27,
                        y: 27
                    },
                    frame: "shiner",
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                    doReg: {
                        center: true
                    }
                });
                shinerGO.setAlpha(0);
                shinerGO.setPosition({
                    x: shinerData[i][0],
                    y: shinerData[i][1]
                });
                shinerGO.setScale(0.7, 0.7);
                shinerGO.addAnimation('spin');
                shinerGO.setAnimation('spin', 'spin');
                
                shinerGO.animate('spin');
                
            };
            
            
            // setup panel
            var panel = new GAMEOBJECT('panel', { w: 890, h: 462 }, 1, mainGameScene);
            panel.addBitmap({ 
                name: "panel",
                pos: {
                    x: 445,
                    y: 231
                },
                frame: "panel",
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS") 
            }); 
            panel.addBitmap({ 
                name: "divider",
                pos: {
                    x: 222,
                    y: 231
                },
                frame: "panel_div",
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS") 
            }); 
            panel.setPosition({
                x: 480 - 445,
                y: 150                
            });

            
            var winningSymbolString = new GAMEOBJECT('winningNumbers', {w: 98, h: 42}, 1, mainGameScene)
            winningSymbolString.addBitmap({
                name: "icon",
                pos: {
                    x: 49,
                    y: 21
                },
                frame: "winningnumbers",
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")  
            });
            winningSymbolString.setPosition({
                x: 480 - 370,
                y: 270 
            });
            
            // setup the winning icons
            var winningData = [
                [85, 319] 
            ];
            
            for ( var i = 0; i < winningData.length; i++ ) {
                
                var dataSet = winningData[i];
                
                var winningGO = new CLICKABLEGAMEOBJECT('winningSymbol' + i, {w: 180, h: 140}, 1, mainGameScene);
                winningGO.addBitmap({
                    
                    name: "highlight",
                    pos: {
                        x: 65,
                        y: 70
                    },
                    frame: "highlight",
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                    alpha: 0
                });
                winningGO.addBitmap({
                    
                    name: "icon",
                    pos: {
                        x: 95,
                        y: 70
                    },
                    frame: "Pound",
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("poundSS")                    
                    
                });
                winningGO.addBitmap({
                    
                    name: "symbol_number",
                    pos: {
                        x: 65,
                        y: 70
                    },
                    frame: "n" + TICKET.getInstance().getWinningSymbols()[i],
                    doReg: {
                        center: true
                    },
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")                    
                    
                });
                winningGO.addBitmap({
                    
                    name: "symbol_highlight",
                    pos: {
                        x: 65,
                        y: 70
                    },
                    frame: "nw" + TICKET.getInstance().getWinningSymbols()[i],
                    doReg: {
                        center: true
                    },
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")                    
                    
                });
                winningGO.setPosition({
                    x: dataSet[0],
                    y: dataSet[1]
                });
                winningGO.setTicketLabel(TICKET.getInstance().getWinningSymbols()[i]);
                
                // setup animation
                winningGO.setEnabled(true);
                winningGO.setReminder(true, 'poundReminder');
                
                winningGO.setAnimation('reveal', 'symbolReveal', 0.2, 0.5);
                winningGO.setAnimation('winReveal', 'symbolWinReveal', 0.5, 1);
                winningGO.animate('reminder1');
                
                // setup action
                winningGO.setAction('click', function(winningGO){
                    if ( !winningGO.getRevealed() ){
                        winningGO.setEnabled(false);
                        winningGO.setScale(1,1);
                        winningGO.killReminder();
                        winningGO.reveal();
                        IWG.IWGEM.trigger('decClickCount', ['match', winningGO ]);
                        createjs.Sound.play('moneyBag');
                     }
                     
                }.bind(null, winningGO));
                
                this._match.addSymbol(winningGO, "winning");
                
            } // end for loop
            
            var yourNumbersString = new GAMEOBJECT('yourNumbers', {w: 162, h: 24}, 1, mainGameScene)
            yourNumbersString.addBitmap({
                name: "icon",
                pos: {
                    x: 81,
                    y: 12
                },
                frame: "yournumbers",
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")  
            });
            yourNumbersString.setPosition({
                x: 480 - 10,
                y: 275 
            });
            
            // setup your symbols
            var yourData:any = [
                // first row
                [240, 290],
                [400, 290],
                [560, 290],
                [720, 290],

            ];
            
            for ( var i = 0; i < yourData.length; i++ ) {
                
                var dataSet: Array<number>  = yourData[i];    
                var turn                    = TICKET.getInstance().getTurnPrize()[i];           
                var yourSymbolGO            = new CLICKABLEGAMEOBJECT('yourSymbol' + i, {w: 200, h: 200}, 1, mainGameScene);
                
                
                yourSymbolGO.addBitmap({
                    
                    name: "stars",
                    pos: {
                        x: 100,
                        y: 100
                    },
                    frame: "Trail",
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("starSS")                    
                    
                });
                
                var frame   = "n" + TICKET.getInstance().getSymbolNumber()[i];
                var ss      = SPRITESHEETS.getInstance().getSpriteSheet("masterSS");
                
                if (frame === "n41"){
                    frame   = "Star5";
                    ss      = SPRITESHEETS.getInstance().getSpriteSheet("star5SS");
                }
                
                yourSymbolGO.addBitmap({
                    
                    name: "highlight",
                    pos: {
                        x: 100,
                        y: 100
                    },
                    frame: "highlight",
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                    alpha: 0
                });
                
                yourSymbolGO.addBitmap({
                    
                    name: "symbol_number",
                    pos: {
                        x: 100,
                        y: 100
                    },
                    frame: frame,
                    doReg: {
                        center: true
                    },
                    scale: {
                        x: 0.5,
                        y: 0.5
                    },
                    spriteSheet: ss                     
                    
                });
                
                yourSymbolGO.addBitmap({
                    
                    name: "icon",
                    pos: {
                        x: 100,
                        y: 100
                    },
                    frame: "Bag",
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("bagSS")                    
                    
                });
                yourSymbolGO.addBitmap({
                    
                    name: "symbol_highlight",
                    pos: {
                        x: 100,
                        y: 100
                    },
                    frame: "nw" + TICKET.getInstance().getSymbolNumber()[i],
                    doReg: {
                        center: true
                    },
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")                    
                    
                });
                yourSymbolGO.addBitmap({
                    
                    name: "prize",
                    pos: {
                        x: 100,
                        y: 185
                    },
                    frame: "p" + TICKET.getInstance().getPrizeList()[turn],
                    doReg: {
                        center: true
                    },
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")                    
                    
                });
                yourSymbolGO.addBitmap({
                    
                    name: "prize_highlight",
                    pos: {
                        x: 100,
                        y: 185
                    },
                    frame: "pw" + TICKET.getInstance().getPrizeList()[turn],
                    doReg: {
                        center: true
                    },
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")                    
                    
                });
                yourSymbolGO.addBitmap({
                    
                    name: "wordPrize",
                    pos: {
                        x: 100,
                        y: 185
                    },
                    frame: "word_prize",
                    doReg: {
                        center: true
                    },
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")                    
                    
                });
                                
                yourSymbolGO.setPosition({
                    x: dataSet[0],
                    y: dataSet[1]
                });
                
                yourSymbolGO.setPrizeValue(TICKET.getInstance().getPrizeList()[turn]);
                yourSymbolGO.setTicketLabel(TICKET.getInstance().getSymbolNumber()[i]);
                
                // setup animation
                yourSymbolGO.setEnabled(true);
                yourSymbolGO.setReminder(true, 'bagReminder');
                
                yourSymbolGO.setAnimation('reveal', 'iconReveal', 0.2, 0.5);
                yourSymbolGO.addAnimation('prizeReveal');
                yourSymbolGO.setAnimation('prizeReveal', 'iconPrizeReveal', 0.2, 0.5);
                
                yourSymbolGO.setAnimation('winReveal', 'iconWinReveal', 0.5, 1);
                yourSymbolGO.animate('reminder1');
                
                yourSymbolGO.getBitmap('wordPrize').on('click', function(yourSymbolGO) {
                    yourSymbolGO.setScale(1,1);
                    if ( !yourSymbolGO.getRevealed() ){
                        yourSymbolGO.setEnabled(false);
                        yourSymbolGO.killReminder();                      
                        yourSymbolGO.animate('prizeReveal');
                        yourSymbolGO.setReveal(true)   
                        IWG.IWGEM.trigger('decClickCount', ['match', yourSymbolGO ]);
                        createjs.Sound.play('prize');
                     }       
                }.bind(null, yourSymbolGO ));
                
                yourSymbolGO.getBitmap('icon').on('click', function(yourSymbolGO) {
                    yourSymbolGO.setScale(1,1);
                    if ( !yourSymbolGO.getRevealed() ){
                        yourSymbolGO.setEnabled(false);
                        yourSymbolGO.killReminder();                      
                        yourSymbolGO.reveal();   
                        IWG.IWGEM.trigger('decClickCount', ['match', yourSymbolGO ]);
                        createjs.Sound.play('prize');
                     }       
                }.bind(null, yourSymbolGO ));
                
                // setup action
                // yourSymbolGO.setAction('click', function(yourSymbolGO){
                //     yourSymbolGO.setScale(1,1);
                //     if ( !yourSymbolGO.getRevealed() ){
                //         console.log();
                //         yourSymbolGO.setEnabled(false);
                //         yourSymbolGO.killReminder();                      
                //         yourSymbolGO.reveal();   
                //         IWG.IWGEM.trigger('decClickCount', ['match', yourSymbolGO ]);
                //         createjs.Sound.play('prize');
                //      }                     
                // }.bind(null, yourSymbolGO));
                
                
                
                this._match.addSymbol(yourSymbolGO, "playable");
                
            } // end for loop
            
            // setup instruction
            var instructions = new GAMEOBJECT('instructions', { w: 740, h: 74 }, 1, mainGameScene);
            instructions.addBitmap({ 
                name: "instructions",
                pos: {
                    x: 370,
                    y: 37
                },
                frame: "instructions",
                doReg: {
                    center: true
                },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS") 
            }); 
            instructions.setPosition({
                x: 480 - 370,
                y: 555                
            });
            
            TweenMax.to( mainGameScene.getDiv(), 1, { delay: 0.5, alpha: 1 });            
            
        } // end _mainGameSetup()
        
        /*
         *  name:           _setupEndgame
         *  description:    setup end screen
         *  params:         null
         *  returns:        null
         */
        private _setupEndgame(): void {
           var endGame = new ENDGAME("endGame");
            endGame.setDimensions({
                w: 885,
                h: 350
            });
            endGame.setPosition({
                x: 480 - 435,
                y: -350
            });
            endGame.setZindex("11");	
            endGame.setAlpha(0);
        }
        
        /**
         *  name:           _checkFinished();
         *  description:    checks all matches have been finished
         *  params:         null;
         *  returns:        null;
         */
        private _checkFinished(): void {
            
            for (var i = 0; i < 6; i++) {  
                var shine = HELPER.getGameObject('shinerBrand' + i);
                shine.setAlpha(0);
                shine.getStage().update();
                //TweenMax.to(shine.getCanvas(), 0.3, {alpha: 0})
            }
            IWG.IWGEM.trigger('showEndGame');
            
        } // end _checkFinished();
        
        
        
        
    }
}