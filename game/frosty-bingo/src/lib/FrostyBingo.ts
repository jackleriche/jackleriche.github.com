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


    export class FrostyBingo {

        private _canvas: HTMLElement;
        private _stage: createjs.Stage;
        private _method: string;
        private _dabberColor: string;
        private _turn: number = 0;
        private _cardCount: number = 0;
        private _cardReady: number = 0;

        constructor(private _name: string, public starter?: string) {
            this._subscribe();
            this._setupTicker();
            this._init();
            this._initComplete();
        }
        
        private _subscribe() { 
            IWG.IWGEM.on('announceBall', this._ballAnnounced.bind(this));      
            IWG.IWGEM.on('resetBall', this._endGameCheck.bind(this) );  
            IWG.IWGEM.on('Card.incCardCount', this._incCardCount.bind(this) );
            IWG.IWGEM.on('Card.decCardCount', this._decCardCount.bind(this) );
            IWG.IWGEM.on('Card.cardReady', this._incCardReady.bind(this) );
            
        }
        
         private _unsubscribe() {
            IWG.IWGEM.off('announceBall');
            IWG.IWGEM.off('resetBall');
        }
        
        /*
         *  name:           _ballAnnounced
         *  description:    get turn data from ticket and trigger ballPop, increments turn
         *  params:         null
         *  returns:        null
         */
        private _ballAnnounced() {
            
            var ballNumber = TICKET.getInstance().getTurn(this._turn).b;
            IWG.IWGEM.trigger('ballPop', [ballNumber]);
            
            // increment turn
            this._turn++;
            
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
            
            if ( this._turn === 20 ){
                TweenMax.delayedCall(2, function() {
                  IWG.IWGEM.trigger("showEndGame");
                    if (_wager){
                        if (_isWinner === 1){
				           createjs.Sound.play('endWin');
                        } else {
                           createjs.Sound.play('endLose');
                        }
                    } else {
                        createjs.Sound.play('endLose');
                    }  
                  })
            } else {
                IWG.IWGEM.trigger('announceBall');
            }
        }
        
        /*
         *  name:           _incCardCount
         *  description:    increment cardCount to display number of cards with matching ball number
         *  params:         null
         *  returns:        null
         */
        private _incCardCount() {
            this._cardCount++;
        }
        
        /*
         *  name:           _decCardCount
         *  description:    decrementing cardCount to display number of cards left with matching number
         *  params:         null
         *  returns:        null
         */
        private _decCardCount() {
            this._cardCount--;
            if ( this._cardCount === 0) {
                IWG.IWGEM.trigger('ballRollOff');
            }
        }
        
        
        /*
         *  name:           _incCardReady
         *  description:    increment card is ready for marking, once all cards are checked, call event and reset counter
         *  params:         null
         *  returns:        null
         */
        private _incCardReady() {
            this._cardReady++;
            
            if ( this._cardReady === 4 ){
                IWG.IWGEM.trigger('cardsReady');
                this._cardReady = 0;
            }

        }
        
       

        private _init() {
            
            GLOBAL.getInstance().addToGlobal('ballNumber');
            GLOBAL.getInstance().addToGlobal('dabber', "purple");
            
            // add main spritesheet to SPRITESHEETS
            var frostyBingo = CORE.iwgLoadQ.getResult("frostyBingoSS");
            SPRITESHEETS.getInstance().addSpriteSheet("frostyBingo", frostyBingo);
            
            var tombola = CORE.iwgLoadQ.getResult("tombolaSS");
            SPRITESHEETS.getInstance().addSpriteSheet("tombola", tombola);
            
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
            sound.setPosition({ x: 910, y: 527 });

            // setup ticket
            TICKET.getInstance().setupTicket();
            
            var mainLayout = new MAINLAYOUT();
            
        }
        
        public _initComplete() {
            setTimeout( function() {
                CORE.IWG.ame('killloader');    
            }, 1000);
        }
        
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