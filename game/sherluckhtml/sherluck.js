//Sherluck

var gameStage = new createjs.Stage(game); //tied to the canvas called "game"
var screenX = game.width;
var screenY = game.height;

/**
  *
  * Variables
  *
  **/

var ticketRaw;

var highImageManifest = [	{id:"sSheet",src:"img/sherluck.png"},{id:"JSON",src:"img/sherluck.json"},{id:"sSheetStamp",src:"img/stamp.png"},{id:"JSONStamp",src:"img/stamp.json"},
							{id:"sSheetSign",src:"img/sign_swing.png"},{id:"JSONSign",src:"img/sign_swing.json"},{id:"sSheetChar0",src:"img/char_0.png"},{id:"sSheetChar1",src:"img/char_1.png"},
							{id:"sSheetChar2",src:"img/char_2.png"},{id:"sSheetChar3",src:"img/char_3.png"},{id:"JSONChar",src:"img/char.json"}];
var highSoundManifest = [	{id:"clickSnd",src:"snd/click.mp3"},{id:"aha01Snd",src:"snd/aha01.mp3"},{id:"aha02Snd",src:"snd/aha02.mp3"},{id:"backgroundSnd",src:"snd/background.mp3"},
							{id:"creakSnd",src:"snd/DOOR CRACKING 10.mp3"},{id:"doubleSnd",src:"snd/double.mp3"},{id:"elementarySnd",src:"snd/elementary.mp3"},
							{id:"endloseSnd",src:"snd/end lose.mp3"},{id:"endWinSnd",src:"snd/end win.mp3"},{id:"hmm01Snd",src:"snd/hmm01.mp3"},{id:"hmm02Snd",src:"snd/hmm02.mp3"},
							{id:"prizerevealSnd",src:"snd/prizereveal.mp3"},{id:"revealSnd",src:"snd/reveal.mp3"},{id:"rowWinSnd",src:"snd/row win.mp3"}];
var lowImageManifest = [{id:"sSheet",src:"img/sherluck.png"},{id:"JSON",src:"img/sherluck.json"}];

var ticket = new Object();
var banked = 0.00;
var characterAnimCountdown = 200;
var signSoundCountdown = 200;

/**
  *
  * Containers / Arrays
  *
  **/

var bgCont = new createjs.Container();
var gameCont = new createjs.Container();
var maskerCont = new createjs.Container();

var bgDisplay = new Object();
var gameSets = new Array();
var soundObj = new Object();

/**
  *
  * Functions
  *
  **/

function preLoad() {
  	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(30);

	escapeIWLoader.scaleOrient.setWidthHeight(700,500,700,500);
	escapeIWLoader.scaleOrient.setSize();
	escapeIWLoader.scaleOrient.startResizeHandler();

	escapeIWLoader.overlayMasker.setMaskerColour("#234567");
	escapeIWLoader.overlayMasker.setBoundaries(700,500);
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

	if(escapeIWLoader.preloader.getQuality() == "high"){
		ssImageStamp = escapeIWLoader.preloader.getPreloaderResults("sSheetStamp");
		sSheetJSONStamp = escapeIWLoader.preloader.getPreloaderResults("JSONStamp");
		sSheetJSONStamp.images = [ssImageStamp];

		ssImageSign = escapeIWLoader.preloader.getPreloaderResults("sSheetSign");
		sSheetJSONSign = escapeIWLoader.preloader.getPreloaderResults("JSONSign");
		sSheetJSONSign.images = [ssImageSign];

		ssImageChar0 = escapeIWLoader.preloader.getPreloaderResults("sSheetChar0");
		ssImageChar1 = escapeIWLoader.preloader.getPreloaderResults("sSheetChar1");
		ssImageChar2 = escapeIWLoader.preloader.getPreloaderResults("sSheetChar2");
		ssImageChar3 = escapeIWLoader.preloader.getPreloaderResults("sSheetChar3");
		sSheetJSONChar = escapeIWLoader.preloader.getPreloaderResults("JSONChar");
		sSheetJSONChar.images = [ssImageChar0, ssImageChar1, ssImageChar2, ssImageChar3];
	}

	readTicketInfo();
	if(validateTicket()){
		gameStage.enableMouseOver();

		gameStage.addChild(bgCont);
		gameStage.addChild(gameCont);
		gameStage.addChild(maskerCont);

		sherluck.setup.background();
		if(escapeIWLoader.preloader.getQuality() == "high"){
			sherluck.setup.createSoundInstances();
			sherluck.setup.backgroundLoop();
		}

		sherluck.setup.displayGames();
		sherluck.setup.landingScreen();
	} else {
		//error
	}
}
function readTicketInfo() {
	ticket.prizeAmount	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"outcome",0,"amount");
	ticket.prizeTier	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"outcome",0,"prizeTier");
	ticket.winToken		= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"params",0,"wT");
	ticket.turns 		= new Array();

	for(var i = 0; i < 7; i++) {
		ticket.turns[i] = new Object();
		ticket.turns[i].p 	= parseInt(escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",i,"p"));
		ticket.turns[i].s0 	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",i,"s0");
		ticket.turns[i].s1 	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",i,"s1");
		ticket.turns[i].d 	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",i,"d");
		ticket.turns[i].w 	= escapeIWLoader.commonFunctions.getTicketData(ticketRaw,"turn",i,"w");
	}
}
function validateTicket() {//if ticket is valid return true else return false and invokeError.
	return true;
}

function tick(){
	if(escapeIWLoader.preloader.getQuality() == "high"){
		if(bgDisplay.character != undefined){
			characterAnimCountdown--;
			if(characterAnimCountdown <= 0){
				sherluck.setup.startCharacterAnim();
				characterAnimCountdown = 150;
			}
		}
		if(soundObj.creak != undefined && !sherluck.game.getEndGameStatus()){
			signSoundCountdown--;
			if(signSoundCountdown <= 0){
				soundObj.creak.play();
				signSoundCountdown = 100;
				signSoundCountdown += Math.floor(Math.random() * 240);
			}
		}
	}
	gameStage.update();
}

var sherluck = sherluck || {};
sherluck.setup = (function(){
	var self = new Object();
	self.gameXLoc = [110,130,150,170,332,352,372];
	self.gameYLoc = [60, 173,287,404,105,218,331];
	self.characterAnims = ["camera","blink","headshake","smile","inspect"];

	self.background = function(){
		bgDisplay.background = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,0,0,"bg_stripped","stop","left","top",1);
		bgDisplay.characterShadow = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,460,475,"char_shadow","stop","center","center",1);

		if(escapeIWLoader.preloader.getQuality() == "high"){
			bgDisplay.character = escapeIWLoader.commonFunctions.createSprites(sSheetJSONChar,695,833,"all","stop","center","bottom",1);
			bgDisplay.sign = escapeIWLoader.commonFunctions.createSprites(sSheetJSONSign,580,83,"swing","play","left","top",1);
			bgDisplay.signPlain = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,582,18,"sign_plain","stop","center","top",0);
			bgDisplay.signText = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,585,32,"sign_logo","stop","center","top",0);
		} else {
			bgDisplay.character = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,590,670,"char_3_main","stop","center","bottom",1);
			bgDisplay.sign = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,582,18,"sign_plain","stop","center","top",1);
			bgDisplay.signText = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,585,32,"sign_logo","stop","center","top",1);
		}
		bgDisplay.finishButton = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,587,115,"button_finish","stop","center","center",0);
		bgDisplay.grain = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,0,0,"cover_grain","stop","left","top",0.25);
		bgDisplay.instructions = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,350,450,"instruction","stop","center","top",1);

		bgCont.addChild(bgDisplay.background);
		bgCont.addChild(bgDisplay.characterShadow);
		bgCont.addChild(bgDisplay.character);
		bgCont.addChild(bgDisplay.sign);

		if(escapeIWLoader.preloader.getQuality() == "high"){
			bgCont.addChild(bgDisplay.signPlain);
		}
		bgCont.addChild(bgDisplay.signText);
		bgCont.addChild(bgDisplay.finishButton);
		bgCont.addChild(bgDisplay.grain);
		bgCont.addChild(bgDisplay.instructions);

		//darkener
		bgDisplay.darkener = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,0,0,"cover_grain","stop","left","top",1);
		//start button
		bgDisplay.startButton = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,350,250,"button_start","stop","center","center",1);
	};
	self.displayGames = function(){
		sherluck.game.setNewEvidenceNums(escapeIWLoader.commonFunctions.randomiseArray(sherluck.game.getEvidenceNums()));
		//[doubler,folder,evidence0,evidence1,prizeText,stamp]
		var adjustX = [13,0, -50,-10, 50, 174];
		var adjustY = [0,0,  10,  5,  0, 65];
		for(var i = 0; i < 7; i++){
			gameSets[i] = new Object();

			gameSets[i].winHighlight	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON, self.gameXLoc[i] + adjustX[1], self.gameYLoc[i] + adjustY[1],"folder","stop","center","center",0);
			gameSets[i].doublerPopup	= escapeIWLoader.commonFunctions.createSprites(sSheetJSON, self.gameXLoc[i] + adjustX[0], self.gameYLoc[i] + adjustY[0],"doubler_sheet","stop","center","center",1);
			gameSets[i].folder			= escapeIWLoader.commonFunctions.createSprites(sSheetJSON, self.gameXLoc[i] + adjustX[1], self.gameYLoc[i] + adjustY[1],"folder","stop","center","center",1);
			gameSets[i].evidence0		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON, self.gameXLoc[i] + adjustX[2], self.gameYLoc[i] + adjustY[2],"magnifier","stop","center","center",1);
			gameSets[i].evidence1		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON, self.gameXLoc[i] + adjustX[3], self.gameYLoc[i] + adjustY[3],"magnifier","stop","center","center",1);
			gameSets[i].prizeText		= escapeIWLoader.commonFunctions.createSprites(sSheetJSON, self.gameXLoc[i] + adjustX[4], self.gameYLoc[i] + adjustY[4],"word_prize","stop","center","center",1);

			if(escapeIWLoader.preloader.getQuality() == "high"){
				gameSets[i].stamp		= escapeIWLoader.commonFunctions.createSprites(sSheetJSONStamp, self.gameXLoc[i] + adjustX[5], self.gameYLoc[i] + adjustY[5],"reveal","stop","center","center",1);
			}
			gameSets[i].prizeText.isRevealed = false;

			gameCont.addChild(gameSets[i].winHighlight);
			gameCont.addChild(gameSets[i].doublerPopup);
			gameCont.addChild(gameSets[i].folder);
			gameCont.addChild(gameSets[i].evidence0);
			gameCont.addChild(gameSets[i].evidence1);
			gameCont.addChild(gameSets[i].prizeText);
			if(escapeIWLoader.preloader.getQuality() == "high"){
				gameCont.addChild(gameSets[i].stamp);
			}
		}
		var gameText = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,20, 15,"game_labels","stop","left","top",1);
		gameCont.addChild(gameText);
	};
	self.landingScreen = function(){
		maskerCont.addChild(bgDisplay.darkener,bgDisplay.startButton);

		bgDisplay.startButton.on("click",self.handleStartButtonClick,null, true);
		bgDisplay.startButton.on("mouseover",self.handleStartButtonMouseOver);
		bgDisplay.startButton.on("mouseout",self.handleStartButtonMouseOut);
		self.startButtonAnimation();
	};
	self.handleStartButtonClick = function(){
		if(escapeIWLoader.preloader.getQuality() == "high"){
			soundObj.startButton.play();
		}
		bgDisplay.startButton.removeAllEventListeners();
		createjs.Tween.get(bgDisplay.startButton,{useTicks:true}).to({alpha:0},15);
		createjs.Tween.get(bgDisplay.darkener,{useTicks:true}).to({alpha:0},15).wait(2).call(self.mouseListeners);
	};
	self.handleStartButtonMouseOver = function(){bgDisplay.startButton.gotoAndStop("button_start_over");};
	self.handleStartButtonMouseOut = function(){bgDisplay.startButton.gotoAndStop("button_start");};
	self.startButtonAnimation = function(){
		createjs.Tween.get(bgDisplay.startButton,{useTicks:true}).to({scaleX:1.1,scaleY:1.1},15).wait(2).to({scaleX:1,scaleY:1},15).wait(2).call(self.startButtonAnimation);
	};
	self.createSoundInstances = function(){
		soundObj.isMuted = false;
		soundObj.startButton = new createjs.Sound.createInstance("clickSnd");
		soundObj.aha01 = new createjs.Sound.createInstance("aha01Snd");
		soundObj.aha02 = new createjs.Sound.createInstance("aha02Snd");
		soundObj.bg = new createjs.Sound.createInstance("backgroundSnd");
		soundObj.creak = new createjs.Sound.createInstance("creakSnd");
		soundObj.doubler = new createjs.Sound.createInstance("doubleSnd");
		soundObj.elementary = new createjs.Sound.createInstance("elementarySnd");
		soundObj.endLose = new createjs.Sound.createInstance("endloseSnd");
		soundObj.endWin = new createjs.Sound.createInstance("endWinSnd");
		soundObj.hmm01 = new createjs.Sound.createInstance("hmm01Snd");
		soundObj.hmm02 = new createjs.Sound.createInstance("hmm02Snd");
		soundObj.prizeReveal = new createjs.Sound.createInstance("prizerevealSnd");
		soundObj.reveal = new createjs.Sound.createInstance("revealSnd");
		soundObj.rowWin = new createjs.Sound.createInstance("rowWinSnd");
	};
	self.mouseListeners = function(){
		for(var i = 0; i < 7; i++){
			gameSets[i].evidence0.on("click",sherluck.game.associateTurns,null,true,[i,"evidence0"]);
			gameSets[i].evidence1.on("click",sherluck.game.associateTurns,null,true,[i,"evidence1"]);
			gameSets[i].prizeText.on("click",sherluck.game.associateTurns,null,true,[i,"prizeText"]);
		}
	};
	self.characterAnim = function(){
		if(!sherluck.game.getEndGameStatus()){
			self.characterAnims = escapeIWLoader.commonFunctions.randomiseArray(self.characterAnims);
			bgDisplay.character.gotoAndPlay(self.characterAnims[0]);
			bgDisplay.character.on("animationend",self.handleCharacterAnimEnd,null,true);
		} else {
			self.handleCharacterAnimEnd();
		}
	};
	self.handleCharacterAnimEnd = function(){
		bgDisplay.character.gotoAndStop("all");
	};
	self.stopCharacterAnim = function(){};
	self.backgroundLoop = function(){
		soundObj.bg.play();
		soundObj.bg.on("complete",self.backgroundLoop,null,true);
	};

	var returnable = new Object();

	returnable.background = function(){self.background();};
	returnable.displayGames = function(){self.displayGames();};
	returnable.landingScreen = function(){self.landingScreen();};
	returnable.createSoundInstances = function(){self.createSoundInstances();};
	returnable.getGameXLoc = function(){return self.gameXLoc};
	returnable.getGameYLoc = function(){return self.gameYLoc};
	returnable.startCharacterAnim = function(){self.characterAnim();};
	returnable.backgroundLoop = function(){self.backgroundLoop();};

	return returnable;
})()
sherluck.game = (function(){
	var self = new Object();
	self.turnGameAssoc = [-1,-1,-1,-1,-1,-1,-1];
	self.triggeredGames = [false,false,false,false,false,false,false];
	self.turnsTaken = 0;
	self.evidenceName = ["symbol_book","symbol_dagger","symbol_footprint","symbol_gun","symbol_key","symbol_lipstick","symbol_matches","symbol_pipe","symbol_poison","symbol_rope"];
	self.evidenceNums = [0,1,2,3,4,5,6,7,8,9];
	self.newEvidenceNums = new Array();
	self.revealedCount = 0;
	self.endGameTriggered = false;
	self.doublerImage = "symbol_print";
	self.fadeTime = 15;
	self.revealedFlags = [[false,false],[false,false],[false,false],[false,false],[false,false],[false,false],[false,false]];
	self.checked = [false,false,false,false,false,false,false];
	self.glowArray = [];

	self.associateTurns = function(evt,arr){//associate turn with game. turnGameAssoc array index increments turns from tickets, values are games.
		if((self.turnGameAssoc[self.turnsTaken]) == -1 && (self.triggeredGames[arr[0]] == false)) {
			self.triggeredGames[arr[0]] = true;
			self.turnGameAssoc[self.turnsTaken] = arr[0];
			self.turnsTaken++;
		}
		self.revealEvidence(arr[0],arr[1]);
	};
	self.revealEvidence = function(game,target){
		var evidenceXAdjust = [0,0,0,0,0, 0,0,0,0,0];
		var evidenceYAdjust = [0,0,0,0,0, 0,0,0,0,0];

		switch(target){
			case "evidence0":
				if(escapeIWLoader.preloader.getQuality() == "high"){
					soundObj.reveal.play();
				}
				createjs.Tween.get(gameSets[game].evidence0,{useTicks:true}).to({alpha:0},self.fadeTime).wait(self.fadeTime).call(function(){
					if(ticket.turns[self.turnGameAssoc.indexOf(game)].s0 == "s"){
						gameSets[game].evidence0.gotoAndStop(self.doublerImage);
					} else {
						gameSets[game].evidence0.gotoAndStop(self.evidenceName[self.newEvidenceNums[ticket.turns[self.turnGameAssoc.indexOf(game)].s0]]);
						gameSets[game].evidence0.x += evidenceXAdjust[self.evidenceName.indexOf(gameSets[game].evidence0.currentAnimation)];
						gameSets[game].evidence0.y += evidenceYAdjust[self.evidenceName.indexOf(gameSets[game].evidence0.currentAnimation)];
					}
					escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets[game].evidence0,"center");
					escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets[game].evidence0,"center");
					self.revealedFlags[game][0] = true;
					createjs.Tween.get(gameSets[game].evidence0,{useTicks:true}).to({alpha:1},self.fadeTime);
				});
				self.revealedCount++;
			break;
			case "evidence1":
				if(escapeIWLoader.preloader.getQuality() == "high"){
					soundObj.reveal.play();
				}
				createjs.Tween.get(gameSets[game].evidence1,{useTicks:true}).to({alpha:0},self.fadeTime).wait(self.fadeTime).call(function(){
					if(ticket.turns[self.turnGameAssoc.indexOf(game)].s1 == "s"){
						gameSets[game].evidence1.gotoAndStop(self.doublerImage);
					} else {
						gameSets[game].evidence1.gotoAndStop(self.evidenceName[self.newEvidenceNums[ticket.turns[self.turnGameAssoc.indexOf(game)].s1]]);
						gameSets[game].evidence1.x += evidenceXAdjust[self.evidenceName.indexOf(gameSets[game].evidence1.currentAnimation)];
						gameSets[game].evidence1.y += evidenceYAdjust[self.evidenceName.indexOf(gameSets[game].evidence1.currentAnimation)];
					}
					escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets[game].evidence1,"center");
					escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets[game].evidence1,"center");
					self.revealedFlags[game][1] = true;
					createjs.Tween.get(gameSets[game].evidence1,{useTicks:true}).to({alpha:1},self.fadeTime);
				});
				self.revealedCount++;
			break;
			case "prizeText":
				gameSets[game].prizeText.isRevealed = true;
				self.revealPrizeAmounts(gameSets[game].prizeText, game);
				self.revealedCount++;
			break;
		}
		createjs.Tween.get({},{useTicks:true}).wait(4*self.fadeTime).call(function(){
			if(self.revealedFlags[game][0] && self.revealedFlags[game][1]){
				if(!self.checked[game]){
					self.winCheck(game);
				}
			}
		});
	};
	self.revealPrizeAmounts = function(target, game){
		if(escapeIWLoader.preloader.getQuality() == "high"){

			var ticks = 0;
			gameSets[game].stamp.gotoAndPlay("reveal");
			gameSets[game].stamp.on("tick",function(){
				ticks++;
				if(ticks == 17){
					self.revealPrizeAmountSwitch(target,game);
					soundObj.prizeReveal.play();
				}
			});
			gameSets[game].stamp.on("animationend",function(){gameSets[game].stamp.gotoAndStop("all"); gameSets[game].stamp.removeAllEventListeners();});
		} else {
			createjs.Tween.get(target, {useTicks:true}).to({alpha:0},self.fadeTime).call(function(){
				self.revealPrizeAmountSwitch(target,game);
				createjs.Tween.get(target, {useTicks:true}).to({alpha:1},self.fadeTime);
			});
		}
	};
	self.revealPrizeAmountSwitch = function(target,game){
		switch(ticket.turns[self.turnGameAssoc.indexOf(game)].p){
			case 2:
				target.gotoAndStop("prize2");
			break;
			case 4:
				target.gotoAndStop("prize4");
			break;
			case 5:
				target.gotoAndStop("prize5");
			break;
			case 10:
				target.gotoAndStop("prize10");
			break;
			case 20:
				target.gotoAndStop("prize20");
			break;
			case 40:
				target.gotoAndStop("prize40");
			break;
			case 80:
				target.gotoAndStop("prize80");
			break;
			case 1000:
				target.gotoAndStop("prize1000");
			break;
			case 2000:
				target.gotoAndStop("prize2000");
			break;
			case 80000:
				target.gotoAndStop("prize80000");
			break;
			default:
				escapeIWLoader.errorInvoker.invokeError("Prize value not found!");
			break;
		}
		escapeIWLoader.commonFunctions.adjustXRegPoint(target,"center");
		escapeIWLoader.commonFunctions.adjustYRegPoint(target,"center");
	};
	self.revealDoubles = function(game){
		//pop the "double" note up. change and reveal double text value.
		createjs.Tween.get({},{useTicks:true}).wait(self.fadeTime).call(function(){
			createjs.Tween.get(gameSets[game].prizeText).to({alpha:0},self.fadeTime).call(function(){

				if(escapeIWLoader.preloader.getQuality() == "high"){
					soundObj.doubler.play();
				}
				switch(gameSets[game].prizeText.currentAnimation){
					case "prize2":
						gameSets[game].prizeText.gotoAndStop("prize4d");
					break;
					case "prize5":
						gameSets[game].prizeText.gotoAndStop("prize10d");
					break;
					case "prize10":
						gameSets[game].prizeText.gotoAndStop("prize20d");
					break;
					case "prize20":
						gameSets[game].prizeText.gotoAndStop("prize40d");
					break;
					case "prize40":
						gameSets[game].prizeText.gotoAndStop("prize80d");
					break;
					case "prize80":
						gameSets[game].prizeText.gotoAndStop("prize160d");
					break;
					default:
						escapeIWLoader.errorInvoker.invokeError("Doubled value not found");
					break;
				}
				escapeIWLoader.commonFunctions.adjustXRegPoint(gameSets[game].prizeText,"center");
				escapeIWLoader.commonFunctions.adjustYRegPoint(gameSets[game].prizeText,"center");
				createjs.Tween.get(gameSets[game].prizeText,{useTicks:true}).to({alpha:1},self.fadeTime);
				createjs.Tween.get(gameSets[game].doublerPopup,{useTicks:true}).wait(2*self.fadeTime).to({y:gameSets[game].doublerPopup.y -33},self.fadeTime,createjs.Ease.bounceOut);
			});
		});
	};
	self.winCheck = function(game){
		self.checked[game] = true;
		if(!gameSets[game].prizeText.isRevealed){
			//console.log("Revealing PA.");
			self.revealPrizeAmounts(gameSets[game].prizeText, game);
		}

		createjs.Tween.get({},{useTicks:true}).wait(2*self.fadeTime).call(function(){
			if(ticket.turns[self.turnGameAssoc.indexOf(game)].s0 == ticket.turns[self.turnGameAssoc.indexOf(game)].s1){
				//console.log("Match found!");
				self.winHighlight(game);
				if(ticket.turns[self.turnGameAssoc.indexOf(game)].d == 1 && ticket.turns[self.turnGameAssoc.indexOf(game)].s0 == "s" && ticket.turns[self.turnGameAssoc.indexOf(game)].s1 == "s"){
					//console.log("Double Found!");
					self.revealDoubles(game);
				}
				if(ticket.turns[self.turnGameAssoc.indexOf(game)].d == 0){
					if(escapeIWLoader.preloader.getQuality() == "high"){
						switch(Math.floor(Math.random()*4)){
							case 0:
								soundObj.aha01.play();
								soundObj.aha01.on("complete",function(){soundObj.rowWin.play();},null,true);
							break;
							case 1:
								soundObj.aha02.play();
								soundObj.aha02.on("complete",function(){soundObj.rowWin.play();},null,true);
							break;
							case 2:
								soundObj.hmm01.play();
								soundObj.hmm01.on("complete",function(){soundObj.rowWin.play();},null,true);
							break;
							case 3:
								soundObj.hmm02.play();
								soundObj.hmm02.on("complete",function(){soundObj.rowWin.play();},null,true);
							break;
						}
					}

					//short delay, bank
					createjs.Tween.get({},{useTicks:true}).wait(2*self.fadeTime).call(function(){
						banked += ticket.turns[self.turnGameAssoc.indexOf(game)].p;
					});
				} else {
					//long delay, bank
					createjs.Tween.get({},{useTicks:true}).wait(6*self.fadeTime).call(function(){
						banked += 2*ticket.turns[self.turnGameAssoc.indexOf(game)].p;
					});
				}
				createjs.Tween.get({},{useTicks:true}).wait(8*self.fadeTime).call(function(){
					if(banked > ticket.prizeAmount){
						escapeIWLoader.errorInvoker.invokeError("Banked > ticket: ", banked," > ",ticket.prizeAmount);
					} else {
						if(self.checked.indexOf(false) == -1){
							if(!self.endGameTriggered){
								//console.log("All checked, ending game.");
								createjs.Tween.get({},{useTicks:true}).wait(2*self.fadeTime).call(self.launchEndGame);
								self.endGameTriggered = true;
							}
						}
					}
				});
			}
		});
	};
	self.winHighlight = function(game){
		gameSets[game].winHighlight.filters = [new createjs.ColorMatrixFilter(new createjs.ColorMatrix().adjustBrightness(255))];
		gameSets[game].winHighlight.cache(0,0,gameSets[game].winHighlight.spriteSheet._frames[gameSets[game].winHighlight.currentFrame].rect.width,gameSets[game].winHighlight.spriteSheet._frames[gameSets[game].winHighlight.currentFrame].rect.height);
		gameSets[game].winHighlight.scaleX = 1;
		gameSets[game].winHighlight.scaleY = 1;
		self.glowArray.push(game);
		if(self.glowArray.length ==1){
			self.winHighlightPulse();
		}
	};
	self.winHighlightPulse = function(){
		for(var i = 0; i < self.glowArray.length; i++){
			createjs.Tween.get(gameSets[self.glowArray[i]].winHighlight,{useTicks:true}).to({scaleX:1.05,scaleY:1.1,alpha:1},self.fadeTime).wait(2).to({scaleX:1,scaleY:1},self.fadeTime);
		}
		createjs.Tween.get({},{useTicks:true}).wait((2*self.fadeTime)+5).call(self.winHighlightPulse);
	};
	self.launchEndGame = function(){
		self.endGameTriggered = true;

		if(escapeIWLoader.preloader.getQuality() == "high"){
			bgDisplay.sign.on("animationend",function(){
				bgDisplay.sign.gotoAndStop("all");
				bgDisplay.sign.alpha = 0;
				bgDisplay.signPlain.alpha = 1;
				bgDisplay.signText.alpha = 1;
				self.endGame();
			},null,true);
		} else {
			self.endGame();
		}
	};
	self.endGame = function(){
		createjs.Tween.get(bgDisplay.signText,{useTicks:true}).to({alpha:0},self.fadeTime).call(function(){
			if(ticket.winToken == 1){
				bgDisplay.signText.gotoAndStop("end_congrats");
				bgDisplay.signText.x += 5;
				bgDisplay.signText.y += 7;
				bgDisplay.wonValue = escapeIWLoader.commonFunctions.createSprites(sSheetJSON,580,90,"","stop","center","center",0);
				switch(parseInt(ticket.prizeAmount)){
					case 2:
						bgDisplay.wonValue.gotoAndStop("end2");
					break;
					case 4:
						bgDisplay.wonValue.gotoAndStop("end4");
					break;
					case 5:
						bgDisplay.wonValue.gotoAndStop("end5");
					break;
					case 10:
						bgDisplay.wonValue.gotoAndStop("end10");
					break;
					case 20:
						bgDisplay.wonValue.gotoAndStop("end20");
					break;
					case 40:
						bgDisplay.wonValue.gotoAndStop("end40");
					break;
					case 80:
						bgDisplay.wonValue.gotoAndStop("end80");
					break;
					case 160:
						bgDisplay.wonValue.gotoAndStop("end160");
					break;
					case 1000:
						bgDisplay.wonValue.gotoAndStop("end1000");
					break;
					case 2000:
						bgDisplay.wonValue.gotoAndStop("end2000");
					break;
					case 80000:
						bgDisplay.wonValue.gotoAndStop("end80000");
					break;
					default:
						escapeIWLoader.errorInvoker.invokeError("Prize amount not valid");
					break;
				}
				escapeIWLoader.commonFunctions.adjustXRegPoint(bgDisplay.wonValue,"center");
				escapeIWLoader.commonFunctions.adjustYRegPoint(bgDisplay.wonValue,"center");
				bgCont.addChild(bgDisplay.wonValue);

				createjs.Tween.get(bgDisplay.signText,{useTicks:true}).to({alpha:1},self.fadeTime);
				createjs.Tween.get(bgDisplay.wonValue,{useTicks:true}).to({alpha:1},self.fadeTime).call(function(){
					if(escapeIWLoader.preloader.getQuality() == "high"){
						soundObj.elementary.play();
						soundObj.elementary.on("complete",function(){
							createjs.Tween.get({},{useTicks:true}).wait(2).call(function(){
								soundObj.endWin.play();
							});
						},null,true);
					}
				});
			} else {
				bgDisplay.signText.gotoAndStop("end_lose");
				bgDisplay.signText.x += 35;
				bgDisplay.signText.y += 17;
				if(escapeIWLoader.preloader.getQuality() == "high"){
					soundObj.endLose.play();
				}
			}
		});
		createjs.Tween.get(bgDisplay.finishButton,{useTicks:true}).to({alpha:1},3*self.fadeTime).call(function(){
			bgDisplay.finishButton.on("click",function(){
				top.location.href = "http://www.sideplay.com/portfolio/game/48/Sherluck%20Scratch";
			},null,true);
			bgDisplay.finishButton.on("mouseover",self.handleFinishButtonMouseOver);
			bgDisplay.finishButton.on("mouseout",self.handleFinishButtonMouseOut);
			createjs.Tween.get({},{useTicks:true}).wait(30).call(self.finishButtonAnimation);
		});
	};
	self.finishButtonAnimation = function(){createjs.Tween.get(bgDisplay.finishButton,{useTicks:true}).to({scaleX:1.1,scaleY:1.1},self.fadeTime).wait(2).to({scaleX:1,scaleY:1},self.fadeTime).call(self.finishButtonAnimation)};
	self.handleFinishButtonMouseOver = function(){bgDisplay.finishButton.gotoAndStop("button_finish_over");};
	self.handleFinishButtonMouseOut = function(){bgDisplay.finishButton.gotoAndStop("button_finish");};
	self.handleFinishButtonClick = function(){};

	var returnable = new Object();
	returnable.associateTurns = function(evt,arr){self.associateTurns(evt,arr);};
	returnable.getEvidenceNums = function(){return self.evidenceNums};
	returnable.getNewEvidenceNums = function(){return self.newEvidenceNums};
	returnable.setNewEvidenceNums = function(arr){self.newEvidenceNums = arr;};
	returnable.getEndGameStatus = function(){return self.endGameTriggered;};
	return returnable;
})()
