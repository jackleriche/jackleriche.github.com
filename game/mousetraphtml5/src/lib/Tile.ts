/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {
    var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg,
        GAMEOBJECT = IWG.GameObject,
        ANIMATION = IWG.Animation,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject,
        SPRITESHEETS = IWG.SpriteSheets,
        images = CORE.iwgLoadQ.images;

    export class Tile extends GameObject {

        constructor(_name: string, private _tokenNumber: number, private _tokenName: string, private _frameName: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 1) {
            super(_name, _dimensions, _zindex);
            this._subscribeTile();
        }

        public get tokenNumber(): number {
            return this._tokenNumber;
        }
        public set tokenNumber(newToken: number) {
            this._tokenNumber = newToken;
        }

        public get tokenName(): string {
            return this._tokenName;
        }
        public set tokenName(tokenName: string) {
            this._tokenName = tokenName;
        }
        
        public get frameName(): string {
            return this._frameName;
        }
        public set frameName(frameName: string) {
            this._frameName = frameName;
        }

        public reveal() {
            super.reveal();
        }

        private _subscribeTile() {

        }
        private _unsubscribeTile() {

        }

        /*
         *  name:           createTile
         *  description:    creates a tile and adds the collected animation to it
         *  params:     	spriteSheet: any
         *  return:         void      
         */	
        public createTile(spriteSheet: any):void {

            var iconX = 50,
                iconY = 50,
                iconSpriteSheet = spriteSheet;
            
            switch (this.tokenNumber) {
                case 6:
                    iconSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("looper");
                    this.addAnimation('bonusLanded');
                    this.setAnimation("bonusLanded", "tile_bonus_reveal", 2, 1);
                    iconX = 115;
                    iconY = 80;
                    break;
                case 7:
                    iconSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("boot");
                    this.addAnimation('bonusLanded');
                    this.setAnimation("bonusLanded", "tile_bonus_reveal", 2, 1);
                    iconX = 77;
                    iconY = 77;
                    break;
                case 8:	
                    // popup move
                    iconSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("cat");
                    this.addAnimation('bonusLanded');
                    this.setAnimation("bonusLanded", "tile_bonus_reveal", 2, 1);
                    iconX = 110;
                    iconY = 110;
                    break;
                case 10:
                case 11:
                case 12:
                    //"IW";
                    this.setAnimation("winReveal", "tile_IW_winReveal", 0.5, 0.5);  
                    break;
            } 
           
            this.addBitmap({
                name: "icon",
                pos: { x: iconX, y: iconY },
                spriteSheet: iconSpriteSheet,
                frame: this._frameName,
                scale: 1,
                doReg: { center: true }
            });
            
            this.addBitmap({
                name: 'collected',
                pos: { x: 50, y: 0 },
                spriteSheet: spriteSheet,
                frame: "collected",
                scale: 1,
                alpha: 0.001,
                doReg: { center: true }
            });
            
            this.addAnimation("collected");
            this.setAnimation("collected", "collectedReveal", 0.25, 0.25);
            

        }
        
        /*
         *  name:           createSwitchTile
         *  description:    creates the switch tile and adds the flashing directional arrow animation to it
         *  params:     	spriteSheet: any
         *  return:         void      
         */	
        public createSwitchTile(spriteSheet: any) {
            this.addBitmap({
                name: 'arrowTop',
                pos: { x: 50, y: 28 },
                spriteSheet: spriteSheet,
                frame: "arrow",
                scale: 1,
                rotation: -15,
                alpha: 0.001,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'arrowBottom',
                pos: { x: 25, y: 55 },
                spriteSheet: spriteSheet,
                frame: "arrow",
                scale: 1,
                rotation: -100,
                alpha: 0.001,
                doReg: { center: true }
            });
            this.addBitmap({
                name: 'questionmark',
                pos: { x: 55, y: 55 },
                spriteSheet: spriteSheet,
                frame: "questionmark",
                scale: 1,
                doReg: { center: true }
            });

            this.active = true;
            this.addAnimation("arrowSwitch")
            this.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5,["start"]);
            this.animate("arrowSwitch");
        }

        public destroy() {
            console.log('destroying Tile');
            this._unsubscribeTile();
            super.destroy();
        }

    }
}