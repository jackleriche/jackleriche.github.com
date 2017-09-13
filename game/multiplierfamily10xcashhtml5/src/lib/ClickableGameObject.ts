/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {
    
    var CAMELOT: any    = com.camelot,
		CORE            = CAMELOT.core,
        IWG             = CAMELOT.iwg;

	export class ClickableGameObject extends GameObject {
		
		private _actions: any = {
			click: null,
			mousedown: null,
			mouseup: null,
			dblclick: null,
			pressmove: null,
			pressup: null,
			mouseover: null,
			mouseout: null,
			rollover: null,
			rollout: null
		}
		private _reminders: boolean = false;
		
		constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 1, _parent: any = "scaleDiv" ) {
			
			super(_name, _dimensions, _zindex, _parent);	
            
            this._clickableSubscribe();			
			
			createjs.Touch.enable(this.getStage(), false, true);
			
            this.getStage().enableMouseOver(10);
            
            if (this.getCanvas().id !== "instructions"){
                this._setupButtonConfig();   
            }
				
		}
        
        /**
         *  name:           _clickableSubscribe()
         *  description:    adds event listeners to the gameObject
         *  params:     	null
         *  return:         null      
         */
        private _clickableSubscribe() {
            IWG.IWGEM.on('stopReminder', this._stopReminder.bind(this) );
            IWG.IWGEM.on('startReminder', this._startReminder.bind(this) );
            IWG.IWGEM.on('restartReminder', this._restartReminder.bind(this) );
        }
		
		
		/*
         *  name:           setAction
         *  description:    sets up a interaction on the stage of the gameObject
         *  params:     	actionType: string, actionFunction: function
         *  return:         null      
         */		
		public setAction(actionType: string, actionFunction: any) : void {
				 
			if (!this._actions.hasOwnProperty(actionType)) {
                console.warn('no such action type in '+ this.getName() );
				return;
            } else {
				this._actions[actionType] = actionFunction;
				this.getStage().on(actionType, () => {
					if ( this.getEnabled() ){
						this._actions[actionType]();
					};
				});	
			};
				
		}
		
		/*
		 *	name:			setReminder
		 *	description:	set reminders to value
		 *	params:			value: boolean, anim: string
		 *	returns:		bool: boolean
		 */
		public setReminder(value: boolean, anim: string): boolean {
            
            if ( !anim || anim === null ) {
                console.warn('no animation set for ' + this.getName() + ', please set animation for reminder' );
                return false;
            }

			this._reminders = value;
			
			if ( value ) {
				
				// reminder stuff here
				this.addAnimation('reminder1');
				this.setAnimation('reminder1', anim, 0.8, 4);
                
			}
			
			return true;
			
		}
        
        /*
		 *	name:			killReminder
		 *	description:	kill reminders
		 *	params:			value: boolean
		 *	returns:		bool: boolean
		 */
		public killReminder(value: boolean): boolean {

			if ( this.animationTimeLine ) {
                
				this.animationTimeLine.seek(0);
				this.animationTimeLine.kill();
                this.animationTimeLine = null;
                
			}
			
			return true;
			
		}
		
		/*
		 *	name:			_setupButtonConfig
		 *	description:	setup button click events
		 *	params:			null
		 *	returns:		null
		 */
		private _setupButtonConfig(): void {
			
			this.addAnimation('rollover');
			this.addAnimation('rollout');
			
			this.setAnimation('rollover', 'rollover', 0.2, 0);
			this.setAnimation('rollout', 'rollout', 0.2, 0);
			
			this.setEnabled(true);
			this.setAction('rollover', () => {
                IWG.IWGEM.trigger('stopReminder');   
                this.animate('rollover');         
			});
			
			this.setAction('rollout', () => {
                this.animate('rollout');
                IWG.IWGEM.trigger('startReminder');
			});
				
		}
        
        /**
         *  name:           _stopReminder()
         *  description:    stop active reminders
         *  params:         null
         *  returns:        boolean
         */
        private _stopReminder(): boolean {
            
            if ( this.animationTimeLine ){
                this.animationTimeLine.pause();    
                this.animationTimeLine.seek('start');
            }
            
            return false;
            
        }
        
        /**
         *  name:           _startReminder()
         *  description:    start active reminders
         *  params:         null
         *  returns:        boolean
         */
        private _startReminder(): boolean {
            
            if ( this.animationTimeLine ){
                this.animationTimeLine.play();
            }
            
            return false;
            
        }
        
        /**
         *  name:           _restartReminder()
         *  description:    restart active reminders
         *  params:         null
         *  returns:        boolean
         */
        private _restartReminder(): boolean {
            
            
            if (this.animationTimeLine && this.getRevealed() === false) {
                this.animationTimeLine.seek('start');
                this.animationTimeLine.play();  
            }  
                
            return false;
            
        }
		
    }
}