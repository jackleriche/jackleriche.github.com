/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />

module com.camelot.iwg {

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

		constructor(_name: string, _dimensions: any = { w: 0, h: 0 }, _zindex: number = 1, _parent: any = "scaleDiv" ) {
			
			super(_name, _dimensions, _zindex, _parent);				
			
			createjs.Touch.enable(this.getStage(), false, true);
            this.getStage().enableMouseOver(10);
				
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
    }
}