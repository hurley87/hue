import React from 'react';


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
            <h5>What suit do you want to make it?</h5>
            {
                ['H', 'S', 'C', 'D'].map((suit, i) => suit !== game.deck[0].suit ? (<button key={i} onClick={() => handleMakeSuit(suit)}>{renderSuit(suit)}</button>) : null)
            }
            <button onClick={() => handleMakeSuit('pass')}>pass</button>
        </div>
    );

    const makeOpposingUi = (player) => (
        <div>
            <h5>Waiting on {game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} to make it</h5>
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