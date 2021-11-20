import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const WrappedButton = styled.span`
    border-radius: 3px;
    cursor: pointer;
    margin: 2px;
    border: 3px solid #B366FF !important;
    display: inline-block;
    padding-top: 0px;
    padding-bottom: 3px;
    &:hover {
        background-color: #B366FF;
    }
`;

export const OrderDiscard = ({ game, updateGame, renderCard, userId }) => {

    const handleOrderDiscard = (suit, value) => {
        const newGame = game;

        if (newGame.currentPlayer === newGame.playerOne.id) {
            newGame.playerOne.hand.push({ suit: game.deck[0]?.suit, value: game.deck[0]?.value });
            const index = _.findIndex(newGame.playerOne.hand, { suit, value });
            newGame.playerOne.hand.splice(index, 1);
        } else {
            newGame.playerTwo.hand.push({ suit: game.deck[0]?.suit, value: game.deck[0]?.value });
            const index = _.findIndex(newGame.playerTwo.hand, { suit, value });
            newGame.playerTwo.hand.splice(index, 1);
        }

        newGame.dealer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        if (newGame.deck[0]?.suit !== 'J') newGame.trump = newGame.deck[0]?.suit;
        newGame.status = 'PlayCards';
        updateGame(newGame);
    };

    const orderDiscardCurrentUi = (player) => (
        <>
            Choose one to discard:
            {
                player.hand.map((card, i) => (<WrappedButton key={i} onClick={() => handleOrderDiscard(card?.suit, card?.value)}>{renderCard(card?.suit, card?.value)}</WrappedButton>))
            }
            <WrappedButton onClick={() => handleOrderDiscard(game.deck[0]?.suit, game.deck[0]?.value)}>{renderCard(game.deck[0]?.suit, game.deck[0]?.value)}</WrappedButton>
        </>
    );

    const orderDiscardOpposingUi = () => (
        <>
            You just ordered the {renderCard(game.deck[0]?.suit, game.deck[0]?.value)}
        </>
    );

    return (
        <>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? orderDiscardCurrentUi(game.playerOne) : orderDiscardCurrentUi(game.playerTwo)
                    :
                    userId === game.playerOne.id ? orderDiscardOpposingUi() : orderDiscardOpposingUi()
            }
        </>

    );
};