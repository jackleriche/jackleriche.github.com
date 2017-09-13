(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 		= window.com.camelot,
        core 			= window.com.camelot.core,
        iwg 			= camelot.iwg,
        lib 			= iwg.lib,
        R           	= lib.R,
        Helper          = lib.Helper,
        MEvent          = lib.MEvent,
        Ticket          = lib.Ticket,

    Animate = function () {

        init(this);

    }

    function init(self){

    }

    Animate.gameReveal = function(self){

        var symbol  = self.getChildByName('symbol'),
            token   = self.getChildByName('token'),
            data    = R.TICKET.getTurnArray()[R.clickCount],
            asset   = self.asset;

        asset.setIsWinner( parseInt(data.w) );
        asset.setTicketLabel( parseInt(data.p) );

        var tokenIcon = "p" +R.TICKET.getPrizeList()[parseInt(data.p)];
        token.gotoAndStop(tokenIcon);

        symbol.gotoAndPlay('Animate');
        if(R.PLAYSOUND){
            createjs.Sound.play("reveal");
        }

        symbol.on("animationend", function(evt){
            evt.currentTarget.stop();
            symbol.alpha = 0;
            TweenMax.to(token, 0.5, {
                alpha: 1,
                onStart: function(){
                    MEvent.CHECKMATCH.turnData = data;
                    iwg.IWGEM.dispatchEvent(MEvent.CHECKMATCH);
                },
                onComplete: function(){

                    MEvent.CHECKISFINISHED.self = R.GAME;
                    iwg.IWGEM.dispatchEvent(MEvent.CHECKISFINISHED);
                }
            });
        });

        R.clickCount++;
    }

    Animate.particles = function(num, p){

        var particleContainer   = new createjs.Container();
        particleContainer.name  = "particleContainer";

        setInterval(create, num);

        function create(){

            var particleConfig = {
                x: Helper.randomFromIntervalRaw(-50,50),
                y: Helper.randomFromIntervalRaw(-50,50),
                speed: Helper.randomFromIntervalRaw(1,2)
            }

            var particle = new createjs.Shape();
            particle.graphics.beginFill("white").drawCircle(0, 0, 5);
            particle.x = -70;
            particle.y = -50;

            particle.shadow = new createjs.Shadow("gold", 0, 0, 10);

            TweenMax.to(particle, particleConfig.speed, {
                x: particle.x + particleConfig.x,
                y: particle.y + particleConfig.y,
                onComplete: function(){
                    p.getChildByName("particleContainer").removeChild(particle);
                }
            });

            particleContainer.addChild(particle);

        }
        p.addChild(particleContainer);

        Helper.moveToTop(p.children[0]);


    };
    //namespace path
    iwg._class("iwg.lib.Animate", Animate);
}(window));
