/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
        
module com.camelot.iwg {
        
    var CAMELOT: any = com.camelot,
        CORE         = CAMELOT.core,
        IWG          = CAMELOT.iwg,
        GLOBAL       = IWG.Global,
        SPRITESHEETS = IWG.SpriteSheets,
        images       = CORE.iwgLoadQ.images,
        GAMEOBJECT   = IWG.GameObject,
        ANIMATION    = IWG.Animation,
        HELPER       = IWG.Helper,
        TICKET       = IWG.Ticket,
        MINIGAMEPRIZE = IWG.MiniGamePrize,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject;
        
    export class MiniGameOne extends Scene {
        
        private _turnsArray             = [];
        private _turnSymbolArray        = [];
        private _miniGamePrizeIndex     = TICKET.getInstance().getMiniGame()[0].mGR;
        private _ballNumberArray        = TICKET.getInstance().getMiniGame()[0].mGN.split(',').map(Number);
        private _l: boolean             = false;
        private _prizeFrameName:string  = '';
        private _prizeFrameText:string  = ''; 
        private _framePosX:number       = null;
        private _framePosY:number       = null;
        private _prizeTextPosX:number   = null; 
        private _randNum:Number         = Math.round(HELPER.getRandomNumber(1,59));
        
        private _miniGamePrize:any;
        
        constructor(_name) {
            super(_name);
            this._extendSubscribe();
            this._setupLayout();
        }
    
        private _extendSubscribe() {
            IWG.IWGEM.on('endMiniGame', this._endGameCheck.bind(this));
            IWG.IWGEM.on('miniGameOn', this._miniGameOn.bind(this));
            IWG.IWGEM.on('miniGameOff', this._miniGameOff.bind(this));
            IWG.IWGEM.on('prizeMove', this._movePrize.bind(this));
            IWG.IWGEM.on('prizeLose', this._movePrizeLose.bind(this));
        }
        
        private _extendUnsubscribe() {
            IWG.IWGEM.off('endMiniGame');
            IWG.IWGEM.off('miniGameOn');
            IWG.IWGEM.off('miniGameOff');
            IWG.IWGEM.off('prizeMove');
            IWG.IWGEM.off('prizeLose');
        }
    
        /*
        *	name: 		    _getCorrectPrizeSymbol()
        *	description:    setup the correct prize symbols for the minigame
        *	params:		    null
        *	returns:	    null
        */
        private _getCorrectPrizeSymbol():void {                
            switch (this._miniGamePrizeIndex) {
                case 1: 
                    // star
                    this._prizeFrameName = "star_full";
                    this._prizeFrameText = "mg_win_star";
                    this._framePosX = 0;
                    this._framePosY = 0;
                    this._prizeTextPosX = 72;
                    break;
                case 2: 
                    // bonus
                    this._prizeFrameName = "ball"+this._randNum; // change this to a new symbol
                    this._prizeFrameText = "mg_win_bonus";
                    this._framePosX = 5;
                    this._framePosY = 5;
                    this._prizeTextPosX = 22;
                    break;
                case 4: 
                    // 10IW
                    this._prizeFrameName = "iw_blue10";
                    this._prizeFrameText = "mg_win_iw10";
                    this._framePosX = 8;
                    this._framePosY = 8;
                    this._prizeTextPosX = 75;
                    break;
                case 5: 
                    // 5IW
                    this._prizeFrameName = "iw_blue5";
                    this._prizeFrameText = "mg_win_iw5";
                    this._framePosX = 8;
                    this._framePosY = 8;
                    this._prizeTextPosX = 75;
                    break;   
                    case 6: 
                    // 3IW
                    this._prizeFrameName = "iw_blue3";
                    this._prizeFrameText = "mg_win_iw3";
                    this._framePosX = 8;
                    this._framePosY = 8;
                    this._prizeTextPosX = 75;
                    break;
                default:
                    break;
            }
        }
        
        /*
        *	name: 		    _setupLayout()
        *	description:    setup the layout of mini game one
        *	params:		    null
        *	returns:	    null
        */
        private _setupLayout(): void {
            
            var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                self        = this;
                this._getCorrectPrizeSymbol();
        
            var background = new GAMEOBJECT('miniGame_bg', { w: 535, h: 560 }, 2, this);
            background.addBitmap({
                name: 'background',
                pos: {
                x: 0,
                y: 0
                },
                frame: "bg_minigames",
                spriteSheet: spritesheet
            });
            
            var title = new GAMEOBJECT('miniGame_title', { w: 142, h: 20 }, 2, this);
            title.addBitmap({
                name: 'title',
                pos: {
                x: 0,
                y: 0
                },
                frame: "mg_title",
                spriteSheet: spritesheet
            });
            title.setPosition({
                x: 200,
                y: 40
            });
            
            var prizeStar = new CLICKABLEGAMEOBJECT('miniGame_prize', { w: 81, h: 75 }, 2, this);
            prizeStar.addBitmap({
                name: 'prize',
                pos: {
                x: 0,
                y: 0
                },
                frame: "mg_star",
                spriteSheet: spritesheet
            });
            prizeStar.addBitmap({
                name: 'prizeText',
                pos: {
                x: 20,
                y: 31
                },
                frame: "mg_word_prize",
                spriteSheet: spritesheet
            });
            prizeStar.setPosition({
                x: 410,
                y: 18
            });
            prizeStar.setEnabled(true);
            prizeStar.active = true;

            var prizeSymbol = new GAMEOBJECT('miniGame_prizeSymbol', { w: 54, h: 52 }, 2);
            prizeSymbol.addBitmap({
                name: 'prizeValue',
                pos: {
                x: this._framePosX,
                y: this._framePosY
                },
                alpha: 0,
                frame: this._prizeFrameName,   // may need to change this to "blank" later
                spriteSheet: spritesheet
            });
            prizeSymbol.setTicketLabel( this._miniGamePrizeIndex );
            prizeSymbol.setPosition({
                x: 819,
                y: 95
            });
            prizeSymbol.ballNumber = Number(this._prizeFrameName.substring(4));
            
            prizeStar.addAnimation('prizePress');
            prizeStar.setAnimation('prizePress', 'prizePress', 0.2, 0, prizeSymbol);
            prizeStar.addAnimation('prizeReminder');            
            
            this._miniGamePrize = new MINIGAMEPRIZE('miniGamePrize');
            this._miniGamePrize.setMiniGamePrize(prizeSymbol);
            this._miniGamePrize.setMiniGamePrizeType(this._miniGamePrizeIndex);
            
            var message = new GAMEOBJECT('miniGame_message', { w: 489, h: 45 }, 2, this);
            message.addBitmap({
                name: 'message',
                pos: {
                x: 0,
                y: 0
                },
                alpha: 1,
                frame: "mg1_instructions",
                spriteSheet: spritesheet
            });
            message.active = false;
            message.setPosition({
                x: 20,
                y: 400
            });
            
            var button = new CLICKABLEGAMEOBJECT('miniGame_button', { w: 230, h: 106 }, 8, this);
            button.addBitmap({
                name: "continue_button",
                pos: {
                    x: 115,
                    y: 53
                },
                alpha: 0,
                frame: "button_continue",
                spriteSheet: spritesheet,
                doReg: {
                    center: true
                }
            });
            button.setPosition({
                x:155,
                y:430
            });
            button.active = false;
            button.setEnabled(false);
            
            this._setupBalls();
        }
       
       /*
        *	name: 		    _setupBalls()
        *	description:	setup the balls and the cups above them
        *	params:		    null
        *	returns:	    null
        */
        private _setupBalls():void {
            var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                positions   = [
                    [33 , 100],
                    [193, 100],
                    [353, 100]
                ],
                ballX       = 60,
                ballY       = 250,
                self = this;
            
            // Setup balls under cups
            for (var i = 0; i < 3; i++){
                var turn = new CLICKABLEGAMEOBJECT('miniGame_turn_' + i, { w: 146, h: 300 }, 2, this);
                turn.addBitmap({
                    name: "ball_dropShadow",
                    pos: {
                        x: 30,
                        y: 160 
                    },
                    scale:1,
                    frame: "mg1_glow",
                    spriteSheet: spritesheet
                });
                turn.addBitmap({
                    name: "ball_shadow",
                    pos: {
                        x: 24.5,
                        y: 219 
                    },
                    scale:1,
                    alpha: 0,
                    frame: "mg1_ref_green",
                    spriteSheet: spritesheet
                });
                turn.addBitmap({
                    name: "ball",
                    pos: {
                        x: 37,
                        y: 169
                    },
                    scale: 1.7,
                    frame: "ball1",
                    spriteSheet: spritesheet
                });
                turn.addBitmap({
                    name: "cup",
                    pos: {
                        x: 12,
                        y: 123
                    },
                    frame: 'mg1_cup1',
                    spriteSheet: spritesheet
                });
                turn.setEnabled(true);
                turn.active = false;
                turn.addAnimation('turnReminder');
                turn.setAnimation('reveal', 'miniGameOne', 0.25, 0, ['cup', 'ball'] );
                turn._ballIndexNumber = i;
                turn._ballNumber = 0;
                
                turn.setAction('click', function(turn) {
                    createjs.Sound.play("minigame1cup");
                    self.checkRevealed(turn);
                }.bind(null, turn));
                turn.setAction('rollover', function(turn) {
                    self._stopReminderSymbol(true, turn);
                }.bind(null, turn));
                turn.setAction('rollout', function(turn) {
                    self._stopReminderSymbol(false, turn);
                }.bind(null, turn));
                
                this._turnsArray.push(turn);
                turn.setPosition({
                   x: positions[i][0],
                   y: positions[i][1]
                });
            }
            
            this._setupClicks(turn);
        }
        
        /*
        *	name: 		    updateBalls()
        *	description:	updates the ball number and reflection colour
        *	params:		    null
        *	returns:	    null
        */
        public updateBall(turn:any) {
             var currentBall = turn.getBitmap("ball"),
                 reflection  = turn.getBitmap("ball_shadow"),
                 x           = turn._ballNumber;
                 
            if(x <= 9) {
                reflection.gotoAndStop('mg_ref_white');
            } else if (HELPER.between(x, 10, 19)) {
                reflection.gotoAndStop('mg1_ref_blue');
            } else if (HELPER.between(x, 20, 29)) {
                reflection.gotoAndStop('mg1_ref_red');
            } else if (HELPER.between(x, 30, 39)) {
                reflection.gotoAndStop('mg1_ref_green');
            } else if (HELPER.between(x, 40, 49)) {
                reflection.gotoAndStop('mg1_ref_yellow');
            } else if (HELPER.between(x, 50, 59)) {
                reflection.gotoAndStop('mg1_erf_purple');
            } else {
                reflection.gotoAndStop('mg1_ref_white');
            }
            
            currentBall.gotoAndStop("ball"+ turn._ballNumber);
            
            turn.getStage().update();
            TweenMax.to(reflection, 1, {alpha:1, delay: 0.5, onComplete: () => {
                // should update the colour of reflection 
            }})
        }
        
        /*
        *	name: 		    checkYourBall()
        *	description:	checks if your ball is a winner and sets the ball number
        *	params:		    null
        *	returns:	    null
        */
        public checkYourBall(turn:any, mgResult:number) {
             var random   = Math.random();
              if (mgResult > 0) {
                   turn.addBitmap({
                    name: "cup_shadow",
                    pos: {
                        x: 0,
                        y: -2
                    },
                    frame: 'mg1_highlight',
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    });
                   turn._ballNumber = this._ballNumberArray[2];
                   TweenMax.to(turn.getBitmap('cup_shadow'), 1, {alpha: 1, delay: 0.3})
                   turn.addAnimation('winReveal')
                   turn.setAnimation('winReveal', 'pulse', 0.5, 2, 2)
                   turn.winReveal();
              } else {
                  // lose
                   if(random < 0.5) {
                       turn._ballNumber = this._ballNumberArray[0];
                       this._l = true;
                   } else if (random > 0.5) {
                       turn._ballNumber = this._ballNumberArray[1]
                   }
              }
    
        }
       
       
       /*
        *	name: 		    checkOtherBalls()
        *	description:	checks if your ball is a winner and sets the remaining ball numbers
        *	params:		    null
        *	returns:	    null
        */
        public checkOtherBalls(turnSymbol:any, index: number, mgResult:number) {
            
            if (mgResult > 0){
                turnSymbol._ballNumber = this._ballNumberArray[index];
                turnSymbol.setAnimation('winReveal', 'fadeOut', 0.5, 2)
                turnSymbol.winReveal();
            } else {  
                if ( index === 0 ) {
                    if ( this._l ) {
                        turnSymbol._ballNumber = this._ballNumberArray[1]; 
                    } else {
                        turnSymbol._ballNumber = this._ballNumberArray[0]; 
                    }
                } else if ( index === 1 ) {
                    turnSymbol._ballNumber = this._ballNumberArray[2]; 
                }
                              
                
            }
        }
        
       /*
        *	name: 		    checkRevealed()
        *	description:	
        *	params:		    null
        *	returns:	    null
        */
        public checkRevealed(turn:any) {
            var count:    number  = 0,
                delay:    number  = 1,
                mgResult = TICKET.getInstance().getMiniGame()[0].mGW,
                index: number     = 0; 
            
            this.checkYourBall(turn, mgResult);
            this.updateBall(turn);
            turn.reveal();
            
            for (var i = 0; i < this._turnsArray.length; i++) {
                var turnSymbol = this._turnsArray[i];
                turnSymbol.setEnabled(false);
                turnSymbol.animationTimeLine.seek(0);
                turnSymbol.animationTimeLine.kill();
                
                if(!turnSymbol.getRevealed()){
                    
                    TweenMax.to(turnSymbol, delay, {
                        onStartParams: [turnSymbol, index],
                        onStart: (turnSymbol, index) => {
                            this.checkOtherBalls(turnSymbol, index, mgResult);
                            this.updateBall(turnSymbol);
                        },
						onCompleteParams: [turnSymbol],
						onComplete: (turnSymbol) => {
                            turnSymbol.reveal();
							count++;
							if (count === this._turnsArray.length - 1){
								TweenMax.delayedCall(1, () =>{    
                                    IWG.IWGEM.trigger('endMiniGame')
								})
							}
						}
					});
                    index++;
                }    
            }
        }
        
        private _endGameCheck():void {
            var prizeStar  = this.getChildByName('miniGame_prize');
            
            if (prizeStar.getRevealed() === true) {
                this._endMiniGame()
            } else {
                prizeStar.animate('prizePress')
                prizeStar.animationTimeLine.seek(0);
                prizeStar.animationTimeLine.kill();
                createjs.Sound.play('minigamePrizePrompt')
                this._endMiniGame();
            }
        }
        
        /*
        *	name: 		    _endMiniGame()
        *	description:	Change winning message to the prize value, bring on end button
        *	params:		    null
        *	returns:	    null
        */
        private _endMiniGame():void {
            var button  = this.getChildByName('miniGame_button'),
                buttonBitmap  = this.getChildByName('miniGame_button').getBitmap("continue_button"),
                message = this.getChildByName('miniGame_message'),
                messageBitmap = message.getBitmap('message');
                message.active = true;
            
            TweenMax.to(messageBitmap, 1, {alpha:0, delay:2, onComplete: () => {
                if (TICKET.getInstance().getMiniGame()[0].mGW > 0) {
                    IWG.IWGEM.trigger('prizeMove');
                    createjs.Sound.play("minigameEndWin");
                    messageBitmap.gotoAndStop(this._prizeFrameText);
                    message.setPosition({x: this._prizeTextPosX, y: 405});
                } else {
                    IWG.IWGEM.trigger('prizeLose');
                    messageBitmap.gotoAndStop('mg_end_lose')
                    createjs.Sound.play("minigameEndLose");
                    message.setPosition({x: 155, y: 412});
                }
                TweenMax.to(messageBitmap, 1, {alpha: 1, delay: 1, onComplete: () => {
                    button.active = true;
                    message.active = false;
                    TweenMax.to(buttonBitmap, 0.5, {alpha: 1, delay:0.5, onComplete: () => {
                        button.setEnabled(true);
                        button.active = false;
                        button.animate('buttonReminder');
                    }})
                }})
            }})
        }
        
       /*
        *	name: 		    _setupClicks()
        *	description:	setup the clicks for the game objects + clickable logic
        *	params:		    null
        *	returns:	    null
        */
        private _setupClicks(turn?: any):void {
            var prizeStar  = this.getChildByName('miniGame_prize'),
                prizeText  = this.getChildByName('miniGame_prize').getBitmap('prizeText'),
                button     = this.getChildByName('miniGame_button'),
                self       = this;
            
            // Prize actions
            prizeStar.setAction('click', function() {
               prizeStar.animate('prizePress')
               prizeStar.reveal();
               createjs.Sound.play('minigamePrizePrompt')
               
               prizeStar.animationTimeLine.seek(0);
               prizeStar.animationTimeLine.kill();
               
               prizeStar.setEnabled(false);
            }.bind(null, prizeStar));
            
            // Finish button animations
            button.addAnimation('buttonReminder')
            button.setAnimation('buttonReminder', 'pulse', 1, 4);
            button.addAnimation('click');
            button.setAnimation('click', 'click', 0.2, 0);
            
            // Finish button actions
            button.setAction('click', function(button) {
                createjs.Sound.play("minigameContinue");
                button.animate('click');
                IWG.IWGEM.trigger('miniGameOff');
                button.setEnabled(false);
            }.bind(null, button));
        
            button.setAction('rollover', function(button) {
            }.bind(null, button));
        
            button.setAction('rollout', function(button) {
            }.bind(null, button));
            
        }
        
       /*
        *	name: 		    _movePrize()
        *	description:	move the prize to the legend
        *	params:		    null
        *	returns:	    null
        */
        private _movePrize():void {
            this._miniGamePrize.movePrize();
        }
        
        /*
        *	name: 		    _movePrize()
        *	description:	move the prize to the legend
        *	params:		    null
        *	returns:	    null
        */
        private _movePrizeLose():void {
            this._miniGamePrize.movePrizeLose();
        }
        
       /*
        *	name: 		    _miniGameOn()
        *	description:	Alpha from 0 to 1 the minigame
        *	params:		    null
        *	returns:	    null
        */
        private _miniGameOn():void {
            var prizeStar  = this.getChildByName('miniGame_prize');
            this._checkRandNum();
            TweenMax.to(this.getDiv(), 1, {alpha:1, delay:1, zIndex:7, onStart: () => {
                prizeStar.setAnimation('prizeReminder', 'pulse', 0.75, 5);
                prizeStar.animate('prizeReminder');
                for (var i = 0; i < this._turnsArray.length; i++) {
                    var turn = this._turnsArray[i];
                    turn.setAnimation('turnReminder', 'pulse', 0.75, 5);
                    turn.animate('turnReminder');
                };
            }})
        }
        
        private _checkRandNum():void {
            var ballArray  = GLOBAL.getInstance().getFromGlobal('ballSelection');
            
            if (HELPER.isInArray(this._randNum.toString(), ballArray)) {
                this._randNum = Math.round(HELPER.getRandomNumber(1,59));
                this._prizeFrameName = "ball" + this._randNum;
                this._updatePrize();
                this._checkRandNum();
            }
        }
        
        private _updatePrize():void {
            var  gO        = this.getChildByName('miniGame_prizeSymbol'),
                 prizeBall = this.getChildByName('miniGame_prizeSymbol').getBitmap('prizeValue');
            
            prizeBall.gotoAndStop(this._prizeFrameName);
            gO.ballNumber = Number(this._prizeFrameName.substring(4));
            gO.getStage().update();
        }
        
       /*
        *	name: 		    _miniGameOff()
        *	description:	Alpha from 1 to 0 the minigame
        *	params:		    null
        *	returns:	    null
        */
        private _miniGameOff():void {
            TweenMax.to(this.getDiv(), 1, {alpha:0, delay:1, zIndex:1, onComplete: function() {
                IWG.IWGEM.trigger('resumeBallDrop');
            }})
        }
        
       /*
        *	name:		    _stopReminderSymbol
        *	description:	stops the reminder symbol
        *	params:		    reset:boolean
        *	return:		    null
        */
        private _stopReminderSymbol(reset:boolean, turn:any): void {
            for (var i = 0; i < this._turnsArray.length; i++) {
                   var turns = this._turnsArray[i];
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