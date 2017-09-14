/// <reference path="../../../typings/tsd.d.ts" />

/*  Error codes
    mIWGd00007 - incorrect prize value added in pList    
    mIWGd00008 - board token mismatch - normal turn
    mIWGd00009 - shortcut or dice mismatch on turn
    mIWGd00010 - board token mismatch popup 
    mIWGd00011 - EBP mismatch on turn
    mIWGd00012 - Error on specific turn, extra turn but not enough turns
 */
module com.camelot.iwg {
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        ANIMATION = IWG.Animation,
        SPRITESHEETS = IWG.SpriteSheets,
        images = CORE.iwgLoadQ.images;

    export class Ticket {
        private static _instance: Ticket = new Ticket();

        private _ticket: any = null;
        private _outcome: any = null;
        private _params: any = null;
        private _turns: any = [];
        private _boardNumber: number = -1;
        public  errorTokenList: any = [];
        public  errorPrizeList: any = [];

        constructor() {

            if (Ticket._instance) {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
            Ticket._instance = this;
        }

        public static getInstance(): Ticket {
            return Ticket._instance;
        }

        public getTicket(): any {
            return this._ticket;
        }
        public getOutcome(): any {
            return this._outcome;
        };
        public getParams(): any {
            return this._params;
        };
        public getTurns(): any {
            return this._turns;
        };
        public getTurn(turnNumber: number) {
            return this._turns[turnNumber];
        }
        public getBoardNumber(): number {
            return this._boardNumber;
        }
        
        /*
         *  name:           sortTurns
         *  description:    sorts the turns data from the ticket and pushes it into the turnsObj Obeject
         *  return:         void      
         */	
        private sortTurns(): void {
            var turns = this._ticket.turn;

            for (var i = 0; i < turns.length; i++) {
                var currentTurn = turns[i];
                var turnsObj = {
                    name: currentTurn.name,
                    d1: Number(currentTurn.d1),
                    bP: Number(currentTurn.bP),
                    tT: Number(currentTurn.tT),
                    w: Number(currentTurn.w),
                    prizeID: Number(currentTurn.prizeID),
                    prize: this._params.pList[Number(currentTurn.prizeID)]
                };
                if (currentTurn.eM) {
                    turnsObj["eM"] = Number(currentTurn.eM)
                }
                if (currentTurn.eBp) {
                    turnsObj["eBp"] = Number(currentTurn.eBp)
                }
                if (currentTurn.eTt) {
                    turnsObj["eTt"] = Number(currentTurn.eTt)
                }
                this._turns.push(turnsObj);
            }
        }
        
        /*
         *  name:           setupTicket
         *  description:    sets up the ticket and the ticket data, cleans the pList array from strings to numbers
         *  return:         void      
         */
        public setupTicket(): void {
            this._ticket = CORE.IWG.ame('ticket');
            this._boardNumber = Number(this._ticket.params.bN);

            this._outcome = {
                amount: Number(this._ticket.outcome.amount),
                tier: Number(this._ticket.outcome.prizeTier)
            };

            var cleanpList = [];
            var pList = this._ticket.params.pList.split(',');

            for (var k in pList) {
                cleanpList.push(Number(pList[k]));
            };

            this._params = {
                bN: this._boardNumber,
                pList: cleanpList,
                wT: Number(this._ticket.params.wT)
            }
            this.sortTurns();
        }
        
        /*
         *  name:           errorCheck
         *  description:    error checks to check the ticket is valid
         *  return:         void      
         */	
        public errorCheck(board: any): void {
            console.log("Error check");
            
            var lastPosition:number    = 0;
			var lastBpPosition:number  = 0;
			var lastEbpPosition:number = 0;
            var boardTokenDice:number;
			var boardTokenPopup:number;
            var total:number = 0;
            
            var dice1Roll:number;
			var finalLocation:number;
            
            for(var i = 0; i < this._turns.length ; i++) {
                var currentTurn = this.getTurn(i);
                var d1          = currentTurn.d1;
                var bP          = currentTurn.bP;
                var tT          = currentTurn.tT;
                var eM          = currentTurn.eM;
                var eBp         = currentTurn.eBp;
                var eBt         = currentTurn.eTt;
                
                dice1Roll = d1;
                
                this.errorTokenList.push(tT)
                if (eBt != undefined) {
                   this.errorTokenList.push(eBt);
                }
                
                // incorrect prize value added/changed in prize list 
                for (var i = 0; i < this._params.pList.length; i++){                
                    total += this._params.pList[i];
                }
                
                if (total !== 8668){
                    CORE.IWG.ame('error', {mess: ['mIWGd00007 incorrect prize value added in pList']});
                }
                
                // Prize value IW check
                var prize = 0;
                switch(tT){
                    case 10:
						prize = 2;
						break;
					case 11:
						prize = 5;
						break;
					case 12:
						prize =  50;
						break;
                }
                switch(eBt){
                    case 10:
						prize = 2;
						break;
					case 11:
						prize = 5;
						break;
					case 12:
						prize = 50;
						break;
                }
                // If prize is not 0 add to the prize list
                if(prize != 0) {
                    this.errorPrizeList.push(prize);
                }
                
                var extraMove:number = 0;
				// check for em +/-
                if(eM != undefined) {
					// work of if em is plus or minus
					switch(tT) {
					case 6:
					case 8:
						extraMove = eM;
						break;
					case 7:
						extraMove = -eM;
						break;					
					}
				}
                
                lastBpPosition  = bP;
                lastEbpPosition = eBp;
            
            
               boardTokenDice = board.getBoardObject(bP - 1).tokenNumber;
                if (boardTokenDice != tT){
                    CORE.IWG.ame('error', {mess: ['mIWGd00008 board token mismatch - normal turn']});
                }
                
                // normal turn + adjust for passing zero		
				finalLocation = dice1Roll + lastPosition;
				if(finalLocation > 24) {
					finalLocation -= 24;
				}
                
                if(finalLocation != bP) {
					// not a normal dive move, but am i a shortcut?
					if(finalLocation != bP-3) {
						CORE.IWG.ame('error', {mess: ['mIWGd00009 shortcut or dice mismatch on turn']});     
					}
				}	
                
                if(extraMove == 0){
                    // Update the last position for the next go based on dice position
					lastPosition = bP;
                    
                } else {
                   
                    // if turn is a popup
					boardTokenPopup = board.getBoardObject(eBp - 1).tokenNumber;
                    
					if (boardTokenPopup != eBt) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00010 board token mismatch popup' + i]});
					}
                    
                    finalLocation = bP + extraMove;
					// popup - adjust for passing zero	
					if(finalLocation > 24) {
						finalLocation -= 24;
					}
                    
                    if (finalLocation != eBp) {
						if(finalLocation != eBp-3) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00011 EBP mismatch on turn']});
						}
					}
                    lastPosition = eBp;
                }
                
                // extra check for length on extra rolls
				if((tT == 9) || (eBt == 9)) {
					if(this._turns.length != 7) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00012 Error on turn ' +i +" extra turn but not enough turns"]});
					}
				}
            }
        }
    }
}