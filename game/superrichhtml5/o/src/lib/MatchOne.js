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
        GameAsset	= lib.GameAsset,
        MEvent		= lib.MEvent,
        ticket 		= lib.Ticket,

    MatchOne = function(x, y, gap, slide, icon, winningSymbol, ticketData, gameID, info, winningTab, yourTab) {

        var _x 					= x,
        	_y 					= y,
        	_gap				= gap,
        	_slide 				= slide,
        	_winningSymbol 		= null,
        	_yourSymbols 		= [],
        	_icon 				= icon,
        	_ticketData			= ticketData,
        	_winningSymbol		= winningSymbol,
        	_icons				= {
        		0: "game1_symbol_bars",
			    1: "game1_symbol_chopper",
			    2: "game1_symbol_coins",
			    3: "game1_symbol_gem",
			    4: "game1_symbol_necklace",
			    5: "game1_symbol_safe"
			},
        	_chances			= [],
        	_gameID 			= gameID,
        	_info				= info,
        	_winningTab			= winningTab,
        	_yourTab			= yourTab,
        	_isTicketTypeNumber	= null,
        	_isFinished			= false,
        	_winningBank		= [];

        // getters
        this.getX = function () {
            return _x;
        };
        this.getY = function () {
            return _y;
        };
        this.getGap = function(){
	        return _gap;
        };
		this.getSlide = function () {
            return _slide;
        };
		this.getIcon = function() {
			return _icon;
		}
		this.getYourSymbols = function() {
		  return _yourSymbols;
		}
		this.getWinningSymbol = function() {
			return _winningSymbol;
		}
		this.getTicketData = function(){
			return _ticketData;
		};
		this.getIcons = function(){
			return _icons;
		}
		this.getChances = function(){
			return _chances;
		}
		this.getGameID = function(){
			return _gameID;
		}
		this.getInfo = function() {
			return _info;
		}
		this.getIsTicketTypeNumber = function() {
			return _isTicketTypeNumber;
		}
		this.getIsFinished = function() {
			return _isFinished;
		}
		this.getWinningBank = function() {
			return _winningBank;
		}
		this.getWinningTab = function() {
			return _winningTab;
		}
		this.getYourTab = function() {
			return _yourTab;
		}


		// setters
	    this.setX = function (prv) {
            _x = prv;
        };
        this.setY = function (prv) {
            _y = prv;
        };
        this.setGap = function(prv) {
	        _gap = prv;
        };
        this.setSlide = function (prv) {
            _slide = prv;
        };
        this.setYourSymbols = function (prv) {
            _yourSymbols = prv;
        };
        this.setChances = function(prv) {
	        _chances = prv;
        }
        this.setIsTicketTypeNumber = function(prv) {
			_isTicketTypeNumber = prv;
		}
        this.setIsFinished = function(prv) {
	        _isFinished = prv;
        }
        this.setWinningBank = function(prv) {
	        _winningBank = prv;
        }

        init(this);

    }

    function init(self){

   		sortTicketType(self);
    	setupAssets(self);
    	setupLayout(self);
    }

    function sortTicketType(self){
	    // checks game name to see if it uses numbers or icons
		if (Helper.contains(self.getTicketData().n, 'Number')){
		    self.setIsTicketTypeNumber(true);
		}
    }

    function setupLayout(self){

	    var	game1WinningSymbolText 	= Helper.makeBitmapImage(self.getWinningTab(), {x: 110, y: self.getY() + 10 }),
		  	game1YourSymbol			= Helper.makeBitmapImage(self.getYourTab(), {x: 480, y: self.getY() + 10 }),
		  	game1Div				= Helper.makeBitmapImage('game1and2_divs', {x:237, y: self.getY() + 34 });

		self.getSlide().addChild(game1WinningSymbolText, game1YourSymbol, game1Div );
    }

    function setupAssets(self){

    	var winningSymbol 		= self.getWinningSymbol(),
    		yourSymbol 			= self.getIcon(),
    		maskWinningSymbol 	= null,
    		maskYourSymbol		= null;

		if (winningSymbol === "game1_diamond"){
			maskWinningSymbol = "EADShzdIBuh4IA8goIBGgeIBageIBGgUIBkgUIBaAAIBkAKIBQAKIA8AeIAoAeIBGAoIAUAUIAyAyIAeAyIAUAeIAABGIhuB4ImaG4IAAAKIocpEIAAhG";
		} else {
			maskWinningSymbol = "EAC+hx5IgohQIhGigIC+hGIC+g8IB4geIB4AUIBQAoIAyAKIAegKIBuAoIAyAUIAAAUICCBGIBuA8IAyAoIgKA8IgUBGIgKAeIAAAoIAAA8IAKAKIoIGGIgKAAIkikiIkOkOIAAgK";
		}
		if(yourSymbol === "game1_coin"){
			maskYourSymbol = 'EAF8h03IAyhQIAygoIBGgoIBageIBGgKIAoAAIAoAKIAoAKIAUAKIAeAUIAeAUIAyAeIAoAyIAoAyIAeAyIAUAoIAUAyIAKAoIAKAeIAAAyIAAA8IAAAyIgKAyIgUBGIgoA8IgeAyIgoAeYgKAKgoAUAAAAIgeAUIgoAUIgoAKIgyAKIgoAAIgyAAIg8gKIgegKIgogeIgygoIgogeIgogoIgegoIgUgoIgegyIgUgoIgKgyIgKhGIAAgoIAKhGIAUhGIAKgeIAeg8';
		} else {
			maskYourSymbol = "EACqhyDIBug8IAKhGIHWjmID6BGIAKAKIAKCgICCA8IAeCWInCFoIpOkYIgKgKIAeig";
		}


    	var	gameContainer 				= new createjs.Container(),
    		maskContainer				= new createjs.Container(),
    		clickPrizeContainer			= new createjs.Container(),
    		gameBG						= Helper.makeBitmapImage("box_long", {x:0, y:0}, 1),
			gameInfo 					= Helper.makeBitmapImage(self.getInfo(), {x:45, y: 210}, 1),
    		winningContainer			= new createjs.Container(),
    		winningSymbol				= Helper.makeBitmapImage(self.getWinningSymbol(), {x: 0, y: 0}),
    		winningSymbolReveal			= Helper.makeBitmapImage(sortWinningIcon(self), {x: 0, y: 0}, 0),
    		winningMask					= new createjs.Shape(),
    		shimmer						= Helper.makeShimmer(maskWinningSymbol, { x: -70, y: 720 }, {startX: -190, endX: 0, y: -70, scale: 0.8} ),

			gameData					= self.getTicketData(),
			gameAssetsArray				= [];
			winningContainer.x 			= 111;
			winningContainer.y 			= 125;

			maskContainer.name 			= "maskContainer";
			winningSymbol.name			= "icon";
			winningSymbolReveal.name 	= "iconReveal";
			shimmer.name 				= "shimmer";
			clickPrizeContainer.name	= "clickContainer";

			maskContainer.addChild(shimmer);
			shimmer.mask = winningMask;
			maskContainer.addChild(winningMask);

			gameContainer.x 			= self.getX();
			gameContainer.y 			= self.getY();
			gameContainer.name			= "gameContainer";

			gameContainer.addChild(gameBG, gameInfo);
			clickPrizeContainer.addChild(winningSymbol);
			winningContainer.addChild(winningSymbolReveal, clickPrizeContainer, maskContainer);


		var winningSymbolFunctions 		= {"reveal": gameReveal}
		var winningSymbolAsset 			= new GameAsset(winningContainer, {}, winningSymbolFunctions);
			winningSymbolAsset.name 	= "gameAsset";

		clickPrizeContainer.on("click", function(ev){
			// start click
			Helper.stopPrompt();
			R.clickCount++;
			var container = gameAssetsArray[0].getContainer();

			// remove maskContainer
			container.removeChild(container.getChildByName('maskContainer'));

			if(gameAssetsArray[0].getIsRevealed() === false){
				gameAssetsArray[0].setIsRevealed(true);
				gameAssetsArray[0].reveal("reveal", gameAssetsArray[0], 0);
				createjs.Sound.play("Pop");
			}
			self.checkReveals();
			self.isFinished();

		}, null, true );

		gameAssetsArray.push(winningSymbolAsset);

		for( var i = 0; i < 4; i++){

			var highlight = null;
			switch(i){
				case 3:
					highlight = "game1and2_highlight_c";
					break;
				default:
					highlight = "game1and2_highlight_b";
					break;
			}

			// sort game data into a usable form
			var data = sortTurnData(gameData.turn[i], self.getIsTicketTypeNumber()),
				cost = data[1];


			var container 		= new createjs.Container(),
				maskContainer 	= new createjs.Container(),
				clickContainer 	= new createjs.Container(),
				clicky			= new createjs.Shape(),
				winHighlight 	= Helper.makeBitmapImage(highlight, { x: 0, y: 8}, 0),
				icon 			= Helper.makeBitmapImage(self.getIcon(), { x: 71, y: 71}),
				iconMask		= new createjs.Shape(),
				shimmer			= Helper.makeShimmer(maskYourSymbol, { x: 0, y: 790 }, {startX: -100, endX: 100, y: 0, scale: 0.8} ),
				shimmer2		= Helper.makeShimmer(R.prize, { x: 10, y: 900 }, {startX: -120, endX: 100, y: 100, scale: 0.8} ),
				iconReveal		= Helper.makeBitmapImage(data[0], { x: 71, y: 71}, 0),
				prize 			= Helper.makeBitmapImage('word_prize', { x: 75, y: 137}),
				prizeMask		= new createjs.Shape(),
				prizeAmount 	= Helper.makeBitmapImage(data[1], { x: 75, y: 138}, 0);

				clicky.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);

				maskContainer.name 	= "maskContainer";
				clickContainer.name	= "clickContainer";
				icon.name 			= "icon";
				iconReveal.name 	= "iconReveal";
				shimmer.name		= "shimmer";
				prize.name			= "prize";
				prizeAmount.name	= "prizeAmount";

			maskContainer.addChild(shimmer, shimmer2);
			clickContainer.addChild(icon, prize);

			container.addChild(winHighlight, iconReveal, prizeAmount, clickContainer, maskContainer);
			container.x = 190 + (self.getGap()*i);
			container.y = 25;
			container.num = i+1;


			gameContainer.addChild(container);

			var gameAssetFunctions = {"reveal": gameReveal}
			var gameAsset = new GameAsset(container, {isWinner: gameData.turn[i].w }, gameAssetFunctions);
				gameAsset.name = "gameAsset";

			gameAssetsArray.push(gameAsset);

			clickContainer.isRevealed = false;

			clickContainer.on("click", function(ev){
				Helper.stopPrompt();
				R.clickCount++;
				var obj = ev.currentTarget;

				if (obj.isRevealed === false){
					obj.isRevealed = true;
					if (obj.name === "shimmer"){
						return false;
					}

					while (obj.parent){
						if (typeof(obj.num) === "number"){
							break
						}
						obj = obj.parent;
					}

					if(gameAssetsArray[obj.num].getIsRevealed() == false){
						gameAssetsArray[obj.num].setIsRevealed(true);
						var container = gameAssetsArray[obj.num].getContainer();

						// remove maskContainer
						container.removeChild(container.getChildByName('maskContainer'));

						// set to revealed
						gameAssetsArray[obj.num].reveal("reveal", gameAssetsArray[obj.num], 0);
						createjs.Sound.play("Pop");
					}

					self.isFinished();
					self.checkMatchOneWin(gameAssetsArray[obj.num], gameData.turn[obj.num-1]);

				}

			}, null, true );

			self.setYourSymbols(gameAssetsArray);

		}

		gameContainer.addChild(winningContainer);
		self.getSlide().addChild(gameContainer);

    }

    /*/
    	sort turn data

    	@param 		d - turnData
    	return 		ar[icon, prize amount]
    /*/
    function sortTurnData(d, number){

    	var turnData 	= d.v.split("|"),
    		ar 			= [];

		var icon = null;
		if (number){
			icon = "game2_number" + turnData[0];
    	} else {
	    	icon = Helper.checkObject(R.GAME1REF, turnData[0]);
    	}
    	var prize =	Helper.checkObject(R.PRIZETABLE, turnData[1]);
    	ar = [icon, prize];

    	if (typeof(turnData) === "object"){
	      return ar;
    	} else {
    	  core.IWG.ame('error', {mess: ['turnData in game type "matchOne" could not be recognised']});
    	}

   }

	function gameReveal(){

		if (this.getContainer()){
			var container 		= this.getContainer(),
				obj 			= container.getChildByName('clickContainer').getChildByName('icon'),
				icon			= container.getChildByName('iconReveal'),
				cloneY 			= container.parent.y,
				cloneStartX 	= container.parent.x,
				cloneX 			= container.x,
				prize 			= container.getChildByName('clickContainer').getChildByName('prize'),
				prizeAmount 	= container.getChildByName('prizeAmount'),
				shinerArray 	= [];


			// clone of reveal icon
			var clone = obj.clone();
			clone.scaleX = clone.scaleY = 0;
			clone.y = cloneY + 71;
			clone.x = cloneStartX + container.x + clone.x;

			// make 6 shinnies which arc out once revealed
			for ( var i = 0; i <= 5; i++){
				var shiner = Helper.makeBitmapImage("shiner", {x: clone.x, y: clone.y}, 1);
				R.LEFTGAMEWINDOW.addChild(shiner);
				shinerArray.push(shiner);
			}

			TweenLite.to(shinerArray[0], 0.8, {bezier:[{x:clone.x, y:clone.y}, {x:clone.x-30, y:clone.y-30}, {x:clone.x-60, y:clone.y+30}], alpha: 0});
			TweenLite.to(shinerArray[1], 0.8, {bezier:[{x:clone.x, y:clone.y}, {x:clone.x-20, y:clone.y-40}, {x:clone.x-40, y:clone.y+30}], alpha: 0});
			TweenLite.to(shinerArray[2], 0.8, {bezier:[{x:clone.x, y:clone.y}, {x:clone.x-10, y:clone.y-50}, {x:clone.x-20, y:clone.y+30}], alpha: 0});
			TweenLite.to(shinerArray[3], 0.8, {bezier:[{x:clone.x, y:clone.y}, {x:clone.x+10, y:clone.y-50}, {x:clone.x+20, y:clone.y+30}], alpha: 0});
			TweenLite.to(shinerArray[4], 0.8, {bezier:[{x:clone.x, y:clone.y}, {x:clone.x+20, y:clone.y-40}, {x:clone.x+40, y:clone.y+30}], alpha: 0});
			TweenLite.to(shinerArray[5], 0.8, {bezier:[{x:clone.x, y:clone.y}, {x:clone.x+30, y:clone.y-30}, {x:clone.x+60, y:clone.y+30}], alpha: 0});

			TweenLite.to(obj, 0.3, {delay: 0, scaleY:0, scaleX: 0});
			TweenLite.to(icon, 0.3, { delay: 0, alpha: 1});
			TweenLite.to(clone, 0.3, {delay: 0, alpha: 0.8, scaleY:1.4, scaleX: 1.4, y: clone.y + 20});
			TweenLite.to(clone, 0.3, {delay: 0.15, alpha: 0});

			if (prize){
				TweenLite.to(prize, 0.3, {delay: 0.35, scaleY:0, scaleX: 0});
				TweenLite.to(prizeAmount, 0.3, {delay: 0.35, alpha: 1, onStart: function(){
					createjs.Sound.play("Pop");
				}});
			}
			setTimeout(function(){
				R.clickCount--;
				MEvent.RESETPROMPT.param = R.clickCount;
				iwg.IWGEM.dispatchEvent(MEvent.RESETPROMPT);
			}, 1000)


			R.LEFTGAMEWINDOW.addChild(clone);

		} else {
			 core.IWG.ame('error', {mess: ['couldnt get icon Container - error code 01a1']});
		}


	}

	function sortWinningIcon(self) {

		var gameID = self.getGameID();

		var iconCode 	= ticket.instance.getTicket().params[gameID],
			icon 		= null;

		if (self.getIsTicketTypeNumber()){
			icon = "game2_number" + iconCode;
		} else {
			icon = Helper.checkObject(self.getIcons(), iconCode);
		}

		return icon;

	}

	MatchOne.prototype.checkMatchOneWin = function(asset, turnData) {

		var prize 		= turnData.v.split("|")[1],
			container 	= asset.getContainer(),
			isWinner = turnData.w,
			bankAmount = prize,
			assetArray = this.getYourSymbols();

		// if winning symbol is NOT revealed Bank the winning goes if they have been revealed
		if(assetArray[0].getIsRevealed() === false){

			if (isWinner === '1'){
				core.IWG.ame('bank', {deposit: [prize], log: true});
				var bank = this.getWinningBank();
				bank.push(asset);
				this.setWinningBank(bank);

			}

		} else {

			if (isWinner === '1'){
				// bank amount
				core.IWG.ame('bank', {deposit: [prize], log: true});

				var highlight = container.children[0];
				var highlightTimeline = new TimelineMax({delay:1, repeat:4, yoyo:true, onStart: makeWinSound});
				highlightTimeline.to(highlight, 0.7, {alpha: 1, ease: "easeIn" })
			}
		}
	}

	function makeWinSound(){
		createjs.Sound.play("glossy_success_19");
	}

	MatchOne.prototype.checkReveals = function() {
		var assets = this.getWinningBank();

		for(var asset in assets){

			var container = assets[asset].getContainer();

			var highlight = container.children[0];
			var highlightTimeline = new TimelineMax({delay:1, repeat:4, yoyo:true, onStart: makeWinSound});
				highlightTimeline.to(highlight, 0.7, {alpha: 1, ease: "easeIn" })

		}
	}

	MatchOne.prototype.isFinished = function() {

		var array 		= this.getYourSymbols(),
			allRevealed = false;

		for(var symbol in array){

			if(array[symbol].getIsRevealed() === false){
				allRevealed = false;
				break;
			} else {
				allRevealed = true;
			}


		}
		// checks to see if all assets have been revealed inc winnnig symbol
		if (allRevealed){
			// once this game has finished
			// set class to isFinished
			this.setIsFinished(true);
			// fire event to check all games in mainGame class
			iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);

		}

	}

    //namespace path
    iwg._class("iwg.lib.MatchOne", MatchOne);

}(window));
