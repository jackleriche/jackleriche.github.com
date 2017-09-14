(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 		= window.com.camelot,
        core 			= window.com.camelot.core,
        iwg 			= camelot.iwg,
        lib 			= iwg.lib,
        R           	= lib.R,
        images			= core.iwgLoadQ.images,
        MEvent			= lib.MEvent,
        GameAsset 		= lib.GameAsset,
        Helper			= lib.Helper,
        PoundSS         = lib.flassets.PoundSS,
        Animate         = lib.Animate,

    MatchGrid = function (num, gridSize) {

        if(!Helper.isDefined(num)){
            num = null
        }
        if(!Helper.isDefined(gridSize)){
            gridSize = 3;
        }

        var _num        = num,
            _gridSize   = gridSize,
            _assetArray = [],
            _isFinished = false,
            _winCount   = 0,
            _hasWon     = false,
            _assetRows  = [];

        this.getNum = function(){
            return _num;
        }
        this.getGridSize = function(){
            return _gridSize;
        }
        this.getAssetArray = function(){
            return _assetArray;
        }
        this.getIsFinished = function(){
            return _isFinished;
        }
        this.getWinCount = function(){
            return _winCount;
        }
        this.getHasWon = function(){
            return _hasWon;
        }
        this.getAssetRow = function(){
            return _assetRows;
        }

        this.setIsFinished = function(prv){
            _isFinished = prv;
        }
        this.setWinCount = function(prv){
            _winCount = prv;
        }
        this.setHasWon = function(prv){
            _hasWon = prv;
        }

        init(this);

    };

    function init(self){

        // add events
        iwg.IWGEM.addEventListener(MEvent.CHECKISFINISHED.type, checkIsFinished);
        iwg.IWGEM.addEventListener(MEvent.CHECKMATCH.type, checkMatch);

        setupAssets(self);

    }

    function setupAssets(self){

        var assetsContainer = new createjs.Container(),
            size            = self.getGridSize(),
            total           = size * size,
            gridRow         = 0,
            gridRowArray    = [],
            rowContainer    = new createjs.Container();
        // make grid
        for(var i = 0; i < total; i++){

            var assetContainer  = new createjs.Container,
                tokenString     = "p5000",
                token           = Helper.makeBitmapImage(tokenString, {
                    x: -70,
                    y: -50
                }, 0, true),
                symbol          = Helper.makeBitmapImage("animate", {
                    x: 0,
                    y: 0
                }, 1, true, PoundSS);

            symbol.name = "symbol";
            token.name  = "token";

            assetContainer.addChild(token, symbol);

            var gridCol = i % size;

            if( i % size === 0 && i !== 0 ){

                gridRowArray.push(rowContainer);
                gridRow++;
                rowContainer = new createjs.Container();

            }

            assetContainer.x = 300 + (250 * gridCol);
            assetContainer.y = 200 + (150 * gridRow);

            // make the assets
            var asset = new GameAsset(assetContainer, null, null);
            assetContainer.asset = asset;

            // give on click event
            assetContainer.on('click', function(){

                Animate.gameReveal(this);
                this.asset.setIsRevealed(true);
                self.isFinished();

            },null, true);
            rowContainer.addChild(assetContainer);
            // add to stage
            R.FIRSTGAMEWINDOW.addChild(rowContainer);
            // push into assetArray
            self.getAssetArray().push(asset);

        }
        self.getAssetRow().push(gridRowArray);

        R.FIRSTGAMEWINDOW.addChild(assetsContainer);

    }

    MatchGrid.prototype.isFinished = function () {

        var turns = this.getAssetArray(),
            allRevealed = false;

        for (var turn in turns) {
            if (turns[turn]) {
                if (turns[turn].getIsRevealed() === false) {
                    allRevealed = false;
                    break
                } else {
                    allRevealed = true;
                }
            }
        }
        if (allRevealed) {
            // reset and pause reminder
            //this.stopReminder();
            this.setIsFinished(true);

            for(var i in R.GAME.getAssetArray()){

                var asset = R.GAME.getAssetArray()[i];

                if(asset.getIsWinner() === 0){

                    // fire event to check all games in mainGame class
                    var token = asset.getContainer().getChildByName('token');
                    TweenLite.to(token, 0.5, {
                        delay: 1.5,
                        alpha: 0.4
                    });
                }
            }

            iwg.IWGEM.dispatchEvent(MEvent.CHECKENDGAME);
        }
    }

    function checkIsFinished(ev){

        ev.self.isFinished();

    }

    function checkMatch(ev){

        var turnData    = ev.turnData;

        if( parseInt(turnData.w) === 1){
            R.GAME.setWinCount( R.GAME.getWinCount() + 1 );
        }

        if(R.GAME.getWinCount() === 3 && R.GAME.getHasWon() === false){
            if(R.PLAYSOUND){
                createjs.Sound.play("lineWin");
            }
            R.GAME.setHasWon(true);
            core.IWG.ame('bank', {
                deposit: [parseInt(R.TICKET.getAmount())],
                log: true
            });


            var check = [],
                valid = false;
            // check all three values have the same amount
            for (var token in R.TICKET.getWinArray()){
                var p = R.TICKET.getWinArray()[token].p;
                check.push(p);
            }

            if(check.length > 0) {
                for(var i = 1; i < check.length; i++)
                {
                    if(check[i] !== check[0]){
                        valid = false;
                    }
                    valid = true;
                }
            }

            var winAssetArray = [];
            // get prise value
            for(var i in R.GAME.getAssetArray()){

                var asset = R.GAME.getAssetArray()[i];

                if(asset.getIsWinner() === 1){
                    winAssetArray.push(asset);
                    // put particles behind
                    Animate.particles(24, asset.getContainer());
                }
            }
        }
    }

    //namespace path
    iwg._class("iwg.lib.MatchGrid", MatchGrid);
}(window));
