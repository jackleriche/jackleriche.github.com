/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="Scene.ts" />

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
        SOUND = IWG.Sound,
        SPLASH = IWG.Splash,
		ENDGAME = IWG.EndGame,
        SPINNER = IWG.Spinner,
        INSTRUCTION = IWG.Instruction,
        TICKET = IWG.Ticket; 
        

    export class MainLayout {
        
        constructor() {
            this._subscribe();
            this._setupBackground();
            this._setupButtons();
            this._setupSplash();
           
            this._setupEndgame();
        }
        
        private _subscribe():void {
            IWG.IWGEM.on('mainGameIntro', this._mainGameIntro.bind(this));
        }
        private _unsubscribe():void {
            IWG.IWGEM.off('mainGameIntro');
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
                frame: "bg_black",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier") 
            });
            background.setScale(1.5,1.5)
            
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
           
        }
        
         /*
         *  name:           _setupButtons
         *  description:    setup instruction and sound button
         *  params:         null
         *  returns:        null
         */
        private _setupButtons(): void{
            var sound = new SOUND();
            sound.setDimensions({
                w: 50,
                h: 50
            }); 
            sound.setZindex(10);
            sound.setScale(1, 1);
            sound.setPosition({ x: 910, y: 500 });
            
            var instruction = new INSTRUCTION();
        }
        
        /*
         *  name:           _mainGameSetup
         *  description:    setup mainGame
         *  params:         null
         *  returns:        null
         */
        private _mainGameSetup(): void {
             var spinner = new SPINNER();
             spinner.setDimensions({
                 w: 802,
                 h: 821
             });
             spinner.setPosition({
                 x: 1500,
                 y: -100
             });
             spinner.setZindex("8");
        }
        
        /*
         *  name:           _mainGameIntro
         *  description:    Event to bring on instructions
         *  params:         null
         *  returns:        null
         */
        private _mainGameIntro(): void {
            this._mainGameSetup();
            IWG.IWGEM.trigger('spinnerIn')
            IWG.IWGEM.trigger('instructionShowButton')
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
                 w: 333,
                 h: 270
            });
            endGame.setPosition({
                 x: 1200,
                 y: 100
            });
            endGame.setZindex("10");
            endGame.setAlpha(0);
        }
    }
}