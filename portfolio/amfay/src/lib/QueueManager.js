(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
        QueueManager    = function (name) {
            
            // singleton
            if (typeof QueueManager.instance === "object") {
                return QueueManager.instance;
            }
            QueueManager.instance = this;

            var _instance       = this,
                _name           = name,
                _active         = false,
                _revealQueue    = [],
                
                /*
                
                
                */
                _nextAnimation  = function() {
                    
                    _revealQueue.shift();
                    
                    if ( _revealQueue.length > 0){
                        
                        var row = _revealQueue[0];
                        row[0].reveal(row[1]);
                        
                    } else {
                        
                        _active = false;
                        iwg.IWGEM.trigger('promptStart');
                        
                    }
                      
                },
                _subcribe       = function() {
				    iwg.IWGEM.on('animationEnd', _nextAnimation)
                }(),
                _unsubscribe    = function() {
					iwg.IWGEM.off('animationEnd')
                };

                // getters
                this.getRevealQueue = function() {
                    return _revealQueue;
                };
                

                // setters
                
                // addToQueue
                this.addToQueue = function(row) {
                    _revealQueue.push(row);
                    
                    if( !_active ) {
                        _active = true;
                        row[0].reveal(row[1]);
                    } else {
                       row[0].queueHighlight();    
                    };
                    
                };
                
    };

    

    QueueManager.prototype.destroy = function() {

        this.unsubscribe();
        this.getCanvas().parentNode.removeChild(this.getCanvas());

    };

    QueueManager.VERSION = '0_0_1';
    IWGInit = function () {
        _QueueManager = new QueueManager();
    };
    iwg._class("iwg.lib.QueueManager", QueueManager);
}(window));
