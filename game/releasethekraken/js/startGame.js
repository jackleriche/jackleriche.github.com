var initOnReady = function(objIn) {
	/*if (typeof WHGameClientAPI == 'undefined') {
		setTimeout(initOnReady, 1000);
	} else {*/
		console.log("found it, init WH")
		var initparam = {
			"gameID" : "Release-The-Kraken",
			"supplierID" : "sideplay",
			"userID" : "WH1243",
			"containerID" : "gameArea"
		};

		var game = new IWG.WHlink(null,objIn);
		//WHGameClientAPI.init(initparam,game,'GBP');

	//}
};