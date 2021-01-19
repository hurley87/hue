import React from 'react';
import styled from 'styled-components';

const Results = styled.div`
    b {
        background-color:#2f2c2a;
        color: white;
        padding: 2px 4px;
        border-radius: 3px;
    }
}
`;

export const TopResults = ({ player, renderSuit, game, yourTurn }) => {
    return (
        <Results>
            <h5>{player.username} {game.dealer === player.id ? <b>Dealer</b>  : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null} {" "} {game.currentPlayer === player.id && game.status === 'PlayCards' ? yourTurn() : null}
            {" "} <span><b>{player.score} / {game.limit}</b> {" "} Tricks: {player.trick}  </span>
            </h5>
        </Results>
    );
};