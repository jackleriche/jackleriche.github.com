/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
/*global getManifest*/

(function (window) {
	"use strict";
	var iwg = window.com.camelot.iwg,
		_class = iwg._class,
		/**
		*
		* Include all your IWG scripts in this file.
		*/
			getManifest = _class("core.LoadManifest", function () {
			var _manifest = [

				//thridParty
                {"src":"src/thirdParty/greensocks/TweenMax.min.js", "id":"srcTweenMax"},
                {"src":"src/thirdParty/createJS/easeljs-0.6.1.min.js", "id":"srceaseljs"},
                {"src":"src/thirdParty/hammer.min.js", "id":"hammer"},
                {"src":"src/thirdParty/createJS/preload.js", "id":"preload"},

                //sounds
                {"src": "src/imports/audio/glossy_success_19.mp3", "id": "glossy_success_19" },
				{"src": "src/imports/audio/Level_fail.mp3", "id": "Level_fail" },
				{"src": "src/imports/audio/Pop.mp3", "id": "Pop" },
				{"src": "src/imports/audio/Win_zing.mp3", "id": "Win_zing" },

                //images
                {"src":"src/imports/img/masterSS.min.png", "id":"masterSS"},
                {"src":"src/imports/img/bg_tile.png", "id":"bgTile"},

				// classes
				{"src":"src/lib/flassets/min/MasterSS.min.js", "id":"masterSS"},
				{"src":"src/lib/min/R.min.js", "id": "R" },
				{"src":"src/lib/min/Helper.min.js", "id":"helper"},
				{"src":"src/lib/min/MEvent.min.js", "id":"events"},
				{"src":"src/lib/min/GameAsset.min.js", "id":"GameAsset"},

				// ticket
                {"src":"src/lib/min/Ticket.min.js", "id":"Ticket"},

				{"src":"src/lib/min/ParallaxBG.min.js", "id":"ParallaxBG"},
				{"src":"src/lib/min/Swipe.min.js", "id":"Swipe"},
				{"src":"src/lib/min/Splash.min.js", "id":"Splash"},
				{"src":"src/lib/min/MainGameLayout.min.js", "id":"MainGameLayout"},
				{"src":"src/lib/min/MatchOne.min.js", "id":"MatchOne"},
				{"src":"src/lib/min/MatchTwo.min.js", "id":"MatchTwo"},
				{"src":"src/lib/min/EqualsSeven.min.js", "id":"EqualsSeven"},
				{"src":"src/lib/min/EndGame.min.js", "id":"EndGame"},
				{"src":"src/min/Superrich.min.js", "id":"Superrich"}
 			];
		return _manifest;
	});
}(window));
