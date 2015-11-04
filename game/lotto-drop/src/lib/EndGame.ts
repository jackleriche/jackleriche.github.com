/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
module com.camelot.iwg {

	var CAMELOT: any = com.camelot,
		CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		TICKET = IWG.Ticket,
		SPRITESHEETS = IWG.SpriteSheets;

	export class EndGame extends Scene {

		private _wager    = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
		private _amount   = TICKET.getInstance().getOutcome().amount;
        private _isWinner = Number( TICKET.getInstance().getOutcome().wT );

		constructor(_name) {
			super(_name);
			this._endGameLayout();
			this._subscribeEndGame();
		}

		private _subscribeEndGame() {
			IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
		}
		
		private _showEndGame() {
            TweenMax.to(this.getDiv(), 1, {y: 140, delay:1, ease:Bounce.easeOut, onComplete: () =>{
                if (this._isWinner === 1 && this._wager) {
                    createjs.Sound.play('endWin');
                } else {
                    createjs.Sound.play('endLose')
                }
                TweenMax.to(this.getChildByName('endGameButton').getCanvas(), 1, {delay:1, alpha:1});
            }});
		}

		private _endGameLayout() {
            var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop");
			// background creation
			var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 360,h: 350}, 1, this);
			endGameBackground.addBitmap({
				name: "background",
				pos: {
					x: 180,
					y: 90
				},
				frame: "bg_endgame",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			
			// button creation
			var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 240,h: 110}, 1, this);
			endGameButton.addBitmap({
				name: "button",
				pos: {
					x: 120,
					y: 55
				},
				frame: "button_finish",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			endGameButton.setPosition({
				x: 60, 
				y: 195
			});
			endGameButton.setEnabled(true);
            endGameButton.setAlpha(0);
				
			endGameButton.setAction('click', () => {
                endGameButton.setEnabled(false);
                CORE.IWG.ame('closeGame');
			});
            endGameButton.setAction('rollover', () =>{
               this._stopReminderSymbol(true); 
            });
            endGameButton.setAction('rollout', () =>{
               this._stopReminderSymbol(true); 
            });
			
            this._endGameTextSetup();
            this._setReminder();
		}
        
        /*
		 *	name:			_endGameTextSetup
		 *	description:	sets the end game text
		 *	params:			
		 *	return:			null
		 */
        private _endGameTextSetup(): void {
            var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                endTextFrame: string = null,
				endTextPos = {x: 39, y: 25};	
            
            if ( this._wager ){
				if ( this._isWinner === 1 ) {
					endTextFrame = "end_win";
				} else {
					endTextFrame = "end_lose";
					endTextPos.y = 55;
				};
			} else {
				endTextFrame = "end_trial";
				endTextPos.y = 50;
			};
            
            var endGameText = new GAMEOBJECT( "endGameText", { w: 276, h: 70 }, 1, this );
			endGameText.addBitmap({
				name: "endGameText",
				pos: {
					x: 138,
					y: 35
				},
				frame: endTextFrame,
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			endGameText.setPosition({
				x: endTextPos.x, 
				y: endTextPos.y
			});
            
			// setting the amount to be shown
			if ( this._isWinner === 1 && this._wager ) {
				var endGameAmount = new GAMEOBJECT( "endGameAmount", { w: 211, h: 66 }, 1, this );
				endGameAmount.addBitmap({
					name: "amount",
					pos: {
						x: 102,
						y: 33
					},
					frame: "end" + this._amount,
					spriteSheet: spritesheet,
					doReg: {
						center: true
					}
				});
				endGameAmount.setPosition({
					x: 75, 
					y: 100
				});
			};   
        }
        
        /*
		 *	name:			_setReminder
		 *	description:	sets the reminder symbol
		 *	params:			
		 *	return:			null
		 */
		private _setReminder(): void {
			
			var button = this.getChildByName('endGameButton'),
			    bitmap = button.getBitmap('button');;
			
			// set animation timeline for the play button			
			button.animationTimeLine = new TimelineMax({
				onStartParams:[button],
				onStart: function(button) {	
					button.active = true;			
				},
			 	paused: true,	
				onCompleteParams:[button], 	
				onComplete: function(button) {
					button.active = false;
				}
			});
			
			button.animationTimeLine.to(bitmap, 1, { delay: 4, 
				onStartParams:[button],
					onStart: function(button) {}}, 'start')
					.to(bitmap, 1, { 
						repeat: -1, 
						yoyo: true, 
						scaleX:1.1, 
						scaleY:1.1, 
						repeatDelay: 0.5,
					onStartParams:[button],
					onStart: function(button) {
						button.active = true;
					}}, 'pulse');
					
			this._startReminderSymbol();
		} 
		
		/*
		 *	name:			_startReminderSymbol
		 *	description:	starts the reminder symbol
		 *	params:			
		 *	return:			null
		 */
		private _startReminderSymbol(): void {
				var button = this.getChildByName('endGameButton');
				if(!button.getRevealed()) {	
					button.animationTimeLine.restart();
				}
		}
		
		/*
		 *	name:			_stopReminderSymbol
		 *	description:	stops the reminder symbol
		 *	params:			reset:boolean
		 *	return:			null
		 */
		private _stopReminderSymbol(reset:boolean): void {
				var button = this.getChildByName('endGameButton');
				if(!button.getRevealed()) {
					if(reset) {
						button.animationTimeLine.restart();						
					} else {
						button.animationTimeLine.pause("start");
					}
				}
		}
	}
}