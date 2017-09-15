(function (window) {
    "use strict";
    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        Helper          = lib.Helper,
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
                _turns          = [],
                _name           = name,
                _width          = null,
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
            this.addTurn = function( prv ) {
                _turns.push(prv);
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
        sortTurns.bind(this)();
          
        errorCheckTurns.bind(this)();

        checkTierValues.bind(this)();
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
            cleanpList = [];        
            
        for ( var k in pList ) {  
            cleanpList.push(Number(pList[k]));
        };
           
        var cleanParams = {
            pList:  cleanpList
        };
        
        this.setParams( cleanParams );
        
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

        } 
    }
    

     /* 
     *  function to check turns
     */
    function errorCheckTurns() {
        
        var turns = this.getTurns(),
            self          = Ticket.instance,
            ticketAmount  = parseInt(self.getOutcome().amount),
            bank          = 0;
        
        // check for 4 truns
        if(turns.length !== 4) {
            core.IWG.ame('error', {mess: ['mIWGd00006 Turns Not Valid']});
        }
        
        // loop over all turns and check if a match then all the rest are winners
        for ( var i = 0; i < turns.length; i++ ){

            var s0          = turns[i].s0,
                s1          = turns[i].s1,
                s2          = turns[i].s2,
                symbols     = [s0,s1,s2],
                isWinner    = turns[i].w,
                p           = parseInt(turns[i].p),
                pValue      = this.getParams().pList[p],
                matched     = false;
            

           if(isWinner === "1"){
               if(!symbols.allValuesMatch()) {
                   // error, W is winner but not all the same
                   core.IWG.ame('error', {mess: ['mIWGd00007 W Not Matching']});
               }

               // add the P value for this row to the a inline bank
               bank += pValue;
           } else {
               if(symbols.allValuesMatch()) {
                   // error, W is not winner but all the same
                   core.IWG.ame('error', {mess: ['mIWGd00007 W Not Matching']});
               }         
           }
           checkValues.bind(this)(symbols, s0, 0, 8);
           checkValues.bind(this)(symbols, s1, 0, 8);
           checkValues.bind(this)(symbols, s2, 0, 8);
        } 

        // now compare inline bank to final ticket bank amount
        if (bank != ticketAmount) {
            core.IWG.ame('error', {mess: ['mIWGd00009 bank does not equal ticket amount']});
        }
    }

    /*
         *  name:           checkValues()
         *  description:    ticket check method that errors if the range of a given ticket data is less then the lower, or higher then the max
         *  params:         gameData: turnObject, value: string, min: number, max: number
         *  returns:        null
         */        
    function checkValues(gameData, value, min, max) {
            for(var i = 0; i < gameData.length; i++ ){
                var turnData = gameData[i];
                if ( turnData < min || turnData > max ){
                        console.log("here: ", turnData);
                        core.IWG.ame('error', { mess: ['mIWGd00012 ticket value out of range']});
                }
                
            }
            
    } // end _checkValues

    // case to check tier values match the ticket amounts parsed in
    function checkTierValues() {
        var self          = Ticket.instance,
            tier          = parseInt(self.getOutcome().tier),
            ticketAmount  = parseInt(self.getOutcome().amount),
            winAmount     = "0.00";

        switch(tier) {
            case 1:
                winAmount = "12000.00";
                break;
            case 2:
                winAmount = "500.00";
                break;
            case 3:
                winAmount = "100.00";
                break;
            case 4:
                winAmount = "100.00";
                break;
            case 5:
                winAmount = "40.00";
                break;
            case 6:
                winAmount = "20.00";
                break;
            case 7:
                winAmount = "20.00";
                break;
            case 8:
                winAmount = "10.00";
                break;
            case 9:
                winAmount = "10.00";
                break;
            case 10:
                winAmount = "5.00";
                break;
            case 11:
                winAmount = "5.00";
                break;
            case 12:
                winAmount = "2.00";
                break;
            case 13:
                winAmount = "2.00";
                break;
            case 14:
                winAmount = "1.00";
                break;
            default:

        }
        if (ticketAmount != winAmount) {
            core.IWG.ame('error', {mess: ['mIWGd00008 ticket amount doesnt match win amount']});
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