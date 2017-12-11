/// <reference path="../../../typings/tsd.d.ts" />
module com.camelot.iwg {

	export class Scale {
		
		private _enabled: boolean = false;
		private _parent: HTMLElement;
		private _scaleFactor: number;
		private _scaleDiv: HTMLElement = document.createElement('div');
				
        constructor( parent?: HTMLElement ) {
				
			if (parent) {
				this._parent = parent;
			} 
			
			this.setupScaleDiv();
			this.moveIWGholderIntoScaleDiv();
			this.scaleFactor();
			this.alignScaleDiv();
            
        }
		
		/*
		 *	name: 			setupScaleDiv()
		 *	description:	create a HTML element that can be scaled
		 *	params:			null
		 *	returns:		null
		 */
		private setupScaleDiv() {
			
			this._scaleDiv.id = "scaleDiv";
			this._scaleDiv.style.width    = "960px";
        	this._scaleDiv.style.height   = "640px";
			this._scaleDiv.style.position = "relative";
			
			this._parent.appendChild(this._scaleDiv);
			
		}
		
		/*
		 *	name: 			moveIWGholderIntoScaleDiv()
		 *	description:	move all elements into scaleDiv
		 *	params:			null
		 *	returns:		null
		 */
		private moveIWGholderIntoScaleDiv() {
			
			var iwgCanvas = document.getElementById('IWGcanvas');
        	this._scaleDiv.appendChild(iwgCanvas);
			
		}
		
		/*
		 *	name: 			scaleFactor()
		 *	description:	work out scaleFactor using dimensions of screen and original Game width/height
		 *	params:			null
		 *	returns:		null
		 */
		private scaleFactor() {
			
			var w       		= window.innerWidth ,           // screen width
            h           		= window.innerHeight,           // screen height
            ow          		= 960,                          // your default game width
            oh          		= 640;                          // your default game height
            this._scaleFactor 	= Math.min(h / oh, w / ow);     
			
		}
		
		/*
		 *	name: 			alignScaleDiv()
		 *	description:	align scale div once size has been interpreted by size of screen
		 *	params:			null
		 *	returns:		null
		 */
		private alignScaleDiv() {
			
			// now position the scaleDiv correctly in the screen
	        var background      = document.getElementById('background'),
	            marginLeft      = (960 - window.innerWidth) / 2,
	            marginTop       = (640 - window.innerHeight) / 2;
	            
	        this._scaleDiv.style.left  = "-" + marginLeft + "px";
	        this._scaleDiv.style.top   = "-" + marginTop + "px";
	        
	        //background.style.left  = "-" + (marginLeft + 160) +"px";
	        //background.style.top   = "-" + (marginTop + 65) + "px";
	
	        if ( this._scaleFactor> 1 ){
	            this._scaleFactor = 1;
	            this._scaleDiv.style.left  	= Math.abs(marginLeft) + "px";
	            this._scaleDiv.style.top  	= Math.abs(marginTop) + "px";
	        };
	
	        // move all elements into scaleDiv
	        TweenMax.to(this._scaleDiv, 0, { scaleX: this._scaleFactor, scaleY: this._scaleFactor });
	       	//TweenMax.to( background , 0, { delay: 1, scaleX: this._scaleFactor, scaleY: this._scaleFactor });
			
		}
				
	}
}