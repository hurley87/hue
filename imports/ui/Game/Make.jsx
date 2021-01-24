import React from 'react';
import styled from 'styled-components';
import MagicRainbowButton from '../MagicRainbowButton';

const WrappedButton = styled(MagicRainbowButton)`
    width: 20% !important;
`;

const PassButton = styled(WrappedButton)`
    height: 62px;
    position: relative;
    bottom: 2px;
`;

export const Make = ({ game, updateGame, renderSuit, userId }) => {

    const handleMakeSuit = (suit) => {
        const newGame = game;

        if (suit === 'pass') {
            newGame.status = 'StickDealer';
            if (newGame.currentPlayer === newGame.playerOne.id) {
                newGame.currentPlayer = newGame.playerTwo.id;
            } else {
                newGame.currentPlayer = newGame.playerOne.id;
            }
        } else {
            newGame.status = 'PlayCards';
            newGame.trump = suit;
            if (newGame.currentPlayer === newGame.playerOne.id) {
                newGame.maker = newGame.playerOne.id;
            } else {
                newGame.maker = newGame.playerTwo.id;
            }
            if (newGame.dealer === newGame.playerOne.id) {
                newGame.currentPlayer = newGame.playerTwo.id;
            } else {
                newGame.currentPlayer = newGame.playerOne.id;
            }
        }
        updateGame(newGame);
    };

    const makeCurrentUi = () => (
        <div>
            <p>What suit do you want to make it?</p>
            {
                ['H', 'S', 'C', 'D'].map((suit, i) => suit !== game.deck[0].suit ? (<WrappedButton key={i} onClick={() => handleMakeSuit(suit)}>{renderSuit(suit)}</WrappedButton>) : null)
            }
            <PassButton onClick={() => handleMakeSuit('pass')}>pass</PassButton>
        </div>
    );

    const makeOpposingUi = (player) => (
        <div>
            <p>Waiting on {game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} to make it</p>
        </div>
    );

    return (
        <div>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? makeCurrentUi() : makeCurrentUi()
                    :
                    userId === game.playerOne.id ? makeOpposingUi(game.playerOne) : makeOpposingUi(game.playerTwo)
            }
        </div>

    );
};