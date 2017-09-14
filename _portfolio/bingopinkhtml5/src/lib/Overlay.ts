/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
module com.camelot.iwg {

	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
        GAMEOBJECT 			= IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class Overlay { 
		
		private _object = new CLICKABLEGAMEOBJECT("overlay", { w: 2000, h:2000 });
		private _overlayOn:boolean = false;
		
		constructor(private _clickthrough: boolean = false) {
			
			this._init();
			this._subscribe();
			 	
		}
		
		private _subscribe() {
			IWG.IWGEM.on("showOverlay", this._showOverlay.bind(this) );
			IWG.IWGEM.on("hideOverlay", this._hideOverlay.bind(this) );
		}
		
		private _showOverlay() {
			TweenMax.to(this._object.getCanvas(), 0.7, { autoAlpha: 0.85,
				onComplete: () => {
					this._overlayOn = true;
			}});
		}
		
		private _hideOverlay() {
			TweenMax.to(this._object.getCanvas(), 0.7, { autoAlpha: 0 ,
				onComplete: () => {
					this._overlayOn = false;
				}
			});
		} 
		
		private _init() {
			
			this._object.setZindex(9);

			var overlay = new createjs.Shape();
			overlay.graphics.beginFill("#000").drawRect(0, 0, 2000, 2000);
			overlay.alpha = 0.2;

            this._object.getStage().addChild(overlay);
			this._object.getStage().update();
			
			if ( this._clickthrough ){
				this._object.getStage().on('click', () => {
					if(this._overlayOn) {
						IWG.IWGEM.trigger('hideOverlay');
						IWG.IWGEM.trigger('hideInstructions')
						IWG.IWGEM.trigger('hideGames');
					}
				});
			}
			
			this._object.setPosition({
				x: -300,
				y: -300
			});
			
			TweenMax.set( this._object.getCanvas(), { autoAlpha: 0} ); 
			
		}
	
	}
	
}