/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Helper.ts" />

module com.camelot.iwg {

	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
		HELPER				= IWG.Helper,
        GAMEOBJECT 			= IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class Splash extends Scene {
		private _buttonArray = [];
		constructor(_name) {
			super(_name);	
			this._initSplash();
			this._subscribeSplash();
			 	
		}
		
		private _subscribeSplash(): void {
		
			IWG.IWGEM.on('chooseNumbersPress', this._chooseNumberButtonPress.bind(this) );
			IWG.IWGEM.on('luckyDipPress', this._luckyDipButtonPress.bind(this) );
			IWG.IWGEM.on('splashOff', this._splashOff.bind(this) );
						
		}
		
		private _unsubscribeSplash(): void {
			IWG.IWGEM.off('chooseNumbersPress');
			IWG.IWGEM.off('luckyDipPress');
			IWG.IWGEM.off('splashOff');
		}
		
		private _initSplash() {
			var self = this;
			var logo: GameObject = new GAMEOBJECT('logo', {w: 304, h: 315}, 2, this );
			logo.addBitmap({
				name: "logo",
				pos: {
					x: 151,
					y: 157.5
				},
				frame: "logo_large",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			logo.setPosition({
				x: Math.round(480 - 151),
				y: 10
			});
			
			var winUpTo: GameObject = new GAMEOBJECT('winUpTo', {w: 215, h: 61}, 2, this );
			winUpTo.addBitmap({
				name: "winUpTo",
				pos: {
					x: 107.5,
					y: 30.5
				},
				frame: "winupto",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			winUpTo.setPosition({
				x: Math.round(480 - 107.5),
				y: 325
			});
			
			var chooseNumbers: ClickableGameObject = new CLICKABLEGAMEOBJECT('chooseNumbers', {w: 274, h: 120}, 2, this );
			chooseNumbers.addBitmap({
				name: "chooseNumbers",
				pos: {
					x: 137,
					y: 60
				},
				frame: "bg_button_choose",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			chooseNumbers.addBitmap({
				name: "chooseNumbersText",
				pos: {
					x: 137,
					y: 60
				},
				frame: "chooseyournumbers",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			chooseNumbers.setPosition({
				x: Math.round(320 - 137),
				y: 400
			});	
			
			// chooseNumbers animations
			chooseNumbers.setAnimation( 'reminder', 'pulse', 1, 4 );	
			chooseNumbers.animate( 'reminder' );
			
			chooseNumbers.addAnimation('press');
			chooseNumbers.setAnimation( 'press', 'press', 0.2, 0, "chooseNumbersPress" );
			
			// chooseNumbers actions
			chooseNumbers.setEnabled(true);
			chooseNumbers.setAction('click', function(chooseNumbers) {
				chooseNumbers.animate('press');
                createjs.Sound.play("startScreen");
				GLOBAL.getInstance().addToGlobal('selectionMethod', "choose");	
                chooseNumbers.setEnabled(false);
                self._stopReminderSymbol(true, chooseNumbers);
			}.bind(null, chooseNumbers) );
			
			chooseNumbers.setAction('rollover', function() {
				self._stopReminderSymbol(true, chooseNumbers);
			});
			chooseNumbers.setAction('rollout', function() {
				self._stopReminderSymbol(false, chooseNumbers);
			});
			
			var luckyDip: ClickableGameObject = new CLICKABLEGAMEOBJECT('luckyDip', {w: 274, h: 120}, 2, this );
			luckyDip.addBitmap({
				name: "luckyDip",
				pos: {
					x: 137,
					y: 60
				},
				frame: "bg_button_choose",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			luckyDip.addBitmap({
				name: "luckyDipText",
				pos: {
					x: 137,
					y: 60
				},
				frame: "orselectluckydip",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			luckyDip.setPosition({
				x: Math.round(650 - 137),
				y: 400
			});
			
			// luckyDip animations
			luckyDip.setAnimation('reminder', 'pulse', 1, 4);
			luckyDip.animate('reminder');
			luckyDip.addAnimation('press');
			luckyDip.setAnimation( 'press', 'press', 0.2, 0, "luckyDipPress" );
			
			// luckyDip actions
			luckyDip.setEnabled(true);
			luckyDip.setAction('click', function(luckyDip) {
				luckyDip.animate('press');
                createjs.Sound.play("startScreen");
				GLOBAL.getInstance().addToGlobal('selectionMethod', "luckyDip");
                luckyDip.setEnabled(false);
			}.bind(null, luckyDip) );
            
            luckyDip.setAction('rollover', function() {
				self._stopReminderSymbol(true, luckyDip);
			});
			luckyDip.setAction('rollout', function() {
				self._stopReminderSymbol(false, luckyDip);
			});
			this._buttonArray.push(chooseNumbers, luckyDip);
			
            var pinkCirclePos : Array<any> = [
                [335,255],
                [550,250]  
            ];
            
            var circlePos : Array<any> = [
                [350,60],
                [500,90]  
            ];
                 
            for (var i = 0; i < 2; i++) {
                var circlePink: GameObject = new GAMEOBJECT('circlePink'+i, {w: 46, h: 47}, 2, this );
                circlePink.addBitmap({
                    name: "circlePink",
                    pos: {
                        x: 23,
                        y: 23.5
                    },
                    frame: "logo_small_circle1",
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                circlePink.setPosition({
                    x: pinkCirclePos[i][0],
                    y: pinkCirclePos[i][1]
                });
                circlePink.addAnimation('pinkFloat');
                circlePink.setAnimation('pinkFloat', 'float', HELPER.getRandomNumber(3, 8) , 1);	
                circlePink.animate('pinkFloat');
                
                var circleRed: GameObject = new GAMEOBJECT('circleRed'+i, {w: 47, h: 47}, 2, this );
                circleRed.addBitmap({
                    name: "circleRed",
                    pos: {
                        x: 23.5,
                        y: 23.5
                    },
                    frame: "logo_small_circle2",
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                circleRed.setPosition({
                    x: circlePos[i][0],
                    y: circlePos[i][1]
                });
                
                circleRed.addAnimation('redFloat');
                circleRed.setAnimation('redFloat', 'float', HELPER.getRandomNumber(3, 8) , 0.7);	
                circleRed.animate('redFloat');
            }
            
            
			var blobConfig : Array<any> = [
				[80, 50, 65, "ED0000"],
				[30, 370, 45, "FF0080"],
				[70, 260, 90, "FF0041"],				
				[710, 80, 30, "FF0080"],
				[720, 90, 70, "BB0000"],
				[775, 280, 40, "FF0041"],				
				[750, 420, 30, "ED0000"],
				[755, 450, 75, "FF0080"],
			];
			
			for (var i  = 0; i < blobConfig.length; i++) {
				
				var blob = blobConfig[i];
				
				var gameObject = new GameObject( 'blob' + i, { w: blob[2] * 2, h: blob[2] * 2 }, 1, this );
				gameObject.setPosition({
					x: blob[0],
					y: blob[1]
				});
				
				var circle = new createjs.Shape();
    			circle.graphics.beginFill("#"+blob[3]).drawCircle(0, 0, blob[2]);
				
				circle.x = blob[2];
				circle.y = blob[2];

				
				gameObject.getStage().addChild(circle);
				gameObject.getStage().update();
				
				gameObject.addAnimation('float');
				gameObject.setAnimation('float', 'float', HELPER.getRandomNumber(3, 8) , 1);
				
				gameObject.animate('float');
				
			}
			
				
		} // end initSplash
		
		/*
		 *	name:			_choosenumberButtonPress
		 *	description:	called when _chooseNumberButtonPress
		 *	params:			null
		 * 	returns:		null	
		 */
		private _chooseNumberButtonPress(h):void {
			this._buttonPress('chooseNumber');
		}
		
		/*
		 *	name:			_luckyDipButtonPress
		 *	description:	called when either button is pressed to reset and kill the reminder animation
		 *	params:			null
		 * 	returns:		null	
		 */
		private _luckyDipButtonPress(h):void {
			this._buttonPress('luckyDip');
		}
		
		
		/*
		 *	name:			_buttonPress
		 *	description:	called when either button is pressed to reset and kill the reminder animation
		 *	params:			type: string
		 * 	returns:		null	
		 */
		private _buttonPress(type: string):void {
			
			// get both splash buttons
			var chooseButton 	= this.getChildByName('chooseNumbers'),
				luckyButton		= this.getChildByName('luckyDip');
				
			// reset and kill animation forom splash buttons 
			chooseButton.animationTimeLine.kill();
			luckyButton.animationTimeLine.kill();
			
			chooseButton.scaleX = chooseButton.scaleY = 1;
			luckyButton.scaleX = luckyButton.scaleY = 1;
			
			TweenMax.set(chooseButton.getCanvas(), { scaleX: 1, scaleY: 1});
			TweenMax.set(luckyButton.getCanvas(), { scaleX: 1, scaleY: 1});
			
			IWG.IWGEM.trigger('splashOff', [type]);
			
		}
		
		/*
		 *	name:			_splashOff
		 *	description:	animate the splash screen off
		 *	params:			type: string
		 * 	returns:		null	
		 */
		private _splashOff(type): void {
            TweenMax.to(this.getDiv(), 1, {alpha: 0, delay: 0.5, onComplete: () => {
                if (type === "chooseNumber") {
					IWG.IWGEM.trigger('splashEnd');
				} else {
					IWG.IWGEM.trigger('noSelect');
				}
                this.destroy();
            }});
		}
		
       /*
        *	name:		    _stopReminderSymbol
        *	description:	stops the reminder symbol
        *	params:		    reset:boolean
        *	return:		    null
        */
        private _stopReminderSymbol(reset:boolean, turn:any): void {
            for (var i = 0; i < this._buttonArray.length; i++) {
                   var turns = this._buttonArray[i];
                   if(!turns.getRevealed()) {
                        if(reset) {
                            turns.animationTimeLine.seek(0);
                            turns.animationTimeLine.kill();					
                        } else {
                            turns.animationTimeLine.restart();
                        }
                    }
               }
        }
		
	}
}