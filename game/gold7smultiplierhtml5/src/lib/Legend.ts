/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        QUEUEMANGER = IWG.QueueManager,
        GAMEOBJECT = IWG.GameObject,
        ANIMATION = IWG.Animation,
        SPRITESHEETS = IWG.SpriteSheets,
        images = CORE.iwgLoadQ.images,
        iconRef = IWG.IconRef;
        
    interface rowConfig {
                      
        prizeValue: number,
        // icons
        prize: GameObject,
        icons: Array<GameObject>
        
    }

    export class Legend {
        
        private _legendRows: any = [];
        private _rows: number = 0;
        private _iconSpacing: number = 0;
        private _iconScale: number = 1;
        private _rowHeight: number = 80;
        private _filter: any = null;

        constructor() {
            this._subscribe();
        }
        
        private _subscribe(): void {
            IWG.IWGEM.on('updateLegend', this.updateLegend.bind(this));
            IWG.IWGEM.on('checkLegendRow', this._checkLegendRow.bind(this));
        }

        private _unsubscribe(): void {
            IWG.IWGEM.off('updateLegend');
            IWG.IWGEM.off('checkLegendRow');
        }
        
        public setIconSpacing( px:number ) {
            this._iconSpacing = px;
        }
         
        public setIconScale( scale:number ){
            this._iconScale = scale;
        }
        
        public setRowHeight( height: number ) {
            this._rowHeight = height;
        }
        public setFilter( filter: createjs.Filter ) {
            this._filter = filter;
        }
        public getRow( index: number ) {
            return this._legendRows[index];            
        }


        public updateLegend( ticketLabel ): void {

            // check each row
            for (var i = 0; i < this._legendRows.length; i++) {
                
                // set row to current row
                var row = this._legendRows[i];
                            
                // check each icon in each row
                for (var j = 0; j < row.rowIcons.length; j++) {
                    
                    // set icon
                    var icon = row.rowIcons[j];
                    
                    if (icon.getTicketLabel() === Number(ticketLabel)) {
                        if (!icon._revealed) {
                            icon._revealed = true;
                            //QUEUEMANGER.getInstance().addToQueue(icon, "markNumber");
                            icon.animate('markNumber');
                        }
                       // row.revealedCount++;
                    }
                }
            }
            
            this._checkLegendRow();
           
        }
        
        
        private _checkLegendRow() {
            
            for (var i = 0; i < this._legendRows.length; i++ ) {                
                
                var row         = this._legendRows[i],                    
                    allRevealed = false;
                    
                // check all icons are revealed in the row
                for ( var j = 0; j < row.rowIcons.length; j++ ) {
                    
                    // set icon
                    var icon = row.rowIcons[j];
                    if (!icon.getRevealed()) {
                        allRevealed = false;
                        break;
                    }
                    allRevealed = true;
                }
                
                if ( allRevealed && row.winner === false ) {
                    
                    // set flag to true so it never gets checked again after banked
                    row.winner = true;
                    
                    // get prizeIcon from row data
                    var prizeIcon   = row.prizeIcon;
                    prizeIcon.animate('winReveal');

                    // animate all objects
                    // createjs.Sound.play("endWinorRowWin");
                    for ( var k = 0; k < row.rowIcons.length; k++ ){
                        //set icon 
                        var icon = row.rowIcons[k];
                        if ( row.label === "doubler") {
                            icon.animate('doublerWinReveal');
                        } else {
                            icon.animate('winReveal');
                        }
                    }
                    
                    // bank at the end of row animations
                    CORE.IWG.ame('bank', { deposit: [ row.prizeValue], log: true });   
                }
            }
        }

        /*
         *  name:           addRow
         *  description:    adds a legend row to the legend row array
         *  params:         rowConfig
         *  returns:        null
         */
        public addRow(rowConfig: rowConfig) {
            
            this._rows++; 

            var legendRow = {
                prizeIcon: rowConfig.prize,
                rowIcons: rowConfig.icons,
                allRevealed: false,
                revealedCount: 0,
                winner: false,
                prizeValue: rowConfig.prizeValue,
                label: null
            }
 
            this._legendRows.push(legendRow);

        };
        
        public getRows() {
            return this._legendRows;
        }
        
        public destroy() {
            this._unsubscribe();
        }
    }
}