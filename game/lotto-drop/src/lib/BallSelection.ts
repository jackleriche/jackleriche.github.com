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

	export class BallSelection extends Scene {
	
		private _numberSelected: number       = 0;	
        private _ballArray: Array<any>        = [];	
		private _selectedBalls: Array<any>    = [];
        private _button: GameObject           = null;
        private _reminder: TimelineMax        = null;
		
		constructor(_name) {
			super(_name);	
			this._subscribeBallSelector();
			GLOBAL.getInstance().addToGlobal('maxSelected', false);	
            this._initBallSelection();
            
            this.setAlpha(0);
            
		}
		
		/*
		 *	name: 			_subscribeBallSelector()
		 *	description:	turn on 
		 *
		 *
		 */
		private _subscribeBallSelector() {
			IWG.IWGEM.on('splashEnd', this._chooseBalls.bind(this) );
			IWG.IWGEM.on('noSelect', this._noSelect.bind(this) );
			
			IWG.IWGEM.on('ballSelected', this._ballSelected.bind(this) );
			//IWG.IWGEM.trigger('removeBallSelection', this._ballDeselected.bind(this) );
            
            IWG.IWGEM.on('maxSelected', this._maxSelected.bind(this) );
			IWG.IWGEM.on('ballSelectionOff', this._ballSelectionOff.bind(this) );
            
            
		}
        
        /*
		 *	name: 			_chooseBalls()
		 *	description:	create main layout 
		 *	params:			null
		 *	returns:		null
		 */
		private _chooseBalls() {
            
            this.setAlpha(1, 3);
            
            this.getChildByName('selectedBalls').setEnabled(true);
            this.getChildByName('balls').setEnabled(true);
            
        }
		
		/*
		 *	name: 			_initBallSelection()
		 *	description:	create main layout 
		 *	params:			null
		 *	returns:		null
		 */
		private _noSelect() {
            
            this.setAlpha(1, 3);
            this._reminder.kill();
			// chuck in 6 randoms
            var balls = [];
            for ( var i = 1; i < 59; i++ ) {
                balls.push(i);
            };
            
            // shuffle
            Helper.shuffleArray(balls);
            
            // select first 6
            var selectedBalls : Array<number> = [];
            var stage = this.getChildByName('balls'); 
            
            for ( let i = 0; i < 6; i++ ){
                var ball = balls.shift();
                selectedBalls.push(ball);
                
                // animate ball
                TweenMax.delayedCall( 0.7 + i, function(ball) {
                    createjs.Sound.play("chooseBall");
                    IWG.IWGEM.trigger('ballSelected', [ stage.getBitmap("ball"+ball)]) 
                }, [ball]);
                
            }
            // add random balls into global array
            GLOBAL.getInstance().addToGlobal('ballSelection', selectedBalls);
            
            this._button.destroy();
            
            // trigger the ball selection off	
		    TweenMax.delayedCall(9, function() {
                IWG.IWGEM.trigger('ballSelectionOff');
            });
			
		}
		
		/*
		 *	name: 			_initBallSelection()
		 *	description:	create main layout 
		 *	params:			null
		 *	returns:		null
		 */
		private _initBallSelection() {
			
			var selectedBalls: ClickableGameObject 	= new CLICKABLEGAMEOBJECT('selectedBalls', {w: 500, h: 100}, 2, this),
				balls: ClickableGameObject	 		= new CLICKABLEGAMEOBJECT('balls', {w: 800, h: 470}, 2, this );				
			
            selectedBalls.active    = true;
            balls.active            = true;
            
			//selectedBalls.setEnabled(true);
			//balls.setEnabled(true);
			
			selectedBalls.setPosition({
				x: 220,
				y: 20
			});
			balls.setPosition({
				x: 80,
				y: 130
			});
			
			this._setupSelectionBalls();
			this._setupBalls();
			
			//this.setAlpha(1, 3);
			
		}
		
		/*
		 *	name: 			_setupSelectionBalls()
		 *	description:	create main layout 
		 *	params:			null
		 *	returns:		null
		 */
		private _setupSelectionBalls() {
			
			var stage = this.getChildByName('selectedBalls');
			
			stage.addBitmap({
				name: "yourNumbers",
				pos: {
					x: 250,
					y: 10
				},
				frame: "yournumbers",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			
			// loop through balls
			for (var i = 0; i < 6; i++) {
				
				stage.addBitmap({
					name: "shadow-" + i,
					pos: {
						x: 130 + ( 50 * i ),
						y: 82
					},
					frame: "ball_shadow",
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					}
				});
				
				stage.addBitmap({
					name: "blank-" + i,
					pos: {
						x: 130 + ( 50 * i ),
						y: 60
					},
					frame: "ball_grey",
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					}
				});
				
				// add to blankBalls for easy reference
				var ball = stage.getBitmap('blank-' + i);
				this._selectedBalls.push(ball);
				
			};
			
		}
		
		/*
		 *	name: 			_setupBalls()
		 *	description:	create main layout 
		 *	params:			null
		 *	returns:		null
		 */
		private _setupBalls() {
			
			var stage = this.getChildByName('balls');
			
			for (var i = 0; i < 11; i++) {
				
				stage.addBitmap({
					name: "selectedBall" + i,
					pos: {
						x: 95 + ( 60 * i ),
						y: 190
					},
					frame: "choose_div",
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					}
				});
				
			}
			
			
			var x: number = 0;
			var	y: number = 0;

			
			for (var j = 0; j < 60; j++) {
				
				// miss the first number
				if ( j === 0 ){
					continue;
				};
				
				// create x value for columns
				y += 65;
				if ( j % 5 === 0 ){
					x++;
					y = 0;
				};
				
				stage.addBitmap({
					name: "ball" + j,
					pos: {
						x: 65 + ( 60 * x ),
						y: 40 + y
					},
					frame: "ball" +j,
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
					doReg: {
						center: true
					}
				});
				
				var ball 		= stage.getBitmap("ball"+j);
				ball.number		= j;
				ball.selected	= false;
				
			 	ball.on('click', function(ball){
					if( stage.getEnabled() ) {
						// fire event to 'bank' ball in the your numbers section 
                        IWG.IWGEM.trigger('ballSelected', [ball] );
					};					
				}.bind(null, ball) );
                
                this._ballArray.push(ball);
				
			};
			
			stage.addBitmap({
				name: "choose6",
				pos: {
					x: 400,
					y: 400
				},
				frame: "choose6",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
			
            
            // make button a gameObject
            var button = new CLICKABLEGAMEOBJECT("button", { w: 220, h: 96}, 4, this);
            button.addBitmap({
                name: "button",
				pos: {
					x: 110,
					y: 48
				},
				frame: "bg_button_blue",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
            });
			button.addBitmap({
				name: "letsPlay",
				pos: {
					x: 110,
					y: 48
				},
				frame: "letsplay",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
            button.setPosition({
                x: 370,
                y: 480
            })
            
            // hide button
            button.setAlpha(0);
            
            button.addAnimation('fadeIn');
            button.setAnimation('fadeIn', 'fadeIn', 0.2, 0);
            
            button.addAnimation('fadeOff');
            button.setAnimation('fadeOff', 'fadeOff', 0.2, 0);
            
            button.addAnimation('pulse');
            button.setAnimation('pulse', 'pulse', 1, 3);
            
            button.addAnimation('click');
            button.setAnimation('click', 'click', 0.5, 0, ['ballSelectionOff']);

            button.setAction('click', function(button){
                createjs.Sound.play("letsPlay");    
                button.animate('click');
            }.bind(null, button));
            
            this._button = button;
            
            
            this.getChildByName('balls').setAction('rollover', () => {
               this._reminder.seek('start');
            });
            
            this.getChildByName('balls').setAction('rollout', () => {
                
                if ( !GLOBAL.getInstance().getFromGlobal('maxSelected') ) {
                    this._reminder.play();    
                };
                                   
            });
            
            
            this._reminder = new TimelineMax();
            this._reminder.to( this.getChildByName('balls').getCanvas(), 1, { delay: 4 }, "start")
                          .to( this.getChildByName('balls').getCanvas(), 1, { opacity: 0.7, yoyo: true, repeat: -1 }, "pulse");
            
			
		}
		
		/*
		 *	name: 			_ballSelected
		 *	description: 	processes the balls that have been selected
		 *	params:			
		 *	returns:		
		 */
		private _ballSelected(ball) {
			
			if (!ball.selected) {
				
				// if max number of balls are NOT selected
				if ( !GLOBAL.getInstance().getFromGlobal('maxSelected') ){
                    
                    createjs.Sound.play("chooseBall");
					
					// set selected to true
					ball.selected = true;	
					
					// alpha ball to 0.3
					ball.alpha = 0.3;
                    this._makeSparkle( ball );
                    this.getChildByName('balls').getStage().update();
					
					// check if the max amount of balls are selected
					if (this._numberSelected >= 5) {
						GLOBAL.getInstance().addToGlobal( 'maxSelected', true );
						IWG.IWGEM.trigger('maxSelected');
					}
					
					// then add the ball graphics to the blank ball space
					var visualise = this._selectedBalls[ this._numberSelected ];
					visualise.name = ball.name;
					visualise.gotoAndStop(ball.currentAnimation);
                    visualise.scaleX = visualise.scaleY = 0;
                    
                    TweenMax.to(visualise, 0.5, { scaleX: 1, scaleY: 1 });
                    
					// increase numberselected
					this._numberSelected++;
                    this._updateMessage(this._numberSelected);
				};
				
			} else {
				
				// create sortArray
				var sortArray: Array<any> = [];
				
				// reduce number of balls selected
				this._numberSelected--;
				this._updateMessage(this._numberSelected);
                
				// put alpha back to 1
				ball.alpha = 1;
                this.getChildByName('balls').getStage().update();
                
                if ( GLOBAL.getInstance().getFromGlobal('maxSelected') ){
                    this._removeNextButton();    
                }
                
				// remove from bank
				if ( this._selectedBalls.length >= 0 ){
                    
                    this._reminder.play();
					
					for ( var i = 0; i < this._selectedBalls.length; i++ ){
						var element = this._selectedBalls[i];
						element.sortFrame = element.currentAnimation;
						
						if ( element.name === ball.name ) {
							// remove all balls from the array	
							element.name = "blank";
							// switch global 'maxSelected' to false
							GLOBAL.getInstance().addToGlobal( 'maxSelected', false );					
						} 
						element.gotoAndStop("ball_grey");
						
						if ( element.name.split("-")[0] !== 'blank' ) {
							// sort this._selectedBalls array after one has been deleted
							sortArray.push(element);
						}					
					}
					
				}
				
				// now sort the array
				for (let i = 0; i < sortArray.length; i++ ){
					
					var element = sortArray[i];
					this._selectedBalls[i].name = sortArray[i].name; 
					this._selectedBalls[i].gotoAndStop(sortArray[i].sortFrame);
					
				}
				
				this.getChildByName('selectedBalls').getStage().update();
				this.getChildByName('balls').getStage().update();
				
				// set selected to false				
				ball.selected = false;
			}
			
		}
        
        private _updateMessage(num:number) {
            var	choose          = this.getChildByName('balls'),
                chooseBitmap 	= this.getChildByName('balls').getBitmap('choose6');
            
            switch (num) {    
                case 0:
                    chooseBitmap.gotoAndStop('choose6')
                    break;
                case 1:
                    chooseBitmap.gotoAndStop('choose5')
                    break;
                case 2:
                    chooseBitmap.gotoAndStop('choose4')
                    break;
                case 3:
                    chooseBitmap.gotoAndStop('choose3')
                    break;
                case 4:
                    chooseBitmap.gotoAndStop('choose2')
                    break;
                case 5:
                    chooseBitmap.gotoAndStop('choose1')
                    break;
                default:
                    break;
            }
            choose.getStage().update();
            
            
        }
		
		/*
		 *	name: 			_maxSelected()
		 *	description:	turn on 
		 *  params:         null 
		 *  returns:        null
		 */
		private _maxSelected() {
            
			var	choose6numbers 	= this.getChildByName('balls').getBitmap('choose6');
			
			var timeline		= new TimelineLite({
				onStart: () => {
                    this.getChildByName('balls').setAlpha(1);
                    
                    this._reminder.seek("start");
                    this._reminder.pause();
				}
			})
			
			timeline.to(choose6numbers, 0.2, { alpha: 0, onComplete: () => {
                this.getChildByName('balls').setEnabled(true);
                // button set enabled
                this._button.animate('fadeIn');
                this._button.animate('pulse');
            } });

		}

        private _removeNextButton() {
            
			var choose6numbers 	= this.getChildByName('balls').getBitmap('choose6');
			var timeline		= new TimelineLite();
			 
			timeline.call( () => {
                        this.getChildByName('balls').setEnabled(false);            
                        this._button.animationTimeLine.kill();
                        this._button.animate('fadeOff') 
                    })
                    .to(choose6numbers, 0.2, { delay: 0.2, alpha: 1, onComplete: () => {
                        this.getChildByName('balls').setEnabled(true);
                    } })

		}
		
		/*
		 *	name:			_ballSelectionOff()
		 *	description:	initiate the animation for ball selection to disappear and destroy itself
		 * 					as well as call the mainGameLayout event
		 *	params:			null
		 *	returns:		null
		 */
		private _ballSelectionOff() {
			
            if ( this._selectedBalls.length > 0 ){
                
                var numberArray: Array<number> = [];
                for ( let i = 0; i < this._selectedBalls.length; i++ ){
                    numberArray.push(this._selectedBalls[i].name.substring(4));	
                }
                GLOBAL.getInstance().addToGlobal("ballSelection", numberArray); 
                
            }
			
				var self			= this,
					balls 			= this.getChildByName('balls'),
					selectedBalls 	= this.getChildByName('selectedBalls'),
                    button          = this.getChildByName('button');
				
				// turn everything off	
				balls.setEnabled(false);
				selectedBalls.setEnabled(false);
                button.animate('fadeOff');
				
				var timeline 		= new TimelineLite({
					onComplete: function() {
						self.destroy();
					}
				})
				timeline.to(balls.getCanvas(), 1, { opacity: 0}, "fadeOff")
						.to(selectedBalls.getCanvas(), 1, { opacity: 0}, "fadeOff")
			
			IWG.IWGEM.trigger('mainGameSetup');
			
		}
        
        /*
         *  name:           _makeSparkle()
         *  description:    make sparkle animation on ball
         *  params:         ball: bitmap
         *  returns:        null
         */
        private _makeSparkle( ball ) {
            

            var timeline = new TimelineMax({
                paused: true
            });

            for ( var angle = 0; angle < 360; angle += Math.round(360/6)){
         
                var particle = new createjs.Shape();
                particle.graphics.beginFill("red").drawCircle( ball.x, ball.y, Helper.getRandomNumber(3, 10) );
                
                this.getChildByName('balls').getStage().addChild(particle);
                
                timeline.add( TweenMax.to(particle, 0.5, { y: Helper.getRandomNumber( -50, 50), x: Helper.getRandomNumber(-50, 50), alpha: 0, onComplete: (particle) => {
                    this.getChildByName('balls').getStage().removeChild(particle);
                } }), 0 );

            }
            
            timeline.play();
            
        }
        
         
		
		/*
		 *	name: 			_initCompleteBallSelection()
		 *	description:	turn on 
		 *
		 *
		 */
		private _initCompleteBallSelection() {
			
		}
		
	
	}
}