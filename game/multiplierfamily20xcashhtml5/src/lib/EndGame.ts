/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {
​
	var CAMELOT: any = com.camelot,
		CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		TICKET = IWG.Ticket,
        HELPER = IWG.Helper,
		SPRITESHEETS = IWG.SpriteSheets;
​
	export class EndGame extends Scene {
​
		private _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
​
		constructor(_name) {
			super(_name);
			this._endGameLayout();
			this._subscribeEndGame();
		}
​
		private _subscribeEndGame() {
			IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
		}
​
		private _endGameLayout() {
			var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSS");
				
			// create Background
			var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 696,h: 370}, 1, this);
			
            endGameBackground.addBitmap({
				name: "background",
				pos: {
					x: 348,
					y: 150
				},
				frame: "panel",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				},
                scale: {
                    x: 0.8,
                    y: 0.8
                }
			});
            endGameBackground.setPosition({
                y: -200
            })
			
			// create button
			var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 190,h: 100}, 1, this);
			endGameButton.addBitmap({
				name: "button",
				pos: {
					x: 95,
					y: 50
				},
				frame: "button_finish",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
            endGameButton.addBitmap({
				name: "button_glow",
				pos: {
					x: 95,
					y: 50
				},
				frame: "button_finish_over",
                alpha: 0,
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			endGameButton.setPosition({
				x: 348 - 95, 
				y: 50
			});
			endGameButton.setEnabled(false);
            endGameButton.addAnimation('pulse');
            endGameButton.setAnimation('pulse', 'buttonReminder', 0.5, 4);
            
            endGameButton.addAnimation('finish');
			endGameButton.setAnimation('finish', 'click', 0.8, 0);
                        
			endGameButton.setAction('click', () => {
				endGameButton.setEnabled(false);
                endGameButton.animate('finish');
                CORE.IWG.ame('closeGame');
			});
			
			endGameButton.setAction('rollover', () => {
				endGameButton.getBitmap('button').gotoAndStop('button_finish_over');
				endGameButton.getStage().update();
			})
			
			endGameButton.setAction('rollout', () => {
				endGameButton.getBitmap('button').gotoAndStop('button_finish');
				endGameButton.getStage().update();
			})
            
			// get prize amount
            var num = TICKET.getInstance().getOutcome().amount,
                wT  = TICKET.getInstance().getOutcome().wT;
​
			var endTextFrame: string = null,
                offset = 0,
				endTextPos = {
					x: 0,
					y: 20
				},
                endAmountPos = {
                    x: 500,
                    y: 20
                };	

            // setting the offset for the message and prize    
            if (num === 5) {
                offset = 75;
            } else if ((num => 10) && (num <= 99)) {
                offset = 60;
            } else if ((num => 100) && (num <= 999)) {
                offset = 55;
            } else if ((num => 1000) && (num <= 49999)) {
                offset = 45;
            } else if (num === 50000) {
                offset = 30;
            } else if (num === 1000000) {
                offset = 10;
            } else {
                offset = 0;
            }
            if (!this._wager){
                offset = 80;
            }
            // if the ticket is a winner
			if (this._wager){
				if (wT === 1) {
                    // create prize amount
                    var endGameAmount = new GAMEOBJECT( "endGameAmount", { w: 173, h: 40 }, 1, this );
                        endGameAmount.addBitmap({
                            name: "endPrize",
                            pos: {
                                x: 86,
                                y: 20
                            },
                            frame: "end" + num,
                            spriteSheet: spritesheet,
                            doReg: {
                                center: true
                            }
                        });
                        endGameAmount.setPosition({
                            x: endAmountPos.x + offset, 
                            y: endAmountPos.y
                        });
                        endTextFrame = "end_win";
				} else {
					endTextFrame = "end_lose";
					endTextPos.x = 30;
                    endTextPos.y = 15;
				};
			} else {
				endTextFrame = "end_trial";
				endTextPos.x = 8;
                endTextPos.y = 15;
			};
            
            // create end game message
			var endGameText = new GAMEOBJECT( "endGameText", { w: 520, h: 40 }, 1, this );
			endGameText.addBitmap({
				name: "endText",
				pos: {
					x: 260,
					y: 20
				},
				frame: endTextFrame,
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			endGameText.setPosition({
				x: endTextPos.x + offset, 
				y: endTextPos.y
			});
		} // end layout
        
        /*
		 *	name: 			_checkEndBalance()
		 *	description:	check the balance before end game shows
		 *	params:			null
		 *	returns:		null
		 */
		private _checkEndBalance():void {
           CORE.IWG.ame('bank', {balance: 'finalAmount', log: true});
        }
        
        /*
		 *	name:			_winSound()
		 *	description:	selects which sound to play on the end game
		 *	params:			null
		 *	return:			null
		 */
        private _winSound() {
            if (TICKET.getInstance().getOutcome().wT === 1){
                createjs.Sound.play('endWin')
            } else {
                createjs.Sound.play('endLose')
            }
        } // end winSound
		
		/*
		 *	name: 			_showEndGame()
		 *	description:	bring on the end game
		 *	params:			null
		 *	returns:		null
		 */
		private _showEndGame() {
			var button = this.getChildByName('endGameButton'),
                self   = this,
                logo   = HELPER.getGameObject('logoGame');
                logo.active = true;
			TweenMax.to(this.getDiv(), 1, {alpha: 1, delay: 5, y: -10, ease: Bounce.easeOut, onStart:function () {
                self._winSound();
                self.setZindex('11');
                TweenMax.to( HELPER.getGameObject('shinerBrand0').getCanvas(), 1, { alpha: 0} );
                TweenMax.to( HELPER.getGameObject('shinerBrand1').getCanvas(), 1, { alpha: 0} );
                TweenMax.to( HELPER.getGameObject('shinerBrand2').getCanvas(), 1, { alpha: 0} );
                TweenMax.to( HELPER.getGameObject('shinerBrand3').getCanvas(), 1, { alpha: 0} );
                TweenMax.to( HELPER.getGameObject('shinerBrand4').getCanvas(), 1, { alpha: 0} );
                TweenMax.to(logo.getCanvas(), 0.5, {alpha: 0});
                // check the final balance
                self._checkEndBalance();
            }, onComplete:function (){
				button.setEnabled(true);
                button.animate('pulse');
			} });
		} // end showEndGame
	}
}