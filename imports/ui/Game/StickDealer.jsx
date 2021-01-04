import React from 'react';


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
            <h5>What suit do you want to make it?</h5>
            {
                ['H', 'S', 'C', 'D'].map((suit, i) => (<button key={i} onClick={() => handleStdMake(suit)}>{renderSuit(suit)}</button>))
            }
        </div>
    );

    const stdOpposingUi = (player) => (
        <div>
            <h5>Waiting on {game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} to make it</h5>
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