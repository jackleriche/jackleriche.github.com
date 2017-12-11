/// <reference path="../../../typings/tsd.d.ts" />
module com.camelot.iwg {
	
   var  CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg;

	export class SyncAnimation {
		
		private static _instance: SyncAnimation = new SyncAnimation();
		private	_syncAnimationArray = [];

        constructor() { 

			if (SyncAnimation._instance) {
				throw new Error("Error: Instantiation failed: Use SyncAnimation.getInstance() instead of new.");
			}
			SyncAnimation._instance = this;

        }

		public static getInstance(): SyncAnimation {
			return SyncAnimation._instance;
		}
		
		/*
		 *	name: 			add()
		 *	description:	add animation to _syncAnimationArray array
		 *	params:			animation: Animation, from?: string		
		 *	returns:		null
		 */
		public add(animation: Animation, from = 0 ){
			
			var animationObject = {
				name: from,
				animation: animation				
			};
			this._syncAnimationArray.push(animationObject);
			
		}
		
		/*
		 *	name: 			play()
		 *	description:	play animations from the starting point given
		 *	params:			null		
		 *	returns:		null
		 */
		public play(){
		
			if ( this._syncAnimationArray.length > 0){
				for ( let i = 0; i < this._syncAnimationArray.length; i++ ){
					
					var anim = this._syncAnimationArray[i];
					anim.animation.seek(0);
					anim.animation.stop();
					
					anim.animation.play();		
					
				}						
			}			
		}
		
		
	}
}