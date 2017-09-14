/// <reference path="../../../typings/tsd.d.ts" />

module com.camelot.iwg {

    var CAMELOT: any        = com.camelot,
        CORE                = CAMELOT.core,
        IWG                 = CAMELOT.iwg,
        GLOBAL              = IWG.Global,
        SCALE               = IWG.Scale,
        PAUSE               = IWG.Pause,
        SOUND               = IWG.Sound,
        TICKET              = IWG.Ticket,
        QUEUEMANAGER        = IWG.QueueManager,
        GAMEOBJECT          = IWG.GameObject,
        SCENE               = IWG.Scene,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS        = IWG.SpriteSheets,
        ANIMATION           = IWG.Animation,
        images              = CORE.iwgLoadQ.images,
        MAINLAYOUT          = IWG.MainLayout,
        LEGEND              = IWG.Legend; 


    export class Gold7sMultiplier {

        private _canvas: HTMLElement;
        private _stage: createjs.Stage;

        constructor(private _name: string, public starter?: string) {
            this._subscribe();
            this._setupTicker();
            this._init();
            this._initComplete();
        }
        
        private _subscribe() { 
            
        }
        
        private _unsubscribe() {
        }
        
        /*
         *  name:           _endGameCheck
         *  description:    check game has finished and call showEndGame
         *  params:         null
         *  returns:        null
         */
        private _endGameCheck() {    
            var _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
            var _isWinner = Number(TICKET.getInstance().getParams().wT);
           
        }

        private _init() {
            
            // add main spritesheet to SPRITESHEETS
            var gold7sMultiplier = CORE.iwgLoadQ.getResult("gold7sMultiplierSS");
            SPRITESHEETS.getInstance().addSpriteSheet("gold7sMultiplier", gold7sMultiplier);
            
            var scale = new SCALE(document.getElementById('IWGholder'));
            var pause = new PAUSE();
            pause.setPosition({
                x: -200,
                y: -80 
            });

            // setup ticket
            TICKET.getInstance().setupTicket();
            
            var mainLayout = new MAINLAYOUT();
            
        }
        
        public _initComplete() {
            setTimeout( function() {
                CORE.IWG.ame('killloader');    
            }, 500);
        }
        
        /*
        *  Basic function that sets up ticker and time base for the game
        */
        private _setupTicker() {
            // set up touch and tick
            createjs.Ticker.setFPS(24);
            TweenLite.ticker.fps(24);
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