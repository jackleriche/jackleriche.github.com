/// <reference path="../../../typings/tsd.d.ts" />

module com.camelot.iwg {
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        TICKET = IWG.Ticket,
        GAMEOBJECT = IWG.GameObject,
        ANIMATION = IWG.Animation,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS = IWG.SpriteSheets,
        images = CORE.iwgLoadQ.images,
        TILE = IWG.Tile,
        POPUP = IWG.Popup,
        ENDGAME = IWG.EndGame,
        GLOBAL = IWG.Global;

    export class Board {
        private static _instance: Board = new Board();

        public boardNum: number;
        public boardArray: any;
        private tilePositions: any;
        private iconRefs: any;

        private boardObjectsArray = [];
        public static totalTurns: number = -1;
        private ticketTotalTurns:number = -1;
        private gameEnding:boolean = false;
        
        // Popups
        public popUpCardOpen: Boolean = false;					    // to check if popup open when win legend

        public counter = null;
        public popupObject: any;
        public endGameObject: any;
        public diceObject:any;
        
        // board movement
        private diceDestination:number;
        private diceRollNumber:number;
        private arrowSpinnerSquare = null;
        private moveTypeDice:boolean = true;
        private popupMoveNumber:number = -1;
        private popUpTokenNumber:number = -1;
       
        constructor() {

            if (Board._instance) {
                throw new Error("Error: Instantiation failed: Use Board.getInstance() instead of new.");
            }
            Board._instance = this;
            
            GLOBAL.getInstance().addToGlobal('board', this);
                 
            this._subscribeBoard();  // this is not working correctly
        }
        
       private _subscribeBoard() {
           IWG.IWGEM.on('popupClosed', this.animatePopupSquare.bind(this));
           IWG.IWGEM.on('startTurn', this.startTurn.bind(this));
           IWG.IWGEM.on('queueFinished', this.checkOnLegendUpdate.bind(this) );
		}
		private _unsubscribeBoard() {
			IWG.IWGEM.off('popupClosed');
            IWG.IWGEM.off('startTurn');
            IWG.IWGEM.off('queueFinished'); 
		}

        public static getInstance(): Board {
            return Board._instance;
        }

        private getIconName(iconNumber: number): any {
            return this.iconRefs[iconNumber];
        }

        public getBoardArray(): any {
            return this.boardArray;
        }

        public getAllBoardObjects(): any {
            return this.boardObjectsArray;
        }

        public getBoardObject(tileNumber: number): any {
            return this.boardObjectsArray[tileNumber];
        }

        public initTicket(): void {
           TICKET.getInstance().setupTicket();
           
           this.boardNum = TICKET.getInstance().getBoardNumber();
           this.ticketTotalTurns =  TICKET.getInstance().getTurns().length;
           
        }


        public setupBoard(boardArray: any, tilePositions: any, iconRefs: any): void {

            this.boardArray = boardArray[this.boardNum];
            this.tilePositions = tilePositions;
            this.iconRefs = iconRefs;

            var mouseSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
            
            for (var i = 0; i < this.boardArray.length; i++) {

                var tileX = this.tilePositions[i][0],
                    tileY = this.tilePositions[i][1],
                    iconNumber = this.boardArray[i],
                    iconObject = this.getIconName(iconNumber);
                    
                // get gameobject working   
                var tileObject = new TILE("tileNumber_" + i, iconNumber, iconObject.name, iconObject.frameName, { w: 100, h: 100 });
                // tileObject.active = true;
                             
                tileObject.setPosition({ x: tileX, y: tileY });
                                
                // set the prize value if an IW
                if (iconObject.value) {
                    tileObject.setPrizeValue(iconObject.value);
                }

                if (iconObject.frameName) {
                   tileObject.createTile(mouseSpriteSheet);
                }

                if (i === 16) {
                    tileObject.createSwitchTile(mouseSpriteSheet);
                }

                this.boardObjectsArray.push(tileObject);
            }
            
            this.arrowSpinnerSquare =  this.boardObjectsArray[16];
            TICKET.getInstance().errorCheck(Board._instance);
        }
        
        /*
         *  name:           setupPopup
         *  description:    Creates a new popup, setting the size and position
         *  return:         void      
         */
        public setupPopup(): void {
            this.popupObject = new POPUP("popup", { w: 320, h: 190 });
            this.popupObject.setPosition({ x: -800, y: 250 })
            this.popupObject.createPopup();
        }
        
        // work out if the move takes the shortcut or not
		private checkShortPath(landed:Boolean):void {
            
            var moveAmount:number = -1;
              
			if(!landed) {
                
                if (this.moveTypeDice) {
                    moveAmount = this.diceRollNumber;
                } else {
                    moveAmount = this.popupMoveNumber;
                }
                                    
                // if a normal move, check dice
				if (this.counter.sqStartNum + moveAmount == this.counter.sqDestNum) {
					// is start + dice roll == correct up version
					this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["up"]);
				} else if (this.counter.sqStartNum + (moveAmount + 3) == this.counter.sqDestNum) {
					// start + dice roll + 3?
					this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["down"]);
					this.counter.sqCurrentNum = 19;
				}
                
			} else {
                
                var nextLandSquare: number = TICKET.getInstance().getTurn(Board.totalTurns + 1).bP - 1;
                var nextDiceRoll:number = TICKET.getInstance().getTurn(Board.totalTurns + 1).d1;
                var totalDest:number = this.counter.sqStartNum + nextDiceRoll;
                
                if (totalDest === nextLandSquare) {
                    this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["up"]);
				} else {
                    this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["down"]);
                    this.counter.sqCurrentNum = 19;
				}
			}
		}

        /*
         *  name:           setupEndGame
         *  description:    Creates a new end game, setting the size and position
         *  return:         void      
         */
        public setupEndGame(): void {
            this.endGameObject = new ENDGAME("EndGame", { w: 320, h: 190 });
            this.endGameObject.setPosition({ x: 30, y: 0 })
            this.endGameObject.setScale(0,0);
            this.endGameObject.createEndGame();
        }
        
        /*
         *  name:           setupEndGame
         *  description:    Check if you need to set the cross road on this turn, will you pass through it 
         *  params:     	fromSq:number, toSq:number, moveDistance:number
         *  return:         void      
         */
		private checkShortPathOnThisTurn(fromSq:number, toSq:number, moveDistance:number):void {
                        
			if ((fromSq <= 16) && (toSq > 16)) {
				// this passes over the cross road in this turn
                
				if (fromSq + moveDistance == toSq) {
					//  correct up version
                    this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["up"]);
				} else if (fromSq + (moveDistance + 3) == toSq) {
					// taking shortcut
                    this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["down"]);
				} else {
					console.log("error on cross road check");
				}
			} else {
                // normal move, reset the arrow animation
                this.arrowSpinnerSquare.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["normal"]);
            }
		}
        
        /*
         *  name:           startTurn
         *  description:    increments the total turns counter, gets the desitination from the ticket
         *  return:         void      
         */
        public startTurn(): void {
            
            this.counter.sqStartNum = this.counter.sqCurrentNum;
            this.diceDestination = TICKET.getInstance().getTurn(Board.totalTurns).bP;
            this.diceRollNumber = TICKET.getInstance().getTurn(Board.totalTurns).d1;
            
            // set destination for counter
            this.counter.sqDestNum = this.diceDestination - 1;
            this.moveTypeDice = true;
            
            this.counter.moveCounterNext();
            
            // check if this move goes past the crossroad square
			this.checkShortPathOnThisTurn(this.counter.sqStartNum,this.counter.sqDestNum,this.diceRollNumber);
        }
        
        // add collected tag
        private addCollected(tileObject: any) {	
            tileObject.animate("collected");
        }
        
		/*
         *  name:           accumulateSquare
         *  description:    creates a clone of the current tile and moves to legend, if its a popup it shows the correct popup 
         *  params:     	square:number, token:number, tileObject:any, isPopup?:boolean
         *  return:         void      
         */
        private accumulateSquare(square: number, token: number, tileObject: any, isPopup?: boolean, moveSpaces?: number): void {

            this.addCollected(tileObject);

            //addToLegend(token,square);
            
            // create a new gameobject based on the current tile and then move to the legend and destroy	
            var iconClone = new GAMEOBJECT("iconClone", { w: 100, h: 100 }, 11);

            iconClone.addBitmap({
                name: "icon",
                pos: { x: 50, y: 50 },
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                frame: tileObject.frameName,
                scale: 1,
                doReg: { center: true }
            });

            iconClone.setPosition(tileObject.getPosition());
            iconClone.addAnimation('moveToLegend');
            iconClone.setAnimation("moveToLegend", "moveToLegendAnimation", 0.5, 0.5, [token, square]);
            iconClone.animate("moveToLegend");

            if (isPopup) {
                this.counter.setCounterDirection(token);
                this.popupObject.updateMessage(token, moveSpaces);
                this.popupMoveNumber = moveSpaces;
                this.popUpTokenNumber = tileObject.tokenNumber;
            }
            
        }
        

        private checkOnLegendUpdate():void {
 			if (!this.popUpCardOpen) {
                 this.endGameCheck();
 			} else {
 				// popup move so complete next move
                this.moveAfterLegend()
 			}
 		}

        public moveAfterLegend() {

            IWG.IWGEM.trigger('popupLanded');             // triggers the popup open animation
            this.popUpCardOpen = false;

        }
        
        private animatePopupSquare() {
            var tileObject = this.boardObjectsArray[this.counter.moveStartSquare]
                tileObject.animate("bonusLanded");            // reveal right away
                this.playBonusSquareMoveSound();
                this.moveTypeDice = false;  
        }
        
        private playBonusSquareMoveSound():void {
            
            switch(this.popUpTokenNumber) {
                case 6: 
                    createjs.Sound.play("looptheloop");
                break;
                case 7:
                    createjs.Sound.play("bootkick");
                break;
                case 8:
                    createjs.Sound.play("meow");
                break;
            }    
        }
        
        // called after game clicks
		private endGameCheck():void {
			if ((Board.totalTurns +1) == this.ticketTotalTurns) {
                // has legend finished updating
				// if not game end flag been hit
				if (!this.gameEnding) {
					this.gameEnding = true;
					this.endGameStart();   
				}
			} else {
				// carry on
                this.enableGameButtons();
			}
		}
        
        private enableGameButtons():void {
			// unless card open still
			if (!this.popUpCardOpen) {
                // add a delay
			 	this.diceObject.setEnabled(true);
			}
		} 
        
        private endGameStart():void {
            IWG.IWGEM.trigger('endGameStart');
        }
        
        
        
        /*
         *  name:           accumulateIW
         *  description:    win reveal on the instant win tile, triggers event for landing on an IW
         *  params:     	square:number,iwTokenNum:number, tileObject:any
         *  return:         void      
         */
        private accumulateIW(square: number, iwTokenNum: number, tileObject: any): void {	
	
            // channel = endWinSound.play(0, 1);	
               createjs.Sound.play("yipee");

                 
            this.addCollected(tileObject);
            
            // do win reveal
            tileObject.winReveal();

            IWG.IWGEM.trigger('iwLanded');  // not in use yet
            
            // do end game check
            this.endGameCheck();
        }
        
        /*
         *  name:           accumulateRollAgain
         *  description:    adds an extra turn, triggers event for landing on an extra turn
         *  params:     	square:number,iwTokenNum:number, tileObject:any
         *  return:         void      
         */
        private accumulateRollAgain(square: number, token: number, tileObject: any): void {
            this.addCollected(tileObject);

            IWG.IWGEM.trigger('rollAgainLanded');
		    
            // do end game check
            this.endGameCheck();
        }
        
        /*
         *  name:           processSquare
         *  description:    case to work out what type of tile it has landed on and deals with it
         *  params:     	square: number, tileObject: any
         *  return:         void      
         */
        public processSquare(square: number, tileObject: any): void {
                        
            var token = tileObject.tokenNumber;
            tileObject.active = true;
 
            switch (token) {
                case 0:
                    //"Blank" - check for end game blank last turn
                    if (square == 16) {
                        this.checkShortPath(true);
                    } else {
                        tileObject.active = false;
                    }
                    this.endGameCheck();

                    break;
                case 6:
                case 7:
                case 8:	
                    // popup move
                    this.popUpCardOpen = true;
                    // set move counts
                    var moveSpaces = TICKET.getInstance().getTurn(Board.totalTurns).eM;
                    var moveDestination = TICKET.getInstance().getTurn(Board.totalTurns).eBp;
                    var moveDestinationToken = TICKET.getInstance().getTurn(Board.totalTurns).eTt;
                    
                    // populated these but may not be needed
                    this.counter.moveStartToken 	= token;
                    this.counter.moveStartSquare 	= square;
                    
                    //update destination to match outcome
                    this.counter.sqDestNum = moveDestination - 1;	

                    // normal square
                    this.accumulateSquare(square, token, tileObject, true, moveSpaces);
                    break;
                case 9:	
                    // roll again
                    this.accumulateRollAgain(square, token, tileObject);
                    break;
                case 10:
                case 11:
                case 12:
                    //"IW";
                    this.accumulateIW(square, token, tileObject);
                    break;
                default:
                    // normal square
                    this.accumulateSquare(square, token, tileObject);
                    break;
            }

        }
    }
}