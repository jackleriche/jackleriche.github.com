/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Helper.ts" />
module com.camelot.iwg {

	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
		HELPER				= IWG.Helper,
        GAMEOBJECT 			= IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class Star {
		
		constructor( private _startX : number , private _startY : number, private _parent: any ) {
            this._setupLayout();            		
		}
	
	
        /*
         *  name:           _setupLayout()
         *  description:    setup layout for star
         *  params:         null
         *  returns:        null
         */
		private _setupLayout(){
			
            var star = new GAMEOBJECT( "ballDropStar", { w: 54, h: 52}, 3, this._parent );
            star.addBitmap({
                name: "ballDropStar",
				pos: {
					x: 27,
					y: 26
				},
				frame: "star_full",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
				doReg: {
					center: true
				}   
            });
            star.setPosition({
                x: this._startX - 20,
                y: this._startY - 45
            });
            
			star.setAnimation('reveal', "starReveal");
            
            star.reveal();
            
            
		}
		
		
	}
	
}