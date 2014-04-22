(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 	= window.com.camelot,
        iwg 		= camelot.iwg,
        lib 		= iwg.lib,
        GS 			= window.com.greensock,
        core 		= camelot.core,
        Helper 		= lib.Helper,
        R 			= lib.R,

    Ticket = function (ticket) {
        if (typeof Ticket.instance === "object") {
            return Ticket.instance;
        }
        
        var _ticket 	= ticket,
        	_prizeList	= [],
        	_amount		= "",
        	_isWinner 	= null,
        	_prizeTier	= null,
        	_games		= [],
        	_game1 		= null,
        	_game2		= null,
        	_game3		= null,
        	_game4		= null,	       	
        	_outcome 	= null,
        	_param		= null; 
 
        // getter
        this.getTicket = function () {
            return _ticket;
        };
        this.getOutcome = function () {
            return _outcome;
        };
        this.getPrizeList = function() {
	        return _prizeList;
        };
        this.getAmount = function() {
	        return _amount;
        }
        this.getGames = function() {
	        return _games;
        };
        this.getGame1 = function() {
	        return _game1;
        };
        this.getGame2 = function() {
	        return _game2;
        };
        this.getGame3 = function() {
	        return _game3;
        };
        this.getGame4 = function() {
	        return _game4;
        };
        this.getIsWinner = function() {
			return _isWinner;
        };
        this.getParam = function() {
	        return _param;
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
        this.setGames = function(prv) {
	        _games = prv;
        };
        this.setGame1 = function(prv) {
	        _game1 = prv;
        };
        this.setGame2 = function(prv) {
	        _game2 = prv;
        };
        this.setGame3 = function(prv) {
	        _game3 = prv;
        };
        this.setGame4 = function(prv) {
	        _game4 = prv;
        };
        this.setIsWinner = function(prv) {
	        _isWinner = prv;
        };
        this.setParam = function(prv) {
	        _param = prv;
        }

        Ticket.instance = this;
        
        init(ticket);
    }
    
    function init(t){
		
    	var self = Ticket.instance;
    	var ticket = self.getTicket();
    	
		sortPrizeList();
		setAmount();
		sortGames();
		
		checkValid();
		
    }
    
	function sortPrizeList(){
	
		var self 	= Ticket.instance,
			ticket	= self.getTicket();
	
		var prizeList 	= ticket.prizeList.a,
			prizeArray	= [];
		prizeArray = prizeList.split(',');
		prizeArray.push("0.00");
		self.setPrizeList(prizeArray);
		self.setIsWinner(ticket.outcome.isWinner);
		self.setParam(ticket.params);
		
	}
	
	function setAmount(){
		var self = Ticket.instance,
			ticket = self.getTicket(),
			amount = ticket.outcome.amount;
		if(amount){
			self.setAmount((amount).toString());	
		}					
	}
	
	function checkValid(){
		
		var self 	= Ticket.instance,
			valid	= false;
		
		for( var prizeAmount in self.getPrizeList()){
			var prize = self.getPrizeList()[prizeAmount];
			if(self.getAmount() === prize){
				valid = true;
			}
		}
		
		checkIfValid(valid, 1);
				
		checkTurnData();
		
	}
	
	function checkTurnData(){
		
		var self 		= Ticket.instance,
			games 		= self.getGames(),
			prizeList 	= self.getPrizeList(),
			turnData	= [],
			turnPrize	= [],
			turnWinners	= [];	
		// extract all values from the ticket
		for( var i = 0; i < games.length; i++){
			var turns = games[i].turn;
			for ( var j = 0; j < turns.length; j++){
				var val = turns[j].v,
					v 	= val.split("|");	
				turnPrize.push(v[1]);
				// if the asset is a winner add it into a seperate array for check
				if(turns[j].w == 1){
					turnWinners.push(v[1]);
				}
				
			}
		}		
		var isValid = true
		// checks to see if the prize is in the valid prize array
		for( var k = 0; k < turnPrize.length; k++ ){
			var validValue = Helper.checkArray(turnPrize[k], prizeList);
			if(validValue === false){
				isValid = false;
			}
		}
		// checks if winnings is greater then prize allocated
		
		checkIfValid(isValid, 2);
		
		greaterThanPrize(turnWinners);	
		checkFalseWinners(self);
	}
	
	function checkFalseWinners(self){
				
		checkGame1FalseWinners(self.getGame1());
		checkGame2FalseWinners(self.getGame2());
		checkGame3FalseWinners(self.getGame3());
		checkGame4FalseWinners(self.getGame4());
		
	}
	
	function checkGame1FalseWinners(data){

		var turns 	= data.turn,
			match	= Ticket.instance.getParam().g3,
			valid 	= null;
		
		for (var turn in turns){
		
			var value 	= turns[turn].v,
				check 	= value.split("|")[0],
				winner 	= turns[turn].w;
			
			if ( match === check && winner != 1){
				
				//error
				valid = false
				
			}
			
		}
		
		checkIfValid(valid, 4);		
		
	}
	function checkGame2FalseWinners(data){
		var turns 	= data.turn,
			match	= Ticket.instance.getParam().g4,
			valid 	= null;
		
		for (var turn in turns){
		
			var value 	= turns[turn].v,
				check 	= value.split("|")[0],
				winner 	= turns[turn].w;
			
			if ( match === check && winner != 1){
				
				//error
				valid = false
				
			}
			
		}
		
		checkIfValid(valid, 5);
	}
	function checkGame3FalseWinners(data){
		
		var turns 	= data.turn,
			valid 	= null;
		
		for (var turn in turns){
					
			var value 	= turns[turn].v,
				check 	= value.split("|")[0].split(',').slice(-1).pop(),
				winner 	= turns[turn].w;
			
			if ( check == 7 && winner != 1){
				
				//error
				valid = false
				
			}

			checkIfValid(valid, 6)
			
		}
		
		
	}
	function checkGame4FalseWinners(data){
	
		var turns 	= data.turn,
			valid 	= null;
		
		for (var turn in turns){
					
			var value 	= turns[turn].v,
				check 	= value.split("|")[0].split(','),
				winner 	= turns[turn].w;
			
			if ( check[0] === check[1] && winner != 1){
				
				//error
				valid = false
				
			}

			checkIfValid(valid, 7)
			
		}
		
	}
	
	function greaterThanPrize(prize){
	
		// add turnWinners together
		var self 	= Ticket.instance,
			total 	= 0,
			isValid	= true;
		
		for(var p in prize){
			var inc = prize[p];
			total += parseInt(inc);		
		}

		if(total !== parseInt(self.getAmount())){
			isValid = false;
		}
		
		checkIfValid( isValid, 3);

	}

	function checkIfValid(isValid, errCode){
		
		if (isValid === false){
			R.halt();
			core.IWG.ame('error', {mes: ['ticket prize amount is not in prizelist || code: ' + errCode]});		
		}
		
		
	}
	
	function sortGames(){

		var self = Ticket.instance,
			ticket = self.getTicket(),
			games = ticket.games.game;
		
		self.setGames(games);
		self.setGame1(games[0]);
		self.setGame2(games[1]);
		self.setGame3(games[2]);
		self.setGame4(games[3]);
		
	}

    //namespace path
    iwg._class("iwg.lib.Ticket", Ticket);
    
}(window));