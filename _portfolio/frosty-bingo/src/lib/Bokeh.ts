/// <reference path="GameObject.ts" />
module com.camelot.iwg {

	var CAMELOT: any 	= com.camelot,
        CORE 			= CAMELOT.core,
        IWG 			= CAMELOT.iwg,
		HELPER			= IWG.Helper,
		GLOBAL			= IWG.Global,
		GAMEOBJECT 		= IWG.GameObject,
		SPRITESHEETS	= IWG.SpriteSheets;

	export class Bokeh {
		
		private positions = [
			[0, 170],
			[100, 50],
			[200, 100],
			[300, 30],
			[400, 78],
			[500, 68],
			[600, 34],
			[700, 63],
			[800, 124],
			[900, 98]			
		];
		
		constructor( private _amount: number ) {
			
			this._subscribe();
			
			GLOBAL.getInstance().addToGlobal('bokehIndex', 0);
			GLOBAL.getInstance().addToGlobal('bokehEffect', true);
			
			this._initComplete();			
			
		}
		
		/*
		 *	name:			_subscribe();
		 *	description:	setup event listeners
		 *	params:			null
		 *	returns: 		null
		 */
		private _subscribe() {
			IWG.IWGEM.on( 'bokeh', this._createBokehEffect.bind(this) );
		}
		
		/*
		 *	name:			_unsubscribe();
		 *	description:	remove event listeners
		 *	params:			null
		 *	returns: 		null
		 */
		private _unsubscribe() {
			IWG.IWGEM.off( 'bokeh' );
		}
		
		
		/*
		 *	name:			_createBokehEffect();
		 *	description:	create Bokeh effect
		 *	params:			null
		 *	returns: 		null
		 */
		private _createBokehEffect() {
			
			var index = GLOBAL.getInstance().getFromGlobal('bokehIndex');

			var bokeh = new GAMEOBJECT("bokeh" + index, { w: 82, h: 82 });
			bokeh.addBitmap({
				name: "bokeh",
				pos: {
					x: 41,
					y: 41
				},
				frame: "bg_orb",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					center: true
				}	
			});
			bokeh.setPosition({
				x: this.positions[index][0],
				y: this.positions[index][1]
			});
			bokeh.setScale(0, 0);
			bokeh.setAnimation('reveal', "bokehScale");
			
			bokeh.reveal();
			
			var updateIndex = index + 1;			
			GLOBAL.getInstance().addToGlobal('bokehIndex', updateIndex);
			

		}		
		
		/*
		 *	name:			_initComplete();
		 *	description:	called once constructor has done its thang
		 *	params:			null
		 *	returns: 		null
		 */
		private _initComplete() {
			 
			for ( var i = 0; i < this._amount; i++ ) {
				IWG.IWGEM.trigger('bokeh', [i]);	
			}	
			 
			 
		}
		
	}
	
}