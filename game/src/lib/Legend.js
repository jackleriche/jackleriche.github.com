(function( window ) {

	function Legend(){
		//public variables
		this._legendRows = [];              // Array containing rows in the legend. Each row is an array
                                            // first in array is the bottom of the legend. The items in the row arrays
                                            // are GameAssets. The ticketLabels must match the ticketLabels on the items
                                            // being passed in to the upadateLegend method.
													
		this._isSequentialReveal = true;	// True for sequential bottom to top reveal of won tokens
		this._revealPulseCount = 3;			// Number of times to pulse a reveal
		this._revealDelay = 30;				// Number of framse a reveal takes
		this._winRevealPulseCount = 3;		// Number of times to pulse a row on a winning reveal
		this._winRevealDelay = 30;			// Number of frames a row win reveal takes
		this._delayWinReveals = false;		// True if row wins are delayed until after all legend elements have been revealed
		this._singleRowReveal = false;      
		
        /**
        * pushLegendRow
        * Method used to push a legend row into the internal data member _legendRows.
        *
        * @param prizeValue - GameAsset representing the prize for the row
        * @param legendRow - Array of GameAssets that make up the legend row
        **/
        this.pushLegendRow = function( prizeValue,legendRow ) {

            var r = new Array(prizeValue, legendRow);
            this._legendRows.push(r);

        }

        
        /**
         * updateLegend
         * Primary method called to updade the legend according to its configuration.
         * 
         * @param item - GameAsset of the item to highlight in the legend
         * @param legendDelay - Number of frames to delay the legend reveal run by
         * @return number - the accumulated reveal delay
         **/
        Legend.prototype.updateLegend = function( legend, item, legendDelay) {

            string = "t" + item;

            var reveal = setTimeout(function(){

                for ( i = 0; i < legend._legendRows.length; i++ ){
                    // im in the legend rows 
                    for ( j = 0; j < legend._legendRows[i][1].length; j++ ){
                        
                        if (string == legend._legendRows[i][1][j].children[1].currentAnimation ) {
                            // do stuff
                            legend._legendRows[i][1][j].children[0].alpha = 1;
                        }
                    }
                }
            }, legendDelay);
        }	
	}

	window.Legend = Legend;

}(window));