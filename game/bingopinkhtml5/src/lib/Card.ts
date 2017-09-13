/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Legend.ts" />

module com.camelot.iwg {

	var CAMELOT: any 		= com.camelot,
        CORE 				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GLOBAL				= IWG.Global,
		QUEUEMANAGER		= IWG.QueueManager,
		GAMEOBJECT 			= IWG.GameObject,
		CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
		SPRITESHEETS		= IWG.SpriteSheets,
		LEGEND				= IWG.Legend,
		HELPER				= IWG.Helper;

	export class Card extends Scene  {
		
		private _cardObject: GameObject				= null;
		private _legend: Legend						= new LEGEND();
		private _numberObjects: Array<ClickableGameObject> 	= [];
		private _prizes: Array<GameObject>			= [];
		private _doubler: Array<number>				= [];
		
		constructor( _name, private _values: Array<number> ) {
			
			super(_name);
			this._subscribeCard();
			
			// setup scene
			this.setDimensions({
				w: 366,
				h: 252
			})
			
			this._setupLayout();
			this._initCardComplete();
			
		}
		
		/*
		 *	name: 			_subscribeCard();
		 *	description:	method called from constructor to setup event listeners for card
		 *	params: 		null
		 *	returns: 		null
		 */
		private _subscribeCard() {
			IWG.IWGEM.on( 'disableCard', this._disableCard.bind(this) );
			IWG.IWGEM.on( 'cardBallCheck', this._checkCard.bind(this) );
			IWG.IWGEM.on( 'cardsReady', this._markCard.bind(this) );
		}
		
		/*
		 *	name: 			_checkCard()
		 *	description:	check numbers on card, if number is called out, play the markNumber animation 
		 *	params:			null
		 *	returns:		null
		 */
		private _checkCard(ballNumber) : void {
			
			var self = this;
			
			for (var i = 0; i < this._numberObjects.length; i++) {
				var numberObject = this._numberObjects[i];
				// set matching number enabled(true)
				if (Number(ballNumber) === numberObject.getTicketLabel() ){
					IWG.IWGEM.trigger('Card.incCardCount');
				}
			}
			
			// announce card has been checked for matching numbers
			IWG.IWGEM.trigger('Card.cardReady');
			
		}
		
		
		/*
		 *	
		 *
		 *
		 *
		 */
		private _markCard() {
			
			var self 		= this,
				ballNumber 	= GLOBAL.getInstance().getFromGlobal('ballNumber');
			
			for (var j = 0; j < this._numberObjects.length; j++) {
				
				var numberObject = this._numberObjects[j];
				// set matching number enabled(true)
				if (Number(ballNumber) === numberObject.getTicketLabel() ){
				
					if (GLOBAL.getInstance().getFromGlobal('method') === "MarkYourself") {
							
						// trigger event to count amount of cards with matching number
						numberObject.setEnabled(true);
						numberObject.animate('reminder');
						
						numberObject.setAction('click', function(numberObject) {	
							
							numberObject.setEnabled(false);
							IWG.IWGEM.trigger('Card.decCardCount');
							numberObject.animationTimeLine.kill();
							
							self._legend.updateLegend(ballNumber);
							numberObject.getBitmap('highlight').alpha = 0;
							numberObject.getStage().update();
							
						}.bind(null, numberObject));
						
					} else if (GLOBAL.getInstance().getFromGlobal('method') === "cardsMarked") {
						
						IWG.IWGEM.trigger('Card.decCardCount');
						self._legend.updateLegend(ballNumber);						
						
					} else {
						IWG.IWGEM.trigger('Card.decCardCount');
						self._legend.updateLegend(ballNumber);
					}
				}				
			}
		}
		 
		
		
		/*
		 *	name: 			_disableCard()
		 *	description:	disable all card numbers, so numbers cannot be clicked
		 *	params:			null
		 *	returns:		null
		 */
		private _disableCard() : void {
			for ( var i = 0; i < this._numberObjects.length; i++ ){
				var number = this._numberObjects[i];
				number.setEnabled(false);
			}
		}
		
		/*
		 *	name: 			_setupLayout();
		 *	description:	method called from constructor to setup the layout of the card
		 *	params:			null
		 *	returns:		null
		 */
		private _setupLayout() : void { 
			
			var bingoCard = new GAMEOBJECT(this.getName() + "gameObject", { w: 366, h: 252 }, 1, this ); 
			this._cardObject = bingoCard;
			bingoCard.addBitmap({
				name: "cardBackground",
				pos: {
					x: 183,
					y: 129 
				},
				frame: "gamepanel",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					center: true
				}				
			});
			
			bingoCard.addBitmap({
				name: "cardBackground",
				pos: {
					x: 185,
					y: 137
				},
				frame: "gamepanel_grid",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					center: true
				}
			});
			
			// legend corner game object creation
			var legendCornerGameObject = new GameObject(this.getName() +'-legend-corner', {w: 190, h: 20}, 1, this);
			legendCornerGameObject.setTicketLabel(this._values[3]);
			legendCornerGameObject.setPosition({
				x: 160,
				y: 23
			});
			legendCornerGameObject.addBitmap({
				name: "legend",
				pos: {
					x: 0,
					y: 0
				},
				frame: "legend_4corners",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				}
			});
			legendCornerGameObject.addBitmap({
				name: "legend_value",
				pos: {
					x: 108,
					y: 0
				},
				frame: "p" + this._values[3],
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				}
			});
			legendCornerGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
			
			// legend column game object creation 
			var legendColumnGameObject = new GameObject(this.getName() +'-legend-column', {w: 180, h: 20}, 1, this);
			legendColumnGameObject.setRotation(-90);
			legendColumnGameObject.setTicketLabel(this._values[1]);
			legendColumnGameObject.setPosition({
				x: -60,
				y: 112
			});
			legendColumnGameObject.addBitmap({
				name: "legend",
				pos: {
					x: 100,
					y: 0
				},
				frame: "legend_column",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				},
				rotation: 90
			});
			legendColumnGameObject.addBitmap({
				name: "legend_value",
				pos: {
					x: 100,
					y: 0
				},
				frame: "p" + this._values[1],
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				}
			});
			legendColumnGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
            
			
			var legendRowGameObject = new GameObject(this.getName() +'-legend-row', {w: 180, h: 20}, 1, this);
			legendRowGameObject.setTicketLabel(this._values[0]);
			legendRowGameObject.setPosition({
				x: 45,
				y: 23
			});
			legendRowGameObject.addBitmap({
				name: "legend",
				pos: {
					x: 0,
					y: 0
				},
				frame: "legend_row",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				}
			});
			legendRowGameObject.addBitmap({
				name: "legend_value",
				pos: {
					x: 55,
					y: 0
				},
				frame: "p" + this._values[0],
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				}
			});
			legendRowGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
			
			var legendDiagonalGameObject = new GameObject(this.getName() +'-legend-diagonal', {w: 180, h: 20}, 1, this);
			legendDiagonalGameObject.setTicketLabel(this._values[2]);
			legendDiagonalGameObject.setRotation(-90);
			legendDiagonalGameObject.setPosition({
				x: 245,
				y: 105
			});
			legendDiagonalGameObject.addBitmap({
				name: "legend",
				pos: {
					x: 104,
					y: 0
				},
				frame: "legend_diagonal",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				},
				rotation: 90
			});
			legendDiagonalGameObject.addBitmap({
				name: "legend_value",
				pos: {
					x: 104,
					y: 0
				},
				frame: "p" + this._values[2],
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
				doReg: {
					custom: {
						x: 0,
						y: 0
					}
				}
			});
			legendDiagonalGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
			
		}
		
		/*
		 *	name: 			_sortDoublers();
		 *	description:	used to sort doublers out on the card, retrieve relevant card info from ticket and apply to the card
		 *	params: 		null
		 *	returns: 		null
		 */
		private _sortDoublers() {
		
			if ( this._doubler !== null ){
			
				for ( var i = 0; i < this._doubler.length; i++ ){
					
					var doublerRow 	= this._doubler[i],
						row 		= this._legend.getRow(doublerRow);
					
					// set prize value to be double
					row.prizeValue 	= row.prizeValue * 2;
					row.label 		= "doubler";
					
					// set numbers to be red to determine which row is a doubler				
					for (var j = 0; j < row.rowIcons.length; j++) {
						var rowIcon = row.rowIcons[j];
						rowIcon.getBitmap('text').color = "#fc2a1d";
					}
				}
			}
		}
		
		/*
		 *	name: 			_initCardComplete()
		 *	description:	method called after the construtor has done its business
		 *	params:			null
		 *	returns: 		null
		 */
		private _initCardComplete() : void {
			
		}
		
		/*
		 *	name: 			setupCardNumbers()
		 *	description:	used to setup the card numbers, this will be called remotely, once array has been passed in, the numbers will be ripped out and placed
		 *					in the card
		 *	params:			numbers: Array<number>
		 *	returns: 		null
		 */
		public setupCardNumbers( numbers:Array<number> ) {
			
			if (!numbers) {
				console.warn('no carnd numbers have been set');
				return false;
			}
			
			var x 	= 47;
            var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            
			for (var i = 0; i < numbers.length; i++){
				
				var numberObject = new CLICKABLEGAMEOBJECT(this.getName() + "-number-" + i, { w: 57, h: 34 }, 1, this);
				numberObject.setTicketLabel(Number(numbers[i]));
				numberObject.setPosition({
					x: x,
					y: 50 + ( (i % 5) * 35 )
				});
				numberObject.setEnabled(false);
				
				// highlight
				var highlight = new createjs.Shape();
				highlight.name	= 'highlight';
				highlight.graphics.beginFill("#ed018c").drawRect(1, 0, 57, 36);
				highlight.alpha = 0.01;
				numberObject.getStage().addChild(highlight);
				
				// dabber
				numberObject.addBitmap({
					name: "dabber",
			        pos: {
			            x: 27,
			            y: 17
			        },
			        frame: "splodge_" + GLOBAL.getInstance().getFromGlobal('dabber'),
					spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
					doReg: {
						center: true
					},
					alpha: 0
				});	
					
				// number 
				var numberString:any = numbers[i],
					text = new createjs.Text( numberString.toString() , "Bold 29px effra", "black");
				text.name = "text";
                if(is_firefox){
                    text.y = 3;
                } else {
                    text.y = -2;
                }
				
				numberObject.getStage().addChild(text);
	
				text.x 	= 28;
				text.textAlign = "center";
				
				if ( numberString === -1 ){
					text.text 	= "FREE";
					text.font 	= "Bold 20px effra";	
					text.x 		= 28;	
					text.y		= 5;
				} 
				
				if ( 4 - (i % 5)  === 0 ) {
					x+= 55;
				};
				
				var hitbox 		= new createjs.Shape();
				hitbox.name 	= 'hitbox';
				hitbox.graphics.beginFill("blue").drawRect(0, 0, 52, 32);
				text.hitArea 	= hitbox;
				
				numberObject.getStage().update();
				
				// set animation
				numberObject.addAnimation('markNumber');
				
				numberObject.setAnimation('markNumber', 'markNumber');
				numberObject.setAnimation('winReveal', 'numberWinReveal');
				numberObject.setAnimation('reminder', 'numberHighlight', 0.5, 4);
				
				// push numberObject to the array
				this._numberObjects.push( numberObject );			
				
			}

		}
		
		/*
		 *	name: 			setupLegend()
		 *	description:	sets up the legend
		 *	params:			null
		 *	returns: 		null
		 */
		public setupLegend() : void {
			
			var checkArray 		= HELPER.getInstance().listToMatrix(this._numberObjects, 5),
				legend			= [],
				prizeObjects	= [
					this.getChildByName(this.getName() +'-legend-column'),
					this.getChildByName(this.getName() +'-legend-row'),
					this.getChildByName(this.getName() +'-legend-corner'),
					this.getChildByName(this.getName() +'-legend-diagonal'),
				];
			// row	
			for ( var k = 0; k < 5; k++ ){
				
				// empty row array
				var row: Array<GameObject> = [];
				
				for (var l = 0; l < 5; l++){					
					row.push( checkArray[l][k] );
				}	
				this._legend.addRow({
					prizeValue: prizeObjects[1].getTicketLabel(),
        			// icons
        			prize: prizeObjects[1],
        			icons: row
				});			
			}	
			
			// columns
			var x = 15,
				y = 50;
			for ( var i = 0; i < 5; i++ ){
				
				x+= 55; 
				y = 50;
				var col: Array<GameObject> = [];
				
				for (var j = 0; j < 5; j++){
					col.push( checkArray[i][j] );
				}
				legend.push(col);	
				this._legend.addRow({
					prizeValue: prizeObjects[0].getTicketLabel(),
			        prize: prizeObjects[0],
			        icons: col
				});
			}
			
			var corner = [
				legend[0][0],
				legend[0][4],
				legend[4][0],
				legend[4][4]				
			];
			this._legend.addRow({
				prizeValue: prizeObjects[2].getTicketLabel(),
    			// icons
    			prize: prizeObjects[2],
    			icons: corner
			});
			var diagonalTopLeft = [
				legend[0][0],
				legend[1][1],
				legend[2][2],
				legend[3][3],
				legend[4][4],
			];
			this._legend.addRow({
				prizeValue: prizeObjects[3].getTicketLabel(),
    			// icons
    			prize: prizeObjects[3],
    			icons: diagonalTopLeft
			});
			var diagonalBottomLeft = [
				legend[0][4],
				legend[1][3],
				legend[2][2],
				legend[3][1],
				legend[4][0],
			];
			this._legend.addRow({
				prizeValue: prizeObjects[3].getTicketLabel(),
    			// icons
    			prize: prizeObjects[3],
    			icons: diagonalBottomLeft
			});
			
		}
			
		
		/*
		 *	name: 			intro()
		 *	description:	animates the card in
		 *	params:			delay: number
		 *	returns: 		null
		 */
		public intro(delay: number = 1) : void {
			TweenMax.to(this.getDiv(), 1, { scaleX:1, scaleY: 1, delay: delay, ease: Bounce.easeOut });
		} 
		
		
		/*
		 *	name: 			setDoublers()
		 *	description:	sets doubler rows in the legend
		 *	params:			doublers: array<number>
		 *	returns: 		null
		 */
		public setDoublers(doublers) : void {
			this._doubler = doublers;	
			this._sortDoublers();		
		}
		
		
	}
}