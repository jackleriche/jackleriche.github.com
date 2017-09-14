/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
module com.camelot.iwg {

	var CAMELOT: any 		= com.camelot,
        CORE 				= CAMELOT.core,
        IWG 				= CAMELOT.iwg,
		GAMEOBJECT 			= IWG.GameObject,
		GLOBAL				= IWG.Global,
		CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,	
		OVERLAY				= IWG.Overlay,	
		SPRITESHEETS		= IWG.SpriteSheets;

	export class Instruction {
		
		private _children: Array<GameObject> = [];
	    private _iActive: boolean            = false;
        
		constructor(name) {
			
			this._subscribe();
			
			this._setupButtonLayout();
			this._setupInstructionLayout();				
			
		}	
		
        /*
         *  name:           getIActive
         *  description:    get the active state of the instuructions
         *  params:     	null
         *  return:         this._iActive      
         */
        public getIActive() {
            return this._iActive;    
        }
        
		/*
		 *	name: 			_instructionSubscribe
		 *	description:	
		 *	parmas:			null
		 *	returns:		null
		 */
		private _subscribe() {
			
			IWG.IWGEM.on( "showInstructions", this._showInstructions.bind(this) );
			IWG.IWGEM.on( "hideInstructions", this._hideInstructions.bind(this) );
			IWG.IWGEM.on( "setInstructions", this._setInstructions.bind(this) );
			IWG.IWGEM.on( "checkI", this._checkIActive.bind(this) );
			IWG.IWGEM.on( "instructionPaneUp", this._pauseGame.bind(this) );
			IWG.IWGEM.on( "instructionPaneDown", this._resumeGame.bind(this) );
			
		}
		
		/*
		 *	name: 			_unsubscribe
		 *	description:	
		 *	parmas:			null
		 *	returns:		null
		 */
		private _unsubscribe() {
			
			IWG.IWGEM.on( "showInstructions" );
			IWG.IWGEM.on( "hideInstructions" );
            IWG.IWGEM.on( "checkI" );
			IWG.IWGEM.on( "setInstructions" );
			
		}
		
		/*
		 *	name: 			_setupLayout
		 *	description:	setup layout for instruction button
		 *	parmas:			null
		 *	returns:		null
		 */
		private _setupButtonLayout() {
			var instructionButton = new CLICKABLEGAMEOBJECT("instructionButton", { w: 54, h: 54});
			this._children.push(instructionButton);
			
			instructionButton.addBitmap({
				name: "instructionButton",
		        pos: {
		            x: 27,
		            y: 27
		        },
		        frame: "button_info",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
		        doReg: {
		            center: true
		        },
				scale: 1
			});
			instructionButton.setPosition({
				x: 855,
				y: 525
			});
			
			instructionButton.setEnabled(true);
			instructionButton.setAction('click', () => {
				createjs.Sound.play('iButton')
				IWG.IWGEM.trigger("showInstructions");
				IWG.IWGEM.trigger("showOverlay");
				
			});
			
		} // end _setupLayout
		
		
		/*
		 *	name: 			_setupInstructionLayout
		 *	description:	setup layout for instructions
		 *	parmas:			null
		 *	returns:		null
		 */
		private _setupInstructionLayout() {
			
			var instructionPane = new CLICKABLEGAMEOBJECT("instructions", { w: 655, h: 240}, 10);
			this._children.push(instructionPane);
			
			instructionPane.addBitmap({
				name: "instructionPane",
		        pos: {
		            x: 318,
		            y: 20
		        },
		        frame: "instructions" + GLOBAL.getInstance().getFromGlobal('method'),
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
		        doReg: {
		            custom: {
						x: 318,
						y: 0
					}
		        }
			});
			
			instructionPane.addBitmap({
				name: "buttonClose",
		        pos: {
		            x: 630,
		            y: 20
		        },
		        frame: "button_close",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
		        doReg: {
		            center: true
		        }
			});
			
			
			instructionPane.setPosition({
				x: 170,
				y: 200
			});
			
			instructionPane.setAlpha(0);
			instructionPane.setScale(0,0);
			
			instructionPane.setEnabled(false);
			instructionPane.setAction('click', () => {
				createjs.Sound.play('iButton')
				IWG.IWGEM.trigger("hideInstructions");
				
			});
			
			instructionPane.addAnimation( 'showPane' );
			instructionPane.setAnimation( 'showPane', 'scaleUp', 1, 0, ['instructionPaneUp'] );
			
			instructionPane.addAnimation( 'hidePane' );
			instructionPane.setAnimation( 'hidePane', 'scaleDown', 1, 0, ['instructionPaneDown'] );
			
		} // end _setupInstructionLayout
		
		/*
		 *	name: 			_setInstructions
		 *	description:	set instruction pane
		 *	parmas:			null
		 *	returns:		null
		 */
		private _setInstructions(type) {
			
			var instructions = this._children[1];
			instructions.getStage().getChildByName('instructionPane').gotoAndStop('instructions' + type);			
			
		}
		
		/*
		 *	name: 			_showInstructions
		 *	description:	show instruction pane
		 *	parmas:			null
		 *	returns:		null
		 */
		private _showInstructions() {
			
			GLOBAL.getInstance().addToGlobal('gameState', 'instruction');
						
			var button = this._children[0];
			button.setEnabled(false);
			
			var instructions = this._children[1];
			instructions.setEnabled(true);
			instructions.animate("showPane");
			IWG.IWGEM.trigger("showOverlay");
            this._iActive = true;
		}
		
		/*
		 *	name: 			_hideInstructions
		 *	description:	hide instruction pane
		 *	parmas:			null
		 *	returns:		null
		 */
		private _hideInstructions() {
			
			GLOBAL.getInstance().addToGlobal('gameState', 'splash');
			
			var button = this._children[0];
			button.setEnabled(true);
			
			var instructions = this._children[1];
			instructions.setEnabled(false);
			instructions.animate("hidePane");			
			IWG.IWGEM.trigger("hideOverlay");
            this._iActive = false;
		}
        
        /*
		 *	name: 			_checkIActive
		 *	description:	checks if the pause screen is on and if instructions are up
		 *	parmas:			null
		 *	returns:		null
		 */
        private _checkIActive() {
            var isPaused = GLOBAL.getInstance().getFromGlobal('pause').getPause();
            if (!isPaused && this._iActive === true) {
                IWG.IWGEM.trigger("pause");
            }
        }
		
		/*
		 *	name: 			_pauseGame
		 *	description:	
		 *	parmas:			null
		 *	returns:		null
		 */
		private _pauseGame() {
			
			TweenMax.pauseAll();
			
		}
		
		/*
		 *	name: 			_resumeGame
		 *	description:	destroy method
		 *	parmas:			null
		 *	returns:		null
		 */
		private _resumeGame() {
			
			TweenMax.resumeAll();
			
		}
		
		/*
		 *	name: 			destroy
		 *	description:	destroy method
		 *	parmas:			null
		 *	returns:		null
		 */
		public destroy() {
			
			this._unsubscribe();
			
		}
	}
}