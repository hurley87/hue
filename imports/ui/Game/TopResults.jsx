import React from 'react';


export const TopResults = ({ player, dealer, renderSuit, game }) => {
    return (
        <div>
            <h5>{player.username} {game.dealer === player.id ? dealer() : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}</h5>
            <h1>{player.score} <small>{player.trick}</small></h1>
        </div>
    );
};