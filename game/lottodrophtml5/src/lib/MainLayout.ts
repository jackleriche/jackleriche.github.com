/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Instruction.ts" />

module com.camelot.iwg {

    var CAMELOT: any        = com.camelot,
        CORE                = CAMELOT.core,
        IWG                 = CAMELOT.iwg,
        GLOBAL              = IWG.Global,
        GAMEOBJECT          = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS        = IWG.SpriteSheets,
        ANIMATION           = IWG.Animation,
        images              = CORE.iwgLoadQ.images,
        SPLASH              = IWG.Splash,
        BOARD               = IWG.Board,
        LEGEND              = IWG.Legend,
		BALLBANK            = IWG.BallBank,
        BONUSSTAR           = IWG.BonusStar,
		INSTANTWIN			= IWG.InstantWin,
        BALLSELECTION       = IWG.BallSelection,
		ENDGAME             = IWG.EndGame,
        INSTRUCTION         = IWG.Instruction,
        TICKET              = IWG.Ticket,
        MINIGAMEONE         = IWG.MiniGameOne,
        MINIGAMETWO         = IWG.MiniGameTwo; 
        

    export class MainLayout {
        
        constructor() {
            this._subscribe();
            this._setupBackground();
            this._setupSplash();
        }
        
        private _subscribe():void {
            IWG.IWGEM.on('mainGameSetup', this._selfGenTicket.bind(this));
            IWG.IWGEM.on(CORE.IWGEVENT.GENERATED_TICKET_LOADED, this._generatedTicketLoaded.bind(this) );
        }
        private _unsubscribe():void {
           IWG.IWGEM.off('mainGameSetup');
        }
        
        
        /*
         *  name:           _setupBackground
         *  description:    make a new div element, append div to IWGHolder, set width and background colour in css;
         *  params:         null
         *  returns:        null
         */
        private _setupBackground() {
            
            var ele     = document.createElement("div");
            ele.id  	= "background";
            
        	document.getElementById("IWGholder").appendChild(ele);
            
        }
        
        /*
         *  name:           _setupSplash
         *  description:    setup splash screen
         *  params:         null
         *  returns:        null
         */
        private _setupSplash(): void {
            
            var ballSelection = new BALLSELECTION('ballSelection');
            ballSelection.setDimensions({
                w: 960,
                h: 640
            });
            ballSelection.setZindex("2");
            ballSelection.setAlpha(0);
            
            var splash = new SPLASH("splash");
            splash.setDimensions({
                w: 960,
                h: 640
            });
            splash.setZindex("2");
            
           
        }
        
        /*
         *  name:           _generatedTicketLoaded()
         *  description:        
         *  params:         null
         *  returns:        null
         */
        private _generatedTicketLoaded() {
            
            TICKET.getInstance().setupTicket();
            this._mainGameSetup();
            this._miniGameSetup();
            this._setupEndgame();
            
        }
        
        /*
         *  name:           _selfGenTicket()
         *  description:    setup ticket
         *  params:         null
         *  returns:        null
         */
        private _selfGenTicket() {
            
            switch (CORE.IWG.ame('get', {vars: ['S_G_T_need_data']})) {
            case true:

                var ballArray = GLOBAL.getInstance().getFromGlobal('ballSelection'); 
                IWG.IWGEM.trigger(CORE.IWGEVENT.GENERATE_TICKET, ["input=n1:" + ballArray[0] + ",n2:" + ballArray[1] + ",n3:" + ballArray[2] + ",n4:" + ballArray[3] + ",n5:" + ballArray[4] + ",n6:" + ballArray[5] ] );
                break;
                
            case false:
                console.log('SGT - START GAME without user data selection screen');
                TICKET.getInstance().setupTicket();
                TweenMax.delayedCall(1, () => {
                    this._mainGameSetup();
                    this._miniGameSetup();
                    this._setupEndgame();
                });
                break;
            }
            
        }
        
        
        /*
         *  name:           _mainGameSetup
         *  description:    setup mianGame
         *  params:         null
         *  returns:        null
         */
        private _mainGameSetup(): void {
            
			var logo = new GAMEOBJECT('logoSmall', {w: 234, h: 243}, 5);
            logo.addBitmap({
				name: "logoSmall",
				pos: {
					x: 117,
					y: 121.5
				},
				frame: "logo_small",
                alpha:0,
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
            logo.active = true;
            logo.setPosition({
                x: 65,
                y: 0
            });
            TweenMax.to(logo.getBitmap('logoSmall'), 0.5, {alpha: 1, delay: 0.6, onComplete: () => {
                logo.active = false;
            }});
            
			// setup instructions
            var instructions    = new INSTRUCTION('instructions');
            //IWG.IWGEM.trigger('showInstructions')
			
			// setup bankNumbers class
            var bankNumbers     = new BALLBANK('numberBank');
			bankNumbers.setDimensions({
				w: 300,
				h: 100
			});
			bankNumbers.setPosition({
				x: 35,
				y: 250
			});
            bankNumbers.setAlpha(0);
            
			// setup bonusStar class
            var bonusStar = new BONUSSTAR('bonusLegend');
			bonusStar.setDimensions({
				w: 175,
				h: 105
			});
			bonusStar.setPosition({
				x: 20,
				y: 400
			});
            bonusStar.setAlpha(0);
			
			// setup instantWin class
			var instantWin = new INSTANTWIN('instantWin');
			instantWin.setDimensions({
				w: 140,
				h: 100
			});
			instantWin.setPosition({
				x: 220,
				y: 400
			});
            instantWin.setAlpha(0);
            
			// setup board class
            var board           = new BOARD('board');
            board.setDimensions({
                w: 560,
                h: 621
            });
            board.setPosition({
                x: 380,
                y: 10
            });
            board.setZindex("2");
            board.setAlpha(0);   
		          
            
        }
        
        /*
         *  name:           _miniGameSetup
         *  description:    setup miniGame
         *  params:         null
         *  returns:        null
         */
        private _miniGameSetup(): void {
        
            try {
                if (TICKET.getInstance().getMiniGame()[0].mG === 1) {
                    var miniGameOne = new MINIGAMEONE("miniGameOne");
                    miniGameOne.setDimensions({
                        w: 530,
                        h: 560
                    });
                    miniGameOne.setPosition({
                    x: 395,
                    y: 65
                    });
                    miniGameOne.setZindex(1);
                    miniGameOne.setAlpha(0);
                } else if (TICKET.getInstance().getMiniGame()[0].mG === 2) {
                    var miniGameTwo = new MINIGAMETWO("miniGameTwo");
                    miniGameTwo.setDimensions({
                        w: 530,
                        h: 560
                    });
                    miniGameTwo.setPosition({
                    x: 395,
                    y: 65
                    });
                    miniGameTwo.setZindex(1);
                    miniGameTwo.setAlpha(0);
                } 
            }
            catch(err) {
                console.log('no minigame')
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
                w: 360,
                h: 350
            });
            endGame.setPosition({
                x: 480,
                y: -400
            });
            endGame.setZindex("6");	
        }
    }
}