(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        Sound           = lib.Sound,
        Ticket          = lib.Ticket,
        images          = core.iwgLoadQ.images,
        MasterSS        = lib.flassets.MasterSS,
        GameObject      = lib.GameObject,
        Board           = lib.Board,
        WordBubble = function (name) {

            var _instance   = this,
                _super      = null,
                _icon       = null,
                _lookFor    = null,
                _howMany    = null,
                _level      = 0,
                /*
                 *  Name:           _updateDynamicString
                 *  Description:    update string in wordBubble
                 *  Parmas:         lookFor:String, howMany:Number
                 *  Returns:        null
                 */
                _updateDynamicString    = function(lookFor, howMany) {

                    _lookFor    = lookFor;
                    _howMany    = howMany;

                    // update board iconsLeft to match
                    Board.instance.setIconsLeft(_howMany);

                    _showText();

                    var string          = _instance.getStage().getChildByName('string'),
                        stringText      = _lookFor + ' x ' + _howMany;

                    string.text         = stringText;
                    string.x            = _instance.getDimensions().w / 2 - string.getBounds().width / 2;

                    _instance.getStage().update();

                },
                /*
                 *  Name:           _updateLevel
                 *  Description:    update the level text
                 *  Parmas:         level:number
                 *  Returns:        null
                 */
                _updateLevel            = function(level) {

                    var levelString         = _instance.getStage().getChildByName('level');

                    levelString.text        = level+1 + " / 14";
                    levelString.x           = _instance.getDimensions().w / 2 - levelString.getBounds().width / 2;

                    _instance.getStage().update();

                },
                _hideText  = function() {

                    var levelString         = _instance.getStage().getChildByName('string');
                    levelString.alpha = 0;
                    _instance.getStage().update();
                },
                _showText  = function() {

                    var levelString         = _instance.getStage().getChildByName('string');
                    levelString.alpha = 1;
                    _instance.getStage().update();
                },
                /*
                 *  Name:           _nextLevel
                 *  Description:    initiate next level
                 *  Parmas:         null
                 *  Returns:        null
                 */
                _nextLevel              = function() {

                    // retrieve next icon to look up and how many
                    var level       = Board.instance.getLevel(),
                        ticketData  = Ticket.instance.getTurns()[level],
                        find        = iconRef[ticketData.f],
                        amount      = ticketData.a;

                    _updateDynamicString(find, amount);
                    if ( Sound.instance.getSound()){
                        createjs.Sound.play("newWord");
                    };
                    _updateLevel(level);


                },
                /*
                 *  Name:           _updateHowMany
                 *  Description:    updates how many items left in string
                 *  Parmas:         null
                 *  Returns:        null
                 */
                _updateHowMany          = function(star) {

                    if (!star){
                        // don't update if it's the last turn with 0 items
                        var newHowMany =  _howMany - 1;

                        if(newHowMany != 0) {
                            _updateDynamicString(_lookFor, newHowMany);
                        }
                    };

                },
                /*
                 *  Name:           _destroy
                 *  Description:    destroy instance and remove all trace of its exsitence
                 *  Parmas:         null
                 *  Returns:        null
                 */
                _destroy                = function() {

                    // remove all trace of object
                    _unsubscribe();
                    //remove canvas
                    TweenMax.to(_instance.getCanvas(), 0.7, {alpha: 0, onComplete: function(){
                        //_instance.getCanvas().parentNode.removeChild(_instance.getCanvas());
                    }});

                },
                _subscribe              = function() {
                    iwg.IWGEM.on('updateLookFor', _updateDynamicString);
                    iwg.IWGEM.on('Board.nextLevel', _nextLevel);
                    iwg.IWGEM.on('bubbleClick', _updateHowMany);
                    iwg.IWGEM.on('wordBubbleDestroy', _destroy);
                    iwg.IWGEM.on('lastFind', _hideText);
                }(),
                _unsubscribe            = function() {
                    iwg.IWGEM.off('updateLookFor');
                    iwg.IWGEM.off('nextLevel');
                    iwg.IWGEM.off('bubbleClick');
                    iwg.IWGEM.off('wordBubbleDestroy');
                    iwg.IWGEM.off('lastFind');
                };

            // inherit from gameObject
            _instance.__proto__ = new GameObject( name, { w:429, h: 228 }, 2 );
            _super = _instance.__proto__;

            init.bind(_instance)();

        };

    function init() {

        setupLayout.bind(this)();

        var self = this;

        setTimeout( function() {
            self.getStage().update()
        }, 1);

    };

    function setupLayout() {

        var mainBubble = Helper.makeBitmapImage('bubble_central', { x: 0, y: 0}, 1, false, MasterSS);

        var txt             = new createjs.Text("Find Me..", "bold 20px komika_axisregular", "#ffffff");
        txt.name            = "txt";
        txt.x               = this.getDimensions().w / 2 - txt.getBounds().width / 2;
        txt.y               = 85;
        txt.textBaseline    = "alphabetic";
        txt.shadow          = new createjs.Shadow("#000000", 2, 2, 7);

        var string          = new createjs.Text(".....", "bold 26px komika_axisregular", "#ffffff");
        string.name         = "string";
        string.x            = this.getDimensions().w / 2 - string.getBounds().width / 2;
        string.y            = 130;
        string.textBaseline = "alphabetic";
        string.shadow       = new createjs.Shadow("#000000", 2, 2, 7);

        var level           = new createjs.Text("1/14", "bold 20px komika_axisregular", "#ffffff");
        level.name          = "level";
        level.x             = this.getDimensions().w / 2 - level.getBounds().width / 2;
        level.y             = 170;
        level.textBaseline  = "alphabetic";
        level.shadow        = new createjs.Shadow("#000000", 2, 2, 7);

        this.getStage().addChild(mainBubble, txt, string, level);

    };

    WordBubble.VERSION = '0_1_0';
    IWGInit = function () {
        _WordBubble = new WordBubble();
    };
    iwg._class("iwg.lib.WordBubble", WordBubble);
}(window));
