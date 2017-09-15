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

		private _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
		//private _amount = TICKET.getInstance().getOutcome().amount;
        //private _isWinner = Number(TICKET.getInstance().getParams().wT); */

		constructor(_name) {
			super(_name);
			this._endGameLayout();
			this._subscribeEndGame();
		}

		private _subscribeEndGame() {
			IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
		}

		private _endGameLayout() {
			var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier"),
                sound       = '',
				self 		= this;
				
			// background creation
			var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 331,h: 233}, 1, this);
			endGameBackground.addBitmap({
				name: "background",
				pos: {
					x: 165,
					y: 116
				},
				frame: "endgame_box",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			
			// button creation
			var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 182,h: 91}, 1, this);
			endGameButton.addBitmap({
				name: "button",
				pos: {
					x: 91,
					y: 45.5
				},
				frame: "finish",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			endGameButton.setPosition({
				x: 75, 
				y: 170
			});
			endGameButton.setEnabled(false);
            
            endGameButton.addAnimation('rollover');
            endGameButton.addAnimation('rollout');
            
            endGameButton.setAnimation('rollover', 'rollover', 0.2, 0);
            endGameButton.setAnimation('rollout', 'rollout', 0.2, 0);
				
			endGameButton.addAnimation('buttonPress');
            endGameButton.setAnimation('buttonPress', 'buttonPress');
						
			endGameButton.setAction('click', () => {
				endGameButton.setEnabled(false);
				endGameButton.animate('buttonPress');
                CORE.IWG.ame('closeGame');
			});
			
			endGameButton.setAction('rollover', () => {
				endGameButton.getBitmap('button').gotoAndStop('finish_over');
				endGameButton.getStage().update();
                endGameButton.animate('rollover');
                self._stopReminderSymbol(true);
			})
			
			endGameButton.setAction('rollout', () => {
				endGameButton.getBitmap('button').gotoAndStop('finish');
				endGameButton.getStage().update();
                endGameButton.animate('rollout');
                self._stopReminderSymbol(true);
			})
			this._setReminder();
            
			// text createion
            var num = TICKET.getInstance().getOutcome().amount;
			var endTextFrame: string = null,
				endTextPos = {
					x: 0,
					y: 30
				};	
                
			if ( this._wager ){
				if (TICKET.getInstance().getParams().wT === 1) {
					endTextFrame = "end_win";
                    // amount
                    var endGameAmount = new GAMEOBJECT( "endGameAmount", { w: 204, h: 66 }, 1, this );
                        endGameAmount.addBitmap({
                            name: "endPrize",
                            pos: {
                                x: 102,
                                y: 33
                            },
                            frame: "end" + num,
                            spriteSheet: spritesheet,
                            doReg: {
                                center: true
                            }
                        });
                        endGameAmount.setPosition({
                            x: 65, 
                            y: 110
                        });
				} else {
					endTextFrame = "end_lose";
					endTextPos.x = 8;
                    endTextPos.y = 65;
				};
			} else {
				endTextFrame = "end_trial";
				endTextPos.y = 65;
			};
			CORE.IWG.ame('bank', { deposit: [num], log: true });
			var endGameText = new GAMEOBJECT( "endGameText", { w: 324, h: 82 }, 1, this );
			endGameText.addBitmap({
				name: "endText",
				pos: {
					x: 162,
					y: 41
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
        
        private _winSound() {
            if (TICKET.getInstance().getParams().wT === 1){
                createjs.Sound.play('endWin')
            } else {
                createjs.Sound.play('endLose')
            }
        }
		
		/*
		 *	name: 			_showEndGame()
		 *	description:	Bring on the end game
		 *	params:			null
		 *	returns:		null
		 */
		private _showEndGame() {
			var button = this.getChildByName('endGameButton'),
                self   = this;
			TweenMax.to(this.getDiv(), 0.8, {alpha: 1, delay:0.5, x:630, ease:Back.easeOut, onStart:function () {
                self._winSound();  
            }, onComplete:function (){
				button.setEnabled(true)
			} });
		}
	}
}