(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 	= window.com.camelot,
        iwg 		= camelot.iwg,
		lib 		= iwg.lib,
		R           = lib.R,
        SS          = lib.flassets.MasterSS,
		Splash 		= lib.Splash,
		core		= camelot.core,

    Helper = function () {
        /*
if (typeof Helper.instance === "object") {
			return Helper.instance;
		}
*/
		//singleton
		var _instance = this;

		var _promptRevealing = 0;

		this.getPromptRevealing = function(){
			return _promptRevealing;
		}

		this.setPromptRevealing = function(prv){
			_promptRevealing = prv;
		}

		//Helper.instance = this;
    }

    /*/
    	methods to change cursor type
    /*/
    Helper.cursorPointer = function () {
    	document.body.style.cursor='pointer';
    };
    Helper.cursorDefault = function () {
    	document.body.style.cursor='default';
    };

    /*/
    	methods to help shuffle
    /*/
    Helper.shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

	/*/
		method to make images
	/*/
	Helper.makeBitmapImage = function(name, pos, alpha){
        var BitmapImage = new createjs.Sprite(SS.ss);
        BitmapImage.gotoAndStop(name);
        BitmapImage.x = pos.x;
        BitmapImage.y = pos.y;
        if (alpha < 1){
        	BitmapImage.alpha = alpha;
        }
        return BitmapImage;
    }

	/*/
		restart prompts
	/*/
	var isPrompting = false;
	var prompt = null;
	var isRevealing = 0;
	Helper.stopPrompt = function(){

		isPrompting = false;
		if(R.prompts.length > 0){
			for (var prompt in R.prompts){
				// remove prompts
				var parent 	= R.prompts[prompt].parent;
				parent.removeChild(R.prompts[prompt]);
		    }
		    R.prompts = [];
		}
		if(R.promptAnimation.length > 0){
			for (var animation in R.promptAnimation){

			    R.promptAnimation[animation].kill();
			}

		    R.promptAnimation = [];
		}
		try {
			// R.promptAnimation.kill();
		    R.shimmerAnimation.seek(0);
		    R.shimmerAnimation.pause();
		    R.shimmerAnimation.kill();
		}
		catch(err) {
			console.log(err);
		}

	}


	Helper.showPrompt = function(screen){

		if(isPrompting === false){
			isPrompting = true;
			prompt = setTimeout(function(){

				if(R.GAMES[2].getIsFinished() != true || R.GAMES[3].getIsFinished() != true){

					// make new prompt arrow
					var promptRight	= Helper.makeBitmapImage('arrow_right', {x: 900, y: 160 }, 0);
					R.LEFTGAMEWINDOW.addChild( promptRight );

					var leftAnimation = TweenMax.to(promptRight, 1, {alpha:1, yoyo: true, repeat: -1, onStart: function(){
						R.shimmerAnimation.resume();
					}});

					R.prompts.push(promptRight);
					R.promptAnimation.push(leftAnimation)

				} else {
					R.shimmerAnimation.resume();
				}

				if(R.GAMES[0].getIsFinished() != true || R.GAMES[1].getIsFinished() != true){
					// make new prompt arrow
					var promptLeft				= Helper.makeBitmapImage('arrow_left', {x: 10, y: 160 }, 0);
						R.RIGHTGAMEWINDOW.addChild( promptLeft );

					var rightAnimation = TweenMax.to(promptLeft, 1, {alpha:1, yoyo: true, repeat: -1, onStart: function(){
						R.shimmerAnimation.resume();
					}});

					R.prompts.push(promptLeft);
					R.promptAnimation.push(rightAnimation)

				} else {
					R.shimmerAnimation.resume();
				}


			}, 4000);
		}
	}

	/*/
		method to make shimmer
	/*/
	Helper.makeShimmer = function( iconString, coords, shinner){

		var shimmerContainer 	= new createjs.Container(),
			startX				= coords.x,
			startY 				= coords.y,
			shinerStartX		= shinner.startX,
			shinerEndX			= shinner.endX,
			shinerY				= shinner.y,
			scale				= shinner.scale,
			shimmer				= Helper.makeBitmapImage("shimmer", {x:shinerStartX, y:shinerY}, 1),
			iconMask			= new createjs.Shape();


		iconMask.x 		= startX;
		iconMask.y 		= startY;
		iconMask.graphics.p(iconString).cp().ef();

		shimmer.scaleX = shimmer.scaleY = scale;

		shimmerContainer.addChild( shimmer );
		shimmer.mask = iconMask;
		shimmerContainer.addChild( iconMask );

		R.shimmerAnimation.to(shimmer, 0.5, { x: shinerEndX}, 0);

		return shimmerContainer;

	}

	/*/
		reveal
	/*/
	Helper.reveal = function(reverse, tar, d){

		if (!d){
			d = 0;
		}

		var parent = tar.parent;

		if (reverse){

			tar.scaleY = tar.scaleX = 0;

			var clone = tar.clone();
			clone.scaleX = clone.scaleY = 0;
			clone.y = tar.y - 20;
			if ( parent != null){
				clone.y = parent.y + 90;
				clone.x = parent.x + 120;

			}
			clone.alpha = 0;

			TweenLite.to(tar, 0.3, {delay: d, scaleY:1, scaleX: 1});
			TweenLite.to(clone, 0.3, {delay: d, alpha: 0.8, scaleY:1.2, scaleX: 1.2, y: clone.y + 20});
			TweenLite.to(clone, 0.3, {delay: d+0.15, alpha: 0 });

			R.STAGE.addChild(clone);

		}
	}

	/*/
		move container coords
	/*/
	Helper.moveCoOrd = function(container, axis, newCoOrd){

		if ( axis === "x"){
			container.x = newCoOrd;
		}
		if ( axis === "y"){
			container.y = newCoOrd;
		}
	}

	/*/
		Contains
	/*/
	Helper.contains = function(that, it) {
	  return that.indexOf(it) !== -1;
	};

	/*/
		Convert Prize Amount
	/*/
	Helper.checkObject = function(ref, value) {
		if(ref.hasOwnProperty(value)){
			var icon = ref[value];
			return icon;
		} else {
			core.IWG.ame('error', {mes: ['error 11']});
		}
	}

	/*/
		Helper check array
	/*/
	Helper.checkArray = function(value, array){

		return array.indexOf(value) > -1;
	}
	/*/
		Remove index from array
	/*/
	Helper.removeIndex = function(array, index){

		var ar = array;

		if (index > -1) {
			ar.splice(index, 1);
		}

		return ar;

	}

	/*/
		Random from interval
	/*/
	Helper.randomFromInterval = function(from,to) {
	    return Math.floor(Math.random()*(to-from+1)+from);
	}

    //namespace path
    iwg._class("iwg.lib.Helper", Helper);
}(window));
