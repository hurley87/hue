import React from 'react';
import styled from 'styled-components';

const WrappedButton = styled.button`
    width: 20% !important;
    background-color: #fff !important;
    border: 1px solid #fff !important;
    padding: 6px !important;

    &:hover {
        border: 1px solid #B366FF !important;
    }
`;

const PassButton = styled.button`
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
        <div style={{paddingTop: "60px"}}>
            What suit do you want to make it?
            {
                ['H', 'S', 'C', 'D'].map((suit, i) => suit !== game.deck[0]?.suit ? (<WrappedButton key={i} onClick={() => handleMakeSuit(suit)}>{renderSuit(suit)}</WrappedButton>) : null)
            }
            <PassButton onClick={() => handleMakeSuit('pass')}>pass</PassButton>
        </div>
    );

    const makeOpposingUi = (player) => (
        <div>
            <p  style={{paddingTop: "60px"}}>Waiting on {game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} to make it.</p>
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