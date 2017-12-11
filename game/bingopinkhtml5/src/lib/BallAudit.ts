/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
module com.camelot.iwg {

	var CAMELOT: any 	= com.camelot,
        CORE 			= CAMELOT.core,
        IWG 			= CAMELOT.iwg,
		GAMEOBJECT 		= IWG.GameObject,
		SPRITESHEETS	= IWG.SpriteSheets;

	export class BallAudit extends Scene {
		
		private _audit: Array<GameObject> = [];
		private _index: number = 0;
		
		
		constructor(name, private _noBalls: number = 10 ) {
			
			super(name);
			this._ballAuditSubscribe();
			
			// setup scene
			this.setDimensions({
				w: 960,
				h: 100
			});
			
			this._setupLayout();	
			
		}
		
		
		/*
		 *	name: 			_ballAuditSubscribe
		 *	description:	setup listeners associated with the ballAudit class
		 *	params:			null
		 *	returns:		null
		 */		 
		private _ballAuditSubscribe() {
			IWG.IWGEM.on( 'ballAudit', this._ballAudit.bind(this) );
		}
		
		/*
		 *	name: 			_ballAuditUnsubscribe
		 *	description:	remove listeners associated with the ballAudit class
		 *	params:			null
		 *	returns:		null
		 */		 
		private _ballAuditUnsubscribe() {
			IWG.IWGEM.off( 'ballAudit' );
		}
		
		
		
		
		/*
		 *	name: 			_setupLayout
		 *	description: 	setup audit layout
		 *	param:			null
		 *	returns:		null
		 */
		private _setupLayout() {
			
			var yourNumbers = new GAMEOBJECT('yourNumbers', { w: 230, h: 26 }, 1, this);
			yourNumbers.addBitmap({
					name: "yourNumbers",
		        	pos: {
		            	x: 115,
		            	y: 13
		        	},
		        	frame: "text_yourbingoballs",
		        	spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
			        doReg: {
			            center: true
			        },
					scale: 1
				});
			yourNumbers.setPosition({
				x: 480 - 115,
				y: 20
			});
			
			for ( var i = 0; i < this._noBalls; i++ ){
				
				var ball = new GAMEOBJECT("ball" + i, {w: 48, h: 48}, 1, this);
				ball.addBitmap({
					name: "emptyBall",
		        	pos: {
		            	x: 24,
		            	y: 24
		        	},
		        	frame: "audit_single",
		        	spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
			        doReg: {
			            center: true
			        },
					scale: 1
				});
				ball.addBitmap({
					name: "auditBall",
		        	pos: {
		            	x: 24,
		            	y: 24
		        	},
		        	frame: "audit_single",
		        	spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo") ,
			        doReg: {
			            center: true
			        },
					scale: 0,
					alpha: 0
				});
				
				ball.setScale(0, 0);
				ball.setAlpha(0);
				
				ball.setPosition({
					x: 48 * i,
					y: 50
				});
				
				// setup shrink animation
				ball.addAnimation("shrinkAuditBall");
				ball.setAnimation("shrinkAuditBall", "shrinkAuditBall");
				
				ball.addAnimation("growAuditBall");
				ball.setAnimation("growAuditBall", "growAuditBall");
				
				this.addChild(ball);
				
				// add to audit array for easy referencing
				this._audit.push(ball);
				
				var delay = (0.5 + (i / 10));
				
				TweenMax.to( ball.getCanvas(), 0.3, { delay: delay, alpha: 1, scaleX: 1, scaleY: 1, ease: Bounce.easeOut } );
				
			}
			
		} // end _setupLayout
		
		/*
		 *	name:			_ballAudit
		 *	description:	event called to populate the audit
		 *	params:			ballColor: string, ballNumber: number
		 *	returns:		null
		 */
		private _ballAudit(ballColor, ballNumber) {
			
			// split ball to just color
			var color = ballColor.split("_")[1];
			
			var auditBall = this._audit[this._index];
			auditBall.animate("shrinkAuditBall");
			
			var bitmap = auditBall.getBitmap("auditBall");
			bitmap.gotoAndStop('auditball_' + color);
			
            var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			var numberWang = new createjs.Text(ballNumber, "bold 20px Arial", "black")
			numberWang.name = 'numberWang';
			numberWang.textAlign = "center";
			numberWang.x = 24;
            if (is_firefox){
                numberWang.y = 16;
            } else {
                numberWang.y = 13;   
            }
			numberWang.alpha = 0;
			
			
			auditBall.getStage().addChild(numberWang);
			
			auditBall.animate("growAuditBall");
			
			// increse the ballAuditIndex by 1
			this._index++;
			
		}
	}
}