function test()
{
	console.log("INKOVER!");
}

function invokeError(message)
{
	gameStage.removeAllEventListeners();
	gameStage.removeAllChildren();
	createjs.Ticker.removeAllEventListeners();

	soundObj.isMuted = true;
	createjs.Sound.setMute(soundObj.isMuted);

	var errorMessage = new createjs.Text("","20px Arial","#ffffff");
	errorMessage.maxWidth = game.width;
	errorMessage.x = game.width/2;
	errorMessage.y = game.height/2;
	errorMessage.textAlign = "center";

	if(message != "FPS")
	{
		errorMessage.text = "Sorry, you have encountered an error. The error is:\n\n\n" + message;
	}
	else
	{
		errorMessage.text = "Sorry, your measured Frame Rate is too slow,\n\n please use a different browser or a faster device.\n\nAlternatively, retry by reloading the page."
	}
	gameStage.addChild(errorMessage);
	gameStage.update();
}
