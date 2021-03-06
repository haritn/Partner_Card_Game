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
		- find out the winner of the trick, 
		- deposite the trick to wining player's pile
		- let the winner of the trick start the next trick.
	- repeat until all the cards are played.
	- calculate the score and declare the winning team
	- add scores for each player.
	- ask to start another game
	

*/
players = "Harit,Yash,Anand,Jatin,Bhaven".split(',');
numberOfPlayers = players.length;
cardsInHand = Math.floor(52 / numberOfPlayers);
hands =[];
currentTrick = new cards.Hand({faceUp:true, x:100});
currentPlayerIndex = 0;
currentPlayerHand = null;
playGame();

$('#names').html(players.join(', '));
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
    hands[i] = new cards.Hand({ faceUp: true, y: i * 100 + 100});
    hands[i].player = i +'';
    hands[i].click(handClicked);
  }
  console.log('hands');
  console.log(hands);
  return hands;
}

function playGame(){

}

function handClicked(card){
  currentHand = hands[currentPlayerIndex];
  bottomCard = currentTrick.bottomCard();
  console.log(bottomCard);

  if(card.container.player == currentPlayerIndex){ //only the player with their turn can play
    if( !currentTrick.bottomCard() ||  //if current trick is empty or 
        card.suit == bottomCard.suit || //current played card matches the suit of the trick.
        !currentHand.hasSuit(bottomCard.suit)){ //or player doesn't have any card from the same suit.        
        currentTrick.addCard(card);
        currentTrick.render();
        currentPlayerIndex ++;
        if(currentPlayerIndex >= numberOfPlayers){
          closeCurrentTrick(); //decide winner, move the pile next to player, count points.
          startNewTrick(); //set current index to winner.
        } else {
          displayMessage('Player '+ (currentPlayerIndex +1)+ ' your turn')      
        }    
    } else {
      displayMessage('Please pick card from Suit' + bottomCard.suit)
    }

  } else {
    displayMessage('Sorry not your turn player ' + card.container.player);
  }

	// }
}

function closeCurrentTrick() {
  //TODO
  console.log("close current trick()");
  var winningCard = currentTrick.bottomCard(); //take the first card in the trick
  console.log(currentTrick);
  console.log(hands[0]);
  var trickSuit = winningCard.suit; //first card sets the trick suit
  for (card of currentTrick){ 
    if (card.suit == trickSuit && card.rank > winningCard.rank) winningCard = card; //higher card.    
  }
  displayMessage('Trick winner is player # ' + (winningCard.player) + ' ' + players[winningCard.player]);
  console.log(winningCard.player);
  return winningCard.player;
}

function startNewTrick(){
  //TODO
}

function displayMessage(msg){
    console.log("message:" + msg)
    $( "#msg-box" ).html(msg);
}


