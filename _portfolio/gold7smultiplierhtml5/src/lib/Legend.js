/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, QUEUEMANGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, iconRef = IWG.IconRef;
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
                    IWG.IWGEM.on('updateLegend', this.updateLegend.bind(this));
                    IWG.IWGEM.on('checkLegendRow', this._checkLegendRow.bind(this));
                };
                Legend.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('updateLegend');
                    IWG.IWGEM.off('checkLegendRow');
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
                Legend.prototype.getRow = function (index) {
                    return this._legendRows[index];
                };
                Legend.prototype.updateLegend = function (ticketLabel) {
                    for (var i = 0; i < this._legendRows.length; i++) {
                        var row = this._legendRows[i];
                        for (var j = 0; j < row.rowIcons.length; j++) {
                            var icon = row.rowIcons[j];
                            if (icon.getTicketLabel() === Number(ticketLabel)) {
                                if (!icon._revealed) {
                                    icon._revealed = true;
                                    icon.animate('markNumber');
                                }
                            }
                        }
                    }
                    this._checkLegendRow();
                };
                Legend.prototype._checkLegendRow = function () {
                    for (var i = 0; i < this._legendRows.length; i++) {
                        var row = this._legendRows[i], allRevealed = false;
                        for (var j = 0; j < row.rowIcons.length; j++) {
                            var icon = row.rowIcons[j];
                            if (!icon.getRevealed()) {
                                allRevealed = false;
                                break;
                            }
                            allRevealed = true;
                        }
                        if (allRevealed && row.winner === false) {
                            row.winner = true;
                            var prizeIcon = row.prizeIcon;
                            prizeIcon.animate('winReveal');
                            for (var k = 0; k < row.rowIcons.length; k++) {
                                var icon = row.rowIcons[k];
                                if (row.label === "doubler") {
                                    icon.animate('doublerWinReveal');
                                }
                                else {
                                    icon.animate('winReveal');
                                }
                            }
                            CORE.IWG.ame('bank', { deposit: [row.prizeValue], log: true });
                        }
                    }
                };
                Legend.prototype.addRow = function (rowConfig) {
                    this._rows++;
                    var legendRow = {
                        prizeIcon: rowConfig.prize,
                        rowIcons: rowConfig.icons,
                        allRevealed: false,
                        revealedCount: 0,
                        winner: false,
                        prizeValue: rowConfig.prizeValue,
                        label: null
                    };
                    this._legendRows.push(legendRow);
                };
                ;
                Legend.prototype.getRows = function () {
                    return this._legendRows;
                };
                Legend.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return Legend;
            })();
            iwg.Legend = Legend;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
