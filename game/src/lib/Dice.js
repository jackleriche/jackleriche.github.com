(function(window) {

  /*
    Dice is called every go, has two arguments passed in and needs to display these once clicked  
  */
  
  
  var color = "#"

  function Dice() {
    
    // properties that have been passed into the dice class | for testing I have used a random number gen   
    this.dice1 = getRandomRoll();
    this.dice2 = getRandomRoll();
       
    /* getters */
    /* this.getDice1 = function(){ return( getDice1 ); }
       this.getDice2 = function(){ return( getDice2 ); }
    */
    
  }
  
  // for now - will be past in by loader
  function getRandomRoll () {
      return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
  
  Dice.prototype.drawDice = function() {
  
    // dice objects
    dice1 = new createjs.Text(this.dice1, "36px Arial", color);
    dice2 = new createjs.Text(this.dice2, "36px Arial", color);
    
    // return array with both dice objects
    return [dice1, dice2] ;
    
  }
  
  
  window.Dice = Dice; // allows us to make available to global scope
    
}(window));