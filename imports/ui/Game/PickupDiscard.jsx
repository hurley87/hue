import React from 'react';
import _ from 'lodash';

export const PickupDiscard = ({ game, updateGame, renderCard, renderSuit, userId }) => {

    const handleMakeTrump = (trump) => {
        const newGame = game;
        newGame.trump = trump;
        updateGame(newGame);
    };

    const handleOrderDiscard = (suit, value) => {
        const newGame = game;

        if (newGame.currentPlayer === newGame.playerOne.id) {
            newGame.playerOne.hand.push({ suit: game.deck[0].suit, value: game.deck[0].value });
            const index = _.findIndex(newGame.playerOne.hand, { suit, value });
            newGame.playerOne.hand.splice(index, 1);
        } else {
            newGame.playerTwo.hand.push({ suit: game.deck[0].suit, value: game.deck[0].value });
            const index = _.findIndex(newGame.playerTwo.hand, { suit, value });
            newGame.playerTwo.hand.splice(index, 1);
        }

        newGame.dealer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        if (newGame.deck[0].suit !== 'J') newGame.trump = newGame.deck[0].suit;
        newGame.status = 'PlayCards';
        updateGame(newGame);
    };

    const pickupDiscardCurrentUi = (player) => (
        <div>
            {
                game.trump === 'J' ? (
                    <div>
                        <h5>Make it trump!</h5>
                        {
                            ['H', 'S', 'C', 'D'].map((suit, i) => (<button key={i} onClick={() => handleMakeTrump(suit)}>{renderSuit(suit)}</button>))
                        }
                    </div>
                ) : (
                        <div>
                            Discard:
                            {
                                player.hand.map((card, i) => (<button key={i} onClick={() => handleOrderDiscard(card.suit, card.value)}>{renderCard(card.suit, card.value)}</button>))
                            }
                            <button onClick={() => handleOrderDiscard(game.deck[0].suit, game.deck[0].value)}>{renderCard(game.deck[0].suit, game.deck[0].value)}</button>
                        </div>
                    )
            }
        </div>
    );

    const pickupDiscardOpposingUi = (player) => (
        <div>
            <h5>Waiting on {player.id === game.playerOne.id ? game.playerOne.username : game.playerTwo.username} to discard</h5>
        </div>
    );

    return (
        <div>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? pickupDiscardCurrentUi(game.playerOne) : pickupDiscardCurrentUi(game.playerTwo)
                    :
                    userId === game.playerOne.id ? pickupDiscardOpposingUi(game.playerOne) : pickupDiscardOpposingUi(game.playerTwo)
            }
        </div>
    );
};