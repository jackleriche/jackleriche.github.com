/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
module com.camelot.iwg {

	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
        GAMEOBJECT 			= IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class Splash extends Scene {
		
		constructor(_name) {
			super(_name);	
			this._initSplash();
			this._subscribeSplash();
			 	
		}
		
		private _subscribeSplash(): void {
			IWG.IWGEM.on("splashOut", this._splashOut.bind(this));
		}
		
		private _unsubscribeSplash(): void {
			IWG.IWGEM.off("splashOut");
		}
		
		private _initSplash(): void {
			
			var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier"),
				self 		= this;
			
			// splash logo
			var splashLogo = new GAMEOBJECT( "logo", { w: 544, h: 210 }, 6, this);
			splashLogo.addBitmap({
				name: "logo",
				pos: {
					x: 272,
					y: 105
				},
				frame: "logo",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			splashLogo.setPosition({
				x: 480 - 272,
				y: 30 
			})
			
			// win up to
			var winupto = new GAMEOBJECT( "winupto", { w: 348, h: 72 }, 6, this);
			winupto.addBitmap({
				name: "winupto",
				pos: {
					x: 174,
					y: 36
				},
				frame: "win_up_to",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			winupto.setPosition({
				x: 480 - 174,
				y: 240
			});
			
			// instructions
			var instructions = new GAMEOBJECT( "splash_instructions", { w: 395, h: 115 }, 6, this);
			instructions.addBitmap({
				name: "instructions",
				pos: {
					x: 197.5,
					y: 57.5
				},
				frame: "splash_instructions",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			instructions.setPosition({
				x: 480 - 197.5,
				y: 340 
			});
			
			// play button
			var playButton = new CLICKABLEGAMEOBJECT( "play_button", { w: 182, h: 91 }, 6, this);
			playButton.addBitmap({
				name: "playButton",
				pos: {
					x: 91,
					y: 45.5
				},
				frame: "play",
				spriteSheet: spritesheet,
				doReg: {
					center: true
				}
			});
			playButton.setPosition({
				x: 480 - 91,
				y: 480 
			});
			playButton.setEnabled(true);
            playButton.addAnimation('rollover');
            playButton.addAnimation('rollout');
            
            playButton.setAnimation('rollover', 'rollover', 0.2, 0);
            playButton.setAnimation('rollout', 'rollout', 0.2, 0);
			
			playButton.setAction('click', function(playButton) {
				playButton.getBitmap('playButton').gotoAndStop('play');
				self._stopReminderSymbol(true);
				playButton.animate('buttonPress');
                createjs.Sound.play('startButton');
				IWG.IWGEM.trigger("splashOut");
			}.bind(null, playButton));
			
			playButton.setAction('rollover', function(playButton) {
				playButton.getBitmap('playButton').gotoAndStop('play_over');
                playButton.getStage().update();
                playButton.animate('rollover');
				self._stopReminderSymbol(true);
			}.bind(null, playButton));
                        
			playButton.setAction('rollout', function(playButton) {
				playButton.getBitmap('playButton').gotoAndStop('play');
                playButton.getStage().update();
                playButton.animate('rollout');
				self._stopReminderSymbol(true);
			}.bind(null, playButton));
			
			playButton.addAnimation('buttonPress');
			playButton.setAnimation('buttonPress', 'buttonPress');
			
			// Setting the play button reminder
			this._setReminder();
		} 
		
		/*
		 *	name:			_setReminder
		 *	description:	sets the reminder symbol
		 *	params:			
		 *	return:			null
		 */
		private _setReminder(): void {
			
			var button = this.getChildByName('play_button'),
			    bitmap = button.getBitmap('playButton');;
			
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
				var button = this.getChildByName('play_button');
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
				var button = this.getChildByName('play_button');
				if(!button.getRevealed()) {
					if(reset) {
						button.animationTimeLine.restart();						
					} else {
						button.animationTimeLine.pause("start");
					}
				}
		}
		
		/*
		 *	name:			_splashOut
		 *	description:	gently fades off the splash then destroys the scene
		 *	params:			null
		 * 	returns:		null
		 */
		private _splashOut(): void {
			var stageArray = [];
			var timeline = new TimelineMax({
                paused: true,
                onStart: () => {   
                    TweenMax.delayedCall(1, () => {
                        IWG.IWGEM.trigger('mainGameIntro');  
                    }) 
                }
            })
            
			for (var i = 0; i < this.getChildren().length; i++) {
				stageArray.push(this.getChildren()[i].getCanvas());
			}
		
			timeline.add(TweenMax.staggerTo(stageArray, 1, {x: -1000}, 0.3, () => {
				this.destroy()
			}));
            timeline.play()
					
		}
	
	}
}