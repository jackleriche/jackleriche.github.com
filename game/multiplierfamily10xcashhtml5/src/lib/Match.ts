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
        
        constructor( private _name ){
        
            this._subscribe();
                   
        }
        
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
        private _checkMatch( go: GameObject ): void {
            
            // loop through the winning symbols and check if revealed
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
            
            // check if in instantWin
            for ( var k = 0; k < this._instantWin.length; k++) {
                
                var instantWinLabel = this._instantWin[k];
                
                // check the playable symbol is revealed
                // if instantWin label is equal to playablesymbol ticket label 
                if ( instantWinLabel == go.getTicketLabel() ) {
                    
                    // animate winReveal
                    go.winReveal();
                    
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
