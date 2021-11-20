import React from 'react';
import styled from 'styled-components';

const WrappedButton = styled.button`
    margin: auto !important;
`;

export const Final = ({ game, endGame }) => {
    return (
        <>
            <p>{game.playerOne.score > game.playerTwo.score ? game.playerOne.username : game.playerTwo.username} wins with a score of {game.playerOne.score > game.playerTwo.score ? game.playerOne.score : game.playerTwo.score} to {game.playerOne.score > game.playerTwo.score ? game.playerTwo.score : game.playerOne.score}</p>
            <WrappedButton onClick={() => endGame()}>End Game</WrappedButton>
        </>
    );
};