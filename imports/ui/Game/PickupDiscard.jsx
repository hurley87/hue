import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const WrappedButton = styled.span`
    border-radius: 3px;
    cursor: pointer;
    margin: 2px;
`;

const TrumpButton = styled.button`
    background-color: #fff !important;
    border: 1px solid #1A0033 !important;
    width: 20% !important;
`;


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
                        <p>Make it trump!</p>
                        {
                            ['H', 'S', 'C', 'D'].map((suit, i) => (<TrumpButton key={i} onClick={() => handleMakeTrump(suit)}>{renderSuit(suit)}</TrumpButton>))
                        }
                    </div>
                ) : (
                        <div>
                            Choose a card to discard: <br />
                            {
                                player.hand.map((card, i) => (<WrappedButton key={i} onClick={() => handleOrderDiscard(card.suit, card.value)}>{renderCard(card.suit, card.value)}</WrappedButton>))
                            }
                            <WrappedButton onClick={() => handleOrderDiscard(game.deck[0].suit, game.deck[0].value)}>{renderCard(game.deck[0].suit, game.deck[0].value)}</WrappedButton>
                        </div>
                    )
            }
        </div>
    );

    const pickupDiscardOpposingUi = (player) => (
        <div>
            <p>Waiting on {player.id === game.playerOne.id ? game.playerOne.username : game.playerTwo.username} to discard</p>
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