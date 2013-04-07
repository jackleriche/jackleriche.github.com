function init() {
	var game = document.getElementById('game');
  stage = new createjs.Stage(game);
  
	var boardLegend = [
		// board 0
		[
			[5,6],
			[7,8,9],
			[13,12,11,10],
			[6,16,15,8,14],
			[12,17,7,10,13,16]
		],
		// board 1 
		[
			[16,13],
			[10,11,12],
			[9,8,7,14],
			[17,12,14,10,7],
			[8,6,16,5,15,9]
		],
		// board 2
		[
			[9,10],
			[14,6,12],
			[5,13,16,9],
			[8,7,14,11,13],
			[15,17,8,16,12,10]
		],
		// board 3
		[
			[7,10],
			[16,8,15],
			[9,14,12,5],
			[10,12,5,15,13],
			[7,17,16,11,6,9]
		]
	];
	
	var data = {
		"images": ["http://jackleriche.com/game/src/imports/img/tokens-minigames.png"],
		"frames": [
			[2, 2, 60, 60, 0, 62, -2],
      [66, 2, 60, 60, 0, 62, -2],
      [130, 2, 60, 60, 0, 62, -2],
      [194, 2, 60, 60, 0, 62, -2],
      [258, 2, 60, 60, 0, 62, -2],
      [322, 2, 60, 60, 0, 62, -2],
      [386, 2, 60, 60, 0, 62, -2],
      [450, 2, 60, 60, 0, 62, -2],
      [514, 2, 60, 60, 0, 62, -2],
      [578, 2, 60, 60, 0, 62, -2],
      [642, 2, 60, 60, 0, 62, -2],
      [706, 2, 60, 60, 0, 62, -2],
      [770, 2, 60, 60, 0, 62, -2],
      [834, 2, 60, 60, 0, 62, -2],
      [898, 2, 60, 60, 0, 62, -2],
      [962, 2, 60, 60, 0, 62, -2],
      [1026, 2, 60, 60, 0, 62, -2],
      [1090, 2, 60, 60, 0, 62, -2],
      [1154, 2, 60, 60, 0, 62, -2],
      [1218, 2, 60, 60, 0, 62, -2],
      [1282, 2, 60, 60, 0, 62, -2],
      [1346, 2, 60, 60, 0, 62, -2],
      [1410, 2, 60, 60, 0, 62, -2],
      [1474, 2, 60, 60, 0, 62, -2],
      [1538, 2, 60, 60, 0, 62, -2],
      [1602, 2, 60, 60, 0, 62, -2],
      [1666, 2, 60, 60, 0, 62, -2]
    ],
    "animations": {
      "t5": {"frames": [0]},
      "t23": {"frames": [20]},
      "t7": {"frames": [2]},
      "t11": {"frames": [6]},
      "t16": {"frames": [11]},
      "t6": {"frames": [1]},
      "noWin": {"frames": [25]},
      "t17": {"frames": [7]},
      "t14": {"frames": [9]},
      "t12": {"frames": [12]},
      "t25": {"frames": [24]},
      "t21": {"frames": [18]},
      "t24": {"frames": [21]},
      "t9": {"frames": [4]},
      "t8": {"frames": [3]},
      "t3": {"frames": [13]},
      "t10": {"frames": [5]},
      "t0": {"frames": [26]},
      "t15": {"frames": [10]},
      "t4": {"frames": [14]},
      "t18": {"frames": [15]},
      "t20": {"frames": [17]},
      "t1": {"frames": [22]},
      "t19": {"frames": [16]},
      "t2": {"frames": [23]},
      "t13": {"frames": [8]},
      "t22": {"frames": [19]}
    }
	};

	var spriteSheet = new createjs.SpriteSheet(data);
	
  var boardXY = [3,4,5];
      
  var bgClip;
  bgClip = new createjs.Bitmap("http://jackleriche.com/game/src/imports/img/mm-bg.png");
  stage.addChild(bgClip);

  var board = new Board(0);
  board.setupBoard();
  var counter = new Counter();

  dice = document.getElementById('dice');
  diceStage = new createjs.Stage(dice);

  var dice = new Dice();

  // dice position
  var d0 = dice.drawDice()[0];
  d0.x = 0;
  d0.y = 0;
  diceStage.addChild(d0);

  var d1 = dice.drawDice()[1];
  d1.x = 30;
  d1.y = 0;
  diceStage.addChild(d1);

  diceStage.update();
	
	// Legend setup
  var legend = new Legend();
	var legendSquare = 38;
	
	function setupLegend() {
		
		var legendNum = board.boardNum;
			
		var prizeValuesArray = [2,10,50,500,5000];
		var rowTotals = [2,3,4,5,6];
		
		var legendYstart = 208;
		// loop through all rows
		for (var i = 0; i < rowTotals.length; i++ ) {
			var legendXstart = 630;
			var prizeValue = prizeValuesArray[i];				
			var legendRow = [];
			
			var y = legendYstart;
			legendYstart -= legendSquare;
			
			// loop through row amount
			for ( var j = 0; j < rowTotals[i]; j ++) {
				var x = legendXstart;
				legendXstart -= legendSquare;
				var string = "t" + boardLegend[legendNum][i][j];	
				// create container for the sprite sheet
				tokenContainer = createLegendTile(string, x, y );	
				legendRow.push(tokenContainer);		
			}		
			legend.pushLegendRow(prizeValue,legendRow)	
		}
			legend.updateLegend();
		
	}

	function createLegendTile(j, x, y) {
		
		var container = new createjs.Container();
		var bg = new createjs.Shape();
		    bg.graphics.beginFill('#f9d400').drawRect(0, 0, 38, 38).endFill();
			    
		    bg.alpha 	= 0;
				bg.x = x-38;
				bg.y = y;
		   
		
		// filter
		//var cf = new createjs.ColorFilter(0.47, 0.24, 0.04,1);
		//icon.createFilter("mask", [cf]);
		
		// add the icon
    var icon = new createjs.BitmapAnimation(spriteSheet);
		icon.gotoAndStop(j);
		icon.x = x;
		icon.y = y;
		icon.scaleX = .65;
		icon.scaleY = .65;
	
		container.addChild(bg, icon, txt);

		stage.addChild(container);

		return container;
		
	}

	// Bonus Legend
	var bonusLegend = new Legend();

	function setupBonusLegend() {
		var legendNum = board.boardNum;
			
		var prizeValuesArray = [5,5];
		var rowTotals = [3,3]; 

		var bonusLegendArray = 
		[
			[1],
			[2]
		]

		var yStart = 395;

		for (var i = 0; i < rowTotals.length; i++ ) {
			var xStart = 555;
			var prizeValue = prizeValuesArray[i];
			var legendRow = [];

			var y = yStart;
			yStart += legendSquare;

			for ( var j = 0; j < rowTotals[i]; j++ ) {
				var x = xStart;
				xStart += legendSquare;
				var string = "t" + bonusLegendArray[i][0];	

				tokenContainer = createLegendTile(string, x, y );	
				legendRow.push(tokenContainer);		
			}		
			bonusLegend.pushLegendRow(prizeValue,legendRow)	
		}
		bonusLegend.updateLegend();

		//snakes t3
		;
		
		
		for ( var i = 0; i < bonusLegend.length; i++ ) {
			// add tile height only after first one
			if ( i > 0) {
				y += bonusLegendTile;		
				// reset x 
				x = 555;		
			}
			
			for ( var j = 0; j < bonusLegend[i].numTiles; j++) {
				// make container
				var container = new createjs.Container();
				
				// filter
				var cf = new createjs.ColorFilter(0.47, 0.24, 0.04,1);
				spriteSheet.createFilter("mask", [cf]);
				
				var bg = new createjs.Shape();
				var icon = new createjs.BitmapAnimation(spriteSheet);
				
				// use correct tile icons
				if ( bonusLegend[i].type === 'snakes') {
					string = "t1";
				} else {
					string = "t2";
				}
				icon.gotoAndStop(string);
				// add bonus legend tile width to x
				icon.x = x;
				x += bonusLegendTile;
				icon.y = y;
				
				icon.scaleX = 0.65;
				icon.scaleY = 0.65;
			
				
				container.addChild( bg, icon );
				stage.addChild(container);
			}
			
		}
		
	}

	setupLegend();
	setupBonusLegend();
	stage.update();	
	counter.moveCounterTo(5);
}
