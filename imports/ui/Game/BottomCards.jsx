import React from 'react';


export const BottomCards = ({ player, renderCover, followsuit, game, handlePlayCard, renderCard, disableCards }) => {
    return (
        <div>
            <div className="secondRow">
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <button disabled={followsuit(player, player.first[0])} onClick={() => handlePlayCard(player, player.first[0], 'first')}>{renderCard(player.first[0].suit, player.first[0].value)}</button> : null}
                <span>{player.first.length === 2 ? renderCover() : null}</span>
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <button disabled={followsuit(player, player.second[0])} onClick={() => handlePlayCard(player, player.second[0], 'second')}>{renderCard(player.second[0].suit, player.second[0].value)}</button> : null}
                <span>{player.second.length === 2 ? renderCover() : null}</span>
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <button disabled={followsuit(player, player.third[0])} onClick={() => handlePlayCard(player, player.third[0], 'third')}>{renderCard(player.third[0].suit, player.third[0].value)}</button> : null}
                <span>{player.third.length === 2 ? renderCover() : null}</span>
            </div>
            <div className="firstRow">
                {player.hand.map((card, i) => (!disableCards && <button key={i} disabled={followsuit(player, card)} onClick={() => handlePlayCard(player, card, 'hand')}>{renderCard(card.suit, card.value)}</button>))}
            </div>
        </div>
    );
};