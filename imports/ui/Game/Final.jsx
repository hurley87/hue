import React from 'react';
import styled from 'styled-components';
import MagicRainbowButton from '../MagicRainbowButton';

const WrappedButton = styled(MagicRainbowButton)`
    margin: auto !important;
`;


export const Final = ({ game, endGame }) => {
    return (
        <div>
            <p>{game.playerOne.score > game.playerTwo.score ? game.playerOne.username : game.playerTwo.username} wins with a score of {game.playerOne.score > game.playerTwo.score ? game.playerOne.score : game.playerTwo.score} to {game.playerOne.score > game.playerTwo.score ? game.playerTwo.score : game.playerOne.score}</p>
            <WrappedButton onClick={() => endGame()}>End Game</WrappedButton>
        </div>

    );
};