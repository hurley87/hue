import React from 'react';
import { Suit } from "./Suit";

export const Pickup = ({ game, updateGame, renderCard, userId }) => {

    const handlePickup = (move) => {
        const newGame = game;
        if (move === 'pass') {
            newGame.status = 'Make';
            newGame.currentPlayer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        } else {
            newGame.status = 'PickupDiscard';
            newGame.currentPlayer === newGame.playerOne.id ? newGame.maker = newGame.playerOne.id : newGame.maker = newGame.playerTwo.id;
            newGame.trump = game.deck[0]?.suit;
        }
        updateGame(newGame);
    };

    const pickupCurrentUi = () => (
        <>
            Pick up the {renderCard(game.deck[0]?.suit, game.deck[0]?.value)} and make trump <Suit suit={game.deck[0]?.suit} />  or pass?{" "}
            <button onClick={() => handlePickup('make')}>Make</button>
            <button onClick={() => handlePickup('pass')}>Pass</button>
        </>
    );

    const pickupOpposingUi = (player) => (
        <>
            { game.playerOne.id === player.id ? game.playerTwo.username : game.playerOne.username} is deciding wether or not to pick up {renderCard(game.deck[0]?.suit, game.deck[0]?.value)}
        </>
    );

    return (
        <>
            {
                game.currentPlayer === userId ?
                    userId === game.playerOne.id ? pickupCurrentUi() : pickupCurrentUi()
                    :
                    userId === game.playerOne.id ? pickupOpposingUi(game.playerOne) : pickupOpposingUi(game.playerTwo)
            }
        </>
    );
};