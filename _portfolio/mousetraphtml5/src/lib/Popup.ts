/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        ANIMATION = IWG.Animation,
        SPRITESHEETS = IWG.SpriteSheets,
        images = CORE.iwgLoadQ.images;

    export class Popup extends GameObject{
    	
        private _rollNumber:number = 0;
        private _symbolNumber:number = 0;
        private _popupMessageProperties:any = {};
        private _popupDisplayed:boolean = false;
        
        constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 20) {
            super(_name, _dimensions, _zindex);
            this._subscribePopup();
        }
        private _subscribePopup() {
            IWG.IWGEM.on('popupLanded', this.popupOn.bind(this));
            IWG.IWGEM.on('popupOpened', this.popupOff.bind(this));
        }
        private _unsubscribePopup() {
    	    IWG.IWGEM.off('popupLanded');
            IWG.IWGEM.off('popupOpened');
        }
        
        
        public createPopup():void {
            
           var spriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
                                  
          this.addBitmap({
                name: "popupBackground",
                pos: { x: 0, y: 0 },
                spriteSheet: spriteSheet,
                frame: "bg_popup",
                scale: 1,
                doReg: { center: false }
            });
             this.addBitmap({
                name: "popupMessage",
                pos: { x: 150, y: 75 },
                spriteSheet: spriteSheet,
                frame: "pop_movedforward",
                scale: 1,
                doReg: { center: true }
            });
             this.addBitmap({
                name: "popupSymbol",
                pos: { x: 115, y: 50 },
                spriteSheet: spriteSheet,
                frame: "symbol_boot",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: "popupNumber",
                pos: { x: 115, y: 122 },
                spriteSheet: spriteSheet,
                frame: "roll_0",
                scale: 1,
                doReg: { center: true }
            });
            this.addBitmap({
                name: "popupSpaces",
                pos: { x: 180, y: 125 },
                spriteSheet: spriteSheet,
                frame: "pop_spaces",
                scale: 1,
                doReg: { center: true }
            });
            
            this.addAnimation("showPopup")
            this.setAnimation("showPopup", "show_popup", 0.65, 0);
            this.addAnimation("hidePopup")
            this.setAnimation("hidePopup", "hide_popup", 0.5, 2.5);
            
        }
        
        // get teh roll umber
        public get rollNumber():number {
            return this._rollNumber;
        }
        
        public get symbol():number {
            return this._symbolNumber;
        }
        
        // bring on teh popup
        public popupOn ():void {
            if(!this._popupDisplayed) {
                this.active = true;
                this.animate("showPopup");
                this._popupDisplayed = true;
            }
            
        }
        // send it off
        public popupOff ():void {
            if(this._popupDisplayed) {
                this.animate("hidePopup");
                this._popupDisplayed = false;
            }
        }
        
        private symbolLookup():any {
            var symbolName:string;
            
            switch(this._symbolNumber) {
                case 6:
                    this._popupMessageProperties = {
                        symbolName: "slide",
                        frameName: "pop_flungforward",
                        posMessage: { x: 150, y: 75 },
                        posIcon: { x: 115, y: 50 }
                    } 
                break;
                case 7:
                    this._popupMessageProperties = {
                            symbolName: "boot",
                            frameName: "pop_kickbak",
                            posMessage: { x: 160, y: 75 },
                            posIcon: { x: 120, y: 50 }
                    }
                break;
                case 8:
                    this._popupMessageProperties = {
                            symbolName: "cat",
                            frameName: "pop_movedforward",
                            posMessage: { x: 160, y: 75 },
                            posIcon: { x: 115, y: 40 }
                     };
                break;
                
                default:
                this._popupMessageProperties = {
                        symbolName: "error",
                    } 

            }
            
            return this._popupMessageProperties;
        }
        
        // update the messge (forward backwards , kicked ) , can be tied to the symbol set
        public updateMessage(symbolNumber:number, rollNumber:number):void {
            this._symbolNumber = symbolNumber;
            this._rollNumber = rollNumber;
            
            var popupSymbolClip:createjs.Sprite     = this.getBitmap('popupSymbol');
            var popupNumberClip:createjs.Sprite     = this.getBitmap('popupNumber');
            var popupMessageClip:createjs.Sprite    = this.getBitmap('popupMessage');
            var popupSpacesClip:createjs.Sprite     = this.getBitmap('popupSpaces');
            
            if (rollNumber === 1){
                popupSpacesClip.gotoAndStop("pop_space")
            } else {
                popupSpacesClip.gotoAndStop("pop_spaces")
            }
            
        	var messageProperty = this.symbolLookup();
            popupSymbolClip.gotoAndStop("symbol_" + messageProperty.symbolName);
            popupSymbolClip.x = messageProperty.posIcon.x;
            popupSymbolClip.y = messageProperty.posIcon.y;
            
            popupNumberClip.gotoAndStop("roll_"+  this._rollNumber);
            popupMessageClip.gotoAndStop(messageProperty.frameName);
            popupMessageClip.x = messageProperty.posMessage.x;
            popupMessageClip.y = messageProperty.posMessage.y;
            
            TweenMax.delayedCall(100, function() {
              this.getStage().update(); 
              
            }, null, this, true);
        }
        
         public destroy() {
            console.log('destroying Popup');
            super.destroy();
            this._unsubscribePopup();
        }
        
        

    }
}