/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Pin.ts" />
/// <reference path="Helper.ts" />
/// <reference path="Legend.ts" />
module com.camelot.iwg {
	
	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
		HELPER				= IWG.Helper,
        GAMEOBJECT 			= IWG.GameObject,
		LEGEND				= IWG.Legend,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class BallBank extends Scene {
		
		private _balls: Array<GameObject> = [];
        private _pointer: number = 0;
		
		constructor(_name) {
			super(_name);
			
			this._subscribeBallBank();
            
            // sort the global array
            var array = GLOBAL.getInstance().getFromGlobal('ballSelection');
            Helper.sortArray( array );
				
			this._setupLayout();
            
            GLOBAL.getInstance().addToGlobal('ballBank', this);
            this._boardOn();
		}
		
		/*
		 *	name:			_subscribeBallBank();
		 *	description:	setup listeners for ball bank
		 *	params:			null
		 *	returns:		null
		 */
		private _subscribeBallBank() {
			IWG.IWGEM.on( 'initBallTurn', this._removeBall.bind(this) );
			IWG.IWGEM.on( 'addBall', this._addBall.bind(this) );
            IWG.IWGEM.on( 'checkEndGame', this._checkBalls.bind(this) );
            IWG.IWGEM.on( 'staggerBalls', this._staggerBalls.bind(this) );
		};
		
		/*
		 *	name:			_unsubscribeBallBank();
		 *	description:	remove listeners for ball bank
		 *	params:			null
		 *	returns:		null
		 */
		private _unsubscribeBallBank() {
			IWG.IWGEM.off( 'initBallTurn' );
			IWG.IWGEM.off( 'addBall' );
		};
		
		
		
		/*
		 *	name:			_setupLayout()
		 *	description:	setup the ball bank layout
		 *	params:			null
		 *	returns: 		null
		 */
		private _setupLayout() {
			
			var yourBallsText = new GAMEOBJECT('yourBallsText', { w: 180, h: 16}, 3, this);
            yourBallsText.addBitmap({
                name: "yourBallsText",
                pos: {
                    x: 90,
                    y: 8
                },
                frame: "yournumbers",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            yourBallsText.setPosition({
                x: 60,
                y: 5
            });

			for ( let i = 0; i < GLOBAL.getInstance().getFromGlobal("ballSelection").length; i++ ) {
				
				var ball = new GAMEOBJECT("ballNumber" + i, {w: 44, h: 55}, 3, this);
				var ballNumber = GLOBAL.getInstance().getFromGlobal('ballSelection')[i];
                ball.setTicketLabel(ballNumber);
				// shadow
				ball.addBitmap({
					name: "shadow",
					pos: {
						x: 22,
						y: 48
					},
					frame: "ball_shadow",
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					}
				});
				// ball
				ball.addBitmap({
					name: "ballGrey",
					pos: {
						x: 22,
						y: 22
					},
					frame: "ball_grey",
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					}
				});
				
				ball.addBitmap({
					name: "ball",
					pos: {
						x: 22,
						y: 22
					},
					frame: "ball" + ballNumber,
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					},
                    scale: 0
				});
                
                ball.addAnimation('show');
                ball.setAnimation('show', 'ballShow', 0.5, (0.2 * i) );
                
				ball.setPosition({
					x: 20 + ( 44 * i),
					y: 30
				});			
				
				this._balls.push(ball);
                
                ball.getStage().update();
				
			} // end for loop
			
		} // end _setupLayout()
		
		/*
		 *	name:			_removeBall()
		 *	description:	remove a ball from the audit
		 *	params:			null
		 *	returns: 		null
		 */
		private _removeBall() {
				
			// get the first ball from the audit
			var gameObject 	= this._balls[this._pointer],
				ball 		= gameObject.getBitmap('ball'),
				shadow 		= gameObject.getBitmap('shadow');
			
			TweenMax.to(ball, 1, {
				onStart: () => {
					gameObject.active = true;
				}, scaleX: 0, scaleY: 0, ease: Bounce.easeOut,
				onComplete: () => {
					gameObject.active = false;
				}
			});
			
			TweenMax.to(shadow, 1, {
				onStart: () => {
					gameObject.active = true;
				}, alpha: 0,
				onComplete: () => {
					gameObject.active = false;
				}
			});	
            
            this._pointer++;		
				
		}
		
		
		/*
		 *	name:			_addball()
		 *	description:	add ball from the audit
		 *	params:			ballNumber: any
		 *	returns: 		null
		 */
		private _addBall( ballNumber: any ) {
            
            var n = ballNumber;
            if ( ballNumber === "random" ) {
                n = this._selectRandomNumber();
            }
            
			// get the first ball from the audit
			var ball        = this._balls[this._pointer-1],
				ballGfx     = ball.getBitmap('ball'),
			    shadow 		= ball.getBitmap('shadow');
            
            // set ticketLabel to ballNumber
            ball.setTicketLabel(n);
            
            ballGfx.gotoAndStop('ball'+n);
            ball.getStage().update();
			
			TweenMax.to(ballGfx, 1, {
				onStart: () => {
					ball.active = true;
				}, scaleX: 1, scaleY: 1, ease: Bounce.easeOut,
				onComplete: () => {
					ball.active = false;
				}
			});
			
			TweenMax.to(shadow, 1, {
				onStart: () => {
					ball.active = true;
				}, alpha: 1,
				onComplete: () => {
					ball.active = false;
				}
			});	
            
            this._pointer--;
				
		} // end _addBalls()
        
        /*
		 *	name:			_checkBalls()
		 *	description:	check amount of balls for endGame
		 *	params:			num : number
		 *	returns: 		null
		 */
		private _checkBalls() { 
            
            if ( this._pointer === 6) {
                IWG.IWGEM.trigger('showEndGame');
            } else {
                IWG.IWGEM.trigger('fadeOnChoose')
            }
            
        }
        
        public getNextBall() {
            return this._balls[this._pointer];
        }
        
        private _selectRandomNumber() {
            
            var number = Math.round(Helper.getRandomNumber(1, 59) );
            for ( var i = 0; i < this._balls.length; i++ ){
                
                var ball = this._balls[i];
                
                if ( ball.getTicketLabel() === number ) {
                    this._selectRandomNumber();
                    return
                }
                
            }
            
            return number;            
            
        }
        
        /*
        *	name:			_boardOn
        *	description:	animate the board on
        * 	returns:		null	
        */
		private _boardOn(): void {
            TweenMax.to(this.getDiv(), 0.5, {alpha: 1, delay: 1, onComplete: () => {
                IWG.IWGEM.trigger('staggerBalls');
            }});
		}
        
        /*
         *  name:           _staggerBalls()
         *  description:    stagger the balls on with a animation
         *  params:         null
         *  returns:        null
         */
        private _staggerBalls() {
             
            for ( var i = 0; i < this._balls.length; i++ ){    
                this._balls[i].animate('show');
            }
            
            TweenMax.delayedCall(3, function() {
                IWG.IWGEM.trigger('showInstructions');
                IWG.IWGEM.trigger("ballShowDone");
                IWG.IWGEM.trigger('fadeOnChoose')
            });
            
        }
		
	}
	
}