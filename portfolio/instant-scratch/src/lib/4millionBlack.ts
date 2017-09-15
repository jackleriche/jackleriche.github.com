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
            var masterSingleSS = CORE.iwgLoadQ.getResult("masterSingleSS-data");
            SPRITESHEETS.getInstance().addSpriteSheet("masterSingleSS", masterSingleSS);

            // setup ticket
            TICKET.getInstance().setupTicket();
            
            // setup mainlayout class
            //var mainLayout = new MAINLAYOUT();
            
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