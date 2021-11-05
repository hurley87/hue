import React from 'react';
import styled from 'styled-components';

const Results = styled.div`
    b {
        background-color:#2f2c2a;
        color: white;
        padding: 2px 4px;
        border-radius: 3px;
        margin-right: 3px;
    }
    h5 {
        position: relative;
        top: 4px;
        pointer-events: none;
    }
}
`;

export const TopResults = ({ player, renderSuit, game }) => {
    return (
        <Results>
            <h5>{player.username} {game.dealer === player.id ? <b>Dealer</b>  : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null} {" "}
            {" "} <span><b>{player.score} / {game.limit}</b> {" "} Tricks: {player.trick}  </span>
            </h5>
        </Results>
    );
};