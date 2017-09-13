var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, SCENE = IWG.Scene, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, BUTTON = IWG.Button;
            var Splash = (function (_super) {
                __extends(Splash, _super);
                function Splash(_name) {
                    _super.call(this, _name);
                    this._games = [];
                    this._initSplash();
                    this._subscribeSplash();
                }
                Splash.prototype._subscribeSplash = function () {
                };
                Splash.prototype._unsubscribeSplash = function () {
                };
                Splash.prototype._initSplash = function () {
                    var _this = this;
                    var spriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS");
                    var dispenser = new GAMEOBJECT('dispenser', { w: 960, h: 640 }, 6, this);
                    dispenser.addBitmap({
                        name: "dispenser",
                        pos: {
                            x: 480,
                            y: 320
                        },
                        frame: "dispenser",
                        spriteSheet: spriteSheet,
                        doReg: {
                            center: true
                        }
                    });
                    this._initGames();
                    TweenMax.delayedCall(2, function () {
                        _this._setupScreen();
                    });
                };
                Splash.prototype._initGames = function () {
                    var self = this;
                    var frameName = [
                        'honeymoney',
                        'cloudNine',
                        'winpig',
                        'lotsofluck',
                        'cashmatch',
                        'kingcash'
                    ];
                    var framePosition = [
                        [466, 105],
                        [678, 105],
                        [466, 256],
                        [678, 256],
                        [466, 406],
                        [678, 406]
                    ];
                    for (var i = 0; i < frameName.length; i++) {
                        var game = frameName[i];
                        var position = framePosition[i];
                        var gameClick = new CLICKABLEGAMEOBJECT("gameClick" + i, { w: 214, h: 132 }, 7, this, false);
                        gameClick.setEnabled(true);
                        this._games.push(gameClick);
                        var shimmer = new createjs.Shape();
                        shimmer.name = 'shimmer';
                        shimmer.alpha = 0.45;
                        shimmer.rotation = 135;
                        shimmer.x = -50;
                        shimmer.graphics.beginFill("#fff").drawEllipse(0, 0, 252, 35);
                        var blurFilter = new createjs.BlurFilter(10, 10, 1);
                        shimmer.filters = [blurFilter];
                        shimmer.cache(0, 0, 252, 30);
                        gameClick.getStage().addChild(shimmer);
                        gameClick.getStage().update();
                        var shape = new createjs.Shape();
                        shape.alpha = 0.01;
                        shape.graphics.beginFill("#fff").drawRect(0, 0, 214, 132);
                        gameClick.getStage().addChild(shape);
                        gameClick.getStage().update();
                        gameClick.setTicketLabel(game);
                        gameClick.setPosition({
                            x: position[0],
                            y: position[1]
                        });
                        gameClick.setReminder(true, 'shimmer');
                        gameClick.animate('reminder1');
                        gameClick.setAction('click', function (gameClick) {
                            IWG.IWGEM.trigger('loadGame', [gameClick.getTicketLabel()]);
                            createjs.Sound.play('clickGame');
                            for (var i = 0; i < self._games.length; i++) {
                                var element = self._games[i];
                                element.setEnabled(false);
                            }
                            TweenMax.delayedCall(2, function () {
                                iwg.Helper.getScene('monitorScene').destroy();
                            });
                        }.bind(null, gameClick));
                    }
                    var overlay = new GAMEOBJECT("overlay", { w: 428, h: 440 }, 1, this);
                    var shape = new createjs.Shape();
                    shape.graphics.beginFill("#000000").drawRect(0, 0, 428, 440);
                    overlay.getStage().addChild(shape);
                    overlay.getStage().update();
                    overlay.setPosition({
                        x: 465,
                        y: 99
                    });
                    overlay.setZindex('1');
                    overlay.setAlpha(0);
                };
                Splash.prototype._setupScreen = function () {
                    var svg = "<svg id=\"Camelot_Logo\" display=\"none\" viewBox=\"66 -250 518.5 1200\"><path id=\"cursor_3\" fill=\"#40F600\" d=\"M308.3 412.4c10.3 0 14.3-7.1 8.7-15.8L178.6 153.7c-4.7-8.7-13.5-8.7-18.2 0L22 396.5c-4.7 8.7-.8 15.8 8.7 15.8h277.6z\"\/><path id=\"cursor_2\" fill=\"#00E100\" d=\"M122.4 446.3c-7.1 0-9.4 4.7-6.4 11.1l95.7 167.7c3.2 6.4 8.7 6.4 12.6 0L320 457.4c3.2-6.4.8-11.1-6.4-11.1H122.4z\"\/><path id=\"cursor_1\" fill=\"#A6F700\" d=\"M538.5 228c0-4.7-3.2-6.4-7.1-4l-113.2 66.4c-4 2.4-4 6.4 0 8.7l113.2 66.4c4 2.4 7.1.8 7.1-4V228z\"\/><path id=\"cursor_0\" fill=\"#7BFF00\" d=\"M332.8 174.4c0 4.7 3.2 7.1 7.9 4.7l118.6-69.6c4-2.4 4-6.4 0-8.7L340.7 31.1c-4-2.4-7.9-.8-7.9 4.7v138.6z\"\/><g id=\"LOGO\"><path fill=\"#FFF\" d=\"M328.1 621.2c-70.5 0-119.4-43.6-138.4-121.8-9.4-39.5-20.5-64.1-49.1-71.1-15.8-4-25.2-15-25.2-28.4 0-9.4 5.6-19 15.8-26.1 11.1-7.1 24.6-11.1 40.4-11.1 36.3 0 60.9 21.4 69.6 30.8l.8.8v-1.5c11.1-34.8 20.5-58.5 33.3-87-19-41.9-22.9-70.5-22.9-86.3 0-21.4 10.3-44.2 34-44.2 15 0 29.3 14.3 42.7 44.2l.8.8.8-.8c11.1-14.3 23.7-22.2 34.8-22.2 18.2 0 29.3 13.5 29.3 34.8 0 19.8-10.3 41.9-20.5 63.2-3.2 7.1-6.4 14.3-9.4 20.5l11.9 29.3h.8c4.7-2.4 9.4-3.2 15-3.2 4 0 7.9.8 11.9 1.5 14.3 5.6 21.4 20.5 19.8 41.2v2.4l1.5-1.5c4.7-4.7 13.5-7.1 17.3-7.1 8.7 0 16.7 3.2 22.2 10.3 7.9 10.3 10.3 26.1 7.1 45.1-.8 4.7-3.2 11.1-5.6 17.3 1.5 10.3 3.2 19 3.2 30.1-2 77.5-65.2 140-141.9 140z\"\/><path d=\"M441.1 377.5c-4 0-13.5 2.4-18.2 7.1 1.5-20.5-6.4-36.3-20.5-41.9-8.7-3.2-18.2-2.4-26.9 1.5l-11.9-27.8c11.1-26.1 29.3-58.5 29.3-84.6 0-20.5-10.3-34.8-30.1-34.8-11.9 0-25.2 9.4-34.8 22.2-13.5-30.1-27.8-45.1-43.6-45.1-24.6 0-34.8 24.6-34.8 45.1 0 17.3 4.7 45.9 22.9 86.3-12.6 27.8-22.2 51.5-33.3 87-15-15.8-39.5-30.8-70.5-30.8-15.8 0-30.1 4-40.4 11.1-10.3 7.1-15.8 16.7-15.8 26.9 0 15 10.3 25.2 25.2 29.3 26.9 7.1 38.7 28.4 49.1 71.1 18.2 76.7 66.4 122.6 139.3 122.6 79-.8 142.5-64.1 142.5-141.6 0-11.1-1.5-20.5-3.2-30.1 2.4-6.4 4-12.6 5.6-18.2 6.6-32.2-6.2-55.3-29.9-55.3m-44.2-18.1c12.6 5.6 13.5 31.6.8 62.6-10.3 30.1-24.6 48.3-38 48.3-11.1 0-19.8-7.9-19.8-27.8 0-38.9 30.9-95.1 57-83.1m-129-140c0-12.6 5.6-27.8 17.3-27.8 8.7 0 18.2 13.5 30.1 39.5-10.3 13.5-20.5 30.1-31.6 52.1-10.3-28.3-15.8-48.8-15.8-63.8m60.2 385.2c-62.6 0-105.3-43.6-122.6-108.3-11.1-45.1-25.2-74.3-61.7-83.9-4-1.5-11.9-4-11.9-11.9 0-8.7 13.5-20.5 38.7-20.5 30.1 0 54.7 18.2 71.1 42.7l12.6-4.7c1.5-24.6 14.3-57.7 36.3-104.4 27.8-59.4 55.3-99.7 73.5-98.9 5.6 0 12.6 7.1 12.6 17.3 0 24.6-21.4 60.9-40.4 101.2-2.4 3.2-10.3 22.2-10.3 22.2l12.6 5.6c4-7.1 12.6-22.9 13.5-26.1l9.4 20.5c-19.8 16.7-37.2 56.2-37.2 87 0 22.9 10.3 37.2 25.2 41.9 13.5 4 26.9 0 37.2-11.9 2.4 14.3 11.9 26.9 30.1 26.9 16.7 0 26.9-9.4 34.8-25.2 3 74.3-58.7 130.5-123.5 130.5m126.5-174.1c-4 25.2-19.8 53-38 53s-16.7-23.7-12.6-38c6.4-25.2 23.7-52.1 37.2-52.1 11.9-.1 17.4 15.8 13.4 37.1m-63.3 125.8c-53 30.1-102.8 11.1-121.1-44.2L286 505c15 45.1 58.5 57 99.7 35.7l5.6 15.6zM377 441.6c0 7.9-6.4 14.3-14.3 14.3s-14.3-6.4-14.3-14.3 6.4-14.3 14.3-14.3c8.1 0 14.3 6.4 14.3 14.3m58.6 16.7c0 7.1-5.6 12.6-12.6 12.6-7.1 0-12.6-5.6-12.6-12.6 0-7.1 5.6-12.6 12.6-12.6s12.6 5.5 12.6 12.6\"\/><\/g><g id=\"GAME\"><path d=\"M222 690.9h29.3v32.5c-4 4-9.4 6.4-15 7.9s-11.1 2.4-16.7 2.4-11.1-.8-15.8-2.4c-4.7-1.5-8.7-4-11.9-7.9-3.2-3.2-5.6-7.1-7.1-11.9-1.5-4.7-2.4-10.3-2.4-15.8 0-5.6.8-10.3 2.4-15 1.5-4.7 4.7-8.7 7.9-11.9 3.2-3.2 7.1-6.4 11.9-7.9 4.9-1.5 9.4-3.2 15-3.2 6.4 0 11.9.8 16.7 3.2 5.6 2.4 9.4 5.6 13.5 10.3l-12.6 12.6c-2.4-2.4-4.7-4-7.1-5.6-2.4-1.5-5.6-2.4-8.7-2.4-3.2 0-5.6.8-7.9 1.5-2.4.8-4.7 2.4-6.4 4.7-1.5 1.5-3.2 4-4 6.4-.8 2.4-1.5 4.7-1.5 7.9s.8 5.6 1.5 8.7c.8 2.4 2.4 4.7 4 6.4 1.5 1.5 4 3.2 6.4 4s4.7 1.5 7.9 1.5c2.4 0 4.7 0 7.1-.8s4-1.5 6.4-3.2v-7.1h-12.6l-.3-14.9zM281.3 659.9h21.4l25.2 72h-20.5l-4.7-15H279l-4.7 15h-19.8l26.8-72zm18.2 43.6l-7.9-26.1-8.7 26.1h16.6zM336.7 659.9h18.2l17.3 31.6 17.3-31.6h18.2l3.2 72h-18.7l-1.5-41.9-12.6 24.6h-10.3L353.5 690l-1.5 41.9h-18.2l2.9-72zM420.6 659.9h52.1v16.7h-32.5v11.1h26.9v15.8h-26.9v12.6H475v16.7h-54.7V660h.3z\"\/><\/g><g id=\"STORE\"><path d=\"M517.1 784.2c-2.4 0-4.7-.8-7.1-1.5-2.4-.8-4-2.4-5.6-4-1.5-1.5-3.2-4-4-5.6-.8-2.4-1.5-4.7-1.5-7.1s.8-4.7 1.5-7.1c.8-2.4 2.4-4 4-5.6 1.5-1.5 3.2-3.2 5.6-4s4.7-1.5 7.1-1.5 4.7.8 7.1 1.5c2.4.8 4 2.4 5.6 4 1.5 1.5 3.2 3.2 4 5.6.8 2.4 1.5 4.7 1.5 7.1s-.8 4.7-1.5 7.1c-.8 2.4-2.4 4-4 5.6s-3.2 3.2-5.6 4c-2.3 1.5-4.7 1.5-7.1 1.5zm0-3.2c2.4 0 4 0 5.6-.8s3.2-1.5 4.7-3.2c1.5-1.5 2.4-3.2 3.2-4.7.8-1.5.8-4 .8-5.6 0-2.4 0-4-.8-5.6-.8-1.5-1.5-3.2-3.2-4.7-1.5-1.5-2.4-2.4-4.7-3.2-1.5-.8-4-.8-5.6-.8-2.4 0-4 0-5.6.8s-3.2 1.5-4.7 3.2c-1.5 1.5-2.4 3.2-3.2 4.7-.8 1.5-.8 4-.8 5.6 0 2.4 0 4 .8 5.6.8 1.5 1.5 3.2 3.2 4.7 1.5 1.5 2.4 2.4 4.7 3.2 1.6 0 4 .8 5.6.8zm-6.3-23.7h7.1c.8 0 2.4 0 3.2.8.8 0 1.5.8 2.4 1.5.8.8.8.8.8 1.5v1.5c0 .8 0 2.4-.8 3.2l-2.4 2.4 4.7 7.9h-4l-4-7.1h-3.2v7.1h-2.9v-19h-.8v.2zm7 7.9c.8 0 1.5 0 2.4-.8s.8-1.5.8-2.4 0-1.5-.8-2.4-1.5-.8-2.4-.8h-3.2v5.6h3.2v.8zM180.1 797.7c2.4 2.4 4.7 4 7.9 5.6 3.2 1.5 7.1 2.4 11.1 2.4h3.2c.8 0 1.5-.8 2.4-.8.8-.8 1.5-.8 1.5-1.5.8-.8.8-1.5.8-3.2s-.8-3.2-3.2-4.7c-1.5-1.5-4.7-2.4-8.7-4l-4-1.5c-2.4-.8-4.7-1.5-7.1-3.2-2.4-.8-4-2.4-6.4-4-1.5-1.5-3.2-3.2-4.7-5.6-.8-2.4-1.5-4.7-1.5-7.9s.8-6.4 1.5-9.4c1.5-3.2 3.2-5.6 5.6-7.1 2.4-2.4 5.6-4 8.7-4.7 3.2-1.5 7.1-1.5 11.9-1.5 3.2 0 7.1 0 9.4.8 3.2.8 5.6 1.5 7.9 2.4 2.4.8 4 1.5 5.6 3.2 1.5.8 2.4 2.4 3.2 3.2l-9.4 12.6c-2.4-1.5-5.6-3.2-7.9-4.7-2.4-1.5-5.6-1.5-8.7-1.5H196c-.8 0-1.5.8-2.4.8-.8.8-1.5.8-1.5 1.5-.8.8-.8 1.5-.8 2.4s0 2.4.8 3.2l2.4 2.4s2.4.8 3.2 1.5c1.5.8 2.4.8 4 1.5l3.2.8c2.4.8 4.7 1.5 7.1 2.4s4.7 2.4 7.1 4c2.4 1.5 4 4 4.7 6.4 1.5 2.4 1.5 5.6 1.5 9.4 0 3.2-.8 6.4-2.4 9.4-1.5 3.2-4 5.6-6.4 7.1-2.4 2.4-5.6 4-9.4 4.7-4 .8-7.1 1.5-11.1 1.5-7.1 0-13.5-.8-18.2-3.2-4.7-1.5-8.7-4.7-12.6-7.9l14.9-12.8zM252.1 765.2h-22.2v-16.7h63.2v16.7h-22v55.3h-19v-55.3zM330.5 822.1c-5.6 0-10.3-.8-15-3.2-4.7-1.5-8.7-4.7-11.9-7.9-3.2-3.2-6.4-7.1-7.9-11.9-1.5-4.7-3.2-9.4-3.2-15s.8-10.3 3.2-15c1.5-4.7 4.7-8.7 7.9-11.9 3.2-3.2 7.1-6.4 11.9-7.9 4.7-1.5 9.4-3.2 15-3.2s10.3.8 15 3.2c4.7 1.5 8.7 4.7 11.9 7.9 3.2 3.2 5.6 7.1 7.9 11.9 1.5 4.7 3.2 9.4 3.2 15s-.8 10.3-3.2 15c-1.5 4.7-4.7 8.7-7.9 11.9-3.2 3.2-7.1 6.4-11.9 7.9-4.8 2.5-9.5 3.2-15 3.2zm0-18.2c3.2 0 5.6-.8 7.1-1.5 2.4-.8 4-2.4 5.6-4 1.5-1.5 2.4-4 3.2-6.4.8-2.4 1.5-4.7 1.5-7.9s0-5.6-1.5-7.9c-.8-2.4-1.5-4.7-3.2-6.4-1.5-1.5-3.2-3.2-5.6-4-2.4-.8-4.7-1.5-7.1-1.5-2.4 0-5.6.8-7.9 1.5-2.4.8-4 2.4-5.6 4-1.5 1.7-2.4 4-3.2 6.4-.8 2.4-.8 4.7-.8 7.9s0 5.6.8 7.9 1.5 4.7 3.2 6.4 3.2 3.2 5.6 4c2.3 1.5 4.7 1.5 7.9 1.5zM375.5 747.7h30.1c4 0 7.1.8 10.3 1.5 3.2.8 5.6 2.4 7.9 4.7 2.4 2.4 4 4.7 5.6 7.1 1.5 3.2 1.5 6.4 1.5 10.3 0 4.7-.8 8.7-3.2 12.6-2.4 3.2-4.7 6.4-8.7 8.7l15.8 27.8h-20.5l-11.9-24.6h-7.9v24.6h-19v-72.7zm27.6 33.3c2.4 0 4.7-.8 6.4-2.4 1.5-1.5 2.4-4 2.4-6.4 0-2.4-.8-4.7-2.4-6.4-1.5-1.5-4-2.4-6.4-2.4h-9.4v17.3l9.4.3zM440.5 747.7h52.1v16.7h-32.5v11.1H487v15.8h-26.9v12.6h34.8v16.7h-54.7v-72.8h.3z\"\/><\/g><\/svg><p id=\"CHOOSE\">CHOOSE</p> <p id=\"A\">A</p> <p id=\"SCRATCHCARD\">SCRATCHCARD</p> <p id=\"TO\">TO</p> <p id=\"PLAY\">PLAY</p> <p id=\"WIN\" class='green'>WIN</p> <p id=\"UP\" class='green'>UP</p> <p id=\"TOGREEN\" class='green'>TO</p> <p id=\"TENTHOUSAND\" class='green big'>£10,000</p>";
                    var animationScene = new SCENE('monitorScene');
                    animationScene.setDimensions({
                        w: 226,
                        h: 182
                    });
                    animationScene.setPosition({
                        x: 168,
                        y: 357
                    });
                    animationScene.setZindex("10");
                    animationScene.setParent(this);
                    animationScene.getDiv().innerHTML += svg;
                    var vb = "0 0 " + animationScene.getDimensions("w") + " " + animationScene.getDimensions("h");
                    document.getElementById('Camelot_Logo').style.display = 'block';
                    TweenLite.set('#Camelot_Logo', {
                        position: 'absolute',
                        height: 230,
                        width: 226,
                        top: (animationScene.getDimensions("h") / 2) - 15 + 'px',
                        left: animationScene.getDimensions("w") / 2 + 'px',
                        xPercent: -50,
                        yPercent: -50,
                        display: "block"
                    });
                    TweenLite.set('#LOGO', { scaleX: 0, scaleY: 0 });
                    TweenLite.to('#LOGO', 2, {
                        delay: 0.25,
                        scaleX: 1, scaleY: 1,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    });
                    TweenLite.set('#GAME', { scaleX: 0, scaleY: 0, x: (animationScene.getDimensions("w") * -2) + 'px' });
                    TweenLite.set('#STORE', { scaleX: 0, scaleY: 0, x: (animationScene.getDimensions("w") * 2) + 'px' });
                    TweenLite.set('#cursor_0', {
                        scaleX: 0,
                        scaleY: 0,
                        x: -20,
                        y: 210,
                        rotation: 180
                    });
                    TweenLite.set('#cursor_1', {
                        x: (animationScene.getDimensions("w") * 2),
                        rotation: 180,
                        scaleX: 0, scaleY: 0
                    });
                    TweenLite.set('#cursor_2', {
                        scaleX: 0,
                        scaleY: 0,
                        x: 0,
                        y: animationScene.getDimensions("h") / 2 + 'px',
                        rotation: -180
                    });
                    TweenLite.set('#cursor_3', { scaleX: 0, scaleY: 0, x: 120, y: 120 });
                    TweenLite.set('#CHOOSE', { x: 250, y: 20 });
                    TweenLite.set('#A', { x: 165, y: -150 });
                    TweenLite.set('#SCRATCHCARD', { x: -250, y: 50 });
                    TweenLite.set('#TO', { x: -120, y: 80 });
                    TweenLite.set('#PLAY', { x: 323, y: 80 });
                    TweenLite.set('#WIN', { x: 320, y: 120 });
                    TweenLite.set('#UP', { x: 100, y: -500 });
                    TweenLite.set('#TOGREEN', { x: -100, y: 120 });
                    if (CORE.IWG.ame('get', 'IS_IOS')) {
                        TweenLite.set('#TENTHOUSAND', { x: 35, y: 350 });
                    }
                    else {
                        TweenLite.set('#TENTHOUSAND', { x: 40, y: 350 });
                    }
                    this._animateLogo();
                };
                Splash.prototype._animateLogo = function () {
                    var timeline = new TimelineMax({
                        paused: true,
                        repeat: -1
                    });
                    timeline.to('#LOGO', 2, {
                        delay: 0.25,
                        scaleX: 1, scaleY: 1,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    }, "logoAnimation");
                    timeline.to('#cursor_0', 2, {
                        delay: 0.55,
                        x: 0, y: 0,
                        rotation: 0,
                        scaleX: 1, scaleY: 1,
                        transformOrigin: "50% 50%",
                        ease: Elastic.easeOut
                    }, "logoAnimation");
                    timeline.to('#cursor_1', 1.25, {
                        startAt: { scaleX: 1, scaleY: 1 },
                        delay: 0.45,
                        x: 0,
                        transformOrigin: "250% 50%",
                        rotation: 0,
                        ease: Bounce.easeOut
                    }, "logoAnimation");
                    timeline.to('#cursor_2', 1.5, {
                        delay: 0.65,
                        x: 0,
                        y: 0,
                        scaleX: 1, scaleY: 1,
                        rotation: 0,
                        transformOrigin: "50% 50%",
                        ease: Bounce.easeOut
                    }, "logoAnimation");
                    timeline.to('#cursor_3', 2, {
                        delay: 0.75,
                        x: 0, y: 0,
                        scaleX: 1, scaleY: 1,
                        transformOrigin: "50% 50%",
                        ease: Elastic.easeOut
                    }, "logoAnimation");
                    timeline.to('#GAME', 0.25, {
                        delay: 1.55,
                        startAt: { scaleX: 1, scaleY: 1 },
                        x: '0%',
                        transformOrigin: "50% 50%"
                    }, "logoAnimation");
                    timeline.to('#STORE', 0.25, {
                        delay: 1.75,
                        startAt: { scaleX: 1, scaleY: 1 },
                        x: '0%',
                        transformOrigin: "50% 50%",
                        onComplete: function () {
                        }
                    }, "logoAnimation");
                    timeline.to('#LOGO', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#cursor_0', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#cursor_1', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#cursor_2', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#cursor_3', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#GAME', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#STORE', 1, {
                        delay: 0.25,
                        alpha: 0
                    }, "fadeLogoOff");
                    timeline.to('#CHOOSE', 0.25, {
                        x: 40
                    }, "bringTextOn");
                    timeline.to('#A', 0.25, {
                        y: 20
                    });
                    if (CORE.IWG.ame('get', 'IS_IOS')) {
                        timeline.to('#SCRATCHCARD', 0.25, {
                            x: 5
                        });
                    }
                    else {
                        timeline.to('#SCRATCHCARD', 0.25, {
                            x: 10
                        });
                    }
                    timeline.to('#TO', 0.25, {
                        x: 55
                    });
                    timeline.to('#PLAY', 0.25, {
                        x: 100
                    });
                    timeline.to('#WIN', 0.25, {
                        x: 65
                    });
                    timeline.to('#UP', 0.25, {
                        y: 120
                    });
                    timeline.to('#TOGREEN', 0.25, {
                        x: 125
                    });
                    timeline.to('#TENTHOUSAND', 0.25, {
                        y: 135
                    });
                    timeline.to('#monitorScene', 1, {
                        delay: 4,
                        alpha: 0
                    });
                    timeline.play();
                };
                return Splash;
            })(iwg.Scene);
            iwg.Splash = Splash;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
