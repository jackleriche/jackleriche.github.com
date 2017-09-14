(function (window) {
    "use strict";
    
    //set local paths to external files.
    var IWGInit,
        camelot 	= window.com.camelot,
        core		= camelot.core,
        iwg 		= camelot.iwg,
        lib 		= iwg.lib,
        GS 			= window.com.greensock,
        Helper 		= lib.Helper,
        R 			= lib.R,
        GameAsset  	= lib.GameAsset,
        MEvent		= lib.MEvent,

    MatchTwo = function (x, y, gapY, gapX, slide, ticketData) {
        
        var _x 			= x,
        	_y 			= y, 
        	_gapY 		= gapY,
        	_gapX		= gapX,
        	_slide		= slide,
        	_ticketData	= ticketData,
        	_turns		= [],
        	_turnArray	= [],
			_ref		= {
        		0: "game4_symbol_car", 
		        1: "game4_symbol_cards", 
		        2: "game4_symbol_champagne", 
		        3: "game4_symbol_crown", 
		        4: "game4_symbol_plane", 
		        5: "game4_symbol_ring",  
		        6: "game4_symbol_wallet", 
		        7: "game4_symbol_watch"
        	},
			_isFinished	= false;

        // getters
        this.getX = function () {
            return _x;
        };
        this.getY = function () {
            return _y;
        };
        this.getGapY = function(){
	        return _gapY;
        };
        this.getGapX = function(){
	        return _gapX;
        };
		this.getSlide = function () {
            return _slide;
        };
		this.getTicketData = function(){
			return _ticketData;
		};
		this.getTurns = function(){
			return _turns;
		}
		this.getTurnArray = function(){
			return _turnArray;
		}
		this.getRef = function() {
			return _ref;
		}
		this.getIsFinished = function(){
			return _isFinished;
		}
		
		// setters
	    this.setX = function (prv) {
            _x = prv;
        };
        this.setY = function (prv) {
            _y = prv;
        };
        this.setGapY = function(prv) {
	        _gapY = prv;
        };
        this.setGapX = function(prv) {
	        _gapX = prv;
        };
        this.setSlide = function (prv) {
            _slide = prv;
        };
        this.setTurns = function(prv) {
	        _turns = prv;
        };
        this.setTurnArray = function(prv){
			return _turnArray;
		}
        this.setIsFinished = function(prv){
	        _isFinished = prv;
        }
        
        init(this);

    }
    
    function init(t){
    	
    	setupTurnData(t, t.getTicketData());
    	var turns = t.getTurns();
		for (var turn in turns){
			var turnLayout = setupTurnsLayout(t, turns[turn], t.getY());
			var turnArray =	t.getTurnArray();
			turnArray.push(turnLayout[0]);
			t.setTurnArray(turnArray);
		}	
		setupLayout(t);	
	
	}
	
	function setupLayout(t){
		var game4Div1				= Helper.makeBitmapImage('game3and4_divs', {x:515, y: 225}),
			game4Div2				= Helper.makeBitmapImage('game3and4_divs', {x:515, y: 320}),
			game4row1				= Helper.makeBitmapImage('row1', {x: 508, y: 150}),
			game4row2				= Helper.makeBitmapImage('row2', {x: 508, y: 250}),
			game4row3				= Helper.makeBitmapImage('row3', {x: 508, y: 340});
			
		t.getSlide().addChild(game4Div1, game4Div2, game4row1, game4row2, game4row3);
	}
	
	function setupTurnData(t, ticket){
		
		var ar = [ticket.turn[0], ticket.turn[1], ticket.turn[2]];
		t.setTurns(ar);
		
	}
	
	function setupTurnsLayout(t, turnData, iconY){
	
		var turn = turnData.n;
		var highlight = null;
		if(Helper.contains(turn, 0)){
			highlight = "game3and4_highlight_a";
		} else if (Helper.contains(turn, 1)){
			highlight = "game3and4_highlight_b";
		} else if (Helper.contains(turn, 2)){
			highlight = "game3and4_highlight_c";
		};
		
		var icons 						= [],
			gameAssetsArray 			= [],
			iconData 					= turnData.v,
			revealHighlight 			= Helper.makeBitmapImage(highlight, { x: -42, y: 6 }, 0),
			gameContainer				= new createjs.Container();
			gameContainer.name 			= "gameContainer";
			gameContainer.isRevealed 	= false;
			gameContainer.x 			= t.getX();
			gameContainer.y 			= t.getY();
			
			gameContainer.addChild( revealHighlight )
			
		
		var d 		= iconData.split("|"),
			values 	= d[0].split(','),
			prize	= d[1],
			gapY 	= t.getGapY(),
			gapX	= t.getGapX();
		
		for(var value in values){
			var container 			= new createjs.Container(),
				maskContainer 		= new createjs.Container(),
				spacingX			= (gapX * value);
				maskContainer.name	= "maskContainer";
			
			var iconCode = getIcon(t, values[value]);
			
			var icon 			= Helper.makeBitmapImage('game4_symbol_start', { x: 51, y: 53 }),
				revealIcon 		= Helper.makeBitmapImage(iconCode, { x: 0, y: 0 }, 0),
				shimmer			= Helper.makeShimmer(R.moneyBag, { x: 0, y: 790 }, {startX: -80, endX: 140, y: 0, scale: 0.6});
			container.x 	= spacingX;
			container.num 	= value;
			
			var gameAssetFunctions = {"reveal": gameReveal}
			var gameAsset = new GameAsset(container, { isWinner: turnData.w }, gameAssetFunctions);
				gameAsset.name = "gameAsset";
                gameAsset.setName("gameAsset" + value);
			
			gameAssetsArray.push(gameAsset);
			
			maskContainer.addChild(shimmer);
			container.addChild( revealIcon, icon, maskContainer);
			gameContainer.addChild( container );
		}
		
		var prizeContainer 		= new createjs.Container(),
			maskContainer		= new createjs.Container(),
			prizeIcon 			= Helper.makeBitmapImage('word_prize', {x: 265, y: 57}, 1),
			prizeAmount 		= Helper.makeBitmapImage(Helper.checkObject(R.PRIZETABLE, prize), {x: 271, y: 51}, 0);
			prizeContainer.num 	= 2;
			maskContainer.name 	= "maskContainer";
		
		var prizeAssetFunctions = {"reveal": gameReveal}
		var prizeAsset = new GameAsset(prizeContainer, { isWinner: turnData.w }, prizeAssetFunctions);
			prizeAsset.setName("prizeAsset");
            prizeAsset.setName("prizeAsset");
			
		gameAssetsArray.push(prizeAsset);
		
		var shimmer = Helper.makeShimmer(R.prize, { x: 200, y: 820 }, {startX: 60, endX: 290, y: 0, scale: 0.6} );

		maskContainer.addChild(shimmer);
		prizeContainer.addChild(prizeAmount, prizeIcon, maskContainer);
		gameContainer.addChild(prizeContainer);
		
		gameContainer.on('click', function(ev){

			Helper.stopPrompt();
			R.clickCount++;	
				
			if(gameContainer.isRevealed === false){
				gameContainer.isRevealed = true;

				var obj = ev.target;
				while (obj.parent){
					if (obj.num) {
						break;
					}
					obj = obj.parent;
				}

				if(gameAssetsArray[obj.num].getIsRevealed() == false){
					
					var delay = 200;
					for( var i = 0; i < gameAssetsArray.length; i++){
					  if(gameAssetsArray[i].getIsRevealed() === false){
					  		if (i === gameAssetsArray.length-1){
					  		  	delay = 300;
					  		}
					  		gameAssetsArray[i].reveal("reveal", gameAssetsArray[i], (i+1) * delay);
					  		var maskContainer = gameAssetsArray[i].getContainer();
					  		// remove maskContainer 
					  		maskContainer.removeChild(maskContainer.getChildByName('maskContainer'));
					  	}				
					}
				}
				t.isFinished();
				t.checkMatchTwoWin(gameContainer, turnData, d[1]);
				makeSound();
			}		
		
		}, null, true);
					
		t.getSlide().addChild( gameContainer );
		// set Y for next row\
		t.setY(t.getY() + t.getGapY());
		
		return [gameContainer, gameAssetsArray];
	
	}
	
	function getIcon(t, value) {
	
		if(t.getRef().hasOwnProperty(value)){
			var icon = t.getRef()[value];
			return icon;
		} else {
			throw "sorry there seems to be a problem - error code 10";
		}	
		
	}
	
	function gameReveal(){
	
		this.setIsRevealed(true);
		
		if(this.getContainer()){
				
			var container 		= this.getContainer(),
				obj 			= container.children[1],
				icon			= container.children[0],
				cloneY 			= container.parent.y,
				cloneStartX		= container.parent.x,
				shinerArray		= [];
				
			var clone = container.children[1].clone();
			clone.scaleX = clone.scaleY = 0;
		
			clone.x = cloneStartX + container.x + clone.x;

			if(obj.y > cloneY){
				clone.y = obj.y - 15;
			} else {
				clone.y = cloneY + 45;
			}
			
			// make 6 shinnies which arc out once revealed
			var shineX 	= clone.x,
				shineY	= clone.y;
				
			for ( var i = 0; i <= 5; i++){
				var shiner = Helper.makeBitmapImage("shiner", {x: shineX, y: shineY}, 0);
				R.RIGHTGAMEWINDOW.addChild(shiner);
				shinerArray.push(shiner);
			}
            
            var revealTimeLine = new TimelineLite({
                smoothChildTiming : true,
                onStart: function(){
                    for(var shine in shinerArray){
                        shinerArray[shine].alpha = 1;
                    }
                    if(R.PLAYSOUND){
                        createjs.Sound.play("Pop");
                    }
                }
            });
			
			revealTimeLine.to(shinerArray[0], 0.8, {bezier:[{x:shineX, y:shineY}, {x:shineX-30, y:shineY-30}, {x:shineX-60, y:shineY+30}], alpha: 0}, this.getName())
			.to(shinerArray[1], 0.8, {bezier:[{x:shineX, y:shineY}, {x:shineX-20, y:shineY-40}, {x:shineX-40, y:shineY+30}], alpha: 0}, this.getName())
			.to(shinerArray[2], 0.8, {bezier:[{x:shineX, y:shineY}, {x:shineX-10, y:shineY-50}, {x:shineX-20, y:shineY+30}], alpha: 0}, this.getName())
			.to(shinerArray[3], 0.8, {bezier:[{x:shineX, y:shineY}, {x:shineX+10, y:shineY-50}, {x:shineX+20, y:shineY+30}], alpha: 0}, this.getName())
			.to(shinerArray[4], 0.8, {bezier:[{x:shineX, y:shineY}, {x:shineX+20, y:shineY-40}, {x:shineX+40, y:shineY+30}], alpha: 0}, this.getName())
			.to(shinerArray[5], 0.8, {bezier:[{x:shineX, y:shineY}, {x:shineX+30, y:shineY-30}, {x:shineX+60, y:shineY+30}], alpha: 0}, this.getName())
					
			.to(obj, 0.3, {delay: 0, scaleY:0, scaleX: 0}, this.getName())
			.to(icon, 0.3, { delay: 0, alpha: 1}, this.getName())
			.to(clone, 0.3, {delay: 0, alpha: 0.8, scaleY:1.4, scaleX: 1.4, y: clone.y + 20}, this.getName())
			.to(clone, 0.3, {delay: 0.15, alpha: 0 }, this.getName());
            
         //   R.revealTimeline.add(revealTimeLine);
			
			R.RIGHTGAMEWINDOW.addChild(clone);
			
		} else {
			 core.IWG.ame('error', {mes: ['couldnt get icon Container - error code 03a1']});
		}

	}
	
	MatchTwo.prototype.checkMatchTwoWin = function(gameContainer, turnData, prize) {
		var isWinner = turnData.w,
			bankAmount = prize;
		
		if (isWinner === '1'){
			// bank amount
			core.IWG.ame('bank', {deposit: [prize], log: true});
			
			var highlight = gameContainer.children[0];
			var highlightTimeline = new TimelineMax({delay:1.5, repeat:4, yoyo:true, onStart: makeWinSound});
			highlightTimeline.to(highlight, 0.7, {alpha: 0.95, ease: "easeIn" })		
		}
		
		
	}
	
	function makeWinSound(){
		if(R.PLAYSOUND){
			createjs.Sound.play("glossy_success_19");
		}		
	}
	
	function makeSound(sound){
//		if(R.PLAYSOUND){
//			createjs.Sound.play(sound);
//			createjs.Sound.play(sound,"",300);
//			createjs.Sound.play(sound,"",700);
//		}
		setTimeout(function(){
			R.clickCount--;
			MEvent.RESETPROMPT.param = R.clickCount;
			iwg.IWGEM.dispatchEvent(MEvent.RESETPROMPT);
		}, 1000)
	
	}
	
	MatchTwo.prototype.isFinished = function(){
		
		var turns 			= this.getTurnArray(),
		  	allRevealed 	= false;
		
		for (var turn in turns){
		  
		  if(turns[turn]){
		  				
		  	if(turns[turn].isRevealed === false){
		  		allRevealed = false;
		  		break
		  	} else {
		  		allRevealed = true;
		  	}
		  }		
		}
		
		if(allRevealed){
		  	this.setIsFinished(true);
		  	// fire event to check all games in mainGame class
			iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
		}
		
	}
	
	 //namespace path
    iwg._class("iwg.lib.MatchTwo", MatchTwo);
}(window));