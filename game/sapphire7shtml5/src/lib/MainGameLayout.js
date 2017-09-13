(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot     = window.com.camelot,
        core        = camelot.core,
        iwg         = camelot.iwg,
        lib         = iwg.lib,
        GS          = window.com.greensock,
        Helper      = lib.Helper,
        R           = lib.R,
        MEvent      = lib.MEvent,
        Swipe       = lib.Swipe,
        MatchOne    = lib.MatchOne,
        sapphireSS  = lib.flassets.SapphireSS,
        starSS      = lib.flassets.StarSS,

        MainGameLayout = function () {

            if (typeof MainGameLayout.instance === "object") {
                return MainGameLayout.instance;
            }

            MainGameLayout.instance = this;
            init();
            
        };

    function init() {
        //add events
        iwg.IWGEM.addEventListener(MEvent.MAINGAMEINTRO.type, mainGameIntro);
        
        // setup
        setupFirstWindow();
        setupBackground();

        R.MAINGAMECONTAINER.x = R.GAMEWIDTH + 300;
        R.MAINGAMECONTAINER.addChild(R.FIRSTGAMEWINDOW);

        var sound = Helper.makeBitmapImage('sound', {
            x: R.GAMEWIDTH - 80,
            y: R.GAMEHEIGHT - 100
        }, 1);
        sound.name = "sound";
        sound.alpha = 0;
        sound.scaleX = sound.scaleY = 1.15;
        
        var soundHitbox    = new createjs.Shape(); 
        soundHitbox.graphics.beginFill("#f00").drawCircle(20,20,40);
        sound.hitArea = soundHitbox;        
        

        sound.on('click', function () {
            MEvent.TOGGLESOUND.that = this;
            iwg.IWGEM.dispatchEvent(MEvent.TOGGLESOUND);
        });

        R.STAGE.addChild(R.SPLASH, R.MAINGAMECONTAINER, sound);
    }

    function setupBackground() {

        var backgroundContainer = new createjs.Container(),
            sapphireArray       = [],
            sapphirePositonArray = [
                // x, y, flip, large
                [150, 115, false, false],
                [155, 180, true, true],
                [85, 455, true, false],
                [10, 620, false, false],
                [800, 50, false, false],
                [890, 150, true, true],
                [760, 250, false, false],
                [840, 520, true, true]
            ]

        for (var i = 0; i < sapphirePositonArray.length; i++) {

            var sapphire = Helper.makeBitmapImage("turnBig", {x: sapphirePositonArray[i][0], y:sapphirePositonArray[i][1]}, 1, true, sapphireSS);
                
            sapphire.playCount = 0;
            // if large is true
            if (sapphirePositonArray[i][3]) {
                sapphire.scaleX = sapphire.scaleY = 1.4;    
            }
            // if sapphire is to be flipped
            if ( sapphirePositonArray[i][2]) {
                sapphire.scaleX = -sapphire.scaleX;
            }

            sapphire.on('animationend', function(){
                                
                if(Helper.isOdd(this.playCount)){
                    this.gotoAndStop('turnBig'); 
                    var self = this;
                    setTimeout(function(){
                        self.gotoAndPlay('turnBig');
                    }, Helper.randomFromInterval(100, 1000));   
                }

                this.playCount++;

            });
            
            sapphireArray.push(sapphire);
            R.STAGE.addChild(sapphire);

        }
        // start them off and random times
        sapphireArray.forEach(function(sapphire){
            setTimeout(function(){
                sapphire.gotoAndPlay('turnBig');
            }, Helper.randomFromInterval(100, 1000));
        });


    }
    
    function setupFirstWindow() {

        var firstWindow     = new createjs.Container(),
            turnsContainer  = new createjs.Container(),
            background7     = Helper.makeBitmapImage('bg_7', {
                x: 220,
                y: 200
            }, 1, true),
            instructions    = Helper.makeBitmapImage('instructions', {
                x: R.GAMEWIDTH / 2 ,
                y: 585
            }, 1, true);

        turnsContainer.name = "turnsContainer";
        turnsContainer.addChild(background7);

        
        // make new asset for each 
        for(var i = 0; i < 10; i++){
            
            var turn = new MatchOne(i);

            turn.getContainer().x = turn.getPosition()[i][0];
            turn.getContainer().y = turn.getPosition()[i][1];


            R.TURNSARRAY.push(turn);
            turnsContainer.addChild(turn.getContainer());
            
        }
        
        turnsContainer.x = 300;
        turnsContainer.y = 70;

        firstWindow.addChild( instructions, turnsContainer);
        firstWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);

        R.FIRSTGAMEWINDOW = firstWindow;
        R.FIRSTGAMEWINDOW.name = "firstGameWindow";

    }

    function mainGameIntro() {

        setTimeout(function () {
            
            if(R.PLAYSOUND){
                createjs.Sound.play('whoosh');
            }  
            TweenLite.to(R.MAINGAMECONTAINER, 1, {
                x: 0,
                onComplete: function(){
                    // initiate prompt
                    for(var i = 0; i < R.TURNSARRAY.length; i++ ) {
                        var asset = R.TURNSARRAY[i];
                        asset.promptAssets();
                    };
                    iwg.IWGEM.dispatchEvent(MEvent.PROMPT);       
                }
            });
            TweenLite.to(R.STAGE.getChildByName("sound"), 1, {
                delay: 0.5,
                alpha:1
            });

        }, 500);
    }

    //namespace path
    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));
