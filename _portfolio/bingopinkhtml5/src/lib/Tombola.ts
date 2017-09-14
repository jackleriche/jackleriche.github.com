/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
module com.camelot.iwg {

	var CAMELOT: any 	= com.camelot,
        CORE 			= CAMELOT.core,
        IWG 			= CAMELOT.iwg,
		GLOBAL			= IWG.Global,
		GAMEOBJECT 		= IWG.GameObject,
		SPRITESHEETS	= IWG.SpriteSheets;

	export class Tombola extends Scene {	
		
		constructor(_name) {
		
			super(_name);
			this._subscribeTombola();
			
			// setup scene
			this.setDimensions({
				w: 510,
				h: 510
			});
			
			this._setupTombolaLayout();
			this._setupBallLayout();
			this._initTombolaComplete();
			
		};
		
		/*
		 *	name: 			_subscribeTombola
		 *	description:	subscribe event listeners for tombola
		 *	params:			null
		 *	returns:		null
		 */		 
		private _subscribeTombola() {
			IWG.IWGEM.on('ballPop', this._ballPop.bind(this) );
			IWG.IWGEM.on('ballRollOff', this._ballRollOff.bind(this) );
			IWG.IWGEM.on('resetBall', this._resetBall.bind(this) );
		}
		
		/*
		 *	name: 			_unsubscribeTombola
		 *	description:	subscribe event listeners for tombola
		 *	params:			null
		 *	returns:		null
		 */	
		private _unsubscribeTombola() {
			IWG.IWGEM.off('ballPop');
			IWG.IWGEM.off('ballRollOff');
			IWG.IWGEM.off('resetBall');
		}
		
		/*
		 *	name: 			_setupTombolaLayout
		 *	description: 	sets up the tombola layout
		 *	params: 		null
		 *	returns:		null
		 */
		private _setupTombolaLayout() {
			
			var balls = new GAMEOBJECT("balls", { w: 459, h: 459 }, 1, this);
			balls.addBitmap({
				name: "balls",
		        pos: {
		            x: 240,
		            y: 225
		        },
		        frame: "balls-01",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola") ,
		        doReg: {
		            center: true
		        },
				scale: 1.8
			});
			balls.active = true;
			
			var machineGlass = new GAMEOBJECT("machineGlass", { w: 459, h: 459 }, 1, this);
			machineGlass.addBitmap({
				name: "machineGlass",
		        pos: {
		            x: 230,
		            y: 230
		        },
		        frame: "machine-glass",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola") ,
		        doReg: {
		            center: true
		        },
				scale: 1.8
			});
			
			//var exitTubeTop = new GAMEOBJECT("exitTube-bottom", { w: 459, h: 459 }, 1, this);
			machineGlass.addBitmap({
				name: "exitTube-bottom",
		        pos: {
		            x: 230, 
					y: 203
		        },
		        frame: "exitTube-top",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola") ,
		        doReg: {
		            center: true
		        },
				scale: 1.8
			});
			
			// higher z-index to allow for masking of the ballPopup
			//var exitTubeBottom = new GAMEOBJECT("exitTube-top", { w: 459, h: 459 }, 3, this);
			machineGlass.addBitmap({
				name: "exitTube-top",
		        pos: {
		            x: 230,
		            y: 205
		        },
		        frame: "exitTube-bottom",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola") ,
		        doReg: {
		            center: true
		        },
				scale: 1.8
			});
			
			var ballSlide = new GAMEOBJECT("ball-slide", { w: 300, h: 400}, 1, this);
			machineGlass.addBitmap({
				name: "ball-slide",
		        pos: {
		            x: 70,
		            y: 270
		        },
		        frame: "curve-tube",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola") ,
		        doReg: {
		            center: true
		        },
				scale: 1.8
			});
			
			var animation = balls.getBitmap('balls');
			animation.gotoAndPlay('ball-animation');
			
		}
		
		/*
		 *	name: 			_setupBallLayout
		 *	description: 	sets up the tombola ball layout
		 *	params: 		null
		 *	returns:		null
		 */
		private _setupBallLayout() {
			
			var tombollaBall = new GAMEOBJECT("tombolaBall", { w: 117, h: 118 }, 2, this);
			tombollaBall.addBitmap({
				name: "ball-animation",
		        pos: {
		            x: 59,
		            y: 59
		        },
		        frame: "ball_green",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
		        doReg: {
		            center: true
		        },
				scale: 1
			});
			tombollaBall.setScale(0.4, 0.4);
			tombollaBall.setPosition({
				x: 170,
				y: 160
			});
			tombollaBall.setAlpha(0);
            
            var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			var text 		= new createjs.Text("--", "Bold 40px Arial", "black");
			text.textAlign 	= "center";
			text.x 			= 60;
			if (is_firefox) {
                text.y	= 40;
            } else {
                text.y	= 35;   
            }
			 
			tombollaBall.getStage().addChild(text);
			
			// add ball to tombola scene
			this.addChild(tombollaBall);
			
			tombollaBall.addAnimation("ballPop");
			tombollaBall.addAnimation("ballRollOff");
			
			tombollaBall.setAnimation("ballPop", "ballPop");
			
			if (GLOBAL.getInstance().getFromGlobal('method') === "InstantReveal" ) {
				tombollaBall.setAnimation("ballPop", "instantBallPop");	
				tombollaBall.setAnimation("ballRollOff", "instantBallRollOff");	
			} else {
				tombollaBall.setAnimation("ballPop", "ballPop");
				tombollaBall.setAnimation("ballRollOff", "ballRollOff");
			}
			
			
		}
		
		/*
		 *	name: 			_initTombolaComplete
		 *	description: 	called after the tombola has been constructed
		 *	params: 		null
		 *	returns:		null
		 */
		private _initTombolaComplete() {
			console.log('Tombola created');
		}
		
		/*
		 *	name:			_ballPop();
		 *	description:	method to setup the animation for ball popup
		 *	parmas:			ballNumber: number, ballColor: string
		 *	returns:		null
		 */
		private _ballPop(ballNumber) {
			
			var colors = [
				"ball_blue",
				"ball_green",
				"ball_orange",
				"ball_pink",
				"ball_red"
			];
			
			var ballColor 	= colors[Math.floor(Math.random() * colors.length)],
				ball 		= this.getChildByName("tombolaBall");
			
			ball.setTicketLabel(ballNumber);
			GLOBAL.getInstance().addToGlobal('ballNumber', ballNumber);
			
			ball.getStage().children[0].gotoAndStop(ballColor);
			ball.getStage().children[1].text = ballNumber;
			
			ball.animate('ballPop');
			ball.getStage().update();
			
		}
		
		/*
		 *	name:			_ballRollOff();
		 *	description:	method to roll ball off
		 *	parmas:			null
		 *	returns:		null
		 */
		private _ballRollOff() {
			this.getChildByName('tombolaBall').animate('ballRollOff');
		}
		
		/*
		 *	name:			_resetBall();
		 *	description:	reset ball
		 *	parmas:			null
		 *	returns:		null
		 */
		private _resetBall() {
			
			var ball = this.getChildByName('tombolaBall');
			ball.setScale(0.4, 0.4);
			ball.setZindex(2);
			ball.setPosition({
				x: 170,
				y: 160
			});
			ball.setRotation(0);
			ball.setAlpha(0);
			
		}
		
		/*
		 *	name: 			intro()
		 *	description:	animates the tombola in
		 *	params:			delay: number
		 *	returns: 		null
		 */
		public intro(delay: number = 1) : void {			
			TweenMax.to(this.getDiv(), 1, { alpha: 1, delay: delay });
		}
			
	}
}