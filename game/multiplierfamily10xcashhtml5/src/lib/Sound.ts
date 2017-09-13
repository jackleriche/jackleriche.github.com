/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {

	var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
		GLOBAL = IWG.Global,
		SPRITESHEETS = IWG.SpriteSheets,
        images = CORE.iwgLoadQ.images;

	export class Sound extends ClickableGameObject {
		
		private _sound: boolean = true;														// sound needed its own flag for if is active or not

        constructor() {

			super("sound", { x: 50, y: 50 }, 6);
			this._extendSubscribe();

			this._init();
 
        } 

		private _extendSubscribe() {
			IWG.IWGEM.on("soundShow", this._soundShow.bind(this));
            IWG.IWGEM.on("soundHide", this._soundHide.bind(this));
            IWG.IWGEM.on("soundOn",   this._soundOn.bind(this));
            IWG.IWGEM.on("soundOff",  this._soundOff.bind(this));
		}
		private _extendUnsubscribe() {
			IWG.IWGEM.off("soundShow");
            IWG.IWGEM.off("soundHide");
            IWG.IWGEM.off("soundOn");
            IWG.IWGEM.off("soundOff");
		}
		
		/*
         *  name:           _init
         *  description:    sets up the sound button bitmap and clickable methods 
         *  params:     	null
         *  return:         null      
         */
		private _init() {
			
			GLOBAL.getInstance().addToGlobal("sound", this)

			this.addBitmap({
				name: "sound",
				pos: {
					x: 25,
					y: 25
				},
				frame: "sound",
				spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
				doReg: {
					center: true
				}
			});
			
			var hitbox = new createjs.Shape();
 				hitbox.graphics.beginFill("#000").drawRect(0, 0, 100, 100);
				hitbox.alpha = 0.01;
			this.getStage().addChild(hitbox);
			this.getStage().update();
			

			this.setAction("click", () => {
				this.soundButtonHandle();
			});
			
			this.setEnabled(true);

		}
		
		/*
         *  name:           _soundShow
         *  description:    sound button logic, 
         *  params:     	null
         *  return:         null      
         */
		public soundButtonHandle() {
			
			if (this._sound) {
				IWG.IWGEM.trigger('soundOff');
			} else {
				IWG.IWGEM.trigger('soundOn');
			};

		}
		
		/*
         *  name:           _soundShow
         *  description:    makes the stage visible
         *  params:     	null
         *  return:         null      
         */
		private _soundShow() {

			this.getStage().visible = true;

		}
		
		/*
         *  name:           _soundHide
         *  description:    makes the stage invisible
         *  params:     	null
         *  return:         null      
         */
		private _soundHide() {
			
			this.getStage().visible = false;
			this.getBitmap('sound').alpha = 0;
			
			this.getStage().update();
			
		}

		/*
         *  name:           _soundOn
         *  description:    un-mutes the sound from createjs side, changes sound boolean to true and changes the bitmap   
         *  params:     	null
         *  return:         null      
         */
		private _soundOn() {

			this._sound = true;
			createjs.Sound.setMute(false);
			this.getBitmap('sound').gotoAndStop('sound');
			this.getStage().update();

		}

		/*
         *  name:           _soundOff
         *  description:    mutes the sound from createjs side, changes sound boolean to false and changes the bitmap      
         *  params:     	null
         *  return:         null      
         */
		private _soundOff() {

			this._sound = false;
			createjs.Sound.setMute(true);
            this.getBitmap('sound').gotoAndStop('sound_off');
			this.getStage().update();

		}
		
		/*
		 *	name: 			getSoundActive()
		 *	description:	returns if sounds are currently active in the game
		 *	params:			null
		 *	returns: 		this._sound: boolean
		 */
		 public getSoundActive() {
			 
			 return this._sound;
			 
		 }
	}
}