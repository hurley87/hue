import React from 'react';

export const Deal = ({ game, updateGame, userId }) => {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function handleDeal() {
        const newGame = game;
        newGame.status = 'Order';

        const shuffledDeck = shuffleArray(newGame.deck);
        [1, 2, 3, 4, 5].forEach(() => {
            newGame.playerOne.hand.push(shuffledDeck.pop());
        });
        [1, 2, 3, 4, 5].forEach(() => {
            newGame.playerTwo.hand.push(shuffledDeck.pop());
        });
        [1, 2].forEach(() => {
            newGame.playerOne.first.push(shuffledDeck.pop());
        });
        [1, 2].forEach(() => {
            newGame.playerOne.second.push(shuffledDeck.pop());
        });
        [1, 2].forEach(() => {
            newGame.playerOne.third.push(shuffledDeck.pop());
        });
        [1, 2].forEach(() => {
            newGame.playerTwo.first.push(shuffledDeck.pop());
        });
        [1, 2].forEach(() => {
            newGame.playerTwo.second.push(shuffledDeck.pop());
        });
        [1, 2].forEach(() => {
            newGame.playerTwo.third.push(shuffledDeck.pop());
        });

        newGame.currentPlayer === newGame.playerOne.id ? newGame.currentPlayer = newGame.playerTwo.id : newGame.currentPlayer = newGame.playerOne.id;
        newGame.deck = shuffledDeck;
        updateGame(newGame);
    }

    return (
        <div>
            {
                game.currentPlayer === userId ? (
                    <div>
                        {
                            game.currentPlayer === game.playerOne.id ? (
                                <div>
                                    <h5>Deal the cards to start the game</h5>
                                </div>
                            ) : (
                                    <div>
                                        <h5>Deal the cards to start the game</h5>
                                    </div>
                                )
                        }
                        <button onClick={() => handleDeal()}>Deal</button>
                    </div>
                ) : (
                        <div>
                            <h5>Waiting on  {game.currentPlayer === game.playerOne.id ? game.playerOne.username : game.playerTwo.username} to deal the cards</h5>
                        </div>
                    )}
        </div>

    );
};