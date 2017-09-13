/**
	 * Legend
	 * Used to show and manage the game legend / prize table. All interaction with the
	 * Legend is through this class, and any prizes won will be recorded via the static bank
	 * class.
	 * @author E-scape Interactive
	 * @version 1.0
 **/

 (function (window) {
    "use strict";
    //set local paths to external files.

    //public variables
   var 	IWGInit,
        camelot 			= window.com.camelot,
        iwg 				= camelot.iwg,
        lib                 = iwg.lib,
        MEvent 				= lib.MEvent,
        R                   = window.com.camelot.iwg.lib.R,
        core				= camelot.core,
    						// Array containing rows in the legend. Each row is an array
    												// first in array is the bottom of the legend. The items in the row arrays
													// are GameAssets. The ticketLabels must match the ticketLabels on the items
													// being passed in to the upadateLegend method.

    	_isSequentialReveal 	= true,				// True for sequential bottom to top reveal of won tokens
    	_revealPulseCount		= 3,				// Number of times to pulse a reveal
    	_revealDelay			= 600,				// Number of framse a reveal takes
    	_winRevealPulseCount	= 3,				// Number of times to pulse a row on a winning reveal
    	_winRevealDelay 		= 30,				// Number of frames a row win reveal takes
    	_delayWinReveals		= false,			// True if row wins are delayed until after all legend elements have been revealed
    	_singleRowReveals		= false,


    Legend = function () {

      	var _revealArray			= [],
      		_hasWon					= false,
      		_legendRows 			= [];

        //getter/setter
        this.getRevealArray = function () {
            return _revealArray;
        };
        this.getRevealDelay = function(){
        	return _revealDelay;
        };
        this.getHasWon = function(){
	        return _hasWon;
        };
        this.getSequentialReveal = function(){
        	return _isSequentialReveal;
        };
        this.getLegendRows = function(){
	        return _legendRows;
        };
        // setter
        this.setHasWon = function(prv){
	        _hasWon = prv;
        };
		this.setRevealArray = function (prv) {
            _revealArray = prv;
        };
        this.setLegendRows = function(prv) {
	        _legendRows = prv;
        }

    }

    /**
		* isSequentialReveal
		* State checker to see if the class is configured to perform a sequential reveal.
		* Returns true for a sequential reveal.
		*
		* @return Boolean
	**/
	Legend.prototype.isSequentialReveal = function() {
		return this._isSequentialReveal;
	};

	/**
		* pushLegendRow
		* Method used to push a legend row into the internal data member _legendRows.
		*
		* @param prize 	- GameAsset representing the prize for the row
		* @param row	- Array of GameAssets that make up the legend row
	**/
	Legend.prototype.pushLegendRow = function(prize, row){
		var legendRow = this.getLegendRows();
		var r = new Array(prize,row);
		legendRow.push(r);
		this.setLegendRows(legendRow);
	};

	Legend.prototype.updateLegend = function(ticketLabel, legendDelay, simulation) {

		var legendItem,
			delay 		= legendDelay,
			revealedCount,
			sim			= simulation,
			rowLength,
			revealNum = 0;

		for( var row = 0; row < this.getLegendRows().length; row++) {
			rowLength = this.getLegendRows()[row][1].length;
			revealedCount = 0;
			for ( var col = 0; col < rowLength; col++) {
				legendItem = this.getLegendRows()[row][1][col];
					if (legendItem.getIsRevealed() === true) {
						revealedCount++;
					} else {
						if (parseInt(ticketLabel) == legendItem.getTicketLabel()) {
							// Its a matching item
							revealNum++;
							legendItem.setIsRevealed(true);
							if (!simulation){
								legendItem.reveal("reveal", legendItem, (revealNum * this.getRevealDelay()) );
							}
							// get array
							var a = this.getRevealArray();
							a.push(legendItem);
							// set array
							this.setRevealArray(a);
							revealedCount++;
							if (this.getSequentialReveal()) {
								delay += _revealDelay;
							}
						}
					}
			}
			// if is Win reveal\
			if (revealedCount == rowLength && (this.getLegendRows()[row][0].getWinReveal() === false)) {

				var prizeItem 	= this.getLegendRows()[row][0],
					winner		= false;

				// Its a winner so lets do the win reveal
				if(R._ticketWinner == 0){
					R.halt();
					core.IWG.ame('error', {mes: ['XML manipulation error, code 1']});
				}
				// prize
				if (!sim){
					prizeItem.reveal("winPrizeReveal", prizeItem, ((revealNum * 500) + 1000));
					for ( var col = 0; col < rowLength; col++) {
						// tiles
						var legendItem = this.getLegendRows()[row][1][col];
						legendItem.reveal("winReveal", legendItem, ((revealNum * 500) + 1000));
					}
				} else {

					var bank = prizeItem.ticketLabel;

					R.simBank = bank;
					if (parseInt(R.simBank) !== R._ticketPrizeAmount){

						R.halt();
						core.IWG.ame('error', {mes: ['XML manipulation error, code 2']});

					}

				}



			}
			var thisRef = this;
		}
		// call for turn
		iwg.IWGEM.dispatchEvent(MEvent.ADDTURN);

		setTimeout(function(){
			iwg.IWGEM.dispatchEvent(MEvent.LEGENDENDTURN);
		}, delay);

	};

    // namespace path
    iwg._class("iwg.lib.Legend", Legend);
}(window));
