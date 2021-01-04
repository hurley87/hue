import React from 'react';

export const Order = ({ game, updateGame, renderCard, userId }) => {

    const orderCurrentUi = () => (
        <div>
            Do you want to order up the {renderCard(game.deck[0].suit, game.deck[0].value)} or pass?
            <button onClick={() => handleOrderPickup()}>Order</button>
            <button onClick={() => handleOrderPass()}>Pass</button>
        </div>
    );

    const orderOpposingUi = () => (
        <div>
            {game.playerTwo.username} has option to order {renderCard(game.deck[0].suit, game.deck[0].value)}
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
        newGame.trump = newGame.deck[0].suit;
        updateGame(newGame);
    };

    const handleOrderPass = () => {
        const newGame = game;
        newGame.status = 'Pickup';
        newGame.currentPlayer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        updateGame(newGame);
    };

    return (
        <div>
            <p>{game.status}</p>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? orderCurrentUi() : orderCurrentUi()
                    :
                    userId === game.playerOne.id ? orderOpposingUi() : orderOpposingUi()
            }
        </div>

    );
};