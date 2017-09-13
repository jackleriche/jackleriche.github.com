//High Stakes

var gameStage = new createjs.Stage(game); //tied to the canvas called "game"
var screenX = game.width;
var screenY = game.height;

/**
  *
  * Variables
  *
  **/

var ticketRaw;

var highImageManifest	= [	{id:"sSheet",src:"img/highstakes.png"},{id:"JSON",src:"img/highstakes.json"}];
var highSoundManifest	= [	{id:"clickSnd",src:"snd/click.mp3"},{id:"deckChooseSnd",src:"snd/deck choose.mp3"},{id:"boardRevealSnd",src:"snd/board reveal.mp3"},{id:"playerChooseSnd",src:"snd/player choose.mp3"},{id:"lineWinSnd",src:"snd/linewin.mp3"},{id:"endWinSnd",src:"snd/endgamewin.mp3"}];
var lowImageManifest 	= [ {id:"sSheet",src:"img/highstakes.png"},{id:"JSON",src:"img/highstakes.json"}];

var ticket = new Object();
var banked = 0.00;

/**
  *
  * Containers / Arrays
  *
  **/

var bgCont = new createjs.Container();
var gameCont = new createjs.Container();
var maskerCont = new createjs.Container();

var bgDisplay = new Object();
var gameSets = new Object();
var soundObj = new Object();

/**
  *
  * Functions
  *
  **/

function preLoad() {
  	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(30);

	escapeIWLoader.scaleOrient.setSize();
	escapeIWLoader.scaleOrient.startResizeHandler();

	escapeIWLoader.overlayMasker.setMaskerColour("#122217");
	escapeIWLoader.overlayMasker.mask();

	escapeIWLoader.preloader.setQualityEnabled(false);
	escapeIWLoader.preloader.setTouch(true);
	escapeIWLoader.preloader.setTicketFile({id:"ticketFromFile",src:"ticket.xml", type:createjs.LoadQueue.XML});
	escapeIWLoader.preloader.setManifests(highImageManifest,highSoundManifest,lowImageManifest);
	escapeIWLoader.preloader.startPreload();
}
function start(){
	ticketRaw = escapeIWLoader.preloader.getPreloaderResults("ticketFromFile");
	ssImage = escapeIWLoader.preloader.getPreloaderResults("sSheet");
	sSheetJSON = escapeIWLoader.preloader.getPreloaderResults("JSON");
	sSheetJSON.images = [ssImage];

	readTicketInfo();
	if(validateTicket()){
		gameStage.enableMouseOver();

		gameStage.addChild(bgCont);
		gameStage.addChild(gameCont);
		gameStage.addChild(maskerCont);

		highstakes.setup.background();
		if(escapeIWLoader.preloader.getQuality() == "high"){
			highstakes.setup.createSoundInstances();
		}

		highstakes.setup.displayGames();
		highstakes.setup.landingScreen();
	} else {
		//error
	}
}
function readTicketInfo() {
	var tagnames = ["row0","row1","row2","row3","row4","row5"];
	var suitAttributes = ["c0s","c1s","c2s","c3s","c4s","c5s"];
	var valueAttributes = ["c0v","c1v","c2v","c3v","c4v","c5v"];
	var rowPrizeAttributes = ["r0","r1","r2","r3","r4","r5"];
	var colPrizeAttributes = ["c0","c1","c2","c3","c4","c5"];
	ticket.prizeAmount	= parseInt(escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"outcome",0,"amount"));
	ticket.prizeTier	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"outcome",0,"prizeTier");
	ticket.winToken		= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"params",0,"wT");
	ticket.board = new Array();
	for(var i = 0; i < 6; i++){
		ticket.board[i] = new Array();
		for(var j = 0; j < 6; j++){
			ticket.board[i][j] = new Object();
			ticket.board[i][j].suit = escapeIWLoader.commonFunctions.getTicketData(ticketRaw,tagnames[i],0,suitAttributes[j]);
			ticket.board[i][j].value = escapeIWLoader.commonFunctions.getTicketData(ticketRaw,tagnames[i],0,valueAttributes[j]);
		}
	}
	ticket.turns = new Array();
	ticket.rowPrizes = new Array();
	ticket.colPrizes = new Array();
	for(var k = 0; k < 6; k++){
		ticket.turns[k] = new Object();
		ticket.turns[k].value = escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",k,"v");
		ticket.turns[k].win = escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",k,"w");

		ticket.rowPrizes[k] = parseInt(escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"prizes",0,rowPrizeAttributes[k]));
		ticket.colPrizes[k] = parseInt(escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"prizes",0,colPrizeAttributes[k]));
	}

}
function validateTicket() {//if ticket is valid return true else return false and invokeError.
	return true;
}

function tick(){
	highstakes.game.updateTimer();
	gameStage.update();
}

var highstakes = highstakes || {};
highstakes.setup = (function(){
	var self = new Object();
	self.fadeTime = 15;
	self.cols = null;
	self.rows = null;

	self.background = function(){
		bgDisplay.background	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,0,0,"bg_withoutglow","stop","left","top",1);
		bgDisplay.chosenDeck	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,850,60,"card_red","stop","center","center",1);
		bgDisplay.chosenDeck.rotation = -45;
		bgDisplay.shoe 			= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,850,0,"shoe","stop","center","top",1);
		bgDisplay.endgameMasker = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,640,"endgame_blackout","stop","center","bottom",0);
		bgDisplay.logosmall		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,520,"logo_small","stop","center","center",1);
		bgDisplay.cardChooseText= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,850,520,"goleft_choose","stop","center","center",0);
		bgDisplay.cardChooseS	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,909,492,"goesleft_s","stop","center","center",0);
		bgDisplay.cardChooseNum = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,867,514,"goesleft6","stop","center","center",0);

		bgDisplay.jokerCard		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,151,365,"joker","stop","center","center",0);
		bgDisplay.jokerCard.rotation = 27.5;
		bgDisplay.mainDarken	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,0,0,"game_glow","stop","left","top",1);

		bgCont.addChild(bgDisplay.background);
		bgCont.addChild(bgDisplay.chosenDeck);
		bgCont.addChild(bgDisplay.shoe);

		maskerCont.addChild(bgDisplay.endgameMasker);
		maskerCont.addChild(bgDisplay.logosmall);

		bgCont.addChild(bgDisplay.cardChooseText);
		bgCont.addChild(bgDisplay.cardChooseS);
		bgCont.addChild(bgDisplay.cardChooseNum);

		bgCont.addChild(bgDisplay.jokerCard);
		bgCont.addChild(bgDisplay.mainDarken);
	};
	self.displayGames = function(){
		gameSets.game = new Array();
		var colX = [300,375,450,525,600,675];
		var rowY = [75,145,215,285,355,425];
		var choiceCardRots = [20,15,10,5,0,-5,-10,-15,-20]
		var choiceCardXPos = [210,275,340,410,480,550,620,690,755];
		var choiceCardYPos = [545,565,580,590,593,590,580,565,545];
		for(var i = 0; i < 6; i++){
			gameSets.game[i] = new Array();
			for(var j = 0; j < 6; j++){
				gameSets.game[i][j] = new Object();
				gameSets.game[i][j].positioner 	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,colX[i],rowY[j],"positioner","stop","center","center",1);
				gameSets.game[i][j].card 		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,colX[i],rowY[j],ticket.board[i][j].value.toString() + "_" + ticket.board[i][j].suit.toString(),"stop","center","center",1);
				gameSets.game[i][j].revealed	= false;
				gameSets.game[i][j].winShown	= false;
				gameCont.addChild(gameSets.game[i][j].positioner);
				gameCont.addChild(gameSets.game[i][j].card);
			}
		}
		bgDisplay.playerChoice = new Array();
		for(var k = 0; k < 9; k++){
			bgDisplay.playerChoice[k] = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,choiceCardXPos[k],choiceCardYPos[k],"card_red","stop","center","center",0);
			bgDisplay.playerChoice[k].rotation = choiceCardRots[k];
			bgDisplay.playerChoice[k].cardNum = k;
			bgDisplay.playerChoice[k].hasBeenClicked = false;
			gameCont.addChild(bgDisplay.playerChoice[k]);
		}
		gameSets.tColPrizes = new Array();
		gameSets.bColPrizes = new Array();
		gameSets.lRowPrizes = new Array();
		gameSets.rRowPrizes = new Array();

		for(var l = 0; l < 6; l++){
			gameSets.tColPrizes[l] = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,colX[l],30,"prize"+ticket.colPrizes[l],"stop","center","center",1);
			gameSets.bColPrizes[l] = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,colX[l],470,"prize"+ticket.colPrizes[l],"stop","center","center",1);
			gameSets.lRowPrizes[l] = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,270,rowY[l],"prize"+ticket.rowPrizes[l],"stop","right","center",1);
			gameSets.rRowPrizes[l] = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,705,rowY[l],"prize"+ticket.rowPrizes[l],"stop","left","center",1);

			gameCont.addChild(gameSets.tColPrizes[l]);
			gameCont.addChild(gameSets.bColPrizes[l]);
			gameCont.addChild(gameSets.lRowPrizes[l]);
			gameCont.addChild(gameSets.rRowPrizes[l]);
		}
	};
	self.landingScreen = function(){
		bgDisplay.chooseDarken 	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,0,0,"choose_blackout","stop","left","top",1);
		bgDisplay.chooselogo	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,50,"logo_big","stop","center","center",1);
		bgDisplay.chooseGreen	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,310,300,"choose_green","stop","center","center",1);
		bgDisplay.chooseRed		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,300,"choose_red","stop","center","center",1);
		bgDisplay.chooseBlue	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,650,300,"choose_blue","stop","center","center",1);
		bgDisplay.chooseInstr	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,400,"choose_instructions","stop","center","center",1);

		maskerCont.addChild(bgDisplay.chooseDarken);
		maskerCont.addChild(bgDisplay.chooselogo);
		maskerCont.addChild(bgDisplay.chooseGreen);
		maskerCont.addChild(bgDisplay.chooseRed);
		maskerCont.addChild(bgDisplay.chooseBlue);
		maskerCont.addChild(bgDisplay.chooseInstr);

		bgDisplay.chooseGreen.on("click",self.handleChooseClick,null,true,"green");
		bgDisplay.chooseRed.on("click",self.handleChooseClick,null,true,"red");
		bgDisplay.chooseBlue.on("click",self.handleChooseClick,null,true,"blue");
	};
	self.handleChooseClick = function(evt,colour){
		if(escapeIWLoader.preloader.getQuality() == "high"){
			soundObj.deckChoose.play();
		}
		bgDisplay.chooseGreen.removeAllEventListeners();
		bgDisplay.chooseRed.removeAllEventListeners();
		bgDisplay.chooseBlue.removeAllEventListeners();
		highstakes.game.setPlayerColourChoice(colour);
		self.recolourCards();
		self.fadeCards();
	};
	self.recolourCards = function(){
		bgDisplay.chosenDeck.gotoAndStop("card_"+highstakes.game.getPlayerColourChoice());
		for(var i = 0; i < 9; i++){
			bgDisplay.playerChoice[i].gotoAndStop("card_"+highstakes.game.getPlayerColourChoice()+"_reveal");
		}
	};
	self.fadeCards = function(){
		switch(highstakes.game.getPlayerColourChoice()){
			case "green":
				createjs.Tween.get(bgDisplay.chooseGreen,{useTicks:true}).wait(self.fadeTime).to({alpha:0},self.fadeTime);
				createjs.Tween.get(bgDisplay.chooseRed,{useTicks:true}).to({alpha:0},self.fadeTime);
				createjs.Tween.get(bgDisplay.chooseBlue,{useTicks:true}).to({alpha:0},self.fadeTime);
			break;
			case "red":
				createjs.Tween.get(bgDisplay.chooseGreen,{useTicks:true}).to({alpha:0},self.fadeTime);
				createjs.Tween.get(bgDisplay.chooseRed,{useTicks:true}).wait(self.fadeTime).to({alpha:0},self.fadeTime);
				createjs.Tween.get(bgDisplay.chooseBlue,{useTicks:true}).to({alpha:0},self.fadeTime);
			break;
			case "blue":
				createjs.Tween.get(bgDisplay.chooseGreen,{useTicks:true}).to({alpha:0},self.fadeTime);
				createjs.Tween.get(bgDisplay.chooseRed,{useTicks:true}).to({alpha:0},self.fadeTime);
				createjs.Tween.get(bgDisplay.chooseBlue,{useTicks:true}).wait(self.fadeTime).to({alpha:0},self.fadeTime);
			break;
		}
		createjs.Tween.get({},{useTicks:true}).wait(0).call(self.transitionToGame);
	};
	self.transitionToGame = function(){
		createjs.Tween.get(bgDisplay.chooselogo,{useTicks:true}).wait(3*self.fadeTime).to({alpha:0},self.fadeTime);
		createjs.Tween.get(bgDisplay.chooseInstr,{useTicks:true}).to({alpha:0},self.fadeTime);
		createjs.Tween.get(bgDisplay.chooseDarken,{useTicks:true}).wait(3*self.fadeTime).to({alpha:0},self.fadeTime);
		createjs.Tween.get(bgDisplay.chosenDeck,{useTicks:true}).wait(3*self.fadeTime).to({x:808,y:102},3*self.fadeTime).wait(0).call(function(){
			for(var i = 0; i < 9; i++){
				createjs.Tween.get(bgDisplay.playerChoice[i],{useTicks:true}).to({alpha:1},2*self.fadeTime);
			}
			createjs.Tween.get(bgDisplay.cardChooseText,{useTicks:true}).to({alpha:1},2*self.fadeTime);
			createjs.Tween.get(bgDisplay.cardChooseS,{useTicks:true}).to({alpha:1},2*self.fadeTime);
			createjs.Tween.get(bgDisplay.cardChooseNum,{useTicks:true}).to({alpha:1},2*self.fadeTime);
			createjs.Tween.get({},{useTicks:true}).wait(3*self.fadeTime).call(function(){
				self.mouseListeners();
			});
		});
	};
	self.mouseListeners = function(){
		for(var i = 0; i < 9; i++){
			bgDisplay.playerChoice[i].on("click",function(){ highstakes.game.playerClick(this.cardNum);},null,true);
		}
	};
	self.createSoundInstances = function(){
		soundObj.isMuted = false;
		soundObj.click 			= new createjs.Sound.createInstance("clickSnd");
		soundObj.boardReveal 	= new createjs.Sound.createInstance("boardRevealSnd");
		soundObj.playerChoose 	= new createjs.Sound.createInstance("playerChooseSnd");
		soundObj.deckChoose 	= new createjs.Sound.createInstance("deckChooseSnd");
		soundObj.lineWin 		= new createjs.Sound.createInstance("lineWinSnd");
		soundObj.endWin 		= new createjs.Sound.createInstance("endWinSnd");
	};
	self.setRCArrays = function(){
		self.cols = [
			[gameSets.game[0][0], gameSets.game[0][1], gameSets.game[0][2], gameSets.game[0][3], gameSets.game[0][4], gameSets.game[0][5]],
			[gameSets.game[1][0], gameSets.game[1][1], gameSets.game[1][2], gameSets.game[1][3], gameSets.game[1][4], gameSets.game[1][5]],
			[gameSets.game[2][0], gameSets.game[2][1], gameSets.game[2][2], gameSets.game[2][3], gameSets.game[2][4], gameSets.game[2][5]],
			[gameSets.game[3][0], gameSets.game[3][1], gameSets.game[3][2], gameSets.game[3][3], gameSets.game[3][4], gameSets.game[3][5]],
			[gameSets.game[4][0], gameSets.game[4][1], gameSets.game[4][2], gameSets.game[4][3], gameSets.game[4][4], gameSets.game[4][5]],
			[gameSets.game[5][0], gameSets.game[5][1], gameSets.game[5][2], gameSets.game[5][3], gameSets.game[5][4], gameSets.game[5][5]]
		];
		self.rows = [
			[gameSets.game[0][0], gameSets.game[1][0], gameSets.game[2][0], gameSets.game[3][0], gameSets.game[4][0], gameSets.game[5][0]],
			[gameSets.game[0][1], gameSets.game[1][1], gameSets.game[2][1], gameSets.game[3][1], gameSets.game[4][1], gameSets.game[5][1]],
			[gameSets.game[0][2], gameSets.game[1][2], gameSets.game[2][2], gameSets.game[3][2], gameSets.game[4][2], gameSets.game[5][2]],
			[gameSets.game[0][3], gameSets.game[1][3], gameSets.game[2][3], gameSets.game[3][3], gameSets.game[4][3], gameSets.game[5][3]],
			[gameSets.game[0][4], gameSets.game[1][4], gameSets.game[2][4], gameSets.game[3][4], gameSets.game[4][4], gameSets.game[5][4]],
			[gameSets.game[0][5], gameSets.game[1][5], gameSets.game[2][5], gameSets.game[3][5], gameSets.game[4][5], gameSets.game[5][5]]
		];
		return [self.rows,self.cols];
	};
	var returnable = new Object();

	returnable.background = function(){self.background();};
	returnable.displayGames = function(){self.displayGames();};
	returnable.landingScreen = function(){self.landingScreen();};
	returnable.createSoundInstances = function(){self.createSoundInstances();};
	returnable.getRCArrays = function(){return self.setRCArrays();};

	return returnable;
})()


highstakes.game = (function(){
	var self = new Object();
	self.fadeTime = 15;
	self.colourChosen = false;
	self.playerColourChoice = "red";
	self.turnsTaken = 0;
	self.idleTimer = 150;
	self.rows = null;
	self.cols = null;
	self.revealedRows = [false,false,false,false,false,false];
	self.revealedCols = [false,false,false,false,false,false];
	self.rrf = new Array();
	self.crf = new Array();
	self.highlightQueue = new Array();
	self.highlightQueueActive = false;
	self.turnsRemainingChars = ["","goesleft5","goesleft4","goesleft3","goesleft2","goesleft1","goesleft0"];

	self.turnValue = new Array();
	self.clickedCards = new Array();
	self.valueQueue = new Array();
	self.playerClickRevealed = [false,false,false,false,false,false];
	self.ticketAssoc = ["joker","one","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king","clubs","diamonds","hearts","spades"];
	self.revealedList = new Array();
	self.turnCount = 0;
	self.turnQueue = new Array();
	self.turnQueueActive = false;
	self.valueQuantities = [0,0,0,0,0,0];
	self.fadeQueue = new Array();

	self.setPlayerColourChoice = function(colour){
		if(colour == "red" || colour == "blue" || colour == "green"){
			self.playerColourChoice = colour;
		} else {
			self.playerColourChoice = "red";
		}
		self.addPlayerCardListeners();
		self.colourChosen = true;
	};
	self.addPlayerCardListeners = function(){
		for(var i = 0; i < 9; i++){
			bgDisplay.playerChoice[i].on("mouseover",function(evt,i){self.idleTimer = 150; bgDisplay.playerChoice[i].scaleX = 1.1; bgDisplay.playerChoice[i].scaleY = 1.1;},null,false,[i]);
			bgDisplay.playerChoice[i].on("mouseout",function(evt,i){self.idleTimer = 150; bgDisplay.playerChoice[i].scaleX = 1; bgDisplay.playerChoice[i].scaleY = 1;},null,false,[i]);
		}
	};
	self.clicks = function(cardNum){
		var temp = ticket.turns[self.turnsTaken].value;
		switch(temp){
			case "0":
				temp = "joker";
			break;
			case "1":
				temp = "a";
			break;
			case "11":
				temp = "j";
			break;
			case "12":
				temp = "q";
			break;
			case "13":
				temp = "k";
			break;
			case "14":
				temp = "c";
			break;
			case "15":
				temp = "d";
			break;
			case "16":
				temp = "h";
			break;
			case "17":
				temp = "s";
			break;
			default:
				temp = ticket.turns[self.turnsTaken].value;
			break;
		}
		self.turnValue.push(temp);
		self.clickedCards.push(cardNum);
		self.turnsTaken++;
		if(self.clickedCards.length == 6 && self.turnsTaken == 6){
			for(var i = 0; i < 9; i++){
				if(self.clickedCards.indexOf(i) == -1){
					bgDisplay.playerChoice[i].removeAllEventListeners();
					bgDisplay.playerChoice[i].gotoAndStop("card_"+self.playerColourChoice+"_dimmed");
					escapeIWLoader.commonFunctions.adjustXRegPoint(bgDisplay.playerChoice[i],"center");
					escapeIWLoader.commonFunctions.adjustYRegPoint(bgDisplay.playerChoice[i],"center");
				}
			}
		}
		bgDisplay.cardChooseNum.gotoAndStop(self.turnsRemainingChars[self.turnsTaken]);
		if(bgDisplay.cardChooseNum.currentAnimation == "goesleft1"){
			bgDisplay.cardChooseS.alpha = 0;
		} else {
			bgDisplay.cardChooseS.alpha = 1;
		}
		bgDisplay.playerChoice[cardNum].hasBeenClicked = true;
		createjs.Tween.get(bgDisplay.playerChoice[cardNum],{useTicks:true}).to({scaleX:1,scaleY:1},self.fadeTime);
		bgDisplay.playerChoice[cardNum].gotoAndPlay("card_"+self.playerColourChoice+"_reveal");
		bgDisplay.playerChoice[cardNum].on("animationend",function(evt,input){
			bgDisplay.playerChoice[cardNum].gotoAndStop(self.ticketAssoc[ticket.turns[input].value]);
			bgDisplay.playerChoice[cardNum].x += 5;
			bgDisplay.playerChoice[cardNum].y += 5;
			bgDisplay.playerChoice[cardNum].removeAllEventListeners();
			self.playerClickRevealed[input] = true;
			var turnQueueTemp = null;
			for(var j = 0; j < 6; j++){
				for (var k = 0; k <6; k++){
					turnQueueTemp = gameSets.game[j][k].card.currentAnimation.split("_");
					if(turnQueueTemp.indexOf(self.turnValue[input]) != -1 && self.turnQueue.indexOf(gameSets.game[j][k]) == -1){
						self.turnQueue.push(gameSets.game[j][k]);
						self.valueQuantities[input]++;
					}
				}
			}
			if(!self.turnQueueActive){
				self.handleTurnQueue(input);
				self.turnQueueActive = true;
			}
		},null,true,self.turnsTaken-1);
	};
	self.handleTurnQueue = function(input){
		if(self.turnQueue.length > 0){
			createjs.Tween.get(self.turnQueue[0].card,{useTicks:true}).wait(0).to({scaleX:1.1,scaleY:1.1},self.fadeTime,createjs.Ease.bounceOut).call(function(){
				self.turnQueue[0].card.gotoAndPlay("card_"+self.playerColourChoice+"_reveal_board");
				escapeIWLoader.commonFunctions.adjustXRegPoint(self.turnQueue[0].card,"center");
				escapeIWLoader.commonFunctions.adjustYRegPoint(self.turnQueue[0].card,"center");
				if(escapeIWLoader.preloader.getQuality() == "high"){
					soundObj.boardReveal.play();
				}
				self.turnQueue[0].card.on("animationend",function(){
					self.turnQueue[0].card.stop();
					self.fadeQueue.push(self.turnQueue[0]);
					self.turnQueue.shift();
					if(self.fadeQueue.length > 0 && self.fadeQueue.length >= self.valueQuantities[input]){
						self.fadeCards(input);
					} else {
						self.handleTurnQueue(input);
						self.rowColChecker();
					}
				});
			});
		} else {
			self.rowColChecker();
			self.turnQueueActive = false;
			if(self.turnsTaken == 6 && self.turnCount==6){
				self.endChecker();
			}
		}
	};
	self.fadeCards = function(input){
		for (var i = 0; i < self.valueQuantities[input]; i++){
			createjs.Tween.get(self.fadeQueue[0].card,{useTicks:true}).to({scaleX:0,scaleY:0,alpha:0},self.fadeTime);
			self.fadeQueue[0].revealed = true;
			self.fadeQueue.shift();
		}
		createjs.Tween.get({},{useTicks:true}).wait(self.fadeTime+1).call(function(){
			self.turnCount++;
			createjs.Tween.get({},{useTicks:true}).wait(5).call(function(){
				self.rowColChecker();
				self.handleTurnQueue(self.turnCount);
			});
		});
	};
	self.rowColChecker = function(){
		temp = highstakes.setup.getRCArrays();

		self.rows = temp[0];
		self.cols = temp[1];

		for(var i = 0; i < 6; i++){
			self.rrf[i] = new Array();
			self.crf[i] = new Array();
			for(var j = 0; j <6; j++){
				self.rrf[i].push(self.rows[i][j].revealed);
				self.crf[i].push(self.cols[i][j].revealed);
			}
		}

		for (var k = 0; k  < 6; k++){
			if(self.rrf[k].indexOf(false) == -1 && !self.revealedRows[k]){
				self.revealedRows[k] = true;
				self.highlightQueue.push(["row",k]);
			}
			if(self.crf[k].indexOf(false) == -1 && !self.revealedCols[k]){
				self.revealedCols[k] = true;
				self.highlightQueue.push(["col",k]);
			}
		}
		if(!self.highlightQueueActive){
			createjs.Tween.get({},{useTicks:true}).wait(2).call(self.highlightQueueHandler);
			self.highlightQueueActive = true;
		}
	};
	self.highlightQueueHandler = function(){
		self.highlightQueueActive = true;
		if(self.highlightQueue.length > 0){
			var temp0 = self.highlightQueue[0][0];
			var temp1 = self.highlightQueue[0][1];
			createjs.Tween.get({},{useTicks:true}).wait(5).call(function(){
				self.winHighlight(temp0,temp1);
				createjs.Tween.get({},{useTicks:true}).wait(5).call(function(){
					self.highlightQueue.shift();
					if(self.highlightQueue.length > 0){
						self.highlightQueueHandler();
					} else {
						self.highlightQueueActive = false;
					}
				});
			});
		} else {
			self.highlightQueueActive = false;
		}
	};
	self.winHighlight = function(rC,index){
		if(rC == undefined || index == undefined){
			escapeIWLoader.errorInvoker.invokeError("wH incorrect params");
			return;
		} else {
			if(escapeIWLoader.preloader.getQuality() == "high"){
				soundObj.lineWin.play();
			}
			if(rC == "col"){
				for(var i = 0; i < self.cols[index].length; i++){
					createjs.Tween.get(self.cols[index][i].positioner,{useTicks:true}).to({alpha:0},5).call(function(index,i){
						self.cols[index][i].positioner.gotoAndStop("positioner_win");
						escapeIWLoader.commonFunctions.adjustXRegPoint(self.cols[index][i].positioner,"center");
						escapeIWLoader.commonFunctions.adjustYRegPoint(self.cols[index][i].positioner,"center");
						createjs.Tween.get(self.cols[index][i].positioner,{useTicks:true}).to({alpha:1},5).to({alpha:0},10).to({alpha:1},10).to({alpha:0},10).to({alpha:1},10);
					self.cols[index][i].winShown = true;
					},[index,i],this);
					createjs.Tween.get(gameSets.tColPrizes[index],{useTicks:true}).to({alpha:0},5).call(function(index,i){
						gameSets.tColPrizes[index].gotoAndStop("prize_w"+ticket.colPrizes[index]);
						escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets.tColPrizes[index],"center");
						escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets.tColPrizes[index],"center");
						createjs.Tween.get(gameSets.tColPrizes[index],{useTicks:true}).to({alpha:1},5).to({alpha:0},10).to({alpha:1},10).to({alpha:0},10).to({alpha:1},10);
					},[index,i],this);
					createjs.Tween.get(gameSets.bColPrizes[index],{useTicks:true}).to({alpha:0},5).call(function(index,i){
						gameSets.bColPrizes[index].gotoAndStop("prize_w"+ticket.colPrizes[index]);
						escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets.bColPrizes[index],"center");
						escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets.bColPrizes[index],"center");
						createjs.Tween.get(gameSets.bColPrizes[index],{useTicks:true}).to({alpha:1},5).to({alpha:0},10).to({alpha:1},10).to({alpha:0},10).to({alpha:1},10);
					},[index,i],this);
				}
				banked += ticket.colPrizes[index];
			} else if(rC == "row"){
				for(var i = 0; i < self.rows[index].length; i++){
					createjs.Tween.get(self.rows[index][i].positioner,{useTicks:true}).to({alpha:0},5).call(function(index,i){
						self.rows[index][i].positioner.gotoAndStop("positioner_win");
						escapeIWLoader.commonFunctions.adjustXRegPoint(self.rows[index][i].positioner,"center");
						escapeIWLoader.commonFunctions.adjustYRegPoint(self.rows[index][i].positioner,"center");
						createjs.Tween.get(self.rows[index][i].positioner,{useTicks:true}).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5);
						self.rows[index][i].winShown = true;
					},[index,i]);
					createjs.Tween.get(gameSets.lRowPrizes[index],{useTicks:true}).to({alpha:0},5).call(function(index,i){
						gameSets.lRowPrizes[index].gotoAndStop("prize_w"+ticket.rowPrizes[index]);
						escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets.lRowPrizes[index],"right");
						escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets.lRowPrizes[index],"center");
						createjs.Tween.get(gameSets.lRowPrizes[index],{useTicks:true}).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5);
					},[index,i]);
					createjs.Tween.get(gameSets.rRowPrizes[index],{useTicks:true}).to({alpha:0},5).call(function(index,i){
						gameSets.rRowPrizes[index].gotoAndStop("prize_w"+ticket.rowPrizes[index]);
						escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets.rRowPrizes[index],"left");
						escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets.rRowPrizes[index],"center");
						createjs.Tween.get(gameSets.rRowPrizes[index],{useTicks:true}).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5).to({alpha:0},5).to({alpha:1},5);
					},[index,i]);
				}
				banked += ticket.rowPrizes[index];

			} else {
				escapeIWLoader.errorInvoker.invokeError("wH rC incorrect");
			}
		}
		self.queueActive = false;
		self.highlightQueueActive = false;
		if(self.turnsTaken > 5){
			createjs.Tween.get({},{useTicks:true}).wait(2*self.fadeTime).call(self.endChecker);
		}
	};
	self.endChecker = function(){
		if(banked <= ticket.prizeAmount){
			if(self.turnsTaken >= 6){
				if(self.highlightQueue.length == 0){
					if(self.turnQueue.length == 0){
						if(banked == ticket.prizeAmount){
							 createjs.Tween.get({},{useTicks:true}).wait(3*self.fadeTime).call(self.endGameAnimation);
						} else {
							escapeIWLoader.errorInvoker.invokeError("banked != ticket:"+ banked+" "+ticket.prizeAmount);
						}
					} else {
						createjs.Tween.get({},{useTicks:true}).wait(15).call(function(){
							for(var i = 0; i < 6; i++){
								self.rrf[i] = new Array();
								self.crf[i] = new Array();
								for(var j = 0; j <6; j++){
									self.rrf[i].push(self.rows[i][j].revealed);
									self.crf[i].push(self.cols[i][j].revealed);
								}
							}
							createjs.Tween.get({},{useTicks:true}).wait(15).call(self.endChecker);
						});
					}
				}
			}
		} else {
			escapeIWLoader.errorInvoker.invokeError("banked > ticket");
		}
	};
	self.endGameAnimation = function(){
		var messageChoice = "end_lose";
		var prize = "end_try";
		switch(ticket.winToken){
			case "0":
				messageChoice = "end_lose";
				prize = "end_try";
			break;
			case "1":
				messageChoice = "endgame_congrats";
				soundObj.endWin.play();
				prize = "win" + parseInt(ticket.prizeAmount);
			break;
		}

		bgDisplay.message = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480, 555, messageChoice,"stop","center","center",0);
		bgDisplay.prize = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,580, prize,"stop","center","center",0);
		bgDisplay.endGameButton = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,480,615,"button_finish","stop","center","center",0);

		maskerCont.addChild(bgDisplay.message);
		maskerCont.addChild(bgDisplay.prize);
		maskerCont.addChild(bgDisplay.endGameButton);

		createjs.Tween.get(bgDisplay.endgameMasker,{useTicks:true}).to({alpha:1},2*self.fadeTime);
		createjs.Tween.get(bgDisplay.message,{useTicks:true}).to({alpha:1},3*self.fadeTime);
		createjs.Tween.get(bgDisplay.prize,{useTicks:true}).to({alpha:1},3*self.fadeTime);

		createjs.Tween.get(bgDisplay.endGameButton,{useTicks:true}).wait(4*self.fadeTime).to({alpha:1},2*self.fadeTime).call(function(){
			bgDisplay.endGameButton.on("mouseover",self.handleEndGameButtonOver);
			bgDisplay.endGameButton.on("mouseout",self.handleEndGameButtonOut);
			bgDisplay.endGameButton.on("click",function(){if(escapeIWLoader.preloader.getQuality() == "high"){soundObj.click.play();}window.location = "www.sideplay.com/portfolio/game/49/High%20Stakes";},null,true);
		});
	};
	self.idleAnim = function(){
		for(var i = 0; i < 9; i++){
			if(!bgDisplay.playerChoice[i].hasBeenClicked && self.colourChosen){
				createjs.Tween.get(bgDisplay.playerChoice[i],{useTicks:true}).to({scaleX:1.1,scaleY:1.1},10).wait(5).to({scaleX:1,scaleY:1},10);
			}
		}
	};
	self.updateTimer = function(){
		if(self.turnsTaken < 6){
			self.idleTimer--;
			if(self.idleTimer <= 0 ){
				self.idleAnim();
				self.idleTimer = 50;
			}
		} else {
			for(var i = 0; i < 9; i++){
				createjs.Tween.get(bgDisplay.playerChoice[i],{useTicks:true}).to({scaleX:1,scaleY:1},self.fadeTime);
			}
		}
	};
	self.handleEndGameButtonOver = function(){bgDisplay.endGameButton.gotoAndStop("button_finish_over")};
	self.handleEndGameButtonOut = function(){bgDisplay.endGameButton.gotoAndStop("button_finish")};

	var returnable = new Object();
	returnable.setPlayerColourChoice = function(colour){self.setPlayerColourChoice(colour);};
	returnable.getPlayerColourChoice = function(colour){return self.playerColourChoice;};
	returnable.playerClick = function(cardNum){
		if(escapeIWLoader.preloader.getQuality() == "high"){
			soundObj.playerChoose.play();
		}
		self.clicks(cardNum);
	};
	returnable.updateTimer = function(){self.updateTimer();};
	return returnable;
})()
