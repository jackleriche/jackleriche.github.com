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


    export class LottoDrop {

        private _canvas: HTMLElement;
        private _stage: createjs.Stage;

        constructor(private _name: string, public starter?: string) {
            this._subscribe();
            this._setupTicker();
            this._init();
            this._initComplete();
        }
        
        private _subscribe() { 
            IWG.IWGEM.on('miniGamePrizeComplete', this._miniGamePrize.bind(this) );
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
            
            // global setup
            //GLOBAL.getInstance().addToGlobal("ballSelection", ["1","2","3","4","5","6"] );
            
            // add main spritesheet to SPRITESHEETS
            var lottoDrop = CORE.iwgLoadQ.getResult("lottoDropSS");
            SPRITESHEETS.getInstance().addSpriteSheet("lottoDrop", lottoDrop);
            
            var scale = new SCALE(document.getElementById('IWGholder'));
            var pause = new PAUSE();
            pause.setPosition({
                x: -200,
                y: -80 
            });
            var sound = new SOUND();
            sound.setDimensions({
                w: 50,
                h: 50
            }); 
            sound.setZindex(10);
            sound.setScale(1, 1);
            sound.setPosition({ x: 120, y: 517 });

            // setup ticket
            //TICKET.getInstance().setupTicket();
            
            var mainLayout = new MAINLAYOUT();
            
            // create first turn
            GLOBAL.getInstance().addToGlobal('turnNo', 0);
            
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
        
        /*
         *  name:           _miniGamePrize();
         *  description:    figure out which event to fire depending on what the mini game wins
         *  params:         gameObject: GameObject
         *  returns:        null
         */
        private _miniGamePrize(gameObject) {
            
            var type = gameObject.getTicketLabel();
            
            switch (type) {
                case 1:
                    IWG.IWGEM.trigger('bonusStar');
                    break;
                case 2:
                    IWG.IWGEM.trigger('addBall', [gameObject.ballNumber]);
                    break;
                case 4:
                    IWG.IWGEM.trigger( 'instantWin', [ 10 ] );
                    break;
                case 5: 
                    IWG.IWGEM.trigger('instantWin', [5]);
                    break;
                case 6: 
                    IWG.IWGEM.trigger('instantWin', [3]);
                    break;
            }
            
        }

        private update() {

            IWG.IWGEM.trigger('update');

        };

        public destroy() {
            this._unsubscribe();
        }   
    }
}