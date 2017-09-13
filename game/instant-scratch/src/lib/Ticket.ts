/// <reference path="../imports/js/Sideplay.ts" />

/*  Error codes
    mIWGd00007 - length too long/short 
    mIWGd00008 - disallowed value in amount (NaN)
    mIWGd00009 - losing tier but amount is not £0.00 
    mIWGd00010 - BLANK
    mIWGd00011 - incorrect/duplicate value in the array
    mIWGd00012 - ticket value out of range
    mIWGd00013 - incorrect prize value added/changed in prize list
    mIWGd00014 - value is not valid number
    mIWGd00015 - array has a word or symbol within
    mIWGd00016 - amount is not vaild/tier is not vaild tier outcome
    mIWGd00017 - w value on a losing ticket
    mIWGd00018 - BLANK
    mIWGd00019 - BLANK
    mIWGd00020 - IWGBank > ticket amount
    mIWGd00021 - IWGBank != ticket amount
    mIWGd00022 - IWGBank not used
    mIWGd00023 - prizelist blank
    mIWGd00024 - too many winners
    mIWGd00025 - BLANK
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
        private _winCount:               number        = 0;
        private _tracker:                Array<number> = [0,0,0,0,0,0,0,0,0];
        private _instantWin:             boolean       = false;
        
        private _numbersArray:           Array<Object> = [];
        private _winningSymbols:         Array<number> = [];
        private _turns:                  Array<Object> = [];
        private _multiOrder:             Array<number> = []; 
        private _turnNums:               Array<number> = [];
        private _prizeNums:              Array<number> = [];
        private _multiNums:              Array<number> = [];
        private _symbolNums:             Array<number> = [];
        private _winnerNums:             Array<number> = [];

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
                var iNums       = Number(this._turns[i]['i']);
                var prize       = Number(this._turns[i]['p']);
                var wins        = Number(this._turns[i]['w']);
                var instant     = Number(this._turns[i]['iW']);
                
                var turnsObj = {
                    i: iNums,
                    p: prize,
                    w: wins
                }
                
                // push object into the numbers array
                this._turnNums.push(iNums);
                this._numbersArray.push(turnsObj);    
                this._prizeNums.push(prize);
                
                // pre game bank
                if ( wins === 1 ) {
                    // tracker is the amount of times each number (prize) has appeared
                    this._tracker[prize] += 1;
                    this._winCount++; 
                    
                    // bank on an instant win
                    if (!isNaN(instant) && instant === 1) {
                        // IW is always the 6th index in array, if its not then dont bank
                        if (this._tracker.indexOf(1) === 6) {
                            this._instantWin = true;
                            CORE.IWG.ame('bank', { deposit: [5], log: true });    
                        }
                    
                    } else if (this._tracker.indexOf(3) !== -1){
                    
                        // bank prize amount if there is 3 winners
                        var prizeIndex = this._tracker.indexOf(3);
                        var prizeValue = this.getPrizeList()[prizeIndex];
                        CORE.IWG.ame('bank', { deposit: [prizeValue], log: true });
                    
                    }
                }
                
                // check each field for strings
                this._checkNumber(iNums);
                this._checkNumber(prize);
                this._checkNumber(wins);
                
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
            
            this._setupTurns();
            this._rangeChecks();
            this._errorCheck();
            this._resetBank();
            
        }
        
        /*
         *  name:           _resetBank
         *  description:    checks the banked amount and then resets the bank back to £0
         *  return:         void      
         */	
        private _resetBank(): void {
            var inlineBank = CORE.IWG.ame('bank', {balance: 'currentAmount', raw: true});
            
            if ( inlineBank !== this._outcome.amount ){
                CORE.IWG.ame('error', {mess: ['mIWGd00026 bank != ticket amount']});
            }
            
            // reset the bank on game start 
            CORE.IWG.ame('bank', {reset: true});
            
        }
        
        /*
         *  name:           _rangeChecks
         *  description:    _rangeChecks to check the ticket values are in range
         *  return:         void      
         */	
        private _rangeChecks(): void {
            this._checkValues(this._turns,  "i",  1, 9);
            this._checkValues(this._turns,  "p",  0, 8);
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
            this._checkLength(this._prizeList, 9);
            this._checkArrayForNumbers(this._prizeList);
            
            // check tier against win amount
            this._tierValues(tier, outcome);

            // check duplicates in array
            this._checkForDuplicates(this._turnNums);
            this._checkLength(this._turnNums, 9)
            
            // if amount is not a number
            if (isNaN(outcome)) {
                CORE.IWG.ame('error', {mess: ['mIWGd00008 outcome amount NaN']});
            }
            
            // if its losing tier, but wT is not 0 or amount is not 0 then error
            if (tier === 11 && (wT !== 0 || outcome !== 0)) {
                CORE.IWG.ame('error', {mess: ['mIWGd00009 losing tier but amount is not £0.00']});
            }
                     
            // Incorrect prize value added/changed in prize list
            for (var i = 0; i < this._prizeList.length; i++) {
                total += this._prizeList[i];
            }
            if (total !== 10678) {
                CORE.IWG.ame('error', {mess: ['mIWGd00013 incorrect prize value added/changed in prize list']});
            }  
            
            // check if any w's on a losing ticket
            for (var i = 0; i < this._winnerNums.length; i++) {
                var w = this._winnerNums[i];
                if (tier === 11 && w !== 0){
                    CORE.IWG.ame('error', {mess: ['mIWGd00017 w value on a losing ticket']});
                }
            }
            
            // prize amount blank
            for (var i = 0; i < this._prizeList.length; i++) {
                if (this._prizeList[i] <= 0) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00023 prizeList blank']});
                }
            }
            
            // checking faked wins
            if (this._winCount > 3) {
                CORE.IWG.ame('error', {mess: ['mIWGd00024 too many winners']});
            }
            
            if (this._instantWin && this._winCount > 1){
                CORE.IWG.ame('error', {mess: ['mIWGd00024 too many winners']});
            }
            
        } // end _errorCheck();
        
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
         *  name:           _checkNumber()
         *  description:    checks the value to ensure its a number
         *  params:         value:any
         *  returns:        null
         */
        private _checkNumber(value:any): void {
            if (isNaN(value)) {
                CORE.IWG.ame('error', {mess: ['mIWGd00014 value is not valid number']});
            }
        }
        
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
                        winAmount = 10000.00;
                        break;
                    case 2:
                        winAmount = 500.00;
                        break;
                    case 3:
                        winAmount = 100.00;
                        break;
                    case 4:
                        winAmount = 40.00;
                        break;
                    case 5:
                        winAmount = 20.00;
                        break;
                    case 6:
                        winAmount = 10.00;
                        break;
                    case 7:
                    case 8:
                        winAmount = 5.00;
                        break;
                    case 9:
                        winAmount = 2.00;
                        break;
                    case 10:
                        winAmount = 1.00;
                        break;
                    case 11:
                        winAmount = 0.00;
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