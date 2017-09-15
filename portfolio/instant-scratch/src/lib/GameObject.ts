/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {

    var CAMELOT: any    = com.camelot,
        CORE            = CAMELOT.core,
        IWG             = CAMELOT.iwg,
        LIB             = IWG.lib,
        GAMEOBJECTS     = IWG.gameObjects,
        ANIMATION       = IWG.Animation,
        images          = CORE.iwgLoadQ.images,
        HELPER          = IWG.Helper;

    interface bitmapConfig {

        name: string,
        pos: {
            x: number;
            y: number;
        },
        frame: any,
        spriteSheet?: createjs.SpriteSheet
        alpha?: number,
        doReg?: {
            custom?: {
                x: number,
                y: number,
            },
            center?: boolean
        }, 
        scale?: any,
        rotation?: number,
        ticketLabel?: any,
        filter?: createjs.Filter,
        parent?: any
        
    };

    export class GameObject {

        private _canvas: any;
        private _stage: createjs.Stage;

        private _state: string = "start";
        private _animation: any = {
            reveal: null,
            winReveal: null,
            reminder: null
        };
        private _revealAnimation: any       = null;
        private _revealed: boolean          = false;
        private _winRevealAnimation: any    = null;
        private _winRevealed: boolean       = false;
        private _ticketLabel: any           = null;
        private _prizeValue                 = 0;
        private _enabled: boolean           = false;
        private _clicked: boolean           = false;
        private _visible: boolean           = false;
        private _rotation: number           = 0;
        private _position: any              = {
            x: 0,
            y: 0
        };
        
        public active: boolean              = false;
        public scale: number                = 1;
        public alpha: number                = 1;
        
        public animationTimeLine            = null;

        constructor(private _name: string, private _dimensions: any = { w: 0, h: 0 }, private _zindex: number = 1, private _parent: any = "scaleDiv") {

            // check if name is already being used
            var array   = IWG.gameObjectsArray;
            var boom    = HELPER.checkHasDuplicates( array, this, "_name" );
            
            if ( boom === true ) {
                console.warn( ' --- GameObject has Duplicate --- ');    
            }

            // setup parent
            if ( this._parent !== "scaleDiv" ){
                // add gameObject into scene
                this._parent.addChild(this);
                // change _parent to use the name rather then the sceneObject
                this._parent = this._parent.getName();
            };

            this._setupStage();
            this._subscribe();
            
            this.initComplete();
            
            IWG.gameObjectsArray.push(this);

        }
        
        /*
         *  name:           getName
         *  description:    get the name of the gameObject by x and y
         *  return:         name      
         */
        public getName(): any {
            return this._name;
        }
        
        /*
         *  name:           getEnabled
         *  description:    get the enabled of the gameObject by x and y
         *  return:         position      
         */
        public getEnabled(): any {
            return this._enabled;
        }
        /*
         *  name:           setEnabled
         *  description:    set the enabled of the gameObject
         *  params:         enabled: boolean
         *  return:         null      
         */
        public setEnabled( bool:boolean ): void {
            this._enabled = bool;
            if (bool){
                this.addClass("cursor");    
            } else {
                this.removeClass('cursor');
            }
            
        }
        /*
         *  name:           getTicketLabel
         *  description:    retrieve ticketLabel from gameObject
         *  return:         position      
         */
        public getTicketLabel(): any { 
            return this._ticketLabel;
        }
        /*
         *  name:           getTicketLabel
         *  description:    retrieve ticketLabel from gameObject
         *  return:         position      
         */
        public setTicketLabel(ticketLabel: number): any {
            this._ticketLabel = ticketLabel;
        }
        
        /*
         *  name:           setAlpha
         *  description:    sets alpha of gameObject
         *  return:         position      
         */
        public setAlpha(alpha: number): any {
            this.alpha = alpha;
            TweenMax.set(this._canvas, { alpha: this.alpha });
        }
        
        /*
         *  name:           setRotation
         *  description:    sets rotation of gameObject
         *  return:         position      
         */
        public setRotation(degree: number): any {
            this._rotation = degree;
            TweenMax.set(this._canvas, { rotation: this._rotation });
        }
        
        /*
         *  name:           getRevealed
         *  description:    sets alpha of gameObject
         *  return:         position      
         */
        public getRevealed(): boolean  {
            return this._revealed;            
        }
        
        /*
         *  name:           getWinRevealed
         *  description:    sets alpha of gameObject
         *  return:         boolean      
         */
        public getWinRevealed(): boolean  {
            return this._winRevealed;            
        }
        
        /*
         *  name:           getAnimation
         *  description:    returns animation 
         *  params:         key: string
         *  return:         animation: Tween/Timeline      
         */
        public getAnimation( key?: string ): any  {
            
            if ( !key ) {
                return this._animation
            } else {
                if ( this._animation.hasOwnProperty(key) ) {           
                    return this._animation[key];                
                }   
            };

        }
        
        
        /*
         *  name:           _setupStage
         *  description:    sets up the canvas and stage parameters of the gameObject
         *  params:     	null
         *  return:         null      
         */
        private _setupStage() {
            
            CORE.IWG.ame('canvasStack', {
                create: this._name,
                w: this._dimensions.w,
                h: this._dimensions.h,
                z: this._zindex,
                parentDiv: this._parent
            });

            this._canvas = document.getElementById(this._name);
            this._stage = new createjs.Stage(this._canvas);

        }
        
        /*
         *  name:           _update
         *  description:    called on every update event (every frame), if gameObject is set to active it means that the
         *                  gameObject is ready for animation, this reduces cpu activity as each gameObject is only drawn
                            when needed
         *  params:     	null
         *  return:         null      
         */
        private _update() {
            if (this.active) {
                this._stage.update();
            };
        };

        /*
         *  name:           _subscribe
         *  description:    adds event listeners to the gameObject
         *  params:     	null
         *  return:         null      
         */
        private _subscribe() {
            IWG.IWGEM.on('update', this._update.bind(this));
        }
        
        /*
         *  name:           _unsubscribe
         *  description:    removes all event listeners attached to the gameObject
         *  params:     	null
         *  return:         null      
         */
        private _unsubscribe() {
            IWG.IWGEM.off('update');
        }
        
    	/*
         *  name:           initComplete
         *  description:    called on init complete
         *  params:     	null
         *  return:         null      
         */
        public initComplete() {
            
        };
        
        /*
         *  name:           setPosition
         *  description:    set the position of the gameObject by x and y
         *  params:     	pos: Object
         *  return:         null      
         */
        public setPosition(pos: any, move: boolean = true): void {

            if (pos.x) {
                this._position.x = pos.x;
            };
            if (pos.y) {
                this._position.y = pos.y;
            };

            if (move) {
                TweenMax.set(this._canvas, { x: pos.x, y: pos.y });
            }

        }
        
        /*
         *  name:           setScale
         *  description:    set the scale of the gameObject by x and y
         *  params:     	scaleX:number , scaleY:number
         *  return:         null      
         */
        public setScale(scaleX:number , scaleY:number): void {
            TweenMax.set(this._canvas, { scaleX: scaleX, scaleY: scaleY });
        }
        
        /*
         *  name:           setDimensions
         *  description:    set the gameObjects dimensions
         *  params:     	dimensions: Object
         *  return:         null      
         */
        public setDimensions(dimensions: any): void {

            if (dimensions.w) {
                this._dimensions.w = dimensions.w;
            };

            if (dimensions.h) {
                this._dimensions.h = dimensions.h;
            };

            this._canvas.width = this._dimensions.w;
            this._canvas.height = this._dimensions.h;

        };
        
        /*
         *  name:           getDimensions
         *  description:    get the gameObjects dimensions
         *  params:     	null
         *  return:         null      
         */
        public getDimensions(): void {       
            return this._dimensions;
        };
        
        /*
         *  name:           setZindex
         *  description:    set the gameObjects zindex
         *  params:     	index:number
         *  return:         null      
         */
        public setZindex(index: number): void {

            this._zindex = index;
            this._canvas.style.zIndex = this._zindex;

        };
        
        /*
         *  name:           setPrizeValue
         *  description:    set the prizeValue of the gameObject
         *  params:         prizeValue: number
         *  return:         null      
         */
        public setPrizeValue( prizeValue:number ): void {
            this._prizeValue = prizeValue;
        }     
        
        /*
         *  name:           getPosition
         *  description:    get the position of the gameObject by x and y
         *  return:         position      
         */
        public getPosition(): any {
            return this._position;
        }

        /*
         *  name:           getCanvas
         *  description:    get canva of the gameObject
         *  return:         canvas: HTMLelement      
         */
        public getCanvas(): any {
            return this._canvas;
        }
        
        /*
         *  name:       getStage
         *  descript:   retrieve stage from gameObject
         *  params:     null
         *  return:     stage: createjs.Stage()
         */
        public getStage(): any {
            return this._stage;
        };
        

        /*
         *  name:           getPrizeValue
         *  description:    get the prizeValue of the gameObject
         *  return:         prizeValue: number      
         */
        public getPrizeValue(): number {
            return this._prizeValue;
        }
        
        /*
         *  name:       addBitmap
         *  descript:   add bitmap to gameObject Stage
         *  params:     bitmapConfig: interface
         *  return:     null
         */
        public addBitmap(config: bitmapConfig): void {

            var bitmap: any;

            if (!config.spriteSheet) {
                bitmap = new createjs.Bitmap(config.frame);
            } else {
                bitmap = new createjs.Sprite(config.spriteSheet);
                bitmap.gotoAndStop(config.frame);
            }

            bitmap.x = config.pos.x;
            bitmap.y = config.pos.y;
            bitmap.name = config.name;
            
            // set regX/regY
            if (config.doReg) {
                if (config.doReg.custom) {
                    bitmap.regX = config.doReg.custom.x;
                    bitmap.regY = config.doReg.custom.y;
                } else {
                    var bounds = bitmap.getBounds();
                    if (config.doReg.center) {
                        bitmap.regX = bounds.width / 2;
                        bitmap.regY = bounds.height / 2;
                    } else {
                       bitmap.regX = 0;
                       bitmap.regY = 0; 
                    };
                };
            };
            
            // set alpha
            if (config.alpha !== undefined) {
                if (config.alpha === 0) {
                    this._visible = false;
                };
                bitmap.alpha = config.alpha;
            };
            
            // set scale
            if (config.scale) {
                if ( config.scale.x ){
                    bitmap.scaleX = config.scale.x;  
                }
                if ( config.scale.y ){
                    bitmap.scaleY = config.scale.y;  
                }
            };
            
            // set rotation
            if (config.rotation) {
                bitmap.rotation = config.rotation;
            };
            
            // set filter
            if (config.filter) {
                bitmap.filters = [ config.filter];  
                bitmap.cache(0, 0, bounds.width, bounds.height);
            };

            this._stage.addChild(bitmap);
            // delay the stage update
            TweenMax.delayedCall(10, function() {
                this._stage.update(); 
            }, null, this, true);
            
        };
        
        /*
         *  name:       getBitmap
         *  descript:   retrieve bitmap from gameObject Stage
         *  params:     name: string
         *  return:     bitmap
         */
        public getBitmap(name: string): any {
            return this._stage.getChildByName(name);
        };
        
        /*
         *  name:           addAnimation
         *  description:    add animation type to the gameObjects _aniimation property
         *  params:         name: string
         *  return:         null
         */
        public addAnimation(animationName: string): void {
         
            // check to make sure the animation name doesnt already exist
            if (!this._animation.hasOwnProperty(animationName)) {
                this._animation[animationName] = null;
            } else {
                console.warn('animation already in _animation object');
            };

        };
            
        /*
         *  name:           setAnimation
         *  description:    set Animations on GameObject
         *  params:     	animationTpe: string, anim: function, time: number, delay: number
         *  return:         null      
         */
        public setAnimation(animationType: string, anim: any, time: number, delay: number, customParams?: any): void {
            
            // see if anim is in ANIMATION
            try {
                if (this._animation.hasOwnProperty(animationType)) {
                    this._animation[animationType] = ANIMATION.getInstance().animations[anim](this, time, delay, customParams);
                }
            } catch (err) {
                console.warn('animation cannot be found in class ANIMATION');
                console.warn(err);
            };

        };
        
        /*
         *  name:           reveal
         *  description:    to set the gameObject to revealing and automatically call the reveal animation
         *  params:     	null
         *  return:         null      
         */
        public reveal(): void {
            this._revealed  = true;
            this._enabled   = false;
            IWG.IWGEM.trigger('restartReminder');
            this.active     = true;
            
            if (this._animation.reveal) {
                this._animation.reveal();
            };
        };
        
        /*
         *  name:           winReveal
         *  description:    to set the gameObject to winRevealed and automatically call the winReveal animation
         *  params:     	null
         *  return:         null      
         */
        public winReveal(): void {
            this._winRevealed = true;
            if (this._animation.winReveal) {
                this._animation.winReveal();
            };
        };
        
        /*
         *  name:           animate
         *  description:    play a custom animation that has been added to the gameObject
         *  params:     	customAnimationName:string, params: array
         *  return:         null      
         */
        public animate(customAnimationName, params?: any ):void {
            if ( this._animation[customAnimationName]) {
                this._animation[customAnimationName](params)
            }            
        };
        
        /**
         *  name:           killAnimation();
         *  description:    remove an animation from a gameobject
         *  params:         name: string
         *  returns:        boolean
         */
        public killAnimation(name: string): boolean {
          
            //this._animation[name].kill();
            this._animation[name] = null;            
            
            console.log(this._animation);
            return false;
            
        };
        
        /*
         *  name:           _addClass()
         *  description:    add a class to the canvas
         *  params:         name: string
         *  returns:        null
         */
        public addClass(name: string): void {

            var el = this.getCanvas();

            if ( el.classList) {
                el.classList.add(name)
            } else if (!this.hasClass(name) ) {
                el.className += " " + name
            }
            
        }
        
        /*
         *  name:           hasClass()
         *  description:    add a class to the canvas
         *  params:         name: string
         *  returns:        null
         */
        public hasClass(className) : void {
            
            var el = this.getCanvas();
            
            if (el.classList){
                return el.classList.contains(className)
            } else {
                return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))   
            }
                         
        }
        
        public removeClass(className) {
            
            var el = this.getCanvas();
            
            if (el.classList) {
                el.classList.remove(className)
            } else if (this.hasClass(className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
                el.className=el.className.replace(reg, ' ')
            }
            
        }
        
        /*
         *  name:           destroy
         *  description:    destroy gameObject by unsubscribing all assosiating event listeners, removing the canvas from the dom hierarchy, then
         *                  deleting the gameObject refence from the gameObjectsArray, before deleting the object itself 
         *  params:     	null
         *  return:         null      
         */
        public destroy(): void {
            
            this._unsubscribe();
            CORE.IWG.ame('canvasStack', {kill: this._name});
            // get gameObject from gameObjectsArray and delete
            for ( var i = 0; i < IWG.gameObjectsArray.length; i++){
                if (this._name === IWG.gameObjectsArray[i]._name) {
                    IWG.gameObjectsArray.splice(IWG.gameObjectsArray.indexOf(i), 1);
                   // delete this;
                }
            }
        }
        

         
    }
};