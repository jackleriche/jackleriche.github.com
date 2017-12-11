(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Board           = lib.Board,
        Overlay         = lib.Overlay,
        Sound           = lib.Sound,
        Instruction     = lib.Instruction,
        PrizeTable      = lib.PrizeTable,
        Timer           = lib.Timer,
        EndGame         = lib.EndGame,
        Bubble          = lib.Bubble,
        WordBubble      = lib.WordBubble,
        Pause           = lib.Pause,
        MainGameLayout  = function (name) {

			if (!name){
                console.warn('MainGameLayout instance has no name');
                return false;
            }

            // singleton
            if (typeof MainGameLayout.instance === "object") {
                return MainGameLayout.instance;
            }
            MainGameLayout.instance = this;


		    var _stage        = null,
                _canvas       = null,
                _active       = false,
                _height       = null,
                _width        = null,
                _subscribe    = function() {

                }(),
                _unsubscribe  = function() {

                }();

            // getters
            this.getStage   = function(){
                return _stage;
            };
            this.getCanvas  = function(){
                return _canvas;
            };
            this.getActive  = function(){
                return _active;
            };
            this.getHeight  = function(){
                return _height;
            };
            this.getWidth   = function(){
                return _width;
            };

            // setters
            this.setWidth   = function( prv ) {
                _width = prv;
            };
            this.setHeight  = function( prv ) {
                _height = prv;
            };

            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;
            };



            init.bind(this)();

        };

    function init() {

        setupBoard.bind(this)();

    }

    function setupBoard() {

        var board       = new Board('board'),
            wordBubble  = new WordBubble('wordBubble'),
            overlay     = new Overlay('overlay'),
            sound       = new Sound('sound'),
            instruction = new Instruction('instruction'),
            prizeTable  = new PrizeTable('prizeTable'),
            timer       = new Timer('timer'),
            endGame     = new EndGame('endGame'),
            pause       = new Pause('pause');


        var setX = (960 / 2) - (429 / 2),
            setY = (640 / 2) - (228 / 2);
        wordBubble.setPosition({x: setX, y: setY});

        // setup instruction
        instruction.setOverlayPosition({ x: 18, y: 20 });
        instruction.setButtonPosition({ x: 735, y: 50 });

        // setup sound
        sound.setPosition({ x: 885, y: 50 });

        // legend setup
        prizeTable.setButtonPosition({ x: 810, y: 50 });
        prizeTable.setOverlayPosition({ x: 1200, y: 30 });

        // set timer
        timer.setPosition({x: 0, y: 575});
        timer.addMarker('timer_trophies_bronze', {x: 220, y: 26}, 91, 'bronze');
        timer.addMarker('timer_trophies_silver', {x: 350, y: 26}, 70, 'silver');
        timer.addMarker('timer_trophies_gold', {x: 490, y: 26}, 54, 'gold');
        timer.setTime(60);

        // board creation
        var positions = [
            {x: 50,  y: 110, scale: 0.9},
            {x: 65,  y: 200, scale: 1},
            {x: 125, y: 265, scale: 0.9},
            {x: 65,  y: 345, scale: 0.9},
            {x: 70,  y: 455, scale: 0.9},
            {x: 85,  y: 525, scale: 0.9},
            {x: 140, y: 150, scale: 0.9},
            {x: 175, y: 75,  scale: 0.9},
            {x: 200, y: 205, scale: 1},
            {x: 210, y: 290, scale: 0.9},
            {x: 215, y: 365, scale: 0.9},
            {x: 145, y: 400, scale: 0.9},
            {x: 180, y: 515, scale: 1},
            {x: 225, y: 125, scale: 0.9},
            {x: 275, y: 240, scale: 0.9},
            {x: 235, y: 450, scale: 0.9},
            {x: 301, y: 140, scale: 0.9},
            {x: 350, y: 220, scale: 0.9},
            {x: 325, y: 425, scale: 1},
            {x: 300, y: 500, scale: 0.9},
            {x: 400, y: 90,  scale: 1},
            {x: 410, y: 172, scale: 0.9},
            {x: 410, y: 450, scale: 1},
            {x: 490, y: 100, scale: 0.9},
            {x: 500, y: 517, scale: 0.9},
            {x: 565, y: 100, scale: 0.9},
            {x: 550, y: 195, scale: 1},
            {x: 545, y: 445, scale: 1},
            {x: 600, y: 500, scale: 0.9},
            {x: 645, y: 130, scale: 0.9},
            {x: 650, y: 200, scale: 0.9},
            {x: 655, y: 400, scale: 0.9},
            {x: 721, y: 140,  scale: 0.9},
            {x: 768, y: 228, scale: 0.9},
            {x: 700, y: 310, scale: 1},
            {x: 740, y: 385, scale: 0.9},
            {x: 750, y: 470, scale: 1},
            {x: 675, y: 510, scale: 1},
            {x: 800, y: 150, scale: 0.9},
            {x: 875, y: 150, scale: 0.9},
            {x: 850, y: 230, scale: 1},
            {x: 785, y: 305, scale: 0.9},
            {x: 880, y: 315, scale: 1},
            {x: 825, y: 375, scale: 0.9},
            {x: 850, y: 450, scale: 0.9},
            {x: 880, y: 525, scale: 0.9},
            {x: 810, y: 520, scale: 0.9}
        ];
        for (var i = 0; i < positions.length; i++) {
            board.addLayoutPosition(positions[i]);
        };

        pause.setPosition({x: -750, y: -200});

        board.setupBoard();
        board.populateIcons();

    }


    function update() {

        iwg.IWGEM.trigger('update');

    }

    MainGameLayout.prototype.destroy = function() {

        this.unsubscribe();

    }

    MainGameLayout.VERSION = '0_0_1';

    IWGInit = function () {

        _MainGameLayout = new MainGameLayout();

    };

    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));
