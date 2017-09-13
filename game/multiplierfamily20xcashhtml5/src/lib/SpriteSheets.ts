/// <reference path="../../../typings/tsd.d.ts" />
module com.camelot.iwg {
   var  CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg;

	export class SpriteSheets {
		
		private static _instance: SpriteSheets = new SpriteSheets();
		private _sheets: Object = {};
				
        constructor() { 
			
			if(SpriteSheets._instance){
            	throw new Error("Error: Instantiation failed: Use SpriteSheets.getInstance() instead of new.");
        	} 
        	SpriteSheets._instance = this;
            
        }
		
		public static getInstance():SpriteSheets {
        	return SpriteSheets._instance; 
    	}
		
		/*
         *  name:           addSpriteSheet
         *  description:    add spriteSheet to the SpriteSheets._sheets object, this will use a json object that is found in imports
         *  params:         spriteData: JSON
         *  return:         null
         */
        public addSpriteSheet ( name: string, spriteData: any ): void {
            
            // check to make sure the animation name doesnt already exist
            if ( !this._sheets.hasOwnProperty(name)) {
                var image = CORE.iwgLoadQ.getResult(name);
                spriteData.images[0] = image.src;
                this._sheets[name] = new createjs.SpriteSheet(spriteData);
                
                
            } else {
                console.warn('spriteSheets already in _sheets object');                
            };

        };
        
        /*
         *  name:           getSpriteSheet
         *  description:    retrieve spritesheet from object
         *  params:         spriteData: JSON
         *  return:         null
         */
        public getSpriteSheet ( name: string ): void {
            
            // check to make sure the animation name doesnt already exist
            if ( this._sheets.hasOwnProperty(name)) {
               return this._sheets[name];                
            }

        }
        
    }
}