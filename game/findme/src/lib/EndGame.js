(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Sound           = lib.Sound,
        Legend          = lib.Legend,
        Board           = lib.Board,
        PrizeTable      = lib.PrizeTable,
        Timer           = lib.Timer,
        Ticket          = lib.Ticket,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        EndGame = function (name) {

			if (!name){
                console.warn('EndGame instance has no name');
                return false;
            }

            if (typeof EndGame.instance === "object") {
               return EndGame.instance;
            }
            EndGame.instance = this;

		    var _instance       = this,
		        _name           = name,
		        _stage          = null,
                _canvas         = null,
                _active         = false,
                _enabled        = false,
                _height         = null,
                _width          = null,
                _rowsWonCount   = 0,
                _position       = {
                    x: 0,
                    y: 0
                },
                _endGame        = function() {

                    iwg.IWGEM.trigger('gamePause');
                    iwg.IWGEM.trigger('disableButtons', [["instruction"]]);

                    _enabled = true;
                    _active = true;

                    Timer.instance.setActive(false);

                    // logic to display correct endGame screen
                    // win game
                    // get level of trophy


                    var trophy          = Timer.instance.getCurrentTrophy(),
                        winnerContainer = _stage.getChildByName('winnerContainer'),
                        loserContainer  = _stage.getChildByName('loserContainer'),
                        moneyContainer  = _stage.getChildByName('winnerContainer').getChildByName('moneyContainer'),
                        money           = moneyContainer.getChildByName('money'),
                        trophyBitmap    = _stage.getChildByName('legitFinish').getChildByName('trophy'),
                        finishButton    = _stage.getChildByName('finishButton');

                    var rowWon0, rowWon1;
                    if (_stage.getChildByName('rowWonContainer0')){
                        rowWon0         = _stage.getChildByName('rowWonContainer0');
                        rowWon0.x       = 740;

                    }
                    if (_stage.getChildByName('rowWonContainer1')){
                        rowWon1         = _stage.getChildByName('rowWonContainer1');
                        rowWon1.x       = 740;
                    }

                    finishButton.x  = 700;

                    if (trophy !== null){
                        trophyBitmap.gotoAndStop("endgame_" + trophy);
                    };
                    TweenMax.to(trophyBitmap, 0.7, { delay: 2, rotation:trophyBitmap.rotation+15,  yoyo:true, repeat:-1, repeatDelay: 1, ease:Elastic.easeInOut });

                    // insert correct value of prize won and center
                    money.text          = Helper.formatInt(Legend.instance.getBank());
                    moneyContainer.regX = moneyContainer.getBounds().width / 2;

                    var timeLeft        = Timer.instance.getCurrentTime(),
                        currentLevel    = Board.instance.getLevel(),
                        string          = null,
                        level           = _stage.getChildByName('legitFinish').getChildByName('timerUpperText');

                    var timer = _stage.getChildByName('legitFinish').getChildByName('timerLowerText');
                    if ( currentLevel === 14) {
                        level.text  = "All 14 symbols revealed with";
                        timer       = _stage.getChildByName('legitFinish').getChildByName('timerLowerText');
                        timer.text  = "0:"+(90 - timeLeft)+" SECONDS REMAINING";
                    } else {
                        level.text  = "you found " + currentLevel + "/14 items";
                        timer.text  = null;
                    }


                    if ( Ticket.instance.getOutcome().wT === 0){
                        winnerContainer.alpha   = 0;
                        loserContainer.y        = 320;
                        loserContainer.alpha    = 1;
                    } else {
                        loserContainer.alpha    = 0;
                        winnerContainer.alpha   = 1;
                        winnerContainer.y       = 320;
                    }
                    finishButton.y          = 490;

                    if ( !core.IWG.ame('get', {vars: ['iwgIsWager'] })){
                        loserContainer.alpha 	= 0;
                        winnerContainer.alpha	= 0;
                        var rowWon0, rowWon1;
                        if (_stage.getChildByName('rowWonContainer0')){
	                    	rowWon0         	= _stage.getChildByName('rowWonContainer0');
	                    	rowWon0.alpha		= 0;
	                    }
	                    if (_stage.getChildByName('rowWonContainer1')){
	                    	rowWon1         	= _stage.getChildByName('rowWonContainer1');
	                    	rowWon1.alpha		= 0;
	                    }

	                    finishButton.y 			= 390;

                    }

                    _stage.update();

                    TweenMax.to(_canvas, 0.7, { x: 0, ease: Elastic.easeInOut, onStart: function(){
                        if (Sound.instance.getSound()){
                            if( Number(Ticket.instance.getOutcome().wT) === 0 ){
                                createjs.Sound.play("endLose");
                            } else {
                                createjs.Sound.play("endWin");
                            };
                        };
                    }, onComplete: function(){
                        if (Sound.instance.getSound()){
                            createjs.Sound.play("trophyWin");
                        }

                        iwg.IWGEM.trigger('enableButtons', [["prizeTable"]]);

                    } });
                    TweenMax.to(finishButton, 1, { scaleX: 1.2, scaleY: 1.2, delay: 4, yoyo: true, repeat: -1});




                },
                _closeGame      = function() {
                    top.location.href = "http://www.sideplay.com/portfolio/game/67/Find%20Me";    
                    // core.IWG.ame('closeGame');
                },
                _rowWon         = function(rowObject) {

                    var container   = new createjs.Container(),
                        prizeValue  = rowObject.prizeIcon.clone(),
                        rowData     = rowObject.rowIcons,
                        highlight   = 'lw' + prizeValue.name.split('l')[1];

                    prizeValue.gotoAndStop(highlight);
                    prizeValue.scaleX = prizeValue.scaleY = 0.7;

                    container.name  = "rowWonContainer" + _rowsWonCount;

                    for(var i = 0; i < rowData.length; i++){

                        var clone = rowData[i].clone(true);
                        container.addChild(clone);

                    };

                    container.addChild(prizeValue);

                    container.regX  = container.getBounds().width / 2;
                    container.y     = 220 + (_rowsWonCount * 70);

                    if (Sound.instance.getSound()){
                        createjs.Sound.play("lineWin");
                    }

                    _stage.addChild(container);
                    _stage.update();

                    _rowsWonCount++;
                },
                _showEndGame    = function() {
                    if (_enabled){
                        TweenMax.to(_canvas, 0.7, {y: 0, ease: Elastic.easeInOut});
                    }
                },
                _hideEndGame    = function() {
                    if ( _enabled ){
                        TweenMax.to(_canvas, 0.7, {y: 1200, ease: Elastic.easeInOut});
                    }
                },
                _update         = function() {
                    if (_active) {
                        _stage.update();
                    }
                },
                _subscribe      = function() {
                    iwg.IWGEM.on('update', _update);
                    iwg.IWGEM.on('endGame', _endGame);
                    iwg.IWGEM.on('closeGame', _closeGame);
                    iwg.IWGEM.on('rowWon', _rowWon);
                    iwg.IWGEM.on('showEndGame', _showEndGame);
                    iwg.IWGEM.on('hideEndGame', _hideEndGame);

                }(),
                _unsubscribe    = function() {
                    iwg.IWGEM.off('update');
                    iwg.IWGEM.off('endGame');
                    iwg.IWGEM.off('finishGame');
                    iwg.IWGEM.off('rowWon');
                    iwg.IWGEM.off('showEndGame');
                    iwg.IWGEM.off('hideEndGame');
                };

            // getters
            this.getStage       = function() {
                return _stage;
            };
            this.getCanvas      = function() {
                return _canvas;
            };
            this.getActive      = function() {
                return _active;
            };
            this.getEnabled     = function() {
                return _enabled;
            };
            this.getHeight      = function() {
                return _height;
            };
            this.getWidth       = function() {
                return _width;
            };

            // setters
            this.setWidth       = function(prv) {
                _width = prv;
            };
            this.setHeight      = function(prv) {
                _height = prv;
            };
            this.setPosition    = function(prv) {
                if (prv.x) {
                    _position.x = prv.x;
                };
                if (prv.y) {
                    _position.y = prv.y;
                };
                TweenMax.set(_canvas, { x: _position.x, y: _position.y});
            };

            // unsubscribe
            this.unsubscribe        = function() {
                _unsubscribe;
            };

            core.IWG.ame('canvasStack', {
                create: _name,
                parentDiv: 'scaleDiv',
                w: 960,
                h: 640,
                z: 5
            });

            _canvas = document.getElementById(_name);
            _stage  = new createjs.Stage(_canvas);

            init.bind(this)();

        };

    function init() {

       setupLayout.bind(this)();

       this.getStage().update();

    }

    function setupLayout() {

        var logo                = Helper.makeBitmapImage('logo', {x: 480, y: 100}, 1, true, MasterSS),
            background          = new createjs.Shape(),

            // left side
            legitFinish         = new createjs.Container(),
            starburst           = Helper.makeBitmapImage('endgame_starburst', {x: 215, y: 323}, 1, true, MasterSS),
            timerUpperText      = new createjs.Text("ALL 14 SYMBOLS REVEALED WITH", "bold 24px komika_axisregular", "#ffffff"),
            timerLowerText      = new createjs.Text("0:** SECONDS REMAINING", "bold 24px komika_axisregular", "#ffffff"),
            trophy              = Helper.makeBitmapImage('endgame_gold', {x: 215, y:320}, 1, true, MasterSS),
            bubble              = Helper.makeBitmapImage('endgame_bubble', {x: 220, y:315}, 1, true, MasterSS),
            divide              = Helper.makeBitmapImage('endgame_div', {x: 480, y: 350}, 1, true, MasterSS);
            legitFinish.name    = "legitFinish";
            timerLowerText.name = "timerLowerText";
            trophy.name         = 'trophy';
            starburst.scaleX 	= 0.85;
            legitFinish.addChild(starburst, timerUpperText, timerLowerText, trophy, bubble, divide);

            // right side
            var winnerContainer = new createjs.Container(),
            prizeTableIndictor  = Helper.makeBitmapImage('viewprizetable',{x: 735, y: 145}, 1, true, MasterSS),
            congratulations     = new createjs.Text("CONGRATULATIONS!", "bold 30px komika_axisregular", "#ffffff"),
            youveWon            = new createjs.Text("You have WON", "bold 24px komika_axisregular", "#ffffff"),
            moneyContainer      = new createjs.Container(),
            poundSign           = Helper.makeBitmapImage('pound', {x: 0, y: 0}, 1, false, MasterSS),
            money               = new createjs.Text("£££££", "bold 42px komika_axisregular", "#ffffff");

            money.textBaseline  = "alphabetic";
            money.x             = 40;
            money.y             = 38;

            winnerContainer.name= "winnerContainer";
            moneyContainer.name = "moneyContainer";
            money.name          = "money";
            youveWon.y          = 40;
            moneyContainer.y    = 80;
            congratulations.textAlign = youveWon.textAlign = "center";
            money.textAlign     = "left";
            winnerContainer.x   = 700;

            moneyContainer.addChild(poundSign, money);
            winnerContainer.addChild(congratulations, youveWon, moneyContainer);

            winnerContainer.alpha = 0;

            var hitBox          = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0,0,250,75));
            prizeTableIndictor.hitArea = hitBox;

            prizeTableIndictor.on('click', function(){
                iwg.IWGEM.trigger('showPrizeTable');
            });

            var loserContainer  = new createjs.Container(),
            sorry               = new createjs.Text("sorry", "bold 24px komika_axisregular", "#ffffff"),
            betterLuck          = new createjs.Text('better luck next time', "bold 24px komika_axisregular", "#ffffff");
            loserContainer.name = "loserContainer";
            sorry.textAlign     = betterLuck.textAlign = "center";
            betterLuck.y        = 40;
            loserContainer.x    = 700;
            loserContainer.addChild(sorry, betterLuck);

            winnerContainer.y   = loserContainer.y = 200;

            var finishButton    = Helper.makeBitmapImage('button_finish', {x: 480, y: 390}, 1, true, MasterSS);
            finishButton.name   = "finishButton";

            finishButton.on('click', function(){
                iwg.IWGEM.trigger('closeGame');
            });

        timerUpperText.name         = "timerUpperText";
        timerUpperText.x            = 250;
        timerUpperText.y            = 450;
        timerUpperText.textAlign    = 'center';

        timerLowerText.name         = "timerLowerText";
        timerLowerText.x            = 250;
        timerLowerText.y            = 490;
        timerLowerText.textAlign    = 'center';

        background.x = 25;
        background.y = 20;
        background.graphics.setStrokeStyle(5,"round").beginStroke('#fff').beginFill('rgba(0,0,0,0.8)').drawRoundRect(0,90,910,430,10);
        background.shadow = new createjs.Shadow("#000000", 1, 5, 10);

        this.getStage().addChild( background, legitFinish, logo, finishButton, loserContainer, winnerContainer, prizeTableIndictor);

        TweenMax.set(this.getCanvas(), { x: 1200 });

    };

    EndGame.prototype.destroy = function() {
        this.unsubscribe();
    }

    EndGame.VERSION = '0_0_1';
    IWGInit = function () {
        _EndGame = new EndGame();
    };
    iwg._class("iwg.lib.EndGame", EndGame);
}(window));
