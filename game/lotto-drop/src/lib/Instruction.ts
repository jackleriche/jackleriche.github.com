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
	
		constructor(name) {
			
			this._subscribe();
			
			this._setupButtonLayout();
			this._setupInstructionLayout();				
			
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
		        frame: "icon_info",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop") ,
		        doReg: {
		            center: true
		        },
				scale: 1
			});
			instructionButton.setPosition({
				x: 180,
				y: 515
			});
			
			instructionButton.setEnabled(true);
			instructionButton.setAction('click', () => {
                createjs.Sound.play("instructionButton");
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
			
			var instructionPane = new CLICKABLEGAMEOBJECT("instructions", { w: 310, h: 360}, 10);
			this._children.push(instructionPane);
			
			instructionPane.addBitmap({
				name: "instructionPane",
		        pos: {
		            x: 147,
		            y: 195
		        },
		        frame: "instructions",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop") ,
		        doReg: {
		            center: true
		        }
			});
            instructionPane.addBitmap({
				name: "instructionClose",
		        pos: {
		            x: 290,
		            y: 35
		        },
		        frame: "button_close",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop") ,
		        doReg: {
		            center: true
		        }
			});
			instructionPane.setPosition({
				x: 40,
				y: 160
			});
			
			instructionPane.setAlpha(0);
			instructionPane.setScale(0,0);
			
			instructionPane.setEnabled(false);
			instructionPane.setAction('click', () => {
				createjs.Sound.play('instructionButton')
				IWG.IWGEM.trigger("hideInstructions");
				
			});
			
			instructionPane.addAnimation('showPane');
			instructionPane.setAnimation('showPane', 'scaleUp');
			
			instructionPane.addAnimation('hidePane');
			instructionPane.setAnimation('hidePane', 'scaleDown');
			
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
						
			var button = this._children[0];
			button.setEnabled(false);
			
			var instructions = this._children[1];
			instructions.setEnabled(true);
			instructions.animate("showPane");
			IWG.IWGEM.trigger("showOverlay");
		}
		
		/*
		 *	name: 			_hideInstructions
		 *	description:	hide instruction pane
		 *	parmas:			null
		 *	returns:		null
		 */
		private _hideInstructions() {
			
			var button = this._children[0];
			button.setEnabled(true);
			
			var instructions = this._children[1];
			instructions.setEnabled(false);
			instructions.animate("hidePane");			
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