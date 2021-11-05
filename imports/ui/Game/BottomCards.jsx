import React from 'react';
import styled from 'styled-components';

const Bottom = styled.div`
    position: absolute;
    bottom: 45px;
    text-align: center;
    width: 95%;
    margin: auto;
`;

const Button = styled.button`
    background-color: #fff;
    border-radius: 3px;
    cursor: pointer;
    &:disabled {
        background-color: transparent;
        border: none;
        cursor: default;
    }
`;

export const BottomCards = ({ player, followsuit, game, handlePlayCard, renderCard }) => {
    return (
        <Bottom>
            <div className="secondRow">
                {(player.first.length === 1 || player.first.length === 2) && game.status === 'PlayCards' ? <Button disabled={followsuit(player, player.first[0])} onClick={() => handlePlayCard(player, player.first[0], 'first')}>{renderCard(player.first[0].suit, player.first[0].value)}</Button> : null}
                <span>{player.first.length === 2 ? <Button disabled={true} >{renderCard("FD", 99)}</Button> : null}</span>
                {(player.second.length === 1 || player.second.length === 2) && game.status === 'PlayCards' ? <Button disabled={followsuit(player, player.second[0])} onClick={() => handlePlayCard(player, player.second[0], 'second')}>{renderCard(player.second[0].suit, player.second[0].value)}</Button> : null}
                <span>{player.second.length === 2 ? <Button disabled={true} >{renderCard("FD", 99)}</Button> : null}</span>
                {(player.third.length === 1 || player.third.length === 2) && game.status === 'PlayCards' ? <Button disabled={followsuit(player, player.third[0])} onClick={() => handlePlayCard(player, player.third[0], 'third')}>{renderCard(player.third[0].suit, player.third[0].value)}</Button> : null}
                <span>{player.third.length === 2 ? <Button disabled={true} >{renderCard("FD", 99)}</Button> : null}</span>
            </div>
            <div className="firstRow">
                {player.hand.map((card, i) => (<Button key={i} disabled={followsuit(player, card)} onClick={() => handlePlayCard(player, card, 'hand')}>{renderCard(card.suit, card.value)}</Button>))}
            </div>
        </Bottom>
    );
};