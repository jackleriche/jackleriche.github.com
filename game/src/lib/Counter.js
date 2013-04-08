(function( window ) {

  /*    
    Counter Class  
  */
    function Counter(){
    
        var counterSS = new createjs.SpriteSheet({
            "images": ["http://www.jackleriche.com/src/imports/img/butterfly.png"],
            "frames": [
                [0, 0, 128, 64, 0, 160, 26],
                [128, 0, 128, 64, 0, 160, 26],
                [256, 0, 128, 64, 0, 160, 26],
                [384, 0, 128, 64, 0, 160, 26],
                [512, 0, 128, 64, 0, 160, 26],
                [640, 0, 128, 64, 0, 160, 26],
                [768, 0, 128, 64, 0, 160, 26],
                [896, 0, 128, 64, 0, 160, 26],
                [1024, 0, 128, 64, 0, 160, 26],
                [1152, 0, 128, 64, 0, 160, 26],
                [1280, 0, 128, 64, 0, 160, 26],
                [1408, 0, 128, 64, 0, 160, 26],
                [1536, 0, 128, 64, 0, 160, 26],
                [1664, 0, 128, 64, 0, 160, 26],
                [1792, 0, 128, 64, 0, 160, 26],
                [1920, 0, 128, 64, 0, 160, 26],
                [0, 64, 128, 64, 0, 160, 26],
                [128, 64, 128, 64, 0, 160, 26],
                [256, 64, 128, 64, 0, 160, 26],
                [384, 64, 128, 64, 0, 160, 26],
                [512, 64, 128, 64, 0, 160, 26],
                [640, 64, 128, 64, 0, 160, 26],
                [768, 64, 128, 64, 0, 160, 26],
                [896, 64, 128, 64, 0, 160, 26],
                [1024, 64, 128, 64, 0, 160, 26],
                [1152, 64, 128, 64, 0, 160, 26],
                [1280, 64, 128, 64, 0, 160, 26],
                [1408, 64, 128, 64, 0, 160, 26],
                [1536, 64, 128, 64, 0, 160, 26],
                [1664, 64, 128, 64, 0, 160, 26],
                [1792, 64, 128, 64, 0, 160, 26],
                [1920, 64, 128, 64, 0, 160, 26],
                [0, 128, 128, 64, 0, 160, 26],
                [128, 128, 128, 64, 0, 160, 26],
                [256, 128, 128, 64, 0, 160, 26],
                [384, 128, 128, 64, 0, 160, 26],
                [512, 128, 128, 64, 0, 160, 26],
                [640, 128, 128, 64, 0, 160, 26],
                [768, 128, 128, 64, 0, 160, 26],
                [896, 128, 128, 64, 0, 160, 26],
                [1024, 128, 128, 64, 0, 160, 26],
                [1152, 128, 128, 64, 0, 160, 26],
                [1280, 128, 128, 64, 0, 160, 26],
                [1408, 128, 128, 64, 0, 160, 26],
                [1536, 128, 128, 64, 0, 160, 26],
                [1664, 128, 128, 64, 0, 160, 26],
                [1792, 128, 128, 64, 0, 160, 26],
                [1920, 128, 128, 64, 0, 160, 26],
                [0, 192, 128, 64, 0, 160, 26],
                [128, 192, 128, 64, 0, 160, 26],
                [256, 192, 128, 64, 0, 160, 26],
                [384, 192, 128, 64, 0, 160, 26],
                [512, 192, 128, 64, 0, 160, 26],
                [640, 192, 128, 64, 0, 160, 26],
                [768, 192, 128, 64, 0, 160, 26],
                [896, 192, 128, 64, 0, 160, 26],
                [1024, 192, 128, 64, 0, 160, 26],
                [1152, 192, 128, 64, 0, 160, 26],
                [1280, 192, 128, 64, 0, 160, 26],
                [1408, 192, 128, 64, 0, 160, 26],
                [1536, 192, 128, 64, 0, 160, 26],
                [1664, 192, 128, 64, 0, 160, 26],
                [1792, 192, 128, 64, 0, 160, 26],
                [1920, 192, 128, 64, 0, 160, 26],
                [0, 256, 128, 64, 0, 160, 26],
                [128, 256, 128, 64, 0, 160, 26],
                [256, 256, 128, 64, 0, 160, 26],
                [384, 256, 128, 64, 0, 160, 26],
                [512, 256, 128, 64, 0, 160, 26],
                [640, 256, 128, 64, 0, 160, 26],
                [768, 256, 128, 64, 0, 160, 26],
                [896, 256, 128, 64, 0, 160, 26],
                [1024, 256, 128, 64, 0, 160, 26],
                [1152, 256, 128, 64, 0, 160, 26],
                [1280, 256, 128, 64, 0, 160, 26],
                [1408, 256, 128, 64, 0, 160, 26],
                [1536, 256, 128, 64, 0, 160, 26],
                [1664, 256, 128, 64, 0, 160, 26],
                [1792, 256, 128, 64, 0, 160, 26],
                [1920, 256, 128, 64, 0, 160, 26],
                [0, 320, 128, 64, 0, 160, 26],
                [128, 320, 128, 64, 0, 160, 26],
                [256, 320, 128, 64, 0, 160, 26],
                [384, 320, 128, 64, 0, 160, 26],
                [512, 320, 128, 64, 0, 160, 26],
                [640, 320, 128, 64, 0, 160, 26],
                [768, 320, 128, 64, 0, 160, 26],
                [896, 320, 128, 64, 0, 160, 26]
            ],
            "animations": {
                "butterFly": {
                    "frames": [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89
                    ]
                }
            }
        }); 
        
        var counterToken = new createjs.BitmapAnimation(counterSS);
            
        counterToken.gotoAndPlay("butterFly"); 
        
        counterToken.name = "counter";
        counterToken.x = 160;
        counterToken.y = 405;
        counterToken.currentFrame = 0;
        
        stage.addChild(counterToken);
        createjs.Ticker.setFPS(24);
        createjs.Ticker.addListener(stage);
	   	
        var tileNum = 0;
        this.to = 0;   
        _to = 0;

        Counter.prototype.startMove = function() {

            _to = this.to;
            // start the static methods
            moveCounterNext(this);            
        } 
        
        var moveCounterNext = function(t){

            if (tileNum >= _to ){
                // callback function                
                return false;
            }
            tileNum++;

            if (Board.tokenObjects[tileNum]) {
                moveCounterTo(Board.tokenObjects[tileNum].x + 144, Board.tokenObjects[tileNum].y + 25, false);
            }
        }
        var moveCounterTo = function(sqX, sqY, direct) {
            createjs.Tween.get(counterToken).wait(800).call(moveCounterNext);
            createjs.Tween.get(counterToken).to({x:sqX,y:sqY,scaleX:1,scaleY:1,alpha:1},500,createjs.Ease.backIn);
        }

        //moveCounterNext(5);
    }

    window.Counter = Counter;

}(window));