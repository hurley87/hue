import React from 'react';
import styled from 'styled-components';
import MagicRainbowButton from '../MagicRainbowButton';

const WrappedButton = styled(MagicRainbowButton)`

`;

const Main = styled.div`
    text-align: center;
`;


export const Order = ({ game, updateGame, renderCard, userId }) => {

    const orderCurrentUi = () => (
        <div>
            Order up the {game.deck[0].value === 15 ? renderCard(game.deck[1].suit, game.deck[1].value) : renderCard(game.deck[0].suit, game.deck[0].value)} or pass? <br/>
            <WrappedButton onClick={() => handleOrderPickup()}>Order</WrappedButton>
            <WrappedButton onClick={() => handleOrderPass()}>Pass</WrappedButton>
        </div>
    );

    const orderOpposingUi = () => (
        <div>
            {game.playerTwo.username} has option to order {game.deck[0].value === 15 ? renderCard(game.deck[1].suit, game.deck[1].value) : renderCard(game.deck[0].suit, game.deck[0].value)}
        </div>
    );

    const handleOrderPickup = () => {
        const newGame = game;
        newGame.status = 'OrderDiscard';
        if (newGame.currentPlayer === newGame.playerOne.id) {
            newGame.maker = newGame.playerOne.id;
            newGame.currentPlayer = newGame.playerTwo.id;
        } else {
            newGame.maker = newGame.playerTwo.id;
            newGame.currentPlayer = newGame.playerOne.id;
        }
        newGame.deck[0].value === 15 ? newGame.trump = newGame.deck[1].suit : newGame.trump = newGame.deck[0].suit
        updateGame(newGame);
    };

    const handleOrderPass = () => {
        const newGame = game;
        newGame.status = 'Pickup';
        newGame.currentPlayer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        updateGame(newGame);
    };

    return (
        <Main>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? orderCurrentUi() : orderCurrentUi()
                    :
                    userId === game.playerOne.id ? orderOpposingUi() : orderOpposingUi()
            }
        </Main>

    );
};