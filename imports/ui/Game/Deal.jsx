import React from 'react';
import styled from 'styled-components';

const WrappedButton = styled.button`
    margin: auto !important;
`;

export const Deal = ({ game, userId, updateGame }) => {

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
        try {
            updateGame(newGame);
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div>
            {
                game.currentPlayer === userId ? (
                    <div>
                        { game.currentPlayer === game.playerOne.id ? <p>Deal the cards to start the game</p> : <p>Deal the cards to start the game</p>}
                        <WrappedButton style={{display: 'block', margin: 'auto'}} onClick={() => handleDeal()}>Deal</WrappedButton>
                    </div>
                ) : (
                        <div>
                            <p>Waiting on  {game.currentPlayer === game.playerOne.id ? game.playerOne.username : game.playerTwo.username} to deal the cards</p>
                        </div>
                    )}
        </div>

    );
};