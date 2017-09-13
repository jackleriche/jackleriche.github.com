(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        iwg = camelot.iwg,
        lib = camelot.iwg.lib,
        GS = window.com.greensock,
        core = camelot.core,
        Helper = window.com.camelot.iwg.lib.Helper,
        R = window.com.camelot.iwg.lib.R,
        images = core.iwgLoadQ.images,
        ConfettiSS = lib.flassets.ConfettiSS,
        confettiSquare = lib.flassets.confettiSquare,

        Confetti = function (containerCoords, maskCoords,timelineDelay) {
    
            var _containerCoords    = containerCoords,
                _maskCoords         = maskCoords,
                _confettiContainer  = null,
                _confettiTimeline0   = null,
                _confettiTimeline1   = null,
                _timelineDelay      = timelineDelay,
                _colourArray        = ["byp","ypb","pby"];

            ConfettiSS.ss = new createjs.SpriteSheet(ConfettiSS.spriteSheet);

            // Getters
            this.getContainer = function () {
              return _confettiContainer;
            };
            this.getContainerCoords = function () {
              return _containerCoords;
            };
            this.getMaskCoords = function () {
              return _maskCoords;
            };
            this.getColourArray = function () {
              return _colourArray;
            };
            this.getConfettiTimeline = function () {
              return _confettiTimeline;
            };
            this.playConfettiTimeline = function () {
                if(R.PLAYSOUND){
                    createjs.Sound.play("lineWin");
                }
                /*
                _confettiTimeline0.resume();
                _confettiTimeline1.resume(); 
                */

                var highlight = this.getContainer().getChildByName("background");

                var boxReminder = new TweenMax.to(highlight, 1, {
                    alpha: 1,
                    ease: "easeInOut",
                    //repeat: 3,
                    yoyo: true,
                    delay: 0,
                    onComplete:  function(){
                        TweenLite.to(highlight, 1, {
                            alpha: 1,
                            ease: "easeInOut"
                        }, 0);
                    }   
                });

            };
            this.getTimelineDelay = function () {
              return _timelineDelay;
            }

            // Setters 
            this.setContainer = function (prv) {
              _confettiContainer = prv;
            }
            this.setContainerCoords = function (prv) {
               _containerCoords = prv;
            }
            this.setMaskCoords = function (prv) {
               _maskCoords = prv;
            }
            this.setConfettiTimeline0 = function (prv) {
              _confettiTimeline0   = prv;
            }
            this.setConfettiTimeline1 = function (prv) {
              _confettiTimeline1   = prv;
            }

            init(this);
            
      }




      function init(self) {
            var confettiContainer         = new createjs.Container();                
                confettiContainer.x       = self.getContainerCoords()[0];
                confettiContainer.y       = self.getContainerCoords()[1];
            var containerW                = self.getContainerCoords()[2],
                containerH                = self.getContainerCoords()[3];
                confettiContainer.name    = "confettiContainer";

            self.setContainer(confettiContainer);

            // create Mask
            var maskX = self.getMaskCoords()[0],
                maskY = self.getMaskCoords()[1],
                maskW = self.getMaskCoords()[2],
                maskH = self.getMaskCoords()[3];

            var randomColours = '#'+Math.floor(Math.random()*16777215).toString(16);
            var maskShape = new createjs.Shape();
                maskShape.graphics.beginFill(randomColours).drawRect(maskX,maskY, maskW, maskH);
                maskShape.alpha = 0;
                maskShape.name = "maskShape";
                confettiContainer.addChild(maskShape);

            var background = new createjs.Bitmap(images.goldHighlight);
              background.regX = 0;
              background.regY = 0;
              background.x = maskX //self.getContainerCoords()[0];;
              background.y = maskY //self.getContainerCoords()[1];
              background.mask = maskShape
              background.alpha = 0;
              background.name = "background";
             
/*
            var background = new createjs.Shape();
                background.graphics.beginFill("#FFF").drawRect(maskX,maskY, maskW, maskH);
                background.alpha = 0;
                background.name = "background";
                 */

            confettiContainer.addChild(background);

            // no timeline version
            // create confetti peices
            /*
                for (var i = 0; i < 20; i++) {
                    var colour         = R.randomFromInterval(0,38),
                        confettiClip   = Helper.makeBitmapImage(colour, {
                            x: 0,
                            y: 0
                        }, 1, true, ConfettiSS);

                    confettiClip.x     = R.randomFromInterval(-20,containerW);                
                    confettiClip.y     = R.randomFromInterval(-10,containerH + 10);
          
                    confettiClip.gotoAndStop(colour);          

                    confettiContainer.addChild(confettiClip);

                    confettiClip.mask = maskShape;

                }
                */



            /*
            for (var offset = 0; offset <2; offset++) {

                var offsetDelay = 0;
                if (offset == 1) {
                    offsetDelay = 15;
                }

                // timeline holder
                var revealTimeLine = new TimelineMax({
                    smoothChildTiming : true,
                    repeat:-1,
                    useFrames:true,
                    paused:true,
                    delay: offsetDelay,
                    onComplete: function(){

                    },
                    onRepeat: function(){
                        for (var conf = 0; conf < this.getChildren().length; conf++) {
                            var newConf = this.getChildren()[conf];
                               // newConf.x = R.randomFromInterval(-40,containerW);
                              //  newConf.y = R.randomFromInterval(-100,-30);
                        }
                    }
                });

            
                // create confetti peices
                for (var i = 0; i < 6; i++) {
                    var colour         = self.getColourArray()[R.randomFromInterval(0,2)],
                        confettiClip   = Helper.makeBitmapImage(colour, {
                            x: 0,
                            y: 0
                        }, 1, true, ConfettiSS);

                    confettiClip.x     = R.randomFromInterval(-40,containerW);                
                    confettiClip.y     = R.randomFromInterval(-100,-30);
          
                    confettiClip.gotoAndPlay(colour);          

                    confettiContainer.addChild(confettiClip);

                    confettiClip.mask = maskShape;

                    revealTimeLine.to(confettiClip, 30, {
                        y: containerH +20,
                        ease:Linear.easeNone,
                        delay: R.randomFromInterval(0,30)
                    }, 0);

                }

                revealTimeLine.pause(true);
                R.confettiTimelines.push(revealTimeLine);

                if (offset == 1) {
                    self.setConfettiTimeline1(revealTimeLine);
                } else {
                    self.setConfettiTimeline0(revealTimeLine);
                }
            
        
        }*/
    }

    iwg._class("iwg.lib.Confetti", Confetti);
}(window));