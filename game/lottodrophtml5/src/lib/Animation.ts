/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {

	var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
		GLOBAL	= IWG.Global,
		HELPER	= IWG.Helper,
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
			float: function( gameObject: any, time: number, delay: number ) {
				return function() {
					
					var floatX = gameObject.getPosition().x + HELPER.getRandomNumber(-20, 20);
					var floatY = gameObject.getPosition().y + HELPER.getRandomNumber(-20, 20);
					
					TweenMax.to( gameObject.getCanvas(), time, { x: floatX, y: floatY, repeat: -1, yoyo: true, scaleX: 1.1, scaleY: 1.1 });
					
				}
			},
			press: function( gameObject: any, time: number, delay: number, customCallback? : string, prizeIndex?: any) {
				return function() {
					
					TweenMax.set( gameObject.getCanvas(), { scaleX: 1, scaleY: 1});
					TweenMax.to( gameObject.getCanvas(), time, {scaleX: 0.8, scaleY: 0.8, repeat: 1, yoyo: true, onComplete: function() {
						console.log('press callback: ' + customCallback, prizeIndex);
						if ( customCallback ){
							IWG.IWGEM.trigger(customCallback);	
						};				
                        if (customCallback === 'prizeClick') {
                            console.log(gameObject, time, delay, customCallback, prizeIndex);
                        };		
					}});
					
				}	
			},
            prizePress: function( gameObject: any, time: number, delay: number, prizeSymbol: any) {
				return function() {
					gameObject.setEnabled(false);
                    var prizeText    = gameObject.getBitmap('prizeText'),   
                        prizeValue   = prizeSymbol.getBitmap('prizeValue');
                        
                    TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						gameObject.active = true;
                        TweenMax.to(prizeText, 0.5, {alpha: 0, onComplete: function(){
                            prizeSymbol.active = true;
                            prizeSymbol.setZindex(8);
                            TweenMax.to(prizeValue, 0.5, {alpha:1, delay: 0.2, onStart: function (){
                                    gameObject.active = false;
                            }, onComplete: function () {
                                    //prizeSymbol.active = false;
                            }});
                        }})					
					}, repeat: 1, scaleX: 0.8, scaleY: 0.8, ease: Bounce.easeIn, yoyo: true, onComplete: function() {
					}});
				}	
			},
            hiloPress: function( gameObject: any, time: number, delay: number, customCallback? : string) {
				return function() {
					var xPos:number = 210;
                    TweenMax.to( gameObject.getCanvas(), time, {scaleX: 0.8, scaleY: 0.8, repeat: 1, yoyo: true, onComplete: function() {
						TweenMax.to(gameObject.getCanvas(), 1, {ease: Linear.easeOut, delay:0.5, x: xPos, onComplete: function () {
                            TweenMax.delayedCall(1, function () {
                                IWG.IWGEM.trigger('finishButtonMove')
                            })
                        }})
					}});
					
				}	
			},
			pulse: function( gameObject: any, time: number, delay: number ) {
				return function() {
					
					var tween = TweenMax.to(gameObject.getCanvas(), time, { delay: delay, scaleX: 1.1, scaleY: 1.1, repeat: -1, yoyo: true });
					
                    // store on gameObject allowing to kill when needed
                    gameObject.animationTimeLine = tween;

				}
			},
            ballShow: function( gameObject: any, time: number, delay: number ) {
                return function() {
                    TweenMax.to( gameObject.getBitmap('ball'), time, { onStart: () => {
                        createjs.Sound.play("ballPopulate");
                        gameObject.active = true;
                    }, delay: delay, scaleX: 1, scaleY: 1, ease: Bounce.easeOut, onComplete: () => {
                        gameObject.active = false;
                    } });
                    
                }  
            },
			click: function(gameObject: any, time: number = 1, delay: number = 0, callBack) {
				return function() {
					gameObject.setEnabled(false);
					TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						gameObject.active = true;						
					}, repeat: 1, scaleX: 0.8, scaleY: 0.8, ease: Bounce.easeIn, yoyo: true, onComplete: function() {
						gameObject.active = false;
                        if ( callBack ){
                            IWG.IWGEM.trigger(callBack);
                        }
					}});
				}
			},
			rollover: function(gameObject: any, time: number = 1, delay: number = 0, toggle) {
				return function() {
					TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						if (toggle){
							gameObject.active = true;	
						}												
					}, scaleX: 1.1, scaleY: 1.1, onComplete: function() {
						if ( toggle ){
							gameObject.active = false;	
						}						
					}});
				}
			},
			rollout: function(gameObject: any, time: number = 1, delay: number = 0, toggle) {
				return function() {
					TweenMax.to( gameObject.getCanvas(), 0.2, { onStart: function() {
						if (toggle) {
							gameObject.active = true;	
						}						
					}, scaleX: 1, scaleY: 1, onComplete: function() {
						if (toggle) {
							gameObject.active = false;	
						}						
					}});
				}
			},
            fadeIn: function( gameObject: any, time: number, delay: number = 0 ){
                return function() {
                    TweenMax.to(gameObject.getCanvas(), time, { alpha: 1, overwrite: "all", onComplete: () => {
                        gameObject.setEnabled(true);
                    } });
                }  
            }, 
            fadeOut: function( gameObject: any, time: number, delay: number = 0 ) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), time, { delay: delay, alpha: 0.5 });	
				}
			},
            fadeOff: function( gameObject: any, time: number, delay: number = 0 ) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), time, { delay: delay, alpha: 0, overwrite: "all", onStart: () => {
                        gameObject.setEnabled(false);
                    } });
				}
			},
            movePrize: function( gameObject: any, time: number, delay: number, customParams: any) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), time, {
                        delay: delay,
                        x: customParams.location.x,
                        y: customParams.location.y,
                        onStart: () => {
                            TweenMax.to(gameObject.getCanvas(), 1.7, {alpha: 0})
                        }
                    });
				}	
			},
            movePrizeLose: function( gameObject: any, time: number, delay: number, customParams: any) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), time, {
                        delay: delay,
                        onStart: () => {
                            TweenMax.to(gameObject.getCanvas(), 1.7, {alpha: 0})
                        }
                    });
				}	
			},
            miniGameOne: function( gameObject: any, time: number = 1, delay: number = 0 ) {
				
				var revealTimeLine = new TimelineLite({
					onStart: function() {
						gameObject.active = true;
					},
					onComplete: function() {
						TweenMax.delayedCall(1, function(){
							gameObject.active = false;
							gameObject.getStage().removeChild(gameObject.getBitmap('cup'));
						})
					},
				});
				
				return function() {
                    var cup = gameObject.getBitmap('cup');
					// Icon Reveal		
					revealTimeLine.to(cup, 0.3, {
						onStart: function () {
                            cup.gotoAndStop('mg1_cup2');
                        },
                        delay: 0,
                        y: 10,
                        onComplete: function () {
                        }
					}, 0)
				};
				
			},
            miniGameOneWin: function( gameObject: any, time: number, delay: number, customParams?: any) {
				gameObject.winRevealTimeline =   new TimelineMax({
						delay: delay,
						//smoothChildTiming: true,
						repeat:3,
						yoyo:true,
						paused:true,
						onStart: function() {
							gameObject.active = true;
						},
						
						onComplete: function() {
							TweenMax.delayedCall(0.5, function(){
								//gameObject.active = false;	
							})
						}
					});
				
				if (customParams === 1 ){
                    console.log(gameObject)
                    TweenMax.to(gameObject, 1, {alpha:0.5, repeat: -1, yoyo: true})
                } else {
				   console.log(gameObject)
                    gameObject.winRevealTimeline.to(gameObject.getCanvas(), 1, { alpha: 0.4}, 0)
                }  
								  
				return function() {	
					gameObject.winRevealTimeline.restart(true);
					gameObject.winRevealTimeline.play();
					
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
			scaleDown: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						gameObject.active = true;
					}, alpha: 0, scaleX: 0, scaleY: 0, onComplete: function() {
						gameObject.active = false;
					} });
				}
			},
			scaleUp: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						gameObject.active = true;
					}, alpha: 1, scaleX: 1, scaleY: 1, onComplete: function() {
						gameObject.active = false;
					} });
				}
			},
			ballPop: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					TweenMax.to(gameObject.getCanvas(), 1, { onStart: function() {
						createjs.Sound.play("ballShoot");
					},scaleX: 1.2, scaleY: 1.2, delay: 0.5, y: 65, ease:Bounce.easeOut, onComplete: function(){
						gameObject.setZindex(3);
						IWG.IWGEM.trigger('cardBallCheck', [gameObject.getTicketLabel()]);					
					} });
				}
			},
			instantBallPop: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
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
					var blackStart = gameObject.getBitmap('startTextB'),
						whiteStart = gameObject.getBitmap("startTextW");
					
					TweenMax.to(gameObject.getCanvas(), 1, { scaleX: 1.2, scaleY: 1.2, alpha: 1, delay: 1, y: 120, ease:Bounce.easeOut, onComplete: function(){
						gameObject.setZindex(3);
						TweenMax.to(gameObject.getCanvas(), 1, {scaleX: 1.1, scaleY: 1.1, repeatDelay: 0.5, yoyo: true, repeat: -1, onStart: function() {
							gameObject.winRevealTimeline.to(whiteStart, 1.5, { alpha: 1}, 0);
							gameObject.winRevealTimeline.play();
							
						}});
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
					}});
				}
			},
			instantBallRollOff: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					
					TweenMax.delayedCall(0.01, function(){
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
						gameObject.active = false;
					}});
				}
			},
			numberWinReveal: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					
					var timeline = new TimelineLite({
						onStart: function() {
							gameObject.active = true;
							createjs.Sound.play('rowWin')
						},
						onComplete: function() {
							gameObject.active = false;
						}
					});
					
					timeline.add( TweenMax.to(gameObject.getBitmap("highlight"), 0.3, { alpha: 1 }), 0 );
					timeline.add( TweenMax.to(gameObject.getBitmap("dabber"), 0.3, { alpha: 0 }), 0 );
					
					gameObject.getBitmap("text").color = "white";
				}
			},
			doublerWinReveal: function( gameObject: any, time: number = 1, delay: number = 0) {
				return function() {
					
					// set highlight to red
					gameObject.getBitmap("highlight").graphics.clear().beginFill("#fa2a1f").drawRect(0, 0, 52, 32);	
					
					var timeline = new TimelineLite({
						onStart: function() {
							gameObject.active = true;
							createjs.Sound.play('doubler')
						},
						onComplete: function() {
							gameObject.active = false;
						}
					});
					
					timeline.add( TweenMax.to(gameObject.getBitmap("highlight"), 0.3, { alpha: 1 }), 0 );
					timeline.add( TweenMax.to(gameObject.getBitmap("dabber"), 0.3, { alpha: 0 }), 0 );
					
					gameObject.getBitmap("text").color = "white";
				}
			},
			prizeWinReveal: function( gameObject: any, time: number = 1, delay: number = 0) {
				
				gameObject.winRevealTimeline =   new TimelineMax({
						delay: delay,
						//smoothChildTiming: true,
						repeat:-1,
						yoyo:true,
						paused:true,
						onStart: function() {
							gameObject.active = true;
						},
						
						onComplete: function() {
							TweenMax.delayedCall(0.25, function(){
								//gameObject.active = false;	
							})
							
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
					// gameObject.winRevealTimeline.restart(true);
					// gameObject.winRevealTimeline.play();
					// gameObject.getStage().update();
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
					TweenMax.to( gameObject.getCanvas(), time, { scaleX: 1, scaleY: 1, rotation: 720, repeat: -1, yoyo: true, onRepeat: function() {

						if ( !GLOBAL.getInstance().getFromGlobal('bokehEffect') ){
							this.kill();
							gameObject.destroy();
						}
						
					}});
				}
			},
			bonusStarReveal : function( gameObject: any, time: number = 1 , delay: number = 0 ) {
				var tl = new TimelineLite({
					onStart: function() {
						gameObject.active = true;
					}, onComplete: function() {
						//gameObject.active = false;
					}
				});
				return function() {;
					tl.to( gameObject.getCanvas(), time, { scaleX: 0, scaleY: 0 })
						.call(function(){
							gameObject.getBitmap(gameObject.getName()).gotoAndStop('star_full');		
						})
						.to(gameObject.getCanvas(), time, { scaleX: 1, scaleY: 1 });				
				};
			}, // end bonusStarReveal
            bonusStarsWin : function( gameObject: any, time: number = 1 , delay: number = 0, starsArray:any) {
				
				var tl = new TimelineLite({
                    delay: 1,
					onStart: function() {
						gameObject.active = true;
					}, onComplete: function() {
						gameObject.active = false;
					}
				})
				
				return function() {
                    var star    = gameObject.getBitmap('prizeAmount'),
                        win     = gameObject.getBitmap('prizeAmount_win');

                    tl.add(TweenMax.to(  star, 1, {alpha: 0, delay: delay, repeat: 4, yoyo: true}), 0);
                    tl.add(TweenMax.to(   win, 1, {alpha: 1, delay: delay, repeat: 4, yoyo: true}), 0);
                    
                    for (var i = 0; i < starsArray.length; i++) {
                        var stars = starsArray[i];
                        tl.add(TweenMax.to(stars.getBitmap('star_shadow'), 1, {alpha:1, delay: delay, repeat: 4, yoyo: true, onComplete: function () {
                            stars.active = false;
                        }}), 0);
                    }		
				}
			},
            instantReveal: function( gameObject: any, time: number = 1 , delay: number = 0 ) {
				
				var tl = new TimelineLite({
                    delay: 2,
					onStart: function() {
						gameObject.active = true;
					}, onComplete: function() {
						gameObject.active = false;
					}
				})
				return function() {
					tl.to( gameObject.getCanvas(), time, { scaleX: 0, scaleY: 0 })
						.call(function(){
							gameObject.getBitmap( gameObject.getName() ).gotoAndStop('iw_circle_blue');	
                            gameObject.getStage().update();	
						})
						.to(gameObject.getCanvas(), time, { scaleX: 1, scaleY: 1 });				
				}
			},
            instantPrizeReveal: function( gameObject: any, time: number = 1 , delay: number = 1 ) {
				return function() {
					TweenLite.to(gameObject.getCanvas(), time, { delay: delay, scaleX: 1, scaleY: 1 });				
				}
			},
            tipDirection: function( gameObject: any, time: number = 0.5, delay: number = 0, direction:string ){
                return function() {
                    var rotate: number = 45;
                    if(direction === 'left') {
                        rotate = -45;
                    }
                    gameObject.active = true;
                    TweenMax.to(gameObject.getBitmap('tipper'), time, {rotation: rotate, yoyo: true, repeat: 1,
                        onStart: function () {
                          TweenMax.to(gameObject.getBitmap('tipperShadow'), 0.1, {alpha:0});  
                        },
                        onComplete: function() {
                            TweenMax.to(gameObject.getBitmap('tipperShadow'), 0.1, {alpha:1});
                            //gameObject.active = false;
                        }});
                }
            },
            ballIntro: function( gameObject: any, time: number = 0.5, delay: number = 0 ){
                return function() {
                    gameObject.setAlpha(1);
                    TweenLite.to(gameObject.getCanvas(), time, { delay: delay, y: gameObject.getPosition().y + 60 });
                }
            },
            starReveal: function( gameObject: any, time: number = 2, delay: number = 2 ) {
                return function() {
                    
                    TweenMax.to(gameObject.getCanvas(), time, { delay: delay, alpha: 0, bezier: [
                        {
                            x: gameObject.getPosition().x + 10,
                            y: gameObject.getPosition().y - 40
                        },
                        {
                            x: gameObject.getPosition().x + 60,
                            y: gameObject.getPosition().y - 50
                        }   
                    ], onComplete: function() {
                        gameObject.destroy();
                    }})
                       
                }               
            },
            legendPrizeWinHighlight: function( gameObject: any, time: number = 1, delay: number = 0.5 ) {
                return function() {
                    
                     TweenMax.to(gameObject.getBitmap('legendPrizeWinAsset'), 1, {
                        onStart: function() {
                            gameObject.active = true;
                        }, repeat: 3.5, yoyo: true, alpha: 1, onComplete: function() {
                            gameObject.active = false;
                        }});
                    
                }
            }
        };
	}
}