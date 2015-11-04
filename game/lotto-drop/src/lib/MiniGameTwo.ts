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
        
        export class MiniGameTwo extends Scene {
            private _turnsArray             = [];
            private _buttonArray            = [];
            private _turnSymbolArray        = [];
            private _miniGamePrizeIndex     = TICKET.getInstance().getMiniGame()[0].mGR;
            private _prizeFrameName:string  = '';
            private _prizeFrameText:string  = ''; 
            private _framePosX:number       = null;
            private _framePosY:number       = null; 
            private _prizeTextPosX:number   = null; 
            private _prizeTextPosY:number   = 350;
            private _randNum:Number         = Math.round(HELPER.getRandomNumber(1,59));
            private _miniGamePrize:any;

            private _ballNumberArray        = TICKET.getInstance().getMiniGame()[0].mGN.split(',').map(Number);
            private _l: boolean             = false;
            
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
            
            var or = new GAMEOBJECT('miniGame_or', { w: 29, h: 14 }, 2, this);
            or.addBitmap({
                name: 'or',
                pos: {
                x: 0,
                y: 0
                },
                frame: "mg2_word_or",
                spriteSheet: spritesheet
            });
            or.setPosition({
                x: 250,
                y: 310
            });
            
            var message = new GAMEOBJECT('miniGame_message', { w: 492, h: 45 }, 2, this);
            message.addBitmap({
                name: 'message',
                pos: {
                x: 0,
                y: 0
                },
                frame: "mg2_instructions",
                spriteSheet: spritesheet
            });
            message.active = false;
            message.setPosition({
                x: 30,
                y: 380
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
                buttonArray = ['mg2_hi', 'mg2_lo'],
                positions   = [
                    [120 , 110],
                    [270 , 110],
                ],
                buttonPositions   = [
                    [105 , 250],
                    [310 , 250],
                ],
                self = this;
            
            // Setup balls under cups
            for (var i = 0; i < 2; i++){
                var turn = new GAMEOBJECT('miniGame_ball_' + i, { w: 146, h: 146 }, 2, this);
                turn.addBitmap({
                    name: "ball_dropShadow",
                    pos: {
                        x: 27,
                        y: 22
                    },
                    scale: 1,
                    frame: "mg1_glow",
                    spriteSheet: spritesheet
                });
                turn.addBitmap({
                    name: "ball",
                    pos: {
                        x: 35,
                        y: 30
                    },
                    scale: 1.7,
                    frame: 'ball_grey',
                    spriteSheet: spritesheet
                });
                turn.setPosition({
                   x: positions[i][0],
                   y: positions[i][1]
                });
                turn._ballIndexNumber = i;
                turn._ballNumber = 0;
                this._turnsArray.push(turn);
                
                var hilo = new CLICKABLEGAMEOBJECT('miniGame_' + buttonArray[i], {w:118, h:118}, 2, this) 
                hilo.addBitmap({
                    name: "cup",
                    pos: {
                        x: 0,
                        y: 0
                    },
                    frame: buttonArray[i],
                    spriteSheet: spritesheet
                });
                hilo.setEnabled(true);
                hilo.active = false;
                hilo.setPosition({
                   x: buttonPositions[i][0],
                   y: buttonPositions[i][1]
                });
                hilo.addAnimation('hiloPress')
                hilo.addAnimation('hiloReminder');
                hilo.setAnimation('hiloPress', 'hiloPress', 0.25, 0, 'miniGameTwo')
                hilo._buttonNumber = i;
                
                hilo.setAction('click', function(hilo) {
                    hilo.animate('hiloPress')
                    createjs.Sound.play('minigame2Button')
                    self._hiloEnable(false, hilo)
                    self.checkRevealed(turn, hilo);
                }.bind(null, hilo));
                
                hilo.setAction('rollover', function(hilo) {
                    self._stopReminderSymbol(true, hilo);
                }.bind(null, hilo));
                      
                hilo.setAction('rollout', function(hilo) {
                    self._stopReminderSymbol(false, hilo);
                }.bind(null, hilo));  
                
                this._buttonArray.push(hilo);
            }
            
            this._setupClicks();
            this._setFirstBall();
        }
        
        /*
        *	name: 		    updateBalls()
        *	description:	updates the ball number and reflection colour
        *	params:		    null
        *	returns:	    null
        */
        public updateBall(turn:any) {
             var currentBall = turn.getBitmap("ball");
                 
             currentBall.gotoAndStop("ball"+ turn._ballNumber);
            
             turn.getStage().update();
        }
        
        /*
        *	name: 		    checkYourBall()
        *	description:	checks if your ball is a winner and sets the ball number
        *	params:		    null
        *	returns:	    null
        */
        public checkYourBall(yourBall:any, mgResult:number, hilo:any) {
              if (mgResult > 0) {
                  if (hilo._buttonNumber === 0){
                      yourBall._ballNumber = this._ballNumberArray[2];
                  } else {
                      yourBall._ballNumber = this._ballNumberArray[0];
                  }
                  this._turnsArray[0].setAnimation('winReveal', 'fadeOut', 0.5, 2)
                  yourBall.setAnimation('winReveal', 'pulse', 0.5, 3, 2.5)
                  yourBall.winReveal();
                  this._turnsArray[0].animate('winReveal');
              } else {
                  if (hilo._buttonNumber === 0) {
                      yourBall._ballNumber = this._ballNumberArray[0];    
                  } else {
                      yourBall._ballNumber = this._ballNumberArray[2];
                  }
              }
    
        }
       
       /*
        *	name: 		    setFirstBall()
        *	description:	sets the first ball to the middle number from the ball array
        *	params:		    null
        *	returns:	    null
        */
        private _setFirstBall() {
            var firstBall = this.getChildByName('miniGame_ball_0'); 
            firstBall._ballNumber = this._ballNumberArray[1];
            this.updateBall(firstBall);
        }
        
       /*
        *	name: 		    checkRevealed()
        *	description:	
        *	params:		    null
        *	returns:	    null
        */
        public checkRevealed(turn:any, hilo:any) {
            var count:    number  = 0,
                delay:    number  = 1,
                mgResult = TICKET.getInstance().getMiniGame()[0].mGW,
                index: number     = 0;
                
            this.checkYourBall(turn, mgResult, hilo);
            this.updateBall(turn);
            turn.reveal();
            TweenMax.delayedCall(1, () =>{    
                IWG.IWGEM.trigger('endMiniGame')
            })
        }
        
        /*
        *	name: 		    _endGameCheck()
        *	description:	checks the end game to see whether the prize has been revealed or not
        *	params:		    null
        *	returns:	    null
        */
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
                message       = this.getChildByName('miniGame_message'),
                messageBitmap = message.getBitmap('message');
                message.active = true;
            
            TweenMax.to(messageBitmap, 1, {alpha:0, delay:2, onComplete: () => {
                if (TICKET.getInstance().getMiniGame()[0].mGW > 0) {
                    IWG.IWGEM.trigger('prizeMove');
                    createjs.Sound.play("minigameEndWin");
                    messageBitmap.gotoAndStop(this._prizeFrameText)
                    message.setPosition({x: this._prizeTextPosX, y: 370});
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
        
        private _hiloEnable(enable:boolean, hilo:any) {
           var orText = this.getChildByName('miniGame_or'),
               fadeButton:any;
           orText.addAnimation('orFade');
           orText.setAnimation('orFade', 'fadeOff', 0.3, 1);
          
            if (hilo._buttonNumber === 0){
                fadeButton = this._buttonArray[1];
            } else {
                fadeButton = this._buttonArray[0];
            }
            
            for (var i = 0; i < this._buttonArray.length; i++) {
                   var button = this._buttonArray[i];
                   if (enable){
                        button.setEnabled(true);
                        button.active = true;
                        button.animate('hiloReminder')
                   } else {
                       button.setEnabled(false);
                       fadeButton.addAnimation('fadeOff');
                       fadeButton.setAnimation('fadeOff', 'fadeOff', 0.3, 1);
                       orText.animate('orFade');
                       fadeButton.animate('fadeOff')
                       button.active = false;
                       button.animationTimeLine.seek(0);
                       button.animationTimeLine.kill();
                   }
               }
        }
        
        /*
        *	name: 		    _setupClicks()
        *	description:	setup the clicks for the game objects + clickable logic
        *	params:		    null
        *	returns:	    null
        */
        private _setupClicks():void {
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
                for (var i = 0; i < this._buttonArray.length; i++) {
                    var turn = this._buttonArray[i];
                    turn.setAnimation('hiloReminder', 'pulse', 0.75, 5);  
                    turn.animate('hiloReminder')
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
            
            TweenMax.to(this.getDiv(), 1, { alpha:0, delay:1, zIndex: 1, onComplete: function() {
                IWG.IWGEM.trigger('resumeBallDrop');
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