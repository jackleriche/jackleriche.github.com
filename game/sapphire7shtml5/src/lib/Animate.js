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
        
    }
            
    Animate.gameReveal  = function(self){
        
        var symbol       = self.getChildByName('symbol'),
            token           = self.getChildByName('token'),
            prizeSymbol = self.getChildByName('prizeSymbol'),
            prizeToken   = self.getChildByName('prizeToken'),
            data              = R.TICKET.getTurnArray()[R.clickCount],
            asset             = self.asset,
            doubler         = false;


        if(R.PLAYSOUND){
            createjs.Sound.play("diamondRotationSound");
        }

        asset.setIsWinner( parseInt(data.w) );
        asset.setTicketLabel( parseInt(data.p) );

        

        var colour = "black";
        if ( Helper.startsWith( "-" , data.t )) {
            var num = data.t.replace("-", "");
            colour = "blue"
            doubler = true;
        } else {
            num = data.t;
        }

        var tokenIcon = colour + num;
        token.gotoAndStop( tokenIcon );
        
        var prizeTokenIcon = "p" + R.TICKET.getPrizeList()[parseInt(data.p)];
        prizeToken.gotoAndStop( prizeTokenIcon );

         if(num == 7){

            prizeTokenIcon = "w" + R.TICKET.getPrizeList()[parseInt(data.p)];
            prizeToken.gotoAndStop( prizeTokenIcon );

            var value = parseInt(R.TICKET.getPrizeList()[parseInt(data.p)]);
            if (doubler) {
                value = value * 2;
            }
            // deposit into bank
            core.IWG.ame('bank', {
                deposit: [value],
                log: true
            });

            token.x =  -28;
            token.y =  -20;
        }

        symbol.gotoAndPlay('reveal');
        TweenMax.to(token, 0.9, {scaleX: 1, scaleY: 1, delay: 0.9, alpha: 1, ease: "easeInOutElastic"});
        TweenMax.to(prizeToken, 0.7, {scaleX: 1, scaleY: 1, delay: 1.1, alpha: 1, ease: "easeInOutElastic", 
            onStart: function(){

                // play sounds
                if(R.PLAYSOUND){
                    if (num != 7){
                        createjs.Sound.play("lenseFlare"); 
                    } else {
                        if ( doubler ){
                            createjs.Sound.play("lineWinSound2");
                        } else {
                            createjs.Sound.play("lineWinSound");    
                        }                    
                    }
                }
            },
            onComplete: function() {
                Animate.startAnimation();
            }
        });
        
        symbol.on("animationend", function(evt){
            evt.currentTarget.stop();
            symbol.alpha = 0;
            prizeSymbol.alpha = 0;
        });

        R.clickCount++;

        iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
    
    };
    
    /* Animate.explode
     *
     */
    Animate.explode = function(maxParticles, asset) {
        
        var explosionContainer  = new createjs.Container();
        explosionContainer.x    = 0;
        explosionContainer.y    = 30;
        
        for ( var angle = 0; angle < 360; angle += Math.round(360/maxParticles)){
         
            var particle = new createjs.Shape();
            particle.graphics.beginFill("white").drawCircle(0, 0, Helper.random(10, 30));
            TweenMax.to(particle, 0.5, { y: Helper.random( -200, 200), x: Helper.random(-200, 200), alpha: 0});
            explosionContainer.addChild(particle);

        }
        
        Helper.moveToTop(asset.getContainer().getChildByName('token'));
        asset.getContainer().addChild( explosionContainer ); 

    }
    
    Animate.prompt = function(asset){
        
        var container   = asset.getContainer(),
            symbol      = container.getChildByName('symbol');
    
        R.promptAnimation.push(
            TweenMax.to(symbol, 0.6, {scaleX: 1.1, scaleY: 1.1, repeatDelay: 0.5, repeat: -1, yoyo: true, delay: 3})
        );
    }

    Animate.startAnimation  = function() {

        for(var i = 0; i < R.TURNSARRAY.length; i++) {

            var asset = R.TURNSARRAY[i].getContainer().asset;
            if (!asset.getIsRevealed() && R.STATE !== 1){
                var a = R.promptAnimation[asset.name];
                a.restart(true);
            }
        }
    }
    
    Animate.stopAnimation   = function(){

        for(var anim in R.promptAnimation){
            var a = R.promptAnimation[anim];        
            a.seek(0);
            a.pause();
            
        }
        
    }
    
    //namespace path
    iwg._class("iwg.lib.Animate", Animate);
}(window));