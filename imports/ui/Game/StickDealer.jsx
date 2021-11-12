import React from 'react';
import styled from 'styled-components';

const WrappedButton = styled.button`
    width: 20% !important;
    background-color: #fff !important;
`;


export const StickDealer = ({ game, updateGame, renderSuit, userId }) => {

    const handleStdMake = (suit) => {
        const newGame = game;
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
        updateGame(newGame);
    };

    const stdCurrentUi = () => (
        <div>
            <p>What suit do you want to make it?</p>
            {
                ['H', 'S', 'C', 'D'].map((suit, i) => (<WrappedButton style={{backgroundColor: ['H','D'].includes(suit) ? 'red' : null}} key={i} onClick={() => handleStdMake(suit)}>{renderSuit(suit)}</WrappedButton>))
            }
        </div>
    );

    const stdOpposingUi = (player) => (
        <div>
            <p>Waiting on {game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} to make it</p>
        </div>
    );

    return (
        <div>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? stdCurrentUi() : stdCurrentUi()
                    :
                    userId === game.playerOne.id ? stdOpposingUi(game.playerOne) : stdOpposingUi(game.playerTwo)
            }
        </div>

    );
};