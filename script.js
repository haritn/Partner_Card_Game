/* 
Data
    /games/
      game1
        startDate:
        endDate:
        players{list of players}
          player1
            name:
            hand:
            tricks:

        deck:
        tricks:
        bid:
        trump:
        turn:
        winners:
        losers:
        scores:
	
Psudo code
	- get number of players.
	- discard cards accordingly.
	- shuffle deck.
	- distribute cards to all players - 
	- auto bid first player.
	- ask next for bid.and catpure new bid or "pass"
	- repeat until all excpet one is "pass"
	- Ask the higest bidder do declare the partner
	- Let the higest bidder set the trump.
		- Let highest bidder start the trick.
		- trick - allow only same suite or trump 
		- find out the winner of the trump, 
		- deposite the trick to wining player's pile
		- let the winner of the trick start the next trick.
	- repeat until all the cards are played.
	- calculate the score and declare the winning team
	- add scores for each player.
	- ask to start another game
	

*/
numberOfPlayers = 5;
console.log('players:' + numberOfPlayers);
cardsInHand = Math.floor(52 / numberOfPlayers);
hands =[];
currentTrick = new cards.Hand({faceUp:true, x:100});
currentPlayerIndex = 0;
currentPlayerHand = hands[currentPlayerIndex];
playGame();

//Let's deal when the Deal button is pressed:
$('#deal').click(function () {
  //Deck has a built in method to deal to hands.
  numberOfPlayers = $('#players').val();
  cardsInHand = Math.floor(52 / numberOfPlayers);
  cards.init({ table: '#card-table' });
  deck = initializeDeck();
  console.log('deck size:' + deck.length)
  hands = initializeHands();
  $('#deal').hide();
  deck.deal(cardsInHand, hands, 1, function(){sortAllHands();});
  displayMessage("player# 1 your turn");
  
});


function sortAllHands(){
    for (i = 0; i < numberOfPlayers; i++){
      hands[i].sortCards();
      hands[i].render();
  }
}

function initializeDeck() {
  var cardsToRemove = 52 % numberOfPlayers;
  //Tell the library which element to use for the table
  //Create a new deck of cards

  var deck = new cards.Deck();
  deck.x = 900;
  deck.y = 100
  //cards.all contains all cards, discard last X 
  deck.addCards(cards.all);  
  //discard extra cards 
  while(cardsToRemove--){
    discardPile = new cards.Deck({faceUp:false});
    $(deck.bottomCard().el).hide();
    discardPile.addCard(deck.bottomCard());
  }
  cards.shuffle(deck);
  deck.render({ immediate: true});
  return deck;
}

function initializeHands() {
  var hands = [];
  for (i = 0; i < numberOfPlayers; i++) {
    // hands[i] = new cards.Hand({ faceUp: i == myPlayerNumber, y: i * 100 + 100 });
    hands[i] = new cards.Hand({ faceUp: true, y: i * 100 + 100 });
    hands[i].click(handClicked);
  }
  return hands;
}

function playGame(){

}

function handClicked(card){
  card.container 
  if(card.container == currentPlayerHand){
    displayMessage('bingo')
  }
	currentTrick.addCard(card);
	currentTrick.render();    
	// }
}

function displayMessage(msg){
    console.log("message:" + msg)
    $( "#msg-box" ).html(msg);
}


