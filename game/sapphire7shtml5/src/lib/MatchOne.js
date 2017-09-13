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
        revealSS        = lib.flassets.RevealSS,
        MEvent			= lib.MEvent,
        GameAsset 		= lib.GameAsset,
        Helper			= lib.Helper,
        Animate         = lib.Animate,

    MatchOne = function (itt) {
        
        var _container  = new createjs.Container(),
            _num        = itt,
            _gridSize   = null,
            _assetArray = [],
            _isFinished = false,
            _winCount   = 0,
            _hasWon     = false,
            _assetRows  = [],
            _revealed   = false,
            _position   = [
                [0, 20],
                [140, 20],
                [280, 20],
                [420, 20],
                [0, 170],
                [140, 170],
                [280, 170],
                [420, 170],
                [105, 320],
                [235, 320]
            ];

        this.getContainer = function(){
            return _container;
        }
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
        this.getPosition = function() {
            return _position;
        }
        this.getRevealed = function() {
            return _revealed;
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
        this.setRevealed = function(prv) {
            _revealed = prv;
        }
        
        init.bind(this)();
    };
    
    function init(){ 
            
        setupAssets.bind(this)();
        
    }
    
    function setupAssets(){
    
        var assetContainer      = this.getContainer(),
            assetAnimations     = [],
            symbol              = Helper.makeBitmapImage("reveal", {x: 0, y: 0}, 1, false, revealSS),
            token               = Helper.makeBitmapImage("black6", {x: 0, y: 0}, 1, true),
            prizeSymbol         = Helper.makeBitmapImage("prize", {x: 0, y: 65}, 1, true),
            prizeToken          = Helper.makeBitmapImage("p200", {x: 0, y: 65}, 1, true),
            asset               = new GameAsset( assetContainer, null, null ),
            self                = this;

        symbol.name         = "symbol";
        token.name          = "token";            
        prizeSymbol.name    = "prizeSymbol";
        prizeToken.name     = "prizeToken";



        asset.name          = this.getNum();

        token.alpha         = 0;
        token.scaleX = token.scaleY = 0.5;
        prizeToken.alpha    = 0;
        prizeToken.scaleX = prizeToken.scaleY = 0.5;

        assetContainer.asset = asset;
        assetContainer.addChild( token, symbol, prizeToken, prizeSymbol);

        // give on click event
        assetContainer.on('click', function(){
            self.setRevealed(true);
            this.asset.setIsRevealed(true);
            if (R.clickCount < 8){
                Animate.stopAnimation();
                Animate.gameReveal(this);
            }
        },null, true);
    }
    
    MatchOne.prototype.promptAssets = function() {
            var asset = this.getContainer().asset;
            Animate.prompt(asset);
    }
    
    MatchOne.prototype.stopAnimation = function() {
        var asset = this.getContainer().asset;
        Animate.stopAnimation(asset);
    }
    
    //namespace path
    iwg._class("iwg.lib.MatchOne", MatchOne);
}(window));