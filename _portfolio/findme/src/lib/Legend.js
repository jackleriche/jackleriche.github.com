(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Legend = function (name) {

			if (!name){
                console.warn('Legend instance has no name');
                return false;
            }
            
            if (typeof Legend.instance === "object") {
                return Legend.instance;
            }
            
            Legend.instance = this;
            
		    var _name           = name,
		        _bank           = 0,   
                _legendRows     = [],
                _updateLegend   = function(checkIcon) {
                    
                    if (!Helper.isDefined(checkIcon)) {
                        console.warn('need icon to check');
                        return false;
                    }
                    
                    // check each row
                    for (var row = 0; row < _legendRows.length; row++) {
                        var rowLength       = _legendRows[row].rowIcons.length,
                            allRevealed     = false;
                            
                        // check each icon in each row
                        for (var col = 0; col < rowLength; col++) {
                        
                            var icon = _legendRows[row].rowIcons[col];    
                            if ( icon.niceName === checkIcon ){
                                if(!icon.revealed){
                                    icon.revealed = true;
                                    icon.removeChild(icon.getChildByName('iconMask'));
                                    icon.getChildByName('iconHighlight').alpha = 1;
                                    _legendRows[row].revealedCount++;
                                    break;
                                }                
                            }
                        }
                        
                        if( _legendRows[row].revealedCount === rowLength ){
                            allRevealed = true;
                        }
                        
                        // so if all are revealed
                        if ( allRevealed && _legendRows[row].winner === false){
                            
                            var prizeIcon   = _legendRows[row].prizeIcon,
                                n           = prizeIcon.name;
                                
                            iwg.IWGEM.trigger('rowWon', [_legendRows[row]]);
                                
                            // add win to name to allow change in bitmap
                            var p           = 'lw' + n.split('l')[1];
                            prizeIcon.gotoAndStop(p);
                            
                        
                            _legendRows[row].winner = true;
                            
                            core.IWG.ame('bank', {deposit: [_legendRows[row].prizeValue], log: true});
							_bank += _legendRows[row].prizeValue;
							                            
                        };                    
                    }
                },  
                _subscribe      = function() {
                        
                    iwg.IWGEM.on('updateLegend', _updateLegend);
                     
                }(),
                _unsubscribe    = function() {
                    
                    iwg.IWGEM.off('updateLegend', _updateLegend)
                    
                };
            
            // getters
            /*
             * @return [{prize: GameAsset, row: [GameAsset]}]
             */
            this.getLegendRows = function() {
                return _legendRows;
            };
            this.getBank        = function() {
                return _bank;  
            };
            
            this.getActive      = function(){
                return _active;  
            };
            
            
            // setters
            this.setRows        = function( prv ) {
                _rows = prv;  
            };
            this.setLegendRows  = function( array ) {
                _legendRows = array;  
            };
            
            // unsubscribe
            this.unsubscribe    = function() {
                _unsubscribe;  
            };
            
            init.bind(this)();            

        };
    
    function init() {
    
    }
    
    Legend.prototype.addRow = function(prize, row) {
      
        var legendRow = this.getLegendRows();
        var r = {
            prizeValue:     prize.value,
            prizeIcon:      prize,
            rowIcons:       row,
            winner:         false,
            revealedCount:  0
        };
        legendRow.push(r);
        this.setLegendRows(legendRow);
        
    };


    Legend.prototype.destroy = function() {
     
        this.unsubscribe();
        
    }


    Legend.VERSION = '0_0_1';
    IWGInit = function () {
    
        _Legend = new Legend();
        
    };
    
    iwg._class("iwg.lib.Legend", Legend);
}(window));