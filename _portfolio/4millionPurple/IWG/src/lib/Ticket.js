(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        iwg = camelot.iwg,
        lib = camelot.iwg.lib,
        GS = window.com.greensock,
        core = camelot.core,
        Helper = window.com.camelot.iwg.lib.Helper,
        R = window.com.camelot.iwg.lib.R,

        Ticket = function (ticket) {
            if (typeof Ticket.instance === "object") {
                return Ticket.instance;
            }

            var _ticket = ticket,
                _prizeList = [],
                _amount = "",
                _isWinner = null,
                _prizeTier = null,
                _games = [],
                _game1 = null,
                _game2 = null,
                _game3 = null,
                _game4 = null,
                _game5 = null,
                _outcome = null,
                _param = null,
                _inlineBankCheck = 0;

            // getter
            this.getTicket = function () {
                return _ticket;
            };
            this.getOutcome = function () {
                return _outcome;
            };
            this.getPrizeList = function () {
                return _prizeList;
            };
            this.getAmount = function () {
                return _amount;
            }
            this.getGames = function () {
                return _games;
            };
            this.getGame1 = function () {
                return _game1;
            };
            this.getGame2 = function () {
                return _game2;
            };
            this.getGame3 = function () {
                return _game3;
            };
            this.getGame4 = function () {
                return _game4;
            };
            this.getGame5 = function () {
                return _game5;
            };
            this.getIsWinner = function () {
                return _isWinner;
            };
            this.getParam = function () {
                return _param;
            };
            this.getInlineBankCheck = function(){
                return _inlineBankCheck;
            }

            // setters
            this.setTicket = function (prv) {
                _ticket = prv;
            };
            this.setPrizeList = function (prv) {
                _prizeList = prv;
            };
            this.setAmount = function (prv) {
                _amount = prv;
            };
            this.setGames = function (prv) {
                _games = prv;
            };
            this.setGame1 = function (prv) {
                _game1 = prv;
            };
            this.setGame2 = function (prv) {
                _game2 = prv;
            };
            this.setGame3 = function (prv) {
                _game3 = prv;
            };
            this.setGame4 = function (prv) {
                _game4 = prv;
            };
            this.setGame5 = function (prv) {
                _game5 = prv;
            };
            this.setIsWinner = function (prv) {
                _isWinner = prv;
            };
            this.setParam = function (prv) {
                _param = prv;
            };
            this.setInlineBankCheck = function(prv){
                _inlineBankCheck += prv;
            }

            Ticket.instance = this;
            init();
        }

    Ticket.VERSION = '0_1_0';

    function init() {

        var self = Ticket.instance;
        var ticket = self.getTicket();

        sortPrizeList();
        setAmount();
        sortGames();

        checkValid();
    }

    function sortPrizeList() {

        var self = Ticket.instance,
            ticket = self.getTicket();

        var prizeList = ticket.params.pList,
            prizeArray = [];

        prizeArray = prizeList.split(',');
        self.setPrizeList(prizeArray);
        self.setParam(ticket.params);
    }

    function setAmount() {

        var self = Ticket.instance,
            ticket = self.getTicket(),
            amount = ticket.outcome.amount;
        if (amount) {
            self.setAmount((amount).toString());
        }

    }

    function sortGames() {

        var self = Ticket.instance,
            ticket = self.getTicket(),
            games = [ticket.g1, ticket.g2, ticket.g3, ticket.g4, ticket.g5];

        self.setGames(games);
        self.setGame1(games[0]);
        self.setGame2(games[1]);
        self.setGame3(games[2]);
        self.setGame4(games[3]);
        self.setGame5(games[4]);

    }

    function checkValid() {

        var self = Ticket.instance,
            valid = false;

        for (var prizeAmount in self.getPrizeList()) {
            var prize = self.getPrizeList()[prizeAmount];
            if (self.getAmount() === prize) {
                valid = true;
            }
        }

        checkMatchOne(self);
        checkEqualsTen(self);
        checkYoursTheirs(self);
        checkMatchTwo(self);
        checkDoubleMatch(self);

        balanceInlineBank(self);
    }
    
    function checkMatchOne(self){
        var game1   = self.getGame1(),
            s0      = 0;
        
        for (var i = 0; i < game1.go.length; i++){
            var turnData    = game1.go[i],
                t           = parseInt(turnData.t),
                p           = parseInt(turnData.p),
                w           = parseInt(turnData.w);
                
             if( w === 1 ){
                if( t !== s0 ){
                    core.IWG.ame('error', { mess: ['error on match1']});  
                }
                // inline bank
                var prize = parseInt(self.getPrizeList()[p]);
                self.setInlineBankCheck(prize);  

            } else {
                if( t == s0 ){
                    core.IWG.ame('error', { mess: ['error on game3 - match on loser']});  
                }
            }
        }
    }
    function checkEqualsTen(self){
        var game2 = self.getGame2();
        for (var i = 0; i < game2.go.length; i++) {
            var iconData    = game2.go[i],
                num1        = parseInt(iconData.b0),
                num2        = parseInt(iconData.b1),
                t           = parseInt(iconData.t),
                w           = parseInt(iconData.w),
                p           = parseInt(iconData.p);
            
            if ( num1 + num2 !== t ) {
                core.IWG.ame('error', { mess: ['error on number addition for checkEquals']});
            }
            if ( num1 + num2 === t && w !== 1 ) {
                core.IWG.ame('error', { mess: ['error on win for checkEquals']});
            }
            // if a winner then add to bank for final check on ticket later
            if(w == 1) {
                var prize = parseInt(self.getPrizeList()[p]);
                self.setInlineBankCheck(prize);  
            }  

        }
    }
    function checkYoursTheirs(self){
        
        var game3   = self.getGame3(),
            s0      = parseInt(game3.s0);
        
        for( var i = 0; i < game3.go.length; i++){
            
            var turnData    = game3.go[i],
                w           = parseInt(turnData.w),
                y           = parseInt(turnData.y),
                t           = parseInt(turnData.t),
                p           = parseInt(turnData.p);
            
            if (w === 1){
                if ( y < t ){
                    core.IWG.ame('error', { mess: ['error on YoursTheirs']});
                }
                // inline bank
                var prize = parseInt(self.getPrizeList()[p]);
                self.setInlineBankCheck(prize); 
            } else {
                if ( y > t ){
                    core.IWG.ame('error', { mess: ['error on YoursTheirs - match on loser']});
                }
            }           
        }
    }
    function checkMatchTwo(self){
        var game4 = self.getGame4();
        
        for (var i = 0; i < game4.go.length; i++){
            var turnData    = game4.go[i],
                w           = parseInt(turnData.w),
                d0          = parseInt(turnData.v0),
                d1          = parseInt(turnData.v1),
                p           = parseInt(turnData.p);
            
            if( w === 1){
                if  (d0 !== d1 ){
                    core.IWG.ame('error', { mess: ['error on game1 ']});
                }
                // if a winner then add to bank for final check on ticket later
                var prize = parseInt(self.getPrizeList()[p]);
                self.setInlineBankCheck(prize);                
            } else {
               if  (d0 === d1){
                    core.IWG.ame('error', { mess: ['error on win game1 ']});
                } 
            }
                  
        } 
    }
    function checkDoubleMatch(self){
         var game5  = self.getGame5(),
            s0      = parseInt(game5.s0),
            s1      = parseInt(game5.s1);
   
        //console.log(s0,s1);
        
        for (var i = 0; i < game5.go.length; i++){
            var turnData    = game5.go[i],
                w           = parseInt(turnData.w),
                s           = parseInt(turnData.s),
                p           = parseInt(turnData.p);
            
            //console.log(turnData, w, s, p);

            if( w === 1 ){                
                if( (s !== s0) && (s !== s1) ){
                    core.IWG.ame('error', { mess: ['error on doubleMatch']});  
                }
                // inline bank
                var prize = parseInt(self.getPrizeList()[p]);
                self.setInlineBankCheck(prize);  

            } else {
                if( (s == s0) && (s == s1) ){
                    core.IWG.ame('error', { mess: ['error on game5 - match on loser']});  
                }
            }
        }
     
    }
    
    function balanceInlineBank(self) {
        if(self.getInlineBankCheck() != parseInt(self.getAmount()) ) {
            core.IWG.ame('error', { mess: ['error on bank check']});
        }
    }


    iwg._class("iwg.lib.Ticket", Ticket);
}(window));