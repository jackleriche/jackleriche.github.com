/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {

    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS = IWG.SpriteSheets,
        ANIMATION = IWG.Animation,
        images = CORE.iwgLoadQ.images,
        BOARD = IWG.Board;

    export class Counter extends GameObject {
    	
        // Counter
        public sqCurrentNum:number = -1; 							// current square number
		public sqDestNum:number = -1; 								// destination number, updated from end of diceroll
		public sqStartNum:number = -1;								// start of move square, set on dice roll
		public sqPrevousNum:number= -1;							    // previous landed square number, check for swapper square
        private	counterFlip:boolean = false;					    // how the counter is flipped
		private moveSpaces:number = -1; 							// on popup - amount of spaces to move 
		private moveDestination:number = -1; 						// on popup - destination to move 
		private moveDestinationToken:number = -1; 				    // on popup - token you win on end move
		private moveDirectionForward:boolean = true;	            // direction of movement, unless its from a popup
		private moveTypeDice:boolean = true;					    // move type to set if popup or dice move
		private moveStartToken:number;								// hold start token
		private moveStartSquare:number; 							// hold start square
        

        constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 10) {
            super(_name, _dimensions, _zindex);
			this._subscribeCounter();
        }
		
		private _subscribeCounter(){
			IWG.IWGEM.on('popupClosed', this.moveCounterNext.bind(this));
		}
		private _unsubscribeCounter() {
			IWG.IWGEM.off('popupClosed');
		}
        
        private moveCounterNext(): void {
            
            if (this.sqCurrentNum != this.sqDestNum) {

				if (this.sqCurrentNum < 23) {

					if (this.moveDirectionForward) {		
								this.sqCurrentNum++
						} else {
								this.sqCurrentNum--
						}
					} else {
						this.sqCurrentNum = 0;
				}
				
				this.moveCounterTo(this.sqCurrentNum);
				
			} else { 
			    this.sqStartNum = this.sqCurrentNum;
				this.sqCurrentNum = this.sqDestNum;
				this.moveDirectionForward = true;
                var boardTileObject = BOARD.getInstance().getBoardObject(this.sqCurrentNum);
									
				// processSquare in BOARD
			    BOARD.getInstance().processSquare(this.sqCurrentNum,boardTileObject);
			}
        } 

        private moveCounterTo(squareNum: number): void {
            var squareObject = BOARD.getInstance().getBoardObject(squareNum),
                sqX = squareObject.getPosition().x,
                sqY = squareObject.getPosition().y;

            this.setPosition({ x: sqX, y: sqY }, false);
            
            TweenMax.to(this.getCanvas(), 0.2, { delay: 0.2, 
            bezier: { type: "thru", 
                values: [
                    { x: sqX, y: sqY - 100 }, 
                    { x: sqX, y: sqY }
                    ]
                 },
                 onCompleteScope:this,
                 onComplete:function() {
                     switch(squareNum) {						
						case 2:
						case 12:
							if(this.sqDestNum != 12 || this.moveDirectionForward) {
								this.flipCounter();
							}
							break;
						case 16:
							BOARD.getInstance().checkShortPath(false);
							break;
					
					}                  
					IWG.IWGEM.trigger('counterMoved');  
					
					// play bounce sound
					createjs.Sound.play("boing");        
								
								
                   this.moveCounterNext();  
                 }             
            });
        }
		
    	// work out if move direction
		private setCounterDirection(token:number):void {
			switch(token) {
				case 6:
						// loop - forward
						this.moveDirectionForward = true;
					break;
				case 7:		
						// boot - backwards
						this.moveDirectionForward = false;
					break;
				case 8:
						// cat - forward
						this.moveDirectionForward = true;
					break;
			}				
		}
        
        private flipCounter():void {
           if(!this.counterFlip) {
				TweenMax.to(this.getCanvas(), 0.1, { scaleX: -1});
				this.counterFlip = true;
			} else {
				TweenMax.to(this.getCanvas(), 0.1, { scaleX: 1});
				this.counterFlip = false;
			}
        }
		
		 public destroy() {
            console.log('destroying counter');
			this._unsubscribeCounter();
            super.destroy();
        }

    }
}