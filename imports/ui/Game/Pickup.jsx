import React from 'react';
import styled from 'styled-components';
import MagicRainbowButton from '../MagicRainbowButton';

const WrappedButton = styled(MagicRainbowButton)`

`;

export const Pickup = ({ game, updateGame, renderCard, userId }) => {

    const handlePickup = (move) => {
        const newGame = game;
        if (move === 'pass') {
            newGame.status = 'Make';
            newGame.currentPlayer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        } else {
            newGame.status = 'PickupDiscard';
            newGame.currentPlayer === newGame.playerOne.id ? newGame.maker = newGame.playerOne.id : newGame.maker = newGame.playerTwo.id;
            newGame.trump = game.deck[0].suit;
        }
        updateGame(newGame);
    };

    const pickupCurrentUi = () => (
        <div>
            Want to pick up the {renderCard(game.deck[0].suit, game.deck[0].value)} or pass? <br/ >
            <WrappedButton onClick={() => handlePickup('make')}>Make</WrappedButton>
            <WrappedButton onClick={() => handlePickup('pass')}>Pass</WrappedButton>
        </div>
    );

    const pickupOpposingUi = (player) => (
        <div>
            { game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} is deciding wether or not to pick up {renderCard(game.deck[0].suit, game.deck[0].value)}
        </div>
    );

    return (
        <div>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? pickupCurrentUi() : pickupCurrentUi()
                    :
                    userId === game.playerOne.id ? pickupOpposingUi(game.playerOne) : pickupOpposingUi(game.playerTwo)
            }
        </div>
    );
};