/// <reference path="../../../typings/tsd.d.ts" />
module com.camelot.iwg {
	
	var CAMELOT: any 	= com.camelot,
        CORE 			= CAMELOT.core,
        IWG 			= CAMELOT.iwg;

	export class Scene {
		
		private _div: HTMLElement 	= document.createElement('div');
        private _parent: any        = null;
		private _children: any 		= [];
		private _dimensions: any 	= {
			w: 0,
			h: 0
		};
		private _position: any 		= {
			x: 0,
			y: 0
		};
		private _alpha: number		= 1;
		private _scale: number 		= 1;
        private _rotation: number   = null;
		
		public active: boolean 		= false;
		public enabled: boolean 	= false;
		
				
        constructor( private _name: string ) {
			
			if ( !_name ) {
				console.warn('no name given to scene, please create with name');
				return;
			}
			
			this._subscribe();
			this._init( _name );
			
		} // end constructor
		
		private _subscribe() {
			IWG.IWGEM.on('initComplete', this._initComplete.bind(this) );
		} // end _subscribe
		
		private _init(name: string) {
			
			this._div.id  		= name;
			this._div.className = "scene";

        	document.getElementById("scaleDiv").appendChild(this._div);
			
			IWG.scenesArray.push(this);
			IWG.IWGEM.trigger('initComplete');
			
		} // end _init()
		
		private _initComplete() {	
		} // end _initComplete()
		
		/*
		 *	name: 			getDiv()
		 *	description:	return div of scene
		 *	params:			null
		 *	returns:		_name: string
		 */		
		public getDiv() {
			return this._div;
		} // end getDiv()
		
		/*
		 *	name: 			getName()
		 *	description:	return name of scene
		 *	params:			null
		 *	returns:		_name: string
		 */		
		public getName() {
			return this._name;
		} // end getName()
		
        
        /*
         *  name:           setParent()
         *  description:    set parent of scene
         *  params:         parent: gameObject
         *  returns:        null
         */
        public setParent(parent): boolean {
            
            if ( parent ){
                // for framework referance
                this._parent = parent;
                // for dom change
                document.getElementById(parent.getName()).appendChild(this._div);
                return true
            }
            
            console.warn( 'no parent provided for ' + this._name + ' scene' );
            return false;
            
        }
        
        /*
         *  name:           setParent()
         *  description:    get parent of scene
         *  params:         null
         *  returns:        parent: any 
         */
        public getParent() {
            return this._parent
        }
        
		/*
		 *	name: 			addChild()
		 *	description:	add child to scene
		 *	params:			gameObject
		 *	returns:		null
		 */		
		public addChild(gameObject) {
			this._children.push(gameObject);
		} // end addChild()
		
		/*
		 *	name: 			setActive()
		 *	description:	add child to scene
		 *	params:			gameObject
		 *	returns:		null
		 */		
		public setActive(bool) {
			
			this.active = bool;
			
			for ( var i = 0; i < this._children.length; i++ ) {
				// sets the active of all child elements to the same as the scene 
				this._children[i].active = bool;				
			}				
			
		} // end setActive()
		
		/*
		 *	name: 			setDimensions()
		 *	description:	set scene dimensions
		 *	params:			dimensions: object
		 *	returns:		null
		 */		
		public setDimensions(dimensions: any): void {

            if (dimensions.w) {
                this._dimensions.w = dimensions.w;
            };

            if (dimensions.h) {
                this._dimensions.h = dimensions.h;
            };

            this._div.style.width = this._dimensions.w + "px";
            this._div.style.height = this._dimensions.h + "px";

        }; // end setActive()
		
		        /*
		 *	name: 			getDimensions()
		 *	description:	set scene dimensions
		 *	params:			dimensions: object
		 *	returns:		null
		 */		
		public getDimensions(param: any): number {

            if (this._dimensions.hasOwnProperty(param) ) {               
                return this._dimensions[param]
            };

        }; // end setActive()
		
		/*
         *  name:           setPosition
         *  description:    set the position of the scene by x and y
         *  params:     	pos: Object
         *  return:         null      
         */
        public setPosition(_pos: any): void {

            if (_pos.x) {
                this._position.x = _pos.x;
            };
            if (_pos.y) {
                this._position.y = _pos.y;
            };

            TweenMax.set(this._div, { x: _pos.x, y: _pos.y });

        }
		
		/*
		 *	name: 			getScale()
		 *	description:	gets scale of scene
		 *	params:			null
		 *	returns: 		scale: number
		 */
		public getScale( ) {
			return this._scale;
		}
		
		/*
		 *	name: 			setScale()
		 *	description:	sets scale of scene object
		 *	params:			scale: number
		 *	returns: 		null
		 */
		public setScale( scale: number ) {
			this._scale = scale;
			TweenMax.set(this._div, { scale: this._scale});
		}
        
        /*
		 *	name: 			getRotation()
		 *	description:	return scenes rotation
		 *	params:			null
		 *	returns:		deg: number
		 */		
		public getRotation() : number {
            return this._rotation;
        }
        
        /*
		 *	name: 			setRotation()
		 *	description:	rotate scene
		 *	params:			deg: number
		 *	returns:		confim: bool
		 */		
		public setRotation(deg: number): boolean {
			
            if ( deg ){
                this._rotation = deg;
                TweenLite.set(this._div, { rotation: deg });  
                return true
            }
            
            console.warn('no rotation set on ' + this._name + ' scene');
            return false;			
			
		} // end setRotation()
		
		/*
		 *	name: 			setScale()
		 *	description:	sets scale of scene object
		 *	params:			scale: number
		 *	returns: 		null
		 */
		public setAlpha( alpha: number ) {
			this._alpha = alpha;
			TweenMax.set(this._div, { alpha: this._alpha});
		}
		
		/*
		 *	name: 			getChildren()
		 *	description:	returns all children
		 *	params:			null
		 *	returns: 		array: array<gameobject>
		 */
		public getChildren() {
			if (this._children.length > 0){
				return this._children;
			} else {
				console.warn('scene has no children')
			}
		}
		
		/*
		 *	name: 			getChildByName()
		 *	description:	gets a gameObject by name
		 *	params:			name: string
		 *	returns: 		gameObject: object
		 */
		public getChildByName( name: string ) {

			for ( var i = 0; i < this._children.length; i++ ) {
		
				var child 	= this._children[i];
				
				if ( child.getName() === name){
					return child;
				}
								
			}
			
			console.warn('no child named "' + name + '" found in ' + this.getName() );
						
		}
		
		/*
		 *	name: 			setZindex()
		 *	description:	set zIndex of scene
		 *	params:			name: string
		 *	returns: 		gameObject: object
		 */
		public setZindex( zIndex: string ) {
			this._div.style.zIndex = zIndex;
		};
		
		
		/*
		 *	name: 			destroy()
		 *	description:	destroy scene
		 *	params:			null
		 *	returns:		 		
		 */
		public destroy() {
			
			var elem = document.getElementById(this._name);
			elem.parentNode.removeChild(elem);
			
		};
		
		
		
		
		
	} // end Scene 
} // end module