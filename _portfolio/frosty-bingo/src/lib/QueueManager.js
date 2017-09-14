/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var QueueManager = (function () {
                function QueueManager() {
                    this._active = false;
                    this._queue = [];
                    if (QueueManager._instance) {
                        throw new Error("Error: Instantiation failed: Use QueueManager.getInstance() instead of new.");
                    }
                    QueueManager._instance = this;
                }
                QueueManager.prototype.subscribe = function () {
                    IWG.IWGEM.on('animationEnd', this.nextReveal.bind(this));
                };
                QueueManager.prototype.unsubscribe = function () {
                    IWG.IWGEM.off('animationEnd');
                };
                QueueManager.getInstance = function () {
                    return QueueManager._instance;
                };
                QueueManager.prototype.nextReveal = function () {
                    if (this._queue.length > 1) {
                        this._queue.shift();
                        this._queue[0].gameObject.animate(this._queue[0].animation);
                    }
                    else {
                        this._active = false;
                        this._queue.shift();
                        IWG.IWGEM.trigger('queueFinished');
                    }
                };
                QueueManager.prototype.addToQueue = function (gameObject, animation) {
                    var object = {
                        gameObject: gameObject,
                        animation: animation
                    };
                    this._queue.push(object);
                    console.log(this._queue);
                };
                QueueManager.prototype.startReveals = function () {
                    if (!this._active) {
                        this._active = true;
                        this._queue[0].gameObject.animate(this._queue[0].animation);
                    }
                };
                QueueManager._instance = new QueueManager();
                return QueueManager;
            })();
            iwg.QueueManager = QueueManager;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
