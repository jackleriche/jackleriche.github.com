/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {

    var CAMELOT: any        = com.camelot,
        CORE                = CAMELOT.core,
        IWG                 = CAMELOT.iwg,
        GLOBAL              = IWG.Global,
        SCALE               = IWG.Scale,
        PAUSE               = IWG.Pause,
        SOUND               = IWG.Sound,
        TICKET              = IWG.Ticket,
        SPRITESHEETS        = IWG.SpriteSheets,
        images              = CORE.iwgLoadQ.images,
        MAINLAYOUT          = IWG.MainLayout;

    export class FrostyBingo {

        private _canvas: HTMLElement;
        private _stage: createjs.Stage;

        constructor(private _name: string, public starter?: string) {

            this._subscribe();
            this._setupTicker();
            this._init();
            this._initComplete();

        } // end constructor
        
        /**
         *  name:           _subscribe
         *  description:    setup events for the 20xCash class
         *  params:         null
         *  returns:        null
         */
        private _subscribe(): void { 
            
        } // end  _subscribe()
        
        /**
         *  name:           _unsubscribe
         *  description:    remove events for the 20xCash class
         *  params:         null
         *  returns:        null
         */
        private _unsubscribe(): void {
            
        } // end _unsubscibe();
       
        
        /*
         *  name:           _endGameCheck
         *  description:    check game has finished and call showEndGame
         *  params:         null
         *  returns:        null
         */
        private _endGameCheck(): void {    
        
        } // end _endGameCheck()
        
        /*
         *  name:           _init
         *  description:    initialise 20xCash class
         *  params:         null
         *  returns:        null
         */
        private _init(): void {
            
            // add main spritesheet to SPRITESHEETS
            var masterSS = CORE.iwgLoadQ.getResult("masterSS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("masterSS", masterSS);
            
            // add bag spritesheet to SPRITESHEETS
            var bagSS = CORE.iwgLoadQ.getResult("bagSS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("bagSS", bagSS);
            
            // add pound spritesheet to SPRITESHEETS
            var poundSS = CORE.iwgLoadQ.getResult("poundSS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("poundSS", poundSS);
            
            // add pound spritesheet to SPRITESHEETS
            var starSS = CORE.iwgLoadQ.getResult("starSS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("starSS", starSS);
            
            // add pound spritesheet to SPRITESHEETS
            var star5SS = CORE.iwgLoadQ.getResult("star5SS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("star5SS", star5SS);
            
            // add pound spritesheet to SPRITESHEETS
            var star10SS = CORE.iwgLoadQ.getResult("star10SS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("star10SS", star10SS);
             
            // add pound spritesheet to SPRITESHEETS
            var splashBurstSS = CORE.iwgLoadQ.getResult("splashBurstSS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("splashBurstSS", splashBurstSS);

            // setup ticket
            TICKET.getInstance().setupTicket();
            
            // setup mainlayout class
            var mainLayout = new MAINLAYOUT();
            
        } // end _init()
        
        private _initComplete(): void {
            
            setTimeout( function() {
                CORE.IWG.ame('killloader');    
            }, 1000);
            
        } // end _initComplete()
        
        /*
        *  Basic function that sets up ticker and time base for the game
        */
        private _setupTicker() {
            // set up touch and tick
            createjs.Ticker.setFPS(20);
            TweenLite.ticker.fps(20);
            createjs.Touch.enable(this._stage, false, true);
            //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
            createjs.Ticker.addEventListener("tick", this.update); 
        }      

        private update() {

            IWG.IWGEM.trigger('update');

        };

        public destroy() {
            this._unsubscribe();
        }   
    }
}