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
        ConfettiSS = lib.flassets.ConfettiSS,     

        Confetti = function (containerCoords, maskCoords) {
    
            var _containerCoords    = containerCoords,
                _maskCoords         = maskCoords,
                _confettiContainer  = null,
                _confettiTimeline   = null,
                _colourArray        = ["byp","ypb","pby"];

            ConfettiSS.ss = new createjs.SpriteSheet(ConfettiSS.spriteSheet);

            // Getters
            this.getContainer = function () {
              return _confettiContainer;
            }
            this.getContainerCoords = function () {
              return _containerCoords;
            }
            this.getMaskCoords = function () {
              return _maskCoords;
            }
            this.getColourArray = function () {
              return _colourArray;
            }
            this.getConfettiTimeline = function () {
              return _confettiTimeline;
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
            this.setConfettiTimeline = function (prv) {
              _confettiTimeline = prv;
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

           // confettiContainer.setBounds(self.getContainerCoords()[0],self.getContainerCoords()[1],containerW,containerH)

            self.setContainer(confettiContainer);

            // create Mask
            var maskX = self.getMaskCoords()[0],
                maskY = self.getMaskCoords()[1],
                maskW = self.getMaskCoords()[2],
                maskH = self.getMaskCoords()[3];


            var maskShape = new createjs.Shape();
            maskShape.graphics.beginFill("#F00").drawRect(maskX,maskY, maskW, maskH);
            maskShape.alpha = 0;
            maskShape.name = "maskShape";
            confettiContainer.addChild(maskShape);

            // timeline holder
            var revealTimelines = [];
        
            // create confetti peices
            for (var i = 0; i < 6; i++) {
                var colour         = self.getColourArray()[R.randomFromInterval(0,3)];

                var confettiClip   = Helper.makeBitmapImage(colour, {
                            x: 0,
                            y: 0
                        }, 1, true, ConfettiSS);

                confettiClip.x     = R.randomFromInterval(-40,containerW);                
                confettiClip.y     = R.randomFromInterval(-100,0);
      
                confettiClip.gotoAndPlay(colour);          

                confettiContainer.addChild(confettiClip);

                confettiClip.mask = maskShape;

                var revealTimeLine = new TimelineMax({
                    smoothChildTiming : true,
                    repeat:-1,
                    useFrames:true,
                    paused:true,
                    onComplete: function(){
   
                    }
                });

                revealTimeLine.to(confettiClip, 30, {
                    y: containerH +20,
                    ease:Linear.easeNone,
                    delay:R.randomFromInterval(0,30)
                }, 0);

                revealTimelines.push(revealTimeLine);
            }

            self.setConfettiTimeline(revealTimelines)
    }

    iwg._class("iwg.lib.Confetti", Confetti);
}(window));