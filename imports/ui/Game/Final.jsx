import React from 'react';


export const Final = ({ game, endGame }) => {
    return (
        <div>
            <h5>{game.playerOne.score > game.playerTwo.score ? game.playerOne.username : game.playerTwo.username} wins with a score of {game.playerOne.score > game.playerTwo.score ? game.playerOne.score : game.playerTwo.score} to {game.playerOne.score > game.playerTwo.score ? game.playerTwo.score : game.playerOne.score}</h5>
            <button onClick={() => endGame()}>End Game</button>
        </div>

    );
};