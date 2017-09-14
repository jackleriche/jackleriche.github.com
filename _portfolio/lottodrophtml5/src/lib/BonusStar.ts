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

	export class BonusStar extends Scene {
                
		private _legend : Legend = new LEGEND();
        private _bonusStars : Array<GameObject> = [];
		
		constructor(_name) {
			super(_name);
			
			this._subscribeBonusStar();
			
            // setup legend
            this._legend.setSequential(true);
            
			this._setupLayout();
            this._boardOn();
		}
		
		private _subscribeBonusStar() {
		    IWG.IWGEM.on('bonusStar', this._bonusStar.bind(this) );     
		};
		
		private _setupLayout() {
			
			var bonusStarsText = new GAMEOBJECT('bonusStarsText', { w: 131, h: 24}, 3, this);
            bonusStarsText.addBitmap({
                name: "bonusStarsText",
                pos: {
                    x: 65,
                    y: 12
                },
                frame: "title_bonusstars",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }
            });
            bonusStarsText.setPosition({
                x: 20,
                y: 0
            });
            
            // row assets
            for (var i = 0; i < 3; i++) {
                
                var star = new GAMEOBJECT("star"+i, { w: 54, h: 54}, 3, this);
                star.addBitmap({
                    name: "star_shadow",
                    pos: {
                        x: 27,
                        y: 28
                    },
                    frame: "star_glow",
                    alpha: 0,
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                star.addBitmap({
                    name: "star" + i,
                    pos: {
                        x: 27,
                        y: 27
                    },
                    frame: "star_grey",
                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                    doReg: {
                        center: true
                    }
                });
                star.setPosition({
                    x: (59 * i),
                    y: 20
                });
                star.setTicketLabel('star');
				
				star.setAnimation('reveal', 'bonusStarReveal')
				
                this._bonusStars.push(star);
                
            };
            
            // prize asset
            var prizeAsset = new GAMEOBJECT('prizeAmount', { w: 44, h: 32}, 3, this);
            prizeAsset.addBitmap({
                name: "prizeAmount",
                pos: {
                    x: 22,
                    y: 16
                },
                frame: "bn_blue10",
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }           
            });
            prizeAsset.addBitmap({
                name: "prizeAmount_win",
                pos: {
                    x: 22,
                    y: 16
                },
                frame: "bn_star_win10",
                alpha: 0,
                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                doReg: {
                    center: true
                }           
            });
            prizeAsset.setPosition({
                x: 63,
                y: 70 
            });
            
            prizeAsset.setAnimation('winReveal', "bonusStarsWin", 1, 2, this._bonusStars);
            
            this._legend.addRow({
                prizeValue: 10,
                // icons
                prize: prizeAsset,
                icons: this._bonusStars
            });
			
		} // end _setupLayout()
		
        /*
         *  name:           _bonusStar()
         *  description:    method called from event, to update the BonusStar legend
         *  params:         null
         *  returns:        null
         */
        private _bonusStar() {
            this._legend.updateLegend("star");
            createjs.Sound.play('bonusWin')
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