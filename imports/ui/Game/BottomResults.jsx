import React from 'react';
import styled from 'styled-components';

const Results = styled.div`
    position: absolute;
    bottom: 10px;
    width: 95%;
    margin: auto;

    b {
        background-color:#2f2c2a;
        color: white;
        padding: 2px 4px;
        border-radius: 3px;
    }
}
`;

export const BottomResults = ({ player, game, renderSuit, yourTurn }) => {
    return (
        <Results>
            <h5>{player.username} {game.dealer === player.id ? <b>Dealer</b>  : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null} {game.currentPlayer === player.id && game.status === 'PlayCards' ? yourTurn() : null}
            <span><b>{player.score} / {game.limit}</b> {" "} Tricks: {player.trick}</span>
            </h5>
        </Results>
    );
};