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

	export class Pin extends GameObject {
		
		constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 1, _parent: any = "scaleDiv" ) {
			super(_name, _dimensions, _zindex, _parent);	
			
			this._initPin();		
		}
	
	
		private _initPin(){
			
			
		}
		
	}
	
}