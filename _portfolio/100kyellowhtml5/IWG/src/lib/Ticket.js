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
                _turnArray  = [],
                _winArray   = [],
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
            this.getTurnArray = function () {
                return _turnArray;
            };
            this.getWinArray = function(){
                return _winArray;
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
            this.setOutcome = function (prv) {
                _outcome = prv;
            }
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

        var self    = Ticket.instance,
            ticket  = self.getTicket();

        sortPrizeList();
        setAmount();

        sortTurns();

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
        self.setOutcome(ticket.outcome);
    }

    function setAmount() {

        var self = Ticket.instance,
            ticket = self.getTicket(),
            amount = ticket.outcome.amount;
        if (amount) {
            self.setAmount((amount).toString());
        }

        if(parseInt(self.getOutcome().wT) === 1){
            self.setIsWinner(true);
        }

    }

    function sortTurns(){

        var self        = Ticket.instance,
            ticket      = self.getTicket(),
            g1          = ticket.g1.go,
            count       = 0;

        for (var turn in g1){

            self.getTurnArray().push(g1[turn]);
            count = parseInt(turn);
        }

        if(count !== 8){
            core.IWG.ame('error', { mess: ['turn error - not enough turns']});
        }
    }

    function checkValid() {

        var self    = Ticket.instance,
            valid   = false;

        for (var prizeAmount in self.getPrizeList()) {
            var prize = parseInt(self.getPrizeList()[prizeAmount]);
            if (parseInt(self.getAmount()) === prize) {
                valid = true;
            }
        }

        checkMatchTwo(self);


      //  balanceInlineBank(self);

    }

    function checkMatchTwo(self){

        var game1 = self.getTurnArray();

        for (var i = 0; i < game1.length; i++){
            var turnData    = game1[i],
                w           = parseInt(turnData.w),
                p           = parseInt(turnData.p);

            if( w === 1){
                // if its a winner add it to a winning array
                self.getWinArray().push(turnData);
            }

        }

        // if wT is = 1, ticket is a winner and should therefore have 3 turns
        // with turndata.w of 1
        if(parseInt(self.getOutcome().wT) === 1){

            var winCount = 0;

            for(var winCheck in self.getWinArray()){
                winCount++;
            }

            if(winCount !== 3){
                core.IWG.ame('error', { mess: ['error on win count']});
            }

        }

        // if wT is 0, but there is 3 winning turns there has been an error
        if(parseInt(self.getOutcome().wT) === 0){

            var manipCount = 0;

            for(var manipCheck in self.getWinArray()){
                manipCount++;
            }

            if(manipCount === 3){
                core.IWG.ame('error', { mess: ['ticket manipulated']});
            }

        }

    }

    function balanceInlineBank(self) {
        if(self.getInlineBankCheck() != parseInt(self.getAmount()) ) {
            core.IWG.ame('error', { mess: ['error on bank check']});
        }
    }

    Ticket.prototype.getTurnArray = function(){
        console.log(this);
    }


    iwg._class("iwg.lib.Ticket", Ticket);
}(window));
