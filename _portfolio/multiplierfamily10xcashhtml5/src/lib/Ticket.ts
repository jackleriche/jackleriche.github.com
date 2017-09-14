/// <reference path="../imports/js/Sideplay.ts" />

/*  Error codes
    mIWGd00007 - length too long/short 
    mIWGd00008 - disallowed value in amount (NaN)
    mIWGd00009 - losing tier but amount is not £0.00 
    mIWGd00010 - not valid symbol number between 30 and 40 or 5, 10, 20
    mIWGd00011 - incorrect/duplicate value in the array
    mIWGd00012 - ticket value out of range
    mIWGd00013 - incorrect prize value added/changed in prize list
    mIWGd00014 - duplicate number when there shouldnt be
    mIWGd00015 - array has a word or symbol within
    mIWGd00016 - amount is not vaild/tier is not vaild tier outcome
    mIWGd00017 - w value on a losing ticket
    mIWGd00018 - t number states a multipler, but no multiplier is present
    mIWGd00019 - wrong multiplier value for symbol number
    mIWGd00020 - IWGBank > ticket amount
    mIWGd00021 - IWGBank != ticket amount
    mIWGd00022 - IWGBank not used
    mIWGd00023 - prizelist blank
    mIWGd00024 - multiplier present when shouldnt be
    mIWGd00025 - winning symbol blank
 */
 
module com.camelot.iwg {
    var CAMELOT: any    = com.camelot,
        CORE            = CAMELOT.core,
        IWG             = CAMELOT.iwg,
        GAMEOBJECT      = IWG.GameObject,
        ANIMATION       = IWG.Animation,
        SPRITESHEETS    = IWG.SpriteSheets,
        HELPER          = IWG.Helper,
        images          = CORE.iwgLoadQ.images;

    export class Ticket {
        private static _instance: Ticket = new Ticket();

        private _ticket:                 any           = null;
        private _outcome:                any           = null;
        private _prizeList:              any           = [];
        private _winningSymbols:         Array<number> = [];
        private _turns:                  Array<Object> = [];
        private _multiOrder:             Array<number> = []; 
        private _turnNums:               Array<number> = [];
        private _prizeNums:              Array<number> = [];
        private _multiNums:              Array<number> = [];
        private _symbolNums:             Array<number> = [];
        private _winnerNums:             Array<number> = [];
        private _count:                  number        = 0;
        private _w:                      number        = 0;

        constructor() {

            if (Ticket._instance) {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
            Ticket._instance = this;

        }
        
        /*
         *  name:           _setupTurns()
         *  description:    setup turn data into a more user friendly
         *                  in a more meaningful way
         *  params:         null
         *  returns:        null
         */
        private _setupTurns() {
            this._turns = this._ticket.g1.turn;
            
            for (var i = 0; i < this._turns.length; i++) {
                var iNums = Number(this._turns[i]['i']);
                var tNums = Number(this._turns[i]['t']);
                var pNums = Number(this._turns[i]['p']);
                var mNums = Number(this._turns[i]['m']);
                var wNums = Number(this._turns[i]['w']);
                this._turnNums.push(iNums);
                this._symbolNums.push(tNums);
                this._prizeNums.push(pNums);
                this._winnerNums.push(wNums);
                
                if (wNums === 1){
                    this._w++;
                }
                if (!isNaN(mNums)){
                    this._multiNums.push(mNums);
                }
            }
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
        public static getInstance(): Ticket {
            return Ticket._instance;
        }
        public getTicket(): any {
            return this._ticket;
        }
        public getOutcome(): any {
            return this._outcome;
        };
        public getWinningSymbols(): any {
            return this._winningSymbols;
        };
        public getSymbolNumber(): any {
            return this._symbolNums;
        };
        public getTurnPrize(): any {
            return this._prizeNums;
        };
        public getMultiNum(): any {
            return this._multiNums;
        };
        public getPrizeList(): any {
            if ( this._prizeList ) {
                return this._prizeList;
            }
            return false;
        }

        /*
         *  name:           setupTicket
         *  description:    sets up the ticket and the ticket data, cleans the pList array from strings to numbers
         *  return:         void      
         */
        public setupTicket(): void {
            
            this._ticket = CORE.IWG.ame('ticket');
            
            this._outcome = { 
                amount: Number(this._ticket.outcome.amount),
                tier:   Number(this._ticket.outcome.tier),
                wT:     Number(this._ticket.outcome.wT)
            };

            var prizeList = this._ticket.prizeList.a.split(',');
            for (var k in prizeList) {
                this._prizeList.push(Number(prizeList[k]));
            };
            
            var wS = this._ticket.g1.wS.split(',');
            for (var i in wS) {
                this._winningSymbols.push(Number(wS[i]));
            }
            
            this._setupTurns();
            this._rangeChecks();
            this._errorCheck();
            this._checkBalance();
            
        }
        
        /*
         *  name:           _rangeChecks
         *  description:    _rangeChecks to check the ticket values are in range
         *  return:         void      
         */	
        private _rangeChecks(): void {
            this._checkValues(this._turns,  "i",  1, 8);
            this._checkValues(this._turns,  "p",  0, 11);
            this._checkValues(this._turns,  "t",  1, 42);
            this._checkValues(this._turns,  "w",  0, 1);
        }
        
        /*
         *  name:           errorCheck
         *  description:    error checks to check the ticket is valid
         *  return:         void      
         */	
        private _errorCheck(): void {
            var total:number = 0,
                outcome      = this._outcome.amount,
                wT           = this._outcome.wT,
                tier         = this._outcome.tier;

            // prizeList length and for strings
            this._checkLength(this._prizeList, 11);
            this._checkArrayForNumbers(this._prizeList);
            
            // check slotOrder and multiplierOrder for strings
            this._checkArrayForNumbers(this._prizeNums);
            this._checkArrayForNumbers(this._turnNums);
            this._checkArrayForNumbers(this._symbolNums);
            this._checkArrayForNumbers(this._winningSymbols);

            // check prizeNums, slotOrder and multiplierOrder length is correct
            this._checkLength(this._prizeNums,  8);
            this._checkLength(this._winningSymbols, 2);

            // check tier against win amount
            this._tierValues(tier, outcome);
            
            // check duplicates in array
            this._checkForDuplicates(this._turnNums);
            this._checkForDuplicates(this._winningSymbols);
            
            // if amount is not a number
            if (isNaN(outcome)) {
                CORE.IWG.ame('error', {mess: ['mIWGd00008 outcome amount NaN']});
            }
            
            // if its losing tier, but wT is not 0 or amount is not 0 then error
            if (tier === 28 && (wT !== 0 || outcome !== 0)) {
                CORE.IWG.ame('error', {mess: ['mIWGd00009 losing tier but amount is not £0.00']});
            }
                     
            // Incorrect prize value added/changed in prize list
            for (var i = 0; i < this._prizeList.length; i++) {
                total += this._prizeList[i];
            }
            if (total !== 106381) {
                CORE.IWG.ame('error', {mess: ['mIWGd00013 incorrect prize value added/changed in prize list']});
            }  
            
            // check if any w's on a losing ticket
            for (var i = 0; i < this._winnerNums.length; i++) {
                var w = this._winnerNums[i];
                if (tier === 28 && w !== 0){
                    CORE.IWG.ame('error', {mess: ['mIWGd00017 w value on a losing ticket']});
                }
            }
            
            // prize amount blank
            for (var i = 0; i < this._prizeList.length; i++) {
                if (this._prizeList[i] <= 0) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00023 prizeList blank']});
                }
            }
            
            // winning symbol is 0 or left blank
            for (var i = 0; i < this._winningSymbols.length; i++) {
                if (this._winningSymbols[i] <= 0) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00025 winning symbol blank']});
                }
            }
            
            // game specific 
            for (var i = 0; i < this._symbolNums.length; i++) {
                var t = this._symbolNums[i],
                    m = Number(this._turns[i]['m']),
                    wins = Number(this._turns[i]['w']),
                    prize = Number(this._turns[i]['p']);

                    // if symbol number is above 40 then multipler must be present
                    // if symbol number is less than 40 then multipler must not be present
                    if ((t > 40) && (isNaN(m))) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00018 no multiplier when it should be present']});
                    } else if ((!isNaN(m)) && (t < 40)) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00024 multiplier present when shouldnt be']});
                    }
                    
                    // checking that the correct symbol number matches with the multiplier number
                    if ((t === 41) && (m !== 5)) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00019 wrong multiplier value']});
                    } else if ((t === 42) && (m !== 10)) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00019 wrong multiplier value']});
                    }  

                    // if symbol number is between 30-40 or 5, 10, 20 then error 
                    if (t > 20 && t < 41) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00010 not valid symbol number']});
                    }
                    
                    if ((t === 5) || (t == 10)) {
                        CORE.IWG.ame('error', {mess: ['mIWGd00010 not valid symbol number']});
                    }
                    
                    if ( wins === 1 ) {
                        var value = this.getPrizeList()[prize];
                        if ( t === 41 && m === 5) {
                            var multiple = value * 5;
                            CORE.IWG.ame('bank', {deposit: [multiple], log: true});    
                        } else if ( t === 42 && m === 10) {
                            var multiple = value * 10;
                            CORE.IWG.ame('bank', {deposit: [multiple], log: true});    
                        } else {
                            CORE.IWG.ame('bank', {deposit: [value], log: true});    
                        }
                    }
            }
            
            if (tier === 6 || tier === 10 || tier === 15 || tier === 18){
                if ((this._multiNums[0] !== 10) || (this._multiNums[0] === undefined)) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00026 tier should have a multiplier value']});
                }
            } else if (tier === 2 || tier === 4 || tier === 7 || tier === 11 || tier === 19 || tier === 22){
                if ((this._multiNums[0] !== 5) || (this._multiNums[0] === undefined)) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00026 tier should have a multiplier value']});
                }
            }else {
                if (this._multiNums[0] > 0) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00027 tier should not have a multiplier value']});
                }
            }
            
            for (var i = 0; i < this._winningSymbols.length; i++) {
                if (this._winningSymbols[i] > 20 || this._winningSymbols[i] < 1) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 not valid winning number']});
                }
            }
            
            // if its not a multipler and its a winner
            if (this._multiNums.length === 0 && outcome > 0) {
 
            var symList = [];
            // check if the turn symbols match the winning symbols
                for (var j in this._symbolNums) {
                    for (var k in this._winningSymbols) {
                        // each time a turn symbol matches, add it to the array
                        if (this._symbolNums[j] == this._winningSymbols[k]) {
                            symList.push(this._symbolNums[j]);
                        }
                    }
                }
                // if the matching symbols list is not equal to the amount of w's on the ticket 
                if (symList.length != this._w) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00029 matching symbols do not match amount of winners']});
                }
            }
            
        } // end _errorCheck();
        
        private _checkBalance(): void {
            var inlineBank = CORE.IWG.ame('bank', {balance: 'currentAmount', raw: true});
            
            if ( inlineBank !== this._outcome.amount ){
                CORE.IWG.ame('error', {mess: ['mIWGd00026 bank != ticket amount']});
            }
            
            // reset the bank on game start 
            CORE.IWG.ame('bank', {reset: true});
            
        }
        
        /*
         *  name:           _checkArrayForNumbers()
         *  description:    checks the array to ensure its only got numbers
         *  params:         array: any
         *  returns:        null
         */
        private _checkArrayForNumbers(array:any): void {
            for (var i = 0; i < array.length; i++) {
                var arrayNumber = array[i];
                if (isNaN(arrayNumber)){
                    CORE.IWG.ame('error', {mess: ['mIWGd00015 array is not numbers only']});
                }
            }

        } // end _checkArrayForNumbers()
        
        /*
         *  name:           _checkForDuplicates()
         *  description:    checks the array to ensure its got no duplicates
         *  params:         array: Array<Number>
         *  returns:        null
         */
        private _checkForDuplicates(array:Array<Number>): void {
            var arr = array.slice(),
                sorted_arr = arr.sort(HELPER.sortNumber),
                results = [];

            for (var i = 0; i < arr.length - 1; i++) {
                if (sorted_arr[i + 1] == sorted_arr[i]) {
                    results.push(sorted_arr[i]);
                }
            }

            if(results.length !== 0) {
                CORE.IWG.ame('error', {mess: ['mIWGd0014 duplicate number when there shouldnt be']});
            }
        } // end _checkArrayForNumbers()
        
        /*
         *  name:           _checkLength()
         *  description:    checks the array to ensure there is only the amount of values as specified in the length
         *  params:         array: Array<Number>, length:number
         *  returns:        null
         */
        private _checkLength(array:Array<Number>, length:number): void {
            if (array.length !== length){
                CORE.IWG.ame('error', {mess: ['mIWGd0007 too many or too few values']});
            }
        } // end _checkLength()

        /*
         *  name:           _checkOrder()
         *  description:    checks the array to ensure the array is the same as the one passed in and it matches the length
         *  params:         values:Array<Number>, values2:Array<Number>, length:number
         *  returns:        null
         */
        private _checkOrder(values:Array<Number>, values2:Array<Number>, length:number): void {
            var result = [];
            
            // checks the slot order for any duplicates or out of range values 
            while( values.length > 0 && values2.sort(HELPER.sortNumber).length > 0 )
                {  
                    if (values[0] < values2[0]) {
                        values.shift();
                    }
                    else if (values[0] > values2[0]) {
                        values2.shift();
                    }
                    else // they're equal 
                    {
                        result.push(values.shift());
                        values2.shift();
                    }
                }
                if (result.length !== length) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00011 incorrect/duplicate value in the array']});
                }
        } // end _checkOrder()
        
        /*
         *  name:           _tierValues()
         *  description:    checks the tier against what the ticket amount should be
         *  params:         tier: number, outcome:number
         *  returns:        null
         */
        private _tierValues(tier:number, outcome:number){
            var winAmount:number    = 0.00,
                ignore              = false;
            
            switch(tier) {
                    case 1:
                        winAmount   = 100000.00;
                        break;
                    case 2:
                    case 3:
                        winAmount   = 5000.00;
                        break;
                    case 4:
                    case 5:
                        winAmount   = 1000.00;
                        break;
                    case 6:
                    case 7:
                    case 8:
                        winAmount   = 200.00;
                        break;
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        winAmount   = 100.00;
                        break;
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                        winAmount   = 40.00;
                        break;
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                        winAmount   = 20.00;
                        break;
                    case 21:
                    case 22: 
                    case 23:
                        winAmount   = 10.00;
                        break;
                    case 24:
                        winAmount   = 5.00;
                        break;
                    case 25:
                    case 26:
                        winAmount   = 4.00;
                        break;  
                    case 27:
                        winAmount   = 2.00;
                        break;
                    case 28:
                        winAmount   = 0.00;
                        break;
                    default:
                        ignore = true;
                }

                if (outcome !== winAmount){
                    CORE.IWG.ame('error', {mess: ['mIWGd00016 amount is not vaild/tier is not vaild tier outcome']});
                }
        } // end _tierValues()
        
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
            
        } // end _checkValues()
    }
}