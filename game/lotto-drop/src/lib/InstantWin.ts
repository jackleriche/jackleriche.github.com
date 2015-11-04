/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Pin.ts" />
/// <reference path="Helper.ts" />
/// <reference path="Legend.ts" />
module com.camelot.iwg {
	
	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
		HELPER				= IWG.Helper,
        GAMEOBJECT 			= IWG.GameObject,
		LEGEND				= IWG.Legend,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class InstantWin extends Scene {
		
		private _legend: Legend = new LEGEND();
		
		constructor(_name) {
			super(_name);
            
            this._subscribeInstantWin();			
			this._setupLayout();
            
            this._legend.setSequential(true);
            this._boardOn();
		}
        
        private _subscribeInstantWin() {
            IWG.IWGEM.on( 'instantWin', this._instantWin.bind(this) );
        }
		
        
        /*
         *  name:           _setupLayout()
         *  description:    method for setting up the basic layout of instantWin class
         *  params:         null
         *  returns:        null
         */
		private _setupLayout(): void {
            
			var instantWinText = new GAMEOBJECT('instantPrizeText', { w: 140, h: 24}, 3, this);
            instantWinText.addBitmap({
                name: "instantWinText",
                pos: {
                    x: 70,
                    y: 12
                },
                frame: "title_instantprize",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            instantWinText.setPosition({
                x: 0,
                y: 0
            });
			
			var instantPrize = new GAMEOBJECT("instantPrize", { w: 56, h: 56}, 3, this);
            instantPrize.addBitmap({
                name: "instantPrize",
                pos: {
                    x: 28,
                    y: 28
                },
                frame: "iw_circle_grey",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            })
            instantPrize.setPosition({
                x: 35,
                y: 30
            });
            instantPrize.setTicketLabel('instantWin');
            instantPrize.setAnimation('reveal', 'instantReveal')
            
            var instantWinPrizeAmount = new GAMEOBJECT("instantWinPrizeAmount", { w: 56, h: 56}, 3, this);
            instantWinPrizeAmount.addBitmap({
                name: "instantWinPrizeAmount",
                pos: {
                    x: 28,
                    y: 28
                },
                frame: "iw_large3",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            instantWinPrizeAmount.setScale(0,0);
            instantWinPrizeAmount.setPosition({
                x: 35,
                y: 30
            });
            instantWinPrizeAmount.setAnimation('winReveal', 'instantPrizeReveal');
			
			
			this._legend.addRow({
				prizeValue: 3,
                // icons
                prize: instantWinPrizeAmount,
                icons: [instantPrize]
			})
			
		} // end setupLayout
        
        
        /*
         *  name:           _instantWin()
         *  description:    called from an event, calls updateLegend
         *  params:         amount: number
         *  returns:        null
         */
        private _instantWin(amount: number): void {
            
            
            
            // update the prize amount visual
            var prizeAmount = this.getChildByName('instantWinPrizeAmount');
            prizeAmount.getBitmap('instantWinPrizeAmount').gotoAndStop('iw_large'+amount);
            prizeAmount.getStage().update();
            
            // change the data value
            this._legend.getRow(0).prizeValue = amount
                        
            // bank the new amount
            this._legend.updateLegend("instantWin");
            
        }
        
        /*
        *	name:			_boardOn
        *	description:	animate the board on
        * 	returns:		null	
        */
		private _boardOn(): void {
            TweenMax.to(this.getDiv(), 0.5, {alpha: 1, delay: 1});
		}
		
	}
	
}