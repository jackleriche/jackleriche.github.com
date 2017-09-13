/**
  * This code will scale the canvas and createjs stage to the width and height of the window.
  * Authors: Jack Le Riche, Keith Roberts. Company: E-scape Interactive Ltd.
  *
  * Requires: Canvas name: "game". CreateJS Suite. Stage name: "gameStage". A top layer container called "maskerCont".
  * Call "setSize()" at the start of the preLoad phase to ensure that it has run.
  *
  * This is set up for the following dimensions: 960 x 640. The masker is set to: "#10400e" Adjust to suit application.
  **/
window.addEventListener("orientationchange", orient, false);

//***** SCREEN ORIENTATION, IMAGE AND CANVAS SCALING *****
function orient() //screen orientation. pause the game and rescale. pause if portrait.
{
	if(!findLandscape() && window.orientation != undefined)
	{
		pause = true;
	}
	else
	{
		pause = false;
	}
	rescale();
}
orient(); //check orientation on startup.
function findLandscape()
{
	if(window.innerWidth >= window.innerHeight)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function setSize() //set canvas size to match window size
{
	game.width = window.innerWidth;
	game.height = window.innerHeight;
	rescale();
}

window.onresize = function(){setSize();}; //onresize event handler

function rescale() //rescale the canvas and stage
{
	SCALE = 1 - resize(true);

	gameStage.scaleX = SCALE;
	gameStage.scaleY = SCALE;

	game.width = window.innerWidth;
	game.height = window.innerHeight;
}
function resize(getScaleUp) //aspect ratios
{
	var initialWidth = window.innerWidth,
        initialHeight = window.innerHeight,
        cssHeight   =   640,
        cssWidth    =   960,
    scaleUp,
    myRatio = cssWidth / cssHeight,
    windowRatio = initialWidth / initialHeight;

    GAMEHEIGHT = 640;
    GAMEWIDTH = 960;

    if (myRatio >= windowRatio)
    {
        scaleUp = ((cssWidth - initialWidth)/cssWidth);
    }
    else
    {
        scaleUp = ((cssHeight - initialHeight)/cssHeight);
    }

    var trueX = initialWidth/2;
    var gameX = GAMEWIDTH * ( 1 - scaleUp) / 2;

    gameStage.x = trueX - gameX;

	if (getScaleUp)
	{
        return scaleUp;
    }
}

var maskers = new Array();
var maskerColour = "#10400e";
for( var i = 0; i < 3; i++)
{
	maskers[i] = new createjs.Shape();
	maskerCont.addChild(maskers[i]);
}
maskers[0].graphics.f(maskerColour).dr(1, 0, -10000, 10000).ef();
maskers[1].graphics.f(maskerColour).dr(-1, 639, 10000, 10000).ef();
maskers[2].graphics.f(maskerColour).dr(959, 0, 10000, 10000).ef();
