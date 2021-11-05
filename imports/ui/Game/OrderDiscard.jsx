import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const WrappedButton = styled.span`
    cursor: pointer;
`;

export const OrderDiscard = ({ game, updateGame, renderCard, userId }) => {

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

    const orderDiscardCurrentUi = (player) => (
        <div>
            <p>You were ordered to pickup! Discard:</p>
            {
                player.hand.map((card, i) => (<WrappedButton key={i} onClick={() => handleOrderDiscard(card.suit, card.value)}>{renderCard(card.suit, card.value)}</WrappedButton>))
            }
            <WrappedButton onClick={() => handleOrderDiscard(game.deck[0].suit, game.deck[0].value)}>{renderCard(game.deck[0].suit, game.deck[0].value)}</WrappedButton>
        </div>
    );

    const orderDiscardOpposingUi = () => (
        <div>
            You just ordered the {renderCard(game.deck[0].suit, game.deck[0].value)}
        </div>
    );

    return (
        <div>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? orderDiscardCurrentUi(game.playerOne) : orderDiscardCurrentUi(game.playerTwo)
                    :
                    userId === game.playerOne.id ? orderDiscardOpposingUi() : orderDiscardOpposingUi()
            }
        </div>

    );
};