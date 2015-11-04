/// <reference path="../../../typings/tsd.d.ts" />

/*  Error codes
    mIWGd00007 - prizelist length too long/short 
    mIWGd00008 - duplicate b value
    mIWGd00009 - turns not === 20
    mIWGd00010 - duplicate card number
    mIWGd00011 - card has > or < than one -1
    mIWGd00012 - ticket value out of range
    mIWGd00013 - incorrect prize value added/changed in prize list
    mIWGd00014 - incorrect number added to the ticket
    mIWGd00015 - not valid position for a free square
    mIWGd00016 - too many/few card numbers
    mIWGd00017 -
    mIWGd00018 - 
    mIWGd00019 - 
    mIWGd00023 - 
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
        private _prizeList: any = [];
        private _gNumber: number = -1;
        private _card1:any = [];
        private _card2:any = [];
        private _card3:any = [];
        private _card4:any = [];
        private _cards: any = [this._card1, this._card2, this._card3, this._card4];
        private _dPos: any = [];
        private _turns: Array<Object> = [];
        private _total:number = 0;

        constructor() {

            if (Ticket._instance) {
                throw new Error("Error: Instantiation failed: Use Ticket.getInstance() instead of new.");
            }
            Ticket._instance = this;

        }
        
        /*
         *  name:           _setUpCards
         *  description:    setup card numbers
         *  return:         void      
         */	
        private _setUpCards(): void {
            
            var cards = [
                this._ticket.params.c1,
                this._ticket.params.c2,
                this._ticket.params.c3,
                this._ticket.params.c4
            ];      
            
            for (var i = 0; i < cards.length; i++){
                
                var card = cards[i].split(",");
                
                for (var j = 0; j < card.length; j++){
                    
                    var number = Number(card[j]);
                    
                    this._cards[i].push(number);   
                }              
            }
            
        }
        
        /*
         *  name:           _setupDoublers()
         *  description:    setup the doublers information in a more fashionable mannor that can be read by the game code 
         *                  in a more meaningful way
         *  params:         null
         *  returns:        null
         */
        private _setupDoublers() {
            
            var ticket              = this._ticket,
                originalDoublerPos  = ticket.params.dPos;
            
            var dPos                = originalDoublerPos.split(','),
                cleandPos           = [],
                card: Array<number> = [],
                index: number       = 0;
            
            for ( var i = 0; i < dPos.length; i++ ){
                var pos: string,
                    posNumber: any;
                
                pos = dPos[i].substring(2);
                
                if (pos.charAt(0) === "v") {
                    posNumber = Number(pos.substring(1));
                    posNumber += 5;
                } else if (pos.charAt(0) === "h") {
                    posNumber = Number(pos.substring(1));
                }   
                
                // push to seperate cards
                card.push(posNumber);
                if (i % 2){
                    cleandPos.push(card);
                    card = [];    
                }
            };  
            
            this._dPos = cleandPos;         
            
        } 
        
        /*
         *  name:           _setupTurns()
         *  description:    setup turn data into a more user friendly
         *                  in a more meaningful way
         *  params:         null
         *  returns:        null
         */
        private _setupTurns() {
            this._turns = this._ticket.turn;
            
            this._checkValues(this._turns, "b", -1, 75);
            this._checkValues(this._turns, "name", 1, 20);
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
        public getParams(): any {
            return this._params;
        };
        public getCard1(): any {
            return this._card1;
        }
        public getCard2(): any {
            return this._card2;
        }
        public getCard3(): any {
            return this._card3;
        }
        public getCard4(): any {
            return this._card4;
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
                tier: Number(this._ticket.outcome.prizeTier)
            };
            
            this._params = this._ticket.params;

            var prizeList = this._ticket.params.pList.split(',');

            for (var k in prizeList) {
                this._prizeList.push(Number(prizeList[k]));
            };
          
            this._setUpCards();
            this._setupDoublers();
            this._setupTurns();
            this.errorCheck();
            
        }
        
        
        
        /*
         *  name:           errorCheck
         *  description:    error checks to check the ticket is valid
         *  return:         void      
         */	
        public errorCheck(): void {
            var prizeTotal;
            
            // check for a value thats been removed or added to the prize array
            if (this._prizeList.length != 13){
                CORE.IWG.ame('error', {mess: ['mIWGd00007 prizelist length too long/short']});
            }
            
            // if a b number appears more than once in a ticket
            var bNumbers = [];
            for (var i = 0; i < this._turns.length; i++) {
                var b = Number(this._turns[i]["b"]);
                bNumbers.push(b)
            }  
            // sorting the bNumbers array
            var bNumSort = bNumbers.sort(); 
            for (var i = 0; i < bNumbers.length - 1; i++) {
                if (bNumSort[i + 1] == bNumSort[i]) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00008 duplicate b value']});
                }
            }
           
            // if turns are not 20
            if (this._turns.length !== 20) {
               CORE.IWG.ame('error', {mess: ['mIWGd00009 turns !== 20']});
            }
            
            // check for duplicate numbers on the cards
            // push the -1 into the minusArray each time a -1 is found
            var minusArray      = [],
                allBoardNumbers = [],
                card1           = this._card1.slice(0);
                
            card1.sort();
            for (var i = 0; i < card1.length; i++) {
                allBoardNumbers.push(card1[i])
                if (card1[i + 1] == card1[i]) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 duplicate c1 number']});
                }
                if (card1[i] === -1) {
                    minusArray.push(card1[i])
                }
            }  
            var card2 = this._card2.slice(0);
            card2.sort();
            for (var i = 0; i < card2.length; i++) {
                allBoardNumbers.push(card2[i])
                if (card2[i + 1] == card2[i]) {
                    console.log(card2[i])
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 duplicate c2 number']});
                }
                if (card2[i] === -1) {
                    minusArray.push(card2[i])
                }
            } 
            var card3 = this._card3.slice(0);
            card3.sort(); 
            for (var i = 0; i < card3.length; i++) {
                allBoardNumbers.push(card3[i])
                if (card3[i + 1] == card3[i]) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 duplicate c3 number']});
                }
                if (card3[i] === -1) {
                    minusArray.push(card3[i])
                }
            }  
            var card4 = this._card4.slice(0);
            card4.sort();
            for (var i = 0; i < card4.length; i++) {
                allBoardNumbers.push(card4[i])
                if (card4[i + 1] == card4[i]) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00010 duplicate c4 number']});
                }
                if (card4[i] === -1) {
                    minusArray.push(card4[i])
                }
            }
            // each card must have one -1 so count should always be 4      
            if (minusArray.length !== 4) {
                CORE.IWG.ame('error', {mess: ['mIWGd00011 card has > or < than one -1']});
            }   
            
            // Incorrect prize value added/changed in prize list
            for (var i = 0; i < this._prizeList.length; i++) {
                this._total += this._prizeList[i];
            }
            if (this._total !== 311424) {
                CORE.IWG.ame('error', {mess: ['mIWGd00013 incorrect prize value added/changed in prize list']});
            }
            
            // incorrect number added to the ticket
            var matches = [];
            for (var i = 0; i < bNumbers.length; i++) {
                for (var j = 0; j < allBoardNumbers.length; j++) {
                    if (allBoardNumbers[j] === bNumbers[i]){
                        matches.push(bNumbers[i])
                        break
                    }
                }
            }
            if (matches.length !== 20){
                CORE.IWG.ame('error', {mess: ['mIWGd00014 incorrect number added to the ticket']});
            }
            
            // checking that the -1 on each card is in the correct position
            if (this._card1[12] && this._card2[12] && this._card3[12] && this._card4[12] !== -1){
                CORE.IWG.ame('error', {mess: ['mIWGd00015 not valid position for a free square']});
            }
            
            // checking that a number has not been added or removed from the cards
            for (var i = 0; i < this._cards.length; i++) {
                var cards = this._cards[i].length;
                if (cards !== 25) {
                    CORE.IWG.ame('error', {mess: ['mIWGd00016 too many/few card numbers']});
                }
            }
        }
        
        /*
         *  name:           getDoublerPos()
         *  descriptions:   returns a doubler position based on the index given
         *  params:         index: number
         *  returns:        doublerPositions: Array<number>
         */
        public getDoublerPos(index) {
            var doublerPosition = this._dPos[index];
            return doublerPosition;
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
    }
}