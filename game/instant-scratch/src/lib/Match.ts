/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {
    
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg;
        
        
    export class Match { 
        
        private _clickCount: number                 = 0;
        private _winningSymbols: Array<GameObject>  = [];
        private _playableSymbols: Array<GameObject> = [];
        private _instantWin: Array<string>          = [];
        
        constructor( private _name, private _type: string = null ){
        
            this._subscribe();
                   
        }
        
        /**
         *  name:           getName()
         *  description:    retrieve name
         *  params:         null
         *  returns:        name: string
         */
        public getName(): string {
            
            return this._name;
            
        } // end getName
        
        /**
         *  name:           _subscribe()
         *  description:    add event listeners to class   
         *  params:         null
         *  returns:        null
         */
        private _subscribe(): void {
            IWG.IWGEM.on('decClickCount', this._decCount.bind(this) );            
        } // end _subscribe();
        
        /**
         *  name:           _unsubscribe()
         *  description:    remove event listeners on class   
         *  params:         null
         *  returns:        null
         */
        private _unsubscribe(): void {
            IWG.IWGEM.off('decClickCount');            
        } // end _unsubscribe();
        
        
        /**
         *  name:           addSymbol()
         *  description:    add a winning/playable symbol to the relevant array
         *  param:          GO: GameObject, type: String
         *  returns:        boolean
         */
        public addSymbol( go: GameObject, type: string ): boolean {
            
            if ( go ){
                
                this._clickCount++;
            
                // check type
                if ( type === "winning" ){
                    this._winningSymbols.push(go);
                } else {
                    this._playableSymbols.push(go);
                }

            }
            
            return false;
            
        } // end addSymbol();        
        
        /**
         *  name:           _decCount()
         *  description:    decrement the click count
         *  params:         name: sting, go: GameObject
         *  returns:        void
         */
        private _decCount( name: String, go: GameObject): void {
                   
            if ( name === this._name ){
                
                // decrement clickCount
                this._clickCount--; 
                
                if ( this._clickCount === 0 ) {
                    IWG.IWGEM.trigger( 'matchFinished', [this._name] );
                } // end if
                
                this._checkMatch(go);
                
            } else {
                console.warn('no match class found with that name')
            }           
            
        } // end _decCount();
        
        /**
         *  name:           _checkMatch();
         *  description:    check winning values shown (revealed) against the playable symbols (revealed)
         *  params:         go: GameObject
         *  returns:        null
         */  
        private _revealedIcons: Array< GameObject > = [];      
        private _checkMatch( go: GameObject ): void {

            // loop through the winning symbols and check if revealed
            if ( this._type !== "match3" ){
                
                for( var i = 0; i < this._winningSymbols.length; i++ ) {
                
                    var winningSymbol = this._winningSymbols[i];
                    
                    // if the winning symbol is revealed
                    if ( winningSymbol.getRevealed() ) {
                        
                        // loop through all playable icons
                        for( var j = 0; j < this._playableSymbols.length; j++ ) {
                            
                            var playableSymbol = this._playableSymbols[j];
                            
                            // if the winningSymbol matches the playable symbol 
                            if ( winningSymbol.getTicketLabel() === playableSymbol.getTicketLabel() ) {
                                
                                // win Animation
                                if ( playableSymbol.getRevealed() && (!playableSymbol.getWinRevealed()) ) {

                                    // animate winReveal
                                    playableSymbol.winReveal();
                                    winningSymbol.winReveal();
                                    
                                }
                                
                            } 
                            
                        }  // end for loop
                        
                    } // end if
                    
                } // end for loop
                
            } else {
                
                this._revealedIcons.push( go );
                
                // check length is same length as playableIcons
                if (this._revealedIcons.length === this._playableSymbols.length) {
                
                    var ticketLabels: Array<number> = [];
               
                    // check for duplicates     
                    for (var i = 0; i < this._playableSymbols.length; i++) {
                        
                        var element = this._playableSymbols[i];
                        var ticketLabel: number = element.getTicketLabel();
                        
                        ticketLabels.push( ticketLabel );
                        
                    }
                    
                    // now check the array for trips
                    /**
                     *  arr = {
                     *      5: [ gameObject, gameObject, gameObject ],
                     *      10: [ gameObject, gameObject ]
                     *  }
                     */
                    var arr = {};
                    for (var j = 0; j < ticketLabels.length; j++) {
                        
                        var e = ticketLabels[j];
                        
                        if ( arr.hasOwnProperty( String(e) ) ) {
                            
                            // push into value array
                            arr[String(e)].push( this._playableSymbols[j] );
                              
                        } else {
                            
                            // create object to push into
                            arr[String(e)] = [ this._playableSymbols[j] ];
                            
                        }
                        
                    }
                    
                    // loop through the values object and if any array length === 3 we have a winner
                    for (var prop in arr) {
                        if (arr[prop].length > 2 ) {
                            
                            for ( var b = 0; b < arr[prop].length; b++ )  {
                                
                                var gameObject = arr[prop][b];
                                gameObject.winReveal();
                                
                            }
                            
                            // bank amount
                            CORE.IWG.ame('bank', {deposit: [ arr[prop][0].getPrizeValue() ], log: true}); 
                            
                        }
                    }
                }
                
            }
            
            
            // check if in instantWin
            for ( var k = 0; k < this._instantWin.length; k++) {
                
                var instantWinLabel = this._instantWin[k];
                
                // check the playable symbol is revealed
                // if instantWin label is equal to playablesymbol ticket label 
                if ( instantWinLabel == go.getTicketLabel() ) {
                    
                    // animate winReveal
                    go.winReveal();
                    // bank amount
                    CORE.IWG.ame('bank', {deposit: [ go.getPrizeValue() ], log: true});
                    
                } // end if
                
            } // end for loop                      
            
        } // end _checkCount();
        
        
        /**
         *  name:           setInstantWin()
         *  description:    set InstantWin icons to include in check
         *  params:         ticketLabel: any
         *  returns:        boolean
         */
        public setInstantWin( ticketLabel: any ): boolean {
 
            // check if value is already in
            if ( this._instantWin.indexOf(ticketLabel) !== -1){
                console.warn('ticketLabel :' + ticketLabel + ', already included in InstantWin array');
                return false;
            }
            
            this._instantWin.push(ticketLabel)
            return true;
            
        }
        
    } // end class Match

} // end module
