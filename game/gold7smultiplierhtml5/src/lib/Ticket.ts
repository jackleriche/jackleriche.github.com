/// <reference path="../../../typings/tsd.d.ts" />

/*  Error codes
    mIWGd00007 - length too long/short 
    mIWGd00008 - disallowed value in amount (NaN)
    mIWGd00009 - losing tier but amount is not £0.00 
    mIWGd00010 - number in ring when should be string
    mIWGd00011 - ring not long enough
    mIWGd00012 - amount is NaN
    mIWGd00013 - winningCols do not equal amount
    mIWGd00014 - mismatch multipliers
    mIWGd00015 - mismatch winAmounts
    mIWGd00016 - amount is not vaild/tier is not vaild tier outcome
    mIWGd00017 - does not match winning symbol
    mIWGd00018 - fake symbol
    mIWGd00019 - 
    mIWGd00020 - IWGBank > ticket amount
    mIWGd00021 - IWGBank != ticket amount
    mIWGd00022 - IWGBank not used
    mIWGd00023 - 
 */

module com.camelot.iwg {
    var CAMELOT: any    = com.camelot,
        CORE            = CAMELOT.core,
        IWG             = CAMELOT.iwg,
        GAMEOBJECT      = IWG.GameObject,
        ANIMATION       = IWG.Animation,
        SPRITESHEETS    = IWG.SpriteSheets,
        HELPER          = IWG.Helper,
        images          = CORE.iwgLoadQ.images,
        GLOBAL          = IWG.Global;

    export class Ticket {
        private static _instance: Ticket = new Ticket();

        private _ticket: any = null;
        private _outcome: any = null;
        private _params: any = [];
        private _prizeList: any = [];
        private _multiplier: any = [];
        private _rings: any = [];
        private _ring1: any = [];
        private _ring2: any = [];
        private _ring3: any = [];
        private _ring4: any = [];
        private _offsetArray0: any = [];
        private _offsetArray1: any = [];
        private _turns: Array<Object> = [];
        private _total: number = 0;

        private _column0: any = [];
        private _column1: any = [];
        private _column2: any = [];
        private _column3: any = [];
        private _column4: any = [];
        private _column5: any = [];
        private _column6: any = [];
        private _column7: any = [];
        private _column0_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column1_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column2_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column3_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column4_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column5_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column6_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        private _column7_count: any = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        public legendPrizeValues: Array<number> = [];

        constructor() {

            if (Ticket._instance) {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
            Ticket._instance = this;

        }
        
        /*
         *  name:           _setUpStar
         *  description:    setup card numbers
         *  return:         void      
         */
        private _setUpOffsets(): void {
            for (var i = 0; i < this._turns.length; i++) {
                var currentTurn = this._turns[i];
                if (currentTurn['name'] === 'go0') {
                    var prizeOffset = Number(currentTurn['pzOffset']);
                    var multiOffset = Number(currentTurn['multiOffset']);
                    this._offsetArray0.push(prizeOffset, multiOffset);
                } else {
                    var r1Offset = Number(currentTurn['r1Offset']);
                    var r2Offset = Number(currentTurn['r2Offset']);
                    var r3Offset = Number(currentTurn['r3Offset']);
                    var r4Offset = Number(currentTurn['r4Offset']);
                    this._offsetArray1.push(r1Offset, r2Offset, r3Offset, r4Offset);
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
            this._turns = this._ticket.turn;
            //this._checkValues(this._turns, "p", 0, 7);
        }
        
        /*
         *  name:           _setUpRings()
         *  description:    setup ring data 
         *  params:         null
         *  returns:        null
         */
        private _setUpRings(rNum: number, ring: any) {
            for (var i in ring) {
                var symbols = ring[i];
                if (symbols === 'bl') {
                    symbols = 'coin';
                } else if (symbols === 'fr') {
                    symbols = 'free';
                } else if (symbols === 'wh') {
                    symbols = 'goldbar';
                } else if (symbols === 'or') {
                    symbols = 'piggy';
                } else if (symbols === 'ye') {
                    symbols = 'pound';
                } else if (symbols === 'pu') {
                    symbols = 'ring';
                } else if (symbols === 'gr') {
                    symbols = 'seven';
                } else if (symbols === 'la') {
                    symbols = 'crown';
                } else if (symbols === 're') {
                    symbols = 'horseshoe';
                } else {

                }
                if (rNum === 1) {
                    this._ring1.push(symbols);
                } else if (rNum === 2) {
                    this._ring2.push(symbols)
                } else if (rNum === 3) {
                    this._ring3.push(symbols)
                } else {
                    this._ring4.push(symbols)
                }
            }
        }
        
        /*
         *  name:           _setUpRings()
         *  description:    setup ring data 
         *  params:         null
         *  returns:        null
         */
        private _setUpCount(column: any, colNum: number) {
            for (var i in column) {
                var symbols = column[i];
                var indexNum: number = -1;
                if (symbols === 'free') {
                    indexNum = 0;
                } else if (symbols === 'coin') {
                    indexNum = 1;
                } else if (symbols === 'goldbar') {
                    indexNum = 2;
                } else if (symbols === 'piggy') {
                    indexNum = 3;
                } else if (symbols === 'pound') {
                    indexNum = 4;
                } else if (symbols === 'ring') {
                    indexNum = 5;
                } else if (symbols === 'seven') {
                    indexNum = 6;
                } else if (symbols === 'crown') {
                    indexNum = 7;
                } else if (symbols === 'horseshoe') {
                    indexNum = 8;
                } else {

                }
                this['_column' + colNum + '_count'][indexNum] += 1

            }
        }
        
        /*
         *  name:           _setUpRings()
         *  description:    setup ring data 
         *  params:         null
         *  returns:        null
         */
        private _checkCount() {
            
            var winningCols = [];
            
            for (var j = 0; j < 8; j++) {
                var testArray = this["_column" + j + "_count"];
                var isFree: number = testArray[0];
                
                for (var i = 0; i < testArray.length; i++) {
                    var symbolCount = testArray[i];
                    //console.log(symbolCount, i)
                    var winningObject = {
                        num: null,
                        icons: null
                    };
                    
                    // winner
                    if (symbolCount === 3) {
                        
                        winningObject.num   = j; 
                        winningObject.icons = this["_column" + j];
                        winningCols.push(winningObject);
                         
                    } else if (isFree > 0 && symbolCount === 2) {
                        winningObject.num   = j; 
                        winningObject.icons = this["_column" + j];         
                        winningCols.push(winningObject);               
                    }
                    
                    
                }
           }
           
           GLOBAL.getInstance().addToGlobal( 'winner', winningCols );
        }
        
        /*
         *  name:           _setupColumns()
         *  description:    setup the columns 
         *  params:         null
         *  returns:        null
         */
        private _setupColumns() {
            for (var i = 0; i < 8; i++) {

                this["_column" + i].push(this._ring1[i], this._ring2[i], this._ring3[i], this._ring4[i])
                this._setUpCount(this["_column" + i], i);
            }
        }
        
        /*
         *  name:           setupTicket
         *  description:    sets up the ticket and the ticket data, cleans the pList array from strings to numbers
         *  return:         void      
         */
        public setupTicket(): void {

            this._ticket = CORE.IWG.ame('ticket');
            
            var amount = this._ticket.outcome.amount
            amount = amount.replace(/\,/g,'');
            this._outcome = {
                tier: Number(this._ticket.outcome.prizeTier),
                amount: Number(amount)
            };

            this._params = {
                wT: Number(this._ticket.params.wT),
                wAmount: Number(this._ticket.params.wAmount),
                win1Amount: Number(this._ticket.params.win1Amount),
                win1X: Number(this._ticket.params.win1X),
                win1IndexPos: Number(this._ticket.params.win1IndexPos),
                win1Colour: this._ticket.params.win1Colour,
                win2Amount: Number(this._ticket.params.win2Amount),
                win2X: Number(this._ticket.params.win2X),
                win2IndexPos: Number(this._ticket.params.win2IndexPos),
                win2Colour: this._ticket.params.win2Colour,
                win3Amount: Number(this._ticket.params.win3Amount),
                win3X: Number(this._ticket.params.win3X),
                win3IndexPos: Number(this._ticket.params.win3IndexPos),
                win3Colour: this._ticket.params.win3Colour
            };

            this._rings = {
                ring1: this._ticket.params.ring1.split(','),
                ring2: this._ticket.params.ring2.split(','),
                ring3: this._ticket.params.ring3.split(','),
                ring4: this._ticket.params.ring4.split(',')
            }
            this._setUpRings(1, this._rings.ring1);
            this._setUpRings(2, this._rings.ring2);
            this._setUpRings(3, this._rings.ring3);
            this._setUpRings(4, this._rings.ring4);

            var prizeList = this._ticket.params.pzAmounts.split(',');
            for (var i in prizeList) {
                this._prizeList.push(Number(prizeList[i]));
            };

            var multiplier = this._ticket.params.multi.split(',');
            for (var i in multiplier) {
                this._multiplier.push(Number(multiplier[i]));
            };
            
            //this._setupLegend();
            this._setUpTurns();
            this._setUpOffsets();
            this._setupColumns();
            this._checkCount();
            this.errorCheck();
            
            this._setupWinningData();
            
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
        public getTicket(): any {
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
        public getParams(): any {
            return this._params;
        };
        /*
         *  name:           getPrize()
         *  description:    return Prize array
         *  params:         null
         *  returns:        params:Object
         */
        public getPrize(): any {
            return this._prizeList;
        };
        /*
         *  name:           getMultiplier()
         *  description:    return multiplier array
         *  params:         null
         *  returns:        params:Object
         */
        public getMultiplier(): any {
            return this._multiplier;
        };
        /*
         *  name:           getOffset0()
         *  description:    return go 0 offset array
         *  params:         null
         *  returns:        params:Object
         */
        public getOffset0(): any {
            return this._offsetArray0;
        };
        /*
         *  name:           getOffset1()
         *  description:    return go 1 offset array
         *  params:         null
         *  returns:        params:Object
         */
        public getOffset1(): any {
            return this._offsetArray1;
        };
        /*
         *  name:           getOffset1()
         *  description:    return go 1 offset array
         *  params:         null
         *  returns:        params:Object
         */
        public getColumn(i: number): any {
            return this["_column" + i];
        };
        /*
         *  name:           getRings()
         *  description:    return ring 1 of the symbols
         *  params:         null
         *  returns:        params:Object
         */
        public getRings(): any {
            return this._rings;
        };
        /*
         *  name:           getRing1()
         *  description:    return ring 1 of the symbols
         *  params:         null
         *  returns:        params:Object
         */
        public getRing1(): any {
            return this._ring1;
        };
        /*
         *  name:           getRing2()
         *  description:    return ring 1 of the symbols
         *  params:         null
         *  returns:        params:Object
         */
        public getRing2(): any {
            return this._ring2;
        };
        /*
         *  name:           getRing3()
         *  description:    return ring 1 of the symbols
         *  params:         null
         *  returns:        params:Object
         */
        public getRing3(): any {
            return this._ring3;
        };
        /*
         *  name:           getRing4()
         *  description:    return ring 1 of the symbols
         *  params:         null
         *  returns:        params:Object
         */
        public getRing4(): any {
            return this._ring4;
        };
        
        
        

        /*
         *  name:           errorCheck
         *  description:    error checks to check the ticket is valid
         *  return:         void      
         */
        public errorCheck(): void {
            var prizeTotal, 
                outcome             = Number(this._outcome.amount),
                wT                  = Number(this._params.wT),
                rings               = this._rings,
                tier                = this._outcome.tier,
                prizes              = [2,5,10,50,100,250,1000,70000];
                
                console.log()
                
                // Prize list length
                this._checkLength(this._prizeList, 8);
                
                // if amount is anything but a number then error
                if (isNaN(this._outcome.amount)){
                    CORE.IWG.ame('error', {mess: ['mIWGd00008 outcome amount NaN']});
                }
                
                // if its losing tier, but wT is not 0 or amount is not 0 then error
                if (tier === 33 && (wT !== 0 || outcome !== 0)){
                    CORE.IWG.ame('error', {mess: ['mIWGd00009 losing tier but amount is not £0.00']});
                }
                
                // check ring strings for numbers
                // mIWGd00010
                this._checkRingArray(rings.ring1);
                this._checkRingArray(rings.ring2);
                this._checkRingArray(rings.ring3);
                this._checkRingArray(rings.ring4);
                
                // prize amount not a number
                // mIWGd00012
                this._checkArrayForNumbers(this._prizeList);
                
                // prize amount blank
                //mIWGd00023
                for (var i = 0; i < this._prizeList.length; i++) {
                    if (this._prizeList[i] <= 0){
                        CORE.IWG.ame('error', {mess: ['mIWGd00023 pzAmount blank']});
                    }
                }
                
                // incorrect or duplicate amount in pzAmounts
                //mIWGd00024
                var result  = [],
                    prizes2 = this._prizeList.slice();
                    
                while( prizes.length > 0 && prizes2.sort(HELPER.sortNumber).length > 0 )
                {  
                    if (prizes[0] < prizes2[0]) {
                        prizes.shift();
                    }
                    else if (prizes[0] > prizes2[0]) {
                        prizes2.shift();
                    }
                    else /* they're equal */
                    {
                        result.push(prizes.shift());
                        prizes2.shift();
                    }
                }
                if (result.length !== 8) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00024 incorrect/duplicate value in pzAmounts']});
                }
                
                // multiplier not a number
                //mIWGd00012
                this._checkArrayForNumbers(this._multiplier);
                
                // offset0 not a number
                //mIWGd00012
                this._checkArrayForNumbers(this._offsetArray0);
                
                // offset1 not a number
                //mIWGd00012
                this._checkArrayForNumbers(this._offsetArray1);
                
                // multi offset length
                this._checkLength(this._multiplier, 8);
                
                // only two turns
                this._checkLength(this._turns, 2);
                
                // prize amounts and prize/multi offset number ranges
                this._checkValues(this._turns, "pzOffset", 1, 7);
                this._checkValues(this._turns, "multiOffset", 1, 7);
                this._checkValues(this._turns, "r1Offset", 1, 7);
                this._checkValues(this._turns, "r2Offset", 1, 7);
                this._checkValues(this._turns, "r3Offset", 1, 7);
                this._checkValues(this._turns, "r4Offset", 1, 7);
                
                // check the tiers for the values theyre suppose to be
                this._tierValues(tier, outcome);
        }
        
        /*
         *  name:           _checkArrayForNumbers()
         *  description:    checks the array to ensure its only got numbers
         *  params:         array: Array
         *  returns:        null
         */
        private _checkArrayForNumbers(array:any): void {
            for (var i = 0; i < array.length; i++) {
                var arrayNumber = array[i];
                if (isNaN(arrayNumber)){
                    CORE.IWG.ame('error', {mess: ['mIWGd00012 not a number within prize/multi/offset']});
                }
            }

        } // end _checkArrayForNumbers
        
        /*
         *  name:           _checkLength()
         *  description:    checks the array to ensure there is only the amount of values as specified in the length
         *  params:         array: Array
         *  returns:        null
         */
        private _checkLength(array:any, length:number): void {
            if (array.length !== length){
                CORE.IWG.ame('error', {mess: ['mIWGd0007 too many or too few values']});
            }
        } // end _checkLength
        
        /*
         *  name:           _checkRingArray()
         *  description:    checks the ring for the length and if it has any numbers
         *  params:         ring: Array
         *  returns:        null
         */
        private _checkRingArray(ring:any): void {
            for (var i = 0; i < ring.length; i++) {
                var ringIcon = ring[i];
                if (!isNaN(ringIcon)){
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 number is present in ring']});
                }
                if (ring.length !== 8){
                    CORE.IWG.ame('error', {mess: ['mIWGd00011 ring not long enough']});
                }
            }

        } // end _checkRingArray
        
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
                        winAmount   = 70000.00;
                        break;
                    case 2:
                        winAmount   = 5000.00;
                        break; 
                    case 3:
                        winAmount   = 4000.00;
                        break;
                    case 4:
                        winAmount   = 2000.00;
                        break;
                    case 5:
                        winAmount   = 1250.00;
                        break;
                    case 6:
                    case 7:
                        winAmount   = 1000.00;
                        break;
                    case 8:
                    case 9:
                        winAmount   = 500.00;
                        break;
                    case 10:
                        winAmount   = 400.00;
                        break;
                    case 11:
                    case 12:
                        winAmount   = 250.00;
                        break;
                    case 13:
                    case 14:
                        winAmount   = 200.00;
                        break;
                    case 15:
                        winAmount   = 100.00;
                        break;
                    case 16:
                        winAmount   = 100.00;
                        break;
                    case 17:
                    case 18:
                        winAmount   = 50.00;
                        break;
                    case 19:
                        winAmount   = 40.00;
                        break;
                    case 20:
                        winAmount   = 30.00;
                        break;
                    case 21:
                        winAmount   = 25.00;
                        break;
                    case 22:
                    case 23:
                    case 24:
                        winAmount   = 20.00;
                        break;
                    case 25:
                        winAmount   = 15.00;
                        break;
                    case 26:
                    case 27:
                    case 28:
                        winAmount   = 10.00;
                        break;
                    case 29:
                        winAmount   = 8.00;
                        break;
                    case 30:
                        winAmount   = 5.00;
                        break;
                    case 31:
                        winAmount   = 4.00;
                        break;
                    case 32:
                        winAmount   = 2.00;
                        break;
                    case 33:
                        winAmount   = 0.00;
                        break;                  
                    default:
                        ignore = true;
                }
                if (outcome !== winAmount){
                    CORE.IWG.ame('error', {mess: ['mIWGd00016 amount is not vaild/tier is not vaild tier outcome']});
                }
        }
        
        /*
         *  name:           _checkValues()
         *  description:    ticket check method that errors if the range of a given ticket data is less then the lower, or higher then the max
         *  params:         gameData: turnObject, value: string, min: number, max: number
         *  returns:        null
         */
        private _checkValues(gameData, value, min, max): void {
            for (var i = 0; i < gameData.length; i++) {

                var turnData = gameData[i];
                if (turnData.hasOwnProperty(value)) {
                    var v: number = Number(turnData[value]);
                    if (v < min || v > max) {
                        console.log(v);
                        CORE.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range'] });
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

            for (let i = 0; i < this.getParams().length; i++) {

                var prizeAmount = this._prizeList[this.getParams()[i]];
                this.legendPrizeValues.push(prizeAmount);

            }

        } // end _setupLegend()
        
        
        /*
         *  name:           _setupWinningData()
         *  description:    setup winning data
         *  params:         null
         *  returns:        null
         */         
        private _setupWinningData() {
            
            var winningCols = [];
            
            var winningCol1 = {
                winAmount: this._params.win1Amount,
                winMultiplier: this._params.win1X,
                winIndex: this._params.win1IndexPos,
                winColour: this._params.win1Colour
            };
            
            var winningCol2 = {
                winAmount: this._params.win2Amount,
                winMultiplier: this._params.win2X,
                winIndex: this._params.win2IndexPos,
                winColour: this._params.win2Colour
            };
            
            var winningCol3 = {
                winAmount: this._params.win3Amount,
                winMultiplier: this._params.win3X,
                winIndex: this._params.win3IndexPos,
                winColour: this._params.win3Colour
            };
            
            // push into array
            winningCols.push( winningCol1, winningCol2, winningCol3 );

            if ( winningCol1.winAmount + winningCol2.winAmount + winningCol3.winAmount > this._outcome.amount ) {
                // error winningCols are more then outcome amount
                CORE.IWG.ame('error', { mess: ['mIWGd00013 winningCols do not equal amount'] });   
            }
            var bank = 0;
            
            for ( var i = 0; i < winningCols.length; i++ ){
                
                var element = winningCols[i];
                
                if ( element.winAmount !== 0 ){
                    
                    var total = element.winAmount * element.winMultiplier
                    bank += total;
                    
                    // // check multipliers
                    if (element.winMultiplier !== this._multiplier[element.winIndex] ) {
                        // error winningCols are more then outcome amount
                        CORE.IWG.ame('error', { mess: ['mIWGd00014 mismatch multipliers'] });
                    } 
                    
                    // // check winAmounts
                    if (element.winAmount !== this._prizeList[element.winIndex] ) {
                        // error winningCols are more then outcome amount
                        CORE.IWG.ame('error', { mess: ['mIWGd00015 mismatch winAmounts'] });
                    }
                    
                }
                
            }
            
            if (bank !== this._params.wAmount) {
                CORE.IWG.ame('error', { mess: ['mIWGd00015 mismatch winAmounts'] });
            }
            
            for ( var j = 0; j < GLOBAL.getInstance().getFromGlobal('winner').length; j++ ) {
                
                var ele = GLOBAL.getInstance().getFromGlobal('winner')[j];
                var icon = HELPER.hasDuplicates(ele.icons);
                
                var symbol = null;
                switch(icon){
                    case "coin":
                        symbol = "bl";
                        break;
                    case "goldbar":
                        symbol = "wh";
                        break;
                    case "piggy":
                        symbol = "or";
                        break;
                    case "pound":
                        symbol = "ye";
                        break;
                    case "ring":
                        symbol = "pu";
                        break;
                    case "seven":
                        symbol = "gr";
                        break;
                    case "crown":
                        symbol = "la";
                        break;
                    case "horseshoe":
                        symbol = "re";
                        break;
                    default:
                        // error fake symbol
                        CORE.IWG.ame('error', { mess: ['mIWGd00018 fake symbol'] });      
                }
                
                if ( symbol !== winningCols[j].winColour ) {
                    CORE.IWG.ame('error', { mess: ['mIWGd00017 does not match winning symbol'] });  
                }
                
            }
            
            if ( Number(this._params.wT) === 1 && ( GLOBAL.getInstance().getFromGlobal('winner').length === 0) ) {
                CORE.IWG.ame('error', { mess: ['mIWGd00019 ticket has been tampered'] });
            }
            
        }
    }
}