/// <reference path="../../../typings/tsd.d.ts" />

/*  Error codes
    mIWGd00007 - prizelist length too long/short 
    mIWGd00008 - turns length too short/long
    mIWGd00009 - slot order less or greater than 6 
    mIWGd00010 - disallowed value in turn
    mIWGd00011 - rABC is missing
    mIWGd00012 - win on first three turns
    mIWGd00013 - 
    mIWGd00014 - 
    mIWGd00015 - 
    mIWGd00016 - 
    mIWGd00017 -
    mIWGd00018 - 
    mIWGd00019 - 
    // Minigame specific
    mIWGd00023 - minigame prize array not in ascending order
    mIWGd00024 - 
    mIWGd00025 - no more than 1 minigame per ticket
    mIWGd00026 - disallowed value in minigame
    mIWGd00027
    mIWGd00028
    mIWGd00029
    // Range checks
    mG, mGR, mGW, mGN, p, rA, rB, rC, 
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

        private _ticket:    any                     = null;
        private _outcome:   any                     = null;
        private _params:    any                     = [];
        private _prizeList: any                     = [];
        private _miniGame:  any                     = [];
        private _star:      any                     = [];
        private _turns: Array<Object>               = [];
        private _total:number                       = 0;
        public legendPrizeValues : Array<number>    = []; 

        constructor() {

            if (Ticket._instance) {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
            Ticket._instance = this;

        }
        
        /*
         *  name:           _setUpMiniGame
         *  description:    setup card numbers
         *  return:         void      
         */	
        private _setUpMiniGame(): void {
            
            for (var i = 0; i < this._turns.length; i++){
                var currentTurn = this._turns[i];
                var turnsObj = {
                    mG:  Number(currentTurn['mG']),
                    mGR: Number(currentTurn['mGR']),
                    mGW: Number(currentTurn['mGW']),
                    mGN: currentTurn['mGN']
                }
                if (!isNaN(turnsObj.mG)){
                    this._miniGame.push(turnsObj)
                }
            }
            this._checkValues(this._miniGame, "mG", 1, 2)
            this._checkValues(this._miniGame, "mGR", 0, 6)
            this._checkValues(this._miniGame, "mGW", 0, 1)
        }
        
        /*
         *  name:           _setUpStar
         *  description:    setup card numbers
         *  return:         void      
         */	
        private _setUpStar(): void {
            
            for (var i = 0; i < this._turns.length; i++){
                var currentTurn = this._turns[i];
                var turnsObj = {
                    sA:  Number(currentTurn['sA']),
                    sB:  Number(currentTurn['sB']),
                    sC:  Number(currentTurn['sC']),
                    sW:  Number(currentTurn['sW'])
                }
                if (!isNaN(turnsObj.sA)){
                    this._star.push(turnsObj)
                }       
            }
        }
        
        /*
         *  name:           _setUpTurns()
         *  description:    setup turn data 
         *  params:         null
         *  returns:        null
         */
        private _setUpTurns() {
            this._turns = this._ticket.g1.turn;

            this._checkValues(this._turns, "p", 0, 7);
            this._checkValues(this._turns, "rA", 0, 60);
            this._checkValues(this._turns, "rB", 0, 59);
            this._checkValues(this._turns, "rC", 0, 56);
        }
        
        /*
         *  name:           getTurn()
         *  description:    return turn object in turns array
         *  params:         index: number
         *  returns:        turnData:Object
         */
        public getTurn(index) {
            return this._turns[index];
        }
        /*
         *  name:           getMiniGame()
         *  description:    return turn object in turns array
         *  params:         index: number
         *  returns:        turnData:Object
         */
        public getMiniGame() {
            return this._miniGame;
        }
        /*
         *  name:           getInstance()
         *  description:    return ticket instance
         *  params:         null
         *  returns:        Ticket
         */
        public static getInstance(): Ticket {
            return Ticket._instance;
        }
        /*
         *  name:           getTicket()
         *  description:    return ticket object
         *  params:         null
         *  returns:        ticket:Object
         */
        public getTicket():  any {
            return this._ticket;
        }
        /*
         *  name:           getOutcome()
         *  description:    return the outcome object
         *  params:         null
         *  returns:        outcome:Object
         */
        public getOutcome(): any {
            return this._outcome;
        };
        /*
         *  name:           getParams()
         *  description:    return params
         *  params:         null
         *  returns:        params:Object
         */
        public getParams():  any {
            return this._params;
        };


        /*
         *  name:           setupTicket
         *  description:    sets up the ticket and the ticket data, cleans the pList array from strings to numbers
         *  return:         void      
         */
        public setupTicket(): void {
            
            this._ticket = CORE.IWG.ame('ticket');
            
            this._outcome = {
                amount: Number(this._ticket.outcome.amount),
                tier: Number(this._ticket.outcome.tier),
                wT: Number(this._ticket.outcome.wT)
            };
            
            this._params = this._ticket.params.sO.split(',');
            
            var prizeList = this._ticket.prizeList.a.split(',');
            for (var k in prizeList) {
                this._prizeList.push(Number(prizeList[k]));
            };
            
            this._setupLegend();
            this._setUpTurns();
            this._setUpMiniGame();
            this._setUpStar();
            this.errorCheck();
            
        }
        
        
        
        /*
         *  name:           errorCheck
         *  description:    error checks to check the ticket is valid
         *  return:         void      
         */	
        public errorCheck(): void {
            var prizeTotal,
                turnsNew = this._turns.slice(0); ;
            
            console.log();
            
            // check for a value thats been removed or added to the prize array
            if (this._prizeList.length != 8) {
                CORE.IWG.ame('error', {mess: ['mIWGd00007 prizelist length too long/short']});
            }
            
            // check for the length of the turns array 
            if (!((this._turns.length === 6) || (this._turns.length === 7 && minigame.mGW === 1 && minigame.mGR === 2))) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00008 turns length too short/long']});
            }
            
            // slot order less or greater than 6
            if (this._params.length != 6) {
                CORE.IWG.ame('error', {mess: ['mIWGd0009 slot order less or greater than 6']});
            }
            
            
            for (var i = 0; i < this._turns.length; i++) {
                var turns = this._turns[i];
                // disallowed value in turns p
                if ((Number(turns['p']) === 4) || (Number(turns['p']) === 6)){
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 disallowed value in turn']});
                }
                // All must be present on every turn 
                if (!(turns.hasOwnProperty('rA') && turns.hasOwnProperty('rB') && turns.hasOwnProperty('rC'))) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00011 rABC is missing']});
                }
            }
            
            // cant win on first 3 turns
            var firstThree = turnsNew.slice(0, 3);
            for (var i = 0; i < firstThree.length; i++) {
                var three = Number(firstThree[i]['w'])
                if (three === 1){
                    CORE.IWG.ame('error', {mess: ['mIWGd00012 win on first three turns']});
                }
            }
            
            if (this._miniGame.length > 0) {
                var mGNumber: Array <number>  = [],
                    minigame                  = this._miniGame[0],
                    minigameNumbers           = minigame.mGN.split(',').map(Number);
                    
                // Minigame specific checks 
                // ensuring the mGN array is in ascending order 
                if ((minigameNumbers[0] > minigameNumbers[1]) || (minigameNumbers[1] > minigameNumbers[2])){
                    CORE.IWG.ame('error', {mess: ['mIWGd00023 minigame prize array not in ascending order']});
                }
                
                // if a mG appears more than once in a ticket
                for (var i = 0; i < this._miniGame.length; i++) {
                    var mG = Number(this._miniGame[i].mG);
                    mGNumber.push(mG)
                }
                if(mGNumber.length > 1){
                    CORE.IWG.ame('error', {mess: ['mIWGd00025 no more than 1 minigame per ticket']});
                }
                
                // disallowed value in mGR
                if (minigame.mGR === 3) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00026 disallowed value in minigame']});
                }
            }
        }
        
        /*
         *  name:           _checkValues()
         *  description:    ticket check method that errors if the range of a given ticket data is less then the lower, or higher then the max
         *  params:         gameData: turnObject, value: string, min: number, max: number
         *  returns:        null
         */        
        private _checkValues(gameData, value, min, max): void {
            
            for(var i = 0; i < gameData.length; i++ ){
                
                var turnData = gameData[i];
                if (turnData.hasOwnProperty(value) ) {
                    var v:number = Number(turnData[value]);
                    if ( v < min || v > max ){
                        console.log(v);
                        CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range']});
                    }
                }
                
            }
            
        } // end _checkValues
        
        /*
         *  name:           _setupLegend()
         *  description:    setup the order of the main legend so we can refer to it later when seting up the Board Layout
         *  params:         null
         *  return:         null
         */
        private _setupLegend() {
            
            for ( let i = 0; i < this.getParams().length; i++ ) {
                
                var prizeAmount = this._prizeList[this.getParams()[i]];
                this.legendPrizeValues.push(prizeAmount);
                
            }
            
        } // end _setupLegend()
    }
}