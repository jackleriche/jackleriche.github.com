/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Ticket.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Pin.ts" />
/// <reference path="Helper.ts" />
/// <reference path="Legend.ts" />
/// <reference path="BallSelection.ts" />
module com.camelot.iwg {
	
	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
		HELPER				= IWG.Helper,
        TICKET              = IWG.Ticket,
        GAMEOBJECT 			= IWG.GameObject,
        PATH                = IWG.Path,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        LEGEND              = IWG.Legend,
		PIN					= IWG.Pin,
		TIPPER				= IWG.Tipper,
        BALLSELECTION       = IWG.BallSelection,
        STAR                = IWG.Star,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class Board extends Scene {
        
        private _pinMap : Array<GameObject>                 = [];
        private _legend : Legend                            = new LEGEND();
        private _dropBallTube: Array<ClickableGameObject>   = [];
        private _ball                                       = null;
        private _ballTL : any                               = null;
		
		constructor(_name) {
			super(_name);	
			this._subscribeBoard();
            
			this._setupLayout();
            this._setupBallDrop();
            this._setupMiniGame();
            this._setupLegend();
		    this._boardOn();
		}
		
		private _subscribeBoard() : void {
            IWG.IWGEM.on( 'dropBall',       this._dropBall.bind(this) );	
            IWG.IWGEM.on( 'resumeBallDrop', this._resumeBallDrop.bind(this) );
            IWG.IWGEM.on( 'ballInTube',     this._ballInTube.bind(this) );
            IWG.IWGEM.on( 'fadeOnChoose',   this._fadeOnChoose.bind(this) );
            IWG.IWGEM.on( 'fadeOffChoose',  this._fadeOffChoose.bind(this) );
            IWG.IWGEM.on( 'ballShowDone',   this._enableChoose.bind(this));
		}
		
		/*
         *  name:           _setupLayout();
         *  description:    setup layout for Board class
         *  params:         null
         *  returns:        null
         */
		private _setupLayout() : void {

			var board = new GAMEOBJECT('boardBG', {w: 560, h: 621}, 6, this );
            board.addBitmap({
				name: "boardBG",
				pos: {
					x: 280,
					y: 311
				},
				frame: "board",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}
			});
            board.setPosition({
                x: 0,
                y: 0
            });
            
            var circles = new GAMEOBJECT('circlesBG', {w: 560, h: 621}, 3, this );
			circles.setPosition({
                x: 0,
                y: 0
            });
            
			var balls: Array<any> = [
				[230, 140, 30, "BB0000" ],
				[160, 240, 65, "FF0080"],
				[280, 370, 90, "FF0041"],				
				[420, 300, 40, "ED0000"]
			];
			
			for ( let i = 0; i < 4; i++ ){
				
				var ballConfig: Array<any> 	= balls[i];
				var circle 					= new createjs.Shape();
				
    			circle.graphics.beginFill("#"+ballConfig[3]).drawCircle(0, 0, ballConfig[2]);
				
				circle.x = ballConfig[0];
				circle.y = ballConfig[1];
				
				circles.getStage().addChild(circle);
                circles.getStage().update();
				
			}
			
			
			var pins: Array<any> = [
                [null, null, null],
                
				[130,110, "pin"],
				[271,110, "pin"],
				[412,110, "pin"],
				
				[60, 160, "pin"],
				[201,160, "tipper"],
				[346,160, "tipper"],
				[481,160, "pin"],
				
				[130,210, "pin"],
				[271,210, "pin"],
				[412,210, "pin"],
				
				[60, 260, "pin"],
				[201,260, "pin"],
				[346,260, "pin"],
				[481,260, "pin"],
				
				[130,310, "pin"],
				[271,310, "pin", "miniGame"],
				[412,310, "pin"],
				
				[60, 360, "pin"],
				[201,360, "pin"],
				[346,360, "pin"],
				[481,360, "pin"],
				
				[130,410, "pin"],
				[271,410, "tipper"],
				[412,410, "pin"],
                
                [95, 470, "wall"],
                [185,470, "wall"],
                [272,470, "wall"],
                [358,470, "wall"],
                [445,470, "wall"],                
                
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                [null,null,null],
                
                // include legend reference
                [54,596, "endTube", 0],
				[142,596, "endTube", 1],
				[228,596, "endTube", 2],
				[315,596, "endTube", 3],
				[403,596, "endTube", 4],
				[488,596, "endTube", 5]
								
			]
			
			for ( let i = 0; i < pins.length; i++ ){
				
				if ( pins[i][2] === "pin"){
					
					var pin = new PIN( 'pin'+i, {w: 16, h: 80}, 6, this);
					pin.addBitmap({
						name: 'pinShadow'+i,
						pos: {
							x: 8,
							y: 40
						},
						frame: "pin_shadow",
						spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
						doReg: {
							center: true
						}
					});
                    pin.addBitmap({
						name: 'pin'+i,
						pos: {
							x: 8,
							y: 8
						},
						frame: "pin",
						spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
						doReg: {
							center: true
						}
					});
                    
					pin.setPosition({
						x: pins[i][0],
						y: pins[i][1], 
					});
                    
                    pin.setTicketLabel( pins[i][3] );
                    
                    this._pinMap.push(pin);
					
				} else if ( pins[i][2] === "tipper" ){
					
					var tipper = new TIPPER( 'tipper'+i, {w: 73, h: 73}, 6, this);
					tipper.addBitmap({
						name: 'tipperShadow',
						pos: {
							x: 36,
							y: 46
						},
						frame: "tiper_shadow",
                        alpha:1,
						spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
						doReg: {
							center: true
						}
					});
                    tipper.addBitmap({
						name: 'tipper',
						pos: {
							x: 36,
							y: 36
						},
						frame: "tipper",
						spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
						doReg: {
                            custom:{
							    x:36,
                                y:6
                            },
						}
					});
					tipper.setPosition({
						x: pins[i][0] - 28,
						y: pins[i][1] - 30, 
					});
					
                    this._pinMap.push(tipper);
                    
				} else if (  pins[i][2] === "endTube" ) {
                    
                    var endTube = new GAMEOBJECT( 'endTube'+i, {w: 1, h: 1}, 10, this);
                    endTube.setPosition({
						x: pins[i][0],
						y: pins[i][1], 
					});
                    endTube.setTicketLabel(pins[i][3]);
                    
                    this._pinMap.push(endTube)
                    
                } else if ( pins[i][2] === "wall" ) {
                    
                    var wall = new GAMEOBJECT( 'wall'+i, {w: 1, h: 1}, 10, this);
                    wall.setPosition({
						x: pins[i][0],
						y: pins[i][1], 
					});
                    
                    this._pinMap.push(wall)
                    
                } else {
                    this._pinMap.push(null);
                }

			} // end for loop

		} // end _setupLayout()

        /*
         *  name:           _setupLegend();
         *  description:    setup the legend for the game
         *  params:         null
         *  return:         null
         */
        private _setupLegend() : void { 
            
            this._legend.setSequential(true);
            
            for ( let i = 0; i < 6; i++ ){
                var prizeShadow = new GAMEOBJECT("legendShadow" + i, {w: 44, h: 90}, 5, this);
                prizeShadow.addBitmap({
                    name: 'legend_shadow',
                    pos: {
                        x: 22,
                        y: 45
                    },
                    frame: "legend_shadow",
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                prizeShadow.setPosition({
                    x: 40 + (87 * i),
                    y: 492
                })
                
                var prizeAsset  = new GAMEOBJECT("legendPrizeAsset" + i, {w: 77, h: 25}, 6, this);
                prizeAsset.addBitmap({
                    name: 'legendPrizeAsset',
                    pos: {
                        x: 38,
                        y: 12
                    },
                    frame: "p" + TICKET.getInstance().legendPrizeValues[i],
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                prizeAsset.addBitmap({
                    name: 'legendPrizeWinAsset',
                    pos: {
                        x: 38,
                        y: 12
                    },
                    frame: "pw" + TICKET.getInstance().legendPrizeValues[i],
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    },
                    alpha: 0
                });
                prizeAsset.setPosition({
                    x: 25 + ( 87 * i ),
                    y: 592
                });
                
                prizeAsset.setAnimation('winReveal', 'legendPrizeWinHighlight');
                
                var value = TICKET.getInstance().legendPrizeValues[i];
                var nodes = 2;
                if ( value > 99){
                    nodes = 3
                }
                
                var icons: Array<GameObject> = [];
                for ( let j = 0; j < nodes; j++ ) {
                    
                    var iconAsset  = new GAMEOBJECT("row" + i + "icon" + j, {w: 44, h: 44}, 4, this);
                    iconAsset.addBitmap({
                        name: 'legendPrizeAsset'+i,
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
                    iconAsset.setPosition({
                        x: 40 + ( 87 * i ),
                        y: 555 - ( 44 * j )
                    });
                    iconAsset.setTicketLabel(i);
                    
                    icons.push(iconAsset);
                    
                }
                
                this._legend.addRow({
                    prizeValue: value,
                    prize: prizeAsset,
                    icons: icons
                });

                
            } // end for loop
            
        } // end _setupLegend();


        private _setupBallDrop() : void {
            var self = this;
            for( var i = 0; i < 3; i++ ) {
                var ballDrop : ClickableGameObject = new CLICKABLEGAMEOBJECT("ballDrop" + i, { w: 95, h: 65}, 7, this);
                ballDrop.addBitmap({
                    name: 'legendPrizeAsset'+i,
                    pos: {
                        x: 47.5,
                        y: 5
                    },
                    frame: "droparrow_white",
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                ballDrop.addBitmap({
                    name: 'legendPrizePrompt',
                    pos: {
                        x: 47.5,
                        y: 40
                    },
                    frame: "choose",
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                ballDrop.setPosition({
                    x: 92 + ( 140 * i ),
                    y: 45
                });
                
                var shape = new createjs.Shape(); 
                shape.graphics.beginFill("#000000").drawRect(0, 0, 65, 95);
                shape.alpha = 0.01;
                ballDrop.getStage().addChild(shape);

                ballDrop.setEnabled(false);
                ballDrop.setAction('click', function(index) {
                    IWG.IWGEM.trigger('dropBall', [ index ]);
                    createjs.Sound.play('chooseMenu');
                    IWG.IWGEM.trigger('hideInstructions');
                    if(!ballDrop.getRevealed()){
                        self._fadeOffChoose();   
                    }
                }.bind(null, i));
                
                ballDrop.addAnimation('rollOver');
                ballDrop.addAnimation('rollOut');
                
                ballDrop.setAnimation('rollOver', 'rollover', 0.2, 0, false);
                ballDrop.setAnimation('rollOut', 'rollout', 0.2, 0, false);
                
                ballDrop.setAction('rollover', function(ballDrop) {
                    ballDrop.animate('rollOver'); 
                }.bind(null, ballDrop));
                
                ballDrop.setAction('rollout', function(ballDrop) {
                    ballDrop.animate('rollOut');
                }.bind(null, ballDrop));
                
                this._dropBallTube.push(ballDrop);
            }   
            
            var ball : GameObject = new GAMEOBJECT('ball', { w: 44, h: 44 }, 5, this);
            ball.addBitmap({
                name: 'ball',
                pos: {
                    x: 22,
                    y: 22
                },
                frame: "ball1",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            ball.setPosition({
                x: 0, 
                y: 0
            });
            
            ball.setTicketLabel(null);
            
            ball.addAnimation('intro');
            ball.setAnimation("intro", "ballIntro", 0.5, 0, null);
            
            this._ball = ball;
            
        } // end setupBallDrop();
        
        
        /*
         *  name:           _setupMiniGame();
         *  description:    setup mini game
         *  params:         null
         *  returns:        null
         */
		private _setupMiniGame() : void {
            
            var miniGameHole : GameObject = new GAMEOBJECT('miniGameHole', { w: 44, h: 44 }, 4, this);
            miniGameHole.addBitmap({
                name: 'miniGameHole',
                pos: {
                    x: 22,
                    y: 22
                },
                frame: "minigame_hole",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            miniGameHole.setPosition({
                x: 258, 
                y: 266
            });
            var miniGameHoleText : GameObject = new GAMEOBJECT('miniGameHoleText', { w: 86, h: 26 }, 4, this);
            miniGameHoleText.addBitmap({
                name: 'miniGameHoleText',
                pos: {
                    x: 43,
                    y: 13
                },
                frame: "board_minigame",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            miniGameHoleText.setPosition({
                x: 235, 
                y: 325
            });
            
        }
        
        
        /*
         *  name:           _dropBall();
         *  description:    event method called once a click area has been press to drop the ball into the game area    
         *  params:         index: number
         *  returns:        null
         */
        private _dropBall(index) : void {
            
            var turn = GLOBAL.getInstance().getFromGlobal('turnNo');
            
            // if we have ran out of balls
            if ( GLOBAL.getInstance().getFromGlobal("ballSelection").length === 0 ) {
                for ( var i = 0; i < this._dropBallTube.length; i++ ){
                    this._dropBallTube[i].setEnabled(false);
                };
                return;
            }
            
            // change the ball depending on which ball is in the ballBank
            var ballData = GLOBAL.getInstance().getFromGlobal('ballBank').getNextBall();
            this._ball.getBitmap('ball').gotoAndStop('ball'+ballData.getTicketLabel());
            this._ball.getStage().update();
            
            //remove ball from ballBank
            IWG.IWGEM.trigger( 'initBallTurn' );
            
            // turn off all tubes
            for ( var i = 0; i < this._dropBallTube.length; i++ ){
                this._dropBallTube[i].setEnabled(false);
            };
            
            var startTube = this._dropBallTube[index];
            // get positions
            var positionX = startTube.getPosition().x;
            var positionY = startTube.getPosition().y;
            
            this._ball.setPosition({
                x: positionX + 25,
                y: positionY - 105
            }, true );
            
            this._ball.animate('intro');
            
            // find correct path
            var turnData : any = Ticket.getInstance().getTurn(turn);
            var pathArray : Array<number> = null;
            var starNumber : number = null;
            
            switch(index) {
                case 0:
                    pathArray = PATH.PATHS_A[ Number( turnData.rA ) ];
                    if ( turnData.hasOwnProperty('sA') ) {
                        starNumber = Number(turnData.sA);
                    };                    
                    break;
                case 1:
                    pathArray = PATH.PATHS_B[ Number( turnData.rB ) ];
                    if ( turnData.hasOwnProperty('sB') ) {
                        starNumber = Number(turnData.sB);
                    };
                    break;
                case 2:
                    pathArray = PATH.PATHS_C[ Number( turnData.rC ) ];
                    if ( turnData.hasOwnProperty('sC') ) {
                        starNumber = Number(turnData.sC);
                    };
                    break;
            }
            
            // pathIndex is the correct path to take down
            this._ballTL = new TimelineMax({
                paused: true,
                delay: 1,
                onComplete: () => {
                    for ( var i = 0; i < this._dropBallTube.length; i++ ){
                        this._dropBallTube[i].setEnabled(true);
                    };
                    this._enableChoose(false);
                    // check if endGame
                    IWG.IWGEM.trigger('checkEndGame');
                    
                    this._ball.setAlpha( 0 );
                    
                }
            });
            this._ballTL.miniGame = false;
            
            GLOBAL.getInstance().addToGlobal("ballTL", this._ballTL);
            
            var nextBezierX : number    = null; 
            var nextRotation : number   = null; 
            var pinOffsetX : number     = null;
            var pinOffsetY : number     = null;
            var pinType: string         = null;
            var endType: string         = null;
            
            // now get each pin/ tipper to hit
            for ( let i = 0; i < pathArray.length; i++ ){
                
                // work out rotation
                var pin = this._pinMap[pathArray[i]];
                var nPin : GameObject = null;
                var direction: string; 
                var bezierYoffset:number = 60;
                var delay: number = 0;
                
                if ( i < pathArray.length - 1){
                    nPin =  this._pinMap[ pathArray[i + 1] ];
                    if ( nPin.getPosition().x < pin.getPosition().x ) {
                        // left roll
                        nextRotation += -360;
                        direction = "left";
                    } else {
                        // right roll
                        nextRotation += 360;
                        direction = "right";    
                    }
                    
                    pinType = pin.getName().slice(0,3);

                    if(pinType === "tip" ) {
                        pinOffsetX = 14;
                        pinOffsetY = 15;
                    } else {
                        pinOffsetX = -11;
                        pinOffsetY = 42;
                    }
                   
                  
                }
                
                // check for last pin only - increase height of jump
                endType = pin.getName().slice(0,3);
                if(endType === "end" ) {
                    bezierYoffset = 125;
                }                                                
                        
                
                this._ballTL.add( TweenMax.to(this._ball.getCanvas(), 0.36, {
                    ease:Power0.easeIn,
                    delay: delay,
                    onStartParams: [ this , pin, i],
                    onStart: function(self, pin, i) {
                        
                        TweenMax.delayedCall(0.28, function(){
                            createjs.Sound.play('pinHit');                            
                        })

                        // work out bezier path
                        var nextPin : GameObject =  self._pinMap[ pathArray[i + 1] ];
                        if ( nextPin ){
                            if ( nextPin.getPosition().x < pin.getPosition().x ) {
                                nextBezierX = -80;
                            } else {
                                nextBezierX = 80 ;
                            };
                        }
                                                
                    },
                    // bezier creation

                    bezier: {
                        values: [
                           {
                                x: (pin.getPosition().x + pinOffsetX) + nextBezierX,
                                y: (pin.getPosition().y - 14) - bezierYoffset
                            },
                            {
                                x: pin.getPosition().x + pinOffsetX + 3,
                                y: pin.getPosition().y - pinOffsetY + 2
                            }, 
                            {
                                x: pin.getPosition().x + pinOffsetX + 3,
                                y: pin.getPosition().y - pinOffsetY + 1
                            }, 
                            {
                                x: pin.getPosition().x + pinOffsetX + 3,
                                y: pin.getPosition().y - pinOffsetY
                            } 
                        ]
                    },
                    rotation: nextRotation,
                    onCompleteParams: [this, pin, pinType, direction], 
                    onComplete: function(self, pin, pinType, direction) {
                        var pinIndex = Number( pin.getName().substring(3) );
                        if (pinIndex === starNumber && pinIndex !== 16) {
                            // pop star out
                            var star = new STAR( pin.getPosition().x, pin.getPosition().y, self);
                            IWG.IWGEM.trigger('bonusStar');
                        }
                        
                        // figure out which tube the ball ended in
                        if ( typeof pin.getTicketLabel() === "number" ) {
                            // update legend
                            self._legend.updateLegend(pin.getTicketLabel());
                            // change ball
                            IWG.IWGEM.trigger('ballInTube', [pin.getTicketLabel(), self._ball] )
                            createjs.Sound.play('ballLand')
                            pin.setPosition({ y: pin.getPosition().y - 44 }, true );
                                                        
                        } else if ( pin.getTicketLabel() === "miniGame" ) {
                            
                            self._ballTL.pause();
                            self._ballTL.miniGame = true;
                            
                            TweenMax.to( self._ball.getCanvas(), 0.5, { x:258, y: 266, scaleX: 0.3, scaleY: 0.3, onComplete: function(){
                                IWG.IWGEM.trigger('miniGameOn');
                                createjs.Sound.play('minigamePopup');
                            } });
                        
                        };
                        
                        if(pinType === "tip") {
                            IWG.IWGEM.trigger('tipperLandedEvent', [pin, direction])
                        }
                  
                        
                    } 
                }));
                
            };
            
            // play generated timeline
            this._ballTL.play();
            
            // increment turn
            turn++;
            
            // store turn number globally
            GLOBAL.getInstance().addToGlobal('turnNo', turn);
            
        } // end _dropBall()
        
         /*
         *  name:           _resumeBallDrop();
         *  description:    event method called once a click area has been press to drop the ball into the game area    
         *  params:         index: number
         *  returns:        null
         */
        private _resumeBallDrop() : void {
            TweenMax.to( this._ball.getCanvas(), 0.5, {scaleX: 1, scaleY: 1, onComplete: () => {
                this._ballTL.play();
            }});            
        }
        
        /*
         *  name:           _ballInTube();
         *  description:    changes the graphic of the ball in tube to one thats dropped  
         *  params:         tubeIndex: number, ball : gameObject
         *  returns:        null
         */
        private _ballInTube(tubeIndex: number, ball: GameObject ) : void {
            
            var currentFrame = ball.getBitmap('ball').currentAnimation
            var tube = this._legend.getRow(tubeIndex);
            
            for ( let i = 0; i < tube.rowIcons.length; i++ ) {
                
                var blank : GameObject = tube.rowIcons[i];
                
                if ( blank.getStage().children[0].currentAnimation === "ball_grey") {
                    blank.getStage().children[0].gotoAndStop(currentFrame);  
                    blank.getStage().update();
                    break;  
                }              
            }
        }
        
       /*
        *	name:			_fadeOffChoose
        *	description:	animate the choose buttons off
        *   params:         endMsg?: any
        * 	returns:		null	
        */
        private _fadeOffChoose(endMsg?:any){
			for (var i = 0; i < this._dropBallTube.length; i++){
                var choose = this._dropBallTube[i],
                    chooseBitmap = choose.getBitmap('legendPrizePrompt');
                    choose.setEnabled(false);
                    choose.setScale(1,1);
                    choose.active = true;
                    TweenMax.to(chooseBitmap, 0.5, {alpha:0,
                        onCompleteParams: [choose],
                        onComplete: function (choose) {
                            choose.active = false;
                            choose.setEnabled(false);
                        }
                    });
            }
		}
		
       /*
        *	name:			_fadeOnChoose
        *	description:	animate the choose buttons
        * 	returns:		null	
        */
		private _fadeOnChoose(){
			for (var i = 0; i < this._dropBallTube.length; i++){
                var choose = this._dropBallTube[i],
                    chooseBitmap = choose.getBitmap('legendPrizePrompt');
                    choose.active = true;
                    TweenMax.to(chooseBitmap, 0.5, {
                        onStartParams: [choose],
                        onStart: function (choose) {
                            choose.setEnabled(true)
                        }, delay: 0.5, alpha:0.6, yoyo:true, repeat: -1, repeatDelay: 0.5})
            }
		}
        
        private _enableChoose(enable:boolean) {
            for (var i = 0; i < this._dropBallTube.length; i++){
                var choose = this._dropBallTube[i];
                if (!enable) {
                    choose.setEnabled(false);   
                } else {
                    choose.setEnabled(true);
                }
            }
        }
        
       /*
        *	name:			_boardOn
        *	description:	animate the board on
        * 	returns:		null	
        */
		private _boardOn(): void {
            TweenMax.to(this.getDiv(), 0.5, {alpha: 1, delay: 1});
		}
	}

}