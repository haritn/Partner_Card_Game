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
numberOfPlayers = 3;
cardsToDeal = Math.floor(52 / numberOfPlayers);
cardsToRemove = 52 % numberOfPlayers;
myPlayerNumber = 1;
//Tell the library which element to use for the table
//cards.init({table:'#card-table'});
cards.init();

//Create a new deck of cards
deck = new cards.Deck();

//By default it's in the middle of the container, put it slightly to the side
deck.x -= 50;
deck.y += 100

//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all);
//deck.removeCard(deck[0])
//No animation here, just get the deck onto the table.
deck.render({ immediate: true });

//Now lets create a couple of hands, one face down, one face up.

hands = [];

for (i = 0; i < numberOfPlayers; i++) {
  hands[i] = new cards.Hand({ faceUp: true, x: deck.x - 50, y: i * 100 });
}

//Lets add a discard pile
discardPile = new cards.Deck({ faceUp: true });
discardPile.x += 180;


//Let's deal when the Deal button is pressed:
$('#deal').click(function () {
  //Deck has a built in method to deal to hands.
  $('#deal').hide();
  deck.deal(cardsToDeal, hands, 5, function () {
    //This is a callback function, called when the dealing
    //is done.
    //		discardPile.addCard(deck.topCard());
    discardPile.render();
  });
});

$('#sort').click(function () {
  hands[0].sort(cardCompare);
  console.log(hands[0]);
  hands[0].render();
});

function cardCompare(a, b) {
  if (a.suit < b.suit) return -1;
  if (a.suit > b.suit) return 1;
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0;
}
/*
//When you click on the top card of a deck, a card is added
//to your hand
deck.click(function(card){
	if (card === deck.topCard()) {
		lowerhand.addCard(deck.topCard());
		lowerhand.render();
	}
});

//Finally, when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
lowerhand.click(function(card){
	if (card.suit == discardPile.topCard().suit 
		|| card.rank == discardPile.topCard().rank) {
		discardPile.addCard(card);
		discardPile.render();
		lowerhand.render();
	}
}); */


//So, that should give you some idea about how to render a card game.
//Now you just need to write some logic around who can play when etc...
//Good luck :)

