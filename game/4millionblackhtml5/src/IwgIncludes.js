/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [
    { "src": "src/thirdParty/easeljs-0.8.0.min.js", "id": "easelJS" },
    { "src": "src/thirdParty/TweenMax.min.js", "id": "TweenMax" },
    { "src": "src/thirdParty/TimelineMax.min.js", "id": "TimeLineMax" },
    // sounds
    {"src": "src/imports/audio/playButton.mp3",           "id": "playButton"},
    {"src": "src/imports/audio/game1_bag.mp3",            "id": "game1Bag"},
    {"src": "src/imports/audio/game2_pound.mp3",          "id": "game2Pound"},
    {"src": "src/imports/audio/game3_diamond.mp3",        "id": "game3Diamond"},
    {"src": "src/imports/audio/game4_moneyclip.mp3",      "id": "game4Moneyclip"},
    {"src": "src/imports/audio/game5_cash.mp3",           "id": "game5Cash"},
    {"src": "src/imports/audio/game5_coin.mp3",           "id": "game5Coin"},
    {"src": "src/imports/audio/wordPrize.mp3",            "id": "wordPrize"},
    {"src": "src/imports/audio/rowWin.mp3",               "id": "rowWin"},
    {"src": "src/imports/audio/endWin.mp3",               "id": "endWin"},
    {"src": "src/imports/audio/endLose.mp3",              "id": "endLose"},
    
    // images
    // highlightSS
    { "src": "src/imports/img/highlightSS.png", "id": "highlightSS" },
    { "src": "src/imports/json/highlightSS.json", "id": "highlightSS-data", type: createjs.LoadQueue.JSON },
    
    // flareSS
    { "src": "src/imports/img/flareSS.png", "id": "flareSS" },
    { "src": "src/imports/json/flareSS.json", "id": "flareSS-data", type: createjs.LoadQueue.JSON },
    // flareSS
    { "src": "src/imports/img/burstSS.png", "id": "burstSS" },
    { "src": "src/imports/json/burstSS.json", "id": "burstSS-data", type: createjs.LoadQueue.JSON },
    
    // gameFiles
    { "src": "src/imports/js/Global.js",                "id": "Global" },
    { "src": "src/lib/Animation.js",                    "id": "Animation" }, 
    { "src": "src/lib/SpriteSheets.js",                 "id": "SpriteSheets" }, 
    { "src": "src/lib/Helper.js",                       "id": "Helper" },
    { "src": "src/lib/Scene.js",                        "id": "Scene" },
    { "src": "src/lib/GameObject.js",                   "id": "GameObject" }, 
    { "src": "src/lib/ClickableGameObject.js",          "id": "ClickableGameObject" }, 
    { "src": "src/lib/Ticket.js",                       "id": "Ticket" },
    { "src": "src/lib/Match.js",                        "id": "Match" }, 
    { "src": "src/lib/Compare.js",                      "id": "Compare" }, 
    { "src": "src/lib/Equals.js",                       "id": "Equals" }, 
    { "src": "src/lib/Scale.js",                        "id": "Scale" }, 
    { "src": "src/lib/Pause.js",                        "id": "Pause" }, 
    { "src": "src/lib/Sound.js",                        "id": "Sound" },
   
    { "src": "src/lib/EndGame.js",                          "id": "EndGame" },
    { "src": "src/lib/Splash.js",                           "id": "Splash" },
    { "src": "src/lib/MainLayout.js",                       "id": "MainLayout" }, 
   
        
    { "src": "src/lib/Slide.js",                            "id": "Slide" } ,
    { "src": "src/lib/SplashDual.js",                       "id": "Splash" },
    { "src": "src/lib/EndGameDual.js",                      "id": "EndGame" },
    { "src": "src/lib/MainLayoutDual.js",                   "id": "MainLayout" },
        
    // common
    { "src": "src/lib/4millionBlack.js",                "id": "4millionBlack" },
    { "src": "src/IWGinit.js",                          "id": "IWGinit" }
];


miwgdefine(function () {
    
    var _desktopMode = true;
    if ( window.com.camelot.core.IWG.ame('get', 'UA').os.name === "iOS" || window.com.camelot.core.IWG.ame('get', 'UA').os.name === "Android" ) {
        
        if ( window.com.camelot.core.IWG.ame('get', 'UA').device.model === "iPad" ) {
            _desktopMode = true;
        } else {
            _desktopMode = false;
        }
        
    } else {
        _desktopMode = true;
    }
    
    if ( _desktopMode ) {
        
        _manifest.unshift( { "src": "src/imports/img/masterSingleSS.png",       "id": "masterSS" } )
        _manifest.unshift( { "src": "src/imports/json/masterSingleSS.json",     "id": "masterSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/moneyBagSS.png",           "id": "moneyBagSS" } );
        _manifest.unshift( { "src": "src/imports/json/moneyBagSS.json",         "id": "moneyBagSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/poundSS.png",              "id": "poundSS" } );
        _manifest.unshift( { "src": "src/imports/json/poundSS.json",            "id": "poundSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/diamondSS.png",            "id": "diamondSS" } );
        _manifest.unshift( { "src": "src/imports/json/diamondSS.json",          "id": "diamondSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/moneyClipSS.png",          "id": "moneyClipSS" } );
        _manifest.unshift( { "src": "src/imports/json/moneyClipSS.json",        "id": "moneyClipSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/coinSS.png",               "id": "coinSS" } );
        _manifest.unshift( { "src": "src/imports/json/coinSS.json",             "id": "coinSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/cashWadSS.png",            "id": "cashWadSS" } );
        _manifest.unshift( { "src": "src/imports/json/cashWadSS.json",          "id": "cashWadSS-data", type: createjs.LoadQueue.JSON } );
        

        
       
        
    } else {
        
        _manifest.unshift( { "src": "src/imports/img/masterDualSS.png",         "id": "masterSS" } );
        _manifest.unshift( { "src": "src/imports/json/masterDualSS.json",       "id": "masterSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/moneyBagMobileSS.png",     "id": "moneyBagSS" } );
        _manifest.unshift( { "src": "src/imports/json/moneyBagMobileSS.json",   "id": "moneyBagSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/poundMobileSS.png",        "id": "poundSS" } );
        _manifest.unshift( { "src": "src/imports/json/poundMobileSS.json",      "id": "poundSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/diamondMobileSS.png",      "id": "diamondSS" } );
        _manifest.unshift( { "src": "src/imports/json/diamondMobileSS.json",    "id": "diamondSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/moneyClipMobileSS.png",    "id": "moneyClipSS" } );
        _manifest.unshift( { "src": "src/imports/json/moneyClipMobileSS.json",  "id": "moneyClipSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/coinMobileSS.png",         "id": "coinSS" } );
        _manifest.unshift( { "src": "src/imports/json/coinMobileSS.json",       "id": "coinSS-data", type: createjs.LoadQueue.JSON } );
        _manifest.unshift( { "src": "src/imports/img/cashWadMobileSS.png",      "id": "cashWadSS" } );
        _manifest.unshift( { "src": "src/imports/json/cashWadMobileSS.json",    "id": "cashWadSS-data", type: createjs.LoadQueue.JSON } );
        

        
    }
    

    return _manifest;
});



