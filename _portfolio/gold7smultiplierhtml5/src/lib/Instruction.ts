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
			IWG.IWGEM.on( "mainGameIntro", this._showButton.bind(this))
			IWG.IWGEM.on( "showInstructions", this._showInstructions.bind(this) );
			IWG.IWGEM.on( "hideInstructions", this._hideInstructions.bind(this) );
			IWG.IWGEM.on( "hideInstructionButton", this._hideButton.bind(this) );
			
		}
		
		/*
		 *	name: 			_unsubscribe
		 *	description:	
		 *	parmas:			null
		 *	returns:		null
		 */
		private _unsubscribe() {
			
			IWG.IWGEM.off( "mainGameIntro" );
			IWG.IWGEM.off( "showInstructions" );
			IWG.IWGEM.off( "hideInstructions" );
			IWG.IWGEM.off( "hideInstructionButton" );
			
		}
		
		/*
		 *	name: 			_setupLayout
		 *	description:	setup layout for instruction button
		 *	parmas:			null
		 *	returns:		null
		 */
		private _setupButtonLayout() {
						
			var instructionButton = new CLICKABLEGAMEOBJECT("instructionButton", { w: 54, h: 54}, 10);
			this._children.push(instructionButton);
			
			instructionButton.addBitmap({
				name: "instructionButton",
		        pos: {
		            x: 27,
		            y: 27
		        },
		        frame: "icon_info",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier") ,
		        doReg: {
		            center: true
		        },
				scale: 1
			});
			instructionButton.setPosition({
				x: 855,
				y: 500
			});
			instructionButton.setAlpha(0);
			
			instructionButton.addAnimation('buttonFadeIn')
			instructionButton.setAnimation('buttonFadeIn', 'fadeIn')
			
			instructionButton.setEnabled(false);
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
			
			var instructionPane = new CLICKABLEGAMEOBJECT("instructions", { w: 455, h: 175}, 10);
			this._children.push(instructionPane);
			
			var instructionBackground = new createjs.Shape();
			instructionBackground.graphics.beginFill("#000").drawRect(0, 0, 455, 175);
			instructionBackground.alpha = 0.8;
			instructionPane.getStage().addChild(instructionBackground);
			instructionPane.getStage().update();
			
			instructionPane.addBitmap({
				name: "instructionsText",
		        pos: {
		            x: 228,
		            y: 88
		        },
		        frame: "splash_instructions",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier") ,
		        doReg: {
		            center: true
		        }
			});
			
			/*instructionPane.addBitmap({
				name: "buttonClose",
		        pos: {
		            x: 630,
		            y: 20
		        },
		        frame: "button_close",
		        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier") ,
		        doReg: {
		            center: true
		        }
			});*/
			
			
			instructionPane.setPosition({
				x: 250,
				y: 200
			});
			
			instructionPane.setAlpha(0);
			instructionPane.setScale(0,0);
			
			instructionPane.setEnabled(false);
			instructionPane.setAction('click', () => {
				createjs.Sound.play('iButton')
				IWG.IWGEM.trigger("hideInstructions");
				
			});
			
			instructionPane.addAnimation('showPane');
			instructionPane.setAnimation('showPane', 'scaleUp');
			
			instructionPane.addAnimation('hidePane');
			instructionPane.setAnimation('hidePane', 'scaleDown');
			
		} // end _setupInstructionLayout
		
		/*
		 *	name: 			_showButton
		 *	description:	show instruction button
		 *	parmas:			null
		 *	returns:		null
		 */
		private _showButton():void {
			var button = this._children[0];
            button.setEnabled(true)
			button.animate('buttonFadeIn')
		}
        
        /*
		 *	name: 			_showButton
		 *	description:	show instruction button
		 *	parmas:			null
		 *	returns:		null
		 */
		private _hideButton():void {
			var button = this._children[0],
                bitmap = button.getBitmap('instructionButton')
            
            button.active = true;
            button.setEnabled(false)
            TweenMax.to(bitmap, 0.5, {alpha:0})
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
			IWG.IWGEM.trigger("hideOverlay");
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