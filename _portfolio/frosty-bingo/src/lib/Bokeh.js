/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, HELPER = IWG.Helper, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, SPRITESHEETS = IWG.SpriteSheets;
            var Bokeh = (function () {
                function Bokeh(_amount) {
                    this._amount = _amount;
                    this.positions = [
                        [0, 170],
                        [100, 50],
                        [200, 100],
                        [300, 30],
                        [400, 78],
                        [500, 68],
                        [600, 34],
                        [700, 63],
                        [800, 124],
                        [900, 98]
                    ];
                    this._subscribe();
                    GLOBAL.getInstance().addToGlobal('bokehIndex', 0);
                    GLOBAL.getInstance().addToGlobal('bokehEffect', true);
                    this._initComplete();
                }
                Bokeh.prototype._subscribe = function () {
                    IWG.IWGEM.on('bokeh', this._createBokehEffect.bind(this));
                };
                Bokeh.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('bokeh');
                };
                Bokeh.prototype._createBokehEffect = function () {
                    var index = GLOBAL.getInstance().getFromGlobal('bokehIndex');
                    var bokeh = new GAMEOBJECT("bokeh" + index, { w: 82, h: 82 });
                    bokeh.addBitmap({
                        name: "bokeh",
                        pos: {
                            x: 41,
                            y: 41
                        },
                        frame: "bg_orb",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    bokeh.setPosition({
                        x: this.positions[index][0],
                        y: this.positions[index][1]
                    });
                    bokeh.setScale(0, 0);
                    bokeh.setAnimation('reveal', "bokehScale");
                    bokeh.reveal();
                    var updateIndex = index + 1;
                    GLOBAL.getInstance().addToGlobal('bokehIndex', updateIndex);
                };
                Bokeh.prototype._initComplete = function () {
                    for (var i = 0; i < this._amount; i++) {
                        IWG.IWGEM.trigger('bokeh', [i]);
                    }
                };
                return Bokeh;
            })();
            iwg.Bokeh = Bokeh;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
