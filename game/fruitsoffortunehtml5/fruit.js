//Fruits of Fortune

/**
  *
  * Window setup
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

var imageManifest = [{id:"sSheet",src:"img/fruits-of-fortune.png"},{id:"JSON",src:"img/fruits-of-fortune.json"},{id:"birdSS",src:"img/fruit-ss.png"},{id:"birdJSON",src:"img/fruit-ss.json"},{id:"buttonGlow",src:"img/prize_panel.png"}];
var soundManifest = [{id:"pop",src:"snd/FOLEY PLASTIC LID POP 01.mp3"},{id:"bg",src:"snd/Jungle_3.mp3"},{id:"leaves",src:"snd/leaves-parting-short.mp3"},{id:"beat01",src:"snd/Musical accent tribal ethnic hand drums reverb fill 05_SFXBible_ss04076-short.mp3"},{id:"beat02",src:"snd/Musical accent tribal ethnic hand drums reverb fill 06_SFXBible_ss04077-short.mp3"}];
var ticket = new Object();
var fruitInstrText;
var sndButton;
var banked = 0.00;

var lsFruitList = ["fruit_choose_strawberry","fruit_choose_pear","fruit_choose_cherries","fruit_choose_plum","fruit_choose_orange","fruit_choose_blueberry","fruit_choose_grapes"];
var lsFruitListGlow = ["fruit_choose_strawberry_glow","fruit_choose_pear_glow","fruit_choose_cherries_glow","fruit_choose_plum_glow","fruit_choose_orange_glow","fruit_choose_blueberry_glow","fruit_choose_grapes_glow"];
var gFruitList = ["fruit_game_strawberry","fruit_game_pear","fruit_game_cherries","fruit_game_plum","fruit_game_orange","fruit_game_blueberry","fruit_game_grapes"];
var gFruitListGlow = ["fruit_game_strawberry_glow","fruit_game_pear_glow","fruit_game_cherries_glow","fruit_game_plum_glow","fruit_game_orange_glow","fruit_game_blueberry_glow","fruit_game_grapes_glow"];
var fruitNums = [0,1,2,3,4,5,6];
var newFruitNums; //will contain an array of numbers (shuffled fruitNums with chosen fruit at index 0)
var turnGameAssoc = [-1,-1,-1,-1];
var triggeredGames = [false,false,false,false];
var turnsTaken = 0;
var revealedCount = 0;
var pulseTime = 0;
var preventPulse = false;
var fpsCheck = 0;
var fpsCheckEnabled = true;
var endGameTriggered = false;
/**
  *
  * Containers / Arrays
  *
  **/

var lsCont; //landing screen container
var chosenFruitCont = new createjs.Container();
var bgCont = new createjs.Container();
var gameCont = new createjs.Container();
var overlayCont = new createjs.Container();
var maskerCont = new createjs.Container();

var lsFruit = new Array();
var bgDisplay = new Array();
var gameSets = new Array();
var soundObj = new Object();
/**
  *
  * Functions
  *
  **/

function preLoad() //preloader
{
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
function handleProgress() //progressbar
{
	loadingBar.scaleX = preLoader.progress * loadingBarWidth;
	progressPercent = Math.round(preLoader.progress*100);
	loadingLabel.text = progressPercent + "% Loaded";
	//console.log("Preloaded: ",progressPercent,"%");
	gameStage.update();
}
function handleError(info)
{
	//console.log("Preload Error: ",info);
	if(info.text == "FILE_LOAD_ERROR"){
		invokeError(info.text + ": " + info.item.id);
	}
	else
	{
		invokeError("Unknown.");
	}
}
function handleComplete(event) //once preloaded do this
{
	//console.log("Preload Complete.");
	ticketRaw = preLoader.getResult("ticketFromFile");

	ssImage = preLoader.getResult("sSheet");
	sSheetJSON = preLoader.getResult("JSON");
	sSheetJSON.images = [ssImage];

	birdSSJSON = preLoader.getResult("birdJSON");
	birdSSJSON.images = [preLoader.getResult("birdSS")];

	bGlowJSON = {"images": ["prize_panel.png"],"frames": [[0, 0, 122, 39]],"animations": {"button_glow":[0]}};
	bGlowJSON.images = [preLoader.getResult("buttonGlow")];


	createjs.Touch.enable(gameStage);
	start();

}

function tick()
{
	if(gameSets[0] == undefined && !preventPulse)
	{
		pulseTime++;
		if(pulseTime > 105 && !preventPulse)
		{
			inactiveLanding();
		}
	}
	if(gameSets[0] != undefined && !preventPulse)
	{
		pulseTime++;
		if(pulseTime > 105 && gameSets[0]!= undefined && !preventPulse)
		{
			inactivePulse();
		}
	}
	if(fpsCheckEnabled)
	{
		fpsCheck++;
		if(fpsCheck >= 60)
		{
			if(createjs.Ticker.getMeasuredFPS() > 10)
			{
				//console.log("FPS > 10");
			}
			else
			{
				//console.log("FPS less than 10");
				invokeError("FPS");
			}
			fpsCheck =0;
		}
	}

	gameStage.update();
}

function inactiveLanding()
{
	for(var i = 0; i < lsFruit.length; i++)
	{
		createjs.Tween.get(lsFruit[i],{useTicks:true}).wait((10*i)).to({scaleX:1.1,scaleY:1.1},10,createjs.Ease.linear).wait(2).to({scaleX:1,scaleY:1},10,createjs.Ease.linear);
	}
	pulseTime = 0;
}

function inactivePulse()
{
	for (var i = 0; i < 4; i++)
	{
		createjs.Tween.get(gameSets[i].flower0,{useTicks:true})		 .to({scaleX:1.05,scaleY:1.05},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear);
		createjs.Tween.get(gameSets[i].flower1,{useTicks:true})		 .to({scaleX:1.05,scaleY:1.05},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear);
		if(!gameSets[i].prizePoly.revealed)
		{
			createjs.Tween.get(gameSets[i].prizePoly,{useTicks:true})	 .to({scaleX:1.1,scaleY:1.1},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear);
			createjs.Tween.get(gameSets[i].prizePolyText,{useTicks:true}).to({scaleX:1.1,scaleY:1.1},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear);
		}
	}
	pulseTime = 0;
}

function readTicketInfo()
{
	ticket.prizeAmount	= ticketXMLFunction("outcome",0,"amount");
	ticket.prizeTier	= ticketXMLFunction("outcome",0,"prizeTier");
	ticket.winToken		= ticketXMLFunction("params",0,"wT");
	ticket.turns 		= new Array();

	for(var i = 0; i < 4; i++)
	{
		ticket.turns[i] = new Object();
		ticket.turns[i].p 	= parseInt(ticketXMLFunction("turn",i,"p"));
		ticket.turns[i].s0 	= ticketXMLFunction("turn",i,"s0");
		ticket.turns[i].s1 	= ticketXMLFunction("turn",i,"s1");
		ticket.turns[i].w 	= ticketXMLFunction("turn",i,"w");
	}
}

function ticketXMLFunction(tagname,index,attribute)
{
	return ticketRaw.getElementsByTagName(tagname)[index].getAttribute(attribute);
}

function start()
{
	gameStage.enableMouseOver();
	gameStage.removeChild(loadingBarCont, loadingLabel);
	gameStage.addChild(bgCont);
	gameStage.addChild(gameCont);
	gameStage.addChild(overlayCont);
	gameStage.addChild(maskerCont);
	readTicketInfo();
	background();
	backgroundUpper();
	createSoundInstances();
	startBackgroundMusic();
	landingScreen();
}

function createSoundInstances()
{
	soundObj.pop = new createjs.Sound.createInstance("pop");
	soundObj.backgroundMusic = new createjs.Sound.createInstance("bg");
	soundObj.leavesPart = new createjs.Sound.createInstance("leaves");
	soundObj.drums01 = new createjs.Sound.createInstance("beat01");
	soundObj.drums02 = new createjs.Sound.createInstance("beat02");
	soundObj.isMuted = false;
}

function startBackgroundMusic()
{
	soundObj.backgroundMusic.play();
	soundObj.backgroundMusic.on("complete",function(){soundObj.backgroundMusic.play();});
}

function background()
{
	bgDisplay[0] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	//bgDisplay[1] will be declared further on as an array.
	bgDisplay[2] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	bgDisplay[3] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	bgDisplay[4] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	bgDisplay[5] = new createjs.Sprite(new createjs.SpriteSheet(birdSSJSON));
	bgDisplay[6] = new createjs.Sprite(new createjs.SpriteSheet(birdSSJSON));

	//background image
	bgDisplay[0].x = 0; bgDisplay[0].y = 0; bgDisplay[0].gotoAndStop("bg_distance"); bgCont.addChild(bgDisplay[0]);

	//bird0 (left to right)
	bgDisplay[5].x = -20; bgDisplay[5].y = 110; bgDisplay[5].gotoAndStop("birdFlap"); bgCont.addChild(bgDisplay[5]);
	//bird1 (right to left)
	bgDisplay[6].x = 980; bgDisplay[6].y = 230; bgDisplay[6].gotoAndStop("birdFlap"); bgCont.addChild(bgDisplay[6]); bgDisplay[6].scaleX = -1; //scaleX is -1 to mirror the image


	//vines
	bgDisplay[1] = new Array();
	var vineImages = ["vine1","vine2","vine3","vine4"];
	var vineImageX = [30,30,800,screenX/2];
	var vineImageY = [20,20,10,20];
	var vineImageRegX = [0,0,158,0];
	for (var i = 0; i < 4; i++)
	{
		bgDisplay[1][i] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		bgDisplay[1][i].x = vineImageX[i]; bgDisplay[1][i].y = 0;
		bgDisplay[1][i].regX = vineImageRegX[i];
		bgDisplay[1][i].gotoAndStop(vineImages[i]);
		bgCont.addChild(bgDisplay[1][i]);
	}

	//tall grass left and right
	bgDisplay[2].x = 0; bgDisplay[2].y = screenY; bgDisplay[2].gotoAndStop("start_grass");
	bgDisplay[2].regY = bgDisplay[2].spriteSheet._frames[bgDisplay[2].currentFrame].rect.height;

	bgDisplay[3].x = screenX; bgDisplay[3].y = screenY; bgDisplay[3].gotoAndStop("start_grass");
	bgDisplay[3].regX = bgDisplay[3].spriteSheet._frames[bgDisplay[3].currentFrame].rect.width;
	bgDisplay[3].regY = bgDisplay[3].spriteSheet._frames[bgDisplay[3].currentFrame].rect.height;

	bgCont.addChild(bgDisplay[2],bgDisplay[3]);

	//leaves (not top layer)
	bgDisplay[4].x = screenX-10; bgDisplay[4].y = screenY+50; bgDisplay[4].gotoAndStop("bg_leaves1");
	bgDisplay[4].regX = bgDisplay[4].spriteSheet._frames[bgDisplay[4].currentFrame].rect.width;
	bgDisplay[4].regY = bgDisplay[4].spriteSheet._frames[bgDisplay[4].currentFrame].rect.height;bgCont.addChild(bgDisplay[4]);

	backgroundBirdsAnim();
}
function backgroundUpper()
{
	var bgUpper = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	bgUpper.x = 0; bgUpper.y = 0; bgUpper.gotoAndStop("bg_leaves2"); overlayCont.addChild(bgUpper);

	var logo = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	logo.x = screenX/2; logo.y = -10; logo.gotoAndStop("logo");
	logo.regX = logo.spriteSheet._frames[logo.currentFrame].rect.width/2; overlayCont.addChild(logo);
}
function backgroundBirdsAnim()
{
	bgDisplay[5].play();
	createjs.Tween.get(bgDisplay[5],{useTicks:true}).wait(5).to({x:980},250,createjs.Ease.linear).wait(2).to({alpha:0},1,createjs.Ease.linear).wait(2).to({x:-20},1,createjs.Ease.linear).wait(2).to({alpha:1},1,createjs.Ease.linear);

	bgDisplay[6].play();
	createjs.Tween.get(bgDisplay[6],{useTicks:true}).wait(5).to({x:-20},250,createjs.Ease.linear).wait(2).to({alpha:0},1,createjs.Ease.linear).wait(2).to({x:980},1,createjs.Ease.linear).wait(2).to({alpha:1},1,createjs.Ease.linear).wait(5).call(backgroundBirdsAnim);

}
function landingScreen()
{
	soundObj.drums02.play();
	lsCont = new createjs.Container(); gameCont.addChild(lsCont); lsCont.x = 320; lsCont.y = 230;

	fruitInstrText = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	fruitInstrText.x = screenX/2; fruitInstrText.y = 600; fruitInstrText.gotoAndStop("word_choose");
	fruitInstrText.regX = fruitInstrText.spriteSheet._frames[fruitInstrText.currentFrame].rect.width/2;
	fruitInstrText.regY = fruitInstrText.spriteSheet._frames[fruitInstrText.currentFrame].rect.height/2; overlayCont.addChild(fruitInstrText);

	sndButton = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	sndButton.x = 920; sndButton.y = 40; sndButton.gotoAndStop("sound_on");
	sndButton.regX = sndButton.spriteSheet._frames[sndButton.currentFrame].rect.width/2;
	sndButton.regY = sndButton.spriteSheet._frames[sndButton.currentFrame].rect.height/2; overlayCont.addChild(sndButton);

	for (var i = 0; i < 7; i++)
	{
		lsFruit[i] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));//pearJSON);


		switch(i)
		{
			case 0:
				lsFruit[i].x = 40; lsFruit[i].y = 50; lsFruit[i].gotoAndStop("fruit_choose_strawberry");
			break;
			case 1:
				lsFruit[i].x = 150; lsFruit[i].y = 50; lsFruit[i].gotoAndStop("fruit_choose_pear");
			break;
			case 2:
				lsFruit[i].x = 280; lsFruit[i].y = 50; lsFruit[i].gotoAndStop("fruit_choose_cherries");
			break;
			case 3:
				lsFruit[i].x = -35; lsFruit[i].y = 170; lsFruit[i].gotoAndStop("fruit_choose_plum");
			break;
			case 4:
				lsFruit[i].x = 90; lsFruit[i].y = 170; lsFruit[i].gotoAndStop("fruit_choose_orange");
			break;
			case 5:
				lsFruit[i].x = 210; lsFruit[i].y = 170; lsFruit[i].gotoAndStop("fruit_choose_blueberry");
			break;
			case 6:
				lsFruit[i].x = 330; lsFruit[i].y = 170; lsFruit[i].gotoAndStop("fruit_choose_grapes");
			break;
		}
		lsFruit[i].regX = lsFruit[i].spriteSheet._frames[lsFruit[i].currentFrame].rect.width/2;
		lsFruit[i].regY = lsFruit[i].spriteSheet._frames[lsFruit[i].currentFrame].rect.height/2;
		if(i ==3 ){lsFruit[i].regY = lsFruit[i].regY+5;}
		if(i ==4){lsFruit[i].regY = lsFruit[i].regY-10;}
		lsFruit[i].on("click",landingToMainTransition,null,true,i);

		//lsFruit[i].shadow = new createjs.Shadow("#000",0,1,3);
		lsCont.addChild(lsFruit[i]);
	}
	sndButton.on("click",soundButtonClick);
	sndButton.on("mouseover",soundButtonHover);
	sndButton.on("mouseout",soundButtonResting);
}

function soundButtonHover()
{
	sndButton.scaleX = sndButton.scaleY = 1.2;
}

function soundButtonResting()
{
	sndButton.scaleX = sndButton.scaleY = 1;
}

function soundButtonClick()
{
	soundObj.isMuted = !soundObj.isMuted;
	createjs.Sound.setMute(soundObj.isMuted);

	if(soundObj.isMuted)
	{
		sndButton.gotoAndStop("sound_off");
	}
	else
	{
		sndButton.gotoAndStop("sound_on");
	}
}

function landingToMainTransition(evt,i)
{
	soundObj.pop.play();
	preventPulse = true; pulseTime = 0; //stop pulses and reset counter
	var numArray = [0,1,2,3,4,5,6]; numArray.splice(i,1); //remove the clicked fruit from this array so that a fade can be applied to all other fruit

	removeLSClicks();

	for (var j = 0; j < numArray.length; j++)
	{
		createjs.Tween.get(lsFruit[numArray[j]],{useTicks:true}).to({alpha:0},30,createjs.Ease.linear);
	}

	createjs.Tween.get(lsFruit[i],{useTicks:true}).wait(31).to({alpha:0},30,createjs.Ease.linear).call(function(){
		soundObj.leavesPart.play();
		createjs.Tween.get(bgDisplay[2],{useTicks:true}).to({x:-600},30,createjs.Ease.linear);
		createjs.Tween.get(bgDisplay[3],{useTicks:true}).to({x:1500},30,createjs.Ease.linear).call(function(){
			createjs.Tween.get(fruitInstrText,{useTicks:true}).to({alpha:0},30,createjs.Ease.linear);
			createjs.Tween.get(lsFruit[i],{useTicks:true}).wait(30).call(function(){targetChosenFruit(i);});
		});
	});
}

function removeLSClicks() //remove event listeners from the landing screen items
{
	for (var i = 0; i < 7; i++)
	{
		lsFruit[i].removeAllEventListeners();
	}
}

function targetChosenFruit(i)
{
	//console.log("Targeted fruit is: ",gFruitList[i]);
	var regXAdjust = [-10,10,0,-5,0,0,0];
	var regYAdjust = [0,0,0,0,0,0,0];

	var targetedFruitGlow = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	targetedFruitGlow.x = screenX/2; targetedFruitGlow.y = screenY/2; targetedFruitGlow.gotoAndStop(lsFruitListGlow[i]);
	targetedFruitGlow.regX = targetedFruitGlow.spriteSheet._frames[targetedFruitGlow.currentFrame].rect.width/2;
	targetedFruitGlow.regY = targetedFruitGlow.spriteSheet._frames[targetedFruitGlow.currentFrame].rect.height/2;
	targetedFruitGlow.name = gFruitList[i];
	targetedFruitGlow.regX += regXAdjust[i];
	targetedFruitGlow.alpha = 0;
	targetedFruitGlow.revealed = false;
	chosenFruitCont.addChild(targetedFruitGlow); gameCont.addChild(chosenFruitCont);

	var targetedFruit = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	targetedFruit.x = screenX/2; targetedFruit.y = screenY/2; targetedFruit.gotoAndStop(lsFruitList[i]);
	targetedFruit.regX = targetedFruit.spriteSheet._frames[targetedFruit.currentFrame].rect.width/2;
	targetedFruit.regY = targetedFruit.spriteSheet._frames[targetedFruit.currentFrame].rect.height/2;
	targetedFruit.name = gFruitList[i];

	targetedFruit.regX += regXAdjust[i];

	targetedFruit.alpha = 0;

	chosenFruitCont.addChild(targetedFruit);

	var fortFruit = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
	fortFruit.x = targetedFruit.x; fortFruit.y = targetedFruit.y; fortFruit.gotoAndStop("word_yourfruit");
	fortFruit.regX = fortFruit.spriteSheet._frames[fortFruit.currentFrame].rect.width/2;
	fortFruit.regY = fortFruit.spriteSheet._frames[fortFruit.currentFrame].rect.height/2;
	fortFruit.alpha = 0;
	chosenFruitCont.addChild(fortFruit);

	fruitInstrText.gotoAndStop("word_instruction");
	fruitInstrText.regX = fruitInstrText.spriteSheet._frames[fruitInstrText.currentFrame].rect.width/2;
	fruitInstrText.regY = fruitInstrText.spriteSheet._frames[fruitInstrText.currentFrame].rect.height/2;


	createjs.Tween.get(fruitInstrText,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear)
	createjs.Tween.get(fortFruit,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
	createjs.Tween.get(targetedFruit,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear).call(function(){
		var temp = fruitNums.splice(i,1);
		newFruitNums = randomizeArray(fruitNums);
		newFruitNums.unshift(temp[0]);
		//console.log(newFruitNums);
		displayGames();
	});
}

function displayGames()
{
	var gameXLoc = [205,215,740,750];
	var gameYLoc = [135,350,350,145];
	var textName = ["game_word_game1","game_word_game2","game_word_game3","game_word_game4"];

	for (var i = 0; i < 4; i++)
	{
		gameSets[i] = new Object();

		gameSets[i].panel = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].panel.x = gameXLoc[i]; gameSets[i].panel.y = gameYLoc[i]; gameSets[i].panel.gotoAndStop("game_panel");
		gameSets[i].panel.regX = gameSets[i].panel.spriteSheet._frames[gameSets[i].panel.currentFrame].rect.width/2;
		gameSets[i].panel.regY = gameSets[i].panel.spriteSheet._frames[gameSets[i].panel.currentFrame].rect.height/2;
		gameSets[i].panel.alpha = 0;
		gameCont.addChild(gameSets[i].panel);

		gameSets[i].gameText = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].gameText.x = gameXLoc[i]; gameSets[i].gameText.y = gameYLoc[i]; gameSets[i].gameText.gotoAndStop(textName[i]);
		gameSets[i].gameText.regX = gameSets[i].gameText.spriteSheet._frames[gameSets[i].gameText.currentFrame].rect.width/2;
		gameSets[i].gameText.regY = gameSets[i].gameText.spriteSheet._frames[gameSets[i].gameText.currentFrame].rect.height/2;
		gameSets[i].gameText.alpha = 0;
		gameCont.addChild(gameSets[i].gameText);

		gameSets[i].glow0 = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].glow0.x = gameXLoc[i]-50; gameSets[i].glow0.y = gameYLoc[i]+70; gameSets[i].glow0.gotoAndStop("game_flower");
		gameSets[i].glow0.regX = gameSets[i].glow0.spriteSheet._frames[gameSets[i].glow0.currentFrame].rect.width/2;
		gameSets[i].glow0.regY = gameSets[i].glow0.spriteSheet._frames[gameSets[i].glow0.currentFrame].rect.height/2;
		gameSets[i].glow0.alpha = 0;
		gameSets[i].glow0.revealed = false;
		gameCont.addChild(gameSets[i].glow0);

		gameSets[i].glow1 = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].glow1.x = gameXLoc[i]+50; gameSets[i].glow1.y = gameYLoc[i]+70; gameSets[i].glow1.gotoAndStop("game_flower");
		gameSets[i].glow1.regX = gameSets[i].glow1.spriteSheet._frames[gameSets[i].glow1.currentFrame].rect.width/2;
		gameSets[i].glow1.regY = gameSets[i].glow1.spriteSheet._frames[gameSets[i].glow1.currentFrame].rect.height/2;
		gameSets[i].glow1.alpha = 0;
		gameSets[i].glow1.revealed = false;
		gameCont.addChild(gameSets[i].glow1);

		gameSets[i].shape0 = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].shape0.x = gameXLoc[i]-50; gameSets[i].shape0.y = gameYLoc[i]+70; gameSets[i].shape0.gotoAndStop("game_flower");
		gameSets[i].shape0.regX = gameSets[i].shape0.spriteSheet._frames[gameSets[i].shape0.currentFrame].rect.width/2;
		gameSets[i].shape0.regY = gameSets[i].shape0.spriteSheet._frames[gameSets[i].shape0.currentFrame].rect.height/2;
		gameSets[i].shape0.alpha = 0;
		gameSets[i].shape0.revealed = false;
		gameCont.addChild(gameSets[i].shape0);

		gameSets[i].shape1 = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].shape1.x = gameXLoc[i]+50; gameSets[i].shape1.y = gameYLoc[i]+70; gameSets[i].shape1.gotoAndStop("game_flower");
		gameSets[i].shape1.regX = gameSets[i].shape1.spriteSheet._frames[gameSets[i].shape1.currentFrame].rect.width/2;
		gameSets[i].shape1.regY = gameSets[i].shape1.spriteSheet._frames[gameSets[i].shape1.currentFrame].rect.height/2;
		gameSets[i].shape1.alpha = 0;
		gameSets[i].shape1.revealed = false;
		gameCont.addChild(gameSets[i].shape1);

		gameSets[i].flower0 = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].flower0.x = gameXLoc[i]-50; gameSets[i].flower0.y = gameYLoc[i]+15; gameSets[i].flower0.gotoAndStop("game_flower");
		gameSets[i].flower0.regX = gameSets[i].flower0.spriteSheet._frames[gameSets[i].flower0.currentFrame].rect.width/2;
		gameSets[i].flower0.regY = 0;
		gameSets[i].flower0.alpha = 0;
		gameCont.addChild(gameSets[i].flower0);

		gameSets[i].flower1 = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].flower1.x = gameXLoc[i]+50; gameSets[i].flower1.y = gameYLoc[i]+15; gameSets[i].flower1.gotoAndStop("game_flower");
		gameSets[i].flower1.regX = gameSets[i].flower1.spriteSheet._frames[gameSets[i].flower1.currentFrame].rect.width/2;
		gameSets[i].flower1.regY = 0;
		gameSets[i].flower1.alpha = 0;
		gameCont.addChild(gameSets[i].flower1);

		gameSets[i].prizePolyGlow = new createjs.Sprite(new createjs.SpriteSheet(bGlowJSON));
		gameSets[i].prizePolyGlow.x = gameXLoc[i]; gameSets[i].prizePolyGlow.y = gameYLoc[i]+145; gameSets[i].prizePolyGlow.gotoAndStop("button_glow");
		gameSets[i].prizePolyGlow.regX = gameSets[i].prizePolyGlow.spriteSheet._frames[gameSets[i].prizePolyGlow.currentFrame].rect.width/2;
		gameSets[i].prizePolyGlow.regY = gameSets[i].prizePolyGlow.spriteSheet._frames[gameSets[i].prizePolyGlow.currentFrame].rect.height/2;
		gameSets[i].prizePolyGlow.alpha = 0;
		gameSets[i].prizePolyGlow.revealed = false;
		gameCont.addChild(gameSets[i].prizePolyGlow);

		gameSets[i].prizePoly = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].prizePoly.x = gameXLoc[i]; gameSets[i].prizePoly.y = gameYLoc[i]+145; gameSets[i].prizePoly.gotoAndStop("prize_panel");
		gameSets[i].prizePoly.regX = gameSets[i].prizePoly.spriteSheet._frames[gameSets[i].prizePoly.currentFrame].rect.width/2;
		gameSets[i].prizePoly.regY = gameSets[i].prizePoly.spriteSheet._frames[gameSets[i].prizePoly.currentFrame].rect.height/2;
		gameSets[i].prizePoly.alpha = 0;
		gameSets[i].prizePoly.revealed = false;
		gameSets[i].prizePoly.colourChanged = false;
		gameCont.addChild(gameSets[i].prizePoly);


		gameSets[i].prizePolyText = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		gameSets[i].prizePolyText.x = gameSets[i].prizePoly.x; gameSets[i].prizePolyText.y = gameSets[i].prizePoly.y; gameSets[i].prizePolyText.gotoAndStop("game_word_prize");
		gameSets[i].prizePolyText.regX = gameSets[i].prizePolyText.spriteSheet._frames[gameSets[i].prizePolyText.currentFrame].rect.width/2;
		gameSets[i].prizePolyText.regY = gameSets[i].prizePolyText.spriteSheet._frames[gameSets[i].prizePolyText.currentFrame].rect.height/2;
		gameSets[i].prizePolyText.alpha = 0;
		gameCont.addChild(gameSets[i].prizePolyText);
	}
	for(var j = 0; j < 4; j++)
	{
		createjs.Tween.get(gameSets[j].panel, {useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
		createjs.Tween.get(gameSets[j].gameText, {useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
		createjs.Tween.get(gameSets[j].flower0, {useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
		createjs.Tween.get(gameSets[j].flower1, {useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
		createjs.Tween.get(gameSets[j].prizePoly, {useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
		createjs.Tween.get(gameSets[j].prizePolyText, {useTicks:true}).to({alpha:1},30,createjs.Ease.linear).wait(2).call(mouseListeners,[j]);
	}
	createjs.Tween.get(chosenFruitCont.children[0],{useTicks:true}).wait(35).call(function(){preventPulse = false;});
}

function mouseListeners(j)
{
	gameSets[j].flower0.on("click",flowerBurst,null,true,[j,"flower0"]);
	gameSets[j].flower0.on("mouseover",shakeFlowersOnHover,null,false,[j,0]);

	gameSets[j].flower1.on("click",flowerBurst,null,true,[j,"flower1"]);
	gameSets[j].flower1.on("mouseover",shakeFlowersOnHover,null,false,[j,1]);

	gameSets[j].prizePoly.on("click",flowerBurst,null,true,[j,"panel"]);
}

function shakeFlowersOnHover(evt,arr)
{
	var j = arr[0];
	switch(arr[1])
	{
		case 0:
			createjs.Tween.get(gameSets[j].flower0,{useTicks:true})
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:0},1,createjs.Ease.bounceOut);
		break;
		case 1:
			createjs.Tween.get(gameSets[j].flower1,{useTicks:true})
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut)
				.to({rotation:5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:-5},2,createjs.Ease.bounceOut).wait(1)
				.to({rotation:0},1,createjs.Ease.bounceOut);
		break;
	}
}

function flowerBurst(evt,arr)
{
	//console.log("flowerBurst called.",arr); console.log(turnGameAssoc);
	if((turnGameAssoc[turnsTaken]) == -1 && (triggeredGames[arr[0]] == false))
	{
		triggeredGames[arr[0]] = true;
		turnGameAssoc[turnsTaken] = arr[0];

		turnsTaken++;
	}
	underFruit(arr[0],arr[1]);
	//console.log(turnGameAssoc);
}

function underFruit(num,name) //fruitUnderFlowers
{
	//console.log("underFruit",num);
	var temp;
	switch(name)
	{
		case "flower0":
			soundObj.pop.play();
			temp = gameSets[num].flower0;
			gameSets[num].shape0.gotoAndStop(gFruitList[newFruitNums[ticket.turns[turnGameAssoc.indexOf(num)].s0]]);
			gameSets[num].shape0.regX = gameSets[num].shape0.spriteSheet._frames[gameSets[num].shape0.currentFrame].rect.width/2;
			gameSets[num].shape0.regY = gameSets[num].shape0.spriteSheet._frames[gameSets[num].shape0.currentFrame].rect.height/2;
			switch(gameSets[num].shape0.currentAnimation)
			{
				case "fruit_game_strawberry":
					gameSets[num].shape0.regX -= 5;
				break;
				case "fruit_game_pear":
					gameSets[num].shape0.regX -= 5;
				break;
				case "fruit_game_cherries":
				break;
				case "fruit_game_plum":
				break;
				case "fruit_game_orange":
				break;
				case "fruit_game_blueberry":
					gameSets[num].shape0.regX -= 5;
				break;
				case "fruit_game_grapes":
				break;

			}
			gameSets[num].shape0.revealed = true;
			revealedCount++;
		break;
		case "flower1":
			soundObj.pop.play();
			temp = gameSets[num].flower1;
			gameSets[num].shape1.gotoAndStop(gFruitList[newFruitNums[ticket.turns[turnGameAssoc.indexOf(num)].s1]]);
			gameSets[num].shape1.regX = gameSets[num].shape1.spriteSheet._frames[gameSets[num].shape1.currentFrame].rect.width/2;
			gameSets[num].shape1.regY = gameSets[num].shape1.spriteSheet._frames[gameSets[num].shape1.currentFrame].rect.height/2;
			switch(gameSets[num].shape1.currentAnimation)
			{
				case "fruit_game_strawberry":
					gameSets[num].shape1.regX += 5;
				break;
				case "fruit_game_pear":
				break;
				case "fruit_game_cherries":
				break;
				case "fruit_game_plum":
					gameSets[num].shape1.regX += 5;
				break;
				case "fruit_game_orange":
					gameSets[num].shape1.regX +=5;
					//gameSets[num].shape1.regY -=10;
				break;
				case "fruit_game_blueberry":
					gameSets[num].shape1.regX += 5;
				break;
				case "fruit_game_grapes":
				break;

			}
			gameSets[num].shape1.revealed = true;
			revealedCount++;
		break;
		case "panel":
		case "label":
			soundObj.leavesPart.play();
			createjs.Tween.get(gameSets[num].prizePolyText,{useTicks:true}).to({alpha:0},15,createjs.Ease.linear).call(function(){
				//console.log(ticket.turns[turnGameAssoc.indexOf(num)].p);
				switch(ticket.turns[turnGameAssoc.indexOf(num)].p)
				{
					case 1:
						gameSets[num].prizePolyText.gotoAndStop("prize_1");
						gameSets[num].prizePolyText.regX = gameSets[num].prizePolyText.spriteSheet._frames[gameSets[num].prizePolyText.currentFrame].rect.width/2;
						gameSets[num].prizePolyText.regY = gameSets[num].prizePolyText.spriteSheet._frames[gameSets[num].prizePolyText.currentFrame].rect.height/2;
					break;
					case 10:
						gameSets[num].prizePolyText.gotoAndStop("prize_10");
						gameSets[num].prizePolyText.regX = gameSets[num].prizePolyText.spriteSheet._frames[gameSets[num].prizePolyText.currentFrame].rect.width/2;
						gameSets[num].prizePolyText.regY = gameSets[num].prizePolyText.spriteSheet._frames[gameSets[num].prizePolyText.currentFrame].rect.height/2;
					break;
					case 100:
						gameSets[num].prizePolyText.gotoAndStop("prize_100");
						gameSets[num].prizePolyText.regX = gameSets[num].prizePolyText.spriteSheet._frames[gameSets[num].prizePolyText.currentFrame].rect.width/2;
						gameSets[num].prizePolyText.regY = gameSets[num].prizePolyText.spriteSheet._frames[gameSets[num].prizePolyText.currentFrame].rect.height/2;
					break;
				}
				createjs.Tween.get(gameSets[num].prizePolyText,{useTicks:true}).to({alpha:1},15,createjs.Ease.linear);
				gameSets[num].prizePoly.revealed = true;
				revealedCount++;
			});
		break;

	}

	gameSets[num].turn = turnGameAssoc.indexOf(num);

	if(name != "label" && name != "panel") //fade clicked flowers to alpha 0
	{
		petalExplosion(temp);
		createjs.Tween.get(temp, {useTicks:true}).to({alpha:0},20,createjs.Ease.linear).call(function(){});
	}

	if(name == "flower0")
	{
		createjs.Tween.get(gameSets[num].shape0).to({alpha:1},30,createjs.Ease.linear);
	}

	if(name == "flower1")
	{
		createjs.Tween.get(gameSets[num].shape1).to({alpha:1},30,createjs.Ease.linear);
	}
	createjs.Tween.get(chosenFruitCont.children[0],{useTicks:true}).wait(20).call(winChecker);
}

function petalExplosion(temp)
{
	var petalCont = new createjs.Container(); gameCont.addChild(petalCont);
	petalCont.x = temp.x; petalCont.y = temp.y;
	var petals = new Array();

	for (var i = 0; i < 12; i++)
	{
		petals[i] = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		petals[i].x = 0; petals[i].y = 48; petals[i].gotoAndStop("petal_explode"); petals[i].alpha = 1;
		petals[i].regX = petals[i].spriteSheet._frames[petals[i].currentFrame].rect.width/2;
		petals[i].regY = petals[i].spriteSheet._frames[petals[i].currentFrame].rect.height/2;
		petals[i].rotation = Math.random()*360;
		petalCont.addChild(petals[i]);
	}

	var Xs = [30,50,50,-10,-40,-30,10,30,10,-20,-20,-10];
	var Ys = [-40,-20,40,50,40,-30,-20,-10,30,20,-10,-30];

	for(var j = 0; j < 12; j++)
	{
		createjs.Tween.get(petals[j],{useTicks:true}).to({x:petals[j].x+Xs[j], y:petals[j].y+Ys[j], rotation:Math.random()*360, alpha:0},60, createjs.Ease.backOut);
	}
}

function randomizeArray(array)
{
	var newArray = new Array();
	while (array.length > 0)
	{
		var obj = array.splice(Math.floor(Math.random() * array.length), 1);
		newArray.push(obj[0]);
	}
	return newArray;
}

function winChecker()
{
	var fruitLocHolder = [[gameSets[0].shape0,gameSets[0].shape1],[gameSets[1].shape0,gameSets[1].shape1],[gameSets[2].shape0,gameSets[2].shape1],[gameSets[3].shape0,gameSets[3].shape1]];

	for(var i = 0; i < fruitLocHolder.length; i++)
	{
		if((fruitLocHolder[i][0].currentFrame == fruitLocHolder[i][1].currentFrame) && (triggeredGames[i] == true) && (fruitLocHolder[i][0].revealed == true && fruitLocHolder[i][1].revealed ==true))
		{
			//console.log("PAIR FOUND, checking validity against ticket.",i);
			winPulse([i,0],[i,1],null);
			//switch prize panel from green to orange
			if(gameSets[i].prizePoly.revealed == true && gameSets[i].prizePoly.colourChanged == false)
			{
				//console.log("Winning PP revealed, changing colour");
				soundObj.drums02.play();
				gameSets[i].prizePoly.gotoAndStop("prize_panel_orange");
				gameSets[i].prizePoly.colourChanged = true;
				winPulse(null,null,i);
				banked += ticket.turns[turnGameAssoc.indexOf(i)].p; //console.log("Banked: ",banked);

			}
		}
		if(gameSets[i].shape0.revealed && gameSets[i].shape1.revealed && triggeredGames[i] && !gameSets[i].prizePoly.revealed/* && !gameSets[i].prizePoly.colourChanged*/)
		{
			gameSets[i].prizePoly.removeAllEventListeners();
			gameSets[i].prizePoly.revealed = true;
			flowerBurst(null,[i,"panel"]);
		//	underFruit(i,"panel");
		}
		for (var j = 0; j < 2; j++)
		{

			if(fruitLocHolder[i][j].currentAnimation == chosenFruitCont.children[1].name && triggeredGames[i] == true && fruitLocHolder[i][j].revealed == true)
			{
				//console.log("Fruit of Fortune Found, checking validity against ticket.",i,j);//,fruitLocHolder[i][j],gameSets[i].turn, ticket.turns[gameSets[i].turn]);
				//check that the turn that matches the chosen fruit is the same as the one in the ticket. then check the win flag and add the prize to the total.
				//check the reveal count and if high enough check against the bank amount on the ticket

				if(j == 0)
				{
					winPulse([i,j],"Chosen",null);
				}
				else
				{
					winPulse("Chosen",[i,j],null);
				}
				if(gameSets[i].prizePoly.revealed == true && gameSets[i].prizePoly.colourChanged == false)
				{
					//console.log("Fruit found, changing colour");
					soundObj.drums02.play();
					gameSets[i].prizePoly.gotoAndStop("prize_panel_orange");
					gameSets[i].prizePoly.colourChanged = true;
					winPulse(null,null,i);
					banked += ticket.turns[turnGameAssoc.indexOf(i)].p; //console.log("Banked: ",banked);
				}
			}
		}
	}

	//check that revealed amount is not greater than the ticket amount, if it is then error.
	if(banked > ticket.prizeAmount)
	{
		//console.log("BAHAHAHAHHAHAHHAHAHAHAHHAHA");
		invokeError("Prize amount greater than ticket amount");
	}


	if(revealedCount >= 12 && !endGameTriggered &&
		gameSets[0].shape0.revealed && gameSets[0].shape1.revealed && gameSets[0].prizePoly.revealed &&
		gameSets[1].shape0.revealed && gameSets[1].shape1.revealed && gameSets[1].prizePoly.revealed &&
		gameSets[2].shape0.revealed && gameSets[2].shape1.revealed && gameSets[2].prizePoly.revealed &&
		gameSets[3].shape0.revealed && gameSets[3].shape1.revealed && gameSets[3].prizePoly.revealed)
	{
		createjs.Tween.get(chosenFruitCont.children[0], {useTicks:true}).wait(16).call(function(){
			//console.log("All items to reveal have been revealed, beginning game over sequence.");
			if(banked != ticket.prizeAmount)
			{
				//console.log("Checking bank results...");
				//invokeError("Ticket amount != Banked Amount"+ticket.prizeAmount+banked);
				if(banked > ticket.prizeAmount){invokeError("Banked amount greater than ticket amount! "+banked+" > "+ticket.prizeAmount);}
				if(banked < ticket.prizeAmount){invokeError("Banked amount less than ticket amount! "+banked+" < "+ticket.prizeAmount);}
			}

			createjs.Tween.get(chosenFruitCont.children[0],{useTicks:true}).wait(15).call(function(){
				if(banked == ticket.prizeAmount && ticket.prizeAmount > 0 && ticket.winToken == 1)
				{
					//if a win
					//console.log("Beginning win animation.");
					if(!endGameTriggered)
					{
						endGameAnim(ticket.winToken);
					}

				}
				else
				{
					//if a lose
					//console.log("Beginning lose animation.");
					if(!endGameTriggered)
					{
						endGameAnim(ticket.winToken);
					}
				}
			});
		});
	}

	function winPulse(winnerA, winnerB, poly)
	{
		//console.log("Win pulse called", winnerA, winnerB, poly);
		if(winnerA != null && winnerB != null)
		{
			if(winnerA == "Chosen") // if the winning fruit is the 2nd fruit then the chosen fruit must be the first. Unable to test due to ticket
			{
				//console.log("Winner A = Chosen");
				if(!chosenFruitCont.children[0].revealed)
				{
					//console.log("Winner A = Game:",winnerA[0]," Image:",winnerA[1]);
					//gameSets[winnerB[0]].glow1.gotoAndStop(gFruitListGlow[gFruitList.indexOf(gameSets[winnerB[0]].shape0.currentAnimation)]);
					chosenFruitCont.children[0].regX = chosenFruitCont.children[0].spriteSheet._frames[chosenFruitCont.children[0].currentFrame].rect.width/2;
					chosenFruitCont.children[0].regY = chosenFruitCont.children[0].spriteSheet._frames[chosenFruitCont.children[0].currentFrame].rect.height/2;
					switch(chosenFruitCont.children[0].currentAnimation)
					{
						case "fruit_choose_strawberry_glow":
							chosenFruitCont.children[0].regX -= 10;
						break;
						case "fruit_choose_pear_glow":
							chosenFruitCont.children[0].regX += 10;
						break;
						case "fruit_choose_cherries_glow":
						break;
						case "fruit_choose_plum_glow":
							chosenFruitCont.children[0].regX -=5
						break;
						case "fruit_choose_orange_glow":
						break;
						case "fruit_choose_blueberry_glow":
						break;
						case "fruit_choose_grapes_glow":
						break;
					}
					createjs.Tween.get(chosenFruitCont.children[0],{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
					chosenFruitCont.children[0].revealed = true;
					glowPulse(chosenFruitCont.children[0]);
				}
			}
			else
			{
				if(!gameSets[winnerA[0]].glow0.revealed)
				{
					//console.log("Winner A = Game:",winnerA[0]," Image:",winnerA[1]);
					gameSets[winnerA[0]].glow0.gotoAndStop(gFruitListGlow[gFruitList.indexOf(gameSets[winnerA[0]].shape0.currentAnimation)]);
					gameSets[winnerA[0]].glow0.regX = gameSets[winnerA[0]].glow0.spriteSheet._frames[gameSets[winnerA[0]].glow0.currentFrame].rect.width/2;
					gameSets[winnerA[0]].glow0.regY = gameSets[winnerA[0]].glow0.spriteSheet._frames[gameSets[winnerA[0]].glow0.currentFrame].rect.height/2;
					switch(gameSets[winnerA[0]].glow0.currentAnimation)
					{
						case "fruit_game_strawberry_glow":
							gameSets[winnerA[0]].glow0.regX -= 5;
						break;
						case "fruit_game_pear_glow":
							gameSets[winnerA[0]].glow0.regX -= 5;
						break;
						case "fruit_game_cherries_glow":
						break;
						case "fruit_game_plum_glow":
						break;
						case "fruit_game_orange_glow":
						break;
						case "fruit_game_blueberry_glow":
							gameSets[winnerA[0]].glow0.regX -= 5;
						break;
						case "fruit_game_grapes_glow":
						break;
					}
					createjs.Tween.get(gameSets[winnerA[0]].glow0,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
					gameSets[winnerA[0]].glow0.revealed = true;
					glowPulse(gameSets[winnerA[0]].glow0);
				}
			}

			if(winnerB == "Chosen") // if the winning fruit is the 1st fruit then the chosen fruit must be the second.
			{
				//console.log("Winner B = Chosen");
				if(!chosenFruitCont.children[0].revealed)
				{
					//console.log("Winner B = Game:",winnerB[0]," Image:",winnerB[1]);
					//gameSets[winnerB[0]].glow1.gotoAndStop(gFruitListGlow[gFruitList.indexOf(gameSets[winnerB[0]].shape0.currentAnimation)]);
					chosenFruitCont.children[0].regX = chosenFruitCont.children[0].spriteSheet._frames[chosenFruitCont.children[0].currentFrame].rect.width/2;
					chosenFruitCont.children[0].regY = chosenFruitCont.children[0].spriteSheet._frames[chosenFruitCont.children[0].currentFrame].rect.height/2;
					switch(chosenFruitCont.children[0].currentAnimation)
					{
						case "fruit_choose_strawberry_glow":
							chosenFruitCont.children[0].regX -= 10;
						break;
						case "fruit_choose_pear_glow":
							chosenFruitCont.children[0].regX += 10;
						break;
						case "fruit_choose_cherries_glow":
						break;
						case "fruit_choose_plum_glow":
							chosenFruitCont.children[0].regX -=5
						break;
						case "fruit_choose_orange_glow":
						break;
						case "fruit_choose_blueberry_glow":
						break;
						case "fruit_choose_grapes_glow":
						break;
					}
					createjs.Tween.get(chosenFruitCont.children[0],{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
					chosenFruitCont.children[0].revealed = true;
					glowPulse(chosenFruitCont.children[0]);
				}
			}
			else
			{
				if(!gameSets[winnerB[0]].glow1.revealed)
				{
					//console.log("Winner B = Game:",winnerB[0]," Image:",winnerB[1]);
					gameSets[winnerB[0]].glow1.gotoAndStop(gFruitListGlow[gFruitList.indexOf(gameSets[winnerB[0]].shape0.currentAnimation)]);
					gameSets[winnerB[0]].glow1.regX = gameSets[winnerB[0]].glow1.spriteSheet._frames[gameSets[winnerB[0]].glow1.currentFrame].rect.width/2;
					gameSets[winnerB[0]].glow1.regY = gameSets[winnerB[0]].glow1.spriteSheet._frames[gameSets[winnerB[0]].glow1.currentFrame].rect.height/2;
					switch(gameSets[winnerB[0]].glow1.currentAnimation)
					{
						case "fruit_game_strawberry_glow":
							gameSets[winnerB[0]].glow1.regX += 5;
						break;
						case "fruit_game_pear_glow":
							//gameSets[winnerB[0]].glow1.regX -= 5;
						break;
						case "fruit_game_cherries_glow":
						break;
						case "fruit_game_plum_glow":
							gameSets[winnerB[0]].glow1.regX += 5;
						break;
						case "fruit_game_orange_glow":
							gameSets[winnerB[0]].glow1.regX += 5;
						break;
						case "fruit_game_blueberry_glow":
							gameSets[winnerB[0]].glow1.regX += 5;
						break;
						case "fruit_game_grapes_glow":
						break;
					}
					createjs.Tween.get(gameSets[winnerB[0]].glow1,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
					gameSets[winnerB[0]].glow1.revealed = true;
					glowPulse(gameSets[winnerB[0]].glow1);
				}
			}
		}

		if(poly != null && gameSets[poly].prizePolyGlow.revealed == false)
		{
			//console.log("A winning poly is on game: ",poly)
			gameSets[poly].prizePolyGlow.revealed = true;
			gameSets[poly].prizePolyGlow.alpha = 1;
			polyPulse(gameSets[poly].prizePolyGlow);
		}

		function polyPulse(target)
		{
			createjs.Tween.get(target,{useTicks:true}).wait(0).to({scaleX:1.06,scaleY:1.1},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear).call(function(){polyPulse(target);});
		}

		function glowPulse(target)
		{
			createjs.Tween.get(target,{useTicks:true}).wait(0).to({scaleX:1.2,scaleY:1.2},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear).call(function(){glowPulse(target);});
		}
	}
	function endGameAnim(w)
	{
		endGameTriggered = true;
		//console.log("End game animation started.");
		var endGameCont = new createjs.Container(); overlayCont.addChild(endGameCont); endGameCont.x = 345; endGameCont.y = -90;
		var endGameLeaf = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		var endGameText = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		var endGameValueText = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		var endGamePoly = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));
		var endGamePolyText = new createjs.Sprite(new createjs.SpriteSheet(sSheetJSON));

		endGameLeaf.x = 0; endGameLeaf.y = 0; endGameLeaf.gotoAndStop("endgame_bg_leaf");
		endGameLeaf.regX = 0;
		endGameLeaf.regY = endGameLeaf.spriteSheet._frames[endGameLeaf.currentFrame].rect.height;
		endGameLeaf.alpha = 1;
		endGameCont.addChild(endGameLeaf);

		endGameText.x = 135; endGameText.y = 100;
		switch(w)
		{
			case "0":
				endGameText.gotoAndStop("endgame_betterlucknexttime");
			break;
			case "1":
				endGameText.gotoAndStop("endgame_congratulations");
				createjs.Tween.get(chosenFruitCont.children[0],{useTicks:true}).wait(30).call(function(){soundObj.drums01.play();});
			break;
		}
		endGameText.regX = endGameText.spriteSheet._frames[endGameText.currentFrame].rect.width/2;
		endGameText.regY = 0;
		endGameText.alpha = 0;
		endGameCont.addChild(endGameText);

		endGameValueText.x = 135; endGameValueText.y = 180;
		switch(banked)
		{
			case 1:
				endGameValueText.gotoAndStop("prize_1");
			break;
			case 2:
				endGameValueText.gotoAndStop("prize_2");
			break;
			case 10:
				endGameValueText.gotoAndStop("prize_10");
			break;
			case 100:
				endGameValueText.gotoAndStop("prize_100");
			break;
		}
		endGameValueText.regX = endGameValueText.spriteSheet._frames[endGameValueText.currentFrame].rect.width/2;
		endGameValueText.regY = endGameValueText.spriteSheet._frames[endGameValueText.currentFrame].rect.height/2;
		endGameValueText.alpha = 0;
		endGameCont.addChild(endGameValueText);

		endGamePoly.x = 135; endGamePoly.y = 220; endGamePoly.gotoAndStop("prize_panel");
		endGamePoly.regX = endGamePoly.spriteSheet._frames[endGamePoly.currentFrame].rect.width/2;
		endGamePoly.regY = endGamePoly.spriteSheet._frames[endGamePoly.currentFrame].rect.height/2;
		endGamePoly.alpha = 0;
		endGameCont.addChild(endGamePoly);

		endGamePolyText.x = endGamePoly.x; endGamePolyText.y = endGamePoly.y; endGamePolyText.gotoAndStop("endgame_word_finish");
		endGamePolyText.regX = endGamePolyText.spriteSheet._frames[endGamePolyText.currentFrame].rect.width/2;
		endGamePolyText.regY = endGamePolyText.spriteSheet._frames[endGamePolyText.currentFrame].rect.height/2;
		endGamePolyText.alpha = 0;
		endGameCont.addChild(endGamePolyText);

		for(var q = 0; q < overlayCont.children.length; q++)
		{
			if(overlayCont.children[q].currentAnimation == "logo") //finds the logo
			{
				createjs.Tween.get(overlayCont.children[q],{useTicks:true}).to({alpha:0},30,createjs.Ease.linear).call(displayEnd);
			}
		}
		function displayEnd()
		{
			createjs.Tween.get(endGameLeaf,{useTicks:true}).to({rotation:95},30,createjs.Ease.linear).call(function(){
				createjs.Tween.get(endGameText,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
				createjs.Tween.get(endGameValueText,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
				createjs.Tween.get(endGamePoly,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear);
				createjs.Tween.get(endGamePolyText,{useTicks:true}).to({alpha:1},30,createjs.Ease.linear).call(function(){
					finishPulse();
					endGamePoly.on("click",function(){
						top.location.href = "http://www.sideplay.com/portfolio/game/98/Fruits%20of%20Fortune";
					});
				});
			});

			function finishPulse()
			{
				createjs.Tween.get(endGamePoly,{useTicks:true})	 .to({scaleX:1.1,scaleY:1.1},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear);
				createjs.Tween.get(endGamePolyText,{useTicks:true}).to({scaleX:1.1,scaleY:1.1},30,createjs.Ease.linear).wait(5).to({scaleX:1,scaleY:1},30,createjs.Ease.linear).wait(2).call(finishPulse);
			}
		}
	}
}
