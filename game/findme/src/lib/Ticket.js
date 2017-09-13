(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Ticket = function (name) {

			if (!name){
                console.warn('ticket instance has no name');
                return false;
            }
            
            if (typeof Ticket.instance === "object") {
                return Ticket.instance;
            }
            Ticket.instance = this;
            
		    var _instance       = this,
		        _ticket         = null,
		        _outcome        = null,
		        _params         = null,
		        _legend         = [],
		        _turns          = [],
		        _name           = name,
                _width          = null,
                _starCount      = 0,
                _allItems       = [],
                _subscribe      = function() {
                
                }(),
                _unsubscribe  = function() {
                
                };
                
            // getters
            this.getTicket = function() {
                return _ticket;
            };
            this.getOutcome = function() {
                return _outcome;
            };
            this.getParams = function() {
                return _params;
            };
            this.getTurns = function() {
                return _turns;
            };
            this.getLegend = function() {
                return _legend;
            };
            this.getStarCount = function() {
                return _starCount;
            };
            this.getAllItems = function() {
                return _allItems;
            }
                 
            // setters
            this.setTicket = function( prv ) {
                _ticket = prv;
            };
            this.setOutcome = function( prv ) {
                _outcome = prv;
            };
            this.setParams = function( prv ) {
                _params = prv;
            };
            this.setLegend = function( prv ) {
                _legend = prv;  
            };
            this.setStarCount = function( prv ) {
                _starCount = prv;
            };
            
            this.addTurn = function( prv ) {
                _turns.push(prv);
            };
            this.addItems = function( prv ) {
                _allItems.push(prv);
            };
            
            
            // unsubscribe
            this.unsubscribe = function() {
                _unsubscribe;  
            };
            
            init.bind(this)();            

        };
    
    function init() {
        
        var ticket = core.IWG.ame('ticket')  
        this.setTicket(ticket);
        
        sortOutcome.bind(this)();
        sortParams.bind(this)();
        sortLegend.bind(this)();
        sortTurns.bind(this)();
        sortStarTotal.bind(this)();
          

        errorCheckItems.bind(this)();
        errorCheckTurns.bind(this)();
        errorCheckStars.bind(this)();
    }  
    
    /*
     *  function to convert outcome in tickets strings to desired variables in ticket class
     */
    function sortOutcome() {
        
        var outcome = this.getTicket().outcome,
            amount  = Number(outcome.amount),
            tier    = Number(outcome.tier),
            wT      = Number(outcome.wT);

        var cleanOutcome = {
            amount: amount,
            tier:   tier,
            wT:     wT
        };
        
        this.setOutcome( cleanOutcome );
        
    }
    
    /*
     *  function to convert Params in tickets strings to desired variables in ticket class
     */
    function sortParams() {
        
        var params  = this.getTicket().params,
            pList   = params.pList.split(','),
            cleanpList = [],
            i       = params.i.split(','),
            cleanI  = [],
            l       = params.l.split(','),
            cleanL  = [];          
            
        for ( var k in pList ) {
          
            cleanpList.push(Number(pList[k]));
            
        }; 
        
        for ( var j in i ){
            cleanI.push(Number(i[j]));
            this.addItems(Number(i[j]));
        };
        
        for ( var legendItem in l ){
            cleanL.push(Number(l[legendItem]));                        
        };
        
        var cleanParams = {
            pList:  cleanpList,
            i:      cleanI,
            l:      cleanL
        };
        
        this.setParams( cleanParams );
        
    }
    
    /*
     *  function to create legend from ticket
     */
    function sortLegend() {
        
        var legend      = this.getParams().l,
            legendArray = [],
            flatLegend  = [];
            
        // splice legend into legendArray
        legendArray.push(legend.splice(0, 4));
        legendArray.push(legend.splice(0, 4));
        legendArray.push(legend.splice(0, 4));
        legendArray.push(legend.splice(0, 4));
        legendArray.push(legend.splice(0, 4));
        legendArray.push(legend.splice(0, 4));
        legendArray.push(legend.splice(0, 3));
        legendArray.push(legend.splice(0, 3));
        legendArray.push(legend.splice(0, 3));
        legendArray.push(legend.splice(0, 3));
        legendArray.push(legend.splice(0, 3));
        // create bonus legend row (stars)
        legendArray.push([71,71,71])
        
        this.setLegend( legendArray );

        // check legend length on start
        flatLegend = [].concat.apply([],legendArray);
        if (flatLegend.length != 42) {
            core.IWG.ame('error', {mess: ['mIWGd00005','Legend Starter']});
        }   
    }
    
    /* 
     *  function to clean turns
     */
    function sortTurns() {
        
        var turns = this.getTicket().g1.go;
        
        for ( var i = 0; i < turns.length; i++ ){
            
            var turn        = turns[i],
                cleanTurn   = {};

            this.addTurn( turn );

            if(turn.n) {
                this.addItems(turn.n.split(',') )
            }
        } 
        
    }
    
    function sortStarTotal() {
        
        var turns = this.getTicket().g1.go;
         
        for ( var i = 0; i < turns.length; i++ ){
            
            var turn        = turns[i];
            if(turn.s) {
                var count   = this.getStarCount();
                count++;
                this.setStarCount(count);

                // inline check for Stars
                if (turn.s != 1) {
                    core.IWG.ame('error', {mess: ['mIWGd00007','Star Count Invalid']});
                }
            };  
        };
    };

    /*
     *  function to check items from ticket on start
     */
    function errorCheckItems() {
        // check legend length on start
        var flatItems = [].concat.apply([],this.getParams().i);

        if (flatItems.length != 34) {
            core.IWG.ame('error', {mess: ['mIWGd00006','Items Starter']});
        }   
    }

     /* 
     *  function to check turns
     */
    function errorCheckTurns() {
        
        var turns = this.getTicket().g1.go;
        
        // check for 14 truns
        if(turns.length !== 14) {
            core.IWG.ame('error', {mess: ['mIWGd00001','Turns Not Valid']});
        }
             
    }

    /* 
     *  function to check turns
     */
    function errorCheckStars() {
        var starTotal       = this.getStarCount(),
            ticketTier      = this.getOutcome().tier,
            itemStarCount   = 0,
            allItemsFlat    = [];

        // flatten array
        var arr = this.getAllItems();
        allItemsFlat = [].concat.apply([],arr);

        // loop over all items and fine stars
        for (var t = 0; t < allItemsFlat.length ; t++) {
            if (allItemsFlat[t] == 71) {
                itemStarCount++;
            }
        }

        switch (ticketTier)
        {
            case 8:
            case 10:
            case 12:
            case 13:
                // these should have 3 stars
                if((starTotal != 3) || (itemStarCount != 3)) {
                    core.IWG.ame('error', {mess: ['mIWGd00002','Stars Not present']});
                }
                break;
            default:
                // shouldn't have 3 stars
                if((starTotal >= 3) || (itemStarCount >= 3)) {
                    core.IWG.ame('error', {mess: ['mIWGd00003','Stars too many']});
                }                   
        }  
    }
    
    Ticket.prototype.destroy = function() {
     
        this.unsubscribe();
        
    }

    Ticket.VERSION = '0_0_1';

    IWGInit = function () {
    
        _Ticket = new Ticket();
        
    };
    
    iwg._class("iwg.lib.Ticket", Ticket);
}(window));