/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, TICKET = IWG.Ticket, QUEUEMANGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, iconRef = IWG.IconRef;
            var Legend = (function () {
                function Legend() {
                    this._legendRows = [];
                    this._rows = 0;
                    this._iconSpacing = 0;
                    this._iconScale = 1;
                    this._rowHeight = 80;
                    this._filter = null;
                    this._subscribe();
                }
                Legend.prototype._subscribe = function () {
                    IWG.IWGEM.on('updateLegend', this._updateLegend.bind(this));
                    IWG.IWGEM.on('checkLegendRow', this._checkLegendRow.bind(this));
                };
                Legend.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('updateLegend');
                };
                Legend.prototype.setIconSpacing = function (px) {
                    this._iconSpacing = px;
                };
                Legend.prototype.setIconScale = function (scale) {
                    this._iconScale = scale;
                };
                Legend.prototype.setRowHeight = function (height) {
                    this._rowHeight = height;
                };
                Legend.prototype.setFilter = function (filter) {
                    this._filter = filter;
                };
                Legend.prototype.preLegendCheck = function () {
                    var legendArray = TICKET.getInstance().errorTokenList;
                    for (var i = 0; i < legendArray.length; i++) {
                    }
                };
                Legend.prototype._updateLegend = function (ticketLabel) {
                    for (var row = 0; row < this._legendRows.length; row++) {
                        var rowLength = this._legendRows[row].rowIcons.length, allRevealed = false;
                        for (var col = 0; col < rowLength; col++) {
                            var icon = this._legendRows[row].rowIcons[col];
                            if (icon.getTicketLabel() === ticketLabel) {
                                if (!icon._revealed) {
                                    icon._revealed = true;
                                    QUEUEMANGER.getInstance().addToQueue(icon, "legendReveal");
                                    this._legendRows[row].revealedCount++;
                                    break;
                                }
                            }
                        }
                    }
                    QUEUEMANGER.getInstance().startReveals();
                };
                Legend.prototype._checkLegendRow = function () {
                    for (var i = 0; i < this._legendRows.length; i++) {
                        var rowLength = this._legendRows[i].rowIcons.length, allRevealed = false;
                        if (this._legendRows[i].revealedCount === rowLength) {
                            allRevealed = true;
                        }
                        if (allRevealed && this._legendRows[i].winner === false) {
                            var prizeIcon = this._legendRows[i].prizeIcon, n = prizeIcon.name;
                            createjs.Sound.play("endWinorRowWin");
                            this._legendRows[i].bg.animate('rowWin');
                            this._legendRows[i].prizeIcon.animate('rowWin');
                            this._legendRows[i].winner = true;
                            CORE.IWG.ame('bank', { deposit: [this._legendRows[i].prizeValue], log: true });
                        }
                        ;
                    }
                };
                Legend.prototype.addRow = function (rowConfig) {
                    this._rows++;
                    var rowBG = new GAMEOBJECT("legendRow" + this._rows, { w: 0, h: 0 });
                    rowBG.addBitmap({
                        name: 'legendRowBG' + this._rows,
                        pos: { x: 0, y: 0 },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                        frame: rowConfig.bg,
                        scale: 1,
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    rowBG.setPosition({ x: rowConfig.position.x, y: rowConfig.position.y });
                    rowBG.addAnimation('rowWin');
                    rowBG.setAnimation('rowWin', "legendRowHighlight");
                    var prize = new GAMEOBJECT("prizeRow" + this._rows, { w: 100, h: 100 });
                    prize.addBitmap({
                        name: 'legendRow' + this._rows + 'Prize',
                        pos: { x: 0, y: 0 },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                        frame: rowConfig.prizeBG,
                        scale: 1,
                        doReg: {
                            center: true
                        }
                    });
                    prize.winHighlight = rowConfig.prizeHighlight;
                    prize.setDimensions({
                        w: prize.getBitmap('legendRow' + this._rows + 'Prize').getBounds().width,
                        h: prize.getBitmap('legendRow' + this._rows + 'Prize').getBounds().height,
                    });
                    prize.getBitmap('legendRow' + this._rows + 'Prize').x = prize.getBitmap('legendRow' + this._rows + 'Prize').getBounds().width / 2;
                    prize.getBitmap('legendRow' + this._rows + 'Prize').y = prize.getBitmap('legendRow' + this._rows + 'Prize').getBounds().height / 2;
                    prize.setPosition({ x: rowConfig.position.x + 15, y: rowConfig.position.y + 23 });
                    prize.addAnimation('rowWin');
                    prize.setAnimation('rowWin', "prizeHightlight", 1, 1, [rowConfig.prizeHighlight, 'legendRow' + this._rows + 'Prize']);
                    var icons = [], numberOfIcons = 0;
                    for (var i = 0; i < rowConfig.icons.iconSymbol.length; i++) {
                        var GO = new GAMEOBJECT("legendRow" + this._rows + "Symbol" + i, { w: 60, h: 60 });
                        GO.addBitmap({
                            name: 'legendRow' + this._rows + 'symbol' + i,
                            pos: { x: 30, y: 25 },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                            frame: iconRef.getInstance().iconRefs[rowConfig.icons.iconSymbol[i]].frameName,
                            scale: this._iconScale,
                            doReg: {
                                center: true
                            },
                            alpha: 0
                        });
                        if (this._filter) {
                            GO.addBitmap({
                                name: 'legendRow' + this._rows + 'symbol' + i + "filter",
                                pos: { x: 30, y: 25 },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                                frame: iconRef.getInstance().iconRefs[rowConfig.icons.iconSymbol[i]].frameName,
                                scale: this._iconScale,
                                doReg: {
                                    center: true
                                },
                                filter: this._filter,
                                alpha: 0.5
                            });
                        }
                        GO.setTicketLabel(rowConfig.icons.iconSymbol[i]);
                        GO.setPosition({ x: (rowConfig.position.x + prize.getDimensions().w + 10) + (this._iconSpacing * i), y: rowConfig.position.y + 12 });
                        GO.addAnimation('legendReveal');
                        GO.setAnimation('legendReveal', "legendIconReveal");
                        icons.push(GO);
                        numberOfIcons = i + 1;
                    }
                    var legendRow = {
                        bg: rowBG,
                        prizeIcon: prize,
                        rowIcons: icons,
                        allRevealed: false,
                        revealedCount: 0,
                        winner: false,
                        prizeValue: rowConfig.prizeValue
                    };
                    var width = prize.getDimensions().w + 30 + (numberOfIcons * this._iconSpacing);
                    rowBG.setDimensions({ w: width, h: this._rowHeight });
                    this._legendRows.push(legendRow);
                };
                ;
                Legend.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return Legend;
            })();
            iwg.Legend = Legend;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Legend.js.map