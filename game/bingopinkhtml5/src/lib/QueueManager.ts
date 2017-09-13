/// <reference path="../../../typings/tsd.d.ts" />
module com.camelot.iwg {

	var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg;

    export class QueueManager {

		private static _instance:QueueManager = new QueueManager();
		
		private _active: boolean = false;
		private _queue: any = [];
		

        constructor() {
		
			if(QueueManager._instance){
            		throw new Error("Error: Instantiation failed: Use QueueManager.getInstance() instead of new.");
	        }
        	QueueManager._instance = this;

        }
		
		public subscribe(): void {
		
			IWG.IWGEM.on('animationEnd', this.nextReveal.bind(this) );
			
		}
		
		private unsubscribe(): void {
			
			IWG.IWGEM.off('animationEnd')
			
		}
		
		public static getInstance():QueueManager {
        	return QueueManager._instance;
    	}
		
		
		/*
		 *	name: 			nextReveal()
		 *	description:	play the next reveal in the queue
		 *	params:			null
		 *	return: 		null
		 */
		public nextReveal( ): void {
			
			if( this._queue.length > 1 ){
				this._queue.shift();
				this._queue[0].gameObject.animate( this._queue[0].animation );				
			} else {
				this._active = false;
				this._queue.shift();
				IWG.IWGEM.trigger('queueFinished');
			}
			
		}
		
		/*
		 *	name: 			addToQueue()
		 *	description: 	add gameObject to the queueManager queue
		 *	params:			gameObject: gameObject, animation: string
		 *	return:			null
		 */
		public addToQueue( gameObject, animation ): void {
			
			var object = {
				gameObject: gameObject,
				animation: animation
			};
			
			this._queue.push(object);	
			
			console.log(this._queue);		
		}
		
		/*
		 *	name: 			startReveals()
		 *	description: 	start gameObjects reveals else displays a warning
		 *	params:			null
		 *	return:			null
		 */
		public startReveals(): void {

			if ( !this._active ) {
				
				this._active = true;
				this._queue[0].gameObject.animate( this._queue[0].animation );
				
			}
		}				
    }
}