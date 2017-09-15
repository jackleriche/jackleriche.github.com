/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {
    
    var CAMELOT: any        = com.camelot,
        CORE                = CAMELOT.core,
        IWG                 = CAMELOT.iwg,
        GAMEOBJECT          = IWG.GameObject,
        CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, 
        SCENE               = IWG.Scene,
        SPRITESHEETS        = IWG.SpriteSheets;
        
    /**
     * Scratch
     */
    export class Scratch extends Scene {
        
        private _isDrawing: boolean                 = false;
        private _scratchArea: ClickableGameObject   = new CLICKABLEGAMEOBJECT( 'scratchArea', { w: 508, h: 334 }, 1, this, false);
        private _wrapper: createjs.Container        = new createjs.Container();
        private _foil                               = null;
        private _art: createjs.Shape                = new createjs.Shape()
        private _color                              = createjs.Graphics.getHSL( 85, 50, 50);
        private _bitmap                             = null;
        
        private _drawing: createjs.Shape            = new createjs.Shape();
        private _lastPoint: createjs.Point          = new createjs.Point();
        
        private _amountOfPixels: number             = 0;
        private _percentageComplete: number         = 60;
        private _autoCursor                         = new createjs.Shape();
        
        private _foilPeel: boolean                  = false;
        private _movementCounter: number            = 0;    
        private _previousMouseLocation              = null;
        private _direction                          = null;  
        
        private _finished: boolean                  = false;  
        
        constructor(_name) {
            super(_name);
            this._scratchInit();
            this._scratchSubscribe();
        }
        
        private _scratchInit():void {
            
        }
        
        /**
         *  name:           _scratchSubscribe();
         *  description:    setup the class events
         *  params:         null
         *  returns:        null
         */
        private _scratchSubscribe(): void {
            this._scratchArea.getStage().on("stagemousedown", this._handleMouseDown.bind(this) );
            this._scratchArea.getStage().on('stagemousemove', this._handleMouseMove.bind(this) );
            this._scratchArea.getStage().on('stagemouseup', this._handleMouseUp.bind(this) );
            
            IWG.IWGEM.on( 'changeDirection', this._changeDirection.bind(this) );
        }
        
        /**
         *  name:           _handleMouseDown()
         *  description:    method called on a mouse down event
         *  params:         event: object
         *  return:         null
         */
        private _handleMouseDown( event ): void {
            
            if ( !this._finished ) {
                
                this._isDrawing = true;   
                
                // Store the position. We have to do this because we clear the graphics later.
                this._lastPoint.x = event.stageX - 0.001; // offset so we draw an initial dot
                this._lastPoint.y = event.stageY - 0.001;
                this._handleMouseMove(event); // draw the initial dot
                
                IWG.IWGEM.trigger('stopReminder');
                 
            }
            
        } // end _handleMouseDown;
        
        
        /**
         *  name:           _handleMouseUp()
         *  description:    method called on a mouse up event, it sets isDrawing to false, and works out the amount of pixels revealed
         *  params:         null    
         *  returns:        null
         */
        private _handleMouseUp():void {
            
            if ( !this._finished ) {
                
                this._isDrawing = false;
            
                IWG.IWGEM.trigger('startReminder');
                
                var imageData = this._scratchArea.getCanvas().getContext("2d").getImageData( 0, 0, this.getDimensions('w'), this.getDimensions('h')).data;
                
                // each pixel data takes up four indexs in the array so we count up 4 each time through loop
                var pixelsBlank = 0;
                for( var i = 0; i < imageData.length; i += 4 ) {
                    
                    if ( imageData[i+3] === 0 ){
                        // increment if the pixel is alphad out
                        pixelsBlank++;    
                    }; 
                    
                } // end for loop
                
                // gets the percentage of pixels now blank and compares it to the set percentage allowed
                if ((pixelsBlank / this._amountOfPixels) * 100 > 95 ) {
                    
                    // if its over 90 percent complete just quick reveal
                    IWG.IWGEM.trigger('scratchComplete');
                    this._finished = true;
                    this.destroy();
                
                } else if ( (pixelsBlank / this._amountOfPixels) * 100 > this._percentageComplete ) {
                    
                    // if more then percentage allowed it will fire an event
                    this._reveal();
                    this._finished = true;
                    
                }; // end if
                
                // resets the pixelsBlank to 0 for the next time mouseup event fired
                pixelsBlank = 0;
                
            }
            
        } // end _handleMouseUp 
        
        /**
         *  name:           _handleMouseMove();
         *  description:    method called when the mosue is moved, however only ever executes anything if isDrawing is true, 
         *                  which is only when the mouse has been clicked and dragged, once in, a graphic of 40pixels is applied 
         *                  where the mouse is and removes a chunk from the foil, and updates the stage
         *  params:         event: object
         *  returns:        null
         */        
        private _handleMouseMove(event):void {
            
            if ( this._isDrawing ){
                
                // set values
                // compare against current mouseLocation
                if ( this._previousMouseLocation === null ){
                    
                    this._previousMouseLocation = {
                        x: event.stageX,
                        y: event.stageY
                    }
                    
                } else {
                    
                    // right
                    if ( this._previousMouseLocation.x < event.stageX ) {
                        if ( this._direction !== "right" ) {
                            this._direction = "right";
                            IWG.IWGEM.trigger( 'changeDirection', ["right"] );
                        }                        
                    } else {
                        // only set if different 
                        if ( this._direction !== "left" ){
                            this._direction = "left"
                            IWG.IWGEM.trigger( 'changeDirection', ["left"] );
                        }
                    }
                    
                    this._previousMouseLocation = {
                        x: event.stageX,
                        y: event.stageY
                    }
                    
                }
                
                // get direction
                        
                
                // foil peel
                if ( this._foilPeel ) {
                    
                    //inc counter
                    this._movementCounter++;
                    
                    // if counter is greater then 20, we need to create a foil peel animation
                    if ( this._movementCounter > 20 ) {
                        
                        var imageData = this._scratchArea.getCanvas().getContext("2d").getImageData( event.stageX, event.stageY, 1, 1 ).data;
                        
                        // if the alpha is not 0 reset and create a foil drop
                        //if( imageData[3] != 0 ){
                            // reset the counter
                            this._movementCounter = 0;
                            this._foilDrop( event );
                            
                        //}
   
                    }
                    
                } // end if                
                
                
                this._art.graphics.ss(60, 1).s(this._color).mt(this._lastPoint.x, this._lastPoint.y).lt(event.stageX, event.stageY);

                // the composite operation is the secret sauce.
                // we'll either draw or erase what the user drew.
                this._wrapper.updateCache("destination-out");

                this._art.graphics.clear();
                this._lastPoint.x = event.stageX;
                this._lastPoint.y = event.stageY;
                this._scratchArea.getStage().update();
         
           } // end if
                           
        } // end _handleMouseMove
        
        /**
         *  name:               _reveal
         *  description:        reveal the rest of the scratch area once the user has activated mouseUp and has completed a certain
         *                      percent of the scratch area, deactivates the clickableGameObject as well so the user cannot scratch
         *                      off more during the suto reveal action
         *  params:             null
         *  returns:            null
         */
        private _reveal(): void {
            
            var timeline = new TimelineLite({
                onStart: () => {
                    this._scratchArea.active = true;
                    IWG.IWGEM.trigger('stopReminder');
                },
                paused: false,
                onUpdate: () => {
                    this._draw();
                },  
                onComplete: () => {
                    this.destroy();
                    this._scratchArea.active = false;
                    IWG.IWGEM.trigger('scratchComplete');
                }
            });    
            
            this._autoCursor.graphics.beginFill("red").drawCircle(0, 0, 200);
            this._wrapper.addChild( this._autoCursor );
                
            timeline.set( this._autoCursor, { x: -10, y: 30})   
                    .to( this._autoCursor, 0.5, { x: 60, y: -40 })
                    .to( this._autoCursor, 0.5, { x: 0, y: this.getDimensions('h') })
                    .to( this._autoCursor, 0.5, { x: 160, y: -40 })
                    .to( this._autoCursor, 0.5, { x: 100, y: this.getDimensions('h') })
                    .to( this._autoCursor, 0.5, { x: 240, y: -40 })
                    .to( this._autoCursor, 0.5, { x: 200, y: this.getDimensions('h') })
                    .to( this._autoCursor, 0.5, { x: 360, y: -40 })
                    .to( this._autoCursor, 0.5, { x: 300, y: this.getDimensions('h') })
                
            timeline.play();
                
        } // end _reveal
        
        /**
         *  name:               _draw
         *  description:        draw automated reveal
         *  params:             null
         *  returns:            null
         */
        private _draw(): void {
            
            this._autoCursor.graphics.ss(160, 1).s(this._color).mt(this._autoCursor.x, this._autoCursor.y).lt(this._autoCursor.x + 0.01, this._autoCursor.y + 0.01);
            this._wrapper.updateCache("destination-out");
            this._autoCursor.graphics.clear();
            this._scratchArea.getStage().update();
            
        } // end draw
        
        /**
         *  name:               foilDrop
         *  description:        drop foil peel with physics to imitate real scratch card
         *  params:             data: object
         *  returns:            null
         */
        private _foilDrop( data:any ): void {
            
            for ( var i = 0; i < 5; i++ ) {
                
                var hex = Helper.ColorLuminance( "#c0c0c0", Helper.getRandomNumber(-1, 1) );
                
                var circle = new createjs.Shape();
                circle.graphics.beginFill(hex).drawCircle(data.stageX, data.stageY, 10);
                circle.x = Helper.getRandomNumber( -10, 10 );
                circle.y = Helper.getRandomNumber( -10, 10 );
                this._scratchArea.getStage().addChild(circle);
                
                TweenMax.to(circle, 2, { onStart: () => {
                    this._scratchArea.active = true;
                }, alpha: 0, x: circle.x + Helper.getRandomNumber( -50, 50), y: circle.y + 100, onComplete: () => {
                    // remove from stage
                } });
                
            }
            
        } // end foilDrop
        
        /**
         *  name:               _changeDirection
         *  description:        event called when scratch direction has been changed
         *  param:              direction: string
         *  return:             null
         */
        private _changeDirection(direction: string): void {
            
            if ( direction === "left" ) {
                createjs.Sound.play('leftScratch');
            } else {
                createjs.Sound.play('rightScratch');
            }
            
        } // end _changeDirection
        
        /**
         *  name:               setFoilPeel
         *  description:        set true to show peel from foil
         *  params:             bool: boolean
         *  returns:            boolean
         */
        public setFoilPeel( bool: boolean ): boolean {
            
            if ( typeof bool === "boolean" ) {
                this._foilPeel = bool;
                return true;
            }
            return false;
            
        } // end setFoilPeel
        
        /**
         *  name:               setPercentageComplete
         *  description:        set the percentage of the scratch panel to be completed before fully revealing
         *  params:             percentage: number
         *  returns:            boolean
         */
        public setPercentageComplete( percentage: number ): boolean {
            
            if ( percentage ) {
                this._percentageComplete = percentage;
                return true;
            }
            return false;
            
        } // end setPercentageComplete()
        
        
        /**
         *  name:               setImage
         *  description:        set the image to be used for the scratch.foil
         *  params:             frame: any
         *  returns:            boolean       
         */
        public setImage( frame: string, spriteSheet:string ): boolean {
            
            if ( frame ){
                this._bitmap      = new createjs.Sprite( SPRITESHEETS.getInstance().getSpriteSheet(spriteSheet) );
                this._bitmap.gotoAndStop(frame);
                return true;
            }         
            return false;
        } // end setImage
        
        
        /**
         *  name:               setup()
         *  description:        setup the scratch class, create the image/bitmap 
         *  params:             null
         *  returns:            null
         */
        public setup(): void  {
            
           if ( ( this.getDimensions('w') > 0 ) && this.getDimensions("h") > 0 ) {
                
                this._scratchArea.getStage().addChild( this._wrapper );
                
                if ( !this._bitmap ){
                    this._foil = new createjs.Shape();
                    this._foil.graphics.f("blue").r(0, 0, this.getDimensions('w'), this.getDimensions('h') );
                    
                
                } else {
                    
                    this._foil = this._bitmap;
                    
                }
                
                this._wrapper.addChild( this._foil );
                   
                this._wrapper.cache( 0, 0, this.getDimensions('w'), this.getDimensions('h') );
                    
                this._wrapper.updateCache("source-over");
                this._wrapper.removeChild( this._foil );
                    
                this._scratchArea.getStage().update();
                
                
                this._wrapper.addChild( this._art );
                    
                this._amountOfPixels = this.getDimensions('w') * this.getDimensions('h');
                
            }
            
        } // end setup()
        
    }
}