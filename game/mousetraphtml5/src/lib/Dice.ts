/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="ClickableGameObject.ts" />

module com.camelot.iwg {

    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS = IWG.SpriteSheets,
        ANIMATION = IWG.Animation,
        images = CORE.iwgLoadQ.images,
        TICKET = IWG.Ticket,
        BOARD = IWG.Board,
        GLOBAL = IWG.Global;

    export class Dice extends ClickableGameObject {

        private extraTurnOn: boolean = false;
        private rollsLeft: number = 6;
        private diceNumber: number = -1;
        private previousDiceNumber:number = 1;
        private rolling: boolean = false;
        private diceAnimationClip: any;
        private starAnimationClip: any;

        constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 3) {
            super(_name, _dimensions, _zindex);
            this._subscribeDice();
        }

        private _subscribeDice() {
            IWG.IWGEM.on('rollAgainLanded', this.extraTurn.bind(this));
            IWG.IWGEM.on('diceSpinTop', this.diceUp.bind(this));
            IWG.IWGEM.on('counterMoved', this.dicePipUpdate.bind(this));
        }
        private _unsubscribeDice() {
            IWG.IWGEM.off('rollAgainLanded');
            IWG.IWGEM.off('diceSpinTop');
        }

        public getInstance(): Dice {
            return this;
        }
        
        public setEnabled(bool: boolean): void {
            
            if ( bool === false ){
                super.setEnabled(bool);
            };
            
            TweenMax.delayedCall(
                1, () => {
                    if (bool) {
                        this.starAnimationClip.alpha = 1;
                        this.dicePipReset();
                        super.setEnabled(bool);
                    } else {
                        this.starAnimationClip.alpha = 0;
                    }
                    
                }
           )
           

        }

        public setupDice() {
            var spriteSheet: createjs.SpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
            var diceSpriteSheet: createjs.SpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrapDice");

            this.addBitmap({
                name: 'rollAgainShadow',
                pos: { x: 160, y: 100 },
                spriteSheet: spriteSheet,
                frame: "plusone_shadow",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'rollAgain',
                pos: { x: 160, y: 100 },
                spriteSheet: spriteSheet,
                frame: "plusone_cog",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'rollAgainNumber',
                pos: { x: 160, y: 100 },
                spriteSheet: spriteSheet,
                frame: "plusone",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'rollsBG',
                pos: { x: 0, y: 30 },
                spriteSheet: spriteSheet,
                frame: "bg_rollsleft",
                scale: 1,
                doReg: { center: false }
            });
            this.addBitmap({
                name: 'rollsLeft',
                pos: { x: 40, y: 55 },
                spriteSheet: spriteSheet,
                frame: "rollsleft",
                scale: 1,
                doReg: { center: false }
            });
            this.addBitmap({
                name: 'rollNumber',
                pos: { x: 33, y: 68 },
                spriteSheet: spriteSheet,
                frame: "roll_6",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'diceBGShadow',
                pos: { x: 163, y: 103 },
                spriteSheet: spriteSheet,
                frame: "cog_dice_shadow",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'diceBG',
                pos: { x: 160, y: 100 },
                spriteSheet: spriteSheet,
                frame: "cog_dice",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'diceStar',
                pos: { x: 160, y: 100 },
                spriteSheet: spriteSheet,
                frame: "dice_spinner",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'diceRollNumber',
                pos: { x: 160, y: 100 },
                spriteSheet: spriteSheet,
                frame: "roll_0",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'diceAnimation',
                pos: { x: 164, y: 103 },
                spriteSheet: diceSpriteSheet,
                frame: "dice_roll_1",
                scale: 1,
                doReg: { center: true }
            });

            this.addAnimation("rollAgainOn")
            this.setAnimation("rollAgainOn", "roll_again_out", 0.5, 0);
            this.addAnimation("rollAgainOff")
            this.setAnimation("rollAgainOff", "roll_again_in", 0.5, 0);
            this.addAnimation("rollDice");
            this.addAnimation("starSpin")
            this.setAnimation("starSpin", "spin_star", 5, 0);
            this.addAnimation("diceScale");
            this.animate("starSpin");
            this.starAnimationClip = this.getBitmap("diceStar");
            this.diceAnimationClip = this.getBitmap("diceAnimation");
            this.active = true;
            this.diceAnimationClip.on("change", (evt) => {
                var currentFlipFrame = this.diceAnimationClip.currentAnimationFrame;
                if (currentFlipFrame == 20) {
                    IWG.IWGEM.trigger('diceSpinTop');
                }
            });
            this.getBitmap("diceAnimation").addEventListener('animationend', () => {
                this.rolling = false;
            });
            
            this.setAction("click", () => {
                
                // disable the dice
                this.setEnabled(false);
                IWG.IWGEM.trigger('diceRollStarted');
                createjs.Sound.play("scratch2");
                    TweenMax.delayedCall(0.2, () => {
                        this.updateDiceRoll();
                        this.rollDice();
                });
            });
            this.setAction("rollover", () => {
                this.setAnimation("diceScale", "dice_scale", 0.3, 0, true)
                this.animate("diceScale");
            });
            this.setAction("rollout", () => {
                this.setAnimation("diceScale", "dice_scale", 0.3, 0, false)
                this.animate("diceScale");
            });
            
            this.setPosition({ x: 475, y: 325 });
            this.setEnabled(true);
        }

        private rollDice(): void {
            this.active = true;
            this.rolling = true;
            
            // set global to diceroll
            GLOBAL.getInstance().addToGlobal( "dice", this );
            
            Board.totalTurns++;        
                
            this.diceAnimationClip.scaleX = 1;
            this.diceAnimationClip.scaleY = 1;
            this.updateDiceRollNumber();
            this.previousDiceNumber = this.diceNumber;
            this.diceNumber = TICKET.getInstance().getTurn(Board.totalTurns).d1;
            this.setAnimation("rollDice", "roll_dice", 0.5, 0, [this.previousDiceNumber]);
            this.animate("rollDice");
            
        }

        public updateDiceRoll(): void {
            var rollNumberClip = this.getBitmap("rollNumber");
            var rollsLeft: createjs.Sprite = this.getBitmap('rollsLeft');

            if (this.extraTurnOn) {
                this.animate("rollAgainOff");
                this.extraTurnOn = false;
            } else {
                this.rollsLeft--;
                rollNumberClip.gotoAndStop("roll_" + this.rollsLeft);
            }
            if (this.rollsLeft === 1) {
                rollsLeft.gotoAndStop("rollleft");
            } else {
                rollsLeft.gotoAndStop("rollsleft");
            }
            this.getStage().update();
        }
        
        private dicePipUpdate():void {
            this.diceAnimationClip.advance();
        }
        
        private dicePipSet():void {
            var currentDiceNumPipAnimName = "dice_end_" + this.diceNumber + "_pips";
            this.diceAnimationClip.gotoAndStop(currentDiceNumPipAnimName);
        }
        
        private dicePipReset(): void {
            this.diceAnimationClip.gotoAndStop("dice_end_" + this.diceNumber + "_pips");
        }

        private diceDown(): void {
            this.dicePipSet();
            IWG.IWGEM.trigger('startTurn');
            createjs.Sound.play("dice");
        }

        private diceUp(): void {
            this.diceAnimationClip.gotoAndPlay("dice_end_" +this.diceNumber);
               
            this.diceDown();            
       }
       
        public extraTurn(): void {
            this.extraTurnOn = true;
            this.animate("rollAgainOn");
        }

        public updateDiceRollNumber(): void {
            var diceRollNumberClip = this.getBitmap("diceRollNumber");
            diceRollNumberClip.gotoAndStop("roll_" + this.diceNumber);
        }

        public destroy() {
            console.log('destroying Dice');
            this._unsubscribeDice();
            super.destroy();
        }
    }
    
}