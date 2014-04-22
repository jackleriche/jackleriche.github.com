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
                _outcome = null,
                _param = null;

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
            this.getIsWinner = function () {
                return _isWinner;
            };
            this.getParam = function () {
                return _param;
            };

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
            this.setIsWinner = function (prv) {
                _isWinner = prv;
            };
            this.setParam = function (prv) {
                _param = prv;
            };

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
            games = [ticket.g1, ticket.g2, ticket.g3, ticket.g4];

        self.setGames(games);
        self.setGame1(games[0]);
        self.setGame2(games[1]);
        self.setGame3(games[2]);
        self.setGame4(games[3]);

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

        checkIfValid(valid, 1);

        checkTurnData();

    }

    function checkIfValid(isValid, errCode) {

        /*
if (isValid === false){
			//R.halt();
			core.IWG.ame('error', {mes: ['ticket prize amount is not in prizelist || code: ' + errCode]});		
		}
*/


    }

    function checkTurnData() {}


    iwg._class("iwg.lib.Ticket", Ticket);
}(window));