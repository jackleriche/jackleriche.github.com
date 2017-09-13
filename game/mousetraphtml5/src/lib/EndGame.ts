/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="ClickableGameObject.ts" />

module com.camelot.iwg {
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        ANIMATION = IWG.Animation,
        SPRITESHEETS = IWG.SpriteSheets,
        TICKET = IWG.Ticket,
        images = CORE.iwgLoadQ.images;

    export class EndGame extends ClickableGameObject {

        private _endgameMessageProperties: any = {};
        private _endgameDisplayed: boolean = false;
        private _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });

        constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 20) {
            super(_name, _dimensions, _zindex);
            this._subscribeEndGame();
        }
        private _subscribeEndGame() {
            IWG.IWGEM.on('endGameStart', this.endGameSetup.bind(this));
            IWG.IWGEM.on('endGameShown', this.endGameSound.bind(this));
        }
        private _unsubscribeEndGame() {
            IWG.IWGEM.off('endGameStart');
        }

        public createEndGame(): void {

            var spriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");

            this.addBitmap({
                name: "endGameBackground",
                pos: { x: 0, y: 0 },
                spriteSheet: spriteSheet,
                frame: "bg_endgame",
                scale: 1,
                doReg: { center: false }
            });
            this.addBitmap({
                name: "endGameMessage",
                pos: { x: 157, y: 53 },
                spriteSheet: spriteSheet,
                frame: "end_congrats",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: "endGameAmount",
                pos: { x: 150, y: 95 },
                spriteSheet: spriteSheet,
                frame: "end_2",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: "finishButton",
                pos: { x: 145, y: 138 },
                spriteSheet: spriteSheet,
                frame: "button_finish",
                scale: 1,
                doReg: { center: true }
            });
            this.setAction("click", () => {
                this.setEnabled(false);
                //CORE.IWG.ame('closeGame');
                window.location.href = "/portfolio";
            });
           
            this.addAnimation("showEndGame")
            this.setAnimation("showEndGame", "show_endGame", 0.25, 2);
            this.addAnimation("finishPulse")
            this.setAnimation("finishPulse", "endGame_finish", 0.75, 3);
        }
        
        private endGameSound():void {
             var isWinner = TICKET.getInstance().getParams().wT;

            if (this._wager) {
                // Wager
                if (isWinner) {
                    createjs.Sound.play("yipee");   
                } else {
                    createjs.Sound.play("end_lose");
                }
            } else {
                createjs.Sound.play("end_lose");
            }
        }
        
        // getters and setters
        public endGameSetup() {

            var endGameMessageClip: createjs.Sprite = this.getBitmap('endGameMessage');
            var endGameAmountClip: createjs.Sprite  = this.getBitmap('endGameAmount');
            var endFinishButton: createjs.Sprite    = this.getBitmap('finishButton');

            var amount   = TICKET.getInstance().getOutcome().amount;
            var isWinner = TICKET.getInstance().getParams().wT;

            if (this._wager) {
                // Wager
                if (isWinner) {
                    endGameMessageClip.gotoAndStop("end_congrats");
                    endGameAmountClip.gotoAndStop("end_" + amount);
                    
                } else {
                    endGameMessageClip.gotoAndStop("end_lose")
                    endGameMessageClip.x = 190;
                    endGameMessageClip.y = 75;
                    endGameAmountClip.visible = false;
                }
            } else {
                // Trial
                endFinishButton.y = 80
                endFinishButton.x = 150
                endGameMessageClip.visible = false;
                endGameAmountClip.visible = false;
            }
            this.getStage().update();
            
            this.animate("showEndGame");
            this.animate("finishPulse");
            this.setEnabled(true);
            
        }

        public destroy() {
            console.log('destroying Endgame');
            super.destroy();
            this._unsubscribeEndGame();
        }



    }
}