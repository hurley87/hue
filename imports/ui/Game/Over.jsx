import React from 'react';

export const Over = ({ game, updateGame, userId }) => {
    const nextHand = () => {
        const newGame = game;
        if (newGame.playerOne.trick > newGame.playerTwo.trick) {
            const points = newGame.playerOne.trick - newGame.playerTwo.trick;
            if (newGame.playerOne.id === newGame.maker) {
                newGame.playerOne.score += points;
            } else {
                newGame.playerOne.score += 2 * points;
            }
        } else {
            const points = newGame.playerTwo.trick - newGame.playerOne.trick;
            if (newGame.playerTwo.id === newGame.maker) {
                newGame.playerTwo.score += points;
            } else {
                newGame.playerTwo.score += 2 * points;
            }
        }

        if (newGame.dealer === newGame.playerOne.id) {
            newGame.currentPlayer = newGame.playerTwo.id;
            newGame.dealer = newGame.playerTwo.id;
        } else {
            newGame.currentPlayer = newGame.playerOne.id;
            newGame.dealer = newGame.playerOne.id;
        }

        const suits = ['S', 'D', 'H', 'C'];
        const cards = [];

        let count = 9;

        while (count <= 14) {
            for (const i in suits) {
                cards.push({
                    suit: suits[i],
                    value: count,
                });
            }
            count += 1;
        }

        cards.push({
            suit: 'J',
            value: 15,
        });

        newGame.deck = cards;
        newGame.maker = '';
        newGame.playerOne.trick = 0;
        newGame.playerTwo.trick = 0;
        newGame.trump = '';
        newGame.handCount = 0;
        newGame.status = 'Deal';
        if (newGame.playerOne.score >= newGame.limit || newGame.playerTwo.score >= newGame.limit) {
            newGame.status = 'Final';
        } else {
            newGame.status = 'Deal';
        }
        updateGame(newGame);
    };

    const renderPlayerOneOver = () => {
        if (game.playerOne.trick > game.playerTwo.trick) {
            if (game.maker === game.playerOne.id) {
                const points = game.playerOne.trick - game.playerTwo.trick;
                return (
                    <h5>You win and earn {points} {points === 1 ? 'point' : 'points'}</h5>
                );
            }
            const points = (game.playerOne.trick - game.playerTwo.trick) * 2;
            return (
                <h5>You euchred {game.playerTwo.username} and earned {points} {points === 1 ? 'point' : 'points'}</h5>
            );

        } else {
            if (game.maker === game.playerTwo.id) {
                const points = game.playerTwo.trick - game.playerOne.trick;
                return (
                    <h5>{game.playerTwo.username} wins and earns {points} {points === 1 ? 'point' : 'points'}</h5>
                );
            } else {
                const points = (game.playerTwo.trick - game.playerOne.trick) * 2;
                return (
                    <h5>{game.playerTwo.username} euchred you and earned {points} {points === 1 ? 'point' : 'points'}</h5>
                );
            }
        }

    };

    const renderPlayerTwoOver = () => {
        if (game.playerTwo.trick > game.playerOne.trick) {
            if (game.maker === game.playerTwo.id) {
                const points = game.playerTwo.trick - game.playerOne.trick;
                return (
                    <h5>You win and earned {points} {points === 1 ? 'point' : 'points'}</h5>
                );
            }
            const points = (game.playerTwo.trick - game.playerOne.trick) * 2;
            return (
                <h5>You euchred {game.playerOne.username} and earned {points} {points === 1 ? 'point' : 'points'}</h5>
            );

        } else {
            if (game.maker === game.playerOne.id) {
                const points = game.playerOne.trick - game.playerTwo.trick;
                return (
                    <h5>{game.playerOne.username} wins and earns {points} {points === 1 ? 'point' : 'points'}</h5>
                );
            } else {
                const points = (game.playerOne.trick - game.playerTwo.trick) * 2;
                return (
                    <h5>{game.playerOne.username} euchred you and earned {points} {points === 1 ? 'point' : 'points'}</h5>
                );
            }
        }
    };

    return (
        <div>
            {userId === game.playerOne.id ? renderPlayerOneOver() : renderPlayerTwoOver()}
            <button onClick={() => nextHand()}>Next Hand</button>
        </div>

    );
};