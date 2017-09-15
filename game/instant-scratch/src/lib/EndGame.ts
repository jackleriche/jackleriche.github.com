/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {
​
	var CAMELOT: any 		= com.camelot,
		CORE 				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
        GAMEOBJECT 			= IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		TICKET 				= IWG.Ticket,
        HELPER 				= IWG.Helper,
		SCENE				= IWG.Scene,
		SPRITESHEETS 		= IWG.SpriteSheets;
​
	export class EndGame extends Scene {
​
		private _wager 	= CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
​		 private _scaled = false;

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
			var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS");
			console.log('end game made')
			// create button
			var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 132,h: 52}, 1, this);
			endGameButton.addBitmap({
				name: "button",
				pos: {
					x: 66,
					y: 26
				},
				frame: "button_finish",
				alpha: 0,
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
            endGameButton.addBitmap({
				name: "button_glow",
				pos: {
					x: 66,
					y: 26
				},
				frame: "button_finish_over",
                alpha: 0,
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			endGameButton.setPosition({
				x: 75, 
				y: 140
			});
			
			endGameButton.setEnabled(false);
            //endGameButton.addAnimation('pulse');
            endGameButton.setReminder(true, 'buttonReminder');
            
            endGameButton.addAnimation('finish');
			endGameButton.setAnimation('finish', 'click', 0.8, 0);
                        
			endGameButton.setAction('click', () => {
				endGameButton.setEnabled(false);
				//CORE.IWG.ame('closeGame');
				top.location.href = "http://sideplay.com/portfolio/game/142/Instant%20Scratch";
                endGameButton.animate('finish');
			});
			
			endGameButton.setAction('rollover', () => {
				endGameButton.getBitmap('button').gotoAndStop('button_finish_over');
				endGameButton.getStage().update();
				//endGameButton.animate('rollover');
				IWG.IWGEM.trigger('stopReminder');
			})
			
			endGameButton.setAction('rollout', () => {
				endGameButton.getBitmap('button').gotoAndStop('button_finish');
				endGameButton.getStage().update();
				//endGameButton.animate('rollout');
				IWG.IWGEM.trigger('restartReminder');
			})
            
			// get prize amount
            var wT  = TICKET.getInstance().getOutcome().wT;
​
			var endTextFrame: string = null,
				endTextPos = {
					x: 24,
					y: 30
				};

			
            // if the ticket is a winner
			if (this._wager){
				if (wT === 1) {					
                    
					endTextFrame = "end_win";
					
				} else {
					
					endTextFrame = "end_lose";
					endTextPos.x = 24;
                    endTextPos.y = 50;
					
				};
			} else {
				
				endTextFrame = "end_trial";
				endTextPos.x = 24;
                endTextPos.y = 50;
				
			};
			
            // create end game message
			if ( this._wager && CORE.IWG.ame('bank', {balance: 'finalAmount', raw: true}) > 0 ) {
				var text = "<p id=\"CONGRATULATIONS\" class=\"green\">CONGRATULATIONS!</p> <p id=\"YOU\" class=\"green\">YOU</p> <p id=\"HAVE\" class=\"green\">HAVE</p> <p id=\"WON\" class=\"green\">WON</p> <p id=\"ENDPRIZE\">" + Helper.numberWithCommas( CORE.IWG.ame('bank', {balance: 'finalAmount', log: true}) ) + "</p>"
			} else if ( this._wager && CORE.IWG.ame('bank', {balance: 'finalAmount', raw: true}) === 0 ) {
				var text = "<p id=\"BETTER\">BETTER</p> <p id=\"LUCK\">LUCK</p> <p id=\"NEXT\">NEXT</p> <p id=\"TIME\">TIME</p>"	
			} else {
				var text = "<p id=\"THANKS\">THANKS</p> <p id=\"FOR\">FOR</p> <p id=\"PLAYING\">PLAYING</p>"
			}
			
			var animationScene = new SCENE('endGameMonitorScene');
            animationScene.setDimensions({
                w: 226,
                h: 182
            });
			animationScene.setPosition({
				x: 26,
				y: 16
			});

            animationScene.setParent(this);
			animationScene.getDiv().innerHTML += text;
			
			if ( this._wager && TICKET.getInstance().getOutcome().amount > 0 ) {
				if ( CORE.IWG.ame('get','IS_IOS') ) {
					TweenLite.set('#CONGRATULATIONS', { x: 5,  y: -100 });	
				} else {
					if (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) !== null) {
						TweenLite.set('#CONGRATULATIONS', { x: 7,  y: -100 });
					} else {
						TweenLite.set('#CONGRATULATIONS', { x: 14,  y: -100 });	
					}
				}				
				TweenLite.set('#YOU', { x: -130,       		y: 50 }); // 43, -20
				TweenLite.set('#HAVE', { x: 85, 			y: -150 }); // 85, -64
				TweenLite.set('#WON', { x: 400,     		y: 50 }); // 
				TweenLite.set('#ENDPRIZE', { x: 0,    		y: -100 }); // 11 , -147
			} else if ( this._wager && TICKET.getInstance().getOutcome().amount === 0 ) {
				TweenLite.set('#BETTER', { x: -140, y: 20 }); // 24, 0
				TweenLite.set('#LUCK', { x: 400, 	y: 20 }); // 135, -44
				TweenLite.set('#NEXT', { x: -140, 	y: 50 }); // 50, -83
				TweenLite.set('#TIME', { x: 400,    y: 50 }); // 120, -138
				// TweenLite.set('#TIME', { x: 400,    y: -108 }); // 120, -138
			} else {
				TweenLite.set('#THANKS', { x: 30,  	y: -150 }); //30, 10
				TweenLite.set('#FOR', { x: 400,   	y: 20 }); // 145, -45
				TweenLite.set('#PLAYING', { x: -140,y: 50 }); // 85, -64
			}
			
		} // end layout
        
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
			
			var delay = 1;
			if ( CORE.IWG.ame('bank', {balance: 'finalAmount', raw: true}) > 0 ) {
				delay = 3;
			}
			
			// create timeline
			var timeline = new TimelineMax({
				paused: true, delay: delay
			});	
			
			// set variables for elements needed
			var button                 	= this.getChildByName('endGameButton'),
				gameScene 			   	= HELPER.getScene('mainGame').getDiv(),
				overlay 			   	= HELPER.getGameObject('overlay'),
				gameScale 			   	= HELPER.getGameObject('bg_scale');
				button.active 			= true;
			
			
			// set z indexes 
			this.setZindex('9');
			overlay.setZindex('11');

			// scale down the game and move it right, bring on the overlay and winning message
			timeline.to(gameScene,    			0.5, {scaleX: 0.445, scaleY: 0.445, x: 199}, 	   'stage1')
			// timeline.to(instructions.getBitmap('splashInstructions'), 0.5, {alpha: 0}, 'stage1')			
			timeline.to(overlay.getCanvas(), 	0.5, {alpha: 0.8}, 'stage1')
			// win
			if ( this._wager && TICKET.getInstance().getOutcome().amount > 0 ) {
				
				timeline.to('#CONGRATULATIONS', 0.25, { y: 20})
						.to('#YOU', 0.25, { x: 38 }) // 43, -20
            			.to('#HAVE', 0.25, { y: 50 }) // 85, -64
            			.to('#WON', 0.25, { x: 142 }) // 
            			.to('#ENDPRIZE', 0.25, { y: 75, onStart: () => {
							this._winSound();				
						}  }); // 11 , -147
			}
			// lose
			if ( this._wager && TICKET.getInstance().getOutcome().amount === 0 ) {
				
				timeline.to('#BETTER', 0.25, { x: 27.5, onStart: () => {
							this._winSound();
						} }) // 24, 0
						.to('#LUCK', 0.25, { x: 135 }) // 135, -44
						.to('#NEXT', 0.25, { x: 50 }) // 50, -83
						.to('#TIME', 0.25, { x: 125 }) // 120, -138
						
				button.setPosition({
					y: 120
				})
			}
			// trial
			if ( !this._wager ) {
				
				timeline.to('#THANKS', 0.25, { y: 20, onStart: () => {
							this._winSound();
						} }) //30, 10
						.to('#FOR', 0.25, { x: 145 }) // 145, -45
						.to('#PLAYING', 0.25, { x: 64 }) // 85, -64
						
				button.setPosition({
					y: 120
				})						
				
			}		
			timeline.to(button.getBitmap('button'), 0.5, {delay: 1, alpha: 1, onComplete: () => {
				button.setEnabled(true);
				button.animate('reminder1');
				gameScale.setZindex('11');
				gameScale.setEnabled(true);
				this._scaled = true;
			}}, 'stage3');
			
			timeline.play();
			
			gameScale.setAction('click', () => {
				this._scaleGame();	
			});
			
		} // end showEndGame
		
		private _scaleGame(): void {
			var gameScale = HELPER.getGameObject('bg_scale'),
				gameScene = HELPER.getScene('mainGame').getDiv();
			
			if (this._scaled) {
				gameScale.setEnabled(false);
				TweenMax.to(gameScene, 0.5, {scaleX: 1, scaleY: 1, x: 0, onComplete: () => {
					this._scaled = false;
					gameScale.setEnabled(true);
				}})
			} else {
				gameScale.setEnabled(false);
				TweenMax.to(gameScene, 0.5, {scaleX: 0.445, scaleY: 0.445, x: 199, onComplete: () => {
					this._scaled = true;
					gameScale.setEnabled(true);
				}})
			}
			
		}
		
	}
	
}