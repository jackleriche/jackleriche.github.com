(function( window ) {

	function Board(boardNum){
	  
		this.boardNum = boardNum;
	  // propertes 	  
	  var tokensClip = new Image();
	  var spriteSheet;
	  var isRight = true;
	  var tileWidth = 53;
	  var boardTiles = [];
	  
	  var tileChange = [
	   // array tiles that need to be removed for snakes and ladders
	   [ 5, 9, 18, 26, 29, 36 ],
	   [ 1, 14, 19, 21, 32, 45 ],
	   [ 1, 20, 22, 32, 39, 43 ]  
	  ];
	  
	  Board.tokenObjects = [];
	  
	  
	  
	  this.boards = [
	   // board 0
  	 [0,0,7,2,9,13,12,
			3,16,6,18,15,2,4,
			17,0,14,0,0,19,1,
			10,8,13,20,6,0,11,
			21,15,17,12,2,1,5,
			4,10,8,5,1,22,7,
			3,9,14,23,11,16,24],
		 // board 1
		 [0,9,13,7,18,10,17,
			3,15,2,5,4,0,19,
			11,14,1,20,8,6,16,
			0,2,17,10,13,21,6,
			1,5,2,7,0,16,12,
			14,1,22,9,0,8,3,
			11,23,4,12,15,0,24],
		 // board 2
		 [0,0,10,18,6,7,15,
			4,12,19,16,0,9,17,
			14,20,11,1,2,3,5,
			8,13,21,10,2,22,7,
			9,15,0,4,12,23,1,
			13,14,11,0,8,6,2,
			3,0,16,1,17,5,24],
		 // board 3
		 [0,0,10,13,17,3,0,
			16,18,7,8,5,2,14,
			15,19,9,10,4,12,11, 
			20,6,13,17,1,2,6,
			0,21,7,1,9,2,11,
			16,0,5,3,22,8,4,
			23,1,15,14,0,12,24,]
		 ]

	  var spriteSheet = new createjs.SpriteSheet({  	   
	   "images": ["/src/imports/img/tokens-minigames.png"],
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
    });
    
    
    var SnakesAndLaddersSpriteSheet = new createjs.SpriteSheet({
      "images": ["/src/imports/img/snakes-ladders.png"], 
      "frames": [
        [0, 0, 512, 512, 0, 512, 0], 
        [512, 0, 512, 512, 0, 512, 0], 
        [1024, 0, 512, 512, 0, 512, 0], 
        [1536, 0, 512, 512, 0, 512, 0]
      ],
      "animations": {
        "b3": {"frames": [3] }, 
        "b2": {"frames": [2] }, 
        "b0": {"frames": [0] }, 
        "b1": {"frames": [1]}
      }           
    });

		// setupBoard method
		/* 
		  This method grabs the board number array and iterates through the array
		  to set up the board tiles
		*/
		Board.prototype.setupBoard = function(){
		  
  		var globalX = 14;
  		var globalY = 380;
  		var mainBoard = this.boards[boardNum];
  		// direction
  		var isRight = true;
  		
  		function promoteTileToken(){
    		
    		/*
    		  - loop through the children looking for a property on each child in the stage
    		    for a property called sqNum, this should be all tile icons.
    		    
    		  - Then push them in tokenObjects array      		  		
    		*/
    		for ( var i = 0; i < stage.children.length; i++ ) {
    		  var boardSqNum =  stage.children[i].sqNum;
          if (boardSqNum != null ) {
            Board.tokenObjects.push(stage.children[i]);
          }
        }
        /*          
          - loop though the tokenObjects array creating token object variable           
        */          
        for ( var j = 0; j < Board.tokenObjects.length; j++ ) {
          var token = Board.tokenObjects[j];
          /*            
            - loop through the tileChange array against each tile
            - if match
              - set index to 99 ( to overlap snakes and ladders overlay )
          */
          for ( k = 0; k < tileChange[boardNum].length; k++ )  {
          if ((token.sqNum == tileChange[boardNum][k])) {
              // set child index
              stage.setChildIndex(token, 99 );
              stage.update();
              break;
            }
          }
          
        }
        
      }
  		
  		function createTile(i) {
    		
    		var container = new createjs.Container();
    		var bg = new createjs.Shape();
        bg.graphics.beginFill('#f9d400').drawRect(0, 0, 53, 53).endFill();
      
        // give the tile an id
        container.id = "tileSq"+i;
        
        bg.alpha = 0;
        bg.x = globalX;
        bg.y = globalY;
        
        // add the text
        txt = new createjs.Text(i + 1, "8px Arial", "#000");
        txt.x = globalX + 3;
        txt.y = globalY;
        
        container.addChild(bg, txt);
        return container;    		

      }

  		function createBoardToken(i, context) {
  		  var container = new createjs.Container();
    		var tokenBG = new createjs.BitmapAnimation(spriteSheet);
    		tokenBG.shadow = new createjs.Shadow("#222", 0, 1, 2);
    		
    		
    		var removeRedFilter = new createjs.ColorFilter(0,1,1,1); // red, green, blue, alpha
    		
    		tokenBG.filters = [removeRedFilter];
    		//tokenBG.cache(0,0, tokenBG.width, tokenBG.height); // color filters don't change the bounds.
  
    		

    		// give the tile an ID;
        container.id = "boardSq"+i;
        container.sqNum = i;
        
    		// use this to set the middle of clip 
        tokenBG.regX = tokenBG.spriteSheet.frameWidth / 2 | 0;
        tokenBG.regY = tokenBG.spriteSheet.frameHeight / 2 | 0;
    		  
        var string = "t" + mainBoard[i];
        
        if (string === "t1" || string === "t2") {
          string = "t0";
        }
        
        // have each start at a specific frame
        tokenBG.currentFrame = 0;
        tokenBG.x = tileWidth + 6;
        tokenBG.y = 0;
        
        //tokenBG
          
        var rowEndTest = i%7;
		    if ((rowEndTest == 0) && (i != 0)) {
		      // bump up a row
		      globalY -= tileWidth + 2;
		      if(isRight === true){
  		      isRight = false;
		      } else {
  		      isRight = true;
		      }
		    }
		    
		    container.y = globalY;
        if (i % 7 == 0) {
            container.x = globalX;
        } else if (isRight === false) {
            container.x = globalX-=tileWidth +2;
        } else {
            container.x = globalX+=tileWidth +2;
        }
        tokenBG.gotoAndStop(string); 
  
        container.addChild(tokenBG);
    
        return container;
  		}
  		
  		function overlay(boardNum) {
  		
        var snakesAndLadders = new createjs.BitmapAnimation(SnakesAndLaddersSpriteSheet);
        snakesAndLadders.currentFrame = 0;
        
        snakesAndLadders.x = 528;
        snakesAndLadders.y = 56;
        
        snakesAndLadders.gotoAndPlay("b" + boardNum);
        return snakesAndLadders;        
        	
  		}
  		
   		// Board is typically 7 x 7 grid, however have used the array length 
		  for( var i = 0; i < mainBoard.length; i++) {
		  
		  
		  
		  
		    
		    var icon = createBoardToken(i, this);
		    var container = createTile(i);
		    stage.addChild(container, icon);
		    
		    
		    
		    
		  }
      
      stage.addChild(overlay(boardNum));
      promoteTileToken();

      stage.update();      
      
    }
  }
  
	window.Board = Board;

}(window));
