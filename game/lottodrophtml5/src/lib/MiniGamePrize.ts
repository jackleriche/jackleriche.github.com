/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
module com.camelot.iwg {
	
	var CAMELOT: any 		= com.camelot,
		CORE				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
        GAMEOBJECT 			= IWG.GameObject,
		SPRITESHEETS 		= IWG.SpriteSheets;

	export class MiniGamePrize {
		private _prizeObject:GameObject;
        private _miniGamePrizeType:number;
        private _endLocation:Object = {};
        
        constructor(_name) {
			
		}
        
        
        public setMiniGamePrize(prizeObject:any) {
            this._prizeObject = prizeObject;
        }
        
        public setMiniGamePrizeType(type:number) {
            this._miniGamePrizeType = type;  
            
            switch (type) {
                    case 1: 
                        // star
                        this._endLocation = {x: 79, y: 421}
                        break;
                    case 2: 
                        // bonus
                        this._endLocation = {x: 94, y: 275}
                        break;
                    case 4: 
                        // 10IW
                        this._endLocation = {x: 256, y: 430}
                        break;
                    case 5: 
                        // 5IW
                        this._endLocation = {x: 256, y: 430}
                        break;   
                     case 6: 
                        // 3IW
                        this._endLocation = {x: 256, y: 430}
                        break;
                    default:
                        break;
                }
                this._setMiniGameAnimate();
        }
        
        private _setMiniGameAnimate() {
            this._prizeObject.addAnimation('movePrize');
            this._prizeObject.setAnimation('movePrize', 'movePrize', 1.8, 1, {location: this._endLocation});
        }
        
        public movePrize() {
            this._prizeObject.animate('movePrize')
            TweenMax.delayedCall(2.3, () => {
                IWG.IWGEM.trigger('miniGamePrizeComplete', [this._prizeObject] )    
            })
        }
        
        public movePrizeLose() {
            this._prizeObject.addAnimation('movePrizeLose');
            this._prizeObject.setAnimation('movePrizeLose', 'movePrizeLose', 1.8, 1);
            this._prizeObject.animate('movePrizeLose')
        }
	}
}