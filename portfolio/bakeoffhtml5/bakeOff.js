//Bake Off

/**
  *
  * Window Setup
  *
  **/

var gameStage = new createjs.Stage(game); //tied to the canvas called "game"
var screenX = game.width;
var screenY = game.height;

/**
  *
  * Variables
  *
  **/

var ticketRaw;

var imageManifest = [{id:"sSheet",src:"img/bakeOff.png"},{id:"JSON",src:"img/bakeOff.json"},{id:"sSheetChar",src:"img/character2_0.png"},{id:"sSheetChar1",src:"img/character2_1.png"},{id:"JSONChar",src:"img/character2.json"}];
var soundManifest = [{id:"endWinSnd",src:"snd/end win.mp3"},{id:"endLoseSnd",src:"snd/end lose.mp3"},{id:"dblSnd",src:"snd/double.mp3"},{id:"lineWinSnd",src:"snd/line win.mp3"},{id:"prizeRevealSnd",src:"snd/prize reveal.mp3"},{id:"revealSnd",src:"snd/reveal.mp3"},{id:"introSnd",src:"snd/intro.mp3"},{id:"clickSnd",src:"snd/click.mp3"},{id:"kissSnd",src:"snd/kiss.mp3"}];
var ticket = new Object();
var sndButton;
var banked = 0.00;

var foodName = ["cake2","cake3","cake4","cake5","cake6","cake7","cake8","cake9"];
var foodNums = [0,1,2,3,4,5,6,7]; //may replace with food names. will still shuffle.
var newFoodNums = new Array();
var turnGameAssoc = [-1,-1,-1,-1,-1,-1,-1];
var triggeredGames = [false,false,false,false,false,false,false];
var turnsTaken = 0;
var revealedCount = 0;
var pulseTime = 0;
var preventPulse = false;
var fpsCheck = 0;
var fpsCheckEnabled = false;
var endGameTriggered = false;
var characterAnimTrigger = 0;
/**
  *
  * Containers / Arrays
  *
  **/

var bgCont = new createjs.Container();
var gameCont = new createjs.Container();
var maskerCont = new createjs.Container();

var bgDisplay = new Array();
var gameSets = new Array();
var soundObj = new Object();

/**
  *
  * Functions
  *
  **/

function preLoad() {//preloader
	setSize();
	loadingLabel = new createjs.Text("", "15px Tahoma", "#000000");
	loadingLabel.lineWidth = 200;
	loadingLabel.textAlign = "center";
	loadingLabel.x = screenX/2;
	loadingLabel.y = screenY/2;
	loadingBarCont = new createjs.Container();
	loadingBarHeight = 20;
	loadingBarWidth = 300;
	loadingBarColour = createjs.Graphics.getRGB(255,255,255);
	loadingBar = new createjs.Shape();
	loadingBar.graphics.beginFill(loadingBarColour).drawRect(0,0,1,loadingBarHeight).endFill();
	frame = new createjs.Shape();
	padding = 3;
	frame.graphics.setStrokeStyle(1).beginStroke(loadingBarColour).drawRect(-padding/2, -padding/2, loadingBarWidth+padding, loadingBarHeight+padding);
	loadingBarCont.addChild(loadingBar, frame);
	loadingBarCont.x = Math.round(screenX/2 - loadingBarWidth/2);
	loadingBarCont.y = screenY/2;
	gameStage.addChild(loadingBarCont);gameStage.addChild(loadingLabel);

	preLoader = new createjs.LoadQueue(false);
	preLoader.installPlugin(createjs.Sound);
	createjs.Sound.alternateExtensions = ["ogg"];
	preLoader.on("complete", handleComplete);
	preLoader.on("progress", handleProgress);
	preLoader.on("error", handleError);

	preLoader.loadManifest(imageManifest,false);
	preLoader.loadManifest(soundManifest,false);
	preLoader.loadFile({id:"ticketFromFile",src:"ticket.xml", type:createjs.LoadQueue.XML});

	createjs.Ticker.addEventListener("tick", tick); //ticker for the preload area
	createjs.Ticker.setFPS(30);
}
function handleProgress() {//progressbar
	loadingBar.scaleX = preLoader.progress * loadingBarWidth;
	progressPercent = Math.round(preLoader.progress*100);
	loadingLabel.text = progressPercent + "% Loaded";
	console.log("Preloaded: ",progressPercent,"%");
	gameStage.update();
}
function handleError(info) {
	console.log("Preload Error: ",info);
	createjs.Ticker.removeAllEventListeners();
	if(info.text == "FILE_LOAD_ERROR"){
		invokeError(info.text + ": " + info.item.id);
	} else {
		invokeError("Unknown.");
	}
}
function handleComplete(event) {

	console.log("Preload Complete.");
	ticketRaw = preLoader.getResult("ticketFromFile");

	ssImage = preLoader.getResult("sSheet");
	sSheetJSON = preLoader.getResult("JSON");
	sSheetJSON.images = [ssImage];

	charSSImage = preLoader.getResult("sSheetChar");
	charSSImage1 = preLoader.getResult("sSheetChar1");
	charSSheetJSON = preLoader.getResult("JSONChar");
	charSSheetJSON.images = [charSSImage,charSSImage1];

	createjs.Touch.enable(gameStage);
	start();

}
function tick() {
	if(gameSets[0] != undefined && !preventPulse) {
		pulseTime++;
		if(pulseTime > 105 && gameSets[0]!= undefined && !preventPulse) {
			//inactivePulse();
		}
	}
	if(fpsCheckEnabled) {
		fpsCheck++;
		if(fpsCheck >= 60) {
			if(createjs.Ticker.getMeasuredFPS() > 10) {
				//console.log("FPS > 10");
			} else {
				//console.log("FPS less than 10");
				invokeError("FPS");
			}
			fpsCheck =0;
		}
	}
	characterAnimTrigger++;
	if(bgDisplay[2] != undefined && characterAnimTrigger > 190) {
		characterAnim();
	}
	gameStage.update();
}
function characterAnim() {
	var anims = ["shrug","smile", "wink","kiss"];
	if(!endGameTriggered){
		if(characterAnimTrigger > 200) {
			anims = randomizeArray(anims);
			bgDisplay[2].gotoAndPlay(anims[0]);
			bgDisplay[2].on("animationend",handleAnimEnd,null,true);
			characterAnimTrigger = -10;
			if(bgDisplay[2].currentAnimation == "kiss"){
				soundObj.kiss.play();
			}
		}
	} else {
		handleAnimEnd();
	}
	function handleAnimEnd() {
		bgDisplay[2].gotoAndStop("all");
	}
}
function start() {
	readTicketInfo();
	if(validateTicket()) {
		gameStage.enableMouseOver();
		gameStage.removeChild(loadingBarCont, loadingLabel);

		var gameXLoc = [240,480,720,120,360,600,840];
		var gameYLoc = [426-30,426-30,426-30,533-30,533-30,533-30,533-30];

		gameStage.addChild(bgCont);
		gameStage.addChild(gameCont);
		gameStage.addChild(maskerCont);

		background();
		createSoundInstances();
		soundObj.intro.play();
		displayGames();
		landingScreen();

		function createSoundInstances() {
			//soundObj.backgroundMusic = new createjs.Sound.createInstance("bg");
			soundObj.endLose = new createjs.Sound.createInstance("endLoseSnd");
			soundObj.endWin = new createjs.Sound.createInstance("endWinSnd");
			soundObj.double = new createjs.Sound.createInstance("dblSnd");
			soundObj.lineWin = new createjs.Sound.createInstance("lineWinSnd");
			soundObj.prizeReveal = new createjs.Sound.createInstance("prizeRevealSnd");
			soundObj.reveal = new createjs.Sound.createInstance("revealSnd");
			soundObj.intro = new createjs.Sound.createInstance(""/*"introSnd*/);
			soundObj.startButton = new createjs.Sound.createInstance("clickSnd");
			soundObj.kiss = new createjs.Sound.createInstance("kissSnd");
			soundObj.isMuted = false;
		}
		function landingScreen(){
			gameCont.addChild(bgDisplay[3],bgDisplay[4]);
			bgDisplay[4].on("mouseover",handleStartOver);
			bgDisplay[4].on("mouseout",handleStartOut);
			bgDisplay[4].on("click",handleStartClick,null, true);
			startButtonAnim();
		}
		function handleStartClick(evt){
			soundObj.startButton.play();
			bgDisplay[4].removeAllEventListeners();
			createjs.Tween.get(bgDisplay[3],{useTicks:true}).to({alpha:0},15);
			createjs.Tween.get(bgDisplay[4],{useTicks:true}).to({alpha:0},15).call(function(){for(var i = 0; i < 7; i++){mouseListeners(i);} gameCont.removeChild(bgDisplay[3],bgDisplay[4]);});
		}
		function handleStartOver(evt) {
			bgDisplay[4].gotoAndStop("button_start_over");
		}
		function handleStartOut(evt) {
			bgDisplay[4].gotoAndStop("button_start");
		}
		function startButtonAnim() {
			if(bgDisplay[4]._listeners != undefined && bgDisplay[4]._listeners != null) {
				createjs.Tween.get(bgDisplay[4], {useTicks:true}).to({scaleX:1.1, scaleY:1.1},20).wait(5).to({scaleX:1,scaleY:1},20).wait(5).call(startButtonAnim);
			}
		}
		function background() {
			//background image
			bgDisplay[0] = createSprites(sSheetJSON, 0, 0, "background", false, 1);
			bgCont.addChild(bgDisplay[0]);
			//logo
			bgDisplay[1] = createSprites(sSheetJSON, 480, 47, "logo", true, 1);
			bgCont.addChild(bgDisplay[1]);
			//character
			bgDisplay[2] = createSprites(charSSheetJSON,610,410, "all", true, 1);
			bgCont.addChild(bgDisplay[2]);
			//blackout sheet
			bgDisplay[3] = createSprites(sSheetJSON,0,0,"endgame_blackout",false,1);
			//bgCont.addChild(bgDisplay[3]);
			//start button
			bgDisplay[4] = createSprites(sSheetJSON,480,320,"button_start",true,1);
			//bgCont.addChild(bgDisplay[4]);
		}
		function createSprites(sSheet, xIn, yIn, frame, enableCentralRegPoints, alphaIn) {
			if(sSheet == undefined || sSheet == null){console.error("createSprites: missing param: sSheet"); return;}
			if(xIn == undefined || xIn == null){xIn = 0;}
			if(yIn == undefined || yIn == null){yIn = 0;}
			if(enableCentralRegPoints == undefined || enableCentralRegPoints == null){enableCentralRegPoints = false;}
			if(alphaIn == undefined || alphaIn == null){alphaIn = 0;}

			var variable = new createjs.Sprite(new createjs.SpriteSheet(sSheet));
			variable.x = xIn;
			variable.y = yIn;
			variable.alpha = alphaIn;
			variable.gotoAndStop(frame);

			if(enableCentralRegPoints) {
				centraliseRegPoints(variable);
			}
			return variable;
		}
		function centraliseRegPoints(target){
			target.regX = target.spriteSheet._frames[target.currentFrame].rect.width/2;
			target.regY = target.spriteSheet._frames[target.currentFrame].rect.height/2;
			return target;
		}
		function displayGames() {
			newFoodNums = randomizeArray(foodNums);

			//food0(0), food1(1), cover0(2), cover1(3), panel(4), panelText(5), panelGlow(6), plate0(7), plate1(8), panelDoubleText(9)
			var adjustX = [-55, 55, -55, 55,  0,  0,  0, -55, 55,  0];
			var adjustY = [0  ,  0,   0,  0, 50, 50, 50,  20, 20, 50];

			var prizeText = ["prize1","prize2","prize3","prize4","prize5","prize6","prize7"];
			var cards = ["card1","card3","card5","card1","card2","card4","card5"];
			for(var i = 0; i < 7; i++) {
				//cover x2, food x2, win glow x2, prize (and game) text, prize text box, prize text box glow.
				gameSets[i] = new Object();
				gameSets[i].hasBeenWon = false;
				gameSets[i].doubleTriggered = false;

				gameSets[i].plate0 = createSprites(sSheetJSON,gameXLoc[i] + adjustX[7], gameYLoc[i] + adjustY[7], "plate",true,1);
				gameCont.addChild(gameSets[i].plate0);

				gameSets[i].plate1 = createSprites(sSheetJSON,gameXLoc[i] + adjustX[8], gameYLoc[i] + adjustY[8], "plate",true,1);
				gameCont.addChild(gameSets[i].plate1);

				gameSets[i].food0 = createSprites(sSheetJSON, gameXLoc[i] + adjustX[0], gameYLoc[i] + adjustY[0], null, true, 1);
				gameSets[i].food0.isRevealed = false;
				gameCont.addChild(gameSets[i].food0);

				gameSets[i].food1 = createSprites(sSheetJSON, gameXLoc[i] + adjustX[1], gameYLoc[i] + adjustY[1], null, true, 1);
				gameSets[i].food1.isRevealed = false;
				gameCont.addChild(gameSets[i].food1);

				gameSets[i].cover0 = createSprites(sSheetJSON, gameXLoc[i] + adjustX[2], gameYLoc[i] + adjustY[2], "cloche", true, 1);
				gameCont.addChild(gameSets[i].cover0);

				gameSets[i].cover1 = createSprites(sSheetJSON, gameXLoc[i] + adjustX[3], gameYLoc[i] + adjustY[3], "cloche", true, 1);
				gameCont.addChild(gameSets[i].cover1);

				gameSets[i].panel = createSprites(sSheetJSON, gameXLoc[i] + adjustX[4], gameYLoc[i] + adjustY[4], cards[i], true, 1);
				gameSets[i].panel.isRevealed = false;
				gameSets[i].panel.colourChanged = false;
				gameCont.addChild(gameSets[i].panel);

				gameSets[i].panelText = createSprites(sSheetJSON, gameXLoc[i] + adjustX[5], gameYLoc[i] + adjustY[5], prizeText[i], true, 1);
				//gameSets[i].panel.isRevealed = false;
				gameCont.addChild(gameSets[i].panelText);

				gameSets[i].panelDoubleText = createSprites(sSheetJSON, gameXLoc[i] + adjustX[9], gameYLoc[i] + adjustY[9], null, true, 0);
				gameCont.addChild(gameSets[i].panelDoubleText);
			}
		}
		function mouseListeners(i) {
			//add mouse listeners for game reveals.
			gameSets[i].cover0.on("click",associateTurns,null,true,[i,"cover0"]);
			gameSets[i].cover1.on("click",associateTurns,null,true,[i,"cover1"]);
			gameSets[i].panel.on("click",associateTurns,null,true,[i,"panel"]);

			function associateTurns(evt,arr) {//associate turn with game. turnGameAssoc array index increments turns from tickets, values are games.
				if((turnGameAssoc[turnsTaken]) == -1 && (triggeredGames[arr[0]] == false)) {
					triggeredGames[arr[0]] = true;
					turnGameAssoc[turnsTaken] = arr[0];
					turnsTaken++;
				}

				revealFood(arr[0],arr[1]);

				function revealFood(game,target) {
					var foodXadjust = [  3, 0, 0,  1,   0, 3, 0, -2];
					var foodYadjust = [-20, 4, 0, -5, -10, 3, 0, -2];
					var endCards 	= ["card_end1","card_end3","card_end5","card_end1","card_end2","card_end4","card_end5"];
					var endWinCards = ["card_end_win1","card_end_win3","card_end_win5","card_end_win1","card_end_win2","card_end_win4","card_end_win5"];

					createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(0).call(function(){soundObj.reveal.play();});
					//animations for lifting cover. lift the cover, set values, check for win.
					switch(target) {
						case "cover0":
							if(ticket.turns[turnGameAssoc.indexOf(game)].s0 == "s"){
								gameSets[game].food0.gotoAndStop("cake1");
								gameSets[game].food0.x -= 1;
								gameSets[game].food0.y -= 25;
							} else {
								gameSets[game].food0.gotoAndStop(foodName[newFoodNums[ticket.turns[turnGameAssoc.indexOf(game)].s0]]);
								gameSets[game].food0.x += foodXadjust[foodName.indexOf(gameSets[game].food0.currentAnimation)];
								gameSets[game].food0.y += foodYadjust[foodName.indexOf(gameSets[game].food0.currentAnimation)];
							}

							createjs.Tween.get(gameSets[game].cover0,{useTicks:true}).to({y:gameSets[game].cover0.y-50, alpha:0},10,createjs.Ease.linear).wait(2).to({alpha:0},5);
							gameSets[game].food0.isRevealed = true;
							revealedCount++;
						break;
						case "cover1":
							if(ticket.turns[turnGameAssoc.indexOf(game)].s1 == "s"){
								gameSets[game].food1.gotoAndStop("cake1");
								gameSets[game].food1.x -= 1;
								gameSets[game].food1.y -= 25;
							} else {
								gameSets[game].food1.gotoAndStop(foodName[newFoodNums[ticket.turns[turnGameAssoc.indexOf(game)].s1]]);
								gameSets[game].food1.x += foodXadjust[foodName.indexOf(gameSets[game].food1.currentAnimation)];
								gameSets[game].food1.y += foodYadjust[foodName.indexOf(gameSets[game].food1.currentAnimation)];
							}

							createjs.Tween.get(gameSets[game].cover1,{useTicks:true}).to({y:gameSets[game].cover1.y-50, alpha:0},10,createjs.Ease.linear).wait(2).to({alpha:0},10);
							gameSets[game].food1.isRevealed = true;
							revealedCount++;
						break;
						case "panel":
							gameSets[game].panel.isRevealed = true;
							revealPrizeAmounts(gameSets[game].panelText, gameSets[game].panel, game);
							revealedCount++;
						break;
					}
					createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(35).call(winChecker);
					function revealPrizeAmounts(target, panel, game){
						createjs.Tween.get(target, {useTicks:true}).to({alpha:0},15).call(function(){
							switch(ticket.turns[turnGameAssoc.indexOf(game)].p){
								case 2:
									target.gotoAndStop("prize_2");
								break;
								case 4:
									target.gotoAndStop("prize_4");
								break;
								case 5:
									target.gotoAndStop("prize_5");
								break;
								case 10:
									target.gotoAndStop("prize_10");
								break;
								case 20:
									target.gotoAndStop("prize_20");
								break;
								case 40:
									target.gotoAndStop("prize_40");
								break;
								case 80:
									target.gotoAndStop("prize_80");
								break;
								case 1000:
									target.gotoAndStop("prize_1000");
								break;
								case 2000:
									target.gotoAndStop("prize_2000");
								break;
								case 80000:
									target.gotoAndStop("prize_80000");
								break;
								default:
								break;
							}

							centraliseRegPoints(target);
							panel.gotoAndStop(endCards[game]);
							createjs.Tween.get(target, {useTicks:true}).to({alpha:1},15);
						});
						createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(5).call(function(){soundObj.prizeReveal.play();});
					}
					function revealDoubles(target, i){
						createjs.Tween.get(target[i].panelText,{useTicks:true}).wait(30).to({alpha:0},15).call(function(){
							switch(target[i].panelText.currentAnimation) {
								case "prize_2":
									target[i].panelDoubleText.gotoAndStop("prize_2x2");
									target[i].panelText.gotoAndStop("prize_4");
								break;
								case "prize_5":
									target[i].panelDoubleText.gotoAndStop("prize_5x2");
									target[i].panelText.gotoAndStop("prize_10");
								break;
								case "prize_10":
									target[i].panelDoubleText.gotoAndStop("prize_10x2");
									target[i].panelText.gotoAndStop("prize_20");
								break;
								case "prize_20":
									target[i].panelDoubleText.gotoAndStop("prize_20x2");
									target[i].panelText.gotoAndStop("prize_40");
								break;
								case "prize_40":
									target[i].panelDoubleText.gotoAndStop("prize_40x2");
									target[i].panelText.gotoAndStop("prize_80");
								break;
								default:
									invokeError("Doubled value not found");
								break;
							}
							centraliseRegPoints(target[i].panelDoubleText);
							centraliseRegPoints(target[i].panelText);
							createjs.Tween.get(target[i].panelDoubleText, {useTicks:true}).to({alpha:1},15).call(function(){
								var textW = target[i].panelText.spriteSheet._frames[target[i].panelText.currentFrame].rect.width/3;
								var dblW = target[i].panelDoubleText.spriteSheet._frames[target[i].panelDoubleText.currentFrame].rect.width/3;

								createjs.Tween.get(target[i].panelText,{useTicks:true}).to({x:target[i].panelText.x - (textW + 0)},15).call(function(){
									createjs.Tween.get(target[i].panelDoubleText,{useTicks:true}).to({x:target[i].panelText.x + (dblW + 10)},15);
									createjs.Tween.get(target[i].panelText, {useTicks:true}).to({alpha:1},15);
								});
							});
						});
					}
					function winChecker() {
						//check the current state of the board, look for wins and errors.
						var holder = [	[gameSets[0].food0,gameSets[0].food1],[gameSets[1].food0,gameSets[1].food1],[gameSets[2].food0,gameSets[2].food1],
										[gameSets[3].food0,gameSets[3].food1],[gameSets[4].food0,gameSets[4].food1],[gameSets[5].food0,gameSets[5].food1],[gameSets[6].food0,gameSets[6].food1]];

						for(var i = 0; i < holder.length; i++) {
							//compare current frames, triggered status, revealed statuses, won status
							if((holder[i][0].currentAnimation == holder[i][1].currentAnimation)&&(triggeredGames[i])&&(holder[i][0].isRevealed && holder[i][1].isRevealed) && !gameSets[i].hasBeenWon) {
								//pair found.
								console.log("Pair found.")
								gameSets[i].hasBeenWon = true;
								banked+= ticket.turns[turnGameAssoc.indexOf(i)].p;
								if(ticket.turns[turnGameAssoc.indexOf(i)].s0 != "s" || ticket.turns[turnGameAssoc.indexOf(i)].s1 != "s" ){
									createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(45).call(function(){soundObj.lineWin.play();});
								}
							}
							//if both items of food have been revealed, reveal the prize amount.
							if(gameSets[i].food0.isRevealed && gameSets[i].food1.isRevealed && !gameSets[i].panel.isRevealed) {
								console.log("Both tiles of a game revealed, revealing PP");
								gameSets[i].panel.isRevealed = true;
								gameSets[i].panel.removeAllEventListeners();
								revealPrizeAmounts(gameSets[i].panelText, gameSets[i].panel,i);
								revealedCount++;
							}
							if(gameSets[i].food0.isRevealed && gameSets[i].food1.isRevealed && !gameSets[i].doubleTriggered){
								if(ticket.turns[turnGameAssoc.indexOf(i)].d == 1 && !gameSets[i].doubleTriggered) {
									if(ticket.turns[turnGameAssoc.indexOf(i)].s0 == "s" && ticket.turns[turnGameAssoc.indexOf(i)].s1 == "s" && !gameSets[i].doubleTriggered){
										if(gameSets[i].panel.isRevealed){
											//change the prize amount to the doubled amount.
											gameSets[i].hasBeenWon = true;
											gameSets[i].doubleTriggered = true;
											console.log("PP already revealed, changing to doubled PA.");
											console.log("Double found, adding extra prize amount, changing frame.");
											banked += ticket.turns[turnGameAssoc.indexOf(i)].p;
										} else {
											gameSets[i].hasBeenWon = true;
											gameSets[i].doubleTriggered = true;
											console.log("PP not revealed yet, revealing then changing to doubled PA.");
											//reveal the panel and then change the prize.
											gameSets[i].panel.isRevealed = true;
											gameSets[i].panel.removeAllEventListeners();
											revealedCount++;
											console.log("Double found, adding extra prize amount, changing frame.");
											banked += ticket.turns[turnGameAssoc.indexOf(i)].p;
										}
										createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(45).call(function(){soundObj.double.play();});
										revealDoubles(gameSets, i);
									} else {
										invokeError("Doubling error.")
									}
								}
							}
							if(gameSets[i].panel.isRevealed && !gameSets[i].panel.colourChanged && gameSets[i].hasBeenWon) {
								gameSets[i].panel.gotoAndStop(endWinCards[i]);
								gameSets[i].panel.colourChanged = true;
							}
						}
						//check for end game
						if(revealedCount >= 21 && !endGameTriggered) {
							if(	gameSets[0].food0.isRevealed && gameSets[0].food1.isRevealed && gameSets[0].panel.isRevealed &&
								gameSets[1].food0.isRevealed && gameSets[1].food1.isRevealed && gameSets[1].panel.isRevealed &&
								gameSets[2].food0.isRevealed && gameSets[2].food1.isRevealed && gameSets[2].panel.isRevealed &&
								gameSets[3].food0.isRevealed && gameSets[3].food1.isRevealed && gameSets[3].panel.isRevealed &&
								gameSets[4].food0.isRevealed && gameSets[4].food1.isRevealed && gameSets[4].panel.isRevealed &&
								gameSets[5].food0.isRevealed && gameSets[5].food1.isRevealed && gameSets[5].panel.isRevealed &&
								gameSets[6].food0.isRevealed && gameSets[6].food1.isRevealed && gameSets[6].panel.isRevealed) {
								createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(45).call(function(){
									if(banked == ticket.prizeAmount) {
										console.log("banked amount correct: check for win or lose");
										if(ticket.winToken == 1 && ticket.prizeAmount > 0 && banked >0) {
											if(!endGameTriggered) {
												//win
												console.log("WIN!!!");
												endGame(ticket.winToken);
											}
										} else {
											if(!endGameTriggered) {
												//lose
												console.log("LOSE :/");
												endGame(ticket.winToken);
											}
										}
									} else {
										//there is an error.
										invokeError("Banked != ticket:" + banked + "!=" +ticket.prizeAmount);

									}
								});
							}
						}

						function endGame(winToken) {
							endGameTriggered = true;
							console.log("End game triggered.");
							var endGameContainer = new createjs.Container();
							//dark sheet
							var darken = createSprites(sSheetJSON, 0, 0, "endgame_blackout", false, 0);
							endGameContainer.addChild(darken);
							//highlights
							var highlights = new Array();
							for(var k = 0; k < 7; k++){
								highlights[k] = createSprites(sSheetJSON, gameXLoc[k], gameYLoc[k]-220, "endgame_spotlights", true, 0);
								endGameContainer.addChild(highlights[k]);
							}
							//text
							var text = createSprites(sSheetJSON, 480, 50, null, false, 0);
							endGameContainer.addChild(text);
							//finish button
							var finishButton = createSprites(sSheetJSON, /*480, 550,*/-100, 320, "button_finish", true, 1);
							//endGameContainer.addChild(finishButton);

							if(winToken == 1) {
								//prize amount, set text to "Congratulations"
								text.gotoAndStop("endgame_congratulations");
								var amount;
								switch(banked) {
									case 2:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_2", true, 0);
									break;
									case 4:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_4", true, 0);
									break;
									case 5:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_5", true, 0);
									break;
									case 10:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_10", true, 0);
									break;
									case 20:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_20", true, 0);
									break;
									case 40:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_40", true, 0);
									break;
									case 80:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_80", true, 0);
									break;
									case 1000:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_1000", true, 0);
									break;
									case 2000:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_2000", true, 0);
									break;
									case 80000:
										amount = createSprites(sSheetJSON, 480, 100, "endwin_80000", true, 0);
									break;
									default:
									break;
								}
								centraliseRegPoints(amount);
								endGameContainer.addChild(amount);
								//soundObj.endWin.play();
							} else {
								//set text to "Better luck next time"
								text.gotoAndStop("endgame_lose");
								//soundObj.endLose.play();
							}
							centraliseRegPoints(text);
							gameCont.addChild(endGameContainer);
							createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(60).call(endGameScreen);

							function endGameScreen() {
								//end game animation
								console.log("beginning end game animation");
								createjs.Tween.get(bgDisplay[1],{useTicks:true}).to({y:-100},15);
								createjs.Tween.get(darken, {useTicks:true}).to({alpha:1},30).wait(5).call(function(){
									for(var l = 0; l < 7; l++) {
										if(gameSets[l].hasBeenWon){
											createjs.Tween.get(highlights[l],{useTicks:true}).to({alpha:0.45},30);
											gameCont.removeChild(gameSets[l].plate0, gameSets[l].plate1, gameSets[l].food0, gameSets[l].food1,gameSets[l].panel, gameSets[l].panelText, gameSets[l].panelDoubleText);
											endGameContainer.addChild(gameSets[l].plate0, gameSets[l].plate1, gameSets[l].food0, gameSets[l].food1,gameSets[l].panel, gameSets[l].panelText, gameSets[l].panelDoubleText);
											gameSets[l].panel.gotoAndStop(endWinCards[l]);
											gameSets[l].panel.colourChanged = true;
										}
									}
									if(winToken == 1){
										createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(35).call(function(){soundObj.endWin.play();});
									} else {
										createjs.Tween.get(bgDisplay[0],{useTicks:true}).wait(35).call(function(){soundObj.endLose.play();});
									}
									endGameContainer.addChild(finishButton);
									createjs.Tween.get(text, {useTicks:true}).to({alpha:1},30);
									createjs.Tween.get(amount, {useTicks:true}).to({alpha:1},30).wait(30).call(function(){
										//finish button display.
										finishButton.on("mouseover",handleFinishOver);
										finishButton.on("mouseout", handleFinishOut);
										createjs.Tween.get(finishButton, {useTicks:true}).to({/*alpha:1*/x:480},20, createjs.Ease.elasticOut).wait(0).call(function(){
											finishButton.on("click",function(){
												top.location.href = "http://www.sideplay.com/portfolio/game/47/Souffl%C3%A9%20Surprise";
											},null,true);
										}).wait(30).call(animateFinishButton);
										function animateFinishButton() {
											createjs.Tween.get(finishButton, {useTicks:true}).to({scaleX:1.1, scaleY:1.1},20).wait(5).to({scaleX:1,scaleY:1},20).wait(5).call(animateFinishButton);
										}
										function handleFinishOver(evt){
											finishButton.gotoAndStop("button_finish_over");
										}
										function handleFinishOut(evt){
											finishButton.gotoAndStop("button_finish");
										}
									});
								});
							}
						}
					}
				}
			}
		}
	}
	function readTicketInfo() {
		ticket.prizeAmount	= ticketXMLFunction("outcome",0,"amount");
		ticket.prizeTier	= ticketXMLFunction("outcome",0,"prizeTier");
		ticket.winToken		= ticketXMLFunction("params",0,"wT");
		ticket.turns 		= new Array();

		for(var i = 0; i < 7; i++) {
			ticket.turns[i] = new Object();
			ticket.turns[i].p 	= parseInt(ticketXMLFunction("turn",i,"p"));
			ticket.turns[i].s0 	= ticketXMLFunction("turn",i,"s0");
			ticket.turns[i].s1 	= ticketXMLFunction("turn",i,"s1");
			ticket.turns[i].d 	= ticketXMLFunction("turn",i,"d");
			ticket.turns[i].w 	= ticketXMLFunction("turn",i,"w");
		}
		function ticketXMLFunction(tagname,index,attribute) {
			return ticketRaw.getElementsByTagName(tagname)[index].getAttribute(attribute);
		}
	}
	function validateTicket() {//if ticket is valid return true else return false and invokeError.
		return true;
	}
}
function randomizeArray(array) {
	var newArray = new Array();
	while (array.length > 0) {
		var arr = array.splice(Math.floor(Math.random() * array.length), 1);
		newArray.push(arr[0]);
	}
	return newArray;
}
