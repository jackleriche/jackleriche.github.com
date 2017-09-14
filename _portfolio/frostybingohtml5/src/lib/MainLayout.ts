/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Card.ts" />

module com.camelot.iwg {

    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GLOBAL = IWG.Global,
        GAMEOBJECT = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS = IWG.SpriteSheets,
        ANIMATION = IWG.Animation,
        images = CORE.iwgLoadQ.images,
        OVERLAY = IWG.Overlay,
        SPLASH = IWG.Splash,
        BOKEH = IWG.Bokeh,
		ENDGAME = IWG.EndGame,
        TOMBOLA = IWG.Tombola,
        CARD = IWG.Card,
        BALLAUDIT = IWG.BallAudit,
        INSTRUCTION = IWG.Instruction,
        TICKET = IWG.Ticket; 
        

    export class MainLayout {
        
        private _gamePreviews:any       = [];
        private _games:any              = [];
        private _gameFinished           = false;
        private _bgMusic                = null;
        private _dabberColor: string    = null;
        private _method: string         = null;
        private _startBall: ClickableGameObject  = null;
        
        constructor() {
            this._subscribe();
            this._setupBackground();
            //this._setupOverlay();
            this._setupSplash();
            //this._mainGameSetup();
           
            this._setupEndgame();
        }
        
        private _subscribe():void {
            IWG.IWGEM.on('mainGameIntro', this._mainGameSetup.bind(this) );
            IWG.IWGEM.on('mainGameIntroComplete', this._mainGameIntroComplete.bind(this) );
            IWG.IWGEM.on("Splash.methodSelected", this._setMethod.bind(this) );
            IWG.IWGEM.on("Splash.dabberSelected", this._setDabberColor.bind(this) );
            IWG.IWGEM.on("hideInstructions", this._enableGame.bind(this) );
        }
        private _unsubscribe():void {
            IWG.IWGEM.off('mainGameIntro');
            IWG.IWGEM.off("Splash.methodSelected");
            IWG.IWGEM.off("Splash.dabberSelected");
            IWG.IWGEM.off("hideInstructions");
        }
        
        
        public getMethod(): string {
            return this._method;
        };
        private _setMethod(method): void {
            this._method = method;
        };
        
        public getDabberColor(): string {
            return this._dabberColor;
        };
        private _setDabberColor(color): void {
            this._dabberColor = color;
        };
        
        /*
         *  name:           _mainGameIntroComplete()
         *  description:    called after all animations of the main game have finished
         *  params:         null
         *  returns:        null
         */
        private _mainGameIntroComplete() {
            IWG.IWGEM.trigger('announceBall');
        }
        
        private _setupOverlay() {
            var overlay = new OVERLAY(true);
        }
        
        /*
         *  name:           _setupBackground
         *  description:    background setup
         *  params:         null
         *  returns:        null
         */
        private _setupBackground() {
            
            var background = new GAMEOBJECT('mainBG', { w: 1300, h: 770});
            background.addBitmap({ 
                name: "bg",
                pos: {
                    x: 0,
                    y: 0
                },
                frame: "bg_large",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") 
            }); 
            background.setPosition({
                x: -150
            });
            background.setScale(1.2,1.2)
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
            
            var bokeh = new BOKEH(9);
            
           
        }
        
        /*
         *  name:           _mainGameSetup
         *  description:    setup mianGame
         *  params:         null
         *  returns:        null
         */
        private _mainGameSetup(): void {
            
            GLOBAL.getInstance().addToGlobal('bokehEffect', false);
            
            var tombola = new TOMBOLA("tombola");
            tombola.setZindex(1);
            tombola.setPosition({
                x: 255,
                y: 50
            });
            tombola.setAlpha(0);
            tombola.intro();
            
            var card1 = new CARD("card1", [ 3, 6, 20, 100 ] );
            card1.setZindex(4);
            card1.setPosition({
                x: 10,
                y: 20
            });
            card1.setupCardNumbers( TICKET.getInstance().getCard1() );
            card1.setupLegend();
            card1.setDoublers( TICKET.getInstance().getDoublerPos(0) );
            card1.setScale(0);
            card1.intro(0.5);
            
            var card2 = new CARD("card2", [ 3, 10, 30, 1000 ]);
            card2.setZindex(4);
            card2.setPosition({
                x: 585,
                y: 20
            });
            card2.setupCardNumbers( TICKET.getInstance().getCard2() );
            card2.setupLegend();
            card2.setDoublers( TICKET.getInstance().getDoublerPos(1) );
            card2.setScale(0);
            card2.intro(0.6);
            
            var card3 = new CARD("card3", [ 5, 15, 50, 10000 ]); 
            card3.setZindex(4);
            card3.setPosition({
                x: 10,
                y: 280
            });
            card3.setupCardNumbers( TICKET.getInstance().getCard3() );
            card3.setupLegend();
            card3.setDoublers( TICKET.getInstance().getDoublerPos(2) );
            card3.setScale(0);
            card3.intro(0.7);
            
            var card4 = new CARD("card4", [ 6, 20, 200, 300000 ]);
            card4.setZindex(4);
            card4.setPosition({
                x: 585,
                y: 280
            });
            card4.setupCardNumbers( TICKET.getInstance().getCard4() );
            card4.setupLegend();
            card4.setDoublers( TICKET.getInstance().getDoublerPos(3) );
            card4.setScale(0);
            card4.intro(0.8);
            
            var redLines = new GAMEOBJECT("redDouble", { w: 429,h: 54 });
            redLines.addBitmap({
                name: "redDouble",
                pos: {
                    x: 0,
                    y: 0
                },
                frame: "redlines",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") 
            });
            redLines.setPosition({
                x: 270,
                y: 529
            });
            
            var instruction = new INSTRUCTION("instruction");    
            
            var audit = new BALLAUDIT("ballAudit", 20);
            audit.setZindex(2);
            audit.setPosition({
                x: 0,
                y: 580
            });
            
            // mark free space
            IWG.IWGEM.trigger('updateLegend', [-1]);
            
            var startBall = new CLICKABLEGAMEOBJECT("startBall", { w: 117, h: 118 });
            this._startBall = startBall;
            
			startBall.addBitmap({
				name: "startBall",
		        pos: {
		            x: 59,
		            y: 59
		        },
		        frame: "ball_start",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
		        doReg: {
		            center: true
		        },
				scale: 0
			});
            startBall.addBitmap({
				name: "startTextB",
		        pos: {
		            x: 60,
		            y: 55
		        },
		        frame: "start_black",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
		        doReg: {
		            center: true
		        },
                alpha: 1
			});
            startBall.addBitmap({
				name: "startTextW",
		        pos: {
		            x: 60,
		            y: 55
		        },
		        frame: "start_white",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
		        doReg: {
		            center: true
		        },
                alpha: 0
			});
            startBall.setScale(0.4, 0.4);
            startBall.setAlpha(0);
            
            startBall.setZindex(2);
			startBall.setPosition({
				x: 425,
				y: 200
			});  
            
            startBall.addAnimation("ballPop");
			startBall.addAnimation("ballRollOff");
			
			startBall.setAnimation("ballPop", "ballPopStart");
			startBall.setAnimation("ballRollOff", "ballRollOffStart");

            startBall.setEnabled(false);
            startBall.setAction('click', () => {
                if ( GLOBAL.getInstance().getFromGlobal('gameState') === 'resume') {
                    createjs.Sound.play("startButton")
                    startBall.animate('ballRollOff');
                };
            });           
            createjs.Sound.play("backgroundLoop", {loop: -1});
            
            IWG.IWGEM.trigger('soundHide');
            var sound = GLOBAL.getInstance().getFromGlobal('sound');
            sound.setPosition({
                x: 545,
                y: 487 
            }); 
            
            TweenMax.delayedCall(3, function(){
                IWG.IWGEM.trigger("showInstructions");  
                IWG.IWGEM.trigger('soundShow');         
            });
            
              
            
        }
        
        /*
         *  name:           _enableGame
         *  description:    enable the startBall    
         *  params:         null
         *  returns:        null
         */
        private _enableGame(): void {
                       
            this._startBall.animate('ballPop');
            this._startBall.setEnabled(true);
                                   
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
                w: 276,
                h: 170
            });
            endGame.setPosition({
                x: 345,
                y: 230
            });
            endGame.setZindex("6");	
            endGame.setAlpha(0);
            endGame.setScale(0);
        }
    }
}