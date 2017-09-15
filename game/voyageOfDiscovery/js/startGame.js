var initOnReady = function(objIn) {
	if (typeof WHGameClientAPI == 'undefined') {
		setTimeout(initOnReady, 1000);
	} else {
		var initparam = {
			"gameID" : "Voyage-Of-Discovery",
			"supplierID" : "sideplay",
			"userID" : "WH1243",
			"containerID" : "gameArea"
		};

		var game = new IWG.WHlink(WHGameClientAPI,objIn);
		WHGameClientAPI.init(initparam,game,'GBP');
	}
};