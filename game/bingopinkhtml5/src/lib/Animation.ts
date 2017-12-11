/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {

	var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
		GLOBAL	= IWG.Global,
		SYNCANIMATION = IWG.SyncAnimation;

	export class Animation {

		private static _instance: Animation = new Animation();

        constructor() { 

			if (Animation._instance) {
				throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
			}
			Animation._instance = this;

        }

		public static getInstance(): Animation {
			return Animation._instance;
		}

		public animations: Object = {
			
			click: function(gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					gameObject.setEnabled(false);
					TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						gameObject.active = true;						
					}, repeat: 1, scaleX: 0.8, scaleY: 0.8, ease: Bounce.easeIn, yoyo: true, onComplete: function() {
						gameObject.active = false;
					}});
				}
			},
			rollover: function(gameObject: any, time: number = 1, delay: number = 0, scale: number = 1.1) {
				return function() {
					TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						gameObject.active = true;						
					}, scaleX: scale, scaleY: scale, onComplete: function() {
						gameObject.active = false;
					}});
				}
			},
			rollout: function(gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						gameObject.active = true;						
					}, scaleX: 1, scaleY: 1, onComplete: function() {
						gameObject.active = false;
					}});
				}
			},
			shrinkAuditBall: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), 0.3, { delay: 0, onStart: function() {
						gameObject.active = true;
					}, scaleX: 0, scaleY: 0, ease: Bounce.easeOut, onComplete: function() {
						gameObject.active = false;
					}});				
				}
			},
			growAuditBall: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					
					var time = 0.3,
						delay = 0.6;
					
					if ( GLOBAL.getInstance().getFromGlobal('method') === "InstantReveal") {
						time = 0.1;	
						delay = 0;
					}
					
					TweenMax.to(gameObject.getCanvas(), time, {delay: delay, onStart: function() {
						gameObject.active = true;
						gameObject.getBitmap('auditBall').alpha = 1;
						gameObject.getBitmap('numberWang').alpha = 1;
						gameObject.getBitmap('numberWang').scaleX = gameObject.getBitmap('numberWang').scaleY = 1;
					}, scaleX: 1, scaleY: 1, ease: Bounce.easeOut });
				}
			},
			scaleDown: function( gameObject: any, time: number, delay: number, customParams: any) {
				return function() {
                    
                    if (customParams) {
						IWG.IWGEM.trigger(customParams[0]);
			        }
                    
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						gameObject.active = true;
					}, alpha: 0, scaleX: 0, scaleY: 0, onComplete: function() {
                        gameObject.setScale(0,0);
                        gameObject.setAlpha(0);
					//	gameObject.active = false;
					}});
				}
			},
			scaleUp: function( gameObject: any, time: number, delay: number, customParams: any) {
				
				return function() {
                    
                    if (customParams) {
                		IWG.IWGEM.trigger(customParams[0]);
                    }	
                    
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						gameObject.active = true;
					}, alpha: 1, scaleX: 1, scaleY: 1, onComplete: function() {
						gameObject.setScale(1,1);
                        gameObject.setAlpha(1);
                       // gameObject.active = false;                        
					} });
				}
				
			},
			ballPop: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					gameObject.setAlpha(0);
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						createjs.Sound.play("ballShoot");
					},scaleX: 1.2, scaleY: 1.2, delay: 0.5, alpha: 1, y: 45, ease:Bounce.easeOut, onComplete: function(){
						gameObject.setZindex(3);
						IWG.IWGEM.trigger('cardBallCheck', [gameObject.getTicketLabel()]);					
					} });
				}
			},
			instantBallPop: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					gameObject.setAlpha(0);
					IWG.IWGEM.trigger('cardBallCheck', [gameObject.getTicketLabel()]);
				}
			},
			ballPopStart: function( gameObject: any, time: number = 1, delay: number = 0) {
				gameObject.winRevealTimeline =   new TimelineMax({
						delay: delay,
						repeat:-1,
						yoyo:true,
						paused:true,
						onStart: function() {
							gameObject.active = true;
						}
					});
				return function() {
					var blackStart = gameObject.getBitmap('startTextB')
					TweenMax.to(gameObject.getCanvas(), 1, { scaleX: 1.2, scaleY: 1.2, alpha: 1, delay: 1, y: 100, ease:Bounce.easeOut, onComplete: function(){
						gameObject.setZindex(3);
						gameObject.animate('pulse');
					}});
				}
			},
			pulseStartBall: function( gameObject: any, time: number = 1, delay: number = 0) {
		
				return function() {
					TweenMax.to(gameObject.getCanvas(), 1, {scaleX: 1.1, scaleY: 1.1, repeatDelay: 0.5, yoyo: true, repeat: -1, onStart: function() {
						gameObject.winRevealTimeline.play();
					}});
				}
				
			},
			ballRollOff: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						createjs.Sound.play('ballRoll')
						IWG.IWGEM.trigger('ballAudit', [gameObject.getStage().children[0].currentAnimation, gameObject.getTicketLabel()]);
					}, delay: 1, rotation: -720, bezier:{type:"cubic", values:[{x:170, y:70}, {x:130, y:200}, {x:70, y:260}, {x:-100, y:290}]}, onComplete: function(){
						IWG.IWGEM.trigger('resetBall');
						gameObject.setAlpha(0);
					}});
				}
			},
			instantBallRollOff: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					gameObject.setAlpha(0);
					TweenMax.delayedCall(0.2, function(){
						IWG.IWGEM.trigger('ballAudit', [gameObject.getStage().children[0].currentAnimation, gameObject.getTicketLabel()]);
						IWG.IWGEM.trigger('resetBall');	
					});
				}
			},
			ballRollOffStart: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), 1, { rotation: -720, bezier:{type:"cubic", values:[{x:170 + 265, y:70 + 60}, {x:130 + 265, y:200 + 60}, {x:70 + 265 , y:260 + 60}, {x:-100 + 265, y:290 + 60}]}, onComplete: function(){
						gameObject.destroy();
						IWG.IWGEM.trigger('mainGameIntroComplete');
					}});
				}
			},
			markNumber: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getBitmap("dabber"), 0.3, { onStart: function() {
						gameObject.active = true;
						createjs.Sound.play('dabberSelect')
					}, alpha: 1, onComplete: function() {
                        TweenMax.delayedCall( 0.5, function() {
                            gameObject.active = false;  
                            IWG.IWGEM.trigger('checkLegendRow');  
                        });						
					}});
				}
			},
			numberWinReveal: function( gameObject: any, time: number = 1, delay: number = 0) {
				
				gameObject.winRevealTimeline = new TimelineLite({
					paused:true,
					onStart: function() {
						gameObject.active = true;
						createjs.Sound.play('rowWin')
					},
					onComplete: function() {
						gameObject.active = false;
					}
				});	
				
				return function() {
					
					gameObject.getBitmap("text").color = "white";
					gameObject.getStage().removeChild(gameObject.getBitmap("dabber"));
					
					gameObject.winRevealTimeline.to(gameObject.getBitmap("highlight"), 1, { alpha: 1, yoyo: true, repeat: -1 }, 0 )
					SYNCANIMATION.getInstance().add( gameObject.winRevealTimeline );
					
				}
			},
			prizeWinReveal: function( gameObject: any, time: number = 1, delay: number = 0) {
				
				gameObject.winRevealTimeline =   new TimelineMax({
						delay: delay,
						repeat:-1,
						yoyo:true,
						paused:true,
						onStart: function() {
							gameObject.active = true;
						}
					});
					
				
				return function() {
					gameObject.winRevealTimeline.stop();
					
					var cloneIcon = gameObject.getBitmap('legend').clone();
					cloneIcon.scaleX = cloneIcon.scaleY = 1;
					gameObject.getStage().addChild(cloneIcon);
					var cloneIcon2 = gameObject.getBitmap('legend_value').clone();
					cloneIcon2.scaleX = cloneIcon2.scaleY = 1;
					gameObject.getStage().addChild(cloneIcon2);
					
					var newPrizeString = gameObject.getBitmap("legend").currentAnimation + "_winner",
						newValueString = "pw" + gameObject.getBitmap("legend_value").currentAnimation.slice(1);
					
					gameObject.getBitmap("legend").gotoAndStop(newPrizeString);
					gameObject.getBitmap("legend_value").gotoAndStop(newValueString);
					
					gameObject.winRevealTimeline.to(cloneIcon, 0.5, { alpha: 0}, 0)
								  .to(newPrizeString, 0.5, { alpha: 1}, 0)
								  .to(cloneIcon2, 0.5, { alpha: 0}, 0)
								  .to(newValueString, 0.5, { alpha: 1}, 0);
								  
					SYNCANIMATION.getInstance().add( gameObject.winRevealTimeline );
					
					SYNCANIMATION.getInstance().play();
				}
			},
			numberHighlight: function( gameObject: any, time: number = 1, delay: number = 0) {
				
				gameObject.animationTimeLine = new TimelineLite({
					onStart: function() {
						gameObject.active = true;
					}, onComplete: function() {
						gameObject.active = false;
					}
				});
				
				return function() {
					gameObject.animationTimeLine.to( gameObject.getBitmap("highlight"), time, {delay: delay, yoyo: true, repeat: -1, alpha: 0.4 });
				}
			},
			bokehScale : function( gameObject: any, time: number = Math.floor(Math.random() * 6) + 2 , delay: number = Math.floor(Math.random() * 6) + 1  ) {
				return function() {
					TweenMax.to( gameObject.getCanvas(), time, { scaleX: 1, scaleY: 1, repeat: -1, yoyo: true, onRepeat: function() {

						if ( !GLOBAL.getInstance().getFromGlobal('bokehEffect') ){
							this.kill();
							gameObject.destroy();
						}
						
					}});
				}
			}
        };
	}
}