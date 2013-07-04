//create all the variables
var score,
	cardsmatched,
	turns = 5,
	losingString = "You didn't find the golden pair but your new Randalls loyalty card is on its way...",
	winningString = "You found the golden pair.Your new Randalls loyalty card <br /> is on it’s way pre-charged with <strong>£10 worth</strong> of credit!<br />Just enter your full name below and submit",
	winnerSubmit = "<form><input type='text' name='fullname' placeholder='Enter your full name here...'><input type='submit' value='Submit'></form>",
	isWinner = false,
	ready = true;
var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards= $("#cards");
var uiEndScreen = $('.endScreen');
var uiTurnsLeft = $(".turns-left span");
var uiTimer = $("#timer");
var deal = Math.random() < 0.5 ? true : false;



//create deck array
var matchingGame = {};
if(deal){
	matchingGame.deck = ['agfh', 'agff','hgdt', 'hgdd','hdjf', 'hdjj','thbv', 'thbb','lukf', 'lukk','hysg', 'hyss',
'wkdn', 'wkdn','wkdn', 'wkdn'];	
} else {
	matchingGame.deck = ['agfh', 'agff','hgdt', 'hgdd','hdjf', 'hdjj','thbv', 'thbb','lukf', 'lukk','hysg', 'hyss',
'ljgd', 'ljgg','kjgg', 'kjgh'];
}


//on document load the lazy way
$(function(){
	init();
});

//initialise game
function init() {
	uiComplete.hide();
	playGame = false;
	startGame();

}

//start game and create cards from deck array
function startGame(){

	if (turns > 0){		
		//uiCards.show();
		score = 0;
		cardsmatched = 0;
	   	if (playGame == false) {
	   			playGame = true;
				matchingGame.deck.sort(shuffle);
				for(var i=0;i<(matchingGame.deck.length-1);i++){
						$(".card:first-child").clone().appendTo("#cards");
					}
					// initialize each card's position
					uiCards.children().each(function(index) {
						// align the cards to be 3x6 ourselves.
						$(this).css({
							"left" : ($(this).width() + 20) * (index % 4),
							"top" : ($(this).height() + 20) * Math.floor(index / 4)
						});
						// get a pattern from the shuffled deck
						var pattern = matchingGame.deck.pop();
						// visually apply the pattern on the card's back side.
						$(this).find(".back").addClass(pattern);
						// embed the pattern data into the DOM element.
						$(this).attr("data-pattern",pattern);
						// listen the click event on each card DIV element.
						$(this).click(selectCard);
					});											 
		   	
		};
	} else {
		return false;
	}	   
}


function endGame(hasWon) {
	
	if (turns === 0){
		ready = false;
		uiComplete.show();
		if (hasWon){
			uiComplete.addClass("winner");
			uiEndScreen.html(winningString + winnerSubmit);
			isWinner = true;
		} else {
			uiComplete.addClass("loser");
			uiEndScreen.html(losingString);
		}
	} 
}

//shuffle cards
function shuffle() {
	return 0.5 - Math.random();
}

//onclick function add flip class and then check to see if cards are the same
function selectCard() {
	if (ready) {
		// we do nothing if there are already two cards flipped.
		if ($(".card-flipped").size() > 1) {
		return;
		}
		$(this).addClass("card-flipped");
		// check the pattern of both flipped card 0.7s later.
		if ($(".card-flipped").size() == 2) {
		setTimeout(checkPattern,700);
		}
	}
}

//if pattern is same remove cards otherwise flip back
function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			if(document.webkitTransitionEnd){
				$(".card-removed").bind("webkitTransitionEnd",	removeTookCards);
			}else{
				removeTookCards();
			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

//put 2 flipped cards in an array then check the image to see if it's the same.
function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");

	if (( pattern === "wkdn" ) && (anotherPattern == "wkdn")) {
		turns = 0;
		updateTurns(turns);
		endGame(true);
	} else {
		turns--;
		updateTurns(turns);
		resetCards();
		endGame(false);
	}
	
}

function resetCards() {

}

function updateTurns(t){
	uiTurnsLeft.html(t);
}


				
