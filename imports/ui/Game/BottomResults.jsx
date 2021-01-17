import React from 'react';

export const BottomResults = ({ player, game, dealer, renderSuit, yourTurn }) => {
    return (
        <div>
            <h1>{player.score} <small>{player.trick} {game.currentPlayer === player.id && game.status === 'PlayCards' ? yourTurn() : null}</small></h1>
            <h5>{player.username} {game.dealer === player.id ? dealer() : null} {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}</h5>
        </div>
    );
};